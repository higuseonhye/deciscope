import type { InputType } from "../core/types";

const OPTIONS: { value: InputType; label: string }[] = [
  { value: "decision", label: "Decision question" },
  { value: "llm_output", label: "LLM output" },
  { value: "github_repo", label: "GitHub repo (URL)" },
  { value: "agent_log", label: "Agent log" },
];

type Props = {
  value: InputType;
  onChange: (value: InputType) => void;
  /** When true (e.g. Demo mode), explains link to Scenario presets. */
  showScenarioLinkHint?: boolean;
};

export function InputSelector({
  value,
  onChange,
  showScenarioLinkHint,
}: Props) {
  return (
    <div className="ds-input-block">
      <div className="ds-section-label">Input type</div>
      {showScenarioLinkHint ? (
        <p className="ds-input-type-hint">
          Choose the kind of input first. Each scenario preset updates this when
          selected.
        </p>
      ) : null}
      <div
        className="ds-input-selector"
        role="radiogroup"
        aria-label="Input type"
      >
        {OPTIONS.map((opt) => (
          <label key={opt.value}>
            <input
              type="radio"
              name="input-type"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}
