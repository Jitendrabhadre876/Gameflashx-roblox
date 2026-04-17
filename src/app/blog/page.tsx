
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/lib/blog-data";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Gaming Blog - Tips, Tricks & Top Lists | Gameflashx",
  description: "Read the latest in gaming news, top 10 lists, and optimization guides on Gameflashx.",
};

export default function BlogListPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <header className="mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-12 bg-primary" />
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Articles</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white font-headline">The Gameflashx Blog</h1>
          <p className="text-white/50 text-xl max-w-2xl">Expert insights, top lists, and the latest news from the world of premium gaming.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col bg-card/30 rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all">
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  {post.category}
                </div>
              </div>
              <div className="p-8 flex-grow space-y-4">
                <div className="flex items-center gap-4 text-xs text-white/40 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.author}</span>
                </div>
                <h2 className="text-2xl font-black text-white group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                <p className="text-white/60 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                <div className="pt-4 flex items-center text-primary font-bold text-sm gap-1 group-hover:gap-2 transition-all">
                  Read More <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
