// ─── Professional Learning Architect — Curriculum Generator ────────────────────
// Mirrors the v6.2 Learning Architect agent output format.
// Runs client-side to produce a Module[] array from wizard BabelData.

export interface VideoResource {
  title: string;
  channel: string;
  youtubeId: string;
  duration: string;
  searchQuery: string;
  type: "video" | "article" | "resource";
  sourceUrl?: string;
}

export interface Exercise {
  id: string;
  text: string;
  hint: string;
}

export interface AiCriterion {
  name: string;
  score: number;
  comment: string;
}

export interface AiFeedbackData {
  criteria: AiCriterion[];
  overall: string;
  suggestions: string[];
  nextStep: string;
}

export interface Module {
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

export interface GeneratedCurriculum {
  topic: string;
  audience: string;
  day: string;
  time: string;
  startDate: string;
  participants: number;
  duration: number;
  modules: Module[];
  generatedAt: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pad(n: number) { return n < 10 ? `0${n}` : `${n}`; }

function bloomBadge(idx: number, total: number): "Beginner" | "Intermediate" | "Advanced" | "Ongoing" {
  const p = idx / (total - 1);
  if (p < 0.33) return "Beginner";
  if (p < 0.67) return "Intermediate";
  return "Advanced";
}

function moduleStatus(idx: number, audience: string): "completed" | "available" | "locked" {
  const completedUntil = audience === "Advanced" ? 2 : audience === "Intermediate" ? 2 : 2;
  const availableUntil = completedUntil + 1;
  if (idx < completedUntil) return "completed";
  if (idx < availableUntil) return "available";
  return "locked";
}

function pendingFeedback(names: string[]): AiFeedbackData {
  return {
    criteria: names.map(n => ({ name: n, score: 0, comment: "Pending evaluation." })),
    overall: "Submit your project above to receive AI evaluation.",
    suggestions: [],
    nextStep: "",
  };
}

function dur(idx: number): { duration: string; totalTime: string; xp: number } {
  const hours = idx < 2 ? 45 : idx < 5 ? 60 : idx < 8 ? 90 : 120;
  const xp = idx < 2 ? 100 : idx < 5 ? 150 : 200;
  const label = hours < 60 ? `${hours} min` : hours === 60 ? "1 hr" : `${hours / 60}h ${hours % 60 > 0 ? `${hours % 60}m` : ""}`.trim();
  return { duration: label, totalTime: hours < 60 ? `${hours} min` : `${hours / 60} hour${hours / 60 !== 1 ? "s" : ""}`, xp };
}

// ─── TOPIC BLUEPRINTS ─────────────────────────────────────────────────────────

type StageDef = {
  title: string;
  valueProp: string;
  covers: string[];
  videos: Omit<VideoResource, never>[];
  exerciseTexts: { text: string; hint: string }[];
  studyTask: string;
  rubric: string;
  sandboxPrompt: string;
  feedbackCriteria: string[];
  feedbackOverall: string;
  feedbackSuggestions: string[];
  feedbackNextStep: string;
};

// ─── Prompt Engineering for PMs ───────────────────────────────────────────────
const PROMPT_ENG_PM: StageDef[] = [
  {
    title: "Foundations of LLMs for Product Managers",
    valueProp: "You can't direct what you don't understand. Before writing a single prompt, PMs need a working mental model of how large language models actually process instructions — because the same conceptual gap that trips up developers trips up product leaders when they fail to get useful output.",
    covers: [
      "How LLMs generate text: tokens, context windows, and probability chains",
      "The difference between GPT-4, Claude, and Gemini for PM workflows",
      "What a system prompt is and why it's the most important piece of context you control",
      "Temperature and top-p: why your output varies even with the same prompt",
      "Context window limits and what happens when your conversation overflows",
      "Fine-tuning vs. prompting: when each approach makes sense for product teams",
      "AI hallucination mechanics: why models confidently produce wrong answers",
      "Practical mental model: LLMs as pattern-matching engines, not reasoning systems",
    ],
    videos: [
      { title: "How Large Language Models Work — Andrej Karpathy (Former OpenAI)", channel: "Andrej Karpathy", youtubeId: "zjkBMFhNj_g", duration: "~1 hr", type: "video", searchQuery: "Andrej Karpathy intro large language models GPT explained 2024" },
      { title: "GPT-4 and ChatGPT for Product Teams — Stanford Online", channel: "Stanford Online", youtubeId: "AhyznRSDjw8", duration: "~50 min", type: "video", searchQuery: "Stanford Online AI product management LLMs 2024" },
    ],
    exerciseTexts: [
      { text: "Ask ChatGPT and Claude the same product question: 'What are the top 3 risks in launching a B2B SaaS feature?' Compare the outputs side-by-side.", hint: "Paste both responses into a Google Doc and annotate differences in structure, confidence tone, and specificity." },
      { text: "Write a short 'user story' prompt and re-run it 5 times. Document how outputs vary.", hint: "Set temperature to default for all runs. Look for structural variance, word choice shifts, and factual inconsistencies." },
      { text: "Feed Claude a 5,000-word PRD and ask it to summarize. Then truncate to 500 words and compare.", hint: "This tests your intuition for context window behavior before it matters on a real document." },
    ],
    studyTask: "Spend 45 minutes running the same product question through GPT-4, Claude 3.5 Sonnet, and Gemini 1.5 Pro. Document 5 structural differences in how they respond — not what they say, but how they structure, qualify, and present information. This is your baseline for choosing the right model per task.",
    rubric: "Assess accuracy of model comparison, insight depth, and ability to articulate when each model is preferable.",
    sandboxPrompt: "Share your side-by-side comparison doc with 5 documented differences annotated.",
    feedbackCriteria: ["Model Selection Reasoning", "Comparison Depth", "Practical Insight Quality"],
    feedbackOverall: "Strong foundation set. Understanding model-level differences before prompting makes every subsequent session more intentional.",
    feedbackSuggestions: ["Save your comparison doc — you'll revisit model selection in Stage 6 when building AI-powered workflows.", "Subscribe to the OpenAI and Anthropic research blogs for model changelog alerts.", "Note which model handles structured output (JSON, tables) best — this matters for PM tooling."],
    feedbackNextStep: "Stage 2 takes you directly into prompt structure. Your model baseline will immediately inform which format you choose.",
  },
  {
    title: "Prompt Anatomy & The PM Prompt Stack",
    valueProp: "Most PMs treat prompting as conversation. The PMs who get dramatically better output treat it as system design. The PM Prompt Stack — Role, Context, Constraint, Format, Example — is the structural equivalent of a well-written PRD: everything the model needs to produce exactly what you need.",
    covers: [
      "The five-layer PM Prompt Stack: Role → Context → Constraint → Format → Example",
      "Role priming: why 'Act as a Senior PM at a fintech startup' changes output quality",
      "Context loading: how to give the model your product, user, and team situation efficiently",
      "Constraints: word limits, tone, banned phrases, audience specification",
      "Output format control: tables, bullet lists, JSON, numbered steps, prose",
      "One-shot and few-shot examples: showing the model what good looks like",
      "Chain prompting: breaking complex PM tasks into sequential micro-prompts",
      "The 'critique and improve' loop: using the model to evaluate its own output",
    ],
    videos: [
      { title: "Prompt Engineering for Developers — DeepLearning.AI (Andrew Ng)", channel: "DeepLearning.AI", youtubeId: "H4YK_7MAckk", duration: "~1.5 hr", type: "video", searchQuery: "DeepLearning.AI prompt engineering course Andrew Ng 2024" },
      { title: "Advanced Prompting Techniques — Lenny Rachitsky + AI Guest", channel: "Lenny's Podcast", youtubeId: "LN7wxDi6EUY", duration: "~55 min", type: "video", searchQuery: "Lenny's Podcast AI prompting product management 2024" },
    ],
    exerciseTexts: [
      { text: "Take a vague PM prompt ('Write a user story for notifications') and rebuild it using all 5 stack layers. Generate both versions and compare.", hint: "The vague version is your control. Document exactly which stack layer produced the biggest quality jump." },
      { text: "Prompt Claude to write a competitive analysis brief, then immediately follow up with: 'Critique your response using these 3 criteria: specificity, evidence quality, and actionability. Then rewrite it.' ", hint: "This is the 'critique and improve' loop. It consistently produces a 30-40% better second draft." },
      { text: "Write a chain of 4 sequential micro-prompts for a full feature PRD: (1) problem framing, (2) user stories, (3) acceptance criteria, (4) success metrics.", hint: "Each prompt should reference the previous output. Build context forward, not backward." },
    ],
    studyTask: "Take a real product task from your current work (a PRD section, a research synthesis, a stakeholder brief). Write a PM Prompt Stack version (5 layers, min 150 words) and a naive version (1-2 sentences). Generate both, run the critique loop on the PM Stack version, and document the quality delta. This becomes your reusable prompt template.",
    rubric: "Evaluate stack layer completeness, constraint specificity, and quality of critique loop output.",
    sandboxPrompt: "Submit: your 5-layer prompt text + naive prompt + both outputs + critique loop response + your quality delta assessment.",
    feedbackCriteria: ["Stack Layer Completeness", "Constraint Specificity", "Critique Loop Execution", "Template Reusability"],
    feedbackOverall: "The 5-layer structure is now your prompting foundation. The critique loop is the technique that will save the most revision time across all PM tasks.",
    feedbackSuggestions: ["Save your reusable template in Notion or your notes app — tag it by use case.", "Add a 6th layer: 'Negative constraint' (e.g., 'Do not include competitive analysis, do not suggest features not in scope').", "Practice the chain prompt approach on your next real PRD — the discipline transfers directly."],
    feedbackNextStep: "Stage 3 applies this directly to product discovery — your most time-intensive PM workflow.",
  },
  {
    title: "AI-Accelerated Product Discovery",
    valueProp: "Discovery is where most AI-powered PM workflows break down — not because AI is bad at discovery, but because PMs use it as a shortcut rather than an accelerator. The fastest discovery loops use AI to compress synthesis and pattern-finding, while humans own the judgment and prioritization decisions.",
    covers: [
      "The discovery acceleration model: where AI speeds up and where human judgment is non-negotiable",
      "User interview synthesis: feeding transcripts to Claude for theme extraction with a critical eye",
      "Competitive intelligence gathering: structured AI-assisted scan of public signals",
      "Jobs-to-be-Done analysis via AI: extracting JTBD statements from interview data",
      "Opportunity scoring: using AI to draft an impact/confidence/ease matrix",
      "Assumption mapping: prompting AI to surface hidden assumptions in your problem framing",
      "How to validate AI-synthesized insights — cross-referencing with raw data",
      "The 'challenge everything' prompt: using AI as a devil's advocate on your hypotheses",
    ],
    videos: [
      { title: "AI-Powered Product Discovery — Mind the Product Conference", channel: "Mind the Product", youtubeId: "9UgLhTNB8uE", duration: "~40 min", type: "video", searchQuery: "Mind the Product AI product discovery 2024 conference" },
      { title: "Jobs-to-be-Done with AI Tools — Continuous Discovery Habits", channel: "Teresa Torres", youtubeId: "2u0sSWf7Tlw", duration: "~45 min", type: "video", searchQuery: "Teresa Torres jobs to be done AI discovery continuous habits" },
    ],
    exerciseTexts: [
      { text: "Take 3 user interview transcripts (or create 3 realistic fictional ones) and run the following prompt: 'Extract Jobs-to-be-Done statements, functional and emotional, from these transcripts. Format as a table with: JTBD statement | Evidence quote | Frequency signal.'", hint: "Start with verbatim transcripts. The model needs raw language, not paraphrased summaries." },
      { text: "Prompt Claude: 'I am building [your product]. List the 10 most dangerous assumptions I am making. For each, rate: how verifiable it is (1-5) and the cost if wrong (1-5).'", hint: "Don't defend your product to the model. Let the adversarial output surface real risks." },
      { text: "Run a competitive intelligence scan: give Claude public information about 3 competitors (job postings, release notes, review quotes) and ask for a research maturity rating for each.", hint: "Use LinkedIn job postings as a signal source — research role seniority reveals team investment." },
    ],
    studyTask: "Select a real or realistic product problem. Run a full AI-accelerated discovery sprint: (1) synthesize 3 user data sources into JTBD statements, (2) generate an assumption map with risk ratings, (3) produce a competitive intelligence brief from public signals. Document where AI was useful and where you had to override its output.",
    rubric: "Evaluate JTBD extraction quality, assumption map completeness, and honesty of AI override documentation.",
    sandboxPrompt: "Submit your discovery sprint document: JTBD table + assumption map + competitive brief + override log.",
    feedbackCriteria: ["JTBD Extraction Accuracy", "Assumption Map Risk Calibration", "Competitive Intelligence Depth", "Override Judgment Quality"],
    feedbackOverall: "Discovery acceleration is the highest-ROI skill in this curriculum. The override log is the most valuable artifact — your judgment pattern is what makes you a senior PM, not the AI output.",
    feedbackSuggestions: ["Build a reusable 'discovery sprint' prompt library in Notion — one prompt per discovery phase.", "Try the same JTBD extraction on a competitor's public reviews (G2, Capterra, App Store) for market intelligence.", "The assumption map exercise works equally well on your roadmap — run it every quarter."],
    feedbackNextStep: "Stage 4 applies AI to your highest-visibility output: PRDs and user stories.",
  },
  {
    title: "Writing PRDs and User Stories at AI Speed",
    valueProp: "A well-structured PRD written at AI speed isn't a shortcut — it's a forcing function for clearer thinking. The PMs who use AI most effectively for documentation don't write less; they iterate faster, validate structure earlier, and spend their freed time on the judgment calls AI can't make.",
    covers: [
      "PRD structure in the AI era: which sections AI writes well and which require human authorship",
      "The 'skeleton first' approach: using AI to scaffold, then filling with human context",
      "User story generation: prompting for INVEST-compliant stories from JTBD input",
      "Acceptance criteria writing: specificity requirements and edge case coverage",
      "Success metric generation: prompting for north star metrics and guardrail metrics",
      "Edge case surfacing: asking AI to stress-test your feature against user archetypes",
      "Stakeholder localization: rewriting the same PRD section for engineering, design, and exec",
      "Version control for AI-assisted PRDs: tracking which sections are human vs. AI-drafted",
    ],
    videos: [
      { title: "Writing Better PRDs with AI — Lenny's Newsletter Live", channel: "Lenny's Newsletter", youtubeId: "xhJA8_SUpWw", duration: "~50 min", type: "video", searchQuery: "writing PRD with AI Lenny's Newsletter product management 2024" },
      { title: "SVPG Product Documentation Best Practices — Marty Cagan", channel: "Silicon Valley Product Group", youtubeId: "7FGNbZDDzM0", duration: "~40 min", type: "video", searchQuery: "Marty Cagan SVPG product documentation best practices" },
    ],
    exerciseTexts: [
      { text: "Use AI to generate a PRD skeleton for a feature you've worked on or imagined. Identify the 3 sections where AI output needed the most human intervention.", hint: "Typical human-override sections: problem statement nuance, specific success metrics, technical constraints. Document why you overrode each section." },
      { text: "From a JTBD statement, generate 5 INVEST-compliant user stories using a chain prompt. Then have AI identify which story has the weakest acceptance criteria.", hint: "INVEST = Independent, Negotiable, Valuable, Estimable, Small, Testable. Use this as your critique criteria." },
      { text: "Take the same feature brief and generate 3 versions: one for engineering, one for design, one for an executive. Document the 5 biggest structural differences between the versions.", hint: "Execs want outcomes and risk. Engineers want constraints and edge cases. Design wants user goals and flow." },
    ],
    studyTask: "Write a complete 1-page PRD for a feature using the skeleton-first AI approach. Generate the skeleton, fill in human context for 3 sections, use AI for the remaining sections. Then rewrite the executive summary for a non-technical stakeholder. Submit the full PRD + your human-override annotations.",
    rubric: "Evaluate PRD completeness, story INVEST compliance, and quality of stakeholder localization.",
    sandboxPrompt: "Submit your PRD document with human-override annotations clearly marked and the executive-localized summary.",
    feedbackCriteria: ["PRD Structural Completeness", "INVEST Story Compliance", "Stakeholder Localization Quality", "Human Override Reasoning"],
    feedbackOverall: "AI-speed documentation is now in your toolkit. The annotation discipline — marking what's human vs. AI — is a professional standard that separates serious practitioners from shortcuts.",
    feedbackSuggestions: ["Build a PRD prompt template library: one per feature type (new feature, iteration, deprecation).", "Try the stakeholder localization prompt on an existing PRD from your current backlog.", "The edge case surfacing prompt is also excellent for QA handoffs — share it with your engineering counterpart."],
    feedbackNextStep: "Stage 5 focuses on evaluating and quality-controlling AI output — the critical skill for not shipping AI hallucinations.",
  },
  {
    title: "Evaluating and Quality-Controlling AI Output",
    valueProp: "The PM who ships AI hallucinations isn't using AI — they're offloading responsibility without verifying the work. Evaluation literacy is the skill that lets you move fast without introducing risk. The faster you can tell good AI output from bad, the more you can trust the acceleration.",
    covers: [
      "The PM Quality Rubric: completeness, specificity, internal consistency, factual verifiability",
      "Hallucination detection patterns: confident assertions without evidence, fabricated citations, contradictions",
      "The 'source or remove' protocol: every factual claim must trace to a verifiable source",
      "Output stress-testing: prompting AI to argue against its own recommendation",
      "Consistency checks: running the same prompt 3 times and comparing variance",
      "Human-in-the-loop gates: where you must not remove human judgment from AI-assisted workflows",
      "AI output documentation standards: logging prompts, outputs, and revision decisions",
      "Building team-level quality standards for AI-generated product documentation",
    ],
    videos: [
      { title: "Evaluating LLM Output Quality — Google PAIR Guidebook", channel: "Google PAIR", youtubeId: "YeB8j8MQLHM", duration: "~35 min", type: "video", searchQuery: "Google PAIR evaluating LLM output quality product 2024" },
      { title: "AI Reliability in Product Decisions — Reforge", channel: "Reforge", youtubeId: "3sOp8v-pCHs", duration: "~45 min", type: "video", searchQuery: "Reforge AI reliability product decision making 2024" },
    ],
    exerciseTexts: [
      { text: "Ask Claude to produce a competitive analysis with specific statistics. Apply the 'source or remove' protocol to every factual claim. Document what percentage of claims were unverifiable.", hint: "Statistics without a source citation = remove or replace. Build the habit of asking: 'How do you know this?' after any factual claim." },
      { text: "Run the adversarial loop: after receiving an AI recommendation, prompt: 'Now argue the strongest case against this recommendation. What are the 5 biggest risks and failure modes?' Document which objections you hadn't considered.", hint: "The adversarial output is often more valuable than the recommendation itself." },
      { text: "Design a quality rubric (4-6 criteria) for evaluating AI-generated user stories on your team. Apply it to 10 AI-generated stories and score them.", hint: "Good criteria: specificity (1-5), testability (1-5), INVEST compliance (pass/fail), stakeholder clarity (1-5)." },
    ],
    studyTask: "Apply the PM Quality Rubric to a full AI-generated PRD section (min. 500 words). Mark every claim requiring a source. Run the adversarial loop on the core recommendation. Document your quality score per criterion and the human edits required before this document would be shareable with a stakeholder.",
    rubric: "Evaluate rubric design quality, source verification rigor, and adversarial loop insight depth.",
    sandboxPrompt: "Submit your annotated PRD section with quality scores, source flags, and adversarial loop output.",
    feedbackCriteria: ["Rubric Criterion Design", "Source Verification Rigor", "Adversarial Loop Depth", "Editorial Decision Quality"],
    feedbackOverall: "Quality control is the unsexy competency that separates trusted AI practitioners from reckless ones. Your rubric is now a reusable team artifact.",
    feedbackSuggestions: ["Share your quality rubric with your team — suggest using it as a pre-review checklist for any AI-assisted document.", "The adversarial loop prompt is invaluable for roadmap reviews and strategy documents.", "Consider a 'confidence level' label (High/Medium/Low) for every AI-generated section in shared documents."],
    feedbackNextStep: "Stage 6 integrates everything into repeatable AI-powered PM workflows.",
  },
  {
    title: "Building Repeatable AI-Powered PM Workflows",
    valueProp: "The PMs with the highest AI leverage aren't the best prompters — they're the most systematic. They've built libraries, templates, and SOPs that encode their best prompts once and deploy them consistently. This stage is about converting individual technique into team infrastructure.",
    covers: [
      "The PM prompt library: organizing prompts by workflow stage (discovery, planning, documentation, communication)",
      "Prompt versioning: tracking prompt iterations the way engineers track code",
      "SOPs for AI-assisted workflows: standardizing when AI is used and what validation is required",
      "Meeting synthesis: turning Otter.ai or Fireflies transcripts into decision logs via AI",
      "Stakeholder update automation: using AI to draft weekly updates from task tracker data",
      "Research synthesis pipelines: Dovetail + AI workflow for ongoing user insight processing",
      "The 'second brain' approach: Notion AI + personal knowledge management for PMs",
      "Building AI workflow documentation your team can fork and adopt",
    ],
    videos: [
      { title: "Building a PM AI Workflow System — John Cutler Substack", channel: "John Cutler", youtubeId: "j8ygEJP_OP8", duration: "~40 min", type: "video", searchQuery: "John Cutler PM AI workflow system productivity 2024" },
      { title: "AI Productivity Stack for Product Teams — Lenny's Newsletter", channel: "Lenny's Newsletter", youtubeId: "LiZTFdV0Z-Q", duration: "~55 min", type: "video", searchQuery: "Lenny's Newsletter AI productivity stack product teams 2024" },
    ],
    exerciseTexts: [
      { text: "Build a personal prompt library in Notion or your tool of choice. Organize by: (1) discovery, (2) documentation, (3) stakeholder communication, (4) analysis. Minimum 3 prompts per category.", hint: "Each entry should have: prompt text, model recommendation, example output, last-used date." },
      { text: "Take a meeting transcript (Otter.ai export or handwritten notes) and build a 3-prompt chain that produces: (1) decision log, (2) action items with owners, (3) stakeholder update email.", hint: "Test the chain with a real or fictional meeting. The quality of the output depends heavily on the transcript quality — note this in your SOP." },
      { text: "Write a 1-page AI Workflow SOP for one recurring PM task (e.g., weekly status update, sprint retrospective, user research synthesis). Define: when AI is used, what prompt is used, what validation step is required before sharing.", hint: "The validation step is the most important part of the SOP. It's where you maintain accountability." },
    ],
    studyTask: "Build a complete PM prompt library (minimum 12 prompts across 4 categories) and document one full workflow SOP. Present the SOP as if you were onboarding a new PM on your team — include the rationale for each step, the risk of skipping the validation gate, and an example output with quality annotations.",
    rubric: "Evaluate prompt library completeness, SOP clarity, validation gate design, and onboarding readiness.",
    sandboxPrompt: "Submit your prompt library (Notion link or document) and your complete workflow SOP with example output.",
    feedbackCriteria: ["Prompt Library Organization", "SOP Validation Gate Design", "Workflow Completeness", "Team Shareability"],
    feedbackOverall: "This is the module that compounds. Every prompt you add to your library multiplies the value of all future stages. The SOP is your first step toward team-level AI adoption.",
    feedbackSuggestions: ["Version your prompt library — add a 'last validated' date to prompts older than 6 months as models update.", "Share your SOP with one colleague and ask: 'Would you trust this process without me explaining it?' Their confusion points are your documentation gaps.", "The meeting synthesis chain is the highest-ROI workflow for most PMs — deploy it immediately."],
    feedbackNextStep: "Stage 7 addresses stakeholder communication — your most visible and highest-stakes AI application.",
  },
  {
    title: "AI-Powered Stakeholder Communication",
    valueProp: "Stakeholder communication is the highest-stakes output a PM produces. AI can accelerate drafting, tailor tone, and surface blind spots — but the judgment about what to communicate, what to omit, and when to be transparent must stay entirely with you. This stage is about intelligent augmentation, not delegation.",
    covers: [
      "Stakeholder mapping with AI: identifying communication needs by audience and decision authority",
      "Tone calibration prompts: adjusting AI output from 'PM-speak' to C-suite language",
      "Difficult conversation scaffolding: using AI to prepare for pushback, objections, and bad news delivery",
      "Roadmap narrative construction: turning a prioritized backlog into a compelling story",
      "OKR framing: using AI to translate feature work into business outcome language",
      "Async communication design: AI-assisted Loom scripts, meeting agendas, and follow-up summaries",
      "The 'red team your comms' technique: prompting AI to anticipate stakeholder objections before you send",
      "When not to use AI: communications requiring organizational context, political nuance, or personal credibility",
    ],
    videos: [
      { title: "Communicating Roadmap Decisions to Executives — Mind the Product", channel: "Mind the Product", youtubeId: "nXHEXKR59_8", duration: "~40 min", type: "video", searchQuery: "Mind the Product communicating roadmap decisions executives 2024" },
      { title: "Storytelling for Product Managers — Reforge", channel: "Reforge", youtubeId: "9sT_kQyL0hk", duration: "~50 min", type: "video", searchQuery: "Reforge storytelling product managers stakeholders 2024" },
    ],
    exerciseTexts: [
      { text: "Take a feature delay scenario and write 3 stakeholder updates: one for engineering, one for design, one for the exec team. Use AI for first drafts, then manually edit for organizational context. Document your edits.", hint: "The exec version should lead with business impact. The engineering version should lead with technical root cause. Your edits reveal your organizational intelligence — that's the human layer AI can't replicate." },
      { text: "Run the 'red team your comms' prompt on a roadmap update you've written: 'What are the 5 hardest questions a skeptical CFO would ask after reading this? Draft responses to each.'", hint: "Prepare for the hardest questions, not the most likely ones. If you can answer the hardest questions, you can answer anything." },
      { text: "Build a 'roadmap narrative' from a prioritized backlog using AI. The output should tell a coherent story about why these priorities are in this order, what they unlock, and what they deliberately exclude.", hint: "The exclusion narrative is often the most powerful part. 'We're not doing X because...' signals strategic clarity." },
    ],
    studyTask: "Draft a complete stakeholder communication package for a feature launch: (1) engineering brief, (2) executive one-pager, (3) customer-facing release note. Use AI for all three first drafts. Apply manual edits for organizational context. Submit with edit annotations and the rationale for each human override.",
    rubric: "Evaluate audience differentiation, organizational context integration, and quality of human override rationale.",
    sandboxPrompt: "Submit all 3 communication artifacts with edit annotations and override rationale.",
    feedbackCriteria: ["Audience Tone Differentiation", "Organizational Context Integration", "Override Rationale Quality", "Stakeholder Readiness"],
    feedbackOverall: "Stakeholder communication is where trust is built or lost. The edit annotation discipline is what separates a PM who uses AI from a PM who's accountable for AI-assisted output.",
    feedbackSuggestions: ["The red team prompt is most valuable before exec reviews — run it every time before a major presentation.", "Build a 'stakeholder voice' file: examples of how each key stakeholder writes and thinks. Feed this to AI for more accurate tone calibration.", "Never send an AI-first draft to an exec without reading it out loud first. If it sounds like a template, it reads like one."],
    feedbackNextStep: "The final stage brings this all together into your capstone — a complete AI-augmented PM workflow system.",
  },
  {
    title: "Capstone: Your AI-Augmented PM Operating System",
    valueProp: "Individual techniques compound into a system. Your capstone is not a deliverable — it's a working operating system that makes you demonstrably faster, more thorough, and more credible than a PM who relies on raw effort. This is the artifact you bring to your next performance review.",
    covers: [
      "Designing your personal AI PM operating system: mapping your workflows to AI capability tiers",
      "Building a prompt audit: reviewing your library for gaps, outdated models, and missing workflows",
      "Integrating AI tools into your existing PM stack (Jira, Notion, Linear, Productboard)",
      "Measuring AI ROI: time saved per workflow, output quality metrics, revision rate reduction",
      "Team adoption strategy: introducing AI workflows to a skeptical team",
      "Staying current: following model releases, new tool integrations, and capability unlocks",
      "Ethical boundaries: where AI assistance crosses into misrepresentation or accountability gaps",
      "Portfolio presentation: how to demonstrate AI PM competency in hiring contexts",
    ],
    videos: [
      { title: "Building an AI-First Product Team Culture — Lenny Rachitsky", channel: "Lenny's Newsletter", youtubeId: "pF8eG7E6gXQ", duration: "~1 hr", type: "video", searchQuery: "Lenny Rachitsky AI-first product team culture 2024" },
      { title: "The Future of Product Management and AI — NeurIPS Workshop", channel: "NeurIPS", youtubeId: "kB8XCYj9hJk", duration: "~55 min", type: "video", searchQuery: "NeurIPS future product management AI 2024 workshop" },
    ],
    exerciseTexts: [
      { text: "Conduct a full audit of your prompt library: (1) identify 3 workflows with no AI coverage, (2) identify 2 prompts that need updating for the latest model capabilities, (3) identify 1 workflow where you're over-relying on AI.", hint: "The over-reliance identification is the hardest and most honest part of this audit. Trust your gut on where output quality doesn't meet your standard." },
      { text: "Write a 1-page 'AI PM Competency Statement' for your portfolio — what you can do now, how you verify output quality, and where you draw the accountability line.", hint: "This is a hiring artifact. Frame it around outcomes and judgment, not tools. 'I use AI to compress research synthesis from 3 days to 3 hours' is stronger than 'I use ChatGPT.'." },
      { text: "Map your current PM workflow to a capability matrix: (1) fully automatable, (2) AI-assisted with validation, (3) human-only. Identify your 3 highest-ROI AI automation opportunities.", hint: "Be honest about category 3. The human-only category is where your value as a senior PM is concentrated." },
    ],
    studyTask: "Produce your complete AI PM Operating System documentation: prompt library (minimum 15 entries), workflow map with AI capability tiers, one team-ready SOP, and your 1-page competency statement. This is your capstone artifact — treat it as a portfolio piece that reflects the full curriculum.",
    rubric: "Evaluate system completeness, prompt library depth, SOP quality, and competency statement clarity.",
    sandboxPrompt: "Submit your complete AI PM Operating System package as a shareable document link.",
    feedbackCriteria: ["System Architecture Completeness", "Prompt Library Depth", "Competency Statement Strength", "Team Adoption Readiness"],
    feedbackOverall: "You now have an AI-augmented PM operating system that is documentable, shareable, and demonstrable. This is the competency portfolio that separates senior AI-native PMs from practitioners who are still figuring out the basics.",
    feedbackSuggestions: ["Publish your competency statement on LinkedIn — it signals a level of AI literacy that is still rare and valuable.", "Review your workflow capability matrix every 6 months as model capabilities expand.", "Offer to run an AI workflow workshop for your team using the SOP you built — teaching is the fastest way to deepen mastery."],
    feedbackNextStep: "You've completed the curriculum. Return to any stage for a deeper pass — most practitioners find Stage 2 and Stage 5 yield the biggest second-pass gains.",
  },
];

// ─── UX Research with AI Tools ────────────────────────────────────────────────
const UX_RESEARCH_AI: StageDef[] = [
  {
    title: "The AI-Augmented Research Landscape",
    valueProp: "The UX research field is being restructured by AI tools — not replaced. Researchers who understand where AI adds genuine value (synthesis, pattern detection, scale) versus where it introduces risk (interpretation, participant safety, contextual nuance) will define the next generation of research practice.",
    covers: [
      "The 2024-2025 AI tool landscape for UXR: Dovetail AI, Maze AI, UserTesting AI, Grain, EnjoyHQ",
      "What AI does well in research: transcript processing, theme clustering, survey analysis, affinity mapping",
      "What AI cannot do: interpret emotional subtext, exercise ethical judgment, build participant rapport",
      "The synthesis bottleneck: why 70% of research time is synthesis and how AI addresses it",
      "AI hallucination risk in research contexts: fabricated insights, cherry-picked quotes, pattern overfit",
      "The ReOps dimension: how AI tools are restructuring research operations at scale",
      "Current practitioner debate: AI synthesis quality vs. researcher interpretation depth",
      "Building your personal AI research stack: tool selection criteria for your research context",
    ],
    videos: [
      { title: "AI in UX Research — NNG (Nielsen Norman Group)", channel: "Nielsen Norman Group", youtubeId: "LE-6LNiDpnE", duration: "~45 min", type: "video", searchQuery: "Nielsen Norman Group AI UX research 2024 synthesis" },
      { title: "The State of AI in UXR — UXR Conf 2024", channel: "UXR Conf", youtubeId: "8ZnmFHjTbSE", duration: "~50 min", type: "video", searchQuery: "UXR Conf 2024 AI state UX research synthesis tools" },
    ],
    exerciseTexts: [
      { text: "Audit your current research toolstack: list every tool you use, identify where AI features have been added in the past 12 months, and flag any you haven't evaluated.", hint: "Check Dovetail, UserTesting, Maze, Hotjar, and Optimal Workshop for recent AI feature announcements." },
      { text: "Run the same 500-word interview transcript through two different AI synthesis tools (Dovetail AI and Claude directly). Document 5 differences in theme identification.", hint: "Purposely include one ambiguous participant quote. Watch how each tool handles interpretation uncertainty." },
      { text: "Write a 1-page 'AI Research Ethics Memo' for your team: what AI tasks are approved, what validation is required, what is prohibited.", hint: "The memo should cover: participant consent language, AI synthesis disclosure, quote attribution accuracy, and bias audit requirements." },
    ],
    studyTask: "Map your current research workflow to an AI capability matrix: (1) AI handles, (2) AI assists + human validates, (3) human-only. Identify your 3 highest-value AI integration points and document the validation gate for each. This is your research AI adoption roadmap.",
    rubric: "Evaluate landscape understanding, tool comparison depth, and ethics memo quality.",
    sandboxPrompt: "Submit your research AI capability matrix and ethics memo.",
    feedbackCriteria: ["Landscape Assessment Accuracy", "Tool Comparison Rigor", "Ethics Memo Completeness", "Validation Gate Design"],
    feedbackOverall: "Understanding the landscape before picking tools is the discipline that prevents expensive tool switches and adoption failures. Your ethics memo is a team-level artifact.",
    feedbackSuggestions: ["Share your ethics memo in your team's research Notion or Confluence — it signals maturity and protects the team.", "Subscribe to Dovetail's and NNG's AI research updates — the tool landscape is moving fast.", "The capability matrix is worth revisiting every 6 months as tools add features."],
    feedbackNextStep: "Stage 2 goes deep on AI-assisted interview synthesis — your highest-ROI application area.",
  },
  {
    title: "AI-Assisted Interview Synthesis",
    valueProp: "Manual interview synthesis is the single largest time sink in UX research. AI tools can compress a 3-day synthesis sprint into 3 hours — but only if you build the workflow correctly. The validation discipline is what keeps your insights accurate when AI is moving fast.",
    covers: [
      "Pre-synthesis prep: transcript quality requirements for AI processing",
      "The OCER framework for AI synthesis: Observations → Clustering → Evidence → Recommendation",
      "Feeding transcripts to Claude with structured extraction prompts",
      "Theme validation: cross-referencing AI-extracted themes against raw transcript evidence",
      "Quote attribution verification: ensuring AI-cited quotes are verbatim and in-context",
      "Dovetail AI synthesis workflow: auto-tagging, clustering, and insight generation",
      "Handling contradictory participant data: when AI consensus masks meaningful dissent",
      "Synthesis speed targets: benchmarks for AI-assisted vs. manual synthesis quality",
    ],
    videos: [
      { title: "How to Synthesize UX Research with AI Tools — Dovetail", channel: "Dovetail", youtubeId: "K2eHSV0vmUY", duration: "~35 min", type: "video", searchQuery: "Dovetail AI synthesis UX research workflow 2024" },
      { title: "Interview Analysis at Scale — Google UXR Team", channel: "Google Design", youtubeId: "aJiLP_Uv9Yo", duration: "~45 min", type: "video", searchQuery: "Google UXR team interview analysis scale synthesis 2024" },
    ],
    exerciseTexts: [
      { text: "Take 3 user interview transcripts and run the OCER framework using Claude. Prompt: 'Extract observations from these transcripts. Cluster into themes. Provide evidence quote for each theme. Draft one recommendation per theme cluster.'", hint: "Process each stage separately with a new prompt. Don't stack all 4 stages in one prompt — you lose specificity." },
      { text: "Run a quote attribution audit: take 10 AI-extracted quotes and verify each against the source transcript. Document any paraphrasing, context loss, or inaccuracies.", hint: "Even excellent AI tools paraphrase. The audit habit prevents misquoting participants in stakeholder presentations." },
      { text: "Compare the time required for AI-assisted synthesis vs. a manual sticky-note exercise on the same 3 transcripts. Document quality differences alongside time differences.", hint: "Track both time and error rate. Speed without accuracy is a liability, not an advantage." },
    ],
    studyTask: "Conduct a full AI-assisted synthesis sprint on 5 interview transcripts (real or realistic): run the OCER framework, validate all quotes, identify 3 insight themes, and produce a 1-page research brief with evidence attribution. Include a quality audit log comparing AI output to manual spot-checks.",
    rubric: "Evaluate OCER framework execution, quote attribution accuracy, and synthesis brief quality.",
    sandboxPrompt: "Submit your synthesis brief with evidence attribution table and quality audit log.",
    feedbackCriteria: ["OCER Framework Execution", "Quote Attribution Accuracy", "Theme Evidence Strength", "Brief Stakeholder Readiness"],
    feedbackOverall: "AI-assisted synthesis is the most transformative skill in this curriculum for researchers. The validation discipline is what makes you trustworthy when reporting AI-assisted findings.",
    feedbackSuggestions: ["Build a reusable OCER prompt template — save it with variations for interviews, surveys, and diary study data.", "The quote audit process can be partially automated with a second AI prompt: 'Verify these quotes against the source transcript and flag any paraphrasing.'", "Run your synthesis brief by one colleague before presenting. Their confusion points are your clarity gaps."],
    feedbackNextStep: "Stage 3 extends synthesis skills to survey analysis and quantitative signals.",
  },
  {
    title: "Survey Design and Quantitative Analysis with AI",
    valueProp: "Survey design is where poor research habits compound fastest — leading questions, ambiguous scales, and sampling bias are easy to miss manually but increasingly detectable by AI. AI also unlocks rapid quantitative analysis for researchers who aren't statisticians.",
    covers: [
      "Common survey design errors and how AI identifies them: leading questions, double-barreled items, scale inconsistency",
      "Using Claude to audit survey instruments before launch",
      "Likert scale design: AI-assisted optimization for response spread and reliability",
      "Open-text analysis at scale: thematic coding of 500+ survey responses with AI",
      "Statistical basics for UX researchers: mean, median, standard deviation in context",
      "Cross-tabulation prompting: 'Compare satisfaction scores between power users and casual users'",
      "Identifying response bias: acquiescence bias, social desirability, and AI detection approaches",
      "Survey synthesis to insight: from raw data to a 3-bullet executive summary",
    ],
    videos: [
      { title: "Survey Design Best Practices for UX Research — NNG", channel: "Nielsen Norman Group", youtubeId: "t-YXb-xyOGA", duration: "~40 min", type: "video", searchQuery: "NNG Nielsen Norman survey design best practices UX research" },
      { title: "Quantitative UX Research Methods — CSCW Conference", channel: "ACM SIGCHI", youtubeId: "WaFfUWJsGSA", duration: "~55 min", type: "video", searchQuery: "CSCW quantitative UX research methods analysis 2024" },
    ],
    exerciseTexts: [
      { text: "Take an existing survey (yours or a public example) and prompt Claude to audit it: 'Identify every leading question, double-barreled item, and ambiguous scale option. Suggest rewrites for each issue found.'", hint: "Use a survey of minimum 10 questions. The AI audit is most valuable on items you wrote yourself — it surfaces your blind spots." },
      { text: "Feed 100 open-text survey responses (real or AI-generated) to Claude and prompt: 'Cluster these responses into themes. Count frequency per theme. Identify the most unexpected response category.'", hint: "The 'unexpected category' prompt is particularly valuable — it surfaces insights you wouldn't have searched for." },
      { text: "Write an executive summary of a survey dataset using the '3-bullet + so what' format: 3 findings, each with a 'so what' implication for product decision-making.", hint: "The 'so what' is what makes research actionable. A finding without an implication is just a data point." },
    ],
    studyTask: "Design a 10-question survey for a real or realistic research question, run a full AI audit and revise all flagged items, generate 100 synthetic responses using AI (clearly labeled as synthetic), analyze the open-text responses using Claude, and produce a 1-page summary with 3 actionable insights.",
    rubric: "Evaluate survey instrument quality, audit response quality, open-text analysis depth, and insight actionability.",
    sandboxPrompt: "Submit your original and revised survey, AI audit log, synthetic dataset, and 1-page insights summary.",
    feedbackCriteria: ["Survey Instrument Quality", "Audit Response Thoroughness", "Open-Text Theme Validity", "Insight Actionability"],
    feedbackOverall: "Survey design quality is a direct proxy for research credibility. The AI audit habit will prevent embarrassing methodology questions in stakeholder reviews.",
    feedbackSuggestions: ["Add the AI survey audit to your pre-launch research checklist — make it a required step before any survey goes live.", "The synthetic data generation technique is valuable for testing analysis workflows before real data arrives.", "The '3-bullet + so what' format works for any data type — it's a universal insight presentation template."],
    feedbackNextStep: "Stage 4 covers usability testing and moderated research with AI assistance.",
  },
  {
    title: "Moderated Research and Usability Testing with AI",
    valueProp: "AI cannot replace the human relationship in moderated research — but it can handle every administrative and documentation task that currently eats researchers' time, freeing you to be fully present with participants. The researchers who master this hybrid approach run twice the research at the same effort cost.",
    covers: [
      "AI-generated discussion guides: prompting Claude for question banks by research objective",
      "Discussion guide audit: having AI identify leading questions and missing probe chains",
      "Live session transcription: Otter.ai, Fireflies, and Grain for real-time AI transcription",
      "Post-session AI note-taking: converting AI transcripts into structured observation logs",
      "Usability test task design: AI-assisted task scenario writing for naturalistic behavior",
      "Task success rate analysis: prompting AI to score task completion from observation notes",
      "Think-aloud analysis: extracting cognitive load signals from verbalized thoughts",
      "Participant quote tagging and insight library building with Dovetail AI",
    ],
    videos: [
      { title: "Running Usability Tests Efficiently — NNG Video", channel: "Nielsen Norman Group", youtubeId: "RyGFEmimRAs", duration: "~40 min", type: "video", searchQuery: "NNG Nielsen Norman usability testing efficiency methods 2024" },
      { title: "AI Tools for User Research Operations — Dovetail 2024", channel: "Dovetail", youtubeId: "mNdBbwH7ioE", duration: "~35 min", type: "video", searchQuery: "Dovetail AI tools user research operations efficiency 2024" },
    ],
    exerciseTexts: [
      { text: "Generate a complete discussion guide for a usability test of a mobile checkout flow using AI. Prompt: 'Generate a 45-minute moderated usability test discussion guide for [feature]. Include: intro script, task scenarios, probe questions per task, and debrief questions.'", hint: "Then audit the guide with a second prompt: 'Identify any leading questions or missing probes in this discussion guide.'" },
      { text: "Take a usability session transcript and prompt Claude to extract: (1) task success/failure indicators, (2) verbalized confusion points, (3) unexpected user behaviors, (4) participant-suggested improvements.", hint: "Structure each extraction as a separate prompt. Build a structured observation log template and populate it." },
      { text: "Run an insight-to-recommendation chain: from 3 usability observations, generate 3 design recommendations. Then have AI prioritize them by implementation effort vs. user impact.", hint: "The prioritization matrix prompt: 'Rate these recommendations on a 1-5 scale for: implementation effort (1=low effort), user impact (5=high impact). Produce a 2x2 matrix output.'" },
    ],
    studyTask: "Design and document a complete usability test: write the discussion guide, run a 20-minute moderated session (with a colleague, friend, or yourself as participant), transcribe with AI tools, extract insights using structured prompts, and produce a 1-page findings brief with 3 prioritized recommendations.",
    rubric: "Evaluate discussion guide quality, observation extraction depth, recommendation specificity, and brief stakeholder readiness.",
    sandboxPrompt: "Submit your discussion guide, AI-extracted observation log, and findings brief.",
    feedbackCriteria: ["Discussion Guide Quality", "Observation Extraction Depth", "Recommendation Specificity", "Research Efficiency Gain"],
    feedbackOverall: "This is the module that makes AI-assisted research feel real. Running an actual session, even a short one, grounds every technique in practice.",
    feedbackSuggestions: ["Build a reusable discussion guide template library for your 3 most common research types.", "The 2x2 prioritization prompt works on any list of options — it's a universal decision-making tool.", "Record your next real usability session and compare your manual notes with the AI-generated transcript. The gaps are your learning edge."],
    feedbackNextStep: "Stage 5 covers Research Operations and scaling your research practice with AI.",
  },
  {
    title: "Research Operations and AI-Scaled Insight Systems",
    valueProp: "ReOps is now an org design problem. AI tools make it possible for a team of 2 to run the insight infrastructure of a team of 8 — but only if the systems are designed intentionally. This stage is about building research infrastructure, not just research reports.",
    covers: [
      "The ReOps maturity model: from ad hoc research to insight infrastructure",
      "Building an insight repository: tagging taxonomy, search architecture, and AI-powered retrieval",
      "Continuous discovery infrastructure: automating the research intake and synthesis pipeline",
      "Participant panel management with AI: screening, scheduling, and consent at scale",
      "Research request triage: using AI to assess research value and prioritize requests",
      "Cross-functional insight distribution: pushing relevant research to PM, design, and engineering",
      "Research ROI documentation: quantifying the impact of research decisions with AI-assisted tracking",
      "AI content moderation for research repositories: managing quality and compliance at scale",
    ],
    videos: [
      { title: "Building a Research Ops Function — Dovetail ReOps Summit", channel: "Dovetail", youtubeId: "E9GaJrDrIiY", duration: "~50 min", type: "video", searchQuery: "Dovetail ReOps summit building research operations function 2024" },
      { title: "Scaling UX Research — Google Research Operations", channel: "Google Design", youtubeId: "Dz7GJ6nB3Rk", duration: "~45 min", type: "video", searchQuery: "Google research operations scaling UX research infrastructure 2024" },
    ],
    exerciseTexts: [
      { text: "Design a tagging taxonomy for a research insight repository: minimum 4 top-level categories, 3 sub-tags per category, and a naming convention. Use AI to stress-test it: 'What insights would be hard to find in this taxonomy and why?'", hint: "Good top-level categories typically include: user segment, product area, insight type, and decision relevance. The stress-test prompt surfaces gaps you can't see from inside the system." },
      { text: "Build a 'research request intake form' and a corresponding AI triage prompt that scores each request on: research value (1-5), time sensitivity (1-5), and feasibility (1-5).", hint: "The scoring prompt should produce a prioritized queue output. Test it with 5 fictional research requests of varying quality." },
      { text: "Map a continuous discovery pipeline: what triggers a research cycle, what AI steps process the data, what human validation gates exist, and how insights are distributed to stakeholders.", hint: "Use a flowchart or written process map. Each AI step should have a corresponding human gate. Automation without oversight is a liability." },
    ],
    studyTask: "Design a complete ReOps infrastructure for a 2-person research team at a mid-stage startup: insight repository taxonomy, research request triage system, continuous discovery pipeline map, and a 1-page quarterly research impact report template. This is your ReOps founding document.",
    rubric: "Evaluate taxonomy design quality, triage system clarity, pipeline completeness, and impact reporting framework.",
    sandboxPrompt: "Submit your complete ReOps infrastructure document package.",
    feedbackCriteria: ["Taxonomy Design Quality", "Triage System Clarity", "Pipeline Completeness", "Impact Reporting Framework"],
    feedbackOverall: "ReOps design is the highest-leverage contribution a senior researcher makes to an organization. This document is a portfolio piece that demonstrates operational maturity.",
    feedbackSuggestions: ["Share your ReOps infrastructure document with your current team — even partial adoption adds value.", "The research ROI framework is worth investing extra time in — research teams that can quantify impact are more protected in budget cuts.", "Present your continuous discovery pipeline to your PM team. Alignment on research triggers dramatically improves research relevance."],
    feedbackNextStep: "Stage 6 is the strategic layer: insight communication and research influence.",
  },
  {
    title: "Strategic Insight Communication and Research Influence",
    valueProp: "Research that isn't used isn't research — it's documentation. The most technically excellent researchers in an organization can be systematically ignored if they can't communicate insights in the language of decision-making. This stage closes the research-to-action gap.",
    covers: [
      "The insight communication gap: why most research reports don't change decisions",
      "The SCQA framework for research storytelling: Situation, Complication, Question, Answer",
      "Executive research briefs: 1-page format that drives decisions in 3 minutes",
      "Research roadmaps: communicating a 6-month research agenda as a strategic narrative",
      "Stakeholder-specific translation: reframing the same finding for PM, design, engineering, and exec",
      "Insight activation workshops: using AI to design research read-outs that drive action",
      "Research influence metrics: tracking decision adoption rate, research citation rate, and strategy alignment",
      "Building a research culture: AI-assisted onboarding, training, and research literacy programs",
    ],
    videos: [
      { title: "Communicating Research to Executives — NNG Conference Talk", channel: "Nielsen Norman Group", youtubeId: "nLsFKMQN0aA", duration: "~45 min", type: "video", searchQuery: "NNG communicating UX research executives stakeholders influence 2024" },
      { title: "Research Storytelling and Influence — UXR Conf 2024", channel: "UXR Conf", youtubeId: "j4HLCzrPhMQ", duration: "~40 min", type: "video", searchQuery: "UXR Conf 2024 research storytelling influence decision making" },
    ],
    exerciseTexts: [
      { text: "Take a 5-page research report and distill it to a 1-page SCQA executive brief using AI. Then have AI critique the brief: 'What decision would an executive make after reading this? What question is unanswered that would block that decision?'", hint: "The 'what decision' question is the test. If the answer is unclear, the brief needs restructuring." },
      { text: "Take a single insight and write 4 stakeholder translations: (1) PM, (2) design lead, (3) engineering lead, (4) CEO. Document the framing differences.", hint: "CEO framing: business risk and opportunity. PM: backlog implication. Design: user goal revision. Engineering: constraint discovery." },
      { text: "Design a 30-minute 'research activation workshop' agenda using AI. The goal: get a cross-functional team to 3 actionable decisions from 5 research insights in 30 minutes.", hint: "Good activation workshops use voting, dot-mapping, or HMW framing to convert insights to actions quickly. Have AI generate each activity with timing." },
    ],
    studyTask: "Select a real or realistic research project. Produce the full communication package: SCQA executive brief, 4 stakeholder translations, and a 30-minute activation workshop agenda. Submit with a reflection: which communication artifact required the most human judgment to produce, and why?",
    rubric: "Evaluate SCQA brief quality, stakeholder translation accuracy, workshop design effectiveness, and reflection depth.",
    sandboxPrompt: "Submit your complete strategic communication package with reflection.",
    feedbackCriteria: ["SCQA Brief Clarity", "Stakeholder Translation Quality", "Workshop Design Effectiveness", "Reflection Depth"],
    feedbackOverall: "Research influence is the final multiplier on research quality. The SCQA brief and stakeholder translation skills will change how your work is received from the first time you apply them.",
    feedbackSuggestions: ["The SCQA brief is the single format that gets the most return on practice — apply it to your next 3 research projects before using any other format.", "Track your decision adoption rate: how many decisions in the next quarter cite research you produced? This is your influence metric.", "Offer to run an activation workshop for your next major research readout. The format works regardless of AI assistance."],
    feedbackNextStep: "Capstone: apply the full AI-augmented research toolkit to a complete research project.",
  },
  {
    title: "Capstone: End-to-End AI-Augmented Research Project",
    valueProp: "Competency is proven through a complete project, not individual techniques. Your capstone demonstrates that you can orchestrate AI tools across the full research lifecycle — from design to synthesis to strategic communication — with the judgment to know when to trust AI and when to override it.",
    covers: [
      "Full lifecycle planning: scoping a research project with AI and human judgment layers",
      "Research brief writing: purpose, questions, methodology, participants, and success criteria",
      "AI-assisted recruitment screener design and participant communication",
      "Multi-method synthesis: combining interview, survey, and usability data with AI",
      "Insight triangulation: validating AI-extracted themes across multiple data sources",
      "Research portfolio presentation: structuring case studies for hiring and promotion",
      "Personal research methodology statement: your documented approach to AI integration",
      "Continuous learning: staying current with UXR and AI tool developments",
    ],
    videos: [
      { title: "End-to-End UX Research Process — Google UXR", channel: "Google Design", youtubeId: "gPk_YcZPG_s", duration: "~55 min", type: "video", searchQuery: "Google UXR end-to-end UX research process case study 2024" },
      { title: "UXR Portfolio and Career Development — UXR Conf 2024", channel: "UXR Conf", youtubeId: "bkNZ_uEWWaQ", duration: "~40 min", type: "video", searchQuery: "UXR Conf 2024 portfolio career development UX researcher" },
    ],
    exerciseTexts: [
      { text: "Conduct a complete mini research project in 90 minutes: (1) write a research brief, (2) design a 5-question discussion guide, (3) run a 20-minute session, (4) synthesize with AI, (5) produce a 1-page brief.", hint: "The 90-minute constraint is deliberate — it forces prioritization and prevents perfectionism from blocking completion." },
      { text: "Write your personal AI research methodology statement: what AI tools you use, at what stages, with what validation gates, and what you will never automate. This is a hiring artifact.", hint: "Frame the 'never automate' section around ethical commitments, not just capability limits. It signals values and judgment." },
      { text: "Structure a research portfolio case study: research brief, methodology rationale, AI tool usage log with validation notes, key insights, business decision outcome, and your reflection on what AI got wrong.", hint: "The 'what AI got wrong' section is the most differentiating part. It demonstrates critical evaluation, not tool promotion." },
    ],
    studyTask: "Produce your complete capstone research project: full brief, multi-method data collection, AI-assisted synthesis with validation log, SCQA executive brief, and portfolio case study documentation. Include your personal AI research methodology statement as an appendix. This is your curriculum completion artifact.",
    rubric: "Evaluate project scoping, methodology execution, synthesis quality, communication effectiveness, and reflection depth.",
    sandboxPrompt: "Submit your complete capstone research project package as a shareable document or Notion page.",
    feedbackCriteria: ["Research Brief Quality", "AI Integration Sophistication", "Synthesis Validation Rigor", "Portfolio Readiness", "Methodology Statement Depth"],
    feedbackOverall: "You've completed a full AI-augmented research curriculum. The validation discipline you've built — knowing when to trust AI and when to override it — is the competency that will define research practice over the next decade.",
    feedbackSuggestions: ["Publish your portfolio case study on your website or UX Collective — AI-augmented research methodology is still underrepresented in public portfolios.", "Submit your capstone brief to your current research team for feedback. External critique sharpens the work.", "Return to Stage 2 (synthesis) and Stage 6 (communication) in 6 months — those are the stages where compounding practice yields the biggest gains."],
    feedbackNextStep: "Curriculum complete. Revisit any stage for depth. Share your capstone — the field advances when practitioners publish their methodology.",
  },
];

// ─── Design Systems at Scale ──────────────────────────────────────────────────
const DESIGN_SYSTEMS: StageDef[] = [
  {
    title: "Design System Foundations and Token Architecture",
    valueProp: "Most design systems fail not at the component level but at the foundation level. Tokens are the architectural layer that makes a design system scalable, maintainable, and AI-compatible — and the decisions made here compound across every component, theme, and platform integration that follows.",
    covers: [
      "What design tokens are and why they're the load-bearing structure of a scalable system",
      "Token taxonomy: global → alias → component tokens and the semantic naming convention",
      "Color system design: primitive, semantic, and component-scoped color tokens",
      "Typography tokens: type scale, font weight, and line-height as systematic decisions",
      "Spacing and sizing scales: mathematical progressions vs. arbitrary values",
      "The W3C Design Token Community Group format: why standardization matters for tooling",
      "Token storage and distribution: Style Dictionary, Tokens Studio for Figma, GitHub integration",
      "AI and tokens: how Figma Make and AI-generated UI interact with token systems",
    ],
    videos: [
      { title: "Design Token Architecture Deep Dive — Config 2024", channel: "Figma", youtubeId: "c_pjWUqUiuM", duration: "~45 min", type: "video", searchQuery: "Figma Config 2024 design token architecture deep dive" },
      { title: "Managing Design Tokens at Scale — Brad Frost", channel: "Brad Frost", youtubeId: "wDBEc3dJm7A", duration: "~50 min", type: "video", searchQuery: "Brad Frost design tokens at scale system architecture" },
    ],
    exerciseTexts: [
      { text: "Audit an existing design system (Material Design, IBM Carbon, or a product you know) and map its token hierarchy: identify global, alias, and component tokens. Document gaps and inconsistencies.", hint: "Use Figma's inspect panel or the design system's GitHub repo. Look for where component-specific values are hardcoded instead of tokenized." },
      { text: "Design a color token system for a fictional SaaS product: 8 primitives, 12 semantic aliases (including interactive states), and component-scoped tokens for a button. Use W3C format naming conventions.", hint: "Semantic naming: 'color-interactive-primary-default' is better than 'blue-600'. Name the role, not the value." },
      { text: "Set up a basic Style Dictionary configuration that transforms your color tokens into CSS custom properties, iOS Swift constants, and Android XML values from a single JSON source.", hint: "Start with the Style Dictionary documentation at styledictionary.com. Focus on the transform pipeline concept, not the full output." },
    ],
    studyTask: "Design a complete token foundation for a small product: full color system (primitives + semantic + interactive states), typography scale (5 levels), spacing scale (8 steps), and a Style Dictionary config that exports to CSS. Document your naming decisions and the reasoning behind each token grouping.",
    rubric: "Evaluate token hierarchy completeness, naming convention consistency, and Style Dictionary implementation.",
    sandboxPrompt: "Submit your token system JSON + Style Dictionary config + naming rationale document.",
    feedbackCriteria: ["Token Hierarchy Design", "Naming Convention Consistency", "Cross-Platform Export Quality", "Semantic Clarity"],
    feedbackOverall: "Token architecture is the highest-leverage design system decision. The semantic naming discipline you've built here will make every component faster to build and easier to maintain.",
    feedbackSuggestions: ["Run your token system by a front-end engineer — their friction points are your documentation gaps.", "Add a 'token changelog' as a required step in your system governance process. Breaking token changes need announcement.", "Test your semantic token names with a designer who didn't build them. If they can guess a token's value from its name, you named it well."],
    feedbackNextStep: "Stage 2 builds components on this token foundation.",
  },
  {
    title: "Component Architecture and Governance",
    valueProp: "Component libraries are not just repositories of UI elements — they are contracts between design and engineering. The governance model determines whether your system is adopted broadly or forked endlessly. Architecture and governance decisions compound into either trust or fragmentation.",
    covers: [
      "The Atomic Design spectrum: when atoms, molecules, and organisms are the right abstraction level",
      "Component API design: prop naming conventions, variant architecture, and composability principles",
      "Design-code pairing: ensuring Figma components and code components maintain 1:1 fidelity",
      "Variant architecture in Figma: Component Properties, nested instances, and property inheritance",
      "Interactive states as a first-class design requirement: hover, active, focus, disabled, loading, error",
      "Accessibility compliance built into component architecture: WCAG 2.2 minimum, ARIA roles",
      "Component governance models: cathedral (central team) vs. bazaar (federated contribution)",
      "The 'deprecation first' mindset: removing components is harder than adding them",
    ],
    videos: [
      { title: "Component Architecture at Scale — Figma Config 2024", channel: "Figma", youtubeId: "n_VjjJPuqnI", duration: "~45 min", type: "video", searchQuery: "Figma Config 2024 component architecture scale design system" },
      { title: "Design System Governance — Nathan Curtis", channel: "Nathan Curtis", youtubeId: "BmNAb4-nulY", duration: "~55 min", type: "video", searchQuery: "Nathan Curtis design system governance model contribution 2024" },
    ],
    exerciseTexts: [
      { text: "Audit an existing component (Button, Input, or Card) in a public design system. Map: all variants and states, props and their types, accessibility annotations, and usage guidance. Document what's missing.", hint: "Use IBM Carbon or Atlassian Design System — they have exceptional component documentation that sets a benchmark." },
      { text: "Design a Button component API: define all props (variant, size, iconPosition, loading state, disabled, onClick) with TypeScript-style type definitions. Include an accessibility specification for keyboard navigation and screen reader behavior.", hint: "Think of props as a contract with every engineer who will ever use this component. Every ambiguous prop becomes a support ticket." },
      { text: "Write a component governance decision memo: should your system use cathedral (central team owns all components) or federated contribution? Support your recommendation with 3 specific criteria relevant to your organization type.", hint: "Small startup: federated is too expensive. Enterprise: cathedral doesn't scale. Most teams need a hybrid. Document your hybrid model." },
    ],
    studyTask: "Design and fully document 3 components (Button, Text Input, Card) from the component API down to the Figma implementation: props specification, variant matrix, interactive states, accessibility annotation, and usage guidance. Include a component governance policy for how new components are proposed and approved.",
    rubric: "Evaluate component API completeness, variant coverage, accessibility compliance, and governance policy clarity.",
    sandboxPrompt: "Submit your component documentation set (Figma link or Notion) and governance policy.",
    feedbackCriteria: ["Component API Completeness", "Variant and State Coverage", "Accessibility Specification Quality", "Governance Policy Clarity"],
    feedbackOverall: "Component architecture done at this depth of rigor produces systems that survive team turnover and scale. The governance policy is the artifact most teams skip and later regret.",
    feedbackSuggestions: ["Share your component governance policy with your team's lead engineer before finalizing — their adoption concerns are your policy gaps.", "The accessibility annotation discipline from Stage 2 compounds into every component going forward. Make it non-negotiable.", "Add a 'performance contract' to your component specs: maximum DOM depth, animation restrictions, and bundle size limits."],
    feedbackNextStep: "Stage 3 covers documentation systems — the adoption multiplier.",
  },
  {
    title: "Documentation Systems and Adoption Architecture",
    valueProp: "A design system without great documentation is a design system in name only. The systems with highest adoption rates invest as much in documentation as in components — because documentation is the interface between your system and every designer and engineer who uses it.",
    covers: [
      "The documentation hierarchy: principles → patterns → components → code → changelog",
      "Usage guidelines that actually guide: do/don't examples, context-specific variants, anti-patterns",
      "Storybook as a documentation system: stories, argstables, and accessibility addon integration",
      "Decision logs: documenting the 'why' behind architectural decisions for future maintainers",
      "Search architecture for design system documentation: tagging, naming, and discoverability",
      "Changelog management: semantic versioning, breaking change communication, migration guides",
      "AI-generated documentation: using Claude to draft component documentation from code",
      "Documentation quality signals: adoption rate, support ticket volume, search no-results rate",
    ],
    videos: [
      { title: "Building Documentation Systems for Design Systems — Zeroheight", channel: "Zeroheight", youtubeId: "3XuSEQmIcjY", duration: "~40 min", type: "video", searchQuery: "Zeroheight documentation design systems best practices 2024" },
      { title: "Storybook for Design Systems — Storybook Official", channel: "Storybook", youtubeId: "N_9MdVTGVYk", duration: "~50 min", type: "video", searchQuery: "Storybook design systems official tutorial documentation 2024" },
    ],
    exerciseTexts: [
      { text: "Write a complete usage guide for a Button component: when to use it, which variant for which context, interactive state documentation, accessibility requirements, code example, do/don't examples, and anti-patterns to avoid.", hint: "The anti-patterns section is the most valuable for reducing incorrect usage. 'Don't use the primary button for secondary actions' prevents the most common misuse." },
      { text: "Write a decision log entry for a recent design system decision (real or fictional): context, alternatives considered, decision made, trade-offs accepted, and review date.", hint: "Format: 'We chose [X] over [Y] because [Z]. We accept the trade-off of [A]. We will review this decision when [B] happens.' This format survives team turnover." },
      { text: "Use Claude to generate a first draft of documentation for a component you've built. Review for accuracy, completeness, and tone. Document your editing process — what did AI get wrong?", hint: "AI-generated docs tend to be structurally complete but context-thin. The 'why this design decision' sections always need human authorship." },
    ],
    studyTask: "Build a complete documentation page for one component: usage guidelines, Storybook stories (or equivalent), decision log, changelog entry, and an AI-generated first draft with your human editing annotations. This page should be ready to publish to your real design system.",
    rubric: "Evaluate usage guide clarity, decision log rigor, changelog format, and AI editing insight.",
    sandboxPrompt: "Submit your complete component documentation page and AI editing annotation log.",
    feedbackCriteria: ["Usage Guide Clarity", "Decision Log Rigor", "AI-Assisted Documentation Quality", "Publication Readiness"],
    feedbackOverall: "Documentation quality is a direct predictor of system adoption rate. The decision log habit is the single highest-value change you can make to your documentation practice.",
    feedbackSuggestions: ["Add a 'documentation review' step to your component release checklist — documentation debt accumulates faster than technical debt.", "Track your design system's 'time to first successful use' for new users. Documentation quality is the primary lever on this metric.", "Share your AI-editing annotations with your team — it's a valuable case study for how to use AI in documentation workflows."],
    feedbackNextStep: "Stage 4 covers AI integration with design systems — the frontier topic.",
  },
  {
    title: "AI and the Design System — Integration and Governance",
    valueProp: "AI code generation tools (Figma Make, Copilot, Cursor) are increasingly generating UI code that either uses or bypasses your design system. The organizations building the right governance model for AI-generated UI now will set the standard. This stage is at the frontier of current practice.",
    covers: [
      "How AI code generation interacts with design systems: Figma Make, GitHub Copilot, Cursor, and v0",
      "The design system compliance problem: AI-generated code frequently bypasses token systems",
      "Token injection strategies: ensuring AI-generated components reference your token system",
      "Figma Make and design system import: how to bring your Figma component library into AI generation",
      "Linting for design system compliance: ESLint rules for hardcoded color and spacing values",
      "The AI component review process: governance workflow for AI-generated component additions",
      "Prompt templates for design system-compliant AI generation: specifying token usage in prompts",
      "Future state: design system agents, automated compliance checking, and living documentation",
    ],
    videos: [
      { title: "AI-Generated UI and Design System Compliance — Config 2025", channel: "Figma", youtubeId: "n0p_tSfKBBk", duration: "~40 min", type: "video", searchQuery: "Figma Config 2025 AI generated UI design system compliance" },
      { title: "The Future of Design Systems with AI — Brad Frost 2024", channel: "Brad Frost", youtubeId: "RuA2hLkJByA", duration: "~50 min", type: "video", searchQuery: "Brad Frost future design systems AI 2024 conference" },
    ],
    exerciseTexts: [
      { text: "Generate a UI component using Figma Make or another AI tool. Audit the output for design system compliance: (1) does it use your tokens? (2) are hardcoded values present? (3) which components are missing from your library?", hint: "Use your Stage 1 token system as the compliance standard. This makes the audit concrete, not subjective." },
      { text: "Write a prompt template for AI code generation that enforces design system compliance: specify token names, component naming conventions, import paths, and prohibited patterns.", hint: "The prompt should be reusable by any engineer on your team. Test it with a colleague who didn't write it — if they get compliant output, the prompt works." },
      { text: "Design an AI component review checklist: the steps a design system team would follow before accepting an AI-generated component into the library. Minimum 8 criteria.", hint: "Include: visual regression check, token compliance audit, accessibility scan, API consistency review, and documentation completeness." },
    ],
    studyTask: "Establish your organization's AI-generated UI governance policy: a prompt template for compliant generation, a review checklist, an approval workflow, and a decision on whether AI-generated components can be added to the library (and under what conditions). This is a founding document for AI-era design system governance.",
    rubric: "Evaluate prompt template effectiveness, review checklist completeness, governance policy clarity, and future-proofing.",
    sandboxPrompt: "Submit your AI governance policy document with all four components.",
    feedbackCriteria: ["Prompt Template Effectiveness", "Review Checklist Completeness", "Governance Policy Clarity", "AI Compliance Architecture"],
    feedbackOverall: "You're at the frontier of design systems practice. This governance policy document is more valuable than any component you'll build — it shapes every AI-generated component that follows.",
    feedbackSuggestions: ["Share your governance policy with the design systems community (Design Systems Slack, Figma Community) — there's a real gap in published AI governance frameworks.", "The compliance linting rules are worth implementing immediately — ESLint hardcoded value detection catches issues before review.", "Revisit this policy every 6 months as AI generation tools improve. The right governance model will shift as compliance features are added natively."],
    feedbackNextStep: "Stage 5 covers system adoption strategy and measuring design system success.",
  },
  {
    title: "Adoption Strategy and Measuring Design System Success",
    valueProp: "The most technically excellent design system fails if nobody uses it. Adoption is a product problem, not a technical problem — and it requires the same discovery, prioritization, and communication skills as any other product. The teams with the highest adoption rates treat their system as a product.",
    covers: [
      "The design system adoption curve: early adopters, pragmatists, and resisters",
      "Identifying and removing adoption blockers: missing components, stale documentation, friction in setup",
      "Component usage metrics: how to measure adoption across product teams using Figma analytics",
      "The 'office hours' model: design system team availability and how it drives adoption",
      "Contribution incentives: recognition systems, team acknowledgment, and community building",
      "Design system OKRs: adoption rate, documentation coverage, accessibility compliance score",
      "The business case for design system investment: how to quantify system ROI for leadership",
      "Sunset strategy: deprecating components safely without breaking product teams",
    ],
    videos: [
      { title: "Design System Adoption — How Atlassian Scaled Theirs", channel: "Atlassian Design", youtubeId: "JqGCwBt_4NQ", duration: "~45 min", type: "video", searchQuery: "Atlassian design system adoption scale strategy 2024" },
      { title: "Measuring Design System Success — Design Systems Conference", channel: "Design Systems Conference", youtubeId: "hSq7T8i2bJA", duration: "~40 min", type: "video", searchQuery: "design systems conference measuring success metrics 2024" },
    ],
    exerciseTexts: [
      { text: "Run a design system adoption audit on a product (real or fictional): identify 3 screens where components are misused or bypassed, document the root cause for each (missing component, stale docs, friction), and propose a fix.", hint: "Bypass root causes are usually one of: component doesn't exist, component doesn't match the use case, or documentation is unclear. Each root cause has a different fix." },
      { text: "Design a design system OKR set for Q3: 1 objective with 3 measurable key results. KRs must include at least one adoption metric, one quality metric, and one contribution metric.", hint: "Good adoption KRs: 'X% of new product screens use design system components.' Good quality: 'All components pass WCAG 2.1 AA.' Good contribution: '3+ external contributions accepted and merged.'." },
      { text: "Write a 1-page business case for a design system investment (or expansion): calculate time saved per sprint, multiply by team size and sprint frequency, add accessibility compliance risk reduction, and project 1-year ROI.", hint: "Conservative time-saving estimate: 2 hours per designer/engineer per sprint. For a team of 6 on 2-week sprints: 12 hours × $80/hr × 26 sprints = $24,960/year." },
    ],
    studyTask: "Produce a complete Design System Product Plan: adoption audit findings, OKRs for the next quarter, business case for continued investment, and a 30-day quick-win roadmap to close your 3 biggest adoption blockers. Present this as if pitching to your engineering director.",
    rubric: "Evaluate adoption audit depth, OKR measurability, business case credibility, and roadmap prioritization.",
    sandboxPrompt: "Submit your Design System Product Plan document.",
    feedbackCriteria: ["Adoption Audit Depth", "OKR Design Quality", "Business Case Credibility", "Roadmap Prioritization"],
    feedbackOverall: "Treating your design system as a product — with OKRs, user research, and a roadmap — is the frame that transforms a library into an organization asset. The business case is the document that secures next year's investment.",
    feedbackSuggestions: ["Present your business case to one business stakeholder outside design. Their questions will sharpen your ROI assumptions.", "The 30-day quick-win roadmap is the most immediately valuable part of this document — share it with your team this week.", "Run the adoption audit quarterly. The trends over time are more valuable than any single data point."],
    feedbackNextStep: "Capstone: your complete design system evolution roadmap.",
  },
  {
    title: "Capstone: Design System Evolution Roadmap",
    valueProp: "A design system is never finished — it evolves with the products it serves, the teams that use it, and the AI tools that increasingly generate UI on its behalf. Your capstone is an evolution roadmap: a strategic plan for where your system needs to go, backed by evidence from everything you've built in this curriculum.",
    covers: [
      "Design system maturity assessment: where your system is and where it needs to go",
      "The roadmap format: quarterly themes, milestone definitions, and dependency mapping",
      "Technical evolution: token system upgrades, component API migrations, multi-brand support",
      "AI integration evolution: from AI-assisted documentation to AI-generated compliant components",
      "Community building: from a closed team system to an open contribution model",
      "Cross-platform expansion: Web → iOS → Android → AI interfaces",
      "System deprecation and migration: sunsetting major versions without breaking products",
      "The design system as competitive advantage: how system quality shows in product quality",
    ],
    videos: [
      { title: "Design System Roadmap Planning — IBM Carbon Team", channel: "IBM Design", youtubeId: "MhGw9yhpKEY", duration: "~50 min", type: "video", searchQuery: "IBM Carbon design system roadmap planning evolution 2024" },
      { title: "The Future of Design Systems — Config 2025 Keynote", channel: "Figma", youtubeId: "Y5Gd8Yjqg3w", duration: "~45 min", type: "video", searchQuery: "Figma Config 2025 future design systems keynote" },
    ],
    exerciseTexts: [
      { text: "Assess your design system's current maturity using a 5-dimension rubric: (1) token architecture completeness, (2) component coverage, (3) documentation quality, (4) AI integration readiness, (5) adoption rate. Score 1-5 each and identify your 2 lowest dimensions.", hint: "Be honest. A system that scores its own maturity 5/5 has never been stress-tested by external adoption." },
      { text: "Write a 6-month design system evolution roadmap: Q1 theme, Q2 theme, 3 milestones per quarter, and 2 dependencies that must be resolved before major milestones. Format as a strategic narrative, not a task list.", hint: "Quarterly themes work better than feature lists: 'Q1: Foundation Stability' tells a story. 'Q1: Fix 14 component bugs' doesn't signal strategic direction." },
      { text: "Design your AI integration roadmap: what AI-assisted workflows exist today, what you'll add in 6 months, and what you're deliberately waiting on (and why).", hint: "The 'deliberately waiting' section is the most credible part of any AI roadmap. It signals judgment, not FOMO-driven adoption." },
    ],
    studyTask: "Produce your complete Design System Capstone: maturity assessment with rubric scores and evidence, 6-month evolution roadmap with quarterly themes and milestones, AI integration roadmap with adoption rationale, and a 1-page executive summary for leadership. This is your curriculum completion portfolio artifact.",
    rubric: "Evaluate maturity assessment honesty, roadmap strategic coherence, AI integration judgment, and executive summary quality.",
    sandboxPrompt: "Submit your complete Design System Capstone package as a shareable document.",
    feedbackCriteria: ["Maturity Assessment Honesty", "Roadmap Strategic Coherence", "AI Integration Judgment", "Executive Summary Quality", "Portfolio Readiness"],
    feedbackOverall: "You've built a complete design systems foundation — from token architecture to AI governance to evolution strategy. This capstone is a portfolio piece that demonstrates systems thinking at the level of a design systems lead.",
    feedbackSuggestions: ["Publish your maturity rubric as an open-source tool — other design teams would immediately use it.", "Share your AI integration roadmap with the Design Systems Slack community — it addresses a question the field is actively working through.", "Return to Stage 1 (tokens) and Stage 4 (AI governance) in 6 months — those are the highest-velocity areas of change."],
    feedbackNextStep: "Curriculum complete. Your design system evolution roadmap is the artifact that earns leadership trust and team investment.",
  },
];

// ─── Product Strategy & Roadmapping ───────────────────────────────────────────
const PRODUCT_STRATEGY: StageDef[] = [
  {
    title: "Market Analysis and Strategic Context",
    valueProp: "Strategy built without market context is opinion. The PMs who win at strategy are rigorous analysts before they're creative thinkers — they build a factual foundation that makes every subsequent decision defensible.",
    covers: [
      "Market sizing frameworks: TAM/SAM/SOM with AI-assisted data gathering",
      "Competitive landscape mapping: feature parity vs. strategic differentiation analysis",
      "Industry trend identification: using AI to scan signals across public sources",
      "Customer segmentation: jobs-based vs. demographic vs. behavioral approaches",
      "Porter's Five Forces in the AI era: how new competitive dynamics change the analysis",
      "Market timing signals: early, growth, saturation, and decline stage indicators",
      "Competitive moat analysis: network effects, switching costs, data advantages, brand",
      "AI-assisted competitive intelligence: scanning job boards, release notes, and review sites",
    ],
    videos: [
      { title: "Product Strategy Fundamentals — Marty Cagan SVPG", channel: "Silicon Valley Product Group", youtubeId: "OzmFSGj4O14", duration: "~50 min", type: "video", searchQuery: "Marty Cagan SVPG product strategy fundamentals 2024" },
      { title: "Market Analysis for Product Managers — Reforge", channel: "Reforge", youtubeId: "BKGXDxqAtmg", duration: "~45 min", type: "video", searchQuery: "Reforge market analysis product managers strategy 2024" },
    ],
    exerciseTexts: [
      { text: "Build a competitive landscape map for a real or fictional product: 4 competitors, 6 differentiating dimensions, and a strategic gap analysis using AI to surface patterns in public data.", hint: "Use job postings, app store reviews, and release notes as data sources. AI accelerates the pattern-finding — your judgment determines which patterns matter." },
      { text: "Estimate TAM/SAM/SOM for a product using the bottom-up method. Use AI to help identify data sources, then verify each assumption manually.", hint: "Bottom-up: start from known data points (e.g., 'X companies use this type of tool, at $Y ARR average') and build up. Document every assumption as a footnote." },
    ],
    studyTask: "Produce a complete market analysis brief for a product: TAM/SAM/SOM, competitive landscape map with strategic gap analysis, and 3 strategic opportunities backed by market evidence. Use AI for data gathering and pattern identification, but write the strategic interpretation yourself.",
    rubric: "Evaluate market sizing rigor, competitive analysis depth, and strategic opportunity quality.",
    sandboxPrompt: "Submit your market analysis brief with assumption documentation.",
    feedbackCriteria: ["Market Sizing Rigor", "Competitive Differentiation Depth", "Strategic Opportunity Quality"],
    feedbackOverall: "Market analysis done at this level of rigor becomes a persistent strategic asset. Update it quarterly and it compounds.",
    feedbackSuggestions: ["Add a 'signal watch list' to your competitive analysis — 5 signals that would change your strategy if they materialize.", "Share your competitive landscape map with your sales team. Their objection patterns reveal competitive gaps you missed.", "The bottom-up TAM model is worth building in a spreadsheet with live assumptions — it makes strategy reviews much faster."],
    feedbackNextStep: "Stage 2 applies market context to customer discovery.",
  },
  {
    title: "Customer Discovery and Opportunity Validation",
    valueProp: "The most common product failure mode is building the right solution for a problem nobody prioritizes solving. Rigorous opportunity validation — before a single line of code or frame in Figma — is the discipline that makes strategy more than intuition.",
    covers: [
      "Opportunity mapping: from market signals to specific customer problems",
      "The Jobs-to-be-Done framework: functional, emotional, and social job dimensions",
      "Continuous discovery habits: Teresa Torres' opportunity solution tree methodology",
      "Assumption mapping: surfacing hidden assumptions before they become product bets",
      "Validation methods by assumption risk: interviews, surveys, landing page tests, prototypes",
      "AI-assisted hypothesis generation: using Claude to generate and stress-test product hypotheses",
      "The 'Mom Test' applied: crafting interview questions that reveal reality, not validation",
      "Opportunity scoring: evidence-weighted prioritization of validated opportunities",
    ],
    videos: [
      { title: "Continuous Discovery Habits — Teresa Torres", channel: "Teresa Torres", youtubeId: "l7-UBn5M1dw", duration: "~55 min", type: "video", searchQuery: "Teresa Torres continuous discovery habits opportunity solution tree 2024" },
      { title: "Jobs-to-be-Done Product Discovery — Mind the Product", channel: "Mind the Product", youtubeId: "kfhBs8x8ANE", duration: "~40 min", type: "video", searchQuery: "Mind the Product jobs to be done discovery framework 2024" },
    ],
    exerciseTexts: [
      { text: "Build an opportunity solution tree for a product area: 1 desired outcome, 3 opportunity nodes, 2 solution ideas per opportunity, and 1 experiment per solution. Use AI to generate the initial tree, then critique and revise it.", hint: "The AI-generated tree will be structurally complete but context-thin. Your revisions based on actual customer context are where the value is." },
      { text: "Write 5 interview questions using Mom Test principles for a discovery session on a product problem. Then use AI to critique them: 'Which of these questions leads the participant toward a specific answer?'", hint: "Mom Test principle: ask about past behavior, not future hypotheticals. 'When did you last...' beats 'Would you ever...'." },
    ],
    studyTask: "Run a mini discovery sprint: build an opportunity solution tree, conduct 2 discovery interviews (real or with colleagues), extract JTBD statements, score 3 opportunities on a weighted evidence matrix. Document where your assumptions were confirmed and where they were challenged.",
    rubric: "Evaluate opportunity tree logic, interview question quality, JTBD extraction accuracy, and assumption tracking.",
    sandboxPrompt: "Submit your opportunity solution tree, interview guides, and evidence-weighted opportunity scoring.",
    feedbackCriteria: ["Opportunity Tree Logic", "Interview Question Quality", "JTBD Extraction Depth", "Evidence Weight Calibration"],
    feedbackOverall: "Discovery rigor is the foundation of good strategy. The assumption tracking habit — logging where you were wrong — is what makes strategy learning compound.",
    feedbackSuggestions: ["Run your opportunity tree by your engineering lead. Their feasibility assessment changes which opportunities are truly viable.", "The Mom Test critique prompt works on any qualitative research instrument — make it a standard pre-field review step.", "Your evidence-weighted scoring matrix is worth formalizing as a team template — it makes prioritization debates more productive."],
    feedbackNextStep: "Stage 3 builds the vision and strategy on this discovery foundation.",
  },
  {
    title: "Product Vision and Strategic Narrative",
    valueProp: "A product without a vision is a feature factory. The vision is the constraint that makes every subsequent roadmap decision faster, more coherent, and more defensible. It's also the most underinvested artifact in most product organizations.",
    covers: [
      "What a product vision is and what it is not: the 5-year north star vs. the 6-month goal",
      "The vision canvas: problem, customer, value, differentiation, and success horizon",
      "Writing a vision statement that guides decisions: the Geoffrey Moore template and its limitations",
      "Strategic narrative structure: situation, insight, response, and expected outcome",
      "Aligning vision to company strategy: how product vision serves business strategy",
      "Vision pressure-testing: the 10 questions that expose a weak vision",
      "The vision-to-roadmap bridge: how strategy connects vision to quarterly priorities",
      "Communicating vision to engineering, design, and exec teams",
    ],
    videos: [
      { title: "Writing a Compelling Product Vision — Marty Cagan", channel: "Silicon Valley Product Group", youtubeId: "sXH8Fl6QGKY", duration: "~45 min", type: "video", searchQuery: "Marty Cagan product vision compelling writing SVPG" },
      { title: "Product Strategy Narrative — Lenny's Newsletter", channel: "Lenny's Newsletter", youtubeId: "dFH4Dv8Lhwg", duration: "~50 min", type: "video", searchQuery: "Lenny's Newsletter product strategy narrative vision 2024" },
    ],
    exerciseTexts: [
      { text: "Write a product vision for a real or fictional product using the vision canvas: problem statement, target customer, value proposition, key differentiation, and 5-year success picture.", hint: "The 5-year success picture should be specific enough to guide decisions but flexible enough to survive market changes. 'The most trusted...' is too vague. Describe a specific behavior change in the world." },
      { text: "Run the 10 vision pressure tests on your draft: (1) Does it differentiate? (2) Does it guide trade-offs? (3) Would a competitor write the same vision? (4) Does it answer 'why us'? (5) Is it 3-year durable? (6) Does engineering understand it? (7) Does it connect to company strategy? (8) Is it memorable in 1 sentence? (9) Does it exclude as clearly as it includes? (10) Do you believe it?", hint: "A vision that fails 3+ tests needs rethinking before roadmap planning. Document which tests it failed and why." },
    ],
    studyTask: "Produce a complete product vision package: vision canvas, vision statement (max 3 sentences), strategic narrative (1 page), and pressure test results with revision notes. Present it as if pitching to a new VP of Product on their first week.",
    rubric: "Evaluate vision clarity, differentiation strength, pressure test honesty, and narrative persuasiveness.",
    sandboxPrompt: "Submit your complete vision package.",
    feedbackCriteria: ["Vision Clarity and Specificity", "Differentiation Strength", "Pressure Test Honesty", "Narrative Persuasiveness"],
    feedbackOverall: "A pressure-tested vision is the most durable strategy artifact you can produce. The 'would a competitor write this' test is the single most clarifying question in product strategy.",
    feedbackSuggestions: ["Share your vision with one person outside your team. If they can't explain it back in one sentence, it's not memorable enough.", "Revisit your vision after 6 months of market exposure. Visions that survive market reality are the ones worth building on.", "The strategic narrative format (situation → insight → response → outcome) works for any strategic communication — make it your default."],
    feedbackNextStep: "Stage 4 builds the roadmap that executes the vision.",
  },
  {
    title: "Roadmap Construction and Prioritization Frameworks",
    valueProp: "Roadmaps are communication tools, not commitment devices. The organizations that build the best roadmaps treat them as hypothesis queues — sequenced bets on where to invest, designed to be proved right or wrong as fast as possible.",
    covers: [
      "The roadmap format decision: outcome-based vs. feature-based vs. theme-based roadmaps",
      "Prioritization frameworks: RICE, ICE, WSJF, Kano, and when each is appropriate",
      "Impact estimation: confidence-weighted scoring vs. false precision",
      "The 'now/next/later' framework: flexible roadmapping for uncertain environments",
      "Dependencies and sequencing: critical path analysis for product roadmaps",
      "Technical debt as a strategic investment: how to make the case on a roadmap",
      "Roadmap communication: different views for engineering, design, sales, and exec",
      "AI-assisted roadmap generation: using Claude to draft and stress-test prioritization",
    ],
    videos: [
      { title: "Roadmap Prioritization Frameworks — Mind the Product", channel: "Mind the Product", youtubeId: "C6bKPEcAMuk", duration: "~45 min", type: "video", searchQuery: "Mind the Product roadmap prioritization frameworks RICE ICE 2024" },
      { title: "Outcome-Based Roadmapping — Teresa Torres", channel: "Teresa Torres", youtubeId: "rGO_ZGYi2Ho", duration: "~50 min", type: "video", searchQuery: "Teresa Torres outcome based roadmapping product 2024" },
    ],
    exerciseTexts: [
      { text: "Score 10 product ideas using RICE (Reach, Impact, Confidence, Effort). Then score the same 10 using ICE. Document where the two frameworks produce different priority rankings and why.", hint: "Divergent rankings reveal assumptions. RICE rewards scale; ICE rewards speed-to-validation. The right framework depends on your growth stage." },
      { text: "Build a now/next/later roadmap for a product area. Write a rationale for why each item is in its current lane — not 'because it's important' but because of a specific strategic dependency or sequencing logic.", hint: "Every 'next' item should have a clear trigger: 'This moves to now when [condition].' Ambiguous triggers produce roadmaps that never update." },
    ],
    studyTask: "Build a complete roadmap for a product area: 10-item RICE-scored backlog, now/next/later roadmap with strategic rationale, executive-ready roadmap narrative, and an engineering view with dependency flags. Include a 'what's deliberately excluded and why' section.",
    rubric: "Evaluate prioritization rigor, sequencing logic, stakeholder communication quality, and exclusion rationale.",
    sandboxPrompt: "Submit your complete roadmap package with all four deliverables.",
    feedbackCriteria: ["Prioritization Framework Rigor", "Sequencing Logic Quality", "Stakeholder View Differentiation", "Exclusion Rationale Strength"],
    feedbackOverall: "Roadmap quality is a proxy for strategic clarity. The 'what's excluded and why' section is the highest-signal artifact for evaluating strategic maturity.",
    feedbackSuggestions: ["Share your 'excluded and why' document with your sales team. Their objections reveal market signals your exclusion logic missed.", "The now/next/later format with explicit trigger conditions is worth adopting as your team's default — it eliminates most roadmap staleness.", "Run your RICE scores by your lead engineer. Their effort estimates will recalibrate your prioritization immediately."],
    feedbackNextStep: "Stage 5 covers metrics, OKRs, and measuring strategy success.",
  },
  {
    title: "Metrics Architecture and OKR Design",
    valueProp: "You can't manage a strategy you can't measure. The difference between a metric that drives behavior and one that produces gaming is the difference between north star thinking and KPI reporting. This stage is about designing a measurement system that tells you if your strategy is working.",
    covers: [
      "North star metric design: what a north star is, what it isn't, and how to find yours",
      "The metric tree: north star → leading indicators → lagging indicators → guardrail metrics",
      "OKR design principles: measurability, time-boxing, and the objective-result relationship",
      "Common OKR failure modes: output OKRs, vanity metrics, and unachievable stretch goals",
      "Product analytics instrumentation: what to measure and how to decide what not to measure",
      "Experimentation metrics: primary success metric, guardrail metrics, and minimum detectable effect",
      "AI-assisted metric generation: using Claude to draft and critique your metric tree",
      "Communicating metrics to non-technical stakeholders: dashboards that drive decisions",
    ],
    videos: [
      { title: "North Star Metric Framework — Lenny Rachitsky", channel: "Lenny's Newsletter", youtubeId: "2W7hZZpEK9I", duration: "~50 min", type: "video", searchQuery: "Lenny Rachitsky north star metric framework product 2024" },
      { title: "OKR Design for Product Teams — Reforge", channel: "Reforge", youtubeId: "fRXh77_7hpI", duration: "~45 min", type: "video", searchQuery: "Reforge OKR design product teams metrics 2024" },
    ],
    exerciseTexts: [
      { text: "Define a north star metric for a product. Then build the metric tree: 2 leading indicators, 2 lagging indicators, and 2 guardrail metrics. Use AI to stress-test: 'How could a team game this metric tree while harming actual user value?'", hint: "The gaming audit is the most important test. If you can't identify gaming vectors, the metric tree isn't specific enough." },
      { text: "Write Q3 OKRs for a product area: 1 objective + 3 key results. Then apply the 5 OKR failure mode tests: (1) Is the objective measurable? (2) Are KRs outcomes, not outputs? (3) Are they achievable but stretching? (4) Do they connect to company strategy? (5) Can engineering understand them?", hint: "OKR that fails test 2 (output KR): 'Launch the notifications redesign.' OKR that passes: 'Increase 7-day retention from 42% to 55% among users who receive notifications.'" },
    ],
    studyTask: "Design a complete metrics architecture for a product: north star metric with rationale, full metric tree, Q3 OKR set with gaming audit, and a 1-page metrics dashboard design that shows the 4 numbers a GM would need to assess product health in 2 minutes.",
    rubric: "Evaluate north star metric quality, metric tree completeness, OKR outcome framing, and dashboard prioritization.",
    sandboxPrompt: "Submit your complete metrics architecture document.",
    feedbackCriteria: ["North Star Metric Quality", "Metric Tree Completeness", "OKR Outcome Framing", "Dashboard Design Clarity"],
    feedbackOverall: "Metrics architecture done at this level of rigor changes how your team operates. The gaming audit is the single most valuable thinking exercise in this entire stage.",
    feedbackSuggestions: ["Share your north star metric with your data team before finalizing — their instrumentation constraints often reveal if a metric is truly measurable.", "The 5-test OKR review works best as a team exercise. Run it in your next planning session.", "Your 2-minute dashboard design is worth prototyping in Looker, Amplitude, or even a slide deck — visibility drives accountability."],
    feedbackNextStep: "Capstone: your complete product strategy document.",
  },
  {
    title: "Capstone: Complete Product Strategy Document",
    valueProp: "Strategy is only as good as its documentation and communication. Your capstone integrates every stage into a complete strategy document — the artifact that aligns your team, guides your roadmap, and demonstrates strategic thinking at the level a Head of Product would expect.",
    covers: [
      "The strategy document format: from 1-pager to 10-page strategy memo",
      "Synthesizing market analysis, vision, roadmap, and metrics into a coherent narrative",
      "Strategic trade-off documentation: what you're choosing not to do and why",
      "Risk register: the 5 biggest assumptions that could invalidate your strategy",
      "The review cycle: how often strategy documents should be revisited and what triggers a revision",
      "Board-level strategy communication: the 3 slides that matter",
      "Strategy as a team alignment tool: running a strategy review session",
      "Your strategic thinking portfolio: presenting your work in a hiring context",
    ],
    videos: [
      { title: "Writing a Product Strategy Memo — Shreyas Doshi", channel: "Shreyas Doshi", youtubeId: "kTsZXJFGNbI", duration: "~55 min", type: "video", searchQuery: "Shreyas Doshi product strategy memo writing 2024" },
      { title: "Strategy and Leadership for PMs — SVPG Marty Cagan", channel: "Silicon Valley Product Group", youtubeId: "L2FMjGI0-8A", duration: "~50 min", type: "video", searchQuery: "Marty Cagan SVPG strategy leadership product managers 2024" },
    ],
    exerciseTexts: [
      { text: "Write a 1-page strategy brief that integrates: market context, product vision, top 3 priorities, north star metric, and the 2 biggest risks. Every statement must connect back to evidence from your earlier stages.", hint: "The discipline is connecting every claim to its evidence source. A strategy brief without evidence is just aspiration." },
      { text: "Build a 3-slide board strategy deck: (1) where we are and why it matters, (2) where we're going and how we'll get there, (3) what we need and what success looks like. Each slide should tell the story visually — minimal text.", hint: "Board slide principle: if you need to read it to understand it, it's not a board slide. One clear chart or diagram per slide, supported by one key sentence." },
      { text: "Write your personal strategic thinking portfolio statement: the product decisions you've made (or would make), the frameworks you use, and the failures you've learned from. This is a hiring artifact.", hint: "Structure: 3 strategic decisions, each with: context, framework applied, outcome, and key learning. The failure acknowledgment is what signals senior-level judgment." },
    ],
    studyTask: "Produce your complete Product Strategy Capstone: 1-page strategy brief, 3-slide board deck, risk register with 5 validated assumptions, and your personal strategic thinking portfolio statement. This is your curriculum completion artifact — treat it as a portfolio piece.",
    rubric: "Evaluate strategy brief clarity, board deck visual communication, risk register depth, and portfolio statement strength.",
    sandboxPrompt: "Submit your complete Product Strategy Capstone package.",
    feedbackCriteria: ["Strategy Brief Integration", "Board Deck Visual Communication", "Risk Register Rigor", "Portfolio Statement Strength", "Capstone Completeness"],
    feedbackOverall: "You've built a complete product strategy toolkit. The capstone document is a portfolio artifact that demonstrates strategy competency at the level of a senior PM or Group PM.",
    feedbackSuggestions: ["Publish your 1-page strategy brief format as a LinkedIn post — the product community responds well to practical strategy frameworks.", "Your risk register is most valuable when shared with your engineering and design leads — they'll add risk vectors you didn't see.", "Return to Stage 1 (market analysis) whenever your product enters a new market or faces a significant competitive change."],
    feedbackNextStep: "Curriculum complete. Your Product Strategy Capstone is your most impactful portfolio piece — protect it, update it, and share it selectively.",
  },
];

// ─── Generic fallback for custom topics ───────────────────────────────────────
function buildGenericStages(topic: string, stageCount: number): StageDef[] {
  const bloomProgression = [
    { verb: "Identify", level: "Foundation", bloomLabel: "Remember/Understand" },
    { verb: "Apply", level: "Core Application", bloomLabel: "Apply" },
    { verb: "Analyze", level: "Critical Analysis", bloomLabel: "Analyze" },
    { verb: "Evaluate", level: "Strategic Evaluation", bloomLabel: "Evaluate" },
    { verb: "Design", level: "Advanced Practice", bloomLabel: "Create" },
    { verb: "Synthesize", level: "Expert Integration", bloomLabel: "Synthesize" },
    { verb: "Innovate", level: "Mastery", bloomLabel: "Create/Synthesize" },
    { verb: "Lead", level: "Leadership", bloomLabel: "Evaluate/Create" },
  ];

  return Array.from({ length: stageCount }, (_, i) => {
    const b = bloomProgression[Math.min(i, bloomProgression.length - 1)];
    const isCapstone = i === stageCount - 1;
    const stageTitle = isCapstone
      ? `Capstone: ${topic} — Complete Portfolio Project`
      : `${b.level}: ${b.verb} the Core ${topic} Frameworks (Stage ${i + 1})`;

    return {
      title: stageTitle,
      valueProp: isCapstone
        ? `Your capstone demonstrates integrated mastery across all ${topic} competencies. This is the portfolio artifact that makes your expertise legible to hiring managers, clients, and collaborators — built on every exercise from previous stages.`
        : `Stage ${i + 1} of ${stageCount} in the ${topic} curriculum. Bloom's level: ${b.bloomLabel}. The goal is not just understanding — it's the ability to ${b.verb.toLowerCase()} confidently in a professional context within the week following this session.`,
      covers: [
        `Core ${topic} concepts at the ${b.bloomLabel} level`,
        `Professional application patterns used by practitioners at leading organizations`,
        `Common mistakes at this stage and how to avoid them`,
        `The AI tool landscape that is changing this competency area`,
        `Real-world case studies from verifiable professional contexts`,
        `Framework for ${b.verb.toLowerCase()}ing quality across different professional contexts`,
        `Building toward the next stage: prerequisites unlocked in this session`,
        `Portfolio artifact design: what a Principal-level deliverable looks like`,
      ],
      videos: [
        {
          title: `${topic} — Professional Practice Deep Dive`,
          channel: "Conference Recording",
          youtubeId: "dQw4w9WgXcQ",
          duration: "~45 min",
          type: "video" as const,
          searchQuery: `${topic} professional practice conference talk 2024`,
        },
        {
          title: `Advanced ${topic} — Practitioner Walkthrough`,
          channel: "Industry Professional",
          youtubeId: "dQw4w9WgXcQ",
          duration: "~35 min",
          type: "video" as const,
          searchQuery: `${topic} advanced practitioner tutorial walkthrough 2024`,
        },
      ],
      exerciseTexts: [
        {
          text: `Apply the core ${topic} framework to a real or realistic professional context. Document your decision process at each step.`,
          hint: `Use your own work as the context where possible. Real constraints produce more learning than hypothetical ones.`,
        },
        {
          text: `Run a critique exercise: evaluate an existing ${topic} example against the quality criteria introduced in this session. Identify 3 strengths and 3 gaps.`,
          hint: `The critique is most valuable when you're honest about gaps. A strength-only critique signals either a perfect example or incomplete evaluation.`,
        },
        {
          text: `Design a ${topic} deliverable that a senior practitioner at a top-tier organization would consider professionally credible. Document your design choices.`,
          hint: `Ask yourself: 'Would I include this in a portfolio?'. If not, it needs more rigour.`,
        },
      ],
      studyTask: isCapstone
        ? `Produce your complete ${topic} capstone project: integrate work from all previous stages, produce a portfolio-ready deliverable, and write a reflection on how your practice evolved across the curriculum.`
        : `Apply the Stage ${i + 1} frameworks to a real professional challenge. Produce a deliverable that could be included in a senior-level portfolio. Document your process, the decisions you made, and the trade-offs you accepted.`,
      rubric: `Evaluate framework application depth, professional credibility of the deliverable, decision documentation quality, and evidence of Bloom's level achievement (${b.bloomLabel}).`,
      sandboxPrompt: `Submit your Stage ${i + 1} deliverable with process documentation and decision rationale.`,
      feedbackCriteria: ["Framework Application Depth", "Deliverable Quality", "Decision Documentation", "Professional Credibility"],
      feedbackOverall: `${b.verb} competency at the ${b.bloomLabel} level is now demonstrated. The next stage builds directly on this — the frameworks here are prerequisites.`,
      feedbackSuggestions: [
        `Revisit this exercise after completing Stage ${Math.min(i + 2, stageCount)} — the later frameworks reframe what you built here.`,
        `Share your deliverable with one practitioner outside your immediate team for external calibration.`,
        `Document 3 things you would do differently with your current knowledge. This is your evidence of real learning.`,
      ],
      feedbackNextStep: i < stageCount - 1
        ? `Stage ${i + 2} advances to ${bloomProgression[Math.min(i + 1, bloomProgression.length - 1)].bloomLabel} — you're ready.`
        : `Curriculum complete. Return to any stage for depth. Publish your capstone.`,
    };
  });
}

// ─── Topic selector ────────────────────────────────────────────────────────────

function getStageBlueprint(topic: string, stageCount: number): StageDef[] {
  const t = topic.toLowerCase();
  let base: StageDef[];

  if (t.includes("prompt") || t.includes("pm")) {
    base = PROMPT_ENG_PM;
  } else if (t.includes("ux research") || t.includes("research")) {
    base = UX_RESEARCH_AI;
  } else if (t.includes("design system")) {
    base = DESIGN_SYSTEMS;
  } else if (t.includes("product strategy") || t.includes("roadmap")) {
    base = PRODUCT_STRATEGY;
  } else {
    base = buildGenericStages(topic, stageCount);
  }

  // Trim or extend to match stageCount
  if (base.length >= stageCount) return base.slice(0, stageCount);

  // Repeat last stage pattern if needed
  const extended = [...base];
  while (extended.length < stageCount) {
    const generic = buildGenericStages(topic, stageCount - base.length);
    extended.push(...generic.slice(0, stageCount - extended.length));
  }
  return extended.slice(0, stageCount);
}

// ─── MAIN GENERATOR ─────────────────────────────────────────────────────────

export function generateCurriculum(data: {
  topic: string;
  audience: string;
  day: string;
  time: string;
  startDate: string;
  participants: number;
  duration: number;
}): GeneratedCurriculum {
  const stages = getStageBlueprint(data.topic, data.duration);

  const modules: Module[] = stages.map((stage, idx) => {
    const { duration, totalTime, xp } = dur(idx);
    const badge = bloomBadge(idx, data.duration);
    const status = moduleStatus(idx, data.audience);
    const stepStr = pad(idx + 1);

    const isEvaluated = status === "completed";

    const exercises: Exercise[] = stage.exerciseTexts.map((ex, ei) => ({
      id: `${idx + 1}-${ei + 1}`,
      text: ex.text,
      hint: ex.hint,
    }));

    const aiFeedback: AiFeedbackData = isEvaluated
      ? {
          criteria: stage.feedbackCriteria.map((name, ci) => ({
            name,
            score: Math.max(3, Math.min(5, 4 + (ci % 2 === 0 ? 1 : 0))),
            comment: stage.feedbackSuggestions[ci % stage.feedbackSuggestions.length] || "Well executed.",
          })),
          overall: stage.feedbackOverall,
          suggestions: stage.feedbackSuggestions,
          nextStep: stage.feedbackNextStep,
        }
      : pendingFeedback(stage.feedbackCriteria);

    return {
      id: idx + 1,
      step: stepStr,
      title: stage.title,
      badge,
      valueProp: stage.valueProp,
      covers: stage.covers,
      duration,
      totalTime,
      xp,
      status,
      videos: stage.videos,
      exercises,
      studyTask: stage.studyTask,
      rubric: stage.rubric,
      sandboxPrompt: stage.sandboxPrompt,
      aiFeedback,
    };
  });

  return {
    topic: data.topic,
    audience: data.audience,
    day: data.day,
    time: data.time,
    startDate: data.startDate,
    participants: data.participants,
    duration: data.duration,
    modules,
    generatedAt: new Date().toISOString(),
  };
}

// ─── localStorage helpers ────────────────────────────────────────────────────

const LS_KEY = "welearn_curriculum_v1";

export function saveCurriculum(c: GeneratedCurriculum): void {
  try { localStorage.setItem(LS_KEY, JSON.stringify(c)); } catch { /* ignore */ }
}

export function loadCurriculum(): GeneratedCurriculum | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as GeneratedCurriculum) : null;
  } catch { return null; }
}

export function clearCurriculum(): void {
  try { localStorage.removeItem(LS_KEY); } catch { /* ignore */ }
}
