
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto w-full">
        <header className="mb-12 space-y-4">
          <h1 className="text-5xl font-black text-white">About Gameflashx</h1>
          <p className="text-primary font-bold tracking-widest uppercase text-xs">Instant Game Downloads. Zero Limits.</p>
        </header>
        <div className="space-y-8 text-white/70 leading-relaxed text-lg">
          <p>
            Gameflashx is the world's most premium gaming marketplace, dedicated to bringing the best titles directly to your desktop with unmatched speed and zero barriers. 
          </p>
          <p>
            Founded in 2024, our mission is to simplify the gaming experience. We believe that playing the games you love shouldn't be complicated by forced accounts, heavy clients, or slow download speeds. 
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
             <div className="glass-morphism p-8 rounded-2xl space-y-4">
                <h3 className="text-2xl font-black text-white">Our Vision</h3>
                <p>To create a friction-less ecosystem where discovery meets instant gratification for gamers worldwide.</p>
             </div>
             <div className="glass-morphism p-8 rounded-2xl space-y-4">
                <h3 className="text-2xl font-black text-white">Our Tech</h3>
                <p>Powered by ultra-fast global CDN nodes and AI-driven curation, we ensure you spend less time searching and more time playing.</p>
             </div>
          </div>
          <h2 className="text-3xl font-black text-white">Why Choose Us?</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li>No Mandatory Login: Start downloading immediately.</li>
            <li>Premium Curation: Only the highest-rated titles make it to our storefront.</li>
            <li>Direct Infrastructure: Minimalist design, maximal performance.</li>
            <li>Global Reach: Accessible from anywhere in the world.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
