import {
  Additive_exprContext,
  Assignment_exprContext,
  BlockContext,
  Comparison_exprContext,
  ExpressionContext,
  Expression_statementContext,
  FunctionContext,
  Function_callContext,
  If_statementContext,
  ItemContext,
  Let_statementContext,
  LiteralContext,
  Logical_exprContext,
  Multiplicative_exprContext,
  ParameterContext,
  Parameter_listContext,
  Primary_exprContext,
  ProgramContext,
  Return_statementContext,
  StatementContext,
  TypeContext,
  Unary_exprContext,
  While_statementContext,
} from "../parser/src/RustedParser";
import { RustedVisitor } from "../parser/src/RustedVisitor";

import * as I from "../vm/instructions";
import { WORD_SIZE } from "../vm/memory";

// compiler error
export class CompileError extends Error {
  constructor(public msg: string) {
    super();
  }

  public toString() {
    return this.msg;
  }
}

// compiler env stuff
type cenv = {
  bindings: Map<string, number>; // maps identifiers to their memory addresses
  next_offset: number;
  parent: cenv | null;
};

function cenv_new(): cenv {
  // for each frame, offset 0 belongs to the old frame pointer.
  // so variable allocations start from offset 1
  return { bindings: new Map(), next_offset: 1, parent: null };
}

function cenv_push(env: cenv) {
  const e = cenv_new();
  e.parent = env;
  return e;
}

function cenv_pop(env: cenv) {
  return env.parent;
}

function cenv_extend(env: cenv, name: string) {
  env.bindings[name] = env.next_offset;
  env.next_offset += WORD_SIZE;
}

function cenv_lookup(env: cenv, name: string) {
  let frame_offset = 0;
  let byte_offset: number = undefined;

  let cur_env = env;
  while (cur_env !== null) {
    if (cur_env.bindings.has(name)) {
      byte_offset = cur_env.bindings[name];
      break;
    } else {
      cur_env = cur_env.parent;
      frame_offset += 1;
    }
  }

  if (byte_offset === undefined) {
    throw new CompileError(`name not found in current scope: ${name}`);
  }
  return [frame_offset, byte_offset];
}

// the actual compiler
export class RustedCompiler extends RustedVisitor<void> {
  private vmCode = [];
  private env: cenv;

  public compile(program: ProgramContext): I.INSTR[] {
    // reset
    this.vmCode = [];
    // todo: populate with global environment shit?
    // dude i dont fucking know
    this.env = cenv_new();

    this.visit(program);
    return this.vmCode;
  }

  visitProgram = (ctx: ProgramContext) => {
    ctx.item().forEach((item) => {
      this.visit(item);
    });
  };

  visitItem = (ctx: ItemContext) => {
    if (ctx.function()) {
      this.visit(ctx.function()!);
    } else if (ctx.let_statement()) {
      this.visit(ctx.let_statement()!);
    }
  };

  visitFunction = (ctx: FunctionContext) => {
    const functionName = ctx.IDENTIFIER().getText();
    this.vmCode.push(new I.LABEL(functionName));

    // calling convention:
    // - caller sets up stack frame
    // - callee tears down stack frame (?)
    // so at this point, the stack frame has already been set up

    // create new environment for bindings and fbody
    this.env = cenv_push(this.env);

    // assign stack slots to fn parameters
    if (ctx.parameter_list()) {
      this.visit(ctx.parameter_list()!);
    }

    // visit the block
    // note that this sets up another child frame but at this point i dont really care
    this.visit(ctx.block());

    // If no explicit return at the end of function, add one
    let retFlag = false;
    for (const stmt of ctx.block().statement()) {
      if (stmt.return_statement()) {
        retFlag = true;
        break;
      }
    }
    if (!retFlag) this.vmCode.push(new I.RET());

    // clear environment
    this.env = cenv_pop(this.env);
  };

  visitParameter_list = (ctx: Parameter_listContext) => {
    ctx.parameter().forEach((param) => {
      this.visit(param);
    });
  };

  // also, im using snake case. fight me
  visitParameter = (ctx: ParameterContext) => {
    const param_name = ctx.IDENTIFIER().getText();
    cenv_extend(this.env, param_name);
  };

