"use client";
import { ChangeEvent, ReactNode, useState } from "react";

export type Product = {
  id: string;
  name: string;
  category: string;
  weight: string;
  price: string;
  stock: string;
  status: string;
  flavour: string;
  discount: string;
  pic: string;
  description: string;
  grade: string; 
  packType: string;
  sku: string;
  origin: string;
  shelfLife: string;
  mfgDate: string;
  expiryDate: string;
  gst: string;
  hsn: string;
  minOrderQty: string;
  slug: string;
  isBestSeller: string; // "Yes" | "No"
  isVrat: string;
  isGlutenFree: string;
  rating: string;
  ingredients: string;
  protein: string;
  calories: string;
  fat: string;
  carbs: string;
  fiber: string;
  details: string;
  createdAt: string;
  updatedAt: string;
};

export const emptyProduct: Product = {
  id: "",
  name: "",
  category: "",
  weight: "",
  price: "",
  stock: "",
  status: "Active",
  flavour: "",
  discount: "",
  pic: "",
  description: "",
  grade: "",
  packType: "",
  sku: "",
  origin: "",
  shelfLife: "",
  mfgDate: "",
  expiryDate: "",
  gst: "",
  hsn: "",
  minOrderQty: "1",
  slug: "",
  isBestSeller: "No",
  isVrat: "Yes",
  isGlutenFree: "Yes",
  rating: "",
  ingredients: "",
  protein: "",
  calories: "",
  fat: "",
  carbs: "",
  fiber: "",
  details: "",
  createdAt: "",
  updatedAt: "",
};

export const NAME_SUGGESTIONS = [
  "Plain Raw Makhana (Phool Makhana)",
  "Premium Jumbo Makhana",
  "Roasted Makhana",
  "Ghee Roasted Makhana",
  "Peri Peri Makhana",
  "Cheese Makhana",
  "Salt & Pepper Makhana",
  "Mint Makhana",
  "Tangy Tomato Makhana",
  "Cream & Onion Makhana",
  "Caramel Makhana",
  "Himalayan Pink Salt Makhana",
  "Makhana Atta (Powder)",
  "Makhana Kheer Mix",
  "Makhana Gift Box",
  "Makhana Combo Pack",
  "Bulk Makhana (Wholesale)",
];

export const CATEGORIES = [
  "Raw Makhana",
  "Roasted Makhana",
  "Flavoured Makhana",
  "Makhana Powder",
  "Gift Packs & Combos",
  "Bulk / Wholesale",
];

export const FLAVOURS = [
  "Plain / Unflavoured",
  "Peri Peri",
  "Cheese",
  "Salt & Pepper",
  "Mint",
  "Tangy Tomato",
  "Cream & Onion",
  "Caramel",
  "Masala",
  "Himalayan Pink Salt",
  "Chocolate",
  "Mixed (Combo)",
];

export const GRADES = [
  "3 Suta",
  "4 Suta",
  "5 Suta",
  "6 Suta",
  "7 Suta (Jumbo)",
  "Mixed / Broken",
];

export const WEIGHTS = [
  "30 g",
  "50 g",
  "100 g",
  "200 g",
  "250 g",
  "500 g",
  "1 kg",
  "2 kg",
  "5 kg",
  "10 kg",
  "25 kg",
];

export const PACK_TYPES = [
  "Zip Pouch",
  "Standup Pouch",
  "Jar",
  "Box",
  "Gift Box",
  "Bulk Bag",
];

export const ORIGINS = [
  "Darbhanga, Bihar",
  "Madhubani, Bihar",
  "Purnia, Bihar",
  "Katihar, Bihar",
  "Saharsa, Bihar",
  "Other",
];

export const SHELF_LIFE = ["3 months", "6 months", "9 months", "12 months"];
export const GST_RATES = ["0", "5", "12", "18"];

