
"use client";

import { cn } from "@/lib/utils";

interface AdSlotProps {
  label?: string;
  className?: string;
  variant?: "horizontal" | "vertical" | "square" | "sticky";
}

export default function AdSlot({ label = "Advertisement", className, variant = "horizontal" }: AdSlotProps) {
  const variants = {
    horizontal: "w-full h-32 md:h-40",
    vertical: "w-full h-[400px]",
    square: "w-full aspect-square",
    sticky: "w-full h-20",
  };

  return (
    <div className={cn(
      "glass-morphism rounded-2xl flex flex-col items-center justify-center border-dashed border-white/20 overflow-hidden relative group",
      variants[variant],
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:from-primary/10 group-hover:to-secondary/10 transition-colors" />
      <span className="relative z-10 text-white/20 font-black tracking-[0.2em] uppercase text-[10px] mb-2">{label}</span>
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <p className="text-white/40 text-sm font-bold">Your high-converting ad here</p>
        <p className="text-white/20 text-xs mt-1">Premium Inventory Slot</p>
      </div>
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary/20 animate-pulse" />
    </div>
  );
}
