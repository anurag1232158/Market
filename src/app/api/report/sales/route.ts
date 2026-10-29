// src/app/api/report/sales/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb } from "../../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const db = await readDb();
    const orders = Array.isArray(db.order) ? db.order : [];

    const from = req.nextUrl.searchParams.get("from");
    const to = req.nextUrl.searchParams.get("to");

    let filtered = [...orders];

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

    /* ============ Different Revenue Types ============ */
    
    /* Total = सारे orders */
    const totalRevenue = filtered.reduce(
      (s: number, o: any) => s + (Number(o.totalAmount) || 0),
      0
    );

    /* Paid = सिर्फ paid या delivered */
    const paidOrders = filtered.filter(
      (o: any) =>
        o.paymentStatus === "Paid" || o.orderStatus === "Delivered"
    );
    const paidRevenue = paidOrders.reduce(
      (s: number, o: any) => s + (Number(o.totalAmount) || 0),
      0
    );

    /* Pending = pending orders */
    const pendingOrders = filtered.filter(
      (o: any) =>
        o.paymentStatus === "Pending" && o.orderStatus !== "Cancelled"
    );
    const pendingRevenue = pendingOrders.reduce(
      (s: number, o: any) => s + (Number(o.totalAmount) || 0),
      0
    );

    /* Cancelled */
    const cancelledOrders = filtered.filter(
      (o: any) => o.orderStatus === "Cancelled"
    );
    const cancelledRevenue = cancelledOrders.reduce(
      (s: number, o: any) => s + (Number(o.totalAmount) || 0),
      0
    );

    const totalOrders = filtered.length;
    const avgOrderValue =
      totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    /* ============ Today's Sales ============ */
    const today = new Date().toISOString().slice(0, 10);
    const todayOrders = filtered.filter((o: any) =>
      (o.orderDate || o.createdAt || "").startsWith(today)
    );
    const todayRevenue = todayOrders.reduce(
      (s: number, o: any) => s + (Number(o.totalAmount) || 0),
      0
    );

    /* ============ This Month ============ */
    const thisMonth = today.slice(0, 7);
    const monthOrders = filtered.filter((o: any) =>
      (o.orderDate || o.createdAt || "").startsWith(thisMonth)
    );
    const monthRevenue = monthOrders.reduce(
      (s: number, o: any) => s + (Number(o.totalAmount) || 0),
      0
    );

    /* ============ Last 30 Days ============ */
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayOrders = filtered.filter((o: any) =>
        (o.orderDate || o.createdAt || "").startsWith(dateStr)
      );
      last30Days.push({
        date: dateStr,
        label: d.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        revenue: dayOrders.reduce(
          (s: number, o: any) => s + (Number(o.totalAmount) || 0),
          0
        ),
        orders: dayOrders.length,
      });
    }

    /* ============ Last 12 Months ============ */
    const last12Months = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthStr = d.toISOString().slice(0, 7);
      const mOrders = filtered.filter((o: any) =>
        (o.orderDate || o.createdAt || "").startsWith(monthStr)
      );
      last12Months.push({
        label: d.toLocaleDateString("en-IN", {
          month: "short",
          year: "2-digit",
        }),
        revenue: mOrders.reduce(
          (s: number, o: any) => s + (Number(o.totalAmount) || 0),
          0
        ),
        orders: mOrders.length,
      });
    }

    /* ============ Payment Breakdown ============ */
    const paymentMethods: { [key: string]: { count: number; amount: number } } = {};
    filtered.forEach((o: any) => {
      const method = o.paymentMethod || "Unknown";
      if (!paymentMethods[method]) {
        paymentMethods[method] = { count: 0, amount: 0 };
      }
      paymentMethods[method].count += 1;
      paymentMethods[method].amount += Number(o.totalAmount) || 0;
    });

    const paymentBreakdown = Object.entries(paymentMethods).map(
      ([name, data]) => ({
        name,
        count: data.count,
        amount: data.amount,
      })
    );

    /* ============ Status Breakdown ============ */
    const statusCounts: { [key: string]: number } = {};
    filtered.forEach((o: any) => {
      const status = o.orderStatus || "Pending";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    const statusBreakdown = Object.entries(statusCounts).map(
      ([name, value]) => ({ name, value })
    );

    /* ============ Top Products ============ */
    const productSales: { [key: string]: { qty: number; revenue: number } } = {};
    filtered.forEach((o: any) => {
      try {
        const items = JSON.parse(o.items || "[]");
        items.forEach((it: any) => {
          const name = it.name || "Unknown";
          if (!productSales[name]) {
            productSales[name] = { qty: 0, revenue: 0 };
          }
          const qty = Number(it.qty) || 0;
          const price = Number(it.price) || 0;
          productSales[name].qty += qty;
          productSales[name].revenue += qty * price;
        });
      } catch {}
    });

    const topProducts = Object.entries(productSales)
      .map(([name, data]) => ({
        name,
        qty: data.qty,
        revenue: data.revenue,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    /* ============ Top Customers ============ */
    const customerSales: { [key: string]: { count: number; amount: number; phone: string } } = {};
    filtered.forEach((o: any) => {
      const name = o.customerName || "Unknown";
      if (!customerSales[name]) {
        customerSales[name] = {
          count: 0,
          amount: 0,
          phone: o.customerPhone || "",
        };
      }
      customerSales[name].count += 1;
      customerSales[name].amount += Number(o.totalAmount) || 0;
    });

    const topCustomers = Object.entries(customerSales)
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
        totalRevenue,
        totalOrders,
        avgOrderValue,
        todayRevenue,
        todayOrders: todayOrders.length,
        monthRevenue,
        monthOrders: monthOrders.length,
        paidRevenue,
        paidOrders: paidOrders.length,
        pendingRevenue,
        pendingOrders: pendingOrders.length,
        cancelledRevenue,
        cancelledOrders: cancelledOrders.length,
      },
      last30Days,
      last12Months,
      paymentBreakdown,
      statusBreakdown,
      topProducts,
      topCustomers,
    });
  } catch (err: any) {
    console.error("Report Sales error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}