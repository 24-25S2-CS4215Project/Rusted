import { CharStream, CommonTokenStream } from 'antlr4ng';
import { rustedLexer } from './parser/src/rustedLexer.ts';
import { rustedParser } from './parser/src/rustedParser.ts';
import { Compiler } from './compiler/compiler.js';

function parseString(input) {
  try {
    // Create the lexer and parser
    const chars = CharStream.fromString(input);
    const lexer = new rustedLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new rustedParser(tokens);
    
    // Parse the input
    const tree = parser.program();
    
    console.log('Parsing successful!');
    console.log('Parse tree:', tree.toStringTree(parser));
    
    return tree;
  } catch (error) {
    console.error('Error parsing code:', error);
    throw error;
  }
}

function main() {
  // Example usage
  const rustCode = `
    fn add(a: i32, b: i32) -> i32 {
      return a + b;
    }
    
    struct Point {
      x: i32,
      y: i32,
    }
    
    fn main() {
      let p = Point { x: 10, y: 20 };
      let result = add(p.x, p.y);
      if result > 25 {
        let msg = "Big sum!";
        println(msg);
      }
    }
  `;
  
  try {
    const parseTree = parseString(rustCode);
    console.log("Successfully parsed the input!");

    // Compile the parse tree to VM code
    const compiler = new Compiler();
    const vmCode = compiler.compile(parseTree);
    console.log("Generated VM Code:");
    console.log(vmCode.join("\n"));
  } catch (error) {
    console.error("Failed to parse or compile:", error);
  }
}

main();
