
import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

const data = [
  { name: 'Aug 2023', speaking: 6.2, writing: 5.8, reading: 6.0, listening: 6.4 },
  { name: 'Sep 2023', speaking: 6.5, writing: 6.2, reading: 6.8, listening: 7.0 },
  { name: 'Oct 2023', speaking: 8.5, writing: 7.0, reading: 7.5, listening: 7.8 },
  { name: 'Today', speaking: 8.2, writing: 8.0, reading: 8.5, listening: 8.1 },
];

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('Last 3 Months');

  const subSkills = [
    { label: 'Coherence & Cohesion', value: 85, color: 'bg-primary', note: 'Expert-level logical flow detected.' },
    { label: 'Lexical Resource', value: 72, color: 'bg-emerald-500', note: 'Diversify your academic vocabulary.' },
    { label: 'Grammatical Range', value: 64, color: 'bg-purple-500', note: 'Work on complex sentence structures.' },
    { label: 'Pronunciation', value: 91, color: 'bg-amber-500', note: 'Excellent intonation and stress.' },
    { label: 'Task Achievement', value: 78, color: 'bg-white/40', note: 'Addressing all parts of the prompt.' },
  ];

  const insights = [
    {
      title: 'Grammar Improvement',
      change: '+15%',
      desc: 'Reduced passive voice dependency and improved subject-verb agreement consistency in Writing tasks.',
      color: 'border-emerald-500',
      accent: 'text-emerald-400',
      icon: 'spellcheck'
    },
    {
      title: 'Fluency & Cohesion',
      change: '+0.8',
      desc: 'Extended response length in Speaking Part 2 by 45 seconds while maintaining logical flow.',
      color: 'border-primary',
      accent: 'text-primary',
      icon: 'forum'
    },
    {
      title: 'Lexical Resource',
      change: '-5%',
      desc: 'Minor fluctuation due to overuse of informal connectors in Task 2. Need to re-focus on academic register.',
      color: 'border-amber-500',
      accent: 'text-amber-400',
      icon: 'history_edu'
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2">
            <span className="material-symbols-outlined text-sm">analytics</span>
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Deep Learning Insights</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight dark:text-white text-slate-900">AI Performance Analytics</h1>
          <p className="text-slate-400 mt-2 max-w-2xl text-lg font-light leading-relaxed">
            Comprehensive tracking of your IELTS & TOEFL score progression powered by neural linguistic analysis.
          </p>
        </div>

        <div className="glass flex p-1 rounded-xl">
          {['Last 3 Months', '6 Months', 'All Time'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${timeRange === range ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Chart Area */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h3 className="text-xl font-bold dark:text-white text-slate-900 tracking-tight">Score Progression</h3>
                <p className="text-slate-400 text-sm">Historical band performance across all modules</p>
              </div>
              <div className="flex gap-6">
                {[
                  { label: 'Speaking', color: 'bg-primary' },
                  { label: 'Writing', color: 'bg-emerald-500' },
                  { label: 'Reading', color: 'bg-amber-500' },
                  { label: 'Listening', color: 'bg-purple-500' }
                ].map(mod => (
                  <div key={mod.label} className="flex items-center gap-2">
                    <div className={`size-2.5 rounded-full ${mod.color} shadow-[0_0_8px_currentColor]`}></div>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-tighter">{mod.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[400px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSpeak" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d7ff2" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0d7ff2" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorWrite" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#475569"
                    tick={{ fontSize: 10, fontWeight: 700 }}
                    axisLine={false}
                    tickLine={false}
                    dy={15}
                  />
                  <YAxis
                    stroke="#475569"
                    domain={[5, 9]}
                    tick={{ fontSize: 10, fontWeight: 700 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '16px' }}
                    itemStyle={{ fontWeight: 900, fontSize: '11px' }}
                  />
                  <Area type="monotone" dataKey="speaking" stroke="#0d7ff2" strokeWidth={4} fillOpacity={1} fill="url(#colorSpeak)" animationDuration={2000} />
                  <Area type="monotone" dataKey="writing" stroke="#10b981" strokeWidth={3} strokeDasharray="4 6" fillOpacity={1} fill="url(#colorWrite)" animationDuration={2500} />
                  <Area type="monotone" dataKey="reading" stroke="#f59e0b" strokeWidth={2} fillOpacity={0} />
                  <Area type="monotone" dataKey="listening" stroke="#a855f7" strokeWidth={2} fillOpacity={0} />
                  <ReferenceLine x="Oct 2023" stroke="rgba(255,255,255,0.1)" />
                </AreaChart>
              </ResponsiveContainer>

              {/* Hover Tooltip Mockup from user code */}
              <div className="absolute left-[72%] top-[10%] glass px-4 py-3 rounded-xl border border-primary/30 z-10 shadow-2xl animate-bounce">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Oct 24, 2023</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Speaking: 8.5</span>
                  <span className="text-[10px] text-emerald-400 font-bold">+0.5</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, i) => (
              <div key={i} className={`glass-card p-6 rounded-2xl border-l-4 ${insight.color} relative group hover:bg-white/10 transition-all`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`size-10 rounded-xl bg-white/5 flex items-center justify-center ${insight.accent}`}>
                    <span className="material-symbols-outlined">{insight.icon}</span>
                  </div>
                  <span className={`text-xs font-bold ${insight.accent}`}>{insight.change}</span>
                </div>
                <h4 className="font-bold text-sm mb-2 dark:text-white text-md text-slate-900">{insight.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{insight.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-Skill Analysis Panel */}
        <div className="col-span-12 lg:col-span-3">
          <div className="glass-card rounded-2xl p-6 sticky top-28 h-fit space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold dark:text-white text-slate-900">Sub-Skill Analysis</h3>
              <span className="material-symbols-outlined text-slate-500 text-xl cursor-help">info</span>
            </div>

            <div className="space-y-8">
              {subSkills.map((skill, i) => (
                <div key={skill.label} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-semibold dark:text-slate-200 text-slate-600">{skill.label}</span>
                    <span className={`text-xs font-bold ${skill.color === 'bg-primary' ? 'text-primary' : skill.color.replace('bg-', 'text-')}`}>{skill.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${skill.color} rounded-full transition-all duration-1000 delay-300 shadow-[0_0_12px_rgba(13,127,242,0.3)]`}
                      style={{ width: `${skill.value}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">{skill.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-[11px] text-primary font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                Next Milestone
              </p>
              <p className="text-sm font-medium dark:text-slate-200 text-slate-700">Reach Band 8.5 in Writing to unlock "Advanced Essay Architect" tools.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 border-t border-white/10 p-8 text-center">
        <p className="text-slate-500 text-sm">© 2024 AI Prep Pro Platform • Powered by Advanced Linguistic AI Engines</p>
      </footer>
    </div>
  );
};

export default Analytics;
