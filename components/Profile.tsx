
import React, { useContext, useState } from 'react';
import { LanguageContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [selectedVoice, setSelectedVoice] = useState('UK');
  const [notifications, setNotifications] = useState({
    reports: true,
    reminders: true,
    marketing: false
  });

  return (
    <div className="max-w-7xl mx-auto p-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Page Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight dark:text-white text-slate-900 mb-2">Account Settings</h1>
          <p className="dark:text-slate-400 text-slate-500 font-medium">Manage your personal information and AI learning implementation.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/study-plan')}
            className="bg-white/5 dark:bg-primary/10 border border-primary/30 text-primary px-6 py-3 rounded-xl font-black transition-all hover:bg-primary hover:text-white flex items-center gap-2 active:scale-95 uppercase text-[10px] tracking-widest"
          >
            <span className="material-symbols-outlined text-sm font-black">calendar_month</span>
            Study Plan
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT COLUMN: Identity & Membership (Sticky-like) */}
        <aside className="lg:col-span-4 space-y-6">

          {/* Identity Card */}
          <div className="glass-card p-8 rounded-3xl border dark:border-white/5 border-slate-200 dark:bg-[#121418] bg-white shadow-xl flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 w-full h-32 bg-primary/10"></div>

            <div className="relative mb-4 mt-6 group">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-[#121418] shadow-2xl p-1 bg-white dark:bg-[#121418]">
                <div
                  className="w-full h-full rounded-full bg-cover bg-center"
                  style={{ backgroundImage: "url('https://api.dicebear.com/7.x/initials/svg?seed=AS&backgroundColor=0d7ff2')" }}
                ></div>
              </div>
              <button className="absolute bottom-0 right-0 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-[#121418] hover:scale-110 transition-transform shadow-lg">
                <span className="material-symbols-outlined text-sm font-black">edit</span>
              </button>
            </div>

            <h2 className="text-2xl font-black dark:text-white text-slate-900 mb-1">Alexander Sterling</h2>
            <p className="text-sm dark:text-slate-400 text-slate-500 font-medium mb-6">alexander.s@example.com</p>

            <div className="w-full grid grid-cols-2 gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border dark:border-white/5 border-slate-100">
                <h3 className="text-2xl font-black text-primary">12</h3>
                <p className="text-[10px] uppercase font-black tracking-widest dark:text-slate-500 text-slate-400">Day Streak</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border dark:border-white/5 border-slate-100">
                <h3 className="text-2xl font-black text-emerald-500">8.5</h3>
                <p className="text-[10px] uppercase font-black tracking-widest dark:text-slate-500 text-slate-400">Band Score</p>
              </div>
            </div>
          </div>

          {/* Compact Membership Card */}
          <div className="glass-card p-6 rounded-3xl border border-primary/20 bg-primary/5 shadow-2xl relative overflow-hidden group hover:border-primary/40 transition-colors cursor-pointer" onClick={() => navigate('/pricing')}>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">workspace_premium</span>
              </div>
              <span className="bg-primary text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Active</span>
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest dark:text-slate-400 text-slate-500 mb-1">Current Plan</p>
              <h3 className="text-xl font-black dark:text-white text-slate-900">IELTS Master</h3>
              <p className="text-xs dark:text-slate-400 text-slate-500 mt-2">Renews Feb 12th, 2024</p>
            </div>
            {/* Decorative */}
            <div className="absolute -right-6 -bottom-6 size-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
          </div>

        </aside>

        {/* RIGHT COLUMN: Settings Forms */}
        <div className="lg:col-span-8 space-y-8">

          {/* Personal Information */}
          <section className="bg-white dark:bg-[#121418] rounded-3xl border dark:border-white/5 border-slate-200 p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-primary text-2xl">person_edit</span>
              <h2 className="text-lg font-black uppercase tracking-widest dark:text-white text-slate-900">Personal Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black dark:text-slate-500 text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  className="w-full dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-900 font-bold focus:ring-2 ring-primary/30 outline-none transition-all"
                  type="text"
                  defaultValue="Alexander Sterling"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black dark:text-slate-500 text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  className="w-full dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-900 font-bold focus:ring-2 ring-primary/30 outline-none transition-all"
                  type="email"
                  defaultValue="alexander.s@example.com"
                />
              </div>
            </div>
          </section>

          {/* AI Voice Preference - Horizontal List */}
          <section className="bg-white dark:bg-[#121418] rounded-3xl border dark:border-white/5 border-slate-200 p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-primary text-2xl">spatial_audio_off</span>
              <h2 className="text-lg font-black uppercase tracking-widest dark:text-white text-slate-900">Speaking Coach Voice</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'UK', name: 'Professor Arthur', accent: 'UK Accent', tone: 'Academic & Formal', icon: 'school', active: selectedVoice === 'UK' },
                { id: 'US', name: 'Coach Sarah', accent: 'US Accent', tone: 'Energetic', icon: 'campaign', active: selectedVoice === 'US' },
                { id: 'AU', name: 'Dr. Oliver', accent: 'AU Accent', tone: 'Balanced & Clear', icon: 'spatial_audio_off', active: selectedVoice === 'AU' }
              ].map((voice) => (
                <div
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice.id)}
                  className={`flex items-center p-4 rounded-2xl border transition-all cursor-pointer ${voice.active
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-100 dark:border-white/5 hover:border-primary/30'
                    }`}
                >
                  <div className={`size-12 rounded-xl flex items-center justify-center mr-4 shrink-0 transition-all ${voice.active ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                    <span className="material-symbols-outlined">{voice.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-black dark:text-white text-slate-900">{voice.name}</h4>
                      {voice.active && <span className="material-symbols-outlined text-primary">check_circle</span>}
                    </div>
                    <p className="text-xs dark:text-slate-400 text-slate-500 font-medium">{voice.accent} • {voice.tone}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white dark:bg-[#121418] rounded-3xl border dark:border-white/5 border-slate-200 p-8 shadow-xl overflow-hidden">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-primary text-2xl">notifications</span>
              <h2 className="text-lg font-black uppercase tracking-widest dark:text-white text-slate-900">Notifications</h2>
            </div>
            <div className="divide-y dark:divide-white/5 divide-slate-100">
              {[
                { id: 'reports', title: 'Weekly Progress Reports', desc: 'Get a summary of your band scores.', state: notifications.reports },
                { id: 'reminders', title: 'Daily Study Reminders', desc: 'Push notifications for practice time.', state: notifications.reminders },
                { id: 'marketing', title: 'Tips & Updates', desc: 'New features and exam tips.', state: notifications.marketing }
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between py-6 first:pt-0 last:pb-0">
                  <div>
                    <h4 className="font-bold dark:text-white text-slate-900">{item.title}</h4>
                    <p className="text-xs dark:text-slate-400 text-slate-500 mt-1">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.state}
                      onChange={() => setNotifications(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof prev] }))}
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button className="px-6 py-3 rounded-xl border dark:border-white/10 border-slate-200 font-bold text-xs uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all flex items-center gap-2 justify-center">
              <span className="material-symbols-outlined text-lg">delete</span>
              Delete Account
            </button>
            <button className="px-8 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center gap-2 justify-center">
              <span className="material-symbols-outlined text-lg">save</span>
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
