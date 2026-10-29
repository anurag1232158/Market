"use client";
import { ChangeEvent, ReactNode } from "react";

/* ============================================================
   ORDER — Customer orders, both retail and wholesale
   ============================================================ */

export type Order = {
  id: string;
  orderNo: string;              // Order number (ORD-XXXXXX)
  orderDate: string;            // Order date
  /* Customer Info */
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerType: string;         // Retail / Wholesale
  /* Shipping Address */
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPin: string;
  shippingCountry: string;
  /* Products (JSON string of items) */
  items: string;                // JSON array as string
  /* Amounts */
  subtotal: string;             // Before tax/discount
  discount: string;             // Discount amount
  tax: string;                  // GST
  shippingCharge: string;       // Shipping fee
  totalAmount: string;          // Final total
  /* Payment */
  paymentMethod: string;        // COD / UPI / Card / Bank Transfer
  paymentStatus: string;        // Pending / Paid / Failed / Refunded
  paymentId: string;            // Transaction ID
  /* Order Status */
  orderStatus: string;          // Pending / Confirmed / Packed / Shipped / Delivered / Cancelled
  /* Shipping */
  courier: string;              // Delivery partner
  trackingId: string;           // Tracking number
  shippedDate: string;
  deliveredDate: string;
  /* Notes */
  customerNote: string;         // Customer ka message
  adminNote: string;            // Internal note
  /* Meta */
  createdAt: string;
  updatedAt: string;
};

export const emptyOrder: Order = {
  id: "",
  orderNo: "",
  orderDate: "",
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  customerType: "Retail",
  shippingAddress: "",
  shippingCity: "",
  shippingState: "Bihar",
  shippingPin: "",
  shippingCountry: "India",
  items: "[]",
  subtotal: "0",
  discount: "0",
  tax: "0",
  shippingCharge: "0",
  totalAmount: "0",
  paymentMethod: "COD",
  paymentStatus: "Pending",
  paymentId: "",
  orderStatus: "Pending",
  courier: "",
  trackingId: "",
  shippedDate: "",
  deliveredDate: "",
  customerNote: "",
  adminNote: "",
  createdAt: "",
  updatedAt: "",
};

/* ---------------- DROPDOWN OPTIONS ---------------- */

export const CUSTOMER_TYPES = ["Retail", "Wholesale", "Distributor", "Retailer"];

export const STATES = [
  "Bihar", "Delhi", "Maharashtra", "Uttar Pradesh", "West Bengal",
  "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan", "Punjab",
  "Haryana", "Madhya Pradesh", "Odisha", "Jharkhand", "Assam", "Other",
];

export const PAYMENT_METHODS = [
  "COD",            // Cash on Delivery
  "UPI",
  "Card",
  "Net Banking",
  "Bank Transfer",
  "Wallet",
];

export const PAYMENT_STATUSES = [
  "Pending",
  "Paid",
  "Failed",
  "Refunded",
  "Partially Paid",
];

export const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
  "Returned",
];

export const COURIERS = [
  "Delhivery",
  "BlueDart",
  "DTDC",
  "India Post",
  "Ekart",
  "XpressBees",
  "Local Delivery",
  "Other",
];

/* ---------------- HELPERS ---------------- */

export const today = () => new Date().toISOString().split("T")[0];

export const generateOrderNo = () =>
  "ORD-" + Date.now().toString().slice(-6);

/* Calculate totals from items + charges */
export const calculateTotal = (d: Order): Order => {
  let subtotal = 0;
  try {
    const items = JSON.parse(d.items || "[]");
    subtotal = items.reduce(
      (sum: number, it: any) =>
        sum + (Number(it.price) || 0) * (Number(it.qty) || 0),
      0
    );
  } catch {}

  const discount = Number(d.discount) || 0;
  const tax = Number(d.tax) || 0;
  const shipping = Number(d.shippingCharge) || 0;

  const total = subtotal - discount + tax + shipping;

  return {
    ...d,
    subtotal: String(subtotal),
    totalAmount: String(Math.max(0, total)),
  };
};

