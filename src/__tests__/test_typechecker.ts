import { RustedTypeChecker } from "../typechecker/typechecker";


function testTypeChecker() {
    const typeChecker = new RustedTypeChecker();
    const result = typeChecker.typeCheck();
    console.log(result);
}