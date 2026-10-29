// src/app/api/report/enquiries/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb } from "../../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    console.log("🔵 Enquiries API called");

    const db = await readDb();
    console.log("📦 DB keys:", Object.keys(db));
    console.log("📋 enquiry count:", db.enquiry?.length || 0);

    const enquiries = Array.isArray(db.enquiry) ? db.enquiry : [];
    console.log("✅ Enquiries loaded:", enquiries.length);

    /* Filters */
    const search = req.nextUrl.searchParams.get("search");
    const status = req.nextUrl.searchParams.get("status");
    const type = req.nextUrl.searchParams.get("type");
    const priority = req.nextUrl.searchParams.get("priority");
    const from = req.nextUrl.searchParams.get("from");
    const to = req.nextUrl.searchParams.get("to");

    let filtered = [...enquiries];

    if (status) {
      filtered = filtered.filter((e: any) => e.status === status);
    }
    if (type) {
      filtered = filtered.filter((e: any) => e.type === type);
    }
    if (priority) {
      filtered = filtered.filter((e: any) => e.priority === priority);
    }

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter((e: any) => {
        const text = `${e.name || ""} ${e.number || ""} ${e.email || ""} ${
          e.subject || ""
        } ${e.message || ""}`.toLowerCase();
        return text.includes(s);
      });
    }

    if (from) {
      filtered = filtered.filter(
        (e: any) => (e.createdAt || "").slice(0, 10) >= from
      );
    }
    if (to) {
      filtered = filtered.filter(
        (e: any) => (e.createdAt || "").slice(0, 10) <= to
      );
    }

    /* Sort newest first */
    filtered.sort(
      (a: any, b: any) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    );

    /* Stats */
    const total = filtered.length;
    const newEnquiries = filtered.filter((e: any) => e.status === "New").length;
    const inProgress = filtered.filter(
      (e: any) => e.status === "In Progress"
    ).length;
    const replied = filtered.filter((e: any) => e.status === "Replied").length;
    const closed = filtered.filter((e: any) => e.status === "Closed").length;
    const spam = filtered.filter((e: any) => e.status === "Spam").length;
    const followUp = filtered.filter(
      (e: any) => e.status === "Follow Up"
    ).length;

    const urgent = filtered.filter((e: any) => e.priority === "Urgent").length;
    const high = filtered.filter((e: any) => e.priority === "High").length;
    const medium = filtered.filter((e: any) => e.priority === "Medium").length;
    const low = filtered.filter((e: any) => e.priority === "Low").length;

    const responseRate = total > 0 ? Math.round((replied / total) * 100) : 0;

    const today = new Date().toISOString().slice(0, 10);
    const thisMonth = today.slice(0, 7);

    const todayEnquiries = filtered.filter((e: any) =>
      (e.createdAt || "").startsWith(today)
    ).length;
    const monthEnquiries = filtered.filter((e: any) =>
      (e.createdAt || "").startsWith(thisMonth)
    ).length;

    /* Type */
    const typeMap: { [key: string]: number } = {};
    filtered.forEach((e: any) => {
      const t = e.type || "Other";
      typeMap[t] = (typeMap[t] || 0) + 1;
    });
    const typeData = Object.entries(typeMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    /* Status */
    const statusBreakdown = [
      { name: "New", value: newEnquiries },
      { name: "In Progress", value: inProgress },
      { name: "Replied", value: replied },
      { name: "Follow Up", value: followUp },
      { name: "Closed", value: closed },
      { name: "Spam", value: spam },
    ].filter((s) => s.value > 0);

    /* Priority */
    const priorityData = [
      { name: "Urgent", value: urgent },
      { name: "High", value: high },
      { name: "Medium", value: medium },
      { name: "Low", value: low },
    ].filter((p) => p.value > 0);

    /* Source */
    const sourceMap: { [key: string]: number } = {};
    filtered.forEach((e: any) => {
      const s = e.source || "Website";
      sourceMap[s] = (sourceMap[s] || 0) + 1;
    });
    const sourceData = Object.entries(sourceMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    /* Last 30 days */
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayEnquiries = filtered.filter((e: any) =>
        (e.createdAt || "").startsWith(dateStr)
      );
      last30Days.push({
        date: dateStr,
        label: d.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        count: dayEnquiries.length,
      });
    }

    /* Last 12 months */
    const last12Months = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthStr = d.toISOString().slice(0, 7);
      const monthEnq = filtered.filter((e: any) =>
        (e.createdAt || "").startsWith(monthStr)
      );
      last12Months.push({
        label: d.toLocaleDateString("en-IN", {
          month: "short",
          year: "2-digit",
        }),
        count: monthEnq.length,
      });
    }

    /* Urgent */
    const urgentEnquiries = filtered
      .filter(
        (e: any) =>
          (e.priority === "Urgent" || e.priority === "High") &&
          e.status !== "Closed" &&
          e.status !== "Spam"
      )
      .slice(0, 10);

    /* Unreplied */
    const unrepliedEnquiries = filtered
      .filter((e: any) => e.status === "New" || e.status === "In Progress")
      .slice(0, 10);

    /* Top subjects */
    const subjectMap: { [key: string]: number } = {};
    filtered.forEach((e: any) => {
      if (e.subject) {
        const s = e.subject.slice(0, 40);
        subjectMap[s] = (subjectMap[s] || 0) + 1;
      }
    });
    const topSubjects = Object.entries(subjectMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    console.log("🟢 Returning:", filtered.length, "enquiries");

    return NextResponse.json({
      stats: {
        total,
        newEnquiries,
        inProgress,
        replied,
        closed,
        spam,
        followUp,
        urgent,
        high,
        medium,
        low,
        todayEnquiries,
        monthEnquiries,
        responseRate,
      },
      enquiries: filtered,
      typeData,
      statusBreakdown,
      priorityData,
      sourceData,
      last30Days,
      last12Months,
      urgentEnquiries,
      unrepliedEnquiries,
      topSubjects,
    });
  } catch (err: any) {
    console.error("❌ Report Enquiry error:", err);
    return NextResponse.json(
      { error: err.message || "Server error", enquiries: [], stats: {} },
      { status: 500 }
    );
  }
}