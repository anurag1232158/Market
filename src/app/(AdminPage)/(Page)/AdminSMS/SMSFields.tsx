"use client";
import { ChangeEvent, ReactNode } from "react";

export type SMS = {
  id: string;
  title: string;
  type: string;
  channels: string[];
  sendMode: string;           // ⭐ All Users / Selected Users / Single User / One by One
  recipients: string;         // Legacy field
  selectedUsers: string[];    // ⭐ Selected user IDs
  recipientValue: string;     // Specific user phone
  message: string;
  emailSubject: string;
  emailBody: string;
  priority: string;
  scheduleDate: string;
  status: string;
  totalRecipients: string;    // ⭐ कुल कितनों को भेजना है
  sentCount: string;
  failedCount: string;
  deliveredCount: string;
  readCount: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  sentAt: string;
};

export const emptySMS: SMS = {
  id: "",
  title: "",
  type: "Custom",
  channels: ["SMS"],
  sendMode: "All Users",       // ⭐ Default
  recipients: "",
  selectedUsers: [],
  recipientValue: "",
  message: "",
  emailSubject: "",
  emailBody: "",
  priority: "Normal",
  scheduleDate: "",
  status: "Draft",
  totalRecipients: "0",
  sentCount: "0",
  failedCount: "0",
  deliveredCount: "0",
  readCount: "0",
  notes: "",
  createdAt: "",
  updatedAt: "",
  sentAt: "",
};

/* ---------------- OPTIONS ---------------- */

export const MESSAGE_TYPES = [
  "Order Update",
  "Payment",
  "Offer / Promotion",
  "Reward / Cashback",
  "Enquiry Reply",
  "Festival Wish",
  "Shipping Update",
  "Delivery Confirmation",
  "Alert",
  "Feedback Request",
  "Custom",
];

export const CHANNELS = ["SMS", "WhatsApp", "Email", "In-App"];

/* ⭐ Send Mode Options */
export const SEND_MODES = [
  "All Users",
  "All Admins",
  "All Reports",
  "All Wholesale",
  "Active Users Only",
  "Selected Users",     // ⭐ Manual select
  "Single User",        // ⭐ One specific
  "One by One",         // ⭐ Sequential with manual confirm
];

export const PRIORITIES = ["Low", "Normal", "High", "Urgent"];

export const STATUSES = [
  "Draft",
  "Scheduled",
  "Sending",
  "Sent",
  "Partially Sent",
  "Failed",
  "Cancelled",
];

/* ---------------- TEMPLATES ---------------- */

export const TEMPLATES = [
  {
    name: "Order Confirmed",
    type: "Order Update",
    message:
      "नमस्ते {name}, आपका ऑर्डर {orderNo} कन्फर्म हो गया है। कुल राशि: ₹{amount}. धन्यवाद! 🙏",
  },
  {
    name: "Order Shipped",
    type: "Shipping Update",
    message:
      "नमस्ते {name}, आपका ऑर्डर {orderNo} शिप हो गया है। Tracking ID: {trackingId}.",
  },
  {
    name: "Order Delivered",
    type: "Delivery Confirmation",
    message:
      "नमस्ते {name}, आपका ऑर्डर {orderNo} डिलीवर हो गया है। कृपया review दें! ⭐",
  },
  {
    name: "Diwali Offer",
    type: "Offer / Promotion",
    message:
      "🪔 दिवाली धमाका! सभी Makhana पर 50% OFF. Coupon: DIWALI50. आज ही order करें! 🎉",
  },
  {
    name: "New Year Sale",
    type: "Offer / Promotion",
    message:
      "🎉 नए साल की खुशियाँ! Flat ₹100 OFF on ₹500+. Coupon: NEWYEAR100.",
  },
  {
    name: "Reward Points",
    type: "Reward / Cashback",
    message:
      "🏆 बधाई {name}! आपने {points} reward points कमाए हैं।",
  },
  {
    name: "Festival Wish",
    type: "Festival Wish",
    message:
      "🎊 Happy Diwali {name}! आपके और आपके परिवार को शुभकामनाएँ। - Makhana Store",
  },
  {
    name: "Feedback Request",
    type: "Feedback Request",
    message:
      "नमस्ते {name}, कृपया हमें review दें: {link}",
  },
  {
    name: "Free Shipping Offer",
    type: "Offer / Promotion",
    message:
      "🚚 FREE Shipping on ₹500+ orders! Shop now: {link}",
  },
  {
    name: "Welcome Message",
    type: "Custom",
    message:
      "नमस्ते {name}, Makhana Store में आपका स्वागत है! 10% OFF first order पर.",
  },
];

