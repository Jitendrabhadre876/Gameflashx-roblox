'use server';

import { initializeFirebase } from '@/firebase';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

/**
 * @fileOverview Secure server actions for IGDB API integration.
 * Credentials are kept on the server to prevent exposure.
 */

const CLIENT_ID = "cf3jor2yo3pm2x0y542xg52tvz0riu";
const CLIENT_SECRET = "pgx4gcy75zbjjw8nimng0qjwe8p9fl";

/**
 * Retrieves an OAuth2 access token from Twitch.
 */
export async function getTwitchAccessToken() {
  console.log("Twitch Auth: Requesting access token...");
  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials"
    }),
    cache: 'no-store'
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to get Twitch access token");
  }
  console.log("Twitch Auth: Token acquired.");
  return data.access_token;
}

/**
 * Formats IGDB image URLs to high-quality https versions.
 */
function processIgdbUrl(url: string | undefined, size: string = 't_cover_big') {
  if (!url) return '';
  return `https:${url.replace('t_thumb', size)}`;
}

/**
 * Bulk imports games from IGDB and saves them to Firestore.
 */
export async function bulkImportIGDBGames() {
  try {
    const token = await getTwitchAccessToken();
    
    console.log("IGDB Fetch: Requesting top games...");
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "text/plain"
      },
      body: `fields name, rating, summary, cover.url, screenshots.url, genres.name; limit 20; where rating > 75 & cover != null; sort rating desc;`,
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error("Failed to fetch games from IGDB");
    }

    const igdbGames = await response.json();
    console.log(`IGDB Fetch: Received ${igdbGames.length} games.`);
    
    const { firestore } = initializeFirebase();
    let importCount = 0;

    for (const game of igdbGames) {
      const gameId = game.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const thumbnail = processIgdbUrl(game.cover?.url, 't_cover_big');
      const banner = game.screenshots?.[0]?.url 
        ? processIgdbUrl(game.screenshots[0].url, 't_1080p') 
        : thumbnail;
      const screenshots = (game.screenshots || []).map((s: any) => processIgdbUrl(s.url, 't_720p'));
      const category = game.genres?.[0]?.name || 'Action';

      const gameData = {
        id: gameId,
        name: game.name,
        categoryId: category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: category,
        thumbnailImageUrl: thumbnail,
        image: thumbnail,
        bannerImageUrl: banner,
        banner: banner,
        description: game.summary || "No description available.",
        downloadLink: "https://gameflashx.com/download-unavailable",
        rating: game.rating ? Math.round((game.rating / 20) * 10) / 10 : 4.5,
        size: "Varies",
        screenshotUrls: screenshots,
        screenshots: screenshots,
        createdAt: serverTimestamp(),
        downloads: 0,
        features: ["Auto-Imported", "Premium Graphics", "Verified"],
        systemRequirements: {
          os: "Windows 10/11",
          processor: "Modern CPU",
          memory: "8 GB RAM",
          graphics: "DirectX 12 Compatible",
          storage: "Varies"
        }
      };

      const docRef = doc(firestore, 'games', gameId);
      await setDoc(docRef, gameData, { merge: true });
      importCount++;
      console.log(`Firestore Write: ${game.name} saved.`);
    }

    return { success: true, count: importCount };
  } catch (error: any) {
    console.error("Bulk Import Error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Searches for a specific game on IGDB.
 */
export async function searchIGDBGames(query: string) {
  try {
    const token = await getTwitchAccessToken();
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "text/plain"
      },
      body: `search "${query}"; fields name, rating, summary, cover.url, screenshots.url, genres.name; limit 5;`,
      cache: 'no-store'
    });

    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("IGDB Search Error:", error);
    return [];
  }
}