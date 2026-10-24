import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './site.config';

const categorySlugs = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

const berita = defineCollection({
  loader: glob({ base: './src/content/berita', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(110),
      description: z.string().min(50).max(170),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum(categorySlugs),
      tags: z.array(z.string()).default([]),
      author: reference('penulis'),
      location: z.string().optional(),
      // Opsional: kalau kosong, otomatis pakai src/assets/cover-default.jpg (lihat src/lib/cover.ts).
      cover: image().optional(),
      coverAlt: z.string().optional(),
      coverCaption: z.string().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const penulis = defineCollection({
  loader: file('./src/data/penulis.json'),
  schema: z.object({
    name: z.string(),
    type: z.enum(['Person', 'Organization']).default('Person'),
    role: z.string(),
    bio: z.string(),
    sameAs: z.array(z.url()).default([]),
  }),
});

export const collections = { berita, penulis };