/* ---------------- HELPERS ---------------- */

export const today = () => new Date().toISOString().split("T")[0];

export const prepareSMS = (d: SMS): SMS => ({
  ...d,
  title: d.title.trim(),
  message: d.message.trim(),
  emailSubject: d.emailSubject.trim(),
  emailBody: d.emailBody.trim(),
  recipientValue: d.recipientValue.trim(),
  notes: d.notes.trim(),
});

export const validateSMS = (d: SMS) => {
  const e: { [key: string]: string } = {};

  if (!d.title.trim()) e.title = "Title is required";
  if (!d.type) e.type = "Select type";
  if (!d.channels || d.channels.length === 0) e.channels = "Select channel";

  if (!d.sendMode) e.sendMode = "Select send mode";

  /* ⭐ Selected Users validation */
  if (d.sendMode === "Selected Users" && d.selectedUsers.length === 0) {
    e.selectedUsers = "Select at least one user";
  }

  /* ⭐ Single User validation */
  if (
    (d.sendMode === "Single User" || d.sendMode === "One by One") &&
    !d.recipientValue.trim()
  ) {
    e.recipientValue = "Select user";
  }

  const needsText =
    d.channels.includes("SMS") || d.channels.includes("WhatsApp");
  if (needsText && !d.message.trim()) e.message = "Message required";
  else if (needsText && d.message.length > 500)
    e.message = "Under 500 characters";

  if (d.channels.includes("Email")) {
    if (!d.emailSubject.trim()) e.emailSubject = "Email subject required";
    if (!d.emailBody.trim()) e.emailBody = "Email body required";
  }

  if (!d.priority) e.priority = "Select priority";
  if (!d.status) e.status = "Select status";

  return e;
};

/* ---------------- UI HELPERS ---------------- */

export const Field = ({
  label,
  error,
  hint,
  required,
  children,
  col = "col-md-4",
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  col?: string;
}) => (
  <div className={col}>
    <div className="mb-3 fw-bold">
      <label>
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children}
      {hint && !error && (
        <small className="text-muted fw-normal d-block mt-1">{hint}</small>
      )}
      {error && <p className="text-danger fw-normal mb-0">{error}</p>}
    </div>
  </div>
);

export const Options = ({
  list,
  placeholder,
}: {
  list: string[];
  placeholder: string;
}) => (
  <>
    <option value="">{placeholder}</option>
    {list.map((o) => (
      <option key={o} value={o}>
        {o}
      </option>
    ))}
  </>
);

/* ---------------- MAIN COMPONENT ---------------- */

type Props = {
  data: SMS;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onChannelToggle?: (channel: string) => void;
  onTemplateSelect?: (templateName: string) => void;
  onUserToggle?: (userId: string) => void;
  onSelectAllUsers?: () => void;
  onClearAllUsers?: () => void;
  allUsers?: any[];                    // ⭐ List of all users
};

