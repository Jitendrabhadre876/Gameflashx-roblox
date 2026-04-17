
"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StickyMobileAd() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 2 seconds for better UX
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden p-2 animate-in slide-in-from-bottom duration-500">
      <div className="glass-morphism rounded-xl border-primary/20 bg-background/80 backdrop-blur-xl p-3 flex items-center gap-4 relative shadow-2xl">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-destructive text-white border-2 border-background hover:bg-destructive/80"
          onClick={() => setIsVisible(false)}
        >
          <X className="w-3 h-3" />
        </Button>
        
        <div className="w-12 h-12 rounded-lg bg-primary/20 flex-shrink-0 flex items-center justify-center border border-primary/30">
          <div className="w-6 h-6 rounded bg-primary animate-pulse" />
        </div>
        
        <div className="flex-grow">
          <p className="text-[10px] text-primary font-black uppercase tracking-widest leading-none mb-1">Sponsored</p>
          <p className="text-sm font-bold text-white line-clamp-1">Best New Games 2024</p>
          <p className="text-xs text-white/50 line-clamp-1">Download the top trending apps instantly.</p>
        </div>
        
        <Button size="sm" className="bg-primary text-primary-foreground font-black rounded-lg text-[10px] px-4 h-8 neon-glow-primary">
          OPEN
        </Button>
      </div>
    </div>
  );
}
