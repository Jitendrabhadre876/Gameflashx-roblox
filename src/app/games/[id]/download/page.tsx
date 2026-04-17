
'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/ads/AdSlot";
import { MOCK_GAMES } from "@/lib/games";
import { Button } from "@/components/ui/button";
import { Download, Loader2, ShieldCheck, ArrowRight, Zap, Star } from "lucide-react";
import { useFirebase } from "@/firebase";
import { doc, increment } from "firebase/firestore";
import { updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";

export default function DownloadPage() {
  const params = useParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [isReady, setIsReady] = useState(false);
  const { firestore } = useFirebase();

  const gameId = params.id as string;
  const game = MOCK_GAMES.find(g => g.id === gameId);

  useEffect(() => {
    if (!game) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [game]);

  const handleFinalDownload = () => {
    if (!firestore || !gameId) return;
    const ref = doc(firestore, 'games', gameId);
    updateDocumentNonBlocking(ref, { downloads: increment(1) });
  };

  if (!game) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#070B14]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <header className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image src={game.image} alt={game.name} fill className="object-cover" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-white">{game.name}</h1>
                  <p className="text-white/40 text-sm font-bold uppercase tracking-widest">{game.category} • {game.size}</p>
                </div>
              </div>
            </header>

            <div className="glass-morphism rounded-3xl p-8 md:p-12 text-center space-y-8 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                 <div 
                   className="h-full bg-primary transition-all duration-1000 ease-linear" 
                   style={{ width: `${(5 - countdown) * 20}%` }}
                 />
               </div>

               {isReady ? (
                 <div className="space-y-6 animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Download className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-black text-white">Your Download is Ready!</h2>
                    <p className="text-white/50 max-w-md mx-auto">Click the button below to start your high-speed download. No registration required.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Button 
                        size="lg" 
                        asChild
                        className="h-16 px-12 bg-primary hover:bg-primary/80 text-primary-foreground font-black rounded-full neon-glow-primary text-xl gap-3 w-full sm:w-auto"
                        onClick={handleFinalDownload}
                      >
                        <a href={game.downloadLink} download>
                          <Download className="w-6 h-6" /> Start Download
                        </a>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-16 px-8 border-white/10 hover:bg-white/5 text-white/50 hover:text-white rounded-full font-bold w-full sm:w-auto"
                        onClick={() => router.push(`/games/${gameId}`)}
                      >
                        Back to Info
                      </Button>
                    </div>
                 </div>
               ) : (
                 <div className="space-y-6">
                    <div className="relative w-24 h-24 mx-auto">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="48" cy="48" r="44"
                          stroke="currentColor" strokeWidth="4" fill="transparent"
                          className="text-white/5"
                        />
                        <circle
                          cx="48" cy="48" r="44"
                          stroke="currentColor" strokeWidth="4" fill="transparent"
                          strokeDasharray={276}
                          strokeDashoffset={276 - (276 * (5 - countdown)) / 5}
                          className="text-primary transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-white">
                        {countdown}
                      </div>
                    </div>
                    <h2 className="text-2xl font-black text-white">Preparing Your Link...</h2>
                    <p className="text-white/40 font-medium">Verified & Secure. Scanning for viruses.</p>
                    
                    <div className="flex items-center justify-center gap-6 pt-4">
                       <div className="flex flex-col items-center gap-2">
                         <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                           <ShieldCheck className="text-green-500 w-5 h-5" />
                         </div>
                         <span className="text-[10px] font-black text-white/30 uppercase">Safe</span>
                       </div>
                       <div className="flex flex-col items-center gap-2">
                         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                           <Zap className="text-primary w-5 h-5" />
                         </div>
                         <span className="text-[10px] font-black text-white/30 uppercase">Fast</span>
                       </div>
                       <div className="flex flex-col items-center gap-2">
                         <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                           <Star className="text-secondary w-5 h-5" />
                         </div>
                         <span className="text-[10px] font-black text-white/30 uppercase">High Res</span>
                       </div>
                    </div>
                 </div>
               )}
            </div>

            <AdSlot label="Recommended for You" />

            <div className="space-y-6">
               <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <Zap className="text-primary w-5 h-5" /> Recommended Offers
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map(i => (
                    <div key={i} className="glass-morphism p-4 rounded-2xl flex items-center gap-4 hover:border-primary/30 transition-all cursor-pointer group">
                       <div className="w-16 h-16 rounded-xl bg-white/5 overflow-hidden border border-white/5">
                          <Image src={`https://picsum.photos/seed/offer${i}/100/100`} alt="Offer" width={100} height={100} className="object-cover" />
                       </div>
                       <div className="flex-grow">
                          <p className="text-xs text-primary font-black uppercase tracking-widest mb-1">Sponsored</p>
                          <h4 className="font-bold text-white group-hover:text-primary transition-colors">Exclusive Beta Access</h4>
                          <p className="text-xs text-white/40">Limited time offer for gamers.</p>
                       </div>
                       <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Sidebar Ads */}
          <aside className="lg:col-span-4 space-y-6">
             <div className="glass-morphism p-6 rounded-3xl space-y-6 sticky top-24">
                <h3 className="text-lg font-black text-white text-center">Support Gameflashx</h3>
                <p className="text-sm text-white/50 text-center">Help us keep the downloads free and fast for everyone.</p>
                <AdSlot variant="vertical" label="Supporter Ad" />
                <Button className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary/80 text-white font-bold gap-2">
                   <Zap className="w-4 h-4" /> Remove All Ads
                </Button>
             </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
