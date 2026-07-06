import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Bot, Brain, Sparkles, Search, Rocket, Layout,
  Sprout, TrendingUp, Award,
  Check, CheckCircle2, Pencil, ChevronLeft,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import type { Bubble, Session, BubbleLevel } from "../../types";
import { BabelTransition } from "./BabelTransition";

// ─── Types ────────────────────────────────────────────────────────────────────

type StepKey = "topic" | "level" | "schedule" | "seats" | "sessions";

interface BubbleData {
  topic: string;
  level: BubbleLevel;
  day: string;
  time: string;
  seats: number;
  syllabusMode: "ai" | "manual";
}

type FeedItem =
  | { kind: "ai";     id: number; text: string }
  | { kind: "user";   id: number; text: string }
  | { kind: "widget"; id: number; step: StepKey; locked: boolean };

// ─── Constants ────────────────────────────────────────────────────────────────

const STEP_ORDER: StepKey[] = ["topic", "level", "schedule", "seats", "sessions"];

const TOPICS: { label: string; icon: typeof Bot; tag: string }[] = [
  { label: "AI-Native Product Design",       icon: Bot,      tag: "Design"   },
  { label: "Prompt Engineering for PMs",     icon: Brain,    tag: "AI"       },
  { label: "Designing AI UX Patterns",       icon: Sparkles, tag: "UX"       },
  { label: "AI-Powered User Research",       icon: Search,   tag: "Research" },
  { label: "Product Strategy in the AI Era", icon: Rocket,   tag: "Product"  },
  { label: "Design Systems for AI Products", icon: Layout,   tag: "Design"   },
];

const LEVELS: { label: BubbleLevel; desc: string; icon: typeof Sprout }[] = [
  { label: "Beginner",     desc: "No prior experience needed",   icon: Sprout      },
  { label: "Intermediate", desc: "Some foundational knowledge",  icon: TrendingUp  },
  { label: "Advanced",     desc: "Experienced practitioners",    icon: Award       },
];

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const FULL_DAYS: Record<string, string> = {
  Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",
  Fri:"Friday",Sat:"Saturday",Sun:"Sunday",
};
const TIMES = [
  "07:00 AM","08:00 AM","09:00 AM","10:00 AM",
  "12:00 PM","02:00 PM","05:00 PM","06:00 PM","07:00 PM","08:00 PM",
];

const AI_PROMPTS: Record<StepKey, string> = {
  topic:    "I'm your Bubble guide. What topic do you want to teach or facilitate? Choose one below or type your own.",
  level:    "Great choice! Who is this Bubble for? What's the experience level of your participants?",
  schedule: "Perfect. When will your group meet? Pick a day and time that works for you — sessions are 90 minutes.",
  seats:    "Almost there! How many participants do you want in this Bubble? (4–8 is the sweet spot for cohort learning.)",
  sessions: "Last step! Do you want AI to generate your full syllabus, or would you prefer to build it manually?",
};

// ─── Mock syllabus generator ──────────────────────────────────────────────────

function generateMockSessions(topic: string, level: BubbleLevel): Session[] {
  const sessionTitles = [
    "Introduction & Foundations",
    "Core Concepts Deep Dive",
    "Practical Frameworks",
    "Hands-On Workshop",
    "Guest Expert Session",
    "Final Project & Wrap-Up",
  ];
  const dates = [
    "Mar 18, 2026","Mar 25, 2026","Apr 1, 2026",
    "Apr 8, 2026","Apr 15, 2026","Apr 22, 2026",
  ];
  return sessionTitles.map((title, i) => ({
    id: `new-s-${i + 1}`,
    number: i + 1,
    title,
    status: 'locked' as Session['status'],
    date: dates[i],
    duration: 90,
    xp: 150,
    level,
    sections: [
      { id: `ns-${i}-lp`, type: 'learning-path' as const, title: 'Learning Path',
        content: `Session ${i + 1} of ${topic} — we'll explore ${title.toLowerCase()}.` },
      { id: `ns-${i}-br`, type: 'brief' as const, title: 'Conceptual Brief',
        content: 'Practical application focus. Come prepared.' },
      { id: `ns-${i}-vid`, type: 'video' as const, title: 'Video Resources',
        videoTitle: `Recommended: ${title}`, videoUrl: 'https://youtube.com' },
      { id: `ns-${i}-sb`, type: 'sandbox' as const, title: 'Project Sandbox',
        content: 'Submit your project link below.' },
      { id: `ns-${i}-ai`, type: 'ai-eval' as const, title: 'AI Evaluation' },
      { id: `ns-${i}-ref`, type: 'reflection' as const, title: 'Reflection' },
    ],
  }));
}

