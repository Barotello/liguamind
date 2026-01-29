
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudyPlan: React.FC = () => {
  const navigate = useNavigate();

  const calendarDays = [
    { day: 31, type: 'prev', tasks: [] },
    { day: 1, type: 'current', tasks: [{ label: 'Task 1 Essay Prep', color: 'text-emerald-400 border-emerald-500' }] },
    { day: 2, type: 'current', tasks: [{ label: 'Practice 3 Reading Passages', color: 'text-primary border-primary' }] },
    { day: 3, type: 'current', tasks: [{ label: 'Speaking Mock Test', color: 'text-amber-400 border-amber-500' }] },
    { day: 4, type: 'current', tasks: [{ label: 'Listen: Podcast Analysis', color: 'text-purple-400 border-purple-500' }] },
    { day: 5, type: 'current', tasks: [{ label: 'Vocab: Academic List', color: 'text-primary border-primary' }] },
    { day: 6, type: 'off', label: 'Weekly Review' },
    { day: 7, type: 'current', tasks: [{ label: 'Writing Heatmap Analysis', color: 'text-emerald-400 border-emerald-500' }] },
    { day: 8, type: 'today', tasks: [
        { label: 'Watch AI Grammar Video', color: 'text-primary border-primary' },
        { label: '1:1 AI Speaking Drill', color: 'text-amber-400 border-amber-500' }
      ] 
    },
    { day: 9, type: 'current', tasks: [{ label: 'Reading Strategy: Skimming', color: 'text-primary border-primary' }] },
    { day: 10, type: 'current', tasks: [{ label: 'Argumentative Essay Lab', color: 'text-emerald-400 border-emerald-500' }] },
    { day: 11, type: 'current', tasks: [] },
    { day: 12, type: 'current', tasks: [{ label: 'Idiomatic Expressions', color: 'text-amber-400 border-amber-500' }] },
    { day: 13, type: 'off', label: '' },
    { day: 14, type: 'current', tasks: [{ label: 'Mock Test A', color: 'text-primary border-primary' }] },
    { day: 15, type: 'target', label: 'TARGET EXAM DATE', subLabel: 'Goal: Band 8.0' },
  ];

  return (
    <div className="flex-1 flex flex-col gap-8 animate-in fade-in slide-in-from-right-6 duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-black text-[10px] uppercase tracking-widest group"
          >
            <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
            Back to Profile
          </button>
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span className="text-xs font-black uppercase tracking-[0.2em]">Intelligent Scheduling</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight dark:text-white text-slate-900 leading-none">AI Study Architect</h1>
            <p className="dark:text-slate-400 text-slate-500 mt-3 max-w-2xl text-lg font-medium leading-relaxed italic">Your roadmap to success, dynamically adjusted based on your performance.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="glass flex p-1 rounded-2xl border dark:border-white/5 border-slate-200">
            <button className="px-6 py-2 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">Calendar View</button>
            <button className="px-6 py-2 rounded-xl dark:text-slate-400 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">List View</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Calendar Content */}
        <div className="col-span-12 lg:col-span-9">
          <div className="glass-card rounded-[2.5rem] p-8 h-full border dark:border-white/5 border-slate-200 dark:bg-white/5 bg-white shadow-2xl">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-6">
                <h3 className="text-3xl font-black dark:text-white text-slate-900 tracking-tight">January 2024</h3>
                <div className="flex gap-2">
                  <button className="w-10 h-10 flex items-center justify-center dark:bg-white/5 bg-slate-50 rounded-xl hover:bg-primary hover:text-white transition-all border dark:border-white/5 border-slate-200">
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center dark:bg-white/5 bg-slate-50 rounded-xl hover:bg-primary hover:text-white transition-all border dark:border-white/5 border-slate-200">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest"><div className="size-2 rounded-full bg-primary"></div> Reading</span>
                <span className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest"><div className="size-2 rounded-full bg-emerald-500"></div> Writing</span>
                <span className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest"><div className="size-2 rounded-full bg-amber-500"></div> Speaking</span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px dark:bg-white/10 bg-slate-200 rounded-3xl overflow-hidden border dark:border-white/10 border-slate-200 shadow-xl">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="dark:bg-[#0f172a] bg-slate-100 py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{day}</div>
              ))}
              
              {calendarDays.map((day, idx) => (
                <div 
                  key={idx} 
                  className={`min-h-[140px] p-4 flex flex-col gap-2 transition-colors relative group ${
                    day.type === 'prev' ? 'dark:bg-black/20 bg-slate-50 opacity-40' : 
                    day.type === 'off' ? 'dark:bg-black/30 bg-slate-50 text-slate-500' :
                    day.type === 'today' ? 'dark:bg-primary/10 bg-primary/5 ring-2 ring-primary/40' : 
                    day.type === 'target' ? 'bg-primary border border-primary/20 text-white' :
                    'dark:bg-[#0a0f14] bg-white hover:bg-primary/5 cursor-pointer'
                  }`}
                >
                  <span className={`text-xs font-black ${day.type === 'today' ? 'text-primary' : day.type === 'target' ? 'text-white' : 'dark:text-slate-300 text-slate-500'}`}>
                    {day.day} {day.type === 'today' && '(Today)'}
                  </span>
                  
                  {day.tasks?.map((task, tidx) => (
                    <div key={tidx} className={`px-2 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter border-l-2 bg-white/5 ${task.color} whitespace-nowrap overflow-hidden text-ellipsis shadow-sm`}>
                      {task.label}
                    </div>
                  ))}

                  {day.label && (
                    <div className={`mt-auto text-[10px] font-black uppercase tracking-widest ${day.type === 'target' ? 'text-white' : 'text-slate-500'}`}>
                      {day.label}
                    </div>
                  )}

                  {day.type === 'today' && (
                    <button className="mt-auto py-1.5 bg-primary text-white rounded-lg text-[8px] font-black uppercase tracking-widest hover:scale-105 transition-all">Start Session</button>
                  )}
                  
                  {day.type === 'target' && (
                    <p className="text-[10px] font-black mt-2 bg-white/20 px-2 py-1 rounded-md text-center">{day.subLabel}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info Section */}
        <div className="col-span-12 lg:col-span-3 space-y-8">
          <div className="glass-card rounded-3xl p-8 text-center border dark:border-white/5 border-slate-200 dark:bg-white/5 bg-white shadow-xl">
            <h3 className="text-sm font-black dark:text-white text-slate-900 mb-8 uppercase tracking-widest leading-none">Target Score Progress</h3>
            <div className="relative flex items-center justify-center mx-auto w-40 h-40">
              <svg className="w-full h-full -rotate-90 transform overflow-visible" viewBox="0 0 100 100">
                <circle className="dark:text-white/5 text-slate-100" cx="50" cy="50" r="44" fill="transparent" stroke="currentColor" strokeWidth="8"></circle>
                <circle className="text-primary" cx="50" cy="50" r="44" fill="transparent" stroke="currentColor" strokeDasharray="276.46" strokeDashoffset="69.1" strokeLinecap="round" strokeWidth="8" style={{ filter: 'drop-shadow(0 0 8px rgba(13, 127, 242, 0.4))' }}></circle>
              </svg>
              <div className="absolute flex flex-col items-center leading-none">
                <span className="text-4xl font-black dark:text-white text-slate-900 tracking-tighter tabular-nums">7.5</span>
                <span className="text-[9px] dark:text-slate-500 text-slate-400 font-black uppercase tracking-[0.2em] mt-2">Current Est.</span>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-center dark:bg-white/5 bg-slate-50 rounded-2xl p-4 border dark:border-white/5 border-slate-200">
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Goal Date</p>
                <p className="text-xs font-black dark:text-white text-slate-900">Jan 15th</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-primary uppercase tracking-widest">Target</p>
                <p className="text-xs font-black text-primary">Band 8.0</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 border dark:border-white/5 border-slate-200 dark:bg-white/5 bg-white shadow-xl">
            <h3 className="text-sm font-black dark:text-white text-slate-900 mb-6 uppercase tracking-widest leading-none">Today's Focus</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="size-5 rounded-lg border-2 border-primary flex items-center justify-center mt-0.5 group-hover:bg-primary transition-all">
                  <span className="material-symbols-outlined text-[10px] text-white opacity-0 group-hover:opacity-100">check</span>
                </div>
                <div>
                  <p className="text-xs font-black dark:text-white text-slate-900 leading-tight">Watch AI Grammar Video</p>
                  <p className="text-[10px] font-medium dark:text-slate-500 text-slate-400 mt-1">Complex structures for Task 2</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group cursor-pointer opacity-60">
                <div className="size-5 rounded-lg border-2 dark:border-white/20 border-slate-300 flex items-center justify-center mt-0.5 group-hover:bg-primary transition-all">
                  <span className="material-symbols-outlined text-[10px] text-white opacity-0 group-hover:opacity-100">check</span>
                </div>
                <div>
                  <p className="text-xs font-black dark:text-slate-300 text-slate-600 leading-tight">1:1 AI Speaking Drill</p>
                  <p className="text-[10px] font-medium dark:text-slate-500 text-slate-400 mt-1">Focus on Lexical Diversity</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-10 py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95">
              Start Daily Session
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-purple-500/10 border border-purple-500/20 shadow-lg shadow-purple-500/5">
            <p className="text-[10px] text-purple-400 font-black uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">psychology</span>
              AI Study Insight
            </p>
            <p className="text-xs font-medium dark:text-slate-300 text-slate-700 leading-relaxed italic">
              Based on your recent Speaking tests, the AI has prioritized more <span className="text-purple-400 font-black">idiomatic expression</span> drills for this week to boost your lexical score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;
