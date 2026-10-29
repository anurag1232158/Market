import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const slug = req.nextUrl.searchParams.get("slug");
  const db = await readDb();
  const list = db.blog || [];
  if (id) {
    const item = list.find((b: any) => b.id === id);
    return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (slug) {
    const item = list.find((b: any) => b.slug === slug);
    return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ blog: list });
}

export async function POST(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = {
    id: randomUUID(),
    title: body.title || "",
    slug: body.slug || "",
    excerpt: body.excerpt || "",
    content: body.content || "",
    image: body.image || "",
    category: body.category || "Health Benefits",
    tags: body.tags || "",
    author: body.author || "Admin",
    authorImage: body.authorImage || "",
    readTime: body.readTime || "5 min read",
    status: body.status || "Draft",
    isFeatured: body.isFeatured || "No",
    order: body.order || "0",
    views: body.views || "0",
    publishedAt: body.publishedAt || new Date().toISOString(),
    metaTitle: body.metaTitle || "",
    metaDescription: body.metaDescription || "",
    metaKeywords: body.metaKeywords || "",
    createdAt: body.createdAt || new Date().toISOString(),
    updatedAt: body.updatedAt || new Date().toISOString(),
  };

  await updateDb((db: any) => {
    if (!Array.isArray(db.blog)) db.blog = [];
    db.blog.push(item);
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
    if (!Array.isArray(db.blog)) db.blog = [];
    const idx = db.blog.findIndex((b: any) => b.id === id);
    if (idx !== -1) {
      db.blog[idx] = { ...db.blog[idx], ...body, id, updatedAt: new Date().toISOString() };
      updated = db.blog[idx];
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
    if (!Array.isArray(db.blog)) db.blog = [];
    db.blog = db.blog.filter((b: any) => b.id !== id);
  });

  return NextResponse.json({ success: true });
}