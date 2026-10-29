"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../Sidebar/Footer/Footer";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import Pagination from "../AOS/Pagination";
import { SMS, STATUSES, MESSAGE_TYPES } from "./SMSFields";

function AdminSMSList() { 
  const [items, setItems] = useState<SMS[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("/api/sms")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.sms || [];
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

  const filtered = items.filter((s) => {
    const text = `${s.title} ${s.message} ${s.recipients}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchStatus = statusFilter ? s.status === statusFilter : true;
    const matchType = typeFilter ? s.type === typeFilter : true;
    return matchSearch && matchStatus && matchType;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentContent = filtered.slice(indexOfFirst, indexOfLast);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const res = await fetch(`/api/sms?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("✅ Deleted!");
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const statusBadge = (s?: string) => {
    const map: any = {
      Draft: "bg-secondary",
      Scheduled: "bg-info text-dark",
      Sending: "bg-warning text-dark",
      Sent: "bg-success",
      Failed: "bg-danger",
      Cancelled: "bg-dark",
    };
    return map[s || ""] || "bg-secondary";
  };

  const typeIcon = (t?: string) => {
    const map: any = {
      "Order Update": "fa-shopping-cart",
      Payment: "fa-money-bill-wave",
      "Offer / Promotion": "fa-tag",
      "Reward / Cashback": "fa-trophy",
      "Enquiry Reply": "fa-envelope-open-text",
      "Festival Wish": "fa-gift",
      "Shipping Update": "fa-truck",
      "Delivery Confirmation": "fa-check-circle",
      Alert: "fa-exclamation-triangle",
      "Feedback Request": "fa-star",
      Custom: "fa-comment",
    };
    return map[t || ""] || "fa-comment";
  };

  const channelIcons = (channels: string[]) => (
    <div className="d-flex gap-1">
      {channels.map((c) => (
        <i
          key={c}
          className={`fa ${
            c === "SMS"
              ? "fa-sms text-primary"
              : c === "WhatsApp"
              ? "fa-whatsapp text-success"
              : c === "Email"
              ? "fa-envelope text-danger"
              : "fa-bell text-info"
          }`}
          title={c}
        ></i>
      ))}
    </div>
  );

  /* Stats */
  const stats = {
    total: items.length,
    sent: items.filter((i) => i.status === "Sent").length,
    scheduled: items.filter((i) => i.status === "Scheduled").length,
    draft: items.filter((i) => i.status === "Draft").length,
    failed: items.filter((i) => i.status === "Failed").length,
    totalSent: items.reduce(
      (s, i) => s + (Number(i.sentCount) || 0),
      0
    ),
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
              <div className="row mb-3">
                <div className="col-lg-2 col-md-4 mb-2">
                  <div className="card bg-primary text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0 small">Total</h6>
                      <h3 className="mb-0">{stats.total}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 mb-2">
                  <div className="card bg-success text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0 small">Sent</h6>
                      <h3 className="mb-0">{stats.sent}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 mb-2">
                  <div className="card bg-info text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0 small">Scheduled</h6>
                      <h3 className="mb-0">{stats.scheduled}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 mb-2">
                  <div className="card bg-secondary text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0 small">Draft</h6>
                      <h3 className="mb-0">{stats.draft}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 mb-2">
                  <div className="card bg-danger text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0 small">Failed</h6>
                      <h3 className="mb-0">{stats.failed}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 mb-2">
                  <div className="card bg-warning text-dark">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0 small">Total Sent</h6>
                      <h3 className="mb-0">{stats.totalSent}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  <h5 className="bg-gradient text-center p-2 fw-bold mb-4">
                    SMS & Notifications : {filtered.length}
                    <Link href="/AdminSMS/Add" className="mx-2">
                      <i className="fa fa-plus fw-bold mx-2 text-white"></i>
                    </Link>
                  </h5>

                  <div className="row mb-3">
                    <div className="col-md-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search title, message..."
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
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4 mb-2">
                      <select
                        className="form-control"
                        value={typeFilter}
                        onChange={(e) => {
                          setTypeFilter(e.target.value);
                          setCurrentPage(0);
                        }}
                      >
                        <option value="">All Types</option>
                        {MESSAGE_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
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
                    <div
                      className="table-responsive"
                      style={{ maxHeight: "500px", overflowY: "auto" }}
                    >
                      <table className="table table-bordered table-hover">
                        <thead className="bg-light sticky-top">
                          <tr className="text-center">
                            <th>#</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Channels</th>
                            <th>Recipients</th>
                            <th>Sent</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>View</th>
                            <th>Edit & Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentContent.length > 0 ? (
                            currentContent.map((item, idx) => (
                              <tr key={item.id} className="text-center">
                                <td>{indexOfFirst + idx + 1}</td>
                                <td className="text-start">
                                  <i
                                    className={`fa ${typeIcon(
                                      item.type
                                    )} text-primary me-1`}
                                  ></i>
                                  <strong>{item.title || "-"}</strong>
                                </td>
                                <td>
                                  <span className="badge bg-info text-dark">
                                    {item.type || "-"}
                                  </span>
                                </td>
                                <td>{channelIcons(item.channels)}</td>
                                <td>
                                  <small>{item.recipients || "-"}</small>
                                </td>
                                <td>
                                  <span className="badge bg-success">
                                    {item.sentCount || 0}
                                  </span>
                                  {Number(item.failedCount) > 0 && (
                                    <span className="badge bg-danger ms-1">
                                      {item.failedCount} fail
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <span
                                    className={`badge ${statusBadge(
                                      item.status
                                    )}`}
                                  >
                                    {item.status || "Draft"}
                                  </span>
                                </td>
                                <td>
                                  <small>
                                    {(item.sentAt || item.createdAt || "").slice(
                                      0,
                                      10
                                    )}
                                  </small>
                                </td>
                                <td>
                                  <Link
                                    href={`/AdminSMS/View?id=${item.id}`}
                                    className="btn btn-info btn-sm"
                                  >
                                    <i className="fa fa-eye"></i>
                                  </Link>
                                </td>
                                <td>
                                  <Link
                                    href={`/AdminSMS/Update?id=${item.id}`}
                                    className="btn btn-warning btn-sm me-2"
                                  >
                                    <i className="fa fa-edit"></i>
                                  </Link>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(item.id)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={10} className="text-center py-4">
                                <i className="fa fa-inbox fa-3x text-muted mb-2 d-block"></i>
                                <p className="text-muted mb-0">
                                  No messages found
                                </p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      handlePrevPage={() =>
                        setCurrentPage((p) => Math.max(p - 1, 0))
                      }
                      handleNextPage={() =>
                        setCurrentPage((p) =>
                          Math.min(p + 1, totalPages - 1)
                        )
                      }
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
export default AdminSMSList;