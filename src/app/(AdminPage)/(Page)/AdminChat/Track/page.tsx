"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../../Sidebar/Footer/page";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import Pagination from "../../AOS/Pagination";
import {
  Message,
  MESSAGE_STATUSES,
  CHANNELS,
  statusBadge,
  channelIcon,
  formatDateTime,
  timeAgo,
} from "../ChatFields";

function AdminChatTrack() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ============ Fetch All Messages ============ */
  const fetchAll = () => {
    fetch("/api/chat/all-messages")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.messages || [];
        setMessages(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 10000);
    return () => clearInterval(interval);
  }, []);

  /* ============ Filters ============ */
  const filtered = messages.filter((m) => {
    const text = `${m.receiverName} ${m.receiverPhone} ${m.receiverEmail} ${m.message}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchStatus = statusFilter ? m.status === statusFilter : true;
    const matchChannel = channelFilter ? m.channel === channelFilter : true;
    return matchSearch && matchStatus && matchChannel;
  });

  /* ============ Stats ============ */
  const stats = {
    total: messages.length,
    sent: messages.filter((m) => m.status === "Sent").length,
    delivered: messages.filter((m) => m.status === "Delivered").length,
    read: messages.filter((m) => m.status === "Read").length,
    failed: messages.filter((m) => m.status === "Failed").length,
    pending: messages.filter((m) => m.status === "Pending").length,
  };

  /* ============ Pagination ============ */
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <ASO />
      <div className="wrapper">
        <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
          <PageNavbar toggleSidebar={toggleSidebar} />
          <section className="mb-5">
            <div className="container-fluid px-4">
              {/* Header */}
              <div className="bg-gradient text-white p-3 rounded mb-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div>
                    <h4 className="mb-0 fw-bold">
                      <i className="fa fa-chart-line me-2"></i>
                      Message Tracking
                    </h4>
                    <small className="text-white-50">
                      किसको message गया, नहीं गया — सब track
                    </small>
                  </div>
                  <Link href="/AdminChat" className="btn btn-light btn-sm">
                    <i className="fa fa-comments me-1"></i> Back to Inbox
                  </Link>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="row g-3 mb-4">
                <div className="col-lg-2 col-md-4">
                  <div className="card bg-primary text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0 small">Total</h6>
                      <h3 className="mb-0">{stats.total}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="card bg-info text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0 small">Sent</h6>
                      <h3 className="mb-0">{stats.sent}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="card bg-success text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0 small">Delivered</h6>
                      <h3 className="mb-0">{stats.delivered}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="card bg-warning text-dark">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0 small">Read</h6>
                      <h3 className="mb-0">{stats.read}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="card bg-danger text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0 small">Failed</h6>
                      <h3 className="mb-0">{stats.failed}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="card bg-secondary text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0 small">Pending</h6>
                      <h3 className="mb-0">{stats.pending}</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="card shadow mb-3">
                <div className="card-body">
                  <div className="row g-2">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search name, phone, email, message..."
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setCurrentPage(0);
                        }}
                      />
                    </div>
                    <div className="col-md-4">
                      <select
                        className="form-control"
                        value={statusFilter}
                        onChange={(e) => {
                          setStatusFilter(e.target.value);
                          setCurrentPage(0);
                        }}
                      >
                        <option value="">All Statuses</option>
                        {MESSAGE_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <select
                        className="form-control"
                        value={channelFilter}
                        onChange={(e) => {
                          setChannelFilter(e.target.value);
                          setCurrentPage(0);
                        }}
                      >
                        <option value="">All Channels</option>
                        {CHANNELS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="card shadow">
                <div className="card-body p-0">
                  <div
                    className="table-responsive"
                    style={{ maxHeight: "600px", overflowY: "auto" }}
                  >
                    <table className="table table-hover table-bordered mb-0">
                      <thead className="table-light sticky-top">
                        <tr className="text-center">
                          <th>#</th>
                          <th>Recipient</th>
                          <th>Contact</th>
                          <th>Channel</th>
                          <th>Message</th>
                          <th>Status</th>
                          <th>Sent At</th>
                          <th>Delivered</th>
                          <th>Read</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan={9} className="text-center p-5">
                              <div
                                className="spinner-border text-primary"
                                role="status"
                              ></div>
                            </td>
                          </tr>
                        ) : currentItems.length === 0 ? (
                          <tr>
                            <td colSpan={9} className="text-center py-4">
                              <i className="fa fa-inbox fa-3x text-muted d-block mb-2"></i>
                              <p className="text-muted mb-0">
                                No messages found
                              </p>
                            </td>
                          </tr>
                        ) : (
                          currentItems.map((m, idx) => (
                            <tr key={m.id || idx}>
                              <td className="text-center">
                                {indexOfFirst + idx + 1}
                              </td>
                              <td>
                                <strong>{m.receiverName || "-"}</strong>
                                <small className="d-block text-muted">
                                  {m.receiverRole || "user"}
                                </small>
                              </td>
                              <td>
                                <small className="d-block">
                                  <i className="fa fa-phone me-1"></i>
                                  {m.receiverPhone || "-"}
                                </small>
                                {m.receiverEmail && (
                                  <small className="d-block text-muted">
                                    <i className="fa fa-envelope me-1"></i>
                                    {m.receiverEmail}
                                  </small>
                                )}
                              </td>
                              <td className="text-center">
                                <i
                                  className={`fa ${channelIcon(
                                    m.channel
                                  )} fa-lg`}
                                  title={m.channel}
                                ></i>
                                <small className="d-block">{m.channel}</small>
                              </td>
                              <td>
                                <small>
                                  {(m.message || "").slice(0, 40)}
                                  {(m.message || "").length > 40 ? "..." : ""}
                                </small>
                              </td>
                              <td className="text-center">
                                <span
                                  className={`badge ${statusBadge(m.status)}`}
                                >
                                  {m.status}
                                </span>
                              </td>
                              <td>
                                <small>{formatDateTime(m.createdAt)}</small>
                              </td>
                              <td>
                                <small>
                                  {m.deliveredAt
                                    ? formatDateTime(m.deliveredAt)
                                    : "-"}
                                </small>
                              </td>
                              <td>
                                <small>
                                  {m.readAt ? formatDateTime(m.readAt) : "-"}
                                </small>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                {totalPages > 1 && (
                  <div className="card-footer">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      handlePrevPage={() =>
                        setCurrentPage((p) => Math.max(0, p - 1))
                      }
                      handleNextPage={() =>
                        setCurrentPage((p) =>
                          Math.min(totalPages - 1, p + 1)
                        )
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
          <PageFooter />
        </div>
      </div>
    </>
  );
}
export default AdminChatTrack;