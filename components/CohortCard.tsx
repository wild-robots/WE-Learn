
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

  const levelClass =
    level === 'Beginner'     ? 'text-green-600 bg-green-50 border-green-200' :
    level === 'Intermediate' ? 'text-teal-600 bg-teal-50 border-teal-200' :
                               'text-orange-600 bg-orange-50 border-orange-200';

  return (
    <div
      onClick={onClick}
      className="group relative bg-white border border-slate-200 shadow-sm p-6 rounded-2xl flex flex-col h-full transition-all duration-300 hover:border-teal-500 hover:shadow-[0_4px_16px_rgba(13,148,136,0.12)] overflow-hidden cursor-pointer"
    >
      {/* Header: category eyebrow + level badge */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded bg-teal-50 text-teal-600 border border-teal-200">
          {category}
        </span>
        <span className={`text-xs px-2 py-1 rounded font-medium border ${levelClass}`}>
          {level}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-teal-600 transition-colors">
        {cohort.title || "Untitled Course"}
      </h3>

      {/* Description */}
      <p className="text-slate-500 text-sm mb-6 line-clamp-2">
        {cohort.description || "No description available."}
      </p>

      {/* Metadata rows */}
      <div className="space-y-3 mb-6 flex-grow">
        <div className="flex items-center text-xs text-slate-600 gap-2">
          <Users className="w-4 h-4 text-teal-500" />
          <span>{memberCount}/{maxMembers} {t('members')}</span>
        </div>
        <div className="flex items-center text-xs text-slate-600 gap-2">
          <Clock className="w-4 h-4 text-teal-500" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center text-xs text-slate-600 gap-2">
          <Calendar className="w-4 h-4 text-teal-500" />
          <span>{schedule}</span>
        </div>
        <div className="flex items-center text-xs text-slate-600 gap-2">
          <CheckCircle className="w-4 h-4 text-teal-500" />
          <span>{t('starts')} {startDate}</span>
        </div>
      </div>

      {/* Progress bar — active cohorts only */}
      {!isUpcoming && progress > 0 && (
        <div className="mb-6">
          <div className="flex justify-between text-[10px] text-slate-400 mb-1.5 font-medium">
            <span>Cohort Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Highlights — upcoming cohorts only */}
      {isUpcoming && cohort.highlights && (
        <div className="mb-6">
          <h4 className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-3">{t('highlights')}:</h4>
          <ul className="space-y-1">
            {cohort.highlights.map((h, i) => (
              <li key={i} className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-teal-500 shrink-0"></span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer: member avatars + view button */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
        {/* Fix #17: Use ui-avatars.com instead of random picsum photos */}
        <div className="flex -space-x-2">
          {['A', 'B', 'C', 'D'].map((letter, i) => (
            <img
              key={i}
              src={`https://ui-avatars.com/api/?name=${letter}&background=F0FDFA&color=0D9488&size=32&font-size=0.4`}
              className="w-7 h-7 rounded-full border-2 border-white"
              alt="Member"
            />
          ))}
        </div>
        <button className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-600 transition-colors group/btn">
          {t('view_group')}
          <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? 'rotate-180 group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`} />
        </button>
      </div>
    </div>
  );
};

export default CohortCard;
