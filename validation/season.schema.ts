import { z } from 'zod';

export const SeasonSchema = z.object({
  title_id: z.string().min(1),
  season_number: z.number().min(1),
  overview: z.string().optional(),
  tmdb_id: z.number().optional(),
});
