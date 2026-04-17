
'use client';

import { useDoc, useFirebase } from "@/firebase";
import Image from "next/image";
import Link from "next/link";
import { Star, Download, ShieldCheck, Cpu, HardDrive, LayoutGrid, Monitor, Layers, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import RelatedGames from "@/components/game/RelatedGames";
import AdSlot from "@/components/ads/AdSlot";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { Game } from "@/lib/games";

export default function GameDetailClient({ initialGame }: { initialGame: Game }) {
  const { firestore } = useFirebase();
  
  const gameRef = useMemoFirebase(() => {
    if (!firestore || !initialGame.id) return null;
    return doc(firestore, 'games', initialGame.id);
  }, [firestore, initialGame.id]);

  const { data: realtimeGame } = useDoc(gameRef);
  const game = realtimeGame || initialGame;

  const downloadUrl = `/games/${game.id}/download`;

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
            <div className="flex items-center gap-4">
              <span className="px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold border border-white/10 text-white uppercase tracking-widest">
                {game.category}
              </span>
              <span className="flex items-center gap-1.5 text-primary font-bold">
                <Star className="w-5 h-5 fill-current" /> {game.rating}
              </span>
              <span className="text-white/50 text-sm font-medium">{(game.downloads || 0).toLocaleString()} Downloads</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white font-headline">{game.name}</h1>
            <div className="flex flex-wrap gap-4">
              <Link href={downloadUrl}>
                <Button 
                  size="lg" 
                  className="h-14 px-12 bg-primary hover:bg-primary/80 text-primary-foreground font-black rounded-full neon-glow-primary text-xl gap-3"
                >
                  <Download className="w-6 h-6" /> Download Now
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="h-14 px-8 border-secondary text-secondary hover:bg-secondary/10 font-black rounded-full text-lg gap-3"
              >
                <Zap className="w-5 h-5" /> Fast Download (No Ads)
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-6">
            <h2 id="description" className="text-3xl font-black text-white border-l-4 border-primary pl-6">Full Description</h2>
            <div className="text-white/70 leading-relaxed text-lg whitespace-pre-line">
              {game.description}
            </div>
          </div>

          <div className="space-y-6">
            <h2 id="features" className="text-3xl font-black text-white border-l-4 border-secondary pl-6">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {game.features?.map((feature: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-white/80 bg-white/5 p-4 rounded-xl border border-white/5">
                  <ShieldCheck className="text-primary w-5 h-5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {game.screenshots && game.screenshots.length > 0 && (
            <div className="space-y-6">
              <h2 id="screenshots" className="text-3xl font-black text-white border-l-4 border-primary pl-6">Screenshots Gallery</h2>
              <Carousel className="w-full">
                <CarouselContent>
                  {game.screenshots.map((ss: string, i: number) => (
                    <CarouselItem key={i}>
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                        <Image src={ss} alt={`${game.name} Screenshot ${i + 1}`} fill className="object-cover" loading="lazy" />
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
          <div className="glass-morphism rounded-2xl p-8 space-y-6">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <Monitor className="text-primary" /> System Requirements
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <LayoutGrid className="text-white/30 w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/30 uppercase font-black tracking-widest mb-1">OS</p>
                  <p className="text-sm text-white/80">{game.systemRequirements.os}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Cpu className="text-white/30 w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/30 uppercase font-black tracking-widest mb-1">Processor</p>
                  <p className="text-sm text-white/80">{game.systemRequirements.processor}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Monitor className="text-white/30 w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/30 uppercase font-black tracking-widest mb-1">Graphics</p>
                  <p className="text-sm text-white/80">{game.systemRequirements.graphics}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <HardDrive className="text-white/30 w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/30 uppercase font-black tracking-widest mb-1">Storage</p>
                  <p className="text-sm text-white/80">{game.systemRequirements.storage}</p>
                </div>
              </div>
            </div>
          </div>
          
          <AdSlot variant="vertical" label="Trending Games" />
        </div>
      </div>

      <RelatedGames currentGame={game as Game} />
    </>
  );
}
