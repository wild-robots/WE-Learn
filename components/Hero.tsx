
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { Sparkles, Send, Loader2, User, ChevronRight } from 'lucide-react';
import { sendToGroq, formatGroqError, type GroqMessage } from '../groq';

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
  onOpenArchitect: (context?: string) => void; // Fix #3: pass context
}

const Hero: React.FC<HeroProps> = ({ onOpenArchitect }) => {
  const { t, isRTL } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationHistory = useRef<GroqMessage[]>([]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Fix #5: Use shared groq service
      const text = await sendToGroq(userMessage, conversationHistory.current, {
        systemPrompt: SYSTEM_PROMPT,
        maxTokens: 1024,
      });
      setMessages(prev => [...prev, { role: 'ai', text }]);
    } catch (error: any) {
      console.error("Groq Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: formatGroqError(error) }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fix #3: Build context summary from conversation for handoff
  const getConversationSummary = (): string => {
    return messages
      .filter(m => m.role === 'user')
      .map(m => m.text)
      .join(' | ');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
          {t('hero_title')}
        </h1>

        <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
          {t('hero_subtitle')}
        </p>

        {/* AI Search Bar */}
        <div className="max-w-3xl mx-auto mb-4 group text-left">
          {messages.length > 0 && (
            <div className="mb-6 space-y-4 max-h-[300px] overflow-y-auto px-2 scrollbar-thin">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'ai' ? 'bg-blue-600/20' : 'bg-white/10'}`}>
                    {m.role === 'ai' ? <Sparkles className="w-4 h-4 text-blue-400" /> : <User className="w-4 h-4 text-white/60" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[80%] ${m.role === 'ai'
                    ? 'bg-white/5 text-white/80 border border-white/5 prose prose-invert prose-sm'
                    : 'bg-blue-600 text-white shadow-lg font-medium'
                    }`}>
                    {m.text}
                    {m.role === 'ai' && (m.text.toLowerCase().includes('create') || m.text.toLowerCase().includes('architect') || m.text.toLowerCase().includes('custom course')) && (
                      <div className="mt-4">
                        <button
                          onClick={() => onOpenArchitect(getConversationSummary())}
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

          <div className={`relative transition-all duration-500 rounded-2xl glass p-4 ${isFocused ? 'ring-2 ring-blue-600/50 scale-[1.02]' : ''}`}>
            <div className="flex gap-4 items-start">
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

            <div className="flex items-center justify-end mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2.5 rounded-xl transition-all hover:opacity-90 shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
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
