// implements a stack and heap in a contiguous region of memory
// we implement the stack from the bottom up (smaller to larger indices),
// and the heap from the top down (larger to smaller indices)
//
// address size is 32 bits (i.e., each address fits in a u32)
// for simplicity, assume all dtypes have a fixed size of 32 bits (4 bytes)
//
// we allocate all variables on the heap.
// the "bindings" section of the frame stores the heap addresses for variable bindings.
// the compiler context is responsible for storing the mapping from variable name -> frame pointer offset
//
// stack frame layout: (top to bottom)
//
// ... (higher memory addresses)
// ------------------------- stack pointer
// < operand stack >
// < bindings (heap addresses for variable allocatons) >
// < previous frame pointer >
// ------------------------- frame pointer
// < previous frame contents >
// ... (lower memory addresses)

// one word corresponds to 32 bits, or 4 bytes
// this is the smallest unit of memory that we can write to.
const WORD_SIZE = 4;
export type Address = number; // TODO: still needed?

export class MemoryError extends Error {
  constructor(public msg: string) {
    super();
  }

  public toString() {
    return this.msg;
  }
}

export class Memory {
  // the actual memory
  private arr_buf: ArrayBuffer;
  private mem: DataView;

  // stack constants / pointers
  // stack and frame pointers count slot offsets (not byte offsets)
  private STACK_BOTTOM: number;
  private STACK_TOP: number;
  private stack_ptr: number;
  private frame_ptr: number;

  // TODO: implement heap (as a linked list...?)

  constructor(size_bytes: number) {
    this.arr_buf = new ArrayBuffer(size_bytes);
    this.mem = new DataView(this.arr_buf);

    // ===== stack initialization  =====
    // allocate the "bottom half" of the array buffer for the stack
    this.STACK_BOTTOM = 0;
    this.STACK_TOP = Math.floor(size_bytes / 2); // assume stack boundary is slot-aligned
    // stack and frame pointers point to byte addresses, not to word indexes
    this.stack_ptr = 0;
    this.frame_ptr = 0;
  }

  // ===== generic memory operations =====
  // these memory getters and setters operate on the byte addresses of memory,
  // NOT the word indices.
  mem_get_i32(address: number): number {
    return this.mem.getInt32(address);
  }

  mem_get_u32(address: number): number {
    return this.mem.getUint32(address);
  }

  mem_set_i32(address: number, value: number) {
    this.mem.setInt32(address, value);
  }

  mem_set_u32(address: number, value: number) {
    this.mem.setUint32(address, value);
  }

  // ===== stack operations =====
  private stack_check_writable() {
    if (this.stack_ptr >= this.STACK_TOP) {
      throw new MemoryError("stack memory is full");
    }
  }

  stack_push_i32(contents: number) {
    this.stack_check_writable();

    this.mem_set_i32(this.stack_ptr, contents);
    this.stack_ptr += WORD_SIZE;
  }

  stack_push_u32(contents: number) {
    this.stack_check_writable();

    this.mem_set_u32(this.stack_ptr, contents);
    this.stack_ptr += WORD_SIZE;
  }

  stack_pop_i32(): number {
    this.stack_ptr -= WORD_SIZE;
    const pop_val = this.mem_get_i32(this.stack_ptr);
    return pop_val;
  }

  stack_pop_u32(): number {
    this.stack_ptr -= WORD_SIZE;
    const pop_val = this.mem_get_u32(this.stack_ptr);
    return pop_val;
  }

  stack_peek_i32(): number {
    const peek_val = this.mem_get_i32(this.stack_ptr - WORD_SIZE);
    return peek_val;
  }

  stack_peek_u32(): number {
    const peek_val = this.mem_get_u32(this.stack_ptr - WORD_SIZE);
    return peek_val;
  }

  // pushes a new frame onto the stack
  stack_new_frame(bindings: number[]) {
    const new_frame_ptr = this.stack_ptr;
    this.stack_push_u32(this.frame_ptr); // push the frame pointer on the stack
    this.frame_ptr = new_frame_ptr; // update the new frame pointer

    // push bindings onto stack
    // (we use push_u32 because each binding is a memory address, which should be
    // interpreted as a u32.
    for (const binding of bindings) {
      this.stack_push_u32(binding);
    }
  }

  // drops the current frame from the stack
  stack_drop_frame() {
    const prev_frame_ptr = this.mem_get_u32(this.frame_ptr);
    this.stack_ptr = this.frame_ptr;
    this.frame_ptr = prev_frame_ptr;
  }
}
