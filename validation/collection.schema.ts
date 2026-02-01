import { z } from 'zod';

export const CollectionSchema = z.object({
  name: z.string().min(1),
  overview: z.string().optional(),
  tmdb_id: z.number().optional(),
  poster_url: z.string().url().optional(),
});
