import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    excerpt: z.string(),
    order: z.number().int().positive(),
    published: z.boolean().default(true),
  }),
});

export const collections = { articles };
