// src/app/api/report/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb } from "../../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const db = await readDb();
    const orders = Array.isArray(db.order) ? db.order : [];

    const status = req.nextUrl.searchParams.get("status");
    const search = req.nextUrl.searchParams.get("search");
    const from = req.nextUrl.searchParams.get("from");
    const to = req.nextUrl.searchParams.get("to");

    let filtered = [...orders];

    if (status) {
      filtered = filtered.filter((o: any) => o.orderStatus === status);
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
      .filter((o: any) => o.paymentStatus === "Paid" || o.orderStatus === "Delivered")
      .reduce((s: number, o: any) => s + (Number(o.totalAmount) || 0), 0);

    const stats = {
      total: filtered.length,
      pending: filtered.filter((o: any) => o.orderStatus === "Pending").length,
      shipped: filtered.filter((o: any) => o.orderStatus === "Shipped").length,
      delivered: filtered.filter((o: any) => o.orderStatus === "Delivered").length,
      cancelled: filtered.filter((o: any) => o.orderStatus === "Cancelled").length,
      totalRevenue,
    };

    return NextResponse.json({ orders: filtered, stats });
  } catch (err: any) {
    console.error("Report Orders error:", err);
    return NextResponse.json(
      { error: err.message || "Server error", orders: [], stats: {} },
      { status: 500 }
    );
  }
}