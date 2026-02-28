import React from 'react';
import { colors, card } from '../../design-system/tokens';
import { Calendar, Users } from 'lucide-react';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6 pb-3 border-b border-slate-200">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ColorSwatch({ label, hex }: { label: string; hex: string }) {
  return (
    <div className="flex flex-col gap-1.5 min-w-[80px]">
      <div
        className="w-16 h-10 rounded-lg border border-slate-200 shadow-sm"
        style={{ backgroundColor: hex }}
      />
      <p className="text-[10px] font-bold text-slate-700 leading-tight">{label}</p>
      <p className="text-[10px] font-mono text-slate-400">{hex}</p>
    </div>
  );
}

function SwatchGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4">{title}</h3>
      <div className="flex flex-wrap gap-6">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PrimaryLearningBubble preview — matches design-system/references/primary-learning-bubble.md
// ---------------------------------------------------------------------------

const mockBubble = {
  topic: 'Negotiating Your First Tech Salary',
  goal: 'Walk away with a clear script and confidence to counter any offer in your next interview.',
  schedule: 'Sundays · 20:00',
  participant_count: 3,
  category: 'Career Growth',
  level: 'Intermediate',
};

type BubbleStatus = 'open' | 'full' | 'active';
type MatchType = 'full_match' | 'partial_match' | 'full_bubble' | undefined;

const MATCH_BANNERS: Record<string, { wrapperClass: string; textClass: string; label: string }> = {
  full_match: {
    wrapperClass: 'bg-emerald-500/10 border-b border-emerald-500/20',
    textClass: 'text-emerald-400',
    label: '✓ Perfect match for your schedule',
  },
  partial_match: {
    wrapperClass: 'bg-amber-500/10 border-b border-amber-500/20',
    textClass: 'text-amber-400',
    label: '~ Partial match — different schedule',
  },
  full_bubble: {
    wrapperClass: 'bg-amber-500/10 border-b border-amber-500/20',
    textClass: 'text-amber-400',
    label: 'Match found — bubble is full',
  },
};

const STATUS_BADGE: Record<BubbleStatus, { label: string; className: string }> = {
  open: { label: 'Open', className: 'text-green-600 bg-green-50 border border-green-200' },
  full: { label: 'Full', className: 'text-amber-600 bg-amber-50 border border-amber-200' },
  active: { label: 'Active', className: 'text-teal-600 bg-teal-50 border border-teal-200' },
};

