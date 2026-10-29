"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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
import PageFooter from "../Sidebar/Footer/Footer";
import Sidebars from "../../(Page)/Sidebar/Sidebars/PageSidebar";

export default function ReportReturnRefund() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<any>({
    stats: {},
    returns: [],
    reasonData: [],
    statusBreakdown: [],
    topReturnedProducts: [],
    topReturningCustomers: [],
    last30Days: [],
    last12Months: [],
    paymentRefunds: [],
  });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [reasonFilter, setReasonFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [chartView, setChartView] = useState<"30days" | "12months">("12months");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const fetchData = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);
    if (reasonFilter) params.set("reason", reasonFilter);
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);
    fetch(`/api/report/return-refund?${params.toString()}`)
      .then((res) => res.json())
      .then((d) => {
        setData({
          stats: d.stats || {},
          returns: d.returns || [],
          reasonData: d.reasonData || [],
          statusBreakdown: d.statusBreakdown || [],
          topReturnedProducts: d.topReturnedProducts || [],
          topReturningCustomers: d.topReturningCustomers || [],
          last30Days: d.last30Days || [],
          last12Months: d.last12Months || [],
          paymentRefunds: d.paymentRefunds || [],
        });
      })
      .catch((err) => console.error("Return Refund fetch error:", err));
  };

  useEffect(() => { fetchData();
  }, [statusFilter, reasonFilter, fromDate, toDate]);

  useEffect(() => {
    const timer = setTimeout(() => fetchData(), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setReasonFilter("");
    setFromDate("");
    setToDate("");
    setCurrentPage(0);
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

  const setThisYear = () => {
    const today = new Date();
    const yearStart = new Date(today.getFullYear(), 0, 1);
    setFromDate(yearStart.toISOString().slice(0, 10));
    setToDate(today.toISOString().slice(0, 10));
  };

  /* ============ Export CSV ============ */
  const exportCSV = () => {
    if (data.returns.length === 0) {
      alert("⚠️ No data to export");
      return;
    }

    const headers = [
      "Order No",
      "Customer",
      "Phone",
      "Product",
      "Reason",
      "Order Amount",
      "Refund Amount",
      "Status",
      "Return Date",
    ];

    const rows = data.returns.map((r: any) => [
      r.orderNo || "",
      r.customerName || "",
      r.customerPhone || "",
      r.productNames || "",
      r.reason || "",
      r.totalAmount || "0",
      r.refundAmount || "0",
      r.status || "",
      (r.returnDate || "").slice(0, 10),
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
    a.download = `return-refund-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  /* ============ Print ============ */
  const printReport = () => window.print();

  /* ============ Pagination ============ */
  const totalPages = Math.ceil(data.returns.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentReturns = data.returns.slice(indexOfFirst, indexOfLast);

  /* ============ Helpers ============ */
  const COLORS = [
    "#dc3545",
    "#ffc107",
    "#28a745",
    "#17a2b8",
    "#6f42c1",
    "#fd7e14",
    "#20c997",
    "#e83e8c",
  ];

  const statusBadge = (s?: string) => {
    const map: any = {
      Approved: "bg-success",
      Pending: "bg-warning text-dark",
      Rejected: "bg-danger",
      Processing: "bg-info text-dark",
      "In Progress": "bg-info text-dark",
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
            <div className="bg-danger text-white p-3 rounded shadow mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h4 className="mb-0 fw-bold">
                    <i className="fa fa-undo me-2"></i>
                    Return & Refund Report
                  </h4>
                  <small className="text-white-50">
                    Returns, refunds और reasons का analysis
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

            {/* ============ Main Stats ============ */}
            <div className="row g-3 mb-4">
              <div className="col-lg-3 col-md-6">
                <div className="card bg-danger text-white shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small text-white-50">
                          Total Returns
                        </h6>
                        <h3 className="mb-0">{stats.totalReturns || 0}</h3>
                        <small className="text-white-50">
                          Today: {stats.todayReturns || 0}
                        </small>
                      </div>
                      <i className="fa fa-undo fa-3x text-white-50"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card bg-warning text-dark shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small">Refund Amount</h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.totalRefundAmount || 0).toLocaleString(
                            "en-IN"
                          )}
                        </h3>
                        <small>
                          Avg: ₹{(stats.avgRefundAmount || 0).toLocaleString("en-IN")}
                        </small>
                      </div>
                      <i className="fa fa-rupee-sign fa-3x"></i>
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
                          Return Rate
                        </h6>
                        <h3 className="mb-0">{stats.returnRate || 0}%</h3>
                        <small className="text-white-50">
                          of {stats.totalOrdersCount || 0} orders
                        </small>
                      </div>
                      <i className="fa fa-percentage fa-3x text-white-50"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card bg-secondary text-white shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small text-white-50">
                          Avg Days to Return
                        </h6>
                        <h3 className="mb-0">
                          {stats.avgDaysToReturn || 0} days
                        </h3>
                        <small className="text-white-50">
                          Items: {stats.returnedItemsCount || 0}
                        </small>
                      </div>
                      <i className="fa fa-clock fa-3x text-white-50"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ Secondary Stats ============ */}
            <div className="row g-3 mb-4">
              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-success">
                  <div className="card-body">
                    <h6 className="text-muted small">
                      <i className="fa fa-check-circle me-1 text-success"></i>
                      Approved
                    </h6>
                    <h4 className="mb-0 text-success">
                      {stats.approved || 0}
                    </h4>
                    <small className="text-muted">
                      ₹
                      {(stats.approvedAmount || 0).toLocaleString("en-IN")}
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-warning">
                  <div className="card-body">
                    <h6 className="text-muted small">
                      <i className="fa fa-clock me-1 text-warning"></i>
                      Pending
                    </h6>
                    <h4 className="mb-0 text-warning">
                      {stats.pending || 0}
                    </h4>
                    <small className="text-muted">
                      ₹
                      {(stats.pendingAmount || 0).toLocaleString("en-IN")}
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-danger">
                  <div className="card-body">
                    <h6 className="text-muted small">
                      <i className="fa fa-times-circle me-1 text-danger"></i>
                      Rejected
                    </h6>
                    <h4 className="mb-0 text-danger">
                      {stats.rejected || 0}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-info">
                  <div className="card-body">
                    <h6 className="text-muted small">
                      <i className="fa fa-spinner me-1 text-info"></i>
                      Processing
                    </h6>
                    <h4 className="mb-0 text-info">
                      {stats.processing || 0}
                    </h4>
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
                      placeholder="Search order, customer, product..."
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
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Processing">Processing</option>
                    </select>
                  </div>

                  <div className="col-md-2">
                    <select
                      className="form-control"
                      value={reasonFilter}
                      onChange={(e) => setReasonFilter(e.target.value)}
                    >
                      <option value="">All Reasons</option>
                      {data.reasonData.map((r: any) => (
                        <option key={r.name} value={r.name}>
                          {r.name}
                        </option>
                      ))}
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

                <div className="mt-2">
                  <small className="text-muted me-2">Quick:</small>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger me-1"
                    onClick={setToday}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger me-1"
                    onClick={setThisWeek}
                  >
                    Last 7 Days
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger me-1"
                    onClick={setThisMonth}
                  >
                    This Month
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={setThisYear}
                  >
                    This Year
                  </button>
                </div>
              </div>
            </div>

            {/* ============ Trend Chart ============ */}
            <div className="card shadow mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h6 className="mb-0 fw-bold">
                  <i className="fa fa-chart-line me-2 text-danger"></i>
                  Return & Refund Trend
                </h6>
                <div className="btn-group btn-group-sm">
                  <button
                    type="button"
                    className={`btn ${
                      chartView === "30days"
                        ? "btn-danger"
                        : "btn-outline-danger"
                    }`}
                    onClick={() => setChartView("30days")}
                  >
                    Last 30 Days
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      chartView === "12months"
                        ? "btn-danger"
                        : "btn-outline-danger"
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
                    <YAxis
                      yAxisId="left"
                      tick={{ fontSize: 11 }}
                      allowDecimals={false}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip
                      formatter={(value: any, name: any) => {
                        if (name === "Amount")
                          return [
                            `₹${Number(value).toLocaleString("en-IN")}`,
                            name,
                          ];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="count"
                      stroke="#dc3545"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      name="Returns"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="amount"
                      stroke="#ffc107"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      name="Amount"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ============ Charts Row ============ */}
            <div className="row mb-4">
              {/* Reason Pie */}
              <div className="col-lg-4 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-info-circle me-2 text-danger"></i>
                      Return Reasons
                    </h6>
                  </div>
                  <div className="card-body">
                    {data.reasonData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                          <Pie
                            data={data.reasonData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            label
                          >
                            {data.reasonData.map(
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
                        No reason data
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Pie */}
              <div className="col-lg-4 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-check-circle me-2 text-success"></i>
                      Refund Status
                    </h6>
                  </div>
                  <div className="card-body">
                    {data.statusBreakdown.length > 0 ? (
                      <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                          <Pie
                            data={data.statusBreakdown}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
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

              {/* Top Products Bar */}
              <div className="col-lg-4 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-box me-2 text-warning"></i>
                      Top Returned Products
                    </h6>
                  </div>
                  <div className="card-body">
                    {data.topReturnedProducts.length > 0 ? (
                      <ResponsiveContainer width="100%" height={280}>
                        <BarChart
                          layout="vertical"
                          data={data.topReturnedProducts.slice(0, 6)}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" tick={{ fontSize: 11 }} />
                          <YAxis
                            type="category"
                            dataKey="name"
                            width={100}
                            tick={{ fontSize: 10 }}
                          />
                          <Tooltip />
                          <Bar dataKey="amount" fill="#dc3545" name="Refund ₹" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-center text-muted py-5">
                        No product data
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ============ Top Customers & Payment ============ */}
            <div className="row mb-4">
              {/* Top Returning Customers */}
              <div className="col-lg-6 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-users me-2 text-danger"></i>
                      Top Returning Customers
                    </h6>
                  </div>
                  <div className="card-body p-0">
                    {data.topReturningCustomers.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>#</th>
                              <th>Customer</th>
                              <th>Phone</th>
                              <th className="text-center">Returns</th>
                              <th className="text-end">Refund ₹</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.topReturningCustomers.map(
                              (c: any, i: number) => (
                                <tr key={i}>
                                  <td className="text-center">{i + 1}</td>
                                  <td>
                                    <strong>{c.name}</strong>
                                  </td>
                                  <td>{c.phone || "-"}</td>
                                  <td className="text-center">
                                    <span className="badge bg-danger">
                                      {c.count}
                                    </span>
                                  </td>
                                  <td className="text-end fw-bold text-danger">
                                    ₹{c.amount.toLocaleString("en-IN")}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center text-muted py-5 mb-0">
                        No customer data
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method Refunds */}
              <div className="col-lg-6 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-credit-card me-2 text-info"></i>
                      Refunds by Payment Method
                    </h6>
                  </div>
                  <div className="card-body p-0">
                    {data.paymentRefunds.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>#</th>
                              <th>Method</th>
                              <th className="text-end">Refund Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.paymentRefunds.map(
                              (p: any, i: number) => (
                                <tr key={i}>
                                  <td className="text-center">{i + 1}</td>
                                  <td>
                                    <span className="badge bg-info text-dark">
                                      {p.name}
                                    </span>
                                  </td>
                                  <td className="text-end fw-bold">
                                    ₹{p.amount.toLocaleString("en-IN")}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center text-muted py-5 mb-0">
                        No payment data
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ============ All Returns Table ============ */}
            <div className="card shadow">
              <div className="card-header bg-white">
                <h6 className="mb-0 fw-bold">
                  <i className="fa fa-list me-2 text-primary"></i>
                  All Returns & Refunds ({data.returns.length})
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
                        <th>Order No</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Reason</th>
                        <th className="text-end">Order ₹</th>
                        <th className="text-end">Refund ₹</th>
                        <th className="text-center">Status</th>
                        <th>Return Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentReturns.length > 0 ? (
                        currentReturns.map((r: any, idx: number) => (
                          <tr key={r.id || idx}>
                            <td className="text-center">
                              {indexOfFirst + idx + 1}
                            </td>
                            <td>
                              <code className="bg-light p-1 rounded">
                                {r.orderNo || "-"}
                              </code>
                            </td>
                            <td>
                              <strong>{r.customerName || "-"}</strong>
                              {r.customerPhone && (
                                <small className="d-block text-muted">
                                  {r.customerPhone}
                                </small>
                              )}
                            </td>
                            <td>
                              {(r.productNames || "-").slice(0, 30)}
                              {(r.productNames || "").length > 30
                                ? "..."
                                : ""}
                            </td>
                            <td>
                              <span
                                className="badge bg-light text-dark border"
                                title={r.reason}
                              >
                                {(r.reason || "-").slice(0, 25)}
                                {(r.reason || "").length > 25 ? "..." : ""}
                              </span>
                            </td>
                            <td className="text-end">
                              ₹{r.totalAmount.toLocaleString("en-IN")}
                            </td>
                            <td className="text-end fw-bold text-danger">
                              ₹{r.refundAmount.toLocaleString("en-IN")}
                            </td>
                            <td className="text-center">
                              <span
                                className={`badge ${statusBadge(r.status)}`}
                              >
                                {r.status || "-"}
                              </span>
                            </td>
                            <td>{fmtDate(r.returnDate)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9} className="text-center py-4">
                            <i className="fa fa-inbox fa-3x text-muted d-block mb-2"></i>
                            <p className="text-muted mb-0">
                              No returns or refunds found
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
                      {Math.min(indexOfLast, data.returns.length)} of{" "}
                      {data.returns.length}
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

            {/* Info Notice */}
            <div className="alert alert-info mt-4">
              <i className="fa fa-info-circle me-2"></i>
              <strong>Read-only:</strong> As a Report user, आप सिर्फ returns &
              refunds देख सकते हैं — modify नहीं कर सकते।
            </div>
          </div>
        </section>

        <PageFooter />
      </div>
    </div>
  );
}