"use client";
import { ChangeEvent, ReactNode } from "react";

/* ============================================================
   TYPE DEFINITION
   ============================================================ */
export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parent: string;
  status: string;
  sortOrder: string;
  isFeatured: string;
  createdAt: string;
  updatedAt: string;
};

export const emptyCategory: Category = {
  id: "",
  name: "",
  slug: "",
  description: "",
  image: "",
  parent: "",
  status: "Active",
  sortOrder: "0",
  isFeatured: "No",
  createdAt: "",
  updatedAt: "",
};

/* ============================================================
   MASTER MAPPING — Parent → Children
   
   ⭐ यह सबसे important part है।
   जब user Parent select करेगा, तभी इस list में से
   Category Name dropdown में options आएँगी।
   ============================================================ */
export const CATEGORY_MAP: Record<string, string[]> = {
  "Raw Makhana": [
    "Plain Raw Makhana",
    "Premium Jumbo Makhana",
    "Organic Raw Makhana",
    "Bulk Makhana (Wholesale)",
  ],
  "Roasted Makhana": [
    "Plain Roasted Makhana",
    "Ghee Roasted Makhana",
    "Jumbo Roasted Makhana",
    "Himalayan Pink Salt Makhana",
  ],
  "Flavoured Makhana": [
    "Peri Peri Makhana",
    "Cheese Makhana",
    "Salt & Pepper Makhana",
    "Mint Makhana",
    "Tangy Tomato Makhana",
    "Cream & Onion Makhana",
    "Caramel Makhana",
    "Masala Makhana",
  ],
  "Makhana Powder": [
    "Makhana Atta (Powder)",
    "Makhana Kheer Mix",
    "Makhana Baby Food",
  ],
  "Gift Packs & Combos": [
    "Makhana Gift Box",
    "Makhana Combo Pack",
    "Festive Makhana Hamper",
    "Wedding Gift Pack",
  ],
  "Bulk / Wholesale": [
    "Bulk Makhana 5 kg",
    "Bulk Makhana 10 kg",
    "Bulk Makhana 25 kg",
    "Bulk Makhana 50 kg",
  ],
};

/* Parent categories की list (dropdown के लिए) */
export const PARENT_CATEGORIES = Object.keys(CATEGORY_MAP);
export const makeSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const today = () => new Date().toISOString().split("T")[0];
export const prepareCategory = (d: Category): Category => ({
  ...d,
  name: d.name.trim(),
  description: d.description.trim(),
  slug: d.slug.trim() ? makeSlug(d.slug) : makeSlug(d.name),
});
export const validateCategory = (d: Category) => {
  const e: { [key: string]: string } = {};
  if (!d.parent) e.parent = "Please select parent category first";
  if (!d.name.trim()) e.name = "Category name is required";
  if (!d.status) e.status = "Select status";
  if (d.sortOrder && Number(d.sortOrder) < 0)
    e.sortOrder = "Sort order cannot be negative";
  return e;
};

 const Field = ({ label, error, hint, required, children, col = "col-md-4",}: 
  { label: string; error?: string; hint?: string; required?: boolean; children: ReactNode; col?: string;}) => 
  (
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
  data: Category;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
};

export default function CategoryFields({ data, errors, show, onChange }: Props) {
  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) => `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;
  const hasParent = !!data.parent;
  const categoryNames = hasParent ? CATEGORY_MAP[data.parent] || [] : [];

  return (
    <>
      <h6 className="fw-bold mb-3">Basic Details</h6>
      <div className="row">
        <Field label="Parent Category :" error={err("parent")} required hint="पहले Parent चुनें, तभी Category Name enable होगा" >
         <select name="parent" value={data.parent} onChange={onChange} className={cls("parent")}><Options   list={PARENT_CATEGORIES}   placeholder="— Select Parent Category —" />
          </select>
        </Field>

        <Field label="Category Name :" error={err("name")} required hint={ hasParent   ? `"${data.parent}" के अंदर की categories`   : "⚠️ पहले Parent Category चुनें" }>
          <select name="name" value={data.name} onChange={onChange} className={cls("name")} disabled={!hasParent} style={{ cursor: hasParent ? "pointer" : "not-allowed" }} > 
          <Options list={categoryNames} placeholder={hasParent ? "— Select Category Name —" : "🔒 पहले Parent चुनें" } />
          </select>
        </Field>

        {/* Status */}
        <Field label="Status :" error={err("status")} required>
          <select name="status" value={data.status} onChange={onChange} className={cls("status")} > 
          <option value="">Select Status</option> <option value="Active">Active</option> <option value="Deactive">Deactive</option>
          </select>
        </Field>
      </div>

      <div className="row">
        <Field label="URL Slug :" hint="URL में दिखने वाला नाम। खाली छोड़ें तो नाम से auto बनेगा" col="col-md-6">
          <input type="text" name="slug" value={data.slug} onChange={onChange} placeholder="e.g. roasted-makhana" className="form-control mt-2" />
          {data.name && !data.slug && ( <small className="text-success d-block mt-1">   <i className="fa fa-magic"></i> Auto:{" "}   <code>{makeSlug(data.name)}</code> </small>)}
        </Field>

        <Field label="Sort Order :" error={err("sortOrder")} hint="0 = सबसे पहले">
          <input type="number" name="sortOrder" min={0} value={data.sortOrder} onChange={onChange} className={cls("sortOrder")} />
        </Field>

        <Field label="Featured :" hint="Homepage पर दिखाना है?">
          <select name="isFeatured" value={data.isFeatured} onChange={onChange} className="form-control mt-2">
           <option value="No">No</option> <option value="Yes">Yes</option>
          </select>
        </Field>
      </div>

      <div className="row">
        <Field label="Image :" col="col-md-4" hint="Category का icon/photo">
          <input type="file" name="image" accept="image/*" className="form-control mt-2" onChange={onChange} />
          {data.image && ( <div className="mt-2"> <img src={`/assets/images/${data.image}`}  alt="Category" width="80" height="80" className="border rounded"   /> </div> )}
        </Field>

        <Field label="Description :" col="col-md-8">
          <textarea name="description" rows={3} value={data.description} onChange={onChange} placeholder="Short description (optional)" className="form-control mt-2"/>
        </Field>
      </div>
    </>
  );
}