import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const orderNo = req.nextUrl.searchParams.get("orderNo");
  const paymentId = req.nextUrl.searchParams.get("paymentId");
  const db = await readDb();
  const list = db.payment || [];

  if (id) {
    const item = list.find((p: any) => p.id === id);
    return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (orderNo) {
    const items = list.filter((p: any) => p.orderNo === orderNo);
    return NextResponse.json({ payment: items });
  }
  if (paymentId) {
    const item = list.find((p: any) => p.paymentId === paymentId);
    return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ payment: list });
}

export async function POST(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = {
    id: randomUUID(),
    paymentId: body.paymentId || "PAY-" + Date.now().toString().slice(-8),
    orderNo: body.orderNo || "",
    orderId: body.orderId || "",
    customerName: body.customerName || "",
    customerPhone: body.customerPhone || "",
    customerEmail: body.customerEmail || "",
    customerType: body.customerType || "Retail",
    amount: body.amount || "0",
    currency: body.currency || "INR",
    method: body.method || "UPI",
    type: body.type || "Full",
    status: body.status || "Pending",
    transactionRef: body.transactionRef || "",
    bankName: body.bankName || "",
    upiId: body.upiId || "",
    cardLast4: body.cardLast4 || "",
    paymentDate: body.paymentDate || new Date().toISOString(),
    clearedDate: body.clearedDate || "",
    notes: body.notes || "",
    createdAt: body.createdAt || new Date().toISOString(),
    updatedAt: body.updatedAt || new Date().toISOString(),
  };

  await updateDb((db: any) => {
    if (!Array.isArray(db.payment)) db.payment = [];
    db.payment.push(item);
  });

  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const body = await req.json();
  let updated: any = null;

  await updateDb((db: any) => {
    if (!Array.isArray(db.payment)) db.payment = [];
    const idx = db.payment.findIndex((p: any) => p.id === id);
    if (idx !== -1) {
      db.payment[idx] = { ...db.payment[idx], ...body, id, updatedAt: new Date().toISOString() };
      updated = db.payment[idx];
    }
  });

  return updated ? NextResponse.json(updated) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await updateDb((db: any) => {
    if (!Array.isArray(db.payment)) db.payment = [];
    db.payment = db.payment.filter((p: any) => p.id !== id);
  });

  return NextResponse.json({ success: true });
}