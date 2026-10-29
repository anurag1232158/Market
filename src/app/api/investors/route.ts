// src/app/api/investors/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

/* ---------------- GET (List / Single) ---------------- */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const db = await readDb();
  const list = db.investors || [];

  if (id) {
    const item = list.find((i: any) => i.id === id);
    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Investor not found" }, { status: 404 });
  }

  return NextResponse.json(list); // ✅ सीधा array
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
    title: body.title || "",
    pic: body.pic || "",
  };

  await updateDb((db: any) => {
    if (!Array.isArray(db.investors)) db.investors = [];
    db.investors.push(item);
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
    if (!Array.isArray(db.investors)) db.investors = [];
    const idx = db.investors.findIndex((i: any) => i.id === id);
    if (idx !== -1) {
      db.investors[idx] = {
        ...db.investors[idx],
        ...body,
        id,
      };
      updated = db.investors[idx];
    }
  });

  return updated
    ? NextResponse.json(updated)
    : NextResponse.json({ error: "Investor not found" }, { status: 404 });
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
    if (!Array.isArray(db.investors)) db.investors = [];
    db.investors = db.investors.filter((i: any) => i.id !== id);
  });

  return NextResponse.json({ success: true });
}