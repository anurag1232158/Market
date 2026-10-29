"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  logout,
  getAuthUser,
  getSessionTime,
  getTimeLeft,
  formatTimeLeft,
  SESSION_DURATION,
} from "../../../../../../lib/authUser";

interface PageNavbarProps {
  toggleSidebar: () => void;
}

const PageNavbar: React.FC<PageNavbarProps> = ({ toggleSidebar }) => {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [showAllMessages, setShowAllMessages] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<
    "messages" | "notifications" | null
  >(null);

  /* ⭐ Read tracking */
  const [messagesLastSeen, setMessagesLastSeen] = useState<number>(0);
  const [notificationsLastSeen, setNotificationsLastSeen] = useState<number>(0);

  /* ⭐ Session Timer States */
  const [sessionTime, setSessionTime] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showWarning, setShowWarning] = useState(false);

  /* ⭐ Profile Dropdown States */
  const [showProfile, setShowProfile] = useState(false);

  /* ⭐ Refs */
  const profileRef = useRef<HTMLDivElement>(null);

  /* ============ Load from localStorage ============ */
  useEffect(() => {
    if (typeof window === "undefined") return;

    setMessagesLastSeen(
      Number(localStorage.getItem("messages_lastSeen") || 0)
    );
    setNotificationsLastSeen(
      Number(localStorage.getItem("notifications_lastSeen") || 0)
    );

    const authAdmin = getAuthUser("admin");
    if (authAdmin) setAdmin(authAdmin);
  }, []);

  /* ============ ⭐ SESSION TIMER — हर सेकंड ============ */
  useEffect(() => {
    setSessionTime(getSessionTime("admin"));
    setTimeLeft(getTimeLeft("admin"));

    const interval = setInterval(() => {
      const left = getTimeLeft("admin");
      setTimeLeft(left);
      setSessionTime(getSessionTime("admin"));

      setShowWarning(left > 0 && left <= 5 * 60 * 1000);

      if (left <= 0 && getSessionTime("admin")) {
        clearInterval(interval);
        setTimeout(() => {
          alert("⏰ Session expired! Please login again.");
          logout("admin");
        }, 100);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ============ ⭐ Click Outside to Close All Dropdowns ============ */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ============ Fetch Admin Profile (fallback) ============ */
  useEffect(() => {
    if (admin?.name) return;

    fetch("/api/admin")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.admin || [];
        if (list.length > 0) setAdmin(list[0]);
      })
      .catch((err) => console.error("Admin fetch error:", err));
  }, [admin]);

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

  /* ============ Unread Count ============ */
  const unreadMessages = messages.filter(
    (m) => new Date(m.time || 0).getTime() > messagesLastSeen
  );

  const unreadNotifications = notifications.filter(
    (n) => new Date(n.time || 0).getTime() > notificationsLastSeen
  );

  /* ============ Mark as Read ============ */
  const markMessagesAsRead = () => {
    if (typeof window === "undefined") return;
    const now = Date.now();
    localStorage.setItem("messages_lastSeen", String(now));
    setMessagesLastSeen(now);
  };

  const markNotificationsAsRead = () => {
    if (typeof window === "undefined") return;
    const now = Date.now();
    localStorage.setItem("notifications_lastSeen", String(now));
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

  /* ============ Logout ============ */
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout("admin");
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

  const isUnread = (time?: string, lastSeen?: number) => {
    if (!time || !lastSeen) return true;
    return new Date(time).getTime() > (lastSeen || 0);
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

  const getAdminImage = () => {
    if (!admin?.pic) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        admin?.name || "Admin"
      )}&background=667eea&color=fff&size=64`;
    }
    if (
      admin.pic.startsWith("blob:") ||
      admin.pic.startsWith("http") ||
      admin.pic.startsWith("data:")
    ) {
      return admin.pic;
    }
    return `/assets/images/${admin.pic}`;
  };

  return (
    <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-2">
      <Link
        href="#"
        className="sidebar-toggler flex-shrink-0"
        onClick={toggleSidebar}
      >
        <i className="fa fa-bars"></i>
      </Link>

      {/* Search */}
      <form
        className="d-none d-md-flex ms-4"
        style={{ width: "40%" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="position-relative w-100">
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Search..."
          />
          <i className="fa fa-search position-absolute top-50 start-0 translate-middle-y text-muted ms-3"></i>
        </div>
      </form>

      <div className="navbar-nav align-items-center ms-lg-auto w-100 justify-content-center">
        {/* ============================================================
            📩 MESSAGES DROPDOWN
            ============================================================ */}
        <div
          className={`nav-item dropdown mx-1 ${
            activeDropdown === "messages" ? "show" : ""
          }`}
        >
          <a
            href="#"
            className="nav-link dropdown-toggle position-relative"
            onClick={handleMessagesClick}
          >
            <i className="fa fa-envelope me-lg-2"></i>
            <span className="d-none d-lg-inline-flex">Messages</span>

            {unreadMessages.length > 0 && (
              <span className="badge rounded-pill bg-danger ms-1 badge-pulse">
                {unreadMessages.length > 99 ? "99+" : unreadMessages.length}
              </span>
            )}
          </a>

          {activeDropdown === "messages" && (
            <div
              className="dropdown-menu bg-light border-0 rounded-0 rounded-bottom m-0 show"
              style={{
                minWidth: "320px",
                maxHeight: "400px",
                overflowY: "auto",
                display: "block",
                position: "absolute",
                right: 0,
                top: "100%",
                zIndex: 1000,
              }}
            >
              {messages.length > 0 ? (
                <>
                  <div className="dropdown-header fw-bold text-dark d-flex justify-content-between align-items-center">
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
                            href={item.link || "/AdminEnquirie"}
                            className="dropdown-item py-2"
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
                        : `See All Messages (${messages.length})`}
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

        {/* ============================================================
            🔔 NOTIFICATIONS DROPDOWN
            ============================================================ */}
        <div
          className={`nav-item dropdown mx-1 ${
            activeDropdown === "notifications" ? "show" : ""
          }`}
        >
          <a
            href="#"
            className="nav-link dropdown-toggle position-relative"
            onClick={handleNotificationsClick}
          >
            <i className="fa fa-bell me-lg-2"></i>
            <span className="d-none d-lg-inline-flex">Notifications</span>

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
              className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0 show"
              style={{
                minWidth: "340px",
                maxHeight: "400px",
                overflowY: "auto",
                display: "block",
                position: "absolute",
                right: 0,
                top: "100%",
                zIndex: 1000,
              }}
            >
              {notifications.length > 0 ? (
                <>
                  <div className="dropdown-header fw-bold text-dark d-flex justify-content-between align-items-center">
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
                    const unread = isUnread(n.time, notificationsLastSeen);
                    return (
                      <div key={`${n.type}-${index}`}>
                        <Link
                          href={n.link || "#"}
                          className="dropdown-item py-2"
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

                  {unreadNotifications.length > 0 && (
                    <button
                      type="button"
                      onClick={markNotificationsAsRead}
                      className="dropdown-item text-center text-success fw-bold border-top"
                    >
                      <i className="fa fa-check-double me-1"></i>
                      Mark All as Read
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

        {/* ============================================================
            👤 PROFILE DROPDOWN
            ============================================================ */}
        <div className="nav-item dropdown position-relative" ref={profileRef}>
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
            {/* Profile Image */}
            <img
              className="rounded-circle border border-2 border-primary"
              style={{
                width: "38px",
                height: "38px",
                objectFit: "cover",
                flexShrink: 0,
              }}
              src={getAdminImage()}
              alt="Profile"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    admin?.name || "Admin"
                  )}&background=667eea&color=fff&size=64`;
              }}
            />

            {/* Name + Timer (Column) */}
            <div
              className="d-none d-lg-flex flex-column ms-2"
              style={{ lineHeight: 1.3 }}
            >
              <span
                className="fw-bold text-dark"
                style={{ fontSize: "14px" }}
              >
                {admin?.name || "Admin"}
              </span>

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

            {/* Mobile: Timer Badge */}
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

            {/* Caret */}
            <i
              className="fa fa-chevron-down ms-2"
              style={{ fontSize: "11px", color: "#888" }}
            ></i>
          </a>

          {/* Profile Dropdown Menu */}
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
                    style={{
                      width: "44px",
                      height: "44px",
                      objectFit: "cover",
                    }}
                    src={getAdminImage()}
                    alt="Profile"
                  />
                  <div>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "14px",
                        color: "#333",
                      }}
                    >
                      {admin?.name || "Admin"}
                    </strong>
                    <small style={{ color: "#888", fontSize: "12px" }}>
                      {admin?.email || ""}
                    </small>
                  </div>
                </div>
                <span
                  className="badge bg-danger text-white mt-2"
                  style={{ fontSize: "11px" }}
                >
                  <i className="fa fa-shield-alt me-1"></i> Admin Access
                </span>
              </div>

              {/* Session Info */}
              {sessionTime && (
                <div
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid #e0e0e0",
                    background: "#fff",
                  }}
                >
                  <small
                    style={{
                      color: "#888",
                      fontWeight: 600,
                      display: "block",
                      marginBottom: "10px",
                      fontSize: "11px",
                    }}
                  >
                    <i className="fa fa-clock me-1"></i> Session Info
                  </small>

                  {/* Login */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "6px",
                    }}
                  >
                    <span style={{ color: "#888", fontSize: "12px" }}>
                      Login:
                    </span>
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#333",
                      }}
                    >
                      {new Date(sessionTime.loginAt).toLocaleTimeString(
                        "en-IN",
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </span>
                  </div>

                  {/* Expires */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "6px",
                    }}
                  >
                    <span style={{ color: "#888", fontSize: "12px" }}>
                      Expires:
                    </span>
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#333",
                      }}
                    >
                      {new Date(sessionTime.expiresAt).toLocaleTimeString(
                        "en-IN",
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </span>
                  </div>

                  {/* Time Left */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ color: "#888", fontSize: "12px" }}>
                      Time Left:
                    </span>
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
              <div style={{ padding: "4px 0" }}>
                <Link
                  href="/AdminProfile"
                  className="dropdown-item py-2"
                  style={{ fontSize: "13px" }}
                  onClick={() => setShowProfile(false)}
                >
                  <i className="fa fa-user me-2 text-primary"></i>
                  My Profile
                </Link>
                <Link
                  href="/AdminSetting"
                  className="dropdown-item py-2"
                  style={{ fontSize: "13px" }}
                  onClick={() => setShowProfile(false)}
                >
                  <i className="fa fa-cog me-2 text-primary"></i>
                  Settings
                </Link>
              </div>

              <div
                style={{
                  borderTop: "1px solid #e0e0e0",
                  padding: "4px 0",
                }}
              >
                <button
                  type="button"
                  onClick={handleLogout}
                  className="dropdown-item py-2 text-danger"
                  style={{ fontSize: "13px" }}
                >
                  <i className="fa fa-sign-out-alt me-2"></i>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PageNavbar;