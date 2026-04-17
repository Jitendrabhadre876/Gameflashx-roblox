
import Link from "next/link";
import { Gamepad2, Twitter, Youtube, Github, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-white/5 pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Gamepad2 className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black text-white">GAMEFLASHX</span>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Instant Game Downloads. Zero Limits. The ultimate destination for premium digital games.
          </p>
          <div className="flex gap-4">
            <Twitter className="w-5 h-5 text-white/50 hover:text-primary cursor-pointer transition-colors" />
            <Youtube className="w-5 h-5 text-white/50 hover:text-primary cursor-pointer transition-colors" />
            <Github className="w-5 h-5 text-white/50 hover:text-primary cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 text-white/50 hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Marketplace</h4>
          <ul className="flex flex-col gap-4 text-sm text-white/50">
            <li><Link href="/" className="hover:text-primary">New Releases</Link></li>
            <li><Link href="/" className="hover:text-primary">Top Sellers</Link></li>
            <li><Link href="/" className="hover:text-primary">Free Games</Link></li>
            <li><Link href="/" className="hover:text-primary">Discounted</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="flex flex-col gap-4 text-sm text-white/50">
            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link href="/dmca" className="hover:text-primary">DMCA Policy</Link></li>
            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Newsletter</h4>
          <p className="text-sm text-white/50 mb-4">Get the latest updates on new game releases and sales.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-md px-4 py-2 text-sm w-full outline-none focus:border-primary" />
            <button className="bg-primary text-primary-foreground font-bold px-4 py-2 rounded-md hover:bg-primary/80 transition-colors">Join</button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
        <p>© 2024 Gameflashx. All rights reserved. Built for Gamers.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
