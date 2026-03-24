import type { EvidenceItem } from "../core/types";

type Props = {
  items: EvidenceItem[];
};

export function EvidencePanel({ items }: Props) {
  return (
    <details className="ds-accordion ds-accordion--neutral" open>
      <summary>Evidence</summary>
      <div className="ds-accordion__body ds-evidence">
        {items.length === 0 ? (
          <p className="ds-evidence__empty">
            No strong certainty, urgency, or evidentiary-gap cues were detected in
            the scanned wording.
          </p>
        ) : (
          <ul className="ds-evidence__list">
            {items.map((item, i) => (
              <li key={`${item.phrase}-${i}`} className="ds-evidence__item">
                <div className="ds-evidence__main">
                  <span className="ds-evidence__phrase">&quot;{item.phrase}&quot;</span>
                  <span className="ds-evidence__arrow">→</span>
                  <span className="ds-evidence__implication">{item.implication}</span>
                </div>
                <p className="ds-evidence__decision-link">{item.decisionLink}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}
