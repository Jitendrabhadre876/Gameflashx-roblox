'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRobux } from '../RobuxContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { User, ShieldCheck, ChevronLeft } from 'lucide-react';

const ROBUX_ICON = "https://res.cloudinary.com/dmafb7518/image/upload/v1775750139/GAME_FLASH_20260409_212147_0000_eu5mys.png";

export default function ConfirmPage() {
  const router = useRouter();
  const { selectedReward, setUsername } = useRobux();
  const [inputValue, setInputValue] = useState('');

  // Redirect if no reward selected
  useEffect(() => {
    if (!selectedReward) router.push('/robux');
  }, [selectedReward, router]);

  if (!selectedReward) return null;

  const handleContinue = () => {
    if (inputValue.length < 3) return;
    setUsername(inputValue);
    router.push('/robux/process');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => router.push('/robux')}
          className="flex items-center gap-1 text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex gap-2">
           <div className="w-8 h-1 bg-primary rounded-full" />
           <div className="w-8 h-1 bg-white/10 rounded-full" />
           <div className="w-8 h-1 bg-white/10 rounded-full" />
        </div>
      </div>

      <header className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tighter">Confirm Selection</h1>
        <p className="text-white/40 font-bold text-sm">Identify your account to continue</p>
      </header>

      <Card className="glass-morphism bg-white/5 border-white/10 rounded-[2.5rem] overflow-hidden">
        <CardContent className="p-8 space-y-8">
          <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
             <div className="flex items-center gap-4">
                <div className="relative w-12 h-12">
                   <Image src={ROBUX_ICON} alt="Robux" fill className="object-contain" />
                </div>
                <div>
                   <p className="text-xl font-black">{selectedReward.amount.toLocaleString()} Robux</p>
                   <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Order Summary</p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-xs text-white/20 line-through font-bold">{selectedReward.price}</p>
                <p className="text-primary font-black">Free</p>
             </div>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                 <User className="w-5 h-5" />
              </div>
              <Input 
                placeholder="Your Username"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="h-16 bg-white/5 border-white/10 rounded-2xl pl-16 text-lg font-bold focus:border-primary/50 transition-all placeholder:text-white/10"
              />
            </div>
            <p className="text-[9px] text-white/20 text-center font-bold uppercase tracking-widest">Min. 3 characters required</p>
          </div>

          <Button 
            onClick={handleContinue}
            disabled={inputValue.length < 3}
            className="w-full h-16 bg-primary hover:bg-primary/80 text-primary-foreground font-black text-xl rounded-2xl shadow-xl shadow-primary/10 active:scale-95 transition-all"
          >
            CONTINUE
          </Button>

          <div className="flex items-center justify-center gap-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Encrypted</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Secure</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
