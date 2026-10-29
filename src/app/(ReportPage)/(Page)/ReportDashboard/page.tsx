"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import PageNavbar from "../../(Page)/Sidebar/Navbar/PageNavbar";
import PageFooter from "../../(Page)/Sidebar/Footer/page";
import Sidebars from "../../(Page)/Sidebar/Sidebars/PageSidebar";

function DashboardContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "sales";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<any>({
    stats: {},
    last7Days: [],
    last12Months: [],
    statusBreakdown: [],
    topProducts: [],
    topCustomers: [],
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((d) => {
        setData({
          stats: d.stats || {},
          last7Days: d.last7Days || [],
          last12Months: d.last12Months || [],
          statusBreakdown: d.statusBreakdown || [],
          topProducts: d.topProducts || [],
          topCustomers: d.topCustomers || [],
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const COLORS = [
    "#007bff",
    "#28a745",
    "#ffc107",
    "#dc3545",
    "#17a2b8",
    "#6f42c1",
  ];

  const stats = data.stats || {};

  return (
    <div className="wrapper">
      <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
        <PageNavbar toggleSidebar={toggleSidebar} />

        <section className="p-4">
          <div className="container-fluid">
            {/* Header */}
            <div className="bg-primary text-white p-3 rounded shadow mb-4">
              <h4 className="mb-0 fw-bold">
                <i className="fa fa-chart-pie me-2"></i>
                Report Dashboard
              </h4>
              <small className="text-white-50">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </small>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-4">
              {[
                { key: "sales", label: "Sales", icon: "fa-rupee-sign" },
                { key: "orders", label: "Orders", icon: "fa-shopping-cart" },
                { key: "stock", label: "Stock", icon: "fa-boxes" },
                { key: "users", label: "Users", icon: "fa-users" },
              ].map((t) => (
                <li className="nav-item" key={t.key}>
                  <a
                    href={`/ReportDashboard?tab=${t.key}`}
                    className={`nav-link ${
                      tab === t.key ? "active fw-bold" : ""
                    }`}
                  >
                    <i className={`fa ${t.icon} me-1`}></i>
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* ============ SALES TAB ============ */}
            {tab === "sales" && (
              <>
                <div className="row g-3 mb-4">
                  <div className="col-md-3">
                    <div className="card bg-success text-white">
                      <div className="card-body text-center py-3">
                        <h6>Total Revenue</h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.totalRevenue || 0).toLocaleString(
                            "en-IN"
                          )}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-primary text-white">
                      <div className="card-body text-center py-3">
                        <h6>This Month</h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.monthSales || 0).toLocaleString("en-IN")}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-warning text-dark">
                      <div className="card-body text-center py-3">
                        <h6>Pending Payments</h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.pendingPayments || 0).toLocaleString(
                            "en-IN"
                          )}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-info text-white">
                      <div className="card-body text-center py-3">
                        <h6>Total Orders</h6>
                        <h3 className="mb-0">{stats.totalOrders || 0}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 12-Month Revenue Chart */}
                <div className="card shadow mb-4">
                  <div className="card-header bg-primary text-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-chart-line me-2"></i>
                      12 Months Revenue Trend
                    </h6>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={data.last12Months}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#28a745"
                          strokeWidth={3}
                          name="Revenue (₹)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}

            {/* ============ ORDERS TAB ============ */}
            {tab === "orders" && (
              <>
                <div className="row g-3 mb-4">
                  <div className="col-md-3">
                    <div className="card bg-primary text-white">
                      <div className="card-body text-center py-3">
                        <h6>Total Orders</h6>
                        <h3 className="mb-0">{stats.totalOrders || 0}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-warning text-dark">
                      <div className="card-body text-center py-3">
                        <h6>Pending</h6>
                        <h3 className="mb-0">
                          {stats.pendingOrders || 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-success text-white">
                      <div className="card-body text-center py-3">
                        <h6>Delivered</h6>
                        <h3 className="mb-0">
                          {stats.deliveredOrders || 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-danger text-white">
                      <div className="card-body text-center py-3">
                        <h6>Cancelled</h6>
                        <h3 className="mb-0">
                          {stats.cancelledOrders || 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* Last 7 Days */}
                  <div className="col-lg-6 mb-4">
                    <div className="card shadow h-100">
                      <div className="card-header bg-primary text-white">
                        <h6 className="mb-0 fw-bold">
                          <i className="fa fa-chart-bar me-2"></i>
                          Last 7 Days Orders
                        </h6>
                      </div>
                      <div className="card-body">
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={data.last7Days}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="orders" fill="#007bff" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Status Pie */}
                  <div className="col-lg-6 mb-4">
                    <div className="card shadow h-100">
                      <div className="card-header bg-warning text-dark">
                        <h6 className="mb-0 fw-bold">
                          <i className="fa fa-chart-pie me-2"></i>
                          Order Status
                        </h6>
                      </div>
                      <div className="card-body">
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={data.statusBreakdown}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              label
                            >
                              {data.statusBreakdown.map(
                                (entry: any, index: number) => (
                                  <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                )
                              )}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ============ STOCK TAB ============ */}
            {tab === "stock" && (
              <>
                <div className="row g-3 mb-4">
                  <div className="col-md-4">
                    <div className="card bg-info text-white">
                      <div className="card-body text-center py-3">
                        <h6>Total Products</h6>
                        <h3 className="mb-0">
                          {stats.totalProducts || 0}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-danger text-white">
                      <div className="card-body text-center py-3">
                        <h6>Low Stock</h6>
                        <h3 className="mb-0">{stats.lowStock || 0}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-warning text-dark">
                      <div className="card-body text-center py-3">
                        <h6>Out of Stock</h6>
                        <h3 className="mb-0">-</h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Products */}
                <div className="card shadow">
                  <div className="card-header bg-primary text-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-trophy me-2"></i>
                      Top Selling Products
                    </h6>
                  </div>
                  <div className="card-body">
                    {data.topProducts.length > 0 ? (
                      <ResponsiveContainer width="100%" height={350}>
                        <BarChart layout="vertical" data={data.topProducts}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis
                            type="category"
                            dataKey="name"
                            width={150}
                          />
                          <Tooltip />
                          <Bar dataKey="sold" fill="#17a2b8" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-center text-muted">
                        No product data available
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* ============ USERS TAB ============ */}
            {tab === "users" && (
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="card bg-primary text-white">
                    <div className="card-body text-center py-4">
                      <i className="fa fa-users fa-3x mb-2"></i>
                      <h6>Total Users</h6>
                      <h2 className="mb-0">{stats.totalUsers || 0}</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-success text-white">
                    <div className="card-body text-center py-4">
                      <i className="fa fa-user-check fa-3x mb-2"></i>
                      <h6>Active Users</h6>
                      <h2 className="mb-0">{stats.activeUsers || 0}</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-info text-white">
                    <div className="card-body text-center py-4">
                      <i className="fa fa-user-shield fa-3x mb-2"></i>
                      <h6>Total Admins</h6>
                      <h2 className="mb-0">{stats.totalAdmins || 0}</h2>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <PageFooter />
      </div>
    </div>
  );
}

export default function ReportDashboard() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}