export default function SMSFields({
  data,
  errors,
  show,
  onChange,
  onChannelToggle,
  onTemplateSelect,
  onUserToggle,
  onSelectAllUsers,
  onClearAllUsers,
  allUsers = [],
}: Props) {
  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) =>
    `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;

  const needsText =
    data.channels.includes("SMS") || data.channels.includes("WhatsApp");
  const needsEmail = data.channels.includes("Email");

  /* ⭐ Show user selection UI based on mode */
  const showUserList =
    data.sendMode === "Selected Users" || data.sendMode === "One by One";

  const showSingleUser =
    data.sendMode === "Single User";

  return (
    <>
      {/* ============ Section 1 : Basic ============ */}
      <h6 className="fw-bold mb-3">
        <i className="fa fa-info-circle text-primary me-1"></i>
        Message Info
      </h6>

      <div className="row">
        <Field label="Title :" error={err("title")} required>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={onChange}
            placeholder="e.g. Diwali Offer"
            className={cls("title")}
          />
        </Field>

        <Field label="Type :" error={err("type")} required>
          <select
            name="type"
            value={data.type}
            onChange={onChange}
            className={cls("type")}
          >
            <Options list={MESSAGE_TYPES} placeholder="Select Type" />
          </select>
        </Field>

        <Field label="Priority :" error={err("priority")} required>
          <select
            name="priority"
            value={data.priority}
            onChange={onChange}
            className={cls("priority")}
          >
            <Options list={PRIORITIES} placeholder="Select" />
          </select>
        </Field>
      </div>

      {/* ============ Section 2 : Channels ============ */}
      <h6 className="fw-bold mt-3 mb-3">
        <i className="fa fa-paper-plane text-primary me-1"></i>
        Send Via
      </h6>

      <div className="row">
        <div className="col-md-12">
          <div className="d-flex flex-wrap gap-2">
            {CHANNELS.map((ch) => (
              <label
                key={ch}
                className={`btn btn-sm ${
                  data.channels.includes(ch)
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                style={{ cursor: "pointer" }}
              >
                <input
                  type="checkbox"
                  checked={data.channels.includes(ch)}
                  onChange={() => onChannelToggle?.(ch)}
                  style={{ display: "none" }}
                />
                <i
                  className={`fa ${
                    ch === "SMS"
                      ? "fa-sms"
                      : ch === "WhatsApp"
                      ? "fa-whatsapp"
                      : ch === "Email"
                      ? "fa-envelope"
                      : "fa-bell"
                  } me-1`}
                ></i>
                {ch}
              </label>
            ))}
          </div>
          {err("channels") && (
            <p className="text-danger mt-1 mb-0">{err("channels")}</p>
          )}
        </div>
      </div>

      {/* ============ Section 3 : Send Mode (MAIN) ============ */}
      <h6 className="fw-bold mt-3 mb-3">
        <i className="fa fa-users text-primary me-1"></i>
        किसको भेजें?
      </h6>

      <div className="row">
        <Field label="Send Mode :" error={err("sendMode")} required col="col-md-6">
          <select
            name="sendMode"
            value={data.sendMode}
            onChange={onChange}
            className={cls("sendMode")}
          >
            <Options list={SEND_MODES} placeholder="Select Mode" />
          </select>
        </Field>

        {/* ⭐ Info about each mode */}
        <div className="col-md-6">
          <div className="alert alert-info py-2 mb-0" style={{ fontSize: "12px" }}>
            {data.sendMode === "All Users" && (
              <>
                <strong>📢 All Users:</strong> सारे registered users को भेजेगा
              </>
            )}
            {data.sendMode === "All Admins" && (
              <>
                <strong>👨‍💼 All Admins:</strong> सारे admins को
              </>
            )}
            {data.sendMode === "All Reports" && (
              <>
                <strong>📊 All Reports:</strong> सारे report users को
              </>
            )}
            {data.sendMode === "All Wholesale" && (
              <>
                <strong>📦 All Wholesale:</strong> सिर्फ wholesale customers को
              </>
            )}
            {data.sendMode === "Active Users Only" && (
              <>
                <strong>✅ Active Only:</strong> Blocked users को नहीं
              </>
            )}
            {data.sendMode === "Selected Users" && (
              <>
                <strong>🎯 Selected:</strong> नीचे list से users चुनें
              </>
            )}
            {data.sendMode === "Single User" && (
              <>
                <strong>👤 Single:</strong> एक specific user को
              </>
            )}
            {data.sendMode === "One by One" && (
              <>
                <strong>⏯️ One by One:</strong> हर user को manually confirm करके
                भेजें
              </>
            )}
          </div>
        </div>
      </div>

      {/* ⭐ Single User — Dropdown */}
      {showSingleUser && (
        <div className="row mt-3">
          <Field
            label="Select User :"
            error={err("recipientValue")}
            required
            col="col-md-6"
          >
            <select
              name="recipientValue"
              value={data.recipientValue}
              onChange={onChange}
              className={cls("recipientValue")}
            >
              <option value="">-- Select User --</option>
              {allUsers.map((u: any) => (
                <option key={u.id} value={u.id}>
                  {u.name || u.username} — {u.number || u.email}
                </option>
              ))}
            </select>
          </Field>
        </div>
      )}

      {/* ⭐ Selected Users / One by One — List with checkboxes */}
      {showUserList && (
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <small className="fw-bold">
                Users ({data.selectedUsers.length} selected /{" "}
                {allUsers.length} total)
              </small>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={onSelectAllUsers}
                >
                  <i className="fa fa-check-square me-1"></i>
                  Select All
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={onClearAllUsers}
                >
                  <i className="fa fa-times me-1"></i>
                  Clear
                </button>
              </div>
            </div>

            <div
              className="border rounded p-2"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {allUsers.length === 0 ? (
                <p className="text-center text-muted mb-0 py-3">
                  No users found
                </p>
              ) : (
                allUsers.map((u: any) => {
                  const checked = data.selectedUsers.includes(u.id);
                  return (
                    <label
                      key={u.id}
                      className={`d-flex align-items-center p-2 mb-1 rounded ${
                        checked ? "bg-primary text-white" : "bg-light"
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onUserToggle?.(u.id)}
                        className="me-2"
                      />
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          u.name || "U"
                        )}&background=667eea&color=fff&size=32`}
                        className="rounded-circle me-2"
                        width={28}
                        height={28}
                        alt=""
                      />
                      <div className="flex-grow-1" style={{ minWidth: 0 }}>
                        <div className="fw-bold" style={{ fontSize: "13px" }}>
                          {u.name || u.username}
                        </div>
                        <small
                          style={{
                            fontSize: "11px",
                            color: checked ? "rgba(255,255,255,0.8)" : "#888",
                          }}
                        >
                          {u.number || "-"} | {u.email || "-"}
                        </small>
                      </div>
                      <span
                        className={`badge ${
                          checked
                            ? "bg-light text-dark"
                            : "bg-secondary"
                        }`}
                        style={{ fontSize: "10px" }}
                      >
                        {u.type || u.status || "User"}
                      </span>
                    </label>
                  );
                })
              )}
            </div>

            {err("selectedUsers") && (
              <p className="text-danger mt-1 mb-0">{err("selectedUsers")}</p>
            )}
          </div>
        </div>
      )}

      {/* ============ Section 4 : Templates ============ */}
      <h6 className="fw-bold mt-3 mb-3">
        <i className="fa fa-magic text-primary me-1"></i>
        Quick Templates
      </h6>

      <div className="row mb-3">
        <div className="col-md-12">
          <div className="d-flex flex-wrap gap-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.name}
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => onTemplateSelect?.(t.name)}
                title={t.message.slice(0, 60) + "..."}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============ Section 5 : Message Content ============ */}
      {needsText && (
        <>
          <h6 className="fw-bold mt-3 mb-3">
            <i className="fa fa-comment text-primary me-1"></i>
            Message (SMS/WhatsApp)
          </h6>

          <div className="row">
            <Field
              label="Message :"
              error={err("message")}
              required
              col="col-md-12"
              hint={`${data.message.length}/500 — Variables: {name}, {orderNo}, {amount}, {points}`}
            >
              <textarea
                name="message"
                rows={5}
                value={data.message}
                onChange={onChange}
                placeholder="नमस्ते {name}, ..."
                className={cls("message")}
                maxLength={500}
              />
            </Field>
          </div>
        </>
      )}

      {needsEmail && (
        <>
          <h6 className="fw-bold mt-3 mb-3">
            <i className="fa fa-envelope text-primary me-1"></i>
            Email Content
          </h6>
          <div className="row">
            <Field
              label="Email Subject :"
              error={err("emailSubject")}
              required
              col="col-md-12"
            >
              <input
                type="text"
                name="emailSubject"
                value={data.emailSubject}
                onChange={onChange}
                placeholder="Special Diwali Offer"
                className={cls("emailSubject")}
              />
            </Field>
          </div>
          <div className="row">
            <Field
              label="Email Body (HTML) :"
              error={err("emailBody")}
              required
              col="col-md-12"
            >
              <textarea
                name="emailBody"
                rows={6}
                value={data.emailBody}
                onChange={onChange}
                placeholder="<h2>Hello {name},</h2>"
                className={cls("emailBody")}
              />
            </Field>
          </div>
        </>
      )}

      {/* ============ Section 6 : Schedule ============ */}
      <h6 className="fw-bold mt-3 mb-3">
        <i className="fa fa-calendar text-primary me-1"></i>
        Schedule & Status
      </h6>

      <div className="row">
        <Field
          label="Schedule Date :"
          error={err("scheduleDate")}
          hint="Khali chhodo to turant bhejega"
        >
          <input
            type="datetime-local"
            name="scheduleDate"
            value={data.scheduleDate}
            onChange={onChange}
            className={cls("scheduleDate")}
          />
        </Field>

        <Field label="Status :" error={err("status")} required>
          <select
            name="status"
            value={data.status}
            onChange={onChange}
            className={cls("status")}
          >
            <Options list={STATUSES} placeholder="Select Status" />
          </select>
        </Field>
      </div>

      <div className="row">
        <Field label="Internal Notes :" col="col-md-12">
          <textarea
            name="notes"
            rows={2}
            value={data.notes}
            onChange={onChange}
            placeholder="Internal note..."
            className="form-control mt-2"
          />
        </Field>
      </div>
    </>
  );
}