import type { InputType } from "../types";

export const decisionVocabulary: Record<InputType, string[]> = {
  decision: ["GO", "NO", "WAIT"],
  llm_output: ["TRUST", "REVISE", "REJECT"],
  github_repo: ["USE", "MODIFY", "IGNORE", "REBUILD"],
  agent_log: ["ACCEPT", "FIX", "RERUN", "REDESIGN"],
};
