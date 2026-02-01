import { NextRequest, NextResponse } from 'next/server';
import { removeFromWatchlist } from '../../../../services/watchlist.service';
import { getUser, getProfile, requireUser } from '../../../../lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUser(req);
    const profile = user ? await getProfile(user.id) : null;
    requireUser(profile);
    const data = await removeFromWatchlist(params.id);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('DELETE /api/watchlist/[id] error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: error.message === 'User authentication required' ? 401 : 500 });
  }
}
