# Edunomo — Workflow Documentation (V1 / MVP)

This directory contains the Edunomo platform workflow documentation, converted from the original
workflow/chart PDF documents prepared by TechHelp Solutions. Each module has one Markdown file that
merges the module's **chart PDF** (all flow diagrams, recreated as Mermaid) and **doc PDF**
(narrative, rules, statuses, notifications, permissions, scope).

The PDFs remain the source of truth; these files reproduce them without redesigning any workflow.
One deliberate exception: the Agent Partner **commission workflow** in the source PDFs is not
reproduced — commission is managed and paid internally by Edunomo (project decision, 2026-08-31);
see that file's Commission / Payments section.

## Modules

| Module | Documentation | Diagrams |
|---|---|---|
| Study Abroad | [study-abroad/study-abroad-workflow.md](study-abroad/study-abroad-workflow.md) | Student Workflow · College Partner Workflow · Admin Workflow · Application Status Flow |
| Agent Partner | [agent-partner/agent-partner-workflow.md](agent-partner/agent-partner-workflow.md) | Agent Onboarding · Agent Student Onboarding · Agent Study Abroad Application (+ doc-only Student Mobile App and Admin workflows) |
| Cab Services | [cab/cab-services-workflow.md](cab/cab-services-workflow.md) | Driver Onboarding · Driver Assignment Logic · Customer Booking · Payment Flow · Driver Workflow · Cancellation Flow · Ride Status Flow |
| Flight Booking | [flight/flight-booking-workflow.md](flight/flight-booking-workflow.md) | Customer Booking · Payment Flow · Cancellation Flow · Admin Workflow · Booking Status Flow · Adhiwa API Sequence Diagram |
| Hotel Listings & Booking | [hotel/hotel-booking-workflow.md](hotel/hotel-booking-workflow.md) | Hotel Partner Onboarding · Hotel Partner Dashboard · Customer Workflow · Payment Flow · Admin Dashboard · Cancellation Flow · Booking Status Flow |
| Tuition Services | [tuition/tuition-services-workflow.md](tuition/tuition-services-workflow.md) | Tutor Onboarding · Student Booking · Payment Flow · External Video Meeting · Booking Status Flow |
| Visa Services | [visa/visa-services-workflow.md](visa/visa-services-workflow.md) | Customer Workflow · Admin / Operations Workflow · Application Status Flow |

## Module relationships

- **Agent Partner ↔ Study Abroad:** agents onboard students and create/submit Study Abroad
  applications on their behalf, and students can also create and submit their own applications
  directly via the Study Abroad module. (The source PDFs conflicted here — the Agent Partner doc
  originally restricted application creation to agents; resolved by project decision, 2026-08-31,
  in favour of both. See the Notes section of the Agent Partner file.)
- The other modules (Cab, Flight, Hotel, Tuition, Visa) are self-contained in V1; their source PDFs
  do not reference other modules.

## Source PDFs

Located in the project root (two levels up from this directory):

| Module | Chart PDF | Doc PDF |
|---|---|---|
| Study Abroad | `Edunomo_Study_Abroad_V1_Workflow_chart.pdf` | `Edunomo_Study_Abroad_V1_Workflow_doc.pdf` |
| Agent Partner | `Edunomo Agent Partner Module — Workflow & Specification v1 chart.pdf` | `Edunomo Agent Partner Module — Workflow & Specification v1 doc.pdf` |
| Cab Services | `Edunomo Cab Services — Module Workflow chart.pdf` | `Edunomo Cab Services — Module Workflow doc.pdf` |
| Flight Booking | `Edunomo Flight Booking Module v1 chart.pdf` | `Edunomo Flight Booking Module v1 doc.pdf` |
| Hotel Listings & Booking | `Edunomo Hotel Listings & Booking Module Workflow chart.pdf` | `Edunomo Hotel Listings & Booking Module Workflow doc.pdf` |
| Tuition Services | `Edunomo Tuition Services — Module Workflow V1 chart.pdf` | `Edunomo Tuition Services — Module Workflow V1 docs.pdf` |
| Visa Services | `Edunomo Visa Services – Module Workflow v1 chart.pdf` | `Edunomo Visa Services – Module Workflow v1 doc.pdf` |

## Conventions used across all files

- Every file follows the same section order: Overview → Actors / Roles → Workflows (one Mermaid
  diagram per sub-flow, each followed by its numbered Detailed Flow) → Statuses → Rules / Conditions
  → module-specific sections (Documents Required, Notifications, Permissions & Access, V1 Scope,
  APIs / Integrations, Payments) → Notes → Source Documents.
- Mermaid `flowchart TD` for process flows, `flowchart LR` for status flows, `sequenceDiagram` for
  API sequences. Diagrams reproduce the original charts one-to-one — every node, decision, branch
  label, and loop-back — without redesign or styling.
- Status names appear in backticks, spelled exactly as in the source (e.g. `DRIVER_EN_ROUTE`,
  `Documents Required`).
- Any text unreadable in a source PDF would be marked `[UNCLEAR IN SOURCE]` rather than guessed
  (no such markers were needed — all source text was legible).
- Where a module's chart and doc PDF disagree, both versions are documented and the conflict is
  flagged in that file (usually under Statuses or Notes) — no silent reconciliation.
