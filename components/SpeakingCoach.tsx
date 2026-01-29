
import React, { useState, useRef, useEffect, useCallback, useContext, memo } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { decodeAudioData, decode, encode } from '../services/geminiService';
import { LanguageContext } from '../App';

const WaveformVisualizer = memo(({ isSessionActive, analyser }: { isSessionActive: boolean, analyser: AnalyserNode | null }) => {
  const [levels, setLevels] = useState<number[]>(new Array(30).fill(5));
  const animationFrameRef = useRef<number | null>(null);

  const update = useCallback(() => {
    if (!analyser || !isSessionActive) return;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);
    const newLevels = [];
    const step = Math.floor(dataArray.length / 30);
    for (let i = 0; i < 30; i++) {
      let sum = 0;
      for (let j = 0; j < step; j++) sum += dataArray[i * step + j];
      const average = sum / step;
      newLevels.push(Math.max(5, (average / 255) * 100));
    }
    setLevels(newLevels);
    animationFrameRef.current = requestAnimationFrame(update);
  }, [analyser, isSessionActive]);

  useEffect(() => {
    if (isSessionActive && analyser) {
      animationFrameRef.current = requestAnimationFrame(update);
    } else {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      setLevels(new Array(30).fill(5));
    }
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, [isSessionActive, analyser, update]);

  return (
    <div className="flex items-end gap-1 px-4 h-12">
      {levels.map((level, i) => (
        <div
          key={i}
          className="w-1.5 rounded-full transition-all duration-75"
          style={{
            height: `${level}%`,
            backgroundColor: isSessionActive ? '#0df259' : '#1e293b',
            opacity: isSessionActive ? (level / 100) + 0.3 : 0.1,
            boxShadow: isSessionActive && level > 50 ? `0 0 10px rgba(13, 242, 89, 0.5)` : 'none'
          }}
        ></div>
      ))}
    </div>
  );
});

