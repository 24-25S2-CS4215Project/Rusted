import * as I from "./instructions";
import { Memory } from "./memory";

export class VM {
  // stack and heap memory, all in a single ArrayBuffer
  private memory: Memory;
  // instructions could be stored as part of the arraybuffer (text section),
  // but we don't do that here, for convenience.
  private insns: I.INSTR[];
  // a mapping from label names to their index in the instruction list.
  // this is prety non-trivial to implement as part of the single ArrayBuffer,
  // so we include it as an external runtime data structure for convenience.
  private label_mappings: Map<string, number>;

  private pc: number; // program counter
  private halted: boolean;

  constructor(mem_size_bytes: number, insns) {
    this.memory = new Memory(mem_size_bytes);
    this.insns = insns;

    this.pc = 0;
    this.halted = false;
  }

  // todo: figure out how to return?
  // idea: `execute` returns a number, then we take the  return type of `main`
  // and cast the result to that type.
  // if no return type, return the unit type?
  execute(): number {
    while (!this.halted) {
      const insn = this.insns[this.pc];
      this.execute_insn(insn);
      this.pc += 1;
    }

    const ret_val = this.memory.stack_pop_i32();
    return ret_val;
  }

  execute_insn(insn: I.INSTR) {
    if (false) {
      // dummy branch
    } else if (insn instanceof I.PUSH) {
      this.execute_push_insn(insn);
    } else if (insn instanceof I.POP) {
      this.execute_pop_insn(insn);
      // else if (insn instanceof I.ALLOC
      // else if (insn instanceof I.FREE
      // else if (insn instanceof I.STORE
      // else if (insn instanceof I.LOAD
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
      // else if (insn instanceof I.JMP
      // else if (insn instanceof I.JOF
      // else if (insn instanceof I.LABEL
      // else if (insn instanceof I.CALL
      // else if (insn instanceof I.RET
    } else if (insn instanceof I.HALT) {
      this.execute_halt_insn(insn);
    }
  }

  // Helper methods

  execute_push_insn(insn: I.PUSH) {
    this.memory.stack_push_i32(insn.value);
  }

  execute_pop_insn(_: I.POP) {
    this.memory.stack_pop_i32();
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
    const b = this.memory.stack_pop_i32();
    const a = this.memory.stack_pop_i32();
    // todo: figure out DIV semantics
    // (javascript div semantics probably outputs floats, which may not be what we actually want here)
    this.memory.stack_push_i32(a / b);
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

  execute_halt_insn(_: I.HALT) {
    this.halted = true;
  }
}
