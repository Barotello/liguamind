
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Yearly'>('Yearly');

  const prices = {
    Basic: billingCycle === 'Monthly' ? 29 : 24,
    Pro: billingCycle === 'Monthly' ? 59 : 49,
    Elite: billingCycle === 'Monthly' ? 99 : 79
  };

  const handleSelectPlan = (plan: string) => {
    navigate('/checkout', { state: { plan, price: prices[plan as keyof typeof prices], cycle: billingCycle } });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden font-display dark:bg-[#0a0a14] bg-[#f8f8f5] transition-colors duration-700 pb-20">
      {/* Dynamic Mesh Background Style Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-purple-600/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-80 h-80 rounded-full bg-blue-600/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-64 h-64 rounded-full bg-[#f2df0d]/10 blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-10">
        {/* Simplified Header */}
        <header className="flex items-center justify-between border-b dark:border-white/10 border-slate-200 px-8 py-5 backdrop-blur-3xl dark:bg-white/[0.03] bg-white/80 rounded-2xl shadow-xl">
          <div className="flex items-center gap-4">
            <div
              onClick={() => navigate(-1)}
              className="size-10 flex items-center justify-center rounded-xl hover:bg-white/10 cursor-pointer dark:text-white text-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-8 text-[#f2df0d]">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="dark:text-white text-slate-900 text-xl font-black tracking-tight uppercase">LinguaMind Elite</h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-black dark:text-slate-400 text-slate-500 uppercase tracking-widest hidden md:inline">Logged in as Alex</span>
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
            </div>
          </div>
        </header>

        {/* Headline Section */}
        <div className="mt-20 mb-12 text-center">
          <h1 className="dark:text-white text-slate-900 tracking-tighter text-5xl md:text-7xl font-black leading-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Premium Membership Plans
          </h1>
          <p className="dark:text-white/60 text-slate-500 text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
            Elevate your score with high-end AI simulations and expert human mentorship. Choose the path to your dream university.
          </p>
        </div>

        {/* Billing Cycle Switcher */}
        <div className="flex justify-center mb-16">
          <div className="flex h-14 w-full max-w-md items-center justify-center rounded-2xl dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 p-1.5 shadow-inner">
            <button
              onClick={() => setBillingCycle('Monthly')}
              className={`flex-1 h-full flex items-center justify-center rounded-xl text-xs font-black uppercase tracking-widest transition-all ${billingCycle === 'Monthly' ? 'dark:bg-white/10 bg-white dark:text-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('Yearly')}
              className={`flex-1 h-full flex items-center justify-center rounded-xl text-xs font-black uppercase tracking-widest transition-all ${billingCycle === 'Yearly' ? 'dark:bg-white/10 bg-white dark:text-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Yearly <span className="ml-2 text-[8px] text-[#f2df0d]">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch px-4">

          {/* Basic Card */}
          <div className="flex flex-col gap-10 rounded-3xl p-10 backdrop-blur-3xl dark:bg-white/[0.02] bg-white border dark:border-white/10 border-slate-200 transition-all hover:-translate-y-2 shadow-2xl">
            <div className="flex flex-col gap-2">
              <h3 className="dark:text-white/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Entry Level</h3>
              <h1 className="dark:text-white text-slate-900 text-3xl font-black">Basic</h1>
              <p className="flex items-baseline gap-1 mt-6">
                <span className="dark:text-white text-slate-900 text-6xl font-black tracking-tighter tabular-nums">${prices.Basic}</span>
                <span className="dark:text-white/50 text-slate-400 text-sm font-bold uppercase">/mo</span>
              </p>
            </div>
            <div className="space-y-5">
              {[
                { label: '10 Full Mock Tests', active: true },
                { label: 'Daily AI Vocabulary Prep', active: true },
                { label: 'Limited AI Speaking Feedback', active: false },
                { label: 'Community Support', active: false }
              ].map((feature, i) => (
                <div key={i} className={`flex items-center gap-4 text-sm font-bold ${feature.active ? 'dark:text-white/80 text-slate-600' : 'text-slate-300 dark:text-white/20'}`}>
                  <span className={`material-symbols-outlined text-2xl ${feature.active ? 'text-[#f2df0d]' : ''}`}>
                    {feature.active ? 'check_circle' : 'block'}
                  </span>
                  {feature.label}
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSelectPlan('Basic')}
              className="mt-auto w-full flex items-center justify-center rounded-2xl h-14 border-2 dark:border-white/10 border-slate-200 dark:text-white text-slate-700 hover:bg-primary hover:text-white hover:border-primary text-xs font-black uppercase tracking-widest transition-all active:scale-95"
            >
              Select Plan
            </button>
          </div>

          {/* Pro Card (Highlighted) */}
          <div className="flex flex-col gap-10 rounded-[2.5rem] p-10 relative transition-all hover:-translate-y-2 dark:bg-[#f2df0d]/[0.05] bg-white border-4 border-[#f2df0d] shadow-[0_0_50px_rgba(242,223,13,0.15)] ring-8 ring-[#f2df0d]/5">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#f2df0d] text-black text-[10px] font-black uppercase tracking-[0.3em] px-8 py-2.5 rounded-full shadow-2xl">
              Most Popular
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[#f2df0d] text-[10px] font-black uppercase tracking-[0.3em]">Recommended</h3>
              <h1 className="dark:text-white text-slate-900 text-3xl font-black">Pro</h1>
              <p className="flex items-baseline gap-1 mt-6">
                <span className="dark:text-white text-slate-900 text-6xl font-black tracking-tighter tabular-nums">${prices.Pro}</span>
                <span className="dark:text-white/50 text-slate-400 text-sm font-bold uppercase">/mo</span>
              </p>
            </div>
            <div className="space-y-5">
              {[
                'Unlimited AI Speaking Examiner',
                'Detailed Writing Evaluation',
                'Priority AI Processing',
                'Advanced Progress Analytics'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-bold dark:text-white/90 text-slate-800">
                  <span className="material-symbols-outlined text-[#f2df0d] text-2xl">check_circle</span>
                  {feature}
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSelectPlan('Pro')}
              className="mt-auto w-full flex items-center justify-center rounded-2xl h-14 bg-[#f2df0d] text-black text-xs font-black uppercase tracking-widest shadow-xl shadow-[#f2df0d]/30 transition-all hover:brightness-110 active:scale-95"
            >
              Upgrade Now
            </button>
          </div>

          {/* Elite Card */}
          <div className="flex flex-col gap-10 rounded-3xl p-10 backdrop-blur-3xl dark:bg-white/[0.02] bg-white border dark:border-white/10 border-slate-200 transition-all hover:-translate-y-2 shadow-2xl">
            <div className="flex flex-col gap-2">
              <h3 className="dark:text-white/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">VIP Experience</h3>
              <h1 className="dark:text-white text-slate-900 text-3xl font-black">Elite</h1>
              <p className="flex items-baseline gap-1 mt-6">
                <span className="dark:text-white text-slate-900 text-6xl font-black tracking-tighter tabular-nums">${prices.Elite}</span>
                <span className="dark:text-white/50 text-slate-400 text-sm font-bold uppercase">/mo</span>
              </p>
            </div>
            <div className="space-y-5">
              {[
                'Personal Mentor Aria',
                '1-on-1 Human Review Session',
                'Custom Study Plan Design',
                'All Pro Features Included'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-bold dark:text-white/80 text-slate-600">
                  <span className="material-symbols-outlined text-[#f2df0d] text-2xl">check_circle</span>
                  {feature}
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSelectPlan('Elite')}
              className="mt-auto w-full flex items-center justify-center rounded-2xl h-14 border-2 dark:border-white/10 border-slate-200 dark:text-white text-slate-700 hover:bg-primary hover:text-white hover:border-primary text-xs font-black uppercase tracking-widest transition-all active:scale-95"
            >
              Select Plan
            </button>
          </div>
        </div>

        {/* Support & Partners */}
        <div className="mt-24 text-center border-t dark:border-white/10 border-slate-200 pt-16 pb-12">
          <p className="dark:text-white/40 text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10">Trusted by students from global institutions</p>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40 hover:opacity-100 transition-opacity duration-1000">
            {['University of Cambridge', 'British Council', 'IDP Education', 'Pearson'].map((name, i) => (
              <div key={i} className="h-10 px-6 flex items-center justify-center bg-slate-400/10 rounded-lg dark:text-white text-slate-700 font-black uppercase text-xs tracking-widest whitespace-nowrap">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
