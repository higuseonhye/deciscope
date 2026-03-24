import type { InputSignals } from "./inputSignals";

/**
 * Short preamble for diagnosis that ties analysis to phrases from the input.
 */
export function buildGroundedDiagnosisIntro(
  input: string,
  signals: InputSignals,
): string {
  const trimmed = input.trim();
  if (!trimmed) {
    return "";
  }

  const lines: string[] = [];

  if (signals.certaintySnippets.length > 0) {
    const ex = signals.certaintySnippets[0];
    lines.push(
      `The text includes certainty-heavy wording (e.g. "${truncateForQuote(ex)}") — treat claims as hypotheses until evidence is attached.`,
    );
  }

  if (signals.urgencySnippets.length > 0) {
    const ex = signals.urgencySnippets[0];
    lines.push(
      `Urgency shows up in your phrasing ("${truncateForQuote(ex)}") — that often competes with careful validation.`,
    );
  }

  if (signals.weakGroundingSnippets.length > 0) {
    lines.push(
      `Explicit doubts or gaps appear ("${truncateForQuote(signals.weakGroundingSnippets[0])}"), which should weigh on how much to trust the conclusion.`,
    );
  }

  if (signals.lacksExplicitEvidenceAnchors && lines.length === 0) {
    lines.push(
      "This excerpt does not surface studies, metrics, or sources — structural diagnosis below assumes limited external grounding.",
    );
  }

  if (lines.length === 0) {
    return "";
  }

  return `Grounded read (from your input):\n${lines.map((l) => `- ${l}`).join("\n")}\n\n`;
}

function truncateForQuote(s: string, max = 90): string {
  const t = s.replace(/^…|…$/g, "").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}
