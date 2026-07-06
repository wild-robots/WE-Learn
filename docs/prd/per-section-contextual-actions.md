# PRD: Per-Section Contextual Actions & AI-Assisted Editing

## Problem Statement
The current Sessions view has a single global Edit button. This forces users into page-wide editing mode even when intent is scoped to a single section. Replace with per-section contextual menus.

## Goals
- Reduce time-to-action to ≤2 clicks per section operation
- Eliminate global edit mode entirely
- Introduce hybrid editing (manual + AI-assisted)
- Protect data integrity via soft-delete architecture

## Non-Goals (v1)
- Bulk operations
- Drag-and-drop reordering
- Multi-author collaboration
- Role-based action visibility
- Section template library

## Requirements

### P0 — Must Have
- R-01: Remove global Edit button entirely
- R-02: 3-dot ⋮ menu on every section card (always visible, not hover-only)
- R-03: Menu opens popover below icon; auto-closes others; closes on outside click / Escape
- R-04a: Edit → inline edit mode (2px teal border, fields become inputs, Save/Cancel in footer)
- R-04b: Edit with AI → same inline state + AI prompt bar (Sprint 3)
- R-05: Duplicate → copy below source, status = Not Started, title = "[Title] (Copy)", session numbers reflow, toast: "Section duplicated."
- R-06: Move → nested submenu Move Up / Move Down, disabled at boundaries, session numbers reflow
- R-07: Delete → confirmation modal + 5-second undo toast + soft-delete (deleted_at timestamp)
- R-08: Locked sections → Edit and Delete disabled with tooltip "Unlock section to edit"; Duplicate and Move active
- R-09: Learner view → ⋮ menu not rendered at all

### P1 — Should Have (Sprint 2)
- R-10: Unsaved changes guard modal
- R-11: Keyboard accessibility (WCAG 2.1 AA)
- R-12: Toast undo restores to exact original position
- R-13: Session number reflow with no flicker

### P2 — Future
- R-14: Drag-and-drop reordering
- R-15: Bulk operations
- R-16: AI prompt history per field
- R-17: Full undo/redo stack
- R-18: Section template library

## Menu Structure
✏️ Edit
✨ Edit with AI
⧉ Duplicate
↕ Move ▶ → [Move Up / Move Down]
─────────────
🗑 Delete

Min-width: 180px. Delete separated by divider. Line-style icons throughout.

## Inline Edit State
- Card border: 2px solid #2BBFAA
- All fields → inputs/textareas
- ⋮ menu hidden on active card
- Save (primary teal) + Cancel (ghost) in card footer
- All other cards remain read-only

## Open Questions
- OQ-01: What model backs "Edit with AI"? Token/character limit on directive input?
- OQ-02: Should AI-generated content be flagged for audit, or treated as author-owned on save?
- OQ-03: Does Move need jump-to-position or is Up/Down sufficient? (ship Up/Down for v1)
- OQ-04: Are locked sections moveable? (default: yes, revisit post-launch)
- OQ-05: Admin view of soft-deleted sections beyond 5s toast? (fast-follow if needed)
