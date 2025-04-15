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
  private entrypoint: number;
  private halted: boolean;

  constructor(mem_size_bytes: number, insns) {
    this.memory = new Memory(mem_size_bytes);
    this.insns = insns;
    this.label_mappings = new Map();

    this.pc = 0;
    this.entrypoint = 0;
    this.halted = false;

    this.scan_out_labels_and_entrypoint();
  }

  // populates the label -> insn id mapping,
  // and initializes the entrypoint to the `main` label.
  //
  // this function should only be run once, when the VM is constructed.
  //
  // assumption: there is exactly one `main` label in the function.
  // our VM may display undefined behaviour if this is not the case.
  private scan_out_labels_and_entrypoint() {
    for (let i = 0; i < this.insns.length; i++) {
      const insn = this.insns[i];
      if (insn instanceof I.LABEL) {
        this.label_mappings[insn.label] = i;

        if (insn.label === "main") {
          this.entrypoint = i;
        }
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
    } else if (insn instanceof I.JMP) {
      this.execute_jmp_insn(insn);
    } else if (insn instanceof I.JOF) {
      this.execute_jof_insn(insn);
    } else if (insn instanceof I.LABEL) {
      this.execute_label_insn(insn);
      // } else if (insn instanceof I.CALL) {
      //   this.execute_call_insn(insn);
      // } else if (insn instanceof I.RET) {
      //   this.execute_ret_insn(insn);
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

  execute_halt_insn(_: I.HALT) {
    this.halted = true;
  }
}
