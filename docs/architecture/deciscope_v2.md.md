# Deciscope v2 — System Architecture (Cursor-ready)

## 🔥 Core Principle
Deciscope is NOT generating answers.
Deciscope is extracting reality → diagnosing structure → enforcing decision.

---

# 🧠 High-Level Pipeline

All input types MUST go through this pipeline:

1. Reality Extraction Layer (NEW - REQUIRED)
2. Interpretation Layer (input-specific)
3. Diagnosis Engine
4. System MRI Engine
5. Decision Engine (with controlled vocabulary)
6. Prescription Engine

---

# 1. Reality Extraction Layer (CRITICAL)

## Purpose
Prevent hallucinated analysis.
Force grounding before reasoning.

## Output Schema

```
{
  type: "reasoning" | "system" | "execution",
  what_happened: string,
  failure: string | null
}
```

## Rules
- NO assumptions
- NO suggestions
- ONLY observable facts

## Example (Agent Log)
```
type: execution
what_happened: Agent retrieved outdated sources and produced incorrect companies
failure: Output is factually incorrect
```

---

# 2. Interpretation Layer (Input-specific)

## Input Types

### A. Decision Question
- Target: human thinking
- Question: What should the user do?

### B. LLM Output
- Target: reasoning quality
- Question: Should this be trusted?

### C. GitHub Repo
- Target: system/product
- Question: What is this actually worth?

### D. Agent Log
- Target: execution
- Question: Did this succeed?

---

# 3. Decision Engine (STRICT VOCABULARY)

## MUST enforce by input type

### Decision Question
```
GO | NO | WAIT
```

### LLM Output
```
TRUST | REVISE | REJECT
```

### GitHub Repo
```
USE | MODIFY | IGNORE | REBUILD
```

### Agent Log
```
ACCEPT | FIX | RERUN | REDESIGN
```

## Rule
- NEVER mix vocabularies
- NEVER invent new labels

---

# 4. Diagnosis Engine

## Goal
Identify the REAL failure, not surface issues

## Output Structure
```
Core issue:

Failure patterns:
1.
2.
3.

Implication:
```

## Heuristics by Type

### LLM Output
- Bias detection
- Missing evidence
- Logical fallacies

### GitHub Repo
- Fake vs real system
- Missing loops (test, feedback)
- Scalability limits

### Agent Log
- Goal vs outcome mismatch
- Data quality failure
- Missing validation step

---

# 5. System MRI Engine

## Goal
Reveal structure, not details

## Output Structure
```
System type:

Actual flow:

Missing components:
-
-
-

Conclusion:
```

## Key Rule
- NO low-level details (no latency, no schema unless relevant)
- MUST describe flow + missing layers

---

# 6. Prescription Engine

## Goal
Force action

## Output Structure
```
Priority: High | Medium | Low

Fixes:

Experiments:

Data to collect:
```

## Rule
- Must be executable
- Prefer time-bound steps

---

# 🧩 Component Mapping (React)

## Existing Components (KEEP)

- InputSelector
- InputBox
- RunButton
- FinalDecisionCard
- DiagnosisPanel
- SystemMRIPanel
- PrescriptionPanel

---

# 🔧 New Internal Modules (Logic Layer)

Create `/core` folder:

```
/core
  /pipeline
    runPipeline.ts

  /layers
    realityExtraction.ts
    interpretation.ts
    decisionEngine.ts
    diagnosisEngine.ts
    systemMRI.ts
    prescriptionEngine.ts

  /types
    index.ts

  /config
    decisionVocabulary.ts
```

---

# runPipeline.ts

```
export function runPipeline(input, inputType) {
  const reality = realityExtraction(input, inputType);
  const interpreted = interpretation(reality, inputType);

  const diagnosis = diagnosisEngine(interpreted, inputType);
  const mri = systemMRI(interpreted, inputType);
  const decision = decisionEngine(interpreted, inputType);
  const prescription = prescriptionEngine(interpreted, inputType);

  return {
    reality,
    decision,
    diagnosis,
    mri,
    prescription
  };
}
```

---

# 🧪 Mock Strategy (IMPORTANT)

DO NOT randomize.

Use deterministic pattern matching:

Example:

```
if (input.includes("outdated") && inputType === "agent_log") {
  return FIX;
}
```

---

# 🎯 UI Behavior Rules

## 1. Decision Card
- Must show ONLY allowed vocabulary
- No generic labels like "Go" for all types

## 2. Panels
- Same UI
- Different content logic

## 3. Tone Shift

| Type | Tone |
|------|------|
| Decision | Coach |
| LLM | Critical thinker |
| GitHub | VC / reviewer |
| Agent | Debugger |

---

# 🚀 Final Goal

If implemented correctly:

- Users feel "this exposed the real problem"
- Not "this gave a smart answer"

---

# 💡 One-line Principle

Deciscope = Reality → Structure → Forced Decision

