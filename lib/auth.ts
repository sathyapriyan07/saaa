import { supabaseServer } from './supabase/server';

export async function getUser(req: any) {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return null;
  const { data, error } = await supabaseServer.auth.getUser(token);
  if (error) return null;
  return data.user;
}

export async function getProfile(userId: string) {
  const { data, error } = await supabaseServer
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data;
}

export function isAdmin(profile: any) {
  return profile?.role === 'admin';
}

export function requireAdmin(profile: any) {
  if (!isAdmin(profile)) throw new Error('Admin access required');
}

export function requireUser(profile: any) {
  if (!profile) throw new Error('User authentication required');
}
