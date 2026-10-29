"use client";
import { ChangeEvent, ReactNode } from "react";

/* ============================================================
   CUSTOMER — Retail + Wholesale buyers ke liye
   ============================================================ */

export type Customer = {
  id: string;
  name: string;                // Full name
  email: string;               // Email
  number: string;              // Phone
  altNumber: string;           // Alternate phone (optional)
  type: string;                // Retail / Wholesale / Distributor
  company: string;             // Company name (wholesale ke liye)
  gst: string;                 // GST number (business)
  address: string;             // Full address
  city: string;
  state: string;
  country: string;
  pin: string;
  status: string;              // Active / Blocked
  creditLimit: string;         // Credit limit (wholesale)
  totalOrders: string;         // Total orders count
  totalSpent: string;          // Total amount spent
  notes: string;               // Internal notes
  image: string;               // Customer photo (optional)
  createdAt: string;
  updatedAt: string;
};

export const emptyCustomer: Customer = {
  id: "",
  name: "",
  email: "",
  number: "",
  altNumber: "",
  type: "Retail",
  company: "",
  gst: "",
  address: "",
  city: "",
  state: "Bihar",
  country: "India",
  pin: "",
  status: "Active",
  creditLimit: "0",
  totalOrders: "0",
  totalSpent: "0",
  notes: "",
  image: "",
  createdAt: "",
  updatedAt: "",
};

/* ---------------- DROPDOWN OPTIONS ---------------- */

export const CUSTOMER_TYPES = [
  "Retail",         // Normal customer
  "Wholesale",      // Bulk buyer
  "Distributor",    // Distributor
  "Retailer",       // Shop owner
  "Exporter",       // International buyer
];

export const STATES = [
  "Bihar",
  "Delhi",
  "Maharashtra",
  "Uttar Pradesh",
  "West Bengal",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "Rajasthan",
  "Punjab",
  "Haryana",
  "Madhya Pradesh",
  "Odisha",
  "Jharkhand",
  "Assam",
  "Other",
];

/* ---------------- HELPERS ---------------- */

export const today = () => new Date().toISOString().split("T")[0];

export const prepareCustomer = (d: Customer): Customer => ({
  ...d,
  name: d.name.trim(),
  email: d.email.trim().toLowerCase(),
  number: d.number.trim(),
  altNumber: d.altNumber.trim(),
  company: d.company.trim(),
  gst: d.gst.trim().toUpperCase(),
  address: d.address.trim(),
  city: d.city.trim(),
  state: d.state.trim(),
  country: d.country.trim(),
  pin: d.pin.trim(),
  notes: d.notes.trim(),
});

export const validateCustomer = (d: Customer) => {
  const e: { [key: string]: string } = {};
  if (!d.name.trim()) e.name = "Customer name is required";
  else if (d.name.trim().length < 2) e.name = "Name must be at least 2 characters";

  if (!d.number.trim()) e.number = "Phone number is required";
  else if (!/^[0-9]{10}$/.test(d.number.trim()))
    e.number = "Enter valid 10-digit mobile number";

  if (d.email && !/^\S+@\S+\.\S+$/.test(d.email))
    e.email = "Enter valid email address";

  if (d.altNumber && !/^[0-9]{10}$/.test(d.altNumber))
    e.altNumber = "Alternate number must be 10 digits";

  if (!d.type) e.type = "Select customer type";

  // Wholesale ke liye Company जरूरी
  if ((d.type === "Wholesale" || d.type === "Distributor" || d.type === "Exporter") &&
      !d.company.trim())
    e.company = "Company name required for this type";

  // GST check (agar diya ho)
  if (d.gst && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(d.gst))
    e.gst = "Enter valid GST number (e.g. 10ABCDE1234F1Z5)";

  if (!d.address.trim()) e.address = "Address is required";
  else if (d.address.trim().length < 10)
    e.address = "Address must be at least 10 characters";

  if (!d.city.trim()) e.city = "City is required";
  if (!d.state) e.state = "Select state";

  if (!d.pin.trim()) e.pin = "PIN code is required";
  else if (!/^[0-9]{6}$/.test(d.pin.trim()))
    e.pin = "PIN must be 6 digits";

  if (!d.status) e.status = "Select status";

  if (d.creditLimit && Number(d.creditLimit) < 0)
    e.creditLimit = "Credit limit cannot be negative";

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
  data: Customer;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
};

/* ============================================================
   MAIN FORM FIELDS
   ============================================================ */

