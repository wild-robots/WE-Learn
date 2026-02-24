
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
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
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
        <div className="col-span-full text-center py-20 text-white/40">
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
            <div className="glass p-12 rounded-3xl border border-white/5 text-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Welcome back, {user.displayName}</h3>
                <p className="text-white/40 mb-8 max-w-sm mx-auto">You haven't joined any groups yet.</p>
                <button onClick={() => setActiveTab('upcoming')} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all">
                  Browse Upcoming Groups
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="glass p-12 rounded-3xl border border-white/5 text-center">
            <Sparkles className="w-12 h-12 text-white/20 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Your Personal Workspace</h3>
            <p className="text-white/40 mb-8 max-w-sm mx-auto">Sign in to track your current groups, certifications, and peer network.</p>
            <button
              onClick={signInWithGoogle}
              className="px-12 py-4 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all flex items-center gap-2 mx-auto"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Sign In with Google
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <Hero onOpenArchitect={onOpenArchitect} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        {/* Bubble Agent CTA */}
        <div className="mb-12">
          <button
            onClick={onOpenBubbleAgent}
            className="w-full md:w-auto group flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border border-purple-500/20 hover:border-purple-500/40 rounded-2xl transition-all hover:shadow-lg hover:shadow-purple-900/20"
          >
            <div className="p-2 bg-purple-600/20 rounded-xl">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-right">
              <p className="font-bold text-white text-sm">מצאי בועת למידה</p>
              <p className="text-white/40 text-xs">הסוכנת תמצא לך קבוצה מתאימה או תפתח אחת חדשה</p>
            </div>
          </button>
        </div>

        <div className="flex flex-col gap-8 items-start relative">

          <div className="w-full transition-all duration-500 ease-in-out">
            {/* Tab Bar */}
            <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/5 rounded-2xl mb-12 w-fit max-w-full overflow-x-auto scrollbar-none">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all rounded-xl relative whitespace-nowrap ${activeTab === tab.id ? 'text-white bg-white/5 shadow-lg' : 'text-white/40 hover:text-white/60'
                    }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
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
                      goal_description: 'לבנות design system מלא עם design tokens ו-component library',
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
                      goal_description: 'ללמוד Figma מאפס עד autolayout ו-prototyping מתקדם',
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
                      goal_description: 'מחקר UX מתקדם — ביומטריה, eye-tracking וניתוח נתונים כמותי',
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
              className="px-4 py-2 bg-red-900/50 text-red-200 text-xs rounded-full border border-red-500/30 font-bold"
            >
              [Dev] Seed Data
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-sm font-bold text-white/40">WE Learn © 2025</span>
          </div>

          <div className="flex gap-8 text-xs font-medium text-white/40">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms</button>
            <a href="#" className="hover:text-white transition-colors">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
