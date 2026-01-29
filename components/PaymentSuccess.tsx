
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, price } = location.state || { plan: 'Pro', price: 199 };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 font-display">
      {/* Dark Overlay Background */}
      <div className="absolute inset-0 dark:bg-[#102216]/90 bg-[#f5f8f6]/90 backdrop-blur-2xl animate-in fade-in duration-700"></div>

      {/* Background Decorative Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0df259]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-80 h-80 bg-[#0df259]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg animate-in zoom-in-95 duration-500">
        {/* Central Glassmorphism Window */}
        <div className="backdrop-blur-3xl bg-[#1b271f]/80 border border-white/10 rounded-[3rem] p-10 md:p-14 flex flex-col items-center shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
          
          {/* Success Icon with Glow Pulse */}
          <div className="mb-10 relative">
            <div className="absolute inset-0 bg-[#0df259]/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-[#0df259] text-[#102216] size-24 rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(13,242,89,0.5)]">
              <span className="material-symbols-outlined text-5xl font-black">check</span>
            </div>
          </div>

          {/* Headline & Meta */}
          <div className="text-center mb-12">
            <h1 className="text-white text-4xl md:text-5xl font-black tracking-tighter mb-3 leading-tight">Payment Successful!</h1>
            <p className="text-[#0df259] font-black tracking-[0.3em] uppercase text-[10px]">Welcome to the Elite Club</p>
          </div>

          {/* Order Summary Table */}
          <div className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-8 mb-10">
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-white/50 text-[10px] font-black uppercase tracking-widest">Order ID</span>
                <span className="text-white text-sm font-black tabular-nums">#TRX-99283</span>
              </div>
              <div className="h-px bg-white/10 w-full"></div>
              <div className="flex justify-between items-center">
                <span className="text-white/50 text-[10px] font-black uppercase tracking-widest">Plan Name</span>
                <span className="text-white text-sm font-black">{plan} Premium AI</span>
              </div>
              <div className="h-px bg-white/10 w-full"></div>
              <div className="flex justify-between items-center">
                <span className="text-white/50 text-[10px] font-black uppercase tracking-widest">Amount Paid</span>
                <span className="text-[#0df259] text-2xl font-black tabular-nums">${price}.00</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col w-full gap-4">
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-[#0df259] hover:bg-[#0df259]/90 text-[#102216] font-black py-5 rounded-2xl transition-all shadow-xl shadow-[#0df259]/20 flex items-center justify-center gap-3 group uppercase text-[10px] tracking-widest active:scale-95"
            >
              <span>Go to Dashboard</span>
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <button className="w-full bg-transparent hover:bg-white/5 border border-white/20 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest">
              <span className="material-symbols-outlined text-xl">download</span>
              <span>Download Receipt</span>
            </button>
          </div>

          {/* Support Link */}
          <p className="mt-10 text-white/40 text-[10px] font-black uppercase tracking-widest">
            Need help? <a className="text-[#0df259]/80 hover:text-[#0df259] underline underline-offset-4 transition-colors" href="#">Contact Support</a>
          </p>
        </div>

        <p className="mt-12 text-center text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">
          © 2024 PrepAI Global. Professional IELTS & TOEFL Training.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
