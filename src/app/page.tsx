
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import GameCard from "@/components/game/GameCard";
import CategoryGrid from "@/components/home/CategoryGrid";
import AdSlot from "@/components/ads/AdSlot";
import { MOCK_GAMES } from "@/lib/games";
import { Button } from "@/components/ui/button";
import { ChevronRight, Flame, Zap, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const topDownloads = MOCK_GAMES.filter(g => g.isTopDownload);
  const editorsChoices = MOCK_GAMES.filter(g => g.isEditorsChoice);
  const trendingGames = MOCK_GAMES.filter(g => g.isTrending);
  const recentlyAdded = [...MOCK_GAMES].reverse().slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />

        {/* Top Downloads Section */}
        <section className="pt-20 pb-10 overflow-hidden">
          <div className="px-6 md:px-12 max-w-7xl mx-auto flex justify-between items-end mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame className="text-primary w-5 h-5 animate-bounce" />
                <span className="text-primary font-black tracking-widest uppercase text-xs">🔥 2M+ Users Today</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white">Top Downloads Today</h2>
            </div>
            <Link href="/category/action" className="hidden md:block">
              <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5 font-bold">View Leaderboard</Button>
            </Link>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-8 px-6 md:px-12 no-scrollbar">
            {topDownloads.map((game) => (
              <GameCard key={game.id} game={game} variant="horizontal" />
            ))}
          </div>
        </section>

        {/* Recently Added Grid */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 border-t border-white/5">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-secondary w-5 h-5" />
                <span className="text-secondary font-black tracking-widest uppercase text-xs">Just In</span>
              </div>
              <h2 className="text-4xl font-black text-white">Recently Added</h2>
            </div>
            <Link href="/category/offline">
              <Button variant="link" className="text-primary font-bold gap-1">New Releases <ChevronRight className="w-4 h-4" /></Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentlyAdded.map((game) => (
              <GameCard key={game.id} game={game} variant="vertical" />
            ))}
          </div>
        </section>

        {/* Ad Placement 1 */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto py-10">
           <AdSlot label="⚡ Exclusive Speed Offer" />
        </div>

        <CategoryGrid />

        {/* Editor's Choice Section */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto py-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-secondary font-bold tracking-widest uppercase text-xs">Premium Curation</span>
              <h2 className="text-4xl font-black text-white mt-2">Editor's Choice</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {editorsChoices.map((game) => (
              <GameCard key={game.id} game={game} variant="premium" />
            ))}
          </div>
        </section>

        {/* Trending Games Grid */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 border-t border-white/5">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-primary w-5 h-5" />
                <span className="text-primary font-black tracking-widest uppercase text-xs">Going Viral</span>
              </div>
              <h2 className="text-4xl font-black text-white">Trending Now</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingGames.map((game) => (
              <GameCard key={game.id} game={game} variant="vertical" />
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto py-20">
          <div className="relative w-full rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary/20 border border-white/10 p-12 md:p-24 text-center space-y-10">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black text-white font-headline leading-tight">Join the Viral<br/>Revolution.</h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">Discover thousands of premium games with instant high-speed downloads. Zero limits, zero registration.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
               <Button size="lg" className="h-16 px-12 bg-primary hover:bg-primary/80 text-primary-foreground font-black rounded-full neon-glow-primary text-2xl gap-2">Get Started Now</Button>
               <Button size="lg" variant="outline" className="h-16 px-12 border-white/20 hover:bg-white/10 text-white font-black rounded-full text-2xl backdrop-blur-md">Browse Catalog</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
