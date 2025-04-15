import { Assignment_exprContext, ExpressionContext } from "../parser/src/RustedParser";
import { BorrowRef, CompileTimeEnvironment, TypeClosure } from "./CompileTimeEnvironment";


/* This file contains the helper methods for type management
  * and environment management.
  * It includes methods for checking types, managing environments,
  * and handling variable declarations and lookups.
  */

/**
 * @param type The type to check
 * @returns true if the type is an integer type, false otherwise
 * @description Check if the type is an integer type
 */
export function isIntegerType(type: string): boolean {
  return type === "i32";
}

/**
 * @param type The type to check
 * @returns true if the type is a boolean type, false otherwise
 * @description Check if the type is a boolean type
 */
export function isBooleanType(type: string): boolean {
  return type === "bool";
}

/**
 * @param type The type to check
 * @returns true if the type is a string type, false otherwise
 * @description Check if the type is a string type
 */
export function isStringType(type: string): boolean {
  return type === "&str";
}

/*
 * Check if the type is a string literal
 * @param type The type to check
 * @returns true if the type is a string literal, false otherwise
 */
export function areTypesCompatible(left: string, right: string): boolean {
  if (left === "any" || right === "any") return true;
  if (left === right) return true;
  if (isIntegerType(left) && isIntegerType(right)) return true;
  if (left === "&str" && right === "&str") return true;

  // References compatibility
  if (left.startsWith("&") && right.startsWith("&")) {
    const leftBase = left.replace(/^&(mut\s+)?/, "");
    const rightBase = right.replace(/^&(mut\s+)?/, "");
    return areTypesCompatible(leftBase, rightBase);
  }
  return false;
}

/**
 * Check if the type is a reference type.
 * @param type The type to check.
 * @returns true if the type is NOT a reference or copy type, false otherwise.
 */
export function shouldTransferOwnership(type: string): boolean {
  // Types that involve ownership transfer when assigned
  return (
    !type.startsWith("&") &&
    !isIntegerType(type) &&
    !isBooleanType(type)
  );
}

/**
 * Check if the right side of the assignment expression is an identifier.
 * @param expr The assignment expression to check.
 * @returns true if the right side is an identifier, false otherwise.
 */
export function isRightSideIdentifier(expr: Assignment_exprContext): boolean {
  // Check if the right side is a simple identifier reference
  const assignExpr = expr.assignment_expr(); // get the right side
  if (assignExpr.assignment_expr()) return false;
  const logicalExpr = assignExpr.logical_expr();
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

/**
 * Check if the left side of the assignment expression is an identifier.
 * @param expr The assignment expression to check.
 * @returns true if the left side is an identifier, false otherwise.
 */
export function isLeftSideIdentifier(expr: Assignment_exprContext): boolean {
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

/**
 * Check if the expression is a simple identifier.
 * @param expr The expression to check.
 * @returns true if the expression is a simple identifier, false otherwise.
 */
export function isExpressionSimpleIdentifier(expr: ExpressionContext): boolean {
  // Check if an expression is just a simple identifier
  if (!expr.assignment_expr()) return false;
  return (
    isLeftSideIdentifier(expr.assignment_expr()) &&
    expr.assignment_expr().assignment_expr() === null
  );
}

/**
 * Get the identifier from an expression.
 * @param expr The expression to get the identifier from.
 * @returns The identifier as a string.
 */
export function getIdentifierFromExpr(expr: ExpressionContext): string {
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