'use client';

import { useDoc, useFirebase } from "@/firebase";
import Image from "next/image";
import { Star, Download, ShieldCheck, Cpu, HardDrive, LayoutGrid, Monitor, Zap, Share2, MessageCircle, Send, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import RelatedGames from "@/components/game/RelatedGames";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { Game, GLOBAL_CTA_LINK } from "@/lib/games";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function GameDetailClient({ initialGame }: { initialGame: Game }) {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const gameRef = useMemoFirebase(() => {
    if (!firestore || !initialGame.id) return null;
    return doc(firestore, 'games', initialGame.id);
  }, [firestore, initialGame.id]);

  const { data: realtimeGame } = useDoc(gameRef);
  const game = realtimeGame || initialGame;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out ${game.name} on Gameflashx! Instant download, no limits. 🔥`;

  const handleMainDownload = () => {
    // 400ms delay for smooth transition
    setTimeout(() => {
      window.open(GLOBAL_CTA_LINK, "_blank", "noopener,noreferrer");
    }, 400);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "You can now share this game with your friends.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
  };

  const shareOnTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <>
      {/* Banner Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <Image 
          src={game.banner || 'https://picsum.photos/seed/banner/1920/1080'} 
          alt={`${game.name} banner`} 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-4 py-1 bg-primary text-primary-foreground rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                🔥 2M+ Downloads Today
              </span>
              <span className="px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold border border-white/10 text-white uppercase tracking-widest">
                {game.category}
              </span>
              <span className="flex items-center gap-1.5 text-primary font-bold">
                <Star className="w-5 h-5 fill-current" /> {game.rating}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white font-headline leading-tight">{game.name}</h1>
            <p className="text-xl text-primary font-black uppercase tracking-tighter flex items-center gap-2">
              <Zap className="w-5 h-5 fill-current" /> ⚡ Fastest Download Available
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="h-14 px-12 bg-primary hover:bg-primary/80 text-primary-foreground font-black rounded-full neon-glow-primary text-xl gap-3"
                onClick={handleMainDownload}
              >
                <Download className="w-6 h-6" /> Download Now
              </Button>
              <div className="flex items-center gap-2">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="h-14 w-14 rounded-full border-white/10 bg-white/5 hover:bg-green-500 hover:text-white transition-all"
                  onClick={shareOnWhatsApp}
                >
                  <MessageCircle className="w-6 h-6" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="h-14 w-14 rounded-full border-white/10 bg-white/5 hover:bg-blue-500 hover:text-white transition-all"
                  onClick={shareOnTelegram}
                >
                  <Send className="w-6 h-6" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="h-14 w-14 rounded-full border-white/10 bg-white/5 hover:bg-primary hover:text-primary-foreground transition-all"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-6">
            <h2 id="description" className="text-3xl font-black text-white border-l-4 border-primary pl-6 uppercase italic">Full Description</h2>
            <div className="text-white/70 leading-relaxed text-lg whitespace-pre-line">
              {game.description}
            </div>
          </div>

          <div className="glass-morphism rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-primary/20 bg-primary/5">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white">Share with your Squad</h3>
              <p className="text-white/50">Invite your friends to download {game.name} instantly.</p>
            </div>
            <div className="flex gap-4">
               <Button onClick={shareOnWhatsApp} className="bg-[#25D366] hover:bg-[#128C7E] text-white font-black gap-2 rounded-full px-6">
                 <MessageCircle className="w-5 h-5" /> WhatsApp
               </Button>
               <Button onClick={shareOnTelegram} className="bg-[#0088cc] hover:bg-[#0077b5] text-white font-black gap-2 rounded-full px-6">
                 <Send className="w-5 h-5" /> Telegram
               </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h2 id="features" className="text-3xl font-black text-white border-l-4 border-secondary pl-6 uppercase italic">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {game.features?.map((feature: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-white/80 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-primary/20 transition-all">
                  <ShieldCheck className="text-primary w-5 h-5 flex-shrink-0" />
                  <span className="font-bold">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {game.screenshots && game.screenshots.length > 0 && (
            <div className="space-y-6">
              <h2 id="screenshots" className="text-3xl font-black text-white border-l-4 border-primary pl-6 uppercase italic">Screenshots Gallery</h2>
              <Carousel className="w-full">
                <CarouselContent>
                  {game.screenshots.map((ss: string, i: number) => (
                    <CarouselItem key={i}>
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
                        <Image src={ss} alt={`${game.name} Screenshot ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="glass-morphism rounded-2xl p-8 space-y-6 border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <Monitor className="text-primary" /> System Specs
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <LayoutGrid className="text-white/30 w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/30 uppercase font-black tracking-widest mb-1">OS</p>
                  <p className="text-sm text-white/80 font-bold">{game.systemRequirements.os}</p>
                </div>
              </div>
              <div className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <Cpu className="text-white/30 w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/30 uppercase font-black tracking-widest mb-1">Processor</p>
                  <p className="text-sm text-white/80 font-bold">{game.systemRequirements.processor}</p>
                </div>
              </div>
              <div className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <Monitor className="text-white/30 w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/30 uppercase font-black tracking-widest mb-1">Graphics</p>
                  <p className="text-sm text-white/80 font-bold">{game.systemRequirements.graphics}</p>
                </div>
              </div>
              <div className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <HardDrive className="text-white/30 w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/30 uppercase font-black tracking-widest mb-1">Storage</p>
                  <p className="text-sm text-white/80 font-bold">{game.systemRequirements.storage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedGames currentGame={game as Game} />
    </>
  );
}
