
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, User } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const AIMatchmaker: React.FC = () => {
  const { isRTL } = useLanguage();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const quickResponses = [
    "I want to advance my career",
    "I'm switching roles",
    "Help me find a tutor"
  ];

  const messages = [
    {
      role: 'ai',
      text: "Hi! I'm your Strategic Matchmaker AI. I'm here to help you join this cohort and ensure it's the perfect fit for your learning goals. 🚀"
    },
    {
      role: 'ai',
      text: "Before we proceed, I'd love to understand a bit more about you. What's driving your interest in this particular cohort?"
    },
    {
        role: 'ai',
        text: "I can help you review the syllabus, meet the community, or even talk to the tutor directly. What would you like to explore first?"
    }
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#0a0a0a]/90 backdrop-blur-2xl">
      {/* 1. Header - Permanently Fixed */}
      <div className="p-5 border-b border-white/5 bg-white/2 backdrop-blur-md shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">AI Assistant</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">In-Cohort Support</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Active</span>
          </div>
        </div>
      </div>

      {/* 2. Message Feed - Scrollable Area */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin scroll-smooth"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'ai' ? 'bg-purple-600/20' : 'bg-white/10'}`}>
              {m.role === 'ai' ? <Sparkles className="w-4 h-4 text-purple-400" /> : <User className="w-4 h-4 text-white/60" />}
            </div>
            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
              m.role === 'ai' 
                ? 'bg-white/5 text-white/80 border border-white/5' 
                : 'bg-blue-600 text-white shadow-lg font-medium'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        
        {/* Context-Aware Suggestions */}
        <div className="pt-4 flex flex-wrap gap-2">
          <p className="w-full text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">Contextual help:</p>
          {quickResponses.map((r, i) => (
            <button 
              key={i}
              onClick={() => setInput(r)}
              className="px-3 py-2 rounded-xl border border-white/10 hover:border-purple-600/30 hover:bg-purple-600/5 transition-all text-xs text-white/60 active:scale-95"
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Docked Input Bar - Permanently Fixed at Bottom */}
      <div className="p-4 bg-white/2 border-t border-white/5 mt-auto backdrop-blur-md shrink-0">
        <div className="relative">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            rows={1}
            className="w-full bg-white/5 border border-white/10 focus:border-blue-600/50 focus:ring-0 rounded-2xl py-4 pl-4 pr-12 text-sm text-white placeholder-white/20 transition-all resize-none min-h-[56px] max-h-32"
          />
          <button className={`absolute ${isRTL ? 'left-3' : 'right-3'} bottom-3 p-2.5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl text-white hover:opacity-90 transition-all shadow-lg shadow-blue-600/20 active:scale-90`}>
            <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <p className="mt-3 text-[10px] text-center text-white/30 font-bold uppercase tracking-widest">
          Personalizing your learning path 🎯
        </p>
      </div>
    </div>
  );
};

export default AIMatchmaker;
