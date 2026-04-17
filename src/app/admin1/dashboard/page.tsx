
'use client';

import { useCollection, useFirebase } from '@/firebase';
import { useMemo } from 'react';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, Download, Star, TrendingUp, Users } from 'lucide-react';
import { useMemoFirebase } from '@/firebase';

export default function AdminDashboardPage() {
  const { firestore } = useFirebase();
  
  const gamesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'games');
  }, [firestore]);

  const { data: games, isLoading } = useCollection(gamesQuery);

  const stats = useMemo(() => {
    if (!games) return { total: 0, downloads: 0, avgRating: 0 };
    return {
      total: games.length,
      downloads: games.reduce((acc, g) => acc + (g.downloads || 0), 0),
      avgRating: (games.reduce((acc, g) => acc + (g.rating || 0), 0) / games.length).toFixed(1)
    };
  }, [games]);

  const popularGames = useMemo(() => {
    if (!games) return [];
    return [...games].sort((a, b) => (b.downloads || 0) - (a.downloads || 0)).slice(0, 5);
  }, [games]);

  if (isLoading) return <div className="text-white">Calculating metrics...</div>;

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-morphism border-white/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-white/50 uppercase tracking-widest">Total Games</CardTitle>
            <Layers className="text-primary w-5 h-5" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-white">{stats.total}</div>
            <p className="text-xs text-primary mt-1 font-bold">Active in Catalog</p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-white/50 uppercase tracking-widest">Total Downloads</CardTitle>
            <Download className="text-secondary w-5 h-5" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-white">{stats.downloads.toLocaleString()}</div>
            <p className="text-xs text-secondary mt-1 font-bold">Total Conversions</p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-white/50 uppercase tracking-widest">Avg Rating</CardTitle>
            <Star className="text-primary w-5 h-5" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-white">{stats.avgRating}</div>
            <p className="text-xs text-primary mt-1 font-bold">Community Score</p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-white/50 uppercase tracking-widest">Growth</CardTitle>
            <TrendingUp className="text-green-500 w-5 h-5" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-white">+12%</div>
            <p className="text-xs text-green-500 mt-1 font-bold">MoM Performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Popular Games List */}
      <Card className="glass-morphism border-white/5">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="text-primary w-5 h-5" /> Most Popular Titles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularGames.map((game, i) => (
              <div key={game.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black text-white text-xs">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{game.name}</h4>
                    <p className="text-xs text-white/40 uppercase font-black">{game.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-primary font-black flex items-center gap-1.5">
                    <Download className="w-4 h-4" /> {game.downloads?.toLocaleString() || 0}
                  </div>
                  <p className="text-[10px] text-white/30 uppercase font-black">Downloads</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
