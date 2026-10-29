"use client";
import { ChangeEvent, ReactNode } from "react";

/* ============================================================
   ENQUIRY — Customer leads, contact requests, bulk orders
   ============================================================ */

export type Enquiry = {
  id: string;
  name: string;                // Customer name
  email: string;               // Email
  number: string;              // Phone
  type: string;                // Contact / Bulk Order / Product Question / Complaint
  subject: string;             // Short subject
  message: string;             // Full enquiry message
  product: string;             // Related product (optional)
  quantity: string;            // Bulk order quantity (optional)
  city: string;                // Customer city
  state: string;               // State
  source: string;              // Website / Phone / WhatsApp / Instagram
  priority: string;            // Low / Medium / High / Urgent
  status: string;              // New / In Progress / Replied / Closed
  assignedTo: string;          // Which team member
  adminReply: string;          // Admin's reply
  replyDate: string;           // When replied
  followUpDate: string;        // Next follow-up date
  createdAt: string;
  updatedAt: string;
};

export const emptyEnquiry: Enquiry = {
  id: "",
  name: "",
  email: "",
  number: "",
  type: "Contact",
  subject: "",
  message: "",
  product: "",
  quantity: "",
  city: "",
  state: "",
  source: "Website",
  priority: "Medium",
  status: "New",
  assignedTo: "",
  adminReply: "",
  replyDate: "",
  followUpDate: "",
  createdAt: "",
  updatedAt: "",
};

/* ---------------- DROPDOWN OPTIONS ---------------- */

export const ENQUIRY_TYPES = [
  "Contact",           // Normal contact form
  "Bulk Order",        // Wholesale/bulk enquiry
  "Product Question",  // Product details पूछना
  "Price Enquiry",     // Price पूछना
  "Complaint",         // शिकायत
  "Return Request",    // Return
  "Partnership",       // Business partnership
  "Careers",           // Job enquiry
  "Feedback",          // Feedback
];

export const SOURCES = [
  "Website",
  "Phone Call",
  "WhatsApp",
  "Instagram",
  "Facebook",
  "Email",
  "Walk-in",
  "Referral",
];

export const PRIORITIES = ["Low", "Medium", "High", "Urgent"];

export const STATUSES = [
  "New",
  "In Progress",
  "Replied",
  "Follow Up",
  "Closed",
  "Spam",
];

export const TEAM_MEMBERS = [
  "Unassigned",
  "Admin",
  "Sales Team",
  "Support Team",
  "Ram Prasad Singh",
  "Anita Sharma",
];

/* ---------------- HELPERS ---------------- */

export const today = () => new Date().toISOString().split("T")[0];

export const prepareEnquiry = (d: Enquiry): Enquiry => ({
  ...d,
  name: d.name.trim(),
  email: d.email.trim().toLowerCase(),
  number: d.number.trim(),
  subject: d.subject.trim(),
  message: d.message.trim(),
  product: d.product.trim(),
  quantity: d.quantity.trim(),
  city: d.city.trim(),
  state: d.state.trim(),
  adminReply: d.adminReply.trim(),
});

export const validateEnquiry = (d: Enquiry) => {
  const e: { [key: string]: string } = {};
  if (!d.name.trim()) e.name = "Name is required";
  else if (d.name.trim().length < 2) e.name = "Name must be at least 2 characters";

  if (!d.number.trim()) e.number = "Phone number is required";
  else if (!/^[0-9]{10}$/.test(d.number.trim()))
    e.number = "Enter valid 10-digit mobile number";

  if (d.email && !/^\S+@\S+\.\S+$/.test(d.email))
    e.email = "Enter valid email address";

  if (!d.type) e.type = "Select enquiry type";
  if (!d.subject.trim()) e.subject = "Subject is required";
  else if (d.subject.trim().length < 3)
    e.subject = "Subject must be at least 3 characters";

  if (!d.message.trim()) e.message = "Message is required";
  else if (d.message.trim().length < 10)
    e.message = "Message must be at least 10 characters";

  if (!d.source) e.source = "Select source";
  if (!d.priority) e.priority = "Select priority";
  if (!d.status) e.status = "Select status";

  if (d.type === "Bulk Order" && !d.quantity.trim())
    e.quantity = "Quantity required for bulk order";

  return e;
};

/* ---------------- SMALL UI HELPERS ---------------- */

const Field = ({
  label, error, hint, required, children, col = "col-md-4",
}: {
  label: string; error?: string; hint?: string; required?: boolean;
  children: ReactNode; col?: string;
}) => (
  <div className={col}>
    <div className="mb-3 fw-bold">
      <label>{label} {required && <span className="text-danger">*</span>}</label>
      {children}
      {hint && !error && <small className="text-muted fw-normal d-block mt-1">{hint}</small>}
      {error && <p className="text-danger fw-normal mb-0">{error}</p>}
    </div>
  </div>
);

const Options = ({ list, placeholder }: { list: string[]; placeholder: string }) => (
  <>
    <option value="">{placeholder}</option>
    {list.map((o) => (
      <option key={o} value={o}>{o}</option>
    ))}
  </>
);

type Props = {
  data: Enquiry;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
};

/* ============================================================
   MAIN FORM FIELDS
   ============================================================ */

