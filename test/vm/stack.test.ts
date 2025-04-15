import { expect, test } from "@jest/globals";
import { Memory, MemoryError } from "../../src/vm/memory";

test("stack push", () => {
  // initialize a new memory of size 32 bytes.
  // lower 16 bytes should be used for stack,
  // upper 16 bytes should be used for heap.
  const mem = new Memory(32);
  mem.stack_push_i32(5); // 4 bytes used
  mem.stack_push_i32(6); // 8 bytes used

  const mem_6 = mem.mem_get_i32(4);
  expect(mem_6).toBe(6);

  const mem_5 = mem.mem_get_i32(0);
  expect(mem_5).toBe(5);
});

// note: jest tests "snapshot" the state.
// hence, the tests wont mutate the current state.
// if we pop in a test, the popped elements will still be on the stack after the test ends
test("stack pop and peek", () => {
  const mem = new Memory(32);
  mem.stack_push_i32(5); // 4 bytes used
  mem.stack_push_i32(6); // 8 bytes used

  const peek_6 = mem.stack_peek_i32();
  expect(peek_6).toBe(6);

  const pop_6 = mem.stack_pop_i32();
  expect(pop_6).toBe(6);

  const peek_5 = mem.stack_peek_i32();
  expect(peek_5).toBe(5);

  const pop_5 = mem.stack_pop_i32();
  expect(pop_5).toBe(5);
});

test("stack max capacity", () => {
  const mem = new Memory(32);
  mem.stack_push_i32(5); // 4 bytes used
  mem.stack_push_i32(6); // 8 bytes used

  expect(() => {
    mem.stack_push_i32(7); // 12 bytes used
    mem.stack_push_i32(8); // 16 bytes used
    mem.stack_push_i32(9); // 20 bytes used -- stack capacity exceeded
  }).toThrow(MemoryError);
});

test("stack i32 and u32", () => {
  const mem = new Memory(32);

  // push / peek / pop i32
  mem.stack_push_i32(-5); // 4 bytes used
  const peek_n5 = mem.stack_peek_i32();
  const pop_n5 = mem.stack_pop_i32();
  expect(peek_n5).toBe(-5);
  expect(pop_n5).toBe(-5);

  // push / peek / pop u32
  mem.stack_push_u32(6); // 4 bytes used
  const peek_6 = mem.stack_peek_u32();
  const pop_6 = mem.stack_pop_u32();
  expect(peek_6).toBe(6);
  expect(pop_6).toBe(6);

  // push / peek / pop mixed dtypes
  mem.stack_push_i32(-5); // 4 bytes used
  const peek_not_n5 = mem.stack_peek_u32();
  const pop_not_n5 = mem.stack_pop_u32();
  expect(peek_not_n5).not.toBe(-5);
  expect(pop_not_n5).not.toBe(-5);
});
