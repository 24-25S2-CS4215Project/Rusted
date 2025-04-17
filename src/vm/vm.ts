import { dbg } from "../compiler/debug";
import { construct_builtins } from "./builtins";
import * as I from "./instructions";
import { Memory, WORD_SIZE } from "./memory";

export class VM {
  // stack and heap memory, all in a single ArrayBuffer
  private memory: Memory;
  // instructions could theoretically be stored as part of the arraybuffer (text section),
  // but we don't do that here, because i'm not going to write an assembler to
  // encode the instructions as bytes.
  private insns: I.INSTR[];
  // a mapping from label names to their index in the instruction list.
  // this is prety non-trivial to implement as part of the single ArrayBuffer,
  // so we include it as an external runtime data structure for convenience.
  private label_mappings: Map<string, number>;

  private pc: number; // program counter
  private entrypoint: number;
  private halted: boolean;

  // other state
  private stdout: string[];
  private builtins;

  constructor(
    mem_size_bytes: number,
    insns: I.INSTR[],
    entrypoint_override?: number
  ) {
    this.memory = new Memory(mem_size_bytes);
    this.insns = insns;
    this.label_mappings = new Map();

    this.pc = 0;
    if (entrypoint_override !== undefined) {
      this.entrypoint = entrypoint_override;
    }
    // final two instructions of any *compiled* program is `CALL main 0` and `HALT`.
    else {
      this.entrypoint = insns.length - 2;
    }
    this.halted = false;

    this.scan_out_labels();

    this.stdout = [];
    this.builtins = construct_builtins(this.stdout);
  }

  // populates the label -> insn id mapping.
  // this function should only be run once, when the VM is constructed.
  private scan_out_labels() {
    for (let i = 0; i < this.insns.length; i++) {
      const insn = this.insns[i];
      if (insn instanceof I.LABEL) {
        this.label_mappings[insn.label] = i;
      }
    }
  }

  // Executes a list of VM instructions, starting from the `main` label.
  //
  // todo: figure out how to return?
  // idea: `execute` returns a number, then we take the  return type of `main`
  // and cast the result to that type.
  // if no return type, return the unit type?
  execute(): number {
    this.pc = this.entrypoint;

    while (!this.halted) {
      const insn = this.insns[this.pc];
      this.execute_insn(insn);
      this.pc += 1;
    }

    const ret_val = this.memory.stack_pop_i32();
    return ret_val;
  }

  execute_insn(insn: I.INSTR) {
    dbg(`executing: ${insn.toString()}`);
    if (false) {
      // dummy branch
    } else if (insn instanceof I.PUSH) {
      this.execute_push_insn(insn);
    } else if (insn instanceof I.POP) {
      this.execute_pop_insn(insn);
    } else if (insn instanceof I.ALLOC) {
      this.execute_alloc_insn(insn);
    } else if (insn instanceof I.FREE) {
      this.execute_free_insn(insn);
    } else if (insn instanceof I.STORE) {
      this.execute_store_insn(insn);
    } else if (insn instanceof I.LOAD) {
      this.execute_load_insn(insn);
    } else if (insn instanceof I.ADD) {
      this.execute_add_insn(insn);
    } else if (insn instanceof I.SUB) {
      this.execute_sub_insn(insn);
    } else if (insn instanceof I.MUL) {
      this.execute_mul_insn(insn);
    } else if (insn instanceof I.DIV) {
      this.execute_div_insn(insn);
    } else if (insn instanceof I.MOD) {
      this.execute_mod_insn(insn);
    } else if (insn instanceof I.LT) {
      this.execute_lt_insn(insn);
    } else if (insn instanceof I.GT) {
      this.execute_gt_insn(insn);
    } else if (insn instanceof I.EQ) {
      this.execute_eq_insn(insn);
    } else if (insn instanceof I.LEQ) {
      this.execute_leq_insn(insn);
    } else if (insn instanceof I.GEQ) {
      this.execute_geq_insn(insn);
    } else if (insn instanceof I.AND) {
      this.execute_and_insn(insn);
    } else if (insn instanceof I.OR) {
      this.execute_or_insn(insn);
    } else if (insn instanceof I.NOT) {
      this.execute_not_insn(insn);
    } else if (insn instanceof I.JMP) {
      this.execute_jmp_insn(insn);
    } else if (insn instanceof I.JOF) {
      this.execute_jof_insn(insn);
    } else if (insn instanceof I.LABEL) {
      this.execute_label_insn(insn);
    } else if (insn instanceof I.CALL) {
      this.execute_call_insn(insn);
    } else if (insn instanceof I.RET) {
      this.execute_ret_insn(insn);
    } else if (insn instanceof I.FPUSH) {
      this.execute_fpush_insn(insn);
    } else if (insn instanceof I.FPOP) {
      this.execute_fpop_insn(insn);
    } else if (insn instanceof I.FLOAD) {
      this.execute_fload_insn(insn);
    } else if (insn instanceof I.FSTORE) {
      this.execute_fstore_insn(insn);
    } else if (insn instanceof I.PEEK) {
      this.execute_peek_insn(insn);
    } else if (insn instanceof I.HALT) {
      this.execute_halt_insn(insn);
    }
    dbg(`stack ptr: ${this.memory.get_stack_ptr()}`);
  }

