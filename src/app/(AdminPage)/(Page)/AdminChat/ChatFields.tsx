"use client";

/* ============================================================
   CHAT / MESSAGE — Types + Helpers
   ============================================================ */

export type Message = {
  id: string;
  chatId: string;             // एक conversation का unique ID
  senderId: string;           // भेजने वाले की ID (admin या user)
  senderName: string;
  senderRole: "admin" | "user" | "report";
  receiverId: string;         // पाने वाले की ID
  receiverName: string;
  receiverRole: "admin" | "user" | "report";
  receiverPhone: string;
  receiverEmail: string;
  channel: "SMS" | "WhatsApp" | "Email" | "Chat" | "In-App";
  message: string;
  status: "Sent" | "Delivered" | "Read" | "Failed" | "Pending";
  deliveredAt: string;
  readAt: string;
  error: string;
  createdAt: string;
};

export type Chat = {
  id: string;
  uniqueKey?: string;         // ⭐ New
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  userRole: "user" | "admin" | "report";
  userPic: string;
  userCity: string;           // ⭐ New
  userState: string;          // ⭐ New
  userCountry: string;        // ⭐ New
  userAddress: string;        // ⭐ New
  userPin: string;            // ⭐ New
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  lastSeen: string;
  status: "Active" | "Closed" | "Blocked";
};
export const emptyMessage: Message = {
  id: "",
  chatId: "",
  senderId: "",
  senderName: "",
  senderRole: "admin",
  receiverId: "",
  receiverName: "",
  receiverRole: "user",
  receiverPhone: "",
  receiverEmail: "",
  channel: "Chat",
  message: "",
  status: "Pending",
  deliveredAt: "",
  readAt: "",
  error: "",
  createdAt: "",
};

export const CHANNELS = ["Chat", "SMS", "WhatsApp", "Email", "In-App"];

export const MESSAGE_STATUSES = [
  "Pending",
  "Sent",
  "Delivered",
  "Read",
  "Failed",
];

/* ============================================================
   QUICK REPLIES (Chat के लिए ready-made messages)
   ============================================================ */

export const QUICK_REPLIES = [
  "नमस्ते! हम आपकी कैसे मदद कर सकते हैं? 🙏",
  "आपका ऑर्डर 3-5 दिनों में डिलीवर हो जाएगा।",
  "कृपया अपना Order Number बताएँ।",
  "आपकी enquiry के लिए धन्यवाद! हम जल्द reply करेंगे।",
  "क्या आप wholesale rate जानना चाहते हैं?",
  "हमारा सारा Makhana 100% organic और FSSAI certified है। ✅",
  "Free shipping ₹500+ orders पर! 🚚",
  "आपकी समस्या के लिए खेद है। हम तुरंत solve करेंगे।",
  "कृपया अपना पूरा address भेजें।",
  "धन्यवाद! हमें आपके साथ काम करके खुशी हुई। 😊",
];

/* ============================================================
   HELPERS
   ============================================================ */

export const today = () => new Date().toISOString();

export const formatTime = (d?: string) => {
  if (!d) return "-";
  return new Date(d).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDate = (d?: string) => {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatDateTime = (d?: string) => {
  if (!d) return "-";
  return `${formatDate(d)} ${formatTime(d)}`;
};

export const timeAgo = (time?: string) => {
  if (!time) return "Just now";
  const diff = Date.now() - new Date(time).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(time);
};

export const statusBadge = (s?: string) => {
  const map: any = {
    Pending: "bg-warning text-dark",
    Sent: "bg-info text-dark",
    Delivered: "bg-success",
    Read: "bg-primary",
    Failed: "bg-danger",
  };
  return map[s || ""] || "bg-secondary";
};

export const channelIcon = (c?: string) => {
  const map: any = {
    Chat: "fa-comments",
    SMS: "fa-sms",
    WhatsApp: "fa-whatsapp",
    Email: "fa-envelope",
    "In-App": "fa-bell",
  };
  return map[c || ""] || "fa-comment";
};

export const channelColor = (c?: string) => {
  const map: any = {
    Chat: "text-primary",
    SMS: "text-info",
    WhatsApp: "text-success",
    Email: "text-danger",
    "In-App": "text-warning",
  };
  return map[c || ""] || "text-secondary";
};