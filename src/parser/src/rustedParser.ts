// Generated from src/rusted.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { rustedListener } from "./rustedListener.js";
import { rustedVisitor } from "./rustedVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class rustedParser extends antlr.Parser {
    public static readonly T__0 = 1;
    public static readonly T__1 = 2;
    public static readonly T__2 = 3;
    public static readonly T__3 = 4;
    public static readonly T__4 = 5;
    public static readonly T__5 = 6;
    public static readonly T__6 = 7;
    public static readonly T__7 = 8;
    public static readonly T__8 = 9;
    public static readonly T__9 = 10;
    public static readonly T__10 = 11;
    public static readonly T__11 = 12;
    public static readonly T__12 = 13;
    public static readonly T__13 = 14;
    public static readonly T__14 = 15;
    public static readonly T__15 = 16;
    public static readonly T__16 = 17;
    public static readonly T__17 = 18;
    public static readonly T__18 = 19;
    public static readonly T__19 = 20;
    public static readonly T__20 = 21;
    public static readonly T__21 = 22;
    public static readonly T__22 = 23;
    public static readonly T__23 = 24;
    public static readonly T__24 = 25;
    public static readonly T__25 = 26;
    public static readonly T__26 = 27;
    public static readonly T__27 = 28;
    public static readonly T__28 = 29;
    public static readonly T__29 = 30;
    public static readonly T__30 = 31;
    public static readonly T__31 = 32;
    public static readonly T__32 = 33;
    public static readonly IDENTIFIER = 34;
    public static readonly INTEGER_LITERAL = 35;
    public static readonly BOOLEAN_LITERAL = 36;
    public static readonly STRING_LITERAL = 37;
    public static readonly COMMENT = 38;
    public static readonly MULTILINE_COMMENT = 39;
    public static readonly WS = 40;
    public static readonly RULE_program = 0;
    public static readonly RULE_item = 1;
    public static readonly RULE_function = 2;
    public static readonly RULE_parameter_list = 3;
    public static readonly RULE_parameter = 4;
    public static readonly RULE_struct_def = 5;
    public static readonly RULE_struct_field = 6;
    public static readonly RULE_block = 7;
    public static readonly RULE_statement = 8;
    public static readonly RULE_let_statement = 9;
    public static readonly RULE_expression_statement = 10;
    public static readonly RULE_return_statement = 11;
    public static readonly RULE_if_statement = 12;
    public static readonly RULE_while_statement = 13;
    public static readonly RULE_expression = 14;
    public static readonly RULE_assignment_expr = 15;
    public static readonly RULE_logical_expr = 16;
    public static readonly RULE_comparison_expr = 17;
    public static readonly RULE_additive_expr = 18;
    public static readonly RULE_multiplicative_expr = 19;
    public static readonly RULE_unary_expr = 20;
    public static readonly RULE_primary_expr = 21;
    public static readonly RULE_function_call = 22;
    public static readonly RULE_struct_init = 23;
    public static readonly RULE_struct_init_field = 24;
    public static readonly RULE_type = 25;
    public static readonly RULE_literal = 26;

    public static readonly literalNames = [
        null, "'fn'", "'('", "')'", "'->'", "','", "':'", "'struct'", "'{'", 
        "'}'", "'let'", "'mut'", "'='", "';'", "'return'", "'if'", "'else'", 
        "'while'", "'&&'", "'||'", "'=='", "'!='", "'<'", "'<='", "'>'", 
        "'>='", "'+'", "'-'", "'*'", "'/'", "'%'", "'!'", "'.'", "'&'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, "IDENTIFIER", "INTEGER_LITERAL", "BOOLEAN_LITERAL", "STRING_LITERAL", 
        "COMMENT", "MULTILINE_COMMENT", "WS"
    ];
    public static readonly ruleNames = [
        "program", "item", "function", "parameter_list", "parameter", "struct_def", 
        "struct_field", "block", "statement", "let_statement", "expression_statement", 
        "return_statement", "if_statement", "while_statement", "expression", 
        "assignment_expr", "logical_expr", "comparison_expr", "additive_expr", 
        "multiplicative_expr", "unary_expr", "primary_expr", "function_call", 
        "struct_init", "struct_init_field", "type", "literal",
    ];

    public get grammarFileName(): string { return "rusted.g4"; }
    public get literalNames(): (string | null)[] { return rustedParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return rustedParser.symbolicNames; }
    public get ruleNames(): string[] { return rustedParser.ruleNames; }
    public get serializedATN(): number[] { return rustedParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, rustedParser._ATN, rustedParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, rustedParser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 57;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1154) !== 0)) {
                {
                {
                this.state = 54;
                this.item();
                }
                }
                this.state = 59;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 60;
            this.match(rustedParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public item(): ItemContext {
        let localContext = new ItemContext(this.context, this.state);
        this.enterRule(localContext, 2, rustedParser.RULE_item);
        try {
            this.state = 65;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case rustedParser.T__0:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 62;
                this.function_();
                }
                break;
            case rustedParser.T__6:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 63;
                this.struct_def();
                }
                break;
            case rustedParser.T__9:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 64;
                this.let_statement();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public function_(): FunctionContext {
        let localContext = new FunctionContext(this.context, this.state);
        this.enterRule(localContext, 4, rustedParser.RULE_function);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 67;
            this.match(rustedParser.T__0);
            this.state = 68;
            this.match(rustedParser.IDENTIFIER);
            this.state = 69;
            this.match(rustedParser.T__1);
            this.state = 71;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 34) {
                {
                this.state = 70;
                this.parameter_list();
                }
            }

            this.state = 73;
            this.match(rustedParser.T__2);
            this.state = 76;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 4) {
                {
                this.state = 74;
                this.match(rustedParser.T__3);
                this.state = 75;
                this.type_();
                }
            }

            this.state = 78;
            this.block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public parameter_list(): Parameter_listContext {
        let localContext = new Parameter_listContext(this.context, this.state);
        this.enterRule(localContext, 6, rustedParser.RULE_parameter_list);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 80;
            this.parameter();
            this.state = 85;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 81;
                    this.match(rustedParser.T__4);
                    this.state = 82;
                    this.parameter();
                    }
                    }
                }
                this.state = 87;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            }
            this.state = 89;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 5) {
                {
                this.state = 88;
                this.match(rustedParser.T__4);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public parameter(): ParameterContext {
        let localContext = new ParameterContext(this.context, this.state);
        this.enterRule(localContext, 8, rustedParser.RULE_parameter);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 91;
            this.match(rustedParser.IDENTIFIER);
            this.state = 92;
            this.match(rustedParser.T__5);
            this.state = 93;
            this.type_();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public struct_def(): Struct_defContext {
        let localContext = new Struct_defContext(this.context, this.state);
        this.enterRule(localContext, 10, rustedParser.RULE_struct_def);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 95;
            this.match(rustedParser.T__6);
            this.state = 96;
            this.match(rustedParser.IDENTIFIER);
            this.state = 97;
            this.match(rustedParser.T__7);
            this.state = 101;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 34) {
                {
                {
                this.state = 98;
                this.struct_field();
                }
                }
                this.state = 103;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 104;
            this.match(rustedParser.T__8);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public struct_field(): Struct_fieldContext {
        let localContext = new Struct_fieldContext(this.context, this.state);
        this.enterRule(localContext, 12, rustedParser.RULE_struct_field);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 106;
            this.match(rustedParser.IDENTIFIER);
            this.state = 107;
            this.match(rustedParser.T__5);
            this.state = 108;
            this.type_();
            this.state = 110;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 5) {
                {
                this.state = 109;
                this.match(rustedParser.T__4);
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public block(): BlockContext {
        let localContext = new BlockContext(this.context, this.state);
        this.enterRule(localContext, 14, rustedParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 112;
            this.match(rustedParser.T__7);
            this.state = 116;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2281882884) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 15) !== 0)) {
                {
                {
                this.state = 113;
                this.statement();
                }
                }
                this.state = 118;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 119;
            this.match(rustedParser.T__8);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 16, rustedParser.RULE_statement);
        try {
            this.state = 127;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case rustedParser.T__9:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 121;
                this.let_statement();
                }
                break;
            case rustedParser.T__1:
            case rustedParser.T__26:
            case rustedParser.T__30:
            case rustedParser.IDENTIFIER:
            case rustedParser.INTEGER_LITERAL:
            case rustedParser.BOOLEAN_LITERAL:
            case rustedParser.STRING_LITERAL:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 122;
                this.expression_statement();
                }
                break;
            case rustedParser.T__13:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 123;
                this.return_statement();
                }
                break;
            case rustedParser.T__7:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 124;
                this.block();
                }
                break;
            case rustedParser.T__14:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 125;
                this.if_statement();
                }
                break;
            case rustedParser.T__16:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 126;
                this.while_statement();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public let_statement(): Let_statementContext {
        let localContext = new Let_statementContext(this.context, this.state);
        this.enterRule(localContext, 18, rustedParser.RULE_let_statement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 129;
            this.match(rustedParser.T__9);
            this.state = 131;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 130;
                this.match(rustedParser.T__10);
                }
            }

            this.state = 133;
            this.match(rustedParser.IDENTIFIER);
            this.state = 136;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 6) {
                {
                this.state = 134;
                this.match(rustedParser.T__5);
                this.state = 135;
                this.type_();
                }
            }

            this.state = 140;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 12) {
                {
                this.state = 138;
                this.match(rustedParser.T__11);
                this.state = 139;
                this.expression();
                }
            }

            this.state = 142;
            this.match(rustedParser.T__12);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expression_statement(): Expression_statementContext {
        let localContext = new Expression_statementContext(this.context, this.state);
        this.enterRule(localContext, 20, rustedParser.RULE_expression_statement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 144;
            this.expression();
            this.state = 145;
            this.match(rustedParser.T__12);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public return_statement(): Return_statementContext {
        let localContext = new Return_statementContext(this.context, this.state);
        this.enterRule(localContext, 22, rustedParser.RULE_return_statement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 147;
            this.match(rustedParser.T__13);
            this.state = 149;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2281701380) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 15) !== 0)) {
                {
                this.state = 148;
                this.expression();
                }
            }

            this.state = 151;
            this.match(rustedParser.T__12);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public if_statement(): If_statementContext {
        let localContext = new If_statementContext(this.context, this.state);
        this.enterRule(localContext, 24, rustedParser.RULE_if_statement);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 153;
            this.match(rustedParser.T__14);
            this.state = 154;
            this.expression();
            this.state = 155;
            this.block();
            this.state = 161;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 16) {
                {
                this.state = 156;
                this.match(rustedParser.T__15);
                this.state = 159;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case rustedParser.T__14:
                    {
                    this.state = 157;
                    this.if_statement();
                    }
                    break;
                case rustedParser.T__7:
                    {
                    this.state = 158;
                    this.block();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public while_statement(): While_statementContext {
        let localContext = new While_statementContext(this.context, this.state);
        this.enterRule(localContext, 26, rustedParser.RULE_while_statement);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 163;
            this.match(rustedParser.T__16);
            this.state = 164;
            this.expression();
            this.state = 165;
            this.block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 28, rustedParser.RULE_expression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 167;
            this.assignment_expr();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public assignment_expr(): Assignment_exprContext {
        let localContext = new Assignment_exprContext(this.context, this.state);
        this.enterRule(localContext, 30, rustedParser.RULE_assignment_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 169;
            this.logical_expr();
            this.state = 172;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 12) {
                {
                this.state = 170;
                this.match(rustedParser.T__11);
                this.state = 171;
                this.assignment_expr();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public logical_expr(): Logical_exprContext {
        let localContext = new Logical_exprContext(this.context, this.state);
        this.enterRule(localContext, 32, rustedParser.RULE_logical_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 174;
            this.comparison_expr();
            this.state = 179;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 18 || _la === 19) {
                {
                {
                this.state = 175;
                _la = this.tokenStream.LA(1);
                if(!(_la === 18 || _la === 19)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 176;
                this.comparison_expr();
                }
                }
                this.state = 181;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public comparison_expr(): Comparison_exprContext {
        let localContext = new Comparison_exprContext(this.context, this.state);
        this.enterRule(localContext, 34, rustedParser.RULE_comparison_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 182;
            this.additive_expr();
            this.state = 187;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 66060288) !== 0)) {
                {
                {
                this.state = 183;
                _la = this.tokenStream.LA(1);
                if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 66060288) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 184;
                this.additive_expr();
                }
                }
                this.state = 189;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public additive_expr(): Additive_exprContext {
        let localContext = new Additive_exprContext(this.context, this.state);
        this.enterRule(localContext, 36, rustedParser.RULE_additive_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 190;
            this.multiplicative_expr();
            this.state = 195;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 26 || _la === 27) {
                {
                {
                this.state = 191;
                _la = this.tokenStream.LA(1);
                if(!(_la === 26 || _la === 27)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 192;
                this.multiplicative_expr();
                }
                }
                this.state = 197;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public multiplicative_expr(): Multiplicative_exprContext {
        let localContext = new Multiplicative_exprContext(this.context, this.state);
        this.enterRule(localContext, 38, rustedParser.RULE_multiplicative_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 198;
            this.unary_expr();
            this.state = 203;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1879048192) !== 0)) {
                {
                {
                this.state = 199;
                _la = this.tokenStream.LA(1);
                if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 1879048192) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 200;
                this.unary_expr();
                }
                }
                this.state = 205;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unary_expr(): Unary_exprContext {
        let localContext = new Unary_exprContext(this.context, this.state);
        this.enterRule(localContext, 40, rustedParser.RULE_unary_expr);
        let _la: number;
        try {
            this.state = 209;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case rustedParser.T__26:
            case rustedParser.T__30:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 206;
                _la = this.tokenStream.LA(1);
                if(!(_la === 27 || _la === 31)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 207;
                this.unary_expr();
                }
                break;
            case rustedParser.T__1:
            case rustedParser.IDENTIFIER:
            case rustedParser.INTEGER_LITERAL:
            case rustedParser.BOOLEAN_LITERAL:
            case rustedParser.STRING_LITERAL:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 208;
                this.primary_expr(0);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public primary_expr(): Primary_exprContext;
    public primary_expr(_p: number): Primary_exprContext;
    public primary_expr(_p?: number): Primary_exprContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Primary_exprContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 42;
        this.enterRecursionRule(localContext, 42, rustedParser.RULE_primary_expr, _p);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 220;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 22, this.context) ) {
            case 1:
                {
                this.state = 212;
                this.match(rustedParser.IDENTIFIER);
                }
                break;
            case 2:
                {
                this.state = 213;
                this.literal();
                }
                break;
            case 3:
                {
                this.state = 214;
                this.function_call();
                }
                break;
            case 4:
                {
                this.state = 215;
                this.match(rustedParser.T__1);
                this.state = 216;
                this.expression();
                this.state = 217;
                this.match(rustedParser.T__2);
                }
                break;
            case 5:
                {
                this.state = 219;
                this.struct_init();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 227;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    {
                    localContext = new Primary_exprContext(parentContext, parentState);
                    this.pushNewRecursionContext(localContext, _startState, rustedParser.RULE_primary_expr);
                    this.state = 222;
                    if (!(this.precpred(this.context, 1))) {
                        throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                    }
                    this.state = 223;
                    this.match(rustedParser.T__31);
                    this.state = 224;
                    this.match(rustedParser.IDENTIFIER);
                    }
                    }
                }
                this.state = 229;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public function_call(): Function_callContext {
        let localContext = new Function_callContext(this.context, this.state);
        this.enterRule(localContext, 44, rustedParser.RULE_function_call);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 230;
            this.match(rustedParser.IDENTIFIER);
            this.state = 231;
            this.match(rustedParser.T__1);
            this.state = 240;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2281701380) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 15) !== 0)) {
                {
                this.state = 232;
                this.expression();
                this.state = 237;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 233;
                    this.match(rustedParser.T__4);
                    this.state = 234;
                    this.expression();
                    }
                    }
                    this.state = 239;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 242;
            this.match(rustedParser.T__2);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public struct_init(): Struct_initContext {
        let localContext = new Struct_initContext(this.context, this.state);
        this.enterRule(localContext, 46, rustedParser.RULE_struct_init);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 244;
            this.match(rustedParser.IDENTIFIER);
            this.state = 245;
            this.match(rustedParser.T__7);
            this.state = 254;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 34) {
                {
                this.state = 246;
                this.struct_init_field();
                this.state = 251;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 247;
                    this.match(rustedParser.T__4);
                    this.state = 248;
                    this.struct_init_field();
                    }
                    }
                    this.state = 253;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 256;
            this.match(rustedParser.T__8);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public struct_init_field(): Struct_init_fieldContext {
        let localContext = new Struct_init_fieldContext(this.context, this.state);
        this.enterRule(localContext, 48, rustedParser.RULE_struct_init_field);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 258;
            this.match(rustedParser.IDENTIFIER);
            this.state = 259;
            this.match(rustedParser.T__5);
            this.state = 260;
            this.expression();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public type_(): TypeContext {
        let localContext = new TypeContext(this.context, this.state);
        this.enterRule(localContext, 50, rustedParser.RULE_type);
        let _la: number;
        try {
            this.state = 272;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case rustedParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 262;
                this.match(rustedParser.IDENTIFIER);
                }
                break;
            case rustedParser.T__32:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 263;
                this.match(rustedParser.T__32);
                this.state = 265;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 11) {
                    {
                    this.state = 264;
                    this.match(rustedParser.T__10);
                    }
                }

                this.state = 267;
                this.type_();
                }
                break;
            case rustedParser.T__1:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 268;
                this.match(rustedParser.T__1);
                this.state = 269;
                this.type_();
                this.state = 270;
                this.match(rustedParser.T__2);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public literal(): LiteralContext {
        let localContext = new LiteralContext(this.context, this.state);
        this.enterRule(localContext, 52, rustedParser.RULE_literal);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 274;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 7) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 21:
            return this.primary_expr_sempred(localContext as Primary_exprContext, predIndex);
        }
        return true;
    }
    private primary_expr_sempred(localContext: Primary_exprContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 1);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,40,277,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        1,0,5,0,56,8,0,10,0,12,0,59,9,0,1,0,1,0,1,1,1,1,1,1,3,1,66,8,1,1,
        2,1,2,1,2,1,2,3,2,72,8,2,1,2,1,2,1,2,3,2,77,8,2,1,2,1,2,1,3,1,3,
        1,3,5,3,84,8,3,10,3,12,3,87,9,3,1,3,3,3,90,8,3,1,4,1,4,1,4,1,4,1,
        5,1,5,1,5,1,5,5,5,100,8,5,10,5,12,5,103,9,5,1,5,1,5,1,6,1,6,1,6,
        1,6,3,6,111,8,6,1,7,1,7,5,7,115,8,7,10,7,12,7,118,9,7,1,7,1,7,1,
        8,1,8,1,8,1,8,1,8,1,8,3,8,128,8,8,1,9,1,9,3,9,132,8,9,1,9,1,9,1,
        9,3,9,137,8,9,1,9,1,9,3,9,141,8,9,1,9,1,9,1,10,1,10,1,10,1,11,1,
        11,3,11,150,8,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,3,12,160,
        8,12,3,12,162,8,12,1,13,1,13,1,13,1,13,1,14,1,14,1,15,1,15,1,15,
        3,15,173,8,15,1,16,1,16,1,16,5,16,178,8,16,10,16,12,16,181,9,16,
        1,17,1,17,1,17,5,17,186,8,17,10,17,12,17,189,9,17,1,18,1,18,1,18,
        5,18,194,8,18,10,18,12,18,197,9,18,1,19,1,19,1,19,5,19,202,8,19,
        10,19,12,19,205,9,19,1,20,1,20,1,20,3,20,210,8,20,1,21,1,21,1,21,
        1,21,1,21,1,21,1,21,1,21,1,21,3,21,221,8,21,1,21,1,21,1,21,5,21,
        226,8,21,10,21,12,21,229,9,21,1,22,1,22,1,22,1,22,1,22,5,22,236,
        8,22,10,22,12,22,239,9,22,3,22,241,8,22,1,22,1,22,1,23,1,23,1,23,
        1,23,1,23,5,23,250,8,23,10,23,12,23,253,9,23,3,23,255,8,23,1,23,
        1,23,1,24,1,24,1,24,1,24,1,25,1,25,1,25,3,25,266,8,25,1,25,1,25,
        1,25,1,25,1,25,3,25,273,8,25,1,26,1,26,1,26,0,1,42,27,0,2,4,6,8,
        10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,
        0,6,1,0,18,19,1,0,20,25,1,0,26,27,1,0,28,30,2,0,27,27,31,31,1,0,
        35,37,288,0,57,1,0,0,0,2,65,1,0,0,0,4,67,1,0,0,0,6,80,1,0,0,0,8,
        91,1,0,0,0,10,95,1,0,0,0,12,106,1,0,0,0,14,112,1,0,0,0,16,127,1,
        0,0,0,18,129,1,0,0,0,20,144,1,0,0,0,22,147,1,0,0,0,24,153,1,0,0,
        0,26,163,1,0,0,0,28,167,1,0,0,0,30,169,1,0,0,0,32,174,1,0,0,0,34,
        182,1,0,0,0,36,190,1,0,0,0,38,198,1,0,0,0,40,209,1,0,0,0,42,220,
        1,0,0,0,44,230,1,0,0,0,46,244,1,0,0,0,48,258,1,0,0,0,50,272,1,0,
        0,0,52,274,1,0,0,0,54,56,3,2,1,0,55,54,1,0,0,0,56,59,1,0,0,0,57,
        55,1,0,0,0,57,58,1,0,0,0,58,60,1,0,0,0,59,57,1,0,0,0,60,61,5,0,0,
        1,61,1,1,0,0,0,62,66,3,4,2,0,63,66,3,10,5,0,64,66,3,18,9,0,65,62,
        1,0,0,0,65,63,1,0,0,0,65,64,1,0,0,0,66,3,1,0,0,0,67,68,5,1,0,0,68,
        69,5,34,0,0,69,71,5,2,0,0,70,72,3,6,3,0,71,70,1,0,0,0,71,72,1,0,
        0,0,72,73,1,0,0,0,73,76,5,3,0,0,74,75,5,4,0,0,75,77,3,50,25,0,76,
        74,1,0,0,0,76,77,1,0,0,0,77,78,1,0,0,0,78,79,3,14,7,0,79,5,1,0,0,
        0,80,85,3,8,4,0,81,82,5,5,0,0,82,84,3,8,4,0,83,81,1,0,0,0,84,87,
        1,0,0,0,85,83,1,0,0,0,85,86,1,0,0,0,86,89,1,0,0,0,87,85,1,0,0,0,
        88,90,5,5,0,0,89,88,1,0,0,0,89,90,1,0,0,0,90,7,1,0,0,0,91,92,5,34,
        0,0,92,93,5,6,0,0,93,94,3,50,25,0,94,9,1,0,0,0,95,96,5,7,0,0,96,
        97,5,34,0,0,97,101,5,8,0,0,98,100,3,12,6,0,99,98,1,0,0,0,100,103,
        1,0,0,0,101,99,1,0,0,0,101,102,1,0,0,0,102,104,1,0,0,0,103,101,1,
        0,0,0,104,105,5,9,0,0,105,11,1,0,0,0,106,107,5,34,0,0,107,108,5,
        6,0,0,108,110,3,50,25,0,109,111,5,5,0,0,110,109,1,0,0,0,110,111,
        1,0,0,0,111,13,1,0,0,0,112,116,5,8,0,0,113,115,3,16,8,0,114,113,
        1,0,0,0,115,118,1,0,0,0,116,114,1,0,0,0,116,117,1,0,0,0,117,119,
        1,0,0,0,118,116,1,0,0,0,119,120,5,9,0,0,120,15,1,0,0,0,121,128,3,
        18,9,0,122,128,3,20,10,0,123,128,3,22,11,0,124,128,3,14,7,0,125,
        128,3,24,12,0,126,128,3,26,13,0,127,121,1,0,0,0,127,122,1,0,0,0,
        127,123,1,0,0,0,127,124,1,0,0,0,127,125,1,0,0,0,127,126,1,0,0,0,
        128,17,1,0,0,0,129,131,5,10,0,0,130,132,5,11,0,0,131,130,1,0,0,0,
        131,132,1,0,0,0,132,133,1,0,0,0,133,136,5,34,0,0,134,135,5,6,0,0,
        135,137,3,50,25,0,136,134,1,0,0,0,136,137,1,0,0,0,137,140,1,0,0,
        0,138,139,5,12,0,0,139,141,3,28,14,0,140,138,1,0,0,0,140,141,1,0,
        0,0,141,142,1,0,0,0,142,143,5,13,0,0,143,19,1,0,0,0,144,145,3,28,
        14,0,145,146,5,13,0,0,146,21,1,0,0,0,147,149,5,14,0,0,148,150,3,
        28,14,0,149,148,1,0,0,0,149,150,1,0,0,0,150,151,1,0,0,0,151,152,
        5,13,0,0,152,23,1,0,0,0,153,154,5,15,0,0,154,155,3,28,14,0,155,161,
        3,14,7,0,156,159,5,16,0,0,157,160,3,24,12,0,158,160,3,14,7,0,159,
        157,1,0,0,0,159,158,1,0,0,0,160,162,1,0,0,0,161,156,1,0,0,0,161,
        162,1,0,0,0,162,25,1,0,0,0,163,164,5,17,0,0,164,165,3,28,14,0,165,
        166,3,14,7,0,166,27,1,0,0,0,167,168,3,30,15,0,168,29,1,0,0,0,169,
        172,3,32,16,0,170,171,5,12,0,0,171,173,3,30,15,0,172,170,1,0,0,0,
        172,173,1,0,0,0,173,31,1,0,0,0,174,179,3,34,17,0,175,176,7,0,0,0,
        176,178,3,34,17,0,177,175,1,0,0,0,178,181,1,0,0,0,179,177,1,0,0,
        0,179,180,1,0,0,0,180,33,1,0,0,0,181,179,1,0,0,0,182,187,3,36,18,
        0,183,184,7,1,0,0,184,186,3,36,18,0,185,183,1,0,0,0,186,189,1,0,
        0,0,187,185,1,0,0,0,187,188,1,0,0,0,188,35,1,0,0,0,189,187,1,0,0,
        0,190,195,3,38,19,0,191,192,7,2,0,0,192,194,3,38,19,0,193,191,1,
        0,0,0,194,197,1,0,0,0,195,193,1,0,0,0,195,196,1,0,0,0,196,37,1,0,
        0,0,197,195,1,0,0,0,198,203,3,40,20,0,199,200,7,3,0,0,200,202,3,
        40,20,0,201,199,1,0,0,0,202,205,1,0,0,0,203,201,1,0,0,0,203,204,
        1,0,0,0,204,39,1,0,0,0,205,203,1,0,0,0,206,207,7,4,0,0,207,210,3,
        40,20,0,208,210,3,42,21,0,209,206,1,0,0,0,209,208,1,0,0,0,210,41,
        1,0,0,0,211,212,6,21,-1,0,212,221,5,34,0,0,213,221,3,52,26,0,214,
        221,3,44,22,0,215,216,5,2,0,0,216,217,3,28,14,0,217,218,5,3,0,0,
        218,221,1,0,0,0,219,221,3,46,23,0,220,211,1,0,0,0,220,213,1,0,0,
        0,220,214,1,0,0,0,220,215,1,0,0,0,220,219,1,0,0,0,221,227,1,0,0,
        0,222,223,10,1,0,0,223,224,5,32,0,0,224,226,5,34,0,0,225,222,1,0,
        0,0,226,229,1,0,0,0,227,225,1,0,0,0,227,228,1,0,0,0,228,43,1,0,0,
        0,229,227,1,0,0,0,230,231,5,34,0,0,231,240,5,2,0,0,232,237,3,28,
        14,0,233,234,5,5,0,0,234,236,3,28,14,0,235,233,1,0,0,0,236,239,1,
        0,0,0,237,235,1,0,0,0,237,238,1,0,0,0,238,241,1,0,0,0,239,237,1,
        0,0,0,240,232,1,0,0,0,240,241,1,0,0,0,241,242,1,0,0,0,242,243,5,
        3,0,0,243,45,1,0,0,0,244,245,5,34,0,0,245,254,5,8,0,0,246,251,3,
        48,24,0,247,248,5,5,0,0,248,250,3,48,24,0,249,247,1,0,0,0,250,253,
        1,0,0,0,251,249,1,0,0,0,251,252,1,0,0,0,252,255,1,0,0,0,253,251,
        1,0,0,0,254,246,1,0,0,0,254,255,1,0,0,0,255,256,1,0,0,0,256,257,
        5,9,0,0,257,47,1,0,0,0,258,259,5,34,0,0,259,260,5,6,0,0,260,261,
        3,28,14,0,261,49,1,0,0,0,262,273,5,34,0,0,263,265,5,33,0,0,264,266,
        5,11,0,0,265,264,1,0,0,0,265,266,1,0,0,0,266,267,1,0,0,0,267,273,
        3,50,25,0,268,269,5,2,0,0,269,270,3,50,25,0,270,271,5,3,0,0,271,
        273,1,0,0,0,272,262,1,0,0,0,272,263,1,0,0,0,272,268,1,0,0,0,273,
        51,1,0,0,0,274,275,7,5,0,0,275,53,1,0,0,0,30,57,65,71,76,85,89,101,
        110,116,127,131,136,140,149,159,161,172,179,187,195,203,209,220,
        227,237,240,251,254,265,272
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!rustedParser.__ATN) {
            rustedParser.__ATN = new antlr.ATNDeserializer().deserialize(rustedParser._serializedATN);
        }

        return rustedParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(rustedParser.literalNames, rustedParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return rustedParser.vocabulary;
    }

    private static readonly decisionsToDFA = rustedParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(rustedParser.EOF, 0)!;
    }
    public item(): ItemContext[];
    public item(i: number): ItemContext | null;
    public item(i?: number): ItemContext[] | ItemContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ItemContext);
        }

        return this.getRuleContext(i, ItemContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_program;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitProgram) {
             listener.exitProgram(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitProgram) {
            return visitor.visitProgram(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ItemContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public function(): FunctionContext | null {
        return this.getRuleContext(0, FunctionContext);
    }
    public struct_def(): Struct_defContext | null {
        return this.getRuleContext(0, Struct_defContext);
    }
    public let_statement(): Let_statementContext | null {
        return this.getRuleContext(0, Let_statementContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_item;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterItem) {
             listener.enterItem(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitItem) {
             listener.exitItem(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitItem) {
            return visitor.visitItem(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FunctionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(rustedParser.IDENTIFIER, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public parameter_list(): Parameter_listContext | null {
        return this.getRuleContext(0, Parameter_listContext);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_function;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterFunction) {
             listener.enterFunction(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitFunction) {
             listener.exitFunction(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitFunction) {
            return visitor.visitFunction(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Parameter_listContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public parameter(): ParameterContext[];
    public parameter(i: number): ParameterContext | null;
    public parameter(i?: number): ParameterContext[] | ParameterContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ParameterContext);
        }

        return this.getRuleContext(i, ParameterContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_parameter_list;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterParameter_list) {
             listener.enterParameter_list(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitParameter_list) {
             listener.exitParameter_list(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitParameter_list) {
            return visitor.visitParameter_list(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ParameterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(rustedParser.IDENTIFIER, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_parameter;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterParameter) {
             listener.enterParameter(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitParameter) {
             listener.exitParameter(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitParameter) {
            return visitor.visitParameter(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Struct_defContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(rustedParser.IDENTIFIER, 0)!;
    }
    public struct_field(): Struct_fieldContext[];
    public struct_field(i: number): Struct_fieldContext | null;
    public struct_field(i?: number): Struct_fieldContext[] | Struct_fieldContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Struct_fieldContext);
        }

        return this.getRuleContext(i, Struct_fieldContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_struct_def;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterStruct_def) {
             listener.enterStruct_def(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitStruct_def) {
             listener.exitStruct_def(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitStruct_def) {
            return visitor.visitStruct_def(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Struct_fieldContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(rustedParser.IDENTIFIER, 0)!;
    }
    public type(): TypeContext {
        return this.getRuleContext(0, TypeContext)!;
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_struct_field;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterStruct_field) {
             listener.enterStruct_field(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitStruct_field) {
             listener.exitStruct_field(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitStruct_field) {
            return visitor.visitStruct_field(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_block;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitBlock) {
             listener.exitBlock(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitBlock) {
            return visitor.visitBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public let_statement(): Let_statementContext | null {
        return this.getRuleContext(0, Let_statementContext);
    }
    public expression_statement(): Expression_statementContext | null {
        return this.getRuleContext(0, Expression_statementContext);
    }
    public return_statement(): Return_statementContext | null {
        return this.getRuleContext(0, Return_statementContext);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public if_statement(): If_statementContext | null {
        return this.getRuleContext(0, If_statementContext);
    }
    public while_statement(): While_statementContext | null {
        return this.getRuleContext(0, While_statementContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_statement;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitStatement) {
            return visitor.visitStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Let_statementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(rustedParser.IDENTIFIER, 0)!;
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_let_statement;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterLet_statement) {
             listener.enterLet_statement(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitLet_statement) {
             listener.exitLet_statement(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitLet_statement) {
            return visitor.visitLet_statement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expression_statementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_expression_statement;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterExpression_statement) {
             listener.enterExpression_statement(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitExpression_statement) {
             listener.exitExpression_statement(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitExpression_statement) {
            return visitor.visitExpression_statement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Return_statementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_return_statement;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterReturn_statement) {
             listener.enterReturn_statement(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitReturn_statement) {
             listener.exitReturn_statement(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitReturn_statement) {
            return visitor.visitReturn_statement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class If_statementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public block(): BlockContext[];
    public block(i: number): BlockContext | null;
    public block(i?: number): BlockContext[] | BlockContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BlockContext);
        }

        return this.getRuleContext(i, BlockContext);
    }
    public if_statement(): If_statementContext | null {
        return this.getRuleContext(0, If_statementContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_if_statement;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterIf_statement) {
             listener.enterIf_statement(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitIf_statement) {
             listener.exitIf_statement(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitIf_statement) {
            return visitor.visitIf_statement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class While_statementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_while_statement;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterWhile_statement) {
             listener.enterWhile_statement(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitWhile_statement) {
             listener.exitWhile_statement(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitWhile_statement) {
            return visitor.visitWhile_statement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public assignment_expr(): Assignment_exprContext {
        return this.getRuleContext(0, Assignment_exprContext)!;
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_expression;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Assignment_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public logical_expr(): Logical_exprContext {
        return this.getRuleContext(0, Logical_exprContext)!;
    }
    public assignment_expr(): Assignment_exprContext | null {
        return this.getRuleContext(0, Assignment_exprContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_assignment_expr;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterAssignment_expr) {
             listener.enterAssignment_expr(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitAssignment_expr) {
             listener.exitAssignment_expr(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitAssignment_expr) {
            return visitor.visitAssignment_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Logical_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public comparison_expr(): Comparison_exprContext[];
    public comparison_expr(i: number): Comparison_exprContext | null;
    public comparison_expr(i?: number): Comparison_exprContext[] | Comparison_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Comparison_exprContext);
        }

        return this.getRuleContext(i, Comparison_exprContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_logical_expr;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterLogical_expr) {
             listener.enterLogical_expr(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitLogical_expr) {
             listener.exitLogical_expr(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitLogical_expr) {
            return visitor.visitLogical_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Comparison_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public additive_expr(): Additive_exprContext[];
    public additive_expr(i: number): Additive_exprContext | null;
    public additive_expr(i?: number): Additive_exprContext[] | Additive_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Additive_exprContext);
        }

        return this.getRuleContext(i, Additive_exprContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_comparison_expr;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterComparison_expr) {
             listener.enterComparison_expr(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitComparison_expr) {
             listener.exitComparison_expr(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitComparison_expr) {
            return visitor.visitComparison_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Additive_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public multiplicative_expr(): Multiplicative_exprContext[];
    public multiplicative_expr(i: number): Multiplicative_exprContext | null;
    public multiplicative_expr(i?: number): Multiplicative_exprContext[] | Multiplicative_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Multiplicative_exprContext);
        }

        return this.getRuleContext(i, Multiplicative_exprContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_additive_expr;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterAdditive_expr) {
             listener.enterAdditive_expr(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitAdditive_expr) {
             listener.exitAdditive_expr(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitAdditive_expr) {
            return visitor.visitAdditive_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Multiplicative_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unary_expr(): Unary_exprContext[];
    public unary_expr(i: number): Unary_exprContext | null;
    public unary_expr(i?: number): Unary_exprContext[] | Unary_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Unary_exprContext);
        }

        return this.getRuleContext(i, Unary_exprContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_multiplicative_expr;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterMultiplicative_expr) {
             listener.enterMultiplicative_expr(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitMultiplicative_expr) {
             listener.exitMultiplicative_expr(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitMultiplicative_expr) {
            return visitor.visitMultiplicative_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Unary_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unary_expr(): Unary_exprContext | null {
        return this.getRuleContext(0, Unary_exprContext);
    }
    public primary_expr(): Primary_exprContext | null {
        return this.getRuleContext(0, Primary_exprContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_unary_expr;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterUnary_expr) {
             listener.enterUnary_expr(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitUnary_expr) {
             listener.exitUnary_expr(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitUnary_expr) {
            return visitor.visitUnary_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Primary_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(rustedParser.IDENTIFIER, 0);
    }
    public literal(): LiteralContext | null {
        return this.getRuleContext(0, LiteralContext);
    }
    public function_call(): Function_callContext | null {
        return this.getRuleContext(0, Function_callContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public struct_init(): Struct_initContext | null {
        return this.getRuleContext(0, Struct_initContext);
    }
    public primary_expr(): Primary_exprContext | null {
        return this.getRuleContext(0, Primary_exprContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_primary_expr;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterPrimary_expr) {
             listener.enterPrimary_expr(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitPrimary_expr) {
             listener.exitPrimary_expr(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitPrimary_expr) {
            return visitor.visitPrimary_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Function_callContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(rustedParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_function_call;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterFunction_call) {
             listener.enterFunction_call(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitFunction_call) {
             listener.exitFunction_call(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitFunction_call) {
            return visitor.visitFunction_call(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Struct_initContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(rustedParser.IDENTIFIER, 0)!;
    }
    public struct_init_field(): Struct_init_fieldContext[];
    public struct_init_field(i: number): Struct_init_fieldContext | null;
    public struct_init_field(i?: number): Struct_init_fieldContext[] | Struct_init_fieldContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Struct_init_fieldContext);
        }

        return this.getRuleContext(i, Struct_init_fieldContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_struct_init;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterStruct_init) {
             listener.enterStruct_init(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitStruct_init) {
             listener.exitStruct_init(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitStruct_init) {
            return visitor.visitStruct_init(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Struct_init_fieldContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(rustedParser.IDENTIFIER, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_struct_init_field;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterStruct_init_field) {
             listener.enterStruct_init_field(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitStruct_init_field) {
             listener.exitStruct_init_field(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitStruct_init_field) {
            return visitor.visitStruct_init_field(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TypeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(rustedParser.IDENTIFIER, 0);
    }
    public type(): TypeContext | null {
        return this.getRuleContext(0, TypeContext);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_type;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterType) {
             listener.enterType(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitType) {
             listener.exitType(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitType) {
            return visitor.visitType(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INTEGER_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(rustedParser.INTEGER_LITERAL, 0);
    }
    public BOOLEAN_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(rustedParser.BOOLEAN_LITERAL, 0);
    }
    public STRING_LITERAL(): antlr.TerminalNode | null {
        return this.getToken(rustedParser.STRING_LITERAL, 0);
    }
    public override get ruleIndex(): number {
        return rustedParser.RULE_literal;
    }
    public override enterRule(listener: rustedListener): void {
        if(listener.enterLiteral) {
             listener.enterLiteral(this);
        }
    }
    public override exitRule(listener: rustedListener): void {
        if(listener.exitLiteral) {
             listener.exitLiteral(this);
        }
    }
    public override accept<Result>(visitor: rustedVisitor<Result>): Result | null {
        if (visitor.visitLiteral) {
            return visitor.visitLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
