import { CharStream, CommonTokenStream } from 'antlr4ng';
import { ProgramContext, RustedParser } from "../../src/parser/src/RustedParser";
import { RustedLexer } from '../../src/parser/src/RustedLexer';
import { RustedTypeChecker } from "../../src/typechecker/RustedTypeChecker";
import { tests } from './test_cases';

/*
  * This file contains the helper functions to run the type checker tests.
  * It imports the necessary modules and functions, and runs the tests.
  * It also handles errors and prints the results of the tests.
  */

/**
 * Parse a string input and return the parse tree
 * @param input The input string to parse
 * @returns The parse tree
 */
export function parseString(input) {
  try {
    // Create the lexer and parser
    const chars = CharStream.fromString(input);
    const lexer = new RustedLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new RustedParser(tokens);

    // Parse the input
    const tree = parser.program();
    // console.log('Parse tree:', tree.toStringTree(parser));

    return tree;
  } catch (error) {
    console.error('Error parsing code:', error);
    throw error;
  }
}

export function typeCheck(test: string): string {
  try {
    // Parse the input
    const parseTree = parseString(test);
    // Create a new type checker instance
    const typeChecker = new RustedTypeChecker();
    // Type check the parse tree
    const typeCheckResult = typeChecker.typeCheck(parseTree);
    return typeCheckResult;
  } catch (error) {
    throw error;
  }
}

let errorCount = 0;

export function tryParseAndTypeCheck(tests: string[]) {
  let i = 0;
  try {
    for (tests[i] of tests) {
      const parseTree = parseString(tests[i]);
      // console.log("Successfully parsed the input!");
      const typecChecker = new RustedTypeChecker();
      const typeCheckResult = typecChecker.typeCheck(parseTree);
      console.log("Type checking result:");
      console.log(typeCheckResult);
      i++;
    }
  } catch (error) {
    errorCount++;
    // console.error("Failed to Parse or Type Check");
    // console.log(tests.slice(i + 1).length);
    tryParseAndTypeCheck(tests.slice(i + 1));
  }
}

/**
 * Main function to run the tests
 */
function testTypeChecker() {
  tryParseAndTypeCheck(tests);
  if (errorCount > 0) {
    console.log(`${errorCount}/${tests.length} tests failed.`);
  } else {
    console.log("All tests passed!");
  }
}

// testTypeChecker()
