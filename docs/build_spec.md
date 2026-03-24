# Deciscope — Build Specification (MVP)

---

## 🧩 Overview

Deciscope is a **Decision + Diagnosis + System MRI web application**.

This is NOT a chatbot.

This is a structured system that helps users:
- make decisions
- understand reasoning
- diagnose problems
- take action

---

## 🧠 Supported Input Types

```ts
type InputType =
  | "decision_question"
  | "llm_output"
  | "github_repo"
  | "agent_log"
⚙️ Core Pipeline
function runDeciscope(input, type) {
  const context = parseInput(input, type)

  const reasoning = generateReasoning(context)

  const diagnosis = runDiagnosis(context, reasoning)

  const systemMRI = runSystemMRI(context)

  const prescription = generatePrescription({
    diagnosis,
    systemMRI
  })

  const decision = generateFinalDecision({
    reasoning,
    diagnosis,
    prescription
  })

  return {
    decision,
    reasoning,
    diagnosis,
    systemMRI,
    prescription
  }
}
🎯 Final Decision Structure
type FinalDecision = {
  decision: "Go" | "No-Go" | "Pivot" | "Wait"
  confidence: number
  risk: number
}
🩺 Diagnosis Structure
type Diagnosis = {
  faulty_assumptions: string[]
  missing_data: string[]
  logic_errors: string[]
  risk_points: string[]
}
🧬 System MRI Structure
type SystemMRI = {
  llm_issues: string[]
  prompt_issues: string[]
  agent_flow_issues: string[]
  data_issues: string[]
}
💊 Prescription Structure
type Prescription = {
  fixes: string[]
  experiments: string[]
  data_to_collect: string[]
  priority: "High" | "Medium" | "Low"
}
🎨 UI Architecture
App
 ├── Header
 ├── InputSelector
 ├── InputBox
 ├── RunButton
 ├── FinalDecisionCard
 ├── ReportSection
 │    ├── ReasoningPanel
 │    ├── DiagnosisPanel
 │    ├── SystemMRIPanel
 │    ├── PrescriptionPanel
 │    └── DeepThinkingPanel
🔥 UX Requirements
1. Decision First
FinalDecisionCard must always appear at the top
It must be visually dominant
2. Expandable Sections

Use accordion-style layout:

Reasoning
Diagnosis
System MRI
Prescription
Deep Thinking (optional)
3. Visual Hierarchy
Decision → bold, large, dominant
Confidence / Risk → numeric + visual indicator
Diagnosis → warning-style UI
Prescription → checklist-style UI
🎨 Design Guidelines
Tone
analytical
serious
precise
medical / diagnostic
UI Style
minimal
clean
structured
no playful elements
Color System
Primary: black / dark gray
Accent: indigo / blue
Warning: red
Success: green
🧠 Data Flow
User selects input type
User provides input
System parses input
Pipeline runs:
reasoning
diagnosis
system MRI
prescription
decision
UI renders structured report
⚡ MVP Scope
Must Have
decision_question input
llm_output input
FinalDecisionCard
Diagnosis section
Prescription section
basic System MRI (rule-based)
Nice to Have
GitHub repo input (URL only)
simple agent_log parsing
Out of Scope
authentication
database
collaboration
real-time monitoring
🧪 Mock Logic (MVP Only)
No backend required
Use mock data generators
Return structured dummy outputs
Focus on UI and structure first
🚀 Future Phases
Phase 2
GitHub repo deep parsing
agent trace ingestion
real evaluation logic
Phase 3
continuous monitoring
auto-debugging AI systems
team collaboration
🎯 Product Goal

A system that makes decisions:

clear
explainable
diagnosable
actionable
💣 Core Principle

This is NOT a chat interface.

This is a Decision + Diagnosis system.

Every implementation must reinforce:

clarity
structure
trust