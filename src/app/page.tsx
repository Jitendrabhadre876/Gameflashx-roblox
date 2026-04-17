
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import GameCard from "@/components/game/GameCard";
import CategoryGrid from "@/components/home/CategoryGrid";
import { MOCK_GAMES } from "@/lib/games";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const topDownloads = MOCK_GAMES.filter(g => g.isTopDownload);
  const editorsChoices = MOCK_GAMES.filter(g => g.isEditorsChoice);
  const trendingGames = MOCK_GAMES.filter(g => g.isTrending);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />

        {/* Top Downloads Section */}
        <section className="pt-20 pb-10 overflow-hidden">
          <div className="px-6 md:px-12 max-w-7xl mx-auto flex justify-between items-end mb-10">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-xs">Hot Right Now</span>
              <h2 className="text-4xl font-black text-white mt-2">Top Downloads Today</h2>
            </div>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-8 px-6 md:px-12 no-scrollbar">
            {topDownloads.map((game) => (
              <GameCard key={game.id} game={game} variant="horizontal" />
            ))}
          </div>
        </section>

        <CategoryGrid />

        {/* Ad Placement 1 */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto py-10">
           <div className="w-full h-32 glass-morphism rounded-2xl flex items-center justify-center border-dashed border-white/20">
              <span className="text-white/20 font-bold tracking-widest uppercase">Promoted Content</span>
           </div>
        </div>

        {/* Editor's Choice Section */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto py-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-secondary font-bold tracking-widest uppercase text-xs">Handpicked</span>
              <h2 className="text-4xl font-black text-white mt-2">Editor's Choice</h2>
            </div>
            <Link href="/category/action">
              <Button variant="link" className="text-primary font-bold gap-1">View All <ChevronRight className="w-4 h-4" /></Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {editorsChoices.map((game) => (
              <GameCard key={game.id} game={game} variant="premium" />
            ))}
          </div>
        </section>

        {/* Trending Games Grid */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto py-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-xs">Community Favorites</span>
              <h2 className="text-4xl font-black text-white mt-2">Trending Games</h2>
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
          <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border border-white/10 p-12 md:p-20 text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-white font-headline">Ready to Jump In?</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Discover thousands of premium games with instant downloads and zero limits. Join the future of gaming today.</p>
            <div className="flex flex-wrap justify-center gap-4">
               <Button size="lg" className="h-14 px-12 bg-primary hover:bg-primary/80 text-primary-foreground font-bold rounded-full neon-glow-primary text-xl">Start Browsing</Button>
               <Button size="lg" variant="outline" className="h-14 px-12 border-white/20 hover:bg-white/10 text-white font-bold rounded-full text-xl backdrop-blur-md">Create Account</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
