
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { Search, Sparkles, Wand2, Paperclip, Send, Loader2, User, ChevronRight } from 'lucide-react';

const ACTIVE_COHORTS = [
  { id: '1', title: 'Product Management Foundations', category: 'Product Management', description: 'Strategy, Roadmaps & Stakeholder Management fundamentals for modern teams.' },
  { id: '2', title: 'UX Design Mastery', category: 'UX Design', description: 'User-Centered Design & Prototyping techniques used by world-class studios.' },
  { id: '3', title: 'User Research Fundamentals', category: 'User Research', description: 'Interviews, Testing & Data Analysis to drive product decisions.' }
];

const SYSTEM_PROMPT = `You are the Strategic Matchmaker AI for WE Learn (Women Experience Learn). 
WE Learn is a high-fidelity social learning platform for cohort-based courses with 1:1 tutors, specifically designed for women.
Key values: Social learning, peer accountability, 1:1 tutors, empowerment.
Success rate: 10x higher than traditional online courses.

Available Cohorts:
${ACTIVE_COHORTS.map(c => `- ${c.title} (${c.category}): ${c.description}`).join('\n')}

Flow:
1. Answer questions about the initiative (WE Learn).
2. Match users to existing cohorts if they express interest in those topics.
3. If no match is found, explain that we can help them CREATE a custom course syllabus and lead them to our "Course Architect" tool.`;

interface HeroProps {
  onOpenArchitect: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenArchitect }) => {
  const { t, isRTL } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationHistory = useRef<{ role: string, content: string }[]>([]);

  const sendToGroq = async (userMessage: string) => {
    const apiKey = (import.meta as any).env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is missing! Please add it to your .env.local file.");
    }

    // Add user message to history
    conversationHistory.current.push({ role: "user", content: userMessage });

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...conversationHistory.current
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || "I couldn't generate a response.";

    // Add assistant response to history
    conversationHistory.current.push({ role: "assistant", content: assistantMessage });

    return assistantMessage;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const text = await sendToGroq(userMessage);
      setMessages(prev => [...prev, { role: 'ai', text }]);
    } catch (error: any) {
      console.error("Groq Error:", error);
      const errorMsg = error.message?.includes("429")
        ? "I'm a bit overwhelmed right now (Rate Limit). Please wait a moment."
        : `Error: ${error.message || "Unknown error"}. Please check your API key.`;
      setMessages(prev => [...prev, { role: 'ai', text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/60 uppercase tracking-widest font-bold mb-6 animate-in fade-in duration-700">
          <Sparkles className="w-3 h-3 text-blue-400" />
          WE Learn: Empowering Women via Social Learning
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-2 duration-700">
          {t('hero_title')}
        </h1>

        <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700">
          {t('hero_subtitle')}
        </p>

        {/* Integrated AI Chat / Search Bar */}
        <div className="max-w-3xl mx-auto mb-4 group text-left relative z-10 transition-all duration-500">
          {messages.length > 0 && (
            <div className="mb-6 space-y-4 max-h-[300px] overflow-y-auto px-2 scrollbar-thin">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'ai' ? 'bg-blue-600/20' : 'bg-white/10'}`}>
                    {m.role === 'ai' ? <Sparkles className="w-4 h-4 text-blue-400" /> : <User className="w-4 h-4 text-white/60" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[80%] ${m.role === 'ai'
                    ? 'bg-white/5 text-white/80 border border-white/5 prose prose-invert prose-sm'
                    : 'bg-blue-600 text-white shadow-lg font-medium'
                    }`}>
                    {m.text}
                    {m.role === 'ai' && (m.text.toLowerCase().includes('create') || m.text.toLowerCase().includes('architect')) && (
                      <div className="mt-4">
                        <button
                          onClick={onOpenArchitect}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-400/20 hover:bg-blue-400/30 border border-blue-400/30 rounded-xl text-blue-300 text-xs font-bold transition-all"
                        >
                          Open Course Architect
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 animate-in fade-in">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0">
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                  </div>
                  <div className="p-4 rounded-2xl text-sm bg-white/5 text-white/40 border border-white/5 italic">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          <p className="text-[11px] text-white/40 mb-3 px-1 font-bold uppercase tracking-widest">
            {messages.length === 0 ? "Share your goals to find your cohort" : "Ask a follow up..."}
          </p>

          <div className={`relative transition-all duration-500 rounded-3xl glass p-4 ${isFocused ? 'ring-2 ring-blue-600/50 bg-white/[0.05]' : 'bg-white/[0.02]'}`}>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Wand2 className="w-5 h-5 text-white/70" />
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-white/20 resize-none pt-2 text-sm h-12 outline-none"
                placeholder={t('search_placeholder')}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <div className="flex gap-2">
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white/80">
                  <Sparkles className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white/80">
                  <Paperclip className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-2 py-1 rounded bg-white/5 text-[10px] text-white/40 border border-white/10 font-bold">
                  Llama 3.3
                </div>
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className={`bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2.5 rounded-xl transition-all hover:opacity-90 shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50`}
                >
                  <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
