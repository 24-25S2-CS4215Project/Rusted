import { CharStream, CommonTokenStream } from 'antlr4ng';
import { RustedLexer } from './parser/src/RustedLexer.ts';
import { RustedParser } from './parser/src/RustedParser.ts';
import { RustedCompiler } from './compiler/compiler.js';
import { RustedTypeChecker } from './typechecker/RustedTypechecker.ts';

function parseString(input) {
  try {
    // Create the lexer and parser
    const chars = CharStream.fromString(input);
    const lexer = new RustedLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new RustedParser(tokens);

    // Parse the input
    const tree = parser.program();
    console.log('Parsing successful!');

    return tree;
  } catch (error) {
    console.error('Error parsing code:', error);
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
      let msg : &str = "small sum!";
      let msg2 : &str = msg;
      // println(msg); // should fail
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
      let mut a : i32 = 5;
      a = 10;
      let b : i32 = 5;
      // b = 10; // This should cause a type error
      println(a);
    }
  `,
    `
    fn main() -> (){
      let mut x: i32 = 10;

      let r1: &i32 = &x;      // immutable borrow
      let r2: &mut i32 = &mut x; // ERROR: cannot borrow x as mutable because it's already borrowed as immutable

      println(r1);
    }
  `,
    `
    fn main() -> () {
      let mut x: i32 = 42;
      let r: &mut i32 = &mut x; // mutable borrow of x

      println(x); // ERROR: cannot use x because it is borrowed as mutable
      *r = 1;
    }
  `,
    `
    fn main() -> () {
      let mut x: i32 = 7;

      let r1: &mut i32 = &mut x;
      let r2: &mut i32 = &mut x; // ERROR: cannot borrow x as mutable more than once at a time

      *r1 = 1;
      *r2 = 1;
    }
  `,
    `
    fn get_ref() -> &i32 { // ERROR: returns a reference to local variable
      let x: i32 = 5;
      return &x; // x is dropped here, reference would dangle
    }
  `,
    `
    fn main() -> (){
      let x: i32 = 100;

      let r1: &i32 = &x;
      let r2: &i32 = &x;

      println(r1); // ok: multiple readers allowed
      println(r2); 
    }
  `,
    `
  fn main() -> () {
    let mut x: i32 = 10;

    {
        let r1: &i32 = &x;
        println(r1); // first borrow immutable
    } // r1 ends here

    {
        let r2: &mut i32 = &mut x;
        *r2 = 5;
        println(r2); // second borrow mutable
    }
    // r2 ends here
    println(x); // x can be used again
  }
  `,
    `
    fn increment(x: &mut i32) -> (){
      *x = *x + 1;
    }

    fn main() -> () {
        let mut value: i32 = 7;
        increment(&mut value);
        println(value);
    }
  `
  ]
  tryParseAndCompile(tests);

}

function tryParseAndCompile(tests: string[]) {
  let i = 0;
  try {
    for (tests[i] of tests) {
      const parseTree = parseString(tests[i]);
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
      i++;
    }
  } catch (error) {
    console.error("Failed to parse or compile");
    console.log(tests.slice(i + 1).length);
    tryParseAndCompile(tests.slice(i + 1));
  }
}

main();
