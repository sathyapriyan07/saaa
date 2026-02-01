import { NextRequest, NextResponse } from 'next/server';
import { createSeason } from '../../../services/series.service';
import { SeasonSchema } from '../../../validation/season.schema';
import { getUser, getProfile, requireAdmin } from '../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await getUser(req);
    const profile = user ? await getProfile(user.id) : null;
    requireAdmin(profile);
    const body = await req.json();
    const parse = SeasonSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ success: false, message: 'Validation error', errors: parse.error.errors }, { status: 400 });
    }
    const data = await createSeason(parse.data);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('POST /api/admin/seasons error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: error.message === 'Admin access required' ? 403 : 500 });
  }
}
