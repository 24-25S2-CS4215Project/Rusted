import { CharStream, CommonTokenStream } from "antlr4ng";
import { RustedCompiler } from "./compiler/compiler.js";
import { RustedLexer } from "./parser/src/rustedLexer.ts";
import { RustedParser } from "./parser/src/rustedParser.ts";
import { RustedTypeChecker } from "./typechecker/typechecker.ts";

function parseString(input) {
  try {
    // Create the lexer and parser
    const chars = CharStream.fromString(input);
    const lexer = new RustedLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new RustedParser(tokens);

    // Parse the input
    const tree = parser.program();

    console.log("Parsing successful!");
    console.log("Parse tree:", tree.toStringTree(parser));

    return tree;
  } catch (error) {
    console.error("Error parsing code:", error);
    throw error;
  }
}

function main() {
  // Example usage
  const tests = [
    `
    fn add(a: i32, b: i32) -> i32 {
      return a + b;
    }

    fn main() -> () {
      let result : i32 = add(20, 15);
      if result > 25 {
        let msg : &str = "Big sum!";
        println(msg);
      }
      let mut x : i32 = 5;
      let y : i32 = 10;
      let z : &mut i32 = &mut x;
      let w : i32 = *z;
    }
  `,
    `
    fn main() -> () {
      let a : i32 = 10;
      let b : i32 = 20;
      let c : i32 = a + b;
      println(c);
    }
  `,
    `
    fn factorial(n: i32) -> i32 {
      if n <= 1 {
        return 1;
      } else {
        return n * factorial(n - 1);
      }
    }

    fn main() -> () {
      let result : i32 = factorial(5);
      println(result);
    }
  `,
    `
    fn main() -> () {
      let a : i32 = 5;
      a = 10; // This should cause a type error
      println(result);
    }
  `,
  ];

  try {
    for (const rustCode of tests) {
      const parseTree = parseString(rustCode);
      console.log("Successfully parsed the input!");
      const typecChecker = new RustedTypeChecker();
      const typeCheckResult = typecChecker.typeCheck(parseTree);
      console.log("Type checking result:");
      console.log(typeCheckResult);
      // Compile the parse tree to VM code
      const compiler = new RustedCompiler();
      const vmCode = compiler.compile(parseTree);
      console.log("Generated VM Code:");
      console.log(vmCode.join("\n"));
    }
  } catch (error) {
    console.error("Failed to parse or compile:", error);
  }
}

main();
