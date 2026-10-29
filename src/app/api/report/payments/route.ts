// src/app/api/report/payments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb } from "../../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const db = await readDb();
    const payments = Array.isArray(db.payment) ? db.payment : [];
    const orders = Array.isArray(db.order) ? db.order : [];

    /* Filters */
    const search = req.nextUrl.searchParams.get("search");
    const status = req.nextUrl.searchParams.get("status");
    const method = req.nextUrl.searchParams.get("method");
    const from = req.nextUrl.searchParams.get("from");
    const to = req.nextUrl.searchParams.get("to");

    let filtered = [...payments];

    if (status) {
      filtered = filtered.filter((p: any) => p.status === status);
    }

    if (method) {
      filtered = filtered.filter((p: any) => p.method === method);
    }

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter((p: any) => {
        const text = `${p.paymentId || ""} ${p.orderNo || ""} ${
          p.customerName || ""
        } ${p.transactionRef || ""}`.toLowerCase();
        return text.includes(s);
      });
    }

    if (from) {
      filtered = filtered.filter(
        (p: any) => (p.paymentDate || p.createdAt || "").slice(0, 10) >= from
      );
    }
    if (to) {
      filtered = filtered.filter(
        (p: any) => (p.paymentDate || p.createdAt || "").slice(0, 10) <= to
      );
    }

    /* Sort newest first */
    filtered.sort(
      (a: any, b: any) =>
        new Date(b.paymentDate || b.createdAt || 0).getTime() -
        new Date(a.paymentDate || a.createdAt || 0).getTime()
    );

    /* ============ Stats ============ */
    const totalReceived = filtered
      .filter((p: any) => p.status === "Paid")
      .reduce((s: number, p: any) => s + (Number(p.amount) || 0), 0);

    const totalPending = filtered
      .filter((p: any) => p.status === "Pending")
      .reduce((s: number, p: any) => s + (Number(p.amount) || 0), 0);

    const totalRefunded = filtered
      .filter((p: any) => p.status === "Refunded")
      .reduce((s: number, p: any) => s + (Number(p.amount) || 0), 0);

    const totalFailed = filtered
      .filter((p: any) => p.status === "Failed")
      .reduce((s: number, p: any) => s + (Number(p.amount) || 0), 0);

    const paidCount = filtered.filter((p: any) => p.status === "Paid").length;
    const pendingCount = filtered.filter(
      (p: any) => p.status === "Pending"
    ).length;
    const refundedCount = filtered.filter(
      (p: any) => p.status === "Refunded"
    ).length;
    const failedCount = filtered.filter(
      (p: any) => p.status === "Failed"
    ).length;

    const totalPayments = filtered.length;
    const avgPayment =
      paidCount > 0 ? Math.round(totalReceived / paidCount) : 0;

    /* ============ Payment Method Breakdown ============ */
    const methodMap: {
      [key: string]: { count: number; amount: number };
    } = {};
    filtered.forEach((p: any) => {
      const m = p.method || "Unknown";
      if (!methodMap[m]) methodMap[m] = { count: 0, amount: 0 };
      methodMap[m].count += 1;
      methodMap[m].amount += Number(p.amount) || 0;
    });

    const methodData = Object.entries(methodMap).map(([name, data]) => ({
      name,
      count: data.count,
      amount: data.amount,
    }));

    /* ============ Status Breakdown ============ */
    const statusBreakdown = [
      { name: "Paid", value: paidCount },
      { name: "Pending", value: pendingCount },
      { name: "Refunded", value: refundedCount },
      { name: "Failed", value: failedCount },
    ].filter((s) => s.value > 0);

    /* ============ Last 30 Days Chart ============ */
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayPayments = filtered.filter((p: any) =>
        (p.paymentDate || p.createdAt || "").startsWith(dateStr)
      );
      last30Days.push({
        date: dateStr,
        label: d.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        received: dayPayments
          .filter((p: any) => p.status === "Paid")
          .reduce((s: number, p: any) => s + (Number(p.amount) || 0), 0),
        count: dayPayments.length,
      });
    }

    /* ============ Last 12 Months ============ */
    const last12Months = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthStr = d.toISOString().slice(0, 7);
      const monthPayments = filtered.filter((p: any) =>
        (p.paymentDate || p.createdAt || "").startsWith(monthStr)
      );
      last12Months.push({
        label: d.toLocaleDateString("en-IN", {
          month: "short",
          year: "2-digit",
        }),
        received: monthPayments
          .filter((p: any) => p.status === "Paid")
          .reduce((s: number, p: any) => s + (Number(p.amount) || 0), 0),
        count: monthPayments.length,
      });
    }

    /* ============ Pending Payments (Top 10) ============ */
    const pendingPaymentsList = filtered
      .filter((p: any) => p.status === "Pending")
      .sort(
        (a: any, b: any) =>
          new Date(a.paymentDate || a.createdAt || 0).getTime() -
          new Date(b.paymentDate || b.createdAt || 0).getTime()
      )
      .slice(0, 10);

    /* ============ Top Customers (by payment) ============ */
    const customerMap: {
      [key: string]: { count: number; amount: number; phone: string };
    } = {};
    filtered
      .filter((p: any) => p.status === "Paid")
      .forEach((p: any) => {
        const name = p.customerName || "Unknown";
        if (!customerMap[name]) {
          customerMap[name] = {
            count: 0,
            amount: 0,
            phone: p.customerPhone || "",
          };
        }
        customerMap[name].count += 1;
        customerMap[name].amount += Number(p.amount) || 0;
      });

    const topCustomers = Object.entries(customerMap)
      .map(([name, data]) => ({
        name,
        count: data.count,
        amount: data.amount,
        phone: data.phone,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10);

    return NextResponse.json({
      stats: {
        totalReceived,
        totalPending,
        totalRefunded,
        totalFailed,
        paidCount,
        pendingCount,
        refundedCount,
        failedCount,
        totalPayments,
        avgPayment,
      },
      payments: filtered,
      methodData,
      statusBreakdown,
      last30Days,
      last12Months,
      pendingPaymentsList,
      topCustomers,
    });
  } catch (err: any) {
    console.error("Report Payment error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}