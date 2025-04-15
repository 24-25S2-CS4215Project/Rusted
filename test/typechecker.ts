import { ProgramContext } from "../src/parser/src/RustedParser";
import { RustedTypeChecker } from "../src/typechecker/RustedTypeChecker";

function testTypeChecker(parseTree: ProgramContext) {
  const typeChecker = new RustedTypeChecker();
  const result = typeChecker.typeCheck(parseTree);
  console.log(result);
}
