import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const code = req.nextUrl.searchParams.get("code");
  const db = await readDb();
  const list = db.coupon || [];

  if (id) { const item = list.find((c: any) => c.id === id);
   return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (code) { const item = list.find((c: any) => c.code === code.toUpperCase());
  return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ coupon: list });
}

export async function POST(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const item = {
    id: randomUUID(),
    code: (body.code || "").toUpperCase().replace(/\s+/g, ""),
    title: body.title || "",
    description: body.description || "",
    type: body.type || "Percentage",
    value: body.value || "0",
    minOrder: body.minOrder || "0",
    maxDiscount: body.maxDiscount || "",
    usageLimit: body.usageLimit || "100",
    usedCount: body.usedCount || "0",
    perUserLimit: body.perUserLimit || "1",
    applicableTo: body.applicableTo || "All",
    applicableValue: body.applicableValue || "",
    customerType: body.customerType || "All",
    startDate: body.startDate || "",
    endDate: body.endDate || "",
    status: body.status || "Active",
    isFeatured: body.isFeatured || "No",
    bannerImage: body.bannerImage || "",
    terms: body.terms || "",
    createdAt: body.createdAt || new Date().toISOString(),
    updatedAt: body.updatedAt || new Date().toISOString(),
  };

  await updateDb((db: any) => {
    if (!Array.isArray(db.coupon)) db.coupon = [];
    db.coupon.push(item);
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
    if (!Array.isArray(db.coupon)) db.coupon = [];
    const idx = db.coupon.findIndex((c: any) => c.id === id);
    if (idx !== -1) {
      db.coupon[idx] = {
        ...db.coupon[idx],
        ...body,
        code: (body.code || db.coupon[idx].code).toUpperCase().replace(/\s+/g, ""),
        id,
        updatedAt: new Date().toISOString(),
      };
      updated = db.coupon[idx];
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
    if (!Array.isArray(db.coupon)) db.coupon = [];
    db.coupon = db.coupon.filter((c: any) => c.id !== id);
  });
  return NextResponse.json({ success: true });
}