type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  label?: string;
};

export function InputBox({
  value,
  onChange,
  placeholder,
  helperText,
  label = "Input",
}: Props) {
  return (
    <div className="ds-input-block ds-input-box">
      <div className="ds-section-label">{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        aria-label="Analysis input"
      />
      {helperText ? (
        <p className="ds-input-helper">{helperText}</p>
      ) : null}
    </div>
  );
}
