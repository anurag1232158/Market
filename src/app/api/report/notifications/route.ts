// src/app/api/report/notifications/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb } from "../../../../../lib/db";

/* ============================================================
   GET — Report Notifications (read-only, no edit links)
   ============================================================ */
export async function GET(req: NextRequest) {
  try {
    const db = await readDb();

    const orders = Array.isArray(db.order) ? db.order : [];
    const users = Array.isArray(db.user) ? db.user : [];
    const payments = Array.isArray(db.payment) ? db.payment : [];
    const inventory = Array.isArray(db.inventory) ? db.inventory : [];
    const enquiries = Array.isArray(db.enquiry) ? db.enquiry : [];

    const notifications: any[] = [];

    /* 🛒 Recent Orders */
    [...orders]
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt || b.orderDate || 0).getTime() -
          new Date(a.createdAt || a.orderDate || 0).getTime()
      )
      .slice(0, 5)
      .forEach((o: any) => {
        notifications.push({
          type: "order",
          icon: "fa-shopping-cart",
          color: "primary",
          text: `New order ${o.orderNo || ""} from ${
            o.customerName || "Customer"
          }`,
          amount: `₹${o.totalAmount || 0}`,
          link: `/OrderReport`,           // ⭐ Report page
          time: o.createdAt || o.orderDate,
        });
      });

    /* 👤 New Users */
    [...users]
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      )
      .slice(0, 3)
      .forEach((u: any) => {
        notifications.push({
          type: "user",
          icon: "fa-user-plus",
          color: "info",
          text: `New user registered: ${
            u.name || u.username || "Unknown"
          }`,
          link: `/ReportHome`,             // ⭐ Report home
          time: u.createdAt,
        });
      });

    /* 💰 Pending Payments */
    payments
      .filter((p: any) => p.status === "Pending")
      .slice(0, 3)
      .forEach((p: any) => {
        notifications.push({
          type: "payment",
          icon: "fa-money-bill-wave",
          color: "warning",
          text: `Payment pending: ${p.paymentId || ""} - ${
            p.customerName || ""
          }`,
          amount: `₹${p.amount || 0}`,
          link: `/PaymentReport`,         // ⭐ Report page
          time: p.paymentDate || p.createdAt,
        });
      });

    /* ⚠️ Low Stock */
    inventory
      .filter(
        (i: any) =>
          i.status === "Low Stock" || i.status === "Out of Stock"
      )
      .slice(0, 3)
      .forEach((i: any) => {
        notifications.push({
          type: "stock",
          icon: "fa-exclamation-triangle",
          color: "danger",
          text: `Low stock: ${i.productName || "Product"} (${
            i.currentStock || 0
          } ${i.unit || ""})`,
          link: `/InventoryReport`,        // ⭐ Report page
          time: i.updatedAt,
        });
      });

    /* ✉️ New Enquiries */
    [...enquiries]
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      )
      .slice(0, 3)
      .forEach((e: any) => {
        notifications.push({
          type: "enquiry",
          icon: "fa-envelope",
          color: "success",
          text: `New enquiry: ${e.subject || "Message"} from ${
            e.name || ""
          }`,
          link: `/EnquiryReport`,          // ⭐ Report page
          time: e.createdAt,
        });
      });

    notifications.sort(
      (a, b) =>
        new Date(b.time || 0).getTime() -
        new Date(a.time || 0).getTime()
    );

    return NextResponse.json({ notifications });
  } catch (err: any) {
    console.error("Report Notifications error:", err);
    return NextResponse.json(
      { error: err.message || "Server error", notifications: [] },
      { status: 500 }
    );
  }
}