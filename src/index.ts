import { initialise } from "conductor/dist/conductor/runner/util/";
import { RustedEvaluator } from "./RustedEvaluator";

const { runnerPlugin, conduit } = initialise(RustedEvaluator);
