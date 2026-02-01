// Import Service

import { supabaseServer } from '../lib/supabase/server';
import { searchMovies, searchSeries, searchPeople } from './tmdb.service';
import { uploadPoster, uploadBackdrop, uploadPersonImage } from './storage.service';

async function checkDuplicate(table: string, tmdbId: number) {
  const { data } = await supabaseServer.from(table).select('id').eq('tmdb_id', tmdbId).single();
  return !!data;
}

export async function importMovie(tmdbId: string) {
  if (await checkDuplicate('titles', Number(tmdbId))) throw new Error('Movie already exists');
  const tmdbData = await searchMovies(tmdbId);
  // Map fields and upload images
  // Example: const posterUrl = await uploadPoster(tmdbData.poster_path);
  // Insert into titles, genres, cast, crew, etc.
  // ...implementation details...
  return { success: true };
}

export async function importSeries(tmdbId: string) {
  if (await checkDuplicate('titles', Number(tmdbId))) throw new Error('Series already exists');
  const tmdbData = await searchSeries(tmdbId);
  // Map fields and upload images
  // Insert into titles, seasons, episodes, etc.
  // ...implementation details...
  return { success: true };
}

export async function importPerson(tmdbId: string) {
  if (await checkDuplicate('people', Number(tmdbId))) throw new Error('Person already exists');
  const tmdbData = await searchPeople(tmdbId);
  // Map fields and upload images
  // Insert into people, person_images, etc.
  // ...implementation details...
  return { success: true };
}
