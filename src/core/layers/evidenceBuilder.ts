import type { EvidenceItem, InputType } from "../types";
import type { InputSignals } from "./inputSignals";

/** Short pastes: show the full text as the quoted phrase (avoids overlapping ellipsis windows). */
const FULL_PASSAGE_MAX_LEN = 320;

/**
 * Evidence rows: phrase → implication → how it informs the current decision string.
 */
export function buildEvidenceItems(
  input: string,
  signals: InputSignals,
  decision: string,
  _inputType: InputType,
): EvidenceItem[] {
  const d = decision.toUpperCase();
  const full = input.trim();
  const useFullPassage =
    full.length > 0 && full.length <= FULL_PASSAGE_MAX_LEN;
  const phraseFor = (snippet: string) => (useFullPassage ? full : snippet);

  const items: EvidenceItem[] = [];

  const hasCertainty = signals.certaintySnippets.length > 0;
  const hasUrgency = signals.urgencySnippets.length > 0;
  /** One row when the whole short paste would repeat for both signal types */
  const mergeCertaintyUrgency =
    useFullPassage && hasCertainty && hasUrgency;

  if (mergeCertaintyUrgency) {
    items.push({
      phrase: full,
      implication:
        "Certainty language without cited proof increases overconfidence risk. Urgency narrows the time window for verification and can force premature action.",
      decisionLink: `For this ${d} read: asserted confidence plus immediate-action pressure, with no demonstrated validation in the same text — a tight margin for error.`,
    });
  } else {
    for (const phrase of signals.certaintySnippets.slice(0, 2)) {
      items.push({
        phrase: phraseFor(phrase),
        implication:
          "Certainty language without cited proof increases overconfidence risk.",
        decisionLink: `For this ${d} read: we discount authority that is asserted but not demonstrated in the same text.`,
      });
    }

    for (const phrase of signals.urgencySnippets.slice(0, 2)) {
      items.push({
        phrase: phraseFor(phrase),
        implication:
          "Urgency narrows the time window for verification and can force premature action.",
        decisionLink: `For this ${d} read: urgency plus thin evidence tightens the acceptable margin for error.`,
      });
    }
  }

  for (const phrase of signals.weakGroundingSnippets.slice(0, 2)) {
    items.push({
      phrase: phraseFor(phrase),
      implication:
        "Explicit doubt or missing-proof language undermines claim strength.",
      decisionLink: `For this ${d} read: the wording admits or implies weak grounding.`,
    });
  }

  if (signals.lacksExplicitEvidenceAnchors && items.length < 6) {
    const anchorImplication =
      "No clear citations, metrics, or source anchors detected in this fragment.";
    const anchorLink = `For this ${d} read: absent anchors mean we cannot treat the text as externally validated.`;

    if (useFullPassage && items.length > 0) {
      const last = items[items.length - 1];
      last.implication = `${last.implication} ${anchorImplication}`;
      last.decisionLink = `${last.decisionLink} ${anchorLink}`;
    } else {
      items.push({
        phrase: useFullPassage ? full : "(passage as a whole)",
        implication: anchorImplication,
        decisionLink: anchorLink,
      });
    }
  }

  if (items.length === 0 && full.length > 0) {
    const phrase =
      full.length <= FULL_PASSAGE_MAX_LEN
        ? full
        : `${full.slice(0, 280)}…`;
    items.push({
      phrase,
      implication:
        "Scanned wording does not match our strongest certainty, urgency, or doubt cues — the verdict rests on the full heuristic pass over this text.",
      decisionLink: `For this ${d} read: the label reflects the combined signals (not a single highlighted phrase).`,
    });
  }

  return dedupeEvidence(items);
}

function dedupeEvidence(items: EvidenceItem[]): EvidenceItem[] {
  const seen = new Set<string>();
  return items.filter((it) => {
    const k = `${it.phrase.slice(0, 40)}|${it.implication.slice(0, 40)}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
