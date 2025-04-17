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
import {
  RustedVisitor
} from "../parser/src/RustedVisitor";
import {
  BorrowRef,
  BUILTINS_TYPES,
  CompileTimeEnvironment,
  TypeClosure
} from "./CompileTimeEnvironment";
import {
  areTypesCompatible,
  getIdentifierFromExpr,
  isBooleanType,
  isExpressionSimpleIdentifier,
  isIntegerType,
  isLeftSideIdentifier,
  isRightSideIdentifier,
  isStringType,
  shouldTransferOwnership
} from "./utils";


/**
 * RustedTypeChecker is a type checker for the Rusted language.
 * It checks the types of variables, function calls, and expressions
 * to ensure they are valid according to the Rusted language rules.
 * It also manages the ownership and borrowing rules of the language.
 */


/**
 * GLOBAL_ENV is the global environment for the type checker.
 * It contains the built-in functions and their type closures.
 * It is used as the parent environment for all other environments.
 */
const GLOBAL_ENV = new CompileTimeEnvironment(BUILTINS_TYPES, null);

/**
 * RustedTypeChecker is a class that implements the type checker for the Rusted language.
 * It extends the RustedVisitor class and implements the visit methods for each node type.
 * It checks the types of variables, function calls, and expressions to ensure they are valid
 * according to the Rusted language rules.
 */
export class RustedTypeChecker extends RustedVisitor<string> {
  // The current environment for the type checker
  private env: CompileTimeEnvironment = new CompileTimeEnvironment();

  // The current function return type, used for checking return statements
  private currentFunctionReturnType: string | null = null;

  // List of warning messages
  private warnMessages: string[] = [];

  // Environment management methods

  /**
   * Push a new environment onto the stack.
   * This method creates a new environment and sets it as the current environment.
   */
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

    // Release borrows that are going out of scope, by traverse
    // the current level of the environment and release all borrowRefs
    // that are going out of scope
    for (const [name, closure] of this.env.bindings.entries()) {
      // Check if this is a borrow reference
      if (name.startsWith("__borrow_") && name.endsWith("__")) {
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

  /**
   * Check if the reference to a varaible is dangling after a return statement.
   * @param name The name of the variable to check.
   * @returns true if the variable is dangling, false otherwise.
   */
  private isDanglingAfterReturn(name: string): boolean {
    // Check if the variable is defined in the current function scope
    return this.env.bindings.has(name);
  }

  /**
   * Declare a variable in the current environment.
   * @param name The name of the variable to declare.
   * @param type The type of the variable.
   * @param mutable Whether the variable is mutable or not.
   * @param immutableBorrow The number of immutable borrows for the variable. Default is 0.
   * @param mutableBorrow The number of mutable borrows for the variable. Default is 0.
   */
  private declareVariable(
    name: string,
    type: string,
    mutable: boolean,
    immutableBorrow: number = 0,
    mutableBorrow: number = 0
  ): void {
    if (this.env.has(name)) {
      throw new Error(`Variable '${name}' is already declared in this scope`);
    }
    this.env.extend(
      name,
      new TypeClosure(type, mutable, false, immutableBorrow, mutableBorrow)
    );
  }

  /**
   * Type check the program. Main entry point for the type checker.
   * @param tree The parse tree of the program.
   * @returns The type of the program.
   */
  public typeCheck(tree: ProgramContext): string {
    this.env.parent = GLOBAL_ENV; // Reset environment to global
    this.warnMessages = []; // Reset warn messages
    try {
      const res = this.visit(tree);
      if (this.warnMessages.length > 0) {
        console.error("Type checking warns:");
        for (const error of this.warnMessages) {
          console.error(error);
        }
      }
      return res;
    } catch (error) {
      // console.error("Type checking error:", error.message);
      throw error;
    }
  }

  // Visitor implementations

  /**
   * Check the type of the program.
   * @param ctx The context of the program node.
   * @returns the type of the program.
   */
  visitProgram = (ctx: ProgramContext): string => {
    let programType = "()";
    for (let i = 0; i < ctx.item().length; i++) {
      programType = this.visit(ctx.item(i));
    }

    return programType;
  };

  /**
   * Check the type of an item.
   * @param ctx The context of the item node.
   * @returns the type of the item.
   */
  visitItem = (ctx: ItemContext): string => {
    if (ctx.function()) {
      return this.visit(ctx.function()!);
    } else if (ctx.let_statement()) {
      return this.visit(ctx.let_statement()!);
    }

    return "()";
  };

  /**
   * Check the type of a function.
   * @param ctx The context of the function node.
   * @returns the type of the function.
   */
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

    // Pre-declare the function in the environment so that it can be called recursively
    this.declareVariable(functionName, functionType, false);

    // Process function body
    const blockType = this.visit(ctx.block());
    // Check if block type matches return type
    if (!areTypesCompatible(returnType, blockType)) {
      throw new Error(
        `Function '${functionName}' declares return type '${returnType}' but returns '${blockType}'`
      );
    }

    // Clean up
    this.popEnvironment();
    this.currentFunctionReturnType = null;

    // Restore the type of function in the context where function is defined, as the body environment is popped.
    // So that the function can be called later
    this.declareVariable(functionName, functionType, false);

    return functionType;
  };

  /**
   * Check the type of a function call.
   * @param ctx The context of the function call node.
   * @returns the type of the function call.
   */
  visitParameter_list = (ctx: Parameter_listContext): string => {
    // Process each parameter in the parameter list
    for (let i = 0; i < ctx.parameter().length; i++) {
      this.visit(ctx.parameter(i));
    }

    // Return type of parameter list is unit type
    return "()";
  };

  /**
   * Check the type of a parameter.
   * @param ctx The context of the parameter node.
   * @returns the type of the parameter.
   */
  visitParameter = (ctx: ParameterContext): string => {
    const paramName = ctx.IDENTIFIER().getText();
    const paramType = this.visit(ctx.type());

    // Determine if the parameter is mutable based on if it's a mutable reference
    const isMutable = paramType.startsWith("&mut ");

    /*// Determine borrow state
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
  };

  /**
   * Check the type of a block.
   * @param ctx The context of the block node.
   * @returns the type of the block.
   * TODO: Change the syntax to allow non-terminated expressions in blocks so that the block can have type
   */
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
        if (
          stmt.expression_statement() &&
          !stmt.expression_statement().getText().endsWith(";")
        ) {
          blockType = stmtType;
        }
      }
    }

