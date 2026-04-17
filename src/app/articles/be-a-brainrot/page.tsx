
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { 
  Gift, 
  History, 
  Gamepad2, 
  Keyboard, 
  Search, 
  AlertCircle, 
  Copy, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Enjoy Playing Be a Brainrot - All New Codes & Guide | Gameflashx",
  description: "Get the latest Be a Brainrot codes, learn how to redeem them, and discover unique gameplay tips in our comprehensive guide.",
};

export default function BrainrotArticlePage() {
  const codes = [
    { code: "BRAINROT", reward: "5000 Cash", isNew: true },
    { code: "RELEASE", reward: "10000 Cash", isNew: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#333] selection:bg-primary/20">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <article className="max-w-4xl mx-auto px-6 space-y-12">
          {/* Hero Image Section */}
          <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 group">
            <Image 
              src="https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1776454119/Be-a-Brainrot-codes_kqk3i1.jpg" 
              alt="Be a Brainrot Codes" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Title Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" /> Featured Game Guide
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[#111] tracking-tight leading-tight">
              Enjoy Playing Be a Brainrot
            </h1>
          </div>

          {/* Intro Text Card */}
          <div className="bg-[#F8F9FB] p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm leading-relaxed text-lg text-gray-600">
            <p>
              Steal a Brainrot? <span className="text-[#111] font-bold">Be a Brainrot</span> brings a twist to the same game mechanics, and it is genuinely fun. Instead of stealing brainrots, here you start as the brainrot. When captured by a player, you get to steal one of their brainrots and bring it to your base. This game is all about speed; the faster you are, the further you can go, and the quicker you can steal brainrots.
            </p>
          </div>

          {/* New Codes Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Gift className="text-green-500 w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-[#111]">All New Be a Brainrot Codes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {codes.map((item) => (
                <div key={item.code} className="group relative bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-2xl font-black text-[#111]">{item.code}</span>
                        {item.isNew && (
                          <span className="bg-green-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">NEW</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">{item.reward}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-50 text-gray-400 group-hover:text-primary">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Expired Codes Section */}
          <section className="bg-gray-50 p-8 rounded-3xl border border-dashed border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <History className="text-gray-400 w-5 h-5" />
              <h3 className="text-xl font-bold text-gray-500">Expired Be a Brainrot Codes</h3>
            </div>
            <p className="text-gray-400 text-sm italic">Currently, there are no expired codes.</p>
          </section>

          {/* Extra Games Section */}
          <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Gamepad2 className="text-blue-500 w-8 h-8" />
            </div>
            <div className="space-y-3">
              <p className="text-gray-600 leading-relaxed">
                Be a Brainrot is a unique twist to the genre. If you are bored, try games like <span className="font-bold text-[#111]">Jujutsu Zero</span>, <span className="font-bold text-[#111]">Bite by Night</span>, and <span className="font-bold text-[#111]">BloxStrike</span>. You can also explore more Roblox game codes on our site.
              </p>
            </div>
          </section>

          {/* Redemption Guide Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Keyboard className="text-orange-500 w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-[#111]">How to Redeem Be a Brainrot Codes</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Launch the game",
                "Open settings (top right)",
                "Enter code",
                "Press Enter"
              ].map((step, i) => (
                <div key={i} className="bg-[#F8F9FB] p-6 rounded-2xl border border-gray-50 relative overflow-hidden group">
                  <span className="absolute -bottom-4 -right-2 text-8xl font-black text-white group-hover:text-white/50 transition-colors">{i + 1}</span>
                  <p className="relative z-10 font-bold text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How to Get More & Troubleshooting Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Search className="text-primary w-5 h-5" />
                <h3 className="text-xl font-bold text-[#111]">How to Get More Codes</h3>
              </div>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary flex-shrink-0" /> Codes are released randomly by developers.</li>
                <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary flex-shrink-0" /> Bookmark this page for daily updates.</li>
                <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary flex-shrink-0" /> Check the official Discord server for updates.</li>
              </ul>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-destructive w-5 h-5" />
                <h3 className="text-xl font-bold text-[#111]">Why Codes Not Working?</h3>
              </div>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-destructive flex-shrink-0" /> Wrong input (watch out for accidental spaces).</li>
                <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-destructive flex-shrink-0" /> The code might have expired since our last update.</li>
              </ul>
            </section>
          </div>

          {/* Final CTA Section */}
          <div className="pt-12">
            <Link href="/free-robux" className="block">
              <Button className="w-full h-20 bg-gradient-to-r from-primary to-secondary hover:brightness-105 text-primary-foreground font-black text-2xl rounded-[1.5rem] shadow-xl shadow-primary/20 flex items-center justify-center gap-4 transition-all active:scale-95 group overflow-hidden relative">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Get Free Rewards Now</span>
                <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <p className="text-center text-gray-300 text-[10px] font-black uppercase tracking-[0.3em] mt-6">
              Official Partner Reward Distribution System
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
