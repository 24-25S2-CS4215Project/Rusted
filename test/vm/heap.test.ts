import { expect, test } from "@jest/globals";
import { Memory, MemoryError } from "../../src/vm/memory";

// should have 24 bytes allocated for the heap
const mem = new Memory(48);

const state_1 = mem.heap_debug_space();

// initialization
test("heap state init", () => {
  expect(state_1).toEqual([1, 24]);
});

// allocate
const addr = mem.heap_alloc(4); // allocates 4 bytes header + 4 bytes payload
mem.mem_set_i32(addr, 15);
const mem_15 = mem.mem_get_i32(addr);

test("heap alloc", () => {
  // heap pointer starts at 24,
  // payload pointer starts at 28 (24 + 4 header size)
  expect(addr).toBe(28);

  expect(mem_15).toBe(15);
});

const state_2 = mem.heap_debug_space();
test("heap state alloc", () => {
  expect(state_2).toEqual([1, 16]); // 8 bytes used
});

// free
mem.heap_free(addr);
const state_3 = mem.heap_debug_space();
test("heap state free", () => {
  expect(state_3).toEqual([1, 24]); // 8 bytes freed
});

// fragmented heap
const addr1 = mem.heap_alloc(8); // use 12 bytes
const addr2 = mem.heap_alloc(4); // use 8 bytes
test("heap alloc multi", () => {
  // heap pointer starts at 24,
  // payload pointer starts at 28 (24 + 4 header size)
  expect(addr1).toBe(28);

  expect(addr2).toBe(40);
});

const state_4 = mem.heap_debug_space();
test("heap state alloc multi", () => {
  expect(state_4).toEqual([1, 4]);
});

mem.heap_free(addr1); // free first block
const state_5 = mem.heap_debug_space();
test("heap state fragmented", () => {
  expect(state_5).toEqual([2, 16]);
});

// free node merging
mem.heap_free(addr2); // free second block, all free space should merge
const state_6 = mem.heap_debug_space();
test("heap state merged", () => {
  expect(state_6).toEqual([1, 24]);
});

// exceed heap capacity
test("heap capacity exceeded", () => {
  expect(() => mem.heap_alloc(24)).toThrow(MemoryError);
});
