
"use client";

import { Star, Download, Zap, TrendingUp, Flame } from "lucide-react";
import { Game, GLOBAL_CTA_LINK } from "@/lib/games";
import { Button } from "@/components/ui/button";
import CloudinaryImage from "@/components/ui/CloudinaryImage";

interface GameCardProps {
  game: Game;
  variant?: "horizontal" | "vertical" | "premium";
}

export default function GameCard({ game, variant = "vertical" }: GameCardProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // 400ms delay for premium feel
    setTimeout(() => {
      window.open(GLOBAL_CTA_LINK, "_blank", "noopener,noreferrer");
    }, 400);
  };

  const handleCardClick = () => {
    window.location.href = `/games/${game.id}`;
  };

  if (variant === "horizontal") {
    return (
      <div onClick={handleCardClick} className="group flex-shrink-0 w-[450px] flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all cursor-pointer">
        <div className="relative w-40 h-52 rounded-lg overflow-hidden flex-shrink-0 shadow-2xl">
          <CloudinaryImage src={game.image} alt={game.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
          {game.isTrending && (
             <div className="absolute top-2 left-2 px-2 py-0.5 bg-secondary text-[8px] font-black text-white rounded-full flex items-center gap-1 uppercase tracking-tighter shadow-lg">
                <TrendingUp className="w-2.5 h-2.5" /> Trending
             </div>
          )}
        </div>
        <div className="flex flex-col justify-between py-2">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{game.name}</h3>
            <div className="flex items-center gap-4 text-xs font-semibold uppercase text-white/50 tracking-widest">
              <span>{game.category}</span>
              <span className="flex items-center gap-1 text-primary"><Star className="w-3 h-3 fill-current" /> {game.rating}</span>
            </div>
          </div>
          <div className="space-y-4">
             <div className="text-sm text-white/60 line-clamp-2">{game.description}</div>
             <Button 
               onClick={handleDownload}
               className="w-fit bg-primary hover:bg-primary/80 text-primary-foreground font-bold rounded-full neon-glow-primary h-9 px-6 text-xs gap-2"
             >
               <Download className="w-4 h-4" /> Download
             </Button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "premium") {
    return (
      <div onClick={handleCardClick} className="group relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 animate-float hover:border-primary/50 transition-colors cursor-pointer">
        <CloudinaryImage src={game.banner} alt={game.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-black rounded-full tracking-widest uppercase flex items-center gap-1">
              <Star className="w-3 h-3" /> Editor's Choice
            </span>
            <span className="flex items-center gap-1 text-primary text-sm font-bold"><Star className="w-4 h-4 fill-current" /> {game.rating}</span>
          </div>
          <h3 className="text-3xl font-black text-white">{game.name}</h3>
          <Button 
            onClick={handleDownload}
            className="bg-primary hover:bg-primary/80 text-primary-foreground font-bold rounded-full neon-glow-primary px-10 h-12 gap-2"
          >
            <Download className="w-5 h-5" /> Download Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div onClick={handleCardClick} className="group block bg-card rounded-xl border border-white/5 overflow-hidden hover:border-primary/30 hover:shadow-[0_0_30px_rgba(85,206,247,0.1)] transition-all cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden">
        <CloudinaryImage src={game.image} alt={game.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {game.isTrending && (
            <div className="px-2 py-1 bg-secondary text-[8px] font-black text-white rounded-lg flex items-center gap-1 uppercase tracking-tighter shadow-xl backdrop-blur-md border border-white/10">
              <Flame className="w-2.5 h-2.5" /> Trending
            </div>
          )}
          {game.isTopDownload && (
            <div className="px-2 py-1 bg-primary text-[8px] font-black text-primary-foreground rounded-lg flex items-center gap-1 uppercase tracking-tighter shadow-xl backdrop-blur-md border border-white/10">
              <Zap className="w-2.5 h-2.5" /> Top Choice
            </div>
          )}
        </div>

        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white border border-white/10">
          {game.size}
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white truncate group-hover:text-primary transition-colors">{game.name}</h3>
          <div className="flex items-center justify-between text-xs text-white/50 font-semibold mt-1">
            <span>{game.category}</span>
            <span className="flex items-center gap-1 text-primary"><Star className="w-3 h-3 fill-current" /> {game.rating}</span>
          </div>
        </div>
        <Button 
          onClick={handleDownload}
          className="w-full bg-white/5 hover:bg-primary hover:text-primary-foreground text-white border border-white/10 font-black h-11 rounded-full group-hover:neon-glow-primary transition-all gap-2 text-xs uppercase tracking-widest"
        >
          <Download className="w-4 h-4" /> Download
        </Button>
      </div>
    </div>
  );
}
