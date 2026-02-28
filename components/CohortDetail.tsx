
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import {
  ArrowLeft, Video, CheckCircle2, Award, Users, MessageSquare,
  Clock, Calendar, Zap, ChevronRight, ExternalLink, Loader2
} from 'lucide-react';
import { Cohort, SyllabusModule, Member } from '../types';
import { enrollStudent } from '../classroom';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';

// Sub-components
const OverviewPanel: React.FC<{ cohort: Cohort; progress: number }> = ({ cohort, progress }) => {
  const schedule = cohort.schedule || "Self-paced";
  const highlights = cohort.highlights || [
    "Learn key concepts and frameworks",
    "Build real-world projects for your portfolio",
    "Collaborate with peers on team exercises",
    "Get feedback from experienced mentors",
  ];

  return (
    <div className="space-y-10">
      {/* Schedule card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center">
            <Video className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Schedule</h3>
            <p className="text-slate-500 text-sm">{schedule}</p>
          </div>
        </div>
        <button className="w-full py-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-all text-sm font-medium text-slate-600">
          Times don't work? Create your own cohort!
        </button>
      </div>

      {/* Fix #18: Use cohort-specific highlights or sensible defaults */}
      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          What You'll Learn
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highlights.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-5 bg-white border border-slate-200 shadow-sm rounded-2xl hover:border-teal-300 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <span className="text-slate-700 font-medium text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Progress card */}
      <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Cohort Progress</h3>
          <span className="text-2xl font-bold text-slate-900">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-600 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Fix #19: Dynamic progress text */}
        <div className="mt-4 text-[11px] uppercase tracking-widest font-bold text-slate-400">
          {progress === 0 ? "Not started yet" : progress >= 100 ? "Completed!" : `${progress}% through the course`}
        </div>
      </section>
    </div>
  );
};

