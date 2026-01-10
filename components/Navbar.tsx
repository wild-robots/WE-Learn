
import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Language } from '../types';
import { Globe, ChevronDown } from 'lucide-react';

interface Props {
  onLogoClick?: () => void;
}

const Navbar: React.FC<Props> = ({ onLogoClick }) => {
  const { language, setLanguage, isRTL } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages: { code: Language; name: string }[] = [
    { code: 'EN', name: 'English' },
    { code: 'HE', name: 'עברית' },
    { code: 'AR', name: 'العربية' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'IT', name: 'Italiano' },
    { code: 'PT', name: 'Português' },
    { code: 'RU', name: 'Русский' },
    { code: 'ZH', name: '中文' },
    { code: 'JA', name: '日本語' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onLogoClick}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">WE Learn</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Courses</a>
          <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Tutors</a>
          <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              <Globe className="w-4 h-4" />
              <span>{language}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className={`absolute top-full mt-2 w-48 glass rounded-xl overflow-hidden py-1 z-50 ${isRTL ? 'left-0' : 'right-0'}`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs hover:bg-white/10 transition-colors ${language === lang.code ? 'text-blue-400 font-bold bg-white/5' : 'text-white/60'}`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="text-sm font-medium text-white/80 hover:text-white">Sign In</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
