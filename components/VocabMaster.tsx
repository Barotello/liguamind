
import React, { useContext, useState } from 'react';
import { LanguageContext } from '../App';

const vocabularyList = [
  { word: "Ubiquitous", phonetic: "/juːˈbɪkwɪtəs/", type: "Adjective", example: "Digital technology is ubiquitous in modern education paradigms.", band: "8.0", success: "84%" },
  { word: "Mitigate", phonetic: "/ˈmɪtɪɡeɪt/", type: "Verb", example: "Policies aim to mitigate the negative impact of urbanization.", band: "7.5", success: "72%" }
];

const VocabMaster: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeWord = vocabularyList[currentIndex];

  return (
    <div className="max-w-6xl mx-auto space-y-10 p-4 animate-in fade-in duration-700">
      <header className="flex flex-col gap-2">
        <p className="text-vivid-yellow text-[10px] font-black uppercase tracking-[0.4em]">Mastery Program</p>
        <h1 className="text-5xl font-black dark:text-white text-slate-900 tracking-wide uppercase">Lexical Resource</h1>
      </header>

      <div className="glass-card rounded-[4rem] p-16 flex flex-col justify-between min-h-[500px] border-white/10 dark:bg-[#121418] bg-white shadow-3xl vivid-glow-yellow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-vivid-yellow/10 blur-[100px] -mr-40 -mt-40 transition-opacity duration-1000 opacity-0 group-hover:opacity-100"></div>

        <div className="relative z-10 space-y-12">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-vivid-yellow text-[10px] font-black uppercase tracking-[0.3em] mb-4 inline-block">{activeWord.type}</span>
              <h2 className="text-7xl md:text-8xl font-black dark:text-white text-slate-900 tracking-tighter mb-4">{activeWord.word}</h2>
              <div className="flex items-center gap-6 text-slate-400">
                <p className="text-2xl font-mono italic">{activeWord.phonetic}</p>
                <button className="size-14 rounded-2xl bg-vivid-yellow/10 border border-vivid-yellow/20 flex items-center justify-center text-vivid-yellow hover:bg-vivid-yellow hover:text-black transition-all shadow-vivid-glow-yellow">
                  <span className="material-symbols-outlined text-3xl">volume_up</span>
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Mastery</p>
              <p className="text-5xl font-black text-vivid-green tabular-nums">{activeWord.success}</p>
            </div>
          </div>

          <div className="p-12 rounded-[3rem] bg-vivid-yellow/5 border border-vivid-yellow/10 relative group-hover:border-vivid-yellow/30 transition-all">
            <p className="text-3xl font-bold dark:text-white text-slate-800 leading-relaxed italic">
              "{activeWord.example}"
            </p>
          </div>
        </div>

        <div className="relative z-10 flex gap-6 mt-16">
          <button className="flex-1 py-6 glass-card rounded-3xl text-xs font-black uppercase tracking-widest dark:text-white text-slate-700 hover:bg-white/10 transition-all">Save for Later</button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % vocabularyList.length)}
            className="flex-1 py-6 bg-vivid-yellow text-black rounded-3xl text-xs font-black uppercase tracking-widest shadow-[0_0_30px_rgba(242,223,13,0.3)] hover:brightness-110 active:scale-95 transition-all"
          >
            Next Word
          </button>
        </div>
      </div>
    </div>
  );
};

export default VocabMaster;
