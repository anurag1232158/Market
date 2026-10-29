"use client";
import { ChangeEvent, ReactNode } from "react";

/* ============================================================
   INVENTORY — Stock management for Makhana products
   ============================================================ */

export type Inventory = {
  id: string;
  productName: string;         // Product ka naam
  sku: string;                 // SKU code
  category: string;            // Category
  warehouse: string;           // किस warehouse me hai
  batchNo: string;             // Batch number
  openingStock: string;        // शुरुआती stock
  currentStock: string;        // अभी कितना है
  soldStock: string;           // कितना बिका
  damagedStock: string;        // कितना खराब हुआ
  reservedStock: string;       // Order में reserved
  unit: string;                // kg / packet / box
  purchasePrice: string;       // खरीद rate
  sellingPrice: string;        // बेचने का rate
  reorderLevel: string;        // कब order करें (minimum)
  maxStock: string;            // Maximum कितना रख सकते हैं
  mfgDate: string;             // Manufacturing date
  expiryDate: string;          // Expiry date
  supplier: string;            // Supplier का नाम
  supplierContact: string;     // Supplier का contact
  lastRestocked: string;       // Last restock date
  status: string;              // In Stock / Low Stock / Out of Stock / Expired
  notes: string;               // Internal notes
  createdAt: string;
  updatedAt: string;
};

export const emptyInventory: Inventory = {
  id: "",
  productName: "",
  sku: "",
  category: "Raw Makhana",
  warehouse: "Main Warehouse",
  batchNo: "",
  openingStock: "0",
  currentStock: "0",
  soldStock: "0",
  damagedStock: "0",
  reservedStock: "0",
  unit: "kg",
  purchasePrice: "",
  sellingPrice: "",
  reorderLevel: "10",
  maxStock: "500",
  mfgDate: "",
  expiryDate: "",
  supplier: "",
  supplierContact: "",
  lastRestocked: "",
  status: "In Stock",
  notes: "",
  createdAt: "",
  updatedAt: "",
};

/* ---------------- DROPDOWN OPTIONS ---------------- */

export const CATEGORIES = [
  "Raw Makhana",
  "Roasted Makhana",
  "Flavoured Makhana",
  "Makhana Powder",
  "Gift Packs & Combos",
  "Bulk / Wholesale",
];

export const WAREHOUSES = [
  "Main Warehouse",
  "Darbhanga Store",
  "Patna Store",
  "Delhi Warehouse",
  "Mumbai Warehouse",
  "Cold Storage",
];

export const UNITS = [
  "kg",
  "gram",
  "packet",
  "box",
  "carton",
  "piece",
];

export const SUPPLIERS = [
  "Local Farmers",
  "Bihar Makhana Co-op",
  "Ram Prasad Singh",
  "Self Production",
  "Other",
];

export const STATUSES = [
  "In Stock",
  "Low Stock",
  "Out of Stock",
  "Expired",
  "Damaged",
];

/* ---------------- HELPERS ---------------- */

export const today = () => new Date().toISOString().split("T")[0];

/* Auto-calculate status based on stock levels */
export const calculateStatus = (currentStock: string, reorderLevel: string): string => {
  const current = Number(currentStock) || 0;
  const reorder = Number(reorderLevel) || 0;
  if (current <= 0) return "Out of Stock";
  if (current <= reorder) return "Low Stock";
  return "In Stock";
};

export const prepareInventory = (d: Inventory): Inventory => ({
  ...d,
  productName: d.productName.trim(),
  sku: d.sku.trim().toUpperCase(),
  batchNo: d.batchNo.trim(),
  supplier: d.supplier.trim(),
  supplierContact: d.supplierContact.trim(),
  notes: d.notes.trim(),
  // Auto-calculate status
  status: calculateStatus(d.currentStock, d.reorderLevel),
});

