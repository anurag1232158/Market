"use client";
import { ChangeEvent, ReactNode } from "react";

/* ============================================================
   POLICY — Legal pages (Privacy, Terms, Refund, etc.)
   ============================================================ */

export type Policy = {
  id: string;
  title: string;              // e.g. Privacy Policy
  slug: string;               // URL slug
  type: string;               // Privacy / Terms / Refund / Shipping / etc.
  content: string;            // Full policy content
  summary: string;            // Short summary (for list page)
  version: string;            // e.g. 1.0, 2.1
  effectiveDate: string;      // Kab se valid hai
  lastUpdated: string;        // Aakhri baar updated
  contactEmail: string;       // Legal contact email
  contactPhone: string;       // Legal contact phone
  status: string;             // Active / Inactive / Draft
  showOnFooter: string;       // Yes / No — footer me dikhana hai?
  order: string;              // Footer order
  metaTitle: string;          // SEO title
  metaDescription: string;    // SEO description
  createdAt: string;
  updatedAt: string;
};

export const emptyPolicy: Policy = {
  id: "",
  title: "",
  slug: "",
  type: "Privacy",
  content: "",
  summary: "",
  version: "1.0",
  effectiveDate: "",
  lastUpdated: "",
  contactEmail: "",
  contactPhone: "",
  status: "Active",
  showOnFooter: "Yes",
  order: "0",
  metaTitle: "",
  metaDescription: "",
  createdAt: "",
  updatedAt: "",
};

/* ---------------- DROPDOWN OPTIONS ---------------- */

export const POLICY_TYPES = [
  "Privacy",         // Privacy Policy
  "Terms",           // Terms & Conditions
  "Refund",          // Refund Policy
  "Shipping",        // Shipping Policy
  "Return",          // Return Policy
  "Cancellation",    // Cancellation Policy
  "Disclaimer",      // Disclaimer
  "Cookie",          // Cookie Policy
  "Payment",         // Payment Policy
  "FAQ",             // Frequently Asked Questions
  "About",           // About Us (legal)
  "Contact",         // Contact Policy
  "Warranty",        // Warranty Information
  "Copyright",       // Copyright Notice
  "GDPR",            // GDPR Compliance
];

export const STATUSES = ["Active", "Inactive", "Draft"];

/* ---------------- HELPERS ---------------- */

export const makeSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const today = () => new Date().toISOString().split("T")[0];

export const preparePolicy = (d: Policy): Policy => ({
  ...d,
  title: d.title.trim(),
  content: d.content.trim(),
  summary: d.summary.trim(),
  slug: d.slug.trim() ? makeSlug(d.slug) : makeSlug(d.title),
  version: d.version.trim() || "1.0",
  contactEmail: d.contactEmail.trim().toLowerCase(),
  contactPhone: d.contactPhone.trim(),
  metaTitle: d.metaTitle.trim(),
  metaDescription: d.metaDescription.trim(),
});

export const validatePolicy = (d: Policy) => {
  const e: { [key: string]: string } = {};

  if (!d.title.trim()) e.title = "Policy title is required";
  else if (d.title.trim().length < 5)
    e.title = "Title must be at least 5 characters";

  if (!d.type) e.type = "Select policy type";

  if (!d.content.trim()) e.content = "Content is required";
  else if (d.content.trim().length < 50)
    e.content = "Content must be at least 50 characters";

  if (!d.summary.trim()) e.summary = "Summary is required";
  else if (d.summary.trim().length < 20)
    e.summary = "Summary must be at least 20 characters";

  if (!d.version.trim()) e.version = "Version is required";

  if (!d.effectiveDate) e.effectiveDate = "Effective date is required";

  if (d.contactEmail && !/^\S+@\S+\.\S+$/.test(d.contactEmail))
    e.contactEmail = "Enter valid email";

  if (d.contactPhone && !/^[0-9]{10}$/.test(d.contactPhone))
    e.contactPhone = "Enter valid 10-digit number";

  if (!d.status) e.status = "Select status";

  if (d.order && Number(d.order) < 0) e.order = "Order cannot be negative";

  if (d.metaTitle && d.metaTitle.length > 60)
    e.metaTitle = "Meta title should be under 60 characters";

  if (d.metaDescription && d.metaDescription.length > 160)
    e.metaDescription = "Meta description should be under 160 characters";

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
  data: Policy;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
};

/* ============================================================
   MAIN FORM FIELDS
   ============================================================ */

