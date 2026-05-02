import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const trips = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/trips" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    volume: z.string(),
    days: z.number(),
    route: z.string(),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    deck: z.string(),
    topics: z.array(z.string()),
    date: z.string(),
    readTime: z.string(),
    featured: z.boolean().default(false),
    wordCount: z.number().optional(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  }),
});

export const collections = { trips, research };