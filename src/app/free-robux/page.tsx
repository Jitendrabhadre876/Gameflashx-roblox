'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Check, Loader2, Sparkles, TrendingUp, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const CUSTOM_ICON = "https://res.cloudinary.com/dmafb7518/image/upload/v1775750139/GAME_FLASH_20260409_212147_0000_eu5mys.png";
const PARTNER_URL = "https://Gameflashx.space/cl/i/grr84r";

export default function FreeRobuxPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);

  const rewards = [
    { amount: '24,000', bonus: '+1500 bonus', popular: false },
    { amount: '11,000', bonus: '+1000 bonus', popular: false },
    { amount: '5,250', bonus: '+750 bonus', popular: false },
    { amount: '2,000', bonus: '+300 bonus', popular: true },
  ];

  const handleClaim = (amount: string) => {
    setSelectedAmount(amount);
    setIsProcessing(true);
    
    // Step 1: Loading phase
    setTimeout(() => {
      setIsProcessing(false);
      setShowIframe(true);
      
      // Step 2: Auto-redirect fallback after 8 seconds if iframe is blocked/ignored
      setTimeout(() => {
        window.location.href = PARTNER_URL;
      }, 8000);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#F2F4F5] font-sans text-[#393B3D]">
      {/* Roblox-style Top Bar */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center px-6 justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="relative w-8 h-8 drop-shadow-md">
            <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain" />
          </div>
          <span className="font-black text-sm uppercase tracking-tighter">Reward Center</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <Users className="w-4 h-4 text-[#00B06F]" /> 2.1M users claimed
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto py-12 px-6">
        <div className="mb-10 text-center md:text-left animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-black mb-2 flex items-center justify-center md:justify-start gap-3">
            Get Free Rewards <Sparkles className="text-yellow-500 w-8 h-8 fill-current animate-pulse" />
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Premium Bonus Item we picked for you</p>
        </div>

        {/* Roblox Style Main Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500">
          
          {/* Left Side: Game Info */}
          <div className="w-full md:w-1/3 p-10 border-r border-gray-100 bg-gray-50/50 flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl mb-6 bg-white rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image 
                src="https://picsum.photos/seed/roblox-game/400/400" 
                alt="Plane Crazy" 
                fill 
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-black mb-1 text-center">Plane Crazy [UPDATE]</h3>
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-8">Gravity Slider 2024</p>
            
            <div className="space-y-3 w-full">
              <div className="bg-green-50 text-green-600 p-4 rounded-2xl text-[10px] font-black uppercase flex items-center gap-3 border border-green-100">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Secure Transfer Active
              </div>
              <div className="bg-orange-50 text-orange-600 p-4 rounded-2xl text-[10px] font-black uppercase flex items-center gap-3 border border-orange-100">
                <TrendingUp className="w-4 h-4" /> High Demand Peak
              </div>
            </div>
          </div>

          {/* Center: Reward Selection */}
          <div className="flex-1 p-10">
            <div className="grid grid-cols-1 gap-5">
              {rewards.map((reward) => (
                <div 
                  key={reward.amount} 
                  className="group flex items-center justify-between p-6 rounded-[1.5rem] border-2 border-gray-50 hover:border-[#00B06F] hover:bg-green-50/20 transition-all cursor-pointer shadow-sm hover:shadow-md"
                  onClick={() => handleClaim(reward.amount)}
                >
                  <div className="flex items-center gap-6">
                    <div className="relative w-12 h-12 flex-shrink-0 drop-shadow-[0_0_8px_rgba(0,176,111,0.2)]">
                      <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-black tracking-tighter">{reward.amount}</span>
                        {reward.popular && (
                          <span className="bg-[#0074BD] text-white text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-lg shadow-blue-500/20">Popular</span>
                        )}
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{reward.bonus}</span>
                    </div>
                  </div>
                  
                  <Button className="bg-[#00B06F] hover:bg-[#008F5B] text-white font-black rounded-full px-10 h-14 shadow-lg shadow-green-500/20 transition-all group-hover:scale-105 text-lg">
                    Free
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">
                  * Limited Time Reward Opportunity
                </p>
                <p className="text-xs text-gray-400 font-bold">
                  Rewards are distributed instantly after verification.
                </p>
              </div>
              <div className="flex items-center gap-3 text-[#00B06F] font-black text-sm bg-green-50 px-6 py-2 rounded-full border border-green-100">
                <Users className="w-5 h-5" /> 254 rewards left
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Step 1: Processing Modal */}
      <Dialog open={isProcessing} onOpenChange={setIsProcessing}>
        <DialogContent className="sm:max-w-md bg-white border-none rounded-[2.5rem] p-12 text-center outline-none">
          <DialogHeader>
            <DialogTitle className="hidden">Processing</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-8">
            <div className="relative">
              <Loader2 className="w-24 h-24 text-[#00B06F] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative w-full h-full">
                  <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-[#393B3D]">Connecting...</h2>
              <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">Encrypting {selectedAmount} reward for transfer</p>
            </div>
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mt-4">
              <div className="bg-[#00B06F] h-full animate-[progress_2.5s_ease-in-out]" style={{ width: '100%' }} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 2: Iframe Partner Modal */}
      <Dialog open={showIframe} onOpenChange={setShowIframe}>
        <DialogContent className="sm:max-w-2xl bg-white border-none rounded-[2.5rem] p-0 overflow-hidden shadow-2xl outline-none">
          <DialogHeader className="p-8 bg-gray-50 border-b border-gray-100 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-4">
              <div className="relative w-8 h-8">
                <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain" />
              </div>
              <div>
                <DialogTitle className="text-xl font-black text-[#393B3D]">Unlock Your Reward</DialogTitle>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Complete a partner task to finalize</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowIframe(false)} className="rounded-full hover:bg-gray-200">
              <X className="w-5 h-5" />
            </Button>
          </DialogHeader>
          
          <div className="relative bg-white min-h-[500px] flex flex-col">
            {/* The Iframe */}
            <iframe 
              src={PARTNER_URL} 
              className="w-full h-[500px] border-none"
              title="Partner Offer"
            />
            
            {/* Mobile-Friendly Fallback Action */}
            <div className="p-8 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500 font-bold mb-4 uppercase tracking-widest">Not loading correctly?</p>
              <Button 
                onClick={() => window.location.href = PARTNER_URL}
                className="w-full bg-[#00B06F] hover:bg-[#008F5B] text-white font-black h-16 rounded-2xl text-xl shadow-xl shadow-green-500/20"
              >
                Continue to Verify
              </Button>
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
