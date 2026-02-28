# Component: Primary Learning Bubble

> **Status**: Draft
> **File**: `components/PrimaryLearningBubble.tsx`
> **Version**: 1.0

---

## Overview

**Purpose**: Displays a single learning bubble as a scannable card, giving the user enough information to decide whether to join, join the waitlist, or pass.

**Context**: Rendered inside the BubbleAgent's matching phase when one or more bubbles are found. Also used on any future "Browse Bubbles" discovery view.

**Data source**: A `Bubble` document from the Firestore `bubbles` collection, surfaced through `api/lib/bubble-types.ts`.

---

## Interface

```tsx
interface PrimaryLearningBubbleProps {
  bubble: Bubble;                         // Firestore bubble document
  matchType?: 'full_match' | 'partial_match' | 'full_bubble'; // matching result context
  onJoin?: (bubbleId: string) => void;    // called when user confirms join
  onWaitlist?: (bubbleId: string) => void; // called when user joins waitlist
  onView?: (bubbleId: string) => void;    // called when user opens detail view
  isLoading?: boolean;                    // disables actions during async ops
}
```

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `bubble` | `Bubble` | Yes | — | The full bubble data object |
| `matchType` | `'full_match' \| 'partial_match' \| 'full_bubble'` | No | — | When provided, renders a match-quality banner at the top of the card |
| `onJoin` | `(id: string) => void` | No | — | Join action; hidden when `bubble.status === 'full'` |
| `onWaitlist` | `(id: string) => void` | No | — | Waitlist action; shown only when `bubble.status === 'full'` |
| `onView` | `(id: string) => void` | No | — | Secondary "See details" link, always visible |
| `isLoading` | `boolean` | No | `false` | Shows a spinner overlay and disables all CTA buttons |

---

## Visual States

| State | Description | Visual Indicator |
|-------|-------------|-----------------|
| **Resting** | Card at rest, status = `open` | Glass surface, emerald "Open" badge, "Join" CTA |
| **Hover** | Mouse over card | Border brightens to `white/30`, blue glow shadow appears |
| **Full** | `status === 'full'` | Amber "Full" badge, "Join Waitlist" CTA replaces "Join" |
| **Active** | `status === 'active'` | Blue "Active" badge, "View" CTA only (no join actions) |
| **Loading** | `isLoading === true` | Semi-transparent overlay, `Loader2` spinner centered |
| **Full Match** | `matchType === 'full_match'` | Emerald banner: "Perfect match" at card top |
| **Partial Match** | `matchType === 'partial_match'` | Amber banner: "Partial match — different schedule" |
| **Full Bubble Match** | `matchType === 'full_bubble'` | Amber banner: "Match found — bubble is full" |

---

## Anatomy

```
┌─────────────────────────────────────────────┐
│ [Match banner — conditional]                │
├─────────────────────────────────────────────┤
│  [Category eyebrow]      [Level badge]      │
│                                             │
│  Topic title                                │
│  Goal description (2 lines max, clipped)    │
│                                             │
│  ● Day & time                               │
│  ● X / 8 participants    ████░░░ [progress] │
│                                             │
│ ─────────────────────────────────────────── │
│  [Status badge]     [CTA button]            │
└─────────────────────────────────────────────┘
```

### Key elements

**Match banner** (conditional): A colored strip at the very top of the card, rendered only when `matchType` is passed. Uses `rounded-t-2xl` to align with the card's corners.

**Topic title**: The primary piece of information. Uses `text-xl font-bold text-white`. On hover, transitions to `text-blue-400`.

**Goal description**: `text-sm text-white/50 line-clamp-2`. Truncated at 2 lines to maintain consistent card height.

**Metadata row** (Day & time): Uses a `Calendar` icon from Lucide at `w-4 h-4 text-blue-500`. Format: `"Sundays · 20:00"`.

**Participant progress**: Displays `participant_count` out of 8 as a thin progress bar (`h-1.5 bg-white/5 rounded-full`) filled with `bg-blue-600`. A numeric label (`3 / 8 members`) sits above it.

**Status badge**: Bottom-left. Colored via the Status Badges token table in `SKILL.md`.

**CTA button**: Bottom-right. Primary gradient (`bg-gradient-to-br from-blue-600 to-indigo-700`) for "Join". Amber tint for "Join Waitlist". Ghost style (`text-white/50 hover:text-white`) for "View".

---

## Behavior & Interactions

| Interaction | Trigger | Result |
|-------------|---------|--------|
| Join | Click "Join" (status: `open`) | Sets `isLoading = true`, calls `onJoin(bubble.bubble_id)` |
| Join Waitlist | Click "Join Waitlist" (status: `full`) | Sets `isLoading = true`, calls `onWaitlist(bubble.bubble_id)` |
| View details | Click "View" or card body | Calls `onView(bubble.bubble_id)` |
| Hover | Mouse enters card | Border and glow transition over 500ms |

