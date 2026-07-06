import { useState, useRef, useEffect } from "react";
import svgPaths from "../../imports/svg-qitip7ba3e";

// ─── SVG Icons (from Figma) ───────────────────────────────────────────────────

function SparkleIcon({ stroke = "#0F9A8F" }: { stroke?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <g clipPath="url(#clip-sparkle)">
        <path d={svgPaths.p880880} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        <path d="M10.8333 1.08333V3.25" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        <path d="M11.9167 2.16667H9.75" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        <path d={svgPaths.p38cb080} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
      </g>
      <defs>
        <clipPath id="clip-sparkle">
          <rect fill="white" height="13" width="13" />
        </clipPath>
      </defs>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <g clipPath="url(#clip-send)">
        <path d={svgPaths.p2ca29780} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        <path d={svgPaths.p3f86e380} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
      </g>
      <defs>
        <clipPath id="clip-send">
          <rect fill="white" height="13" width="13" />
        </clipPath>
      </defs>
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d={svgPaths.pbeb0700} stroke="#789693" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
      <path d={svgPaths.pea34000} stroke="#789693" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
      <path d="M6.5 10.2917V11.9167" stroke="#789693" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
    </svg>
  );
}

function BotIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M13 8.66667V4.33333H8.66667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
      <path d={svgPaths.p3a5d6980} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
      <path d="M2.16667 15.1667H4.33333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
      <path d="M21.6667 15.1667H23.8333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
      <path d="M16.25 14.0833V16.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
      <path d="M9.75 14.0833V16.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.16667" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

interface CreatorAssistantProps {
  onOpenChange?: (open: boolean) => void;
}

const POPULAR = [
  "Show me all 'Live' AI components",
  "Explain the 'Governor Control' pattern",
  "How do I implement 'Dynamic Blocks'?",
  "Create a dashboard for agent performance",
];

const DEMO_REPLIES: Record<string, string> = {
  default:
    "Great question! As your Creator Assistant, I can help you navigate the Figma Make Mastery curriculum, explain concepts, suggest components, and guide your builds. What would you like to explore?",
  "show me all 'live' ai components":
    "Here are the **Live AI components** in the curriculum: Governor Control, Dynamic Block Renderer, Agent Flow Visualiser, and the Prompt Sandbox. Each is covered in Steps 4–7 of the syllabus. Want me to open one?",
  "explain the 'governor control' pattern":
    "The **Governor Control** pattern is covered in Step 5. It acts as a rate-limiter and permission layer between your UI triggers and the AI agent, preventing runaway loops and enforcing cost ceilings. Think of it as a circuit-breaker for your AI calls.",
  "how do i implement 'dynamic blocks'?":
    "**Dynamic Blocks** live in Step 6. The key idea: each block is a stateless component that receives a `blockType` prop and renders conditionally. You wire it to a Supabase table so the AI can push new block configs at runtime. Want the starter snippet?",
  "create a dashboard for agent performance":
    "Sure! I'd suggest a three-panel layout: **Live Metrics** (token usage, latency), **Agent Log Feed** (streamed events), and **Health Gauges** (success rate, error rate). Should I scaffold the component structure for you?",
  "launch agent flow demo":
    "🚀 Launching the **Agent Flow Demo**! This simulated production sequence walks through a full request → governor check → tool call → response cycle. Watch the status indicators update in real time. (Demo mode — no real API calls are made.)",
};

