import {
  Additive_exprContext,
  Assignment_exprContext,
  BlockContext,
  Comparison_exprContext,
  Expression_statementContext,
  ExpressionContext,
  Function_callContext,
  FunctionContext,
  If_statementContext,
  ItemContext,
  Let_statementContext,
  LiteralContext,
  Logical_exprContext,
  Multiplicative_exprContext,
  Parameter_listContext,
  ParameterContext,
  Primary_exprContext,
  ProgramContext,
  Ref_primary_exprContext,
  Return_statementContext,
  StatementContext,
  TypeContext,
  Unary_exprContext,
  While_statementContext,
} from "../parser/src/RustedParser";
import { RustedVisitor } from "../parser/src/RustedVisitor";

abstract class AbstractTypeClosure {
  constructor(
    public type: string,
    public mutable: boolean,
    public dropped: boolean = false,
    public immutableBorrow: number,
    public mutableBorrow: number
  ) {}
}

class TypeClosure extends AbstractTypeClosure {
  constructor(
    public type: string,
    public mutable: boolean,
    public dropped: boolean = false,
    public immutableBorrow: number,
    public mutableBorrow: number
  ) {
    super(type, mutable, dropped, immutableBorrow, mutableBorrow);
  }
}

class ParentRef extends AbstractTypeClosure {
  constructor(public parent: CompileTimeEnvironment) {
    super("parent", false, false, 0, 0);
  }
}

class CompileTimeEnvironment {
  constructor(
    public bindings: Map<string, AbstractTypeClosure> = new Map(),
    public parent: CompileTimeEnvironment | null = null
  ) {}

  public extend(name: string, type: AbstractTypeClosure): void {
    if (this.bindings.has(name)) {
      throw new Error(`Variable '${name}' already declared`);
    }
    this.bindings.set(name, type);
  }

  public has(name: string): boolean {
    if (this.bindings.has(name)) {
      return true;
    }
    if (this.parent) {
      return this.parent.has(name);
    }
    return false;
  }
  public lookup(name: string): AbstractTypeClosure {
    if (this.bindings.has(name)) {
      return this.bindings.get(name)!;
    }
    if (this.parent) {
      return this.parent.lookup(name);
    }
    throw new Error(`Variable '${name}' not found`);
  }
}

const BUILTINS = new Map<string, AbstractTypeClosure>([
  ["println", new TypeClosure("fn(any) -> ()", false, false, 0, 0)],
]);

const GLOBAL_ENV = new CompileTimeEnvironment(BUILTINS, null);

export class RustedTypeChecker extends RustedVisitor<string> {
  private env: CompileTimeEnvironment = new CompileTimeEnvironment();
  private currentFunctionReturnType: string | null = null;
  private errorMessages: string[] = [];

  // Helper methods for type management
  private isIntegerType(type: string): boolean {
    return (
      type === "i32" ||
      type === "i64" ||
      type === "u32" ||
      type === "u64" ||
      type === "usize"
    );
  }

  private isBooleanType(type: string): boolean {
    return type === "bool";
  }

  private isStringType(type: string): boolean {
    return type === "String" || type === "&str";
  }

  private areTypesCompatible(left: string, right: string): boolean {
    if (left === "any" || right === "any") return true;
    if (left === right) return true;
    if (this.isIntegerType(left) && this.isIntegerType(right)) return true;
    if (left === "&str" && right === "&str") return true;

    // References compatibility
    if (left.startsWith("&") && right.startsWith("&")) {
      const leftBase = left.replace(/^&(mut\s+)?/, "");
      const rightBase = right.replace(/^&(mut\s+)?/, "");
      return this.areTypesCompatible(leftBase, rightBase);
    }

    return false;
  }

  private shouldTransferOwnership(type: string): boolean {
    // Types that involve ownership transfer when assigned
    return (
      type === "&str" ||
      (!type.startsWith("&") &&
        !this.isIntegerType(type) &&
        !this.isBooleanType(type))
    );
  }

