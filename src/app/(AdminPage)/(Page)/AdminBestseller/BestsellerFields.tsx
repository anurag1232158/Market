// src/app/(AdminPage)/(AdminSection)/AdminBestseller/BestsellerFields.tsx
"use client";
import { ChangeEvent, ReactNode } from "react";

export type Bestseller = {
  // ✅ Common
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  // ✅ Admin (Section/Content)
  title: string;
  subtitle: string;
  content: string;
  section: string;
  image: string;
  icon: string;
  order: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;

  // ✅ Frontend (Product)
  name: string;
  slug: string;
  category: string;
  flavour: string;
  weight: string;
  price: string;
  discount: string;
  stock: string;
  description: string;
  details: string;
  pic: string;
  rating: string;
  isBestSeller: string;
  isFeatured: string;
  isVrat: string;
  isGlutenFree: string;
};

export const emptyBestseller: Bestseller = {
  id: "",
  status: "Active",
  createdAt: "",
  updatedAt: "",

  title: "",
  subtitle: "",
  content: "",
  section: "Story",
  image: "",
  icon: "",
  order: "0",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",

  name: "",
  slug: "",
  category: "",
  flavour: "",
  weight: "",
  price: "0",
  discount: "0",
  stock: "0",
  description: "",
  details: "",
  pic: "",
  rating: "0",
  isBestSeller: "Yes",
  isFeatured: "No",
  isVrat: "No",
  isGlutenFree: "No",
};

export const SECTIONS = [
  "Story", "Mission", "Vision", "Why Us", "Team", "Founder",
  "Our Process", "Quality", "Certifications", "Journey", "CSR",
];

export const ICONS = [
  "fa fa-leaf", "fa fa-seedling", "fa fa-heart", "fa fa-star", "fa fa-award",
  "fa fa-trophy", "fa fa-users", "fa fa-handshake", "fa fa-bullseye", "fa fa-eye",
  "fa fa-check-circle", "fa fa-shield-alt", "fa fa-utensils", "fa fa-industry",
  "fa fa-globe", "fa fa-certificate",
];

export const today = () => new Date().toISOString().split("T")[0];

export const prepareBestseller = (d: Bestseller): Bestseller => ({
  ...d,
  title: d.title.trim(),
  subtitle: d.subtitle.trim(),
  content: d.content.trim(),
  name: d.name.trim(),
  metaTitle: d.metaTitle.trim(),
  metaDescription: d.metaDescription.trim(),
  metaKeywords: d.metaKeywords.trim(),
});

export const validateBestseller = (d: Bestseller) => {
  const e: { [key: string]: string } = {};
  
  // ✅ Admin Validation (Title/Section mandatory)
  if (!d.title.trim() && !d.name.trim()) 
    e.title = "Either Title or Product Name is required";
  if (!d.section) e.section = "Select a section";
  if (!d.content.trim() && !d.description.trim()) 
    e.content = "Either Content or Description is required";
  
  // ✅ Product Validation
  if (d.price && Number(d.price) < 0) e.price = "Price cannot be negative";
  if (d.discount && (Number(d.discount) < 0 || Number(d.discount) > 100))
    e.discount = "Discount must be between 0-100";

  if (!d.status) e.status = "Select status";
  if (d.order && Number(d.order) < 0) e.order = "Order cannot be negative";
  
  return e;
};

const Field = ({ label, error, hint, required, children, col = "col-md-3" }: 
{ label: string; error?: string; hint?: string; required?: boolean; children: ReactNode; col?: string; }) => (
  <div className={col}>
    <div className="mb-3 fw-bold">
      <label>
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children}
      {hint && !error && <small className="text-muted fw-normal d-block mt-1">{hint}</small>}
      {error && <p className="text-danger fw-normal mb-0">{error}</p>}
    </div>
  </div>
);

