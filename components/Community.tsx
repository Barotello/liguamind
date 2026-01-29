
import React, { useState } from 'react';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Global');

  const leaderData = [
    { rank: '01', name: 'Alex Chen', focus: 'Academic Writing', score: 8.5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", online: true, border: "border-amber-400/50", rankColor: "text-amber-400" },
    { rank: '02', name: 'Sarah Johnson', focus: 'Fluent Speaking', score: 8.0, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", online: true, border: "border-white/10", rankColor: "text-slate-300" },
    { rank: '03', name: 'Marco Rossi', focus: 'Reading Logic', score: 8.0, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marco", online: false, border: "border-white/10", rankColor: "text-amber-700" },
  ];

  return (
    <div className="flex-1 max-w-[1600px] mx-auto w-full p-8 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Community Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2">
            <span className="material-symbols-outlined text-sm font-black">groups</span>
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Global Learning Hub</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight dark:text-white text-slate-900 uppercase tracking-tight">Community & Leaderboard</h1>
          <p className="text-slate-400 mt-2 max-w-2xl text-lg font-light leading-relaxed">Collaborate with fellow students and compete for the top spots in our global linguistic rankings.</p>
        </div>
        <div className="flex gap-3">
          <div className="glass flex p-1 rounded-xl border dark:border-white/10 border-slate-200">
            {['Global', 'Regional', 'Friends'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left: Leaderboard Section */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <h3 className="text-xl font-bold flex items-center gap-2 uppercase tracking-tight dark:text-white text-slate-900">
                <span className="material-symbols-outlined text-amber-400 font-black">workspace_premium</span>
                Top Performers
              </h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">October 2023 Season</span>
            </div>

            <div className="divide-y divide-white/5">
              {leaderData.map((user) => (
                <div key={user.rank} className="p-5 flex items-center justify-between group hover:bg-white/5 transition-all">
                  <div className="flex items-center gap-6">
                    <span className={`w-8 text-center font-black text-2xl ${user.rankColor} italic`}>{user.rank}</span>
                    <div className="relative">
                      <div className={`size-12 rounded-2xl bg-cover bg-center border-2 ${user.border} overflow-hidden`}>
                        <img src={user.img} alt={user.name} />
                      </div>
                      {user.online && <div className="absolute -bottom-1 -right-1 size-4 bg-emerald-500 border-2 border-background-dark rounded-full"></div>}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-primary transition-colors dark:text-white text-slate-900">{user.name}</h4>
                      <p className="text-xs text-slate-400">Focused on: {user.focus}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-primary">{user.score}</div>
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Band Score</div>
                  </div>
                </div>
              ))}

              {/* Current User Row */}
              <div className="p-5 flex items-center justify-between group hover:bg-white/5 transition-all bg-primary/5 border-l-4 border-primary">
                <div className="flex items-center gap-6">
                  <span className="w-8 text-center font-black text-2xl text-slate-500 italic">24</span>
                  <div className="relative">
                    <div className="size-12 rounded-2xl bg-cover bg-center ring-4 ring-primary/20 overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="You" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-primary">You (AI User)</h4>
                    <p className="text-xs text-slate-300">Trending Up! (+4 spots)</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-primary">7.5</div>
                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Band Score</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 text-center">
              <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">View Full Leaderboard</button>
            </div>
          </div>
        </div>

        {/* Right: Study Groups Section */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="glass-card rounded-2xl p-6 sticky top-28 h-fit border border-primary/20 shadow-[0_0_20px_rgba(13,127,242,0.1)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold dark:text-white text-slate-900 uppercase tracking-tight">Study Groups</h3>
              <button className="size-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center hover:bg-primary transition-colors hover:text-white">
                <span className="material-symbols-outlined text-xl font-bold">add</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Group Card 1 */}
              <div className="p-4 rounded-xl glass border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)] group cursor-pointer hover:bg-white/5 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-wider">Live Now</span>
                  <div className="flex -space-x-2">
                    {[1, 2].map(i => (
                      <div key={i} className="size-6 rounded-full border border-background-dark overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="user" />
                      </div>
                    ))}
                    <div className="size-6 rounded-full border border-background-dark bg-slate-700 flex items-center justify-center text-[8px] text-white font-bold">+8</div>
                  </div>
                </div>
                <h4 className="font-bold text-sm mb-1 group-hover:text-emerald-400 transition-colors dark:text-white text-slate-900">Speaking Practice: Band 7+ Focus</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">Timed practice for Part 2 and peer-feedback sessions.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-black">
                    <span className="material-symbols-outlined text-xs font-black">mic</span>
                    Audio Only
                  </div>
                  <button className="px-4 py-1.5 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-emerald-600 transition-colors">Join Room</button>
                </div>
              </div>

              {/* Group Card 2 */}
              <div className="p-4 rounded-xl glass border-primary/30 group cursor-pointer hover:bg-white/5 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">Starting Soon</span>
                  <div className="flex -space-x-2">
                    {[3].map(i => (
                      <div key={i} className="size-6 rounded-full border border-background-dark overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="user" />
                      </div>
                    ))}
                    <div className="size-6 rounded-full border border-background-dark bg-slate-700 flex items-center justify-center text-[8px] text-white font-bold">+3</div>
                  </div>
                </div>
                <h4 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors dark:text-white text-slate-900">Writing Peer Review</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">Swap your Task 2 essays for community-driven AI analysis.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-black">
                    <span className="material-symbols-outlined text-xs font-black">schedule</span>
                    Starts in 12m
                  </div>
                  <button className="px-4 py-1.5 border border-primary/40 text-primary text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-primary/10 transition-colors">Set Reminder</button>
                </div>
              </div>

              {/* Group Card 3 */}
              <div className="p-4 rounded-xl glass border-purple-500/30 group cursor-pointer hover:bg-white/5 transition-all opacity-80">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-wider">Active</span>
                  <div className="flex -space-x-2">
                    <div className="size-6 rounded-full border border-background-dark bg-slate-700 flex items-center justify-center text-[8px] text-white font-bold">15</div>
                  </div>
                </div>
                <h4 className="font-bold text-sm mb-1 group-hover:text-purple-400 transition-colors dark:text-white text-slate-900">Vocab Sprint Challenge</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">Quick-fire synonyms and collocations test.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-black">
                    <span className="material-symbols-outlined text-xs font-black">quiz</span>
                    Interactive
                  </div>
                  <button className="px-4 py-1.5 bg-purple-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-purple-700 transition-colors">Join Sprint</button>
                </div>
              </div>
            </div>

            {/* Achievement Progress Widget */}
            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider mb-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs font-black">emoji_events</span>
                Achievement Progress
              </p>
              <div className="flex justify-between text-[10px] font-black mb-1 dark:text-white text-slate-900">
                <span>Collaborator Rank II</span>
                <span>80%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[80%] transition-all duration-1000"></div>
              </div>
              <p className="text-[9px] text-slate-500 mt-2 font-bold italic">Help 3 more students to unlock the "Mentor" badge.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Host Session Card */}
      <div className="glass-card rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-dashed border-white/20">
        <div className="flex items-center gap-6">
          <div className="size-16 rounded-2xl glass flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_20px_rgba(13,127,242,0.1)]">
            <span className="material-symbols-outlined text-3xl font-black">diversity_3</span>
          </div>
          <div>
            <h3 className="text-xl font-bold dark:text-white text-slate-900 uppercase tracking-tight">Host a Private Session</h3>
            <p className="text-slate-400 text-sm">Create a locked room to study exclusively with your classmates or friends.</p>
          </div>
        </div>
        <button className="w-full md:w-auto px-8 py-3 bg-white text-background-dark font-black rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest">
          Create Private Group
          <span className="material-symbols-outlined font-black">shield_person</span>
        </button>
      </div>

      <footer className="mt-12 border-t border-white/10 p-8 text-center">
        <p className="text-slate-500 text-sm font-bold uppercase text-[10px] tracking-widest">© 2023 AI Prep Pro Platform • Global Learning Community • Privacy Secure</p>
      </footer>
    </div>
  );
};

export default Community;