  private isRightSideIdentifier(expr: Assignment_exprContext): boolean {
    // Check if the right side is a simple identifier reference
    const logicalExpr = expr.logical_expr();
    if (!logicalExpr) return false;

    if (
      logicalExpr.comparison_expr().length === 1 &&
      logicalExpr.comparison_expr(0).additive_expr().length === 1 &&
      logicalExpr.comparison_expr(0).additive_expr(0).multiplicative_expr()
        .length === 1 &&
      logicalExpr
        .comparison_expr(0)
        .additive_expr(0)
        .multiplicative_expr(0)
        .unary_expr(0)
        .ref_primary_expr() &&
      logicalExpr
        .comparison_expr(0)
        .additive_expr(0)
        .multiplicative_expr(0)
        .unary_expr(0)
        .ref_primary_expr()!
        .primary_expr() &&
      logicalExpr
        .comparison_expr(0)
        .additive_expr(0)
        .multiplicative_expr(0)
        .unary_expr(0)
        .ref_primary_expr()!
        .primary_expr()!
        .IDENTIFIER()
    ) {
      return true;
    }

    return false;
  }

  private extractIdentifierFromExpr(expr: Assignment_exprContext): string {
    // Extract the identifier name from an expression (assuming it's a simple identifier)
    const logicalExpr = expr.logical_expr();
    return logicalExpr
      .comparison_expr(0)
      .additive_expr(0)
      .multiplicative_expr(0)
      .unary_expr(0)
      .ref_primary_expr()!
      .primary_expr()!
      .IDENTIFIER()!
      .getText();
  }

  private isExpressionSimpleIdentifier(expr: ExpressionContext): boolean {
    // Check if an expression is just a simple identifier
    if (!expr.assignment_expr()) return false;
    return this.isAssignmentExprIdentifier(expr.assignment_expr());
  }

  private isAssignmentExprIdentifier(expr: Assignment_exprContext): boolean {
    if (expr.assignment_expr()) return false; // Not a simple identifier

    const logicalExpr = expr.logical_expr();
    if (logicalExpr.comparison_expr().length !== 1) return false;

    const compExpr = logicalExpr.comparison_expr(0);
    if (compExpr.additive_expr().length !== 1) return false;

    const addExpr = compExpr.additive_expr(0);
    if (addExpr.multiplicative_expr().length !== 1) return false;

    const multExpr = addExpr.multiplicative_expr(0);
    if (multExpr.unary_expr().length !== 1) return false;

    const unaryExpr = multExpr.unary_expr(0);
    if (!unaryExpr.ref_primary_expr()) return false;

    const refPrimExpr = unaryExpr.ref_primary_expr()!;
    if (!refPrimExpr.primary_expr()) return false;

    const primExpr = refPrimExpr.primary_expr()!;

    return !!primExpr.IDENTIFIER();
  }

  private getIdentifierFromExpression(expr: ExpressionContext): string {
    return expr
      .assignment_expr()
      .logical_expr()
      .comparison_expr(0)
      .additive_expr(0)
      .multiplicative_expr(0)
      .unary_expr(0)
      .ref_primary_expr()!
      .primary_expr()!
      .IDENTIFIER()!
      .getText();
  }

  private addError(message: string): void {
    this.errorMessages.push(message);
  }

  public getErrors(): string[] {
    return this.errorMessages;
  }

  // Environment management methods
  private pushEnvironment(): void {
    // Create a new environment
    const newEnv = new CompileTimeEnvironment(new Map(), this.env);
    // Push the new environment onto the stack
    this.env = newEnv;
  }

  private popEnvironment(): void {
    // Pop the current environment off the stack
    if (this.env.parent) {
      this.env = this.env.parent;
    } else {
      this.addError("Cannot pop the global environment");
    }
  }

  private lookupVariable(name: string): TypeClosure {
    if (this.env.has(name)) {
      return this.env.lookup(name)!;
    }

    this.addError(`Variable '${name}' not found in current scope`);
  }

  private declareVariable(
    name: string,
    type: string,
    mutable: boolean,
    immutableBorrow: number = 0,
    mutableBorrow: number = 0
  ): void {
    if (this.env.has(name) && name !== "__parent__") {
      this.addError(`Variable '${name}' is already declared in this scope`);
      return;
    }
    this.env.extend(
      name,
      new TypeClosure(type, mutable, true, immutableBorrow, mutableBorrow)
    );
  }

