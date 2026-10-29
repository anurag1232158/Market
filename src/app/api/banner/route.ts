import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const db = await readDb();
  const list = db.banner || [];
  if (id) {
    const item = list.find((b: any) => b.id === id);
    return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ banner: list });
}

export async function POST(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = {
    id: randomUUID(),
    title: body.title || "",
    subtitle: body.subtitle || "",
    description: body.description || "",
    image: body.image || "",
    mobileImage: body.mobileImage || "",
    buttonText: body.buttonText || "",
    buttonLink: body.buttonLink || "",
    position: body.position || "Hero",
    order: body.order || "0",
    status: body.status || "Active",
    startDate: body.startDate || "",
    endDate: body.endDate || "",
    bgColor: body.bgColor || "#ffffff",
    textColor: body.textColor || "#000000",
    createdAt: body.createdAt || new Date().toISOString(),
    updatedAt: body.updatedAt || new Date().toISOString(),
  };

  await updateDb((db: any) => {
    if (!Array.isArray(db.banner)) db.banner = [];
    db.banner.push(item);
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
    if (!Array.isArray(db.banner)) db.banner = [];
    const idx = db.banner.findIndex((b: any) => b.id === id);
    if (idx !== -1) {
      db.banner[idx] = { ...db.banner[idx], ...body, id, updatedAt: new Date().toISOString() };
      updated = db.banner[idx];
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
    if (!Array.isArray(db.banner)) db.banner = [];
    db.banner = db.banner.filter((b: any) => b.id !== id);
  });

  return NextResponse.json({ success: true });
}