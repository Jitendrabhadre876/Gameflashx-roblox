
'use client';

import { useDoc, useFirebase } from "@/firebase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Star, Download, ShieldCheck, Cpu, HardDrive, LayoutGrid, Monitor, Layers } from "lucide-react";
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
import { doc, increment } from "firebase/firestore";
import { updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";
import React from 'react';

export default function GamePage() {
  const { id } = useParams() as { id: string };
  const { firestore } = useFirebase();
  const { toast } = useToast();
  
  const gameRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'games', id);
  }, [firestore, id]);

  const { data: game, isLoading } = useDoc(gameRef);

  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center text-primary">Loading Game Data...</div>;
  if (!game) return notFound();

  const handleDownload = () => {
    if (!firestore || !id) return;
    
    // Increment download count
    const ref = doc(firestore, 'games', id);
    updateDocumentNonBlocking(ref, { downloads: increment(1) });
    
    toast({
      title: "Download Started",
      description: `Preparing ${game.name} for installation...`,
    });
    
    // In a real app, window.location.href = game.downloadLink;
    console.log("Downloading from:", game.downloadLink);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Banner Section */}
        <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
          <Image 
            src={game.banner || game.bannerImageUrl || 'https://picsum.photos/seed/banner/1920/1080'} 
            alt={game.name} 
            fill 
            className="object-cover" 
            priority
            data-ai-hint="game banner"
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
                <Button 
                  size="lg" 
                  className="h-14 px-12 bg-primary hover:bg-primary/80 text-primary-foreground font-black rounded-full neon-glow-primary text-xl gap-3"
                  onClick={handleDownload}
                >
                  <Download className="w-6 h-6" /> Download Now
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 border-white/20 hover:bg-white/10 text-white font-bold rounded-full gap-2 text-lg backdrop-blur-md">
                   Premium Download
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-white border-l-4 border-primary pl-6">Description</h2>
              <div className="text-white/70 leading-relaxed text-lg whitespace-pre-line">
                {game.description}
              </div>
            </div>

            {game.features && (
              <div className="space-y-6">
                <h2 className="text-3xl font-black text-white border-l-4 border-secondary pl-6">Key Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {game.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-white/80 bg-white/5 p-4 rounded-xl border border-white/5">
                      <ShieldCheck className="text-primary w-5 h-5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gallery */}
            {game.screenshots && game.screenshots.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-black text-white border-l-4 border-primary pl-6">Gallery</h2>
                <Carousel className="w-full">
                  <CarouselContent>
                    {game.screenshots.map((ss: string, i: number) => (
                      <CarouselItem key={i} className="md:basis-1/1 lg:basis-1/1">
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                          <Image src={ss} alt={`Screenshot ${i}`} fill className="object-cover" data-ai-hint="game screenshot" />
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

          {/* Sidebar / Requirements */}
          <div className="space-y-8">
            {/* System Reqs Card */}
            {game.systemRequirements && (
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
                    <Layers className="text-white/30 w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-white/30 uppercase font-black tracking-widest mb-1">Memory</p>
                      <p className="text-sm text-white/80">{game.systemRequirements.memory}</p>
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
            )}

            {/* Ad Placement */}
            <div className="w-full aspect-square glass-morphism rounded-2xl flex items-center justify-center border-dashed border-white/20">
               <span className="text-white/20 font-bold tracking-widest uppercase">Promoted Slot</span>
            </div>
          </div>
        </div>

        {/* Related Games - pass current game object */}
        {/* @ts-ignore - type compatibility */}
        <RelatedGames currentGame={game} />
      </main>

      <Footer />
    </div>
  );
}
