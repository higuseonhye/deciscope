import { useEffect, useMemo, useRef, useState } from "react";
import { runPipeline } from "./core/pipeline/runPipeline";
import type { InputType, PipelineResult } from "./core/types";
import {
  DEFAULT_INPUT_TEXT,
  DEFAULT_INPUT_TYPE,
  ExampleInputs,
  EXAMPLES,
  matchActiveScenario,
  type ExampleId,
} from "./components/ExampleInputs";
import { DisagreementPanel } from "./components/DisagreementPanel";
import { FinalDecisionCard } from "./components/FinalDecisionCard";
import { Header } from "./components/Header";
import { LowConfidenceCallout } from "./components/LowConfidenceCallout";
import { InputBox } from "./components/InputBox";
import { InputSelector } from "./components/InputSelector";
import { ModeToggle, type AppMode } from "./components/ModeToggle";
import { ProductHero } from "./components/ProductHero";
import { ValueFramingPanel } from "./components/ValueFramingPanel";
import { PrescriptionPanel } from "./components/PrescriptionPanel";
import RealityPanel from "./components/RealityPanel";
import { ReportSection } from "./components/ReportSection";
import { RunButton } from "./components/RunButton";
import "./components/components.css";

const PLACEHOLDERS: Record<InputType, string> = {
  decision:
    "Describe the decision: goal, constraints, and what success looks like.",
  llm_output: "Paste the model output you want analyzed.",
  github_repo: "Paste a repository URL (https://github.com/org/repo).",
  agent_log: "Paste a representative agent trace or step log.",
};

function App() {
  const [mode, setMode] = useState<AppMode>("demo");
  const [inputType, setInputType] = useState<InputType>(DEFAULT_INPUT_TYPE);
  const [input, setInput] = useState(DEFAULT_INPUT_TEXT);
  const [result, setResult] = useState<PipelineResult | null>(null);
  /** Increments each run so the results tree remounts — one output at a time, no stacking. */
  const [runId, setRunId] = useState(0);
  const decisionSectionRef = useRef<HTMLElement | null>(null);

  const handleModeChange = (next: AppMode) => {
    setMode(next);
    setResult(null);
    setRunId(0);
    if (next === "product") {
      setInput("");
    } else {
      setInput(DEFAULT_INPUT_TEXT);
      setInputType(DEFAULT_INPUT_TYPE);
    }
  };

  const placeholder =
    mode === "product"
      ? "Paste your scenario here..."
      : PLACEHOLDERS[inputType];
  const canRun = input.trim().length > 0;

  const handleRun = () => {
    setResult(null);
    setRunId((n) => n + 1);
    const next = runPipeline(input, inputType);
    setResult(next);
  };

  const handleExample = (id: ExampleId) => {
    const ex = EXAMPLES[id];
    setInputType(ex.inputType);
    setInput(ex.text);
    setResult(null);
    setRunId(0);
  };

  useEffect(() => {
    if (!result) return;
    decisionSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [result]);

  const activeScenario = useMemo(
    () =>
      mode === "demo" ? matchActiveScenario(input, inputType) : null,
    [mode, input, inputType],
  );

  return (
    <div className="ds-app">
      <Header />

      <ProductHero mode={mode} />

      <ValueFramingPanel />

      <ModeToggle mode={mode} onChange={handleModeChange} />

      <div className="ds-field-group ds-field-group--input-type">
        <InputSelector
          value={inputType}
          onChange={setInputType}
          showScenarioLinkHint={mode === "demo"}
        />
      </div>
      {mode === "product" ? (
        <div className="ds-mode-cta ds-mode-cta--above-input">
          <span className="ds-mode-cta__hint">New here?</span>
          <button
            type="button"
            className="ds-mode-cta__btn"
            onClick={() => handleModeChange("demo")}
          >
            Try Demo
          </button>
        </div>
      ) : null}
      {mode === "demo" ? (
        <ExampleInputs
          onSelect={handleExample}
          activeScenario={activeScenario}
        />
      ) : null}
      <InputBox
        value={input}
        onChange={setInput}
        placeholder={placeholder}
        label={mode === "demo" ? "Sample Input" : "Input"}
        helperText={
          mode === "demo"
            ? "This is a sample scenario. Click 'Try Demo' to see how Deciscope works."
            : "Enter your own scenario and analyze the decision."
        }
      />

      <div className="ds-actions">
        <RunButton
          onClick={handleRun}
          disabled={!canRun}
          label={mode === "demo" ? "▶ Try Demo" : "Run Deciscope"}
        />
      </div>

      {result ? (
        <div key={runId} className="ds-results">
          <div className="ds-section-label">Reality</div>
          <RealityPanel reality={result.reality} />
          <div className="ds-section-label">Report</div>
          <ReportSection result={result} />
          <hr className="ds-break" />
          <section
            ref={decisionSectionRef}
            className="ds-decision-section"
            aria-labelledby="final-decision-heading"
          >
            <p className="ds-decision-comparison-hint">
              Same system. Different outcome.
            </p>
            <h2 id="final-decision-heading" className="ds-decision-section__title">
              Final Decision
            </h2>
            <p className="ds-decision-context">Based on the analysis above</p>
            <FinalDecisionCard
              decision={result.decision}
              confidence={result.confidence}
              risk={result.risk}
              confidenceRationale={result.confidenceRationale}
              variant={
                result.confidence === "low" ? "lowConfidence" : "default"
              }
            />
            <LowConfidenceCallout
              confidence={result.confidence}
              risk={result.risk}
            />
            <DisagreementPanel decisionLabel={result.decision} />
          </section>
          {mode === "demo" ? (
            <div className="ds-mode-cta ds-mode-cta--below-verdict">
              <p className="ds-mode-cta__prompt">
                Want to try your own scenario?
              </p>
              <button
                type="button"
                className="ds-mode-cta__btn"
                onClick={() => handleModeChange("product")}
              >
                Switch to Product Mode
              </button>
            </div>
          ) : null}
          <p className="ds-transition">Now, here&apos;s what to do next:</p>
          <div className="ds-section-label">Prescription</div>
          <PrescriptionPanel text={result.prescription} />
        </div>
      ) : (
        <div className="ds-placeholder">
          Provide input and run Deciscope to generate a structured decision
          report. This is a decision and diagnosis system—not a chat interface.
        </div>
      )}
    </div>
  );
}

export default App;