function getReply(text: string): string {
  const key = text.toLowerCase().trim();
  for (const k of Object.keys(DEMO_REPLIES)) {
    if (k !== "default" && key.includes(k)) return DEMO_REPLIES[k];
  }
  return DEMO_REPLIES.default;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CreatorAssistant({ onOpenChange }: CreatorAssistantProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply: Message = { id: Date.now() + 1, role: "assistant", text: getReply(text) };
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
    }, 900);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* ── Floating Trigger Button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Creator Assistant"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95"
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "linear-gradient(145deg, #0F9A8F 0%, #0d8a80 100%)",
        }}
      >
        {open ? (
          /* X close icon */
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M13.5 4.5L4.5 13.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M4.5 4.5L13.5 13.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <SparkleIcon stroke="white" />
        )}
      </button>

      {/* ── Panel ── */}
      {open && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden shadow-2xl"
          style={{
            width: 'min(370px, calc(100vw - 32px))',
            height: 'min(560px, calc(100vh - 100px))',
            bottom: 'max(76px, env(safe-area-inset-bottom, 76px))',
            right: 'max(24px, env(safe-area-inset-right, 24px))',
            borderRadius: 24,
            border: "1px solid rgba(15,154,143,0.2)",
            background: "#fff",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 shrink-0"
            style={{
              height: 64,
              borderBottom: "1px solid rgba(15,154,143,0.2)",
            }}
          >
            {/* Title */}
            <div className="flex items-center gap-2.5">
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: "rgba(15,154,143,0.1)",
                }}
              >
                <SparkleIcon />
              </div>
              <span style={{ color: "#1c3835", fontSize: 14, fontWeight: 700 }}>Creator Assistant</span>
            </div>
            {/* Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([])}
                className="flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                style={{ width: 29, height: 29 }}
                title="New conversation"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d={svgPaths.p37b7e680} stroke="#789693" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
                  <path d="M8.125 1.625V11.375" stroke="#789693" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
                </svg>
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                style={{ width: 29, height: 29 }}
                title="Close"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M9.75 3.25L3.25 9.75" stroke="#789693" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
                  <path d="M3.25 3.25L9.75 9.75" stroke="#789693" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body — scrollable */}
          <div className="flex-1 overflow-y-auto" style={{ padding: "26px 20px 12px" }}>
            {messages.length === 0 ? (
              /* Welcome state */
              <div className="flex flex-col items-center gap-4">
                {/* Bot avatar */}
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 16,
                    background: "linear-gradient(180deg, #0F9A8F 0%, #C8F5F0 100%)",
                  }}
                >
                  <BotIcon />
                </div>
                <div className="text-center">
                  <p style={{ color: "#1c3835", fontSize: 18, fontWeight: 700 }}>Hey, Designer</p>
                  <p style={{ color: "#789693", fontSize: 14, marginTop: 6 }}>What are you looking to build today?</p>
                </div>

                {/* Agent Flow Demo card */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    borderRadius: 16,
                    background: "linear-gradient(153deg, rgba(15,154,143,0.1) 0%, rgba(200,245,240,0.05) 100%)",
                    border: "1px solid rgba(15,154,143,0.2)",
                  }}
                >
                  {/* Blur orb */}
                  <div
                    className="absolute"
                    style={{
                      width: 104,
                      height: 104,
                      borderRadius: "50%",
                      background: "rgba(15,154,143,0.05)",
                      filter: "blur(64px)",
                      top: -51,
                      right: -24,
                    }}
                  />
                  <div className="relative p-5">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div
                        className="flex items-center justify-center shrink-0"
                        style={{
                          width: 29,
                          height: 29,
                          borderRadius: "50%",
                          background: "#0F9A8F",
                        }}
                      >
                        <SparkleIcon stroke="white" />
                      </div>
                      <span style={{ color: "#1c3835", fontSize: 14, fontWeight: 700 }}>Real Product Flow</span>
                    </div>
                    <p style={{ color: "#789693", fontSize: 12, lineHeight: "1.6", marginBottom: 16 }}>
                      Experience AI patterns in a simulated production sequence to test agent behaviors and UX.
                    </p>
                    <button
                      onClick={() => send("Launch Agent Flow Demo")}
                      className="w-full flex items-center justify-center transition-opacity hover:opacity-90 active:opacity-80"
                      style={{
                        height: 33,
                        borderRadius: 8,
                        background: "#0F9A8F",
                        color: "white",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      Launch Agent Flow Demo
                    </button>
                  </div>
                </div>

                {/* Popular explorations */}
                <div className="w-full">
                  <p
                    className="text-center uppercase tracking-widest mb-2.5"
                    style={{ color: "#789693", fontSize: 10, fontWeight: 700 }}
                  >
                    Popular explorations
                  </p>
                  <div className="flex flex-col gap-2">
                    {POPULAR.map((q) => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        className="w-full text-left px-3.5 py-2 transition-colors hover:bg-[#d6efec]"
                        style={{
                          borderRadius: 8,
                          background: "#ebf5f4",
                          border: "1px solid rgba(15,154,143,0.2)",
                          color: "#1c3835",
                          fontSize: 13,
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Chat messages */
              <div className="flex flex-col gap-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {m.role === "assistant" && (
                      <div
                        className="flex items-center justify-center shrink-0 mr-2 self-end"
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 8,
                          background: "linear-gradient(180deg, #0F9A8F 0%, #C8F5F0 100%)",
                        }}
                      >
                        <BotIcon />
                      </div>
                    )}
                    <div
                      className="max-w-[75%] px-3 py-2 text-sm leading-relaxed"
                      style={{
                        borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                        background: m.role === "user" ? "#0F9A8F" : "rgba(15,154,143,0.08)",
                        color: m.role === "user" ? "white" : "#1c3835",
                        fontSize: 13,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: m.text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  </div>
                ))}
                {typing && (
                  <div className="flex items-end gap-2">
                    <div
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 8,
                        background: "linear-gradient(180deg, #0F9A8F 0%, #C8F5F0 100%)",
                      }}
                    >
                      <BotIcon />
                    </div>
                    <div
                      className="flex items-center gap-1 px-3 py-2.5"
                      style={{
                        borderRadius: "14px 14px 14px 4px",
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
                            animation: `bounce 1.2s ${i * 0.2}s infinite`,
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

          {/* Footer — input */}
          <div
            className="shrink-0 px-5 pb-5 pt-4"
            style={{ borderTop: "1px solid rgba(15,154,143,0.2)" }}
          >
            <div
              className="flex flex-col gap-2.5 p-3.5"
              style={{
                borderRadius: 16,
                border: "1px solid rgba(15,154,143,0.2)",
                background: "#fff",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about AI components..."
                className="w-full bg-transparent outline-none text-sm"
                style={{ color: "#1c3835", fontSize: 14 }}
              />
              <div className="flex items-center justify-between">
                {/* C3S/O badge */}
                <button
                  className="flex items-center gap-2 px-2.5 py-1.5 transition-colors hover:bg-[#d6efec]"
                  style={{
                    borderRadius: 8,
                    background: "rgba(15,154,143,0.05)",
                    border: "1px solid rgba(15,154,143,0.2)",
                  }}
                >
                  <SparkleIcon />
                  <span style={{ color: "#0F9A8F", fontSize: 11, fontWeight: 700 }}>C3S/O</span>
                </button>
                <div className="flex items-center gap-1.5">
                  {/* Mic */}
                  <button className="flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" style={{ width: 29, height: 29 }}>
                    <MicIcon />
                  </button>
                  {/* Send */}
                  <button
                    onClick={() => send(input)}
                    disabled={!input.trim()}
                    className="flex items-center justify-center transition-opacity disabled:opacity-40"
                    style={{
                      width: 29,
                      height: 29,
                      borderRadius: 8,
                      background: "#0F9A8F",
                    }}
                  >
                    <SendIcon />
                  </button>
                </div>
              </div>
            </div>
            <p className="text-center mt-3 opacity-40" style={{ color: "#789693", fontSize: 10, letterSpacing: "0.2px" }}>
              Powered by Enlighten AI • Creator Assistant v1.2
            </p>
          </div>
        </div>
      )}

      {/* Bounce keyframes */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  );
}