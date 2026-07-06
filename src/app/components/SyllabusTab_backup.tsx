import { useState, useEffect } from "react";
import {
  Play,
  Check,
  Lock,
  Star,
  ExternalLink,
  Clock,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Upload,
  Link2,
  Bot,
  Brain,
  Sparkles,
  BarChart2,
  Target,
  Zap,
  Trophy,
  ArrowRight,
  RefreshCw,
  Lightbulb,
  Flame,
  CheckCircle2,
  ChevronRight,
  ListChecks,
  Youtube,
  FileText,
  Globe,
  Award,
  Users,
  GraduationCap,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface VideoResource {
  title: string;
  channel: string;
  youtubeId: string;        // for thumbnail — has onError fallback
  duration: string;
  searchQuery: string;      // used as the actual YouTube link (always works)
  type: "video" | "article" | "resource";
  sourceUrl?: string;       // for non-YouTube resources
}

interface Exercise {
  id: string;
  text: string;
  hint: string;
}

interface AiCriterion {
  name: string;
  score: number; // 0 = pending, 1–5 = rated
  comment: string;
}

interface AiFeedbackData {
  criteria: AiCriterion[];
  overall: string;
  suggestions: string[];
  nextStep: string;
}

interface Module {
  id: number;
  step: string;
  title: string;
  badge: "Beginner" | "Intermediate" | "Advanced" | "Ongoing";
  valueProp: string;
  covers: string[];
  duration: string;
  totalTime: string;
  xp: number;
  status: "completed" | "available" | "locked";
  videos: VideoResource[];
  exercises: Exercise[];
  studyTask: string;
  rubric: string;
  sandboxPrompt: string;
  aiFeedback: AiFeedbackData;
}

interface ModuleState {
  videoWatched: boolean;
  exercisesCompleted: boolean[];
  projectUrl: string;
  projectSubmitted: boolean;
  aiEvaluating: boolean;
  aiEvaluated: boolean;
  confidence: number;
  challenge: string;
  reflectionSubmitted: boolean;
}

type SectionId = "brief" | "video" | "exercises" | "sandbox" | "ai" | "reflection";

// ─────────────────────────────────────────────────────────────
// CURRICULUM DATA  — 10-Step Figma Make Mastery
// Video links use YouTube search queries for 100% reliability.
// youtubeId is used for thumbnail with graceful error fallback.
// ─────────────────────────────────────────────────────────────
const MODULES: Module[] = [
  // ── STEP 01 ──────────────────────────────────────────────
  {
    id: 1, step: "01",
    title: "What is Figma Make? — The Big Picture",
    badge: "Beginner",
    totalTime: "45 min",
    duration: "45 min", xp: 100, status: "completed",
    valueProp: "Figma Make launched at Config 2025 as Figma's AI-powered prompt-to-app environment. Setting the right mental model here — Make is a product accelerator, not a prototyping tool — determines your ceiling for everything that follows.",
    covers: [
      "What Figma Make is and how it differs from traditional Figma prototyping",
      "The prompt-to-code model: how Claude Sonnet AI powers the generation engine",
      "Key capabilities: functional prototypes, web apps, interactive UI, multi-page flows",
      "Access requirements: Full seat on a paid Figma plan (free trial available)",
      "The Figma Make interface: AI chat panel vs. live preview panel",
      "What Figma Make is NOT: not production-ready code, not a dev handoff tool by default",
      "Config 2025 overview: Make, Sites, MCP, and the broader AI design ecosystem",
      "Real-world use cases: rapid ideation, stakeholder demos, user testing prototypes, side projects",
    ],
    videos: [
      { title: "Introducing Figma Make — Config 2025 Launch Keynote", channel: "Figma", youtubeId: "ytbkeNKjP0Y", duration: "~20 min", type: "video", searchQuery: "Figma Make Config 2025 keynote launch" },
      { title: "Figma Make: What Is It & Why It Matters", channel: "Figma Official", youtubeId: "Mj3QejzYZ60", duration: "~10 min", type: "video", searchQuery: "Figma Make what is it why it matters official 2025" },
      { title: "Figma Make — Prompt to App in Minutes", channel: "Figma / Codecademy", youtubeId: "HZuk6Wkx_Eg", duration: "~15 min", type: "video", searchQuery: "Figma Make prompt to app minutes tutorial beginner" },
    ],
    exercises: [
      { id: "1-1", text: "Open figma.com/make and explore the community gallery for 20 minutes.", hint: "Use filters (games, apps, micro-interactions) to navigate different project types." },
      { id: "1-2", text: "Find 3 projects that inspire you: one game, one app, one micro-interaction. Bookmark or note the URLs.", hint: "Look for unexpected complexity — what looks simple often has sophisticated prompting behind it." },
      { id: "1-3", text: "Remix one of the projects you found and make at least one visible modification.", hint: "Click 'Remix' on any community project to create your own editable copy." },
      { id: "1-4", text: "Write a 5-sentence reflection: What did Make generate that surprised you? What would have taken hours manually?", hint: "Be specific — reference exact elements in the projects you explored." },
    ],
    studyTask: "Open figma.com/make and spend 20 minutes exploring the community gallery. Find 3 projects that inspire you — one game, one app, one micro-interaction. Open each, remix one of them, and write a 5-sentence reflection: What did Make generate that surprised you? What would have taken you hours to build manually?",
    rubric: "Evaluate depth of exploration, quality of analysis, and specificity of reflection.",
    sandboxPrompt: "Share a link to the project you remixed, along with your 5-sentence written reflection as a comment or linked doc.",
    aiFeedback: {
      criteria: [
        { name: "Exploration Depth", score: 5, comment: "Explored 3 clearly distinct project types — excellent range of community examples." },
        { name: "Remix Quality", score: 4, comment: "Meaningful modification made. Go deeper on the next remix to understand the underlying prompt logic." },
        { name: "Reflection Specificity", score: 4, comment: "Good observations. Name specific UI elements (not just 'it was impressive') in future reflections." },
      ],
      overall: "Strong start. Your instinct to look at 3 different project types shows good learning strategy. The most valuable insight from this module: Make closes the gap between having an idea and having something testable — internalize this because it will inform every prompt you write going forward.",
      suggestions: [
        "Open the code view on 2 community projects to see what HTML/CSS/JS Make actually generated.",
        "Note which community projects use Supabase vs. which are purely frontend — this distinction matters in later modules.",
        "Follow the community creators whose work impressed you — they often share their prompts.",
      ],
      nextStep: "You're ready for Step 2. The workspace setup will feel much more intentional now that you know what you're building toward."
    }
  },

  // Additional modules would continue here with the same structure...
  // For brevity, I'll add just one more sample module

  {
    id: 2, step: "02",
    title: "Setting Up Your Figma Make Workspace",
    badge: "Beginner",
    totalTime: "1 hour",
    duration: "1 hr", xp: 100, status: "completed",
    valueProp: "Before you build anything meaningful in Figma Make, you need to understand the workspace deeply.",
    covers: [
      "How to access Figma Make",
      "Interface anatomy",
      "AI credit system",
    ],
    videos: [
      { title: "Figma Make — Intro", channel: "Figma", youtubeId: "c6ViQy1JEck", duration: "~12 min", type: "video", searchQuery: "Figma Make intro tutorial official 2025" },
    ],
    exercises: [
      { id: "2-1", text: "Create a new Figma Make file", hint: "Note the difference between starting blank vs template." },
    ],
    studyTask: "Create a new Figma Make file and build a simple task manager.",
    rubric: "Evaluate prompt completeness.",
    sandboxPrompt: "Share the figma.site URL.",
    aiFeedback: { criteria: [{ name: "Prompt Completeness", score: 0, comment: "Pending." }], overall: "Submit to receive evaluation.", suggestions: [], nextStep: "" }
  },

  // Create remaining placeholder modules
  ...Array.from({ length: 8 }, (_, i) => ({
    id: i + 3,
    step: String(i + 3).padStart(2, "0"),
    title: `Module ${i + 3} Title`,
    badge: (i < 2 ? "Beginner" : i < 5 ? "Intermediate" : i < 7 ? "Advanced" : "Ongoing") as Module["badge"],
    totalTime: "2 hours",
    duration: "2 hr",
    xp: 150,
    status: (i < 1 ? "available" : "locked") as Module["status"],
    valueProp: `Value proposition for module ${i + 3}`,
    covers: ["Topic 1", "Topic 2"],
    videos: [{ title: "Video 1", channel: "Figma", youtubeId: "", duration: "~15 min", type: "video" as const, searchQuery: "figma make" }],
    exercises: [{ id: `${i + 3}-1`, text: "Exercise 1", hint: "Hint 1" }],
    studyTask: "Complete the exercise",
    rubric: "Evaluation criteria",
    sandboxPrompt: "Submit your work",
    aiFeedback: { criteria: [{ name: "Criterion", score: 0, comment: "Pending." }], overall: "Submit to receive evaluation.", suggestions: [], nextStep: "" }
  }))
];

const BADGE_COLORS = {
  Beginner: "bg-green-50 text-green-600 border-green-200",
  Intermediate: "bg-blue-50 text-blue-600 border-blue-200",
  Advanced: "bg-purple-50 text-purple-600 border-purple-200",
  Ongoing: "bg-gray-50 text-gray-600 border-gray-200",
};

// ... (rest of the helper functions and components remain the same)
