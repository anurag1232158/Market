import { NextRequest, NextResponse } from "next/server";
import { readDb } from "../../../../lib/db";

/* ============================================================
   Helpers
   ============================================================ */
const getDateStr = (d: Date) => d.toISOString().split("T")[0];

const getDayLabel = (d: Date) =>
  d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

const getMonthLabel = (d: Date) =>
  d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });

/* ============================================================
   GET — Dashboard data
   ============================================================ */
export async function GET(req: NextRequest) {
  const db = await readDb();

  const orders = Array.isArray(db.order) ? db.order : [];
  const users = Array.isArray(db.user) ? db.user : [];
  const admins = Array.isArray(db.admin) ? db.admin : [];
  const reports = Array.isArray(db.report) ? db.report : [];
  const products = Array.isArray(db.product) ? db.product : [];
  const payments = Array.isArray(db.payment) ? db.payment : [];
  const inventory = Array.isArray(db.inventory) ? db.inventory : [];
  const enquiries = Array.isArray(db.enquiry) ? db.enquiry : [];
  const coupons = Array.isArray(db.coupon) ? db.coupon : [];
  const blogs = Array.isArray(db.blog) ? db.blog : [];

  const today = getDateStr(new Date());
  const thisMonth = today.slice(0, 7); // YYYY-MM

  /* ============ Stats ============ */
  const totalRevenue = orders
    .filter(
      (o: any) =>
        o.paymentStatus === "Paid" || o.orderStatus === "Delivered"
    )
    .reduce((s: number, o: any) => s + (Number(o.totalAmount) || 0), 0);

  const todayOrders = orders.filter((o: any) =>
    (o.orderDate || o.createdAt || "").startsWith(today)
  ).length;

  const monthSales = orders
    .filter((o: any) =>
      (o.orderDate || o.createdAt || "").startsWith(thisMonth)
    )
    .reduce((s: number, o: any) => s + (Number(o.totalAmount) || 0), 0);

  const pendingOrders = orders.filter(
    (o: any) => o.orderStatus === "Pending"
  ).length;

  const pendingPayments = payments
    .filter((p: any) => p.status === "Pending")
    .reduce((s: number, p: any) => s + (Number(p.amount) || 0), 0);

  const lowStock = inventory.filter(
    (i: any) =>
      i.status === "Low Stock" || i.status === "Out of Stock"
  ).length;

  const deliveredOrders = orders.filter(
    (o: any) => o.orderStatus === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (o: any) => o.orderStatus === "Cancelled"
  ).length;

  const activeUsers = users.filter(
    (u: any) => u.status !== "Blocked"
  ).length;

  const stats = {
    totalRevenue,
    totalOrders: orders.length,
    totalUsers: users.length + admins.length + reports.length,
    totalProducts: products.length,
    todayOrders,
    pendingOrders,
    pendingPayments,
    monthSales,
    lowStock,
    deliveredOrders,
    cancelledOrders,
    activeUsers,
    totalAdmins: admins.length,
    totalReports: reports.length,
    totalEnquiries: enquiries.length,
    totalCoupons: coupons.length,
    totalBlogs: blogs.length,
  };

  /* ============ Last 7 Days ============ */
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = getDateStr(d);
    const dayOrders = orders.filter((o: any) =>
      (o.orderDate || o.createdAt || "").startsWith(dateStr)
    );
    last7Days.push({
      label: getDayLabel(d),
      orders: dayOrders.length,
      revenue: dayOrders.reduce(
        (s: number, o: any) => s + (Number(o.totalAmount) || 0),
        0
      ),
    });
  }

  /* ============ Last 12 Months ============ */
  const last12Months = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const monthStr = d.toISOString().slice(0, 7);
    const monthOrders = orders.filter((o: any) =>
      (o.orderDate || o.createdAt || "").startsWith(monthStr)
    );
    last12Months.push({
      label: getMonthLabel(d),
      revenue: monthOrders.reduce(
        (s: number, o: any) => s + (Number(o.totalAmount) || 0),
        0
      ),
    });
  }

  /* ============ Status Breakdown ============ */
  const statusBreakdown = [
    {
      name: "Pending",
      value: orders.filter((o: any) => o.orderStatus === "Pending").length,
    },
    {
      name: "Shipped",
      value: orders.filter((o: any) => o.orderStatus === "Shipped").length,
    },
    {
      name: "Delivered",
      value: orders.filter((o: any) => o.orderStatus === "Delivered").length,
    },
    {
      name: "Cancelled",
      value: orders.filter((o: any) => o.orderStatus === "Cancelled").length,
    },
  ];

  /* ============ Top Products ============ */
  const productCount: { [key: string]: number } = {};
  orders.forEach((o: any) => {
    try {
      const items = JSON.parse(o.items || "[]");
      items.forEach((it: any) => {
        const name = it.name || "Unknown";
        productCount[name] =
          (productCount[name] || 0) + (Number(it.qty) || 0);
      });
    } catch {}
  });

  const topProducts = Object.entries(productCount)
    .map(([name, sold]) => ({ name, sold }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 6);

  /* ============ Recent Data ============ */
  const recentOrders = [...orders]
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt || b.orderDate || 0).getTime() -
        new Date(a.createdAt || a.orderDate || 0).getTime()
    )
    .slice(0, 5);

  const recentUsers = [...users]
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )
    .slice(0, 5);

  const recentEnquiries = [...enquiries]
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )
    .slice(0, 5);

  const lowStockItems = inventory
    .filter(
      (i: any) =>
        i.status === "Low Stock" || i.status === "Out of Stock"
    )
    .slice(0, 5);

  return NextResponse.json({
    stats,
    last7Days,
    last12Months,
    statusBreakdown,
    topProducts,
    recentOrders,
    recentUsers,
    recentEnquiries,
    lowStock: lowStockItems,
  });
}