export default function PolicyFields({ data, errors, show, onChange }: Props) {
  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) =>
    `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;

  return (
    <>
      {/* =====================================================
          Section 1 : Basic Info
          ===================================================== */}
      <h6 className="fw-bold mb-3">Basic Info</h6>

      <div className="row">
        <Field
          label="Policy Title :"
          error={err("title")}
          required
          col="col-md-8"
          hint="e.g. Privacy Policy, Terms & Conditions"
        >
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={onChange}
            placeholder="Enter policy title"
            className={cls("title")}
          />
        </Field>

        <Field label="Policy Type :" error={err("type")} required>
          <select
            name="type"
            value={data.type}
            onChange={onChange}
            className={cls("type")}
          >
            <Options list={POLICY_TYPES} placeholder="Select Type" />
          </select>
        </Field>
      </div>

      <div className="row">
        <Field
          label="URL Slug :"
          hint="Khali chhodo to title se auto banega"
          col="col-md-8"
        >
          <input
            type="text"
            name="slug"
            value={data.slug}
            onChange={onChange}
            placeholder="e.g. privacy-policy"
            className="form-control mt-2"
          />
          {data.title && !data.slug && (
            <small className="text-success d-block mt-1">
              <i className="fa fa-magic"></i> Auto: <code>{makeSlug(data.title)}</code>
            </small>
          )}
        </Field>

        <Field label="Version :" error={err("version")} required hint="e.g. 1.0, 2.1">
          <input
            type="text"
            name="version"
            value={data.version}
            onChange={onChange}
            placeholder="1.0"
            className={cls("version")}
          />
        </Field>
      </div>

      {/* =====================================================
          Section 2 : Content
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Content</h6>

      <div className="row">
        <Field
          label="Summary :"
          error={err("summary")}
          required
          col="col-md-12"
          hint="Short 1-2 line summary (20-50 words)"
        >
          <textarea
            name="summary"
            rows={2}
            value={data.summary}
            onChange={onChange}
            placeholder="Short summary of this policy..."
            className={cls("summary")}
          />
        </Field>
      </div>

      <div className="row">
        <Field
          label="Full Content :"
          error={err("content")}
          required
          col="col-md-12"
          hint="Full policy text (minimum 50 characters). HTML allowed."
        >
          <textarea
            name="content"
            rows={15}
            value={data.content}
            onChange={onChange}
            placeholder="Write your full policy content here..."
            className={cls("content")}
          />
          <small className="text-muted d-block mt-1">
            💡 Tip: Headings ke liye &lt;h3&gt;Heading&lt;/h3&gt; use karein, paragraphs ke liye &lt;p&gt;text&lt;/p&gt;
          </small>
        </Field>
      </div>

      {/* =====================================================
          Section 3 : Dates & Contact
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Dates & Contact</h6>

      <div className="row">
        <Field
          label="Effective Date :"
          error={err("effectiveDate")}
          required
          hint="Kab se valid hai"
        >
          <input
            type="date"
            name="effectiveDate"
            value={data.effectiveDate ? data.effectiveDate.split("T")[0] : ""}
            onChange={onChange}
            className={cls("effectiveDate")}
          />
        </Field>

        <Field label="Last Updated :" hint="Aakhri update date">
          <input
            type="date"
            name="lastUpdated"
            value={data.lastUpdated ? data.lastUpdated.split("T")[0] : ""}
            onChange={onChange}
            className="form-control mt-2"
          />
        </Field>
      </div>

      <div className="row">
        <Field
          label="Contact Email :"
          error={err("contactEmail")}
          hint="Legal contact email"
        >
          <input
            type="email"
            name="contactEmail"
            value={data.contactEmail}
            onChange={onChange}
            placeholder="legal@yoursite.com"
            className={cls("contactEmail")}
          />
        </Field>

        <Field
          label="Contact Phone :"
          error={err("contactPhone")}
          hint="10-digit number"
        >
          <input
            type="tel"
            name="contactPhone"
            value={data.contactPhone}
            onChange={onChange}
            maxLength={10}
            placeholder="9876543210"
            className={cls("contactPhone")}
          />
        </Field>
      </div>

      {/* =====================================================
          Section 4 : Display Settings
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Display Settings</h6>

      <div className="row">
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

        <Field label="Show on Footer :" hint="Footer me link dikhana hai?">
          <select
            name="showOnFooter"
            value={data.showOnFooter}
            onChange={onChange}
            className="form-control mt-2"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </Field>

        <Field
          label="Footer Order :"
          error={err("order")}
          hint="0 = सबसे पहले"
        >
          <input
            type="number"
            name="order"
            min={0}
            value={data.order}
            onChange={onChange}
            className={cls("order")}
          />
        </Field>
      </div>

      {/* =====================================================
          Section 5 : SEO
          ===================================================== */}
      <h6 className="fw-bold mt-4 mb-3">SEO (Search Engine Optimization)</h6>

      <div className="row">
        <Field
          label="Meta Title :"
          error={err("metaTitle")}
          hint={`${data.metaTitle.length}/60 characters`}
          col="col-md-6"
        >
          <input
            type="text"
            name="metaTitle"
            value={data.metaTitle}
            onChange={onChange}
            placeholder="SEO title for Google"
            className={cls("metaTitle")}
          />
        </Field>

        <Field
          label="Meta Description :"
          error={err("metaDescription")}
          hint={`${data.metaDescription.length}/160 characters`}
          col="col-md-6"
        >
          <textarea
            name="metaDescription"
            rows={2}
            value={data.metaDescription}
            onChange={onChange}
            placeholder="Short description for Google search"
            className={cls("metaDescription")}
          />
        </Field>
      </div>
    </>
  );
}