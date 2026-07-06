import { useState, useRef, useEffect } from "react";
import svgPaths from "../../imports/svg-qitip7ba3e";

// ─── Icons ───────────────────────────────────────────────────────────────────

function SparkleIcon({ stroke = "#0F9A8F", size = 13 }: { stroke?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none">
      <g clipPath="url(#clip-sparkle-ca)">
        <path d={svgPaths.p880880} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        <path d="M10.8333 1.08333V3.25" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        <path d="M11.9167 2.16667H9.75" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        <path d={svgPaths.p38cb080} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
      </g>
      <defs>
        <clipPath id="clip-sparkle-ca">
          <rect fill="white" height="13" width="13" />
        </clipPath>
      </defs>
    </svg>
  );
}

function SendIcon({ color = "white" }: { color?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <g clipPath="url(#clip-send-ca)">
        <path d={svgPaths.p2ca29780} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        <path d={svgPaths.p3f86e380} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
      </g>
      <defs>
        <clipPath id="clip-send-ca">
          <rect fill="white" height="13" width="13" />
        </clipPath>
      </defs>
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
      <path d={svgPaths.pbeb0700} stroke="#789693" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
      <path d={svgPaths.pea34000} stroke="#789693" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
      <path d="M6.5 10.2917V11.9167" stroke="#789693" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
    </svg>
  );
}

