
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
  os: "Windows 10 64-bit",
  processor: "Intel Core i5-8400 / AMD Ryzen 5 1600",
  memory: "8 GB RAM",
  graphics: "NVIDIA GeForce GTX 1060 / AMD Radeon RX 580",
  storage: "50 GB available space"
};

export const MOCK_GAMES: Game[] = [
  {
    id: "neon-strike",
    name: "Neon Strike: 2077",
    category: "Action",
    image: "https://picsum.photos/seed/game1/600/800",
    banner: "https://picsum.photos/seed/hero1/1920/1080",
    description: "Dive into a sprawling cyberpunk metropolis where high-tech meets low-life. neon Strike 2077 is an action-packed RPG that challenges your reflexes and your conscience in a world where everything is for sale.",
    features: [
      "Open-world exploration of Night City",
      "Dynamic combat system with cybernetic upgrades",
      "Deep narrative with multiple branching paths",
      "High-fidelity neon aesthetics"
    ],
    systemRequirements: defaultReqs,
    screenshots: [
      "https://picsum.photos/seed/ss1/1280/720",
      "https://picsum.photos/seed/ss2/1280/720",
      "https://picsum.photos/seed/ss3/1280/720"
    ],
    rating: 4.8,
    size: "65 GB",
    downloadLink: "#",
    isEditorsChoice: true,
    isTopDownload: true
  },
  {
    id: "stellar-void",
    name: "Stellar Void",
    category: "Action",
    image: "https://picsum.photos/seed/game2/600/800",
    banner: "https://picsum.photos/seed/hero2/1920/1080",
    description: "Battle for survival in the furthest reaches of the galaxy. Customise your starfighter, engage in epic dogfights, and uncover the mystery of the Void.",
    features: [
      "Procedurally generated star systems",
      "Intense space dogfights",
      "Ship customization and upgrades",
      "Interstellar trading and diplomacy"
    ],
    systemRequirements: defaultReqs,
    screenshots: [
      "https://picsum.photos/seed/ss4/1280/720",
      "https://picsum.photos/seed/ss5/1280/720"
    ],
    rating: 4.5,
    size: "42 GB",
    downloadLink: "#",
    isTrending: true
  },
  {
    id: "nitro-overload",
    name: "Nitro Overload",
    category: "Racing",
    image: "https://picsum.photos/seed/game3/600/800",
    banner: "https://picsum.photos/seed/hero3/1920/1080",
    description: "The ultimate illegal street racing experience. High-octane action, realistic physics, and deep car customization across a massive urban environment.",
    features: [
      "Over 100 customizable vehicles",
      "Realistic drift physics",
      "Online multiplayer championships",
      "Day/Night cycle with weather effects"
    ],
    systemRequirements: defaultReqs,
    screenshots: [
      "https://picsum.photos/seed/ss6/1280/720",
      "https://picsum.photos/seed/ss7/1280/720"
    ],
    rating: 4.9,
    size: "35 GB",
    downloadLink: "#",
    isTopDownload: true,
    isEditorsChoice: true
  },
  {
    id: "elder-realms",
    name: "Elder Realms",
    category: "Open World",
    image: "https://picsum.photos/seed/game4/600/800",
    banner: "https://picsum.photos/seed/game4banner/1920/1080",
    description: "A vast fantasy world awaits. Master magic, wield legendary blades, and conquer ancient dungeons in this definitive open-world RPG experience.",
    features: [
      "Infinite open world exploration",
      "Complex magic and alchemy systems",
      "Massive boss battles",
      "Living world with dynamic NPCs"
    ],
    systemRequirements: defaultReqs,
    screenshots: [
      "https://picsum.photos/seed/ss8/1280/720"
    ],
    rating: 4.7,
    size: "80 GB",
    downloadLink: "#",
    isTrending: true
  },
  {
    id: "ghost-protocol",
    name: "Ghost Protocol",
    category: "Battle Royale",
    image: "https://picsum.photos/seed/game5/600/800",
    banner: "https://picsum.photos/seed/game5banner/1920/1080",
    description: "100 players. One island. Unlimited stealth options. Use advanced gadgets and tactical positioning to be the last ghost standing.",
    features: [
      "Stealth-focused battle royale mechanics",
      "Tactical gadgets and drones",
      "Destructible environments",
      "Squad-based competitive play"
    ],
    systemRequirements: defaultReqs,
    screenshots: [],
    rating: 4.6,
    size: "28 GB",
    downloadLink: "#",
    isTrending: true,
    isTopDownload: true
  }
];

export const CATEGORIES = [
  { name: "Action", slug: "action", icon: "Sword", imageId: "cat-action" },
  { name: "Battle Royale", slug: "battle-royale", icon: "Crosshair", imageId: "game-2" },
  { name: "Racing", slug: "racing", icon: "CarFront", imageId: "cat-racing" },
  { name: "Open World", slug: "open-world", icon: "Map", imageId: "game-4" },
  { name: "Offline Games", slug: "offline", icon: "WifiOff", imageId: "game-5" }
];