  visitBlock = (ctx: BlockContext) => {
    this.env = cenv_push(this.env);

    // scan out declarations, and reserve space on the stack for their pointers
    ctx
      .statement()
      .map((stmt) => stmt.let_statement()) // declarations can only occur in Let statements
      .filter((let_ctx) => let_ctx !== null)
      .forEach((let_ctx) => {
        const var_name = let_ctx.IDENTIFIER().getText();
        cenv_extend(this.env, var_name);
        this.vmCode.push(new I.PUSH(null));
      });

    // compile the statements
    ctx.statement().forEach((stmt) => {
      this.visit(stmt);
    });

    this.env = cenv_pop(this.env);
  };

  visitStatement = (ctx: StatementContext) => {
    if (ctx.let_statement()) {
      this.visit(ctx.let_statement()!);
    } else if (ctx.expression_statement()) {
      this.visit(ctx.expression_statement()!);
    } else if (ctx.return_statement()) {
      this.visit(ctx.return_statement()!);
    } else if (ctx.block()) {
      this.visit(ctx.block()!);
    } else if (ctx.if_statement()) {
      this.visit(ctx.if_statement()!);
    } else if (ctx.while_statement()) {
      this.visit(ctx.while_statement()!);
    }
  };

  visitLet_statement = (ctx: Let_statementContext) => {
    const var_name = ctx.IDENTIFIER().getText();
    if (ctx.expression()) {
      this.visit(ctx.expression()); // Push the value onto the stack
    } else {
      // Default value (undefined/null)
      this.vmCode.push(new I.PUSH(null));
    }

    const [fo, bo] = cenv_lookup(this.env, var_name);
    this.vmCode.push(new I.PUSH(bo));
    this.vmCode.push(new I.PUSH(fo));
    this.vmCode.push(new I.FLOAD()); // put address of this variable at top of the stack
    this.vmCode.push(new I.STORE());
  };

  visitExpression_statement = (ctx: Expression_statementContext) => {
    this.visit(ctx.expression());
    this.vmCode.push(new I.POP()); // Discard expression value
  };

  visitReturn_statement = (ctx: Return_statementContext) => {
    if (ctx.expression()) {
      this.visit(ctx.expression()); // Push return value on stack
    } else {
      // Return null/undefined
      this.vmCode.push(new I.PUSH(null));
    }
    this.vmCode.push(new I.RET());
  };

  visitIf_statement = (ctx: If_statementContext) => {
    this.visit(ctx.expression()); // Evaluate condition

    const elseLabelId = `else_${this.vmCode.length}`;
    const endLabelId = `endif_${this.vmCode.length}`;

    // Jump to else part if condition is false
    this.vmCode.push(new I.JOF(elseLabelId));

    // If block
    this.visit(ctx.block(0));
    this.vmCode.push(new I.JMP(endLabelId)); // Jump to end

    // Else part
    this.vmCode.push(new I.LABEL(elseLabelId));
    if (ctx.block().length > 1) {
      this.visit(ctx.block(1));
    } else if (ctx.if_statement()) {
      this.visit(ctx.if_statement());
    }

    this.vmCode.push(new I.LABEL(endLabelId)); // End label
  };

  visitWhile_statement = (ctx: While_statementContext) => {
    const startLabelId = `while_${this.vmCode.length}`;
    const endLabelId = `endwhile_${this.vmCode.length}`;

    this.vmCode.push(new I.LABEL(startLabelId)); // Start of loop

    this.visit(ctx.expression()); // Evaluate condition
    this.vmCode.push(new I.JOF(endLabelId)); // Jump to end if false

    this.visit(ctx.block()); // Execute block

    this.vmCode.push(new I.JMP(startLabelId)); // Jump back to start of loop
    this.vmCode.push(new I.LABEL(endLabelId)); // End label
  };

  visitExpression = (ctx: ExpressionContext) => {
    this.visit(ctx.assignment_expr());
  };

  visitAssignment_expr = (ctx: Assignment_exprContext) => {
    if (ctx.children!.length === 1) {
      this.visit(ctx.logical_expr());
    }

    // Get variable name from the left side
    const leftExpr = ctx.logical_expr();
    const varName = leftExpr.getText(); // Simplified approach - assumes direct identifier

    // Evaluate the right side expression
    this.visit(ctx.assignment_expr()!);

    // Store the value in the variable
    this.vmCode.push(new I.STORE());

    // Assignment expressions also return the assigned value
    this.vmCode.push(new I.LOAD());
  };

  visitLogical_expr = (ctx: Logical_exprContext) => {
    if (ctx.children!.length === 1) {
      this.visit(ctx.comparison_expr(0));
    }

    this.visit(ctx.comparison_expr(0));

    for (let i = 1; i < ctx.comparison_expr().length; i++) {
      this.visit(ctx.comparison_expr(i));

      const op = ctx.getChild(i * 2 - 1).getText();
      if (op === "&&") {
        this.vmCode.push(new I.AND());
      } else if (op === "||") {
        this.vmCode.push(new I.OR());
      }
    }
  };

