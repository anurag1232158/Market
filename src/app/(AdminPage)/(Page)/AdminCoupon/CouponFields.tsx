"use client";
import { ChangeEvent, ReactNode } from "react";

/* ============================================================
   COUPON — Discount codes for Makhana store
   ============================================================ */

export type Coupon = {
  id: string;
  code: string;                // Unique coupon code (e.g. MAKHANA50)
  title: string;               // Display title (e.g. Diwali Offer)
  description: string;         // Customer-facing description
  type: string;                // Percentage / Fixed
  value: string;               // Discount value (% or ₹)
  minOrder: string;            // Minimum order amount
  maxDiscount: string;         // Max discount cap (for %)
  usageLimit: string;          // Total usage limit
  usedCount: string;           // How many times used
  perUserLimit: string;        // Per-user limit
  applicableTo: string;        // All / Category / Product
  applicableValue: string;     // Category/Product name (if applicable)
  customerType: string;        // All / Retail / Wholesale
  startDate: string;           // Valid from
  endDate: string;             // Valid until
  status: string;              // Active / Inactive / Expired
  isFeatured: string;          // Yes / No
  bannerImage: string;         // Coupon banner image
  terms: string;               // Terms & conditions
  createdAt: string;
  updatedAt: string;
};

export const emptyCoupon: Coupon = {
  id: "",
  code: "",
  title: "",
  description: "",
  type: "Percentage",
  value: "",
  minOrder: "0",
  maxDiscount: "",
  usageLimit: "100",
  usedCount: "0",
  perUserLimit: "1",
  applicableTo: "All",
  applicableValue: "",
  customerType: "All",
  startDate: "",
  endDate: "",
  status: "Active",
  isFeatured: "No",
  bannerImage: "",
  terms: "",
  createdAt: "",
  updatedAt: "",
};

/* ---------------- DROPDOWN OPTIONS ---------------- */

export const COUPON_TYPES = [
  "Percentage",  // e.g. 50% off
  "Fixed",       // e.g. ₹100 off
];

export const APPLICABLE_TO = [
  "All",         // सभी products
  "Category",    // Specific category
  "Product",     // Specific product
];

export const CUSTOMER_TYPES = [
  "All",
  "Retail",
  "Wholesale",
  "New Customer",
];

export const STATUSES = [
  "Active",
  "Inactive",
  "Expired",
];

export const CATEGORY_OPTIONS = [
  "Raw Makhana",
  "Roasted Makhana",
  "Flavoured Makhana",
  "Makhana Powder",
  "Gift Packs & Combos",
  "Bulk / Wholesale",
];

/* ---------------- HELPERS ---------------- */

export const today = () => new Date().toISOString().split("T")[0];

export const prepareCoupon = (d: Coupon): Coupon => ({
  ...d,
  code: d.code.trim().toUpperCase().replace(/\s+/g, ""),
  title: d.title.trim(),
  description: d.description.trim(),
  terms: d.terms.trim(),
});

export const validateCoupon = (d: Coupon) => {
  const e: { [key: string]: string } = {};

  if (!d.code.trim()) e.code = "Coupon code is required";
  else if (d.code.trim().length < 3) e.code = "Code must be at least 3 characters";
  else if (!/^[A-Z0-9_-]+$/i.test(d.code.trim()))
    e.code = "Only letters, numbers, _ and - allowed";

  if (!d.title.trim()) e.title = "Title is required";
  if (!d.type) e.type = "Select discount type";

  if (!d.value || Number(d.value) <= 0)
    e.value = "Discount value is required";
  else if (d.type === "Percentage" && Number(d.value) > 100)
    e.value = "Percentage cannot exceed 100";

  if (!d.minOrder || Number(d.minOrder) < 0)
    e.minOrder = "Min order is required";

  if (d.maxDiscount && Number(d.maxDiscount) < 0)
    e.maxDiscount = "Max discount cannot be negative";

  if (!d.usageLimit || Number(d.usageLimit) <= 0)
    e.usageLimit = "Usage limit is required";

  if (!d.perUserLimit || Number(d.perUserLimit) <= 0)
    e.perUserLimit = "Per user limit is required";

  if (d.applicableTo !== "All" && !d.applicableValue.trim())
    e.applicableValue = "Specify category/product";

  if (!d.startDate) e.startDate = "Start date is required";
  if (!d.endDate) e.endDate = "End date is required";
  else if (d.startDate && d.endDate < d.startDate)
    e.endDate = "End date must be after start date";

  if (!d.status) e.status = "Select status";

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
  data: Coupon;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
};

