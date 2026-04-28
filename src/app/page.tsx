
'use client';

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CloudinaryImage from "@/components/ui/CloudinaryImage";
import { Download, Loader2, Sparkles, TrendingUp } from "lucide-react";
import { MOCK_GAMES, GLOBAL_CTA_LINK } from "@/lib/games";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function HomePage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleDownloadClick = (gameName: string) => {
    setSelectedGame(gameName);
    setIsDownloading(true);
    
    // Smooth 1.5s delay before opening the global monetization link
    setTimeout(() => {
      setIsDownloading(false);
      window.open(GLOBAL_CTA_LINK, "_blank", "noopener,noreferrer");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB]">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />

        {/* Section Header */}
        <section className="pt-20 pb-10">
          <div className="px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Sparkles className="text-primary w-5 h-5" />
                <span className="text-primary font-black tracking-widest uppercase text-xs">Featured Apps</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#111] tracking-tight">Trending Games 2026</h2>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <TrendingUp className="w-3.5 h-3.5 text-primary" /> 2.1M Downloads today
              </div>
            </div>
          </div>
          
          {/* Games Grid */}
          <div className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            {MOCK_GAMES.map((game) => (
              <div 
                key={game.id} 
                className="group bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 rounded-[2rem] overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                  <CloudinaryImage 
                    src={game.image} 
                    alt={game.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                
                <h3 className="font-black text-[#111] text-sm md:text-base mb-4 line-clamp-1 h-6">{game.name}</h3>
                
                <Button 
                  onClick={() => handleDownloadClick(game.name)}
                  className="w-full bg-gradient-to-r from-primary to-[#46BCE6] hover:brightness-105 text-white font-black h-10 md:h-12 rounded-xl text-xs md:text-sm shadow-lg shadow-primary/10 gap-2 transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" /> Download
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Categories / Badges */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto py-20">
           <div className="flex flex-wrap justify-center gap-4">
              {["Safe & Verified", "No Registration", "Fast Downloads", "Free Access"].map((tag) => (
                <div key={tag} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm text-xs font-bold text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {tag}
                </div>
              ))}
           </div>
        </section>

        {/* Trust Banner */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto pb-20">
          <div className="bg-[#111] rounded-[3rem] p-12 text-center space-y-6 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -z-1" />
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Ready for your next adventure?</h2>
            <p className="text-white/60 max-w-xl mx-auto">Access the world's largest collection of premium mobile games with zero limits and maximum speed.</p>
            <Button 
              size="lg" 
              className="h-16 px-12 bg-primary hover:bg-primary/80 text-white font-black rounded-full shadow-xl shadow-primary/20 text-xl"
              onClick={() => {
                setTimeout(() => {
                  window.open(GLOBAL_CTA_LINK, "_blank", "noopener,noreferrer");
                }, 400);
              }}
            >
              Browse Full Catalog
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Preparing Download Dialog */}
      <Dialog open={isDownloading} onOpenChange={setIsDownloading}>
        <DialogContent className="sm:max-w-md bg-white border-none rounded-[2.5rem] p-12 text-center shadow-2xl outline-none">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <Loader2 className="w-20 h-20 text-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Download className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#111] tracking-tight">Preparing Download...</h2>
              <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Processing {selectedGame}</p>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full animate-[progress_2s_ease-in-out]" style={{ width: '100%' }} />
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
