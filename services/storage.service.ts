// Storage Service


// Use the browser client for uploads (for client-side usage)
import { supabase } from '@/lib/supabase';


async function uploadToStorage(bucket: string, path: string, file: File) {
  // Use supabase.storage for client-side uploads
  const { data, error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) throw new Error(error.message);
  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(path);
  return publicUrlData && typeof publicUrlData === 'object' ? publicUrlData.publicUrl : undefined;
}

export async function uploadPoster(file: File) {
  return uploadToStorage('posters', `poster_${Date.now()}`, file);
}

export async function uploadBackdrop(file: File) {
  return uploadToStorage('backdrops', `backdrop_${Date.now()}`, file);
}

export async function uploadPersonImage(file: File) {
  return uploadToStorage('person_images', `person_${Date.now()}`, file);
}

export async function uploadLogo(file: File) {
  return uploadToStorage('logos', `logo_${Date.now()}`, file);
}
