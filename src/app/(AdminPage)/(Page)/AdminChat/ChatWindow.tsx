"use client";
import { useEffect, useRef, useState } from "react";
import {
  Message,
  QUICK_REPLIES,
  formatTime,
  statusBadge,
  channelIcon,
  channelColor,
  today,
} from "./ChatFields";

interface Props {
  chat: any;
  onMessageSent: () => void;
}

export default function ChatWindow({ chat, onMessageSent }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [channel, setChannel] = useState<"Chat" | "SMS" | "WhatsApp" | "Email">(
    "Chat"
  );
  const [sending, setSending] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  /* ============ Fetch Messages ============ */
 /* ============ Fetch Messages — SAFE ============ */
const fetchMessages = async () => {
  if (!chat?.id) return;

  try {
    const chatId = `chat-${chat.id}`;
    const res = await fetch(`/api/chat/messages?chatId=${chatId}`);

    if (!res.ok) {
      console.error(`API error: ${res.status}`);
      setMessages([]);
      return;
    }

    const text = await res.text();

    if (!text || text.trim() === "") {
      console.warn("Empty response");
      setMessages([]);
      return;
    }

    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      console.error("JSON parse error:", text.slice(0, 200));
      setMessages([]);
      return;
    }

    const list = Array.isArray(data) ? data : data?.messages || [];
    setMessages(list);
  } catch (err) {
    console.error("Fetch error:", err);
    setMessages([]);
  }
};

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [chat?.id]);

  /* ============ Auto Scroll ============ */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  /* ============ Send Message ============ */
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    setSending(true);

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: `chat-${chat.id}`,
          senderId: "admin",
          senderName: "Admin",
          senderRole: "admin",
          receiverId: chat.userId || chat.id,
          receiverName: chat.userName,
          receiverRole: chat.userRole || "user",
          receiverPhone: chat.userPhone,
          receiverEmail: chat.userEmail,
          channel,
          message: newMessage.trim(),
          status: channel === "Chat" ? "Delivered" : "Sent",
          createdAt: today(),
        }),
      });

      if (res.ok) {
        setNewMessage("");
        fetchMessages();
        onMessageSent?.();
      } else {
        alert("Send failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ⭐ Map Link */
  const mapLink = `https://maps.google.com/?q=${encodeURIComponent(
    `${chat.userAddress || ""}, ${chat.userCity || ""}, ${
      chat.userState || ""
    } ${chat.userPin || ""}`
  )}`;

  return (
    <>
      {/* ============================================================
          HEADER — User Info + Location + Actions
          ============================================================ */}
      <div className="card-header bg-light">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          {/* LEFT: User Info + Location */}
          <div className="d-flex align-items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                chat.userName || "User"
              )}&background=667eea&color=fff&size=64`}
              className="rounded-circle me-2 border border-2 border-primary"
              width={48}
              height={48}
              alt=""
            />
            <div>
              {/* Name + Role */}
              <div className="d-flex align-items-center gap-2">
                <strong style={{ fontSize: "15px" }}>
                  {chat.userName || "Unknown"}
                </strong>
                <span
                  className={`badge ${
                    chat.userRole === "admin"
                      ? "bg-danger"
                      : chat.userRole === "report"
                      ? "bg-warning text-dark"
                      : "bg-primary"
                  }`}
                  style={{ fontSize: "9px" }}
                >
                  {chat.userRole || "user"}
                </span>
                {chat.status === "Blocked" && (
                  <span className="badge bg-dark" style={{ fontSize: "9px" }}>
                    Blocked
                  </span>
                )}
              </div>

              {/* Phone + Email */}
              <small className="text-muted d-block" style={{ fontSize: "11px" }}>
                <i className="fa fa-phone me-1 text-primary"></i>
                {chat.userPhone || "-"}
                {chat.userEmail && (
                  <>
                    <span className="ms-2">
                      <i className="fa fa-envelope me-1 text-danger"></i>
                      {chat.userEmail}
                    </span>
                  </>
                )}
              </small>

              {/* Location */}
              {(chat.userCity || chat.userState || chat.userCountry) && (
                <small className="text-muted d-block" style={{ fontSize: "11px" }}>
                  <i className="fa fa-map-marker-alt me-1 text-danger"></i>
                  {chat.userCity && <span>{chat.userCity}</span>}
                  {chat.userState && <span>, {chat.userState}</span>}
                  {chat.userCountry && <span>, {chat.userCountry}</span>}
                </small>
              )}

              {/* Full Address */}
              {(chat.userAddress || chat.userPin) && (
                <small className="text-muted d-block" style={{ fontSize: "10px" }}>
                  <i className="fa fa-home me-1 text-warning"></i>
                  {chat.userAddress || "-"}
                  {chat.userPin && <span> - {chat.userPin}</span>}
                </small>
              )}
            </div>
          </div>

          {/* RIGHT: Action Buttons */}
          <div className="d-flex gap-2 flex-wrap">
            <a
              href={`tel:${chat.userPhone}`}
              className="btn btn-sm btn-outline-success"
              title="Call"
            >
              <i className="fa fa-phone"></i>
            </a>
            <a
              href={`https://wa.me/${(chat.userPhone || "").replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-success"
              title="WhatsApp"
            >
              <i className="fa fa-whatsapp"></i>
            </a>
            {chat.userEmail && (
              <a
                href={`mailto:${chat.userEmail}`}
                className="btn btn-sm btn-outline-danger"
                title="Email"
              >
                <i className="fa fa-envelope"></i>
              </a>
            )}
            {chat.userAddress && (
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-primary"
                title="View on Map"
              >
                <i className="fa fa-map-marked-alt"></i>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================
          MESSAGES BODY
          ============================================================ */}
      <div
        className="card-body"
        style={{
          background: "#f5f5f5",
          overflowY: "auto",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.length === 0 ? (
          <div className="text-center text-muted py-5 m-auto">
            <i className="fa fa-comments fa-3x mb-2"></i>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((m, idx) => {
            const isMine = m.senderRole === "admin";
            return (
              <div
                key={m.id || idx}
                className={`mb-3 d-flex ${
                  isMine ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: isMine ? "#667eea" : "#fff",
                    color: isMine ? "#fff" : "#333",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                    }}
                  >
                    {m.message}
                  </div>
                  <div
                    className="d-flex align-items-center gap-2 mt-1"
                    style={{
                      fontSize: "10px",
                      color: isMine ? "rgba(255,255,255,0.7)" : "#888",
                    }}
                  >
                    <i
                      className={`fa ${channelIcon(
                        m.channel
                      )} ${isMine ? "" : channelColor(m.channel)}`}
                      title={m.channel}
                    ></i>
                    <span>{formatTime(m.createdAt)}</span>
                    {isMine && (
                      <span
                        className={`badge ${statusBadge(m.status)}`}
                        style={{ fontSize: "9px" }}
                      >
                        {m.status === "Read" && (
                          <i className="fa fa-check-double me-1"></i>
                        )}
                        {m.status === "Delivered" && (
                          <i className="fa fa-check-double me-1"></i>
                        )}
                        {m.status === "Sent" && (
                          <i className="fa fa-check me-1"></i>
                        )}
                        {m.status === "Failed" && (
                          <i className="fa fa-times me-1"></i>
                        )}
                        {m.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef}></div>
      </div>

      {/* ============================================================
          QUICK REPLIES
          ============================================================ */}
      {showQuickReplies && (
        <div className="p-2 border-top bg-light">
          <small className="text-muted d-block mb-2">
            <i className="fa fa-bolt me-1"></i>Quick Replies
          </small>
          <div className="d-flex flex-wrap gap-1">
            {QUICK_REPLIES.map((qr, i) => (
              <button
                key={i}
                type="button"
                className="btn btn-sm btn-outline-primary"
                style={{ fontSize: "11px" }}
                onClick={() => {
                  setNewMessage(qr);
                  setShowQuickReplies(false);
                }}
              >
                {qr.slice(0, 40)}
                {qr.length > 40 ? "..." : ""}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================
          SEND BOX
          ============================================================ */}
      <div className="card-footer bg-white">
        {/* Channel Selector */}
        <div className="d-flex gap-1 mb-2 flex-wrap">
          {(["Chat", "SMS", "WhatsApp", "Email"] as const).map((c) => (
            <button
              key={c}
              type="button"
              className={`btn btn-sm ${
                channel === c ? "btn-primary" : "btn-outline-primary"
              }`}
              style={{ fontSize: "11px" }}
              onClick={() => setChannel(c)}
            >
              <i
                className={`fa ${
                  c === "Chat"
                    ? "fa-comments"
                    : c === "SMS"
                    ? "fa-sms"
                    : c === "WhatsApp"
                    ? "fa-whatsapp"
                    : "fa-envelope"
                } me-1`}
              ></i>
              {c}
            </button>
          ))}
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowQuickReplies(!showQuickReplies)}
            title="Quick Replies"
          >
            <i className="fa fa-bolt"></i>
          </button>
          <textarea
            className="form-control"
            rows={1}
            placeholder="Type your message... (Enter to send)"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={sending}
            style={{ resize: "none" }}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={sendMessage}
            disabled={sending || !newMessage.trim()}
          >
            {sending ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              <i className="fa fa-paper-plane"></i>
            )}
          </button>
        </div>
      </div>
    </>
  );
}