  public typeCheck(tree: ProgramContext): void {
    this.env.parent = GLOBAL_ENV; // Reset environment to global
    this.errorMessages = []; // Reset error messages
    this.visit(tree);
    if (this.errorMessages.length > 0) {
      console.error("Type checking errors:");
      for (const error of this.errorMessages) {
        console.error(error);
      }
    } else {
      console.log("Type checking passed without errors.");
    }
  }

  // Visitor implementations
  visitProgram = (ctx: ProgramContext): string => {
    if (!ctx) return "error";

    for (let i = 0; i < ctx.item().length; i++) {
      this.visit(ctx.item(i));
    }

    return "program";
  };

  visitItem = (ctx: ItemContext): string => {
    if (!ctx) return "error";

    if (ctx.function()) {
      return this.visit(ctx.function()!);
    } else if (ctx.let_statement()) {
      return this.visit(ctx.let_statement()!);
    }

    return "item";
  };

  visitFunction = (ctx: FunctionContext): string => {
    if (!ctx) return "error";

    const functionName = ctx.IDENTIFIER().getText() || "unknown";
    let returnType = "()"; // Unit type default

    if (ctx.type()) {
      returnType = this.visit(ctx.type()!);
    }

    // Set current function context for return type checking
    this.currentFunctionReturnType = returnType;

    // Create new environment for function body
    this.pushEnvironment();

    // Process parameters
    if (ctx.parameter_list()) {
      this.visit(ctx.parameter_list()!);
    }

    // Store function type in body environment
    // Format: fn(param1_type, param2_type, ...) -> return_type
    let functionType = "fn(";
    if (ctx.parameter_list()) {
      const paramList = ctx.parameter_list()!;
      for (let i = 0; i < paramList.parameter().length; i++) {
        const param = paramList.parameter(i);
        const paramType = this.visit(param.type());
        functionType += paramType;
        if (i < paramList.parameter().length - 1) {
          functionType += ", ";
        }
      }
    }
    functionType += `) -> ${returnType}`;

    this.declareVariable(functionName, functionType, false);

    // Process function body
    const blockType = this.visit(ctx.block());

    // Check if block type matches return type
    if (
      blockType !== "void" &&
      blockType !== "()" &&
      !this.areTypesCompatible(returnType, blockType)
    ) {
      this.addError(
        `Function '${functionName}' declares return type '${returnType}' but returns '${blockType}'`
      );
    }

    // Clean up
    this.popEnvironment();
    this.currentFunctionReturnType = null;

    // re-Store function type in function context, as the body environment is popped
    this.declareVariable(functionName, functionType, false);

    return functionType;
  };

  visitParameter_list = (ctx: Parameter_listContext): string => {
    if (!ctx) return "error";

    for (let i = 0; i < ctx.parameter().length; i++) {
      this.visit(ctx.parameter(i));
    }

    return "params";
  };

  visitParameter = (ctx: ParameterContext): string => {
    if (!ctx) return "error";

    const paramName = ctx.IDENTIFIER().getText() || "unknown";
    const paramType = this.visit(ctx.type());

    // Determine if the parameter is mutable based on if it's a mutable reference
    const isMutable = paramType.startsWith("&mut ");

    // Determine borrow state
    let immutableBorrow = 0;
    let mutableBorrow = 0;
    if (paramType.startsWith("&mut ")) {
      mutableBorrow = 1;
    } else if (paramType.startsWith("&")) {
      immutableBorrow = 1;
    }

    // Add parameter to function's environment
    this.declareVariable(
      paramName,
      paramType,
      isMutable,
      immutableBorrow,
      mutableBorrow
    );

    return paramType;
  };

  visitBlock = (ctx: BlockContext): string => {
    if (!ctx) return "error";

    // Create new scope for block
    this.pushEnvironment();

    let blockType = "()"; // Default to unit type

    // Process all statements
    for (let i = 0; i < ctx.statement().length; i++) {
      const stmtType = this.visit(ctx.statement(i));

      // Last statement without semicolon in a block is the block's result type
      if (i === ctx.statement().length - 1) {
        // Check if this is an expression statement without semicolon
        const stmt = ctx.statement(i);
        if (
          stmt.expression_statement() &&
          !stmt.expression_statement()!.getText().endsWith(";")
        ) {
          blockType = stmtType;
        }
      }
    }

    // Clean up scope
    this.popEnvironment();

    return blockType;
  };

