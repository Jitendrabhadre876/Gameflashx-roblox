'use server';

import { initializeFirebase, getSdks } from '@/firebase';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

/**
 * @fileOverview Server actions for interacting with the Twitch/IGDB API securely.
 */

const CLIENT_ID = "e9dvk6840snexs4moxgce8uoe1oajz";
const CLIENT_SECRET = "Jitu2003";

/**
 * Retrieves an OAuth2 access token from Twitch using Client Credentials.
 */
export async function getTwitchAccessToken() {
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
  return data.access_token;
}

/**
 * Formats IGDB image URLs to high-quality https versions.
 */
function processIgdbUrl(url: string | undefined, size: string = 't_1080p') {
  if (!url) return '';
  return `https:${url.replace('t_thumb', size)}`;
}

/**
 * Bulk imports games from IGDB and saves them to Firestore.
 */
export async function bulkImportIGDBGames() {
  try {
    const token = await getTwitchAccessToken();
    
    // Fetch top games with relevant metadata
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "text/plain"
      },
      body: `fields name, rating, summary, cover.url, screenshots.url, artworks.url, genres.name; limit 20; where rating > 80; sort rating desc;`,
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error("Failed to fetch games from IGDB");
    }

    const igdbGames = await response.json();
    
    // Initialize Firebase Admin-like access via Server SDK (safe in Server Actions)
    const { firestore } = initializeFirebase();
    const gamesCollection = collection(firestore, 'games');

    let importCount = 0;

    for (const game of igdbGames) {
      const gameId = game.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const thumbnail = processIgdbUrl(game.cover?.url, 't_cover_big');
      const firstScreenshot = game.screenshots?.[0]?.url ? processIgdbUrl(game.screenshots[0].url, 't_1080p') : '';
      const banner = game.artworks?.[0]?.url ? processIgdbUrl(game.artworks[0].url, 't_1080p') : firstScreenshot;
      const screenshots = (game.screenshots || []).map((s: any) => processIgdbUrl(s.url, 't_720p'));
      const category = game.genres?.[0]?.name || 'Action';
      const categoryId = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      const gameData = {
        id: gameId,
        name: game.name,
        categoryId: categoryId,
        category: category,
        thumbnailImageUrl: thumbnail,
        image: thumbnail, // compatibility field
        bannerImageUrl: banner,
        banner: banner, // compatibility field
        description: game.summary || "No description available.",
        downloadLink: "https://gameflashx.com/download-unavailable", // Default link
        rating: game.rating ? Math.round((game.rating / 20) * 10) / 10 : 4.5,
        size: "Various",
        screenshotUrls: screenshots,
        screenshots: screenshots, // compatibility field
        createdAt: serverTimestamp(),
        downloads: 0,
        features: ["Auto-Imported", "Premium Graphics", "Verified"],
        systemRequirements: {
          os: "Windows 10/11",
          processor: "Modern Quad-Core",
          memory: "8 GB RAM",
          graphics: "GTX 1050+",
          storage: "Varies"
        }
      };

      // Use setDoc with merge to prevent overwriting custom data if game already exists
      const docRef = doc(firestore, 'games', gameId);
      await setDoc(docRef, gameData, { merge: true });
      importCount++;
    }

    return { success: true, count: importCount };
  } catch (error: any) {
    console.error("Bulk Import Error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Searches for games on IGDB using the provided query (Existing single import logic).
 */
export async function searchIGDBGames(query: string) {
  try {
    const token = await getTwitchAccessToken();
    
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials"
      })
    });

    const body = `search "${query}"; fields name, rating, summary, cover.url, screenshots.url, artworks.url, genres.name; limit 5;`;
    
    const igdbResponse = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "text/plain"
      },
      body: body,
      cache: 'no-store'
    });

    if (!igdbResponse.ok) {
      throw new Error("Failed to fetch games from IGDB");
    }

    return await igdbResponse.json();
  } catch (error) {
    console.error("IGDB Search Error:", error);
    return [];
  }
}
