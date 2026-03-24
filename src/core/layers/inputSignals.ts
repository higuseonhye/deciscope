/**
 * Lightweight lexical signals from user input — supports grounding, not NLP claims.
 */

const CERTAINTY_RE =
  /\b(definitely|certainly|always|never|100\s*%|guaranteed|obviously|clearly|undoubtedly|perfect|correct\s+without|no doubt)\b/gi;

const URGENCY_RE =
  /\b(immediately|right now|urgent|asap|without delay|must\s+act|launch\s+now|today\b|this week)\b/gi;

const WEAK_EVIDENCE_RE =
  /\b(no evidence|unverified|no data|purely speculative|i think|i feel|i guess|assumption)\b/gi;

/** Hints that concrete evidence might be present (incl. self-reported testing / validation) */
const EVIDENCE_ANCHOR_RE =
  /\b(according to|study|studies|data|source|sources|evidence|research|survey|metric|metrics|benchmark|http|%\s|percent|tested|testing|validation|validated|proof)\b/i;

export type InputSignals = {
  /** Short snippets around certainty hits */
  certaintySnippets: string[];
  /** Short snippets around urgency hits */
  urgencySnippets: string[];
  /** Snippets suggesting weak or absent grounding */
  weakGroundingSnippets: string[];
  /** Heuristic: long assertive text without anchors */
  lacksExplicitEvidenceAnchors: boolean;
};

function mergeIntervals(intervals: [number, number][]): [number, number][] {
  if (intervals.length === 0) return [];
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const prev = merged[merged.length - 1];
    const cur = sorted[i];
    if (cur[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], cur[1]);
    } else {
      merged.push(cur);
    }
  }
  return merged;
}

function collectSnippets(input: string, re: RegExp, max: number): string[] {
  const r = new RegExp(re.source, re.flags.includes("g") ? re.flags : `${re.flags}g`);
  const matches: { index: number; len: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = r.exec(input)) !== null) {
    matches.push({ index: m.index, len: m[0].length });
  }
  const intervals = matches.map(
    (x) => [x.index, x.index + x.len] as [number, number],
  );
  const merged = mergeIntervals(intervals);
  const pad = 28;
  const out: string[] = [];
  for (let i = 0; i < Math.min(merged.length, max); i++) {
    const [start, end] = merged[i];
    const a = Math.max(0, start - pad);
    const b = Math.min(input.length, end + pad);
    let s = input.slice(a, b).replace(/\s+/g, " ").trim();
    if (a > 0) s = `…${s}`;
    if (b < input.length) s = `${s}…`;
    out.push(s);
  }
  return dedupeSnippets(out);
}

function dedupeSnippets(snippets: string[]): string[] {
  const seen = new Set<string>();
  return snippets.filter((s) => {
    const k = s.slice(0, 48);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export function extractSignals(input: string): InputSignals {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      certaintySnippets: [],
      urgencySnippets: [],
      weakGroundingSnippets: [],
      lacksExplicitEvidenceAnchors: false,
    };
  }

  const certaintySnippets = collectSnippets(trimmed, CERTAINTY_RE, 4);
  const urgencySnippets = collectSnippets(trimmed, URGENCY_RE, 4);
  const weakGroundingSnippets = collectSnippets(trimmed, WEAK_EVIDENCE_RE, 3);

  const lacksExplicitEvidenceAnchors =
    trimmed.length > 55 &&
    !EVIDENCE_ANCHOR_RE.test(trimmed) &&
    !/\b\d+(\.\d+)?\s*%/.test(trimmed);

  return {
    certaintySnippets,
    urgencySnippets,
    weakGroundingSnippets,
    lacksExplicitEvidenceAnchors,
  };
}