  visitStatement = (ctx: StatementContext): string => {
    if (!ctx) return "error";

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

    return "void";
  };

  visitLet_statement = (ctx: Let_statementContext): string => {
    if (!ctx) return "error";

    const varName = ctx.IDENTIFIER().getText() || "unknown";
    const isMutable = ctx.getText().includes("mut");

    // Require explicit type declaration
    if (!ctx.type()) {
      this.addError(`Type declaration is required for variable '${varName}'`);
      return "error";
    }

    // Get the declared type
    const varType = this.visit(ctx.type()!);

    if (ctx.expression()) {
      const exprType = this.visit(ctx.expression()!);

      // Check if the declared type matches the expression type
      if (!this.areTypesCompatible(varType, exprType)) {
        this.addError(
          `Cannot assign value of type '${exprType}' to variable '${varName}' of type '${varType}'`
        );
      }

      // Check if we're assigning from an identifier that should transfer ownership
      if (this.isExpressionSimpleIdentifier(ctx.expression()!)) {
        const rhsVarName = this.getIdentifierFromExpression(ctx.expression()!);
        const rhsVar = this.lookupVariable(rhsVarName);

        // Check if the variable is already dropped
        if (
          rhsVar &&
          rhsVar.dropped &&
          this.shouldTransferOwnership(rhsVar.type)
        ) {
          this.addError(`Cannot use moved value: '${rhsVarName}'`);
        } else if (rhsVar && this.shouldTransferOwnership(rhsVar.type)) {
          // Mark the source variable as dropped (ownership moved)
          rhsVar.dropped = true;
        }
      }
    } else {
      // No initializer - warn about uninitialized variable
      this.addError(`Variable '${varName}' declared but not initialized`);
    }

    // Declare the variable in the current environment
    this.declareVariable(varName, varType, isMutable);

    return "void";
  };

  visitExpression_statement = (ctx: Expression_statementContext): string => {
    if (!ctx) return "error";

    return this.visit(ctx.expression());
  };

  visitReturn_statement = (ctx: Return_statementContext): string => {
    if (!ctx) return "error";

    let returnType = "()";
    if (ctx.expression()) {
      returnType = this.visit(ctx.expression()!);
    }

    // Check if return type matches function return type
    if (
      this.currentFunctionReturnType &&
      !this.areTypesCompatible(this.currentFunctionReturnType, returnType)
    ) {
      this.addError(
        `Return type '${returnType}' doesn't match function return type '${this.currentFunctionReturnType}'`
      );
    }

    return returnType;
  };

  visitIf_statement = (ctx: If_statementContext): string => {
    if (!ctx) return "error";

    // Check condition type
    const condType = this.visit(ctx.expression());
    if (!this.isBooleanType(condType)) {
      this.addError(`If condition must be a boolean, got '${condType}'`);
    }

    // Check if and else blocks
    const ifBlockType = this.visit(ctx.block(0));
    let elseBlockType = "()";

    if (ctx.block().length > 1) {
      // This is the 'else' block
      elseBlockType = this.visit(ctx.block(1));
    } else if (ctx.if_statement()) {
      // This is an 'else if'
      elseBlockType = this.visit(ctx.if_statement()!);
    }

    // If/else returns a value if both branches return compatible types
    if (
      this.areTypesCompatible(ifBlockType, elseBlockType) &&
      ifBlockType !== "void" &&
      elseBlockType !== "void"
    ) {
      return ifBlockType;
    }

    return "void";
  };

  visitWhile_statement = (ctx: While_statementContext): string => {
    if (!ctx) return "error";

    // Check condition type
    const condType = this.visit(ctx.expression());
    if (!this.isBooleanType(condType)) {
      this.addError(`While condition must be a boolean, got '${condType}'`);
    }

    // Visit block
    this.visit(ctx.block());

    return "void";
  };

  visitExpression = (ctx: ExpressionContext): string => {
    if (!ctx) return "error";

    return this.visit(ctx.assignment_expr());
  };

