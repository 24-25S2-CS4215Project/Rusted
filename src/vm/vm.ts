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
    }
    // insn instanceof I.PUSH
    // insn instanceof I.POP
    // insn instanceof I.ALLOC
    // insn instanceof I.FREE
    // insn instanceof I.STORE
    // insn instanceof I.LOAD
    // insn instanceof I.ADD
    // insn instanceof I.SUB
    // insn instanceof I.MUL
    // insn instanceof I.DIV
    // insn instanceof I.MOD
    // insn instanceof I.LT
    // insn instanceof I.GT
    // insn instanceof I.EQ
    // insn instanceof I.LEQ
    // insn instanceof I.GEQ
    // insn instanceof I.NEQ
    // insn instanceof I.AND
    // insn instanceof I.OR
    // insn instanceof I.NOT
    // insn instanceof I.JMP
    // insn instanceof I.JOF
    // insn instanceof I.LABEL
    // insn instanceof I.CALL
    // insn instanceof I.RET
    else if (insn instanceof I.HALT) {
      this.halted = true;
    }
  }
}
