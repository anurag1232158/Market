"use client";
import { useEffect, useState } from "react";
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

export default function ReportSales() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<any>({
    stats: {},
    last30Days: [],
    last12Months: [],
    paymentBreakdown: [],
    statusBreakdown: [],
    topProducts: [],
    topCustomers: [],
  });

  /* Filters */
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [chartView, setChartView] = useState<"30days" | "12months">("30days");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ============ Fetch Sales ============ */
  const fetchSales = () => {
    const params = new URLSearchParams();
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);

    fetch(`/api/report/sales?${params.toString()}`)
      .then((res) => res.json())
      .then((d) => {
        setData({
          stats: d.stats || {},
          last30Days: d.last30Days || [],
          last12Months: d.last12Months || [],
          paymentBreakdown: d.paymentBreakdown || [],
          statusBreakdown: d.statusBreakdown || [],
          topProducts: d.topProducts || [],
          topCustomers: d.topCustomers || [],
        });
      })
      .catch((err) => console.error("Sales fetch error:", err));
  };

  useEffect(() => {
    fetchSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate]);

  /* ============ Reset Filters ============ */
  const resetFilters = () => {
    setFromDate("");
    setToDate("");
  };

  /* ============ Quick Date Filters ============ */
  const setToday = () => {
    const today = new Date().toISOString().slice(0, 10);
    setFromDate(today);
    setToDate(today);
  };

  const setThisWeek = () => {
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);
    setFromDate(weekAgo.toISOString().slice(0, 10));
    setToDate(today.toISOString().slice(0, 10));
  };

  const setThisMonth = () => {
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    setFromDate(monthStart.toISOString().slice(0, 10));
    setToDate(today.toISOString().slice(0, 10));
  };

  const setLast30Days = () => {
    const today = new Date();
    const d = new Date();
    d.setDate(today.getDate() - 30);
    setFromDate(d.toISOString().slice(0, 10));
    setToDate(today.toISOString().slice(0, 10));
  };

  /* ============ Export CSV ============ */
  const exportCSV = () => {
    const activeData =
      chartView === "30days" ? data.last30Days : data.last12Months;

    if (!activeData || activeData.length === 0) {
      alert("⚠️ No data to export");
      return;
    }

    const headers = ["Period", "Revenue", "Orders"];
    const rows = activeData.map((d: any) => [
      d.label,
      d.revenue || 0,
      d.orders || 0,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((r: any[]) =>
        r.map((cell: any) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sales-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ============ Print ============ */
  const printReport = () => {
    window.print();
  };

  /* ============ Helpers ============ */
  const COLORS = [
    "#007bff",
    "#28a745",
    "#ffc107",
    "#dc3545",
    "#17a2b8",
    "#6f42c1",
    "#fd7e14",
    "#20c997",
  ];

  const stats = data.stats || {};
  const chartData = chartView === "30days" ? data.last30Days : data.last12Months;

  return (
    <div className="wrapper">
      <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
        <PageNavbar toggleSidebar={toggleSidebar} />

        <section className="p-4">
          <div className="container-fluid">
            {/* ============ Header ============ */}
            <div className="bg-success text-white p-3 rounded shadow mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h4 className="mb-0 fw-bold">
                    <i className="fa fa-chart-line me-2"></i>
                    Sales Report
                  </h4>
                  <small className="text-white-50">
                    Sales analytics and insights
                  </small>
                </div>
                <div className="d-flex gap-2 mt-2 mt-md-0">
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={exportCSV}
                  >
                    <i className="fa fa-download me-1"></i> Export CSV
                  </button>
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={printReport}
                  >
                    <i className="fa fa-print me-1"></i> Print
                  </button>
                </div>
              </div>
            </div>

        {/* ============ Stats Cards ============ */}
<div className="row g-3 mb-4">
  {/* Total Revenue */}
  <div className="col-lg-3 col-md-6">
    <div className="card bg-success text-white shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-1 small text-white-50">Total Revenue</h6>
            <h3 className="mb-0">
              ₹{(stats.totalRevenue || 0).toLocaleString("en-IN")}
            </h3>
            <small className="text-white-50">
              All orders (Paid + Pending)
            </small>
          </div>
          <i className="fa fa-rupee-sign fa-3x text-white-50"></i>
        </div>
      </div>
    </div>
  </div>

  {/* Paid Revenue */}
  <div className="col-lg-3 col-md-6">
    <div className="card bg-primary text-white shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-1 small text-white-50">Paid Revenue</h6>
            <h3 className="mb-0">
              ₹{(stats.paidRevenue || 0).toLocaleString("en-IN")}
            </h3>
            <small className="text-white-50">
              {stats.paidOrders || 0} paid orders
            </small>
          </div>
          <i className="fa fa-check-circle fa-3x text-white-50"></i>
        </div>
      </div>
    </div>
  </div>

  {/* Pending Revenue */}
  <div className="col-lg-3 col-md-6">
    <div className="card bg-warning text-dark shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-1 small">Pending Revenue</h6>
            <h3 className="mb-0">
              ₹{(stats.pendingRevenue || 0).toLocaleString("en-IN")}
            </h3>
            <small>{stats.pendingOrders || 0} pending</small>
          </div>
          <i className="fa fa-clock fa-3x"></i>
        </div>
      </div>
    </div>
  </div>

  {/* Cancelled */}
  <div className="col-lg-3 col-md-6">
    <div className="card bg-danger text-white shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-1 small text-white-50">Cancelled</h6>
            <h3 className="mb-0">
              ₹{(stats.cancelledRevenue || 0).toLocaleString("en-IN")}
            </h3>
            <small className="text-white-50">
              {stats.cancelledOrders || 0} cancelled
            </small>
          </div>
          <i className="fa fa-times-circle fa-3x text-white-50"></i>
        </div>
      </div>
    </div>
  </div>
</div>

{/* ============ Second Row: Orders & Value ============ */}
<div className="row g-3 mb-4">
  {/* Total Orders */}
  <div className="col-lg-3 col-md-6">
    <div className="card border-start border-4 border-primary">
      <div className="card-body">
        <h6 className="text-muted small">Total Orders</h6>
        <h3 className="mb-0 text-primary">{stats.totalOrders || 0}</h3>
      </div>
    </div>
  </div>

  {/* Avg Order Value */}
  <div className="col-lg-3 col-md-6">
    <div className="card border-start border-4 border-info">
      <div className="card-body">
        <h6 className="text-muted small">Avg Order Value</h6>
        <h3 className="mb-0 text-info">
          ₹{(stats.avgOrderValue || 0).toLocaleString("en-IN")}
        </h3>
      </div>
    </div>
  </div>

  {/* Today */}
  <div className="col-lg-3 col-md-6">
    <div className="card border-start border-4 border-success">
      <div className="card-body">
        <h6 className="text-muted small">Today</h6>
        <h3 className="mb-0 text-success">
          ₹{(stats.todayRevenue || 0).toLocaleString("en-IN")}
        </h3>
        <small className="text-muted">{stats.todayOrders || 0} orders</small>
      </div>
    </div>
  </div>

  {/* This Month */}
  <div className="col-lg-3 col-md-6">
    <div className="card border-start border-4 border-warning">
      <div className="card-body">
        <h6 className="text-muted small">This Month</h6>
        <h3 className="mb-0 text-warning">
          ₹{(stats.monthRevenue || 0).toLocaleString("en-IN")}
        </h3>
        <small className="text-muted">{stats.monthOrders || 0} orders</small>
      </div>
    </div>
  </div>
</div>

            {/* ============ Month Summary ============ */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="card border-start border-4 border-success">
                  <div className="card-body">
                    <h6 className="text-muted small">This Month</h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="mb-0 text-success">
                        ₹{(stats.monthRevenue || 0).toLocaleString("en-IN")}
                      </h3>
                      <span className="badge bg-success">
                        {stats.monthOrders || 0} orders
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-start border-4 border-primary">
                  <div className="card-body">
                    <h6 className="text-muted small">Paid Orders</h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="mb-0 text-primary">
                        {stats.paidOrders || 0}
                      </h3>
                      <span className="badge bg-primary">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ Filters ============ */}
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="row g-2 align-items-end">
                  <div className="col-md-2">
                    <label className="small fw-bold">From</label>
                    <input
                      type="date"
                      className="form-control"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-2">
                    <label className="small fw-bold">To</label>
                    <input
                      type="date"
                      className="form-control"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-8">
                    <label className="small fw-bold d-block">
                      Quick Filters
                    </label>
                    <div className="d-flex flex-wrap gap-1">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success"
                        onClick={setToday}
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success"
                        onClick={setThisWeek}
                      >
                        Last 7 Days
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success"
                        onClick={setThisMonth}
                      >
                        This Month
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success"
                        onClick={setLast30Days}
                      >
                        Last 30 Days
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={resetFilters}
                      >
                        <i className="fa fa-redo"></i> Reset
                      </button>
                    </div>
                  </div>
                </div>

                {(fromDate || toDate) && (
                  <div className="mt-2">
                    <small className="text-muted">
                      <i className="fa fa-filter me-1"></i>
                      Showing data from{" "}
                      {fromDate ? new Date(fromDate).toLocaleDateString("en-IN") : "start"}{" "}
                      to{" "}
                      {toDate ? new Date(toDate).toLocaleDateString("en-IN") : "now"}
                    </small>
                  </div>
                )}
              </div>
            </div>

            {/* ============ Revenue Chart ============ */}
            <div className="card shadow mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h6 className="mb-0 fw-bold">
                  <i className="fa fa-chart-line me-2 text-success"></i>
                  Revenue Trend
                </h6>
                <div className="btn-group btn-group-sm">
                  <button
                    type="button"
                    className={`btn ${
                      chartView === "30days"
                        ? "btn-success"
                        : "btn-outline-success"
                    }`}
                    onClick={() => setChartView("30days")}
                  >
                    Last 30 Days
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      chartView === "12months"
                        ? "btn-success"
                        : "btn-outline-success"
                    }`}
                    onClick={() => setChartView("12months")}
                  >
                    12 Months
                  </button>
                </div>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(value: any) => [
                        `₹${Number(value).toLocaleString("en-IN")}`,
                        "Revenue",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#28a745"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                      name="Revenue (₹)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ============ 2 Charts Row ============ */}
            <div className="row mb-4">
              {/* Payment Methods */}
              <div className="col-lg-6 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-credit-card me-2 text-primary"></i>
                      Payment Methods
                    </h6>
                  </div>
                  <div className="card-body">
                    {data.paymentBreakdown.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={data.paymentBreakdown}
                            dataKey="count"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                          >
                            {data.paymentBreakdown.map(
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
                    ) : (
                      <p className="text-center text-muted py-5">
                        No payment data
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div className="col-lg-6 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-chart-pie me-2 text-warning"></i>
                      Order Status
                    </h6>
                  </div>
                  <div className="card-body">
                    {data.statusBreakdown.length > 0 ? (
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
                    ) : (
                      <p className="text-center text-muted py-5">
                        No status data
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ============ Top Products ============ */}
            <div className="card shadow mb-4">
              <div className="card-header bg-white">
                <h6 className="mb-0 fw-bold">
                  <i className="fa fa-trophy me-2 text-warning"></i>
                  Top Products (by Revenue)
                </h6>
              </div>
              <div className="card-body">
                {data.topProducts.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart layout="vertical" data={data.topProducts}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tick={{ fontSize: 11 }} />
                        <YAxis
                          type="category"
                          dataKey="name"
                          width={150}
                          tick={{ fontSize: 11 }}
                        />
                        <Tooltip
                          formatter={(value: any) => [
                            `₹${Number(value).toLocaleString("en-IN")}`,
                            "Revenue",
                          ]}
                        />
                        <Bar dataKey="revenue" fill="#17a2b8" />
                      </BarChart>
                    </ResponsiveContainer>

                    <hr />

                    <div className="table-responsive">
                      <table className="table table-sm table-bordered mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th className="text-center">Qty Sold</th>
                            <th className="text-end">Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.topProducts.map((p: any, i: number) => (
                            <tr key={i}>
                              <td className="text-center">{i + 1}</td>
                              <td>{p.name}</td>
                              <td className="text-center">
                                <span className="badge bg-primary">
                                  {p.qty}
                                </span>
                              </td>
                              <td className="text-end fw-bold text-success">
                                ₹{p.revenue.toLocaleString("en-IN")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-muted py-5">
                    No product data available
                  </p>
                )}
              </div>
            </div>

            {/* ============ Top Customers ============ */}
            <div className="card shadow mb-4">
              <div className="card-header bg-white">
                <h6 className="mb-0 fw-bold">
                  <i className="fa fa-users me-2 text-primary"></i>
                  Top Customers
                </h6>
              </div>
              <div className="card-body p-0">
                {data.topCustomers.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Customer</th>
                          <th>Phone</th>
                          <th className="text-center">Orders</th>
                          <th className="text-end">Total Spent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.topCustomers.map((c: any, i: number) => (
                          <tr key={i}>
                            <td className="text-center">
                              {i === 0 && "🥇"}
                              {i === 1 && "🥈"}
                              {i === 2 && "🥉"}
                              {i > 2 && i + 1}
                            </td>
                            <td>
                              <strong>{c.name}</strong>
                            </td>
                            <td>{c.phone || "-"}</td>
                            <td className="text-center">
                              <span className="badge bg-info text-dark">
                                {c.count}
                              </span>
                            </td>
                            <td className="text-end fw-bold text-success">
                              ₹{c.amount.toLocaleString("en-IN")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-muted py-5">
                    No customer data
                  </p>
                )}
              </div>
            </div>

            {/* ============ Info Notice ============ */}
            <div className="alert alert-info mt-4">
              <i className="fa fa-info-circle me-2"></i>
              <strong>Read-only access:</strong> As a Report user, आप सिर्फ
              sales data देख सकते हैं — edit, delete नहीं कर सकते।
            </div>
          </div>
        </section>

        <PageFooter />
      </div>
    </div>
  );
}