"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import PageFooter from "../Sidebar/Footer/Footer";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import ASO from "../AOS/AOS";

/* ============================================================
   TYPES
   ============================================================ */
type Stats = {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  todayOrders: number;
  pendingOrders: number;
  pendingPayments: number;
  monthSales: number;
  lowStock: number;
  deliveredOrders: number;
  cancelledOrders: number;
  activeUsers: number;
  totalAdmins: number;
  totalReports: number;
  totalEnquiries: number;
  totalCoupons: number;
  totalBlogs: number;
};

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    todayOrders: 0,
    pendingOrders: 0,
    pendingPayments: 0,
    monthSales: 0,
    lowStock: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    activeUsers: 0,
    totalAdmins: 0,
    totalReports: 0,
    totalEnquiries: 0,
    totalCoupons: 0,
    totalBlogs: 0,
  });

  const [last7Days, setLast7Days] = useState<any[]>([]);
  const [last12Months, setLast12Months] = useState<any[]>([]);
  const [statusBreakdown, setStatusBreakdown] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ============ Fetch Dashboard ============ */
  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats || {});
        setLast7Days(data.last7Days || []);
        setLast12Months(data.last12Months || []);
        setStatusBreakdown(data.statusBreakdown || []);
        setTopProducts(data.topProducts || []);
        setRecentOrders(data.recentOrders || []);
        setRecentUsers(data.recentUsers || []);
        setRecentEnquiries(data.recentEnquiries || []);
        setLowStockItems(data.lowStock || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  /* ============ Stat Cards Config ============ */
  const cards = [
    {
      title: "Total Revenue",
      value: `₹${(stats.totalRevenue || 0).toLocaleString("en-IN")}`,
      icon: "fa-rupee-sign",
      bg: "card-gradient-1",
      link: "/AdminPayment",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders || 0,
      icon: "fa-shopping-cart",
      bg: "card-gradient-2",
      link: "/AdminOrder",
    },
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: "fa-users",
      bg: "card-gradient-3",
      link: "/AdminContactUs",
    },
    {
      title: "Total Products",
      value: stats.totalProducts || 0,
      icon: "fa-box",
      bg: "card-gradient-4",
      link: "/AdminProducts",
    },
    {
      title: "Today's Orders",
      value: stats.todayOrders || 0,
      icon: "fa-calendar-day",
      bg: "card-gradient-5",
      link: "/AdminOrder",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders || 0,
      icon: "fa-clock",
      bg: "card-gradient-6",
      link: "/AdminOrder",
    },
    {
      title: "Pending Payments",
      value: `₹${(stats.pendingPayments || 0).toLocaleString("en-IN")}`,
      icon: "fa-money-bill-wave",
      bg: "card-gradient-1",
      link: "/AdminPayment",
    },
    {
      title: "This Month",
      value: `₹${(stats.monthSales || 0).toLocaleString("en-IN")}`,
      icon: "fa-chart-line",
      bg: "card-gradient-2",
      link: "/AdminPayment",
    },
  ];

  const statusBadge = (s?: string) => {
    const map: any = {
      Pending: "bg-secondary",
      Confirmed: "bg-info text-dark",
      Packed: "bg-primary",
      Shipped: "bg-warning text-dark",
      Delivered: "bg-success",
      Cancelled: "bg-danger",
    };
    return map[s || ""] || "bg-secondary";
  };

  const fmtDate = (d?: string) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <ASO />
      <div className="wrapper">
        <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
          <PageNavbar toggleSidebar={toggleSidebar} />

          <section className="mb-5 pt-4">
            <div className="container-fluid px-4">
              {/* ============================================
                  Header
                  ============================================ */}
              <div className="bg-gradient text-center p-3 mb-4 rounded shadow-lg">
                <h3 className="fw-bold mb-1 text-white">
                  <i className="fa fa-tachometer-alt me-2"></i>
                  Admin Dashboard
                </h3>
                <small className="text-white-50">
                  {new Date().toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </small>
              </div>

              {/* ============================================
                  Quick Actions
                  ============================================ */}
              <div className="mb-4 d-flex flex-wrap gap-2">
                <Link href="/AdminOrder/Add" className="btn btn-sm btn-primary">
                  <i className="fa fa-plus me-1"></i> New Order
                </Link>
                <Link href="/AdminProducts/Add" className="btn btn-sm btn-success">
                  <i className="fa fa-plus me-1"></i> Add Product
                </Link>
                <Link href="/AdminCustomer/Add" className="btn btn-sm btn-info">
                  <i className="fa fa-user-plus me-1"></i> Add Customer
                </Link>
                <Link href="/AdminCoupon/Add" className="btn btn-sm btn-warning">
                  <i className="fa fa-tag me-1"></i> Add Coupon
                </Link>
                <Link href="/AdminBanner/Add" className="btn btn-sm btn-secondary">
                  <i className="fa fa-image me-1"></i> Add Banner
                </Link>
                <Link href="/AdminBlog/Add" className="btn btn-sm btn-dark">
                  <i className="fa fa-blog me-1"></i> Add Blog
                </Link>
              </div>

              {/* ============================================
                  Stat Cards
                  ============================================ */}
              <div className="row g-4 mb-4">
                {cards.map((c, i) => (
                  <div className="col-sm-6 col-md-4 col-xl-3" key={i}>
                    <Link href={c.link} className="text-decoration-none">
                      <div
                        className={`rounded shadow-lg p-4 d-flex align-items-center justify-content-between hover-scale ${c.bg}`}
                      >
                        <div>
                          <h6 className="mb-1 fw-semibold text-white">
                            {c.title}
                          </h6>
                          <h3 className="mb-2 text-white fw-bold">{c.value}</h3>
                          <small className="text-white-50">
                            View Details <i className="fa fa-arrow-right ms-1"></i>
                          </small>
                        </div>
                        <i className={`fa ${c.icon} fa-3x text-white-50`}></i>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* ============================================
                  Row 1: Line Chart + Area Chart
                  ============================================ */}
              <div className="row">
                {/* Line Chart — Last 7 Days */}
                <div className="col-lg-6 mb-4">
                  <div className="bg-light rounded shadow-lg p-4 h-100">
                    <h5 className="mb-4 fw-bold">
                      <i className="fa fa-chart-line text-primary me-2"></i>
                      Last 7 Days Orders
                    </h5>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={last7Days}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="orders"
                          stroke="#8884d8"
                          strokeWidth={3}
                          name="Orders"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Area Chart — 12 Months Revenue */}
                <div className="col-lg-6 mb-4">
                  <div className="bg-light rounded shadow-lg p-4 h-100">
                    <h5 className="mb-4 fw-bold">
                      <i className="fa fa-chart-area text-success me-2"></i>
                      12 Months Revenue
                    </h5>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={last12Months}>
                        <defs>
                          <linearGradient
                            id="colorRevenue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#28a745"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#28a745"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#28a745"
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
                          name="Revenue (₹)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* ============================================
                  Row 2: Status Bar + Top Products
                  ============================================ */}
              <div className="row">
                {/* Bar Chart — Order Status */}
                <div className="col-lg-6 mb-4">
                  <div className="bg-light rounded shadow-lg p-4 h-100">
                    <h5 className="mb-4 fw-bold">
                      <i className="fa fa-chart-bar text-warning me-2"></i>
                      Orders by Status
                    </h5>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={statusBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#ffc107" name="Orders" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Horizontal Bar — Top Products */}
                <div className="col-lg-6 mb-4">
                  <div className="bg-light rounded shadow-lg p-4 h-100">
                    <h5 className="mb-4 fw-bold">
                      <i className="fa fa-trophy text-danger me-2"></i>
                      Top Products
                    </h5>
                    {topProducts.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart layout="vertical" data={topProducts}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis
                            type="category"
                            dataKey="name"
                            width={120}
                            tick={{ fontSize: 11 }}
                          />
                          <Tooltip />
                          <Bar dataKey="sold" fill="#17a2b8" name="Sold Qty" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="text-center py-5 text-muted">
                        <i className="fa fa-box-open fa-3x mb-2"></i>
                        <p>No product data yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ============================================
                  Row 3: Recent Orders + Recent Users
                  ============================================ */}
              <div className="row">
                {/* Recent Orders */}
                <div className="col-lg-6 mb-4">
                  <div className="bg-light rounded shadow-lg p-4 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0 fw-bold">
                        <i className="fa fa-shopping-cart text-primary me-2"></i>
                        Recent Orders
                      </h6>
                      <Link
                        href="/AdminOrder"
                        className="btn btn-sm btn-primary"
                      >
                        View All
                      </Link>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover table-bordered text-center mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Order No</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.length > 0 ? (
                            recentOrders.map((o, i) => (
                              <tr key={i}>
                                <td>
                                  <Link href={`/AdminOrder/View?id=${o.id}`}>
                                    <code>{o.orderNo || "-"}</code>
                                  </Link>
                                </td>
                                <td>
                                  <strong>{o.customerName || "-"}</strong>
                                  <small className="d-block text-muted">
                                    {fmtDate(o.createdAt || o.orderDate)}
                                  </small>
                                </td>
                                <td className="fw-bold text-success">
                                  ₹{o.totalAmount || 0}
                                </td>
                                <td>
                                  <span
                                    className={`badge ${statusBadge(o.orderStatus)}`}
                                  >
                                    {o.orderStatus || "Pending"}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="text-center">
                                No orders yet
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Recent Users */}
                <div className="col-lg-6 mb-4">
                  <div className="bg-light rounded shadow-lg p-4 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0 fw-bold">
                        <i className="fa fa-users text-info me-2"></i>
                        Recent Users
                      </h6>
                      <Link
                        href="/AdminContactUs"
                        className="btn btn-sm btn-info"
                      >
                        View All
                      </Link>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover table-bordered text-center mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentUsers.length > 0 ? (
                            recentUsers.map((u, i) => (
                              <tr key={i}>
                                <td>
                                  <strong>{u.name || u.username || "-"}</strong>
                                </td>
                                <td>{u.number || "-"}</td>
                                <td>{u.city || "-"}</td>
                                <td>
                                  <span className="badge bg-success">
                                    {u.status || "Active"}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="text-center">
                                No users yet
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* ============================================
                  Row 4: Recent Enquiries + Low Stock
                  ============================================ */}
              <div className="row">
                {/* Recent Enquiries */}
                <div className="col-lg-6 mb-4">
                  <div className="bg-light rounded shadow-lg p-4 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0 fw-bold">
                        <i className="fa fa-envelope text-warning me-2"></i>
                        Recent Enquiries
                      </h6>
                      <Link
                        href="/AdminEnquiries"
                        className="btn btn-sm btn-warning"
                      >
                        View All
                      </Link>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover table-bordered text-center mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Priority</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentEnquiries.length > 0 ? (
                            recentEnquiries.map((e, i) => (
                              <tr key={i}>
                                <td>
                                  <strong>{e.name || "-"}</strong>
                                  <small className="d-block text-muted">
                                    {e.number || ""}
                                  </small>
                                </td>
                                <td>
                                  {(e.subject || "").slice(0, 25)}
                                  {(e.subject || "").length > 25 ? "..." : ""}
                                </td>
                                <td>
                                  <span className="badge bg-warning text-dark">
                                    {e.priority || "Medium"}
                                  </span>
                                </td>
                                <td>
                                  <span className="badge bg-info text-dark">
                                    {e.status || "New"}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="text-center">
                                No enquiries yet
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Low Stock */}
                <div className="col-lg-6 mb-4">
                  <div className="bg-light rounded shadow-lg p-4 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0 fw-bold">
                        <i className="fa fa-exclamation-triangle text-danger me-2"></i>
                        Low Stock Alerts
                      </h6>
                      <Link
                        href="/AdminInventory"
                        className="btn btn-sm btn-danger"
                      >
                        View All
                      </Link>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover table-bordered text-center mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Product</th>
                            <th>Stock</th>
                            <th>Reorder</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lowStockItems.length > 0 ? (
                            lowStockItems.map((s, i) => (
                              <tr key={i}>
                                <td>
                                  <strong>{s.productName || "-"}</strong>
                                  <small className="d-block text-muted">
                                    {s.sku || ""}
                                  </small>
                                </td>
                                <td className="fw-bold text-danger">
                                  {s.currentStock || 0} {s.unit || ""}
                                </td>
                                <td>{s.reorderLevel || 0}</td>
                                <td>
                                  <span
                                    className={`badge ${
                                      s.status === "Out of Stock"
                                        ? "bg-danger"
                                        : "bg-warning text-dark"
                                    }`}
                                  >
                                    {s.status}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="text-center text-success">
                                <i className="fa fa-check-circle me-2"></i>
                                All products in stock!
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <PageFooter />
        </div>
      </div>
    </>
  );
}

export default Dashboard;