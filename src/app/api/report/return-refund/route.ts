// src/app/api/report/return-refund/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb } from "../../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const db = await readDb();

    /* ============ Data Sources ============ */
    const orders = Array.isArray(db.order) ? db.order : [];
    const returns = Array.isArray(db.returns) ? db.returns : [];
    const payments = Array.isArray(db.payment) ? db.payment : [];
 
    /* ============ Filters ============ */
    const search = req.nextUrl.searchParams.get("search");
    const statusFilter = req.nextUrl.searchParams.get("status");
    const reasonFilter = req.nextUrl.searchParams.get("reason");
    const from = req.nextUrl.searchParams.get("from");
    const to = req.nextUrl.searchParams.get("to");

    /* ============ Combine Data ============ */
    /* Source 1: Orders जिनमें status Returned/Refunded है */
    const returnedOrders = orders
      .filter(
        (o: any) =>
          o.orderStatus === "Returned" ||
          o.orderStatus === "Refunded" ||
          o.paymentStatus === "Refunded"
      )
      .map((o: any) => {
        /* Order से items parse करें */
        let items: any[] = [];
        try {
          items = JSON.parse(o.items || "[]");
        } catch {}

        return {
          id: o.id,
          _source: "order",
          orderNo: o.orderNo || "",
          customerName: o.customerName || "",
          customerPhone: o.customerPhone || "",
          customerEmail: o.customerEmail || "",
          items,
          productNames: items.map((it: any) => it.name).join(", "),
          totalAmount: Number(o.totalAmount) || 0,
          refundAmount: Number(o.refundAmount) || Number(o.totalAmount) || 0,
          reason: o.returnReason || "Not specified",
          status: o.refundStatus || "Pending",
          returnDate: o.returnDate || o.updatedAt || o.createdAt || "",
          orderDate: o.orderDate || o.createdAt || "",
          paymentMethod: o.paymentMethod || "",
          notes: o.returnNotes || "",
        };
      });

    /* Source 2: Manual returns collection */
    const manualReturns = returns.map((r: any) => ({
      id: r.id,
      _source: "returns",
      orderNo: r.orderNo || "",
      customerName: r.customerName || "",
      customerPhone: r.customerPhone || "",
      customerEmail: r.customerEmail || "",
      items: r.items || [],
      productNames: r.product || r.productName || "",
      totalAmount: Number(r.totalAmount) || 0,
      refundAmount: Number(r.refundAmount) || 0,
      reason: r.reason || "Not specified",
      status: r.status || "Pending",
      returnDate: r.returnDate || r.createdAt || "",
      orderDate: r.orderDate || "",
      paymentMethod: r.paymentMethod || "",
      notes: r.notes || "",
    }));

    let allReturns = [...returnedOrders, ...manualReturns];

    /* ============ Apply Filters ============ */
    if (from) {
      allReturns = allReturns.filter(
        (r) => (r.returnDate || "").slice(0, 10) >= from
      );
    }
    if (to) {
      allReturns = allReturns.filter(
        (r) => (r.returnDate || "").slice(0, 10) <= to
      );
    }
    if (statusFilter) {
      allReturns = allReturns.filter((r) => r.status === statusFilter);
    }
    if (reasonFilter) {
      allReturns = allReturns.filter((r) => r.reason === reasonFilter);
    }
    if (search) {
      const s = search.toLowerCase();
      allReturns = allReturns.filter((r) => {
        const text = `${r.orderNo} ${r.customerName} ${r.customerPhone} ${r.productNames} ${r.reason}`.toLowerCase();
        return text.includes(s);
      });
    }

    /* Sort newest first */
    allReturns.sort(
      (a, b) =>
        new Date(b.returnDate || 0).getTime() -
        new Date(a.returnDate || 0).getTime()
    );

    /* ============ Stats ============ */
    const totalReturns = allReturns.length;
    const totalRefundAmount = allReturns.reduce(
      (s, r) => s + r.refundAmount,
      0
    );
    const totalOrderValue = allReturns.reduce(
      (s, r) => s + r.totalAmount,
      0
    );
    const avgRefundAmount =
      totalReturns > 0 ? Math.round(totalRefundAmount / totalReturns) : 0;

    /* Total orders से return rate */
    const totalOrdersCount = orders.length;
    const returnRate =
      totalOrdersCount > 0
        ? Math.round((totalReturns / totalOrdersCount) * 100 * 10) / 10
        : 0;

    /* Status counts */
    const approved = allReturns.filter((r) => r.status === "Approved").length;
    const pending = allReturns.filter((r) => r.status === "Pending").length;
    const rejected = allReturns.filter((r) => r.status === "Rejected").length;
    const processing = allReturns.filter(
      (r) => r.status === "Processing" || r.status === "In Progress"
    ).length;

    /* Amount by status */
    const approvedAmount = allReturns
      .filter((r) => r.status === "Approved")
      .reduce((s, r) => s + r.refundAmount, 0);

    const pendingAmount = allReturns
      .filter((r) => r.status === "Pending")
      .reduce((s, r) => s + r.refundAmount, 0);

    /* Returned items count */
    let returnedItemsCount = 0;
    allReturns.forEach((r) => {
      if (Array.isArray(r.items) && r.items.length > 0) {
        r.items.forEach((it: any) => {
          returnedItemsCount += Number(it.qty) || 0;
        });
      } else {
        returnedItemsCount += 1;
      }
    });

    /* Average days to return */
    const withDates = allReturns.filter(
      (r) => r.orderDate && r.returnDate
    );
    const avgDaysToReturn =
      withDates.length > 0
        ? Math.round(
            withDates.reduce((s, r) => {
              const diff =
                (new Date(r.returnDate).getTime() -
                  new Date(r.orderDate).getTime()) /
                (1000 * 60 * 60 * 24);
              return s + Math.max(0, diff);
            }, 0) / withDates.length
          )
        : 0;

    /* Today / This Month */
    const today = new Date().toISOString().slice(0, 10);
    const thisMonth = today.slice(0, 7);

    const todayReturns = allReturns.filter((r) =>
      (r.returnDate || "").startsWith(today)
    ).length;

    const monthReturns = allReturns.filter((r) =>
      (r.returnDate || "").startsWith(thisMonth)
    ).length;

    const monthRefundAmount = allReturns
      .filter((r) => (r.returnDate || "").startsWith(thisMonth))
      .reduce((s, r) => s + r.refundAmount, 0);

    /* ============ Reason Breakdown ============ */
    const reasonMap: { [key: string]: { count: number; amount: number } } = {};
    allReturns.forEach((r) => {
      const reason = r.reason || "Other";
      if (!reasonMap[reason]) {
        reasonMap[reason] = { count: 0, amount: 0 };
      }
      reasonMap[reason].count += 1;
      reasonMap[reason].amount += r.refundAmount;
    });

    const reasonData = Object.entries(reasonMap)
      .map(([name, data]) => ({
        name,
        value: data.count,
        amount: data.amount,
      }))
      .sort((a, b) => b.value - a.value);

    /* ============ Status Breakdown ============ */
    const statusBreakdown = [
      { name: "Approved", value: approved, amount: approvedAmount },
      { name: "Pending", value: pending, amount: pendingAmount },
      { name: "Rejected", value: rejected, amount: 0 },
      { name: "Processing", value: processing, amount: 0 },
    ].filter((s) => s.value > 0);

    /* ============ Top Returned Products ============ */
    const productReturns: {
      [key: string]: { count: number; qty: number; amount: number };
    } = {};

    allReturns.forEach((r) => {
      if (Array.isArray(r.items) && r.items.length > 0) {
        r.items.forEach((it: any) => {
          const name = it.name || "Unknown";
          if (!productReturns[name]) {
            productReturns[name] = { count: 0, qty: 0, amount: 0 };
          }
          productReturns[name].count += 1;
          productReturns[name].qty += Number(it.qty) || 0;
          productReturns[name].amount +=
            (Number(it.qty) || 0) * (Number(it.price) || 0);
        });
      } else if (r.productNames) {
        const name = r.productNames;
        if (!productReturns[name]) {
          productReturns[name] = { count: 0, qty: 0, amount: 0 };
        }
        productReturns[name].count += 1;
        productReturns[name].amount += r.refundAmount;
      }
    });

    const topReturnedProducts = Object.entries(productReturns)
      .map(([name, data]) => ({
        name,
        count: data.count,
        qty: data.qty,
        amount: data.amount,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10);

    /* ============ Top Returning Customers ============ */
    const customerReturns: {
      [key: string]: { count: number; amount: number; phone: string };
    } = {};

    allReturns.forEach((r) => {
      const name = r.customerName || "Unknown";
      if (!customerReturns[name]) {
        customerReturns[name] = {
          count: 0,
          amount: 0,
          phone: r.customerPhone || "",
        };
      }
      customerReturns[name].count += 1;
      customerReturns[name].amount += r.refundAmount;
    });

    const topReturningCustomers = Object.entries(customerReturns)
      .map(([name, data]) => ({
        name,
        count: data.count,
        amount: data.amount,
        phone: data.phone,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    /* ============ Last 30 Days ============ */
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayReturns = allReturns.filter((r) =>
        (r.returnDate || "").startsWith(dateStr)
      );
      last30Days.push({
        date: dateStr,
        label: d.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        count: dayReturns.length,
        amount: dayReturns.reduce((s, r) => s + r.refundAmount, 0),
      });
    }

    /* ============ Last 12 Months ============ */
    const last12Months = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthStr = d.toISOString().slice(0, 7);
      const mReturns = allReturns.filter((r) =>
        (r.returnDate || "").startsWith(monthStr)
      );
      last12Months.push({
        label: d.toLocaleDateString("en-IN", {
          month: "short",
          year: "2-digit",
        }),
        count: mReturns.length,
        amount: mReturns.reduce((s, r) => s + r.refundAmount, 0),
      });
    }

    /* ============ Payment Method Breakdown ============ */
    const paymentMap: { [key: string]: number } = {};
    allReturns.forEach((r) => {
      const method = r.paymentMethod || "Unknown";
      paymentMap[method] = (paymentMap[method] || 0) + r.refundAmount;
    });

    const paymentRefunds = Object.entries(paymentMap)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount);

    /* ============ Return Response ============ */
    return NextResponse.json({
      stats: {
        totalReturns,
        totalRefundAmount,
        totalOrderValue,
        avgRefundAmount,
        returnRate,
        approved,
        pending,
        rejected,
        processing,
        approvedAmount,
        pendingAmount,
        returnedItemsCount,
        avgDaysToReturn,
        todayReturns,
        monthReturns,
        monthRefundAmount,
        totalOrdersCount,
      },
      returns: allReturns,
      reasonData,
      statusBreakdown,
      topReturnedProducts,
      topReturningCustomers,
      last30Days,
      last12Months,
      paymentRefunds,
    });
  } catch (err: any) {
    console.error("Return Refund report error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}