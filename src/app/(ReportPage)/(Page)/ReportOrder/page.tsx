"use client";
import { useEffect, useState } from "react";
import PageNavbar from "../../(Page)/Sidebar/Navbar/PageNavbar";
import PageFooter from "../../(Page)/Sidebar/Footer/page";
import Sidebars from "../../(Page)/Sidebar/Sidebars/PageSidebar";

export default function ReportOrder() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    total: 0,
    pending: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    totalRevenue: 0,
  });

  /* Filters */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ============ Fetch Orders ============ */
  const fetchOrders = () => {
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    if (search) params.set("search", search);
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);

    fetch(`/api/report/orders?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data?.orders) ? data.orders : []);
        setStats(data?.stats || {});
      })
      .catch((err) => console.error("Orders fetch error:", err));
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, fromDate, toDate]);

  /* Debounced search */
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOrders();
      setCurrentPage(0);
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  /* ============ Reset Filters ============ */
  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setFromDate("");
    setToDate("");
    setCurrentPage(0);
  };

  /* ============ Export CSV ============ */
  const exportCSV = () => {
    if (orders.length === 0) {
      alert("⚠️ No data to export");
      return;
    }

    const headers = [
      "Order No",
      "Date",
      "Customer",
      "Phone",
      "City",
      "Amount",
      "Payment Method",
      "Payment Status",
      "Order Status",
    ];

    const rows = orders.map((o) => [
      o.orderNo || "",
      (o.orderDate || o.createdAt || "").slice(0, 10),
      o.customerName || "",
      o.customerPhone || "",
      o.shippingCity || "",
      o.totalAmount || "0",
      o.paymentMethod || "",
      o.paymentStatus || "",
      o.orderStatus || "",
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((r) =>
        r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ============ Print ============ */
  const printReport = () => {
    window.print();
  };

  /* ============ Pagination ============ */
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);

  /* ============ Helpers ============ */
  const statusBadge = (s?: string) => {
    const map: any = {
      Pending: "bg-secondary",
      Confirmed: "bg-info text-dark",
      Packed: "bg-primary",
      Shipped: "bg-warning text-dark",
      "Out for Delivery": "bg-warning text-dark",
      Delivered: "bg-success",
      Cancelled: "bg-danger",
      Returned: "bg-dark",
    };
    return map[s || ""] || "bg-secondary";
  };

  const paymentBadge = (s?: string) => {
    const map: any = {
      Pending: "bg-warning text-dark",
      Paid: "bg-success",
      Failed: "bg-danger",
      Refunded: "bg-info text-dark",
      "Partially Paid": "bg-secondary",
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
            <div className="bg-primary text-white p-3 rounded shadow mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h4 className="mb-0 fw-bold">
                    <i className="fa fa-shopping-cart me-2"></i>
                    Order Report
                  </h4>
                  <small className="text-white-50">
                    View all orders (read-only)
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
              <div className="col-lg-2 col-md-4 col-6">
                <div className="card bg-primary text-white shadow-sm">
                  <div className="card-body text-center py-3">
                    <i className="fa fa-list fa-2x mb-1"></i>
                    <h6 className="mb-0 small">Total</h6>
                    <h3 className="mb-0">{stats.total || 0}</h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-4 col-6">
                <div className="card bg-secondary text-white shadow-sm">
                  <div className="card-body text-center py-3">
                    <i className="fa fa-clock fa-2x mb-1"></i>
                    <h6 className="mb-0 small">Pending</h6>
                    <h3 className="mb-0">{stats.pending || 0}</h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-4 col-6">
                <div className="card bg-warning text-dark shadow-sm">
                  <div className="card-body text-center py-3">
                    <i className="fa fa-truck fa-2x mb-1"></i>
                    <h6 className="mb-0 small">Shipped</h6>
                    <h3 className="mb-0">{stats.shipped || 0}</h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-4 col-6">
                <div className="card bg-success text-white shadow-sm">
                  <div className="card-body text-center py-3">
                    <i className="fa fa-check-circle fa-2x mb-1"></i>
                    <h6 className="mb-0 small">Delivered</h6>
                    <h3 className="mb-0">{stats.delivered || 0}</h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-4 col-6">
                <div className="card bg-danger text-white shadow-sm">
                  <div className="card-body text-center py-3">
                    <i className="fa fa-times-circle fa-2x mb-1"></i>
                    <h6 className="mb-0 small">Cancelled</h6>
                    <h3 className="mb-0">{stats.cancelled || 0}</h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-4 col-6">
                <div className="card bg-info text-white shadow-sm">
                  <div className="card-body text-center py-3">
                    <i className="fa fa-rupee-sign fa-2x mb-1"></i>
                    <h6 className="mb-0 small">Revenue</h6>
                    <h5 className="mb-0">
                      ₹
                      {(stats.totalRevenue || 0).toLocaleString("en-IN")}
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ Filters ============ */}
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="row g-2">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by order no, name, phone..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="col-md-3">
                    <select
                      className="form-control"
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(0);
                      }}
                    >
                      <option value="">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">
                        Out for Delivery
                      </option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </div>

                  <div className="col-md-2">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="From"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-2">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="To"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-1">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={resetFilters}
                      title="Reset filters"
                    >
                      <i className="fa fa-redo"></i>
                    </button>
                  </div>
                </div>

                {(search || statusFilter || fromDate || toDate) && (
                  <div className="mt-2">
                    <small className="text-muted">
                      <i className="fa fa-filter me-1"></i>
                      {orders.length} result(s) found
                    </small>
                  </div>
                )}
              </div>
            </div>

            {/* ============ Orders Table ============ */}
            <div className="card shadow">
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
                        <th>Phone</th>
                        <th>City</th>
                        <th>Amount</th>
                        <th>Payment</th>
                        <th>Status</th>
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
                            <td>{fmtDate(o.orderDate || o.createdAt)}</td>
                            <td>
                              <strong>{o.customerName || "-"}</strong>
                              {o.customerEmail && (
                                <small className="d-block text-muted">
                                  {o.customerEmail}
                                </small>
                              )}
                            </td>
                            <td>{o.customerPhone || "-"}</td>
                            <td>{o.shippingCity || "-"}</td>
                            <td className="fw-bold text-success">
                              ₹{o.totalAmount || 0}
                            </td>
                            <td className="text-center">
                              <span
                                className={`badge ${paymentBadge(
                                  o.paymentStatus
                                )}`}
                              >
                                {o.paymentStatus || "Pending"}
                              </span>
                              <small className="d-block text-muted">
                                {o.paymentMethod || "-"}
                              </small>
                            </td>
                            <td className="text-center">
                              <span
                                className={`badge ${statusBadge(
                                  o.orderStatus
                                )}`}
                              >
                                {o.orderStatus || "Pending"}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9} className="text-center py-4">
                            <i className="fa fa-inbox fa-3x text-muted d-block mb-2"></i>
                            <p className="text-muted mb-0">
                              No orders found
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ============ Pagination ============ */}
              {totalPages > 1 && (
                <div className="card-footer">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <small className="text-muted">
                      Showing {indexOfFirst + 1}–
                      {Math.min(indexOfLast, orders.length)} of{" "}
                      {orders.length}
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
              orders देख सकते हैं — edit, delete या status change नहीं कर
              सकते।
            </div>
          </div>
        </section>

        <PageFooter />
      </div>
    </div>
  );
}