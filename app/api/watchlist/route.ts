import { NextRequest, NextResponse } from 'next/server';
import { addToWatchlist, getUserWatchlist } from '../../../services/watchlist.service';
import { getUser, getProfile, requireUser } from '../../../lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getUser(req);
    const profile = user ? await getProfile(user.id) : null;
    requireUser(profile);
    const data = await getUserWatchlist(user.id);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('GET /api/watchlist error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: error.message === 'User authentication required' ? 401 : 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUser(req);
    const profile = user ? await getProfile(user.id) : null;
    requireUser(profile);
    const body = await req.json();
    const { titleId } = body;
    if (!titleId) {
      return NextResponse.json({ success: false, message: 'Missing titleId' }, { status: 400 });
    }
    const data = await addToWatchlist(user.id, titleId);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('POST /api/watchlist error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: error.message === 'User authentication required' ? 401 : 500 });
  }
}
