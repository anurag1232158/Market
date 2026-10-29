import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const db = await readDb();
  const list = db.enquiry || [];
  if (id) {
    const item = list.find((e: any) => e.id === id);
    return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ enquiry: list });
}

/* Public POST — website contact form se aayega (no auth needed) */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const isAdmin = getAdminSession(req);
  const item = {
    id: randomUUID(),
    name: body.name || "",
    email: body.email || "",
    number: body.number || "",
    type: body.type || "Contact",
    subject: body.subject || "",
    message: body.message || "",
    product: body.product || "",
    quantity: body.quantity || "",
    city: body.city || "",
    state: body.state || "",
    source: body.source || "Website",
    priority: body.priority || "Medium",
    status: body.status || "New",
    assignedTo: body.assignedTo || "Unassigned",
    adminReply: body.adminReply || "",
    replyDate: body.replyDate || "",
    followUpDate: body.followUpDate || "",
    createdAt: body.createdAt || new Date().toISOString(),
    updatedAt: body.updatedAt || new Date().toISOString(),
  };

  await updateDb((db: any) => {
    if (!Array.isArray(db.enquiry)) db.enquiry = [];
    db.enquiry.push(item);
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
    if (!Array.isArray(db.enquiry)) db.enquiry = [];
    const idx = db.enquiry.findIndex((e: any) => e.id === id);
    if (idx !== -1) {
      db.enquiry[idx] = { ...db.enquiry[idx], ...body, id, updatedAt: new Date().toISOString() };
      updated = db.enquiry[idx];
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
    if (!Array.isArray(db.enquiry)) db.enquiry = [];
    db.enquiry = db.enquiry.filter((e: any) => e.id !== id);
  });

  return NextResponse.json({ success: true });
}