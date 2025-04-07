// Generated from src/Rusted.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";

import { RustedListener } from "./rustedListener.js";
import { RustedVisitor } from "./rustedVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export class RustedParser extends antlr.Parser {
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
  public static readonly IDENTIFIER = 32;
  public static readonly INTEGER_LITERAL = 33;
  public static readonly BOOLEAN_LITERAL = 34;
  public static readonly STRING_LITERAL = 35;
  public static readonly COMMENT = 36;
  public static readonly MULTILINE_COMMENT = 37;
  public static readonly WS = 38;
  public static readonly RULE_program = 0;
  public static readonly RULE_item = 1;
  public static readonly RULE_function = 2;
  public static readonly RULE_parameter_list = 3;
  public static readonly RULE_parameter = 4;
  public static readonly RULE_block = 5;
  public static readonly RULE_statement = 6;
  public static readonly RULE_let_statement = 7;
  public static readonly RULE_expression_statement = 8;
  public static readonly RULE_return_statement = 9;
  public static readonly RULE_if_statement = 10;
  public static readonly RULE_while_statement = 11;
  public static readonly RULE_expression = 12;
  public static readonly RULE_assignment_expr = 13;
  public static readonly RULE_logical_expr = 14;
  public static readonly RULE_comparison_expr = 15;
  public static readonly RULE_additive_expr = 16;
  public static readonly RULE_multiplicative_expr = 17;
  public static readonly RULE_unary_expr = 18;
  public static readonly RULE_ref_primary_expr = 19;
  public static readonly RULE_primary_expr = 20;
  public static readonly RULE_function_call = 21;
  public static readonly RULE_type = 22;
  public static readonly RULE_literal = 23;

  public static readonly literalNames = [
    null,
    "'fn'",
    "'('",
    "')'",
    "'->'",
    "','",
    "':'",
    "'{'",
    "'}'",
    "'let'",
    "'mut'",
    "'='",
    "';'",
    "'return'",
    "'if'",
    "'else'",
    "'while'",
    "'&&'",
    "'||'",
    "'=='",
    "'!='",
    "'<'",
    "'<='",
    "'>'",
    "'>='",
    "'+'",
    "'-'",
    "'*'",
    "'/'",
    "'%'",
    "'!'",
    "'&'",
  ];

  public static readonly symbolicNames = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "IDENTIFIER",
    "INTEGER_LITERAL",
    "BOOLEAN_LITERAL",
    "STRING_LITERAL",
    "COMMENT",
    "MULTILINE_COMMENT",
    "WS",
  ];
  public static readonly ruleNames = [
    "program",
    "item",
    "function",
    "parameter_list",
    "parameter",
    "block",
    "statement",
    "let_statement",
    "expression_statement",
    "return_statement",
    "if_statement",
    "while_statement",
    "expression",
    "assignment_expr",
    "logical_expr",
    "comparison_expr",
    "additive_expr",
    "multiplicative_expr",
    "unary_expr",
    "ref_primary_expr",
    "primary_expr",
    "function_call",
    "type",
    "literal",
  ];

  public get grammarFileName(): string {
    return "rusted.g4";
  }
  public get literalNames(): (string | null)[] {
    return RustedParser.literalNames;
  }
  public get symbolicNames(): (string | null)[] {
    return RustedParser.symbolicNames;
  }
  public get ruleNames(): string[] {
    return RustedParser.ruleNames;
  }
  public get serializedATN(): number[] {
    return RustedParser._serializedATN;
  }

  protected createFailedPredicateException(
    predicate?: string,
    message?: string
  ): antlr.FailedPredicateException {
    return new antlr.FailedPredicateException(this, predicate, message);
  }

  public constructor(input: antlr.TokenStream) {
    super(input);
    this.interpreter = new antlr.ParserATNSimulator(
      this,
      RustedParser._ATN,
      RustedParser.decisionsToDFA,
      new antlr.PredictionContextCache()
    );
  }
  public program(): ProgramContext {
    let localContext = new ProgramContext(this.context, this.state);
    this.enterRule(localContext, 0, RustedParser.RULE_program);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 51;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 1 || _la === 9) {
          {
            {
              this.state = 48;
              this.item();
            }
          }
          this.state = 53;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 54;
        this.match(RustedParser.EOF);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public item(): ItemContext {
    let localContext = new ItemContext(this.context, this.state);
    this.enterRule(localContext, 2, RustedParser.RULE_item);
    try {
      this.state = 58;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RustedParser.T__0:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 56;
            this.function_();
          }
          break;
        case RustedParser.T__8:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 57;
            this.let_statement();
          }
          break;
        default:
          throw new antlr.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public function_(): FunctionContext {
    let localContext = new FunctionContext(this.context, this.state);
    this.enterRule(localContext, 4, RustedParser.RULE_function);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 60;
        this.match(RustedParser.T__0);
        this.state = 61;
        this.match(RustedParser.IDENTIFIER);
        this.state = 62;
        this.match(RustedParser.T__1);
        this.state = 64;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 32) {
          {
            this.state = 63;
            this.parameter_list();
          }
        }

        this.state = 66;
        this.match(RustedParser.T__2);
        this.state = 67;
        this.match(RustedParser.T__3);
        this.state = 68;
        this.type_();
        this.state = 69;
        this.block();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public parameter_list(): Parameter_listContext {
    let localContext = new Parameter_listContext(this.context, this.state);
    this.enterRule(localContext, 6, RustedParser.RULE_parameter_list);
    let _la: number;
    try {
      let alternative: number;
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 71;
        this.parameter();
        this.state = 76;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(
          this.tokenStream,
          3,
          this.context
        );
        while (
          alternative !== 2 &&
          alternative !== antlr.ATN.INVALID_ALT_NUMBER
        ) {
          if (alternative === 1) {
            {
              {
                this.state = 72;
                this.match(RustedParser.T__4);
                this.state = 73;
                this.parameter();
              }
            }
          }
          this.state = 78;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(
            this.tokenStream,
            3,
            this.context
          );
        }
        this.state = 80;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 5) {
          {
            this.state = 79;
            this.match(RustedParser.T__4);
          }
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public parameter(): ParameterContext {
    let localContext = new ParameterContext(this.context, this.state);
    this.enterRule(localContext, 8, RustedParser.RULE_parameter);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 82;
        this.match(RustedParser.IDENTIFIER);
        this.state = 83;
        this.match(RustedParser.T__5);
        this.state = 84;
        this.type_();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public block(): BlockContext {
    let localContext = new BlockContext(this.context, this.state);
    this.enterRule(localContext, 10, RustedParser.RULE_block);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 86;
        this.match(RustedParser.T__6);
        this.state = 90;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3422642820) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 15) !== 0)
        ) {
          {
            {
              this.state = 87;
              this.statement();
            }
          }
          this.state = 92;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
        this.state = 93;
        this.match(RustedParser.T__7);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public statement(): StatementContext {
    let localContext = new StatementContext(this.context, this.state);
    this.enterRule(localContext, 12, RustedParser.RULE_statement);
    try {
      this.state = 101;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RustedParser.T__8:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 95;
            this.let_statement();
          }
          break;
        case RustedParser.T__1:
        case RustedParser.T__25:
        case RustedParser.T__26:
        case RustedParser.T__29:
        case RustedParser.T__30:
        case RustedParser.IDENTIFIER:
        case RustedParser.INTEGER_LITERAL:
        case RustedParser.BOOLEAN_LITERAL:
        case RustedParser.STRING_LITERAL:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 96;
            this.expression_statement();
          }
          break;
        case RustedParser.T__12:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 97;
            this.return_statement();
          }
          break;
        case RustedParser.T__6:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 98;
            this.block();
          }
          break;
        case RustedParser.T__13:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 99;
            this.if_statement();
          }
          break;
        case RustedParser.T__15:
          this.enterOuterAlt(localContext, 6);
          {
            this.state = 100;
            this.while_statement();
          }
          break;
        default:
          throw new antlr.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public let_statement(): Let_statementContext {
    let localContext = new Let_statementContext(this.context, this.state);
    this.enterRule(localContext, 14, RustedParser.RULE_let_statement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 103;
        this.match(RustedParser.T__8);
        this.state = 105;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 10) {
          {
            this.state = 104;
            this.match(RustedParser.T__9);
          }
        }

        this.state = 107;
        this.match(RustedParser.IDENTIFIER);
        this.state = 108;
        this.match(RustedParser.T__5);
        this.state = 109;
        this.type_();
        this.state = 112;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 11) {
          {
            this.state = 110;
            this.match(RustedParser.T__10);
            this.state = 111;
            this.expression();
          }
        }

        this.state = 114;
        this.match(RustedParser.T__11);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public expression_statement(): Expression_statementContext {
    let localContext = new Expression_statementContext(
      this.context,
      this.state
    );
    this.enterRule(localContext, 16, RustedParser.RULE_expression_statement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 116;
        this.expression();
        this.state = 117;
        this.match(RustedParser.T__11);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public return_statement(): Return_statementContext {
    let localContext = new Return_statementContext(this.context, this.state);
    this.enterRule(localContext, 18, RustedParser.RULE_return_statement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 119;
        this.match(RustedParser.T__12);
        this.state = 121;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3422552068) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 15) !== 0)
        ) {
          {
            this.state = 120;
            this.expression();
          }
        }

        this.state = 123;
        this.match(RustedParser.T__11);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public if_statement(): If_statementContext {
    let localContext = new If_statementContext(this.context, this.state);
    this.enterRule(localContext, 20, RustedParser.RULE_if_statement);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 125;
        this.match(RustedParser.T__13);
        this.state = 126;
        this.expression();
        this.state = 127;
        this.block();
        this.state = 133;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 15) {
          {
            this.state = 128;
            this.match(RustedParser.T__14);
            this.state = 131;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
              case RustedParser.T__13:
                {
                  this.state = 129;
                  this.if_statement();
                }
                break;
              case RustedParser.T__6:
                {
                  this.state = 130;
                  this.block();
                }
                break;
              default:
                throw new antlr.NoViableAltException(this);
            }
          }
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public while_statement(): While_statementContext {
    let localContext = new While_statementContext(this.context, this.state);
    this.enterRule(localContext, 22, RustedParser.RULE_while_statement);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 135;
        this.match(RustedParser.T__15);
        this.state = 136;
        this.expression();
        this.state = 137;
        this.block();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public expression(): ExpressionContext {
    let localContext = new ExpressionContext(this.context, this.state);
    this.enterRule(localContext, 24, RustedParser.RULE_expression);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 139;
        this.assignment_expr();
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public assignment_expr(): Assignment_exprContext {
    let localContext = new Assignment_exprContext(this.context, this.state);
    this.enterRule(localContext, 26, RustedParser.RULE_assignment_expr);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 141;
        this.logical_expr();
        this.state = 144;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (_la === 11) {
          {
            this.state = 142;
            this.match(RustedParser.T__10);
            this.state = 143;
            this.assignment_expr();
          }
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public logical_expr(): Logical_exprContext {
    let localContext = new Logical_exprContext(this.context, this.state);
    this.enterRule(localContext, 28, RustedParser.RULE_logical_expr);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 146;
        this.comparison_expr();
        this.state = 151;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 17 || _la === 18) {
          {
            {
              this.state = 147;
              _la = this.tokenStream.LA(1);
              if (!(_la === 17 || _la === 18)) {
                this.errorHandler.recoverInline(this);
              } else {
                this.errorHandler.reportMatch(this);
                this.consume();
              }
              this.state = 148;
              this.comparison_expr();
            }
          }
          this.state = 153;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public comparison_expr(): Comparison_exprContext {
    let localContext = new Comparison_exprContext(this.context, this.state);
    this.enterRule(localContext, 30, RustedParser.RULE_comparison_expr);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 154;
        this.additive_expr();
        this.state = 159;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while ((_la & ~0x1f) === 0 && ((1 << _la) & 33030144) !== 0) {
          {
            {
              this.state = 155;
              _la = this.tokenStream.LA(1);
              if (!((_la & ~0x1f) === 0 && ((1 << _la) & 33030144) !== 0)) {
                this.errorHandler.recoverInline(this);
              } else {
                this.errorHandler.reportMatch(this);
                this.consume();
              }
              this.state = 156;
              this.additive_expr();
            }
          }
          this.state = 161;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public additive_expr(): Additive_exprContext {
    let localContext = new Additive_exprContext(this.context, this.state);
    this.enterRule(localContext, 32, RustedParser.RULE_additive_expr);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 162;
        this.multiplicative_expr();
        this.state = 167;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while (_la === 25 || _la === 26) {
          {
            {
              this.state = 163;
              _la = this.tokenStream.LA(1);
              if (!(_la === 25 || _la === 26)) {
                this.errorHandler.recoverInline(this);
              } else {
                this.errorHandler.reportMatch(this);
                this.consume();
              }
              this.state = 164;
              this.multiplicative_expr();
            }
          }
          this.state = 169;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public multiplicative_expr(): Multiplicative_exprContext {
    let localContext = new Multiplicative_exprContext(this.context, this.state);
    this.enterRule(localContext, 34, RustedParser.RULE_multiplicative_expr);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 170;
        this.unary_expr();
        this.state = 175;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        while ((_la & ~0x1f) === 0 && ((1 << _la) & 939524096) !== 0) {
          {
            {
              this.state = 171;
              _la = this.tokenStream.LA(1);
              if (!((_la & ~0x1f) === 0 && ((1 << _la) & 939524096) !== 0)) {
                this.errorHandler.recoverInline(this);
              } else {
                this.errorHandler.reportMatch(this);
                this.consume();
              }
              this.state = 172;
              this.unary_expr();
            }
          }
          this.state = 177;
          this.errorHandler.sync(this);
          _la = this.tokenStream.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public unary_expr(): Unary_exprContext {
    let localContext = new Unary_exprContext(this.context, this.state);
    this.enterRule(localContext, 36, RustedParser.RULE_unary_expr);
    let _la: number;
    try {
      this.state = 181;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RustedParser.T__25:
        case RustedParser.T__29:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 178;
            _la = this.tokenStream.LA(1);
            if (!(_la === 26 || _la === 30)) {
              this.errorHandler.recoverInline(this);
            } else {
              this.errorHandler.reportMatch(this);
              this.consume();
            }
            this.state = 179;
            this.unary_expr();
          }
          break;
        case RustedParser.T__1:
        case RustedParser.T__26:
        case RustedParser.T__30:
        case RustedParser.IDENTIFIER:
        case RustedParser.INTEGER_LITERAL:
        case RustedParser.BOOLEAN_LITERAL:
        case RustedParser.STRING_LITERAL:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 180;
            this.ref_primary_expr();
          }
          break;
        default:
          throw new antlr.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public ref_primary_expr(): Ref_primary_exprContext {
    let localContext = new Ref_primary_exprContext(this.context, this.state);
    this.enterRule(localContext, 38, RustedParser.RULE_ref_primary_expr);
    let _la: number;
    try {
      this.state = 191;
      this.errorHandler.sync(this);
      switch (this.tokenStream.LA(1)) {
        case RustedParser.T__1:
        case RustedParser.IDENTIFIER:
        case RustedParser.INTEGER_LITERAL:
        case RustedParser.BOOLEAN_LITERAL:
        case RustedParser.STRING_LITERAL:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 183;
            this.primary_expr();
          }
          break;
        case RustedParser.T__30:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 184;
            this.match(RustedParser.T__30);
            this.state = 186;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 10) {
              {
                this.state = 185;
                this.match(RustedParser.T__9);
              }
            }

            this.state = 188;
            this.primary_expr();
          }
          break;
        case RustedParser.T__26:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 189;
            this.match(RustedParser.T__26);
            this.state = 190;
            this.primary_expr();
          }
          break;
        default:
          throw new antlr.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public primary_expr(): Primary_exprContext {
    let localContext = new Primary_exprContext(this.context, this.state);
    this.enterRule(localContext, 40, RustedParser.RULE_primary_expr);
    try {
      this.state = 200;
      this.errorHandler.sync(this);
      switch (
        this.interpreter.adaptivePredict(this.tokenStream, 20, this.context)
      ) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 193;
            this.match(RustedParser.IDENTIFIER);
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 194;
            this.literal();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 195;
            this.function_call();
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 196;
            this.match(RustedParser.T__1);
            this.state = 197;
            this.expression();
            this.state = 198;
            this.match(RustedParser.T__2);
          }
          break;
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public function_call(): Function_callContext {
    let localContext = new Function_callContext(this.context, this.state);
    this.enterRule(localContext, 42, RustedParser.RULE_function_call);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 202;
        this.match(RustedParser.IDENTIFIER);
        this.state = 203;
        this.match(RustedParser.T__1);
        this.state = 212;
        this.errorHandler.sync(this);
        _la = this.tokenStream.LA(1);
        if (
          ((_la & ~0x1f) === 0 && ((1 << _la) & 3422552068) !== 0) ||
          (((_la - 32) & ~0x1f) === 0 && ((1 << (_la - 32)) & 15) !== 0)
        ) {
          {
            this.state = 204;
            this.expression();
            this.state = 209;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
              {
                {
                  this.state = 205;
                  this.match(RustedParser.T__4);
                  this.state = 206;
                  this.expression();
                }
              }
              this.state = 211;
              this.errorHandler.sync(this);
              _la = this.tokenStream.LA(1);
            }
          }
        }

        this.state = 214;
        this.match(RustedParser.T__2);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public type_(): TypeContext {
    let localContext = new TypeContext(this.context, this.state);
    this.enterRule(localContext, 44, RustedParser.RULE_type);
    let _la: number;
    try {
      this.state = 243;
      this.errorHandler.sync(this);
      switch (
        this.interpreter.adaptivePredict(this.tokenStream, 26, this.context)
      ) {
        case 1:
          this.enterOuterAlt(localContext, 1);
          {
            this.state = 216;
            this.match(RustedParser.IDENTIFIER);
          }
          break;
        case 2:
          this.enterOuterAlt(localContext, 2);
          {
            this.state = 217;
            this.match(RustedParser.T__30);
            this.state = 219;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 10) {
              {
                this.state = 218;
                this.match(RustedParser.T__9);
              }
            }

            this.state = 221;
            this.type_();
          }
          break;
        case 3:
          this.enterOuterAlt(localContext, 3);
          {
            this.state = 222;
            this.match(RustedParser.T__1);
            this.state = 223;
            this.type_();
            this.state = 224;
            this.match(RustedParser.T__2);
          }
          break;
        case 4:
          this.enterOuterAlt(localContext, 4);
          {
            this.state = 226;
            this.match(RustedParser.T__1);
            this.state = 227;
            this.match(RustedParser.T__2);
          }
          break;
        case 5:
          this.enterOuterAlt(localContext, 5);
          {
            this.state = 228;
            this.match(RustedParser.T__0);
            this.state = 229;
            this.match(RustedParser.T__1);
            this.state = 238;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (
              ((_la - 1) & ~0x1f) === 0 &&
              ((1 << (_la - 1)) & 3221225475) !== 0
            ) {
              {
                this.state = 230;
                this.type_();
                this.state = 235;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                  {
                    {
                      this.state = 231;
                      this.match(RustedParser.T__4);
                      this.state = 232;
                      this.type_();
                    }
                  }
                  this.state = 237;
                  this.errorHandler.sync(this);
                  _la = this.tokenStream.LA(1);
                }
              }
            }

            this.state = 240;
            this.match(RustedParser.T__2);
            this.state = 241;
            this.match(RustedParser.T__3);
            this.state = 242;
            this.type_();
          }
          break;
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }
  public literal(): LiteralContext {
    let localContext = new LiteralContext(this.context, this.state);
    this.enterRule(localContext, 46, RustedParser.RULE_literal);
    let _la: number;
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 245;
        _la = this.tokenStream.LA(1);
        if (!(((_la - 33) & ~0x1f) === 0 && ((1 << (_la - 33)) & 7) !== 0)) {
          this.errorHandler.recoverInline(this);
        } else {
          this.errorHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localContext;
  }

  public static readonly _serializedATN: number[] = [
    4, 1, 38, 248, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4,
    2, 5, 7, 5, 2, 6, 7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 2, 10, 7, 10, 2,
    11, 7, 11, 2, 12, 7, 12, 2, 13, 7, 13, 2, 14, 7, 14, 2, 15, 7, 15, 2, 16, 7,
    16, 2, 17, 7, 17, 2, 18, 7, 18, 2, 19, 7, 19, 2, 20, 7, 20, 2, 21, 7, 21, 2,
    22, 7, 22, 2, 23, 7, 23, 1, 0, 5, 0, 50, 8, 0, 10, 0, 12, 0, 53, 9, 0, 1, 0,
    1, 0, 1, 1, 1, 1, 3, 1, 59, 8, 1, 1, 2, 1, 2, 1, 2, 1, 2, 3, 2, 65, 8, 2, 1,
    2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3, 1, 3, 1, 3, 5, 3, 75, 8, 3, 10, 3, 12, 3,
    78, 9, 3, 1, 3, 3, 3, 81, 8, 3, 1, 4, 1, 4, 1, 4, 1, 4, 1, 5, 1, 5, 5, 5,
    89, 8, 5, 10, 5, 12, 5, 92, 9, 5, 1, 5, 1, 5, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6,
    1, 6, 3, 6, 102, 8, 6, 1, 7, 1, 7, 3, 7, 106, 8, 7, 1, 7, 1, 7, 1, 7, 1, 7,
    1, 7, 3, 7, 113, 8, 7, 1, 7, 1, 7, 1, 8, 1, 8, 1, 8, 1, 9, 1, 9, 3, 9, 122,
    8, 9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 3, 10, 132, 8,
    10, 3, 10, 134, 8, 10, 1, 11, 1, 11, 1, 11, 1, 11, 1, 12, 1, 12, 1, 13, 1,
    13, 1, 13, 3, 13, 145, 8, 13, 1, 14, 1, 14, 1, 14, 5, 14, 150, 8, 14, 10,
    14, 12, 14, 153, 9, 14, 1, 15, 1, 15, 1, 15, 5, 15, 158, 8, 15, 10, 15, 12,
    15, 161, 9, 15, 1, 16, 1, 16, 1, 16, 5, 16, 166, 8, 16, 10, 16, 12, 16, 169,
    9, 16, 1, 17, 1, 17, 1, 17, 5, 17, 174, 8, 17, 10, 17, 12, 17, 177, 9, 17,
    1, 18, 1, 18, 1, 18, 3, 18, 182, 8, 18, 1, 19, 1, 19, 1, 19, 3, 19, 187, 8,
    19, 1, 19, 1, 19, 1, 19, 3, 19, 192, 8, 19, 1, 20, 1, 20, 1, 20, 1, 20, 1,
    20, 1, 20, 1, 20, 3, 20, 201, 8, 20, 1, 21, 1, 21, 1, 21, 1, 21, 1, 21, 5,
    21, 208, 8, 21, 10, 21, 12, 21, 211, 9, 21, 3, 21, 213, 8, 21, 1, 21, 1, 21,
    1, 22, 1, 22, 1, 22, 3, 22, 220, 8, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22,
    1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 1, 22, 5, 22, 234, 8, 22, 10, 22,
    12, 22, 237, 9, 22, 3, 22, 239, 8, 22, 1, 22, 1, 22, 1, 22, 3, 22, 244, 8,
    22, 1, 23, 1, 23, 1, 23, 0, 0, 24, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20,
    22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 0, 6, 1, 0, 17, 18, 1,
    0, 19, 24, 1, 0, 25, 26, 1, 0, 27, 29, 2, 0, 26, 26, 30, 30, 1, 0, 33, 35,
    260, 0, 51, 1, 0, 0, 0, 2, 58, 1, 0, 0, 0, 4, 60, 1, 0, 0, 0, 6, 71, 1, 0,
    0, 0, 8, 82, 1, 0, 0, 0, 10, 86, 1, 0, 0, 0, 12, 101, 1, 0, 0, 0, 14, 103,
    1, 0, 0, 0, 16, 116, 1, 0, 0, 0, 18, 119, 1, 0, 0, 0, 20, 125, 1, 0, 0, 0,
    22, 135, 1, 0, 0, 0, 24, 139, 1, 0, 0, 0, 26, 141, 1, 0, 0, 0, 28, 146, 1,
    0, 0, 0, 30, 154, 1, 0, 0, 0, 32, 162, 1, 0, 0, 0, 34, 170, 1, 0, 0, 0, 36,
    181, 1, 0, 0, 0, 38, 191, 1, 0, 0, 0, 40, 200, 1, 0, 0, 0, 42, 202, 1, 0, 0,
    0, 44, 243, 1, 0, 0, 0, 46, 245, 1, 0, 0, 0, 48, 50, 3, 2, 1, 0, 49, 48, 1,
    0, 0, 0, 50, 53, 1, 0, 0, 0, 51, 49, 1, 0, 0, 0, 51, 52, 1, 0, 0, 0, 52, 54,
    1, 0, 0, 0, 53, 51, 1, 0, 0, 0, 54, 55, 5, 0, 0, 1, 55, 1, 1, 0, 0, 0, 56,
    59, 3, 4, 2, 0, 57, 59, 3, 14, 7, 0, 58, 56, 1, 0, 0, 0, 58, 57, 1, 0, 0, 0,
    59, 3, 1, 0, 0, 0, 60, 61, 5, 1, 0, 0, 61, 62, 5, 32, 0, 0, 62, 64, 5, 2, 0,
    0, 63, 65, 3, 6, 3, 0, 64, 63, 1, 0, 0, 0, 64, 65, 1, 0, 0, 0, 65, 66, 1, 0,
    0, 0, 66, 67, 5, 3, 0, 0, 67, 68, 5, 4, 0, 0, 68, 69, 3, 44, 22, 0, 69, 70,
    3, 10, 5, 0, 70, 5, 1, 0, 0, 0, 71, 76, 3, 8, 4, 0, 72, 73, 5, 5, 0, 0, 73,
    75, 3, 8, 4, 0, 74, 72, 1, 0, 0, 0, 75, 78, 1, 0, 0, 0, 76, 74, 1, 0, 0, 0,
    76, 77, 1, 0, 0, 0, 77, 80, 1, 0, 0, 0, 78, 76, 1, 0, 0, 0, 79, 81, 5, 5, 0,
    0, 80, 79, 1, 0, 0, 0, 80, 81, 1, 0, 0, 0, 81, 7, 1, 0, 0, 0, 82, 83, 5, 32,
    0, 0, 83, 84, 5, 6, 0, 0, 84, 85, 3, 44, 22, 0, 85, 9, 1, 0, 0, 0, 86, 90,
    5, 7, 0, 0, 87, 89, 3, 12, 6, 0, 88, 87, 1, 0, 0, 0, 89, 92, 1, 0, 0, 0, 90,
    88, 1, 0, 0, 0, 90, 91, 1, 0, 0, 0, 91, 93, 1, 0, 0, 0, 92, 90, 1, 0, 0, 0,
    93, 94, 5, 8, 0, 0, 94, 11, 1, 0, 0, 0, 95, 102, 3, 14, 7, 0, 96, 102, 3,
    16, 8, 0, 97, 102, 3, 18, 9, 0, 98, 102, 3, 10, 5, 0, 99, 102, 3, 20, 10, 0,
    100, 102, 3, 22, 11, 0, 101, 95, 1, 0, 0, 0, 101, 96, 1, 0, 0, 0, 101, 97,
    1, 0, 0, 0, 101, 98, 1, 0, 0, 0, 101, 99, 1, 0, 0, 0, 101, 100, 1, 0, 0, 0,
    102, 13, 1, 0, 0, 0, 103, 105, 5, 9, 0, 0, 104, 106, 5, 10, 0, 0, 105, 104,
    1, 0, 0, 0, 105, 106, 1, 0, 0, 0, 106, 107, 1, 0, 0, 0, 107, 108, 5, 32, 0,
    0, 108, 109, 5, 6, 0, 0, 109, 112, 3, 44, 22, 0, 110, 111, 5, 11, 0, 0, 111,
    113, 3, 24, 12, 0, 112, 110, 1, 0, 0, 0, 112, 113, 1, 0, 0, 0, 113, 114, 1,
    0, 0, 0, 114, 115, 5, 12, 0, 0, 115, 15, 1, 0, 0, 0, 116, 117, 3, 24, 12, 0,
    117, 118, 5, 12, 0, 0, 118, 17, 1, 0, 0, 0, 119, 121, 5, 13, 0, 0, 120, 122,
    3, 24, 12, 0, 121, 120, 1, 0, 0, 0, 121, 122, 1, 0, 0, 0, 122, 123, 1, 0, 0,
    0, 123, 124, 5, 12, 0, 0, 124, 19, 1, 0, 0, 0, 125, 126, 5, 14, 0, 0, 126,
    127, 3, 24, 12, 0, 127, 133, 3, 10, 5, 0, 128, 131, 5, 15, 0, 0, 129, 132,
    3, 20, 10, 0, 130, 132, 3, 10, 5, 0, 131, 129, 1, 0, 0, 0, 131, 130, 1, 0,
    0, 0, 132, 134, 1, 0, 0, 0, 133, 128, 1, 0, 0, 0, 133, 134, 1, 0, 0, 0, 134,
    21, 1, 0, 0, 0, 135, 136, 5, 16, 0, 0, 136, 137, 3, 24, 12, 0, 137, 138, 3,
    10, 5, 0, 138, 23, 1, 0, 0, 0, 139, 140, 3, 26, 13, 0, 140, 25, 1, 0, 0, 0,
    141, 144, 3, 28, 14, 0, 142, 143, 5, 11, 0, 0, 143, 145, 3, 26, 13, 0, 144,
    142, 1, 0, 0, 0, 144, 145, 1, 0, 0, 0, 145, 27, 1, 0, 0, 0, 146, 151, 3, 30,
    15, 0, 147, 148, 7, 0, 0, 0, 148, 150, 3, 30, 15, 0, 149, 147, 1, 0, 0, 0,
    150, 153, 1, 0, 0, 0, 151, 149, 1, 0, 0, 0, 151, 152, 1, 0, 0, 0, 152, 29,
    1, 0, 0, 0, 153, 151, 1, 0, 0, 0, 154, 159, 3, 32, 16, 0, 155, 156, 7, 1, 0,
    0, 156, 158, 3, 32, 16, 0, 157, 155, 1, 0, 0, 0, 158, 161, 1, 0, 0, 0, 159,
    157, 1, 0, 0, 0, 159, 160, 1, 0, 0, 0, 160, 31, 1, 0, 0, 0, 161, 159, 1, 0,
    0, 0, 162, 167, 3, 34, 17, 0, 163, 164, 7, 2, 0, 0, 164, 166, 3, 34, 17, 0,
    165, 163, 1, 0, 0, 0, 166, 169, 1, 0, 0, 0, 167, 165, 1, 0, 0, 0, 167, 168,
    1, 0, 0, 0, 168, 33, 1, 0, 0, 0, 169, 167, 1, 0, 0, 0, 170, 175, 3, 36, 18,
    0, 171, 172, 7, 3, 0, 0, 172, 174, 3, 36, 18, 0, 173, 171, 1, 0, 0, 0, 174,
    177, 1, 0, 0, 0, 175, 173, 1, 0, 0, 0, 175, 176, 1, 0, 0, 0, 176, 35, 1, 0,
    0, 0, 177, 175, 1, 0, 0, 0, 178, 179, 7, 4, 0, 0, 179, 182, 3, 36, 18, 0,
    180, 182, 3, 38, 19, 0, 181, 178, 1, 0, 0, 0, 181, 180, 1, 0, 0, 0, 182, 37,
    1, 0, 0, 0, 183, 192, 3, 40, 20, 0, 184, 186, 5, 31, 0, 0, 185, 187, 5, 10,
    0, 0, 186, 185, 1, 0, 0, 0, 186, 187, 1, 0, 0, 0, 187, 188, 1, 0, 0, 0, 188,
    192, 3, 40, 20, 0, 189, 190, 5, 27, 0, 0, 190, 192, 3, 40, 20, 0, 191, 183,
    1, 0, 0, 0, 191, 184, 1, 0, 0, 0, 191, 189, 1, 0, 0, 0, 192, 39, 1, 0, 0, 0,
    193, 201, 5, 32, 0, 0, 194, 201, 3, 46, 23, 0, 195, 201, 3, 42, 21, 0, 196,
    197, 5, 2, 0, 0, 197, 198, 3, 24, 12, 0, 198, 199, 5, 3, 0, 0, 199, 201, 1,
    0, 0, 0, 200, 193, 1, 0, 0, 0, 200, 194, 1, 0, 0, 0, 200, 195, 1, 0, 0, 0,
    200, 196, 1, 0, 0, 0, 201, 41, 1, 0, 0, 0, 202, 203, 5, 32, 0, 0, 203, 212,
    5, 2, 0, 0, 204, 209, 3, 24, 12, 0, 205, 206, 5, 5, 0, 0, 206, 208, 3, 24,
    12, 0, 207, 205, 1, 0, 0, 0, 208, 211, 1, 0, 0, 0, 209, 207, 1, 0, 0, 0,
    209, 210, 1, 0, 0, 0, 210, 213, 1, 0, 0, 0, 211, 209, 1, 0, 0, 0, 212, 204,
    1, 0, 0, 0, 212, 213, 1, 0, 0, 0, 213, 214, 1, 0, 0, 0, 214, 215, 5, 3, 0,
    0, 215, 43, 1, 0, 0, 0, 216, 244, 5, 32, 0, 0, 217, 219, 5, 31, 0, 0, 218,
    220, 5, 10, 0, 0, 219, 218, 1, 0, 0, 0, 219, 220, 1, 0, 0, 0, 220, 221, 1,
    0, 0, 0, 221, 244, 3, 44, 22, 0, 222, 223, 5, 2, 0, 0, 223, 224, 3, 44, 22,
    0, 224, 225, 5, 3, 0, 0, 225, 244, 1, 0, 0, 0, 226, 227, 5, 2, 0, 0, 227,
    244, 5, 3, 0, 0, 228, 229, 5, 1, 0, 0, 229, 238, 5, 2, 0, 0, 230, 235, 3,
    44, 22, 0, 231, 232, 5, 5, 0, 0, 232, 234, 3, 44, 22, 0, 233, 231, 1, 0, 0,
    0, 234, 237, 1, 0, 0, 0, 235, 233, 1, 0, 0, 0, 235, 236, 1, 0, 0, 0, 236,
    239, 1, 0, 0, 0, 237, 235, 1, 0, 0, 0, 238, 230, 1, 0, 0, 0, 238, 239, 1, 0,
    0, 0, 239, 240, 1, 0, 0, 0, 240, 241, 5, 3, 0, 0, 241, 242, 5, 4, 0, 0, 242,
    244, 3, 44, 22, 0, 243, 216, 1, 0, 0, 0, 243, 217, 1, 0, 0, 0, 243, 222, 1,
    0, 0, 0, 243, 226, 1, 0, 0, 0, 243, 228, 1, 0, 0, 0, 244, 45, 1, 0, 0, 0,
    245, 246, 7, 5, 0, 0, 246, 47, 1, 0, 0, 0, 27, 51, 58, 64, 76, 80, 90, 101,
    105, 112, 121, 131, 133, 144, 151, 159, 167, 175, 181, 186, 191, 200, 209,
    212, 219, 235, 238, 243,
  ];

  private static __ATN: antlr.ATN;
  public static get _ATN(): antlr.ATN {
    if (!RustedParser.__ATN) {
      RustedParser.__ATN = new antlr.ATNDeserializer().deserialize(
        RustedParser._serializedATN
      );
    }

    return RustedParser.__ATN;
  }

  private static readonly vocabulary = new antlr.Vocabulary(
    RustedParser.literalNames,
    RustedParser.symbolicNames,
    []
  );

  public override get vocabulary(): antlr.Vocabulary {
    return RustedParser.vocabulary;
  }

  private static readonly decisionsToDFA =
    RustedParser._ATN.decisionToState.map(
      (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index)
    );
}

export class ProgramContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public EOF(): antlr.TerminalNode {
    return this.getToken(RustedParser.EOF, 0)!;
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
    return RustedParser.RULE_program;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterProgram) {
      listener.enterProgram(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitProgram) {
      listener.exitProgram(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitProgram) {
      return visitor.visitProgram(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ItemContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public function(): FunctionContext | null {
    return this.getRuleContext(0, FunctionContext);
  }
  public let_statement(): Let_statementContext | null {
    return this.getRuleContext(0, Let_statementContext);
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_item;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterItem) {
      listener.enterItem(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitItem) {
      listener.exitItem(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitItem) {
      return visitor.visitItem(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FunctionContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public IDENTIFIER(): antlr.TerminalNode {
    return this.getToken(RustedParser.IDENTIFIER, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public block(): BlockContext {
    return this.getRuleContext(0, BlockContext)!;
  }
  public parameter_list(): Parameter_listContext | null {
    return this.getRuleContext(0, Parameter_listContext);
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_function;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterFunction) {
      listener.enterFunction(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitFunction) {
      listener.exitFunction(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitFunction) {
      return visitor.visitFunction(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Parameter_listContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
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
    return RustedParser.RULE_parameter_list;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterParameter_list) {
      listener.enterParameter_list(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitParameter_list) {
      listener.exitParameter_list(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitParameter_list) {
      return visitor.visitParameter_list(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ParameterContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public IDENTIFIER(): antlr.TerminalNode {
    return this.getToken(RustedParser.IDENTIFIER, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_parameter;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterParameter) {
      listener.enterParameter(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitParameter) {
      listener.exitParameter(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitParameter) {
      return visitor.visitParameter(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class BlockContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
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
    return RustedParser.RULE_block;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterBlock) {
      listener.enterBlock(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitBlock) {
      listener.exitBlock(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitBlock) {
      return visitor.visitBlock(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class StatementContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
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
    return RustedParser.RULE_statement;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterStatement) {
      listener.enterStatement(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitStatement) {
      listener.exitStatement(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitStatement) {
      return visitor.visitStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Let_statementContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public IDENTIFIER(): antlr.TerminalNode {
    return this.getToken(RustedParser.IDENTIFIER, 0)!;
  }
  public type(): TypeContext {
    return this.getRuleContext(0, TypeContext)!;
  }
  public expression(): ExpressionContext | null {
    return this.getRuleContext(0, ExpressionContext);
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_let_statement;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterLet_statement) {
      listener.enterLet_statement(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitLet_statement) {
      listener.exitLet_statement(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitLet_statement) {
      return visitor.visitLet_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Expression_statementContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_expression_statement;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterExpression_statement) {
      listener.enterExpression_statement(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitExpression_statement) {
      listener.exitExpression_statement(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitExpression_statement) {
      return visitor.visitExpression_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Return_statementContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public expression(): ExpressionContext | null {
    return this.getRuleContext(0, ExpressionContext);
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_return_statement;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterReturn_statement) {
      listener.enterReturn_statement(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitReturn_statement) {
      listener.exitReturn_statement(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitReturn_statement) {
      return visitor.visitReturn_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class If_statementContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
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
    return RustedParser.RULE_if_statement;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterIf_statement) {
      listener.enterIf_statement(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitIf_statement) {
      listener.exitIf_statement(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitIf_statement) {
      return visitor.visitIf_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class While_statementContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext)!;
  }
  public block(): BlockContext {
    return this.getRuleContext(0, BlockContext)!;
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_while_statement;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterWhile_statement) {
      listener.enterWhile_statement(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitWhile_statement) {
      listener.exitWhile_statement(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitWhile_statement) {
      return visitor.visitWhile_statement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ExpressionContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public assignment_expr(): Assignment_exprContext {
    return this.getRuleContext(0, Assignment_exprContext)!;
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_expression;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterExpression) {
      listener.enterExpression(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitExpression) {
      listener.exitExpression(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitExpression) {
      return visitor.visitExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Assignment_exprContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public logical_expr(): Logical_exprContext {
    return this.getRuleContext(0, Logical_exprContext)!;
  }
  public assignment_expr(): Assignment_exprContext | null {
    return this.getRuleContext(0, Assignment_exprContext);
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_assignment_expr;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterAssignment_expr) {
      listener.enterAssignment_expr(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitAssignment_expr) {
      listener.exitAssignment_expr(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitAssignment_expr) {
      return visitor.visitAssignment_expr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Logical_exprContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public comparison_expr(): Comparison_exprContext[];
  public comparison_expr(i: number): Comparison_exprContext | null;
  public comparison_expr(
    i?: number
  ): Comparison_exprContext[] | Comparison_exprContext | null {
    if (i === undefined) {
      return this.getRuleContexts(Comparison_exprContext);
    }

    return this.getRuleContext(i, Comparison_exprContext);
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_logical_expr;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterLogical_expr) {
      listener.enterLogical_expr(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitLogical_expr) {
      listener.exitLogical_expr(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitLogical_expr) {
      return visitor.visitLogical_expr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Comparison_exprContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public additive_expr(): Additive_exprContext[];
  public additive_expr(i: number): Additive_exprContext | null;
  public additive_expr(
    i?: number
  ): Additive_exprContext[] | Additive_exprContext | null {
    if (i === undefined) {
      return this.getRuleContexts(Additive_exprContext);
    }

    return this.getRuleContext(i, Additive_exprContext);
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_comparison_expr;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterComparison_expr) {
      listener.enterComparison_expr(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitComparison_expr) {
      listener.exitComparison_expr(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitComparison_expr) {
      return visitor.visitComparison_expr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Additive_exprContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public multiplicative_expr(): Multiplicative_exprContext[];
  public multiplicative_expr(i: number): Multiplicative_exprContext | null;
  public multiplicative_expr(
    i?: number
  ): Multiplicative_exprContext[] | Multiplicative_exprContext | null {
    if (i === undefined) {
      return this.getRuleContexts(Multiplicative_exprContext);
    }

    return this.getRuleContext(i, Multiplicative_exprContext);
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_additive_expr;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterAdditive_expr) {
      listener.enterAdditive_expr(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitAdditive_expr) {
      listener.exitAdditive_expr(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitAdditive_expr) {
      return visitor.visitAdditive_expr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Multiplicative_exprContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public unary_expr(): Unary_exprContext[];
  public unary_expr(i: number): Unary_exprContext | null;
  public unary_expr(
    i?: number
  ): Unary_exprContext[] | Unary_exprContext | null {
    if (i === undefined) {
      return this.getRuleContexts(Unary_exprContext);
    }

    return this.getRuleContext(i, Unary_exprContext);
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_multiplicative_expr;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterMultiplicative_expr) {
      listener.enterMultiplicative_expr(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitMultiplicative_expr) {
      listener.exitMultiplicative_expr(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitMultiplicative_expr) {
      return visitor.visitMultiplicative_expr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Unary_exprContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public unary_expr(): Unary_exprContext | null {
    return this.getRuleContext(0, Unary_exprContext);
  }
  public ref_primary_expr(): Ref_primary_exprContext | null {
    return this.getRuleContext(0, Ref_primary_exprContext);
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_unary_expr;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterUnary_expr) {
      listener.enterUnary_expr(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitUnary_expr) {
      listener.exitUnary_expr(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitUnary_expr) {
      return visitor.visitUnary_expr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Ref_primary_exprContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public primary_expr(): Primary_exprContext {
    return this.getRuleContext(0, Primary_exprContext)!;
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_ref_primary_expr;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterRef_primary_expr) {
      listener.enterRef_primary_expr(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitRef_primary_expr) {
      listener.exitRef_primary_expr(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitRef_primary_expr) {
      return visitor.visitRef_primary_expr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Primary_exprContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public IDENTIFIER(): antlr.TerminalNode | null {
    return this.getToken(RustedParser.IDENTIFIER, 0);
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
  public override get ruleIndex(): number {
    return RustedParser.RULE_primary_expr;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterPrimary_expr) {
      listener.enterPrimary_expr(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitPrimary_expr) {
      listener.exitPrimary_expr(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitPrimary_expr) {
      return visitor.visitPrimary_expr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Function_callContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public IDENTIFIER(): antlr.TerminalNode {
    return this.getToken(RustedParser.IDENTIFIER, 0)!;
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext | null;
  public expression(
    i?: number
  ): ExpressionContext[] | ExpressionContext | null {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    }

    return this.getRuleContext(i, ExpressionContext);
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_function_call;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterFunction_call) {
      listener.enterFunction_call(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitFunction_call) {
      listener.exitFunction_call(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitFunction_call) {
      return visitor.visitFunction_call(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public IDENTIFIER(): antlr.TerminalNode | null {
    return this.getToken(RustedParser.IDENTIFIER, 0);
  }
  public type_(): TypeContext[];
  public type_(i: number): TypeContext | null;
  public type_(i?: number): TypeContext[] | TypeContext | null {
    if (i === undefined) {
      return this.getRuleContexts(TypeContext);
    }

    return this.getRuleContext(i, TypeContext);
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_type;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterType) {
      listener.enterType(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitType) {
      listener.exitType(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitType) {
      return visitor.visitType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class LiteralContext extends antlr.ParserRuleContext {
  public constructor(
    parent: antlr.ParserRuleContext | null,
    invokingState: number
  ) {
    super(parent, invokingState);
  }
  public INTEGER_LITERAL(): antlr.TerminalNode | null {
    return this.getToken(RustedParser.INTEGER_LITERAL, 0);
  }
  public BOOLEAN_LITERAL(): antlr.TerminalNode | null {
    return this.getToken(RustedParser.BOOLEAN_LITERAL, 0);
  }
  public STRING_LITERAL(): antlr.TerminalNode | null {
    return this.getToken(RustedParser.STRING_LITERAL, 0);
  }
  public override get ruleIndex(): number {
    return RustedParser.RULE_literal;
  }
  public override enterRule(listener: RustedListener): void {
    if (listener.enterLiteral) {
      listener.enterLiteral(this);
    }
  }
  public override exitRule(listener: RustedListener): void {
    if (listener.exitLiteral) {
      listener.exitLiteral(this);
    }
  }
  public override accept<Result>(
    visitor: RustedVisitor<Result>
  ): Result | null {
    if (visitor.visitLiteral) {
      return visitor.visitLiteral(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
