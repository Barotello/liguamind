
import React, { useState, useContext } from 'react';
import { ExamType, WritingFeedback } from '../types';
import { gradeWritingEssay } from '../services/geminiService';
import { LanguageContext } from '../App';

const WritingAssistant: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [essay, setEssay] = useState('');
  const [prompt] = useState('Some people believe that school children should be allowed to use mobile phones during school hours. Others disagree. Discuss both views and give your opinion.');
  const [isGrading, setIsGrading] = useState(false);
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'feedback'>('editor');

  const handleGrade = async () => {
    if (!essay.trim()) return;
    setIsGrading(true);
    try {
      const result = await gradeWritingEssay(essay, prompt, ExamType.IELTS);
      setFeedback(result);
      setActiveTab('feedback');
    } catch (err) { alert("Grading failed."); }
    finally { setIsGrading(false); }
  };

  const wordCount = essay.split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-700 pt-10 px-4">
      <header className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase dark:text-white text-slate-900 tracking-tighter">{t.writing.title}</h2>
          <p className="dark:text-slate-400 text-slate-500 font-bold mt-1">Band Score Analysis</p>
        </div>
        <div className="flex dark:bg-white/5 bg-slate-100 p-1.5 rounded-2xl glass-card border-white/5">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'editor' ? 'bg-vivid-amber text-black shadow-md' : 'text-slate-400'}`}
          >
            {t.writing.draft}
          </button>
          <button
            onClick={() => feedback && setActiveTab('feedback')}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'feedback' ? 'bg-vivid-amber text-black shadow-md' : 'text-slate-400'} ${!feedback ? 'opacity-50' : ''}`}
          >
            {t.writing.feedback}
          </button>
        </div>
      </header>

      {activeTab === 'editor' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-8 rounded-[2.5rem] border-white/5 bg-white/5">
              <h3 className="font-black mb-4 flex items-center gap-3 uppercase tracking-tight">
                <span className="material-symbols-outlined text-vivid-amber">article</span>
                {t.writing.prompt}
              </h3>
              <p className="dark:text-slate-300 text-slate-700 text-base leading-relaxed italic font-medium">
                "{prompt}"
              </p>
            </div>
            <div className="glass-card p-8 rounded-[2.5rem] space-y-6 border-white/5 bg-white/5">
              <h3 className="font-black uppercase tracking-widest text-xs">{t.writing.taskInfo}</h3>
              <div className="space-y-5">
                {[
                  { label: t.writing.targetCount, val: '250+ words', color: 'text-slate-400' },
                  { label: t.writing.currentCount, val: `${wordCount} words`, color: wordCount < 250 ? 'text-vivid-amber' : 'text-vivid-green' }
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{s.label}</span>
                    <span className={`text-sm font-black ${s.color}`}>{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <textarea
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              placeholder="Start writing here... Focus on clear arguments and examples."
              className="w-full h-[500px] glass-card rounded-[3rem] p-10 outline-none focus:ring-4 ring-vivid-amber/10 transition-all text-xl leading-relaxed resize-none bg-black/20 font-medium dark:text-white text-slate-900"
            />
            <div className="flex justify-end">
              <button
                onClick={handleGrade}
                disabled={isGrading || wordCount < 20}
                className="px-12 py-5 bg-vivid-amber hover:brightness-110 disabled:opacity-50 rounded-[1.5rem] font-black transition-all shadow-lg flex items-center gap-4 text-black uppercase text-[10px] tracking-widest active:scale-95"
              >
                {isGrading ? (
                  <>
                    <div className="size-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>{t.writing.analyzing}</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined font-black">send</span>
                    <span>{t.writing.submitBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        feedback && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in zoom-in-95 duration-700">
            <div className="lg:col-span-1 space-y-8">
              <div className="glass-card p-10 rounded-[3rem] text-center border-2 border-vivid-amber/30">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-4 font-black">{t.writing.estimatedBand}</p>
                <div className="text-8xl font-black text-vivid-amber leading-none tracking-tighter">
                  {feedback.bandScore}
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 space-y-8">
              <div className="glass-card p-12 rounded-[3.5rem] bg-white/5">
                <h3 className="text-2xl font-black mb-8 dark:text-white text-slate-900 tracking-tight">{t.writing.examinerFeedback}</h3>
                <div className="p-8 rounded-[2rem] bg-vivid-amber/5 border border-vivid-amber/10 dark:text-slate-300 text-slate-700 text-lg leading-loose font-medium italic">
                  {feedback.overallFeedback}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WritingAssistant;
