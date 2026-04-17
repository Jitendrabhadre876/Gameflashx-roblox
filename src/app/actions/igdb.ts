'use server';

/**
 * @fileOverview Server actions for interacting with the Twitch/IGDB API.
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
 * Searches for games on IGDB using the provided query.
 */
export async function searchIGDBGames(query: string) {
  try {
    const token = await getTwitchAccessToken();
    
    // IGDB uses a custom query language in the POST body
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "text/plain"
      },
      body: `search "${query}"; fields name, rating, summary, cover.url, screenshots.url, artworks.url, genres.name; limit 5;`,
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error("Failed to fetch games from IGDB");
    }

    const games = await response.json();
    return games;
  } catch (error) {
    console.error("IGDB Search Error:", error);
    return [];
  }
}
