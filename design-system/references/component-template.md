# Component: [Component Name]

> **Status**: Draft | Review | Stable
> **File**: `components/[ComponentName].tsx`
> **Version**: 1.0

---

## Overview

**Purpose**: One sentence describing what this component does.

**Context**: Where it appears in the app and why it exists.

**Data source**: What data it renders (Firestore collection, prop, context).

---

## Interface

```tsx
interface [ComponentName]Props {
  // required props first, optional second
  propName: Type;        // description
  optionalProp?: Type;   // description (default: value)
}
```

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `propName` | `Type` | Yes | — | What this controls |
| `optionalProp` | `Type` | No | `value` | What this controls |

---

## Visual States

| State | Description | Visual Indicator |
|-------|-------------|-----------------|
| **Resting** | Default appearance | Glass surface, subtle border |
| **Hover** | Mouse over | Brighter border, glow shadow |
| **Loading** | Async in progress | Spinner or pulse animation |
| **Empty** | No data available | Placeholder text or skeleton |
| **Disabled** | Non-interactive | Reduced opacity (`/50`) |

---

## Behavior & Interactions

Describe all user interactions and the state changes they trigger.

| Interaction | Trigger | Result |
|-------------|---------|--------|
| Example | User clicks X | Calls `onX()`, updates state |

---

## Accessibility

| Concern | Implementation |
|---------|---------------|
| **Keyboard** | Tab focus, Enter/Space activation |
| **Screen reader** | `aria-label`, `role` attributes |
| **Color contrast** | Meets WCAG AA (4.5:1 for text) |
| **RTL** | Directional classes flip via `isRTL` |

---

## Usage

```tsx
import [ComponentName] from '../components/[ComponentName]';

// Minimal usage
<[ComponentName]
  requiredProp={value}
/>

// Full usage
<[ComponentName]
  requiredProp={value}
  optionalProp={value}
  onAction={handleAction}
/>
```

---

## Variants

Document each visual or behavioral variant.

### Variant A: [Name]
Description of when and why to use this variant.

```tsx
<[ComponentName] variantProp="a" />
```

### Variant B: [Name]
Description of when and why to use this variant.

---

## Related Components

- **[RelatedComponent]** — Brief note on how they relate or differ
- **[AnotherComponent]** — Brief note
