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
  While_statementContext
} from "../parser/src/RustedParser";
import { RustedVisitor } from "../parser/src/RustedVisitor";

/**
 * RustedTypeChecker is a type checker for the Rusted language.
 * It checks the types of variables, function calls, and expressions
 * to ensure they are valid according to the Rusted language rules.
 * It also manages the ownership and borrowing rules of the language.
 */

/**
 * AbstractTypeClosure is a base class for type closures.
 * It contains the type, mutability, and borrow state of a variable.
 * It is used to track the static state of variables in the environment.
 */
abstract class AbstractTypeClosure {
  constructor(
    public type: string,
    public mutable: boolean,
    public dropped: boolean = false,
    public immutableBorrow: number,
    public mutableBorrow: number,
  ) { }
}

/**
 * TypeClosure is a concrete implementation of AbstractTypeClosure.
 * It represents a variable in the environment with its type, mutability,
 * and borrow state.
 */
class TypeClosure extends AbstractTypeClosure {
  constructor(
    public type: string,
    public mutable: boolean,
    public dropped: boolean = false,
    public immutableBorrow: number,
    public mutableBorrow: number,
  ) {
    super(type, mutable, dropped, immutableBorrow, mutableBorrow);
  }
}

/*
  BorrowRef is a special kind of static variable that is used to track the
  borrow state of a variable, to restore the borrow state of a variable when
  its borrower is dropped
*/
class BorrowRef extends AbstractTypeClosure {
  constructor(
    public name: string,
    public immutableBorrow: number = 0,
    public mutableBorrow: number = 0,
  ) {
    super(name, false, false, immutableBorrow, mutableBorrow);
  }
}

/**
 * CompileTimeEnvironment is a class that represents the environment
 * in which the type checker operates.
 * 
 * It contains a map of variable names to their type closures, and a reference to
 * the parent environment.
 * 
 * It allows for nested scopes and do permit variable shadowing, by allowing the same 
 * variable name to be declared in different level of scopes.
 * 
 * It also provides methods for extending the environment, looking up variables, and 
 * checking for variable existence.
 * 
 * It is used to manage the static state of variables and their ownership in the type checker.
 */

class CompileTimeEnvironment {

  constructor(
    public bindings: Map<string, AbstractTypeClosure> = new Map(),
    public parent: CompileTimeEnvironment | null = null,
  ) { }

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

/**
 * BUILTINS is a map of built-in functions and their type closures.
 */
const BUILTINS = new Map<string, AbstractTypeClosure>([
  ["println", new TypeClosure("fn(any) -> ()", false, false, 0, 0)],
]);

/**
 * GLOBAL_ENV is the global environment for the type checker.
 * It contains the built-in functions and their type closures.
 * It is used as the parent environment for all other environments.
 */
const GLOBAL_ENV = new CompileTimeEnvironment(BUILTINS, null);

export class RustedTypeChecker extends RustedVisitor<string> {

  private env: CompileTimeEnvironment = new CompileTimeEnvironment();
  private currentFunctionReturnType: string | null = null;
  private warnMessages: string[] = [];

  // Helper methods for type management
  private isIntegerType(type: string): boolean {
    return type === "i32";
  }

  private isBooleanType(type: string): boolean {
    return type === "bool";
  }

  private isStringType(type: string): boolean {
    return type === "&str";
  }

  /*
    * Check if the type is a string literal
    * @param type The type to check
    * @returns true if the type is a string literal, false otherwise
  */
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
    return type === "&str" || (!type.startsWith("&") && !this.isIntegerType(type) && !this.isBooleanType(type));
  }