// ─── Widgets ──────────────────────────────────────────────────────────────────

function TopicWidget({ onSelect, locked }: { onSelect: (t: string) => void; locked: boolean }) {
  const [custom, setCustom] = useState('');
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        {TOPICS.map(t => (
          <button key={t.label} onClick={() => !locked && onSelect(t.label)} disabled={locked}
            className="flex items-start gap-2 p-3 rounded-xl border border-[#E9ECEF] text-left hover:border-[#2BBFAA] hover:bg-[#E8F9F7] transition-all disabled:opacity-50"
            style={{ fontFamily: 'var(--font-body)' }}>
            <t.icon className="size-5 shrink-0 text-[#2BBFAA]" strokeWidth={1.75} />
            <div>
              <p className="text-[12px] font-semibold text-[#212529] leading-snug">{t.label}</p>
              <span className="text-[10px] bg-[#F1F3F5] text-[#6C757D] px-1.5 py-0.5 rounded-full">{t.tag}</span>
            </div>
          </button>
        ))}
      </div>
      {!locked && (
        <div className="flex gap-2">
          <input
            type="text" value={custom} onChange={e => setCustom(e.target.value)}
            placeholder="Or type your own topic..."
            className="flex-1 px-3 py-2 rounded-xl border border-[#E9ECEF] text-[13px] bg-white focus:outline-none focus:border-[#2BBFAA]"
            style={{ fontFamily: 'var(--font-body)' }}
            onKeyDown={e => e.key === 'Enter' && custom.trim() && onSelect(custom.trim())}
          />
          <button onClick={() => custom.trim() && onSelect(custom.trim())}
            disabled={!custom.trim()}
            className="px-4 py-2 rounded-xl bg-[#2BBFAA] text-white text-[13px] font-medium disabled:opacity-40 hover:bg-[#1FA090] transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}>
            Use
          </button>
        </div>
      )}
    </div>
  );
}