const Options = ({ list, placeholder }: { list: string[]; placeholder: string }) => (
  <>
    <option value="">{placeholder}</option>
    {list.map((o) => <option key={o} value={o}>{o}</option>)}
  </>
);

type Props = {
  data: Bestseller;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
};

export default function BestsellerFields({ data, errors, show, onChange }: Props) {
  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) => `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;

  return (
    <>
      {/* ============== SECTION 1: Admin Info ============== */}
      <div className="">
      <h6 className="fw-bold mb-3 bg-primary text-white p-2 rounded">Section Details (Admin)</h6>

      <div className="row">
        <Field label="Title :" error={err("title")} required hint="e.g. Our Story, Our Mission">
          <input type="text" name="title" value={data.title} onChange={onChange} placeholder="Enter section title" className={cls("title")} />
        </Field>
        <Field label="Subtitle :" hint="Short tagline (optional)">
          <input type="text" name="subtitle" value={data.subtitle} onChange={onChange} placeholder="e.g. From the fields of Bihar" className="form-control mt-2" />
        </Field>
        <Field label="Section :" error={err("section")} required>
          <select name="section" value={data.section} onChange={onChange} className={cls("section")}>
            <Options list={SECTIONS} placeholder="Select Section" />
          </select>
        </Field>
          <Field label="Status :" error={err("status")} required>
          <select name="status" value={data.status} onChange={onChange} className={cls("status")}>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>
        </Field>
      </div>

      <div className="row">
      
        <Field label="Content :" error={err("content")} required hint="Main paragraph for Bestseller page">
          <textarea name="content" rows={6} value={data.content} onChange={onChange} placeholder="Write detailed content here..." className={cls("content")} />
        </Field>
       
        <Field label="Image :" hint="Section image" className="col-3">
          <input type="file" name="image" accept="image/*" className="form-control mt-2" onChange={onChange} />
          {data.image && (
            <div className="mt-2">
              <img src={`/assets/images/${data.image}`} alt="Bestseller" width="120" height="120" className="border rounded" />
            </div>
          )}
        </Field>
      
        <Field label="Icon :" hint="FontAwesome icon class" className="col-3">
          <select name="icon" value={data.icon} onChange={onChange} className="form-control mt-2">
            <Options list={ICONS} placeholder="Select Icon" />
          </select>
          {data.icon && (
            <div className="mt-2 text-center">
              <i className={`fa-solid ${data.icon}`} style={{ fontSize: "32px" }}></i>
              <small className="d-block text-muted mt-1">{data.icon}</small>
            </div>
          )}
        </Field>

        <Field label="Order :" error={err("order")} hint="0 = first" className="col-2">
          <input type="number" name="order" min={0} value={data.order} onChange={onChange} className={cls("order")} />
        </Field>
       
      </div>

      {/* ============== SECTION 2: Product Info (Frontend) ============== */}
      <h6 className="fw-bold mb-3 bg-success text-white p-2 rounded mt-4">Product Details (Frontend)</h6>
      <div className="row">
        <Field label="Product Name :" col="col-md-4" hint="e.g. Premium Jumbo Makhana" className="col-3">
          <input type="text" name="name" value={data.name} onChange={onChange} placeholder="Enter product name" className="form-control mt-2" />
        </Field>
        <Field label="Slug (URL) :" col="col-md-3" hint="e.g. premium-jumbo-makhana" className="col-3">
          <input type="text" name="slug" value={data.slug} onChange={onChange} placeholder="premium-jumbo-makhana" className="form-control mt-2" />
        </Field>
        <Field label="Category :" col="col-md-3" hint="e.g. Flavoured Makhana" className="col-3">
          <input type="text" name="category" value={data.category} onChange={onChange} placeholder="Flavoured Makhana" className="form-control mt-2" />
        </Field>
        <Field label="Flavour :" col="col-md-2" hint="e.g. Chocolate" className="col-3">
          <input type="text" name="flavour" value={data.flavour} onChange={onChange} placeholder="Chocolate" className="form-control mt-2" />
        </Field>
      </div>

      <div className="row">
        <Field label="Weight :" hint="e.g. 500 g">
          <input type="text" name="weight" value={data.weight} onChange={onChange} placeholder="500 g" className="form-control mt-2" />
        </Field>
        <Field label="Price (₹) :" error={err("price")} hint="Original MRP">
          <input type="number" name="price" min={0} value={data.price} onChange={onChange} className={cls("price")} />
        </Field>
        <Field label="Discount (%) :" error={err("discount")} hint="0-100">
          <input type="number" name="discount" min={0} max={100} value={data.discount} onChange={onChange} className={cls("discount")} />
        </Field>
        <Field label="Stock :" hint="Available quantity">
          <input type="number" name="stock" min={0} value={data.stock} onChange={onChange} className="form-control mt-2" />
        </Field>
      </div>

      <div className="row">
        <Field label="Rating :" hint="0-5 (e.g. 4.8)">
          <input type="text" name="rating" value={data.rating} onChange={onChange} placeholder="4.8" className="form-control mt-2" />
        </Field>
        <Field label="Product Image :" hint="Photo shown on frontend">
          <input type="file" name="pic" accept="image/*" className="form-control mt-2" onChange={onChange} />
          {data.pic && (
            <div className="mt-2">
              <img src={`/assets/images/${data.pic}`} alt="Product" width="100" height="100" className="border rounded" />
            </div>
          )}
        </Field>
        <Field label="Is BestSeller ?" hint="Show in Bestsellers section">
          <select name="isBestSeller" value={data.isBestSeller} onChange={onChange} className="form-control mt-2">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </Field>
        <Field label="Is Featured ?" hint="Show in Featured section">
          <select name="isFeatured" value={data.isFeatured} onChange={onChange} className="form-control mt-2">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </Field>
      </div>

      <div className="row">
        <Field label="Description (short) :" col="col-md-6" hint="Shown on product card">
          <textarea name="description" rows={2} value={data.description} onChange={onChange} placeholder="Short description..." className="form-control mt-2" />
        </Field>
        <Field label="Details (detailed) :" col="col-md-6" hint="Full product details">
          <textarea name="details" rows={4} value={data.details} onChange={onChange} placeholder="100% Organic Makhana&#10;No preservatives&#10;Fresh from Bihar" className="form-control mt-2" />
        </Field>
      </div>

      <div className="row">
        <Field label="Is Vrat ?" hint="Fasting-friendly">
          <select name="isVrat" value={data.isVrat} onChange={onChange} className="form-control mt-2">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </Field>
        <Field label="Is Gluten Free ?" hint="Gluten-free">
          <select name="isGlutenFree" value={data.isGlutenFree} onChange={onChange} className="form-control mt-2">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </Field>
      </div>

      {/* ============== SECTION 3: SEO ============== */}
      <h6 className="fw-bold mb-3 bg-warning text-dark p-2 rounded mt-4">SEO Details</h6>
      <div className="row">
        <Field label="Meta Title :" error={err("metaTitle")} hint={`${data.metaTitle.length}/60 characters`} col="col-md-6">
          <input type="text" name="metaTitle" value={data.metaTitle} onChange={onChange} placeholder="Page title for Google" className={cls("metaTitle")} />
        </Field>
        <Field label="Meta Keywords :" hint="Comma separated" col="col-md-6">
          <input type="text" name="metaKeywords" value={data.metaKeywords} onChange={onChange} placeholder="makhana, fox nuts" className="form-control mt-2" />
        </Field>
      </div>

      <div className="row">
        <Field label="Meta Description :" error={err("metaDescription")} hint={`${data.metaDescription.length}/160 characters`} col="col-md-12">
          <textarea name="metaDescription" rows={3} value={data.metaDescription} onChange={onChange} placeholder="Short description for Google search" className={cls("metaDescription")} />
        </Field>
      </div>
 </div>
    </>
  );
}