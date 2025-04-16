import { CharStream, CommonTokenStream } from "antlr4ng";
import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import { RustedCompiler } from "./compiler/RustedCompiler";
import { RustedTypeChecker } from "./compiler/RustedTypeChecker";
import { RustedLexer } from "./parser/src/RustedLexer";
import { RustedParser } from "./parser/src/RustedParser";

export class RustedEvaluator extends BasicEvaluator {
  private executionCount: number;
  private compiler: RustedCompiler;
  private typechecker: RustedTypeChecker;

  constructor(conductor: IRunnerPlugin) {
    super(conductor);
    this.executionCount = 0;
    this.compiler = new RustedCompiler();
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
      const typeEnv = this.typechecker.getCompileTimeEnvironment();
      const result = this.compiler.compile(tree, typeEnv);
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
