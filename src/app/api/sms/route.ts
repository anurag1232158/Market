import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const db = await readDb();
  const list = db.sms || [];

  if (id) {
    const item = list.find((s: any) => s.id === id);
    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ sms: list });
}

export async function POST(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const db = await readDb();

  let recipientCount = 0;

  if (body.sendMode === "Selected Users") {
    recipientCount = (body.selectedUsers || []).length;
  } else if (body.sendMode === "Single User") {
    recipientCount = 1;
  } else if (body.sendMode === "All Users") {
    recipientCount = (db.user || []).length;
  } else if (body.sendMode === "All Admins") {
    recipientCount = (db.admin || []).length;
  } else if (body.sendMode === "All Reports") {
    recipientCount = (db.report || []).length;
  } else if (body.sendMode === "All Wholesale") {
    recipientCount = (db.user || []).filter(
      (u: any) => u.type === "Wholesale"
    ).length;
  } else if (body.sendMode === "Active Users Only") {
    recipientCount = (db.user || []).filter(
      (u: any) => u.status !== "Blocked"
    ).length;
  } else if (body.sendMode === "One by One") {
    recipientCount = (db.user || []).length;
  }

  const item = {
    id: randomUUID(),
    title: body.title || "",
    type: body.type || "Custom",
    channels: body.channels || ["SMS"],
    sendMode: body.sendMode || "All Users",
    recipients: body.recipients || "",
    selectedUsers: body.selectedUsers || [],
    recipientValue: body.recipientValue || "",
    message: body.message || "",
    emailSubject: body.emailSubject || "",
    emailBody: body.emailBody || "",
    priority: body.priority || "Normal",
    scheduleDate: body.scheduleDate || "",
    status: body.status || "Draft",
    totalRecipients: String(recipientCount),
    sentCount: body.status === "Sent" ? String(recipientCount) : "0",
    failedCount: "0",
    deliveredCount: "0",
    readCount: "0",
    notes: body.notes || "",
    createdAt: body.createdAt || new Date().toISOString(),
    updatedAt: body.updatedAt || new Date().toISOString(),
    sentAt: body.status === "Sent" ? new Date().toISOString() : "",
  };

  await updateDb((db: any) => {
    if (!Array.isArray(db.sms)) db.sms = [];
    db.sms.push(item);
  });

  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const body = await req.json();
  let updated: any = null;

  await updateDb((db: any) => {
    if (!Array.isArray(db.sms)) db.sms = [];
    const idx = db.sms.findIndex((s: any) => s.id === id);
    if (idx !== -1) {
      db.sms[idx] = {
        ...db.sms[idx],
        ...body,
        id,
        updatedAt: new Date().toISOString(),
      };
      updated = db.sms[idx];
    }
  });

  return updated
    ? NextResponse.json(updated)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await updateDb((db: any) => {
    if (!Array.isArray(db.sms)) db.sms = [];
    db.sms = db.sms.filter((s: any) => s.id !== id);
  });

  return NextResponse.json({ success: true });
}