    // Clean up scope
    this.popEnvironment();

    return blockType;
  };

  /**
   * Check the type of a statement.
   * @param ctx The context of the statement node.
   * @returns the type of the statement.
   */
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
  };

  /**
   * Check the type of a let statement.
   * @param ctx The context of the let statement node.
   * @returns the type of the let statement.
   */
  visitLet_statement = (ctx: Let_statementContext): string => {
    const varName = ctx.IDENTIFIER().getText();
    const isMutable = ctx.getText().includes("mut");

    // Get the declared type
    const varType = this.visit(ctx.type());

    if (ctx.expression()) {
      const exprType = this.visit(ctx.expression());

      // Check if the declared type matches the expression type
      if (!areTypesCompatible(varType, exprType)) {
        throw new Error(
          `Cannot assign value of type '${exprType}' to variable '${varName}' of type '${varType}'`
        );
      }

      // Check if we're assigning from an identifier that should transfer ownership or should be borrowed
      if (isExpressionSimpleIdentifier(ctx.expression())) {
        const rhsVarName = getIdentifierFromExpr(ctx.expression());
        const rhsVar = this.lookupVariable(rhsVarName);
        const rhsVarType = this.visit(ctx.expression());
        // if the right-hand side variable is dropped, error has been thrown in lookupVariable
        // Check if the right-hand side variable is a reference
        if (rhsVarType.startsWith("&")) {
          // If it's a mutable reference, we need to check if the variable is mutable
          if (rhsVarType.startsWith("&mut ")) {
            if (!isMutable) {
              throw new Error(
                `Cannot assign mutable reference to immutable variable '${varName}'`
              );
            }
            // Check if the source variable has any existing borrows
            if (rhsVar.mutableBorrow > 0) {
              throw new Error(
                `Cannot borrow '${rhsVarName}' as mutable more than once at a time`
              );
            }
            if (rhsVar.immutableBorrow > 0) {
              throw new Error(
                `Cannot borrow '${rhsVarName}' as mutable because it is also borrowed as immutable`
              );
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
              throw new Error(
                `Cannot assign immutable reference to mutable variable '${varName}'`
              );
            }

            // Immutable reference - can have multiple immutable borrows but no mutable borrows
            if (rhsVar.mutableBorrow > 0) {
              throw new Error(
                `Cannot borrow '${rhsVarName}' as immutable because it is also borrowed as mutable`
              );
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
        } else if (shouldTransferOwnership(rhsVar.type)) {
          // Cannot move a variable that has any borrows
          if (rhsVar.mutableBorrow > 0 || rhsVar.immutableBorrow > 0) {
            throw new Error(
              `Cannot move '${rhsVarName}' because it is borrowed`
            );
          }

          // If the right-hand side variable is not a reference and ownership is transferred
          // Check if mutability is compatible
          if (rhsVar.mutable && !isMutable) {
            // This is allowed: we can move from mutable to immutable
          } else if (!rhsVar.mutable && isMutable) {
            // This should be a warning rather than an error
            this.warnMessages.push(
              `Moving immutable value '${rhsVarName}' to mutable variable '${varName}'`
            );
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

    // Return type of let statement is unit type
    return "()";
  };

  /**
   * Check the type of a general expression.
   * @param ctx The context of the general expression node.
   * @returns the type of the general expression node.
   */
  visitExpression_statement = (ctx: Expression_statementContext): string => {
    return this.visit(ctx.expression());
  };

  /**
   * Check the type of a return statement.
   * @param ctx The context of the return statement node.
   * @returns the type of the return statement.
   */
  visitReturn_statement = (ctx: Return_statementContext): string => {
    // Check if the return statement returns a identifier
    const retrunIsIdentifier = isExpressionSimpleIdentifier(
      ctx.expression()
    );
    const returnType = this.visit(ctx.expression());
    // Check if return type matches function return type
    if (
      this.currentFunctionReturnType &&
      !areTypesCompatible(this.currentFunctionReturnType, returnType)
    ) {
      throw new Error(
        `Return type '${returnType}' doesn't match function return type '${this.currentFunctionReturnType}'`
      );
    }

    // Avoid dangling references
    if (retrunIsIdentifier) {
      const varName = getIdentifierFromExpr(ctx.expression());
      // Check if the return value is a dangling reference
      if (this.isDanglingAfterReturn(varName)) {
        throw new Error(
          `Cannot return potential dangling reference to '${ctx
            .expression()
            .getText()}'`
        );
      }
    }
    return returnType;
  };

  /**
   * Check the type of a if statement.
   * @param ctx The context of the if statement node.
   * @returns the type of the if statement.
   * The if statement have a type if both branches return compatible types. otherwise, it returns unit type.
   */
  visitIf_statement = (ctx: If_statementContext): string => {
    // Check condition type
    const condType = this.visit(ctx.expression());
    if (!isBooleanType(condType)) {
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
    if (areTypesCompatible(ifBlockType, elseBlockType)) {
      return ifBlockType;
    }
    return "()";
  };

  /**
   * Check the type of a while statement.
   * @param ctx The context of the while statement node.
   * @returns the type of the while statement.
   */
  visitWhile_statement = (ctx: While_statementContext): string => {
    // Check condition type
    const condType = this.visit(ctx.expression());
    if (!isBooleanType(condType)) {
      throw new Error(`While condition must be a boolean, got '${condType}'`);
    }

    // Visit block
    this.visit(ctx.block());

    // while always returns unit type
    return "()";
  };

  /*
    The expressions are constructed in order of computational precedence.
    The precedence of the expressions is as follows:
    1. Primary expression
    2. Unary expression
    3. Multiplicative expression
    4. Additive expression
    5. Comparison expression
    6. Logical expression
    7. Assignment expression
    8. Expression
    The expressions are checked in the order of their precedence.
   */
  /**
   * Check general expression.
   * @param ctx The context of the expression node.
   * @returns the type of the expression.
   */
  visitExpression = (ctx: ExpressionContext): string => {
    return this.visit(ctx.assignment_expr());
  };

  /**
   * Check the type of a assignment expression.
   * @param ctx The context of the assignment expression node.
   * @returns the type of the assignment expression.
   */
  visitAssignment_expr = (ctx: Assignment_exprContext): string => {
    // It could be a logical expression or an assignment expression
    const leftType = this.visit(ctx.logical_expr());
    if (ctx.assignment_expr()) {
      // This is an assignment more of a logical expression
      const leftExpr = ctx.logical_expr();
      const rightExpr = ctx.assignment_expr();
      const rightType = this.visit(rightExpr);
      // Check if left side is an identifier (for mutability check)
      if (isLeftSideIdentifier(ctx)) {
        // Get the variable name and closure from the left side
        const leftVarName = leftExpr
          .comparison_expr(0)
          .additive_expr(0)
          .multiplicative_expr(0)
          .unary_expr(0)
          .ref_primary_expr()!
          .primary_expr()!
          .IDENTIFIER()!
          .getText();
        const leftClosure = this.lookupVariable(leftVarName);
        // If left is moved, error has been thrown in lookupVariable

        // if the left side have borrows, disable assignment
        if (leftClosure.mutableBorrow > 0 || leftClosure.immutableBorrow > 0) {
          throw new Error(
            `Cannot assign to '${leftVarName}' because it is borrowed`
          );
        }

        if (leftClosure.mutable && rightType.startsWith("&")  && !rightType.startsWith("&mut ")) {
          throw new Error('Cannot assign immutable reference to mutable variable');
        }

        // Check if the left side is mutable
        if (!leftClosure.mutable) {
          throw new Error(
            `Cannot assign to immutable variable '${leftVarName}'`
          );
        }

        if (!areTypesCompatible(leftType, rightType)) {
          throw new Error(
            `Cannot assign value of type '${rightType}' to variable '${leftVarName}' of type '${leftType}'`
          );
        }

        // Check right side for identifier that might be moved / borrowed
        if (isRightSideIdentifier(ctx)) {
          const rightVarName = rightExpr
            .logical_expr()
            .comparison_expr(0)
            .additive_expr(0)
            .multiplicative_expr(0)
            .unary_expr(0)
            .ref_primary_expr()!
            .primary_expr()!
            .IDENTIFIER()!
            .getText();
          const rightClosure = this.lookupVariable(rightVarName);
          // Borrow or Move
          if (rightType.startsWith("&")) {
            const isMut = rightType.startsWith("&mut ");
            // Create or update borrow reference for the variable
            const borrowedId = `__borrow_${rightVarName}__`;
            let borrowRef: BorrowRef;

            // If left side is not local, assignment will cause dangling reference
            if (!this.env.bindings.has(leftVarName)) {
              throw new Error(
                `Assigned reference to '${rightVarName}' have a shorter lifetime than '${leftVarName}'`
              );
            }

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
              if (
                rightClosure.mutableBorrow > 0 ||
                rightClosure.immutableBorrow > 0
              ) {
                throw new Error(
                  `Cannot borrow '${rightVarName}' as mutable because it is already borrowed`
                );
              }
              rightClosure.mutableBorrow++;
              borrowRef.mutableBorrow++;
            } else {
              // Immutable borrow - must ensure no mutable borrows exist
              if (rightClosure.mutableBorrow > 0) {
                throw new Error(
                  `Cannot borrow '${rightVarName}' as immutable because it is already mutably borrowed`
                );
              }
              rightClosure.immutableBorrow++;
              borrowRef.immutableBorrow++;
            }
          } else {
            // should be moved
            if (shouldTransferOwnership(rightClosure.type)) {
              // Mark the right variable as dropped/moved
              rightClosure.dropped = true;
            }
          }
        }
      } else {
        throw new Error(
          `Left side of assignment must be an identifier, got '${leftExpr.getText()}'`
        );
      }
      // Return type of assignment is unit type
      return "()";
    } else {
      // No assignment, just return the type of the logical expression
      return leftType;
    }
  };

  /**
   * Check the type of a logical expression.
   * @param ctx The context of the logical expression node.
   * @returns the type of the logical expression.
   */
  visitLogical_expr = (ctx: Logical_exprContext): string => {
    if (ctx.comparison_expr().length === 1) {
      return this.visit(ctx.comparison_expr(0));
    }

    // Check all operands are boolean
    for (let i = 0; i < ctx.comparison_expr().length; i++) {
      const exprType = this.visit(ctx.comparison_expr(i));
      if (!isBooleanType(exprType)) {
        throw new Error(
          `Logical operator expected boolean operand, got '${exprType}'`
        );
      }
    }

    return "bool";
  };

  /**
   * Check the type of a comparison expression.
   * @param ctx The context of the comparison expression node.
   * @returns the type of the comparison expression.
   */
  visitComparison_expr = (ctx: Comparison_exprContext): string => {
    if (ctx.additive_expr().length === 1) {
      return this.visit(ctx.additive_expr(0));
    }

    // Check operand compatibility for comparison
    const leftType = this.visit(ctx.additive_expr(0));

    for (let i = 1; i < ctx.additive_expr().length; i++) {
      const rightType = this.visit(ctx.additive_expr(i));

      if (!areTypesCompatible(leftType, rightType)) {
        throw new Error(
          `Cannot compare values of types '${leftType}' and '${rightType}'`
        );
      }
    }

    return "bool";
  };

  /**
   * Check the type of an additive expression.
   * @param ctx The context of the additive expression node.
   * @returns the type of the additive expression.
   */
  visitAdditive_expr = (ctx: Additive_exprContext): string => {
    if (ctx.multiplicative_expr().length === 1) {
      return this.visit(ctx.multiplicative_expr(0));
    }

    const leftType = this.visit(ctx.multiplicative_expr(0));

    for (let i = 1; i < ctx.multiplicative_expr().length; i++) {
      const rightType = this.visit(ctx.multiplicative_expr(i));

      // Addition is valid for numbers and strings
      if (
        !(
          (isIntegerType(leftType) && isIntegerType(rightType)) ||
          (isStringType(leftType) && isStringType(rightType))
        )
      ) {
        const operator = ctx.getChild(i * 2 - 1).getText();
        throw new Error(
          `Operator '${operator}' not defined for types '${leftType}' and '${rightType}'`
        );
      }
    }

    return leftType;
  };

  /**
   * Check the type of a multiplicative expression.
   * @param ctx The context of the multiplicative expression node.
   * @returns the type of the multiplicative expression.
   */
  visitMultiplicative_expr = (ctx: Multiplicative_exprContext): string => {
    if (ctx.unary_expr().length === 1) {
      return this.visit(ctx.unary_expr(0));
    }

    const leftType = this.visit(ctx.unary_expr(0));
    for (let i = 1; i < ctx.unary_expr().length; i++) {
      const rightType = this.visit(ctx.unary_expr(i));

      // Multiplication is only valid for numbers
      if (!(isIntegerType(leftType) && isIntegerType(rightType))) {
        const operator = ctx.getChild(i * 2 - 1).getText();
        throw new Error(
          `Operator '${operator}' not defined for types '${leftType}' and '${rightType}'`
        );
      }
    }
    return leftType;
  };

  /**
   * Check the type of a unary expression.
   * @param ctx The context of the unary expression node.
   * @returns the type of the unary expression.
   */
  visitUnary_expr = (ctx: Unary_exprContext): string => {
    if (ctx.ref_primary_expr()) {
      return this.visit(ctx.ref_primary_expr());
    } else if (ctx.unary_expr()) {
      // Visit the inner unary expression
      const operandType = this.visit(ctx.unary_expr());
      const operator = ctx.getChild(0).getText();

      // Check the operator and operand type
      if (operator === "-") {
        if (!isIntegerType(operandType)) {
          throw new Error(
            `Unary operator '-' requires numeric operand, got '${operandType}'`
          );
        } else {
          return "i32";
        }
      } else if (operator === "!") {
        if (!isBooleanType(operandType)) {
          throw new Error(
            `Unary operator '!' requires boolean operand, got '${operandType}'`
          );
        } else {
          return "bool";
        }
      } else {
        throw new Error(`Unknown unary operator: '${operator}'`);
      }
    } else {
      throw new Error(`Unknown unary expression type: ${ctx.getText()}`);
    }
  };

  /**
   * Check the type of a reference expression.
   * @param ctx The context of the reference expression node.
   * @returns the type of the reference expression.
   */
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
          throw new Error(
            `Cannot take mutable reference to immutable variable '${varName}'`
          );
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
  };

  /**
   * Check the type of a primary expression (unreferenced).
   * @param ctx The context of the primary expression node.
   * @returns the type of the primary expression.
   */
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
  };

  /**
   * Check the type of a function call.
   * @param ctx The context of the function call node.
   * @returns the type of the function call.
   */
  visitFunction_call = (ctx: Function_callContext): string => {
    const funcName = ctx.IDENTIFIER().getText();
    const funcTypeClosure = this.lookupVariable(funcName);

    const funcType = funcTypeClosure.type;
    if (!funcType.startsWith("fn(")) {
      throw new Error(`'${funcType}' is not a valid function type`);
    }
    // Extract parameter types and return type
    const paramTypesMatch = funcType.match(/fn\((.*)\)\s*->\s*(.*)/);
    // Check if the function type is valid
    if (!paramTypesMatch) {
      throw new Error(`Invalid function type: '${funcType}'`);
    }

    // Preprocess parameter types
    const paramTypes = paramTypesMatch[1]
      ? paramTypesMatch[1].split(",").map((t) => t.trim())
      : [];
    const returnType = paramTypesMatch[2];

    const argCount = ctx.expression().length;
    if (paramTypes.length !== argCount) {
      throw new Error(
        `Function '${funcName}' expects ${paramTypes.length} arguments, got ${argCount}`
      );
    }

    // Check argument types and ownership
    for (let i = 0; i < argCount; i++) {
      const argExpr = ctx.expression(i);
      const argType = this.visit(argExpr);

      // Check if the argument type matches the parameter type, If not, throw an error
      const paramType = paramTypes[i];
      if (!areTypesCompatible(paramType, argType) && paramType !== "any") {
        throw new Error(
          `Argument ${i + 1
          } of '${funcName}' expects type '${paramType}', got '${argType}'`
        );
      }

      // Check if argument is an identifier that might be moved / borrowed
      if (isExpressionSimpleIdentifier(argExpr)) {
        const argVarName = getIdentifierFromExpr(argExpr);
        const argClosure = this.lookupVariable(argVarName);
        // if variable is dropped, error has been thrown in lookupVariable

        // Check if the argument is passed as a reference
        if (argType.startsWith("&")) {
          // Check if the argument is a mutable reference
          const isMutableRef = argType.startsWith("&mut");

          if (isMutableRef) {
            // If the parameter is a mutable reference, check if the variable is mutable
            if (!argClosure.mutable) {
              throw new Error(
                `Cannot borrow immutable variable '${argVarName}' as mutable`
              );
            }

            // Check if the variable has any existing borrows that would prevent this borrow
            // We cannot have multiple borrows at the same time with A mutable references
            if (argClosure.mutableBorrow > 0) {
              throw new Error(
                `Cannot borrow '${argVarName}' as mutable more than once at a time`
              );
            }

            if (argClosure.immutableBorrow > 0) {
              throw new Error(
                `Cannot borrow '${argVarName}' as mutable because it is also borrowed as immutable`
              );
            }
          } else {
            // Immutable reference - can have multiple immutable borrows but no mutable borrows
            if (argClosure.mutableBorrow > 0) {
              throw new Error(
                `Cannot borrow '${argVarName}' as immutable because it is already borrowed as mutable`
              );
            }
          }
        }
        // If the parameter takes ownership, mark the variable as dropped
        else {
          // Cannot move a variable that has any borrows
          //console.log(funcName, this.env.parent.bindings)
          if (argClosure.mutableBorrow > 0 || argClosure.immutableBorrow > 0) {
            throw new Error(
              `Cannot call with '${argVarName}' because it is borrowed`
            );
          }
          // Mark the variable as dropped (ownership moved)
          argClosure.dropped = true;
        }
      }
    }
    return returnType;
  };

  /**
   * Base cases for type checking
   * @param ctx The context of the type node.
   * @returns the type of the node.
   */
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
    } else {
      throw new Error(`Unknown type: ${ctx.getText()}`);
    }
  };

  /**
   * Check the type of a literal.
   * @param ctx The context of the literal node.
   * @returns the type of the literal.
   * @throws Error if the literal type is unknown.
   */
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
  };
}
