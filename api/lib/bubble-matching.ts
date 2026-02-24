/**
 * bubble-matching.ts — Deterministic matching algorithm.
 * Pure functions that take bubbles + preferences and return ranked results.
 * Zero runtime dependencies (no Firestore, no React).
 */

import type {
  Bubble,
  UserPreferences,
  MatchResult,
  MatchType,
  PlacementDecision,
} from "./bubble-types";
import { MAX_BUBBLE_SIZE } from "./bubble-validation";

/**
 * Finds and ranks bubbles that match user preferences.
 *
 * Mandatory criteria (PRD):
 *   - Same topic (case-insensitive)
 *   - Overlapping day AND time (within tolerance)
 *
 * Priority criteria (soft — does not block placement):
 *   - Similar goal description
 *
 * Bubbles with status "closed" are excluded entirely.
 */
export function findMatches(
  bubbles: Bubble[],
  prefs: UserPreferences
): MatchResult[] {
  if (!prefs.topic) return [];

  const eligible = bubbles.filter((b) => b.status !== "closed");
  const results: MatchResult[] = [];

  for (const bubble of eligible) {
    const topicOk = matchesTopic(bubble.topic, prefs.topic);
    if (!topicOk) continue;

    const dayTimeOk = matchesDayTime(bubble, prefs);

    if (dayTimeOk) {
      if (bubble.participant_count >= MAX_BUBBLE_SIZE) {
        results.push({
          type: "full_bubble",
          bubble,
          reason: `בועה "${bubble.goal_description}" תואמת אך מלאה (${bubble.participant_count}/${MAX_BUBBLE_SIZE}).`,
        });
      } else {
        results.push({
          type: "full_match",
          bubble,
          reason: `נושא, יום ושעה תואמים. מטרה: "${bubble.goal_description}".`,
        });
      }
    } else {
      results.push({
        type: "partial_match",
        bubble,
        reason: `הנושא תואם אך הזמן לא חופף. הבועה נפגשת ב-${bubble.meeting_day} ב-${bubble.meeting_time}.`,
      });
    }
  }

  // Sort: full_match → full_bubble → partial_match
  const priority: Record<MatchType, number> = {
    full_match: 0,
    full_bubble: 1,
    partial_match: 2,
    no_match: 3,
  };

  results.sort((a, b) => {
    const tierDiff = priority[a.type] - priority[b.type];
    if (tierDiff !== 0) return tierDiff;

    // Within same tier, prefer bubbles with similar goals
    const aScore = goalSimilarity(
      a.bubble?.goal_description || "",
      prefs.goal || ""
    );
    const bScore = goalSimilarity(
      b.bubble?.goal_description || "",
      prefs.goal || ""
    );
    return bScore - aScore;
  });

  return results;
}

/**
 * Decides the placement action based on match results.
 *
 * @param matches        - sorted results from findMatches
 * @param userAccepted   - null = not yet asked, true = accepted partial, false = rejected
 */
export function decidePlacement(
  matches: MatchResult[],
  userAccepted: boolean | null
): PlacementDecision {
  if (matches.length === 0) {
    return {
      action: "create_new",
      bubble: null,
      prompt:
        "לא מצאתי כרגע בועה פתוחה שמתאימה בדיוק ללו״ז ולמטרות שלך. מה דעתך שנפתח בועה חדשה ואני אמצא נשים נוספות שיצטרפו אלייך?",
    };
  }

  const best = matches[0];

  if (best.type === "full_match") {
    return {
      action: "join",
      bubble: best.bubble,
      prompt: `מצאתי בועה בדיוק בשבילך! קבוצת נשים לומדת ${best.bubble!.topic} בימי ${best.bubble!.meeting_day} ב-${best.bubble!.meeting_time}. תרצי להצטרף אליהן?`,
    };
  }

  if (best.type === "full_bubble") {
    return {
      action: "waitlist",
      bubble: best.bubble,
      prompt: `מצאתי בועה מתאימה בדיוק, אבל היא כבר מלאה (${best.bubble!.participant_count} נשים). תרצי להירשם לרשימת המתנה? אם מישהי תעזוב — נעדכן אותך ראשונה.`,
    };
  }

  if (best.type === "partial_match") {
    if (userAccepted === null) {
      // Haven't asked yet
      return {
        action: "join",
        bubble: best.bubble,
        prompt: `מצאתי קבוצה ב-${best.bubble!.topic} שנפגשת ב-${best.bubble!.meeting_day} ב-${best.bubble!.meeting_time}. האם השעה הזו יכולה להתאים לך? אם לא — נפתח בועה חדשה ביום ובשעה שנוחים לך.`,
      };
    }
    if (userAccepted) {
      return {
        action: "join",
        bubble: best.bubble,
        prompt: "מעולה! משבצת אותך לבועה הקיימת.",
      };
    }
    return {
      action: "create_new",
      bubble: null,
      prompt:
        "אין בעיה! נפתח בועה חדשה ביום ובשעה שנוחים לך.",
    };
  }

  return {
    action: "create_new",
    bubble: null,
    prompt: "נפתח בועה חדשה בשבילך!",
  };
}

// --- Internal Helpers ---

function matchesTopic(bubbleTopic: string, userTopic: string): boolean {
  return bubbleTopic.toLowerCase().trim() === userTopic.toLowerCase().trim();
}

function matchesDayTime(bubble: Bubble, prefs: UserPreferences): boolean {
  const dayOverlap = prefs.preferredDays.includes(bubble.meeting_day);
  if (!dayOverlap) return false;

  if (prefs.preferredTimes.length === 0) return true;

  return prefs.preferredTimes.some((userTime) =>
    isTimeOverlap(userTime, bubble.meeting_time, 60)
  );
}

function isTimeOverlap(
  time1: string,
  time2: string,
  toleranceMinutes: number
): boolean {
  const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + (m || 0);
  };
  return Math.abs(toMinutes(time1) - toMinutes(time2)) <= toleranceMinutes;
}

/**
 * Simple keyword-overlap similarity (0–1).
 * Goal matching is "soft" per PRD — it influences ranking but never blocks.
 */
function goalSimilarity(goal1: string, goal2: string): number {
  const tokenize = (s: string) =>
    new Set(
      s
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 2)
    );
  const a = tokenize(goal1);
  const b = tokenize(goal2);
  if (a.size === 0 || b.size === 0) return 0;

  let overlap = 0;
  for (const w of a) {
    if (b.has(w)) overlap++;
  }
  return overlap / Math.max(a.size, b.size);
}
