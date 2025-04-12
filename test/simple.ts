// just a dump for random test cases for now
// copied from `main:src/main.ts`
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
  println(msg); // should fail
  let mut x : i32 = 5;
  let y : i32 = 10;
  let z : &mut i32 = &mut x;
  let w : i32 = *z;
}

fn main() -> () {
  let a : i32 = 10;
  let b : i32 = 20;
  let c : i32 = a + b;
  println(c);
}

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

fn main() -> () {
  let mut a : i32 = 5;
  a = 10;
  let b : i32 = 5;
  b = 10; // This should cause a type error
  println(a);
}
`;
