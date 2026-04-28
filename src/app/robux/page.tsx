'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRobux } from './RobuxContext';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ROBUX_ICON = "https://res.cloudinary.com/dmafb7518/image/upload/v1775750139/GAME_FLASH_20260409_212147_0000_eu5mys.png";

const rewards = [
  { amount: 50, price: "$0.99" },
  { amount: 100, price: "$1.99" },
  { amount: 250, price: "$4.99" },
  { amount: 400, price: "$4.99" },
  { amount: 800, price: "$9.99", popular: true },
  { amount: 1700, price: "$19.99" },
  { amount: 4500, price: "$49.99" },
  { amount: 10000, price: "$99.99" },
];

export default function SelectionPage() {
  const router = useRouter();
  const { setSelectedReward } = useRobux();

  const handleSelect = (reward: any) => {
    setSelectedReward(reward);
    router.push('/robux/confirm');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Rewards Portal
        </div>
        <h1 className="text-4xl font-black tracking-tighter">Get Robux</h1>
        <p className="text-white/40 font-bold text-sm">Select your desired amount to continue</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {rewards.map((reward) => (
          <button
            key={reward.amount}
            onClick={() => handleSelect(reward)}
            className="group relative w-full h-24 glass-morphism bg-white/5 border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all rounded-[2rem] flex items-center justify-between px-8 text-left overflow-hidden active:scale-[0.98]"
          >
            {reward.popular && (
              <div className="absolute top-0 right-12 bg-primary text-primary-foreground text-[8px] font-black uppercase px-4 py-1 rounded-b-lg shadow-lg">
                Popular
              </div>
            )}
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-white/20 text-xs font-black line-through">{reward.price}</p>
                <p className="text-primary font-black text-lg">Free</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 group-hover:rotate-12 transition-transform">
                  <Image src={ROBUX_ICON} alt="Robux" fill className="object-contain" />
                </div>
                <span className="text-2xl font-black tracking-tighter">{reward.amount.toLocaleString()} Robux</span>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
              <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-primary-foreground transition-all" />
            </div>
          </button>
        ))}
      </div>
      
      <p className="text-center text-[10px] font-black text-white/20 uppercase tracking-[0.3em] pt-4">
        Verified Reward System • 2026 Edition
      </p>
    </div>
  );
}
