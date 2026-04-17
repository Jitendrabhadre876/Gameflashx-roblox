
'use client';

import { useCollection, useFirebase } from '@/firebase';
import { useMemo } from 'react';
import { collection } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useMemoFirebase } from '@/firebase';

const COLORS = ['#55CEF7', '#BB4EF7', '#F75555', '#F7BB55', '#55F7CE'];

export default function AnalyticsPage() {
  const { firestore } = useFirebase();

  const gamesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'games');
  }, [firestore]);

  const { data: games, isLoading } = useCollection(gamesQuery);

  const categoryData = useMemo(() => {
    if (!games) return [];
    const counts: Record<string, number> = {};
    games.forEach(g => {
      counts[g.category] = (counts[g.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [games]);

  const downloadsData = useMemo(() => {
    if (!games) return [];
    return [...games]
      .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
      .slice(0, 8)
      .map(g => ({ name: g.name.substring(0, 10), downloads: g.downloads || 0 }));
  }, [games]);

  if (isLoading) return <div className="text-white">Loading data visualizations...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Downloads Chart */}
      <Card className="glass-morphism border-white/5 min-h-[400px]">
        <CardHeader>
          <CardTitle className="text-white">Downloads per Game (Top 8)</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={downloadsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} />
              <YAxis stroke="#ffffff50" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#070B14', border: '1px solid #ffffff10', borderRadius: '12px' }}
                itemStyle={{ color: '#55CEF7' }}
              />
              <Bar dataKey="downloads" fill="#55CEF7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card className="glass-morphism border-white/5 min-h-[400px]">
        <CardHeader>
          <CardTitle className="text-white">Inventory by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{ backgroundColor: '#070B14', border: '1px solid #ffffff10', borderRadius: '12px' }}
                 itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {categoryData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-xs text-white/60">{entry.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
