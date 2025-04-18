import { expect, test } from "@jest/globals";
import { CharStream, CommonTokenStream } from "antlr4ng";
import { RustedCompiler } from "../src/compiler/RustedCompiler";
import { RustedTypeChecker } from "../src/compiler/RustedTypeChecker";
import { RustedLexer } from "../src/parser/src/RustedLexer";
import { RustedParser } from "../src/parser/src/RustedParser";
import { VM } from "../src/vm/vm";

// end-to-end tests
function execute_raw(chunk: string, display_code: boolean = false) {
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
  return [result, vm.stdout];
}

function execute_res(chunk: string, display_code: boolean = false) {
  const [res, _] = execute_raw(chunk, display_code);
  return res;
}
function execute_out(chunk: string, display_code: boolean = false) {
  const [_, out] = execute_raw(chunk, display_code);
  return out;
}

test("assn", () => {
  const code = `
  fn main() -> i32 {
    let result : i32 = 3;
    return 3;
  }
  `;
  expect(execute_res(code)).toBe(3);
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
  expect(execute_res(code)).toBe(3);
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
  expect(execute_res(code)).toBe(4);
});

test("print", () => {
  const code = `
  fn main() -> () {
    let x : str = "hello";
    print_str(x);
    let y : i32 = 4;
    print_int(y);
    let z : bool = false;
    print_bool(z);
  }
  `;
  expect(execute_out(code)).toEqual(["hello", "4", "false"]);
});

test("recursive", () => {
  const code = `
  fn factorial(n: i32) -> i32 {
    if n <= 1 {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }

  fn main() -> () {
    let result : i32 = factorial(5);
    print_int(result);
  }
  `;
  expect(execute_out(code)).toEqual(["120"]);
});

test("case 10", () => {
  const code = `
  fn main() -> (){
    let x: i32 = 100;

    let r1: &i32 = &x;
    let r2: &i32 = &x;

    print_int(*r1); // ok: multiple readers allowed
    print_int(*r2);
  }
  `;
  expect(execute_out(code)).toEqual(["100", "100"]);
});

test("case 11", () => {
  const code = `
fn main() -> () {
  let mut x: i32 = 10;

  {
      let r1: &i32 = &x;
      print_int(*r1); // first borrow immutable
  } // r1 ends here

  {
      let r2: &mut i32 = &mut x;
      *r2 = 5;
      print_int(*r2); // second borrow mutable
  }
  // r2 ends here
  print_int(x); // x can be used again
}
`;
  expect(execute_out(code)).toEqual(["10", "5", "5"]);
});

test("case 12", () => {
  const code = `
  fn increment(x: &mut i32) -> (){
    *x = *x + 1;
  }

  fn main() -> () {
      let mut value: i32 = 7;
      increment(&mut value); // pass by mutable reference should be ok
      print_int(value);
  }
  `;
  expect(execute_out(code)).toEqual(["8"]);
});

test("case 14", () => {
  const code = `
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
  print_int(result);
}
`;
  expect(execute_out(code)).toEqual(["1"]);
});

test("case 16", () => {
  const code = `
fn main() -> () {
  let mut count: i32 = 0;

  while count < 5 {
      print_int(*(&count)); // We used stricter move checking. Here we must pass by reference
      count = count + 1;
  }
}`;
  expect(execute_out(code)).toEqual(["0", "1", "2", "3", "4"]);
});

test("case 35.1", () => {
  const code = `
fn main() -> () {
  let mut x: i32 = 10;
  let r1: &i32 = &x;
  let r2: &i32 = &x;
  print_int(*r1);
  print_int(*r2);
}
`;
  expect(execute_out(code)).toEqual(["10", "10"]);
});

test("case 36 (modified)", () => {
  const code = `
fn main() -> () {
  let x: str = "hello";
  let y: &str = &x;
  let z: &str = &x;
  print_str_ref(y);
  print_str_ref(z);
}
`;
  expect(execute_out(code)).toEqual(["hello", "hello"]);
});

test("case 39", () => {
  const code = `
fn main() -> () {
  let mut name: str = "Alice";
  name = "Bob";
  print_str(name);
}
`;
  expect(execute_out(code)).toEqual(["Bob"]);
});

test("factorial return", () => {
  const code = `
  fn factorial(n: i32) -> i32 {
    if n <= 1 {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }

  fn main() -> i32 {
    let result : i32 = factorial(5);
    return result;
  }
  `;
  expect(execute_res(code)).toEqual(120);
});

test("case 43", () => {
  const code = `
fn foo(x: &mut i32) -> () {
  *x = *x + 1;
}

fn main() -> () {
  let mut a: i32 = 3;
  foo(&mut a);
  print_int(a);
}
`;
  expect(execute_out(code)).toEqual(["4"]);
});