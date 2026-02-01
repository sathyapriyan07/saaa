import { NextRequest, NextResponse } from 'next/server';
import { getHomeSectionsWithTitles } from '../../../services/home.service';

export async function GET() {
  try {
    const data = await getHomeSectionsWithTitles();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('GET /api/home error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