  visitAssignment_expr = (ctx: Assignment_exprContext): string => {
    if (!ctx) return "error";

    const leftType = this.visit(ctx.logical_expr());
    if (ctx.assignment_expr()) {
      // This is an assignment
      const rightType = this.visit(ctx.assignment_expr()!);
      // Check if left side is an identifier (for mutability check)
      const leftExpr = ctx.logical_expr();
      if (
        leftExpr.comparison_expr().length === 1 &&
        leftExpr.comparison_expr(0).additive_expr().length === 1 &&
        leftExpr.comparison_expr(0).additive_expr(0).multiplicative_expr()
          .length === 1 &&
        leftExpr
          .comparison_expr(0)
          .additive_expr(0)
          .multiplicative_expr(0)
          .unary_expr(0)
          .ref_primary_expr() &&
        leftExpr
          .comparison_expr(0)
          .additive_expr(0)
          .multiplicative_expr(0)
          .unary_expr(0)
          .ref_primary_expr()!
          .primary_expr() &&
        leftExpr
          .comparison_expr(0)
          .additive_expr(0)
          .multiplicative_expr(0)
          .unary_expr(0)
          .ref_primary_expr()!
          .primary_expr()!
          .IDENTIFIER()
      ) {
        const varName = leftExpr
          .comparison_expr(0)
          .additive_expr(0)
          .multiplicative_expr(0)
          .unary_expr(0)
          .ref_primary_expr()!
          .primary_expr()!
          .IDENTIFIER()!
          .getText();
        const variable = this.lookupVariable(varName);

        if (variable) {
          if (!variable.mutable) {
            this.addError(`Cannot assign to immutable variable '${varName}'`);
          }

          if (!this.areTypesCompatible(variable.type, rightType)) {
            this.addError(
              `Cannot assign value of type '${rightType}' to variable '${varName}' of type '${variable.type}'`
            );
          }

          // Check right side for identifier that might be moved
          const rightExpr = ctx.assignment_expr()!;
          if (this.isRightSideIdentifier(rightExpr)) {
            const rightVarName = this.extractIdentifierFromExpr(rightExpr);
            const rightVar = this.lookupVariable(rightVarName);
            // Check if right var is dropped/moved
            if (rightVar && rightVar.dropped) {
              this.addError(`Cannot assign moved value: '${rightVarName}'`);
              return "error";
            }
            if (rightVar && this.shouldTransferOwnership(rightVar.type)) {
              // Mark the right variable as dropped/moved
              rightVar.dropped = true;
            }
          }
        }
      } else {
        this.addError(`Left side of assignment must be a variable`);
      }

      return rightType;
    }

    return leftType;
  };

  visitLogical_expr = (ctx: Logical_exprContext): string => {
    if (!ctx) return "error";

    if (ctx.comparison_expr().length === 1) {
      return this.visit(ctx.comparison_expr(0));
    }

    // Check all operands are boolean
    for (let i = 0; i < ctx.comparison_expr().length; i++) {
      const exprType = this.visit(ctx.comparison_expr(i));
      if (!this.isBooleanType(exprType)) {
        this.addError(
          `Logical operator expected boolean operand, got '${exprType}'`
        );
      }
    }

    return "bool";
  };

  visitComparison_expr = (ctx: Comparison_exprContext): string => {
    if (!ctx) return "error";

    if (ctx.additive_expr().length === 1) {
      return this.visit(ctx.additive_expr(0));
    }

    // Check operand compatibility for comparison
    const leftType = this.visit(ctx.additive_expr(0));

    for (let i = 1; i < ctx.additive_expr().length; i++) {
      const rightType = this.visit(ctx.additive_expr(i));

      if (!this.areTypesCompatible(leftType, rightType)) {
        this.addError(
          `Cannot compare values of types '${leftType}' and '${rightType}'`
        );
      }
    }

    return "bool";
  };

