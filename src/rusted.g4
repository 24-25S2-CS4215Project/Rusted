grammar Rusted;

program: item* EOF;

item
    : function
    | let_statement
    ;

function
    : 'fn' IDENTIFIER '(' parameter_list? ')' '->' type block
    ;

parameter_list
    : parameter (',' parameter)* ','?
    ;

parameter
    : IDENTIFIER ':' type
    ;

block
    : '{' statement* '}'
    ;

statement
    : let_statement
    | expression_statement
    | return_statement
    | block
    | if_statement
    | while_statement
    ;

let_statement
    : 'let' 'mut'? IDENTIFIER ':' type ('=' expression)? ';'
    ;

expression_statement
    : expression ';'
    ;

return_statement
    : 'return' expression? ';'
    ;

if_statement
    : 'if' expression block ('else' (if_statement | block))?
    ;

while_statement
    : 'while' expression block
    ;

expression
    : assignment_expr
    ;

assignment_expr
    : logical_expr ('=' assignment_expr)?
    ;

logical_expr
    : comparison_expr (('&&' | '||') comparison_expr)*
    ;

comparison_expr
    : additive_expr (('==' | '!=' | '<' | '<=' | '>' | '>=') additive_expr)*
    ;

additive_expr
    : multiplicative_expr (('+' | '-') multiplicative_expr)*
    ;

multiplicative_expr
    : unary_expr (('*' | '/' | '%') unary_expr)*
    ;

unary_expr
    : ('-' | '!') unary_expr
    | ref_primary_expr
    ;

ref_primary_expr
    : primary_expr
    | '&' 'mut'? primary_expr
    | '*' primary_expr
    ;

primary_expr
    : IDENTIFIER
    | literal
    | function_call
    | '(' expression ')'
    ;

function_call
    : IDENTIFIER '(' (expression (',' expression)*)? ')'
    ;

type
    : IDENTIFIER
    | '&' 'mut'? type
    | '(' type ')'
    | '(' ')'
    | 'fn' '(' (type (',' type)*)? ')' '->' type
    ;

literal
    : INTEGER_LITERAL
    | BOOLEAN_LITERAL
    | STRING_LITERAL
    ;

IDENTIFIER: [a-zA-Z_][a-zA-Z0-9_]*;

INTEGER_LITERAL: [0-9]+;

BOOLEAN_LITERAL: 'true' | 'false';

STRING_LITERAL: '"' (~["\r\n] | '\\"')* '"';

COMMENT: '//' ~[\r\n]* -> skip;

MULTILINE_COMMENT: '/*' .*? '*/' -> skip;

WS: [ \t\r\n]+ -> skip;