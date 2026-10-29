// src/app/api/report/messages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb } from "../../../../../lib/db";

/* ============================================================
   GET — Report Messages (read-only)
   ============================================================ */
export async function GET(req: NextRequest) {
  try {
    const db = await readDb();

    const enquiries = Array.isArray(db.enquiry) ? db.enquiry : [];
    const contacts = Array.isArray(db.contact) ? db.contact : [];

    const messages: any[] = [];

    /* ✉️ Enquiries → Messages */
    enquiries.forEach((e: any) => {
      messages.push({
        id: e.id,
        _source: "enquiry",
        name: e.name || "Unknown",
        email: e.email || "",
        phone: e.number || "",
        message: e.subject
          ? `[${e.subject}] ${e.message || ""}`
          : e.message || "",
        priority: e.priority || "Medium",
        status: e.status || "New",
        time: e.createdAt,
        link: `/EnquiryReport`,           // ⭐ Report page
      });
    });

    /* 📇 Contact form submissions */
    contacts.forEach((c: any) => {
      messages.push({
        id: c.id,
        _source: c._source || "contact",
        name: c.name || "Unknown",
        email: c.email || "",
        phone: c.number || "",
        message: c.notes || `Role: ${c.role || "User"}`,
        priority: "Low",
        status: c.status || "Active",
        time: c.createdAt,
        link: `/ReportHome`,              // ⭐ Report home
      });
    });

    messages.sort(
      (a, b) =>
        new Date(b.time || 0).getTime() -
        new Date(a.time || 0).getTime()
    );

    return NextResponse.json({ messages });
  } catch (err: any) {
    console.error("Report Messages error:", err);
    return NextResponse.json(
      { error: err.message || "Server error", messages: [] },
      { status: 500 }
    );
  }
}