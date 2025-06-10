// src/app/api/update-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { updateOrder } from '../data';
import type { Order } from '../../../types';

export async function PUT(req: NextRequest) {
  const order: Order = await req.json();
  const updated = updateOrder(order);
  if (!updated) {
    return NextResponse.json({ success: false }, { status: 404 });
  }
  return NextResponse.json({ success: true, order: updated });
}
