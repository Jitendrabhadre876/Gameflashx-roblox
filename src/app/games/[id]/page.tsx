
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GameDetailClient from "./GameDetailClient";
import { MOCK_GAMES } from "@/lib/games";
import { notFound } from "next/navigation";
import Script from "next/script";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = MOCK_GAMES.find(g => g.id === id);
  if (!game) return {};

  return {
    title: `Download ${game.name} APK Latest Version - Gameflashx`,
    description: `Download ${game.name} APK latest version for free. Fast download, no login required. Available on Gameflashx.`,
    openGraph: {
      title: game.name,
      description: game.description,
      images: [game.banner],
    },
  };
}

export default async function GameSEOPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = MOCK_GAMES.find(g => g.id === id);

  if (!game) {
    notFound();
  }

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "VideoGame"],
    "name": game.name,
    "operatingSystem": game.systemRequirements.os,
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
    "screenshot": game.screenshots[0] || game.image
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
        <GameDetailClient initialGame={game} />
      </main>
      <Footer />
    </div>
  );
}
