
import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import CohortCard from './CohortCard';
import { Cohort } from '../types';
import { useLanguage } from '../LanguageContext';
import { Sparkles, Users, BookOpen, Zap, Loader2 } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';

interface Props {
  onSelectCohort: (cohort: Cohort) => void;
  onOpenArchitect: (context?: string) => void;
  onOpenBubbleAgent: () => void;
  onNavigate: (view: 'privacy' | 'terms') => void;
}

type TabType = 'upcoming' | 'existing' | 'mygroups';

const LandingPage: React.FC<Props> = ({ onSelectCohort, onOpenArchitect, onOpenBubbleAgent, onNavigate }) => {
  const { t, isRTL } = useLanguage();
  const { user, signInWithGoogle } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [allCohorts, setAllCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(true);

  // Firestore Listener — fetch all cohorts
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "cohorts"),
      (snapshot) => {
        const cohorts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Cohort[];
        setAllCohorts(cohorts);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching cohorts:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fix #2: Derive active vs upcoming from Firestore data instead of hardcoding
  const upcomingCohorts = allCohorts.filter(c => c.status === 'OPEN');
  const activeCohorts = allCohorts.filter(c => c.status !== 'OPEN' || (c.progress && c.progress > 0));
  const myCohorts = user ? allCohorts.filter(c => Array.isArray(c.members) && c.members.includes(user.uid)) : [];

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'upcoming', label: 'Upcoming Groups', icon: Users },
    { id: 'existing', label: 'Active Groups', icon: Zap },
    { id: 'mygroups', label: 'My Groups', icon: BookOpen }
  ];

  const renderCohortGrid = (cohorts: Cohort[], emptyText: string, isMyGroups = false) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {loading ? (
        <div className="col-span-full flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
        </div>
      ) : cohorts.length > 0 ? (
        cohorts.map(cohort => (
          <CohortCard
            key={cohort.id}
            cohort={cohort}
            onClick={() => {
              if (isMyGroups && cohort.alternateLink) {
                window.open(cohort.alternateLink, '_blank');
              } else {
                onSelectCohort(cohort);
              }
            }}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-20 text-slate-400">
          {emptyText}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'upcoming':
        return renderCohortGrid(upcomingCohorts, "No upcoming cohorts found. Be the first to launch one!");
      case 'existing':
        // Fix #2: Uses real Firestore data instead of hardcoded array
        return renderCohortGrid(activeCohorts, "No active groups yet. Check back soon!");
      case 'mygroups':
        return user ? (
          myCohorts.length > 0 ? (
            renderCohortGrid(myCohorts, "", true)
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Welcome back, {user.displayName}</h3>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">You haven't joined any groups yet.</p>
                <button onClick={() => setActiveTab('upcoming')} className="px-8 py-3 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-xl transition-all">
                  Browse Upcoming Groups
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center">
            <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Your Personal Workspace</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">Sign in to track your current groups, certifications, and peer network.</p>
            <button
              onClick={signInWithGoogle}
              className="px-8 py-3 bg-white border border-slate-200 text-slate-800 font-semibold rounded-2xl hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2 mx-auto"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Sign In with Google
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFA]">
      <Hero onOpenArchitect={onOpenArchitect} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        {/* Bubble Agent CTA */}
        <div className="mb-12">
          <button
            onClick={onOpenBubbleAgent}
            className="w-full md:w-auto group flex items-center gap-4 px-8 py-5 bg-teal-50 border border-teal-200 hover:border-teal-400 rounded-2xl transition-all hover:shadow-[0_4px_12px_rgba(13,148,136,0.12)]"
          >
            <div className="p-2 bg-teal-100 rounded-xl">
              <Sparkles className="w-5 h-5 text-teal-600" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <p className="font-bold text-slate-900 text-sm">Find a Learning Bubble</p>
              <p className="text-slate-500 text-xs">Our agent will match you with the right group or open a new one</p>
            </div>
          </button>
        </div>

        <div className="flex flex-col gap-8 items-start relative">

          <div className="w-full transition-all duration-500 ease-in-out">
            {/* Tab Bar */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-2xl mb-12 w-fit max-w-full overflow-x-auto scrollbar-none">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all rounded-xl relative whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-teal-700 bg-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-teal-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            {renderContent()}
          </div>
        </div>

        {/* Fix #6: Debug button only in development mode */}
        {import.meta.env.DEV && (
          <div className="fixed bottom-4 right-4 z-50 opacity-50 hover:opacity-100 transition-opacity">
            <button
              onClick={async () => {
                try {
                  const { collection, addDoc } = await import('firebase/firestore');
                  const { db } = await import('../firebase');

                  const seedCohorts = [
                    {
                      googleClassroomId: 'SEED_PM_101',
                      title: 'Product Management Foundations',
                      description: 'Master the fundamentals of product strategy and stakeholder management.',
                      enrollmentCode: 'PM101_DEMO',
                      alternateLink: 'https://classroom.google.com',
                      creatorId: 'SEED_SARAH',
                      creatorName: 'Sarah Chen',
                      createdAt: new Date(),
                      status: 'OPEN',
                      members: [],
                      maxMembers: 15,
                      category: 'Product',
                      level: 'Beginner',
                      duration: '4 weeks',
                      startDate: 'Mar 15',
                      progress: 0,
                      tutor: 'Sarah Chen',
                      schedule: 'Mon & Wed 18:00 EST'
                    },
                    {
                      googleClassroomId: 'SEED_AI_202',
                      title: 'Generative AI for Designers',
                      description: 'Transform your design workflow with Midjourney and prompt engineering.',
                      enrollmentCode: 'AI202_DEMO',
                      alternateLink: 'https://classroom.google.com',
                      creatorId: 'SEED_MARCUS',
                      creatorName: 'Marcus V.',
                      createdAt: new Date(),
                      status: 'OPEN',
                      members: [],
                      maxMembers: 10,
                      category: 'Design',
                      level: 'Intermediate',
                      duration: '6 weeks',
                      startDate: 'Apr 2',
                      progress: 0,
                      tutor: 'Marcus V.',
                      schedule: 'Tuesdays 19:00 PST'
                    },
                    {
                      googleClassroomId: 'SEED_UX_ACTIVE',
                      title: 'Advanced UX Research',
                      description: 'Biometrics, eye-tracking, and quantitative UX data analysis.',
                      enrollmentCode: 'UX_ACTIVE',
                      alternateLink: 'https://classroom.google.com',
                      creatorId: 'SEED_ELENA',
                      creatorName: 'Dr. Elena Rossi',
                      createdAt: new Date(),
                      status: 'IN_PROGRESS',
                      members: ['user1', 'user2', 'user3'],
                      maxMembers: 12,
                      category: 'Design',
                      level: 'Advanced',
                      duration: '8 weeks',
                      startDate: 'Feb 1',
                      progress: 45,
                      tutor: 'Dr. Elena Rossi',
                      schedule: 'Saturdays 10:00 GMT'
                    },
                    {
                      googleClassroomId: 'SEED_JS_ACTIVE',
                      title: 'Directing LLM Agents',
                      description: 'Building autonomous coding agents with LangChain frameworks.',
                      enrollmentCode: 'JS_ACTIVE',
                      alternateLink: 'https://classroom.google.com',
                      creatorId: 'SEED_ALEX',
                      creatorName: 'Alex Rivers',
                      createdAt: new Date(),
                      status: 'IN_PROGRESS',
                      members: ['user4', 'user5'],
                      maxMembers: 8,
                      category: 'Development',
                      level: 'Advanced',
                      duration: '5 weeks',
                      startDate: 'Jan 15',
                      progress: 85,
                      tutor: 'Alex Rivers',
                      schedule: 'Fridays 17:00 IST'
                    }
                  ];

                  for (const cohort of seedCohorts) {
                    await addDoc(collection(db, 'cohorts'), cohort);
                  }

                  const seedBubbles = [
                    {
                      topic: 'design systems',
                      level: 'intermediate',
                      meeting_day: 'sunday',
                      meeting_time: '18:00',
                      goal_description: 'Build a full design system with design tokens and a component library',
                      participant_count: 3,
                      participants: ['seed_user_a', 'seed_user_b', 'seed_user_c'],
                      status: 'open',
                      waitlist: [],
                      waitlist_count: 0,
                      founder_id: 'seed_founder',
                      created_at: new Date(),
                    },
                    {
                      topic: 'figma',
                      level: 'beginner',
                      meeting_day: 'tuesday',
                      meeting_time: '19:00',
                      goal_description: 'Learn Figma from scratch through auto layout and advanced prototyping',
                      participant_count: 4,
                      participants: ['seed_user_d', 'seed_user_e', 'seed_user_f', 'seed_user_g'],
                      status: 'open',
                      waitlist: [],
                      waitlist_count: 0,
                      founder_id: 'seed_founder',
                      created_at: new Date(),
                    },
                    {
                      topic: 'ux',
                      level: 'advanced',
                      meeting_day: 'wednesday',
                      meeting_time: '20:00',
                      goal_description: 'Advanced UX research — biometrics, eye-tracking, and quantitative data analysis',
                      participant_count: 8,
                      participants: ['seed_user_h', 'seed_user_i', 'seed_user_j', 'seed_user_k', 'seed_user_l', 'seed_user_m', 'seed_user_n', 'seed_user_o'],
                      status: 'full',
                      waitlist: [],
                      waitlist_count: 0,
                      founder_id: 'seed_founder',
                      created_at: new Date(),
                    },
                  ];

                  for (const bubble of seedBubbles) {
                    await addDoc(collection(db, 'bubbles'), bubble);
                  }

                  alert('Seed data added! (4 cohorts + 3 bubbles)');
                } catch (e) {
                  console.error(e);
                  alert('Error seeding data');
                }
              }}
              className="px-4 py-2 bg-red-50 text-red-600 text-xs rounded-full border border-red-200 font-bold"
            >
              [Dev] Seed Data
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-sm font-bold text-slate-400">WE Learn © 2025</span>
          </div>

          <div className="flex gap-8 text-xs font-medium text-slate-500">
            <a href="#" className="hover:text-teal-600 transition-colors">About</a>
            <button onClick={() => onNavigate('privacy')} className="hover:text-teal-600 transition-colors">Privacy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-teal-600 transition-colors">Terms</button>
            <a href="#" className="hover:text-teal-600 transition-colors">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
