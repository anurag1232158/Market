// src/app/api/testimonial/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

/* ---------------- GET (List / Single) ---------------- */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const db = await readDb();
  const list = db.testimonial || [];

  if (id) {
    const item = list.find((t: any) => t.id === id);
    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ testimonial: list });
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
    pic: body.pic || "",
    subject: body.subject || "",
    review: body.review || "",
    rating: body.rating || "5",
    city: body.city || "",
    status: body.status || "Active",
    createdAt: body.createdAt || new Date().toISOString(),
    updatedAt: body.updatedAt || new Date().toISOString(),
  };

  await updateDb((db: any) => {
    if (!Array.isArray(db.testimonial)) db.testimonial = [];
    db.testimonial.push(item);
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
    if (!Array.isArray(db.testimonial)) db.testimonial = [];
    const idx = db.testimonial.findIndex((t: any) => t.id === id);
    if (idx !== -1) {
      db.testimonial[idx] = {
        ...db.testimonial[idx],
        ...body,
        id,
        updatedAt: new Date().toISOString(),
      };
      updated = db.testimonial[idx];
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
    if (!Array.isArray(db.testimonial)) db.testimonial = [];
    db.testimonial = db.testimonial.filter((t: any) => t.id !== id);
  });

  return NextResponse.json({ success: true });
}