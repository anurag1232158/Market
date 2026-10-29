import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const phone = req.nextUrl.searchParams.get("phone");
  const db = await readDb();
  const list = db.customer || [];

  if (id) {
    const item = list.find((c: any) => c.id === id);
    return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (phone) {
    const item = list.find((c: any) => c.number === phone);
    return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ customer: list });
}

export async function POST(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = {
    id: randomUUID(),
    name: body.name || "",
    email: body.email || "",
    number: body.number || "",
    altNumber: body.altNumber || "",
    type: body.type || "Retail",
    company: body.company || "",
    gst: body.gst || "",
    address: body.address || "",
    city: body.city || "",
    state: body.state || "",
    country: body.country || "India",
    pin: body.pin || "",
    status: body.status || "Active",
    creditLimit: body.creditLimit || "0",
    totalOrders: body.totalOrders || "0",
    totalSpent: body.totalSpent || "0",
    notes: body.notes || "",
    image: body.image || "",
    createdAt: body.createdAt || new Date().toISOString(),
    updatedAt: body.updatedAt || new Date().toISOString(),
  };

  await updateDb((db: any) => {
    if (!Array.isArray(db.customer)) db.customer = [];
    db.customer.push(item);
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
    if (!Array.isArray(db.customer)) db.customer = [];
    const idx = db.customer.findIndex((c: any) => c.id === id);
    if (idx !== -1) {
      db.customer[idx] = { ...db.customer[idx], ...body, id, updatedAt: new Date().toISOString() };
      updated = db.customer[idx];
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
    if (!Array.isArray(db.customer)) db.customer = [];
    db.customer = db.customer.filter((c: any) => c.id !== id);
  });

  return NextResponse.json({ success: true });
}