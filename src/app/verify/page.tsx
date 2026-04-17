'use client';

import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VerifyPage() {
  const CPA_OFFER_LINK = "https://example.com/your-cpa-offer"; // Replace with your actual link

  const handleContinue = () => {
    window.location.href = CPA_OFFER_LINK;
  };

  return (
    <div className="min-h-screen bg-[#F2F4F5] flex flex-col items-center justify-center p-6 font-sans text-[#393B3D]">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 text-center space-y-8 border border-gray-100">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center relative">
            <ShieldCheck className="w-12 h-12 text-[#00B06F]" />
            <div className="absolute -top-1 -right-1 bg-white p-1 rounded-full">
              <CheckCircle2 className="w-8 h-8 text-[#00B06F] fill-current text-white bg-[#00B06F] rounded-full" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-black text-[#393B3D]">Complete Verification</h1>
          <p className="text-gray-500 font-medium leading-relaxed">
            To receive your reward and prevent automated abuse, please complete one quick verification step.
          </p>
        </div>

        <div className="bg-gray-50 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 bg-[#0074BD]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="text-[#0074BD] w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="font-black text-sm">Instant Delivery</p>
              <p className="text-xs text-gray-400 font-bold uppercase">After Verification</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-left border-t border-gray-100 pt-4">
            <div className="w-10 h-10 bg-[#00B06F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <div className="w-5 h-5 bg-[#00B06F] rounded-md flex items-center justify-center text-white font-black text-[8px] italic">R$</div>
            </div>
            <div>
              <p className="font-black text-sm">Reward Reserved</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Expires in 15:00 minutes</p>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleContinue}
          className="w-full bg-[#00B06F] hover:bg-[#008F5B] text-white font-black h-16 rounded-full text-xl shadow-xl shadow-green-500/30 transition-all hover:scale-[1.02] active:scale-95"
        >
          Continue
        </Button>

        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Trusted by 2.1M+ Gamers Worldwide
        </p>
      </div>

      <div className="mt-12 flex gap-8 text-gray-400 opacity-50 font-black text-xs uppercase tracking-[0.2em]">
        <span>Privacy</span>
        <span>Terms</span>
        <span>Contact</span>
      </div>
    </div>
  );
}
