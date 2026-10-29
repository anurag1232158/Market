"use client";
import { ChangeEvent, ReactNode } from "react";

/* ============================================================
   PAYMENT — Track all payments (order + manual)
   ============================================================ */

export type Payment = {
  id: string;
  paymentId: string;           // Txn/Receipt ID (auto)
  orderNo: string;             // Related order no
  orderId: string;             // Order ID (internal)
  /* Customer */
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerType: string;        // Retail / Wholesale
  /* Amount */
  amount: string;              // Payment amount
  currency: string;            // INR
  method: string;              // COD / UPI / Card / Net Banking / Bank Transfer
  type: string;                // Full / Partial / Advance / Refund
  status: string;              // Pending / Paid / Failed / Refunded
  /* Details */
  transactionRef: string;      // Bank/UPI ref no
  bankName: string;            // For bank transfer
  upiId: string;               // For UPI
  cardLast4: string;           // For card
  /* Dates */
  paymentDate: string;
  clearedDate: string;
  /* Notes */
  notes: string;
  /* Meta */
  createdAt: string;
  updatedAt: string;
};

export const emptyPayment: Payment = {
  id: "",
  paymentId: "",
  orderNo: "",
  orderId: "",
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  customerType: "Retail",
  amount: "0",
  currency: "INR",
  method: "UPI",
  type: "Full",
  status: "Pending",
  transactionRef: "",
  bankName: "",
  upiId: "",
  cardLast4: "",
  paymentDate: "",
  clearedDate: "",
  notes: "",
  createdAt: "",
  updatedAt: "",
};

/* ---------------- DROPDOWN OPTIONS ---------------- */

export const PAYMENT_METHODS = [
  "COD",
  "UPI",
  "Card",
  "Net Banking",
  "Bank Transfer",
  "Wallet",
  "Cheque",
  "Cash",
];

export const PAYMENT_TYPES = [
  "Full",       // पूरा payment
  "Partial",    // आधा payment
  "Advance",    // पहले दिया गया
  "Refund",     // वापस किया गया
];

export const PAYMENT_STATUSES = [
  "Pending",
  "Paid",
  "Failed",
  "Refunded",
  "Cancelled",
];

export const CUSTOMER_TYPES = [
  "Retail",
  "Wholesale",
  "Distributor",
  "Retailer",
];

export const BANKS = [
  "SBI",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Kotak Mahindra",
  "Other",
];

/* ---------------- HELPERS ---------------- */

export const today = () => new Date().toISOString().split("T")[0];

export const generatePaymentId = () =>
  "PAY-" + Date.now().toString().slice(-8);

export const preparePayment = (d: Payment): Payment => ({
  ...d,
  paymentId: d.paymentId.trim() || generatePaymentId(),
  orderNo: d.orderNo.trim().toUpperCase(),
  customerName: d.customerName.trim(),
  customerPhone: d.customerPhone.trim(),
  customerEmail: d.customerEmail.trim().toLowerCase(),
  transactionRef: d.transactionRef.trim(),
  bankName: d.bankName.trim(),
  upiId: d.upiId.trim(),
  cardLast4: d.cardLast4.trim(),
  notes: d.notes.trim(),
});

export const validatePayment = (d: Payment) => {
  const e: { [key: string]: string } = {};

  if (!d.orderNo.trim()) e.orderNo = "Order number is required";
  if (!d.customerName.trim()) e.customerName = "Customer name is required";

  if (!d.customerPhone.trim()) e.customerPhone = "Phone is required";
  else if (!/^[0-9]{10}$/.test(d.customerPhone.trim()))
    e.customerPhone = "Enter valid 10-digit number";

  if (d.customerEmail && !/^\S+@\S+\.\S+$/.test(d.customerEmail))
    e.customerEmail = "Enter valid email";

  if (!d.amount || Number(d.amount) <= 0)
    e.amount = "Enter valid amount";

  if (!d.method) e.method = "Select payment method";
  if (!d.type) e.type = "Select payment type";
  if (!d.status) e.status = "Select status";

  if (!d.paymentDate) e.paymentDate = "Payment date is required";

  // Method specific
  if ((d.method === "UPI" || d.method === "Card" || d.method === "Net Banking") &&
      !d.transactionRef.trim())
    e.transactionRef = "Transaction reference required";

  if (d.method === "Bank Transfer" && !d.bankName.trim())
    e.bankName = "Bank name required";

  if (d.method === "UPI" && !d.upiId.trim())
    e.upiId = "UPI ID required (e.g. user@upi)";

  if (d.method === "Card" && d.cardLast4 && !/^[0-9]{4}$/.test(d.cardLast4))
    e.cardLast4 = "Enter last 4 digits only";

  // Refund date
  if (d.status === "Paid" && !d.clearedDate)
    d.clearedDate = d.paymentDate;

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
  data: Payment;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
};

