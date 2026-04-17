'use server';
/**
 * @fileOverview An AI agent that suggests related games based on a given game's metadata.
 *
 * - suggestRelatedGames - A function that handles the related game suggestion process.
 * - SuggestRelatedGamesInput - The input type for the suggestRelatedGames function.
 * - SuggestRelatedGamesOutput - The return type for the suggestRelatedGames function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestRelatedGamesInputSchema = z.object({
  currentGameName: z.string().describe('The name of the current game being viewed.'),
  currentGameDescription: z.string().describe('The description of the current game.'),
  currentGameCategory: z.string().describe('The main category of the current game.'),
  currentGameFeatures: z.array(z.string()).describe('A list of key features of the current game.'),
  availableGames: z.array(
    z.object({
      name: z.string().describe('The name of the available game.'),
      description: z.string().describe('The description of the available game.'),
      category: z.string().describe('The category of the available game.'),
      features: z.array(z.string()).describe('A list of key features of the available game.'),
    })
  ).describe('A list of all available games with their metadata for comparison.'),
});
export type SuggestRelatedGamesInput = z.infer<typeof SuggestRelatedGamesInputSchema>;

const SuggestRelatedGamesOutputSchema = z.object({
  relatedGameNames: z.array(z.string()).describe('A list of names of games that are similar to the current game.'),
});
export type SuggestRelatedGamesOutput = z.infer<typeof SuggestRelatedGamesOutputSchema>;

export async function suggestRelatedGames(input: SuggestRelatedGamesInput): Promise<SuggestRelatedGamesOutput> {
  return suggestRelatedGamesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelatedGamesPrompt',
  input: { schema: SuggestRelatedGamesInputSchema },
  output: { schema: SuggestRelatedGamesOutputSchema },
  prompt: `You are an expert game curator. Your task is to identify and suggest games that are similar to a given game from a list of available games.

Here is the current game's information:
Game Name: {{{currentGameName}}}
Description: {{{currentGameDescription}}}
Category: {{{currentGameCategory}}}
Features: {{#each currentGameFeatures}}- {{{this}}}\n{{/each}}

Here is a list of available games. Analyze their descriptions, categories, and features to find the most relevant related games. Do not suggest the current game itself.

Available Games:
{{#each availableGames}}
Game Name: {{{name}}}
Description: {{{description}}}
Category: {{{category}}}
Features: {{#each features}}- {{{this}}}\n{{/each}}

---
{{/each}}

Based on the current game and the available games, identify 3-5 related games. Return only the names of the related games as an array of strings. Ensure that the current game itself is not included in the suggested list.`,
});

const suggestRelatedGamesFlow = ai.defineFlow(
  {
    name: 'suggestRelatedGamesFlow',
    inputSchema: SuggestRelatedGamesInputSchema,
    outputSchema: SuggestRelatedGamesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
