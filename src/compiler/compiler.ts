import { rustedVisitor } from "../parser/src/rustedVisitor.js";
import {
  ProgramContext,
  FunctionContext,
  StatementContext,
  ExpressionContext,
  BlockContext,
  Struct_init_fieldContext,
  Struct_initContext,
  TypeContext,
  LiteralContext,
  Function_callContext,
  Primary_exprContext,
  Unary_exprContext,
  Multiplicative_exprContext,
  Additive_exprContext,
  Comparison_exprContext,
  Logical_exprContext,
  Assignment_exprContext,
  While_statementContext,
  If_statementContext,
  Return_statementContext,
  Expression_statementContext,
  Let_statementContext,
  Struct_fieldContext,
  Struct_defContext,
  ParameterContext,
  Parameter_listContext,
  ItemContext
} from "../parser/src/rustedParser.js";

import * as I from "./instructions.js";

export class Compiler extends rustedVisitor<I.INSTR[]> {
  private vmCode: I.INSTR[] = [];

  public compile(program: ProgramContext): I.INSTR[] {
    this.vmCode = [];
    return this.visit(program);
  }

  visitProgram = (ctx: ProgramContext): I.INSTR[] => {
    ctx.item().forEach(item => {
      this.visit(item);
    });
    return this.vmCode;
  }

  visitItem = (ctx: ItemContext): I.INSTR[] => {
    if (ctx.function()) {
      return this.visit(ctx.function()!);
    } else if (ctx.struct_def()) {
      return this.visit(ctx.struct_def()!);
    } else if (ctx.let_statement()) {
      return this.visit(ctx.let_statement()!);
    }
    return [];
  }

  visitFunction = (ctx: FunctionContext): I.INSTR[] => {
    const functionName = ctx.IDENTIFIER().getText();
    this.vmCode.push(new I.LABEL(functionName));
    
    if (ctx.parameter_list()) {
      this.visit(ctx.parameter_list()!);
    }
    
    this.visit(ctx.block());
    
    // If no explicit return at the end of function, add one
    this.vmCode.push(new I.RET());
    
    return [];
  }

  visitParameter_list = (ctx: Parameter_listContext): I.INSTR[] => {
    ctx.parameter().forEach(param => {
      this.visit(param);
    });
    return [];
  }

  visitParameter = (ctx: ParameterContext): I.INSTR[] => {
    // Parameters are handled at runtime, we just need to store them
    const paramName = ctx.IDENTIFIER().getText();
    this.vmCode.push(new I.STORE(paramName));
    return [];
  }

  visitStruct_def = (ctx: Struct_defContext): I.INSTR[] => {
    // Struct definitions are used for type checking, not runtime behavior
    // In a full compiler, we'd store this in a symbol table
    return [];
  }

  visitStruct_field = (ctx: Struct_fieldContext): I.INSTR[] => {
    // Similar to struct_def, this is for type information
    return [];
  }

  visitBlock = (ctx: BlockContext): I.INSTR[] => {
    ctx.statement().forEach(stmt => {
      this.visit(stmt);
    });
    return [];
  }

  visitStatement = (ctx: StatementContext): I.INSTR[] => {
    if (ctx.let_statement()) {
      return this.visit(ctx.let_statement()!);
    } else if (ctx.expression_statement()) {
      return this.visit(ctx.expression_statement()!);
    } else if (ctx.return_statement()) {
      return this.visit(ctx.return_statement()!);
    } else if (ctx.block()) {
      return this.visit(ctx.block()!);
    } else if (ctx.if_statement()) {
      return this.visit(ctx.if_statement()!);
    } else if (ctx.while_statement()) {
      return this.visit(ctx.while_statement()!);
    }
    return [];
  }

  visitLet_statement = (ctx: Let_statementContext): I.INSTR[] => {
    const varName = ctx.IDENTIFIER().getText();
    if (ctx.expression()) {
      this.visit(ctx.expression()); // Push the value onto the stack
    } else {
      // Default value (undefined/null)
      this.vmCode.push(new I.PUSH(null));
    }
    this.vmCode.push(new I.STORE(varName));
    return [];
  }