function LevelWidget({ onSelect, locked }: { onSelect: (l: BubbleLevel) => void; locked: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      {LEVELS.map(l => (
        <button key={l.label} onClick={() => !locked && onSelect(l.label)} disabled={locked}
          className="flex items-center gap-3 p-4 rounded-xl border border-[#E9ECEF] text-left hover:border-[#2BBFAA] hover:bg-[#E8F9F7] transition-all disabled:opacity-50"
          style={{ fontFamily: 'var(--font-body)' }}>
          <l.icon className="size-6 text-[#2BBFAA] shrink-0" strokeWidth={1.75} />
          <div>
            <p className="font-semibold text-[14px] text-[#212529]">{l.label}</p>
            <p className="text-[12px] text-[#6C757D]">{l.desc}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

function ScheduleWidget({ onSelect, locked }: { onSelect: (day: string, time: string) => void; locked: boolean }) {
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-[12px] text-[#6C757D] mb-2" style={{ fontFamily: 'var(--font-body)' }}>Day of week</p>
        <div className="flex flex-wrap gap-2">
          {DAYS.map(d => (
            <button key={d} onClick={() => !locked && setDay(d)} disabled={locked}
              className="px-3 py-2 rounded-xl border text-[13px] font-medium transition-all disabled:opacity-50"
              style={{
                fontFamily: 'var(--font-body)',
                borderColor: day === d ? '#2BBFAA' : '#E9ECEF',
                background: day === d ? '#E8F9F7' : 'white',
                color: day === d ? '#1FA090' : '#495057',
              }}>
              {d}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[12px] text-[#6C757D] mb-2" style={{ fontFamily: 'var(--font-body)' }}>Time</p>
        <div className="flex flex-wrap gap-2">
          {TIMES.map(t => (
            <button key={t} onClick={() => !locked && setTime(t)} disabled={locked}
              className="px-3 py-2 rounded-xl border text-[13px] font-medium transition-all disabled:opacity-50"
              style={{
                fontFamily: 'var(--font-body)',
                borderColor: time === t ? '#2BBFAA' : '#E9ECEF',
                background: time === t ? '#E8F9F7' : 'white',
                color: time === t ? '#1FA090' : '#495057',
              }}>
              {t}
            </button>
          ))}
        </div>
      </div>
      {day && time && !locked && (
        <button
          onClick={() => onSelect(FULL_DAYS[day], time)}
          className="w-full py-2.5 rounded-xl bg-[#2BBFAA] text-white text-[14px] font-semibold hover:bg-[#1FA090] transition-colors"
          style={{ fontFamily: 'var(--font-body)' }}>
          Confirm: Every {FULL_DAYS[day]} @ {time} →
        </button>
      )}
    </div>
  );
}

function SeatsWidget({ onSelect, locked }: { onSelect: (n: number) => void; locked: boolean }) {
  const [seats, setSeats] = useState(6);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <button onClick={() => !locked && setSeats(s => Math.max(1, s - 1))} disabled={locked || seats <= 1}
          className="size-10 rounded-xl border border-[#E9ECEF] text-[18px] font-bold text-[#495057] hover:border-[#2BBFAA] disabled:opacity-30 transition-colors">
          −
        </button>
        <div className="flex-1 text-center">
          <p className="text-[36px] font-bold text-[#212529]" style={{ fontFamily: 'var(--font-display)' }}>
            {seats}
          </p>
          <p className="text-[12px] text-[#6C757D]" style={{ fontFamily: 'var(--font-body)' }}>
            choose your group size
          </p>
        </div>
        <button onClick={() => !locked && setSeats(s => s + 1)} disabled={locked}
          className="size-10 rounded-xl border border-[#E9ECEF] text-[18px] font-bold text-[#495057] hover:border-[#2BBFAA] disabled:opacity-30 transition-colors">
          +
        </button>
      </div>
      <div className="flex gap-2">
        {[4, 6, 8, 10, 12].map(n => (
          <button key={n} onClick={() => !locked && setSeats(n)} disabled={locked}
            className="flex-1 py-2 rounded-xl border text-[13px] font-medium transition-all disabled:opacity-50"
            style={{
              fontFamily: 'var(--font-body)',
              borderColor: seats === n ? '#2BBFAA' : '#E9ECEF',
              background: seats === n ? '#E8F9F7' : 'white',
              color: seats === n ? '#1FA090' : '#495057',
            }}>
            {n}
          </button>
        ))}
      </div>
      {!locked && (
        <button
          onClick={() => onSelect(seats)}
          className="w-full py-2.5 rounded-xl bg-[#2BBFAA] text-white text-[14px] font-semibold hover:bg-[#1FA090] transition-colors"
          style={{ fontFamily: 'var(--font-body)' }}>
          {seats} seats — Let's go →
        </button>
      )}
    </div>
  );
}

function SessionsWidget({
  topic, level, onConfirm, locked,
}: {
  topic: string; level: BubbleLevel;
  onConfirm: (mode: 'ai' | 'manual') => void;
  locked: boolean;
}) {
  const [mode, setMode] = useState<'ai' | 'manual' | null>(null);
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const [phases, setPhases] = useState<string[]>([]);

  const AI_PHASES = [
    "Analyzing topic scope...",
    "Structuring learning path...",
    "Generating session titles...",
    "Adding resources & exercises...",
    "Finalizing syllabus...",
  ];

  function handleAI() {
    if (locked) return;
    setMode('ai');
    setGenerating(true);
    let i = 0;
    const interval = setInterval(() => {
      setPhases(p => [...p, AI_PHASES[i]]);
      i++;
      if (i >= AI_PHASES.length) {
        clearInterval(interval);
        setTimeout(() => { setGenerating(false); setDone(true); }, 400);
      }
    }, 600);
  }

  if (done) {
    return (
      <div className="flex flex-col gap-3">
        <div className="bg-[#E8F9F7] rounded-xl p-4 text-[13px] text-[#1FA090]"
          style={{ fontFamily: 'var(--font-body)' }}>
          <CheckCircle2 className="size-4 inline mr-1.5 text-[#1FA090]" strokeWidth={2} />6-session syllabus generated for <strong>{topic}</strong> ({level})!
        </div>
        <button
          onClick={() => !locked && onConfirm('ai')}
          disabled={locked}
          className="w-full py-2.5 rounded-xl bg-[#2BBFAA] text-white text-[14px] font-bold hover:bg-[#1FA090] transition-colors"
          style={{ fontFamily: 'var(--font-body)' }}>
          Launch Bubble
        </button>
      </div>
    );
  }

  if (generating) {
    return (
      <div className="flex flex-col gap-2 py-2">
        {phases.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-[13px] text-[#495057]"
            style={{ fontFamily: 'var(--font-body)' }}>
            <Check className="size-3.5 text-[#2BBFAA] shrink-0" strokeWidth={2.5} /> {p}
          </div>
        ))}
        <div className="flex items-center gap-2 text-[13px] text-[#ADB5BD]"
          style={{ fontFamily: 'var(--font-body)' }}>
          <div className="flex gap-1">
            {[0,1,2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#2BBFAA] animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
          Building...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleAI}
        disabled={locked}
        className="flex items-center gap-3 p-4 rounded-xl border-2 border-[#A8E8E2] bg-[#E8F9F7] hover:bg-[#d0f5f1] transition-colors text-left disabled:opacity-50"
        style={{ fontFamily: 'var(--font-body)' }}>
        <Bot className="size-6 text-[#1FA090] shrink-0" strokeWidth={1.75} />
        <div>
          <p className="font-semibold text-[14px] text-[#1FA090]">Build with AI</p>
          <p className="text-[12px] text-[#6C757D]">AI generates your full syllabus in seconds</p>
        </div>
      </button>
      <button
        onClick={() => !locked && onConfirm('manual')}
        disabled={locked}
        className="flex items-center gap-3 p-4 rounded-xl border border-[#E9ECEF] hover:border-[#2BBFAA] hover:bg-[#F8F9FA] transition-colors text-left disabled:opacity-50"
        style={{ fontFamily: 'var(--font-body)' }}>
        <Pencil className="size-6 text-[#495057] shrink-0" strokeWidth={1.75} />
        <div>
          <p className="font-semibold text-[14px] text-[#212529]">Build manually</p>
          <p className="text-[12px] text-[#6C757D]">Add sessions yourself, at your own pace</p>
        </div>
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CreateBabelFlow() {
  const navigate = useNavigate();
  const { addBubble, currentUser } = useApp();
  const [data, setData] = useState<Partial<BubbleData>>({});
  const [currentStep, setCurrentStep] = useState<StepKey>('topic');
  const [feed, setFeed] = useState<FeedItem[]>([
    { kind: 'ai', id: 0, text: AI_PROMPTS.topic },
    { kind: 'widget', id: 1, step: 'topic', locked: false },
  ]);
  const [showTransition, setShowTransition] = useState(false);
  const feedEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [feed]);

  function advanceTo(nextStep: StepKey | null, userText: string, newData: Partial<BubbleData>) {
    const updatedData = { ...data, ...newData };
    setData(updatedData);

    // Lock current widget
    setFeed(f => f.map(item =>
      item.kind === 'widget' && item.step === currentStep ? { ...item, locked: true } : item
    ));

    setTimeout(() => {
      // Add user message
      setFeed(f => [...f, { kind: 'user', id: Date.now(), text: userText }]);

      if (!nextStep) {
        // Launch!
        handleLaunch(updatedData as BubbleData);
        return;
      }

      setTimeout(() => {
        setCurrentStep(nextStep);
        setFeed(f => [
          ...f,
          { kind: 'ai', id: Date.now() + 1, text: AI_PROMPTS[nextStep] },
          { kind: 'widget', id: Date.now() + 2, step: nextStep, locked: false },
        ]);
      }, 500);
    }, 200);
  }

  function handleLaunch(finalData: BubbleData) {
    setShowTransition(true);
    const sessions = generateMockSessions(finalData.topic, finalData.level);
    const newBubble: Bubble = {
      id: `bubble-${Date.now()}`,
      title: finalData.topic,
      topic: finalData.topic,
      description: `A cohort-based learning group on ${finalData.topic}. ${finalData.seats} participants, every ${finalData.day} at ${finalData.time}.`,
      level: finalData.level,
      status: 'open',
      maxSeats: finalData.seats,
      takenSeats: 1,
      scheduleDay: finalData.day,
      scheduleTime: finalData.time,
      startDate: 'Mar 18, 2026',
      founderId: currentUser?.id ?? 'user-me',
      memberIds: [currentUser?.id ?? 'user-me'],
      sessions: finalData.syllabusMode === 'ai' ? sessions : [],
      resources: [],
    };
    addBubble(newBubble);
    setTimeout(() => navigate(`/group/${newBubble.id}`), 1800);
  }

  const stepIndex = STEP_ORDER.indexOf(currentStep);
  const progress  = Math.round(((stepIndex + 1) / STEP_ORDER.length) * 100);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#E9ECEF] sticky top-0 z-20">
        <div className="max-w-xl mx-auto px-4 py-3.5 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-[#6C757D] hover:text-[#212529] transition-colors">
            <ChevronLeft className="size-5" strokeWidth={1.75} />
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[13px] font-semibold text-[#212529]" style={{ fontFamily: 'var(--font-display)' }}>
                Create a Bubble
              </p>
              <p className="text-[12px] text-[#ADB5BD]" style={{ fontFamily: 'var(--font-body)' }}>
                Step {stepIndex + 1} of {STEP_ORDER.length}
              </p>
            </div>
            <div className="h-1.5 bg-[#F1F3F5] rounded-full">
              <div className="h-full rounded-full bg-[#2BBFAA] transition-all duration-500"
                style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </header>

      {/* Feed */}
      <div className="flex-1 max-w-xl mx-auto w-full px-4 py-6 flex flex-col gap-4 overflow-y-auto">
        {feed.map(item => {
          if (item.kind === 'ai') {
            return (
              <div key={item.id} className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-[#2BBFAA] flex items-center justify-center shrink-0">
                  <Sparkles className="size-4 text-white" strokeWidth={1.75} />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 text-[14px] text-[#212529] max-w-[85%]"
                  style={{ fontFamily: 'var(--font-body)', boxShadow: 'var(--shadow-sm)' }}>
                  {item.text}
                </div>
              </div>
            );
          }
          if (item.kind === 'user') {
            return (
              <div key={item.id} className="flex justify-end">
                <div className="bg-[#2BBFAA] text-white rounded-2xl rounded-tr-sm px-4 py-3 text-[14px] max-w-[80%]"
                  style={{ fontFamily: 'var(--font-body)' }}>
                  {item.text}
                </div>
              </div>
            );
          }
          // widget
          if (item.kind === 'widget') {
            return (
              <div key={item.id} className="ml-11">
                {item.step === 'topic' && (
                  <TopicWidget locked={item.locked}
                    onSelect={t => advanceTo('level', t, { topic: t })} />
                )}
                {item.step === 'level' && (
                  <LevelWidget locked={item.locked}
                    onSelect={l => advanceTo('schedule', l, { level: l })} />
                )}
                {item.step === 'schedule' && (
                  <ScheduleWidget locked={item.locked}
                    onSelect={(day, time) => advanceTo('seats', `Every ${day} @ ${time}`, { day, time })} />
                )}
                {item.step === 'seats' && (
                  <SeatsWidget locked={item.locked}
                    onSelect={seats => advanceTo('sessions', `${seats} participants`, { seats })} />
                )}
                {item.step === 'sessions' && (
                  <SessionsWidget
                    topic={data.topic ?? ''}
                    level={data.level ?? 'Intermediate'}
                    locked={item.locked}
                    onConfirm={mode => advanceTo(null, mode === 'ai' ? 'Build with AI' : 'Build manually', { syllabusMode: mode })}
                  />
                )}
              </div>
            );
          }
          return null;
        })}
        <div ref={feedEndRef} />
      </div>

      {/* Transition */}
      {showTransition && (
        <BabelTransition onComplete={() => {}} label="Launching your Bubble..." isCreate />
      )}
    </div>
  );
}
