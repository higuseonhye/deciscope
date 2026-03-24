import type {
  ConfidenceLevel,
  InputType,
  Reality,
  RiskLevel,
} from "../types";
import type { InputSignals } from "./inputSignals";

/**
 * Plain-language trace from input + signals to the confidence label.
 */
export function buildConfidenceRationale(
  input: string,
  _inputType: InputType,
  confidence: ConfidenceLevel,
  risk: RiskLevel,
  reality: Reality,
  signals: InputSignals,
): string {
  const parts: string[] = [];

  if (reality.failure) {
    parts.push(
      `Why not higher confidence: reality flags "${reality.failure}" from what you described.`,
    );
  } else if (confidence === "low") {
    parts.push(
      "Why this confidence: wording mixes strong claims or urgency with little compensating proof in the excerpt.",
    );
  } else if (confidence === "medium") {
    parts.push(
      "Why this confidence: the text is partially specified — enough to score, but with residual ambiguity (length, sources, or mixed cues).",
    );
  } else {
    parts.push(
      "Why this confidence: fewer failure flags and fewer certainty/urgency clashes in the scanned wording for this run.",
    );
  }

  if (signals.lacksExplicitEvidenceAnchors && input.trim().length > 40) {
    parts.push(
      "Uncertainty factor: no studies, metrics, or citations appear in the paste.",
    );
  }

  if (input.trim().length < 45) {
    parts.push("Uncertainty factor: very short input limits contextual grounding.");
  }

  if (risk === "high" && confidence !== "low") {
    parts.push(
      "Risk is elevated for this input type and wording — even when confidence is not at the floor.",
    );
  }

  return parts.join(" ");
}
