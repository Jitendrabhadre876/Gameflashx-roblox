
"use client";

import { useEffect, useState } from "react";
import { Game, MOCK_GAMES } from "@/lib/games";
import GameCard from "./GameCard";
import { suggestRelatedGames } from "@/ai/flows/ai-powered-related-games-flow";

interface RelatedGamesProps {
  currentGame: Game;
}

export default function RelatedGames({ currentGame }: RelatedGamesProps) {
  const [relatedGames, setRelatedGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        setLoading(true);
        // Using the GenAI flow to suggest related games
        const result = await suggestRelatedGames({
          currentGameName: currentGame.name,
          currentGameDescription: currentGame.description,
          currentGameCategory: currentGame.category,
          currentGameFeatures: currentGame.features,
          availableGames: MOCK_GAMES.filter(g => g.id !== currentGame.id).map(g => ({
            name: g.name,
            description: g.description,
            category: g.category,
            features: g.features
          }))
        });

        // Map names back to actual game objects
        const suggested = MOCK_GAMES.filter(g => result.relatedGameNames.includes(g.name));
        
        // Fallback if AI doesn't find enough or fails
        if (suggested.length === 0) {
          setRelatedGames(MOCK_GAMES.filter(g => g.id !== currentGame.id && g.category === currentGame.category).slice(0, 4));
        } else {
          setRelatedGames(suggested);
        }
      } catch (error) {
        console.error("Failed to fetch related games:", error);
        // Silent fallback to same category
        setRelatedGames(MOCK_GAMES.filter(g => g.id !== currentGame.id && g.category === currentGame.category).slice(0, 4));
      } finally {
        setLoading(false);
      }
    }

    fetchRelated();
  }, [currentGame]);

  if (!loading && relatedGames.length === 0) return null;

  return (
    <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 border-t border-white/5">
      <div className="flex items-center justify-between mb-12">
        <div>
          <span className="text-primary font-bold tracking-widest uppercase text-xs">More Like This</span>
          <h2 className="text-4xl font-black text-white mt-2">Related Games</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-xl" />
          ))
        ) : (
          relatedGames.map((game) => (
            <GameCard key={game.id} game={game} variant="vertical" />
          ))
        )}
      </div>
    </section>
  );
}
