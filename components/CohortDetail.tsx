
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import {
  ArrowLeft, Video, CheckCircle2, Award, Users, MessageSquare,
  Clock, Calendar, Zap, ChevronRight, ExternalLink
} from 'lucide-react';
import { Cohort, SyllabusModule, Member } from '../types';

// Sub-components moved to top for proper referencing via const
const OverviewPanel: React.FC<{ cohort: Cohort; progress: number }> = ({ cohort, progress }) => {
  return (
    <div className="space-y-10">
      <div className="glass p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center">
            <Video className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Live Session Schedule</h3>
            <p className="text-white/40 text-sm">{cohort.schedule}</p>
          </div>
        </div>
        <button className="w-full py-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-sm font-medium text-white/70">
          Times don't work? Create your own cohort!
        </button>
      </div>

      <section>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-400" />
          What You'll Learn
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Master core frameworks and methodologies",
            "Build real-world projects for your portfolio",
            "Develop collaborative problem-solving skills",
            "Network with peers and industry professionals",
            "Gain hands-on experience with cutting-edge tools"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
              <span className="text-white/80 font-medium text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="glass p-8 rounded-3xl border border-white/10">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-xl font-bold text-white tracking-tight">Cohort Progress</h3>
          <span className="text-2xl font-bold text-white">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-700 transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 text-[11px] uppercase tracking-widest font-bold text-white/30">
          Currently in Week 2
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
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center">
          <Clock className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Course Syllabus</h3>
          <p className="text-white/40 text-sm">Follow the path to mastery</p>
        </div>
      </div>
      {defaultSyllabus.map((mod, i) => (
        <div key={mod.id} className="relative pl-12 group">
          {i < defaultSyllabus.length - 1 && (
            <div className="absolute left-[23px] top-12 bottom-0 w-0.5 bg-white/10 group-hover:bg-blue-600/30 transition-colors"></div>
          )}

          <div className={`absolute left-0 top-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold border transition-all ${i === 0 ? 'bg-blue-600 text-white border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] scale-110' : 'bg-white/5 text-white/40 border-white/10'
            }`}>
            {mod.id}
          </div>

          <div className={`glass p-8 rounded-3xl border border-white/5 transition-all ${i === 0 ? 'border-white/20 bg-white/[0.04]' : 'opacity-60'}`}>
            <h4 className="text-xl font-bold text-white mb-4">{mod.title}</h4>
            <ul className="space-y-3 mb-8">
              {mod.items.map((item, j) => (
                <li key={j} className="flex items-center gap-3 text-white/60 text-sm">
                  <ChevronRight className="w-4 h-4 text-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-600/20">
              <div className="flex items-center gap-3 text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">
                <Award className="w-4 h-4" />
                Deliverable
              </div>
              <p className="text-white text-sm font-medium">{mod.deliverable}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const CommunityPanel: React.FC<{ members?: Member[] }> = ({ members }) => {
  const defaultMembers: Member[] = members || [
    { id: '1', name: 'Member 1', role: 'Product Manager', online: true },
    { id: '2', name: 'Member 2', role: 'UX Designer', online: true },
    { id: '3', name: 'Member 3', role: 'Researcher', online: true },
    { id: '4', name: 'Member 4', role: 'Product Designer', online: false },
    { id: '5', name: 'Member 5', role: 'Product Manager', online: false },
    { id: '6', name: 'Member 6', role: 'UX Designer', online: false },
    { id: '7', name: 'Member 7', role: 'Researcher', online: false },
    { id: '8', name: 'Member 8', role: 'Product Designer', online: false }
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center">
          <Users className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Your Learning Community</h3>
          <p className="text-white/40 text-sm">Learn alongside high-potential professionals</p>
        </div>
      </div>

      <div className="glass group relative p-10 rounded-3xl border border-[#25D366]/30 overflow-hidden bg-gradient-to-br from-[#25D366]/5 to-transparent transition-all hover:border-[#25D366]/60 shadow-[0_20px_50px_rgba(37,211,102,0.15)] mb-12 cursor-pointer active:scale-[0.99]">
        <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
          <MessageSquare className="w-64 h-64 text-[#25D366]" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-[0_0_40px_rgba(37,211,102,0.4)] shrink-0 transition-transform group-hover:scale-110">
              <MessageSquare className="w-10 h-10 text-white fill-white" />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Join the Cohort Community</h3>
              <p className="text-white/70 text-base max-w-md leading-relaxed">Connect instantly with fellow learners on WhatsApp for 24/7 async collaboration, project updates, and networking.</p>
            </div>
          </div>
          <button className="flex items-center gap-3 px-10 py-5 bg-[#25D366] hover:bg-[#22c35e] text-white font-bold rounded-2xl transition-all shadow-2xl shadow-[#25D366]/30 active:scale-95 group/btn shrink-0 text-lg">
            Join WhatsApp Group
            <ExternalLink className="w-5 h-5 opacity-80 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {defaultMembers.map(m => (
          <div key={m.id} className="glass p-5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-white/20 transition-all hover:bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img src={`https://picsum.photos/seed/${m.id}/64/64`} className="w-12 h-12 rounded-full border-2 border-white/10 group-hover:border-white/30 transition-colors" alt={m.name} />
                {m.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#050505]"></div>}
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-tight">{m.name}</h4>
                <p className="text-white/40 text-xs">{m.role}</p>
              </div>
            </div>
            {m.online && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>}
          </div>
        ))}
      </div>

      <div className="glass p-12 rounded-3xl border border-white/5 text-center bg-white/[0.01]">
        <Users className="w-12 h-12 text-white/20 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">4 Spots Available</h3>
        <p className="text-white/40 mb-8">Join now to secure your place in this cohort</p>
        <button className="px-12 py-4 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all shadow-2xl active:scale-95">
          Register Now
        </button>
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
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'community'>('overview');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(cohort.progress), 100);
    return () => clearTimeout(timer);
  }, [cohort.progress]);

  const stats = [
    { label: t('members'), value: `${cohort.members}/${cohort.maxMembers}`, icon: Users },
    { label: 'Pace', value: cohort.duration, icon: Clock },
    { label: t('starts'), value: cohort.startDate, icon: Calendar },
    { label: 'Progress', value: `${cohort.progress}%`, icon: Zap }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 md:px-8 bg-[#050505]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start relative">
        <div className="flex-grow min-w-0 transition-all duration-500 ease-in-out pt-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
            {t('back_to_cohorts')}
          </button>

          <div className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-400 text-[10px] uppercase font-bold tracking-widest border border-purple-600/30">
                {cohort.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-green-600/20 text-green-400 text-[10px] uppercase font-bold tracking-widest border border-green-600/30">
                {cohort.level}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-white/60 text-[10px] uppercase font-bold tracking-widest border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                {t('active_now')}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
              {cohort.title}
            </h1>
            <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
              {cohort.description}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {stats.map((s, i) => (
              <div key={i} className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 text-white/40 mb-3">
                  <s.icon className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">{s.label}</span>
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="flex border-b border-white/5 mb-8">
            {(['overview', 'syllabus', 'community'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-white' : 'text-white/40 hover:text-white/60'
                  }`}
              >
                {t(tab as any)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                )}
              </button>
            ))}
          </div>

          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {activeTab === 'overview' && <OverviewPanel cohort={cohort} progress={progress} />}
            {activeTab === 'syllabus' && <SyllabusPanel syllabus={cohort.syllabus} />}
            {activeTab === 'community' && <CommunityPanel members={cohort.communityMembers} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CohortDetail;