export const prepareOrder = (d: Order): Order => {
  const withTotals = calculateTotal(d);
  return {
    ...withTotals,
    orderNo: d.orderNo.trim() || generateOrderNo(),
    customerName: d.customerName.trim(),
    customerEmail: d.customerEmail.trim().toLowerCase(),
    customerPhone: d.customerPhone.trim(),
    shippingAddress: d.shippingAddress.trim(),
    shippingCity: d.shippingCity.trim(),
    shippingPin: d.shippingPin.trim(),
    paymentId: d.paymentId.trim(),
    courier: d.courier.trim(),
    trackingId: d.trackingId.trim(),
    customerNote: d.customerNote.trim(),
    adminNote: d.adminNote.trim(),
  };
};

export const validateOrder = (d: Order) => {
  const e: { [key: string]: string } = {};
  if (!d.customerName.trim()) e.customerName = "Customer name is required";
  if (!d.customerPhone.trim()) e.customerPhone = "Phone is required";
  else if (!/^[0-9]{10}$/.test(d.customerPhone.trim()))
    e.customerPhone = "Enter valid 10-digit number";

  if (d.customerEmail && !/^\S+@\S+\.\S+$/.test(d.customerEmail))
    e.customerEmail = "Enter valid email";

  if (!d.shippingAddress.trim()) e.shippingAddress = "Address is required";
  if (!d.shippingCity.trim()) e.shippingCity = "City is required";
  if (!d.shippingState) e.shippingState = "Select state";
  if (!d.shippingPin.trim()) e.shippingPin = "PIN is required";
  else if (!/^[0-9]{6}$/.test(d.shippingPin.trim()))
    e.shippingPin = "PIN must be 6 digits";

  // Items check
  try {
    const items = JSON.parse(d.items || "[]");
    if (!Array.isArray(items) || items.length === 0)
      e.items = "At least one product required";
    else {
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        if (!it.name?.trim()) { e.items = `Item ${i + 1}: name required`; break; }
        if (!it.qty || Number(it.qty) <= 0) { e.items = `Item ${i + 1}: qty required`; break; }
        if (!it.price || Number(it.price) <= 0) { e.items = `Item ${i + 1}: price required`; break; }
      }
    }
  } catch {
    e.items = "Invalid items data";
  }

  if (!d.paymentMethod) e.paymentMethod = "Select payment method";
  if (!d.paymentStatus) e.paymentStatus = "Select payment status";
  if (!d.orderStatus) e.orderStatus = "Select order status";

  if (d.discount && Number(d.discount) < 0) e.discount = "Discount cannot be negative";
  if (d.shippingCharge && Number(d.shippingCharge) < 0)
    e.shippingCharge = "Shipping cannot be negative";

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
  data: Order;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  /* Custom items handler */
  onItemsChange?: (items: any[]) => void;
};

/* ============================================================
   ITEMS EDITOR (JSON me convert karta hai)
   ============================================================ */