  visitAdditive_expr = (ctx: Additive_exprContext): string => {
    if (!ctx) return "error";

    if (ctx.multiplicative_expr().length === 1) {
      return this.visit(ctx.multiplicative_expr(0));
    }

    const leftType = this.visit(ctx.multiplicative_expr(0));

    for (let i = 1; i < ctx.multiplicative_expr().length; i++) {
      const rightType = this.visit(ctx.multiplicative_expr(i));

      // Addition is valid for numbers and strings
      if (
        !(
          (this.isIntegerType(leftType) && this.isIntegerType(rightType)) ||
          (this.isStringType(leftType) && this.isStringType(rightType))
        )
      ) {
        const operator = ctx.getChild(i * 2 - 1).getText();
        this.addError(
          `Operator '${operator}' not defined for types '${leftType}' and '${rightType}'`
        );
      }
    }

    return leftType;
  };

  visitMultiplicative_expr = (ctx: Multiplicative_exprContext): string => {
    if (!ctx) return "error";

    if (ctx.unary_expr().length === 1) {
      return this.visit(ctx.unary_expr(0));
    }

    const leftType = this.visit(ctx.unary_expr(0));

    for (let i = 1; i < ctx.unary_expr().length; i++) {
      const rightType = this.visit(ctx.unary_expr(i));

      // Multiplication is only valid for numbers
      if (!(this.isIntegerType(leftType) && this.isIntegerType(rightType))) {
        const operator = ctx.getChild(i * 2 - 1).getText();
        this.addError(
          `Operator '${operator}' not defined for types '${leftType}' and '${rightType}'`
        );
      }
    }

    return leftType;
  };

  visitUnary_expr = (ctx: Unary_exprContext): string => {
    if (!ctx) return "error";

    if (ctx.ref_primary_expr()) {
      return this.visit(ctx.ref_primary_expr()!);
    }

    const operand = this.visit(ctx.unary_expr()!);
    const operator = ctx.getChild(0).getText();

    if (operator === "-" && !this.isIntegerType(operand)) {
      this.addError(
        `Unary operator '-' requires numeric operand, got '${operand}'`
      );
      return "i32"; // Default to integer type
    } else if (operator === "!" && !this.isBooleanType(operand)) {
      this.addError(
        `Unary operator '!' requires boolean operand, got '${operand}'`
      );
      return "bool";
    }

    return operand;
  };

  visitRef_primary_expr = (ctx: Ref_primary_exprContext): string => {
    if (!ctx) return "error";

    // Reference operator &
    if (ctx.getText().startsWith("&")) {
      const baseType = this.visit(ctx.primary_expr()!);
      const isMut = ctx.getText().includes("mut");

      // Check if we're taking a mutable reference to an immutable variable
      if (isMut && ctx.primary_expr()?.IDENTIFIER()) {
        const varName = ctx.primary_expr()!.IDENTIFIER()!.getText();
        const variable = this.lookupVariable(varName);

        if (variable && !variable.mutable) {
          this.addError(
            `Cannot take mutable reference to immutable variable '${varName}'`
          );
        }
      }
      console.log("Ref type:", baseType, ctx.getText());
      return isMut ? `&mut ${baseType}` : `&${baseType}`;
    }

    // Dereference operator *
    if (ctx.getText().startsWith("*")) {
      const refType = this.visit(ctx.primary_expr()!);

      if (!refType.startsWith("&")) {
        this.addError(`Cannot dereference non-reference type '${refType}'`);
        return "error";
      }

      // Remove the reference part
      return refType.replace(/^&(mut\s+)?/, "");
    }

    if (ctx.primary_expr()) {
      return this.visit(ctx.primary_expr()!);
    }

    return "error";
  };

  visitPrimary_expr = (ctx: Primary_exprContext): string => {
    if (!ctx) return "error";

    if (ctx.IDENTIFIER()) {
      const varName = ctx.IDENTIFIER()!.getText();
      const variable = this.lookupVariable(varName);

      if (!variable) {
        this.addError(`Variable '${varName}' not found in scope`);
        return "error";
      }

      // Check if the variable has been dropped (ownership moved)
      if (variable.dropped && this.shouldTransferOwnership(variable.type)) {
        this.addError(`Cannot use moved value: '${varName}'`);
        return "error";
      }

      return variable.type;
    } else if (ctx.literal()) {
      return this.visit(ctx.literal()!);
    } else if (ctx.function_call()) {
      return this.visit(ctx.function_call()!);
    } else if (ctx.expression()) {
      return this.visit(ctx.expression()!);
    }

    return "error";
  };

