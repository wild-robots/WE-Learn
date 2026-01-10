
import React from 'react';
import Hero from './Hero';
import CohortCard from './CohortCard';
import { Cohort } from '../types';
import { useLanguage } from '../LanguageContext';
import { ChevronRight } from 'lucide-react';

interface Props {
  onSelectCohort: (cohort: Cohort) => void;
}

const LandingPage: React.FC<Props> = ({ onSelectCohort }) => {
  const { t, isRTL } = useLanguage();

  const activeCohorts: Cohort[] = [
    {
      id: '1',
      title: 'Product Management Foundations',
      category: 'Product Management',
      description: 'Strategy, Roadmaps & Stakeholder Management fundamentals for modern teams.',
      tutor: 'Alex Rivers',
      members: 8,
      maxMembers: 12,
      duration: '3-4 hrs/week',
      successRate: '92%',
      schedule: 'Mon & Wed 19:00-20:30 IST',
      startDate: 'Jan 22',
      progress: 35,
      level: 'Beginner'
    },
    {
      id: '2',
      title: 'UX Design Mastery',
      category: 'UX Design',
      description: 'User-Centered Design & Prototyping techniques used by world-class studios.',
      tutor: 'Sarah Chen',
      members: 10,
      maxMembers: 15,
      duration: '4-5 hrs/week',
      successRate: '88%',
      schedule: 'Tue & Thu 20:00-21:30 IST',
      startDate: 'Jan 20',
      progress: 45,
      level: 'Intermediate'
    },
    {
        id: '3',
        title: 'User Research Fundamentals',
        category: 'User Research',
        description: 'Interviews, Testing & Data Analysis to drive product decisions.',
        tutor: 'Marco Rossi',
        members: 12,
        maxMembers: 12,
        duration: '5-6 hrs/week',
        successRate: '95%',
        schedule: 'Sun & Wed 18:00-19:30 IST',
        startDate: 'Jan 18',
        progress: 60,
        level: 'Beginner'
      }
  ];

  return (
    <div className="min-h-screen bg-[#050505]">
      <Hero />

      {/* Active Cohorts Section */}
      <section className="py-24 px-4 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {t('section_active')}
            </h2>
            <p className="text-white/40 text-lg">Join a thriving community learning together right now</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeCohorts.map(cohort => (
              <CohortCard key={cohort.id} cohort={cohort} onClick={() => onSelectCohort(cohort)} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-white text-sm font-bold hover:bg-white/10 transition-all border border-white/5">
                View All Cohorts
                <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-blue-600/5 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                {t('cta_title')}
            </h2>
            <p className="text-xl text-white/60 mb-12">
                {t('cta_subtitle')}
            </p>
            <button className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-2xl shadow-blue-900/40 text-lg group">
                <span className="flex items-center gap-3">
                    {t('cta_btn')}
                    <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
                </span>
            </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-sm font-bold text-white/40">Nexus Learn © 2025</span>
            </div>
            
            <div className="flex gap-8 text-xs font-medium text-white/40">
                <a href="#" className="hover:text-white transition-colors">About</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Help</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
