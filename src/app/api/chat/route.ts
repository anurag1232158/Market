import { NextRequest, NextResponse } from "next/server";
import { readDb } from "../../../../lib/db";

export async function GET(req: NextRequest) {
  const db = await readDb();
  const users = Array.isArray(db.user) ? db.user : [];
  const admins = Array.isArray(db.admin) ? db.admin : [];
  const reports = Array.isArray(db.report) ? db.report : [];
  const messages = Array.isArray(db.chatMessages) ? db.chatMessages : [];

  const allContacts = [
    ...users.map((u: any) => ({ ...u, _role: "user" })),
    ...admins.map((a: any) => ({ ...a, _role: "admin" })),
    ...reports.map((r: any) => ({ ...r, _role: "report" })),
  ];

  const chats = allContacts.map((u: any) => {
    const userMsgs = messages
      .filter((m: any) => m.receiverId === u.id || m.senderId === u.id)
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    const last = userMsgs[0];
    const unread = userMsgs.filter(
      (m: any) => m.senderRole !== "admin" && m.status !== "Read"
    ).length;

    /* ⭐ UNIQUE ID — role + id */
    const uniqueId = `${u._role}-${u.id}`;

    return {
      id: u.id,
      uniqueKey: uniqueId,                        // ⭐ unique key
      userId: u.id,
      userName: u.name || u.username || "User",
      userPhone: u.number || "",
      userEmail: u.email || "",
      userRole: u._role,
      userPic: u.pic || "",
      userCity: u.city || "",                     // ⭐ Location
      userState: u.state || "",
      userCountry: u.country || "",
      userAddress: u.address || "",
      userPin: u.pin || "",
      lastMessage: last?.message || "",
      lastMessageAt: last?.createdAt || "",
      unreadCount: unread,
      lastSeen: "",
      status: u.status === "Blocked" ? "Blocked" : "Active",
    };
  });

  const activeChats = chats.filter((c) => c.lastMessageAt);
  const inactiveChats = chats.filter((c) => !c.lastMessageAt);

  return NextResponse.json({
    chats: [...activeChats, ...inactiveChats],
  });
}