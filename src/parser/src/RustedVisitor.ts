// Generated from src/Rusted.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";


import { ProgramContext } from "./RustedParser.js";
import { ItemContext } from "./RustedParser.js";
import { FunctionContext } from "./RustedParser.js";
import { Parameter_listContext } from "./RustedParser.js";
import { ParameterContext } from "./RustedParser.js";
import { BlockContext } from "./RustedParser.js";
import { StatementContext } from "./RustedParser.js";
import { Let_statementContext } from "./RustedParser.js";
import { Expression_statementContext } from "./RustedParser.js";
import { Return_statementContext } from "./RustedParser.js";
import { If_statementContext } from "./RustedParser.js";
import { While_statementContext } from "./RustedParser.js";
import { ExpressionContext } from "./RustedParser.js";
import { Assignment_exprContext } from "./RustedParser.js";
import { Logical_exprContext } from "./RustedParser.js";
import { Comparison_exprContext } from "./RustedParser.js";
import { Additive_exprContext } from "./RustedParser.js";
import { Multiplicative_exprContext } from "./RustedParser.js";
import { Unary_exprContext } from "./RustedParser.js";
import { Ref_primary_exprContext } from "./RustedParser.js";
import { Primary_exprContext } from "./RustedParser.js";
import { Function_callContext } from "./RustedParser.js";
import { TypeContext } from "./RustedParser.js";
import { LiteralContext } from "./RustedParser.js";


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

