import { NextRequest, NextResponse } from 'next/server';
import { updateTitle, deleteTitle } from '../../../../services/titles.service';
import { TitleUpdateSchema } from '../../../../validation/title.schema';
import { getUser, getProfile, requireAdmin } from '../../../../lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUser(req);
    const profile = user ? await getProfile(user.id) : null;
    requireAdmin(profile);
    const body = await req.json();
    const parse = TitleUpdateSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ success: false, message: 'Validation error', errors: parse.error.errors }, { status: 400 });
    }
    const data = await updateTitle(params.id, parse.data);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('PUT /api/admin/titles/[id] error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: error.message === 'Admin access required' ? 403 : 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUser(req);
    const profile = user ? await getProfile(user.id) : null;
    requireAdmin(profile);
    const data = await deleteTitle(params.id);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('DELETE /api/admin/titles/[id] error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: error.message === 'Admin access required' ? 403 : 500 });
  }
}