/* ============================================================
   MAIN FORM FIELDS
   ============================================================ */

export default function PaymentFields({ data, errors, show, onChange }: Props) {
  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) =>
    `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;

  return (
    <>
      {/* =====================================================
          Section 1 : Order & Customer
          ===================================================== */}
      <h6 className="fw-bold mb-3">Order & Customer</h6>

      <div className="row">
        <Field label="Order Number :" error={err("orderNo")} required hint="ORD-XXXXXX">
          <input
            type="text"
            name="orderNo"
            value={data.orderNo}
            onChange={onChange}
            placeholder="ORD-123456"
            className={cls("orderNo")}
          />
        </Field>

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
      </div>

      <div className="row">
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
      </div>

      {/* =====================================================
          Section 2 : Payment Details
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Payment Details</h6>

      <div className="row">
        <Field label="Amount (₹) :" error={err("amount")} required hint="Payment amount">
          <input
            type="number"
            name="amount"
            min={0}
            value={data.amount}
            onChange={onChange}
            placeholder="0"
            className={cls("amount")}
          />
        </Field>

        <Field label="Currency :">
          <select
            name="currency"
            value={data.currency}
            onChange={onChange}
            className="form-control mt-2"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
          </select>
        </Field>

        <Field label="Payment Method :" error={err("method")} required>
          <select
            name="method"
            value={data.method}
            onChange={onChange}
            className={cls("method")}
          >
            <Options list={PAYMENT_METHODS} placeholder="Select Method" />
          </select>
        </Field>
      </div>

      <div className="row">
        <Field label="Payment Type :" error={err("type")} required>
          <select
            name="type"
            value={data.type}
            onChange={onChange}
            className={cls("type")}
          >
            <Options list={PAYMENT_TYPES} placeholder="Select Type" />
          </select>
        </Field>

        <Field label="Payment Status :" error={err("status")} required>
          <select
            name="status"
            value={data.status}
            onChange={onChange}
            className={cls("status")}
          >
            <Options list={PAYMENT_STATUSES} placeholder="Select Status" />
          </select>
        </Field>
      </div>

      {/* =====================================================
          Section 3 : Method-Specific Details
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Transaction Details</h6>

      <div className="row">
        <Field
          label="Transaction Ref :"
          error={err("transactionRef")}
          hint="Bank/UPI/Card reference no"
        >
          <input
            type="text"
            name="transactionRef"
            value={data.transactionRef}
            onChange={onChange}
            placeholder="e.g. TXN123456789"
            className={cls("transactionRef")}
          />
        </Field>

        {data.method === "Bank Transfer" && (
          <Field label="Bank Name :" error={err("bankName")} required>
            <select
              name="bankName"
              value={data.bankName}
              onChange={onChange}
              className={cls("bankName")}
            >
              <Options list={BANKS} placeholder="Select Bank" />
            </select>
          </Field>
        )}

        {data.method === "UPI" && (
          <Field
            label="UPI ID :"
            error={err("upiId")}
            required
            hint="e.g. user@paytm"
          >
            <input
              type="text"
              name="upiId"
              value={data.upiId}
              onChange={onChange}
              placeholder="user@upi"
              className={cls("upiId")}
            />
          </Field>
        )}

        {data.method === "Card" && (
          <Field
            label="Card Last 4 Digits :"
            error={err("cardLast4")}
            hint="Only last 4 digits"
          >
            <input
              type="text"
              name="cardLast4"
              value={data.cardLast4}
              onChange={onChange}
              maxLength={4}
              placeholder="1234"
              className={cls("cardLast4")}
            />
          </Field>
        )}
      </div>

      {/* =====================================================
          Section 4 : Dates
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Dates</h6>

      <div className="row">
        <Field label="Payment Date :" error={err("paymentDate")} required>
          <input
            type="date"
            name="paymentDate"
            value={data.paymentDate ? data.paymentDate.split("T")[0] : ""}
            onChange={onChange}
            className={cls("paymentDate")}
          />
        </Field>

        <Field label="Cleared Date :" hint="Payment clear hone ki date">
          <input
            type="date"
            name="clearedDate"
            value={data.clearedDate ? data.clearedDate.split("T")[0] : ""}
            onChange={onChange}
            className="form-control mt-2"
          />
        </Field>
      </div>

      {/* =====================================================
          Section 5 : Notes
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Notes</h6>

      <div className="row">
        <Field label="Internal Notes :" col="col-md-12">
          <textarea
            name="notes"
            rows={3}
            value={data.notes}
            onChange={onChange}
            placeholder="Koi bhi note ya remark..."
            className="form-control mt-2"
          />
        </Field>
      </div>
    </>
  );
}