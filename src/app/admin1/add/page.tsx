
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES } from '@/lib/games';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Image as ImageIcon, Link as LinkIcon, Info, Save } from 'lucide-react';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function AddGamePage() {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
      // For legacy components compatibility
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
      features: ["Instant Download", "High Speed CDN", "Zero Limits"],
      systemRequirements: {
        os: "Windows 10/11",
        processor: "Modern Quad-Core",
        memory: "8 GB RAM",
        graphics: "GTX 1060 or better",
        storage: formData.size || "50 GB"
      }
    };

    const docRef = doc(firestore, 'games', gameId);
    
    // Using non-blocking update with proper error handling through emitter
    setDocumentNonBlocking(docRef, gameData, { merge: true });
    
    // Simulate immediate success feel
    toast({ title: "Game Published", description: `${formData.name} is now live.` });
    router.push('/admin1/manage');
    setLoading(false);
  };

  return (
    <div className="max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-8 pb-20">
        <Card className="glass-morphism border-white/5 overflow-hidden">
          <CardHeader className="bg-primary/10 border-b border-white/5 p-8">
            <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
              <PlusCircle className="text-primary w-7 h-7" /> Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest">Game Name</label>
                <Input 
                  placeholder="e.g. Cyberpunk 2077" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-white/5 border-white/10 text-white h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest">Category</label>
                <Select onValueChange={(val) => setFormData({...formData, categoryId: val})} required>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-white/10 text-white">
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-white/40 uppercase tracking-widest">Description</label>
              <Textarea 
                placeholder="Enter rich description here..." 
                className="bg-white/5 border-white/10 text-white min-h-[150px]"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/5 overflow-hidden">
          <CardHeader className="bg-secondary/10 border-b border-white/5 p-8">
            <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
              <ImageIcon className="text-secondary w-7 h-7" /> Media & Visuals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-white/40 uppercase tracking-widest">Thumbnail URL</label>
              <Input 
                placeholder="https://..." 
                value={formData.thumbnailImageUrl}
                onChange={(e) => setFormData({...formData, thumbnailImageUrl: e.target.value})}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-white/40 uppercase tracking-widest">Banner Image URL</label>
              <Input 
                placeholder="https://..." 
                value={formData.bannerImageUrl}
                onChange={(e) => setFormData({...formData, bannerImageUrl: e.target.value})}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-white/40 uppercase tracking-widest">Screenshots (Comma separated URLs)</label>
              <Textarea 
                placeholder="url1, url2, url3..." 
                className="bg-white/5 border-white/10 text-white"
                value={formData.screenshotUrls}
                onChange={(e) => setFormData({...formData, screenshotUrls: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/5 overflow-hidden">
          <CardHeader className="bg-primary/10 border-b border-white/5 p-8">
            <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
              <LinkIcon className="text-primary w-7 h-7" /> Links & Specs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest">Download Link</label>
                <Input 
                  placeholder="Direct URL" 
                  value={formData.downloadLink}
                  onChange={(e) => setFormData({...formData, downloadLink: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest">Rating (0.0 - 5.0)</label>
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
                <label className="text-xs font-black text-white/40 uppercase tracking-widest">Game Size (e.g. 50 GB)</label>
                <Input 
                  placeholder="50 GB" 
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
            <Save className="w-6 h-6" /> {loading ? "Publishing..." : "Publish Game"}
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
