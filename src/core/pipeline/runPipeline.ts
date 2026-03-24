import { decisionVocabulary } from "../config/decisionVocabulary";
import type { InputType, PipelineResult } from "../types";
import { buildConfidenceRationale } from "../layers/confidenceRationale";
import { computeConfidenceRisk } from "../layers/confidenceRisk";
import { decisionEngine } from "../layers/decisionEngine";
import { diagnosisEngine } from "../layers/diagnosisEngine";
import { buildEvidenceItems } from "../layers/evidenceBuilder";
import { extractSignals } from "../layers/inputSignals";
import { prescriptionEngine } from "../layers/prescriptionEngine";
import { realityExtraction } from "../layers/realityExtraction";
import { systemMRI } from "../layers/systemMRI";

function validateDecision(decision: string, inputType: InputType): string {
  const allowed = decisionVocabulary[inputType];

  if (!allowed.includes(decision)) {
    console.warn("Invalid decision:", decision);
    return allowed[0];
  }

  return decision;
}

export function runPipeline(
  input: string,
  inputType: InputType,
): PipelineResult {
  const reality = realityExtraction(input, inputType);

  const rawDecision = decisionEngine(input, inputType);
  const decision = validateDecision(rawDecision, inputType);
  const { confidence, risk } = computeConfidenceRisk(
    input,
    inputType,
    reality,
  );
  const signals = extractSignals(input);
  const confidenceRationale = buildConfidenceRationale(
    input,
    inputType,
    confidence,
    risk,
    reality,
    signals,
  );
  const evidence = buildEvidenceItems(input, signals, decision, inputType);
  const diagnosis = diagnosisEngine(input, inputType, signals);
  const mri = systemMRI(input, inputType);

  const prescription = prescriptionEngine(inputType);

  return {
    reality,
    decision,
    confidence,
    risk,
    confidenceRationale,
    evidence,
    diagnosis,
    mri,
    prescription,
  };
}
