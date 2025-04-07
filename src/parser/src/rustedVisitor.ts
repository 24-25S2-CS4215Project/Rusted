// Generated from src/Rusted.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";

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
  Ref_primary_exprContext,
  Return_statementContext,
  StatementContext,
  TypeContext,
  Unary_exprContext,
  While_statementContext,
} from "./rustedParser.js";

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `RustedParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class RustedVisitor<Result> extends AbstractParseTreeVisitor<Result> {
  /**
   * Visit a parse tree produced by `RustedParser.program`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProgram?: (ctx: ProgramContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.item`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitItem?: (ctx: ItemContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.function`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunction?: (ctx: FunctionContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.parameter_list`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParameter_list?: (ctx: Parameter_listContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.parameter`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParameter?: (ctx: ParameterContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.block`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBlock?: (ctx: BlockContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStatement?: (ctx: StatementContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.let_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLet_statement?: (ctx: Let_statementContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.expression_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpression_statement?: (ctx: Expression_statementContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.return_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReturn_statement?: (ctx: Return_statementContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.if_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIf_statement?: (ctx: If_statementContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.while_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitWhile_statement?: (ctx: While_statementContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpression?: (ctx: ExpressionContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.assignment_expr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssignment_expr?: (ctx: Assignment_exprContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.logical_expr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLogical_expr?: (ctx: Logical_exprContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.comparison_expr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitComparison_expr?: (ctx: Comparison_exprContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.additive_expr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAdditive_expr?: (ctx: Additive_exprContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.multiplicative_expr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMultiplicative_expr?: (ctx: Multiplicative_exprContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.unary_expr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUnary_expr?: (ctx: Unary_exprContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.ref_primary_expr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRef_primary_expr?: (ctx: Ref_primary_exprContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.primary_expr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPrimary_expr?: (ctx: Primary_exprContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.function_call`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunction_call?: (ctx: Function_callContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.type`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitType?: (ctx: TypeContext) => Result;
  /**
   * Visit a parse tree produced by `RustedParser.literal`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLiteral?: (ctx: LiteralContext) => Result;
}
