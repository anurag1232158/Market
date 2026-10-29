import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

function combineContacts(db: any): any[] {
  const userList = Array.isArray(db.user) ? db.user : [];
  const adminList = Array.isArray(db.admin) ? db.admin : [];
  const reportList = Array.isArray(db.report) ? db.report : [];
  const manualList = Array.isArray(db.contact) ? db.contact : [];

  const users = userList.map((u: any) => ({
    id: u.id || "",
    _source: "user",
    name: u.name || u.username || "",
    email: u.email || "",
    number: u.number || "",
    altNumber: u.altNumber || "",
    role: "User",
    company: u.company || "",
    gst: u.gst || "",
    address: u.address || "",
    city: u.city || "",
    state: u.state || "",
    country: u.country || "India",
    pin: u.pin || "",
    image: u.pic || "",
    status: u.status || "Active",
    lastLogin: u.lastLogin || "",
    notes: u.notes || "",
    createdAt: u.createdAt || "",
    updatedAt: u.updatedAt || "",
  }));

  const admins = adminList.map((a: any) => ({
    id: a.id || "",
    _source: "admin",
    name: a.name || a.username || "",
    email: a.email || "",
    number: a.number || "",
    altNumber: a.altNumber || "",
    role: "Admin",
    company: a.company || "",
    gst: a.gst || "",
    address: a.address || a.village || a.post || "",
    city: a.city || "",
    state: a.state || "",
    country: a.country || "India",
    pin: a.pin || "",
    image: a.pic || "",
    status: a.status || "Active",
    lastLogin: a.lastLogin || "",
    notes: a.notes || "",
    createdAt: a.createdAt || "",
    updatedAt: a.updatedAt || "",
  }));

  const reports = reportList.map((r: any) => ({
    id: r.id || "",
    _source: "report",
    name: r.name || r.username || "",
    email: r.email || "",
    number: r.number || "",
    altNumber: r.altNumber || "",
    role: "Report",
    company: r.company || "",
    gst: r.gst || "",
    address: r.address || r.village || r.post || "",
    city: r.city || "",
    state: r.state || "",
    country: r.country || "India",
    pin: r.pin || "",
    image: r.pic || "",
    status: r.status || "Active",
    lastLogin: r.lastLogin || "",
    notes: r.notes || "",
    createdAt: r.createdAt || "",
    updatedAt: r.updatedAt || "",
  }));

  const manuals = manualList.map((m: any) => ({
    ...m,
    _source: m._source || "contact",
  }));

  return [...users, ...admins, ...reports, ...manuals];
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const role = req.nextUrl.searchParams.get("role");
  const source = req.nextUrl.searchParams.get("source");
  const db = await readDb();
  const all = combineContacts(db);

  if (id && source) {
    const item = all.find(
      (c: any) => c.id === id && c._source === source
    );
    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (id) {
    const item = all.find((c: any) => c.id === id);
    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (role) {
    const filtered = all.filter((c: any) => c.role === role);
    return NextResponse.json({ contact: filtered });
  }

  return NextResponse.json({ contact: all });
}

export async function POST(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = {
    id: randomUUID().slice(0, 8),
    _source: "contact",
    name: body.name || "",
    email: body.email || "",
    number: body.number || "",
    altNumber: body.altNumber || "",
    role: body.role || "User",
    company: body.company || "",
    gst: body.gst || "",
    address: body.address || "",
    city: body.city || "",
    state: body.state || "",
    country: body.country || "India",
    pin: body.pin || "",
    image: body.image || "",
    status: body.status || "Active",
    lastLogin: body.lastLogin || "",
    notes: body.notes || "",
    createdAt: body.createdAt || new Date().toISOString(),
    updatedAt: body.updatedAt || new Date().toISOString(),
  };

  await updateDb((db: any) => {
    if (!Array.isArray(db.contact)) db.contact = [];
    db.contact.push(item);
  });

  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = req.nextUrl.searchParams.get("id");
  const source = req.nextUrl.searchParams.get("source") || "contact";
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  const body = await req.json();
  let updated: any = null;

  await updateDb((db: any) => {
    const arrKey = source;
    if (!Array.isArray(db[arrKey])) db[arrKey] = [];
    const idx = db[arrKey].findIndex((c: any) => c.id === id);
    if (idx === -1) return;
    const original = db[arrKey][idx];
    const mapped: any = {
      ...original,
      name: body.name ?? original.name,
      email: body.email ?? original.email,
      number: body.number ?? original.number,
      altNumber: body.altNumber ?? original.altNumber,
      address: body.address ?? original.address,
      city: body.city ?? original.city,
      state: body.state ?? original.state,
      country: body.country ?? original.country,
      pin: body.pin ?? original.pin,
      status: body.status ?? original.status,
      notes: body.notes ?? original.notes,
    };

    /* Image field मैप — user/admin/report में `pic`, contact में `image` */
    if (body.image) {
      if (arrKey === "user" || arrKey === "admin" || arrKey === "report") {
        mapped.pic = body.image;
      } else {
        mapped.image = body.image;
      }
    }

    db[arrKey][idx] = mapped;
    updated = mapped;
  });

  return updated
    ? NextResponse.json(updated)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  const source = req.nextUrl.searchParams.get("source") || "contact";

  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await updateDb((db: any) => {
    const arrKey = source;
    if (!Array.isArray(db[arrKey])) return;
    db[arrKey] = db[arrKey].filter((c: any) => c.id !== id);
  });

  return NextResponse.json({ success: true });
}