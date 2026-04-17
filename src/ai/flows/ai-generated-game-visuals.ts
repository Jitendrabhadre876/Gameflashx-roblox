'use server';
/**
 * @fileOverview A Genkit flow for generating game thumbnail and banner image suggestions.
 *
 * - aiGeneratedGameVisuals - A function that generates image suggestions based on game details.
 * - AIGeneratedGameVisualsInput - The input type for the aiGeneratedGameVisuals function.
 * - AIGeneratedGameVisualsOutput - The return type for the aiGeneratedGameVisuals function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIGeneratedGameVisualsInputSchema = z.object({
  gameTitle: z.string().describe('The title of the game.'),
  gameDescription: z.string().describe('A brief description of the game.'),
  gameGenre: z.string().describe("The genre of the game, e.g., 'Action', 'RPG', 'Racing'."),
});
export type AIGeneratedGameVisualsInput = z.infer<typeof AIGeneratedGameVisualsInputSchema>;

const AIGeneratedGameVisualsOutputSchema = z.object({
  thumbnailUrl: z.string().describe('Data URI of the generated game thumbnail image.'),
  bannerUrl: z.string().describe('Data URI of the generated game banner image.'),
});
export type AIGeneratedGameVisualsOutput = z.infer<typeof AIGeneratedGameVisualsOutputSchema>;

// Define schema for input to the prompt generator
const ImagePromptGeneratorInputSchema = z.object({
  gameTitle: z.string().describe('The title of the game.'),
  gameDescription: z.string().describe('A brief description of the game.'),
  gameGenre: z.string().describe("The genre of the game, e.g., 'Action', 'RPG', 'Racing'."),
});

// Define schema for output of the prompt generator
const ImagePromptGeneratorOutputSchema = z.object({
  thumbnailPrompt: z
    .string()
    .describe(
      'A highly detailed text prompt for an AI image generation model to create a game thumbnail, incorporating Gameflashx brand aesthetics.'
    ),
  bannerPrompt: z
    .string()
()
    .describe(
      'A highly detailed text prompt for an AI image generation model to create a game banner, incorporating Gameflashx brand aesthetics.'
    ),
});

// Prompt to generate detailed image generation prompts for Imagen
const imagePromptGeneratorPrompt = ai.definePrompt({
  name: 'generateGameVisualPrompts',
  input: { schema: ImagePromptGeneratorInputSchema },
  output: { schema: ImagePromptGeneratorOutputSchema },
  prompt: `You are an expert AI art director for a premium gaming marketplace called "Gameflashx". Your task is to generate highly detailed and evocative text prompts for an AI image generation model (like Imagen 4) to create a game thumbnail and a game banner.

The "Gameflashx" brand identity is:
- Theme: Ultra-premium, futuristic gaming platform.
- Colors: Dark luxury background (#070B14), vibrant electric cyan-blue (#55CEF7) and neon purple (#BB4EF7) accents.
- Style: Glassmorphism, Liquid Glass UI, smooth gradients, glowing edges, depth shadows.
- Typography: Clean, premium typography (like Inter Bold) implied through visual style.
- Effects: Animated particles, fog, subtle glowing elements.

For the THUMBNAIL prompt, incorporate these specific visual requirements:
- A centered 3D game cover aesthetic.
- A dark neon background, blending electric blue and neon purple.
- A subtle black gradient overlay from the left side.
- A prominent central space for the game title "{{{gameTitle}}}", rendered in a bold, glowing, futuristic font.
- Integrated design elements that visually suggest small rating and size icons without depicting specific text.
- A glowing, futuristic button-like element, visually hinting at a "Download Now" action, but without explicit text.
- Subtle fog and dynamic lighting for depth.
- The overall look should be ultra-premium and captivating, suitable for a digital game store.

For the BANNER prompt, focus on a full-width cinematic scene that captures the essence of the game. It should be dynamic, visually striking, and adhere to the Gameflashx brand aesthetics:
- Wide aspect ratio, suitable for a header banner.
- Reflect the core themes and action of "{{{gameDescription}}}" and "{{{gameGenre}}}".
- Utilize the dark luxury background with vibrant electric cyan-blue and neon purple accents.
- Incorporate glassmorphism, liquid glass UI elements, smooth gradients, and glowing edges.
- Dynamic lighting and atmospheric effects like fog to create depth and a futuristic feel.

Game Details:
Title: {{{gameTitle}}}
Description: {{{gameDescription}}}
Genre: {{{gameGenre}}}

Generate the thumbnail prompt and banner prompt that an AI image generation model can directly use to create these visuals. Ensure the prompts are extremely descriptive of visual elements, lighting, composition, and brand aesthetic.
`,
});

export async function aiGeneratedGameVisuals(
  input: AIGeneratedGameVisualsInput
): Promise<AIGeneratedGameVisualsOutput> {
  return aiGeneratedGameVisualsFlow(input);
}

const aiGeneratedGameVisualsFlow = ai.defineFlow(
  {
    name: 'aiGeneratedGameVisualsFlow',
    inputSchema: AIGeneratedGameVisualsInputSchema,
    outputSchema: AIGeneratedGameVisualsOutputSchema,
  },
  async (input) => {
    // Step 1: Generate descriptive prompts for image generation using Gemini
    const { output: promptOutput } = await imagePromptGeneratorPrompt(input);
    if (!promptOutput) {
      throw new Error('Failed to generate image prompts.');
    }
    const { thumbnailPrompt, bannerPrompt } = promptOutput;

    // Step 2: Generate thumbnail and banner concurrently using Imagen 4
    const [thumbnailResponse, bannerResponse] = await Promise.all([
      ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: thumbnailPrompt,
      }),
      ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: bannerPrompt,
      }),
    ]);

    const thumbnailUrl = thumbnailResponse.media?.url;
    const bannerUrl = bannerResponse.media?.url;

    if (!thumbnailUrl || !bannerUrl) {
      throw new Error('Failed to generate one or both images.');
    }

    return { thumbnailUrl, bannerUrl };
  }
);
