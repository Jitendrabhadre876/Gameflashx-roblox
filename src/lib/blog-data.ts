
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  relatedGameIds: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "top-10-offline-games-android",
    title: "Top 10 Offline Games for Android in 2024",
    excerpt: "Discover the best offline gaming experiences you can enjoy anywhere, no internet connection required.",
    date: "March 15, 2024",
    author: "Gaming Guru",
    category: "Guides",
    image: "https://picsum.photos/seed/blog1/800/450",
    relatedGameIds: ["neon-strike", "elder-realms"],
    content: `
      <h2>The Rise of High-Quality Offline Gaming</h2>
      <p>In an era where everything is connected, sometimes you just want to unplug and play. Whether you're on a flight, commuting, or in a dead zone, these top 10 offline games provide premium entertainment without the need for a data connection.</p>
      
      <h3>1. Neon Strike: 2077</h3>
      <p>A masterpiece of cyberpunk storytelling. This game proves that offline mobile games can rival console experiences in depth and visual fidelity.</p>
      
      <h3>2. Elder Realms</h3>
      <p>An expansive open-world fantasy RPG that lets you explore massive landscapes and master complex magic systems entirely offline.</p>
      
      <p>Check out our full collection of offline games on Gameflashx to find your next adventure.</p>
    `
  },
  {
    slug: "best-racing-games-under-500mb",
    title: "Best Racing Games Under 500MB with High Graphics",
    excerpt: "Get high-octane racing action without sacrificing all your storage space. These games are light but powerful.",
    date: "March 12, 2024",
    author: "Speed Racer",
    category: "Racing",
    image: "https://picsum.photos/seed/blog2/800/450",
    relatedGameIds: ["nitro-overload", "stellar-void"],
    content: `
      <h2>Performance Meets Efficiency</h2>
      <p>Not everyone has a device with 512GB of storage. We've curated a list of racing titles that deliver stunning graphics and realistic physics while keeping the file size under 500MB.</p>
      
      <h3>Nitro Overload</h3>
      <p>One of the most efficient racing engines we've seen. It offers deep customization and realistic street racing mechanics at a fraction of the size of its competitors.</p>
      
      <p>Gaming doesn't have to be heavy. Download these optimized titles today on Gameflashx.</p>
    `
  },
  {
    slug: "high-graphics-games-low-end-devices",
    title: "High Graphics Games for Low End Devices",
    excerpt: "Think you can't play the best looking games on an older phone? Think again. These titles are optimized for every device.",
    date: "March 10, 2024",
    author: "Tech Titan",
    category: "Optimization",
    image: "https://picsum.photos/seed/blog3/800/450",
    relatedGameIds: ["ghost-protocol", "stellar-void"],
    content: `
      <h2>Gaming for Everyone</h2>
      <p>Accessibility is key in the modern gaming landscape. We believe everyone should enjoy premium visuals regardless of their hardware budget.</p>
      
      <h3>Optimization Secrets</h3>
      <p>Games like Ghost Protocol use clever rendering techniques to provide a beautiful experience on devices with as little as 4GB of RAM. It's all about the developers' dedication to performance tuning.</p>
    `
  }
];