/* ============================================================
   MAIN FORM FIELDS
   ============================================================ */

export default function CouponFields({ data, errors, show, onChange }: Props) {
  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) =>
    `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;

  const remaining =
    Number(data.usageLimit || 0) - Number(data.usedCount || 0);

  return (
    <>
      {/* =====================================================
          Section 1 : Basic Info
          ===================================================== */}
      <h6 className="fw-bold mb-3">Basic Info</h6>

      <div className="row">
        <Field
          label="Coupon Code :"
          error={err("code")}
          required
          hint="UPPERCASE, no spaces. e.g. MAKHANA50"
        >
          <input
            type="text"
            name="code"
            value={data.code}
            onChange={onChange}
            placeholder="MAKHANA50"
            className={cls("code")}
            style={{ textTransform: "uppercase" }}
          />
        </Field>

        <Field
          label="Coupon Title :"
          error={err("title")}
          required
          col="col-md-8"
          hint="Customer ko ye dikhega"
        >
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={onChange}
            placeholder="e.g. Diwali Special - 50% OFF"
            className={cls("title")}
          />
        </Field>
      </div>

      <div className="row">
        <Field label="Description :" col="col-md-12" hint="Optional">
          <textarea
            name="description"
            rows={2}
            value={data.description}
            onChange={onChange}
            placeholder="e.g. Get 50% off on all Makhana products this Diwali!"
            className="form-control mt-2"
          />
        </Field>
      </div>

      {/* =====================================================
          Section 2 : Discount Details
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Discount Details</h6>

      <div className="row">
        <Field label="Discount Type :" error={err("type")} required>
          <select
            name="type"
            value={data.type}
            onChange={onChange}
            className={cls("type")}
          >
            <Options list={COUPON_TYPES} placeholder="Select Type" />
          </select>
        </Field>

        <Field
          label={data.type === "Percentage" ? "Discount (%) :" : "Discount (₹) :"}
          error={err("value")}
          required
          hint={data.type === "Percentage" ? "1-100" : "Amount in ₹"}
        >
          <input
            type="number"
            name="value"
            min={0}
            max={data.type === "Percentage" ? 100 : undefined}
            value={data.value}
            onChange={onChange}
            placeholder={data.type === "Percentage" ? "e.g. 50" : "e.g. 100"}
            className={cls("value")}
          />
        </Field>

        <Field
          label="Min Order (₹) :"
          error={err("minOrder")}
          required
          hint="Kitna minimum order chahiye"
        >
          <input
            type="number"
            name="minOrder"
            min={0}
            value={data.minOrder}
            onChange={onChange}
            placeholder="e.g. 500"
            className={cls("minOrder")}
          />
        </Field>
      </div>

      <div className="row">
        {data.type === "Percentage" && (
          <Field
            label="Max Discount (₹) :"
            error={err("maxDiscount")}
            hint="Optional cap for % discount"
          >
            <input
              type="number"
              name="maxDiscount"
              min={0}
              value={data.maxDiscount}
              onChange={onChange}
              placeholder="e.g. 200"
              className={cls("maxDiscount")}
            />
          </Field>
        )}

        <Field label="Customer Type :" hint="किसके लिए valid">
          <select
            name="customerType"
            value={data.customerType}
            onChange={onChange}
            className="form-control mt-2"
          >
            <Options list={CUSTOMER_TYPES} placeholder="Select Type" />
          </select>
        </Field>
      </div>

      {/* =====================================================
          Section 3 : Applicable To
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Applicable To</h6>

      <div className="row">
        <Field label="Apply On :" error={err("applicableTo")} required>
          <select
            name="applicableTo"
            value={data.applicableTo}
            onChange={onChange}
            className={cls("applicableTo")}
          >
            <Options list={APPLICABLE_TO} placeholder="Select Scope" />
          </select>
        </Field>

        {data.applicableTo === "Category" && (
          <Field
            label="Select Category :"
            error={err("applicableValue")}
            required
            col="col-md-8"
          >
            <select
              name="applicableValue"
              value={data.applicableValue}
              onChange={onChange}
              className={cls("applicableValue")}
            >
              <Options list={CATEGORY_OPTIONS} placeholder="Select Category" />
            </select>
          </Field>
        )}

        {data.applicableTo === "Product" && (
          <Field
            label="Product Name :"
            error={err("applicableValue")}
            required
            col="col-md-8"
            hint="Specific product ka naam"
          >
            <input
              type="text"
              name="applicableValue"
              value={data.applicableValue}
              onChange={onChange}
              placeholder="e.g. Peri Peri Makhana 250g"
              className={cls("applicableValue")}
            />
          </Field>
        )}
      </div>

      {/* =====================================================
          Section 4 : Usage Limits
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Usage Limits</h6>

      <div className="row">
        <Field
          label="Total Usage Limit :"
          error={err("usageLimit")}
          required
          hint="कुल कितनी बार use हो सकता है"
        >
          <input
            type="number"
            name="usageLimit"
            min={1}
            value={data.usageLimit}
            onChange={onChange}
            className={cls("usageLimit")}
          />
        </Field>

        <Field
          label="Per User Limit :"
          error={err("perUserLimit")}
          required
          hint="एक user कितनी बार use कर सकता है"
        >
          <input
            type="number"
            name="perUserLimit"
            min={1}
            value={data.perUserLimit}
            onChange={onChange}
            className={cls("perUserLimit")}
          />
        </Field>

        <Field label="Used Count :" hint="Auto-updates on use">
          <input
            type="number"
            name="usedCount"
            value={data.usedCount}
            readOnly
            className="form-control mt-2 bg-light"
          />
          <small className="d-block mt-1 text-success fw-bold">
            <i className="fa fa-info-circle"></i> Remaining: {remaining}
          </small>
        </Field>
      </div>

      {/* =====================================================
          Section 5 : Validity
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Validity Period</h6>

      <div className="row">
        <Field label="Start Date :" error={err("startDate")} required>
          <input
            type="date"
            name="startDate"
            value={data.startDate ? data.startDate.split("T")[0] : ""}
            onChange={onChange}
            className={cls("startDate")}
          />
        </Field>

        <Field label="End Date :" error={err("endDate")} required>
          <input
            type="date"
            name="endDate"
            value={data.endDate ? data.endDate.split("T")[0] : ""}
            onChange={onChange}
            className={cls("endDate")}
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

      {/* =====================================================
          Section 6 : Display & Terms
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Display & Terms</h6>

      <div className="row">
        <Field label="Featured :" hint="Homepage par dikhana hai?">
          <select
            name="isFeatured"
            value={data.isFeatured}
            onChange={onChange}
            className="form-control mt-2"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </Field>

        <Field label="Banner Image :" col="col-md-8" hint="Coupon ka banner">
          <input
            type="file"
            name="bannerImage"
            accept="image/*"
            className="form-control mt-2"
            onChange={onChange}
          />
          {data.bannerImage && (
            <div className="mt-2">
              <img
                src={`/assets/images/${data.bannerImage}`}
                alt="Coupon"
                className="border rounded"
                style={{ maxWidth: "100%", maxHeight: "100px" }}
              />
            </div>
          )}
        </Field>
      </div>

      <div className="row">
        <Field
          label="Terms & Conditions :"
          col="col-md-12"
          hint="One per line"
        >
          <textarea
            name="terms"
            rows={4}
            value={data.terms}
            onChange={onChange}
            placeholder="e.g.&#10;- Valid once per user&#10;- Cannot be combined with other offers&#10;- Valid on prepaid orders only"
            className="form-control mt-2"
          />
        </Field>
      </div>
    </>
  );
}