export const validateInventory = (d: Inventory) => {
  const e: { [key: string]: string } = {};
  if (!d.productName.trim()) e.productName = "Product name is required";
  if (!d.sku.trim()) e.sku = "SKU code is required";
  else if (d.sku.trim().length < 3) e.sku = "SKU must be at least 3 characters";
  if (!d.category) e.category = "Select category";
  if (!d.warehouse) e.warehouse = "Select warehouse";
  if (!d.unit) e.unit = "Select unit";

  // Number checks
  if (d.currentStock === "" || Number(d.currentStock) < 0)
    e.currentStock = "Enter valid current stock";
  if (d.openingStock && Number(d.openingStock) < 0)
    e.openingStock = "Opening stock cannot be negative";
  if (d.soldStock && Number(d.soldStock) < 0)
    e.soldStock = "Sold stock cannot be negative";
  if (d.damagedStock && Number(d.damagedStock) < 0)
    e.damagedStock = "Damaged stock cannot be negative";
  if (d.reservedStock && Number(d.reservedStock) < 0)
    e.reservedStock = "Reserved stock cannot be negative";

  if (!d.purchasePrice || Number(d.purchasePrice) <= 0)
    e.purchasePrice = "Enter valid purchase price";
  if (!d.sellingPrice || Number(d.sellingPrice) <= 0)
    e.sellingPrice = "Enter valid selling price";
  else if (Number(d.sellingPrice) < Number(d.purchasePrice))
    e.sellingPrice = "Selling price should be higher than purchase price";

  if (!d.reorderLevel || Number(d.reorderLevel) < 0)
    e.reorderLevel = "Enter reorder level";

  if (d.mfgDate && d.expiryDate && d.expiryDate <= d.mfgDate)
    e.expiryDate = "Expiry must be after manufacturing date";

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
  data: Inventory;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
};

/* ============================================================
   MAIN FORM FIELDS
   ============================================================ */

