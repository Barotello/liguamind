
import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../App';
import { supabase } from '../lib/supabase';

// Define types for our data
interface Question {
  id: string;
  type: string;
  question: string;
  options?: string[];
  answer: string | boolean;
}

interface Passage {
  id: string;
  passage_id: string;
  level: string;
  title: string;
  topic: string;
  content: string;
  questions: Question[];
}

const ReadingModule: React.FC = () => {
  const { t } = useContext(LanguageContext);
  // State: activePassageIndex is null initially to show the Dashboard
  const [activePassageIndex, setActivePassageIndex] = useState<number | null>(null);
  const [questionPage, setQuestionPage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isSmartFocus, setIsSmartFocus] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  const QUESTIONS_PER_PAGE = 2;
  // Data state
  const [passages, setPassages] = useState<Passage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Answer & Result state
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Fetch data from Supabase
  useEffect(() => {
    const fetchReadings = async () => {
      try {
        const { data, error } = await supabase
          .from('readings')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;

        if (data) {
          setPassages(data as Passage[]);
        }
      } catch (error) {
        console.error('Error loading readings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadings();
  }, []);

  const handleAnswerSelect = (questionId: string, answer: string | boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    if (!currentPassage) return;

    let correctCount = 0;
    currentPassage.questions.forEach(q => {
      if (answers[q.id] === q.answer) {
        correctCount++;
      }
    });

    setScore({
      correct: correctCount,
      total: currentPassage.questions.length
    });
    setShowResults(true);
  };

  const currentPassage = activePassageIndex !== null ? passages[activePassageIndex] : null;

  const totalPages = currentPassage ? Math.ceil(currentPassage.questions.length / QUESTIONS_PER_PAGE) : 0;
  const currentQuestions = currentPassage ? currentPassage.questions.slice(
    questionPage * QUESTIONS_PER_PAGE,
    (questionPage + 1) * QUESTIONS_PER_PAGE
  ) : [];

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync body class for sidebar dimming
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
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Helper for word count
  const getWordCount = (text: string) => text.trim().split(/\s+/).length;

  // Helper for dynamic card colors based on index or topic
  const getCardStyle = (index: number) => {
    const colors = [
      'from-rose-500 to-orange-500',   // Vivid Red/Orange
      'from-blue-500 to-cyan-500',     // Electric Blue
      'from-emerald-500 to-teal-500',  // Lush Green
      'from-violet-600 to-indigo-600', // Deep Purple
      'from-amber-500 to-yellow-500',  // Golden
      'from-fuchsia-600 to-pink-600',  // Neon Pink
    ];
    return colors[index % colors.length];
  };

  // Helper for dynamic sizing based on difficulty
  const getCardSpan = (level: string) => {
    // C2/C1 get larger tiles
    if (level.includes('C2') || level.includes('C1')) return 'md:col-span-2 md:row-span-2';
    if (level.includes('B2')) return 'md:col-span-2 md:row-span-1';
    return 'md:col-span-1 md:row-span-1';
  };

  // Helper for selective dimming within the module
  const getDimClass = (type: 'menu' | 'focus') => {
    if (!isSmartFocus) return "opacity-100 blur-0 scale-100 transition-all duration-700";
    if (type === 'menu') return "opacity-10 blur-[4px] pointer-events-none scale-[0.98] transition-all duration-700";
    return "opacity-100 blur-0 scale-100 transition-all duration-700 relative z-20";
  };

  // ----------------------------------------------------------------------
  // VIEW: DASHBOARD (Grid)
  // ----------------------------------------------------------------------
  if (activePassageIndex === null) {
    return (
      <div className="flex flex-col h-full w-full bg-transparent overflow-hidden font-display pt-2 px-6 pb-6">
        <header className="mb-8 shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-12 rounded-2xl bg-gradient-to-br from-vivid-blue to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-vivid-blue/30">
              <span className="material-symbols-outlined text-2xl">library_books</span>
            </div>
            <div>
              <h1 className="text-3xl font-black dark:text-white text-slate-900 uppercase tracking-tighter">Reading Library</h1>
              <p className="dark:text-slate-400 text-slate-500 text-xs font-bold tracking-widest uppercase">Select a challenge to begin</p>
            </div>
          </div>
        </header>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="size-10 rounded-full border-4 border-vivid-blue border-t-transparent animate-spin"></div>
              <div className="text-vivid-blue font-black animate-pulse tracking-widest uppercase text-xs">Loading Readings...</div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-20 auto-rows-[200px]">
              {passages.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setActivePassageIndex(idx);
                    setQuestionPage(0);
                  }}
                  className={`group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between p-6 text-left border dark:border-white/10 border-white/40 bg-gradient-to-br ${getCardStyle(idx)} ${getCardSpan(p.level)}`}
                >
                  {/* Background overlay for readability */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>

                  {/* Content */}
                  <div className="relative z-10 flex justify-between items-start w-full">
                    <span className="bg-white/20 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase shadow-sm">
                      {p.level}
                    </span>
                    {p.level === 'C2' && (
                      <span className="bg-red-500 text-white px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest animate-pulse">
                        Hard
                      </span>
                    )}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-white/80 text-[10px] uppercase font-bold tracking-wider">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">subject</span>
                        {p.topic}
                      </span>
                    </div>

                    <h3 className={`font-black text-white leading-none mb-4 drop-shadow-md ${p.level.includes('C2') ? 'text-3xl' : 'text-xl'}`}>
                      {p.title}
                    </h3>

                    <div className="flex items-center gap-4 text-white/90 text-xs font-medium">
                      <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                        <span className="material-symbols-outlined text-sm">short_text</span>
                        <span className="font-mono font-bold">{getWordCount(p.content)} words</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                        <span className="material-symbols-outlined text-sm">quiz</span>
                        <span className="font-mono font-bold">{p.questions?.length || 0} Qs</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Icon */}
                  <div className="absolute bottom-4 right-4 text-white/0 group-hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-10">
                    <span className="material-symbols-outlined text-3xl drop-shadow-lg">arrow_forward</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // VIEW: READING INTERFACE (Active Passage)
  // ----------------------------------------------------------------------
  return (
    <div className="relative flex flex-col h-full w-full bg-transparent overflow-hidden font-display pt-2 px-4">

      {/* Detached Floating Header Card */}
      <header className="glass-card mb-2 flex items-center justify-between px-8 py-1.5 dark:bg-background-dark/80 bg-white/90 backdrop-blur-3xl z-50 rounded-2xl border border-white/10 shadow-xl shrink-0">

        {/* Left: Navigation Controls */}
        <div className={`flex items-center gap-4 flex-1 min-w-0 mr-8 ${getDimClass('menu')}`}>
          {/* Back to Library Button */}
          <button
            onClick={() => setActivePassageIndex(null)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl dark:bg-white/10 bg-slate-100 hover:bg-vivid-blue hover:text-white dark:text-slate-300 text-slate-600 transition-all group shrink-0"
          >
            <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Library</span>
          </button>

          <div className="h-6 w-px dark:bg-white/10 bg-slate-200"></div>

          <div className="flex items-center gap-2 text-vivid-blue shrink-0">
            <span className="material-symbols-outlined text-base font-black">auto_stories</span>
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">{currentPassage?.level || 'LOADING'} READING</span>
          </div>

          <div className="h-6 w-px dark:bg-white/10 bg-slate-200"></div>

          <h1 className="text-sm font-bold dark:text-white text-slate-900 truncate max-w-[300px]">{currentPassage?.title}</h1>
        </div>

        {/* Right: Global Controls & Timer */}
        <div className="flex items-center gap-6">
          <div className={`flex flex-col items-center ${getDimClass('focus')}`}>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-vivid-blue text-lg font-black">timer</span>
              <span className="text-xl font-mono font-black tabular-nums dark:text-white text-slate-900 tracking-tighter">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="h-6 w-px dark:bg-white/10 bg-slate-200"></div>

          {/* Smart Focus Toggle */}
          <button
            onClick={() => setIsSmartFocus(!isSmartFocus)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all z-50 shadow-xl ${isSmartFocus ? 'bg-vivid-blue text-white ring-2 ring-vivid-blue/20 shadow-vivid-glow-blue' : 'dark:bg-white/10 bg-white text-vivid-blue border border-vivid-blue/20'
              }`}
          >
            <span className="material-symbols-outlined text-sm">{isSmartFocus ? 'visibility' : 'auto_awesome'}</span>
            {isSmartFocus ? 'Exit' : 'Focus'}
          </button>

          <button
            onClick={handleSubmit}
            className={`bg-vivid-blue text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-vivid-blue/20 active:scale-95 transition-all ${getDimClass('menu')}`}
          >
            Submit Exam
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden gap-4 pb-2">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-vivid-blue font-black animate-pulse">LOADING CONTENT FROM SUPABASE...</div>
          </div>
        ) : !currentPassage ? (
          <div className="flex-1 flex items-center justify-center text-slate-400">No passage selected.</div>
        ) : (
          <>
            {/* Left Side: Passage View - Stays Sharp */}
            <section className={`flex-1 glass-card rounded-3xl flex flex-col overflow-hidden border transition-all duration-700 ${isSmartFocus ? 'border-vivid-blue/40 shadow-2xl ring-4 ring-vivid-blue/5' : 'dark:border-white/5 border-slate-200 dark:bg-white/[0.02] bg-white/40'}`}>
              <div className="px-10 py-3 border-b dark:border-white/10 border-slate-200 shrink-0 bg-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-vivid-blue uppercase tracking-[0.3em] mb-0.5">{currentPassage.topic}</span>
                  <h2 className="text-lg font-black dark:text-white text-slate-900 tracking-tight leading-tight uppercase">{currentPassage.title}</h2>
                </div>
                {/* Zoom Controls */}
                <div className="flex items-center gap-2 p-1 dark:bg-white/5 bg-slate-100 rounded-xl border dark:border-white/5 border-slate-200">
                  <button
                    onClick={() => setFontSize(prev => Math.max(prev - 2, 12))}
                    className="size-7 flex items-center justify-center rounded-lg hover:bg-vivid-blue hover:text-white dark:text-slate-400 text-slate-500 transition-all active:scale-90"
                    title="Zoom Out"
                  >
                    <span className="material-symbols-outlined text-lg font-black">zoom_out</span>
                  </button>
                  <div className="h-4 w-px dark:bg-white/10 bg-slate-300"></div>
                  <button
                    onClick={() => setFontSize(prev => Math.min(prev + 2, 36))}
                    className="size-7 flex items-center justify-center rounded-lg hover:bg-vivid-blue hover:text-white dark:text-slate-400 text-slate-500 transition-all active:scale-90"
                    title="Zoom In"
                  >
                    <span className="material-symbols-outlined text-lg font-black">zoom_in</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto flex flex-col pt-6 px-12 pb-12 custom-scrollbar">
                <div
                  className="flex-1 leading-relaxed dark:text-slate-300 text-slate-700 font-medium space-y-8 transition-all duration-300 whitespace-pre-wrap"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {currentPassage.content}
                </div>
              </div>
            </section>

            {/* Right Side: Questions View & Navigation - Stays Sharp */}
            <section className={`w-[440px] flex flex-col gap-3 z-20`}>
              <div className={`flex-1 glass-card rounded-3xl flex flex-col overflow-hidden border transition-all duration-700 shadow-xl ${isSmartFocus ? 'border-vivid-blue/40 ring-4 ring-vivid-blue/5 dark:bg-white/[0.04]' : 'dark:border-white/5 border-slate-200 dark:bg-white/[0.02] bg-white/40'}`}>
                <div className="p-5 border-b dark:border-white/10 border-slate-200 shrink-0 bg-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black dark:text-slate-400 text-slate-500 uppercase tracking-widest">Questions Set</span>
                    <div className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[7px] dark:text-slate-500 text-slate-400 font-black tracking-widest uppercase">Auto-Saving</span>
                    </div>
                  </div>
                  <h3 className="font-black text-sm dark:text-white text-slate-900 leading-tight uppercase tracking-tight">Comprehension Check</h3>
                </div>

                <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-6">
                  {currentQuestions.map((q, idx) => {
                    const globalIdx = (questionPage * QUESTIONS_PER_PAGE) + idx;
                    return (
                      <div key={q.id} className="space-y-3 pb-4 border-b dark:border-white/5 border-slate-100 last:border-0 fade-in animate-in slide-in-from-right-4 duration-500">
                        <div className="flex gap-2.5">
                          <span className="size-6 rounded-lg bg-vivid-blue/20 border border-vivid-blue/40 flex items-center justify-center text-[8px] font-black text-vivid-blue shadow-sm shrink-0 uppercase tracking-tighter">{globalIdx + 1}</span>
                          <p className="text-xs dark:text-slate-200 text-slate-800 font-bold tracking-tight">{q.question}</p>
                        </div>

                        {/* Multiple Choice & Vocabulary */}
                        {(q.type === 'multiple_choice' || q.type === 'vocabulary' || q.type === 'main_idea') && q.options && (
                          <div className="grid gap-2 pl-9">
                            {q.options.map((option, oIdx) => (
                              <label key={oIdx} className={`flex items-center gap-2 p-2 rounded-lg glass-card border cursor-pointer transition-all group ${answers[q.id] === option ? 'border-vivid-blue bg-vivid-blue/5' : 'dark:border-white/5 border-slate-100 hover:border-vivid-blue/50'}`}>
                                <input
                                  className="form-radio size-3 bg-white/5 border-white/20 text-vivid-blue focus:ring-vivid-blue focus:ring-offset-0"
                                  name={`q-${q.id}`}
                                  type="radio"
                                  checked={answers[q.id] === option}
                                  onChange={() => handleAnswerSelect(q.id, option)}
                                />
                                <span className={`text-[10px] transition-colors font-semibold ${answers[q.id] === option ? 'text-vivid-blue' : 'dark:text-slate-400 text-slate-600 group-hover:text-vivid-blue'}`}>{option}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {/* True/False */}
                        {q.type === 'true_false' && (
                          <div className="flex gap-4 pl-9">
                            {['True', 'False'].map((opt) => (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                  className="form-radio size-3 text-vivid-blue bg-white/5 border-white/20"
                                  name={`q-${q.id}`}
                                  type="radio"
                                  checked={answers[q.id] === (opt === 'True')}
                                  onChange={() => handleAnswerSelect(q.id, opt === 'True')}
                                />
                                <span className={`text-[10px] font-bold group-hover:text-vivid-blue ${answers[q.id] === (opt === 'True') ? 'text-vivid-blue' : 'dark:text-slate-400 text-slate-600'}`}>{opt}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Question Navigation Bar - Sharp in focus */}
                <div className="p-3 border-t dark:border-white/10 border-slate-200 flex items-center justify-between shrink-0 bg-white/5">
                  <button
                    onClick={() => setQuestionPage(p => Math.max(0, p - 1))}
                    disabled={questionPage === 0}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-vivid-blue/10 dark:text-slate-400 text-slate-500 hover:text-vivid-blue transition-all font-black uppercase text-[10px] tracking-widest active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-base">chevron_left</span>
                    Prev
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setQuestionPage(i)}
                        className={`size-1.5 rounded-full transition-all ${i === questionPage ? 'bg-vivid-blue shadow-vivid-glow-blue scale-125' : 'dark:bg-white/10 bg-slate-200 hover:bg-vivid-blue/50'}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setQuestionPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={questionPage === totalPages - 1}
                    className="flex items-center gap-1 px-5 py-1.5 rounded-lg bg-vivid-blue text-white transition-all hover:brightness-110 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-vivid-blue/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    Next
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Progress Footer - Dims in Focus Mode */}
      <footer className={`mt-0 mb-2 p-2.5 glass-card rounded-2xl flex items-center justify-between border border-slate-200 shrink-0 ${getDimClass('menu')}`}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-40 h-1 bg-black/20 rounded-full overflow-hidden">
              <div className="h-full bg-vivid-blue w-[15%] rounded-full shadow-vivid-glow-blue transition-all duration-1000"></div>
            </div>
            <span className="text-[8px] font-black text-vivid-blue tracking-widest uppercase">{Object.keys(answers).length} / {currentPassage?.questions.length || 0} Answered</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
        </div>
      </footer>

      {/* Results Modal */}
      {showResults && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl max-w-md w-full text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-vivid-blue to-transparent"></div>
            <div className="mb-6 flex justify-center">
              <div className="size-20 rounded-full bg-vivid-blue/10 flex items-center justify-center border border-vivid-blue/20 shadow-lg shadow-vivid-blue/20">
                <span className="material-symbols-outlined text-4xl text-vivid-blue">emoji_events</span>
              </div>
            </div>
            <h2 className="text-2xl font-black dark:text-white text-slate-900 mb-2 uppercase tracking-tight">C2 Exam Complete</h2>
            <p className="dark:text-slate-400 text-slate-500 text-xs font-medium mb-8">You have completed the advanced reading assessment.</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/5 border-slate-200">
                <div className="text-3xl font-black text-emerald-500 mb-1">{score.correct}</div>
                <div className="text-[9px] dark:text-slate-400 text-slate-500 uppercase tracking-widest font-bold">Correct</div>
              </div>
              <div className="p-4 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/5 border-slate-200">
                <div className="text-3xl font-black dark:text-slate-200 text-slate-800 mb-1">{score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%</div>
                <div className="text-[9px] dark:text-slate-400 text-slate-500 uppercase tracking-widest font-bold">Score</div>
              </div>
            </div>

            <button
              onClick={() => setShowResults(false)}
              className="w-full bg-vivid-blue hover:bg-vivid-blue/90 text-white font-black py-3 rounded-xl uppercase tracking-widest text-xs transition-all active:scale-95 shadow-lg shadow-vivid-blue/20"
            >
              Close Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingModule;
