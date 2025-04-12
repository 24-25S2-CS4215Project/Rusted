/**
 * This is a simple stack-based virtual machine instruction set.
 * Each instruction is represented as a class, and the compiler will
 * generate instances of these classes to represent the compiled code.
 */

export abstract class INSTR {
  constructor() {}
}

/**
 * This instruction is used to push a value onto the stack.
 * The value can be a number, string, or any other type.
 * The value is passed as a parameter to the constructor.
 */
export class PUSH extends INSTR {
  constructor(public value: any) {
    super();
  }

  public toString() {
    return `PUSH ${this.value}`;
  }
}

/**
 * This instruction is used to pop a value from the stack.
 * The value is discarded and not used.
 */
export class POP extends INSTR {
  public toString() {
    return `POP`;
  }
}

export class ADD extends INSTR {
  public toString() {
    return `ADD`;
  }
}

export class SUB extends INSTR {
  public toString() {
    return `SUB`;
  }
}

export class MUL extends INSTR {
  public toString() {
    return `MUL`;
  }
}

export class DIV extends INSTR {
  public toString() {
    return `DIV`;
  }
}

export class MOD extends INSTR {
  public toString() {
    return `MOD`;
  }
}

export class LT extends INSTR {
  public toString() {
    return `LT`;
  }
}

export class GT extends INSTR {
  public toString() {
    return `GT`;
  }
}

export class EQ extends INSTR {
  public toString() {
    return `EQ`;
  }
}

export class LEQ extends INSTR {
  public toString() {
    return `LEQ`;
  }
}

export class GEQ extends INSTR {
  public toString() {
    return `GEQ`;
  }
}

export class NEQ extends INSTR {
  public toString() {
    return `NEQ`;
  }
}

export class AND extends INSTR {
  public toString() {
    return `AND`;
  }
}

export class OR extends INSTR {
  public toString() {
    return `OR`;
  }
}

export class NOT extends INSTR {
  public toString() {
    return `NOT`;
  }
}

/**
 * This instruction is used to unconditional jump to a label.
 * The label is passed as a parameter to the constructor.
 */
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
export class LABEL extends INSTR {
  constructor(public label: string) {
    super();
  }

  public toString() {
    return `LABEL ${this.label}`;
  }
}

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
export class RET extends INSTR {
  public toString() {
    return "RET";
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

export class INSTR_LIST extends INSTR {
  constructor(public instructions: INSTR[]) {
    super();
  }

  public toString() {
    return this.instructions.map((instr) => instr.toString()).join("\n");
  }
}

export class HALT extends INSTR {
  public toString() {
    return `HALT`;
  }
}
