"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../Sidebar/Footer/page";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import Pagination from "../AOS/Pagination";
import { Payment, PAYMENT_STATUSES, PAYMENT_METHODS } from "./PaymentFields";

function AdminPaymentList() {
  const [items, setItems] = useState<Payment[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/payment")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.payment || [];
        setItems(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setItems([]);
        setLoading(false);
      });
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const filtered = items.filter((p) => {
    const text = `${p?.paymentId || ""} ${p?.orderNo || ""} ${p?.customerName || ""} ${p?.transactionRef || ""}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchStatus = statusFilter ? p?.status === statusFilter : true;
    const matchMethod = methodFilter ? p?.method === methodFilter : true;
    return matchSearch && matchStatus && matchMethod;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentContent = filtered.slice(indexOfFirst, indexOfLast);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this payment record?")) return;
    const res = await fetch(`/api/payment?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("✅ Deleted!");
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const statusBadge = (s?: string) => {
    const map: any = {
      Pending: "bg-warning text-dark",
      Paid: "bg-success",
      Failed: "bg-danger",
      Refunded: "bg-info text-dark",
      Cancelled: "bg-secondary",
    };
    return map[s || ""] || "bg-secondary";
  };

  /* Stats */
  const stats = {
    total: items.length,
    paid: items.filter(i => i.status === "Paid").reduce((s, i) => s + (Number(i.amount) || 0), 0),
    pending: items.filter(i => i.status === "Pending").reduce((s, i) => s + (Number(i.amount) || 0), 0),
    refunded: items.filter(i => i.status === "Refunded").reduce((s, i) => s + (Number(i.amount) || 0), 0),
    paidCount: items.filter(i => i.status === "Paid").length,
    pendingCount: items.filter(i => i.status === "Pending").length,
  };

  return (
    <>
      <ASO />
      <div className="wrapper">
        <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
          <PageNavbar toggleSidebar={toggleSidebar} />
          <section className="mb-5">
            <div className="container-fluid px-4">
              {/* Stats */}
              <div className="row my-3">
                <div className="col-md-3 mb-2">
                  <div className="card bg-success text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">Paid</h6>
                      <h3 className="mb-0">₹{stats.paid}</h3>
                      <small>{stats.paidCount} payments</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="card bg-warning text-dark">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">Pending</h6>
                      <h3 className="mb-0">₹{stats.pending}</h3>
                      <small>{stats.pendingCount} payments</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="card bg-info text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">Refunded</h6>
                      <h3 className="mb-0">₹{stats.refunded}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="card bg-primary text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">Total Records</h6>
                      <h3 className="mb-0">{stats.total}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  <h5 className="bg-gradient text-center p-2 fw-bold mb-4">
                    Payments : {filtered.length}
                    <Link href="/AdminPayment/Add" className="mx-2">
                      <i className="fa fa-plus fw-bold mx-2 text-white"></i>
                    </Link>
                  </h5>

                  <div className="row mb-3">
                    <div className="col-md-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by payment ID, order, customer..."
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setCurrentPage(0);
                        }}
                      />
                    </div>
                    <div className="col-md-4 mb-2">
                      <select
                        className="form-control"
                        value={statusFilter}
                        onChange={(e) => {
                          setStatusFilter(e.target.value);
                          setCurrentPage(0);
                        }}
                      >
                        <option value="">All Statuses</option>
                        {PAYMENT_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4 mb-2">
                      <select
                        className="form-control"
                        value={methodFilter}
                        onChange={(e) => {
                          setMethodFilter(e.target.value);
                          setCurrentPage(0);
                        }}
                      >
                        <option value="">All Methods</option>
                        {PAYMENT_METHODS.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {loading ? (
                    <div className="text-center p-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="table-responsive" style={{ maxHeight: "450px", overflowY: "auto" }}>
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr className="text-center bg-gradient">
                            <th className="text-dark">#</th>
                            <th className="text-dark">Payment ID</th>
                            <th className="text-dark">Order No</th>
                            <th className="text-dark">Customer</th>
                            <th className="text-dark">Amount</th>
                            <th className="text-dark">Method</th>
                            <th className="text-dark">Type</th>
                            <th className="text-dark">Status</th>
                            <th className="text-dark">Date</th>
                            <th className="text-dark">View</th>
                            <th className="text-dark">Edit & Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentContent.length > 0 ? currentContent.map((item, idx) => (
                            <tr key={item.id} className="text-center">
                              <td>{indexOfFirst + idx + 1}</td>
                              <td>
                                <code className="bg-light p-1 rounded">
                                  {item.paymentId || "-"}
                                </code>
                              </td>
                              <td>
                                <code>{item.orderNo || "-"}</code>
                              </td>
                              <td className="text-start">
                                <strong>{item.customerName || "-"}</strong>
                                <small className="d-block text-muted">
                                  {item.customerPhone || ""}
                                </small>
                              </td>
                              <td className="fw-bold text-success">
                                ₹{item.amount || 0}
                              </td>
                              <td>
                                <span className="badge bg-primary">{item.method || "-"}</span>
                              </td>
                              <td>
                                <span className="badge bg-secondary">{item.type || "-"}</span>
                              </td>
                              <td>
                                <span className={`badge ${statusBadge(item.status)}`}>
                                  {item.status || "Pending"}
                                </span>
                              </td>
                              <td>
                                {item.paymentDate
                                  ? item.paymentDate.split("T")[0]
                                  : item.createdAt
                                    ? item.createdAt.split("T")[0]
                                    : "-"}
                              </td>
                              <td>
                                <Link href={`/AdminPayment/View?id=${item.id}`} className="btn btn-info btn-sm">
                                  <i className="fa fa-eye"></i>
                                </Link>
                              </td>
                              <td>
                                <Link href={`/AdminPayment/Update?id=${item.id}`} className="btn btn-warning btn-sm me-2">
                                  <i className="fa fa-edit"></i>
                                </Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          )) : (
                            <tr><td colSpan={11} className="text-center">No payment found</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      handlePrevPage={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                      handleNextPage={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
                    />
                  )}
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
export default AdminPaymentList;