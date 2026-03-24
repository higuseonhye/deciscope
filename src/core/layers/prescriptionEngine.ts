import type { InputType } from "../types";

export function prescriptionEngine(inputType: InputType): string {
  if (inputType === "agent_log") {
    return `
1. Add data freshness filter
2. Add validation step before output
3. Reject output if confidence low
`;
  }

  if (inputType === "llm_output") {
    return `
1. Require evidence for each claim
2. Add counterargument check
3. Do not act without validation
`;
  }

  if (inputType === "github_repo") {
    return `
1. Add testing layer
2. Add feedback loop
3. Define production constraints
`;
  }

  return `
1. Define constraints
2. Test small before committing
3. Re-evaluate with real data
`;
}
