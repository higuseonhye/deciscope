export type AppMode = "demo" | "product";

type Props = {
  mode: AppMode;
  onChange: (mode: AppMode) => void;
};

export function ModeToggle({ mode, onChange }: Props) {
  return (
    <div
      className="ds-mode-toggle"
      role="tablist"
      aria-label="Deciscope mode"
    >
      <button
        type="button"
        role="tab"
        aria-selected={mode === "demo"}
        className={
          mode === "demo"
            ? "ds-mode-toggle__btn is-active"
            : "ds-mode-toggle__btn"
        }
        onClick={() => onChange("demo")}
      >
        Demo Mode
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "product"}
        className={
          mode === "product"
            ? "ds-mode-toggle__btn is-active"
            : "ds-mode-toggle__btn"
        }
        onClick={() => onChange("product")}
      >
        Product Mode
      </button>
    </div>
  );
}
