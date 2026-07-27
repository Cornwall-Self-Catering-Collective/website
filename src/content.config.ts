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

const homepage = defineCollection({
  loader: glob({ pattern: "index.md", base: "./src/content/homepage" }),
  schema: z.object({
    pageTitle: z.string(),
    seoDescription: z.string(),
    heroEyebrow: z.string(),
    heroHeading: z.string(),
    missionEyebrow: z.string(),
    missionHeading: z.string(),
    missionParagraphOne: z.string(),
    missionParagraphTwo: z.string(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: "index.md", base: "./src/content/about" }),
  schema: z.object({
    pageTitle: z.string(),
    seoDescription: z.string(),
    heroEyebrow: z.string(),
    heroHeading: z.string(),
    introParagraphOne: z.string(),
    introParagraphTwo: z.string(),
    standForHeading: z.string(),
    standForItems: z.array(z.string()).min(1),
  }),
});

export const collections = { articles, homepage, about };