export default function InventoryFields({ data, errors, show, onChange }: Props) {
  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) =>
    `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;

  /* Auto status preview */
  const autoStatus = calculateStatus(data.currentStock, data.reorderLevel);
  const stockColor =
    autoStatus === "In Stock" ? "text-success" :
    autoStatus === "Low Stock" ? "text-warning" : "text-danger";

  return (
    <>
      {/* =====================================================
          Section 1 : Product Info
          ===================================================== */}
      <h6 className="fw-bold mb-3">Product Info</h6>

      <div className="row">
        <Field label="Product Name :" error={err("productName")} required col="col-md-6">
          <input
            type="text"
            name="productName"
            value={data.productName}
            onChange={onChange}
            placeholder="e.g. Peri Peri Makhana 250g"
            className={cls("productName")}
          />
        </Field>

        <Field label="SKU Code :" error={err("sku")} required hint="Unique code">
          <input
            type="text"
            name="sku"
            value={data.sku}
            onChange={onChange}
            placeholder="e.g. MKH-PP-250"
            className={cls("sku")}
          />
        </Field>

        <Field label="Category :" error={err("category")} required>
          <select
            name="category"
            value={data.category}
            onChange={onChange}
            className={cls("category")}
          >
            <Options list={CATEGORIES} placeholder="Select Category" />
          </select>
        </Field>
      </div>

      <div className="row">
        <Field label="Warehouse :" error={err("warehouse")} required>
          <select
            name="warehouse"
            value={data.warehouse}
            onChange={onChange}
            className={cls("warehouse")}
          >
            <Options list={WAREHOUSES} placeholder="Select Warehouse" />
          </select>
        </Field>

        <Field label="Batch Number :" hint="Production batch">
          <input
            type="text"
            name="batchNo"
            value={data.batchNo}
            onChange={onChange}
            placeholder="e.g. BATCH-2026-10"
            className="form-control mt-2"
          />
        </Field>

        <Field label="Unit :" error={err("unit")} required>
          <select
            name="unit"
            value={data.unit}
            onChange={onChange}
            className={cls("unit")}
          >
            <Options list={UNITS} placeholder="Select Unit" />
          </select>
        </Field>
      </div>

      {/* =====================================================
          Section 2 : Stock Levels
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Stock Levels</h6>

      <div className="row">
        <Field label="Opening Stock :" error={err("openingStock")} hint="Period ke shuru me">
          <input
            type="number"
            name="openingStock"
            min={0}
            value={data.openingStock}
            onChange={onChange}
            className={cls("openingStock")}
          />
        </Field>

        <Field label="Current Stock :" error={err("currentStock")} required hint="अभी कितना है">
          <input
            type="number"
            name="currentStock"
            min={0}
            value={data.currentStock}
            onChange={onChange}
            className={cls("currentStock")}
          />
          {data.currentStock && (
            <small className={`d-block mt-1 fw-bold ${stockColor}`}>
              <i className="fa fa-info-circle"></i> Auto Status: {autoStatus}
            </small>
          )}
        </Field>

        <Field label="Sold Stock :" error={err("soldStock")} hint="कितना बिक गया">
          <input
            type="number"
            name="soldStock"
            min={0}
            value={data.soldStock}
            onChange={onChange}
            className={cls("soldStock")}
          />
        </Field>
      </div>

      <div className="row">
        <Field label="Damaged Stock :" error={err("damagedStock")} hint="खराब हुआ माल">
          <input
            type="number"
            name="damagedStock"
            min={0}
            value={data.damagedStock}
            onChange={onChange}
            className={cls("damagedStock")}
          />
        </Field>

        <Field label="Reserved Stock :" error={err("reservedStock")} hint="Order me reserved">
          <input
            type="number"
            name="reservedStock"
            min={0}
            value={data.reservedStock}
            onChange={onChange}
            className={cls("reservedStock")}
          />
        </Field>

        <Field
          label="Reorder Level :"
          error={err("reorderLevel")}
          required
          hint="इससे नीचे जाए तो alert"
        >
          <input
            type="number"
            name="reorderLevel"
            min={0}
            value={data.reorderLevel}
            onChange={onChange}
            className={cls("reorderLevel")}
          />
        </Field>
      </div>

      <div className="row">
        <Field label="Max Stock :" hint="Maximum कितना रख सकते हैं">
          <input
            type="number"
            name="maxStock"
            min={0}
            value={data.maxStock}
            onChange={onChange}
            className="form-control mt-2"
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
          Section 3 : Pricing
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Pricing</h6>

      <div className="row">
        <Field label="Purchase Price (₹) :" error={err("purchasePrice")} required hint="खरीद rate">
          <input
            type="number"
            name="purchasePrice"
            min={0}
            value={data.purchasePrice}
            onChange={onChange}
            placeholder="0"
            className={cls("purchasePrice")}
          />
        </Field>

        <Field label="Selling Price (₹) :" error={err("sellingPrice")} required hint="बेचने का rate">
          <input
            type="number"
            name="sellingPrice"
            min={0}
            value={data.sellingPrice}
            onChange={onChange}
            placeholder="0"
            className={cls("sellingPrice")}
          />
        </Field>

        {data.purchasePrice && data.sellingPrice && (
          <Field label="Profit Margin :" hint="Auto-calculated">
            <div className="form-control mt-2 bg-light fw-bold text-success">
              ₹{Number(data.sellingPrice) - Number(data.purchasePrice)}{" "}
              ({Math.round(((Number(data.sellingPrice) - Number(data.purchasePrice)) / Number(data.sellingPrice)) * 100)}%)
            </div>
          </Field>
        )}
      </div>

      {/* =====================================================
          Section 4 : Dates & Supplier
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Dates & Supplier</h6>

      <div className="row">
        <Field label="Manufacturing Date :">
          <input
            type="date"
            name="mfgDate"
            value={data.mfgDate ? data.mfgDate.split("T")[0] : ""}
            onChange={onChange}
            className="form-control mt-2"
          />
        </Field>

        <Field label="Expiry Date :" error={err("expiryDate")}>
          <input
            type="date"
            name="expiryDate"
            value={data.expiryDate ? data.expiryDate.split("T")[0] : ""}
            onChange={onChange}
            className={cls("expiryDate")}
          />
        </Field>

        <Field label="Last Restocked :" hint="आखिरी बार कब माल आया">
          <input
            type="date"
            name="lastRestocked"
            value={data.lastRestocked ? data.lastRestocked.split("T")[0] : ""}
            onChange={onChange}
            className="form-control mt-2"
          />
        </Field>
      </div>

      <div className="row">
        <Field label="Supplier :" hint="कहाँ से आया">
          <select
            name="supplier"
            value={data.supplier}
            onChange={onChange}
            className="form-control mt-2"
          >
            <Options list={SUPPLIERS} placeholder="Select Supplier" />
          </select>
        </Field>

        <Field label="Supplier Contact :" hint="Phone number">
          <input
            type="tel"
            name="supplierContact"
            value={data.supplierContact}
            onChange={onChange}
            placeholder="10-digit number"
            maxLength={10}
            className="form-control mt-2"
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