const SyllabusPanel: React.FC<{ syllabus?: SyllabusModule[] }> = ({ syllabus }) => {
  const defaultSyllabus: SyllabusModule[] = syllabus || [
    { id: 1, title: 'Foundations & Framework', items: ['Core concepts overview', 'Industry best practices', 'Tool setup'], deliverable: 'Personal learning goals document' },
    { id: 2, title: 'Deep Dive into Methodology', items: ['Advanced techniques', 'Case study analysis', 'Peer review sessions'], deliverable: 'Framework application project' },
    { id: 3, title: 'Real-World Application', items: ['Live project work', 'Expert feedback', 'Team collaboration'], deliverable: 'Prototype or research findings' },
    { id: 4, title: 'Mastery & Showcase', items: ['Polish your work', 'Present to cohort', 'Portfolio development'], deliverable: 'Final project presentation' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center">
          <Clock className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Course Syllabus</h3>
          <p className="text-slate-500 text-sm">Follow the path to mastery</p>
        </div>
      </div>
      {defaultSyllabus.map((mod, i) => (
        <div key={mod.id} className="relative pl-12 group">
          {i < defaultSyllabus.length - 1 && (
            <div className="absolute left-[23px] top-12 bottom-0 w-0.5 bg-slate-200 group-hover:bg-teal-300 transition-colors"></div>
          )}

          <div className={`absolute left-0 top-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold border transition-all ${
            i === 0
              ? 'bg-teal-600 text-white border-teal-600 shadow-sm scale-110'
              : 'bg-slate-100 text-slate-400 border-slate-200'
          }`}>
            {mod.id}
          </div>

          <div className={`bg-white p-8 rounded-3xl border transition-all shadow-sm ${
            i === 0 ? 'border-teal-300' : 'border-slate-200 opacity-60'
          }`}>
            <h4 className="text-xl font-bold text-slate-900 mb-4">{mod.title}</h4>
            <ul className="space-y-3 mb-8">
              {mod.items.map((item, j) => (
                <li key={j} className="flex items-center gap-3 text-slate-600 text-sm">
                  <ChevronRight className="w-4 h-4 text-teal-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
              <div className="flex items-center gap-3 text-teal-600 text-xs font-bold uppercase tracking-widest mb-1">
                <Award className="w-4 h-4" />
                Deliverable
              </div>
              <p className="text-slate-800 text-sm font-medium">{mod.deliverable}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const CommunityPanel: React.FC<{ cohort: Cohort }> = ({ cohort }) => {
  // Fix #18/#19: Dynamic member count and slot calculation
  const memberCount = typeof cohort.members === 'number' ? cohort.members : (cohort.members?.length ?? 0);
  const maxMembers = cohort.maxMembers || 20;
  const spotsLeft = Math.max(0, maxMembers - memberCount);

  // Fix #17: Use ui-avatars instead of picsum
  const memberNames = cohort.communityMembers || [
    { id: '1', name: 'Learner 1', role: 'Student', online: false },
    { id: '2', name: 'Learner 2', role: 'Student', online: false },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center">
          <Users className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Your Learning Community</h3>
          <p className="text-slate-500 text-sm">Learn alongside other professionals</p>
        </div>
      </div>

      {/* Fix #15: WhatsApp button with functional link — brand color retained */}
      <div className="group relative p-10 rounded-3xl border border-[#25D366]/30 overflow-hidden bg-gradient-to-br from-[#25D366]/5 to-transparent transition-all hover:border-[#25D366]/60 shadow-sm mb-12 cursor-pointer active:scale-[0.99]">
        <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
          <MessageSquare className="w-64 h-64 text-[#25D366]" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-lg shrink-0 transition-transform group-hover:scale-110">
              <MessageSquare className="w-10 h-10 text-white fill-white" />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Join the Cohort Community</h3>
              <p className="text-slate-600 text-base max-w-md leading-relaxed">Connect with fellow learners on WhatsApp for async collaboration, project updates, and networking.</p>
            </div>
          </div>
          <a
            href={cohort.whatsappLink || "https://chat.whatsapp.com/"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-10 py-5 bg-[#25D366] hover:bg-[#22c35e] text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95 group/btn shrink-0 text-lg"
          >
            Join WhatsApp Group
            <ExternalLink className="w-5 h-5 opacity-80 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Member cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {memberNames.map((m: any) => (
          <div key={m.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-teal-300 transition-all">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                {/* Fix #17: ui-avatars instead of picsum */}
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=F0FDFA&color=0D9488&size=48&font-size=0.4`}
                  className="w-12 h-12 rounded-full border-2 border-slate-200 group-hover:border-teal-300 transition-colors"
                  alt={m.name}
                />
                {m.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
              </div>
              <div>
                <h4 className="text-slate-900 font-bold text-sm tracking-tight">{m.name}</h4>
                <p className="text-slate-500 text-xs">{m.role}</p>
              </div>
            </div>
            {m.online && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>}
          </div>
        ))}
      </div>

      {/* Fix #19: Dynamic spots count */}
      <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center">
        <Users className="w-12 h-12 text-slate-300 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
          {spotsLeft > 0 ? `${spotsLeft} Spot${spotsLeft !== 1 ? 's' : ''} Available` : "Group is Full"}
        </h3>
        <p className="text-slate-500 mb-8">
          {spotsLeft > 0 ? "Join now to secure your place in this cohort" : "This cohort is at capacity"}
        </p>
        {spotsLeft > 0 && (
          <button className="px-12 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition-all shadow-sm active:scale-95">
            Register Now
          </button>
        )}
      </div>
    </div>
  );
};

interface Props {
  cohort: Cohort;
  onBack: () => void;
}

const CohortDetail: React.FC<Props> = ({ cohort, onBack }) => {
  const { t, isRTL } = useLanguage();
  const { user, signInWithGoogle } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'community'>('overview');
  const [progress, setProgress] = useState(0);
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [joinStatus, setJoinStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Safe defaults for all optional fields
  const memberCount = typeof cohort.members === 'number' ? cohort.members : (cohort.members?.length ?? 0);
  const maxMembers = cohort.maxMembers || 20;
  const duration = cohort.duration || "Self-paced";
  const startDate = cohort.startDate || "Coming soon";
  const cohortProgress = cohort.progress ?? 0;

  const isMember = hasJoined || (user && Array.isArray(cohort.members) && cohort.members.includes(user.uid));

  const handleJoin = async () => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    if (!cohort.googleClassroomId || !cohort.enrollmentCode) {
      setJoinStatus({ type: 'error', message: 'This cohort is not linked to a classroom yet.' });
      return;
    }

    setIsJoining(true);
    setJoinStatus(null);
    try {
      await enrollStudent(cohort.googleClassroomId, cohort.enrollmentCode);
      await updateDoc(doc(db, "cohorts", cohort.id), {
        members: arrayUnion(user.uid)
      });
      setHasJoined(true);
      // Fix #13: Inline success feedback instead of alert()
      setJoinStatus({ type: 'success', message: '🎉 You have joined! Check your Google Classroom.' });
    } catch (error: any) {
      console.error("Failed to join:", error);
      // Fix #13: Inline error feedback instead of alert()
      setJoinStatus({ type: 'error', message: `Failed to join: ${error.message || "Please try again."}` });
    } finally {
      setIsJoining(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setProgress(cohortProgress), 100);
    return () => clearTimeout(timer);
  }, [cohortProgress]);

  const stats = [
    { label: t('members'), value: `${memberCount}/${maxMembers}`, icon: Users },
    { label: 'Pace', value: duration, icon: Clock },
    { label: t('starts'), value: startDate, icon: Calendar },
    { label: 'Progress', value: `${cohortProgress}%`, icon: Zap }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 md:px-8 bg-[#F8FAFA]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start relative">
        <div className="flex-grow min-w-0 transition-all duration-500 ease-in-out pt-8">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-teal-600 transition-colors mb-8 group"
          >
            <ArrowLeft className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
            {t('back_to_cohorts')}
          </button>

          {/* Hero section */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-[10px] uppercase font-bold tracking-widest border border-teal-200">
                {cohort.category || "General"}
              </span>
              <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] uppercase font-bold tracking-widest border border-green-200">
                {cohort.level || "Beginner"}
              </span>
              {cohortProgress > 0 && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-[10px] uppercase font-bold tracking-widest border border-teal-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  {t('active_now')}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">
              {cohort.title || "Untitled Course"}
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              {cohort.description || "No description available."}
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex gap-4">
                {isMember ? (
                  <a
                    href={cohort.alternateLink || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="px-8 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all shadow-sm flex items-center gap-2"
                  >
                    Go to Classroom
                    <ExternalLink className="w-5 h-5" />
                  </a>
                ) : (
                  <button
                    onClick={handleJoin}
                    disabled={isJoining}
                    className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
                  >
                    {isJoining ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      <>
                        Join Cohort
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                )}
              </div>
              {/* Fix #13: Inline join status message */}
              {joinStatus && (
                <div className={`px-4 py-3 rounded-xl text-sm font-medium ${
                  joinStatus.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {joinStatus.message}
                </div>
              )}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-teal-300 transition-colors">
                <div className="flex items-center gap-3 text-slate-500 mb-3">
                  <s.icon className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">{s.label}</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Tab bar */}
          <div className="flex border-b border-slate-200 mb-8">
            {(['overview', 'syllabus', 'community'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-sm font-bold transition-all relative ${
                  activeTab === tab ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {t(tab as any)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {activeTab === 'overview' && <OverviewPanel cohort={cohort} progress={progress} />}
            {activeTab === 'syllabus' && <SyllabusPanel syllabus={cohort.syllabus} />}
            {activeTab === 'community' && <CommunityPanel cohort={cohort} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CohortDetail;
