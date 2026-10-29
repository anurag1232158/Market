import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const db = await readDb();
  const list = db.about || [];
  if (id) {
    const item = list.find((a: any) => a.id === id);
    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ about: list });
}

export async function POST(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = {
    id: randomUUID(),
    title: body.title || "",
    subtitle: body.subtitle || "",
    content: body.content || "",
    section: body.section || "Story",
    image: body.image || "",
    icon: body.icon || "",
    order: body.order || "0",
    status: body.status || "Active",
    metaTitle: body.metaTitle || "",
    metaDescription: body.metaDescription || "",
    metaKeywords: body.metaKeywords || "",
    createdAt: body.createdAt || new Date().toISOString(),
    updatedAt: body.updatedAt || new Date().toISOString(),
  };

  await updateDb((db: any) => {
    if (!Array.isArray(db.about)) db.about = [];
    db.about.push(item);
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
    if (!Array.isArray(db.about)) db.about = [];
    const idx = db.about.findIndex((a: any) => a.id === id);
    if (idx !== -1) {
      db.about[idx] = {
        ...db.about[idx],
        ...body,
        id,
        updatedAt: new Date().toISOString(),
      };
      updated = db.about[idx];
    }
  });

  return updated
    ? NextResponse.json(updated)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await updateDb((db: any) => {
    if (!Array.isArray(db.about)) db.about = [];
    db.about = db.about.filter((a: any) => a.id !== id);
  });

  return NextResponse.json({ success: true });
}