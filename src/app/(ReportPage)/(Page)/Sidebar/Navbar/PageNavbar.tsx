"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  getAuthUser,
  logout,
  getSessionTime,
  getTimeLeft,
  formatTimeLeft,
  SESSION_DURATION,
} from "../../../../../../lib/authUser";

interface Props {
  toggleSidebar: () => void;
}

export default function ReportNavbar({ toggleSidebar }: Props) {
  const router = useRouter();
  const [report, setReport] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<
    "messages" | "notifications" | null
  >(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showAllMessages, setShowAllMessages] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [search, setSearch] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [messagesLastSeen, setMessagesLastSeen] = useState<number>(0);
  const [notificationsLastSeen, setNotificationsLastSeen] = useState<number>(0);
  const [sessionTime, setSessionTime] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showWarning, setShowWarning] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ============ Load Report User ============ */
  useEffect(() => {
    const user = getAuthUser("report");
    if (user) setReport(user);
    if (typeof window !== "undefined") {
      setMessagesLastSeen(
        Number(localStorage.getItem("report_messages_lastSeen") || 0)
      );
      setNotificationsLastSeen(
        Number(localStorage.getItem("report_notifications_lastSeen") || 0)
      );
    }
  }, []);

  /* ============ Live Clock ============ */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  /* ============ ⭐ SESSION TIMER — हर सेकंड update ============ */
  useEffect(() => {
    /* Initial load */
    setSessionTime(getSessionTime("report"));
    setTimeLeft(getTimeLeft("report"));

    /* हर 1 सेकंड update */
    const interval = setInterval(() => {
      const left = getTimeLeft("report");
      setTimeLeft(left);
      setSessionTime(getSessionTime("report"));

      /* 5 minute बचे तो warning */
      setShowWarning(left > 0 && left <= 5 * 60 * 1000);

      /* ⭐ Time खत्म → Auto Logout */
      if (left <= 0 && getSessionTime("report")) {
        clearInterval(interval);
        setTimeout(() => {
          alert("⏰ Session expired! Please login again.");
          logout("report");
        }, 100);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ============ Fetch Messages ============ */
  const fetchMessages = () => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.messages || [];
        setMessages(list);
      })
      .catch((err) => console.error("Messages error:", err));
  };

  /* ============ Fetch Notifications ============ */
  const fetchNotifications = () => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.notifications || [];
        setNotifications(list);
      })
      .catch((err) => console.error("Notifications error:", err));
  };

  /* ============ Initial Load + Auto Refresh ============ */
  useEffect(() => {
    fetchMessages();
    fetchNotifications();

    const interval = setInterval(() => {
      fetchMessages();
      fetchNotifications();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  /* ============ Click Outside to Close ============ */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowProfile(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ============ Read Tracking ============ */
  const markMessagesAsRead = () => {
    if (typeof window === "undefined") return;
    const now = Date.now();
    localStorage.setItem("report_messages_lastSeen", String(now));
    setMessagesLastSeen(now);
  };

  const markNotificationsAsRead = () => {
    if (typeof window === "undefined") return;
    const now = Date.now();
    localStorage.setItem("report_notifications_lastSeen", String(now));
    setNotificationsLastSeen(now);
  };

  const handleMessagesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const willOpen = activeDropdown !== "messages";
    setActiveDropdown(willOpen ? "messages" : null);
    setShowProfile(false);
    if (willOpen) {
      setTimeout(() => markMessagesAsRead(), 300);
    }
  };

  const handleNotificationsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const willOpen = activeDropdown !== "notifications";
    setActiveDropdown(willOpen ? "notifications" : null);
    setShowProfile(false);
    if (willOpen) {
      setTimeout(() => markNotificationsAsRead(), 300);
    }
  };

  /* ============ Unread Counts ============ */
  const unreadMessages = messages.filter(
    (m) => new Date(m.time || 0).getTime() > messagesLastSeen
  );

  const unreadNotifications = notifications.filter(
    (n) => new Date(n.time || 0).getTime() > notificationsLastSeen
  );

  /* ============ Logout ============ */
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout("report");
    }
  };

  /* ============ Helpers ============ */
  const timeAgo = (time?: string) => {
    if (!time) return "Just now";
    const diff = Date.now() - new Date(time).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(time).toLocaleDateString("en-IN");
  };

  const getImageSrc = (pic?: string, name?: string) => {
    if (!pic)
      return `https://ui-avatars.com/api/?name=${encodeURIComponent( name || "R" )}&background=667eea&color=fff&size=64`;
    if (
      pic.startsWith("blob:") ||
      pic.startsWith("data:") ||
      pic.startsWith("http")
    )
      return pic;
    return `/assets/images/${pic}`;
  };

  const getColor = (c?: string) => {
    const map: any = {
      primary: "text-primary",
      info: "text-info",
      warning: "text-warning",
      danger: "text-danger",
      success: "text-success",
      secondary: "text-secondary",
    };
    return map[c || ""] || "text-secondary";
  };

  const badgeColor = (c?: string) => {
    const map: any = {
      primary: "bg-primary",
      info: "bg-info text-dark",
      warning: "bg-warning text-dark",
      danger: "bg-danger",
      success: "bg-success",
      secondary: "bg-secondary",
    };
    return map[c || ""] || "bg-secondary";
  };

  const isUnread = (time?: string, lastSeen?: number) => {
    if (!time || !lastSeen) return true;
    return new Date(time).getTime() > (lastSeen || 0);
  };

  return (
    <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-2">
      <div ref={dropdownRef} className="w-100 d-flex align-items-center">
        {/* Toggle Sidebar */}
        <Link href="#" className="sidebar-toggler flex-shrink-0"
          onClick={(e) => { e.preventDefault(); toggleSidebar();}} >
          <i className="fa fa-bars"></i>
        </Link>

        {/* Title + Live Clock */}
        <div className="ms-3 d-none d-md-flex flex-column">
          <h6 className="mb-0 fw-bold text-primary">
            <i className="fa fa-chart-bar me-1"></i> Report Panel
          </h6>
          <small className="text-muted">
            <i className="fa fa-clock me-1"></i> {currentTime}
          </small>
        </div>
     
        {/* ⭐ Search */}
        <form className="d-none d-lg-flex ms-4 flex-grow-1" style={{ maxWidth: "400px" }}
          onSubmit={(e) => {
            e.preventDefault();
            if (search.trim()) { router.push(   `/ReportDashboard?search=${encodeURIComponent(search)}` ); }
          }}>
          <div className="position-relative w-100">
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search reports, orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="fa fa-search position-absolute top-50 start-0 translate-middle-y text-muted ms-3"></i>
          </div>
        </form>

        <div className="navbar-nav align-items-center ms-auto flex-row gap-2">
          {/* ============ MESSAGES DROPDOWN ============ */}
          <div className={`nav-item dropdown position-relative ${ activeDropdown === "messages" ? "show" : "" }`} >
            <a href="#" className="nav-link position-relative" onClick={handleMessagesClick} >
              <i className="fa fa-envelope fs-5"></i>
              <span className="d-none d-lg-inline-flex ms-2">Messages</span>
              {unreadMessages.length > 0 && (
                <span className="badge rounded-pill bg-danger ms-1 badge-pulse">
                  {unreadMessages.length > 99 ? "99+" : unreadMessages.length}
                </span>
              )}
            </a>

            {activeDropdown === "messages" && (
              <div
                className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom show"
                style={{
                  display: "block",
                  position: "absolute",
                  right: 0,
                  top: "100%",
                  minWidth: "320px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  zIndex: 1000,
                }}
              >
                {messages.length > 0 ? (
                  <>
                    <div className="dropdown-header fw-bold text-dark d-flex justify-content-between">
                      <span>Recent Messages</span>
                      <span className="badge bg-primary">
                        {messages.length}
                      </span>
                    </div>
                    <hr className="dropdown-divider" />

                    {(showAllMessages ? messages : messages.slice(0, 4)).map(
                      (item: any, index: number) => {
                        const unread = isUnread(item.time, messagesLastSeen);
                        return (
                          <div key={`${item.id}-${index}`}>
                            <Link
                              href={`/ReportEnquirie?id=${item.id}`}
                              className="dropdown-item py-2"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="d-flex align-items-start">
                                <i
                                  className={`fa fa-user-circle ${getColor(
                                    item.priority === "Urgent"
                                      ? "danger"
                                      : item.priority === "High"
                                      ? "warning"
                                      : "info"
                                  )} fs-4 me-2`}
                                ></i>
                                <div
                                  className="flex-grow-1"
                                  style={{ minWidth: 0 }}
                                >
                                  <h6
                                    className={`mb-0 text-truncate ${
                                      unread ? "fw-bold" : "fw-normal"
                                    }`}
                                  >
                                    {item.name || "Unknown"}
                                    {unread && (
                                      <span
                                        className="badge bg-primary ms-2"
                                        style={{
                                          fontSize: "8px",
                                          padding: "3px 6px",
                                        }}
                                      >
                                        NEW
                                      </span>
                                    )}
                                  </h6>
                                  <small
                                    className="text-muted d-block text-truncate"
                                    style={{ maxWidth: "220px" }}
                                  >
                                    {item.message || "-"}
                                  </small>
                                  <small className="text-secondary">
                                    {timeAgo(item.time)}
                                  </small>
                                </div>
                              </div>
                            </Link>
                            <hr className="dropdown-divider m-0" />
                          </div>
                        );
                      }
                    )}

                    {messages.length > 4 && (
                      <button
                        type="button"
                        onClick={() => setShowAllMessages(!showAllMessages)}
                        className="dropdown-item text-center text-primary fw-bold"
                      >
                        {showAllMessages
                          ? "Show Less"
                          : `See All (${messages.length})`}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="dropdown-item text-center text-muted py-4">
                    <i className="fa fa-inbox fa-2x mb-2 d-block"></i>
                    No messages
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ============ NOTIFICATIONS DROPDOWN ============ */}
          <div
            className={`nav-item dropdown position-relative ${
              activeDropdown === "notifications" ? "show" : ""
            }`}
          >
            <a
              href="#"
              className="nav-link position-relative"
              onClick={handleNotificationsClick}
            >
              <i className="fa fa-bell fs-5"></i>
              <span className="d-none d-lg-inline-flex ms-2">
                Notifications
              </span>

              {unreadNotifications.length > 0 && (
                <span className="badge rounded-pill bg-danger ms-1 badge-pulse">
                  {unreadNotifications.length > 99
                    ? "99+"
                    : unreadNotifications.length}
                </span>
              )}
            </a>

            {activeDropdown === "notifications" && (
              <div
                className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom show"
                style={{
                  display: "block",
                  position: "absolute",
                  right: 0,
                  top: "100%",
                  minWidth: "340px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  zIndex: 1000,
                }}
              >
                {notifications.length > 0 ? (
                  <>
                    <div className="dropdown-header fw-bold text-dark d-flex justify-content-between">
                      <span>Recent Notifications</span>
                      <span className="badge bg-primary">
                        {notifications.length}
                      </span>
                    </div>
                    <hr className="dropdown-divider" />

                    {(showAllNotifications
                      ? notifications
                      : notifications.slice(0, 5)
                    ).map((n: any, index: number) => {
                      const unread = isUnread(
                        n.time,
                        notificationsLastSeen
                      );
                      return (
                        <div key={`${n.type}-${index}`}>
                          <Link
                            href={
                              n.type === "enquiry"
                                ? `/ReportEnquiries?id=${n.id}`
                                : n.type === "order"
                                ? `/ReportOrder?id=${n.id}`
                                : n.type === "payment"
                                ? `/ReportPayment?id=${n.id}`
                                : "/ReportDashboard"
                            }
                            className="dropdown-item py-2"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="d-flex align-items-start">
                              <i
                                className={`fa ${
                                  n.icon || "fa-bell"
                                } ${getColor(n.color)} fs-5 me-2 mt-1`}
                              ></i>
                              <div
                                className="flex-grow-1"
                                style={{ minWidth: 0 }}
                              >
                                <small
                                  className={`d-block text-truncate ${
                                    unread ? "fw-bold" : "fw-normal"
                                  }`}
                                  style={{ maxWidth: "240px" }}
                                >
                                  {n.text || "-"}
                                  {unread && (
                                    <span
                                      className="badge bg-primary ms-2"
                                      style={{
                                        fontSize: "8px",
                                        padding: "3px 6px",
                                      }}
                                    >
                                      NEW
                                    </span>
                                  )}
                                </small>
                                <div className="d-flex align-items-center gap-2 mt-1">
                                  <span
                                    className={`badge ${badgeColor(n.color)}`}
                                    style={{ fontSize: "10px" }}
                                  >
                                    {n.type || "info"}
                                  </span>
                                  {n.amount && (
                                    <small className="text-success fw-bold">
                                      {n.amount}
                                    </small>
                                  )}
                                  <small className="text-secondary">
                                    {timeAgo(n.time)}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </Link>
                          <hr className="dropdown-divider m-0" />
                        </div>
                      );
                    })}

                    {notifications.length > 5 && (
                      <button
                        type="button"
                        onClick={() =>
                          setShowAllNotifications(!showAllNotifications)
                        }
                        className="dropdown-item text-center text-primary fw-bold"
                      >
                        {showAllNotifications
                          ? "Show Less"
                          : `See All (${notifications.length})`}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="dropdown-item text-center text-muted py-4">
                    <i className="fa fa-bell-slash fa-2x mb-2 d-block"></i>
                    No notifications
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ============ PROFILE DROPDOWN ============ */}
         {/* ============ PROFILE DROPDOWN ============ */}
{/* ============ PROFILE DROPDOWN ============ */}
<div className="nav-item dropdown position-relative">
  <a
    href="#"
    className="nav-link d-flex align-items-center"
    style={{ cursor: "pointer", padding: "6px 8px" }}
    onClick={(e) => {
      e.preventDefault();
      setShowProfile(!showProfile);
      setActiveDropdown(null);
    }}
  >
    {/* ⭐ Profile Image — Left Side */}
    <img
      className="rounded-circle border border-2 border-primary"
      style={{
        width: "38px",
        height: "38px",
        objectFit: "cover",
        flexShrink: 0,
      }}
      src={getImageSrc(report?.pic, report?.name)}
      alt="Profile"
      onError={(e) => {
        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          report?.name || "Report"
        )}&background=667eea&color=fff&size=64`;
      }}
    />

    {/* ⭐ Name + Timer — Right Side (Column) */}
    <div
      className="d-none d-lg-flex flex-column ms-2"
      style={{ lineHeight: 1.3 }}
    >
      {/* Name (ऊपर) */}
      <span
        className="fw-bold text-dark"
        style={{ fontSize: "14px" }}
      >
        {report?.name || "Report"}
      </span>

      {/* Timer (नीचे) */}
      {sessionTime && timeLeft > 0 && (
        <span
          className={`badge mt-1 ${
            showWarning ? "bg-danger" : "bg-success"
          }`}
          style={{
            fontSize: "10px",
            letterSpacing: "0.5px",
            width: "fit-content",
          }}
          title={`Expires at ${new Date(
            sessionTime.expiresAt
          ).toLocaleTimeString("en-IN")}`}
        >
         
          {formatTimeLeft(timeLeft)}
        </span>
      )}
    </div>

    {/* Mobile: सिर्फ Timer Badge (Name छिपाएँ) */}
    {sessionTime && timeLeft > 0 && (
      <span
        className={`badge ms-2 d-lg-none ${
          showWarning ? "bg-danger" : "bg-success"
        }`}
        style={{
          fontSize: "11px",
          fontFamily: "monospace",
        }}
      >
        <i className="fa fa-clock me-1"></i>
        {formatTimeLeft(timeLeft)}
      </span>
    )}

    {/* Caret Arrow */}
    <i
      className="fa fa-chevron-down ms-2"
      style={{ fontSize: "11px", color: "#888" }}
    ></i>
  </a>

  {showProfile && (
    <div
      className="dropdown-menu dropdown-menu-end show"
      style={{
        display: "block",
        position: "absolute",
        right: 0,
        top: "100%",
        minWidth: "260px",
        zIndex: 1000,
        padding: 0,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        overflow: "hidden",
        marginTop: "6px",
      }}
    >
      {/* Header */}
      <div className="p-3 bg-light border-bottom">
        <div className="d-flex align-items-center">
          <img
            className="rounded-circle me-2"
            style={{ width: "44px", height: "44px", objectFit: "cover" }}
            src={getImageSrc(report?.pic, report?.name)}
            alt="Profile"
          />
          <div>
            <strong className="d-block" style={{ fontSize: "14px" }}>
              {report?.name || "Report User"}
            </strong>
            <small className="text-muted" style={{ fontSize: "12px" }}>
              {report?.email || ""}
            </small>
          </div>
        </div>
        <span className="badge bg-warning text-dark mt-2">
          <i className="fa fa-chart-bar me-1"></i>
          Report Access
        </span>
      </div>

{sessionTime && (
  <div
    style={{
      padding: "12px 16px",
      borderBottom: "1px solid #e0e0e0",
      background: "#fff",
    }}
  >

    {/* Line 1: Login */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "6px",
      }}
    >
      <span style={{ color: "#888", fontSize: "12px" }}>Login:</span>
      <span style={{ fontWeight: 600, fontSize: "12px", color: "#333" }}>
        {new Date(sessionTime.loginAt).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>

    {/* Line 2: Expires */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "6px",
      }}
    >
      <span style={{ color: "#888", fontSize: "12px" }}>Expires:</span>
      <span style={{ fontWeight: 600, fontSize: "12px", color: "#333" }}>
        {new Date(sessionTime.expiresAt).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>

    {/* Line 3: Time Left */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
      }}
    >
      <span style={{ color: "#888", fontSize: "12px" }}>Time Left:</span>
      <span
        style={{
          fontWeight: 700,
          fontSize: "13px",
          fontFamily: "monospace",
          color: showWarning ? "#dc3545" : "#28a745",
        }}
      >
        {formatTimeLeft(timeLeft)}
      </span>
    </div>

    {/* Progress Bar */}
    <div
      style={{
        height: "4px",
        background: "#e0e0e0",
        borderRadius: "2px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${(timeLeft / SESSION_DURATION) * 100}%`,
          background: showWarning ? "#dc3545" : "#28a745",
          transition: "width 1s linear",
        }}
      ></div>
    </div>
  </div>
)}

      {/* Menu Items */}
      <div className="py-1">
        <Link
          href="/ReportProfile"
          className="dropdown-item py-2"
          onClick={() => setShowProfile(false)}
        >
          <i className="fa fa-user me-2 text-primary"></i>
          My Profile
        </Link>
        <Link
          href="/ReportUpdateProfile"
          className="dropdown-item py-2"
          onClick={() => setShowProfile(false)}
        >
          <i className="fa fa-edit me-2 text-primary"></i>
          Update Profile
        </Link>
      </div>

      <div className="border-top py-1">
        <button
          type="button"
          onClick={handleLogout}
          className="dropdown-item py-2 text-danger"
        >
          <i className="fa fa-sign-out-alt me-2"></i>
          Logout
        </button>
      </div>
    </div>
  )}
</div>
        </div>
      </div>
    </nav>
  );
}