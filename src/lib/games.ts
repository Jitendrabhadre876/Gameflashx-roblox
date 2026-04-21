
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

const CLOUDINARY_CLOUD_NAME = 'dmafb7518';

/**
 * Generates an optimized Cloudinary URL.
 * Falls back to a placeholder if the ID is missing.
 */
export function getCloudinaryUrl(publicId: string | null | undefined, transform = 'q_auto,f_auto') {
  if (!publicId) return null;
  // If it's already a full URL, return it
  if (publicId.startsWith('http')) return publicId;
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transform}/${publicId}`;
}

const defaultReqs = {
  os: "Windows 10 64-bit / Mobile iOS/Android",
  processor: "Modern Multi-core Processor",
  memory: "4 GB RAM",
  graphics: "DirectX 12 / Vulkan Compatible",
  storage: "Varies per device"
};

const gameImages: Record<string, string> = {
  "Last Z: Survival Shooter": "https://res.cloudinary.com/dsvhgkwoh/image/upload/q_auto,f_auto/v1776702057/images_wn5onk.webp",
  "Bus Rush Fever!": "https://res.cloudinary.com/dsvhgkwoh/image/upload/q_auto,f_auto/v1776703340/caBiKRTVr57KEWAwIEH8mIXsjwrC19mfST9tLXizP1nPI3WdT5bJwXVSSQDb6HWLMKPkhVwLKHmA9PGAcrTZ_w256_erxqsf.png",
  "Magic Sort!": "https://res.cloudinary.com/dsvhgkwoh/image/upload/q_auto,f_auto/v1776703458/magic-sort_yff963.jpg",
  "Whiteout Survival": "https://res.cloudinary.com/dsvhgkwoh/image/upload/q_auto,f_auto/v1776703663/i5exLhLJam1LU33o0wluBBIOcTP2QDsiOGwKObDs7wM_gTyyqn-ErGhZXHzY1pfOJm-3o5q6Mw_s900-c-k-c0x00ffffff-no-rj_i9bvaq.jpg",
  "Yarn Loop: Knit Puzzle": "https://res.cloudinary.com/dsvhgkwoh/image/upload/q_auto,f_auto/v1776703808/350x350bb-2.jpg.79720a5f2923504b5a46a7eea418eb43_s3xgts.jpg",
  "LastWar: Survival": "https://res.cloudinary.com/dsvhgkwoh/image/upload/q_auto,f_auto/v1776704073/latest_qqaft3.png",
  "Summoners War: Sky Arena": "https://res.cloudinary.com/dsvhgkwoh/image/upload/q_auto,f_auto/v1776704199/summoners-war-sky-arena-button-1-1668057399826_yofj7l.jpg",
  "Airport Empire 2026": "https://res.cloudinary.com/dsvhgkwoh/image/upload/q_auto,f_auto/v1776704348/airport-empire_wfotzp.jpg",
  "Block Out! - Color Sort Puzzle": "https://res.cloudinary.com/dsvhgkwoh/image/upload/q_auto,f_auto/v1776704541/enlarged_iz5xrp.png",
  "Titan Quest: Ultimate Edition": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456586/144x144_9_qhbcfj.jpg",
  "Splashin": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456583/144x144_17_dlsxf8.jpg",
  "Tang Luck: Casino Slots": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776772397/images_2_bc4edy.jpg",
  "Arrowscapes™ - Arrows Puzzle": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456583/144x144_16_wgussk.jpg",
  "Earn to Die 2": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776772539/Earn_to_Die_2_Logo_b3h5hn.png",
  "Solitaire Associations Journey": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776772647/unnamed_mmdmhq.png",
  "Arrows GO!": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456583/144x144_14_ql8o97.jpg",
  "Pokémon TCG Pocket": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776772839/images_3_oxndre.jpg",
  "Arrow Maze-Tap Away": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456583/144x144_14_ql8o97.jpg",
  "Arrow Maze - Tap Away": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456583/144x144_14_ql8o97.jpg",
  "Poppy Playtime Chapter 4": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456582/144x144_20_vvpqhz.jpg",
  "Papa's Mocharia To Go!": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456582/144x144_21_n2qdqg.jpg",
  "Papa's Burgeria To Go!": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456582/144x144_21_n2qdqg.jpg",
  "Dark War: Survival": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456582/144x144_22_ksh1yf.jpg",
  "Sunday Lawn": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456582/144x144_23_mhzucr.jpg",
  "CloverPit": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456587/144x144_8_nk8bwl.jpg",
  "Magic Tiles 3: Piano Game": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456582/252x252_1_zehfje.jpg",
  "Papa's Paleteria To Go!": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456585/144x144_15_t2ma5w.jpg",
  "Crossword Go!": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456583/144x144_16_wgussk.jpg",
  "Word Search Explorer®": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456588/144x144_4_c5rxdc.jpg",
  "Papers, Please": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456588/144x144_5_rd8on4.jpg",
  "WhoLiked: Guess Likes Reposts": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456590/144x144_1_lqcn8d.jpg",
  "Candy Crush Saga": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456591/144x144_2_kthtk6.jpg",
  "Travel Town - Merge Adventure": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456589/144x144_3_tiuiyh.jpg",
  "Mini Metro": "https://res.cloudinary.com/dmafb7518/image/upload/q_auto,f_auto/v1776456582/144x144_18_rv9ccf.jpg"
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

export const MOCK_GAMES: Game[] = gameNames.map((name, index) => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const imageUrl = gameImages[name] || `https://picsum.photos/seed/${index + 100}/300/300`;
  
  return {
    id: slug,
    name: name,
    category: "Mobile Games",
    image: imageUrl,
    banner: imageUrl.replace('q_auto,f_auto', 'q_auto,f_auto,w_1280,h_720,c_fill'),
    description: `Experience the thrill of ${name}. A top-rated mobile gaming experience optimized for maximum performance and fun. Download the official version now.`,
    features: ["High-speed performance", "Offline support", "Premium rewards", "Easy to play"],
    systemRequirements: defaultReqs,
    screenshots: [
      imageUrl.replace('q_auto,f_auto', 'q_auto,f_auto,w_1280,h_720,c_fill')
    ],
    rating: 4.5 + (Math.random() * 0.5),
    size: (Math.floor(Math.random() * 500) + 100) + " MB",
    downloadLink: "https://Gameflashx.space/cl/i/grr84r",
    isTrending: index < 5,
    isTopDownload: index % 3 === 0
  };
});

export const CATEGORIES = [
  { name: "All Games", slug: "action", icon: "Gamepad2", imageId: "cat-action" },
  { name: "Top Charts", slug: "battle-royale", icon: "TrendingUp", imageId: "game-2" },
  { name: "New Releases", slug: "racing", icon: "Zap", imageId: "cat-racing" },
  { name: "Puzzle", slug: "open-world", icon: "Puzzle", imageId: "game-4" },
  { name: "Action", slug: "offline", icon: "Sword", imageId: "game-5" }
];
