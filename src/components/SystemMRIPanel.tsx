type Props = {
  text: string;
};

export function SystemMRIPanel({ text }: Props) {
  return (
    <details className="ds-accordion ds-accordion--neutral">
      <summary>System MRI</summary>
      <div className="ds-accordion__body">
        <pre className="ds-text-block">{text.trim()}</pre>
      </div>
    </details>
  );
}
