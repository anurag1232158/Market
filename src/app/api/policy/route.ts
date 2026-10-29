import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const slug = req.nextUrl.searchParams.get("slug");
  const type = req.nextUrl.searchParams.get("type");
  const db = await readDb();
  const list = db.policy || [];

  if (id) {
    const item = list.find((p: any) => p.id === id);
    return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (slug) {
    const item = list.find((p: any) => p.slug === slug);
    return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (type) {
    const item = list.find((p: any) => p.type === type);
    return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ policy: list });
}

export async function POST(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = {
    id: randomUUID(),
    title: body.title || "",
    slug: body.slug || "",
    type: body.type || "Privacy",
    content: body.content || "",
    summary: body.summary || "",
    version: body.version || "1.0",
    effectiveDate: body.effectiveDate || "",
    lastUpdated: body.lastUpdated || "",
    contactEmail: body.contactEmail || "",
    contactPhone: body.contactPhone || "",
    status: body.status || "Active",
    showOnFooter: body.showOnFooter || "Yes",
    order: body.order || "0",
    metaTitle: body.metaTitle || "",
    metaDescription: body.metaDescription || "",
    createdAt: body.createdAt || new Date().toISOString(),
    updatedAt: body.updatedAt || new Date().toISOString(),
  };

  await updateDb((db: any) => {
    if (!Array.isArray(db.policy)) db.policy = [];
    db.policy.push(item);
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
    if (!Array.isArray(db.policy)) db.policy = [];
    const idx = db.policy.findIndex((p: any) => p.id === id);
    if (idx !== -1) {
      db.policy[idx] = { ...db.policy[idx], ...body, id, updatedAt: new Date().toISOString() };
      updated = db.policy[idx];
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
    if (!Array.isArray(db.policy)) db.policy = [];
    db.policy = db.policy.filter((p: any) => p.id !== id);
  });

  return NextResponse.json({ success: true });
}