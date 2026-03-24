type Props = {
  text: string;
};

export function PrescriptionPanel({ text }: Props) {
  return (
    <details className="ds-accordion ds-accordion--checklist" open>
      <summary>Prescription</summary>
      <div className="ds-accordion__body ds-prescription">
        <p className="ds-prescription-plain">{text}</p>
      </div>
    </details>
  );
}
