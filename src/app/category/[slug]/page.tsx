import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MOCK_GAMES, CATEGORIES } from "@/lib/games";
import GameCard from "@/components/game/GameCard";
import { notFound } from "next/navigation";
import { Filter, SlidersHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryInfo = CATEGORIES.find(c => c.slug === slug);
  
  if (!categoryInfo) {
    notFound();
  }

  const categoryGames = MOCK_GAMES.filter(g => 
    slug === 'offline' ? true : g.category.toLowerCase().replace(' ', '-') === slug
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <header className="mb-12 space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-12 bg-primary" />
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Category</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white">{categoryInfo.name}</h1>
          <p className="text-white/50 text-lg">Browse our collection of premium {categoryInfo.name.toLowerCase()} games.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="glass-morphism rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" /> Filters
                </h3>
                <button className="text-xs text-primary font-bold hover:underline">Clear All</button>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-black text-white/30 uppercase tracking-widest">Search</p>
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                   <Input placeholder="Find in category..." className="pl-10 bg-white/5 border-white/10" />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-black text-white/30 uppercase tracking-widest">Game Size</p>
                <div className="space-y-2">
                  {['Under 5GB', '5GB - 20GB', '20GB - 50GB', '50GB+'].map((size) => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                        <div className="w-3 h-3 bg-primary rounded-sm opacity-0 group-hover:opacity-20 transition-opacity" />
                      </div>
                      <span className="text-sm text-white/60 group-hover:text-white transition-colors">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-black text-white/30 uppercase tracking-widest">Status</p>
                <div className="space-y-2">
                  {['Online', 'Offline'].map((status) => (
                    <label key={status} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded border border-white/10 group-hover:border-primary" />
                      <span className="text-sm text-white/60 group-hover:text-white transition-colors">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold rounded-full neon-glow-primary">
                Apply Filters
              </Button>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="lg:col-span-3">
             <div className="flex justify-between items-center mb-8">
               <p className="text-white/30 text-sm font-medium">Showing {categoryGames.length} games</p>
               <div className="flex gap-4">
                 <select className="bg-white/5 border border-white/10 text-white text-sm rounded-full px-4 py-2 outline-none focus:border-primary">
                   <option>Sort by: Popularity</option>
                   <option>Sort by: Newest</option>
                   <option>Sort by: Rating</option>
                 </select>
               </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {categoryGames.map((game) => (
                 <GameCard key={game.id} game={game} />
               ))}
             </div>

             {categoryGames.length === 0 && (
               <div className="py-20 text-center space-y-4">
                 <Filter className="w-16 h-16 text-white/10 mx-auto" />
                 <h3 className="text-2xl font-bold text-white">No games found</h3>
                 <p className="text-white/50">Try adjusting your filters or browse other categories.</p>
               </div>
             )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