  // Helper methods

  execute_push_insn(insn: I.PUSH) {
    this.memory.stack_push_i32(insn.value);
  }

  execute_pop_insn(_: I.POP) {
    this.memory.stack_pop_i32();
  }

  execute_alloc_insn(_: I.ALLOC) {
    const size = this.memory.stack_pop_u32();
    const addr = this.memory.heap_alloc(size);
    this.memory.stack_push_u32(addr);
  }

  execute_free_insn(_: I.FREE) {
    const addr = this.memory.stack_pop_u32();
    this.memory.heap_free(addr);
  }
  execute_store_insn(_: I.STORE) {
    const payload = this.memory.stack_pop_i32();
    const addr = this.memory.stack_pop_u32();
    this.memory.mem_set_i32(addr, payload);
  }

  execute_load_insn(_: I.LOAD) {
    const addr = this.memory.stack_pop_u32();
    // and likewise here
    const payload = this.memory.mem_get_i32(addr);
    this.memory.stack_push_i32(payload);
  }

  execute_add_insn(_: I.ADD) {
    const b = this.memory.stack_pop_i32();
    const a = this.memory.stack_pop_i32();
    this.memory.stack_push_i32(a + b);
  }

  execute_sub_insn(_: I.SUB) {
    const b = this.memory.stack_pop_i32();
    const a = this.memory.stack_pop_i32();
    this.memory.stack_push_i32(a - b);
  }

  execute_mul_insn(_: I.MUL) {
    const b = this.memory.stack_pop_i32();
    const a = this.memory.stack_pop_i32();
    this.memory.stack_push_i32(a * b);
  }

  execute_div_insn(_: I.DIV) {
    // DIV instruction performs floor division
    // this is fine, because we only have one numeric type (i32)
    const b = this.memory.stack_pop_i32();
    const a = this.memory.stack_pop_i32();
    this.memory.stack_push_i32(Math.floor(a / b));
  }

  execute_mod_insn(_: I.MOD) {
    const b = this.memory.stack_pop_i32();
    const a = this.memory.stack_pop_i32();
    this.memory.stack_push_i32(a % b);
  }

  execute_lt_insn(_: I.LT) {
    const b = this.memory.stack_pop_i32();
    const a = this.memory.stack_pop_i32();
    this.memory.stack_push_i32(+(a < b));
  }

  execute_gt_insn(_: I.GT) {
    const b = this.memory.stack_pop_i32();
    const a = this.memory.stack_pop_i32();
    this.memory.stack_push_i32(+(a > b));
  }

  execute_eq_insn(_: I.EQ) {
    const b = this.memory.stack_pop_i32();
    const a = this.memory.stack_pop_i32();
    this.memory.stack_push_i32(+(a === b));
  }

  execute_leq_insn(_: I.LEQ) {
    const b = this.memory.stack_pop_i32();
    const a = this.memory.stack_pop_i32();
    this.memory.stack_push_i32(+(a <= b));
  }

  execute_geq_insn(_: I.GEQ) {
    const b = this.memory.stack_pop_i32();
    const a = this.memory.stack_pop_i32();
    this.memory.stack_push_i32(+(a >= b));
  }

  execute_and_insn(_: I.AND) {
    const b = this.memory.stack_pop_i32();
    const a = this.memory.stack_pop_i32();
    this.memory.stack_push_i32(+(a && b));
  }

  execute_or_insn(_: I.OR) {
    const b = this.memory.stack_pop_i32();
    const a = this.memory.stack_pop_i32();
    this.memory.stack_push_i32(+(a || b));
  }