  visitExpression_statement = (ctx: Expression_statementContext): I.INSTR[] => {
    this.visit(ctx.expression());
    this.vmCode.push(new I.POP()); // Discard expression value
    return [];
  }

  visitReturn_statement = (ctx: Return_statementContext): I.INSTR[] => {
    if (ctx.expression()) {
      this.visit(ctx.expression()!); // Push return value on stack
    } else {
      // Return null/undefined
      this.vmCode.push(new I.PUSH(null));
    }
    this.vmCode.push(new I.RET());
    return [];
  }

  visitIf_statement = (ctx: If_statementContext): I.INSTR[] => {
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
    return [];
  }

  visitWhile_statement = (ctx: While_statementContext): I.INSTR[] => {
    const startLabelId = `while_${this.vmCode.length}`;
    const endLabelId = `endwhile_${this.vmCode.length}`;
    
    this.vmCode.push(new I.LABEL(startLabelId)); // Start of loop
    
    this.visit(ctx.expression()); // Evaluate condition
    this.vmCode.push(new I.JOF(endLabelId)); // Jump to end if false
    
    this.visit(ctx.block()); // Execute block
    
    this.vmCode.push(new I.JMP(startLabelId)); // Jump back to start of loop
    this.vmCode.push(new I.LABEL(endLabelId)); // End label
    return [];
  }

  visitExpression = (ctx: ExpressionContext): I.INSTR[] => {
    return this.visit(ctx.assignment_expr());
  }

  visitAssignment_expr = (ctx: Assignment_exprContext): I.INSTR[] => {
    if (ctx.children!.length === 1) {
      return this.visit(ctx.logical_expr());
    }
    
    // Get variable name from the left side
    const leftExpr = ctx.logical_expr();
    const varName = leftExpr.getText(); // Simplified approach - assumes direct identifier
    
    // Evaluate the right side expression
    this.visit(ctx.assignment_expr()!);
    
    // Store the value in the variable
    this.vmCode.push(new I.STORE(varName));
    
    // Assignment expressions also return the assigned value
    this.vmCode.push(new I.LOAD(varName));
    
    return [];
  }

  visitLogical_expr = (ctx: Logical_exprContext): I.INSTR[] => {
    if (ctx.children!.length === 1) {
      return this.visit(ctx.comparison_expr(0));
    }
    
    this.visit(ctx.comparison_expr(0));
    
    for (let i = 1; i < ctx.comparison_expr().length; i++) {
      this.visit(ctx.comparison_expr(i));
      
      const op = ctx.getChild(i * 2 - 1).getText();
      if (op === '&&') {
        this.vmCode.push(new I.AND());
      } else if (op === '||') {
        this.vmCode.push(new I.OR());
      }
    }
    
    return [];
  }

  visitComparison_expr = (ctx: Comparison_exprContext): I.INSTR[] => {
    if (ctx.children!.length === 1) {
      return this.visit(ctx.additive_expr(0));
    }
    
    this.visit(ctx.additive_expr(0));
    
    for (let i = 1; i < ctx.additive_expr().length; i++) {
      this.visit(ctx.additive_expr(i));
      
      const op = ctx.getChild(i * 2 - 1).getText();
      switch (op) {
        case '==': this.vmCode.push(new I.EQ()); break;
        case '!=': this.vmCode.push(new I.NEQ()); break;
        case '<': this.vmCode.push(new I.LT()); break;
        case '<=': this.vmCode.push(new I.LEQ()); break;
        case '>': this.vmCode.push(new I.GT()); break;
        case '>=': this.vmCode.push(new I.GEQ()); break;
      }
    }
    
    return [];
  }

  visitAdditive_expr = (ctx: Additive_exprContext): I.INSTR[] => {
    if (ctx.children!.length === 1) {
      return this.visit(ctx.multiplicative_expr(0));
    }
    
    this.visit(ctx.multiplicative_expr(0));
    
    for (let i = 1; i < ctx.multiplicative_expr().length; i++) {
      this.visit(ctx.multiplicative_expr(i));
      
      const op = ctx.getChild(i * 2 - 1).getText();
      if (op === '+') {
        this.vmCode.push(new I.ADD());
      } else if (op === '-') {
        this.vmCode.push(new I.SUB());
      }
    }
    
    return [];
  }

