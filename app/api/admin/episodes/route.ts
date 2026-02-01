import { NextRequest, NextResponse } from 'next/server';
import { createEpisode } from '@/services/episodes.service';
import { EpisodeSchema } from '@/validation/episode.schema';
import { getUser, getProfile, requireAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await getUser(req);
    const profile = user ? await getProfile(user.id) : null;
    requireAdmin(profile);
    const body = await req.json();
    const parse = EpisodeSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ success: false, message: 'Validation error', errors: parse.error.issues }, { status: 400 });
    }
    const data = await createEpisode(parse.data);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('POST /api/admin/episodes error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: error.message === 'Admin access required' ? 403 : 500 });
  }
}
