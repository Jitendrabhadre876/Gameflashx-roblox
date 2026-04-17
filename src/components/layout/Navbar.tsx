
"use client";

import Link from "next/link";
import { Search, Gamepad2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b-white/5 h-20 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow-primary group-hover:scale-110 transition-transform">
            <Gamepad2 className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white font-headline uppercase">
            GAME<span className="text-primary">FLASHX</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-white/70">
          <Link href="/" className="hover:text-primary transition-colors">Store</Link>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link href="/category/action" className="hover:text-primary transition-colors">Categories</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6 w-1/3">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search games..." 
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary focus:ring-1 focus:ring-primary h-10 rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
        <Button className="hidden md:flex bg-primary hover:bg-primary/80 text-primary-foreground font-bold rounded-full neon-glow-primary px-8">
          Download Desktop
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 md:hidden">
          <Link href="/" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>Store</Link>
          <Link href="/blog" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          <Link href="/category/action" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>Categories</Link>
          <Link href="/about" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>About</Link>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
             <Input placeholder="Search..." className="pl-10 bg-white/5 border-white/10" />
          </div>
        </div>
      )}
    </nav>
  );
}
