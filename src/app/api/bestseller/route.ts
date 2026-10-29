// src/app/api/bestseller/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

/* ---------------- GET (List / Single) ---------------- */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const slug = req.nextUrl.searchParams.get("slug");
  const db = await readDb();
  const list = db.bestseller || [];

  if (id) {
    const item = list.find((b: any) => b.id === id);
    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (slug) {
    const item = list.find((b: any) => b.slug === slug);
    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ bestseller: list });
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
  // ✅ Admin fields
  title: body.title || "",
  subtitle: body.subtitle || "",
  content: body.content || "",
  section: body.section || "Story",
  image: body.image || "",
  icon: body.icon || "",
  order: body.order || "0",
  metaTitle: body.metaTitle || "",
  metaDescription: body.metaDescription || "",
  metaKeywords: body.metaKeywords || "",
  
  // ✅ Product fields
  name: body.name || "",
  slug: body.slug || "",
  category: body.category || "",
  flavour: body.flavour || "",
  weight: body.weight || "",
  price: body.price || "0",
  discount: body.discount || "0",
  stock: body.stock || "0",
  description: body.description || "",
  details: body.details || "",
  pic: body.pic || "",
  rating: body.rating || "0",
  isBestSeller: body.isBestSeller || "Yes",
  isFeatured: body.isFeatured || "No",
  isVrat: body.isVrat || "No",
  isGlutenFree: body.isGlutenFree || "No",
  
  status: body.status || "Active",
  createdAt: body.createdAt || new Date().toISOString(),
  updatedAt: body.updatedAt || new Date().toISOString(),
};

  await updateDb((db: any) => {
    if (!Array.isArray(db.bestseller)) db.bestseller = [];
    db.bestseller.push(item);
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
    if (!Array.isArray(db.bestseller)) db.bestseller = [];
    const idx = db.bestseller.findIndex((b: any) => b.id === id);
    if (idx !== -1) {
      db.bestseller[idx] = {
        ...db.bestseller[idx],
        ...body,
        id, // id कभी न बदले
        updatedAt: new Date().toISOString(),
      };
      updated = db.bestseller[idx];
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
    if (!Array.isArray(db.bestseller)) db.bestseller = [];
    db.bestseller = db.bestseller.filter((b: any) => b.id !== id);
  });

  return NextResponse.json({ success: true });
}