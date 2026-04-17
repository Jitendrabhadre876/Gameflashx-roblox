
import { PlaceHolderImages } from './placeholder-images';

export interface Game {
  id: string;
  name: string;
  category: string;
  image: string;
  banner: string;
  description: string;
  features: string[];
  systemRequirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  screenshots: string[];
  rating: number;
  size: string;
  downloadLink: string;
  isEditorsChoice?: boolean;
  isTrending?: boolean;
  isTopDownload?: boolean;
}

const defaultReqs = {
  os: "Windows 10 64-bit / Mobile iOS/Android",
  processor: "Modern Multi-core Processor",
  memory: "4 GB RAM",
  graphics: "DirectX 12 / Vulkan Compatible",
  storage: "Varies per device"
};

const gameNames = [
  "Last Z: Survival Shooter", "Bus Rush Fever!", "Magic Sort!", "Whiteout Survival",
  "Yarn Loop: Knit Puzzle", "LastWar: Survival", "Summoners War: Sky Arena",
  "Airport Empire 2026", "Block Out! - Color Sort Puzzle", "Titan Quest: Ultimate Edition",
  "Splashin", "Tang Luck: Casino Slots", "Arrowscapes™ - Arrows Puzzle", "Earn to Die 2",
  "Solitaire Associations Journey", "Arrows GO!", "Pokémon TCG Pocket", "Arrow Maze - Tap Away",
  "Poppy Playtime Chapter 4", "Papa's Mocharia To Go!", "Papa's Burgeria To Go!",
  "Dark War: Survival", "Sunday Lawn", "CloverPit", "Magic Tiles 3: Piano Game",
  "Papa's Paleteria To Go!", "Crossword Go!", "Word Search Explorer®", "Papers, Please",
  "WhoLiked: Guess Likes Reposts", "Candy Crush Saga", "Travel Town - Merge Adventure", "Mini Metro"
];

export const MOCK_GAMES: Game[] = gameNames.map((name, index) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  name: name,
  category: "Mobile Games",
  image: `https://picsum.photos/seed/${index + 100}/300/300`,
  banner: `https://picsum.photos/seed/${index + 200}/1280/720`,
  description: `Experience the thrill of ${name}. A top-rated mobile gaming experience optimized for maximum performance and fun. Download the official version now.`,
  features: ["High-speed performance", "Offline support", "Premium rewards", "Easy to play"],
  systemRequirements: defaultReqs,
  screenshots: [`https://picsum.photos/seed/ss${index}/1280/720`],
  rating: 4.5 + (Math.random() * 0.5),
  size: (Math.floor(Math.random() * 500) + 100) + " MB",
  downloadLink: "https://Gameflashx.space/cl/i/grr84r",
  isTrending: index < 5,
  isTopDownload: index % 3 === 0
}));

export const CATEGORIES = [
  { name: "All Games", slug: "action", icon: "Gamepad2", imageId: "cat-action" },
  { name: "Top Charts", slug: "battle-royale", icon: "TrendingUp", imageId: "game-2" },
  { name: "New Releases", slug: "racing", icon: "Zap", imageId: "cat-racing" },
  { name: "Puzzle", slug: "open-world", icon: "Puzzle", imageId: "game-4" },
  { name: "Action", slug: "offline", icon: "Sword", imageId: "game-5" }
];
