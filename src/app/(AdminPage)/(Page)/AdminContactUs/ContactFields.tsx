"use client";
import { ChangeEvent, ReactNode } from "react";

/* ============================================================
   CONTACT — User / Admin / Report / Wholesale sabki details
   ============================================================ */

export type Contact = {
  id: string;
  _source?: string;           // ⭐ user / admin / report / contact
  name: string;
  email: string;
  number: string;
  altNumber: string;
  role: string;               // User / Admin / Report / Wholesale
  company: string;
  gst: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pin: string;
  image: string;
  status: string;
  lastLogin: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export const emptyContact: Contact = {
  id: "",
  _source: "contact",
  name: "",
  email: "",
  number: "",
  altNumber: "",
  role: "User",
  company: "",
  gst: "",
  address: "",
  city: "",
  state: "Bihar",
  country: "India",
  pin: "",
  image: "",
  status: "Active",
  lastLogin: "",
  notes: "",
  createdAt: "",
  updatedAt: "",
};

/* ---------------- DROPDOWN OPTIONS ---------------- */

export const ROLES = ["User", "Admin", "Report", "Wholesale"];

export const STATUSES = ["Active", "Blocked", "Inactive"];

export const STATES = [
  "Bihar", "Delhi", "Maharashtra", "Uttar Pradesh", "West Bengal",
  "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan", "Punjab",
  "Haryana", "Madhya Pradesh", "Odisha", "Jharkhand", "Assam", "Other",
];

/* ---------------- HELPERS ---------------- */

export const today = () => new Date().toISOString().split("T")[0];

export const prepareContact = (d: Contact): Contact => ({
  ...d,
  name: (d.name || "").trim(),
  email: (d.email || "").trim().toLowerCase(),
  number: (d.number || "").trim(),
  altNumber: (d.altNumber || "").trim(),
  company: (d.company || "").trim(),
  gst: (d.gst || "").trim().toUpperCase(),
  address: (d.address || "").trim(),
  city: (d.city || "").trim(),
  state: (d.state || "").trim(),
  country: (d.country || "").trim(),
  pin: (d.pin || "").trim(),
  notes: (d.notes || "").trim(),
});

export const validateContact = (d: Contact) => {
  const e: { [key: string]: string } = {};

  if (!d.name?.trim()) e.name = "Name is required";
  else if (d.name.trim().length < 2) e.name = "Name must be at least 2 characters";

  if (!d.number?.trim()) e.number = "Phone is required";
  else if (!/^[0-9]{10,13}$/.test(d.number.trim()))
    e.number = "Enter valid phone number (10-13 digits)";

  if (d.email && !/^\S+@\S+\.\S+$/.test(d.email))
    e.email = "Enter valid email";

  if (d.altNumber && !/^[0-9]{10}$/.test(d.altNumber))
    e.altNumber = "Alternate number must be 10 digits";

  if (!d.role) e.role = "Select role";
  if (!d.status) e.status = "Select status";

  if (d.role === "Wholesale" && !d.company?.trim())
    e.company = "Company name required for Wholesale";

  if (d.gst && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(d.gst))
    e.gst = "Enter valid GST number";

  if (d.pin && !/^[0-9]{6}$/.test(d.pin))
    e.pin = "PIN must be 6 digits";

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
  data: Contact;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
};

/* ============================================================
   MAIN FORM FIELDS
   ============================================================ */

export default function ContactFields({ data, errors, show, onChange }: Props) {
  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) =>
    `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;

  const isBusiness = data.role === "Wholesale";

  return (
    <>
      {/* =====================================================
          Section 1 : Basic Info
          ===================================================== */}
      <h6 className="fw-bold mb-3">Basic Info</h6>

      <div className="row">
        <Field label="Full Name :" error={err("name")} required>
          <input
            type="text"
            name="name"
            value={data.name || ""}
            onChange={onChange}
            placeholder="e.g. Ramesh Kumar"
            className={cls("name")}
          />
        </Field>

        <Field label="Phone Number :" error={err("number")} required hint="10-digit mobile">
          <input
            type="tel"
            name="number"
            value={data.number || ""}
            onChange={onChange}
            placeholder="9876543210"
            className={cls("number")}
          />
        </Field>

        <Field label="Alternate Number :" error={err("altNumber")} hint="Optional">
          <input
            type="tel"
            name="altNumber"
            value={data.altNumber || ""}
            onChange={onChange}
            maxLength={10}
            placeholder="Optional"
            className={cls("altNumber")}
          />
        </Field>
      </div>

      <div className="row">
        <Field label="Email :" error={err("email")}>
          <input
            type="email"
            name="email"
            value={data.email || ""}
            onChange={onChange}
            placeholder="user@example.com"
            className={cls("email")}
          />
        </Field>

        <Field label="Role :" error={err("role")} required>
          <select
            name="role"
            value={data.role || ""}
            onChange={onChange}
            className={cls("role")}
          >
            <Options list={ROLES} placeholder="Select Role" />
          </select>
        </Field>

        <Field label="Status :" error={err("status")} required>
          <select
            name="status"
            value={data.status || ""}
            onChange={onChange}
            className={cls("status")}
          >
            <Options list={STATUSES} placeholder="Select Status" />
          </select>
        </Field>
      </div>

      {/* =====================================================
          Section 2 : Business Info (conditional)
          ===================================================== */}
      {isBusiness && (
        <>
          <h6 className="fw-bold mt-3 mb-3">Business Info</h6>
          <div className="row">
            <Field label="Company Name :" error={err("company")} required>
              <input
                type="text"
                name="company"
                value={data.company || ""}
                onChange={onChange}
                placeholder="e.g. Patel General Store"
                className={cls("company")}
              />
            </Field>

            <Field label="GST Number :" error={err("gst")} hint="15-digit GST">
              <input
                type="text"
                name="gst"
                value={data.gst || ""}
                onChange={onChange}
                maxLength={15}
                placeholder="10ABCDE1234F1Z5"
                className={cls("gst")}
              />
            </Field>
          </div>
        </>
      )}

      {/* =====================================================
          Section 3 : Address
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Address</h6>

      <div className="row">
        <Field label="Full Address :" col="col-md-12">
          <textarea
            name="address"
            rows={2}
            value={data.address || ""}
            onChange={onChange}
            placeholder="House No, Street, Area"
            className="form-control mt-2"
          />
        </Field>
      </div>

      <div className="row">
        <Field label="City :">
          <input
            type="text"
            name="city"
            value={data.city || ""}
            onChange={onChange}
            placeholder="e.g. Darbhanga"
            className="form-control mt-2"
          />
        </Field>

        <Field label="State :">
          <select
            name="state"
            value={data.state || ""}
            onChange={onChange}
            className="form-control mt-2"
          >
            <Options list={STATES} placeholder="Select State" />
          </select>
        </Field>

        <Field label="Country :">
          <input
            type="text"
            name="country"
            value={data.country || ""}
            onChange={onChange}
            className="form-control mt-2"
          />
        </Field>

        <Field label="PIN Code :" error={err("pin")}>
          <input
            type="text"
            name="pin"
            value={data.pin || ""}
            onChange={onChange}
            maxLength={6}
            placeholder="846004"
            className={cls("pin")}
          />
        </Field>
      </div>

      {/* =====================================================
          Section 4 : Media & Notes
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Photo & Notes</h6>

      <div className="row">
        <Field label="Photo :" col="col-md-4" hint="Profile photo (optional)">
          <input
            type="file"
            name="image"
            accept="image/*"
            className="form-control mt-2"
            onChange={onChange}
          />
          {data.image && (
            <div className="mt-2">
              <img
                src={
                  data.image.startsWith("blob:") || data.image.startsWith("http")
                    ? data.image
                    : `/assets/images/${data.image}`
                }
                alt="Contact"
                width="80"
                height="80"
                className="rounded-circle border"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </Field>

        <Field label="Last Login :" hint="आखिरी बार कब login किया">
          <input
            type="datetime-local"
            name="lastLogin"
            value={data.lastLogin ? data.lastLogin.slice(0, 16) : ""}
            onChange={onChange}
            className="form-control mt-2"
          />
        </Field>

        <Field label="Internal Notes :" col="col-md-12">
          <textarea
            name="notes"
            rows={3}
            value={data.notes || ""}
            onChange={onChange}
            placeholder="Internal notes..."
            className="form-control mt-2"
          />
        </Field>
      </div>
    </>
  );
}