
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Mon', score: 6.5 },
  { name: 'Tue', score: 6.0 },
  { name: 'Wed', score: 7.5 },
  { name: 'Thu', score: 7.0 },
  { name: 'Fri', score: 7.2 },
  { name: 'Sat', score: 8.0 },
  { name: 'Sun', score: 7.8 },
];

const Dashboard: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const stats = [
    { label: 'SPEAKING', score: '7.5', color: 'text-vivid-green', stroke: '#0df259', bg: 'bg-vivid-green/10', icon: 'mic', status: 'HIGH', path: '/speaking' },
    { label: 'READING', score: '6.5', color: 'text-vivid-blue', stroke: '#0d7ff2', bg: 'bg-vivid-blue/10', icon: 'menu_book', status: 'TARGET: 7.0', path: '/reading' },
    { label: 'WRITING', score: '8.0', color: 'text-vivid-amber', stroke: '#f59e0b', bg: 'bg-vivid-amber/10', icon: 'edit_square', status: 'EXCELLENT', path: '/writing' },
    { label: 'LISTENING', score: '7.0', color: 'text-vivid-purple', stroke: '#a855f7', bg: 'bg-vivid-purple/10', icon: 'headphones', status: 'STABLE', path: '/listening' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">

      {/* Header with Streak & Goals */}
      <header className="glass-card p-10 rounded-[3rem] flex flex-wrap justify-between items-center gap-8 border border-white/5 dark:bg-white/[0.02] bg-white shadow-xl animate-in fade-in slide-in-from-top-6 duration-700">
        <div className="flex flex-col gap-2">
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">SCHOLAR DASHBOARD</p>
          <h1 className="dark:text-white text-slate-900 text-5xl lg:text-6xl font-black leading-tight tracking-tighter">Progress Overview</h1>
          <p className="dark:text-slate-400 text-slate-600 text-lg font-medium">Hello Alex! Your AI predicted score is <span className="text-vivid-green font-black">Band 7.8</span>.</p>
        </div>

        {/* Gamification Widget */}
        <div className="flex items-center gap-6 dark:bg-black/20 bg-slate-50 p-6 rounded-3xl border border-white/5">
          <div className="flex flex-col gap-1 text-center px-4 border-r border-white/10">
            <span className="text-4xl font-black text-orange-500 flex items-center gap-1">
              12 <span className="material-symbols-outlined text-3xl animate-pulse">local_fire_department</span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest dark:text-slate-500 text-slate-400">Day Streak</span>
          </div>
          <div className="flex flex-col gap-2 w-48">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-widest dark:text-white text-slate-900">Daily Goal</span>
              <span className="text-[9px] font-black text-vivid-blue">2/3</span>
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-vivid-blue w-[66%] rounded-full shadow-[0_0_10px_rgba(13,127,242,0.5)]"></div>
            </div>
            <p className="text-[9px] font-medium dark:text-slate-500 text-slate-400">Keep it up! Just 1 more lesson.</p>
          </div>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            onClick={() => navigate(stat.path)}
            className="glass-card flex flex-col gap-8 p-10 rounded-[3rem] group border border-white/5 dark:bg-[#0f1115] bg-white hover:border-white/20 transition-all duration-300 animate-in fade-in cursor-pointer relative overflow-hidden"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex justify-between items-start">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center border border-white/5 group-hover:rotate-6 transition-transform`}>
                <span className={`material-symbols-outlined text-2xl ${stat.color} font-black`}>{stat.icon}</span>
              </div>
              <span className={`text-[8px] font-black ${stat.color} dark:bg-white/5 bg-slate-100 px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/5`}>{stat.status}</span>
            </div>

            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative flex items-center justify-center w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="dark:text-white/5 text-slate-100" cx="50" cy="50" r="44" fill="transparent" stroke="currentColor" strokeWidth="4" />
                  <circle
                    cx="50" cy="50" r="44" fill="transparent"
                    stroke={stat.stroke} strokeWidth="4" strokeDasharray="276.46"
                    strokeDashoffset="70" strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black dark:text-white text-slate-900 tracking-tighter tabular-nums">{stat.score}</span>
                </div>
              </div>
              <h2 className="dark:text-slate-400 text-slate-400 text-[10px] font-black mt-10 uppercase tracking-[0.4em] group-hover:text-white transition-colors">{stat.label}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* NEW: Daily Mix Section (Quick Resume, Word of Day, Leaderboard) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quick Resume */}
        <div onClick={() => navigate('/reading')} className="glass-card p-8 rounded-[2.5rem] border border-white/5 dark:bg-[#121418] bg-white cursor-pointer group hover:border-primary/30 transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-2xl animate-pulse">history</span>
              <h3 className="text-sm font-black uppercase tracking-widest dark:text-white text-slate-900">Jump Back In</h3>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Last Session</p>
            <h4 className="text-xl font-black dark:text-white text-slate-900 leading-tight">Reading: Academic Passage 2</h4>
          </div>
          <div className="flex items-center gap-2 mt-6 text-primary font-black uppercase text-[10px] tracking-widest group-hover:gap-4 transition-all">
            Continue <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </div>
        </div>

        {/* Word of the Day */}
        <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 dark:bg-[#121418] bg-white group hover:border-vivid-amber/30 transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-vivid-amber/10 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-vivid-amber text-2xl">lightbulb</span>
              <h3 className="text-sm font-black uppercase tracking-widest dark:text-white text-slate-900">Word of the Day</h3>
            </div>
            <h4 className="text-2xl font-black dark:text-white text-slate-900 mb-1">Ubiquitous</h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">/juːˈbɪkwɪtəs/ • Adjective</p>
            <p className="text-sm dark:text-slate-400 text-slate-500 mt-4 leading-relaxed font-medium">"Present, appearing, or found everywhere."</p>
          </div>
        </div>

        {/* Leaderboard Summary */}
        <div onClick={() => navigate('/community')} className="glass-card p-8 rounded-[2.5rem] border border-white/5 dark:bg-[#121418] bg-white cursor-pointer group hover:border-vivid-purple/30 transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-vivid-purple/10 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-vivid-purple text-2xl">trophy</span>
              <h3 className="text-sm font-black uppercase tracking-widest dark:text-white text-slate-900">Leaderboard</h3>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-black dark:text-white text-slate-900">#5</span>
              <span className="text-[10px] font-black text-vivid-green uppercase tracking-widest">Top 2%</span>
            </div>
            <p className="text-xs dark:text-slate-400 text-slate-500 font-medium">You need 50 pts to overtake <span className="font-bold dark:text-white text-slate-900">Sarah K.</span></p>
          </div>
          <div className="mt-4 w-full bg-slate-100 dark:bg-black/20 rounded-full h-1.5 overflow-hidden">
            <div className="bg-vivid-purple h-full w-[85%]"></div>
          </div>
        </div>

      </div>

      {/* Chart & AI Recommendation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-card p-12 rounded-[3rem] border border-white/5 dark:bg-[#0f1115] bg-white shadow-xl">
            <div className="flex justify-between items-center mb-10">
              <h3 className="dark:text-white text-slate-900 text-xl font-black uppercase tracking-tight">WEEKLY DRIFT</h3>
              <span className="text-vivid-green font-black text-sm uppercase">+0.5 INCREASE</span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScoreVivid" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0df259" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0df259" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 11, fontWeight: 900 }} axisLine={false} tickLine={false} dy={15} />
                  <YAxis stroke="#475569" domain={[0, 9]} tick={{ fontSize: 11, fontWeight: 900 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0a14', border: '1px solid #ffffff10', borderRadius: '16px' }} itemStyle={{ color: '#0df259', fontWeight: 900 }} />
                  <Area type="monotone" dataKey="score" stroke="#0df259" fillOpacity={1} fill="url(#colorScoreVivid)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="glass-card p-10 rounded-[3rem] h-full flex flex-col border border-white/5 dark:bg-[#0f1115] bg-white shadow-xl relative overflow-hidden group">
            <h3 className="text-xl font-black text-white mb-10 flex items-center gap-4">
              <span className="material-symbols-outlined text-vivid-purple font-black">bolt</span>
              AI RECOMMENDED
            </h3>
            <div className="p-8 rounded-[2.5rem] bg-vivid-purple/5 border border-white/5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-black text-vivid-purple uppercase tracking-widest mb-3">LISTENING SPRINT</p>
                <p className="text-lg font-bold text-slate-300 mb-8 leading-relaxed">Focus on academic lectures to boost your current Band 7.0 score.</p>
              </div>
              <button
                onClick={() => navigate('/listening')}
                className="w-full py-5 bg-vivid-purple text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:brightness-110 active:scale-95 transition-all"
              >
                START NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
