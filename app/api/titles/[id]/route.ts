import { NextRequest, NextResponse } from 'next/server';
import { getTitleById } from '../../../../services/titles.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await getTitleById(id);
    if (!data) {
      return NextResponse.json({ success: false, message: 'Title not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('GET /api/titles/[id] error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
