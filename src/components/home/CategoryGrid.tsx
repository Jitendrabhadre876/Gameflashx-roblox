
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/games";
import * as Icons from "lucide-react";

export default function CategoryGrid() {
  return (
    <section className="px-6 md:px-12 max-w-7xl mx-auto py-20">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="text-primary font-bold tracking-widest uppercase text-xs">Explore</span>
          <h2 className="text-4xl font-black text-white mt-2">Browse by Categories</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {CATEGORIES.map((cat) => {
          const IconComponent = (Icons as any)[cat.icon];
          return (
            <Link 
              key={cat.slug} 
              href={`/category/${cat.slug}`}
              className="group relative h-40 rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all flex items-center justify-center"
            >
              <Image 
                src={`https://picsum.photos/seed/${cat.imageId}/400/250`} 
                alt={cat.name} 
                fill 
                className="object-cover brightness-50 group-hover:scale-110 group-hover:brightness-75 transition-all duration-500"
                data-ai-hint="category background"
              />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-primary group-hover:neon-glow-primary transition-all">
                  {IconComponent && <IconComponent className="text-white w-6 h-6" />}
                </div>
                <span className="text-white font-bold text-lg">{cat.name}</span>
              </div>
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
