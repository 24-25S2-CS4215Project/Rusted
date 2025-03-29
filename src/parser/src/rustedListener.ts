// Generated from src/rusted.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


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
 * This interface defines a complete listener for a parse tree produced by
 * `rustedParser`.
 */
export class rustedListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `rustedParser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.item`.
     * @param ctx the parse tree
     */
    enterItem?: (ctx: ItemContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.item`.
     * @param ctx the parse tree
     */
    exitItem?: (ctx: ItemContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.function`.
     * @param ctx the parse tree
     */
    enterFunction?: (ctx: FunctionContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.function`.
     * @param ctx the parse tree
     */
    exitFunction?: (ctx: FunctionContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.parameter_list`.
     * @param ctx the parse tree
     */
    enterParameter_list?: (ctx: Parameter_listContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.parameter_list`.
     * @param ctx the parse tree
     */
    exitParameter_list?: (ctx: Parameter_listContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.parameter`.
     * @param ctx the parse tree
     */
    enterParameter?: (ctx: ParameterContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.parameter`.
     * @param ctx the parse tree
     */
    exitParameter?: (ctx: ParameterContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.struct_def`.
     * @param ctx the parse tree
     */
    enterStruct_def?: (ctx: Struct_defContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.struct_def`.
     * @param ctx the parse tree
     */
    exitStruct_def?: (ctx: Struct_defContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.struct_field`.
     * @param ctx the parse tree
     */
    enterStruct_field?: (ctx: Struct_fieldContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.struct_field`.
     * @param ctx the parse tree
     */
    exitStruct_field?: (ctx: Struct_fieldContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.block`.
     * @param ctx the parse tree
     */
    enterBlock?: (ctx: BlockContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.block`.
     * @param ctx the parse tree
     */
    exitBlock?: (ctx: BlockContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.let_statement`.
     * @param ctx the parse tree
     */
    enterLet_statement?: (ctx: Let_statementContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.let_statement`.
     * @param ctx the parse tree
     */
    exitLet_statement?: (ctx: Let_statementContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.expression_statement`.
     * @param ctx the parse tree
     */
    enterExpression_statement?: (ctx: Expression_statementContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.expression_statement`.
     * @param ctx the parse tree
     */
    exitExpression_statement?: (ctx: Expression_statementContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.return_statement`.
     * @param ctx the parse tree
     */
    enterReturn_statement?: (ctx: Return_statementContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.return_statement`.
     * @param ctx the parse tree
     */
    exitReturn_statement?: (ctx: Return_statementContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.if_statement`.
     * @param ctx the parse tree
     */
    enterIf_statement?: (ctx: If_statementContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.if_statement`.
     * @param ctx the parse tree
     */
    exitIf_statement?: (ctx: If_statementContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.while_statement`.
     * @param ctx the parse tree
     */
    enterWhile_statement?: (ctx: While_statementContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.while_statement`.
     * @param ctx the parse tree
     */
    exitWhile_statement?: (ctx: While_statementContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.assignment_expr`.
     * @param ctx the parse tree
     */
    enterAssignment_expr?: (ctx: Assignment_exprContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.assignment_expr`.
     * @param ctx the parse tree
     */
    exitAssignment_expr?: (ctx: Assignment_exprContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.logical_expr`.
     * @param ctx the parse tree
     */
    enterLogical_expr?: (ctx: Logical_exprContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.logical_expr`.
     * @param ctx the parse tree
     */
    exitLogical_expr?: (ctx: Logical_exprContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.comparison_expr`.
     * @param ctx the parse tree
     */
    enterComparison_expr?: (ctx: Comparison_exprContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.comparison_expr`.
     * @param ctx the parse tree
     */
    exitComparison_expr?: (ctx: Comparison_exprContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.additive_expr`.
     * @param ctx the parse tree
     */
    enterAdditive_expr?: (ctx: Additive_exprContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.additive_expr`.
     * @param ctx the parse tree
     */
    exitAdditive_expr?: (ctx: Additive_exprContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.multiplicative_expr`.
     * @param ctx the parse tree
     */
    enterMultiplicative_expr?: (ctx: Multiplicative_exprContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.multiplicative_expr`.
     * @param ctx the parse tree
     */
    exitMultiplicative_expr?: (ctx: Multiplicative_exprContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.unary_expr`.
     * @param ctx the parse tree
     */
    enterUnary_expr?: (ctx: Unary_exprContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.unary_expr`.
     * @param ctx the parse tree
     */
    exitUnary_expr?: (ctx: Unary_exprContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.primary_expr`.
     * @param ctx the parse tree
     */
    enterPrimary_expr?: (ctx: Primary_exprContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.primary_expr`.
     * @param ctx the parse tree
     */
    exitPrimary_expr?: (ctx: Primary_exprContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.function_call`.
     * @param ctx the parse tree
     */
    enterFunction_call?: (ctx: Function_callContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.function_call`.
     * @param ctx the parse tree
     */
    exitFunction_call?: (ctx: Function_callContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.struct_init`.
     * @param ctx the parse tree
     */
    enterStruct_init?: (ctx: Struct_initContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.struct_init`.
     * @param ctx the parse tree
     */
    exitStruct_init?: (ctx: Struct_initContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.struct_init_field`.
     * @param ctx the parse tree
     */
    enterStruct_init_field?: (ctx: Struct_init_fieldContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.struct_init_field`.
     * @param ctx the parse tree
     */
    exitStruct_init_field?: (ctx: Struct_init_fieldContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.type`.
     * @param ctx the parse tree
     */
    enterType?: (ctx: TypeContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.type`.
     * @param ctx the parse tree
     */
    exitType?: (ctx: TypeContext) => void;
    /**
     * Enter a parse tree produced by `rustedParser.literal`.
     * @param ctx the parse tree
     */
    enterLiteral?: (ctx: LiteralContext) => void;
    /**
     * Exit a parse tree produced by `rustedParser.literal`.
     * @param ctx the parse tree
     */
    exitLiteral?: (ctx: LiteralContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

