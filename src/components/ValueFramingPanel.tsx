/**
 * Collapsible value framing — not pipeline logic.
 */
export function ValueFramingPanel() {
  return (
    <details className="ds-value-framing ds-accordion ds-accordion--neutral">
      <summary>Why this matters</summary>
      <div className="ds-accordion__body ds-value-framing__body">
        <p className="ds-value-framing__lead">
          What counts is whether the reasoning holds up — not how polished the answer
          sounds.
        </p>
        <ul className="ds-value-framing__list">
          <li>
            Same structure for every scenario, so attention stays on what the text
            actually supports.
          </li>
          <li>
            Confidence, risk, and trace lines to the input — clearer handoffs and
            reviews without reconstructing a long thread.
          </li>
          <li>
            A workflow built around defensible judgment instead of black-box persuasion.
          </li>
        </ul>
        <p className="ds-value-framing__foot">
          Trust compounds when the system admits limits — including when you disagree with
          the verdict.
        </p>
      </div>
    </details>
  );
}
