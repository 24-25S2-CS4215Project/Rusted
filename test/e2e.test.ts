import { expect, test } from "@jest/globals";
import { CharStream, CommonTokenStream } from "antlr4ng";
import { RustedCompiler } from "../src/compiler/RustedCompiler";
import { RustedTypeChecker } from "../src/compiler/RustedTypeChecker";
import { RustedLexer } from "../src/parser/src/RustedLexer";
import { RustedParser } from "../src/parser/src/RustedParser";
import { VM } from "../src/vm/vm";

// end-to-end tests
function execute(chunk: string, display_code: boolean = false) {
  // lexing
  const inputStream = CharStream.fromString(chunk);
  const lexer = new RustedLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);

  // Parse the input
  const parser = new RustedParser(tokenStream);
  const tree = parser.program();

  // Type check the parsed tree
  const typechecker = new RustedTypeChecker();
  const typeCheckResult = typechecker.typeCheck(tree);
  // this.conductor.sendOutput(`Type checking result: ${typeCheckResult}`);

  // Compile the parsed tree
  const compiler = new RustedCompiler();
  const insns = compiler.compile(tree);
  // this.conductor.sendOutput(
  //   `Compiled expression (as VM instructions):\n${result.join("\n")}`
  // );

  if (display_code) {
    const insns_str = insns.join("\n");
    console.log(`vm code:\n${insns_str}`);
  }

  // execute the instructions
  const vm = new VM(4096, insns);
  const result = vm.execute();
  // console.log(`result: ${result}`);
  return result;
}

test("assn", () => {
  const code = `
  fn main() -> i32 {
    let result : i32 = 3;
    return 3;
  }
  `;
  expect(execute(code)).toBe(3);
});

test("call, if-no-else", () => {
  const code = `
  fn add(a: i32, b: i32) -> i32 {
    return a + b;
  }

  fn main() -> i32 {
    let result : i32 = add(20, 15);
    if result > 25 {
      return 3;
    }
    return 4;
  }
  `;
  expect(execute(code)).toBe(3);
});

test("call, if-else", () => {
  const code = `
  fn add(a: i32, b: i32) -> i32 {
    return a * b;
  }

  fn main() -> i32 {
    let result : i32 = add(20, 15);
    if result < 25 {
      return 3;
    }
    else {
      return 4;
    }
  }
  `;
  expect(execute(code)).toBe(4);
});
