import React from 'react';
import { AlertCircle, Calendar, CheckCircle, Eye, Loader2, Users } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Bubble } from '../api/lib/bubble-types';
import { colors } from '../design-system/tokens';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_PARTICIPANTS = 8;

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const STATUS_LABELS: Record<string, string> = {
  open: 'Open',
  full: 'Full',
  active: 'Active',
  closed: 'Closed',
};

// ---------------------------------------------------------------------------
// Match banner configuration
// ---------------------------------------------------------------------------

type MatchBannerType = 'full_match' | 'partial_match' | 'full_bubble';

const MATCH_BANNER: Record<
  MatchBannerType,
  { label: string; Icon: React.ElementType; wrapperClass: string; iconClass: string }
> = {
  full_match: {
    label: 'Perfect match for your schedule',
    Icon: CheckCircle,
    wrapperClass: 'bg-teal-50 border-b border-teal-200 text-teal-700',
    iconClass: 'text-teal-500',
  },
  partial_match: {
    label: 'Partial match — schedule differs slightly',
    Icon: AlertCircle,
    wrapperClass: 'bg-amber-50 border-b border-amber-200 text-amber-700',
    iconClass: 'text-amber-500',
  },
  full_bubble: {
    label: 'Match found — bubble is currently full',
    Icon: AlertCircle,
    wrapperClass: 'bg-amber-50 border-b border-amber-200 text-amber-700',
    iconClass: 'text-amber-500',
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatSchedule(day: string, time: string): string {
  const capitalized = day.charAt(0).toUpperCase() + day.slice(1) + 's';
  return `${capitalized} · ${time}`;
}

function resolveBadgeColors(
  key: string,
  map: Record<string, { text: string; bg: string; border: string }>,
  fallback: { text: string; bg: string; border: string },
) {
  return map[key] ?? fallback;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface PrimaryLearningBubbleProps {
  bubble: Bubble;
  /** Renders a match-quality banner and accent stripe when provided. */
  matchType?: MatchBannerType;
  /** Called when the user clicks "Join". Hidden when status !== 'open'. */
  onJoin?: (bubbleId: string) => void;
  /** Called when the user clicks "Join Waitlist". Hidden when status !== 'full'. */
  onWaitlist?: (bubbleId: string) => void;
  /** Called when the user clicks "View". Always visible when provided. */
  onView?: (bubbleId: string) => void;
  /** Disables all interactive elements and shows a loading spinner. */
  isLoading?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const PrimaryLearningBubble: React.FC<PrimaryLearningBubbleProps> = ({
  bubble,
  matchType,
  onJoin,
  onWaitlist,
  onView,
  isLoading = false,
}) => {
  const {
    bubble_id,
    topic,
    level,
    meeting_day,
    meeting_time,
    goal_description,
    participant_count,
    status,
    waitlist_count,
  } = bubble;

  const levelBadge = resolveBadgeColors(level, colors.level, colors.level.beginner);
  const statusBadge = resolveBadgeColors(status, colors.status, colors.status.open);
  const participantPct = Math.min((participant_count / MAX_PARTICIPANTS) * 100, 100);
  const banner = matchType ? MATCH_BANNER[matchType] : null;
  const hasAccentStripe = banner !== null;

  // Progress bar fill: amber when full, turquoise otherwise
  const progressColor =
    status === 'full' ? colors.status.full.text : colors.accent.primary;

  return (
    <article
      className={cn(
        'group relative bg-white rounded-2xl flex flex-col overflow-hidden',
        'border border-slate-200 shadow-sm',
        'transition-all duration-300',
        'hover:border-teal-500 hover:shadow-[0_4px_16px_rgba(13,148,136,0.12)]',
      )}
    >
      {/* Left accent stripe — rendered for all matched results */}
      {hasAccentStripe && (
        <div
          className="absolute top-0 left-0 w-1 h-full bg-teal-500 rounded-l-2xl"
          aria-hidden="true"
        />
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/75">
          <Loader2
            className="w-6 h-6 animate-spin text-teal-600"
            aria-label="Loading"
          />
        </div>
      )}

      {/* Match quality banner */}
      {banner && (
        <div
          className={cn(
            'flex items-center gap-2 px-6 py-2.5 text-xs font-semibold',
            banner.wrapperClass,
          )}
        >
          <banner.Icon
            className={cn('w-4 h-4 shrink-0', banner.iconClass)}
            aria-hidden="true"
          />
          <span>{banner.label}</span>
        </div>
      )}

      {/* Card body — extra left padding when the accent stripe is present */}
      <div className={cn('flex flex-col flex-1 p-6', hasAccentStripe && 'pl-7')}>

        {/* Header: eyebrow category + level badge */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <span className="text-[10px] uppercase tracking-widest font-bold text-teal-600 bg-teal-50 border border-teal-200 px-2 py-1 rounded">
            Learning Bubble
          </span>
          <span
            className="shrink-0 text-xs font-medium px-2 py-1 rounded border"
            style={{
              color: levelBadge.text,
              backgroundColor: levelBadge.bg,
              borderColor: levelBadge.border,
            }}
          >
            {LEVEL_LABELS[level] ?? level}
          </span>
        </div>

        {/* Topic title */}
        <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2 transition-colors group-hover:text-teal-600">
          {topic}
        </h3>

        {/* Goal description */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-5">
          {goal_description || 'No goal description provided.'}
        </p>

        {/* Metadata rows */}
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Calendar className="w-4 h-4 shrink-0 text-teal-500" aria-hidden="true" />
            <span>{formatSchedule(meeting_day, meeting_time)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Users className="w-4 h-4 shrink-0 text-teal-500" aria-hidden="true" />
            <span>
              {participant_count} / {MAX_PARTICIPANTS} members
              {status === 'full' && waitlist_count > 0 && (
                <span className="ml-1 text-amber-600">
                  · {waitlist_count} on waitlist
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Participant progress bar */}
        <div
          role="progressbar"
          aria-valuenow={participant_count}
          aria-valuemin={0}
          aria-valuemax={MAX_PARTICIPANTS}
          aria-label={`${participant_count} of ${MAX_PARTICIPANTS} participants`}
          className="mb-6 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${participantPct}%`, backgroundColor: progressColor }}
          />
        </div>

        {/* Footer: status badge + CTA buttons */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-slate-100">

          {/* Status badge */}
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full border"
            style={{
              color: statusBadge.text,
              backgroundColor: statusBadge.bg,
              borderColor: statusBadge.border,
            }}
          >
            {STATUS_LABELS[status] ?? status}
          </span>

          {/* CTA area */}
          <div className="flex items-center gap-2">

            {/* Ghost action: View (always shown when handler is provided) */}
            {onView && (
              <button
                onClick={() => onView(bubble_id)}
                disabled={isLoading}
                className="flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-teal-600 disabled:opacity-50"
                aria-label={`View details for the ${topic} bubble`}
              >
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                View
              </button>
            )}

            {/* Primary action: Join — open bubbles only */}
            {status === 'open' && onJoin && (
              <button
                onClick={() => onJoin(bubble_id)}
                disabled={isLoading}
                aria-label={`Join the ${topic} learning bubble`}
                aria-busy={isLoading}
                className="px-4 py-2 text-xs font-bold text-white rounded-xl transition-all active:scale-95 disabled:opacity-50 bg-teal-600 hover:bg-teal-700"
              >
                Join
              </button>
            )}

            {/* Secondary action: Join Waitlist — full bubbles only */}
            {status === 'full' && onWaitlist && (
              <button
                onClick={() => onWaitlist(bubble_id)}
                disabled={isLoading}
                aria-label={`Join the waitlist for the ${topic} bubble`}
                aria-busy={isLoading}
                className="px-4 py-2 text-xs font-bold text-amber-700 rounded-xl border border-amber-200 bg-amber-50 transition-all active:scale-95 disabled:opacity-50 hover:bg-amber-100"
              >
                Join Waitlist
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PrimaryLearningBubble;
