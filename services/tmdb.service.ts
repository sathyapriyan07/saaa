// TMDB Service

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function tmdbFetch(endpoint: string, params: Record<string, any> = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', TMDB_API_KEY ?? '');
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('TMDB fetch failed');
  return res.json();
}

export async function searchMovies(query: string) {
  return tmdbFetch('/search/movie', { query });
}

export async function searchSeries(query: string) {
  return tmdbFetch('/search/tv', { query });
}

export async function searchPeople(query: string) {
  return tmdbFetch('/search/person', { query });
}
