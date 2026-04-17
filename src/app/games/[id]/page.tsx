'use client';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GameDetailClient from "./GameDetailClient";
import { notFound, useParams } from "next/navigation";
import Script from "next/script";
import { useDoc, useFirebase, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

export default function GamePage() {
  const params = useParams();
  const { firestore } = useFirebase();
  const id = params.id as string;

  const gameRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'games', id);
  }, [firestore, id]);

  const { data: game, isLoading } = useDoc(gameRef);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070B14] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-white/50 font-black uppercase tracking-widest text-xs">Decrypting Assets...</p>
        </div>
      </div>
    );
  }

  if (!game) {
    notFound();
  }

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "VideoGame"],
    "name": game.name,
    "operatingSystem": game.systemRequirements?.os || "Windows 10/11",
    "applicationCategory": "GameApplication",
    "genre": game.category,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": game.rating,
      "bestRating": "5",
      "ratingCount": "100"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": game.description,
    "screenshot": game.screenshotUrls?.[0] || game.thumbnailImageUrl
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Script
        id="game-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-grow pt-20">
        <GameDetailClient initialGame={game as any} />
      </main>
      <Footer />
    </div>
  );
}