export const calcFinalPrice = (price: string, discount?: string) => {
  const p = Number(price) || 0;
  const d = Number(discount) || 0;
  return Math.round(p - (p * d) / 100);
};

export const today = () => new Date().toISOString().split("T")[0];
export const makeSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const prepareProduct = (d: Product): Product => ({
  ...d,
  name: d.name.trim(),
  description: d.description.trim(),
  slug: d.slug.trim() ? makeSlug(d.slug) : makeSlug(`${d.name} ${d.weight}`),
});

export const validateProduct = (d: Product) => {
  const e: { [key: string]: string } = {};
  if (!d.name.trim()) e.name = "Product name is required";
  if (!d.category) e.category = "Select category";
  if (!d.weight) e.weight = "Select pack weight";
  if (!d.price || Number(d.price) <= 0) e.price = "Enter valid price";
  if (d.stock === "" || Number(d.stock) < 0) e.stock = "Enter stock quantity";
  if (!d.status) e.status = "Select status";

  // optional fields: bhare hon tabhi check
  if (d.discount && (Number(d.discount) < 0 || Number(d.discount) > 100))
    e.discount = "Discount must be between 0 and 100";
  if (d.minOrderQty && Number(d.minOrderQty) < 1)
    e.minOrderQty = "Minimum order quantity must be 1 or more";
  if (d.mfgDate && d.expiryDate && d.expiryDate <= d.mfgDate)
    e.expiryDate = "Expiry must be after manufacturing date";
  return e;
};

