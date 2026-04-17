'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase';
import { doc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES } from '@/lib/games';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Image as ImageIcon, Link as LinkIcon, Save, Search, Zap, Loader2, Sparkles } from 'lucide-react';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { searchIGDBGames } from '@/app/actions/igdb';
import { aiGeneratedGameVisuals } from '@/ai/flows/ai-generated-game-visuals';

export default function AddGamePage() {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [generatingAI, setGeneratingAI] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    thumbnailImageUrl: '',
    bannerImageUrl: '',
    description: '',
    downloadLink: '',
    rating: 4.5,
    size: '',
    screenshotUrls: '',
  });

  const handleIGDBSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const results = await searchIGDBGames(searchQuery);
      if (results && results.length > 0) {
        const game = results[0];
        
        // Helper to convert IGDB thumbnail URLs to high-quality formats
        const processUrl = (url?: string, size: string = 't_1080p') => {
          if (!url) return '';
          // IGDB URLs start with //images.igdb... so we add https:
          return `https:${url.replace('t_thumb', size)}`;
        };

        const mainCover = game.cover?.url ? processUrl(game.cover.url, 't_cover_big') : '';
        const firstScreenshot = game.screenshots?.[0]?.url ? processUrl(game.screenshots[0].url, 't_1080p') : '';
        const mainBanner = game.artworks?.[0]?.url ? processUrl(game.artworks[0].url, 't_1080p') : firstScreenshot;

        setFormData(prev => ({
          ...prev,
          name: game.name,
          description: game.summary || '',
          rating: game.rating ? Math.round((game.rating / 20) * 10) / 10 : 4.5,
          thumbnailImageUrl: mainCover,
          bannerImageUrl: mainBanner,
          screenshotUrls: (game.screenshots || []).slice(0, 5).map((s: any) => processUrl(s.url, 't_720p')).join(', '),
        }));
        
        toast({ title: "Import Successful", description: `Metadata for "${game.name}" loaded.` });
      } else {
        toast({ variant: "destructive", title: "No Results", description: "Game not found in IGDB database." });
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Search Failed", description: "Error communicating with IGDB API." });
    } finally {
      setSearching(false);
    }
  };

  const handleAIGenerate = async () => {
    if (!formData.name || !formData.description) {
      toast({ variant: "destructive", title: "Missing Info", description: "Provide a name and description for the AI to analyze." });
      return;
    }
    setGeneratingAI(true);
    try {
      const genre = CATEGORIES.find(c => c.slug === formData.categoryId)?.name || 'Action';
      const visuals = await aiGeneratedGameVisuals({
        gameTitle: formData.name,
        gameDescription: formData.description,
        gameGenre: genre,
      });
      
      setFormData(prev => ({
        ...prev,
        thumbnailImageUrl: visuals.thumbnailUrl,
        bannerImageUrl: visuals.bannerUrl,
      }));
      
      toast({ title: "AI Visuals Ready", description: "High-end images generated successfully." });
    } catch (err) {
      toast({ variant: "destructive", title: "AI Generation Failed", description: "Service temporarily unavailable." });
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;

    setLoading(true);
    const gameId = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const screenshotsArray = formData.screenshotUrls.split(',').map(s => s.trim()).filter(s => s !== '');

    const gameData = {
      id: gameId,
      name: formData.name,
      categoryId: formData.categoryId,
      category: CATEGORIES.find(c => c.slug === formData.categoryId)?.name || 'General',
      thumbnailImageUrl: formData.thumbnailImageUrl,
      image: formData.thumbnailImageUrl,
      bannerImageUrl: formData.bannerImageUrl,
      banner: formData.bannerImageUrl,
      description: formData.description,
      downloadLink: formData.downloadLink,
      rating: Number(formData.rating),
      size: formData.size,
      screenshotUrls: screenshotsArray,
      screenshots: screenshotsArray,
      createdAt: serverTimestamp(),
      downloads: 0,
      features: ["Premium Access", "High Speed Download", "Verified File", "Cloud Optimized"],
      systemRequirements: {
        os: "Windows 10/11",
        processor: "Quad-Core i5+",
        memory: "8 GB RAM",
        graphics: "GTX 1060+",
        storage: formData.size || "40 GB"
      }
    };

    const docRef = doc(firestore, 'games', gameId);
    setDocumentNonBlocking(docRef, gameData, { merge: true });
    
    toast({ title: "Published", description: `${formData.name} is now live on the marketplace.` });
    router.push('/admin1/manage');
    setLoading(false);
  };

  return (
    <div className="max-w-4xl pb-20">
      {/* IGDB Import Card */}
      <Card className="glass-morphism border-primary/20 bg-primary/5 mb-10 overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-xl font-black text-white flex items-center gap-3">
            <Search className="text-primary w-6 h-6" /> IGDB Rapid Import
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="flex gap-4">
            <Input 
              placeholder="Enter game title (e.g. Elden Ring)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border-white/10 text-white h-12"
              onKeyDown={(e) => e.key === 'Enter' && handleIGDBSearch()}
            />
            <Button 
              onClick={handleIGDBSearch} 
              className="bg-primary hover:bg-primary/80 h-12 px-8 font-black gap-2"
              disabled={searching}
            >
              {searching ? <Loader2 className="animate-spin w-5 h-5" /> : <Zap className="w-5 h-5" />}
              {searching ? "Searching..." : "Auto-Fill"}
            </Button>
          </div>
          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-4">
            Instant metadata synchronization with Twitch Gaming Database
          </p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="glass-morphism border-white/5 overflow-hidden">
          <CardHeader className="bg-primary/10 border-b border-white/5 p-8">
            <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
              <PlusCircle className="text-primary w-7 h-7" /> Core Game Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest">Game Title</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-white/5 border-white/10 text-white h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest">Marketplace Category</label>
                <Select onValueChange={(val) => setFormData({...formData, categoryId: val})} value={formData.categoryId} required>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                    <SelectValue placeholder="Choose a genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#070B14] border-white/10 text-white">
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-white/40 uppercase tracking-widest">Full Description</label>
              <Textarea 
                className="bg-white/5 border-white/10 text-white min-h-[150px] leading-relaxed"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/5 overflow-hidden">
          <CardHeader className="bg-secondary/10 border-b border-white/5 p-8 flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
              <ImageIcon className="text-secondary w-7 h-7" /> High-Resolution Media
            </CardTitle>
            <Button 
              type="button"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 font-black rounded-full gap-2 h-10 px-6"
              onClick={handleAIGenerate}
              disabled={generatingAI}
            >
              {generatingAI ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              AI Image Gen
            </Button>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-white/40 uppercase tracking-widest">Vertical Thumbnail URL</label>
              <Input 
                value={formData.thumbnailImageUrl}
                onChange={(e) => setFormData({...formData, thumbnailImageUrl: e.target.value})}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-white/40 uppercase tracking-widest">Hero Banner URL</label>
              <Input 
                value={formData.bannerImageUrl}
                onChange={(e) => setFormData({...formData, bannerImageUrl: e.target.value})}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-white/40 uppercase tracking-widest">Screenshot Gallery (Comma separated)</label>
              <Textarea 
                className="bg-white/5 border-white/10 text-white h-24"
                value={formData.screenshotUrls}
                onChange={(e) => setFormData({...formData, screenshotUrls: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/5 overflow-hidden">
          <CardHeader className="bg-primary/10 border-b border-white/5 p-8">
            <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
              <LinkIcon className="text-primary w-7 h-7" /> Distribution & Specs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest">Direct Download Link</label>
                <Input 
                  value={formData.downloadLink}
                  onChange={(e) => setFormData({...formData, downloadLink: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest">Rating (1-5)</label>
                <Input 
                  type="number" 
                  step="0.1" 
                  max="5" 
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                  className="bg-white/5 border-white/10 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest">Total Size (GB)</label>
                <Input 
                  placeholder="e.g. 50 GB" 
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button 
            type="submit" 
            className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground font-black h-16 rounded-full neon-glow-primary text-xl gap-3"
            disabled={loading}
          >
            <Save className="w-6 h-6" /> {loading ? "Publishing..." : "Launch Game"}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="h-16 px-10 border-white/10 text-white font-bold rounded-full text-lg hover:bg-white/5"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
