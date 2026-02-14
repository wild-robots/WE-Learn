
import React from 'react';
import { Cohort } from '../types';
import { useLanguage } from '../LanguageContext';
import { Users, Clock, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

interface Props {
  cohort: Cohort;
  isUpcoming?: boolean;
  onClick?: () => void;
}

const CohortCard: React.FC<Props> = ({ cohort, isUpcoming, onClick }) => {
  const { t, isRTL } = useLanguage();

  // Fix #12: Safe fallbacks for missing data
  const memberCount = typeof cohort.members === 'number' ? cohort.members : (cohort.members?.length ?? 0);
  const maxMembers = cohort.maxMembers || 20;
  const schedule = cohort.schedule || "Self-paced";
  const startDate = cohort.startDate || "Coming soon";
  const duration = cohort.duration || "TBD";
  const progress = cohort.progress ?? 0;
  const level = cohort.level || "Beginner";
  const category = cohort.category || "General";

  return (
    <div
      onClick={onClick}
      className="glass group relative p-6 rounded-2xl flex flex-col h-full transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] overflow-hidden cursor-pointer"
    >
      {/* Background Glow */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-600/10 blur-[60px] group-hover:bg-blue-600/20 transition-all"></div>

      <div className="flex items-start justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded bg-blue-600/20 text-blue-400 border border-blue-600/30">
          {category}
        </span>
        <span className={`text-xs px-2 py-1 rounded font-medium ${level === 'Beginner' ? 'text-green-400 bg-green-400/10 border border-green-400/20' :
          level === 'Intermediate' ? 'text-blue-400 bg-blue-400/10 border border-blue-400/20' :
            'text-orange-400 bg-orange-400/10 border border-orange-400/20'
          }`}>
          {level}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
        {cohort.title || "Untitled Course"}
      </h3>
      <p className="text-white/50 text-sm mb-6 line-clamp-2">
        {cohort.description || "No description available."}
      </p>

      <div className="space-y-3 mb-6 flex-grow">
        <div className="flex items-center text-xs text-white/70 gap-2">
          <Users className="w-4 h-4 text-blue-500" />
          <span>{memberCount}/{maxMembers} {t('members')}</span>
        </div>
        <div className="flex items-center text-xs text-white/70 gap-2">
          <Clock className="w-4 h-4 text-blue-500" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center text-xs text-white/70 gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span>{schedule}</span>
        </div>
        <div className="flex items-center text-xs text-white/70 gap-2">
          <CheckCircle className="w-4 h-4 text-blue-500" />
          <span>{t('starts')} {startDate}</span>
        </div>
      </div>

      {!isUpcoming && progress > 0 && (
        <div className="mb-6">
          <div className="flex justify-between text-[10px] text-white/40 mb-1.5 font-medium">
            <span>Cohort Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {isUpcoming && cohort.highlights && (
        <div className="mb-6">
          <h4 className="text-[10px] uppercase tracking-wider text-white/30 font-bold mb-3">{t('highlights')}:</h4>
          <ul className="space-y-1">
            {cohort.highlights.map((h, i) => (
              <li key={i} className="text-[11px] text-white/60 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
        {/* Fix #17: Use ui-avatars.com instead of random picsum photos */}
        <div className="flex -space-x-2">
          {['A', 'B', 'C', 'D'].map((letter, i) => (
            <img
              key={i}
              src={`https://ui-avatars.com/api/?name=${letter}&background=1e293b&color=94a3b8&size=32&font-size=0.4`}
              className="w-7 h-7 rounded-full border-2 border-[#050505]"
              alt="Member"
            />
          ))}
        </div>
        <button className="flex items-center gap-2 text-xs font-bold text-white hover:text-blue-400 transition-colors group/btn">
          {t('view_group')}
          <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? 'rotate-180 group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`} />
        </button>
      </div>
    </div>
  );
};

export default CohortCard;
