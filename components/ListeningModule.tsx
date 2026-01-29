
import React, { useState, useContext } from 'react';
import { LanguageContext } from '../App';

const ListeningModule: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);

  return (
    <div className="flex-1 flex flex-col max-w-[1440px] mx-auto w-full px-8 py-10 gap-6 animate-in fade-in duration-700">
      <div className="flex items-center gap-3 text-sm dark:text-white/50 text-slate-400 font-black uppercase tracking-widest">
        <span className="dark:text-white text-slate-900">{t.nav.listen}</span>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span>Part 1</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="glass-card rounded-[3rem] p-10 flex flex-col gap-8 shadow-xl border border-white/10 dark:bg-white/5 bg-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-black dark:text-white text-slate-900 tracking-tight uppercase">Academic Lecture Simulation</h3>
                <p className="text-vivid-purple text-xs font-black uppercase tracking-widest mt-2">Speaker: AI Scholar Sarah</p>
              </div>
              <div className="flex items-center gap-2 dark:bg-white/5 bg-slate-100 rounded-2xl p-2 border dark:border-white/5 border-slate-200">
                {[0.75, 1.0, 1.5].map(s => (
                  <button 
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all ${speed === s ? 'bg-vivid-purple text-white shadow-md' : 'dark:text-white/40 text-slate-400'}`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            <div className="h-24 flex items-end justify-center gap-1 px-2 overflow-hidden bg-vivid-purple/5 rounded-[2rem] py-4 border border-vivid-purple/10">
              {[...Array(60)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 rounded-full bg-vivid-purple transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'opacity-20'}`}
                  style={{ height: `${Math.max(15, Math.sin(i * 0.3) * 60 + 60)}%` }}
                ></div>
              ))}
            </div>

            <div className="flex items-center gap-8">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center justify-center rounded-[1.5rem] size-16 bg-vivid-purple text-white hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                <span className="material-symbols-outlined text-4xl font-black">{isPlaying ? 'pause' : 'play_arrow'}</span>
              </button>
              <div className="flex-1">
                <div className="relative w-full h-3 dark:bg-white/10 bg-slate-200 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-vivid-purple w-[40%] rounded-full transition-all"></div>
                </div>
                <div className="flex justify-between mt-3 text-[10px] font-black dark:text-slate-500 text-slate-400 tabular-nums uppercase">
                  <span>03:12</span>
                  <span>10:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
             <div className="glass-card p-10 rounded-[2.5rem] bg-white/5 border-white/5">
                <h4 className="text-xl font-black mb-8 dark:text-white text-slate-900 uppercase tracking-tight flex items-center gap-4">
                   <span className="size-8 rounded-xl bg-vivid-purple text-white flex items-center justify-center text-xs">11</span>
                   Question Analysis
                </h4>
                <p className="dark:text-slate-300 text-slate-700 text-xl font-medium leading-loose italic">
                   "The primary focus of the lecture was on the 
                   <input className="bg-vivid-purple/5 border-b-4 border-vivid-purple w-48 text-vivid-purple font-black outline-none px-4 py-1 mx-2 rounded-t-xl" placeholder="..." type="text"/>
                   ecosystems of deep-sea trenches."
                </p>
             </div>
          </div>
        </div>

        <aside className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
           <div className="glass-card rounded-[3rem] p-10 h-[500px] flex flex-col border dark:border-white/5 border-slate-200 bg-white/5">
              <h1 className="text-xl font-black mb-8 dark:text-white text-slate-900 uppercase tracking-widest">{t.listening.notes}</h1>
              <textarea 
                className="flex-1 bg-transparent border-none focus:ring-0 text-lg dark:text-slate-300 text-slate-700 font-medium leading-relaxed resize-none custom-scrollbar"
                placeholder="Type your notes here..."
              ></textarea>
           </div>
           <button className="w-full py-6 bg-vivid-purple text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] shadow-lg active:scale-95 transition-all">
              {t.listening.submit}
           </button>
        </aside>
      </div>
    </div>
  );
};

export default ListeningModule;
