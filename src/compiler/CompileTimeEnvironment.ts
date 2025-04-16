import { builtins_types } from "../vm/builtins";

 /* This file contains the CompileTimeEnvironment class and its methods.
  * It is used to manage the static state of variables and their ownership
  * in the type checker.
  * 
  * It includes methods for extending the environment, looking up variables,
  * and checking for variable existence.
  * 
  * It also includes the TypeClosure and BorrowRef classes, which are used
  * to represent the type, mutability, and borrow state of a variable.
  * They are used to track the static state of variables in the environment.
  *
  * The BUILTINS_TYPES map is a map of built-in functions and their type closures.
  */


/**
 * AbstractTypeClosure is a base class for type closures.
 * It contains the type, mutability, and borrow state of a variable.
 * It is used to track the static state of variables in the environment.
 */
abstract class AbstractTypeClosure {
  constructor(
    public type: string,
    public mutable: boolean,
    public dropped: boolean = false,
    public immutableBorrow: number,
    public mutableBorrow: number
  ) { }
}

/**
 * TypeClosure is a concrete implementation of AbstractTypeClosure.
 * It represents a variable in the environment with its type, mutability,
 * and borrow state.
 */
export class TypeClosure extends AbstractTypeClosure {
  constructor(
    public type: string,
    public mutable: boolean,
    public dropped: boolean = false,
    public immutableBorrow: number,
    public mutableBorrow: number
  ) {
    super(type, mutable, dropped, immutableBorrow, mutableBorrow);
  }
}

/*
  BorrowRef is a special kind of static variable that is used to track the
  borrow state of a variable, to restore the borrow state of a variable when
  its borrower is dropped
*/
export class BorrowRef extends AbstractTypeClosure {
  constructor(
    public name: string,
    public immutableBorrow: number = 0,
    public mutableBorrow: number = 0
  ) {
    super(name, false, false, immutableBorrow, mutableBorrow);
  }
}


/**
 * BUILTINS_TYPES is a map of built-in functions and their type closures.
 */
// wraps the type of each builtin function with an AbstractTypeClosure
export const BUILTINS_TYPES = new Map<string, AbstractTypeClosure>(
  builtins_types.map(([name, type]) => [
    name,
    new TypeClosure(type, false, false, 0, 0),
  ])
);

/**
 * CompileTimeEnvironment is a class that represents the environment in which the type checker operates.
 *
 * It contains a map of variable names to their type closures, and a reference to
 * the parent environment. It allows for nested scopes and do permit variable shadowing,
 * by allowing the same variable name to be declared in different level of scopes.
 *
 * It also provides methods for extending the environment, looking up variables, and
 * checking for variable existence. It is used to manage the static state of variables
 * and their ownership in the type checker.
 */

export class CompileTimeEnvironment {
  /**
   * The map of variable names to their type closures.
   * It allows for nested scopes and variable shadowing.
   */
  constructor(
    public bindings: Map<string, AbstractTypeClosure> = new Map(),
    public parent: CompileTimeEnvironment | null = null
  ) { }

  /**
   * Extend the environment with a new variable.
   * @param name The name of the variable to extend.
   * @param type The type closure associated with the variable.
   * @throws Error if the variable is already declared in the current environment.
   */
  public extend(name: string, type: AbstractTypeClosure): void {
    if (this.bindings.has(name)) {
      throw new Error(`Variable '${name}' already declared`);
    }
    this.bindings.set(name, type);
  }

  /**
   * Recursively check if a variable exists in the current environment or its parent.
   * @param name The name of the variable to check.
   * @returns true if the variable exists, false otherwise.
   */
  public has(name: string): boolean {
    if (this.bindings.has(name)) {
      return true;
    }
    if (this.parent) {
      return this.parent.has(name);
    }
    return false;
  }

  /**
   * Recursively lookup a variable in the current environment.
   * If the variable is not found, it looks in the parent environment until reaches the root environment.
   * @param name The name of the variable to look up.
   * @returns The type closure associated with the variable.
   * @throws Error if the variable is not found.
   */
  public lookup(name: string): AbstractTypeClosure {
    if (this.bindings.has(name)) {
      return this.bindings.get(name)!;
    }
    if (this.parent) {
      return this.parent.lookup(name);
    }
    throw new Error(`Variable '${name}' not found`);
  }
}