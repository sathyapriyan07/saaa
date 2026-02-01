import { NextRequest, NextResponse } from 'next/server';
import { searchTitles, searchPeople, searchCollections } from '../../../services/search.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'titles';
    let data;
    if (type === 'titles') data = await searchTitles(query);
    else if (type === 'people') data = await searchPeople(query);
    else if (type === 'collections') data = await searchCollections(query);
    else throw new Error('Invalid search type');
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('GET /api/search error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
