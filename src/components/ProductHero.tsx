import type { AppMode } from "./ModeToggle";

type Props = {
  mode: AppMode;
};

export function ProductHero({ mode }: Props) {
  return (
    <div className="ds-product-hero">
      <h1 className="ds-product-hero__headline">
        Make better decisions, not just better answers.
      </h1>
      <p className="ds-product-hero__subtext">
        Analyze reasoning → Get a decision with risk and confidence.
      </p>
      {mode === "demo" ? (
        <p className="ds-product-hero__demo-hint">
          Start with a sample → then try your own
        </p>
      ) : null}
    </div>
  );
}
