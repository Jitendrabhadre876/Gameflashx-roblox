
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/lib/blog-data";
import { MOCK_GAMES } from "@/lib/games";
import GameCard from "@/components/game/GameCard";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Gameflashx Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  
  if (!post) {
    notFound();
  }

  const relatedGames = MOCK_GAMES.filter(g => post.relatedGameIds.includes(g.id));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto w-full">
        <Link href="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-primary font-bold uppercase text-xs tracking-widest mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <article className="space-y-8">
          <header className="space-y-6">
            <div className="inline-block px-4 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-black rounded-full uppercase tracking-widest">
              {post.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white font-headline leading-tight">{post.title}</h1>
            <div className="flex items-center gap-6 text-sm text-white/40 font-bold uppercase tracking-wider border-b border-white/5 pb-8">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</span>
            </div>
          </header>

          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>

          <div 
            className="prose prose-invert prose-primary max-w-none text-white/70 leading-relaxed text-lg
              prose-h2:text-white prose-h2:font-black prose-h2:text-3xl prose-h2:mt-12
              prose-h3:text-white prose-h3:font-bold prose-h3:text-2xl prose-h3:mt-8
              prose-p:mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>

        {relatedGames.length > 0 && (
          <section className="mt-20 pt-20 border-t border-white/5 space-y-10">
            <div className="space-y-2">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Recommended</span>
              <h2 className="text-4xl font-black text-white font-headline">Featured Games</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {relatedGames.map(game => (
                <GameCard key={game.id} game={game} variant="vertical" />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
