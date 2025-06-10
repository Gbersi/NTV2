// src/app/api/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { addOrder } from '../data';
import type { Order } from '../../../types';

export async function POST(req: NextRequest) {
  const order: Order = await req.json();
  const saved = addOrder(order);
  return NextResponse.json({ success: true, order: saved });
}
