'use client';

import { useState, useEffect, useCallback } from 'react';
import { Zap, Loader2, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityEntry {
  username: string;
  type: 'start' | 'progress' | 'unlocking' | 'unlocked';
  amount?: string;
  timestamp: number;
}

/**
 * Masking logic: First character visible, rest ****
 */
const maskUsername = (name: string) => {
  if (!name) return 'U****';
  return name
    .split(/[\s_]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + '****')
    .join(' ');
};

export default function RecentActivityToast() {
  const [activeToast, setActiveToast] = useState<ActivityEntry | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sessionUsers, setSessionUsers] = useState<string[]>(['RobloxPlayer', 'Gamer_Girl', 'Legendary_User', 'System_Admin']);

  useEffect(() => {
    const handleUpdate = (e: any) => {
      const name = e.detail;
      if (name && name !== 'Guest' && !sessionUsers.includes(name)) {
        setSessionUsers(prev => [name, ...prev]);
      }
    };
    window.addEventListener('update-gameflash-user', handleUpdate);
    return () => window.removeEventListener('update-gameflash-user', handleUpdate);
  }, [sessionUsers]);

  const generateRandomToast = useCallback(() => {
    const randomUser = sessionUsers[Math.floor(Math.random() * sessionUsers.length)];
    const types: ActivityEntry['type'][] = ['start', 'progress', 'unlocking', 'unlocked'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const amounts = ['50', '100', '400', '800', '1700'];
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];

    return {
      username: randomUser,
      type: randomType,
      amount: randomType === 'unlocked' ? randomAmount : undefined,
      timestamp: Date.now(),
    };
  }, [sessionUsers]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isPaused = false;

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const triggerToast = () => {
      if (isPaused) {
        timeoutId = setTimeout(triggerToast, 2000);
        return;
      }

      const nextToast = generateRandomToast();
      setActiveToast(nextToast);
      setIsVisible(true);

      setTimeout(() => setIsVisible(false), 3500);

      const nextDelay = Math.floor(Math.random() * 2000) + 4000;
      timeoutId = setTimeout(triggerToast, nextDelay);
    };

    timeoutId = setTimeout(triggerToast, 3000);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [generateRandomToast]);

  if (!activeToast) return null;

  const getMessage = (entry: ActivityEntry) => {
    switch (entry.type) {
      case 'start': return 'started a task';
      case 'progress': return 'verification in progress';
      case 'unlocking': return 'processing request';
      case 'unlocked': return `reward unlocked: ${entry.amount} Robux`;
      default: return 'active';
    }
  };

  const getIcon = (type: ActivityEntry['type']) => {
    switch (type) {
      case 'start': return <Zap className="w-3.5 h-3.5 text-primary" />;
      case 'progress': return <Loader2 className="w-3.5 h-3.5 text-white/40 animate-spin" />;
      case 'unlocking': return <Loader2 className="w-3.5 h-3.5 text-secondary animate-spin" />;
      case 'unlocked': return <Coins className="w-3.5 h-3.5 text-[#00B06F]" />;
    }
  };

  return (
    <div 
      className={cn(
        "fixed bottom-6 right-6 z-[100] transition-all duration-300 ease-out transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      )}
      aria-live="polite"
    >
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-3 min-w-[240px] max-w-sm">
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
          {getIcon(activeToast.type)}
        </div>
        <div className="flex flex-col">
          <p className="text-[11px] leading-tight text-white font-bold">
            <span className="text-white">{maskUsername(activeToast.username)}</span>
            <span className="text-white/40 font-normal"> • {getMessage(activeToast)}</span>
          </p>
          <p className="text-[9px] font-black uppercase tracking-widest text-primary/60 mt-0.5">
            just now
          </p>
        </div>
      </div>
    </div>
  );
}
