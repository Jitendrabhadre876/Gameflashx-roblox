'use client';

import { useCollection, useFirebase } from '@/firebase';
import { useState, useMemo } from 'react';
import { collection, doc } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Search, ExternalLink, Download, RefreshCcw, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMemoFirebase } from '@/firebase';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { bulkImportIGDBGames } from '@/app/actions/igdb';
import Image from 'next/image';

export default function ManageGamesPage() {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const gamesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'games');
  }, [firestore]);

  const { data: games, isLoading } = useCollection(gamesQuery);

  const filteredGames = useMemo(() => {
    if (!games) return [];
    return games.filter(g => 
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [games, searchTerm]);

  const handleDelete = (gameId: string, name: string) => {
    if (!firestore) return;
    if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      const docRef = doc(firestore, 'games', gameId);
      deleteDocumentNonBlocking(docRef);
      toast({ title: "Game Deleted", description: `${name} has been removed.` });
    }
  };

  const handleBulkImport = async () => {
    setIsSyncing(true);
    toast({ title: "Starting Sync", description: "Fetching metadata from IGDB server..." });
    try {
      const result = await bulkImportIGDBGames();
      if (result.success) {
        toast({
          title: "Import Successful",
          description: `Successfully synced ${result.count} high-rated games from IGDB. Firestore updated.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Import Failed",
          description: result.error || "An unknown error occurred during sync.",
        });
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: err.message || "Could not reach the IGDB sync service.",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex gap-4">
           <div className="h-12 w-full bg-white/5 animate-pulse rounded-xl" />
           <div className="h-12 w-48 bg-white/5 animate-pulse rounded-xl" />
        </div>
        <div className="h-96 bg-white/5 animate-pulse rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input 
            placeholder="Search catalog..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white h-12 rounded-xl"
          />
        </div>
        <Button 
          onClick={handleBulkImport}
          disabled={isSyncing}
          className="h-12 px-8 bg-secondary hover:bg-secondary/80 text-white font-black rounded-xl gap-2 w-full md:w-auto neon-glow-secondary"
        >
          {isSyncing ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCcw className="w-5 h-5" />}
          {isSyncing ? "Syncing IGDB..." : "Import Games from IGDB"}
        </Button>
      </div>

      {games && games.length === 0 && !isLoading && (
        <div className="glass-morphism rounded-2xl p-20 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-white/10 mx-auto" />
          <h3 className="text-xl font-black text-white">Database is Empty</h3>
          <p className="text-white/40">Click the "Import Games" button to populate your catalog instantly.</p>
        </div>
      )}

      {games && games.length > 0 && (
        <div className="glass-morphism rounded-2xl border-white/5 overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-white/40 font-black uppercase text-xs">Game</TableHead>
                <TableHead className="text-white/40 font-black uppercase text-xs">Category</TableHead>
                <TableHead className="text-white/40 font-black uppercase text-xs">Rating</TableHead>
                <TableHead className="text-white/40 font-black uppercase text-xs">Downloads</TableHead>
                <TableHead className="text-white/40 font-black uppercase text-xs text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGames.map((game) => (
                <TableRow key={game.id} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="font-medium text-white">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10">
                        <Image 
                          src={game.image || game.thumbnailImageUrl || 'https://picsum.photos/seed/placeholder/100/100'} 
                          alt={game.name} 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      <span>{game.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase text-white/50">
                      {game.category || 'General'}
                    </span>
                  </TableCell>
                  <TableCell className="text-primary font-bold">{game.rating}</TableCell>
                  <TableCell className="text-white/60">
                     <div className="flex items-center gap-2">
                       <Download className="w-3 h-3" /> {game.downloads?.toLocaleString() || 0}
                     </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white/60 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:bg-destructive/10 text-destructive/60 hover:text-destructive"
                        onClick={() => handleDelete(game.id, game.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-white/10 text-primary" asChild>
                        <a href={`/games/${game.id}`} target="_blank">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}