const SpeakingCoach: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [transcriptions, setTranscriptions] = useState<string[]>([]);
  const [currentPrompt] = useState("Describe a time when you had to help someone you didn't know.");
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const currentTranscriptionRef = useRef('');

  const stopSession = useCallback(() => {
    setIsSessionActive(false);
    if (sessionPromiseRef.current) {
      sessionPromiseRef.current.then(session => session.close());
      sessionPromiseRef.current = null;
    }
    inputAudioContextRef.current?.close();
    outputAudioContextRef.current?.close();
    inputAudioContextRef.current = null;
    outputAudioContextRef.current = null;
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setAnalyser(null);
  }, []);

  const createPCMData = (data: Float32Array) => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) int16[i] = data[i] * 32768;
    return { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
  };

  const startSession = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
          systemInstruction: `You are a professional IELTS Speaking Examiner. Conduct a Part 2 speaking test on the prompt: "${currentPrompt}".`,
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            const newAnalyser = inputAudioContextRef.current!.createAnalyser();
            newAnalyser.fftSize = 256;
            source.connect(newAnalyser);
            setAnalyser(newAnalyser);
            scriptProcessor.onaudioprocess = (e) => {
              const pcmBlob = createPCMData(e.inputBuffer.getChannelData(0));
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
            setIsSessionActive(true);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer; source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
            if (message.serverContent?.outputTranscription) currentTranscriptionRef.current += message.serverContent.outputTranscription.text;
            if (message.serverContent?.turnComplete) {
              setTranscriptions(prev => [...prev, `Examiner: ${currentTranscriptionRef.current}`]);
              currentTranscriptionRef.current = '';
            }
          },
          onerror: (e) => console.error(e),
          onclose: () => setIsSessionActive(false),
        },
      });
      sessionPromiseRef.current = sessionPromise;
    } catch (err) { console.error(err); }
  };

  useEffect(() => { return () => stopSession(); }, [stopSession]);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700 pt-10 px-4">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black dark:text-white text-slate-900 tracking-tighter uppercase">{t.speaking.title}</h2>
          <p className="dark:text-slate-400 text-slate-500 font-bold mt-1">AI Personal Examiner</p>
        </div>
        <div className="flex items-center space-x-3">
          {!isSessionActive ? (
            <button
              onClick={startSession}
              className="px-8 py-3 bg-vivid-green text-black rounded-2xl font-black flex items-center space-x-2 transition-all shadow-lg hover:brightness-110 active:scale-95 uppercase text-xs tracking-widest"
            >
              <span className="material-symbols-outlined font-black">mic</span>
              <span>{t.speaking.startBtn}</span>
            </button>
          ) : (
            <button
              onClick={stopSession}
              className="px-8 py-3 bg-red-600 text-white rounded-2xl font-black flex items-center space-x-2 transition-all shadow-xl shadow-red-600/20 uppercase text-xs tracking-widest active:scale-95"
            >
              <span className="material-symbols-outlined">stop_circle</span>
              <span>{t.speaking.endBtn}</span>
            </button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-8 rounded-3xl border dark:border-white/5 border-slate-200 dark:bg-white/5 bg-white shadow-xl">
            <h3 className="text-lg font-black dark:text-white text-slate-900 mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-vivid-green">assignment_turned_in</span>
              {t.speaking.prompt}
            </h3>
            <div className="p-6 bg-vivid-green/5 dark:bg-white/5 rounded-2xl text-slate-700 dark:text-slate-300 italic border border-vivid-green/10 font-bold leading-relaxed">
              "{currentPrompt}"
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border dark:border-white/5 border-slate-200 dark:bg-white/5 bg-white shadow-xl">
            <h3 className="text-lg font-black dark:text-white text-slate-900 mb-6 uppercase tracking-tight">{t.speaking.analysis}</h3>
            <div className="space-y-6">
              {[
                { label: t.speaking.fluency, color: 'bg-vivid-green', val: 75 },
                { label: t.speaking.grammar, color: 'bg-vivid-blue', val: 50 },
                { label: t.speaking.pronunciation, color: 'bg-vivid-amber', val: 80 }
              ].map((skill) => (
                <div key={skill.label} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black dark:text-slate-400 text-slate-500 uppercase tracking-widest">
                    <span>{skill.label}</span>
                    <span className="dark:text-white text-slate-900">{skill.val}%</span>
                  </div>
                  <div className="w-full h-2 dark:bg-white/10 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${skill.color} rounded-full transition-all duration-1000 shadow-xl`} style={{ width: `${skill.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 glass-card rounded-[2.5rem] flex flex-col h-[650px] overflow-hidden border dark:border-white/10 border-slate-200 dark:bg-[#0a0f14]/80 bg-white shadow-2xl relative">
          <div className="p-8 border-b dark:border-white/5 border-slate-100 flex items-center justify-between dark:bg-white/[0.02] bg-slate-50">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-vivid-green rounded-2xl flex items-center justify-center mr-4 text-black font-black">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <div>
                <p className="font-black text-lg dark:text-white text-slate-900 tracking-tight">{t.speaking.examinerName}</p>
                <div className="flex items-center mt-1">
                  <div className={`w-2.5 h-2.5 rounded-full mr-2.5 transition-colors ${isSessionActive ? 'bg-vivid-green shadow-[0_0_8px_#0df259]' : 'bg-slate-400'}`}></div>
                  <span className="text-[10px] font-black uppercase tracking-widest dark:text-slate-500 text-slate-400">{isSessionActive ? t.speaking.activeSession : t.speaking.offline}</span>
                </div>
              </div>
            </div>
            <WaveformVisualizer isSessionActive={isSessionActive} analyser={analyser} />
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-transparent">
            {transcriptions.length === 0 && !isSessionActive && (
              <div className="flex flex-col items-center justify-center h-full text-center px-10">
                <div className="size-20 bg-vivid-green/10 rounded-full flex items-center justify-center mb-8 relative">
                  <span className="material-symbols-outlined text-4xl text-vivid-green">mic</span>
                  <div className="absolute inset-0 bg-vivid-green rounded-full animate-ping opacity-10"></div>
                </div>
                <h4 className="text-2xl font-black dark:text-white text-slate-900 mb-2 uppercase tracking-tight">{t.speaking.readyMsg}</h4>
                <p className="dark:text-slate-400 text-slate-500 text-base font-medium max-w-sm leading-relaxed">{t.speaking.readySub}</p>
              </div>
            )}
            {transcriptions.map((t, i) => (
              <div key={i} className={`flex ${t.startsWith('Examiner') ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`p-6 rounded-[2rem] max-w-[85%] shadow-md ${t.startsWith('Examiner')
                    ? 'dark:bg-white/5 bg-slate-100 dark:text-slate-200 text-slate-800 border dark:border-white/5 border-slate-200'
                    : 'bg-vivid-green text-black font-black'
                  }`}>
                  <p className="text-sm leading-relaxed">{t.replace('Examiner: ', '')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingCoach;
