"use client";

import Link from "next/link";
import { Search, Gamepad2, Menu, X, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [isVerified, setIsVerified] = useState(false);

  // Sync with localStorage to show verified username
  useEffect(() => {
    const checkUser = () => {
      const savedName = localStorage.getItem('gameflash_user');
      if (savedName) {
        setUserName(savedName);
        setIsVerified(true);
      } else {
        setUserName("Guest");
        setIsVerified(false);
      }
    };

    checkUser();
    // Listen for storage changes in other tabs or local triggers
    window.addEventListener('storage', checkUser);
    const interval = setInterval(checkUser, 1000); // Polling for same-tab updates

    return () => {
      window.removeEventListener('storage', checkUser);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: "Store", href: "/" },
    { name: "Free Rewards", href: "/free-robux", hot: true },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10 h-20 px-4 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-6 lg:gap-10">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow-primary group-hover:scale-110 transition-transform">
            <Gamepad2 className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white font-headline uppercase hidden xs:block">
            GAME<span className="text-primary">FLASHX</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-[11px] font-black uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={cn(
                "hover:text-primary transition-colors flex items-center gap-1.5",
                link.hot ? "text-[#00B06F]" : "text-white/70"
              )}
            >
              {link.name}
              {link.hot && (
                <span className="bg-[#00B06F] text-white text-[7px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 animate-pulse">
                  <Flame className="w-2 h-2" /> HOT
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden md:flex items-center gap-3 bg-white/5 pl-2 pr-4 py-1.5 rounded-full border border-white/10">
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border border-primary/30">
            {userName[0]?.toUpperCase()}
          </div>
          <span className="text-xs font-black text-white flex items-center gap-1">
            {userName} {isVerified && <span className="text-primary">✓</span>}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" className="lg:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
          <Button className="hidden sm:flex bg-primary hover:bg-primary/80 text-primary-foreground font-black rounded-full neon-glow-primary px-6 h-10 text-xs">
            DESKTOP APP
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-5 lg:hidden animate-in slide-in-from-top-5 duration-300">
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {userName[0]?.toUpperCase()}
            </div>
            <span className="font-black text-white">
              {userName} {isVerified && <span className="text-primary">✓</span>}
            </span>
          </div>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={cn(
                "text-lg font-black uppercase tracking-tight flex items-center justify-between",
                link.hot ? "text-[#00B06F]" : "text-white"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
              {link.hot && <span className="bg-[#00B06F] text-white text-[9px] px-2 py-1 rounded-full">HOT REWARDS</span>}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