function ItemsEditor({
  items,
  onChange,
}: {
  items: any[];
  onChange: (items: any[]) => void;
}) {
  const updateItem = (index: number, key: string, value: string) => {
    const copy = [...items];
    copy[index] = { ...copy[index], [key]: value };
    onChange(copy);
  };

  const addItem = () => {
    onChange([...items, { name: "", qty: 1, price: 0, unit: "kg" }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr className="bg-light">
              <th style={{ width: "40%" }}>Product</th>
              <th style={{ width: "15%" }}>Qty</th>
              <th style={{ width: "15%" }}>Unit</th>
              <th style={{ width: "20%" }}>Price (₹)</th>
              <th style={{ width: "10%" }}>Total</th>
              <th style={{ width: "5%" }}></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No items yet. Click "+ Add Product"
                </td>
              </tr>
            ) : (
              items.map((it, i) => (
                <tr key={i}>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={it.name || ""}
                      onChange={(e) => updateItem(i, "name", e.target.value)}
                      placeholder="e.g. Peri Peri Makhana"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={it.qty || ""}
                      onChange={(e) => updateItem(i, "qty", e.target.value)}
                      min={1}
                    />
                  </td>
                  <td>
                    <select
                      className="form-control form-control-sm"
                      value={it.unit || "kg"}
                      onChange={(e) => updateItem(i, "unit", e.target.value)}
                    >
                      <option value="kg">kg</option>
                      <option value="gram">gram</option>
                      <option value="packet">packet</option>
                      <option value="box">box</option>
                      <option value="piece">piece</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={it.price || ""}
                      onChange={(e) => updateItem(i, "price", e.target.value)}
                      min={0}
                    />
                  </td>
                  <td className="text-end fw-bold">
                    ₹{(Number(it.qty) || 0) * (Number(it.price) || 0)}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(i)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="btn btn-outline-primary btn-sm"
        onClick={addItem}
      >
        <i className="fa fa-plus me-1"></i> Add Product
      </button>
    </div>
  );
}

/* ============================================================
   MAIN FORM FIELDS
   ============================================================ */

export default function OrderFields({
  data, errors, show, onChange, onItemsChange,
}: Props) {
  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) =>
    `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;

  /* Parse items from JSON */
  let items: any[] = [];
  try {
    items = JSON.parse(data.items || "[]");
  } catch {
    items = [];
  }

  const handleItemsChange = (newItems: any[]) => {
    if (onItemsChange) onItemsChange(newItems);
  };

  /* Calculated totals */
  const subtotal = items.reduce(
    (s, it) => s + (Number(it.qty) || 0) * (Number(it.price) || 0),
    0
  );
  const discount = Number(data.discount) || 0;
  const tax = Number(data.tax) || 0;
  const shipping = Number(data.shippingCharge) || 0;
  const total = Math.max(0, subtotal - discount + tax + shipping);

  return (
    <>
      {/* =====================================================
          Section 1 : Customer Info
          ===================================================== */}
      <h6 className="fw-bold mb-3">Customer Info</h6>

      <div className="row">
        <Field label="Customer Name :" error={err("customerName")} required>
          <input
            type="text"
            name="customerName"
            value={data.customerName}
            onChange={onChange}
            placeholder="e.g. Ramesh Kumar"
            className={cls("customerName")}
          />
        </Field>

        <Field label="Phone :" error={err("customerPhone")} required>
          <input
            type="tel"
            name="customerPhone"
            value={data.customerPhone}
            onChange={onChange}
            maxLength={10}
            placeholder="9876543210"
            className={cls("customerPhone")}
          />
        </Field>

        <Field label="Email :" error={err("customerEmail")}>
          <input
            type="email"
            name="customerEmail"
            value={data.customerEmail}
            onChange={onChange}
            placeholder="customer@example.com"
            className={cls("customerEmail")}
          />
        </Field>
      </div>

      <div className="row">
        <Field label="Customer Type :">
          <select
            name="customerType"
            value={data.customerType}
            onChange={onChange}
            className="form-control mt-2"
          >
            <Options list={CUSTOMER_TYPES} placeholder="Select Type" />
          </select>
        </Field>

        <Field label="Order Date :">
          <input
            type="date"
            name="orderDate"
            value={data.orderDate ? data.orderDate.split("T")[0] : ""}
            onChange={onChange}
            className="form-control mt-2"
          />
        </Field>

        <Field label="Order No :" hint="Auto-generated if empty">
          <input
            type="text"
            name="orderNo"
            value={data.orderNo}
            onChange={onChange}
            placeholder="ORD-123456"
            className="form-control mt-2"
          />
        </Field>
      </div>

      {/* =====================================================
          Section 2 : Shipping Address
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Shipping Address</h6>

      <div className="row">
        <Field label="Full Address :" error={err("shippingAddress")} required col="col-md-12">
          <textarea
            name="shippingAddress"
            rows={2}
            value={data.shippingAddress}
            onChange={onChange}
            placeholder="House No, Street, Area"
            className={cls("shippingAddress")}
          />
        </Field>
      </div>

      <div className="row">
        <Field label="City :" error={err("shippingCity")} required>
          <input
            type="text"
            name="shippingCity"
            value={data.shippingCity}
            onChange={onChange}
            placeholder="e.g. Darbhanga"
            className={cls("shippingCity")}
          />
        </Field>

        <Field label="State :" error={err("shippingState")} required>
          <select
            name="shippingState"
            value={data.shippingState}
            onChange={onChange}
            className={cls("shippingState")}
          >
            <Options list={STATES} placeholder="Select State" />
          </select>
        </Field>

        <Field label="PIN Code :" error={err("shippingPin")} required>
          <input
            type="text"
            name="shippingPin"
            value={data.shippingPin}
            onChange={onChange}
            maxLength={6}
            placeholder="846004"
            className={cls("shippingPin")}
          />
        </Field>

        <Field label="Country :">
          <input
            type="text"
            name="shippingCountry"
            value={data.shippingCountry}
            onChange={onChange}
            className="form-control mt-2"
          />
        </Field>
      </div>

      {/* =====================================================
          Section 3 : Products / Items
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Order Items</h6>

      <div className="row">
        <div className="col-md-12">
          {err("items") && (
            <p className="text-danger">{err("items")}</p>
          )}
          <ItemsEditor items={items} onChange={handleItemsChange} />
        </div>
      </div>

      {/* =====================================================
          Section 4 : Amounts
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Amounts</h6>

      <div className="row">
        <Field label="Subtotal (₹) :" hint="Auto-calculated">
          <input
            type="number"
            name="subtotal"
            value={subtotal}
            readOnly
            className="form-control mt-2 bg-light"
          />
        </Field>

        <Field label="Discount (₹) :" error={err("discount")}>
          <input
            type="number"
            name="discount"
            value={data.discount}
            onChange={onChange}
            min={0}
            className={cls("discount")}
          />
        </Field>

        <Field label="Tax / GST (₹) :">
          <input
            type="number"
            name="tax"
            value={data.tax}
            onChange={onChange}
            min={0}
            className="form-control mt-2"
          />
        </Field>

        <Field label="Shipping (₹) :" error={err("shippingCharge")}>
          <input
            type="number"
            name="shippingCharge"
            value={data.shippingCharge}
            onChange={onChange}
            min={0}
            className={cls("shippingCharge")}
          />
        </Field>

        <Field label="Total Amount (₹) :" hint="Auto-calculated">
          <input
            type="number"
            name="totalAmount"
            value={total}
            readOnly
            className="form-control mt-2 bg-light fw-bold text-success"
          />
        </Field>
      </div>

      {/* =====================================================
          Section 5 : Payment & Status
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Payment & Order Status</h6>

      <div className="row">
        <Field label="Payment Method :" error={err("paymentMethod")} required>
          <select
            name="paymentMethod"
            value={data.paymentMethod}
            onChange={onChange}
            className={cls("paymentMethod")}
          >
            <Options list={PAYMENT_METHODS} placeholder="Select Method" />
          </select>
        </Field>

        <Field label="Payment Status :" error={err("paymentStatus")} required>
          <select
            name="paymentStatus"
            value={data.paymentStatus}
            onChange={onChange}
            className={cls("paymentStatus")}
          >
            <Options list={PAYMENT_STATUSES} placeholder="Select Status" />
          </select>
        </Field>

        <Field label="Payment ID / Txn ID :" hint="Transaction reference">
          <input
            type="text"
            name="paymentId"
            value={data.paymentId}
            onChange={onChange}
            placeholder="e.g. TXN123456789"
            className="form-control mt-2"
          />
        </Field>
      </div>

      <div className="row">
        <Field label="Order Status :" error={err("orderStatus")} required>
          <select
            name="orderStatus"
            value={data.orderStatus}
            onChange={onChange}
            className={cls("orderStatus")}
          >
            <Options list={ORDER_STATUSES} placeholder="Select Status" />
          </select>
        </Field>

        <Field label="Courier :">
          <select
            name="courier"
            value={data.courier}
            onChange={onChange}
            className="form-control mt-2"
          >
            <Options list={COURIERS} placeholder="Select Courier" />
          </select>
        </Field>

        <Field label="Tracking ID :">
          <input
            type="text"
            name="trackingId"
            value={data.trackingId}
            onChange={onChange}
            placeholder="Tracking number"
            className="form-control mt-2"
          />
        </Field>
      </div>

      <div className="row">
        <Field label="Shipped Date :">
          <input
            type="date"
            name="shippedDate"
            value={data.shippedDate ? data.shippedDate.split("T")[0] : ""}
            onChange={onChange}
            className="form-control mt-2"
          />
        </Field>

        <Field label="Delivered Date :">
          <input
            type="date"
            name="deliveredDate"
            value={data.deliveredDate ? data.deliveredDate.split("T")[0] : ""}
            onChange={onChange}
            className="form-control mt-2"
          />
        </Field>
      </div>

      {/* =====================================================
          Section 6 : Notes
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Notes</h6>

      <div className="row">
        <Field label="Customer Note :" col="col-md-6">
          <textarea
            name="customerNote"
            rows={3}
            value={data.customerNote}
            onChange={onChange}
            placeholder="Customer ka message..."
            className="form-control mt-2"
          />
        </Field>

        <Field label="Admin Note (Internal) :" col="col-md-6">
          <textarea
            name="adminNote"
            rows={3}
            value={data.adminNote}
            onChange={onChange}
            placeholder="Internal note..."
            className="form-control mt-2"
          />
        </Field>
      </div>
    </>
  );
}