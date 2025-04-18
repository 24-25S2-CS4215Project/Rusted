import { VM } from "./vm";

export const construct_builtins = (vm?: VM) => {
  // represent builtins as a javascript object.
  // construct the builtins with an stdout array to write to.
  //
  // each function is represented as an object with two attributes
  // - `type`: a string description of its type in Rusted
  // - `impl`: the implementation of the builtin function
  return {
    print_int: {
      type: "fn(i32) -> ()",
      impl: (val: number) => {
        vm.stdout.push("" + val);
      },
    },
    print_bool: {
      type: "fn(bool) -> ()",
      impl: (val: number) => {
        const is_false = val === 0;
        vm.stdout.push("" + !is_false);
      },
    },
    print_str_ref: {
      type: "fn(&str) -> ()",
      impl: (str_addr: number) => {
        const str = vm.get_string(str_addr);
        vm.stdout.push(str);
      },
    },
    print_str: {
      type: "fn(str) -> ()",
      impl: (str_addr: number) => {
        const str = vm.get_string(str_addr);
        vm.stdout.push(str);
      },
    },
  };
};

// ignore implementations, and extract the types for all builtins
export const builtins_types = Object.entries(construct_builtins()).map(
  ([name, props]) => [name, props.type]
);
