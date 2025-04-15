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

const UINT32_MAX = 2 ** 32 - 1;
const SLOT_BYTES = 4; // one "stack slot" corresponds to 32 bits, or 4 bytes
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
  private stack: DataView;

  // stack constants / pointers
  // stack and frame pointers count slot offsets (not byte offsets)
  private STACK_BOTTOM: number;
  private stack_ptr: number;
  private frame_ptr: number;

  // TODO: implement heap (as a linked list...?)

  constructor(size_bytes: number) {
    this.arr_buf = new ArrayBuffer(size_bytes);
    this.stack = new DataView(this.arr_buf);
    this.STACK_BOTTOM = 0;
    this.stack_ptr = 0;
    this.frame_ptr = 0;
  }

  // ===== stack operations =====
  private stack_check_writable() {
    // TODO: when implementing heap, check that we don't write into the heap too
    // TODO: double-check stack-is-full logic
    if (this.stack_ptr * SLOT_BYTES === this.arr_buf.byteLength) {
      throw new MemoryError("stack memory is full");
    }
  }

  stack_push_i32(contents: number) {
    this.stack_check_writable();

    this.stack.setInt32(this.stack_ptr * SLOT_BYTES, contents);
    this.stack_ptr += 1;
  }

  stack_push_u32(contents: number) {
    this.stack_check_writable();

    this.stack.setUint32(this.stack_ptr * SLOT_BYTES, contents);
    this.stack_ptr += 1;
  }

  stack_pop_i32(): number {
    this.stack_ptr -= 1;
    const pop_val = this.stack.getInt32(this.stack_ptr * SLOT_BYTES);
    return pop_val;
  }

  stack_pop_u32(): number {
    this.stack_ptr -= 1;
    const pop_val = this.stack.getUint32(this.stack_ptr * SLOT_BYTES);
    return pop_val;
  }

  stack_peek_i32(): number {
    const peek_val = this.stack.getInt32((this.stack_ptr - 1) * SLOT_BYTES);
    return peek_val;
  }

  stack_peek_u32(): number {
    const peek_val = this.stack.getUint32((this.stack_ptr - 1) * SLOT_BYTES);
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
    const prev_frame_ptr = this.stack[this.frame_ptr];
    this.stack_ptr = this.frame_ptr;
    this.frame_ptr = prev_frame_ptr;
  }
}