export default function EnquiryFields({ data, errors, show, onChange }: Props) {
  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) =>
    `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;

  return (
    <>
      {/* =====================================================
          Section 1 : Customer Info
          ===================================================== */}
      <h6 className="fw-bold mb-3">Customer Info</h6>

      <div className="row">
        <Field label="Customer Name :" error={err("name")} required>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChange}
            placeholder="e.g. Ramesh Kumar"
            className={cls("name")}
          />
        </Field>

        <Field label="Phone Number :" error={err("number")} required hint="10-digit mobile">
          <input
            type="tel"
            name="number"
            value={data.number}
            onChange={onChange}
            placeholder="9876543210"
            maxLength={10}
            className={cls("number")}
          />
        </Field>

        <Field label="Email :" error={err("email")} hint="Optional">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChange}
            placeholder="customer@example.com"
            className={cls("email")}
          />
        </Field>
      </div>

      <div className="row">
        <Field label="City :" hint="Optional">
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={onChange}
            placeholder="e.g. Darbhanga"
            className="form-control mt-2"
          />
        </Field>

        <Field label="State :" hint="Optional">
          <input
            type="text"
            name="state"
            value={data.state}
            onChange={onChange}
            placeholder="e.g. Bihar"
            className="form-control mt-2"
          />
        </Field>

        <Field label="Source :" error={err("source")} required hint="Enquiry कहाँ से आई">
          <select
            name="source"
            value={data.source}
            onChange={onChange}
            className={cls("source")}
          >
            <Options list={SOURCES} placeholder="Select Source" />
          </select>
        </Field>
      </div>

      {/* =====================================================
          Section 2 : Enquiry Details
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Enquiry Details</h6>

      <div className="row">
        <Field label="Enquiry Type :" error={err("type")} required>
          <select
            name="type"
            value={data.type}
            onChange={onChange}
            className={cls("type")}
          >
            <Options list={ENQUIRY_TYPES} placeholder="Select Type" />
          </select>
        </Field>

        <Field label="Priority :" error={err("priority")} required>
          <select
            name="priority"
            value={data.priority}
            onChange={onChange}
            className={cls("priority")}
          >
            <Options list={PRIORITIES} placeholder="Select Priority" />
          </select>
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
        <Field label="Subject :" error={err("subject")} required col="col-md-8">
          <input
            type="text"
            name="subject"
            value={data.subject}
            onChange={onChange}
            placeholder="e.g. Bulk order enquiry for 50kg makhana"
            className={cls("subject")}
          />
        </Field>

        <Field label="Assigned To :" hint="किस team member को assign करें">
          <select
            name="assignedTo"
            value={data.assignedTo}
            onChange={onChange}
            className="form-control mt-2"
          >
            <Options list={TEAM_MEMBERS} placeholder="Select Member" />
          </select>
        </Field>
      </div>

      {/* Bulk order ke liye extra fields */}
      {data.type === "Bulk Order" && (
        <div className="row">
          <Field label="Product :" hint="कौन सा product">
            <input
              type="text"
              name="product"
              value={data.product}
              onChange={onChange}
              placeholder="e.g. Peri Peri Makhana"
              className="form-control mt-2"
            />
          </Field>

          <Field label="Quantity :" error={err("quantity")} required hint="कितना चाहिए">
            <input
              type="text"
              name="quantity"
              value={data.quantity}
              onChange={onChange}
              placeholder="e.g. 50 kg, 100 packets"
              className={cls("quantity")}
            />
          </Field>
        </div>
      )}

      {/* अगर Bulk Order नहीं है, तो Product optional दिखाएँ */}
      {data.type !== "Bulk Order" && (
        <div className="row">
          <Field label="Related Product :" hint="अगर कोई specific product है">
            <input
              type="text"
              name="product"
              value={data.product}
              onChange={onChange}
              placeholder="e.g. Peri Peri Makhana"
              className="form-control mt-2"
            />
          </Field>
        </div>
      )}

      <div className="row">
        <Field
          label="Message :"
          error={err("message")}
          required
          col="col-md-12"
          hint="Customer का पूरा message (minimum 10 characters)"
        >
          <textarea
            name="message"
            rows={5}
            value={data.message}
            onChange={onChange}
            placeholder="Customer ne kya likha..."
            className={cls("message")}
          />
        </Field>
      </div>

      {/* =====================================================
          Section 3 : Admin Reply & Follow-up
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Admin Reply & Follow-up</h6>

      <div className="row">
        <Field
          label="Admin Reply :"
          col="col-md-12"
          hint="Customer ko kya reply bhejna hai"
        >
          <textarea
            name="adminReply"
            rows={4}
            value={data.adminReply}
            onChange={onChange}
            placeholder="Write your reply to this enquiry..."
            className="form-control mt-2"
          />
        </Field>
      </div>

      <div className="row">
        <Field label="Reply Date :" hint="Kab reply bheja">
          <input
            type="date"
            name="replyDate"
            value={data.replyDate ? data.replyDate.split("T")[0] : ""}
            onChange={onChange}
            className="form-control mt-2"
          />
        </Field>

        <Field label="Next Follow-up Date :" hint="Kab follow-up karna hai">
          <input
            type="date"
            name="followUpDate"
            value={data.followUpDate ? data.followUpDate.split("T")[0] : ""}
            onChange={onChange}
            className="form-control mt-2"
          />
        </Field>
      </div>
    </>
  );
}