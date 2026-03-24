type Props = {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
};

export function RunButton({ onClick, disabled, label = "Run Deciscope" }: Props) {
  return (
    <button
      type="button"
      className="ds-run-button"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
