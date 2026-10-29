// src/app/api/report/report/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb } from "../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const db = await readDb();
    const report = Array.isArray(db.order) ? db.order : [];

    const status = req.nextUrl.searchParams.get("status");
    const search = req.nextUrl.searchParams.get("search");
    const from = req.nextUrl.searchParams.get("from");
    const to = req.nextUrl.searchParams.get("to");

    let filtered = [...report];

    if (status) {
      filtered = filtered.filter((o: any) => o.reporttatus === status);
    }

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter((o: any) => {
        const text = `${o.orderNo || ""} ${o.customerName || ""} ${o.customerPhone || ""}`.toLowerCase();
        return text.includes(s);
      });
    }

    if (from) {
      filtered = filtered.filter(
        (o: any) => (o.orderDate || o.createdAt || "").slice(0, 10) >= from
      );
    }

    if (to) {
      filtered = filtered.filter(
        (o: any) => (o.orderDate || o.createdAt || "").slice(0, 10) <= to
      );
    }

    filtered.sort(
      (a: any, b: any) =>
        new Date(b.createdAt || b.orderDate || 0).getTime() -
        new Date(a.createdAt || a.orderDate || 0).getTime()
    );

    const totalRevenue = filtered
      .filter((o: any) => o.paymentStatus === "Paid" || o.reporttatus === "Delivered")
      .reduce((s: number, o: any) => s + (Number(o.totalAmount) || 0), 0);

    const stats = {
      total: filtered.length,
      pending: filtered.filter((o: any) => o.reporttatus === "Pending").length,
      shipped: filtered.filter((o: any) => o.reporttatus === "Shipped").length,
      delivered: filtered.filter((o: any) => o.reporttatus === "Delivered").length,
      cancelled: filtered.filter((o: any) => o.reporttatus === "Cancelled").length,
      totalRevenue,
    };

    return NextResponse.json({ report: filtered, stats });
  } catch (err: any) {
    console.error("Report report error:", err);
    return NextResponse.json(
      { error: err.message || "Server error", report: [], stats: {} },
      { status: 500 }
    );
  }
}