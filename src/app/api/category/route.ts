// src/app/api/category/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

/* ---------------- GET (List / Single) ---------------- */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const slug = req.nextUrl.searchParams.get("slug");
  const db = await readDb();
  const list = db.category || [];

  if (id) {
    const item = list.find((c: any) => c.id === id);
    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (slug) {
    const item = list.find((c: any) => c.slug === slug);
    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ category: list });
}

/* ---------------- POST (Create) ---------------- */
export async function POST(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const item = {
    id: randomUUID(),
    name: body.name || "",
    slug: body.slug || "",
    description: body.description || "",
    image: body.image || "",
    parent: body.parent || "",
    status: body.status || "Active",
    sortOrder: body.sortOrder || "0",
    isFeatured: body.isFeatured || "No",
    createdAt: body.createdAt || new Date().toISOString(),
    updatedAt: body.updatedAt || new Date().toISOString(),
  };

  await updateDb((db: any) => {
    if (!Array.isArray(db.category)) db.category = [];
    db.category.push(item);
  });

  return NextResponse.json(item, { status: 201 });
}

/* ---------------- PUT (Update) ---------------- */
export async function PUT(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id"); 
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const body = await req.json();

  let updated: any = null;
  await updateDb((db: any) => {
    if (!Array.isArray(db.category)) db.category = [];
    const idx = db.category.findIndex((c: any) => c.id === id);
    if (idx !== -1) {
      db.category[idx] = {
        ...db.category[idx],
        ...body,
        id, // id कभी न बदले
        updatedAt: new Date().toISOString(),
      };
      updated = db.category[idx];
    }
  });

  return updated
    ? NextResponse.json(updated)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

/* ---------------- DELETE ---------------- */
export async function DELETE(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await updateDb((db: any) => {
    if (!Array.isArray(db.category)) db.category = [];
    db.category = db.category.filter((c: any) => c.id !== id);
  });

  return NextResponse.json({ success: true });
}