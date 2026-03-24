import type { InputType } from "../types";
import { hasRunwayZeroConstraint } from "../utils/runwayConstraint";

export function decisionEngine(input: string, inputType: InputType): string {
  const lower = input.toLowerCase();

  if (inputType === "agent_log") {
    if (lower.includes("outdated") || lower.includes("no longer exist")) {
      return "FIX";
    }
    return "ACCEPT";
  }

  if (inputType === "github_repo") {
    return "MODIFY";
  }

  if (inputType === "llm_output") {
    if (input.toLowerCase().includes("immediately")) {
      return "REJECT";
    }
    return "REVISE";
  }

  if (inputType === "decision") {
    if (hasRunwayZeroConstraint(input)) {
      return "NO";
    }
    return "GO";
  }

  return "REVISE";
}
