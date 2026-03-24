export type InputType =
  | "decision"
  | "llm_output"
  | "github_repo"
  | "agent_log";

export interface Reality {
  type: "reasoning" | "system" | "execution";
  whatHappened: string;
  failure: string | null;
}

export type ConfidenceLevel = "low" | "medium" | "high";
export type RiskLevel = "low" | "medium" | "high";

export interface EvidenceItem {
  /** Snippet from user input */
  phrase: string;
  /** Why this phrase matters for grounding */
  implication: string;
  /** How this phrase informs the stated decision */
  decisionLink: string;
}

export interface PipelineResult {
  reality: Reality;
  decision: string;
  confidence: ConfidenceLevel;
  risk: RiskLevel;
  /** Why confidence is set at this level (traceable factors) */
  confidenceRationale: string;
  /** Lexical signals grounded in the input text */
  evidence: EvidenceItem[];
  diagnosis: string;
  mri: string;
  prescription: string;
}
