'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Loader2, Users, X, CheckCircle2, AlertCircle, Search as SearchIcon, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { GLOBAL_CTA_LINK } from '@/lib/games';

const CUSTOM_ICON = "https://res.cloudinary.com/dmafb7518/image/upload/v1775750139/GAME_FLASH_20260409_212147_0000_eu5mys.png";
const PROFILE_IMG = "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1776447812/3acdf58d1dad75bdc82275056dceeb8a_iq5yni.jpg";
const BANNER_IMG = "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1776447812/0100f6638632dfbf4fb70b4f8be239f6_xveqxc.jpg";
const PARTNER_URL = GLOBAL_CTA_LINK;

const DEMO_MESSAGES = [
  "Demo: Reward unlocked: 50 Robux",
  "Demo: Reward unlocked: 100 Robux",
  "Demo: Task completed successfully",
  "Demo: Verification step finished",
  "Demo: New reward package prepared",
];

export default function FreeRobuxPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  
  // User State
  const [username, setUsername] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');
  const [error, setError] = useState('');

  // Social Proof State
  const [showActivity, setShowActivity] = useState(false);
  const [activityIndex, setActivityIndex] = useState(0);

  // Social Proof Logic
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const showNext = () => {
      if (document.visibilityState !== 'visible') {
        timeoutId = setTimeout(showNext, 5000);
        return;
      }

      setActivityIndex(Math.floor(Math.random() * DEMO_MESSAGES.length));
      setShowActivity(true);
      
      // Auto-dismiss after 4 seconds
      setTimeout(() => {
        setShowActivity(false);
        // Random interval for next appearance (6-10s)
        const nextInterval = Math.floor(Math.random() * (10000 - 6000 + 1) + 6000);
        timeoutId = setTimeout(showNext, nextInterval);
      }, 4000);
    };

    const initialDelay = Math.floor(Math.random() * 5000 + 3000);
    timeoutId = setTimeout(showNext, initialDelay);

    return () => clearTimeout(timeoutId);
  }, []);

  // Persist Username on Load
  useEffect(() => {
    const savedName = localStorage.getItem('gameflash_user');
    if (savedName) {
      setIsVerified(true);
      setUsername(savedName);
    }
  }, []);

  const handleVerify = () => {
    if (!username.trim()) {
      setError('Please enter a valid username');
      return;
    }
    setError('');
    setIsVerifying(true);
    setVerificationStatus('Finding user...');
    
    // Realistic Simulation
    setTimeout(() => setVerificationStatus('Connecting to server...'), 1500);

    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      localStorage.setItem('gameflash_user', username);
      // Trigger navbar update via window event
      window.dispatchEvent(new Event('storage'));
    }, 3000);
  };

  const handleClaim = (amount: string) => {
    if (!isVerified) {
      setError('Please search and verify your account first');
      return;
    }
    setSelectedAmount(amount);
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowIframe(true);
      // Fallback redirect after 8 seconds if iframe is blocked
      setTimeout(() => {
        if (showIframe) window.location.href = PARTNER_URL;
      }, 8000);
    }, 2500);
  };

  const rewards = [
    { amount: '800', bonus: '+40 bonus', popular: true },
    { amount: '500', bonus: '+25 bonus', popular: false },
    { amount: '250', bonus: '+10 bonus', popular: false },
    { amount: '100', bonus: '+5 bonus', popular: false },
    { amount: '50', bonus: '+2 bonus', popular: false },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#111] selection:bg-[#00B06F]/20 overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow relative max-w-2xl mx-auto pt-28 pb-12 px-4 md:px-6 space-y-6 z-10 w-full">
        
        {/* Profile + Banner Section */}
        <div className="bg-[#F8F9FB] p-4 rounded-3xl border border-gray-100 flex items-center gap-4 shadow-sm animate-in fade-in duration-700">
          <div className="relative w-[70px] h-[70px] rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
            <Image src={PROFILE_IMG} alt="Profile" fill className="object-cover" />
          </div>
          <div className="relative flex-1 h-[70px] rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-inner">
             <Image src={BANNER_IMG} alt="Banner" fill className="object-cover brightness-95" />
          </div>
        </div>

        {/* Username Input Card */}
        <div className="bg-[#F8F9FB] p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-5 animate-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">Identify Account</label>
              {isVerified && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00B06F]/10 border border-[#00B06F]/20 text-[#00B06F] text-[9px] font-black uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Username Found Successfully ✅
                </div>
              )}
            </div>
            <div className="relative group">
              <Input 
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isVerified || isVerifying}
                className="bg-white border-gray-200 text-[#111] h-14 rounded-2xl text-lg font-bold placeholder:text-gray-300 focus:ring-2 focus:ring-[#00B06F]/20 transition-all shadow-inner px-6"
              />
              {isVerified && <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[#00B06F] font-black text-xs">Verified ✔</div>}
            </div>
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
              className="w-full bg-gradient-to-r from-[#00B06F] to-[#008F5B] hover:brightness-105 text-white font-black h-14 rounded-2xl text-lg shadow-xl shadow-[#00B06F]/10 gap-3 transition-all active:scale-95"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {verificationStatus}
                </>
              ) : (
                <>
                  <SearchIcon className="w-5 h-5" />
                  Search
                </>
              )}
            </Button>
          ) : (
            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/50 py-2 rounded-full border border-gray-100">
              Identity Confirmed. Reward access granted.
            </p>
          )}
        </div>

        {/* Rewards Section */}
        <div className={cn(
          "space-y-4 transition-all duration-700",
          !isVerified ? "opacity-30 pointer-events-none grayscale" : "opacity-100"
        )}>
          {rewards.map((reward) => (
            <div 
              key={reward.amount} 
              className="group relative flex items-center justify-between p-5 md:p-6 rounded-[2rem] bg-[#F8F9FB] border border-gray-100 hover:bg-white hover:border-[#00B06F]/40 transition-all shadow-sm overflow-hidden cursor-pointer"
              onClick={() => handleClaim(reward.amount)}
            >
              <div className="flex items-center gap-5 shrink min-w-0">
                <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 drop-shadow-md group-hover:rotate-12 transition-transform">
                  <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl md:text-3xl font-black tracking-tight text-[#111]">{reward.amount}</span>
                    {reward.popular && (
                      <span className="bg-[#00B06F] text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-md">Popular</span>
                    )}
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{reward.bonus}</span>
                </div>
              </div>
              
              <Button className="shrink-0 bg-[#00B06F] hover:bg-[#008F5B] text-white font-black rounded-full h-11 md:h-12 px-8 shadow-lg shadow-[#00B06F]/20 transition-all active:scale-95 text-sm flex-shrink-0">
                Free
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center space-y-2 pt-6">
          <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.3em]">
            Complete a partner task to unlock rewards
          </p>
          <div className="flex items-center justify-center gap-6 text-gray-300">
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase"><Users className="w-3 h-3" /> 2.1M claimed</div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase"><ShieldCheck className="w-3 h-3" /> Secure Sync</div>
          </div>
        </div>
      </main>

      {/* Social Proof Toast */}
      {showActivity && (
        <div className="fixed bottom-6 right-6 z-[60] animate-in slide-in-from-right-10 fade-in duration-500 pointer-events-none">
          <div className="bg-[#111]/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-[300px]">
            <div className="relative w-8 h-8 shrink-0 bg-white/10 rounded-lg p-1">
              <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain" />
            </div>
            <div>
              <p className="text-white text-[11px] font-medium leading-tight">
                <span className="text-gray-400">Demo:</span> 
                <span className="ml-1">{DEMO_MESSAGES[activityIndex].split(':')[1].trim()}</span>
              </p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00B06F] animate-pulse" />
                <span className="text-[9px] font-bold text-[#00B06F] uppercase tracking-tighter">Verified Activity</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Processing State Modal */}
      <Dialog open={isProcessing} onOpenChange={setIsProcessing}>
        <DialogContent className="sm:max-w-md bg-white border-none rounded-[2.5rem] p-10 text-center shadow-2xl outline-none">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <Loader2 className="w-20 h-20 text-[#00B06F] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                 <div className="relative w-full h-full animate-pulse">
                   <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain" />
                 </div>
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-[#111] tracking-tighter">Preparing Reward...</h2>
              <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">Encrypting assets for {selectedAmount}</p>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-[#00B06F] h-full animate-progress" />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Verification Iframe Modal */}
      <Dialog open={showIframe} onOpenChange={setShowIframe}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl bg-white border-none rounded-[2.5rem] p-0 overflow-hidden shadow-2xl outline-none">
          <DialogHeader className="p-6 md:p-8 bg-gray-50 border-b border-gray-100 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-4">
              <div className="relative w-9 h-9">
                <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain" />
              </div>
              <div>
                <DialogTitle className="text-xl md:text-2xl font-black text-[#111] tracking-tighter">Final Step</DialogTitle>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Verification for {username}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowIframe(false)} className="rounded-full hover:bg-gray-100 text-gray-400">
              <X className="w-6 h-6" />
            </Button>
          </DialogHeader>
          
          <div className="relative bg-gray-50 h-[65vh] flex flex-col">
            <div className="p-6 md:p-8 bg-white border-b border-gray-100 text-center">
              <p className="text-sm md:text-base font-medium text-gray-600 leading-relaxed px-4">
                ✨ Complete <span className="text-[#00B06F] font-bold underline">ONE</span> quick offers now — simply answer a few questions or try an app for 5 minutes — and your reward will be delivered automatically.
              </p>
            </div>

            <iframe 
              src={PARTNER_URL} 
              className="w-full flex-grow border-none"
              title="Verification Center"
            />
            
            <div className="p-6 md:p-8 bg-white border-t border-gray-100 text-center">
              <Button 
                onClick={() => window.open(GLOBAL_CTA_LINK, "_blank", "noopener,noreferrer")}
                className="w-full bg-[#00B06F] hover:bg-[#008F5B] text-white font-black h-16 rounded-2xl text-xl shadow-xl shadow-[#00B06F]/20 active:scale-95 transition-all"
              >
                Continue to Verify
              </Button>
              <p className="text-[8px] text-gray-300 font-black uppercase tracking-[0.4em] mt-6">Secure Partner Distribution Network</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
