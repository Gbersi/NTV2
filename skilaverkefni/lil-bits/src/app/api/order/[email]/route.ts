// src/app/api/order/[email]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { findOrder } from '../../../../lib/data';
import type { Order } from '../../../../types';

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const email = decodeURIComponent(params.email);
  const order = findOrder(email);
  if (!order) {
    return NextResponse.json({ success: false }, { status: 404 });
  }
  return NextResponse.json({ success: true, order });
}
