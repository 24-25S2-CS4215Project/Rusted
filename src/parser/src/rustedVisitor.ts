// Generated from src/rusted.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";


import { ProgramContext } from "./rustedParser.js";
import { ItemContext } from "./rustedParser.js";
import { FunctionContext } from "./rustedParser.js";
import { Parameter_listContext } from "./rustedParser.js";
import { ParameterContext } from "./rustedParser.js";
import { Struct_defContext } from "./rustedParser.js";
import { Struct_fieldContext } from "./rustedParser.js";
import { BlockContext } from "./rustedParser.js";
import { StatementContext } from "./rustedParser.js";
import { Let_statementContext } from "./rustedParser.js";
import { Expression_statementContext } from "./rustedParser.js";
import { Return_statementContext } from "./rustedParser.js";
import { If_statementContext } from "./rustedParser.js";
import { While_statementContext } from "./rustedParser.js";
import { ExpressionContext } from "./rustedParser.js";
import { Assignment_exprContext } from "./rustedParser.js";
import { Logical_exprContext } from "./rustedParser.js";
import { Comparison_exprContext } from "./rustedParser.js";
import { Additive_exprContext } from "./rustedParser.js";
import { Multiplicative_exprContext } from "./rustedParser.js";
import { Unary_exprContext } from "./rustedParser.js";
import { Primary_exprContext } from "./rustedParser.js";
import { Function_callContext } from "./rustedParser.js";
import { Struct_initContext } from "./rustedParser.js";
import { Struct_init_fieldContext } from "./rustedParser.js";
import { TypeContext } from "./rustedParser.js";
import { LiteralContext } from "./rustedParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `rustedParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class rustedVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `rustedParser.program`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProgram?: (ctx: ProgramContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.item`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitItem?: (ctx: ItemContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.function`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunction?: (ctx: FunctionContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.parameter_list`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParameter_list?: (ctx: Parameter_listContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.parameter`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParameter?: (ctx: ParameterContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.struct_def`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStruct_def?: (ctx: Struct_defContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.struct_field`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStruct_field?: (ctx: Struct_fieldContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlock?: (ctx: BlockContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStatement?: (ctx: StatementContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.let_statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLet_statement?: (ctx: Let_statementContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.expression_statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression_statement?: (ctx: Expression_statementContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.return_statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitReturn_statement?: (ctx: Return_statementContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.if_statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIf_statement?: (ctx: If_statementContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.while_statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWhile_statement?: (ctx: While_statementContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression?: (ctx: ExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.assignment_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAssignment_expr?: (ctx: Assignment_exprContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.logical_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLogical_expr?: (ctx: Logical_exprContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.comparison_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitComparison_expr?: (ctx: Comparison_exprContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.additive_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAdditive_expr?: (ctx: Additive_exprContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.multiplicative_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMultiplicative_expr?: (ctx: Multiplicative_exprContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.unary_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnary_expr?: (ctx: Unary_exprContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.primary_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrimary_expr?: (ctx: Primary_exprContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.function_call`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunction_call?: (ctx: Function_callContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.struct_init`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStruct_init?: (ctx: Struct_initContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.struct_init_field`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStruct_init_field?: (ctx: Struct_init_fieldContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.type`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitType?: (ctx: TypeContext) => Result;
    /**
     * Visit a parse tree produced by `rustedParser.literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLiteral?: (ctx: LiteralContext) => Result;
}

