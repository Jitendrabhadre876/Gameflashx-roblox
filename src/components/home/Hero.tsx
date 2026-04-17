
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";
import { MOCK_GAMES } from "@/lib/games";
import Link from "next/link";

interface Particle {
  id: number;
  width: string;
  height: string;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const featuredGames = MOCK_GAMES.slice(0, 3);

  useEffect(() => {
    setMounted(true);
    
    // Timer for slides
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
    }, 8000);

    // Generate random particles only on the client after hydration
    const generatedParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      width: Math.random() * 6 + 'px',
      height: Math.random() * 6 + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animationDelay: Math.random() * 5 + 's',
      animationDuration: Math.random() * 10 + 10 + 's'
    }));
    setParticles(generatedParticles);

    return () => clearInterval(timer);
  }, [featuredGames.length]);

  const activeGame = featuredGames[currentIndex];

  return (
    <section className="relative h-[90vh] md:h-[85vh] w-full overflow-hidden flex items-center pt-20">
      {/* Background Slides */}
      {featuredGames.map((game, idx) => (
        <div
          key={game.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={game.banner}
            alt={game.name}
            fill
            className="object-cover brightness-50"
            priority={idx === 0}
            data-ai-hint="game banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-2">
             <div className="h-[2px] w-12 bg-primary" />
             <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Featured Today</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight font-headline">
            {activeGame.name.split(':').map((part, i) => (
              <span key={i} className={i === 1 ? "text-primary block" : ""}>{part}</span>
            ))}
          </h1>
          
          <p className="text-white/70 text-lg line-clamp-2 md:line-clamp-3 leading-relaxed">
            {activeGame.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href={`/game/${activeGame.id}`}>
              <Button size="lg" className="h-14 px-10 bg-primary hover:bg-primary/80 text-primary-foreground font-bold rounded-full neon-glow-primary gap-2 text-lg">
                <Play className="fill-current w-5 h-5" /> Download Now
              </Button>
            </Link>
            <Link href="/category/action">
              <Button size="lg" variant="outline" className="h-14 px-10 border-white/20 hover:bg-white/10 text-white font-bold rounded-full gap-2 text-lg backdrop-blur-md">
                Browse Games <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Particles Effect (Deferred until particles are set on client) */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        {mounted && particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-primary/20 animate-float"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration
            }}
          />
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 right-6 md:right-12 z-30 flex gap-4">
        {featuredGames.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 transition-all duration-300 rounded-full ${
              idx === currentIndex ? "w-12 bg-primary" : "w-6 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