  execute_not_insn(_: I.NOT) {
    const a = this.memory.stack_pop_i32();
    this.memory.stack_push_i32(+!a);
  }

  execute_jmp_insn(insn: I.JMP) {
    const new_pc = this.label_mappings[insn.label];
    this.pc = new_pc - 1; // sub 1, because we incr PC by 1 after each instruction executes
  }

  execute_jof_insn(insn: I.JOF) {
    const pred = this.memory.stack_pop_i32();
    if (pred === 0) {
      const new_pc = this.label_mappings[insn.label];
      this.pc = new_pc - 1; // sub 1, because we incr PC by 1 after each instruction executes
    }
  }

  execute_label_insn(_: I.LABEL) {
    // no-op, since all labels are scanned out before execution begins
  }

  execute_call_insn(insn: I.CALL) {
    // - push the function arity on stack
    const arity = insn.argCount;
    this.memory.stack_push_u32(arity);

    // - push current PC to stack
    this.memory.stack_push_u32(this.pc);

    // - create a new frame
    this.memory.stack_new_frame();

    // - copy over args based on arity via direct memory access
    // current stack layout:
    // (lower addresses) ... (higher addresses)
    //             previous frame                       |   current frame  v---- current stack pointer
    // ... [arg 1] [arg 2] ... [arg n] [arity] [old pc] | [old frame ptr]
    //    ^----------- first arg location (given by stack ptr - ((3 + n) * WORD_SIZE))
    let arg_addr = this.memory.get_stack_ptr() - (3 + arity) * WORD_SIZE;
    for (let i = 0; i < arity; i++) {
      const arg_i = this.memory.mem_get_i32(arg_addr);
      this.memory.stack_push_i32(arg_i);
      arg_addr += WORD_SIZE;
    }
    // new stack layout:
    // (lower addresses) ... (higher addresses)
    //             previous frame                       |   current frame   current stack pointer ---v
    // ... [arg 1] [arg 2] ... [arg n] [arity] [old pc] | [old frame ptr] [arg 1] [arg 2] ... [arg n]
    // this way, we can access function parameters from the new frame

    // - set current PC to function address (lookup label)
    this.pc = this.label_mappings[insn.functionName];
  }

  execute_ret_insn(insn: I.RET) {
    // - pop retval
    const retval = this.memory.stack_pop_i32();

    // - drop stack frame(s)
    for (let i = 0; i < insn.frames; i++) {
      this.memory.stack_drop_frame();
    }

    // - pop previous PC, and set current PC to that
    this.pc = this.memory.stack_pop_u32();

    // - pop arity, then pop the top <arity> elems from the stack
    //  (that were created when we called the function)
    const arity = this.memory.stack_pop_u32();
    for (let i = 0; i < arity; i++) {
      this.memory.stack_pop_u32();
    }

    // push retval back on stack
    this.memory.stack_push_i32(retval);
  }

  // stack frame push
  execute_fpush_insn(_: I.FPUSH) {
    this.memory.stack_new_frame();
  }

  // stack frame pop
  execute_fpop_insn(_: I.FPOP) {
    this.memory.stack_drop_frame();
  }

  execute_fload_insn(_: I.FLOAD) {
    const frame_offset = this.memory.stack_pop_u32();
    const byte_offset = this.memory.stack_pop_u32();

    let fptr = this.memory.get_frame_ptr();
    for (let i = 0; i < frame_offset; i++) {
      fptr = this.memory.mem_get_u32(fptr);
    }

    const res = this.memory.mem_get_i32(fptr + byte_offset);
    this.memory.stack_push_i32(res);
  }

  execute_fstore_insn(_: I.FSTORE) {
    const value = this.memory.stack_pop_i32();
    const frame_offset = this.memory.stack_pop_u32();
    const byte_offset = this.memory.stack_pop_u32();

    let fptr = this.memory.get_frame_ptr();
    for (let i = 0; i < frame_offset; i++) {
      fptr = this.memory.mem_get_u32(fptr);
    }

    this.memory.mem_set_i32(fptr + byte_offset, value);
  }

  execute_peek_insn(_: I.PEEK) {
    const top = this.memory.stack_peek_i32();
    this.memory.stack_push_i32(top);
  }
  execute_halt_insn(_: I.HALT) {
    this.halted = true;
  }
}
