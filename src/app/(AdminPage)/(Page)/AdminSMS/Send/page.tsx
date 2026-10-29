"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../../Sidebar/Footer/page";
import Sidebars from "../../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../../Sidebar/Navbar/PageNavbar";
import ASO from "../../../AOS/AOS";
import { SMS, emptySMS, today, statusBadge } from "../SMSFields";

function SendContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<SMS>(emptySMS);
  const [users, setUsers] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sentList, setSentList] = useState<any[]>([]);
  const [failedList, setFailedList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ============ Load Campaign + Users ============ */
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    Promise.all([
      fetch(`/api/sms?id=${id}`).then((r) => r.json()),
      fetch("/api/user").then((r) => r.json()).catch(() => []),
    ]).then(([campaign, userList]) => {
      setData({ ...emptySMS, ...campaign });

      const allUsers = Array.isArray(userList)
        ? userList
        : userList?.user || [];
      setUsers(allUsers);
      setLoading(false);
    });
  }, [id]);

  /* ⭐ Current user */
  const currentUser = users[currentIndex];
  const total = users.length;
  const remaining = total - currentIndex;

  /* ⭐ Send to Current User */
  const sendToCurrent = async () => {
    if (!currentUser) return;
    setSending(true);

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: `chat-${currentUser.id}`,
          senderId: "admin",
          senderName: "Admin",
          senderRole: "admin",
          receiverId: currentUser.id,
          receiverName: currentUser.name || currentUser.username,
          receiverRole: "user",
          receiverPhone: currentUser.number || "",
          receiverEmail: currentUser.email || "",
          channel: data.channels[0] || "SMS",
          message: (data.message || "").replace(
            /{name}/g,
            currentUser.name || ""
          ),
          status: "Sent",
          createdAt: today(),
        }),
      });

      if (res.ok) {
        setSentList((prev) => [...prev, currentUser]);
        moveNext();
      } else {
        setFailedList((prev) => [...prev, currentUser]);
        moveNext();
      }
    } catch (err) {
      setFailedList((prev) => [...prev, currentUser]);
      moveNext();
    } finally {
      setSending(false);
    }
  };

  /* ⭐ Skip Current User */
  const skipCurrent = () => {
    moveNext();
  };

  /* ⭐ Move to next */
  const moveNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      /* सब हो गए */
      setTimeout(() => {
        alert(
          `✅ Campaign Complete!\n\nSent: ${sentList.length + 1}\nFailed: ${
            failedList.length
          }\nSkipped: ${total - sentList.length - failedList.length - 1}`
        );
        router.push("/AdminSMS");
      }, 500);
    }
  };

  /* ⭐ Send to All Remaining */
  const sendAllRemaining = async () => {
    if (!confirm(`Bhej de sabhi ${remaining} users ko?`)) return;

    for (let i = currentIndex; i < total; i++) {
      const user = users[i];
      try {
        await fetch("/api/chat/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatId: `chat-${user.id}`,
            senderId: "admin",
            senderName: "Admin",
            senderRole: "admin",
            receiverId: user.id,
            receiverName: user.name || user.username,
            receiverRole: "user",
            receiverPhone: user.number || "",
            receiverEmail: user.email || "",
            channel: data.channels[0] || "SMS",
            message: (data.message || "").replace(
              /{name}/g,
              user.name || ""
            ),
            status: "Sent",
            createdAt: today(),
          }),
        });
        setSentList((prev) => [...prev, user]);
      } catch (err) {
        setFailedList((prev) => [...prev, user]);
      }
    }

    setCurrentIndex(total);
    alert("✅ सबको भेज दिया!");
    router.push("/AdminSMS");
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!id)
    return <div className="alert alert-danger m-3">❌ No ID</div>;

  /* ⭐ Preview message with current user name */
  const previewMessage = (data.message || "").replace(
    /{name}/g,
    currentUser?.name || "User"
  );

  return (
    <>
      <ASO />
      <div className="wrapper">
        <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
          <PageNavbar toggleSidebar={toggleSidebar} />
          <section className="mb-5 py-5">
            <div className="container-fluid px-4">
              <div className="border p-3 mb-4 bg-gradient text-center">
                <h5 className="mb-0 fw-bold text-white">
                  <i className="fa fa-paper-plane me-2"></i>
                  Sending One by One: {data.title}
                </h5>
              </div>

              {/* Progress Bar */}
              <div className="card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      <strong>Progress:</strong> {currentIndex} / {total}
                    </span>
                    <span>
                      ✅ Sent: {sentList.length} | ❌ Failed:{" "}
                      {failedList.length} | ⏭️ Remaining: {remaining}
                    </span>
                  </div>
                  <div className="progress" style={{ height: "20px" }}>
                    <div
                      className="progress-bar bg-success"
                      style={{ width: `${(currentIndex / total) * 100}%` }}
                    >
                      {Math.round((currentIndex / total) * 100)}%
                    </div>
                  </div>
                </div>
              </div>

              {currentUser ? (
                <div className="row">
                  {/* Left: User Info */}
                  <div className="col-md-5 mb-4">
                    <div className="card shadow">
                      <div className="card-header bg-primary text-white">
                        <h6 className="mb-0">
                          <i className="fa fa-user me-2"></i>
                          Current Recipient ({currentIndex + 1}/{total})
                        </h6>
                      </div>
                      <div className="card-body text-center">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            currentUser.name || "U"
                          )}&background=667eea&color=fff&size=128`}
                          className="rounded-circle mb-3"
                          width={100}
                          height={100}
                          alt=""
                        />
                        <h5>{currentUser.name || currentUser.username}</h5>
                        <p className="text-muted mb-1">
                          <i className="fa fa-phone me-1"></i>
                          {currentUser.number || "-"}
                        </p>
                        <p className="text-muted mb-1">
                          <i className="fa fa-envelope me-1"></i>
                          {currentUser.email || "-"}
                        </p>
                        {currentUser.city && (
                          <p className="text-muted mb-0">
                            <i className="fa fa-map-marker-alt me-1"></i>
                            {currentUser.city}
                          </p>
                        )}
                      </div>
                      <div className="card-footer">
                        <div className="d-grid gap-2">
                          <button
                            className="btn btn-success btn-lg"
                            onClick={sendToCurrent}
                            disabled={sending}
                          >
                            {sending ? (
                              <>
                                <i className="fa fa-spinner fa-spin me-2"></i>
                                Sending...
                              </>
                            ) : (
                              <>
                                <i className="fa fa-paper-plane me-2"></i>
                                Send & Next
                              </>
                            )}
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={skipCurrent}
                            disabled={sending}
                          >
                            <i className="fa fa-forward me-2"></i>
                            Skip
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Message Preview */}
                  <div className="col-md-7 mb-4">
                    <div className="card shadow">
                      <div className="card-header">
                        <h6 className="mb-0">
                          <i className="fa fa-comment me-2"></i>
                          Message Preview
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {data.channels.map((ch) => (
                            <span key={ch} className="badge bg-primary">
                              <i
                                className={`fa ${
                                  ch === "SMS"
                                    ? "fa-sms"
                                    : ch === "WhatsApp"
                                    ? "fa-whatsapp"
                                    : "fa-envelope"
                                } me-1`}
                              ></i>
                              {ch}
                            </span>
                          ))}
                        </div>

                        <div
                          className="alert alert-success"
                          style={{ whiteSpace: "pre-line", fontSize: "15px" }}
                        >
                          {previewMessage}
                        </div>

                        <hr />

                        <h6 className="fw-bold">Next Users in Queue:</h6>
                        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                          {users
                            .slice(currentIndex + 1, currentIndex + 11)
                            .map((u, i) => (
                              <div
                                key={u.id}
                                className="d-flex align-items-center p-2 border-bottom"
                              >
                                <span className="badge bg-secondary me-2">
                                  {currentIndex + i + 2}
                                </span>
                                <img
                                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    u.name || "U"
                                  )}&background=667eea&color=fff&size=32`}
                                  className="rounded-circle me-2"
                                  width={24}
                                  height={24}
                                  alt=""
                                />
                                <small className="flex-grow-1">
                                  {u.name} — {u.number}
                                </small>
                              </div>
                            ))}
                          {users.length - currentIndex - 1 > 10 && (
                            <small className="text-muted d-block text-center mt-2">
                              ... और {users.length - currentIndex - 11} users
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="card-footer">
                        <button
                          className="btn btn-warning w-100"
                          onClick={sendAllRemaining}
                          disabled={sending}
                        >
                          <i className="fa fa-bolt me-2"></i>
                          Send to All Remaining ({remaining})
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card shadow">
                  <div className="card-body text-center py-5">
                    <i className="fa fa-check-circle fa-5x text-success mb-3"></i>
                    <h3>Campaign Complete! 🎉</h3>
                    <div className="row mt-4 justify-content-center">
                      <div className="col-md-3">
                        <div className="alert alert-success">
                          <h4 className="mb-0">{sentList.length}</h4>
                          <small>Sent</small>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="alert alert-danger">
                          <h4 className="mb-0">{failedList.length}</h4>
                          <small>Failed</small>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="alert alert-info">
                          <h4 className="mb-0">
                            {total - sentList.length - failedList.length}
                          </h4>
                          <small>Skipped</small>
                        </div>
                      </div>
                    </div>
                    <Link href="/AdminSMS" className="btn btn-primary mt-3">
                      Back to List
                    </Link>
                  </div>
                </div>
              )}

              {/* Sent History */}
              {sentList.length > 0 && (
                <div className="card shadow mt-4">
                  <div className="card-header">
                    <h6 className="mb-0">
                      <i className="fa fa-check-circle text-success me-2"></i>
                      Sent History ({sentList.length})
                    </h6>
                  </div>
                  <div className="card-body p-0">
                    <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                      <table className="table table-sm mb-0">
                        <tbody>
                          {sentList.map((u, i) => (
                            <tr key={i}>
                              <td style={{ width: "50px" }}>#{i + 1}</td>
                              <td>
                                <i className="fa fa-check-circle text-success me-2"></i>
                                {u.name} — {u.number}
                              </td>
                              <td className="text-end text-muted">
                                Just sent
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
          <PageFooter />
        </div>
      </div>
    </>
  );
}

export default function AdminSendSMS() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <SendContent />
    </Suspense>
  );
}