
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentMethod: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, price, cycle } = location.state || { plan: 'Pro', price: 49, cycle: 'Yearly' };
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/payment-success', { state: { plan, price } });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 font-display">
      {/* Dark Overlay Background */}
      <div className="absolute inset-0 dark:bg-background-dark/80 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-500"></div>
      
      {/* Payment Window (Modal) */}
      <div className="relative w-full max-w-4xl glass dark:bg-[#0c141d]/90 bg-white/95 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border dark:border-white/10 border-slate-200 flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* Left Side: Payment Form */}
        <div className="flex-1 p-8 md:p-14 space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black dark:text-white text-slate-900 tracking-tight">Payment Method</h2>
            <div className="flex gap-3">
              <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-[8px]">VISA</div>
              <div className="size-8 bg-amber-500 rounded-lg flex items-center justify-center text-white font-black text-[8px]">MC</div>
            </div>
          </div>

          <form onSubmit={handlePay} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-widest ml-1">Cardholder Name</label>
              <input 
                required
                className="w-full dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 rounded-2xl px-6 py-4 dark:text-white text-slate-900 font-bold focus:ring-2 ring-[#f2df0d]/30 outline-none transition-all placeholder:text-slate-400/50" 
                placeholder="JOHN DOE"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-widest ml-1">Card Number</label>
              <div className="relative">
                <input 
                  required
                  maxLength={19}
                  className="w-full dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 rounded-2xl px-6 py-4 dark:text-white text-slate-900 font-bold focus:ring-2 ring-[#f2df0d]/30 outline-none transition-all placeholder:text-slate-400/50 tracking-widest" 
                  placeholder="0000 0000 0000 0000"
                />
                <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-400">credit_card</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-widest ml-1">Expiry</label>
                <input 
                  required
                  placeholder="MM/YY"
                  className="w-full dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 rounded-2xl px-6 py-4 dark:text-white text-slate-900 font-bold focus:ring-2 ring-[#f2df0d]/30 outline-none transition-all placeholder:text-slate-400/50" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-widest ml-1">CVV</label>
                <input 
                  required
                  placeholder="•••"
                  className="w-full dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 rounded-2xl px-6 py-4 dark:text-white text-slate-900 font-bold focus:ring-2 ring-[#f2df0d]/30 outline-none transition-all placeholder:text-slate-400/50" 
                />
              </div>
            </div>

            <div className="pt-6">
              <button 
                disabled={isProcessing}
                className="w-full bg-[#f2df0d] hover:bg-[#f2df0d]/90 text-black font-black py-5 rounded-2xl shadow-2xl shadow-[#f2df0d]/20 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em]"
              >
                {isProcessing ? (
                  <>
                    <div className="size-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">lock</span>
                    <span>Pay ${price}.00 Now</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <button 
            onClick={() => navigate(-1)}
            className="w-full text-[10px] font-black text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors uppercase tracking-widest"
          >
            Cancel and Go Back
          </button>
        </div>

        {/* Right Side: Summary Sidebar */}
        <div className="w-full md:w-[320px] dark:bg-white/[0.03] bg-slate-50 p-8 md:p-14 border-l dark:border-white/5 border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black dark:text-white text-slate-900 mb-8 tracking-tight">Summary</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold dark:text-slate-400 text-slate-500 uppercase tracking-widest">{plan} Plan</p>
                <p className="text-sm font-black dark:text-white text-slate-900 tabular-nums">${price}.00</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold dark:text-slate-400 text-slate-500 uppercase tracking-widest">Billing</p>
                <p className="text-sm font-black dark:text-white text-slate-900 italic lowercase">{cycle}</p>
              </div>
              <div className="h-px dark:bg-white/10 bg-slate-200 w-full"></div>
              <div className="flex justify-between items-center pt-2">
                <p className="text-xs font-black dark:text-white text-slate-900 uppercase tracking-widest">Total</p>
                <p className="text-2xl font-black text-[#f2df0d] tabular-nums">${price}.00</p>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-4">
             <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-500 text-sm">shield</span>
                <p className="text-[10px] dark:text-slate-500 text-slate-400 font-medium leading-relaxed">Secure SSL encrypted payment processing.</p>
             </div>
             <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-500 text-sm">verified</span>
                <p className="text-[10px] dark:text-slate-500 text-slate-400 font-medium leading-relaxed">Money back guarantee within 7 days.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
