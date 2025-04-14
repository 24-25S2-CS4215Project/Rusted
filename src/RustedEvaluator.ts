import { CharStream, CommonTokenStream } from "antlr4ng";
import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import { RustedCompilerVisitor } from "./compiler/compiler";
import { RustedLexer } from "./parser/src/RustedLexer";
import { RustedParser } from "./parser/src/RustedParser";
import { RustedTypeChecker } from "./typechecker/typechecker";

export class RustedEvaluator extends BasicEvaluator {
  private executionCount: number;
  private compiler: RustedCompilerVisitor;
  private typechecker: RustedTypeChecker;

  constructor(conductor: IRunnerPlugin) {
    super(conductor);
    this.executionCount = 0;
    this.compiler = new RustedCompilerVisitor();
    this.typechecker = new RustedTypeChecker();
  }

  async evaluateChunk(chunk: string): Promise<void> {
    this.executionCount++;
    try {
      // Create the lexer and parser
      const inputStream = CharStream.fromString(chunk);
      const lexer = new RustedLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new RustedParser(tokenStream);

      // Parse the input
      const tree = parser.program();

      // Type check the parsed tree
      const typeCheckResult = this.typechecker.typeCheck(tree);
      this.conductor.sendOutput(`Type checking result: ${typeCheckResult}`);

      // Compile the parsed tree
      const result = this.compiler.compile(tree);
      this.conductor.sendOutput(
        `Compiled expression (as VM instructions):\n${result.join("\n")}`
      );
    } catch (error) {
      // Handle errors and send them to the REPL
      // TODO: differentiate between type checking and compile errors
      if (error instanceof Error) {
        this.conductor.sendOutput(`Error: ${error.message}`);
      } else {
        this.conductor.sendOutput(`Error: ${String(error)}`);
      }
    }
  }
}
