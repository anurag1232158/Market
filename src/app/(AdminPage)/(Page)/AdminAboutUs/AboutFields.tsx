"use client";
import { ChangeEvent, ReactNode } from "react";

export type About = {
  id: string;
  title: string;              // Section heading
  subtitle: string;           // Short tagline
  content: string;            // Main text (rich content)
  section: string;            // "Story" | "Mission" | "Vision" | "Team" | "Why Us"
  image: string;              // Section image
  icon: string;               // FontAwesome icon (optional)
  order: string;              // Sort order
  status: string;             // Active / Deactive
  metaTitle: string;          // SEO meta title
  metaDescription: string;    // SEO meta description
  metaKeywords: string;       // SEO keywords
  createdAt: string;
  updatedAt: string;
};

export const emptyAbout: About = {
  id: "",
  title: "",
  subtitle: "",
  content: "",
  section: "Story",
  image: "",
  icon: "",
  order: "0",
  status: "Active",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  createdAt: "",
  updatedAt: "",
};

export const SECTIONS = [
  "Story",              // Company ki kahani
  "Mission",            // हमारा मिशन
  "Vision",             // हमारा विज़न
  "Why Us",             // हमें क्यों चुनें
  "Team",               // टीम के बारे में
  "Founder",            // Founder message
  "Our Process",        // Production process
  "Quality",            // Quality standards
  "Certifications",     // FSSAI, ISO, etc.
  "Journey",            // Milestones
  "CSR",                // Social responsibility
];

export const ICONS = [
  "fa-leaf",
  "fa-seedling",
  "fa-heart",
  "fa-star",
  "fa-award",
  "fa-trophy",
  "fa-users",
  "fa-handshake",
  "fa-bullseye",
  "fa-eye",
  "fa-check-circle",
  "fa-shield-alt",
  "fa-utensils",
  "fa-industry",
  "fa-globe",
  "fa-certificate",
];


export const today = () => new Date().toISOString().split("T")[0];
export const prepareAbout = (d: About): About => ({
  ...d,
  title: d.title.trim(),
  subtitle: d.subtitle.trim(),
  content: d.content.trim(),
  metaTitle: d.metaTitle.trim(),
  metaDescription: d.metaDescription.trim(),
  metaKeywords: d.metaKeywords.trim(),
});

export const validateAbout = (d: About) => {
  const e: { [key: string]: string } = {};
  if (!d.title.trim()) e.title = "Title is required";
  if (!d.section) e.section = "Select a section";
  if (!d.content.trim()) e.content = "Content is required";
  else if (d.content.trim().length < 20)
    e.content = "Content must be at least 20 characters";
  if (!d.status) e.status = "Select status";
  if (d.order && Number(d.order) < 0) e.order = "Order cannot be negative";
  if (d.metaTitle && d.metaTitle.length > 60)
    e.metaTitle = "Meta title should be under 60 characters";
  if (d.metaDescription && d.metaDescription.length > 160)
    e.metaDescription = "Meta description should be under 160 characters";
  return e;
};


const Field = ({ label, error, hint, required, children, col = "col-md-4",}: 
{ label: string; error?: string; hint?: string; required?: boolean; children: ReactNode; col?: string;
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
  data: About;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
};

export default function AboutFields({ data, errors, show, onChange }: Props) {
  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) =>
    `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;

  return (
    <>
      <h6 className="fw-bold mb-3">Basic Details</h6>
      <div className="row">
        <Field label="Title :" error={err("title")} required hint="e.g. Our Story, Our Mission, Why Choose Us">
          <input type="text" name="title" value={data.title} onChange={onChange} placeholder="Enter section title" className={cls("title")} />
        </Field>
        <Field label="Subtitle :" hint="Short tagline (optional)">
          <input type="text" name="subtitle" value={data.subtitle} onChange={onChange} placeholder="e.g. From the fields of Bihar to your home" className="form-control mt-2" />
        </Field>
        <Field label="Section :" error={err("section")} required>
          <select  name="section"  value={data.section}  onChange={onChange}  className={cls("section")}>
         <Options list={SECTIONS} placeholder="Select Section" />
          </select>
        </Field>
      </div>

      {/* Row 2 : Content */}
      <div className="row">
        <Field label="Content :" error={err("content")} required col="col-md-12" hint="Main paragraph jo About Us page par dikhega" >
          <textarea  name="content"  rows={6}  value={data.content}  onChange={onChange}  placeholder="Write detailed content here..."  className={cls("content")}/>
        </Field>
      </div>

      {/* Row 3 : Image / Icon / Order / Status */}
      <div className="row">
        <Field label="Image :" col="col-md-4" hint="Section ki image">
          <input type="file" name="image" accept="image/*" className="form-control mt-2" onChange={onChange} />
          {data.image && (
            <div className="mt-2">
              <img src={`/assets/images/${data.image}`} alt="About" width="120" height="120" className="border rounded" />
            </div>
          )}
        </Field>

        <Field label="Icon :" hint="FontAwesome icon class">
          <select name="icon" value={data.icon} onChange={onChange} className="form-control mt-2">
            <Options list={ICONS} placeholder="Select Icon" />
          </select>
          {data.icon && (
            <div className="mt-2 text-center">
              <i className={`fa ${data.icon}`} style={{ fontSize: "32px" }}></i>
              <small className="d-block text-muted mt-1">{data.icon}</small>
            </div>
          )}
        </Field>

        <Field label="Order :" error={err("order")} hint="0 = सबसे पहले">
          <input type="number" name="order" min={0} value={data.order} onChange={onChange} className={cls("order")} />
        </Field>

        <Field label="Status :" error={err("status")} required>
          <select name="status" value={data.status} onChange={onChange} className={cls("status")} >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>
        </Field>
      </div>

      <h6 className="fw-bold mt-4 mb-3">SEO (Search Engine Optimization)</h6>
      <div className="row">
        <Field label="Meta Title :" error={err("metaTitle")} hint={`${data.metaTitle.length}/60 characters`} col="col-md-6">
          <input type="text" name="metaTitle" value={data.metaTitle} onChange={onChange} placeholder="Page title for Google (60 chars max)" className={cls("metaTitle")} />
        </Field>

        <Field label="Meta Keywords :" hint="Comma separated (optional)" col="col-md-6" >
          <input type="text" name="metaKeywords" value={data.metaKeywords} onChange={onChange} placeholder="makhana, fox nuts, bihar makhana" className="form-control mt-2" />
        </Field>
      </div>

      <div className="row">
        <Field label="Meta Description :"  error={err("metaDescription")} hint={`${data.metaDescription.length}/160 characters`} col="col-md-12">
          <textarea name="metaDescription" rows={3} value={data.metaDescription} onChange={onChange} placeholder="Short description for Google search results" className={cls("metaDescription")}/>
        </Field>
      </div>
    </>
  );
}