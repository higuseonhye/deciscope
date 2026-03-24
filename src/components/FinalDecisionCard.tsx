import type { ConfidenceLevel, RiskLevel } from "../core/types";

type Props = {
  decision: string;
  confidence: ConfidenceLevel;
  risk: RiskLevel;
  /** Traceable factors behind the confidence label */
  confidenceRationale: string;
  /** Visual emphasis when confidence is low — matches LowConfidenceCallout */
  variant?: "default" | "lowConfidence";
};

function levelClass(kind: "confidence" | "risk", level: string): string {
  return `ds-decision-meta__item ds-decision-meta__item--${kind}-${level}`;
}

/** Outcome card; parent supplies section heading (e.g. Final Decision). */
export function FinalDecisionCard({
  decision,
  confidence,
  risk,
  confidenceRationale,
  variant = "default",
}: Props) {
  const cardClass =
    variant === "lowConfidence"
      ? "ds-decision-card ds-decision-card--low-confidence"
      : "ds-decision-card";

  return (
    <div
      className={cardClass}
      role="group"
      aria-label="Decision outcome"
    >
      <p className="ds-decision-card__outcome">{decision}</p>
      <div className="ds-decision-meta" aria-label="Judgment accountability">
        <span className={levelClass("confidence", confidence)}>
          Confidence: {confidence.toUpperCase()}
        </span>
        <span className={levelClass("risk", risk)}>
          Risk: {risk.toUpperCase()}
        </span>
      </div>
      <div
        className="ds-decision-card__confidence-rationale"
        aria-label="Why this confidence"
      >
        <p className="ds-decision-card__confidence-rationale-label">
          Why this confidence?
        </p>
        <p className="ds-decision-card__confidence-rationale-text">
          {confidenceRationale}
        </p>
      </div>
    </div>
  );
}
