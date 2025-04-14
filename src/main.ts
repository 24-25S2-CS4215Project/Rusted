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
    // console.log('Parse tree:', tree.toStringTree(parser));

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
        let msg : str = "Big sum!";
        println(msg);
      }
      let msg : str = "small sum!";
      let msg2 : str = msg;
      println(msg); // should fail
      let mut x : i32 = 5;
      let y : i32 = 10;
      let z : &mut i32 = &mut x;
      let w : i32 = *z;
    }
  `,
  `
  fn main() -> () {
    let s1: str = "hello";
    let s2: str = s1; // ownership moved

    println(s2);
    // println(s1); //  Would cause error if uncommented
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
        increment(&mut value); // pass by mutable reference should
        println(value);
    }
  `,
    `
  fn main() -> () {
    let x: bool = true;
    println(x);
  }
  `
  ,
  `
  fn judge(cond: bool) -> i32 {
    if cond {
      return 1;
    } else {
      return 2;
    }
  }
  
  fn main() -> () {
    let condition: bool = true;
    let result: i32 = judge(condition);
    println(result);
  }
  `,
  `
  fn judge(cond: bool) -> i32 {
    if cond {
      return 1;
    } else {
      return "abc"; // ERROR: return type inconsistent
    }
  }
  
  fn main() -> () {
    let condition: bool = true;
    let result: i32 = judge(condition);
    println(result);
  }
  `,
  `fn main() -> () {
    let mut count: i32 = 0;

    while count < 5 {
        println(&count); // We used stricter move checking. Here we must pass by reference
        count = count + 1;
    }
  }`,
  `fn main() -> () {
    let count: i32 = 0; // ERROR: count is immutable

    while count < 5 {
        println(&count); // We used stricter move checking. Here we must pass by reference
        count = count + 1;
    }
  }`,
  `
  fn main() -> () {
    let mut count: i32 = 0;

    while count { // ERROR: condition must be a boolean
        println(&count); // We used stricter move checking. Here we must pass by reference
        count = count + 1;
    }
  }
  `,
  `
  fn main() -> () {
    let x: i32 = 10;
    let y: i32 = x; // copy, not move, ok

    println(x);
    println(y);
  }
  `,
  `
  fn consume(s: str) -> () {
    println(s);
  }

  fn main() -> () {
    let msg: str = "hello";
    consume(msg);
    println(msg); // ❌ would be error if uncommented
  }
  `,
  `
  fn read(s: &str) -> () {
    println(s);
  }

  fn main() -> () {
    let data: str = "borrowed";
    read(&data); // pass by immutable reference is ok
    println(data);
  }
  `,
  `
  fn main() -> () {
    let mut s: str = "conflict";

    let r1: &str = &s;
    let r2: &mut str = &mut s; // ❌ ERROR: cannot borrow as mutable while immutable borrow exists

    println(r2);
  }
  `,
  `
  fn main() -> () {
    let condition: bool = true;
    let mut message: str = "default"; // default value

    if condition {
        let s1: str = "hello from if";
        message = s1; // ownership moves here
    } else {
        let s2: str = "hello from else";
        message = s2; // same here
    }
    println(message); // ✅ ownership is consistent
  }
  `,
  `
  fn main() -> () {
    let condition: bool = true;

    let s1: str = "owned";
    let mut s2: str = "default"; // default value

    if condition {
        s2 = s1; // ownership moves here
    }

    println(s1); // ❌ ERROR: use of moved value
  }
  `,
  `
  fn main() -> () {
    let mut count: i32 = 0;
    let msg: str = "looping";

    while count < 3 {
        println(&count);
        println(&msg); // borrowed, not moved
        count = count + 1;
    }

    println(&msg); // ✅ still accessible
  }
  `,
  `
    fn main() -> () {
    let mut msg: str = "hello";
    let mut i: i32 = 0;

    while i < 1 {
        let taken: str = msg; // ❌ ownership moved
        println(taken);
        i = i + 1;
    }

    println(msg); // ❌ ERROR: value moved
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
      console.log("Parse tree:");
      const typecChecker = new RustedTypeChecker();
      const typeCheckResult = typecChecker.typeCheck(parseTree);
      console.log("Type checking result:");
      console.log(typeCheckResult);
      // Compile the parse tree to VM code
      const compiler = new RustedCompiler();
      const vmCode = compiler.compile(parseTree);
      console.log("Generated VM Code:");
      //console.log(vmCode.join("\n"));
      i++;
    }
  } catch (error) {
    console.error("Failed to parse or compile");
    console.log(tests.slice(i + 1).length);
    tryParseAndCompile(tests.slice(i + 1));
  }
}

main();
