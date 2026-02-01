import { NextRequest, NextResponse } from 'next/server';
import { getPersonById } from '../../../../services/people.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await getPersonById(id);
    if (!data) {
      return NextResponse.json({ success: false, message: 'Person not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('GET /api/people/[id] error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
