
import React, { useState, useEffect } from 'react';

const MockTestEnvironment: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(3252);
  const [activeModule, setActiveModule] = useState<'reading' | 'listening' | 'writing' | 'speaking'>('reading');
  const [fontSize, setFontSize] = useState(18);
  const [isSmartFocus, setIsSmartFocus] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync body class for sidebar dimming (global effect defined in index.html)
  useEffect(() => {
    if (isSmartFocus) {
      document.body.classList.add('smart-focus-active');
    } else {
      document.body.classList.remove('smart-focus-active');
    }
    return () => document.body.classList.remove('smart-focus-active');
  }, [isSmartFocus]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getModuleColor = (id: string) => {
    switch (id) {
      case 'reading': return 'bg-vivid-blue';
      case 'listening': return 'bg-vivid-purple';
      case 'writing': return 'bg-vivid-amber';
      case 'speaking': return 'bg-vivid-green';
      default: return 'bg-primary';
    }
  };

  const getDimClass = (type: 'menu' | 'focus') => {
    if (!isSmartFocus) return "opacity-100 blur-0 scale-100 transition-all duration-700";
    if (type === 'menu') return "opacity-10 blur-[4px] pointer-events-none scale-[0.98] transition-all duration-700";
    return "opacity-100 blur-0 scale-100 transition-all duration-700 relative z-20";
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-transparent overflow-hidden font-display pt-2 px-4">
      {/* Detached Floating Header Card - Thinner like Reading Module */}
      <header className="glass-card mb-2 flex items-center justify-between px-8 py-1.5 dark:bg-background-dark/80 bg-white/90 backdrop-blur-3xl z-50 rounded-2xl border border-white/10 shadow-xl shrink-0 animate-in fade-in slide-in-from-top-6 duration-700">
        <div className={`flex items-center gap-10 ${getDimClass('menu')}`}>
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-base font-black">verified_user</span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Mock Test</span>
          </div>
          {/* Mobile Navigation (Sliding Window) - Visible only on small screens */}
          <nav className="flex md:hidden items-center gap-2 dark:bg-black/40 bg-slate-100 rounded-xl p-1.5 border dark:border-white/5 border-slate-200 shadow-inner">
            {(() => {
              const modules = [
                { id: 'reading', label: 'Reading', icon: 'auto_stories' },
                { id: 'listening', label: 'Listening', icon: 'headphones' },
                { id: 'writing', label: 'Writing', icon: 'edit_note' },
                { id: 'speaking', label: 'Speaking', icon: 'mic_none' }
              ];
              const currentIndex = modules.findIndex(m => m.id === activeModule);

              const prevModule = modules[currentIndex - 1];
              const nextModule = modules[currentIndex + 1];

              return (
                <>
                  {/* Previous Module (Small) */}
                  {prevModule && (
                    <button
                      onClick={() => setActiveModule(prevModule.id as any)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-black tracking-widest uppercase text-slate-400 hover:text-primary transition-all opacity-60 hover:opacity-100"
                    >
                      <span className="material-symbols-outlined text-sm">{prevModule.icon}</span>
                    </button>
                  )}

                  {/* Current Module (Prominent) */}
                  <div className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase text-white shadow-lg transition-all scale-105 ${getModuleColor(activeModule)}`}>
                    <span className="material-symbols-outlined text-lg">{modules[currentIndex].icon}</span>
                    {modules[currentIndex].label}
                  </div>

                  {/* Next Module (Small) */}
                  {nextModule && (
                    <button
                      onClick={() => setActiveModule(nextModule.id as any)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-black tracking-widest uppercase text-slate-400 hover:text-primary transition-all opacity-60 hover:opacity-100"
                    >
                      <span className="material-symbols-outlined text-sm">{nextModule.icon}</span>
                    </button>
                  )}
                </>
              );
            })()}
          </nav>

          {/* Desktop Navigation (Full List) - Visible only on medium+ screens */}
          <nav className="hidden md:flex items-center gap-1.5 dark:bg-black/40 bg-slate-100 rounded-xl p-1 border dark:border-white/5 border-slate-200 shadow-inner">
            {[
              { id: 'reading', label: 'Reading', icon: 'auto_stories' },
              { id: 'listening', label: 'Listening', icon: 'headphones' },
              { id: 'writing', label: 'Writing', icon: 'edit_note' },
              { id: 'speaking', label: 'Speaking', icon: 'mic_none' }
            ].map(mod => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id as any)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[8px] font-black tracking-widest uppercase transition-all ${activeModule === mod.id
                  ? `${getModuleColor(mod.id)} text-white shadow-lg`
                  : 'dark:text-slate-500 text-slate-400 hover:text-primary'
                  }`}
              >
                <span className="material-symbols-outlined text-base">{mod.icon}</span>
                {mod.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-8">
          {/* Timer and Focus Toggle stay bright */}
          <div className={`flex flex-col items-center ${getDimClass('focus')}`}>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg font-black">timer</span>
              <span className="text-xl font-mono font-black tabular-nums dark:text-white text-slate-900 tracking-tighter">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="h-6 w-px dark:bg-white/10 bg-slate-200"></div>

          {/* Smart Focus Toggle */}
          <button
            onClick={() => setIsSmartFocus(!isSmartFocus)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all z-50 shadow-xl ${isSmartFocus ? 'bg-primary text-white ring-2 ring-primary/20 shadow-vivid-glow-blue' : 'dark:bg-white/10 bg-white text-primary border border-primary/20'
              }`}
          >
            <span className="material-symbols-outlined text-sm">{isSmartFocus ? 'visibility' : 'auto_awesome'}</span>
            {isSmartFocus ? 'Exit Focus' : 'Focus'}
          </button>

          <button className={`flex items-center gap-3 px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-all active:scale-95 ${getDimClass('menu')}`}>
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">Submit Section</span>
            <span className="material-symbols-outlined text-emerald-500 text-base font-black">check_circle</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden gap-4 pb-2">
        {/* Left Side: Passage View - Stays Sharp */}
        <section className={`flex-1 glass-card rounded-3xl flex flex-col overflow-hidden border transition-all duration-700 ${isSmartFocus ? 'border-primary/40 shadow-2xl ring-4 ring-primary/5' : 'dark:border-white/5 border-slate-200 dark:bg-white/[0.02] bg-white/40'}`}>
          <div className="px-10 py-3 border-b dark:border-white/10 border-slate-200 shrink-0 bg-white/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-primary uppercase tracking-[0.3em] mb-0.5">Passage 1 Content</span>
              <h2 className="text-lg font-black dark:text-white text-slate-900 tracking-tight leading-tight uppercase">Computational Linguistics Evolution</h2>
            </div>
            {/* Zoom Controls */}
            <div className="flex items-center gap-2 p-1 dark:bg-white/5 bg-slate-100 rounded-xl border dark:border-white/5 border-slate-200">
              <button
                onClick={() => setFontSize(prev => Math.max(prev - 2, 12))}
                className="size-7 flex items-center justify-center rounded-lg hover:bg-primary hover:text-white dark:text-slate-400 text-slate-500 transition-all active:scale-90"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined text-lg font-black">zoom_out</span>
              </button>
              <div className="h-4 w-px dark:bg-white/10 bg-slate-300"></div>
              <button
                onClick={() => setFontSize(prev => Math.min(prev + 2, 36))}
                className="size-7 flex items-center justify-center rounded-lg hover:bg-primary hover:text-white dark:text-slate-400 text-slate-500 transition-all active:scale-90"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-lg font-black">zoom_in</span>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto flex flex-col pt-6 px-12 pb-12 custom-scrollbar">
            <div
              className="flex-1 leading-relaxed dark:text-slate-300 text-slate-700 font-medium space-y-8 transition-all duration-300"
              style={{ fontSize: `${fontSize}px` }}
            >
              <p>Computational linguistics is an interdisciplinary field concerned with the statistical or rule-based modeling of natural language from a computational perspective.</p>
              <p>Historically, computational linguistics began as the effort in the United States in the 1950s by linguists to use computers to automatically translate texts from foreign languages.</p>
              <div className="p-10 glass rounded-[2.5rem] border-dashed dark:border-white/20 border-slate-300 my-8 bg-primary/5">
                <p className="text-sm italic dark:text-slate-400 text-slate-500 font-bold leading-relaxed">"The true complexity of human language lies not just in the syntax, but in the pragmatic context of shared human experience." — Dr. Elena Vance (2022)</p>
              </div>
              <p>Today, the field encompasses large language models and neural networks that have revolutionized how machines process human communication, bridging the gap between formal logic and linguistic nuance.</p>
            </div>
          </div>
        </section>

        {/* Right Side: Questions View & Navigation - Stays Sharp */}
        <section className={`w-[480px] flex flex-col gap-3 z-20`}>
          <div className={`flex-1 glass-card rounded-3xl flex flex-col overflow-hidden border transition-all duration-700 shadow-xl ${isSmartFocus ? 'border-primary/40 ring-4 ring-primary/5 dark:bg-white/[0.04]' : 'dark:border-white/5 border-slate-200 dark:bg-white/[0.02] bg-white/40'}`}>
            <div className="p-5 border-b dark:border-white/10 border-slate-200 shrink-0 bg-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[8px] font-black dark:text-slate-400 text-slate-500 uppercase tracking-widest">Questions 1-5</span>
                <div className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[7px] dark:text-slate-500 text-slate-400 font-black tracking-widest uppercase">Auto-Saving</span>
                </div>
              </div>
              <h3 className="font-black text-sm dark:text-white text-slate-900 leading-tight uppercase tracking-tight">Select the Correct Option</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-8">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="size-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-[9px] font-black text-primary shadow-sm shrink-0 uppercase tracking-tighter">01</span>
                  <p className="text-sm dark:text-slate-200 text-slate-800 font-black uppercase tracking-tight">What was the primary initial motivation for computational linguistics?</p>
                </div>
                <div className="grid gap-2.5 pl-11">
                  {[
                    "To automatically translate Russian scientific journals.",
                    "To create the first digital dictionaries for schools.",
                    "To develop voice recognition for military pilots.",
                    "To study the formal syntax of extinct languages."
                  ].map((option, idx) => (
                    <label key={idx} className="flex items-center gap-2.5 p-3 rounded-xl glass-card border dark:border-white/5 border-slate-100 hover:border-primary/50 cursor-pointer transition-all group">
                      <input className="form-radio size-4 bg-white/5 border-white/20 text-primary focus:ring-primary focus:ring-offset-0" name="q1" type="radio" />
                      <span className="text-[11px] dark:text-slate-400 text-slate-600 group-hover:text-primary transition-colors font-bold">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Question Navigation Bar - Sharp in focus */}
            <div className="p-3 border-t dark:border-white/10 border-slate-200 flex items-center justify-between shrink-0 bg-white/5">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-primary/10 dark:text-slate-400 text-slate-500 hover:text-primary transition-all font-black uppercase text-[8px] tracking-widest active:scale-95">
                <span className="material-symbols-outlined text-base">chevron_left</span>
                Prev
              </button>
              <div className="flex gap-1">
                {[1, 2, 3].map(dot => (
                  <div key={dot} className={`size-1.5 rounded-full ${dot === 1 ? 'bg-primary shadow-vivid-glow-blue' : 'dark:bg-white/10 bg-slate-200'}`}></div>
                ))}
              </div>
              <button className="flex items-center gap-1 px-5 py-1.5 rounded-lg bg-primary text-white transition-all hover:brightness-110 font-black uppercase text-[8px] tracking-widest shadow-lg shadow-primary/20 active:scale-95">
                Next
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Progress Footer - Dims in Focus Mode */}
      <footer className={`mt-0 mb-2 p-2.5 glass-card rounded-2xl flex items-center justify-between border border-slate-200 shrink-0 ${getDimClass('menu')}`}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            {/* Overall Progress label removed as per user request */}
            <div className="w-40 h-1 bg-black/20 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[20%] rounded-full shadow-[0_0_8px_rgba(13,127,242,0.5)] transition-all duration-1000"></div>
            </div>
            <span className="text-[8px] font-black text-primary tracking-widest uppercase">1 / 40 Answered</span>
          </div>
        </div>
        {/* AI Secure Assessment badge removed as per user request */}
      </footer>
    </div>
  );
};

export default MockTestEnvironment;