  visitFunction_call = (ctx: Function_callContext): string => {
    if (!ctx) return "error";

    const funcName = ctx.IDENTIFIER().getText();
    const funcVar = this.lookupVariable(funcName);

    if (!funcVar) {
      this.addError(`Function '${funcName}' not found in scope`);
      return "error";
    }

    // Parse function type
    const funcType = funcVar.type;
    if (!funcType.startsWith("fn(")) {
      this.addError(`'${funcName}' is not a function`);
      return "error";
    }

    // Extract parameter types and return type
    const paramTypesMatch = funcType.match(/fn\((.*)\)\s*->\s*(.*)/);
    if (!paramTypesMatch) {
      this.addError(`Invalid function type: ${funcType}`);
      return "error";
    }

    const paramTypesStr = paramTypesMatch[1];
    const returnType = paramTypesMatch[2];

    const paramTypes = paramTypesStr
      ? paramTypesStr.split(",").map((t) => t.trim())
      : [];

    // Check argument count
    const argCount = ctx.expression().length;
    if (paramTypes.length !== argCount) {
      this.addError(
        `Function '${funcName}' expects ${paramTypes.length} arguments, got ${argCount}`
      );
    }

    // Check argument types and ownership
    for (let i = 0; i < argCount; i++) {
      const argExpr = ctx.expression(i);
      const argType = this.visit(argExpr);

      // Check if argument is an identifier that might be moved
      if (this.isExpressionSimpleIdentifier(argExpr)) {
        const argVarName = this.getIdentifierFromExpression(argExpr);
        const argVar = this.lookupVariable(argVarName);

        // Check if the variable is already dropped
        if (
          argVar &&
          argVar.dropped &&
          this.shouldTransferOwnership(argVar.type)
        ) {
          this.addError(
            `Cannot use moved value: '${argVarName}' as function argument`
          );
        }

        // If the parameter takes ownership, mark the variable as dropped
        if (
          argVar &&
          this.shouldTransferOwnership(argVar.type) &&
          !paramTypes[i].startsWith("&")
        ) {
          argVar.dropped = true;
        }
      }

      const paramType = paramTypes[i];
      if (!this.areTypesCompatible(paramType, argType) && paramType !== "any") {
        this.addError(
          `Argument ${
            i + 1
          } of '${funcName}' expects type '${paramType}', got '${argType}'`
        );
      }
    }

    return returnType;
  };

  visitType = (ctx: TypeContext): string => {
    if (!ctx) return "error";

    if (ctx.IDENTIFIER()) {
      return ctx.IDENTIFIER()!.getText();
    } else if (ctx.getText().startsWith("&")) {
      const baseType = this.visit(ctx.type_(0)!);
      const isMut = ctx.getText().includes("mut");
      return isMut ? `&mut ${baseType}` : `&${baseType}`;
    } else if (ctx.getText().startsWith("(") && ctx.getText().endsWith(")")) {
      if (ctx.type_(0)) {
        // Tuple type with one element
        return this.visit(ctx.type_(0)!);
      } else {
        return "()";
      }
    } else if (ctx.getText().startsWith("fn")) {
      // Function type
      let fnType = "fn(";

      // Parse parameter types
      if (ctx.type_().length > 1) {
        for (let i = 0; i < ctx.type_().length - 1; i++) {
          fnType += this.visit(ctx.type_(i));
          if (i < ctx.type_().length - 2) {
            fnType += ", ";
          }
        }
      }

      // Add return type
      fnType += ") -> " + this.visit(ctx.type_(ctx.type_().length - 1));

      return fnType;
    }

    this.addError(`Invalid type: ${ctx.getText()}`);
    return "error";
  };

  visitLiteral = (ctx: LiteralContext): string => {
    if (!ctx) return "error";

    if (ctx.INTEGER_LITERAL()) {
      return "i32";
    } else if (ctx.BOOLEAN_LITERAL()) {
      return "bool";
    } else if (ctx.STRING_LITERAL()) {
      return "&str";
    }

    return "error";
  };
}
