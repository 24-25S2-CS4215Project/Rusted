// Generated from src/Rusted.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


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
 * This interface defines a complete listener for a parse tree produced by
 * `RustedParser`.
 */
export class RustedListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `RustedParser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.item`.
     * @param ctx the parse tree
     */
    enterItem?: (ctx: ItemContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.item`.
     * @param ctx the parse tree
     */
    exitItem?: (ctx: ItemContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.function`.
     * @param ctx the parse tree
     */
    enterFunction?: (ctx: FunctionContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.function`.
     * @param ctx the parse tree
     */
    exitFunction?: (ctx: FunctionContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.parameter_list`.
     * @param ctx the parse tree
     */
    enterParameter_list?: (ctx: Parameter_listContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.parameter_list`.
     * @param ctx the parse tree
     */
    exitParameter_list?: (ctx: Parameter_listContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.parameter`.
     * @param ctx the parse tree
     */
    enterParameter?: (ctx: ParameterContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.parameter`.
     * @param ctx the parse tree
     */
    exitParameter?: (ctx: ParameterContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.block`.
     * @param ctx the parse tree
     */
    enterBlock?: (ctx: BlockContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.block`.
     * @param ctx the parse tree
     */
    exitBlock?: (ctx: BlockContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.let_statement`.
     * @param ctx the parse tree
     */
    enterLet_statement?: (ctx: Let_statementContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.let_statement`.
     * @param ctx the parse tree
     */
    exitLet_statement?: (ctx: Let_statementContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.expression_statement`.
     * @param ctx the parse tree
     */
    enterExpression_statement?: (ctx: Expression_statementContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.expression_statement`.
     * @param ctx the parse tree
     */
    exitExpression_statement?: (ctx: Expression_statementContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.return_statement`.
     * @param ctx the parse tree
     */
    enterReturn_statement?: (ctx: Return_statementContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.return_statement`.
     * @param ctx the parse tree
     */
    exitReturn_statement?: (ctx: Return_statementContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.if_statement`.
     * @param ctx the parse tree
     */
    enterIf_statement?: (ctx: If_statementContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.if_statement`.
     * @param ctx the parse tree
     */
    exitIf_statement?: (ctx: If_statementContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.while_statement`.
     * @param ctx the parse tree
     */
    enterWhile_statement?: (ctx: While_statementContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.while_statement`.
     * @param ctx the parse tree
     */
    exitWhile_statement?: (ctx: While_statementContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.assignment_expr`.
     * @param ctx the parse tree
     */
    enterAssignment_expr?: (ctx: Assignment_exprContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.assignment_expr`.
     * @param ctx the parse tree
     */
    exitAssignment_expr?: (ctx: Assignment_exprContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.logical_expr`.
     * @param ctx the parse tree
     */
    enterLogical_expr?: (ctx: Logical_exprContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.logical_expr`.
     * @param ctx the parse tree
     */
    exitLogical_expr?: (ctx: Logical_exprContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.comparison_expr`.
     * @param ctx the parse tree
     */
    enterComparison_expr?: (ctx: Comparison_exprContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.comparison_expr`.
     * @param ctx the parse tree
     */
    exitComparison_expr?: (ctx: Comparison_exprContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.additive_expr`.
     * @param ctx the parse tree
     */
    enterAdditive_expr?: (ctx: Additive_exprContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.additive_expr`.
     * @param ctx the parse tree
     */
    exitAdditive_expr?: (ctx: Additive_exprContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.multiplicative_expr`.
     * @param ctx the parse tree
     */
    enterMultiplicative_expr?: (ctx: Multiplicative_exprContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.multiplicative_expr`.
     * @param ctx the parse tree
     */
    exitMultiplicative_expr?: (ctx: Multiplicative_exprContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.unary_expr`.
     * @param ctx the parse tree
     */
    enterUnary_expr?: (ctx: Unary_exprContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.unary_expr`.
     * @param ctx the parse tree
     */
    exitUnary_expr?: (ctx: Unary_exprContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.ref_primary_expr`.
     * @param ctx the parse tree
     */
    enterRef_primary_expr?: (ctx: Ref_primary_exprContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.ref_primary_expr`.
     * @param ctx the parse tree
     */
    exitRef_primary_expr?: (ctx: Ref_primary_exprContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.primary_expr`.
     * @param ctx the parse tree
     */
    enterPrimary_expr?: (ctx: Primary_exprContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.primary_expr`.
     * @param ctx the parse tree
     */
    exitPrimary_expr?: (ctx: Primary_exprContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.function_call`.
     * @param ctx the parse tree
     */
    enterFunction_call?: (ctx: Function_callContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.function_call`.
     * @param ctx the parse tree
     */
    exitFunction_call?: (ctx: Function_callContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.type`.
     * @param ctx the parse tree
     */
    enterType?: (ctx: TypeContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.type`.
     * @param ctx the parse tree
     */
    exitType?: (ctx: TypeContext) => void;
    /**
     * Enter a parse tree produced by `RustedParser.literal`.
     * @param ctx the parse tree
     */
    enterLiteral?: (ctx: LiteralContext) => void;
    /**
     * Exit a parse tree produced by `RustedParser.literal`.
     * @param ctx the parse tree
     */
    exitLiteral?: (ctx: LiteralContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