function BotAvatar({ size = 40 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.35,
        background: "linear-gradient(160deg, #0F9A8F 0%, #C8F5F0 100%)",
      }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 26 26" fill="none">
        <path d="M13 8.66667V4.33333H8.66667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
        <path d={svgPaths.p3a5d6980} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
        <path d="M2.16667 15.1667H4.33333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
        <path d="M21.6667 15.1667H23.8333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
        <path d="M16.25 14.0833V16.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
        <path d="M9.75 14.0833V16.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
      </svg>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SUGGESTIONS = [
  { icon: "🎯", label: "Find a Babel for UI Design" },
  { icon: "🚀", label: "Create a new learning group" },
  { icon: "🤝", label: "Join a group on AI & Product" },
  { icon: "📚", label: "Explore featured curricula" },
];

const QUICK_ACTIONS = [
  "Show me all 'Live' AI components",
  "Explain the 'Governor Control' pattern",
  "How do I implement 'Dynamic Blocks'?",
  "Create a dashboard for agent performance",
];

const DEMO_REPLIES: Record<string, string> = {
  default:
    "Great question! I can help you find the perfect Babel, explore learning groups, or guide your creation flow. What would you like to do?",
  "show me all 'live' ai components":
    "Here are the **Live AI components** in the curriculum: Governor Control, Dynamic Block Renderer, Agent Flow Visualiser, and the Prompt Sandbox. Each is covered in Steps 4–7 of the syllabus. Want me to open one?",
  "explain the 'governor control' pattern":
    "The **Governor Control** pattern acts as a rate-limiter and permission layer between your UI triggers and the AI agent, preventing runaway loops and enforcing cost ceilings. Think of it as a circuit-breaker for your AI calls.",
  "how do i implement 'dynamic blocks'?":
    "**Dynamic Blocks** — the key idea: each block is a stateless component that receives a `blockType` prop and renders conditionally. You wire it to a Supabase table so the AI can push new block configs at runtime. Want the starter snippet?",
  "create a dashboard for agent performance":
    "I'd suggest a three-panel layout: **Live Metrics** (token usage, latency), **Agent Log Feed** (streamed events), and **Health Gauges** (success rate, error rate). Should I scaffold the component structure for you?",
  "find a babel for ui design":
    "Found **3 Babels** matching UI Design! 🎨 Top picks: *Figma Make Mastery* (Tuesday 7PM), *Mobile UX Patterns* (Thursday 6PM), and *Design Systems Pro* (Wednesday 8PM). Want to join any of these?",
  "create a new learning group":
    "Let's create your Babel! I'll walk you through it step by step — Topic → Audience → Schedule → Start Date → Participants → Duration. Ready to start? Just say **'Start creating'** or click the Create button.",
  "join a group on ai & product":
    "I found **AI-Native Product Design** — every Tuesday @ 7PM with 4 of 8 seats remaining. This group covers prompt-driven prototyping and AI-integrated product flows. Want me to open it for you?",
  "explore featured curricula":
    "Here are this week's **Featured Babels**: *PM Bootcamp* 🚀, *AI Product Design* 🤖, *Mobile UX Patterns* 📱, and *Design Fundamentals* 🎨. All have high engagement and upcoming sessions!",
  "start creating":
    "Awesome! Let's build your Babel 🚀 First question: **What topic do you want to teach or learn?** Be as specific as you like — e.g. 'React performance optimization' or 'UX research methods'.",
  "launch agent flow demo":
    "🚀 Launching the **Agent Flow Demo**! This walks through a full request → governor check → tool call → response cycle. Watch the status indicators update in real time. (Demo mode — no real API calls.)",
};

function getReply(text: string): string {
  const key = text.toLowerCase().trim();
  for (const k of Object.keys(DEMO_REPLIES)) {
    if (k !== "default" && key.includes(k)) return DEMO_REPLIES[k];
  }
  return DEMO_REPLIES.default;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

interface CenterAssistantProps {
  onNavigate?: (path: string) => void;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CenterAssistant({ onNavigate }: CenterAssistantProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Animate in/out
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      setVisible(false);
    }
  }, [open]);

  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing]);

  const openModal = (prefill?: string) => {
    setOpen(true);
    if (prefill) setInput(prefill);
  };

  const closeModal = () => {
    setVisible(false);
    setTimeout(() => setOpen(false), 250);
  };

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = getReply(trimmed);
      const assistantMsg: Message = { id: Date.now() + 1, role: "assistant", text: reply };
      setMessages((prev) => [...prev, assistantMsg]);
      setTyping(false);
    }, 950);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <>
      {/* ── Collapsed Search Bar Trigger ── */}
      <div
        className="bg-white h-[72px] max-w-[900px] w-full rounded-[36px] relative cursor-text"
        style={{
          boxShadow: "0px 8px 24px -6px rgba(0,0,0,0.1)",
          border: "2px solid #e5e7eb",
        }}
        onClick={() => openModal()}
      >
        <div className="flex items-center h-full px-5 gap-3 pointer-events-none select-none">
          {/* Sparkle */}
          <div className="size-9 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(15,154,143,0.08)" }}>
            <SparkleIcon size={16} />
          </div>
          <span className="flex-1 text-[#6b7280] text-[16px] font-['Inter',sans-serif]">
            Ask me anything — find a Babel, explore topics, or start creating…
          </span>
          {/* Model chip */}
          <div className="hidden sm:flex items-center gap-2 bg-[#f9fafb] rounded-[20px] px-3 h-9 border border-[#e5e7eb]">
            <span className="font-semibold text-[#111827] text-[13px] font-['Inter',sans-serif]">Claude Sonnet 3.5</span>
            <svg className="size-3.5" fill="none" viewBox="0 0 20 20">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Send */}
          <div
            className="size-10 rounded-[20px] flex items-center justify-center shrink-0"
            style={{
              background: "#11b09f",
              boxShadow: "0px 4px 12px 0px rgba(17,176,159,0.25)",
            }}
          >
            <SendIcon />
          </div>
        </div>
      </div>

      {/* ── FAB trigger ── */}
      <button
        onClick={() => openModal()}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95"
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "linear-gradient(145deg, #0F9A8F 0%, #0d8a80 100%)",
        }}
        aria-label="Open Assistant"
      >
        <SparkleIcon stroke="white" size={16} />
      </button>

      {/* ── Modal Overlay ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(10, 30, 28, 0.45)",
            backdropFilter: "blur(6px)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            className="relative flex flex-col overflow-hidden w-full"
            style={{
              maxWidth: 640,
              maxHeight: "min(720px, calc(100vh - 48px))",
              borderRadius: 28,
              background: "#fff",
              border: "1px solid rgba(15,154,143,0.15)",
              boxShadow: "0px 32px 80px -8px rgba(0,0,0,0.25), 0px 0px 0px 1px rgba(15,154,143,0.08)",
              transform: visible ? "scale(1) translateY(0)" : "scale(0.95) translateY(16px)",
              transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease",
              opacity: visible ? 1 : 0,
            }}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center justify-between px-6 shrink-0"
              style={{
                height: 64,
                borderBottom: "1px solid rgba(15,154,143,0.12)",
                background: "linear-gradient(90deg, rgba(15,154,143,0.04) 0%, rgba(255,255,255,0) 100%)",
              }}
            >
              <div className="flex items-center gap-3">
                <BotAvatar size={32} />
                <div>
                  <p style={{ color: "#1c3835", fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>We Learn Assistant</p>
                  <p style={{ color: "#789693", fontSize: 11, lineHeight: 1.4 }}>Powered by Enlighten AI</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {hasMessages && (
                  <button
                    onClick={() => setMessages([])}
                    className="flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-[#789693] text-xs px-2.5 h-8 gap-1.5"
                    title="New conversation"
                  >
                    <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                      <path d={svgPaths.p37b7e680} stroke="#789693" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
                      <path d="M8.125 1.625V11.375" stroke="#789693" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
                    </svg>
                    New chat
                  </button>
                )}
                <button
                  onClick={closeModal}
                  className="flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                  style={{ width: 32, height: 32 }}
                  title="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M10.5 3.5L3.5 10.5" stroke="#789693" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
                    <path d="M3.5 3.5L10.5 10.5" stroke="#789693" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="flex-1 overflow-y-auto" style={{ padding: hasMessages ? "20px 24px 12px" : "28px 24px 12px" }}>
              {!hasMessages ? (
                /* ── Welcome State ── */
                <div className="flex flex-col gap-5">
                  {/* Greeting */}
                  <div className="flex items-start gap-3">
                    <BotAvatar size={40} />
                    <div
                      className="px-4 py-3 text-sm leading-relaxed"
                      style={{
                        borderRadius: "16px 16px 16px 4px",
                        background: "rgba(15,154,143,0.07)",
                        color: "#1c3835",
                        fontSize: 14,
                        maxWidth: "85%",
                      }}
                    >
                      Hey! 👋 I'm your <strong>We Learn Assistant</strong>. I can help you find a Babel, explore topics, connect with groups, or guide you through creating your own learning experience.
                    </div>
                  </div>

                  {/* Quick suggestions grid */}
                  <div>
                    <p
                      className="uppercase tracking-widest mb-3"
                      style={{ color: "#789693", fontSize: 10, fontWeight: 700 }}
                    >
                      Quick actions
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s.label}
                          onClick={() => send(s.label)}
                          className="flex items-center gap-2.5 text-left px-4 py-3 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                          style={{
                            background: "rgba(15,154,143,0.06)",
                            border: "1px solid rgba(15,154,143,0.15)",
                          }}
                        >
                          <span className="text-xl shrink-0">{s.icon}</span>
                          <span style={{ color: "#1c3835", fontSize: 13, lineHeight: 1.4 }}>{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span style={{ color: "#789693", fontSize: 11, fontWeight: 600 }}>or explore</span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>

                  {/* Popular explorations */}
                  <div>
                    <p
                      className="uppercase tracking-widest mb-3"
                      style={{ color: "#789693", fontSize: 10, fontWeight: 700 }}
                    >
                      Popular explorations
                    </p>
                    <div className="flex flex-col gap-2">
                      {QUICK_ACTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => send(q)}
                          className="w-full text-left px-4 py-2.5 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                          style={{
                            background: "#f9fafb",
                            border: "1px solid #e5e7eb",
                            color: "#374151",
                            fontSize: 13,
                          }}
                        >
                          <span className="text-[#11b09f] mr-2">→</span>
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* ── Chat Messages ── */
                <div className="flex flex-col gap-4">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex items-end gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {m.role === "assistant" && <BotAvatar size={28} />}
                      <div
                        className="max-w-[78%] px-4 py-2.5 text-sm leading-relaxed"
                        style={{
                          borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                          background: m.role === "user" ? "#0F9A8F" : "rgba(15,154,143,0.08)",
                          color: m.role === "user" ? "white" : "#1c3835",
                          fontSize: 14,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: m.text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                        }}
                      />
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {typing && (
                    <div className="flex items-end gap-2.5">
                      <BotAvatar size={28} />
                      <div
                        className="flex items-center gap-1 px-4 py-3"
                        style={{
                          borderRadius: "18px 18px 18px 4px",
                          background: "rgba(15,154,143,0.08)",
                        }}
                      >
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="block rounded-full"
                            style={{
                              width: 6,
                              height: 6,
                              background: "#0F9A8F",
                              animation: `ca-bounce 1.2s ${i * 0.2}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>
              )}
            </div>

            {/* ── Input Footer ── */}
            <div
              className="shrink-0 px-5 pb-5 pt-3"
              style={{ borderTop: "1px solid rgba(15,154,143,0.1)" }}
            >
              <div
                className="flex flex-col gap-2 p-3.5"
                style={{
                  borderRadius: 18,
                  border: "1.5px solid rgba(15,154,143,0.2)",
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(15,154,143,0.06)",
                }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask me anything about learning groups…"
                  className="w-full bg-transparent outline-none resize-none"
                  style={{ color: "#1c3835", fontSize: 14, minHeight: 22, maxHeight: 100 }}
                  rows={1}
                />
                <div className="flex items-center justify-between">
                  {/* C3S/O badge */}
                  <button
                    className="flex items-center gap-2 px-2.5 py-1.5 transition-colors hover:bg-[#d6efec] rounded-xl"
                    style={{
                      background: "rgba(15,154,143,0.05)",
                      border: "1px solid rgba(15,154,143,0.2)",
                    }}
                  >
                    <SparkleIcon />
                    <span style={{ color: "#0F9A8F", fontSize: 11, fontWeight: 700 }}>C3S/O</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Mic */}
                    <button className="flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" style={{ width: 30, height: 30 }}>
                      <MicIcon />
                    </button>
                    {/* Send */}
                    <button
                      onClick={() => send(input)}
                      disabled={!input.trim()}
                      className="flex items-center justify-center transition-all disabled:opacity-35 hover:scale-105 active:scale-95"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: "linear-gradient(145deg, #0F9A8F 0%, #0d8a80 100%)",
                        boxShadow: input.trim() ? "0 4px 12px rgba(15,154,143,0.35)" : "none",
                      }}
                    >
                      <SendIcon />
                    </button>
                  </div>
                </div>
              </div>
              <p
                className="text-center mt-2.5 opacity-40"
                style={{ color: "#789693", fontSize: 10, letterSpacing: "0.2px" }}
              >
                Powered by Enlighten AI • We Learn Assistant v1.2
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ca-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
