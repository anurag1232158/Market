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
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import PageFooter from "../Sidebar/Footer/page";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";

export default function ReportGst() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<any>({
    stats: {},
    orders: [],
    rateData: [],
    last12Months: [],
    last30Days: [],
    topGstOrders: [],
    b2bStats: {},
    b2cStats: {},
  });

  /* Filters */
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [chartView, setChartView] = useState<"30days" | "12months">("12months");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ============ Fetch GST ============ */
  const fetchGst = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);

    fetch(`/api/report/gst?${params.toString()}`)
      .then((res) => res.json())
      .then((d) => {
        setData({
          stats: d.stats || {},
          orders: d.orders || [],
          rateData: d.rateData || [],
          last12Months: d.last12Months || [],
          last30Days: d.last30Days || [],
          topGstOrders: d.topGstOrders || [],
          b2bStats: d.b2bStats || {},
          b2cStats: d.b2cStats || {},
        });
      })
      .catch((err) => console.error("GST fetch error:", err));
  };

  useEffect(() => {
    fetchGst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate]);

  useEffect(() => {
    const timer = setTimeout(() => fetchGst(), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  /* ============ Reset ============ */
  const resetFilters = () => {
    setSearch("");
    setFromDate("");
    setToDate("");
    setCurrentPage(0);
  };

  /* ============ Quick Date Filters ============ */
  const setThisMonth = () => {
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    setFromDate(monthStart.toISOString().slice(0, 10));
    setToDate(today.toISOString().slice(0, 10));
  };

  const setLastMonth = () => {
    const today = new Date();
    const monthStart = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    const monthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    setFromDate(monthStart.toISOString().slice(0, 10));
    setToDate(monthEnd.toISOString().slice(0, 10));
  };

  const setThisQuarter = () => {
    const today = new Date();
    const q = Math.floor(today.getMonth() / 3);
    const qStart = new Date(today.getFullYear(), q * 3, 1);
    setFromDate(qStart.toISOString().slice(0, 10));
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
    if (data.orders.length === 0) {
      alert("⚠️ No data to export");
      return;
    }

    const headers = [
      "Order No",
      "Date",
      "Customer",
      "GST No",
      "Taxable Value",
      "GST Rate",
      "GST Amount",
      "Invoice Total",
      "Payment Status",
    ];

    const rows = data.orders.map((o: any) => [
      o.orderNo || "",
      (o.orderDate || o.createdAt || "").slice(0, 10),
      o.customerName || "",
      o.gstNo || "",
      o._baseAmount || "0",
      `${o._gstRate || 0}%`,
      o._gstAmount || "0",
      o.totalAmount || "0",
      o.paymentStatus || "",
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
    a.download = `gst-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ============ Print ============ */
  const printReport = () => {
    window.print();
  };

  /* ============ Pagination ============ */
  const totalPages = Math.ceil(data.orders.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentOrders = data.orders.slice(indexOfFirst, indexOfLast);

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
  const chartData =
    chartView === "30days" ? data.last30Days : data.last12Months;

  const fmtDate = (d?: string) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const paymentBadge = (s?: string) => {
    const map: any = {
      Pending: "bg-warning text-dark",
      Paid: "bg-success",
      Failed: "bg-danger",
      Refunded: "bg-info text-dark",
    };
    return map[s || ""] || "bg-secondary";
  };

  return (
    <div className="wrapper">
      <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
        <PageNavbar toggleSidebar={toggleSidebar} />

        <section className="p-4">
          <div className="container-fluid">
            {/* ============ Header ============ */}
            <div className="bg-warning text-dark p-3 rounded shadow mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h4 className="mb-0 fw-bold">
                    <i className="fa fa-file-invoice me-2"></i>
                    GST Report
                  </h4>
                  <small>
                    Tax collection and GST analytics
                  </small>
                </div>
                <div className="d-flex gap-2 mt-2 mt-md-0">
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={exportCSV}
                  >
                    <i className="fa fa-download me-1"></i> Export CSV
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
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
                <div className="card bg-primary text-white shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small text-white-50">
                          Taxable Value
                        </h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.totalTaxableValue || 0).toLocaleString(
                            "en-IN"
                          )}
                        </h3>
                      </div>
                      <i className="fa fa-calculator fa-3x text-white-50"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card bg-success text-white shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small text-white-50">
                          GST Collected
                        </h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.totalGstCollected || 0).toLocaleString(
                            "en-IN"
                          )}
                        </h3>
                      </div>
                      <i className="fa fa-percent fa-3x text-white-50"></i>
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
                          Invoice Value
                        </h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.totalInvoiceValue || 0).toLocaleString(
                            "en-IN"
                          )}
                        </h3>
                      </div>
                      <i className="fa fa-file-invoice fa-3x text-white-50"></i>
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
                          Avg GST / Order
                        </h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.avgGstPerOrder || 0).toLocaleString(
                            "en-IN"
                          )}
                        </h3>
                      </div>
                      <i className="fa fa-chart-line fa-3x text-white-50"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ B2B / B2C + Paid/Pending ============ */}
            <div className="row g-3 mb-4">
              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-primary">
                  <div className="card-body">
                    <h6 className="text-muted small">
                      <i className="fa fa-building me-1"></i> B2B Orders
                    </h6>
                    <h4 className="mb-0 text-primary">
                      ₹{(data.b2bStats.gst || 0).toLocaleString("en-IN")}
                    </h4>
                    <small className="text-muted">
                      {data.b2bStats.count || 0} orders with GST
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-info">
                  <div className="card-body">
                    <h6 className="text-muted small">
                      <i className="fa fa-user me-1"></i> B2C Orders
                    </h6>
                    <h4 className="mb-0 text-info">
                      ₹{(data.b2cStats.gst || 0).toLocaleString("en-IN")}
                    </h4>
                    <small className="text-muted">
                      {data.b2cStats.count || 0} regular orders
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-success">
                  <div className="card-body">
                    <h6 className="text-muted small">
                      <i className="fa fa-check-circle me-1"></i> GST Paid
                    </h6>
                    <h4 className="mb-0 text-success">
                      ₹{(stats.paidGst || 0).toLocaleString("en-IN")}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-warning">
                  <div className="card-body">
                    <h6 className="text-muted small">
                      <i className="fa fa-clock me-1"></i> GST Pending
                    </h6>
                    <h4 className="mb-0 text-warning">
                      ₹{(stats.pendingGst || 0).toLocaleString("en-IN")}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ Filters ============ */}
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="row g-2 align-items-end">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by order, customer, GST No..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="col-md-3">
                    <input
                      type="date"
                      className="form-control"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-3">
                    <input
                      type="date"
                      className="form-control"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={resetFilters}
                      title="Reset"
                    >
                      <i className="fa fa-redo"></i> Reset
                    </button>
                  </div>
                </div>

                <div className="mt-2">
                  <small className="text-muted me-2">
                    <i className="fa fa-bolt me-1"></i>Quick:
                  </small>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-warning me-1"
                    onClick={setThisMonth}
                  >
                    This Month
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-warning me-1"
                    onClick={setLastMonth}
                  >
                    Last Month
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-warning me-1"
                    onClick={setThisQuarter}
                  >
                    This Quarter
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-warning"
                    onClick={setThisYear}
                  >
                    This Year
                  </button>
                </div>
              </div>
            </div>

            {/* ============ GST Trend Chart ============ */}
            <div className="card shadow mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h6 className="mb-0 fw-bold">
                  <i className="fa fa-chart-line me-2 text-warning"></i>
                  GST Trend
                </h6>
                <div className="btn-group btn-group-sm">
                  <button
                    type="button"
                    className={`btn ${
                      chartView === "30days"
                        ? "btn-warning"
                        : "btn-outline-warning"
                    }`}
                    onClick={() => setChartView("30days")}
                  >
                    Last 30 Days
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      chartView === "12months"
                        ? "btn-warning"
                        : "btn-outline-warning"
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
                        "GST",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="gst"
                      stroke="#ffc107"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      name="GST (₹)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ============ Rate-wise & Taxable ============ */}
            <div className="row mb-4">
              {/* GST Rate Breakdown */}
              <div className="col-lg-6 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-percent me-2 text-warning"></i>
                      GST Rate Breakdown
                    </h6>
                  </div>
                  <div className="card-body">
                    {data.rateData.length > 0 ? (
                      <>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={data.rateData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip
                              formatter={(value: any) => [
                                `₹${Number(value).toLocaleString("en-IN")}`,
                                "GST",
                              ]}
                            />
                            <Bar dataKey="gst" fill="#ffc107" />
                          </BarChart>
                        </ResponsiveContainer>

                        <hr />

                        <table className="table table-sm table-bordered mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Rate</th>
                              <th className="text-center">Orders</th>
                              <th className="text-end">Taxable</th>
                              <th className="text-end">GST</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.rateData.map((r: any, i: number) => (
                              <tr key={i}>
                                <td>
                                  <span className="badge bg-warning text-dark">
                                    {r.name}
                                  </span>
                                </td>
                                <td className="text-center">{r.count}</td>
                                <td className="text-end">
                                  ₹{r.taxable.toLocaleString("en-IN")}
                                </td>
                                <td className="text-end fw-bold">
                                  ₹{r.gst.toLocaleString("en-IN")}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <p className="text-center text-muted py-5">
                        No rate data
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Taxable vs GST Pie */}
              <div className="col-lg-6 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-chart-pie me-2 text-primary"></i>
                      Taxable vs GST
                    </h6>
                  </div>
                  <div className="card-body">
                    {stats.totalTaxableValue > 0 ||
                    stats.totalGstCollected > 0 ? (
                      <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                          <Pie
                            data={[
                              {
                                name: "Taxable Value",
                                value: stats.totalTaxableValue || 0,
                              },
                              {
                                name: "GST Collected",
                                value: stats.totalGstCollected || 0,
                              },
                            ]}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            label={({ name, value }) =>
                              `${name}: ₹${Number(value).toLocaleString(
                                "en-IN"
                              )}`
                            }
                          >
                            <Cell fill="#007bff" />
                            <Cell fill="#ffc107" />
                          </Pie>
                          <Tooltip
                            formatter={(value: any) =>
                              `₹${Number(value).toLocaleString("en-IN")}`
                            }
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-center text-muted py-5">
                        No data
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ============ Top GST Orders ============ */}
            {data.topGstOrders.length > 0 && (
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h6 className="mb-0 fw-bold">
                    <i className="fa fa-trophy me-2 text-warning"></i>
                    Top 10 GST Orders
                  </h6>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Order No</th>
                          <th>Customer</th>
                          <th>GST No</th>
                          <th className="text-end">Taxable</th>
                          <th className="text-center">Rate</th>
                          <th className="text-end">GST</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.topGstOrders.map((o: any, i: number) => (
                          <tr key={i}>
                            <td className="text-center">{i + 1}</td>
                            <td>
                              <code>{o.orderNo || "-"}</code>
                            </td>
                            <td>
                              <strong>{o.customerName || "-"}</strong>
                            </td>
                            <td>
                              {o.gstNo ? (
                                <code className="text-success">
                                  {o.gstNo}
                                </code>
                              ) : (
                                <span className="text-muted">B2C</span>
                              )}
                            </td>
                            <td className="text-end">
                              ₹
                              {(o._baseAmount || 0).toLocaleString("en-IN")}
                            </td>
                            <td className="text-center">
                              <span className="badge bg-warning text-dark">
                                {o._gstRate || 0}%
                              </span>
                            </td>
                            <td className="text-end fw-bold text-success">
                              ₹
                              {(o._gstAmount || 0).toLocaleString("en-IN")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ============ All Orders with GST ============ */}
            <div className="card shadow">
              <div className="card-header bg-white">
                <h6 className="mb-0 fw-bold">
                  <i className="fa fa-list me-2 text-primary"></i>
                  All Orders with GST ({data.orders.length})
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
                        <th>Date</th>
                        <th>Customer</th>
                        <th>GST No</th>
                        <th className="text-end">Taxable</th>
                        <th className="text-center">Rate</th>
                        <th className="text-end">GST</th>
                        <th className="text-end">Invoice</th>
                        <th className="text-center">Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrders.length > 0 ? (
                        currentOrders.map((o: any, idx: number) => (
                          <tr key={o.id || idx}>
                            <td className="text-center">
                              {indexOfFirst + idx + 1}
                            </td>
                            <td>
                              <code className="bg-light p-1 rounded">
                                {o.orderNo || "-"}
                              </code>
                            </td>
                            <td>
                              {fmtDate(o.orderDate || o.createdAt)}
                            </td>
                            <td>
                              <strong>{o.customerName || "-"}</strong>
                              {o.customerPhone && (
                                <small className="d-block text-muted">
                                  {o.customerPhone}
                                </small>
                              )}
                            </td>
                            <td>
                              {o.gstNo ? (
                                <code className="text-success">
                                  {o.gstNo}
                                </code>
                              ) : (
                                <span className="text-muted small">B2C</span>
                              )}
                            </td>
                            <td className="text-end">
                              ₹
                              {(o._baseAmount || 0).toLocaleString("en-IN")}
                            </td>
                            <td className="text-center">
                              <span className="badge bg-warning text-dark">
                                {o._gstRate || 0}%
                              </span>
                            </td>
                            <td className="text-end fw-bold text-warning">
                              ₹
                              {(o._gstAmount || 0).toLocaleString("en-IN")}
                            </td>
                            <td className="text-end fw-bold text-success">
                              ₹
                              {(Number(o.totalAmount) || 0).toLocaleString(
                                "en-IN"
                              )}
                            </td>
                            <td className="text-center">
                              <span
                                className={`badge ${paymentBadge(
                                  o.paymentStatus
                                )}`}
                              >
                                {o.paymentStatus || "Pending"}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={10} className="text-center py-4">
                            <i className="fa fa-inbox fa-3x text-muted d-block mb-2"></i>
                            <p className="text-muted mb-0">
                              No GST orders found
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
                      {Math.min(indexOfLast, data.orders.length)} of{" "}
                      {data.orders.length}
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
            <div className="alert alert-warning mt-4">
              <i className="fa fa-exclamation-triangle me-2"></i>
              <strong>Note:</strong> गST calculation based on available data
              (tax field or gstRate). अगर tax field empty है तो 0 माना गया
              है। Report user के लिए read-only।
            </div>
          </div>
        </section>

        <PageFooter />
      </div>
    </div>
  );
}