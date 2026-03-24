import type { PipelineResult } from "../core/types";
import { DiagnosisPanel } from "./DiagnosisPanel";
import { EvidencePanel } from "./EvidencePanel";
import { SystemMRIPanel } from "./SystemMRIPanel";

type Props = {
  result: PipelineResult;
};

/**
 * Evidence → Diagnosis → MRI. Reality, Decision, Prescription are composed in App.
 */
export function ReportSection({ result }: Props) {
  return (
    <section className="ds-report" aria-label="Evidence, diagnosis, and system MRI">
      <EvidencePanel items={result.evidence} />
      <DiagnosisPanel text={result.diagnosis} />
      <SystemMRIPanel text={result.mri} />
    </section>
  );
}
