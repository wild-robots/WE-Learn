/**
 * WE Learn Design Tokens
 *
 * Single source of truth for all design values.
 * Theme: Light mode — Turquoise brand (WE brand identity).
 *
 * Usage in components:
 *   import { colors, spacing, card } from '../design-system/tokens';
 *
 * These are raw values. In Tailwind components, prefer the equivalent
 * Tailwind classes documented alongside each token. Use these constants
 * for inline styles, dynamic style calculations, or non-Tailwind contexts.
 */

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export const colors = {

  // --- Backgrounds ---
  bg: {
    /** Page-level background. Slightly teal-tinted white. */
    primary: '#F8FAFA',
    /** Card and panel background. Pure white. */
    surface: '#FFFFFF',
    /** Elevated surface — inputs, chips, tag rows. Tailwind: teal-50. */
    surfaceRaised: '#F0FDFA',
  },

  // --- Borders ---
  border: {
    /** Default border for cards and inputs. Tailwind: slate-200. */
    subtle: '#E2E8F0',
    /** Hover and focused border. Tailwind: teal-600. */
    active: '#0D9488',
  },

  // --- Text ---
  text: {
    /** Headings, labels. Tailwind: slate-900. */
    primary: '#0F172A',
    /** Body copy. Tailwind: slate-700. */
    secondary: '#334155',
    /** Captions, metadata, secondary labels. Tailwind: slate-500. */
    muted: '#64748B',
    /** Placeholders, inactive elements. Tailwind: slate-400. */
    disabled: '#94A3B8',
  },

  // --- Turquoise Accent Scale (WE brand) ---
  accent: {
    /** Tinted badge/chip background. Tailwind: teal-100. */
    subtle: '#CCFBF1',
    /** Decorative icons and highlights. Tailwind: teal-400. */
    light: '#2DD4BF',
    /** Primary CTAs, progress bars, active links. Tailwind: teal-600. */
    primary: '#0D9488',
    /** Hover state on primary elements. Tailwind: teal-700. */
    dark: '#0F766E',
  },

  // --- Level Badges ---
  level: {
    beginner: {
      text: '#16A34A',   // green-600
      bg: '#F0FDF4',     // green-50
      border: '#BBF7D0', // green-200
    },
    intermediate: {
      text: '#0D9488',   // teal-600
      bg: '#F0FDFA',     // teal-50
      border: '#99F6E4', // teal-200
    },
    advanced: {
      text: '#EA580C',   // orange-600
      bg: '#FFF7ED',     // orange-50
      border: '#FED7AA', // orange-200
    },
  },

  // --- Status Badges ---
  status: {
    open: {
      text: '#16A34A',   // green-600
      bg: '#F0FDF4',     // green-50
      border: '#BBF7D0', // green-200
    },
    full: {
      text: '#D97706',   // amber-600
      bg: '#FFFBEB',     // amber-50
      border: '#FDE68A', // amber-200
    },
    active: {
      text: '#0D9488',   // teal-600
      bg: '#F0FDFA',     // teal-50
      border: '#99F6E4', // teal-200
    },
  },

} as const;

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

export const spacing = {
  /** Card inner padding. Tailwind: p-6. */
  cardPadding: '24px',
  /** Tight metadata / icon rows. Tailwind: space-y-3 / gap-3. */
  sectionDense: '12px',
  /** Between card sections. Tailwind: space-y-6 / gap-6. */
  sectionRelaxed: '24px',
  /** Small icon container (w-10 h-10). */
  iconSm: '40px',
  /** Medium icon container (w-12 h-12). */
  iconMd: '48px',
  /** Inline metadata icon (w-4 h-4). */
  iconInline: '16px',
} as const;

// ---------------------------------------------------------------------------
// Card Surface
// ---------------------------------------------------------------------------

/**
 * WE Learn uses a clean light card surface.
 * The dark-mode glassmorphism pattern is not part of this design system.
 */
export const card = {
  bg: colors.bg.surface,
  border: colors.border.subtle,
  /** Tailwind: rounded-2xl */
  borderRadius: '16px',
  /** Resting shadow — subtle depth without darkness. */
  shadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
  /** Hover border — turquoise brand. */
  hoverBorder: colors.accent.primary,
  /** Hover shadow — turquoise glow. */
  hoverShadow: '0 4px 16px rgba(13, 148, 136, 0.12)',
  /** Left accent stripe for featured / matched cards. Color: teal-500. */
  accentStripe: '#14B8A6',
} as const;

// ---------------------------------------------------------------------------
// Convenience type exports
// ---------------------------------------------------------------------------

export type LevelKey = keyof typeof colors.level;
export type StatusKey = keyof typeof colors.status;
