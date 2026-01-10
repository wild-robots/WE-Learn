
import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Search, Sparkles, Wand2, Paperclip, Send } from 'lucide-react';

const Hero: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/60 uppercase tracking-widest font-bold mb-6">
          <Sparkles className="w-3 h-3 text-blue-400" />
          AI-Orchestrated Learning Communities
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
          {t('hero_title')}
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
          {t('hero_subtitle')}
        </p>

        {/* AI Search Bar */}
        <div className="max-w-3xl mx-auto mb-4 group text-left">
            <p className="text-[11px] text-white/40 mb-3 px-1">Want to level up but not sure where to start? Share your professional goals with me.</p>
            <div className={`relative transition-all duration-500 rounded-2xl glass p-4 ${isFocused ? 'ring-2 ring-blue-600/50 scale-[1.02]' : ''}`}>
                <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Wand2 className="w-5 h-5 text-white/70" />
                    </div>
                    <textarea 
                        className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-white/20 resize-none pt-2 text-sm h-12"
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
                            C35/O
                        </div>
                        {/* Primary Send Button */}
                        <button className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2.5 rounded-xl transition-all hover:opacity-90 shadow-lg shadow-blue-600/20 active:scale-95">
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
