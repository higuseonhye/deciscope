import type {
  ConfidenceLevel,
  InputType,
  Reality,
  RiskLevel,
} from "../types";
import { hasRunwayZeroConstraint } from "../utils/runwayConstraint";

/**
 * Heuristic judgment meta: aligns with pipeline signals (reality failure,
 * keyword triggers, input type). Not statistical—signals accountability.
 */
export function computeConfidenceRisk(
  input: string,
  inputType: InputType,
  reality: Reality,
): { confidence: ConfidenceLevel; risk: RiskLevel } {
  if (reality.failure) {
    return { confidence: "low", risk: "high" };
  }

  if (inputType === "agent_log") {
    const lower = input.toLowerCase();
    if (lower.includes("outdated") || lower.includes("no longer exist")) {
      return { confidence: "low", risk: "high" };
    }
    return { confidence: "medium", risk: "medium" };
  }

  if (inputType === "llm_output") {
    if (input.toLowerCase().includes("immediately")) {
      return { confidence: "low", risk: "high" };
    }
    return { confidence: "medium", risk: "medium" };
  }

  if (inputType === "decision") {
    if (hasRunwayZeroConstraint(input)) {
      return { confidence: "medium", risk: "high" };
    }
    return { confidence: "medium", risk: "low" };
  }

  if (inputType === "github_repo") {
    return { confidence: "medium", risk: "medium" };
  }

  return { confidence: "medium", risk: "medium" };
}
