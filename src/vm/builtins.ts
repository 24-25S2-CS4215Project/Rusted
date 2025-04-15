export const construct_builtins = (stdout: string[]) => {
  // represent builtins as a javascript object.
  // construct the builtins with an stdout array to write to.
  //
  // each function is represented as an object with two attributes
  // - `type`: a string description of its type in Rusted
  // - `impl`: the implementation of the builtin function
  return {
    println: {
      type: "fn(any) -> ()",
      impl: (val: any) => {
        stdout.push(val);
      },
    },
  };
};

// ignore implementations, and extract the types for all builtins
export const builtins_types = Object.entries(construct_builtins([])).map(
  ([name, props]) => [name, props.type]
);