  visitComparison_expr = (ctx: Comparison_exprContext) => {
    if (ctx.children!.length === 1) {
      this.visit(ctx.additive_expr(0));
    }

    this.visit(ctx.additive_expr(0));

    for (let i = 1; i < ctx.additive_expr().length; i++) {
      this.visit(ctx.additive_expr(i));

      const op = ctx.getChild(i * 2 - 1).getText();
      switch (op) {
        case "==":
          this.vmCode.push(new I.EQ());
          break;
        case "!=":
          this.vmCode.push(new I.NEQ());
          break;
        case "<":
          this.vmCode.push(new I.LT());
          break;
        case "<=":
          this.vmCode.push(new I.LEQ());
          break;
        case ">":
          this.vmCode.push(new I.GT());
          break;
        case ">=":
          this.vmCode.push(new I.GEQ());
          break;
      }
    }
  };

  visitAdditive_expr = (ctx: Additive_exprContext) => {
    if (ctx.children!.length === 1) {
      this.visit(ctx.multiplicative_expr(0));
      return;
    }

    this.visit(ctx.multiplicative_expr(0));

    for (let i = 1; i < ctx.multiplicative_expr().length; i++) {
      this.visit(ctx.multiplicative_expr(i));

      const op = ctx.getChild(i * 2 - 1).getText();
      if (op === "+") {
        this.vmCode.push(new I.ADD());
      } else if (op === "-") {
        this.vmCode.push(new I.SUB());
      }
    }
  };

  visitMultiplicative_expr = (ctx: Multiplicative_exprContext) => {
    if (ctx.children!.length === 1) {
      this.visit(ctx.unary_expr(0));
      return;
    }

    this.visit(ctx.unary_expr(0));

    for (let i = 1; i < ctx.unary_expr().length; i++) {
      this.visit(ctx.unary_expr(i));

      const op = ctx.getChild(i * 2 - 1).getText();
      switch (op) {
        case "*":
          this.vmCode.push(new I.MUL());
          break;
        case "/":
          this.vmCode.push(new I.DIV());
          break;
        case "%":
          this.vmCode.push(new I.MOD());
          break;
      }
    }
  };

  visitUnary_expr = (ctx: Unary_exprContext) => {
    if (ctx.ref_primary_expr()) {
      return this.visit(ctx.ref_primary_expr()!);
    }

    this.visit(ctx.unary_expr()!);

    const op = ctx.getChild(0).getText();
    if (op === "-") {
      // Negate the value
      this.vmCode.push(new I.PUSH(-1));
      this.vmCode.push(new I.MUL());
    } else if (op === "!") {
      this.vmCode.push(new I.NOT());
    }
  };

  visitPrimary_expr = (ctx: Primary_exprContext) => {
    if (ctx.IDENTIFIER()) {
      const varName = ctx.IDENTIFIER()?.getText();
      this.vmCode.push(new I.LOAD());
    } else if (ctx.literal()) {
      this.visit(ctx.literal()!);
    } else if (ctx.function_call()) {
      this.visit(ctx.function_call()!);
    } else if (ctx.expression()) {
      this.visit(ctx.expression()!);
    }
  };

  visitFunction_call = (ctx: Function_callContext) => {
    // Push arguments onto the stack (in reverse)
    const args = ctx.expression();
    for (let i = 0; i < args.length; i++) {
      this.visit(args[i]);
    }

    const funcName = ctx.IDENTIFIER().getText();
    this.vmCode.push(new I.CALL(funcName, args.length));
  };

  visitType = (ctx: TypeContext) => {
    // Type information is for static checking, not runtime behavior
  };

  visitLiteral = (ctx: LiteralContext) => {
    let value;
    if (ctx.INTEGER_LITERAL()) {
      value = parseInt(ctx.INTEGER_LITERAL()!.getText());
    } else if (ctx.BOOLEAN_LITERAL()) {
      value = ctx.BOOLEAN_LITERAL()!.getText() === "true";
    } else if (ctx.STRING_LITERAL()) {
      // Remove quotes and handle escape sequences
      const rawStr = ctx.STRING_LITERAL()!.getText();
      value = rawStr.substring(1, rawStr.length - 1).replace(/\\"/g, '"');
    }

    this.vmCode.push(new I.PUSH(value));
  };
}
