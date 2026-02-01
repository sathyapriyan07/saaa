import { z } from 'zod';

export const EpisodeSchema = z.object({
  season_id: z.string().min(1),
  episode_number: z.number().min(1),
  name: z.string().min(1),
  overview: z.string().optional(),
  tmdb_id: z.number().optional(),
});
