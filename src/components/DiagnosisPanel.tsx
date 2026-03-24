type Props = {
  text: string;
};

export function DiagnosisPanel({ text }: Props) {
  return (
    <details className="ds-accordion ds-accordion--warning">
      <summary>Diagnosis</summary>
      <div className="ds-accordion__body">
        <pre className="ds-text-block">{text.trim()}</pre>
      </div>
    </details>
  );
}
