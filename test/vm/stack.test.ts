import { expect, test } from "@jest/globals";
import { Memory, MemoryError } from "../../src/vm/memory";

// stack push
test("stack push", () => {
  const mem = new Memory(32);
  mem.stack_push_i32(5); // 4 bytes used
  mem.stack_push_i32(6); // 8 bytes used

  const mem_5 = mem.mem_get_i32(0);
  const mem_6 = mem.mem_get_i32(4);

  expect(mem_5).toBe(5);
  expect(mem_6).toBe(6);
});

// stack peek and pop
test("stack pop and peek", () => {
  const mem = new Memory(32);
  mem.stack_push_i32(5); // 4 bytes used
  mem.stack_push_i32(6); // 8 bytes used
  const peek_6 = mem.stack_peek_i32();
  const pop_6 = mem.stack_pop_i32(); // 4 bytes used
  const peek_5 = mem.stack_peek_i32();
  const pop_5 = mem.stack_pop_i32(); // 0 bytes used

  expect(peek_6).toBe(6);
  expect(pop_6).toBe(6);
  expect(peek_5).toBe(5);
  expect(pop_5).toBe(5);
});

// stack capacity

test("stack max capacity", () => {
  const mem = new Memory(32);
  mem.stack_push_i32(5); // 4 bytes used
  mem.stack_push_i32(6); // 8 bytes used
  mem.stack_push_i32(7); // 12 bytes used
  mem.stack_push_i32(8); // 16 bytes used

  expect(() => {
    mem.stack_push_i32(9); // 20 bytes used -- stack capacity exceeded
  }).toThrow(MemoryError);
});

// stack frames

test("stack new frame", () => {
  const mem = new Memory(32);

  mem.stack_push_i32(9); // 4 bytes used
  const stack_ptr1 = mem.get_stack_ptr();

  mem.stack_new_frame(); // 8 bytes used
  const stack_ptr2 = mem.get_stack_ptr();

  // set up new frame
  expect(stack_ptr1).toBe(4);
  expect(stack_ptr2).toBe(8);

  // push and pop in new frame
  mem.stack_push_i32(7); // 12 bytes used
  const pop_7 = mem.stack_pop_i32(); // 8 bytes used

  expect(pop_7).toBe(7);

  // drop frame
  mem.stack_push_i32(7); // 12 bytes used
  mem.stack_drop_frame(); // 4 bytes used
  const stack_ptr3 = mem.get_stack_ptr();
  const pop_9 = mem.stack_pop_i32(); // 4 bytes, should be able to access data in prev frame

  expect(stack_ptr3).toBe(4);
  expect(pop_9).toBe(9);
});

// stack read/write with wrong types
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
