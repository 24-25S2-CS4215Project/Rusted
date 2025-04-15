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

// implements the heap as a free list.
type FreeNode = {
  address: number;
  size: number;
  next: FreeNode | null;
};

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

  // heap constants / pointers
  private HEAP_BOTTOM: number;
  private HEAP_TOP: number;
  private free_list: FreeNode;

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

    // ===== heap initialization =====
    // allocate the "top half" of the array buffer for the heap.
    //
    // heap memory traditionally grows "downwards" (towards the stack),
    // but since we define fixed sizes for the stack and heap,
    // we can grow the stack and the heap in the same direction for simplicity of access.
    //
    // heap may suffer from fragmentation, which we do not address
    // (for simplicity)
    this.HEAP_BOTTOM = this.STACK_TOP;
    this.HEAP_TOP = size_bytes;
    this.free_list = {
      address: this.HEAP_BOTTOM,
      size: this.HEAP_TOP - this.HEAP_BOTTOM,
      next: null,
    };
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

  // ===== heap operations =====
  // checks if the first and second nodes represent contiguous blocks of free heap memory.
  // if they are contiguous, merge the second node into the first node.
  private static heap_merge_node(first_node: FreeNode, second_node: FreeNode) {
    if (
      second_node !== null &&
      first_node.address + first_node.size === second_node.address
    ) {
      first_node.size += second_node.size;
      first_node.next = second_node.next;
    }
  }

  // attempts to allocate `size_bytes` on the heap.
  // returns the address where the data was allocated, or throws a memory error
  heap_alloc(size_bytes: number): number {
    // we allocate additional space for the header
    const actual_size = size_bytes + WORD_SIZE;

    // search free list for space
    let free_node = this.free_list;
    while (free_node !== null) {
      // check if this node has space
      if (free_node.size >= actual_size) {
        // allocate the node at the start of the free space

        // heap pointer: points to start of allocation, incl header
        // payload begins one word (4 bytes) after the header
        const hptr = free_node.address;
        this.mem_set_u32(hptr, size_bytes); // write header

        // update the free node
        free_node.address += actual_size;
        free_node.size -= actual_size;

        // return the address of the payload
        return hptr + WORD_SIZE;
      }
      // check the next node in the free list
      else {
        free_node = free_node.next;
      }
    }

    // no free space found: throw error
    throw new MemoryError("heap memory is full");
  }

  // attempts to free a previously-allocated region of memory
  heap_free(address: number) {
    const hptr = address - WORD_SIZE;
    const size = this.mem_get_u32(hptr);

    // instantiate a node for the free list
    let this_node = {
      address: hptr,
      size: size + WORD_SIZE,
      next: null,
    };

    // insert the node into the free list
    let cur_node = this.free_list;
    let prev_node: FreeNode = null;
    // find the correct spot to insert the current node
    while (cur_node !== null && cur_node.address < this_node.address) {
      prev_node = cur_node;
      cur_node = cur_node.next;
    }

    // at this point, `cur_node` points to the first block of free space
    // occurring after this block.
    // so we want to insert this block between `prev_node` and `cur_node`,
    // merging the nodes where appropriate.

    // set next pointer accordingly
    // (this is correct even if `cur_node` is null)
    this_node.next = cur_node;
    Memory.heap_merge_node(this_node, cur_node);

    // `prev_node` is the head of the list:
    // set this node to be the new list head
    if (prev_node === null) {
      this.free_list = this_node;
    }
    // a prev node exists
    else {
      prev_node.next = this_node;
      Memory.heap_merge_node(prev_node, this_node);
    }
  }

  // debug function, for testing
  heap_debug_space(): number[] {
    let blocks = 0;
    let size = 0;

    let cur_node = this.free_list;
    while (cur_node !== null) {
      blocks += 1;
      size += cur_node.size;
      cur_node = cur_node.next;
    }

    // # blocks of free space, and its total size
    return [blocks, size];
  }
}
