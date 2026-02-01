import { z } from 'zod';

export const PersonSchema = z.object({
  name: z.string().min(1),
  biography: z.string().optional(),
  birth_date: z.string().optional(),
  tmdb_id: z.number().optional(),
  image_url: z.string().url().optional(),
});

export const PersonUpdateSchema = PersonSchema.partial();