export default function CustomerFields({ data, errors, show, onChange }: Props) {
  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) =>
    `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;

  const isBusiness =
    data.type === "Wholesale" ||
    data.type === "Distributor" ||
    data.type === "Exporter" ||
    data.type === "Retailer";

  return (
    <>
      {/* =====================================================
          Section 1 : Basic Info
          ===================================================== */}
      <h6 className="fw-bold mb-3">Basic Info</h6>

      <div className="row">
        <Field
          label="Customer Name :"
          error={err("name")}
          required
          hint="Full name"
        >
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChange}
            placeholder="e.g. Ramesh Kumar"
            className={cls("name")}
          />
        </Field>

        <Field
          label="Phone Number :"
          error={err("number")}
          required
          hint="10-digit mobile"
        >
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

        <Field label="Alternate Number :" error={err("altNumber")} hint="Optional">
          <input
            type="tel"
            name="altNumber"
            value={data.altNumber}
            onChange={onChange}
            placeholder="Optional"
            maxLength={10}
            className={cls("altNumber")}
          />
        </Field>
      </div>

      <div className="row">
        <Field label="Email :" error={err("email")} hint="Optional but recommended">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChange}
            placeholder="customer@example.com"
            className={cls("email")}
          />
        </Field>

        <Field label="Customer Type :" error={err("type")} required>
          <select
            name="type"
            value={data.type}
            onChange={onChange}
            className={cls("type")}
          >
            <Options list={CUSTOMER_TYPES} placeholder="Select Type" />
          </select>
        </Field>

        <Field label="Status :" error={err("status")} required>
          <select
            name="status"
            value={data.status}
            onChange={onChange}
            className={cls("status")}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
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
            <Field
              label="Company Name :"
              error={err("company")}
              required={isBusiness}
              hint="Shop/Business ka naam"
            >
              <input
                type="text"
                name="company"
                value={data.company}
                onChange={onChange}
                placeholder="e.g. Kumar General Store"
                className={cls("company")}
              />
            </Field>

            <Field
              label="GST Number :"
              error={err("gst")}
              hint="15-digit GST (optional)"
            >
              <input
                type="text"
                name="gst"
                value={data.gst}
                onChange={onChange}
                placeholder="10ABCDE1234F1Z5"
                maxLength={15}
                className={cls("gst")}
              />
            </Field>

            <Field
              label="Credit Limit (₹) :"
              error={err("creditLimit")}
              hint="Maximum credit allowed"
            >
              <input
                type="number"
                name="creditLimit"
                min={0}
                value={data.creditLimit}
                onChange={onChange}
                className={cls("creditLimit")}
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
        <Field
          label="Full Address :"
          error={err("address")}
          required
          col="col-md-12"
          hint="House no, street, area"
        >
          <textarea
            name="address"
            rows={2}
            value={data.address}
            onChange={onChange}
            placeholder="House No, Street, Landmark, Area"
            className={cls("address")}
          />
        </Field>
      </div>

      <div className="row">
        <Field label="City :" error={err("city")} required>
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={onChange}
            placeholder="e.g. Darbhanga"
            className={cls("city")}
          />
        </Field>

        <Field label="State :" error={err("state")} required>
          <select
            name="state"
            value={data.state}
            onChange={onChange}
            className={cls("state")}
          >
            <Options list={STATES} placeholder="Select State" />
          </select>
        </Field>

        <Field label="Country :" error={err("country")}>
          <input
            type="text"
            name="country"
            value={data.country}
            onChange={onChange}
            placeholder="India"
            className={cls("country")}
          />
        </Field>
      </div>

      <div className="row">
        <Field label="PIN Code :" error={err("pin")} required>
          <input
            type="text"
            name="pin"
            value={data.pin}
            onChange={onChange}
            placeholder="846004"
            maxLength={6}
            className={cls("pin")}
          />
        </Field>

        <Field label="Image :" col="col-md-4" hint="Customer photo (optional)">
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
                src={`/assets/images/${data.image}`}
                alt="Customer"
                width="60"
                height="60"
                className="rounded-circle border"
              />
            </div>
          )}
        </Field>
      </div>

      {/* =====================================================
          Section 4 : Stats & Notes (Read-only in Update)
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Statistics & Notes</h6>

      <div className="row">
        <Field label="Total Orders :" hint="Auto-calculated">
          <input
            type="number"
            name="totalOrders"
            value={data.totalOrders}
            readOnly
            className="form-control mt-2 bg-light"
          />
        </Field>

        <Field label="Total Spent (₹) :" hint="Auto-calculated">
          <input
            type="number"
            name="totalSpent"
            value={data.totalSpent}
            readOnly
            className="form-control mt-2 bg-light"
          />
        </Field>
      </div>

      <div className="row">
        <Field label="Internal Notes :" col="col-md-12" hint="Only admin can see">
          <textarea
            name="notes"
            rows={3}
            value={data.notes}
            onChange={onChange}
            placeholder="Koi bhi note ya special instruction..."
            className="form-control mt-2"
          />
        </Field>
      </div>
    </>
  );
}