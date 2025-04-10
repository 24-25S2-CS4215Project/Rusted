import { RustedTypeChecker } from "../typechecker/RustedTypechecker";


function testTypeChecker() {
    const typeChecker = new RustedTypeChecker();
    const result = typeChecker.typeCheck();
    console.log(result);
}