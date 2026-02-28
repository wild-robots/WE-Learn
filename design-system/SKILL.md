# WE Learn Design System

This skill defines the visual language, design tokens, and documentation conventions for building UI components in the WE Learn platform.

---

## Platform Context

WE Learn is a women-led peer learning platform. The UI is built with:

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (utility-first, no CSS modules)
- **Icons**: Lucide React
- **Composition helpers**: `clsx` + `tailwind-merge` via a local `cn()` utility

---

## Design Tokens

> **Theme**: Light mode. Primary brand color is Turquoise (WE brand).
> Canonical values are the source of truth in `design-system/tokens.ts`.

### Color Palette

**Backgrounds**

| Token | Hex | Tailwind equivalent | Usage |
|-------|-----|---------------------|-------|
| `bg-primary` | `#F8FAFA` | `teal-50/30` blend | Page background |
| `bg-surface` | `#FFFFFF` | `white` | Card / panel background |
| `bg-surface-raised` | `#F0FDFA` | `teal-50` | Elevated surfaces (inputs, chips, tag rows) |

**Borders**

| Token | Hex | Tailwind equivalent | Usage |
|-------|-----|---------------------|-------|
| `border-subtle` | `#E2E8F0` | `slate-200` | Default border |
| `border-active` | `#0D9488` | `teal-600` | Hover / focused border |

**Text**

| Token | Hex | Tailwind equivalent | Usage |
|-------|-----|---------------------|-------|
| `text-primary` | `#0F172A` | `slate-900` | Headings, labels |
| `text-secondary` | `#334155` | `slate-700` | Body copy |
| `text-muted` | `#64748B` | `slate-500` | Captions, metadata |
| `text-disabled` | `#94A3B8` | `slate-400` | Placeholders, inactive |

**Turquoise Accent Scale**

| Token | Hex | Tailwind equivalent | Usage |
|-------|-----|---------------------|-------|
| `accent-subtle` | `#CCFBF1` | `teal-100` | Tinted chip / badge backgrounds |
| `accent-light` | `#2DD4BF` | `teal-400` | Icons, decorative highlights |
| `accent-primary` | `#0D9488` | `teal-600` | Primary CTAs, progress bars, links |
| `accent-dark` | `#0F766E` | `teal-700` | Hover state on primary elements |

### Level Badges

| Level | Text | Background | Border |
|-------|------|------------|--------|
| Beginner | `#16A34A` / `text-green-600` | `#F0FDF4` / `bg-green-50` | `#BBF7D0` / `border-green-200` |
| Intermediate | `#0D9488` / `text-teal-600` | `#F0FDFA` / `bg-teal-50` | `#99F6E4` / `border-teal-200` |
| Advanced | `#EA580C` / `text-orange-600` | `#FFF7ED` / `bg-orange-50` | `#FED7AA` / `border-orange-200` |

### Status Badges

| Status | Text | Background | Border |
|--------|------|------------|--------|
| `open` | `#16A34A` / `text-green-600` | `#F0FDF4` / `bg-green-50` | `#BBF7D0` / `border-green-200` |
| `full` | `#D97706` / `text-amber-600` | `#FFFBEB` / `bg-amber-50` | `#FDE68A` / `border-amber-200` |
| `active` | `#0D9488` / `text-teal-600` | `#F0FDFA` / `bg-teal-50` | `#99F6E4` / `border-teal-200` |

---

## Card Surface Pattern

All cards and panels use a clean, light surface. The dark-mode glassmorphism pattern is **not used** in WE Learn.

```tsx
// Resting state
"group relative bg-white border border-slate-200 rounded-2xl p-6 flex flex-col transition-all duration-300 shadow-sm"

// Hover enhancement
"hover:border-teal-500 hover:shadow-[0_4px_16px_rgba(13,148,136,0.12)]"

// Optional accent bar — top-left turquoise stripe for featured/matched cards
<div className="absolute top-0 left-0 w-1 h-full bg-teal-500 rounded-l-2xl" />
```

> There is no global `glass` utility. Use the Tailwind classes above directly, composed via `cn()`.

---

## Typography Scale

| Role | Classes |
|------|---------|
| Page title | `text-4xl font-bold tracking-tight text-slate-900` |
| Section title | `text-2xl font-bold tracking-tight text-slate-900` |
| Card title | `text-xl font-bold text-slate-900 leading-tight` |
| Label / eyebrow | `text-[10px] uppercase tracking-widest font-bold text-slate-500` |
| Body | `text-sm text-slate-700 leading-relaxed` |
| Caption | `text-xs text-slate-500` |

---

## Spacing & Sizing

- Card padding: `p-6`
- Card border radius: `rounded-2xl`
- Icon container: `w-10 h-10 rounded-xl` (small) / `w-12 h-12 rounded-2xl` (large)
- Section gap: `space-y-3` (dense) / `space-y-6` (relaxed)
- Icon size in metadata rows: `w-4 h-4`

---

## Animation Conventions

| Pattern | Classes |
|---------|---------|
| Card hover | `transition-all duration-500` |
| Button hover | `transition-colors` |
| Element entrance | `animate-in fade-in slide-in-from-bottom-2 duration-300` |
| Loading spinner | `animate-spin` on `Loader2` icon |
| Pulse indicator | `animate-pulse` |

---

## RTL Support

The platform supports 11 languages including Hebrew (he) and Arabic (ar), both RTL.

- Use `isRTL` from `useLanguage()` to conditionally flip directional classes
- Mirror chevrons/arrows: `${isRTL ? 'rotate-180' : ''}`
- Mirror hover translations: `${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`

---

## Component Documentation Format

All components are documented using `design-system/references/component-template.md`.

Each doc file covers:
1. **Overview** — purpose, context, data source
2. **Interface** — TypeScript props table
3. **Visual States** — resting, hover, loading, empty
4. **Behavior** — interactions, state machine
5. **Accessibility** — ARIA, keyboard, color contrast
6. **Usage** — minimal code example
7. **Variants** — documented visual variants
8. **Related Components** — cross-references

---

## Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Component file | PascalCase | `PrimaryLearningBubble.tsx` |
| Component docs | kebab-case | `primary-learning-bubble.md` |
| Props interface | `[ComponentName]Props` | `PrimaryLearningBubbleProps` |
| Event handlers | `on[Action]` | `onJoin`, `onWaitlist` |
| Internal helpers | camelCase | `cn()`, `formatTime()` |
