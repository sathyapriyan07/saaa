import { NextRequest, NextResponse } from 'next/server';
import { getCollections } from '../../../services/collections.service';

export async function GET(req: NextRequest) {
  try {
    const data = await getCollections();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('GET /api/collections error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
