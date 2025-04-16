/**
 * This is a simple virtual machine instruction set.
 * Each instruction is represented as a class, and the compiler will
 * generate instances of these classes to represent the compiled code.
 *
 * we implement a simple stack machine.
 * all values are allocated on the heap for simplicity.
 *
 * all instructions are represented in the following form:
 * instruction_name <parameter> : <operand 1> <operand 2> ...
 * operands are popped in-order from the top of the stack.
 *
 * (i.e., opn 1 is on the top of the stack, opn 2 is below that, etc
 * thus, operands should be pushed on the stack in reverse order.)
 */

export abstract class INSTR {
  constructor() {}
}

// ===== memory manipulation instructions =====
// push <value>
export class PUSH extends INSTR {
  constructor(public value: any) {
    super();
  }

  public toString() {
    return `PUSH ${this.value}`;
  }
}

// pop
export class POP extends INSTR {
  public toString() {
    return `POP`;
  }
}

// alloc: <size>
// pushes: <heap address of allocation>
// for simplicity
export class ALLOC extends INSTR {
  public toString() {
    return `ALLOC`;
  }
}

// free: <heap address of allocation> <size>
export class FREE extends INSTR {
  public toString() {
    return `FREE`;
  }
}

// store: <address> <payload>
export class STORE extends INSTR {
  constructor() {
    super();
  }

  public toString() {
    return `STORE`;
  }
}

// load: <address>
// pushes: <payload>
export class LOAD extends INSTR {
  constructor() {
    super();
  }

  public toString() {
    return `LOAD`;
  }
}

// ===== binary instructions =====
// arithmetic operations
// add : <a> <b>
// pushes: <a + b>
export class ADD extends INSTR {
  public toString() {
    return `ADD`;
  }
}

// sub : <a> <b>
// pushes: <a - b>
export class SUB extends INSTR {
  public toString() {
    return `SUB`;
  }
}

// mul : <a> <b>
// pushes: <a * b>
export class MUL extends INSTR {
  public toString() {
    return `MUL`;
  }
}

// div : <a> <b>
// pushes: <a / b>
export class DIV extends INSTR {
  public toString() {
    return `DIV`;
  }
}

// mod : <a> <b>
// pushes: <a % b>
export class MOD extends INSTR {
  public toString() {
    return `MOD`;
  }
}

// comparison operations
// lt : <a> <b>
// pushes: <a < b>
export class LT extends INSTR {
  public toString() {
    return `LT`;
  }
}

// gt : <a> <b>
// pushes: <a > b>
export class GT extends INSTR {
  public toString() {
    return `GT`;
  }
}

// eq : <a> <b>
// pushes: <a == b>
export class EQ extends INSTR {
  public toString() {
    return `EQ`;
  }
}

// leq : <a> <b>
// pushes: <a <= b>
export class LEQ extends INSTR {
  public toString() {
    return `LEQ`;
  }
}

// geq : <a> <b>
// pushes: <a >= b>
export class GEQ extends INSTR {
  public toString() {
    return `GEQ`;
  }
}

// neq : <a> <b>
// pushes: <a !== b>
export class NEQ extends INSTR {
  public toString() {
    return `NEQ`;
  }
}

// boolean operations (NOT bitwise)
// and : <a> <b>
// pushes: <a && b>
export class AND extends INSTR {
  public toString() {
    return `AND`;
  }
}

// or : <a> <b>
// pushes: <a || b>
export class OR extends INSTR {
  public toString() {
    return `OR`;
  }
}

// ===== unary instructions =====
// not : <a>
// pushes: <boolean negation of a>
export class NOT extends INSTR {
  public toString() {
    return `NOT`;
  }
}

// ===== control flow instructions =====
// jmp <label>
export class JMP extends INSTR {
  constructor(public label: string) {
    super();
  }

  public toString() {
    return `JMP ${this.label}`;
  }
}

// jof <label> : <predicate>
export class JOF extends INSTR {
  constructor(public label: string) {
    super();
  }

  public toString() {
    return `JOF ${this.label}`;
  }
}

// label <label name>
export class LABEL extends INSTR {
  constructor(public label: string) {
    super();
  }

  public toString() {
    return `LABEL ${this.label}`;
  }
}

// TODO: i might deprecate CALL/RET in favour of FPUSH/FPOP
// call <function name> <# args> : <arg 1> <arg 2> ... <arg n>
// pushes: <# args> <current program counter>, and a bunch of other stuff
// CALL sets up a new stack frame.
// refer to implementation in `vm` for more details.
export class CALL extends INSTR {
  constructor(public functionName: string, public argCount: number) {
    super();
  }

  public toString() {
    return `CALL ${this.functionName} ${this.argCount}`;
  }
}

// TODO: i might deprecate CALL/RET in favour of FPUSH/FPOP
// ret : <return value>
// RET also assumes the previous stack frame contains the call args, arity, and then old PC.
// RET tears down the current stack frame.
// refer to implementation in `vm` for more details.
export class RET extends INSTR {
  public toString() {
    return "RET";
  }
}

// stack frame push
export class FPUSH extends INSTR {
  public toString() {
    return "FPUSH";
  }
}

// stack frame pop
export class FPOP extends INSTR {
  public toString() {
    return "FPOP";
  }
}

export class HALT extends INSTR {
  public toString() {
    return `HALT`;
  }
}

function insns_to_str(insns: INSTR[]) {
  return insns.map((instr) => instr.toString()).join("\n");
}