  visitMultiplicative_expr = (ctx: Multiplicative_exprContext): I.INSTR[] => {
    if (ctx.children!.length === 1) {
      return this.visit(ctx.unary_expr(0));
    }
    
    this.visit(ctx.unary_expr(0));
    
    for (let i = 1; i < ctx.unary_expr().length; i++) {
      this.visit(ctx.unary_expr(i));
      
      const op = ctx.getChild(i * 2 - 1).getText();
      switch (op) {
        case '*': this.vmCode.push(new I.MUL()); break;
        case '/': this.vmCode.push(new I.DIV()); break;
        case '%': this.vmCode.push(new I.MOD()); break;
      }
    }
    
    return [];
  }

  visitUnary_expr = (ctx: Unary_exprContext): I.INSTR[] => {
    if (ctx.primary_expr()) {
      return this.visit(ctx.primary_expr()!);
    }
    
    this.visit(ctx.unary_expr()!);
    
    const op = ctx.getChild(0).getText();
    if (op === '-') {
      // Negate the value
      this.vmCode.push(new I.PUSH(-1));
      this.vmCode.push(new I.MUL());
    } else if (op === '!') {
      this.vmCode.push(new I.NOT());
    }
    
    return [];
  }

  visitPrimary_expr = (ctx: Primary_exprContext): I.INSTR[] => {
    if (ctx.IDENTIFIER()) {
      const varName = ctx.IDENTIFIER()?.getText();
      this.vmCode.push(new I.LOAD(varName));
    } else if (ctx.literal()) {
      this.visit(ctx.literal()!);
    } else if (ctx.function_call()) {
      this.visit(ctx.function_call()!);
    } else if (ctx.expression()) {
      this.visit(ctx.expression()!);
    } else if (ctx.struct_init()) {
      this.visit(ctx.struct_init()!);
    } else if (ctx.children?.length === 3 && ctx.getChild(1).getText() === '.') {
      // Handle member access: obj.field
      this.visit(ctx.primary_expr()!); // Push the object reference
      const fieldName = ctx.IDENTIFIER()?.getText();
      // Add field access I.INSTRuction (implementation depends on how objects are represented)
      this.vmCode.push(new I.FIELD_ACCESS(fieldName));
    }
    return [];
  }

  visitFunction_call = (ctx: Function_callContext): I.INSTR[] => {
    // Push arguments onto the stack (in reverse)
    const args = ctx.expression();
    for (let i = 0; i < args.length; i++) {
      this.visit(args[i]);
    }
    
    const funcName = ctx.IDENTIFIER().getText();
    this.vmCode.push(new I.CALL(funcName, args.length));
    
    return [];
  }

  visitStruct_init = (ctx: Struct_initContext): I.INSTR[] => {
    // Create a new object/struct
    const structName = ctx.IDENTIFIER().getText();
    this.vmCode.push(new I.PUSH(structName));
    
    // Initialize fields
    ctx.struct_init_field().forEach(field => {
      this.visit(field);
    });
    
    return [];
  }

  visitStruct_init_field = (ctx: Struct_init_fieldContext): I.INSTR[] => {
    const fieldName = ctx.IDENTIFIER().getText();
    this.visit(ctx.expression());
    
    // Set the field in the object (top of stack should be the struct object)
    this.vmCode.push(new I.SET_FIELD(fieldName));
    
    return [];
  }

  visitType = (ctx: TypeContext): I.INSTR[] => {
    // Type information is for static checking, not runtime behavior
    return [];
  }

  visitLiteral = (ctx: LiteralContext): I.INSTR[] => {
    let value;
    if (ctx.INTEGER_LITERAL()) {
      value = parseInt(ctx.INTEGER_LITERAL()!.getText());
    } else if (ctx.BOOLEAN_LITERAL()) {
      value = ctx.BOOLEAN_LITERAL()!.getText() === 'true';
    } else if (ctx.STRING_LITERAL()) {
      // Remove quotes and handle escape sequences
      const rawStr = ctx.STRING_LITERAL()!.getText();
      value = rawStr.substring(1, rawStr.length - 1).replace(/\\"/g, '"');
    }
    
    this.vmCode.push(new I.PUSH(value));
    return [];
  }
}