**Join flow guard**: If neither `onJoin` nor `onWaitlist` is provided, the respective CTA button is not rendered — the component is display-only.

**Capacity rule** (from PRD): A bubble holds a maximum of 8 participants. The component must derive the action CTA from `bubble.status`, not from computing `participant_count >= 8` directly, because `status` is the authoritative source set by the backend.

---

## Accessibility

| Concern | Implementation |
|---------|---------------|
| **Keyboard** | The entire card is not the click target; only the explicit CTA buttons are keyboard-focusable (`tabIndex={0}`, `Enter` activates) |
| **Screen reader** | Buttons use descriptive `aria-label`: `aria-label="Join ${bubble.topic} bubble"` |
| **Loading state** | CTA buttons get `aria-busy="true"` and `disabled` when `isLoading` is true |
| **Progress bar** | `role="progressbar"` with `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={8}` |
| **Color contrast** | Status and level badge text meets WCAG AA against their colored backgrounds |
| **RTL** | Metadata icon row respects `dir="rtl"` from the document; no directional class overrides needed |

---

## Usage

```tsx
import PrimaryLearningBubble from '../components/PrimaryLearningBubble';
import type { Bubble, MatchResult } from '../api/lib/bubble-types';

// Inside BubbleAgent matching results render
{matchResults.map((result: MatchResult) => (
  <PrimaryLearningBubble
    key={result.bubble.bubble_id}
    bubble={result.bubble}
    matchType={result.match_type}
    onJoin={handleJoin}
    onWaitlist={handleWaitlist}
    isLoading={isLoading}
  />
))}

// Display-only (no join actions, e.g. browse view)
<PrimaryLearningBubble
  bubble={bubble}
  onView={handleView}
/>
```

---

## Variants

### Variant 1: Full Match
When `matchType === 'full_match'`, an emerald banner appears at the card top:
```
┌──────────────────────────────────────────┐
│ ✓ Perfect match for your schedule        │  ← emerald bg-emerald-500/10 strip
├──────────────────────────────────────────┤
│  ...card body...                         │
```
This is the most prominent state — the user should see immediately that this bubble fits.

### Variant 2: Partial Match
When `matchType === 'partial_match'`, an amber banner replaces the emerald one and explains the scheduling difference. The "Join" button is still shown — the agent has already asked the user if she can adjust.

### Variant 3: Full Bubble
When `matchType === 'full_bubble'` or `bubble.status === 'full'`, the "Join" button is replaced by "Join Waitlist". The participant bar renders at 100% (solid blue). The status badge changes to amber "Full".

### Variant 4: Active (Read-Only)
When `bubble.status === 'active'`, no join or waitlist actions are shown — only a ghost "View" link. The status badge is blue "Active". The card body is otherwise identical.

---

## Tailwind Reference

```tsx
// Card wrapper
"glass group relative p-6 rounded-2xl flex flex-col transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] overflow-hidden"

// Background glow (decorative)
"absolute -top-12 -right-12 w-24 h-24 bg-blue-600/10 blur-[60px] group-hover:bg-blue-600/20 transition-all pointer-events-none"

// Topic title
"text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors"

// Goal description
"text-sm text-white/50 mb-6 line-clamp-2"

// Metadata row
"flex items-center text-xs text-white/70 gap-2"

// Participant progress bar track
"w-full h-1.5 bg-white/5 rounded-full overflow-hidden"

// Participant progress bar fill
"h-full bg-blue-600 transition-all duration-500"

// Primary CTA (Join)
"px-4 py-2 text-xs font-bold bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-all active:scale-95"

// Secondary CTA (Waitlist)
"px-4 py-2 text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl hover:bg-amber-500/20 disabled:opacity-50 transition-all"

// Ghost CTA (View)
"text-xs text-white/40 hover:text-white transition-colors"
```

---

## Related Components

- **CohortCard** (`components/CohortCard.tsx`) — Displays a *Cohort* (the larger course container). Similar card shape and glass surface. Bubbles live *inside* cohorts; these are distinct data models.
- **BubbleAgent** (`components/BubbleAgent.tsx`) — The AI agent that surfaces this card during the matching phase. This component is the visual output of the agent's `[[JOIN_BUBBLE]]` and `[[WAITLIST_BUBBLE]]` decision markers.
- **`Bubble` type** (`api/lib/bubble-types.ts`) — The TypeScript interface this component's `bubble` prop is typed against.
- **`findMatches()`** (`api/lib/bubble-matching.ts`) — The pure function that produces the `MatchResult[]` array from which this component's `matchType` is sourced.
