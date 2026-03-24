import type { InputType, Reality } from "../types";

export function realityExtraction(
  input: string,
  inputType: InputType,
): Reality {
  if (inputType === "agent_log") {
    const lower = input.toLowerCase();
    if (lower.includes("outdated") || lower.includes("no longer exist")) {
      return {
        type: "execution",
        whatHappened:
          "Agent retrieved outdated data and produced incorrect output",
        failure: "Output is factually incorrect",
      };
    }

    return {
      type: "execution",
      whatHappened: "Agent executed steps",
      failure: null,
    };
  }

  if (inputType === "github_repo") {
    return {
      type: "system",
      whatHappened: "Repository provided",
      failure: null,
    };
  }

  if (inputType === "llm_output") {
    return {
      type: "reasoning",
      whatHappened: "Argument presented",
      failure: null,
    };
  }

  return {
    type: "reasoning",
    whatHappened: "User decision request",
    failure: null,
  };
}
