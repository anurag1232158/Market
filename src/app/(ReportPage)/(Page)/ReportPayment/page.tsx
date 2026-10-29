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

export default function ReportPayment() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<any>({
    stats: {},
    payments: [],
    methodData: [],
    statusBreakdown: [],
    last30Days: [],
    last12Months: [],
    pendingPaymentsList: [],
    topCustomers: [],
  });

  /* Filters */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [chartView, setChartView] = useState<"30days" | "12months">("30days");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ============ Fetch Payments ============ */
  const fetchPayments = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);
    if (methodFilter) params.set("method", methodFilter);
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);

    fetch(`/api/report/payments?${params.toString()}`)
      .then((res) => res.json())
      .then((d) => {
        setData({
          stats: d.stats || {},
          payments: d.payments || [],
          methodData: d.methodData || [],
          statusBreakdown: d.statusBreakdown || [],
          last30Days: d.last30Days || [],
          last12Months: d.last12Months || [],
          pendingPaymentsList: d.pendingPaymentsList || [],
          topCustomers: d.topCustomers || [],
        });
      })
      .catch((err) => console.error("Payments fetch error:", err));
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, methodFilter, fromDate, toDate]);

  useEffect(() => {
    const timer = setTimeout(() => fetchPayments(), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  /* ============ Reset Filters ============ */
  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setMethodFilter("");
    setFromDate("");
    setToDate("");
    setCurrentPage(0);
  };

  /* ============ Quick Filters ============ */
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

  /* ============ Export CSV ============ */
  const exportCSV = () => {
    if (data.payments.length === 0) {
      alert("⚠️ No data to export");
      return;
    }

    const headers = [
      "Payment ID",
      "Order No",
      "Customer",
      "Phone",
      "Amount",
      "Method",
      "Type",
      "Status",
      "Txn Ref",
      "Payment Date",
    ];

    const rows = data.payments.map((p: any) => [
      p.paymentId || "",
      p.orderNo || "",
      p.customerName || "",
      p.customerPhone || "",
      p.amount || "0",
      p.method || "",
      p.type || "",
      p.status || "",
      p.transactionRef || "",
      (p.paymentDate || p.createdAt || "").slice(0, 10),
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
    a.download = `payment-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ============ Print ============ */
  const printReport = () => {
    window.print();
  };

  /* ============ Pagination ============ */
  const totalPages = Math.ceil(data.payments.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPayments = data.payments.slice(indexOfFirst, indexOfLast);

  /* ============ Helpers ============ */
  const COLORS = [
    "#28a745",
    "#ffc107",
    "#17a2b8",
    "#dc3545",
    "#007bff",
    "#6f42c1",
    "#fd7e14",
    "#20c997",
  ];

  const stats = data.stats || {};
  const chartData = chartView === "30days" ? data.last30Days : data.last12Months;

  const statusBadge = (s?: string) => {
    const map: any = {
      Paid: "bg-success",
      Pending: "bg-warning text-dark",
      Failed: "bg-danger",
      Refunded: "bg-info text-dark",
      Cancelled: "bg-secondary",
    };
    return map[s || ""] || "bg-secondary";
  };

  const fmtDate = (d?: string) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="wrapper">
      <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
        <PageNavbar toggleSidebar={toggleSidebar} />

        <section className="p-4">
          <div className="container-fluid">
            {/* ============ Header ============ */}
            <div className="bg-info text-white p-3 rounded shadow mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h4 className="mb-0 fw-bold">
                    <i className="fa fa-money-bill-wave me-2"></i>
                    Payment Report
                  </h4>
                  <small className="text-white-50">
                    Payment tracking and analytics
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
              <div className="col-lg-3 col-md-6">
                <div className="card bg-success text-white shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small text-white-50">
                          Total Received
                        </h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.totalReceived || 0).toLocaleString("en-IN")}
                        </h3>
                        <small className="text-white-50">
                          {stats.paidCount || 0} payments
                        </small>
                      </div>
                      <i className="fa fa-check-circle fa-3x text-white-50"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card bg-warning text-dark shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small">Pending</h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.totalPending || 0).toLocaleString("en-IN")}
                        </h3>
                        <small>{stats.pendingCount || 0} payments</small>
                      </div>
                      <i className="fa fa-clock fa-3x"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card bg-info text-white shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small text-white-50">
                          Refunded
                        </h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.totalRefunded || 0).toLocaleString(
                            "en-IN"
                          )}
                        </h3>
                        <small className="text-white-50">
                          {stats.refundedCount || 0} refunds
                        </small>
                      </div>
                      <i className="fa fa-undo fa-3x text-white-50"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card bg-danger text-white shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small text-white-50">Failed</h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.totalFailed || 0).toLocaleString("en-IN")}
                        </h3>
                        <small className="text-white-50">
                          {stats.failedCount || 0} failed
                        </small>
                      </div>
                      <i className="fa fa-times-circle fa-3x text-white-50"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ Second Row ============ */}
            <div className="row g-3 mb-4">
              <div className="col-lg-4 col-md-6">
                <div className="card border-start border-4 border-primary">
                  <div className="card-body">
                    <h6 className="text-muted small">Total Payments</h6>
                    <h3 className="mb-0 text-primary">
                      {stats.totalPayments || 0}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="card border-start border-4 border-info">
                  <div className="card-body">
                    <h6 className="text-muted small">Avg Payment</h6>
                    <h3 className="mb-0 text-info">
                      ₹{(stats.avgPayment || 0).toLocaleString("en-IN")}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="card border-start border-4 border-success">
                  <div className="card-body">
                    <h6 className="text-muted small">Success Rate</h6>
                    <h3 className="mb-0 text-success">
                      {stats.totalPayments > 0
                        ? Math.round(
                            (stats.paidCount / stats.totalPayments) * 100
                          )
                        : 0}
                      %
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ Filters ============ */}
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="row g-2 align-items-end">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by ID, order, customer..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="col-md-2">
                    <select
                      className="form-control"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">All Status</option>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Failed">Failed</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>

                  <div className="col-md-2">
                    <select
                      className="form-control"
                      value={methodFilter}
                      onChange={(e) => setMethodFilter(e.target.value)}
                    >
                      <option value="">All Methods</option>
                      <option value="COD">COD</option>
                      <option value="UPI">UPI</option>
                      <option value="Card">Card</option>
                      <option value="Net Banking">Net Banking</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Wallet">Wallet</option>
                    </select>
                  </div>

                  <div className="col-md-2">
                    <input
                      type="date"
                      className="form-control"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-2">
                    <input
                      type="date"
                      className="form-control"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-1">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={resetFilters}
                      title="Reset"
                    >
                      <i className="fa fa-redo"></i>
                    </button>
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="mt-2">
                  <small className="text-muted me-2">Quick:</small>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary me-1"
                    onClick={setToday}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary me-1"
                    onClick={setThisWeek}
                  >
                    Last 7 Days
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary me-1"
                    onClick={setThisMonth}
                  >
                    This Month
                  </button>
                </div>
              </div>
            </div>

            {/* ============ Revenue Chart ============ */}
            <div className="card shadow mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h6 className="mb-0 fw-bold">
                  <i className="fa fa-chart-line me-2 text-success"></i>
                  Payment Trend
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
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(value: any) => [
                        `₹${Number(value).toLocaleString("en-IN")}`,
                        "Received",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="received"
                      stroke="#28a745"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      name="Received (₹)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ============ Charts Row ============ */}
            <div className="row mb-4">
              {/* Method Chart */}
              <div className="col-lg-6 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-chart-pie me-2 text-primary"></i>
                      Payment Methods
                    </h6>
                  </div>
                  <div className="card-body">
                    {data.methodData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={data.methodData}
                            dataKey="count"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                          >
                            {data.methodData.map(
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
                        No method data
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Chart */}
              <div className="col-lg-6 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-chart-pie me-2 text-warning"></i>
                      Payment Status
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

            {/* ============ Top Customers ============ */}
            {data.topCustomers.length > 0 && (
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h6 className="mb-0 fw-bold">
                    <i className="fa fa-trophy me-2 text-warning"></i>
                    Top Customers (by Payment)
                  </h6>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Customer</th>
                          <th>Phone</th>
                          <th className="text-center">Payments</th>
                          <th className="text-end">Total Paid</th>
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
                </div>
              </div>
            )}

            {/* ============ Pending Payments ============ */}
            {data.pendingPaymentsList.length > 0 && (
              <div className="card shadow mb-4 border-start border-4 border-warning">
                <div className="card-header bg-warning text-dark">
                  <h6 className="mb-0 fw-bold">
                    <i className="fa fa-clock me-2"></i>
                    Pending Payments ({data.pendingPaymentsList.length})
                  </h6>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Payment ID</th>
                          <th>Order No</th>
                          <th>Customer</th>
                          <th className="text-end">Amount</th>
                          <th>Method</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.pendingPaymentsList.map(
                          (p: any, i: number) => (
                            <tr key={i}>
                              <td className="text-center">{i + 1}</td>
                              <td>
                                <code>{p.paymentId || "-"}</code>
                              </td>
                              <td>
                                <code>{p.orderNo || "-"}</code>
                              </td>
                              <td>
                                <strong>{p.customerName || "-"}</strong>
                              </td>
                              <td className="text-end fw-bold text-warning">
                                ₹{p.amount || 0}
                              </td>
                              <td>
                                <span className="badge bg-primary">
                                  {p.method || "-"}
                                </span>
                              </td>
                              <td>{fmtDate(p.paymentDate || p.createdAt)}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ============ All Payments Table ============ */}
            <div className="card shadow">
              <div className="card-header bg-white">
                <h6 className="mb-0 fw-bold">
                  <i className="fa fa-list me-2 text-primary"></i>
                  All Payments ({data.payments.length})
                </h6>
              </div>
              <div className="card-body p-0">
                <div
                  className="table-responsive"
                  style={{ maxHeight: "600px", overflowY: "auto" }}
                >
                  <table className="table table-bordered table-hover mb-0">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th>#</th>
                        <th>Payment ID</th>
                        <th>Order No</th>
                        <th>Customer</th>
                        <th className="text-end">Amount</th>
                        <th>Method</th>
                        <th>Type</th>
                        <th>Txn Ref</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPayments.length > 0 ? (
                        currentPayments.map((p: any, idx: number) => (
                          <tr key={p.id || idx}>
                            <td className="text-center">
                              {indexOfFirst + idx + 1}
                            </td>
                            <td>
                              <code className="bg-light p-1 rounded">
                                {p.paymentId || "-"}
                              </code>
                            </td>
                            <td>
                              <code>{p.orderNo || "-"}</code>
                            </td>
                            <td>
                              <strong>{p.customerName || "-"}</strong>
                              {p.customerPhone && (
                                <small className="d-block text-muted">
                                  {p.customerPhone}
                                </small>
                              )}
                            </td>
                            <td className="text-end fw-bold text-success">
                              ₹{p.amount || 0}
                            </td>
                            <td>
                              <span className="badge bg-primary">
                                {p.method || "-"}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-secondary">
                                {p.type || "-"}
                              </span>
                            </td>
                            <td>
                              <small className="text-muted">
                                {p.transactionRef || "-"}
                              </small>
                            </td>
                            <td>
                              {fmtDate(p.paymentDate || p.createdAt)}
                            </td>
                            <td className="text-center">
                              <span
                                className={`badge ${statusBadge(p.status)}`}
                              >
                                {p.status || "-"}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={10} className="text-center py-4">
                            <i className="fa fa-inbox fa-3x text-muted d-block mb-2"></i>
                            <p className="text-muted mb-0">
                              No payments found
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="card-footer">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <small className="text-muted">
                      Showing {indexOfFirst + 1}–
                      {Math.min(indexOfLast, data.payments.length)} of{" "}
                      {data.payments.length}
                    </small>
                    <div className="d-flex gap-1">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        disabled={currentPage === 0}
                        onClick={() =>
                          setCurrentPage((p) => Math.max(0, p - 1))
                        }
                      >
                        <i className="fa fa-chevron-left"></i> Prev
                      </button>
                      <span className="btn btn-sm btn-primary disabled">
                        {currentPage + 1} / {totalPages}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        disabled={currentPage >= totalPages - 1}
                        onClick={() =>
                          setCurrentPage((p) =>
                            Math.min(totalPages - 1, p + 1)
                          )
                        }
                      >
                        Next <i className="fa fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ============ Info Notice ============ */}
            <div className="alert alert-info mt-4">
              <i className="fa fa-info-circle me-2"></i>
              <strong>Read-only access:</strong> As a Report user, आप सिर्फ
              payments देख सकते हैं — edit, delete नहीं कर सकते।
            </div>
          </div>
        </section>

        <PageFooter />
      </div>
    </div>
  );
}