// src/app/api/leadership/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

/* ---------------- GET (List / Single) ---------------- */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const db = await readDb();
  const list = db.leadership || [];

  if (id) {
    const item = list.find((l: any) => l.id === id);
    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Leader not found" }, { status: 404 });
  }

  return NextResponse.json(list); // ✅ सीधा array (frontend के लिए)
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
    email: body.email || "",
    phone: body.phone || "",
    message: body.message || "",
    pic: body.pic || "",
    role: body.role || "",
  };

  await updateDb((db: any) => {
    if (!Array.isArray(db.leadership)) db.leadership = [];
    db.leadership.push(item);
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
    if (!Array.isArray(db.leadership)) db.leadership = [];
    const idx = db.leadership.findIndex((l: any) => l.id === id);
    if (idx !== -1) {
      db.leadership[idx] = {
        ...db.leadership[idx],
        ...body,
        id,
      };
      updated = db.leadership[idx];
    }
  });

  return updated
    ? NextResponse.json(updated)
    : NextResponse.json({ error: "Leader not found" }, { status: 404 });
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
    if (!Array.isArray(db.leadership)) db.leadership = [];
    db.leadership = db.leadership.filter((l: any) => l.id !== id);
  });

  return NextResponse.json({ success: true });
}