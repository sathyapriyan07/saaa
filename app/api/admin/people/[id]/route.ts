import { NextRequest, NextResponse } from 'next/server';
import { updatePerson } from '../../../../services/people.service';
import { PersonUpdateSchema } from '../../../../validation/person.schema';
import { getUser, getProfile, requireAdmin } from '../../../../lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUser(req);
    const profile = user ? await getProfile(user.id) : null;
    requireAdmin(profile);
    const body = await req.json();
    const parse = PersonUpdateSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ success: false, message: 'Validation error', errors: parse.error.errors }, { status: 400 });
    }
    const data = await updatePerson(params.id, parse.data);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('PUT /api/admin/people/[id] error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: error.message === 'Admin access required' ? 403 : 500 });
  }
}
