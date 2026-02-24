/**
 * bubble-types.ts — Core data model for the Learning Bubble Agent.
 * Pure types with zero runtime dependencies.
 */

// --- Enums & Literals ---

export type BubbleLevel = "beginner" | "intermediate" | "advanced";

export type BubbleStatus = "open" | "full" | "active" | "closed";

export type DayOfWeek =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

// --- Firestore Document ---

export interface Bubble {
  bubble_id: string;
  topic: string;
  level: BubbleLevel;
  meeting_day: DayOfWeek;
  meeting_time: string; // "HH:MM" 24h format
  goal_description: string;
  participant_count: number; // 0–8
  participants: string[]; // user UIDs
  status: BubbleStatus;
  waitlist: string[];
  waitlist_count: number;
  founder_id: string;
  created_at: Date;
}

// --- Agent Flow ---

export type AgentPhase =
  | "discovery"
  | "reality_check"
  | "matching"
  | "placement"
  | "handoff";

export interface UserPreferences {
  topic: string | null;
  level: BubbleLevel | null;
  goal: string | null;
  weeklyHours: number | null;
  selfStudyHours: number | null;
  preferredDays: DayOfWeek[];
  preferredTimes: string[];
}

// --- Matching ---

export type MatchType = "full_match" | "partial_match" | "full_bubble" | "no_match";

export interface MatchResult {
  type: MatchType;
  bubble: Bubble | null;
  reason: string;
}

export type PlacementAction = "join" | "waitlist" | "create_new";

export interface PlacementDecision {
  action: PlacementAction;
  bubble: Bubble | null;
  prompt: string;
}

// --- Handoff to Content Agent ---

export interface BubbleHandoff {
  bubble_id: string;
  topic: string;
  level: BubbleLevel;
  goal: string;
  weeklyHours: number;
  meeting_day: DayOfWeek;
  meeting_time: string;
  participant_count: number;
  user_id: string;
}