  private isRightSideIdentifier(expr: Assignment_exprContext): boolean {
    // Check if the right side is a simple identifier reference
    const logicalExpr = expr.logical_expr();
    if (!logicalExpr) return false;
    if (logicalExpr.comparison_expr().length === 1 &&
      logicalExpr.comparison_expr(0).additive_expr().length === 1 &&
      logicalExpr.comparison_expr(0).additive_expr(0).multiplicative_expr().length === 1 &&
      logicalExpr.comparison_expr(0).additive_expr(0).multiplicative_expr(0).unary_expr(0).ref_primary_expr() &&
      logicalExpr.comparison_expr(0).additive_expr(0).multiplicative_expr(0).unary_expr(0).ref_primary_expr()!.primary_expr() &&
      logicalExpr.comparison_expr(0).additive_expr(0).multiplicative_expr(0).unary_expr(0).ref_primary_expr()!.primary_expr()!.IDENTIFIER()) {
      return true;
    }
    return false;
  }

  private isLeftSideIdentifier(expr: Assignment_exprContext): boolean {
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

  private isExpressionSimpleIdentifier(expr: ExpressionContext): boolean {
    // Check if an expression is just a simple identifier
    if (!expr.assignment_expr()) return false;
    return this.isLeftSideIdentifier(expr.assignment_expr())
      && expr.assignment_expr().assignment_expr() === null;
  }

  private getIdentifierFromExpr(expr: ExpressionContext): string {
    return expr.assignment_expr().logical_expr().comparison_expr(0).additive_expr(0)
      .multiplicative_expr(0).unary_expr(0).ref_primary_expr()!.primary_expr()!.IDENTIFIER()!.getText();
  }

  // Environment management methods
  private pushEnvironment(): void {
    // Create a new environment
    const newEnv = new CompileTimeEnvironment(new Map(), this.env);
    // Push the new environment onto the stack
    this.env = newEnv;
  }

  /**
   * Pop the current environment off the stack and restore the previous one.
   * This method also handles the cleanup of borrows and ownership transfers.
   */
  private popEnvironment(): void {
    // Drop borrows that are going out of scope
    for (const [name, closure] of this.env.bindings.entries()) {
      // Check if this is a borrow reference
      if (name.startsWith('__borrow_') && name.endsWith('__')) {
        const borrowRef = closure as BorrowRef;
        const varName = borrowRef.name;

        // Find the original variable
        if (this.env.parent && this.env.parent.has(varName)) {
          const originalVar = this.env.parent.lookup(varName) as TypeClosure;

          // Release borrows
          originalVar.mutableBorrow -= borrowRef.mutableBorrow;
          originalVar.immutableBorrow -= borrowRef.immutableBorrow;
        }
      }
    }

    // Pop the current environment off the stack
    if (this.env.parent) {
      this.env = this.env.parent;
    } else {
      throw new Error("Cannot pop the global environment");
    }
  }

  /*
    * Lookup a variable in the current environment.
    * Throws an error if the variable is not found or if it has been moved.
    * 
    * @param name The name of the variable to look up.
    * @returns The TypeClosure associated with the variable.
    * @throws Error if the variable is not found or has been moved.
  */
  private lookupVariable(name: string): TypeClosure {
    if (this.env.has(name)) {
      const clos = this.env.lookup(name)!;
      if (clos.dropped) {
        throw new Error(`Cannot use moved value: '${name}'`);
      }
      return clos;
    } else {
      throw new Error(`Variable '${name}' not found in current scope`);
    }
  }

  private isDanglingAfterReturn(name: string): boolean {
    // Check if the variable is defined in the current function scope
    return this.env.bindings.has(name);
  }

  private declareVariable(name: string, type: string, mutable: boolean, immutableBorrow: number = 0, mutableBorrow: number = 0): void {
    if (this.env.has(name)) {
      throw new Error(`Variable '${name}' is already declared in this scope`);
    }
    this.env.extend(name, new TypeClosure(type, mutable, false, immutableBorrow, mutableBorrow));
  }

  public typeCheck(tree: ProgramContext): void {
    this.env.parent = GLOBAL_ENV; // Reset environment to global
    this.warnMessages = []; // Reset warn messages
    try {
      this.visit(tree);
      if (this.warnMessages.length > 0) {
        console.error("Type checking warns:");
        for (const error of this.warnMessages) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error("Type checking error:", error.message);
      throw error;
    }
  }

  // Visitor implementations
  visitProgram = (ctx: ProgramContext): string => {

    for (let i = 0; i < ctx.item().length; i++) {
      this.visit(ctx.item(i));
    }

    return "program";
  }

  visitItem = (ctx: ItemContext): string => {

    if (ctx.function()) {
      return this.visit(ctx.function()!);
    } else if (ctx.let_statement()) {
      return this.visit(ctx.let_statement()!);
    }

    return "()";
  }

  visitFunction = (ctx: FunctionContext): string => {

    const functionName = ctx.IDENTIFIER().getText();
    const returnType = this.visit(ctx.type());
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
    if (!this.areTypesCompatible(returnType, blockType)) {
      throw new Error(`Function '${functionName}' declares return type '${returnType}' but returns '${blockType}'`);
    }

    // Clean up
    this.popEnvironment();
    this.currentFunctionReturnType = null;

    // re-Store function type in function context, as the body environment is popped   
    this.declareVariable(functionName, functionType, false);

    return functionType;
  }

  visitParameter_list = (ctx: Parameter_listContext): string => {

    for (let i = 0; i < ctx.parameter().length; i++) {
      this.visit(ctx.parameter(i));
    }

    return "()";
  }

  visitParameter = (ctx: ParameterContext): string => {

    const paramName = ctx.IDENTIFIER().getText() || "unknown";
    const paramType = this.visit(ctx.type());

    // Determine if the parameter is mutable based on if it's a mutable reference
    const isMutable = paramType.startsWith("&mut ");

/*     // Determine borrow state
    let immutableBorrow = 0;
    let mutableBorrow = 0;
    if (paramType.startsWith("&mut ")) {
      mutableBorrow = 1;
    } else if (paramType.startsWith("&")) {
      immutableBorrow = 1;
    } */

    // Add parameter to function's environment
    this.declareVariable(paramName, paramType, isMutable);

    return paramType;
  }

  visitBlock = (ctx: BlockContext): string => {

    // Create new scope for block
    this.pushEnvironment();

    let blockType = "()"; // Default to unit type
    for (let i = 0; i < ctx.statement().length; i++) {
      const stmtType = this.visit(ctx.statement(i));

      // Last statement without semicolon in a block is the block's result type
      // CURRENTLY NOT WORKING BECAUSE WE FORBID THIS SYNTAX (EXPRESSION MUST END WITH SEMICOLON)
      if (i === ctx.statement().length - 1) {
        blockType = stmtType;
        const stmt = ctx.statement(i);
        if (stmt.expression_statement() && !stmt.expression_statement().getText().endsWith(";")) {
          blockType = stmtType;
        }
      }
    }

    // Clean up scope
    this.popEnvironment();
    return blockType;
  }

  visitStatement = (ctx: StatementContext): string => {

    if (ctx.let_statement()) {
      return this.visit(ctx.let_statement());
    } else if (ctx.expression_statement()) {
      return this.visit(ctx.expression_statement());
    } else if (ctx.return_statement()) {
      return this.visit(ctx.return_statement());
    } else if (ctx.block()) {
      return this.visit(ctx.block());
    } else if (ctx.if_statement()) {
      return this.visit(ctx.if_statement());
    } else if (ctx.while_statement()) {
      return this.visit(ctx.while_statement());
    } else {
      throw new Error(`Unknown statement type: ${ctx.getText()}`);
    }

  }

  visitLet_statement = (ctx: Let_statementContext): string => {

    const varName = ctx.IDENTIFIER().getText();
    const isMutable = ctx.getText().includes("mut");

    // Get the declared type
    const varType = this.visit(ctx.type());

    if (ctx.expression()) {
      const exprType = this.visit(ctx.expression());

      // Check if the declared type matches the expression type
      if (!this.areTypesCompatible(varType, exprType)) {
        throw new Error(`Cannot assign value of type '${exprType}' to variable '${varName}' of type '${varType}'`);
      }

      // Check if we're assigning from an identifier that should transfer ownership or should be borrowed
      if (this.isExpressionSimpleIdentifier(ctx.expression())) {
        const rhsVarName = this.getIdentifierFromExpr(ctx.expression());
        const rhsVar = this.lookupVariable(rhsVarName);
        const rhsVarType = this.visit(ctx.expression());
        // if the right-hand side variable is dropped, error has been thrown in lookupVariable
        // Check if the right-hand side variable is a reference
        if (rhsVarType.startsWith("&")) {
          // If it's a mutable reference, we need to check if the variable is mutable
          if (rhsVarType.startsWith("&mut ")) {

            if (!isMutable) {
              throw new Error(`Cannot assign mutable reference to immutable variable '${varName}'`);
            }
            // Check if the source variable has any existing borrows
            if (rhsVar.mutableBorrow > 0) {
              throw new Error(`Cannot borrow '${rhsVarName}' as mutable more than once at a time`);
            }
            if (rhsVar.immutableBorrow > 0) {
              throw new Error(`Cannot borrow '${rhsVarName}' as mutable because it is also borrowed as immutable`);
            }

            // Update the borrow state
            rhsVar.mutableBorrow++;
            // Create or update borrow reference in the environment
            const borrowRefId = `__borrow_${rhsVarName}__`;
            let borrowRef: BorrowRef;
            if (this.env.has(borrowRefId)) {
              // Update existing borrow reference
              borrowRef = this.env.lookup(borrowRefId) as BorrowRef;
            } else {
              // Create new borrow reference
              borrowRef = new BorrowRef(rhsVarName);
              this.env.extend(borrowRefId, borrowRef);
            }
            // Update the mutable borrow count in the reference
            borrowRef.mutableBorrow++;
          } else {
            // Immutable reference
            if (isMutable) {
              throw new Error(`Cannot assign immutable reference to mutable variable '${varName}'`);
            }

            // Immutable reference - can have multiple immutable borrows but no mutable borrows
            if (rhsVar.mutableBorrow > 0) {
              throw new Error(`Cannot borrow '${rhsVarName}' as immutable because it is also borrowed as mutable`);
            }
            // Update the borrow state
            rhsVar.immutableBorrow++;
            // Create or update borrow reference in the environment
            const borrowRefId = `__borrow_${rhsVarName}__`;
            let borrowRef: BorrowRef;

            if (this.env.has(borrowRefId)) {
              // Update existing borrow reference
              borrowRef = this.env.lookup(borrowRefId) as BorrowRef;
            } else {
              // Create new borrow reference
              borrowRef = new BorrowRef(rhsVarName);
              this.env.extend(borrowRefId, borrowRef);
            }
            // Update the immutable borrow count in the reference
            borrowRef.immutableBorrow++;
          }
        } else if (this.shouldTransferOwnership(rhsVar.type)) {

          // Cannot move a variable that has any borrows
          if (rhsVar.mutableBorrow > 0 || rhsVar.immutableBorrow > 0) {
            throw new Error(`Cannot move '${rhsVarName}' because it is borrowed`);
          }

          // If the right-hand side variable is not a reference and ownership is transferred
          // Check if mutability is compatible
          if (rhsVar.mutable && !isMutable) {
            // This is allowed: we can move from mutable to immutable
            
          } else if (!rhsVar.mutable && isMutable) {
            // This should be a warning rather than an error
            this.warnMessages.push(`Moving immutable value '${rhsVarName}' to mutable variable '${varName}'`);
          }
          // Mark the source variable as dropped (ownership moved)
          // console.log(`Moving ownership of '${rhsVarName}' to '${varName}'`);
          rhsVar.dropped = true;
        }
      }
    } else {
      // No initializer - report uninitialized variable
      throw new Error(`Variable '${varName}' declared but not initialized`);
    }

    // Declare the variable in the current environment
    this.declareVariable(varName, varType, isMutable);

    return "()";
  }

  visitExpression_statement = (ctx: Expression_statementContext): string => {

    return this.visit(ctx.expression());
  }

  visitReturn_statement = (ctx: Return_statementContext): string => {
    const retrunIsIdentifier = this.isExpressionSimpleIdentifier(ctx.expression());
    const returnType = this.visit(ctx.expression());
    // Check if return type matches function return type
    if (this.currentFunctionReturnType && !this.areTypesCompatible(this.currentFunctionReturnType, returnType)) {
      throw new Error(`Return type '${returnType}' doesn't match function return type '${this.currentFunctionReturnType}'`);
    }
    if (retrunIsIdentifier) {
      const varName = this.getIdentifierFromExpr(ctx.expression());
      // Check if the return value is a dangling reference
      if (this.isDanglingAfterReturn(varName)) {
        throw new Error(`Cannot return potential dangling reference to '${ctx.expression().getText()}'`);
      }
    }
    return returnType;
  }

  visitIf_statement = (ctx: If_statementContext): string => {

    // Check condition type
    const condType = this.visit(ctx.expression());
    if (!this.isBooleanType(condType)) {
      throw new Error(`If condition must be a boolean, got '${condType}'`);
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
    if (this.areTypesCompatible(ifBlockType, elseBlockType)) {
      return ifBlockType;
    }
    return "()";
  }

  visitWhile_statement = (ctx: While_statementContext): string => {

    // Check condition type
    const condType = this.visit(ctx.expression());
    if (!this.isBooleanType(condType)) {
      throw new Error(`While condition must be a boolean, got '${condType}'`);
    }

    // Visit block
    this.visit(ctx.block());

    // while always returns unit type
    return "()";
  }

  visitExpression = (ctx: ExpressionContext): string => {
    return this.visit(ctx.assignment_expr());
  }

  visitAssignment_expr = (ctx: Assignment_exprContext): string => {
    const leftType = this.visit(ctx.logical_expr());
    if (ctx.assignment_expr()) {
      // This is an assignment more of a logical expression
      const rightExpr = ctx.assignment_expr();
      const rightType = this.visit(rightExpr);
      // Check if left side is an identifier (for mutability check)
      const leftExpr = ctx.logical_expr();
      if (this.isLeftSideIdentifier(ctx)) {
        // Get the variable name and closure from the left side
        const leftVarName = leftExpr.comparison_expr(0).additive_expr(0)
          .multiplicative_expr(0).unary_expr(0).ref_primary_expr()!.primary_expr()!.IDENTIFIER()!.getText();
        const leftClosure = this.lookupVariable(leftVarName);
        // If left is moved, error has been thrown in lookupVariable
        
        // if the left side have borrows, disable assignment
        if (leftClosure.mutableBorrow > 0 || leftClosure.immutableBorrow > 0) {
          throw new Error(`Cannot assign to '${leftVarName}' because it is borrowed`);
        }

        // Check if the left side is mutable
        if (!leftClosure.mutable) {
          throw new Error(`Cannot assign to immutable variable '${leftVarName}'`);
        }

        if (!this.areTypesCompatible(leftType, rightType)) {
          throw new Error(`Cannot assign value of type '${rightType}' to variable '${leftVarName}' of type '${leftType}'`);
        }
        // Check right side for identifier that might be moved / borrowed
        if (this.isRightSideIdentifier(rightExpr)) {
          const rightVarName = rightExpr.logical_expr().comparison_expr(0).additive_expr(0)
          .multiplicative_expr(0).unary_expr(0).ref_primary_expr()!.primary_expr()!.IDENTIFIER()!.getText();
          const rightClosure = this.lookupVariable(rightVarName);
          // Borrow or Move
          if (rightType.startsWith('&')) {
            const isMut = rightType.startsWith('&mut ');
            // Create or update borrow reference for the variable
            const borrowedId = `__borrow_${rightVarName}__`;
            let borrowRef: BorrowRef;

            if (this.env.has(borrowedId)) {
              // Update existing borrow reference
              borrowRef = this.env.lookup(borrowedId) as BorrowRef;
            } else {
              // Create new borrow reference
              borrowRef = new BorrowRef(rightVarName);
              this.env.extend(borrowedId, borrowRef);
            }

            // Update the borrow state based on type of borrow
            if (isMut) {
              // Mutable borrow - must ensure no other borrows exist
              if (rightClosure.mutableBorrow > 0 || rightClosure.immutableBorrow > 0) {
                throw new Error(`Cannot borrow '${rightVarName}' as mutable because it is already borrowed`);
              }
              rightClosure.mutableBorrow++;
              borrowRef.mutableBorrow++;
            } else {
              // Immutable borrow - must ensure no mutable borrows exist
              if (rightClosure.mutableBorrow > 0) {
                throw new Error(`Cannot borrow '${rightVarName}' as immutable because it is already mutably borrowed`);
              }
              rightClosure.immutableBorrow++;
              borrowRef.immutableBorrow++;
            }
          } else { // should be moved
            if (this.shouldTransferOwnership(rightClosure.type)) {
              // Mark the right variable as dropped/moved
              rightClosure.dropped = true;
            }
          }
        }
      } else {
        throw new Error(`Left side of assignment must be an identifier, got '${leftExpr.getText()}'`);
      }
      return '()';
    } else {
      // No assignment, just return the type of the logical expression
      return leftType;
    }
  }

  visitLogical_expr = (ctx: Logical_exprContext): string => {

    if (ctx.comparison_expr().length === 1) {
      return this.visit(ctx.comparison_expr(0));
    }

    // Check all operands are boolean
    for (let i = 0; i < ctx.comparison_expr().length; i++) {
      const exprType = this.visit(ctx.comparison_expr(i));
      if (!this.isBooleanType(exprType)) {
        throw new Error(`Logical operator expected boolean operand, got '${exprType}'`);
      }
    }

    return "bool";
  }

  visitComparison_expr = (ctx: Comparison_exprContext): string => {

    if (ctx.additive_expr().length === 1) {
      return this.visit(ctx.additive_expr(0));
    }

    // Check operand compatibility for comparison
    const leftType = this.visit(ctx.additive_expr(0));

    for (let i = 1; i < ctx.additive_expr().length; i++) {
      const rightType = this.visit(ctx.additive_expr(i));

      if (!this.areTypesCompatible(leftType, rightType)) {
        throw new Error(`Cannot compare values of types '${leftType}' and '${rightType}'`);
      }
    }

    return "bool";
  }

  visitAdditive_expr = (ctx: Additive_exprContext): string => {

    if (ctx.multiplicative_expr().length === 1) {
      return this.visit(ctx.multiplicative_expr(0));
    }

    const leftType = this.visit(ctx.multiplicative_expr(0));

    for (let i = 1; i < ctx.multiplicative_expr().length; i++) {
      const rightType = this.visit(ctx.multiplicative_expr(i));

      // Addition is valid for numbers and strings
      if (!(
        (this.isIntegerType(leftType) && this.isIntegerType(rightType)) ||
        (this.isStringType(leftType) && this.isStringType(rightType))
      )) {
        const operator = ctx.getChild(i * 2 - 1).getText();
        throw new Error(`Operator '${operator}' not defined for types '${leftType}' and '${rightType}'`);
      }
    }

    return leftType;
  }

  visitMultiplicative_expr = (ctx: Multiplicative_exprContext): string => {
    if (ctx.unary_expr().length === 1) {
      return this.visit(ctx.unary_expr(0));
    }

    const leftType = this.visit(ctx.unary_expr(0));
    for (let i = 1; i < ctx.unary_expr().length; i++) {
      const rightType = this.visit(ctx.unary_expr(i));

      // Multiplication is only valid for numbers
      if (!(this.isIntegerType(leftType) && this.isIntegerType(rightType))) {
        const operator = ctx.getChild(i * 2 - 1).getText();
        throw new Error(`Operator '${operator}' not defined for types '${leftType}' and '${rightType}'`);
      }
    }
    return leftType;
  }

  visitUnary_expr = (ctx: Unary_exprContext): string => {
    if (ctx.ref_primary_expr()) {
      return this.visit(ctx.ref_primary_expr());
    } else if (ctx.unary_expr()) {
      // Visit the inner unary expression
      const operandType = this.visit(ctx.unary_expr());
      const operator = ctx.getChild(0).getText();

      if (operator === "-") {
        if (!this.isIntegerType(operandType)) {
          throw new Error(`Unary operator '-' requires numeric operand, got '${operandType}'`);
        } else {
          return "i32";
        }
      } else if (operator === "!") {
        if (!this.isBooleanType(operandType)) {
          throw new Error(`Unary operator '!' requires boolean operand, got '${operandType}'`);
        } else {
          return "bool";
        }
      } else {
        throw new Error(`Unknown unary operator: '${operator}'`);
      }
    } else {
      throw new Error(`Unknown unary expression type: ${ctx.getText()}`);
    }
  }

  visitRef_primary_expr = (ctx: Ref_primary_exprContext): string => {

    // Reference operator &
    if (ctx.getText().startsWith("&")) {
      const baseType = this.visit(ctx.primary_expr());
      const isMut = ctx.getText().includes("mut");

      // Check if we're taking a mutable reference to an immutable variable
      if (isMut && ctx.primary_expr()?.IDENTIFIER()) {
        const varName = ctx.primary_expr()!.IDENTIFIER().getText();
        const variable = this.lookupVariable(varName);

        if (!variable.mutable) {
          throw new Error(`Cannot take mutable reference to immutable variable '${varName}'`);
        }
      }
      return isMut ? `&mut ${baseType}` : `&${baseType}`;
    } else if (ctx.getText().startsWith("*")) {
      // Dereference operator *
      const refType = this.visit(ctx.primary_expr());
      if (!refType.startsWith("&")) {
        throw new Error(`Cannot dereference non-reference type '${refType}'`);
      }
      // Remove the reference part
      return refType.replace(/^&(mut\s+)?/, "");
    } else if (ctx.primary_expr()) {
      return this.visit(ctx.primary_expr()!);
    } else {
      throw new Error(`Unknown reference expression type: ${ctx.getText()}`);
    }
  }

  visitPrimary_expr = (ctx: Primary_exprContext): string => {

    if (ctx.IDENTIFIER()) {
      const varName = ctx.IDENTIFIER().getText();
      const varClosure = this.lookupVariable(varName);
      return varClosure.type;
    } else if (ctx.literal()) {
      return this.visit(ctx.literal());
    } else if (ctx.function_call()) {
      return this.visit(ctx.function_call());
    } else if (ctx.expression()) {
      return this.visit(ctx.expression());
    } else {
      throw new Error(`Unknown primary expression type: ${ctx.getText()}`);
    }
  }

  visitFunction_call = (ctx: Function_callContext): string => {
    const funcName = ctx.IDENTIFIER().getText();
    const funcTypeClosure = this.lookupVariable(funcName);

    const funcType = funcTypeClosure.type;
    if (!funcType.startsWith("fn(")) {
      throw new Error(`'${funcType}' is not a valid function type`);
    }
    // Extract parameter types and return type
    const paramTypesMatch = funcType.match(/fn\((.*)\)\s*->\s*(.*)/);
    if (!paramTypesMatch) {
      throw new Error(`Invalid function type: '${funcType}'`);
    }

    const paramTypes = paramTypesMatch[1] ?
      paramTypesMatch[1].split(",").map(t => t.trim()) : [];
    const returnType = paramTypesMatch[2];

    const argCount = ctx.expression().length;
    if (paramTypes.length !== argCount) {
      throw new Error(`Function '${funcName}' expects ${paramTypes.length} arguments, got ${argCount}`);
    }

    // Check argument types and ownership
    for (let i = 0; i < argCount; i++) {
      const argExpr = ctx.expression(i);
      const argType = this.visit(argExpr);

      // Check if argument is an identifier that might be moved / borrowed
      if (this.isExpressionSimpleIdentifier(argExpr)) {
        const argVarName = this.getIdentifierFromExpr(argExpr);
        const argClosure = this.lookupVariable(argVarName);
        // if variable is dropped, error has been thrown in lookupVariable
        if (argType.startsWith("&")) {
          const isMutableRef = argType.startsWith("&mut");
          // If the parameter is a mutable reference, check if the variable is mutable
          if (isMutableRef) {
            if (!argClosure.mutable) {
              throw new Error(`Cannot borrow immutable variable '${argVarName}' as mutable`);
            }

            // Check if the variable has any existing borrows that would prevent this borrow
            if (argClosure.mutableBorrow > 0) {
              throw new Error(`Cannot borrow '${argVarName}' as mutable more than once at a time`);
            }

            if (argClosure.immutableBorrow > 0) {
              throw new Error(`Cannot borrow '${argVarName}' as mutable because it is also borrowed as immutable`);
            }

          } else {
            // Immutable reference - can have multiple immutable borrows but no mutable borrows
            if (argClosure.mutableBorrow > 0) {
              throw new Error(`Cannot borrow '${argVarName}' as immutable because it is already borrowed as mutable`);
            }
          
          }
        }
        // If the parameter takes ownership, mark the variable as dropped
        else {
          // Cannot move a variable that has any borrows
          //console.log(funcName, this.env.parent.bindings)
          if (argClosure.mutableBorrow > 0 || argClosure.immutableBorrow > 0) {
            throw new Error(`Cannot call with '${argVarName}' because it is borrowed`);
          }
          // Mark the variable as dropped (ownership moved)
          argClosure.dropped = true;
        }
      }

      const paramType = paramTypes[i];
      if (!this.areTypesCompatible(paramType, argType) && paramType !== "any") {
        throw new Error(`Argument ${i + 1} of '${funcName}' expects type '${paramType}', got '${argType}'`);
      }
    }
    return returnType;
  }

  visitType = (ctx: TypeContext): string => {

    if (ctx.IDENTIFIER()) {
      return ctx.IDENTIFIER().getText();
    } else if (ctx.getText().startsWith("&")) {
      const baseType = this.visit(ctx.type_(0));
      const isMut = ctx.getText().includes("mut");
      return isMut ? `&mut ${baseType}` : `&${baseType}`;
    } else if (ctx.getText().startsWith("(") && ctx.getText().endsWith(")")) {
      if (ctx.type_(0)) {
        // Tuple type with one element
        return this.visit(ctx.type_(0)!);
      } else {
        return '()';
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
    } else {
      throw new Error(`Unknown type: ${ctx.getText()}`);
    }
  }

  visitLiteral = (ctx: LiteralContext): string => {
    if (ctx.INTEGER_LITERAL()) {
      return "i32";
    } else if (ctx.BOOLEAN_LITERAL()) {
      return "bool";
    } else if (ctx.STRING_LITERAL()) {
      return "str";
    } else {
      throw new Error(`Unknown literal type: ${ctx.getText()}`);
    }
  }
}