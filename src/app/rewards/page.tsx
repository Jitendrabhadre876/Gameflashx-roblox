'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, Sparkles, ShieldCheck, Zap, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Step = 'username' | 'selection' | 'verify';

export default function RewardsPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('username');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const LOGO_URL = "https://res.cloudinary.com/dmafb7518/image/upload/v1775750139/GAME_FLASH_20260409_212147_0000_eu5mys.png";
  const CPA_LINK = "https://example.com/your-reward-offer";

  const rewards = [
    { amount: 1700, popular: false },
    { amount: 4500, popular: true },
    { amount: 10000, popular: false },
    { amount: 50000, popular: false },
  ];

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setIsLoading(true);
    // Simulate user search
    setTimeout(() => {
      setIsLoading(false);
      setStep('selection');
    }, 2000);
  };

  const handleRewardSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsLoading(true);
    // Simulate preparing reward
    setTimeout(() => {
      setIsLoading(false);
      setStep('verify');
    }, 2000);
  };

  const handleFinalVerify = () => {
    window.location.href = CPA_LINK;
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white font-sans relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00FF00]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00FF00]/5 blur-[120px] rounded-full" />
      
      {/* Blurred Collage Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image 
          src="https://picsum.photos/seed/gaming-collage/1920/1080" 
          alt="background" 
          fill 
          className="object-cover grayscale"
        />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-24 h-24 mb-4 drop-shadow-[0_0_15px_rgba(0,255,0,0.5)]">
            <Image 
              src={LOGO_URL} 
              alt="Gameflash Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase text-center">
            Gaming <span className="text-[#00FF00]">Rewards</span> Center
          </h1>
        </div>

        {/* Step 1: Username Input */}
        {step === 'username' && (
          <Card className="glass-morphism bg-white/5 border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-[2rem]">
            <CardContent className="p-10 text-center">
              <div className="mb-6">
                <p className="text-white/60 font-bold uppercase tracking-widest text-xs mb-2">Access Portal</p>
                <h2 className="text-2xl font-black">Identify Yourself</h2>
              </div>
              
              <form onSubmit={handleUsernameSubmit} className="space-y-6">
                <div className="relative group">
                  <Input 
                    placeholder="Enter your gaming username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-16 bg-white/5 border-white/10 rounded-2xl text-center text-lg font-bold focus:border-[#00FF00]/50 transition-all placeholder:text-white/20"
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-[#00FF00]/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity" />
                </div>
                
                <Button 
                  disabled={isLoading}
                  className="w-full h-16 bg-[#00FF00] hover:bg-[#00CC00] text-[#070B14] font-black text-xl rounded-2xl shadow-[0_0_30px_rgba(0,255,0,0.3)] transition-all active:scale-95"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Searching User...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Continue</span>
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-8 flex items-center justify-center gap-4 text-white/30 text-[10px] font-black uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Secure Access</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> 100K+ Active Users</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Reward Selection */}
        {step === 'selection' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
                <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">User: {username}</span>
              </div>
              <h2 className="text-3xl font-black">Choose Your Reward</h2>
              <p className="text-white/40 font-bold text-sm mt-2">Selection based on community performance</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {rewards.map((reward) => (
                <button
                  key={reward.amount}
                  onClick={() => handleRewardSelect(reward.amount)}
                  className="group relative w-full h-24 glass-morphism bg-white/5 border-white/10 hover:border-[#00FF00]/50 hover:bg-[#00FF00]/5 transition-all rounded-3xl flex items-center justify-between px-8 text-left overflow-hidden"
                >
                  <div className="flex items-center gap-6">
                    <div className="relative w-12 h-12 flex items-center justify-center bg-[#00FF00]/10 rounded-2xl group-hover:scale-110 transition-transform">
                      <Zap className="text-[#00FF00] w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-black tracking-tighter">{reward.amount.toLocaleString()}</span>
                        {reward.popular && (
                          <span className="px-3 py-1 bg-[#00FF00] text-[#070B14] text-[8px] font-black uppercase rounded-full tracking-tighter animate-pulse">
                            Popular
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Gaming Coins</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#00FF00] group-hover:border-[#00FF00] transition-all">
                    <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-[#070B14] transition-all" />
                  </div>
                </button>
              ))}
            </div>
            
            <p className="text-center text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-8">
              Verified & Secure Selection Process
            </p>
          </div>
        )}

        {/* Step 3: Verify / Redirect */}
        {step === 'verify' && (
          <Card className="glass-morphism bg-white/5 border-white/10 overflow-hidden animate-in zoom-in-95 duration-500 rounded-[2.5rem]">
            <CardContent className="p-12 text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-[#00FF00]/10 rounded-full flex items-center justify-center relative shadow-[0_0_50px_rgba(0,255,0,0.1)]">
                  <ShieldCheck className="w-12 h-12 text-[#00FF00]" />
                  <Sparkles className="absolute -top-2 -right-2 text-[#00FF00] w-8 h-8 animate-pulse" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-black">Verification Required</h2>
                <p className="text-white/60 font-medium leading-relaxed max-w-sm mx-auto">
                  To finalize the transfer of <span className="text-[#00FF00] font-bold">{selectedAmount?.toLocaleString()} Coins</span> to <span className="text-white font-bold">{username}</span>, please complete one quick partner task.
                </p>
              </div>

              <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 space-y-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 bg-[#00FF00]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="text-[#00FF00] w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase">Reward Reserved</p>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-tighter">Transfer pending task completion</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleFinalVerify}
                className="w-full h-18 bg-[#00FF00] hover:bg-[#00CC00] text-[#070B14] font-black text-2xl rounded-2xl shadow-[0_0_40px_rgba(0,255,0,0.4)] transition-all hover:scale-[1.02] active:scale-95 py-8"
              >
                Complete Now
              </Button>

              <div className="flex items-center justify-center gap-6 text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">
                <span>100% Secure</span>
                <span className="w-1 h-1 bg-white/10 rounded-full" />
                <span>Instant Release</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Loading Modal overlay */}
      {isLoading && step !== 'username' && (
        <div className="fixed inset-0 z-[100] bg-[#070B14]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
           <div className="relative mb-8">
             <div className="w-24 h-24 border-2 border-white/5 rounded-full animate-[spin_3s_linear_infinite]" />
             <div className="absolute inset-0 flex items-center justify-center">
               <Loader2 className="w-12 h-12 text-[#00FF00] animate-spin" />
             </div>
           </div>
           <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">
             {step === 'username' ? 'Syncing User Data...' : 'Preparing Reward Package...'}
           </h3>
           <p className="text-white/40 font-bold text-xs uppercase tracking-widest">Encrypting assets for secure delivery</p>
        </div>
      )}
    </div>
  );
}
