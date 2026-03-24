import type { Reality } from "../core/types";

type Props = {
  reality: Reality;
};

export default function RealityPanel({ reality }: Props) {
  return (
    <section
      className="ds-reality-panel"
      aria-labelledby="reality-heading"
    >
      <h3 id="reality-heading">Reality</h3>
      <p>
        <b>Type:</b> {reality.type}
      </p>
      <p>
        <b>What happened:</b> {reality.whatHappened}
      </p>
      {reality.failure ? (
        <p className="ds-reality-panel__failure">
          <b>Failure:</b> {reality.failure}
        </p>
      ) : null}
    </section>
  );
}