function BubblePreview({ matchType, status = 'open' }: { matchType?: MatchType; status?: BubbleStatus }) {
  const banner = matchType ? MATCH_BANNERS[matchType] : null;
  const badge = STATUS_BADGE[status];
  const participantCount = status === 'full' ? 8 : mockBubble.participant_count;
  const fillPct = (participantCount / 8) * 100;

  return (
    <div className="group relative bg-slate-900 border border-white/10 rounded-2xl flex flex-col overflow-hidden transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)]">
      {/* Decorative glow blob */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-600/10 blur-[60px] group-hover:bg-blue-600/20 transition-all pointer-events-none" />

      {/* Match banner */}
      {banner && (
        <div className={`px-4 py-2 text-xs font-bold ${banner.wrapperClass} ${banner.textClass}`}>
          {banner.label}
        </div>
      )}

      <div className="p-6 flex flex-col flex-1 relative">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded bg-white/5 text-white/50 border border-white/10">
            {mockBubble.category}
          </span>
          <span className="text-xs px-2 py-1 rounded font-medium text-teal-400 bg-teal-400/10 border border-teal-400/20">
            {mockBubble.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
          {mockBubble.topic}
        </h3>

        {/* Goal */}
        <p className="text-sm text-white/50 mb-6 line-clamp-2">{mockBubble.goal}</p>

        {/* Metadata */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs text-white/70 gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>{mockBubble.schedule}</span>
          </div>
          <div className="flex items-center text-xs text-white/70 gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span>{participantCount} / 8 members</span>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-6"
          role="progressbar"
          aria-valuenow={participantCount}
          aria-valuemin={0}
          aria-valuemax={8}
        >
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${fillPct}%` }}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          <span className={`text-xs px-2 py-1 rounded font-medium ${badge.className}`}>
            {badge.label}
          </span>

          {status === 'open' && (
            <button
              className="px-4 py-2 text-xs font-bold bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl hover:opacity-90 transition-all active:scale-95"
              aria-label={`Join ${mockBubble.topic} bubble`}
            >
              Join
            </button>
          )}
          {status === 'full' && (
            <button className="px-4 py-2 text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl hover:bg-amber-500/20 transition-all">
              Join Waitlist
            </button>
          )}
          {status === 'active' && (
            <button className="text-xs text-white/40 hover:text-white transition-colors">
              View
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CohortCard surface preview — matches the light card pattern from SKILL.md
// ---------------------------------------------------------------------------

function CardSurfacePreview() {
  return (
    <div
      className="group relative bg-white border border-slate-200 rounded-2xl p-6 flex flex-col max-w-sm transition-all duration-300 hover:border-teal-500 hover:shadow-[0_4px_16px_rgba(13,148,136,0.12)] overflow-hidden shadow-sm cursor-pointer"
      style={{ boxShadow: card.shadow }}
    >
      {/* Left accent stripe */}
      <div className="absolute top-0 left-0 w-1 h-full bg-teal-500 rounded-l-2xl" />

      <div className="flex items-start justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded bg-teal-50 text-teal-600 border border-teal-200">
          Career Growth
        </span>
        <span className="text-xs px-2 py-1 rounded font-medium text-teal-600 bg-teal-50 border border-teal-200">
          Intermediate
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-teal-600 transition-colors">
        Negotiating Your First Tech Salary
      </h3>
      <p className="text-slate-500 text-sm mb-4 line-clamp-2">
        Walk away with a clear script and confidence to counter any offer.
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-xs text-slate-600 gap-2">
          <Users className="w-4 h-4 text-teal-500" />
          <span>3 / 8 members</span>
        </div>
        <div className="flex items-center text-xs text-slate-600 gap-2">
          <Calendar className="w-4 h-4 text-teal-500" />
          <span>Sundays · 20:00</span>
        </div>
      </div>

      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-teal-600 transition-all duration-500" style={{ width: '38%' }} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// StyleGuide — main export
// ---------------------------------------------------------------------------

export function StyleGuide() {
  return (
    <div className="bg-slate-50 px-8 py-12 border-b-4 border-teal-500">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-widest font-bold text-teal-600 mb-2">WE Learn</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Design System</h1>
          <p className="text-sm text-slate-500">
            Turquoise · Light mode · Tokens from{' '}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">design-system/tokens.ts</code>
            {' '}· Components from{' '}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">design-system/SKILL.md</code>
          </p>
        </div>

        {/* ── 1. Color Palette ─────────────────────────────────────────── */}
        <Section title="Color Palette">
          <div className="space-y-8">
            <SwatchGroup title="Backgrounds">
              <ColorSwatch label="bg.primary" hex={colors.bg.primary} />
              <ColorSwatch label="bg.surface" hex={colors.bg.surface} />
              <ColorSwatch label="bg.surfaceRaised" hex={colors.bg.surfaceRaised} />
            </SwatchGroup>

            <SwatchGroup title="Borders">
              <ColorSwatch label="border.subtle" hex={colors.border.subtle} />
              <ColorSwatch label="border.active" hex={colors.border.active} />
            </SwatchGroup>

            <SwatchGroup title="Text">
              <ColorSwatch label="text.primary" hex={colors.text.primary} />
              <ColorSwatch label="text.secondary" hex={colors.text.secondary} />
              <ColorSwatch label="text.muted" hex={colors.text.muted} />
              <ColorSwatch label="text.disabled" hex={colors.text.disabled} />
            </SwatchGroup>

            <SwatchGroup title="Turquoise Accent Scale">
              <ColorSwatch label="accent.subtle" hex={colors.accent.subtle} />
              <ColorSwatch label="accent.light" hex={colors.accent.light} />
              <ColorSwatch label="accent.primary" hex={colors.accent.primary} />
              <ColorSwatch label="accent.dark" hex={colors.accent.dark} />
            </SwatchGroup>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4">Level Badges</h3>
                <div className="flex flex-wrap gap-3">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <span
                      key={level}
                      className="text-xs px-3 py-1 rounded-full font-medium border capitalize"
                      style={{
                        color: colors.level[level].text,
                        backgroundColor: colors.level[level].bg,
                        borderColor: colors.level[level].border,
                      }}
                    >
                      {level}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4">Status Badges</h3>
                <div className="flex flex-wrap gap-3">
                  {(['open', 'full', 'active'] as const).map((status) => (
                    <span
                      key={status}
                      className="text-xs px-3 py-1 rounded-full font-medium border capitalize"
                      style={{
                        color: colors.status[status].text,
                        backgroundColor: colors.status[status].bg,
                        borderColor: colors.status[status].border,
                      }}
                    >
                      {status}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 2. Typography ────────────────────────────────────────────── */}
        <Section title="Typography">
          <div className="space-y-7 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            {[
              { role: 'Page Title', el: <span className="text-4xl font-bold tracking-tight text-slate-900">Learning Together</span> },
              { role: 'Section Title', el: <span className="text-2xl font-bold tracking-tight text-slate-900">Active Cohorts</span> },
              { role: 'Card Title', el: <span className="text-xl font-bold text-slate-900 leading-tight">Negotiating Your First Tech Salary</span> },
              { role: 'Eyebrow / Label', el: <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Career Growth</span> },
              { role: 'Body', el: <span className="text-sm text-slate-700 leading-relaxed">Join a small group of women navigating the tech industry together. Learn from peers who've been there.</span> },
              { role: 'Caption', el: <span className="text-xs text-slate-500">Started Jan 2025 · 3 of 8 joined</span> },
            ].map(({ role, el }) => (
              <div key={role} className="flex items-baseline gap-6 border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                <span className="w-28 shrink-0 text-[10px] uppercase tracking-widest font-bold text-slate-400">{role}</span>
                {el}
              </div>
            ))}
          </div>
        </Section>

        {/* ── 3. Card Surface ──────────────────────────────────────────── */}
        <Section title="Card Surface — Light Turquoise">
          <p className="text-sm text-slate-500 mb-6">
            All cohort cards and panels. Hover to see the teal border + glow. The left stripe marks featured/matched cards.
          </p>
          <CardSurfacePreview />
        </Section>

        {/* ── 4. PrimaryLearningBubble ─────────────────────────────────── */}
        <Section title="PrimaryLearningBubble">
          <p className="text-sm text-slate-500 mb-6">
            Dark glass card surfaced by BubbleAgent during matching.
            Spec: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">design-system/references/primary-learning-bubble.md</code>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3">Open · Full Match</p>
              <BubblePreview matchType="full_match" status="open" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3">Full · Join Waitlist</p>
              <BubblePreview matchType="full_bubble" status="full" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3">Active · View Only</p>
              <BubblePreview status="active" />
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}
