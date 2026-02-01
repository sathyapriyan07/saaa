// Titles Service
import { supabaseServer } from '../lib/supabase/server';
import { z } from 'zod';

export async function getAllTitles(filters: any, pagination: any, sort: any) {
  // ...implementation...
}
export async function getTitleById(id: string) {
  // ...implementation...
}
export async function getTrending() {
  // ...implementation...
}
export async function getPopular() {
  // ...implementation...
}
export async function getByCollection(collectionId: string) {
  // ...implementation...
}
export async function createTitle(data: any) {
  // ...implementation...
}
export async function updateTitle(id: string, data: any) {
  // ...implementation...
}
export async function deleteTitle(id: string) {
  // ...implementation...
}
export async function publishToggle(id: string, published: boolean) {
  // ...implementation...
}
// Joins: genres, title_genres, cast, crew, logos, media_uploads, collections
