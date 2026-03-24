# Deciscope MVP — Showcase Scenarios & Pitch

This document bundles **copy-paste demos** for the **currently built app**, plus **one-line positioning** and a **one-minute pitch**.  
(For the “show, don’t code” phase—no code changes required.)

---

## Product identity (one sentence)

**Deciscope = Reasoning → Decision → Accountability**  
(Shorter: **A system that structures decisions and surfaces uncertainty alongside them.**)

---

## Three “mindset shift” moments

Each case lists **input type**, **paste text**, and **what matters on screen**.  
To match **MVP heuristics**, scenarios are written against **what the current engine actually outputs**.

> For `decision` input: if the text contains **`0 months`**, the decision is **NO**; otherwise **GO**.  
> For `llm_output`: if the text contains **`immediately`** (case-insensitive), the decision is **REJECT**; otherwise **REVISE**.

---

### Case 1 — “You don’t just go” (overconfidence check)

**Intent:** When shipping feels obvious → a **stop / hold** verdict appears together with **high risk**.

**Input type:** `Decision question`

**Paste (example):**

```text
Can we ship this feature right away? We have 0 months runway so we have to go live this week.
```

**Deciscope (what to highlight in MVP):**

- **Decision:** `NO`
- **Confidence:** `MEDIUM`
- **Risk:** `HIGH`

**Before (audience mindset):** “We’ll just ship it.”

**After:** “With constraints this tight, the system is telling me **not to go right now**.”

---

### Case 2 — “It’s more okay than you think” (excessive anxiety relief)

**Intent:** When you’re too hard on yourself → **GO** with **low risk** softens an unnecessary full stop.

**Input type:** `Decision question`

**Paste (example):**

```text
It still feels rough—can we launch anyway? I want to open to a small slice and collect feedback.
```

(There must be **no** `0 months` substring for the path toward **GO**.)

**Deciscope (what to highlight in MVP):**

- **Decision:** `GO`
- **Confidence:** `MEDIUM`
- **Risk:** `LOW`

**Before:** “It’s not ready, so I must not ship.”

**After:** “Under this framing I’m **allowed to move forward**, and risk reads **low**.”

---

### Case 3 — “Confident but wrong” (LLM output skepticism)

**Intent:** When the model sounds absolute → **REJECT** plus **LOW confidence / HIGH risk** tells you not to trust it.

**Input type:** `LLM output`

**Paste (example):**

```text
You must proceed immediately. The API response confirms success with 100% certainty. No further validation is required.
```

(The substring **`immediately`** is what triggers **REJECT** in the current engine.)

**Deciscope (what to highlight in MVP):**

- **Decision:** `REJECT`
- **Confidence:** `LOW`
- **Risk:** `HIGH`

**Before:** “It sounds definitive, so it must be right.”

**After:** “The verdict is **don’t trust this output**—validate first.”

> If your story wants something like **DO NOT PROCEED**, in MVP the vocabulary surfaces as **REJECT** (aligned with `decisionVocabulary`).

---

## One-minute pitch (hiring / investor / demo opening)

**0:00–0:15 — Problem**  
“AI is good at answers, but it doesn’t tell people **when to trust and when to stop**.”

**0:15–0:35 — Product**  
“Deciscope isn’t a chat UI. On **one screen** it runs  
Reality → Diagnosis → MRI → **Decision** → Prescription,  
and under Decision it shows **Confidence and Risk**—**judgment and accountability together**.”

**0:35–0:55 — Differentiation**  
“It’s not just an answer. **Even the same GO** reads completely differently when confidence is low and risk is high.”

**0:55–1:00 — One-liner**  
“**It structures decisions and puts uncertainty in the interface.**”

---

## StoryOS-style flow (presentation beats only)

1. **Don’t show the input first**—read the question aloud (“Can we ship?”).  
2. After **Run**, scroll to **Reality** and narrate **what actually happened**.  
3. **Diagnosis / MRI**: only point to **where it hurts**.  
4. Pause at **Final Decision**—“this is the peak.”  
5. Point at **Confidence / Risk**—“this is the product.”  
6. Close with **Prescription**: “so what do we do next?”

---

## What not to do at this stage (team alignment)

- Pile on features  
- Bolt on a model just to look “smart”  
- Keep tweaking UI until the flow blurs  

**Instead:** spend time showing **why this exists**, using the three scenarios and this doc.

---

*30–60s video script & shot list:* [`ultra_short_demo_script.md`](./ultra_short_demo_script.md)
