import { expect, test } from "@jest/globals";
import * as I from "../../src/vm/instructions";
import { VM } from "../../src/vm/vm";

function test_vm(insns: I.INSTR[], entrypoint: number = 0) {
  const vm = new VM(128, insns, entrypoint);
  const res = vm.execute();
  return res;
}

// arithmetic instructions
test("vm add", () => {
  const insns = [new I.PUSH(4), new I.PUSH(3), new I.ADD(), new I.HALT()];
  const res = test_vm(insns);
  expect(res).toBe(7);
});

test("vm sub", () => {
  const insns = [new I.PUSH(4), new I.PUSH(3), new I.SUB(), new I.HALT()];
  const res = test_vm(insns);

  expect(res).toBe(1);
});

test("vm mul", () => {
  const insns = [new I.PUSH(4), new I.PUSH(3), new I.MUL(), new I.HALT()];
  const res = test_vm(insns);

  expect(res).toBe(12);
});

test("vm div", () => {
  const insns = [new I.PUSH(11), new I.PUSH(3), new I.DIV(), new I.HALT()];
  const res = test_vm(insns);

  expect(res).toBe(3); // floor div
});

// not gonna bother testing the simple arith/logical instructions

// also tests setting the entrypoint to main
test("vm jump and label", () => {
  const insns = [
    new I.LABEL("lbl"),
    new I.PUSH(5),
    new I.PUSH(2),
    new I.ADD(),
    new I.HALT(),
    new I.LABEL("main"),
    new I.JMP("lbl"),
    new I.PUSH(11),
    new I.PUSH(3),
    new I.MUL(),
    new I.HALT(),
  ];
  const res = test_vm(insns, 5);

  expect(res).toBe(7);
});

test("vm jof -- true", () => {
  const insns = [
    new I.PUSH(11),
    new I.PUSH(3),
    new I.LT(),
    new I.JOF("lbl"),
    new I.PUSH(11),
    new I.PUSH(3),
    new I.MUL(),
    new I.HALT(),
    new I.LABEL("lbl"),
    new I.PUSH(5),
    new I.PUSH(2),
    new I.ADD(),
    new I.HALT(),
  ];
  const res = test_vm(insns);

  expect(res).toBe(7);
});
test("vm jof -- false", () => {
  const insns = [
    new I.PUSH(3),
    new I.PUSH(11),
    new I.LT(),
    new I.JOF("lbl"),
    new I.PUSH(11),
    new I.PUSH(3),
    new I.MUL(),
    new I.HALT(),
    new I.LABEL("lbl"),
    new I.PUSH(5),
    new I.PUSH(2),
    new I.ADD(),
    new I.HALT(),
  ];
  const res = test_vm(insns);

  expect(res).toBe(33);
});

test("vm load", () => {
  const insns = [
    new I.PUSH(0), // push 0 at addr 0
    new I.PUSH(1), // push 1 at addr 4
    new I.PUSH(2), // push 2 at addr 8
    new I.PUSH(4),
    new I.LOAD(), // load from offset 4 (1)
    new I.HALT(),
  ];
  const res = test_vm(insns);

  expect(res).toBe(1);
});

test("vm store", () => {
  const insns = [
    new I.PUSH(0), // push 0 at addr 0
    new I.PUSH(1), // push 1 at addr 4
    new I.PUSH(4), // store to addr 4
    new I.PUSH(2), // store a value of 2
    new I.STORE(), // store 2 at addr 4
    new I.HALT(),
  ];
  const res = test_vm(insns);

  expect(res).toBe(2);
});

// not gonna test free.
test("vm alloc", () => {
  const insns = [
    // allocate 4 bytes, store ptr at addr 0
    new I.PUSH(4),
    new I.ALLOC(),
    // prepare the address stored at addr 0
    new I.PUSH(0),
    new I.LOAD(),
    // store 7 at the addr pointed by 0
    new I.PUSH(7),
    new I.STORE(),
    // load the value at the allocated region
    new I.LOAD(),
    new I.HALT(),
  ];
  const res = test_vm(insns);

  expect(res).toBe(7);
});

test("vm call and ret", () => {
  const insns = [
    new I.LABEL("f"), // f = (x, y) =>  x - y
    // can find param offsets using frame pointer
    new I.PUSH(20),
    new I.LOAD(),
    new I.PUSH(24),
    new I.LOAD(),
    new I.SUB(),
    new I.RET(1), // ret 4
    new I.LABEL("main"),
    new I.PUSH(7),
    new I.PUSH(3),
    new I.CALL("f", 2), // result should be at addr 0
    // load result at 0, to ensure that stack is managed properly
    new I.PUSH(0),
    new I.LOAD(),
    new I.HALT(),
  ];
  const res = test_vm(insns, 7);

  expect(res).toBe(4);
});

test("vm print int", () => {
  const insns = [new I.PUSH(27), new I.CALL("print_int", 1), new I.HALT()];
  const vm = new VM(128, insns, 0);
  vm.execute();
  const output = vm.stdout;

  expect(output).toEqual(["27"]);
});

test("vm print bool", () => {
  const insns = [new I.PUSH(1), new I.CALL("print_bool", 1), new I.HALT()];
  const vm = new VM(128, insns, 0);
  vm.execute();
  const output = vm.stdout;

  expect(output).toEqual(["true"]);
});