const Field = ({
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

const Options = ({ list, placeholder }: { list: string[]; placeholder: string }) => (
  <>
    <option value="">{placeholder}</option>
    {list.map((o) => (
      <option key={o} value={o}>
        {o}
      </option>
    ))}
  </>
);

type Props = {
  data: Product;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
};

export const imgSrc = (pic?: string) => {
  if (!pic) return "";
  if (/^(https?:\/\/|data:)/i.test(pic)) return pic; // full URL
  return `/assets/images/${pic}`;                     // filename
};
export default function ProductFields({ data, errors, show, onChange }: Props) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreHasError = show && (!!errors.expiryDate || !!errors.minOrderQty);
  const isMoreOpen = moreOpen || moreHasError;
  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) => `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;
  const hasPrice = Number(data.price) > 0;

  return (
    <>
      <h6 className="fw-bold mb-3">Basic Details</h6>
      <div className="row">
        <Field label="Product Name :" error={err("name")} required>
          <input
            list="makhana-names"
            type="text"
            name="name"
            value={data.name}
            onChange={onChange}
            placeholder="Select or type product name"
            className={cls("name")}
          />
          <datalist id="makhana-names">
            {NAME_SUGGESTIONS.map((n) => (
              <option key={n} value={n} />
            ))}
          </datalist>
        </Field>

        <Field label="Select Category :" error={err("category")} required>
          <select
            name="category"
            value={data.category}
            onChange={onChange}
            className={cls("category")}
          >
            <Options list={CATEGORIES} placeholder="Select Category" />
          </select>
        </Field>

        <Field label="Select Flavour :">
          <select
            name="flavour"
            value={data.flavour}
            onChange={onChange}
            className="form-control mt-2"
          >
            <Options list={FLAVOURS} placeholder="Select Flavour" />
          </select>
        </Field>
      </div>

      <div className="row">
        <Field label="Pack Weight :" error={err("weight")} required>
          <select
            name="weight"
            value={data.weight}
            onChange={onChange}
            className={cls("weight")}
          >
            <Options list={WEIGHTS} placeholder="Select Weight" />
          </select>
        </Field>

        <Field label="Price (₹ MRP) :" error={err("price")} required>
          <input
            type="number"
            name="price"
            min={0}
            value={data.price}
            onChange={onChange}
            placeholder="Enter Price"
            className={cls("price")}
          />
        </Field>

        <Field
          label="Discount (%) :"
          error={err("discount")}
          hint={
            hasPrice && data.discount
              ? `Final Price : ₹${calcFinalPrice(data.price, data.discount)}`
              : undefined
          }
        >
          <input
            type="number"
            name="discount"
            min={0}
            max={100}
            value={data.discount}
            onChange={onChange}
            placeholder="Enter Discount %"
            className={cls("discount")}
          />
        </Field>
      </div>

      <div className="row">
        <Field label="Stock Quantity :" error={err("stock")} required>
          <input
            type="number"
            name="stock"
            min={0}
            value={data.stock}
            onChange={onChange}
            placeholder="Enter Stock"
            className={cls("stock")}
          />
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
            <option value="Deactive">Deactive</option>
          </select>
        </Field>

        <Field
          label="Image :"
          hint="Website par dikhane ke liye photo zaroor lagao"
        >
          <input
            type="file"
            name="pic"
            accept="image/*"
            className="form-control mt-2"
            onChange={onChange}
          />
     {data.pic && (
  <div className="mt-2">
    <img
      src={imgSrc(data.pic)}   // 👈 pehle: /assets/images/${data.pic}
      alt="Product"
      width="100"
      height="100"
    />
  </div>
)}
        </Field>
      </div>

      <div className="row">
        <Field label="Description :" col="col-md-12">
          <textarea
            name="description"
            rows={3}
            value={data.description}
            onChange={onChange}
            placeholder="Short product description (optional)"
            className="form-control mt-2"
          />
        </Field>
      </div>

      <div className="text-center my-3">
        <button
          type="button"
          className="btn btn-outline-dark btn-sm px-4"
          onClick={() => setMoreOpen(!isMoreOpen)}
        >
          <i className={`fa ${isMoreOpen ? "fa-minus" : "fa-plus"} me-2`}></i>
          {isMoreOpen ? "Hide More Details" : "More Details (Optional)"}
        </button>
      </div>

      <div style={{ display: isMoreOpen ? "block" : "none" }}>
        <h6 className="fw-bold mt-3 mb-3">Product Info</h6>
        <div className="row">
          <Field label="Size Grade (Suta) :">
            <select
              name="grade"
              value={data.grade}
              onChange={onChange}
              className="form-control mt-2"
            >
              <Options list={GRADES} placeholder="Select Grade" />
            </select>
          </Field>

          <Field label="Pack Type :">
            <select
              name="packType"
              value={data.packType}
              onChange={onChange}
              className="form-control mt-2"
            >
              <Options list={PACK_TYPES} placeholder="Select Pack Type" />
            </select>
          </Field>

          <Field label="Origin (Sourced From) :">
            <select
              name="origin"
              value={data.origin}
              onChange={onChange}
              className="form-control mt-2"
            >
              <Options list={ORIGINS} placeholder="Select Origin" />
            </select>
          </Field>
        </div>

        <div className="row">
          <Field label="Shelf Life :">
            <select
              name="shelfLife"
              value={data.shelfLife}
              onChange={onChange}
              className="form-control mt-2"
            >
              <Options list={SHELF_LIFE} placeholder="Select Shelf Life" />
            </select>
          </Field>

          <Field label="Manufacturing Date :">
            <input
              type="date"
              name="mfgDate"
              value={data.mfgDate ? data.mfgDate.split("T")[0] : ""}
              onChange={onChange}
              className="form-control mt-2"
            />
          </Field>

          <Field label="Expiry / Best Before :" error={err("expiryDate")}>
            <input
              type="date"
              name="expiryDate"
              value={data.expiryDate ? data.expiryDate.split("T")[0] : ""}
              onChange={onChange}
              className={cls("expiryDate")}
            />
          </Field>
        </div>

        <h6 className="fw-bold mt-3 mb-3">Business & Tax</h6>
        <div className="row">
          <Field label="SKU Code :">
            <input
              type="text"
              name="sku"
              value={data.sku}
              onChange={onChange}
              placeholder="e.g. MKH-RST-250"
              className="form-control mt-2"
            />
          </Field>

          <Field label="GST (%) :" hint="Rate apne CA se confirm karo">
            <select
              name="gst"
              value={data.gst}
              onChange={onChange}
              className="form-control mt-2"
            >
              <Options list={GST_RATES} placeholder="Select GST" />
            </select>
          </Field>

          <Field label="HSN Code :">
            <input
              type="text"
              name="hsn"
              value={data.hsn}
              onChange={onChange}
              placeholder="Enter HSN code"
              className="form-control mt-2"
            />
          </Field>
        </div>

        <div className="row">
          <Field
            label="Min Order Qty :"
            error={err("minOrderQty")}
            hint="Wholesale / bulk ke liye 1 se zyada rakho"
          >
            <input
              type="number"
              name="minOrderQty"
              min={1}
              value={data.minOrderQty}
              onChange={onChange}
              className={cls("minOrderQty")}
            />
          </Field>

          <Field
            label="URL Slug :"
            hint="Khali chhodo to naam se auto ban jayega"
            col="col-md-8"
          >
            <input
              type="text"
              name="slug"
              value={data.slug}
              onChange={onChange}
              placeholder="e.g. roasted-makhana-250-g"
              className="form-control mt-2"
            />
          </Field>
        </div>

        <h6 className="fw-bold mt-3 mb-3">Tags & Rating</h6>
        <div className="row">
          <Field label="Best Seller :">
            <select
              name="isBestSeller"
              value={data.isBestSeller}
              onChange={onChange}
              className="form-control mt-2"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </Field>

          <Field label="Vrat / Fasting Friendly :">
            <select
              name="isVrat"
              value={data.isVrat}
              onChange={onChange}
              className="form-control mt-2"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </Field>

          <Field label="Gluten Free :">
            <select
              name="isGlutenFree"
              value={data.isGlutenFree}
              onChange={onChange}
              className="form-control mt-2"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </Field>
        </div>

        <div className="row">
          <Field label="Rating :">
            <div className="d-flex gap-2 mt-2 form-control p-0">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num} style={{ cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="rating"
                    value={num}
                    checked={data.rating === String(num)}
                    onChange={onChange}
                    className="d-none mx-3"
                  />
                  <span
                    className="px-1"
                    style={{
                      fontSize: "25px",
                      paddingLeft: "10px",
                      color:
                        num <= Number(data.rating) ? "#ff0000ff" : "#2f5fffff",
                    }}
                  >
                    ★
                  </span>
                </label>
              ))}
            </div>
          </Field>
        </div>

        <h6 className="fw-bold mt-3 mb-3">Nutrition Facts (per 100 g)</h6>
        <div className="row">
          {[
            ["calories", "Calories (kcal)"],
            ["protein", "Protein (g)"],
            ["carbs", "Carbs (g)"],
            ["fat", "Fat (g)"],
            ["fiber", "Fibre (g)"],
          ].map(([key, label]) => (
            <div className="col-md table" key={key}>
              <div className="mb-3 fw-bold">
                <label>{label} :</label>
                <input
                  type="number"
                  name={key}
                  min={0}
                  value={(data as any)[key]}
                  onChange={onChange}
                  placeholder={label}
                  className="form-control mt-2"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="row ysn">
          <Field label="Ingredients :" col="col-md-6">
            <textarea
              name="ingredients"
              rows={4}
              value={data.ingredients}
              onChange={onChange}
              placeholder="e.g. Makhana, Rice Bran Oil, Salt, Peri Peri Seasoning"
              className="form-control mt-2"
            />
          </Field>

          <Field label="Details / Storage / Usage :" col="col-md-6">
            <textarea
              name="details"
              rows={4}
              value={data.details}
              onChange={onChange}
              placeholder="Storage, how to use, allergen info etc."
              className="form-control mt-2"
            />
          </Field>
        </div>
      </div>
    </>
  );
}