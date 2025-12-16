import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  // Schéma de validation (ça t'évite les erreurs si tu oublies une date par exemple)
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Nasticks'),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

export const collections = { blog };