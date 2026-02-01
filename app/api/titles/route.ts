import { NextRequest, NextResponse } from 'next/server';
import { getAllTitles } from '../../../services/titles.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filters = {};
    const pagination = {
      limit: Number(searchParams.get('limit')) || 20,
      offset: Number(searchParams.get('offset')) || 0,
    };
    const sort = searchParams.get('sort') || 'release_date';
    // Add more filter parsing as needed
    const data = await getAllTitles(filters, pagination, sort);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('GET /api/titles error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
