"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../Sidebar/Footer/page";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import ChatWindow from "./ChatWindow";
import { Chat, timeAgo, formatTime } from "./ChatFields";

function AdminChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ============ Fetch Chats ============ */
/* ============ Fetch Chats — SAFE ============ */
const fetchChats = async () => {
  try {
    const res = await fetch("/api/chat");

    if (!res.ok) {
      console.error(`Chat API error: ${res.status}`);
      setChats([]);
      setLoading(false);
      return;
    }

    const text = await res.text();

    if (!text || text.trim() === "") {
      console.warn("Empty response");
      setChats([]);
      setLoading(false);
      return;
    }

    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      console.error("JSON parse error:", text.slice(0, 200));
      setChats([]);
      setLoading(false);
      return;
    }

    const list = Array.isArray(data) ? data : data?.chats || [];

    /* Duplicate IDs हटाएँ */
    const uniqueMap = new Map();
    list.forEach((c: any) => {
      const uniqueKey = `${c.userRole}-${c.id}`;
      if (!uniqueMap.has(uniqueKey)) {
        uniqueMap.set(uniqueKey, { ...c, uniqueKey });
      }
    });
    setChats(Array.from(uniqueMap.values()));
  } catch (err) {
    console.error("Fetch error:", err);
    setChats([]);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchChats();
    const interval = setInterval(fetchChats, 15000);
    return () => clearInterval(interval);
  }, []);

  /* ============ Filter ============ */
  const filtered = chats.filter((c: any) => {
    const text = `${c.userName} ${c.userPhone} ${c.userEmail} ${c.userCity || ""}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchRole = roleFilter ? c.userRole === roleFilter : true;
    const matchStatus = statusFilter ? c.status === statusFilter : true;
    return matchSearch && matchRole && matchStatus;
  });

  /* ============ Stats ============ */
  const stats = {
    total: chats.length,
    unread: chats.reduce((s, c) => s + (c.unreadCount || 0), 0),
    active: chats.filter((c) => c.lastMessageAt).length,
    users: chats.filter((c) => c.userRole === "user").length,
    admins: chats.filter((c) => c.userRole === "admin").length,
    reports: chats.filter((c) => c.userRole === "report").length,
  };

  const roleBadge = (role?: string) => {
    const map: any = {
      user: "bg-primary",
      admin: "bg-danger",
      report: "bg-warning text-dark",
    };
    return map[role || ""] || "bg-secondary";
  };

  return (
    <>
      <ASO />
      <div className="wrapper">
        <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
          <PageNavbar toggleSidebar={toggleSidebar} />

          <section className="mb-5 py-3 pb-5">
            <div className="container-fluid px-4 mb-5">
              {/* Header */}
              <div className="bg-gradient text-white p-3 rounded mb-3">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div>
                    <h4 className="mb-0 fw-bold">
                      <i className="fa fa-comments me-2"></i>
                      Live Chat & Messages
                    </h4>
                    <small className="text-white-50">
                      Direct chat, SMS, WhatsApp, Email — सब एक जगह
                    </small>
                  </div>
                  <div className="d-flex gap-2 mt-2 mt-md-0">
                    <Link href="/AdminChat/Track" className="btn btn-light btn-sm">
                      <i className="fa fa-chart-line me-1"></i> Track Messages
                    </Link>
                    <Link href="/AdminSMS" className="btn btn-light btn-sm">
                      <i className="fa fa-bullhorn me-1"></i> Broadcast
                    </Link>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="row g-2 mb-3">
                <div className="col-lg-2 col-md-4">
                  <div className="card bg-primary text-white py-2">
                    <div className="text-center">
                      <h6 className="mb-0 small">Total</h6>
                      <h3 className="mb-0">{stats.total}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="card bg-danger text-white py-2">
                    <div className="text-center">
                      <h6 className="mb-0 small">Unread</h6>
                      <h3 className="mb-0">{stats.unread}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="card bg-info text-white py-2">
                    <div className="text-center">
                      <h6 className="mb-0 small">Users</h6>
                      <h3 className="mb-0">{stats.users}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="card bg-warning text-dark py-2">
                    <div className="text-center">
                      <h6 className="mb-0 small">Reports</h6>
                      <h3 className="mb-0">{stats.reports}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="card bg-secondary text-white py-2">
                    <div className="text-center">
                      <h6 className="mb-0 small">Admins</h6>
                      <h3 className="mb-0">{stats.admins}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="card bg-success text-white py-2">
                    <div className="text-center">
                      <h6 className="mb-0 small">Active</h6>
                      <h3 className="mb-0">{stats.active}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pb-5 mb-5" style={{ height: "calc(100vh - 320px)", minHeight: "500px" }}>
                {/* LEFT : Inbox */}
                <div className="row pb-5 mb-5 mt-3">
                <div className="col-md-4 mb-3 d-flex flex-column">
                  <div className="card shadow h-100">
                    <div className="card-header bg-white">
                      <h6 className="mb-2 fw-bold">
                        <i className="fa fa-inbox me-1"></i>
                        Conversations
                        <span className="badge bg-primary ms-2">
                          {filtered.length}
                        </span>
                      </h6>

                      {/* Search */}
                      <input
                        type="text"
                        className="form-control form-control-sm mb-2"
                        placeholder="🔍 Search name, phone, city..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />

                      {/* Filters */}
                      <div className="row g-1">
                        <div className="col-6">
                          <select
                            className="form-control form-control-sm"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                          >
                            <option value="">All Roles</option>
                            <option value="user">Users</option>
                            <option value="admin">Admins</option>
                            <option value="report">Reports</option>
                          </select>
                        </div>
                        <div className="col-6">
                          <select
                            className="form-control form-control-sm"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                          >
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Blocked">Blocked</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="card-body p-2" style={{ overflowY: "auto" }}>
                      {loading ? (
                        <div className="text-center p-5">
                          <div className="spinner-border text-primary" role="status"></div>
                        </div>
                      ) : filtered.length === 0 ? (
                        <div className="text-center p-4 text-muted">
                          <i className="fa fa-inbox fa-3x mb-2 d-block"></i>
                          No conversations found
                        </div>
                      ) : (
                        filtered.map((chat: any) => (
                          <div
                            key={chat.uniqueKey || `${chat.userRole}-${chat.id}`}
                            className={`p-3 mb-2 rounded ${
                              selectedChat?.id === chat.id &&
                              (selectedChat as any)?.userRole === chat.userRole
                                ? "bg-primary text-white"
                                : "bg-light"
                            }`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setSelectedChat(chat)}
                          >
                            <div className="d-flex align-items-start">
                              <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  chat.userName || "User"
                                )}&background=667eea&color=fff&size=64`}
                                className="rounded-circle me-2"
                                width={40}
                                height={40}
                                alt=""
                              />
                              <div className="flex-grow-1" style={{ minWidth: 0 }}>
                                <div className="d-flex justify-content-between align-items-center">
                                  <strong className="text-truncate">
                                    {chat.userName || "Unknown"}
                                  </strong>
                                  <small
                                    className={
                                      selectedChat?.id === chat.id
                                        ? "text-white-50"
                                        : "text-muted"
                                    }
                                    style={{ fontSize: "10px" }}
                                  >
                                    {timeAgo(chat.lastMessageAt)}
                                  </small>
                                </div>

                                <span
                                  className={`badge ${roleBadge(chat.userRole)} me-1`}
                                  style={{ fontSize: "9px" }}
                                >
                                  {chat.userRole || "user"}
                                </span>

                                {chat.userCity && (
                                  <small
                                    className={
                                      selectedChat?.id === chat.id
                                        ? "text-white-50"
                                        : "text-muted"
                                    }
                                    style={{ fontSize: "10px" }}
                                  >
                                    <i className="fa fa-map-marker-alt me-1"></i>
                                    {chat.userCity}
                                  </small>
                                )}

                                <small
                                  className={`d-block text-truncate mt-1 ${
                                    selectedChat?.id === chat.id
                                      ? "text-white-50"
                                      : "text-muted"
                                  }`}
                                  style={{ maxWidth: "220px", fontSize: "12px" }}
                                >
                                  {chat.lastMessage || "No messages yet"}
                                </small>

                                <small
                                  className={
                                    selectedChat?.id === chat.id
                                      ? "text-white-50"
                                      : "text-secondary"
                                  }
                                  style={{ fontSize: "11px" }}
                                >
                                  <i className="fa fa-phone me-1"></i>
                                  {chat.userPhone}
                                </small>
                              </div>

                              {chat.unreadCount > 0 && (
                                <span className="badge bg-danger ms-1 rounded-pill">
                                  {chat.unreadCount}
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT : Chat Window */}
                <div className="col-md-8 mb-3">
                  <div className="card shadow h-100">
                    {selectedChat ? (
                      <ChatWindow
                        chat={selectedChat}
                        onMessageSent={fetchChats}
                      />
                    ) : (
                      <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted p-5">
                        <i className="fa fa-comments fa-5x mb-3 text-primary"></i>
                        <h4>Select a conversation</h4>
                        <p>Left side से किसी user को चुनें और chat शुरू करें</p>
                        <div className="d-flex gap-2 mt-3">
                          <Link href="/AdminChat/Track" className="btn btn-outline-primary">
                            <i className="fa fa-chart-line me-1"></i>
                            View Tracking
                          </Link>
                          <Link href="/AdminSMS/Add" className="btn btn-outline-success">
                            <i className="fa fa-paper-plane me-1"></i>
                            Send Broadcast
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
export default AdminChatPage;