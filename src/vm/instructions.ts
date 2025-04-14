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
// TODO: or should i assume fixed-size heap allocations?
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

/**
 * This instruction is used to store a value in a variable.
 * The variable name is passed as a parameter to the constructor.
 * The value to be stored is popped from the stack.
 */
export class STORE extends INSTR {
  constructor(public variableName: string) {
    super();
  }

  public toString() {
    return `STORE ${this.variableName}`;
  }
}

/**
 * This instruction is used to load a value from a variable.
 * The variable name is passed as a parameter to the constructor.
 * The value is pushed onto the stack.
 */
export class LOAD extends INSTR {
  constructor(public variableName: string) {
    super();
  }

  public toString() {
    return `LOAD ${this.variableName}`;
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
// TODO: discuss rounding / flooring (if any)
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
/**
 * This instruction is used to unconditional jump to a label.
 * The label is passed as a parameter to the constructor.
 */
// jmp <label>
export class JMP extends INSTR {
  constructor(public label: string) {
    super();
  }

  public toString() {
    return `JMP ${this.label}`;
  }
}

/**
 * This instruction is used to jump on false to a label.
 * The label is passed as a parameter to the constructor.
 * The predicate is popped from the stack.
 */
// jof <label> : <predicate>
export class JOF extends INSTR {
  constructor(public label: string) {
    super();
  }

  public toString() {
    return `JOF ${this.label}`;
  }
}

/**
 * This instruction is used to jump on true to a label.
 * The label is passed as a parameter to the constructor.
 * The predicate is popped from the stack.
 */
// label <label name>
export class LABEL extends INSTR {
  constructor(public label: string) {
    super();
  }

  public toString() {
    return `LABEL ${this.label}`;
  }
}

// call <function name> <# args> : <arg 1> <arg 2> ... <arg n>
// pushes: <current program counter>
export class CALL extends INSTR {
  constructor(public functionName: string, public argCount: number) {
    super();
  }

  public toString() {
    return `CALL ${this.functionName} ${this.argCount}`;
  }
}

/**
 * This instruction is used to return from a function.
 * The return value is popped from the stack.
 */
// ret : <return value> <return program counter>
export class RET extends INSTR {
  public toString() {
    return "RET";
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
