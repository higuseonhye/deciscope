import type { ConfidenceLevel, RiskLevel } from "../core/types";

type Props = {
  confidence: ConfidenceLevel;
  risk: RiskLevel;
};

/**
 * When the verdict is fragile, we say so plainly and suggest safer next moves.
 * Does not change pipeline output — UX-only guardrails.
 */
export function LowConfidenceCallout({ confidence, risk }: Props) {
  if (confidence === "low") {
    return (
      <div
        className="ds-verdict-caution ds-verdict-caution--low"
        role="status"
        aria-live="polite"
      >
        <p className="ds-verdict-caution__title">Low confidence — treat as provisional</p>
        <p className="ds-verdict-caution__body">
          This read is under-specified or internally mixed. Do not use it as sole authority
          for irreversible actions. Prefer human review, independent checks, or paste a
          richer scenario (constraints, numbers, sources) and run again.
        </p>
        <ul className="ds-verdict-caution__list">
          <li>Add what a skeptic would ask for: who, by when, and what would falsify the plan.</li>
          <li>Separate facts you know from claims the text merely asserts.</li>
        </ul>
      </div>
    );
  }

  if (confidence === "medium" && risk === "high") {
    return (
      <div
        className="ds-verdict-caution ds-verdict-caution--elevated"
        role="status"
        aria-live="polite"
      >
        <p className="ds-verdict-caution__title">Elevated risk with medium confidence</p>
        <p className="ds-verdict-caution__body">
          Downside may be large even when the label is not at the lowest confidence band.
          Stress-test the prescription against your worst-case before committing.
        </p>
      </div>
    );
  }

  return null;
}
