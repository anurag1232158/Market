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
import PageFooter from "../Sidebar/Footer/Footer";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";

export default function ReportEnquiry() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<any>({
    stats: {},
    enquiries: [],
    typeData: [],
    statusBreakdown: [],
    priorityData: [],
    sourceData: [],
    last30Days: [],
    last12Months: [],
    urgentEnquiries: [],
    unrepliedEnquiries: [],
    topSubjects: [],
  });

  /* Filters */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [chartView, setChartView] = useState<"30days" | "12months">("30days");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ============ Fetch Enquiries ============ */
  const fetchEnquiries = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);
    if (typeFilter) params.set("type", typeFilter);
    if (priorityFilter) params.set("priority", priorityFilter);
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);

    fetch(`/api/report/enquiries?${params.toString()}`)
      .then((res) => res.json())
      .then((d) => {
        setData({
          stats: d.stats || {},
          enquiries: d.enquiries || [],
          typeData: d.typeData || [],
          statusBreakdown: d.statusBreakdown || [],
          priorityData: d.priorityData || [],
          sourceData: d.sourceData || [],
          last30Days: d.last30Days || [],
          last12Months: d.last12Months || [],
          urgentEnquiries: d.urgentEnquiries || [],
          unrepliedEnquiries: d.unrepliedEnquiries || [],
          topSubjects: d.topSubjects || [],
        });
      })
      .catch((err) => console.error("Enquiries fetch error:", err));
  };

  useEffect(() => {
    fetchEnquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, typeFilter, priorityFilter, fromDate, toDate]);

  useEffect(() => {
    const timer = setTimeout(() => fetchEnquiries(), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  /* ============ Reset ============ */
  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setTypeFilter("");
    setPriorityFilter("");
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

  /* ============ Export CSV ============ */
  const exportCSV = () => {
    if (data.enquiries.length === 0) {
      alert("⚠️ No data to export");
      return;
    }

    const headers = [
      "Name",
      "Phone",
      "Email",
      "Type",
      "Subject",
      "Priority",
      "Status",
      "Source",
      "City",
      "Created At",
    ];

    const rows = data.enquiries.map((e: any) => [
      e.name || "",
      e.number || "",
      e.email || "",
      e.type || "",
      e.subject || "",
      e.priority || "",
      e.status || "",
      e.source || "",
      e.city || "",
      (e.createdAt || "").slice(0, 10),
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
    a.download = `enquiry-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ============ Print ============ */
  const printReport = () => {
    window.print();
  };

  /* ============ Pagination ============ */
  const totalPages = Math.ceil(data.enquiries.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEnquiries = data.enquiries.slice(indexOfFirst, indexOfLast);

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

  const statusBadge = (s?: string) => {
    const map: any = {
      New: "bg-primary",
      "In Progress": "bg-warning text-dark",
      Replied: "bg-success",
      "Follow Up": "bg-info text-dark",
      Closed: "bg-secondary",
      Spam: "bg-dark",
    };
    return map[s || ""] || "bg-secondary";
  };

  const priorityBadge = (p?: string) => {
    const map: any = {
      Urgent: "bg-danger",
      High: "bg-warning text-dark",
      Medium: "bg-info text-dark",
      Low: "bg-secondary",
    };
    return map[p || ""] || "bg-secondary";
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
            <div className="bg-success text-white p-3 rounded shadow mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h4 className="mb-0 fw-bold">
                    <i className="fa fa-envelope me-2"></i>
                    Enquiry Report
                  </h4>
                  <small className="text-white-50">
                    Enquiries and leads analytics
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
                <div className="card bg-primary text-white shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small text-white-50">
                          Total Enquiries
                        </h6>
                        <h3 className="mb-0">{stats.total || 0}</h3>
                      </div>
                      <i className="fa fa-envelope fa-3x text-white-50"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card bg-danger text-white shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small text-white-50">New</h6>
                        <h3 className="mb-0">
                          {stats.newEnquiries || 0}
                        </h3>
                      </div>
                      <i className="fa fa-bell fa-3x text-white-50"></i>
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
                          Replied
                        </h6>
                        <h3 className="mb-0">{stats.replied || 0}</h3>
                      </div>
                      <i className="fa fa-check-circle fa-3x text-white-50"></i>
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
                          Response Rate
                        </h6>
                        <h3 className="mb-0">{stats.responseRate || 0}%</h3>
                      </div>
                      <i className="fa fa-chart-line fa-3x text-white-50"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ Second Row ============ */}
            <div className="row g-3 mb-4">
              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-warning">
                  <div className="card-body">
                    <h6 className="text-muted small">In Progress</h6>
                    <h4 className="mb-0 text-warning">
                      {stats.inProgress || 0}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-info">
                  <div className="card-body">
                    <h6 className="text-muted small">Follow Up</h6>
                    <h4 className="mb-0 text-info">
                      {stats.followUp || 0}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-secondary">
                  <div className="card-body">
                    <h6 className="text-muted small">Closed</h6>
                    <h4 className="mb-0 text-secondary">
                      {stats.closed || 0}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-dark">
                  <div className="card-body">
                    <h6 className="text-muted small">Spam</h6>
                    <h4 className="mb-0 text-dark">
                      {stats.spam || 0}
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
                      placeholder="Search by name, phone, subject..."
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
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Replied">Replied</option>
                      <option value="Follow Up">Follow Up</option>
                      <option value="Closed">Closed</option>
                      <option value="Spam">Spam</option>
                    </select>
                  </div>

                  <div className="col-md-2">
                    <select
                      className="form-control"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      <option value="">All Types</option>
                      <option value="Contact">Contact</option>
                      <option value="Bulk Order">Bulk Order</option>
                      <option value="Product Question">
                        Product Question
                      </option>
                      <option value="Price Enquiry">Price Enquiry</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Return Request">Return Request</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                  </div>

                  <div className="col-md-2">
                    <select
                      className="form-control"
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                      <option value="">All Priority</option>
                      <option value="Urgent">Urgent</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
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
                </div>

                <div className="mt-2">
                  <small className="text-muted me-2">Quick:</small>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success me-1"
                    onClick={setToday}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success me-1"
                    onClick={setThisWeek}
                  >
                    Last 7 Days
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success me-1"
                    onClick={setThisMonth}
                  >
                    This Month
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

            {/* ============ Trend Chart ============ */}
            <div className="card shadow mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h6 className="mb-0 fw-bold">
                  <i className="fa fa-chart-line me-2 text-success"></i>
                  Enquiry Trend
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
                    <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#28a745"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      name="Enquiries"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ============ Charts Row ============ */}
            <div className="row mb-4">
              {/* Status Pie */}
              <div className="col-lg-4 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-chart-pie me-2 text-primary"></i>
                      Status Breakdown
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

              {/* Priority Pie */}
              <div className="col-lg-4 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-flag me-2 text-warning"></i>
                      Priority Breakdown
                    </h6>
                  </div>
                  <div className="card-body">
                    {data.priorityData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                          <Pie
                            data={data.priorityData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            label
                          >
                            {data.priorityData.map(
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
                        No priority data
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Type Bar */}
              <div className="col-lg-4 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-chart-bar me-2 text-info"></i>
                      Enquiry Types
                    </h6>
                  </div>
                  <div className="card-body">
                    {data.typeData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={280}>
                        <BarChart layout="vertical" data={data.typeData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" tick={{ fontSize: 11 }} />
                          <YAxis
                            type="category"
                            dataKey="name"
                            width={100}
                            tick={{ fontSize: 10 }}
                          />
                          <Tooltip />
                          <Bar dataKey="value" fill="#17a2b8" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-center text-muted py-5">
                        No type data
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ============ Urgent Enquiries ============ */}
            {data.urgentEnquiries.length > 0 && (
              <div className="card shadow mb-4 border-start border-4 border-danger">
                <div className="card-header bg-danger text-white">
                  <h6 className="mb-0 fw-bold">
                    <i className="fa fa-exclamation-triangle me-2"></i>
                    Urgent / High Priority ({data.urgentEnquiries.length})
                  </h6>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Subject</th>
                          <th>Type</th>
                          <th className="text-center">Priority</th>
                          <th className="text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.urgentEnquiries.map(
                          (e: any, i: number) => (
                            <tr key={i}>
                              <td className="text-center">{i + 1}</td>
                              <td>
                                <strong>{e.name || "-"}</strong>
                              </td>
                              <td>{e.number || "-"}</td>
                              <td>
                                {(e.subject || "-").slice(0, 40)}
                                {(e.subject || "").length > 40
                                  ? "..."
                                  : ""}
                              </td>
                              <td>
                                <span className="badge bg-info text-dark">
                                  {e.type || "-"}
                                </span>
                              </td>
                              <td className="text-center">
                                <span
                                  className={`badge ${priorityBadge(
                                    e.priority
                                  )}`}
                                >
                                  {e.priority || "-"}
                                </span>
                              </td>
                              <td className="text-center">
                                <span
                                  className={`badge ${statusBadge(
                                    e.status
                                  )}`}
                                >
                                  {e.status || "-"}
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ============ Unreplied ============ */}
            {data.unrepliedEnquiries.length > 0 && (
              <div className="card shadow mb-4 border-start border-4 border-warning">
                <div className="card-header bg-warning text-dark">
                  <h6 className="mb-0 fw-bold">
                    <i className="fa fa-clock me-2"></i>
                    Unreplied / Pending ({data.unrepliedEnquiries.length})
                  </h6>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Subject</th>
                          <th>Date</th>
                          <th className="text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.unrepliedEnquiries.map(
                          (e: any, i: number) => (
                            <tr key={i}>
                              <td className="text-center">{i + 1}</td>
                              <td>
                                <strong>{e.name || "-"}</strong>
                              </td>
                              <td>{e.number || "-"}</td>
                              <td>
                                {(e.subject || "-").slice(0, 40)}
                                {(e.subject || "").length > 40
                                  ? "..."
                                  : ""}
                              </td>
                              <td>{fmtDate(e.createdAt)}</td>
                              <td className="text-center">
                                <span
                                  className={`badge ${statusBadge(
                                    e.status
                                  )}`}
                                >
                                  {e.status || "-"}
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ============ Source Breakdown ============ */}
            {data.sourceData.length > 0 && (
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h6 className="mb-0 fw-bold">
                    <i className="fa fa-share-alt me-2 text-info"></i>
                    Enquiry Sources
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    {data.sourceData.map((s: any, i: number) => (
                      <div className="col-md-3 col-sm-6 mb-2" key={i}>
                        <div className="d-flex justify-content-between p-2 border rounded">
                          <span className="fw-bold">{s.name}</span>
                          <span className="badge bg-info text-dark">
                            {s.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ============ Top Subjects ============ */}
            {data.topSubjects.length > 0 && (
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h6 className="mb-0 fw-bold">
                    <i className="fa fa-trophy me-2 text-warning"></i>
                    Top Enquiry Subjects
                  </h6>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Subject</th>
                          <th className="text-end">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.topSubjects.map(
                          (s: any, i: number) => (
                            <tr key={i}>
                              <td className="text-center">{i + 1}</td>
                              <td>{s.name}</td>
                              <td className="text-end">
                                <span className="badge bg-primary">
                                  {s.value}
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ============ All Enquiries Table ============ */}
            <div className="card shadow">
              <div className="card-header bg-white">
                <h6 className="mb-0 fw-bold">
                  <i className="fa fa-list me-2 text-primary"></i>
                  All Enquiries ({data.enquiries.length})
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
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Type</th>
                        <th>Subject</th>
                        <th className="text-center">Priority</th>
                        <th className="text-center">Status</th>
                        <th>Source</th>
                        <th>City</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentEnquiries.length > 0 ? (
                        currentEnquiries.map((e: any, idx: number) => (
                          <tr key={e.id || idx}>
                            <td className="text-center">
                              {indexOfFirst + idx + 1}
                            </td>
                            <td>
                              <strong>{e.name || "-"}</strong>
                              {e.email && (
                                <small className="d-block text-muted">
                                  {e.email}
                                </small>
                              )}
                            </td>
                            <td>{e.number || "-"}</td>
                            <td>
                              <span className="badge bg-info text-dark">
                                {e.type || "-"}
                              </span>
                            </td>
                            <td>
                              {(e.subject || "-").slice(0, 35)}
                              {(e.subject || "").length > 35
                                ? "..."
                                : ""}
                            </td>
                            <td className="text-center">
                              <span
                                className={`badge ${priorityBadge(
                                  e.priority
                                )}`}
                              >
                                {e.priority || "-"}
                              </span>
                            </td>
                            <td className="text-center">
                              <span
                                className={`badge ${statusBadge(
                                  e.status
                                )}`}
                              >
                                {e.status || "-"}
                              </span>
                            </td>
                            <td>
                              <small className="text-muted">
                                {e.source || "-"}
                              </small>
                            </td>
                            <td>{e.city || "-"}</td>
                            <td>{fmtDate(e.createdAt)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={10} className="text-center py-4">
                            <i className="fa fa-inbox fa-3x text-muted d-block mb-2"></i>
                            <p className="text-muted mb-0">
                              No enquiries found
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
                      {Math.min(indexOfLast, data.enquiries.length)} of{" "}
                      {data.enquiries.length}
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
              enquiries देख सकते हैं — edit, delete या reply नहीं कर सकते।
            </div>
          </div>
        </section>

        <PageFooter />
      </div>
    </div>
  );
}