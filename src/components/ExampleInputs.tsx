import type { InputType } from "../core/types";

export type ExampleId = "risky" | "premature" | "safe";

export const EXAMPLES: Record<
  ExampleId,
  { label: string; inputType: InputType; text: string }
> = {
  risky: {
    label: "🚨 Risky AI Output",
    inputType: "llm_output",
    text: "This is definitely correct. You should act immediately.",
  },
  premature: {
    label: "🧠 Premature Decision",
    inputType: "decision",
    text: "We should launch this immediately with zero months of testing.",
  },
  safe: {
    label: "✅ Safe to Proceed",
    inputType: "decision",
    text: "This feature has been tested and shows stable performance.",
  },
};

export const DEFAULT_INPUT_TYPE = EXAMPLES.risky.inputType;
export const DEFAULT_INPUT_TEXT = EXAMPLES.risky.text;

/** Which scenario matches current field values (exact text + type), if any. */
export function matchActiveScenario(
  input: string,
  inputType: InputType,
): ExampleId | null {
  for (const id of Object.keys(EXAMPLES) as ExampleId[]) {
    const ex = EXAMPLES[id];
    if (ex.inputType === inputType && ex.text === input) {
      return id;
    }
  }
  return null;
}

type Props = {
  onSelect: (id: ExampleId) => void;
  activeScenario: ExampleId | null;
};

export function ExampleInputs({ onSelect, activeScenario }: Props) {
  return (
    <div className="ds-input-block ds-scenario-picker ds-field-group--scenario">
      <div className="ds-section-label">Scenario</div>
      <p className="ds-scenario-picker__hint">
        Presets for the <strong>input type</strong> above—same pipeline, different
        text. See how the verdict changes.
      </p>
      <div
        className="ds-scenario-picker__track"
        role="group"
        aria-label="Scenarios for the selected input type"
      >
        {(Object.keys(EXAMPLES) as ExampleId[]).map((id) => {
          const isActive = activeScenario === id;
          return (
            <button
              key={id}
              type="button"
              className={
                isActive
                  ? "ds-scenario-picker__btn is-active"
                  : "ds-scenario-picker__btn"
              }
              aria-pressed={isActive}
              onClick={() => onSelect(id)}
            >
              {EXAMPLES[id].label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
