# Deciscope

**Don’t just decide. Understand.**

Deciscope is a **decision and diagnosis** web app: it turns pasted scenarios into a structured report with a verdict, grounded evidence, diagnosis, system MRI, and prescription. It is **not** a chat interface.

## Stack

- React 18 · TypeScript · Vite 5

## Quick start

```bash
npm install
npm run dev
```

- **Development:** `npm run dev`
- **Production build:** `npm run build`
- **Preview build:** `npm run preview`

## What you get

For each run, the pipeline (`runPipeline` in `src/core/pipeline/runPipeline.ts`) produces:

| Stage | Role |
|--------|------|
| **Reality** | What the input represents (reasoning / system / execution) |
| **Evidence** | Phrases from your text, implications, and how they relate to the verdict |
| **Diagnosis** | Anchored notes tied to your wording |
| **System MRI** | High-level system-shape read for the selected input type |
| **Final decision** | Label from the vocabulary for that type, plus confidence, risk, and “why this confidence?” |
| **Prescription** | Action-oriented next steps |

Verdict labels depend on **input type** (see `src/core/config/decisionVocabulary.ts`), e.g. `decision` → GO / NO / WAIT, `llm_output` → TRUST / REVISE / REJECT.

## Input types

```ts
type InputType =
  | "decision"
  | "llm_output"
  | "github_repo"
  | "agent_log";
```

Pick a type, paste text, run the analysis. Demo mode includes sample scenarios; product mode is for your own paste.

## Trust UX

The UI includes optional framing (why the approach matters), low-confidence callouts when the verdict is fragile, and a local-only disagreement capture—nothing is sent to a server.

## Docs

- `docs/brand.md` — positioning and voice  
- `docs/build_spec.md` — product/build notes (MVP)  
- `docs/north_star.md` — direction  
- `docs/demos/` — demo scripts and showcase notes  
- `docs/architecture/deciscope_v2.md.md` — architecture notes  
