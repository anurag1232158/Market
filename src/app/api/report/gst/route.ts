// src/app/api/report/gst/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb } from "../../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const db = await readDb();

    /* ============ Data Sources ============ */
    const orders = Array.isArray(db.order) ? db.order : [];
    const customers = Array.isArray(db.customer) ? db.customer : [];
    const users = Array.isArray(db.user) ? db.user : [];
    const contacts = Array.isArray(db.contact) ? db.contact : [];
    const settings = db.setting || {};

    /* Company GST (setting से) */
    const companyGst = settings.gstNumber || "";
    const companyPan = settings.panNumber || "";

    /* ============ Filters ============ */
    const search = req.nextUrl.searchParams.get("search");
    const from = req.nextUrl.searchParams.get("from");
    const to = req.nextUrl.searchParams.get("to");

    let filtered = [...orders];

    /* Date filter */
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

    /* Search filter */
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter((o: any) => {
        const text = `${o.orderNo || ""} ${o.customerName || ""} ${
          o.customerPhone || ""
        } ${o.gstNo || ""}`.toLowerCase();
        return text.includes(s);
      });
    }

    /* ============ Customer GST Lookup ============ */
    /* अगर order में gstNo नहीं है, तो customer से ढूंढें */
    const findCustomerGst = (order: any) => {
      /* 1. Direct order.gstNo */
      if (order.gstNo) return order.gstNo;

      /* 2. Customer DB से */
      const phone = order.customerPhone || "";
      const name = order.customerName || "";

      const found = [...customers, ...users, ...contacts].find(
        (c: any) =>
          (c.number === phone || c.name === name) && c.gst
      );
      return found?.gst || "";
    };

    /* ============ Process Orders → Add GST fields ============ */
    const processedOrders = filtered.map((o: any) => {
      const totalAmount = Number(o.totalAmount) || 0;
      const taxAmount = Number(o.tax) || 0;

      /* Base amount calculation */
      const baseAmount =
        taxAmount > 0 ? totalAmount - taxAmount : totalAmount;

      /* GST Rate */
      const gstRate =
        baseAmount > 0 ? Math.round((taxAmount / baseAmount) * 100) : 0;

      /* Customer GST lookup */
      const customerGst = findCustomerGst(o);

      return {
        ...o,
        gstNo: customerGst,               // ⭐ auto-filled
        _baseAmount: baseAmount,          // taxable value
        _gstAmount: taxAmount,            // GST amount
        _gstRate: gstRate,                // GST %
      };
    });

    /* ============ Stats ============ */
    const totalTaxableValue = processedOrders.reduce(
      (s: number, o: any) => s + o._baseAmount,
      0
    );

    const totalGstCollected = processedOrders.reduce(
      (s: number, o: any) => s + o._gstAmount,
      0
    );

    const totalInvoiceValue = processedOrders.reduce(
      (s: number, o: any) => s + (Number(o.totalAmount) || 0),
      0
    );

    const avgGstPerOrder =
      processedOrders.length > 0
        ? Math.round(totalGstCollected / processedOrders.length)
        : 0;

    /* Paid / Pending GST */
    const paidGst = processedOrders
      .filter((o: any) => o.paymentStatus === "Paid")
      .reduce((s: number, o: any) => s + o._gstAmount, 0);

    const pendingGst = processedOrders
      .filter((o: any) => o.paymentStatus === "Pending")
      .reduce((s: number, o: any) => s + o._gstAmount, 0);

    /* ============ B2B / B2C ============ */
    const b2bOrders = processedOrders.filter((o: any) => o.gstNo);
    const b2cOrders = processedOrders.filter((o: any) => !o.gstNo);

    const b2bStats = {
      count: b2bOrders.length,
      gst: b2bOrders.reduce((s: number, o: any) => s + o._gstAmount, 0),
      taxable: b2bOrders.reduce((s: number, o: any) => s + o._baseAmount, 0),
    };

    const b2cStats = {
      count: b2cOrders.length,
      gst: b2cOrders.reduce((s: number, o: any) => s + o._gstAmount, 0),
      taxable: b2cOrders.reduce((s: number, o: any) => s + o._baseAmount, 0),
    };

    /* ============ Rate-wise Breakdown ============ */
    const rateMap: {
      [key: number]: { count: number; taxable: number; gst: number };
    } = {};

    processedOrders.forEach((o: any) => {
      const rate = o._gstRate || 0;
      if (!rateMap[rate]) {
        rateMap[rate] = { count: 0, taxable: 0, gst: 0 };
      }
      rateMap[rate].count += 1;
      rateMap[rate].taxable += o._baseAmount;
      rateMap[rate].gst += o._gstAmount;
    });

    const rateData = Object.entries(rateMap)
      .map(([rate, data]) => ({
        name: `${rate}%`,
        rate: Number(rate),
        count: data.count,
        taxable: data.taxable,
        gst: data.gst,
      }))
      .sort((a, b) => a.rate - b.rate);

    /* ============ Last 30 Days ============ */
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayOrders = processedOrders.filter((o: any) =>
        (o.orderDate || o.createdAt || "").startsWith(dateStr)
      );
      last30Days.push({
        date: dateStr,
        label: d.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        gst: dayOrders.reduce((s: number, o: any) => s + o._gstAmount, 0),
        taxable: dayOrders.reduce((s: number, o: any) => s + o._baseAmount, 0),
        orders: dayOrders.length,
      });
    }

    /* ============ Last 12 Months ============ */
    const last12Months = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthStr = d.toISOString().slice(0, 7);
      const mOrders = processedOrders.filter((o: any) =>
        (o.orderDate || o.createdAt || "").startsWith(monthStr)
      );
      last12Months.push({
        label: d.toLocaleDateString("en-IN", {
          month: "short",
          year: "2-digit",
        }),
        gst: mOrders.reduce((s: number, o: any) => s + o._gstAmount, 0),
        taxable: mOrders.reduce((s: number, o: any) => s + o._baseAmount, 0),
        orders: mOrders.length,
      });
    }

    /* ============ Top GST Orders ============ */
    const topGstOrders = [...processedOrders]
      .sort((a: any, b: any) => b._gstAmount - a._gstAmount)
      .slice(0, 10);

    /* ============ Return Response ============ */
    return NextResponse.json({
      stats: {
        totalTaxableValue,
        totalGstCollected,
        totalInvoiceValue,
        avgGstPerOrder,
        paidGst,
        pendingGst,
        totalOrders: processedOrders.length,
        companyGst,
        companyPan,
      },
      orders: processedOrders,
      rateData,
      last12Months,
      last30Days,
      topGstOrders,
      b2bStats,
      b2cStats,
    });
  } catch (err: any) {
    console.error("GST Report error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}