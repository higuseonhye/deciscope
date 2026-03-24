import type { InputType } from "../types";

export function systemMRI(_input: string, inputType: InputType): string {
  if (inputType === "agent_log") {
    return `
System type:
Execution pipeline

Flow:
Query → Retrieve → Summarize → Output

Missing:
- Data validation
- Freshness check
- Verification step

Conclusion:
Optimizes completion, not correctness
`;
  }

  if (inputType === "github_repo") {
    return `
System type:
Code generation system

Flow:
Prompt → Generate → Write files

Missing:
- Testing
- Feedback loop
- Iteration

Conclusion:
Single-pass generator, not full system
`;
  }

  if (inputType === "llm_output") {
    return `
System type:
Reasoning chain

Flow:
Claim → Justification → Conclusion

Missing:
- Evidence
- Counterarguments
- Risk analysis

Conclusion:
Persuasive but weak logic
`;
  }

  return `
System type:
Human decision system

Flow:
Intent → Framing → Choice

Missing:
- Named constraints
- Feedback loop
- External validation hooks

Conclusion:
Judgment without instrumentation is hard to audit
`;
}
