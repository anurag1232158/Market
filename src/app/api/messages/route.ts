// src/app/api/messages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb  } from "../../../../lib/db";

import { randomUUID } from "crypto";

/* ============================================================
   GET — Chat messages fetch करें
   ============================================================ */
export async function GET(req: NextRequest) {
  try {
    const chatId = req.nextUrl.searchParams.get("chatId");
    const db = await readDb();
    const all = Array.isArray(db.chatMessages) ? db.chatMessages : [];

    if (!chatId) {
      return NextResponse.json({ messages: all });
    }

    const messages = all
      .filter((m: any) => m.chatId === chatId)
      .sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    /* ⭐ User के messages को Read mark करें */
    await updateDb((db: any) => {
      if (!Array.isArray(db.chatMessages)) return;
      db.chatMessages = db.chatMessages.map((m: any) => {
        if (
          m.chatId === chatId &&
          m.senderRole !== "admin" &&
          m.status !== "Read"
        ) {
          return {
            ...m,
            status: "Read",
            readAt: new Date().toISOString(),
          };
        }
        return m;
      });
    });

    return NextResponse.json({ messages });
  } catch (err: any) {
    console.error("Chat messages GET error:", err);
    return NextResponse.json(
      { error: err.message || "Server error", messages: [] },
      { status: 500 }
    );
  }
}

/* ============================================================
   POST — नया message भेजें
   ============================================================ */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const now = new Date().toISOString();

    const message = {
      id: randomUUID(),
      chatId: body.chatId || "",
      senderId: body.senderId || "admin",
      senderName: body.senderName || "Admin",
      senderRole: body.senderRole || "admin",
      receiverId: body.receiverId || "",
      receiverName: body.receiverName || "",
      receiverRole: body.receiverRole || "user",
      receiverPhone: body.receiverPhone || "",
      receiverEmail: body.receiverEmail || "",
      channel: body.channel || "Chat",
      message: body.message || "",
      status: body.status || "Sent",
      deliveredAt: body.status === "Delivered" ? now : "",
      readAt: "",
      error: "",
      createdAt: body.createdAt || now,
    };

    await updateDb((db: any) => {
      if (!Array.isArray(db.chatMessages)) db.chatMessages = [];
      db.chatMessages.push(message);
    });

    return NextResponse.json(message, { status: 201 });
  } catch (err: any) {
    console.error("Chat messages POST error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}