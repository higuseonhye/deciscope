import { useId, useState } from "react";

type Props = {
  /** Current verdict label — reminds user what they are pushing back on */
  decisionLabel: string;
};

/**
 * Local-only disagreement capture: builds trust by inviting pushback without a backend.
 */
export function DisagreementPanel({ decisionLabel }: Props) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const baseId = useId();
  const noteId = `${baseId}-note`;

  return (
    <div className="ds-disagree">
      <button
        type="button"
        className="ds-disagree__toggle"
        aria-expanded={open}
        aria-controls={`${baseId}-panel`}
        onClick={() => {
          setOpen((v) => !v);
          if (!open) setAcknowledged(false);
        }}
      >
        Disagree with this verdict?
        <span className="ds-disagree__chevron" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? (
        <div
          className="ds-disagree__body"
          id={`${baseId}-panel`}
          role="region"
          aria-label="Disagreement capture"
        >
          <p className="ds-disagree__intro">
            Deciscope can be wrong. If your context contradicts the{" "}
            <strong>{decisionLabel}</strong> read, say what we missed — then refine your
            input and run again so the report can track your facts.
          </p>
          <label className="ds-disagree__label" htmlFor={noteId}>
            What should change? (optional, stays on this device)
          </label>
          <textarea
            id={noteId}
            className="ds-disagree__textarea"
            rows={3}
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setAcknowledged(false);
            }}
            placeholder="e.g. We already have budget approval; the risk is regulatory, not technical…"
          />
          <ul className="ds-disagree__hints">
            <li>Paste missing constraints, stakeholders, or metrics into the input above.</li>
            <li>If the failure mode is wrong, quote the exact line that proves it.</li>
          </ul>
          <button
            type="button"
            className="ds-disagree__ack"
            onClick={() => setAcknowledged(true)}
          >
            I&apos;ve captured my disagreement
          </button>
          {acknowledged ? (
            <p className="ds-disagree__confirm" role="status">
              Noted. Nothing is sent to a server — update your scenario and run Deciscope again
              for a grounded rerun.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
