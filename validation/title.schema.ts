import { z } from 'zod';

export const TitleSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['movie', 'series']),
  overview: z.string().optional(),
  release_date: z.string().optional(),
  tmdb_id: z.number().optional(),
  published: z.boolean().optional(),
  genres: z.array(z.string()).optional(),
  collection_id: z.string().optional(),
  poster_url: z.string().url().optional(),
  backdrop_url: z.string().url().optional(),
});

export const TitleUpdateSchema = TitleSchema.partial();
