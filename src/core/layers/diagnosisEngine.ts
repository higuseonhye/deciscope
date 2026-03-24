import type { InputType } from "../types";
import { hasRunwayZeroConstraint } from "../utils/runwayConstraint";
import { buildGroundedDiagnosisIntro } from "./groundedReasoning";
import { extractSignals, type InputSignals } from "./inputSignals";

function clip(s: string, max: number): string {
  const t = s.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

/**
 * Diagnosis body: every line should tie to exact wording or patterns in `input`.
 */
function buildAnchoredDiagnosisBody(
  input: string,
  inputType: InputType,
  signals: InputSignals,
): string {
  const t = input.trim();
  if (!t) {
    return "\nNo input text to anchor — add a scenario to diagnose.\n";
  }

  const head = clip(t, 140);
  const lines: string[] = [];

  lines.push(`Text under review (verbatim fragment): "${head}"`);
  lines.push("");

  if (inputType === "agent_log") {
    const tl = t.toLowerCase();
    if (tl.includes("outdated") || tl.includes("no longer exist")) {
      lines.push(
        `- You wrote about outdated or missing references — that exact theme is why we treat execution as unreliable here.`,
      );
    } else {
      lines.push(
        `- The log excerpt you gave does not, in itself, prove validation steps; we flag blind trust in retrieved lines.`,
      );
    }
    lines.push(
      `- Agent-related failure mode: any "success" signal in the trace without a freshness check is called out because your words describe process, not verification.`,
    );
  } else if (inputType === "github_repo") {
    lines.push(
      `- Repository URL or description you entered does not establish tests or feedback loops in the pasted fragment — we say "functional but incomplete" only from that gap.`,
    );
    lines.push(
      `- Words about generation or writing files, if present, are taken at face value: we do not infer CI or prod readiness beyond what you typed.`,
    );
  } else if (inputType === "llm_output") {
    if (signals.certaintySnippets.length > 0) {
      lines.push(
        `- Certainty appears in your wording ("${clip(signals.certaintySnippets[0], 85)}") — we treat that as narrative pressure unless numbers or sources appear nearby.`,
      );
    }
    if (signals.urgencySnippets.length > 0) {
      lines.push(
        `- Urgency appears ("${clip(signals.urgencySnippets[0], 85)}") — that exact push toward fast action is what triggers stronger safeguards in our read.`,
      );
    }
    if (!signals.certaintySnippets.length && !signals.urgencySnippets.length) {
      lines.push(
        `- This LLM fragment does not show the strongest certainty/urgency cues we scan for; remaining risk is under-specified claims in: "${head}".`,
      );
    }
  } else {
    if (hasRunwayZeroConstraint(input)) {
      lines.push(
        `- Your decision request mentions zero runway for testing ("0 months" / "zero months") — we treat that as an extreme constraint tied directly to the NO-style outcome path.`,
      );
    } else if (/\b(tested|testing|stable|performance|validated)\b/i.test(t)) {
      lines.push(
        `- Your text asserts testing or stability in plain language ("${clip(head, 100)}") — we read that claim as stated, not as audited metrics.`,
      );
    } else {
      lines.push(
        `- Your decision question, as written above, does not spell constraints we can verify — we flag unconstrained choice using only the words you supplied.`,
      );
    }
  }

  if (signals.weakGroundingSnippets.length > 0) {
    lines.push(
      `- Weak-grounding cue from your text: "${clip(signals.weakGroundingSnippets[0], 90)}".`,
    );
  }

  if (signals.lacksExplicitEvidenceAnchors && t.length > 55) {
    lines.push(
      `- The pasted block does not name studies, metrics, or sources — that absence is specific to what you entered, not a generic claim.`,
    );
  }

  lines.push("");
  lines.push(
    "Implication: the issues above are read off your exact wording patterns, not a stock template unrelated to this input.",
  );

  return `\n${lines.join("\n")}\n`;
}

export function diagnosisEngine(
  input: string,
  inputType: InputType,
  signals?: InputSignals,
): string {
  const s = signals ?? extractSignals(input);
  const intro = buildGroundedDiagnosisIntro(input, s);
  const body = buildAnchoredDiagnosisBody(input, inputType, s);
  return intro + body;
}
