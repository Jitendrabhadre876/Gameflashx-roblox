'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRobux } from '../RobuxContext';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Zap, Terminal } from 'lucide-react';

export default function ProcessPage() {
  const router = useRouter();
  const { selectedReward, username } = useRobux();
  const [status, setStatus] = useState('Connecting...');
  const [code, setCode] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!selectedReward || !username) router.push('/robux');
  }, [selectedReward, username, router]);

  useEffect(() => {
    const statuses = ['Connecting...', 'Processing...', 'Generating Pack...', 'Finalizing...'];
    let currentIdx = 0;

    const statusInterval = setInterval(() => {
      currentIdx++;
      if (currentIdx < statuses.length) {
        setStatus(statuses[currentIdx]);
      }
    }, 1500);

    const charPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const generateCode = () => {
      let segments = [];
      for (let i = 0; i < 3; i++) {
        let seg = '';
        for (let j = 0; j < 4; j++) {
          seg += charPool.charAt(Math.floor(Math.random() * charPool.length));
        }
        segments.push(seg);
      }
      return segments.join('-');
    };

    const codeInterval = setInterval(() => {
      const fullCode = generateCode();
      const maskedCode = fullCode.substring(0, fullCode.length - 2) + '**';
      setCode(maskedCode);
      setProgress(prev => Math.min(prev + 2, 100));
    }, 100);

    const redirectTimeout = setTimeout(() => {
      router.push('/robux/final');
    }, 6000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(codeInterval);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  if (!selectedReward) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
           <Zap className="w-3.5 h-3.5 fill-current" /> Active Session
        </div>
        <div className="flex gap-2">
           <div className="w-8 h-1 bg-primary rounded-full" />
           <div className="w-8 h-1 bg-primary rounded-full" />
           <div className="w-8 h-1 bg-white/10 rounded-full" />
        </div>
      </div>

      <header className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tighter">Processing</h1>
        <p className="text-white/40 font-bold text-sm">Preparing reward for {username}</p>
      </header>

      <Card className="glass-morphism bg-white/5 border-white/10 rounded-[2.5rem] overflow-hidden">
        <CardContent className="p-10 space-y-8 text-center">
          <div className="relative inline-flex mb-2">
            <Loader2 className="w-24 h-24 text-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
               <Terminal className="w-8 h-8 text-primary/50" />
            </div>
          </div>

          <div className="space-y-1">
             <h2 className="text-2xl font-black tracking-tighter text-primary">{status}</h2>
             <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Encrypted Handshake</p>
          </div>

          <div className="p-6 bg-black/40 rounded-2xl border border-white/5 font-mono text-xl tracking-[0.2em] text-white/80 shadow-inner">
             {code}
          </div>

          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
             <div 
               className="h-full bg-primary transition-all duration-300 shadow-[0_0_10px_rgba(85,206,247,0.5)]" 
               style={{ width: `${progress}%` }} 
             />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Target</p>
                <p className="text-xs font-bold truncate">{username}</p>
             </div>
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Payload</p>
                <p className="text-xs font-bold">{selectedReward.amount} R$</p>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
