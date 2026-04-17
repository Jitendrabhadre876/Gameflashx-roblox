# **App Name**: Gameflashx

## Core Features:

- Dynamic Homepage Display: Curate and display a cinematic banner with a featured game, horizontal scrolls for 'Top Downloads Today' and 'Editor’s Choice,' and a responsive grid for 'Trending Games.'
- Detailed Game Pages: Dedicated pages for each game showcasing large banner images, titles, ratings, descriptions, feature lists, system requirements, screenshot galleries, and a 'Download Now' button.
- Search & Filtering System: Implement a neon-glowing search bar and filters for categories, game size, and online/offline status, with instant, no-reload results.
- Seamless Game Downloads: Provide direct game downloads without requiring user login, coupled with toast notifications upon initiation and support for external affiliate download links.
- Game Data Management: Utilize Firestore to store and manage comprehensive game data including name, category, images, banner, description, download link, rating, size, and screenshots.
- AI-Powered Related Games Tool: A generative AI tool to intelligently suggest and curate a 'Related Games' section on game detail pages based on existing game metadata and user interaction patterns.
- Basic Monetization (Ad Placements): Integrate configurable ad placement slots between sections on the homepage and within game detail pages to support basic monetization efforts.

## Style Guidelines:

- Background color: Dark luxury deep blue-black (#070B14) to establish a premium, dark theme.
- Primary accent color: A vibrant electric cyan-blue (#55CEF7) for neon highlights, glowing elements, and interactive components, evoking a futuristic gaming feel.
- Secondary accent color: A striking neon purple (#BB4EF7) to complement the primary blue, used for subtle glowing edges, gradients, and secondary UI elements, maintaining an analogous and energetic aesthetic.
- Headlines and body font: 'Inter' (sans-serif) for its clean, modern, and premium readability, with emphasis on bold weights for strong hierarchy as requested.
- Minimalist and futuristic icons with subtle glowing or glassmorphic effects, particularly for interactive elements like download buttons, ratings, and filters, consistent with the neon aesthetic.
- A fluid and responsive layout, prioritizing full-width cinematic sections, horizontally scrolling content blocks, and adaptive grids, all structured around an 8px grid system for consistent spacing and strong visual hierarchy. Mobile-first design is a core principle.
- Dynamic animations include animated particles/fog in the hero section, interactive hover effects (scale, glow) for game cards and buttons, subtle floating animations for featured elements, a cursor glow effect, skeleton loading for dynamic content, and smooth page transitions for an ultra-premium user experience. Download actions will trigger a concise toast notification.