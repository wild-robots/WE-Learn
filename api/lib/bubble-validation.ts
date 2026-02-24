/**
 * bubble-validation.ts — Reality-check and discovery validation.
 * Pure functions, zero runtime dependencies.
 */

import type { UserPreferences } from "./bubble-types";

// --- Constants (from PRD) ---

export const MIN_SELF_STUDY_HOURS = 1.5;
export const SYNC_MEETING_MINUTES = 90;
export const SYNC_MEETING_HOURS = SYNC_MEETING_MINUTES / 60; // 1.5
export const MIN_TOTAL_WEEKLY_HOURS = MIN_SELF_STUDY_HOURS + SYNC_MEETING_HOURS; // 3.0
export const MIN_BUBBLE_SIZE = 4;
export const MAX_BUBBLE_SIZE = 8;

// --- Validation Result ---

export interface ValidationResult {
  valid: boolean;
  reason: "hours_unknown" | "insufficient_hours" | "insufficient_self_study" | null;
  suggestion: string | null;
}

/**
 * Validates that the user's weekly hours meet the minimum requirements.
 * PRD: min 1.5hrs self-study + 90min sync = 3hrs total.
 * If under 1.5hrs self-study → hard block.
 */
export function validateHours(prefs: UserPreferences): ValidationResult {
  if (prefs.weeklyHours === null) {
    return {
      valid: false,
      reason: "hours_unknown",
      suggestion: "Ask the user how many hours per week they can dedicate.",
    };
  }

  if (prefs.weeklyHours < MIN_TOTAL_WEEKLY_HOURS) {
    return {
      valid: false,
      reason: "insufficient_hours",
      suggestion: `Minimum is ${MIN_TOTAL_WEEKLY_HOURS} hours/week (${MIN_SELF_STUDY_HOURS}hrs self-study + ${SYNC_MEETING_MINUTES}min sync meeting). User stated ${prefs.weeklyHours} hours.`,
    };
  }

  const effectiveSelfStudy = prefs.weeklyHours - SYNC_MEETING_HOURS;
  if (effectiveSelfStudy < MIN_SELF_STUDY_HOURS) {
    return {
      valid: false,
      reason: "insufficient_self_study",
      suggestion: `After the ${SYNC_MEETING_MINUTES}-minute sync meeting, only ${effectiveSelfStudy.toFixed(1)} hours remain for self-study. Minimum is ${MIN_SELF_STUDY_HOURS} hours.`,
    };
  }

  return { valid: true, reason: null, suggestion: null };
}

/**
 * Checks whether all required discovery fields have been collected.
 * Returns which fields are still missing.
 */
export function isDiscoveryComplete(
  prefs: UserPreferences
): { complete: boolean; missing: string[] } {
  const missing: string[] = [];
  if (!prefs.topic) missing.push("topic");
  if (!prefs.level) missing.push("level");
  // goal can be null (user doesn't know) — handled by suggestGoals
  if (prefs.weeklyHours === null) missing.push("weeklyHours");
  if (prefs.preferredDays.length === 0) missing.push("preferredDays");
  if (prefs.preferredTimes.length === 0) missing.push("preferredTimes");
  return { complete: missing.length === 0, missing };
}

/**
 * Suggests 2–3 realistic goals based on topic and available self-study hours.
 * Used when the user can't define a goal on her own.
 *
 * PRD examples:
 *   1.5hrs → familiarity with the subject
 *   3hrs   → building a basic skill
 *   5+hrs  → specialization
 */
export function suggestGoals(topic: string, weeklyHours: number): string[] {
  const selfStudy = weeklyHours - SYNC_MEETING_HOURS;

  if (selfStudy <= 2) {
    return [
      `היכרות עם עולם ה-${topic} — הבנת מושגי יסוד ותמונת העולם`,
      `השלמת פרויקט מעשי קטן ב-${topic}`,
    ];
  }
  if (selfStudy <= 4) {
    return [
      `בניית מיומנות בסיסית ב-${topic} שאפשר ליישם בעבודה`,
      `בניית פרויקט תיק עבודות ב-${topic}`,
      `הכנה למבחן הסמכה ב-${topic}`,
    ];
  }
  return [
    `רכישת מומחיות מקצועית ב-${topic}`,
    `בנייה והשקת פרויקט אמיתי ב-${topic}`,
    `מעבר לתפקיד שמתמקד ב-${topic}`,
  ];
}
