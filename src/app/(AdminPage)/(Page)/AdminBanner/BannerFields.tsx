"use client";
import { ChangeEvent, ReactNode } from "react";

/* ============================================================
   BANNER — Website ke homepage/menu banners ke liye
   ============================================================ */

export type Banner = {
  id: string;
  title: string;              // Banner heading
  subtitle: string;           // Short tagline
  description: string;        // Detail text
  image: string;              // Banner image (desktop)
  mobileImage: string;        // Mobile ke liye alag image
  buttonText: string;         // CTA button text
  buttonLink: string;         // CTA button link
  position: string;           // Hero / Top / Middle / Bottom / Sidebar
  order: string;              // Sort order
  status: string;             // Active / Deactive
  startDate: string;          // Kab se dikhe
  endDate: string;            // Kab tak dikhe
  bgColor: string;            // Background color
  textColor: string;          // Text color
  createdAt: string;
  updatedAt: string;
};

export const emptyBanner: Banner = {
  id: "",
  title: "",
  subtitle: "",
  description: "",
  image: "",
  mobileImage: "",
  buttonText: "",
  buttonLink: "",
  position: "Hero",
  order: "0",
  status: "Active",
  startDate: "",
  endDate: "",
  bgColor: "#ffffff",
  textColor: "#000000",
  createdAt: "",
  updatedAt: "",
};

/* ---------------- DROPDOWN OPTIONS ---------------- */

export const POSITIONS = [
  "Hero",           // Homepage ka main banner (top)
  "Top Strip",      // ऊपर की notification bar
  "Middle",         // Content के बीच
  "Bottom",         // Page ke नीचे
  "Sidebar",        // Side me
  "Popup",          // Popup banner
  "Category Top",   // Category page ke ऊपर
  "Product Top",    // Product page ke ऊपर
];

/* ---------------- HELPERS ---------------- */

export const today = () => new Date().toISOString().split("T")[0];

export const prepareBanner = (d: Banner): Banner => ({
  ...d,
  title: d.title.trim(),
  subtitle: d.subtitle.trim(),
  description: d.description.trim(),
  buttonText: d.buttonText.trim(),
  buttonLink: d.buttonLink.trim(),
});

export const validateBanner = (d: Banner) => {
  const e: { [key: string]: string } = {};
  if (!d.title.trim()) e.title = "Banner title is required";
  if (!d.position) e.position = "Select banner position";
  if (!d.image.trim()) e.image = "Desktop image is required";
  if (!d.status) e.status = "Select status";

  // Button check
  if (d.buttonText && !d.buttonLink)
    e.buttonLink = "Link required if button text is given";
  if (d.buttonLink && !d.buttonText)
    e.buttonText = "Button text required if link is given";
  if (d.buttonLink && !/^\/|^https?:\/\//.test(d.buttonLink))
    e.buttonLink = "Link must start with / or http";

  // Order check
  if (d.order && Number(d.order) < 0) e.order = "Order cannot be negative";

  // Date check
  if (d.startDate && d.endDate && d.endDate < d.startDate)
    e.endDate = "End date must be after start date";

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
  data: Banner;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
};

/* ============================================================
   MAIN FORM FIELDS
   ============================================================ */

export default function BannerFields({ data, errors, show, onChange }: Props) {
  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) =>
    `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;

  return (
    <>
      <h6 className="fw-bold mb-3">Basic Details</h6>

      {/* Row 1 : Title / Subtitle / Position */}
      <div className="row">
        <Field
          label="Banner Title :"
          error={err("title")}
          required
          hint="e.g. Diwali Sale - 50% OFF"
        >
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={onChange}
            placeholder="Enter banner title"
            className={cls("title")}
          />
        </Field>

        <Field label="Subtitle :" hint="Short tagline (optional)">
          <input
            type="text"
            name="subtitle"
            value={data.subtitle}
            onChange={onChange}
            placeholder="e.g. Pure Bihar Makhana now at discount"
            className="form-control mt-2"
          />
        </Field>

        <Field label="Position :" error={err("position")} required>
          <select
            name="position"
            value={data.position}
            onChange={onChange}
            className={cls("position")}
          >
            <Options list={POSITIONS} placeholder="Select Position" />
          </select>
        </Field>
      </div>

      {/* Row 2 : Description */}
      <div className="row">
        <Field label="Description :" col="col-md-12" hint="Detail text (optional)">
          <textarea
            name="description"
            rows={3}
            value={data.description}
            onChange={onChange}
            placeholder="Write banner description..."
            className="form-control mt-2"
          />
        </Field>
      </div>

      {/* Row 3 : Images */}
      <div className="row">
        <Field
          label="Desktop Image :"
          error={err("image")}
          required
          col="col-md-6"
          hint="Width: 1920px, Height: 600-800px"
        >
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
                alt="Banner"
                className="border rounded"
                style={{ maxWidth: "100%", maxHeight: "150px" }}
              />
            </div>
          )}
        </Field>

        <Field
          label="Mobile Image :"
          col="col-md-6"
          hint="Width: 800px, Height: 800px (optional)"
        >
          <input
            type="file"
            name="mobileImage"
            accept="image/*"
            className="form-control mt-2"
            onChange={onChange}
          />
          {data.mobileImage && (
            <div className="mt-2">
              <img
                src={`/assets/images/${data.mobileImage}`}
                alt="Mobile Banner"
                className="border rounded"
                style={{ maxWidth: "100%", maxHeight: "150px" }}
              />
            </div>
          )}
        </Field>
      </div>

      {/* Row 4 : Button */}
      <h6 className="fw-bold mt-3 mb-3">Call-to-Action Button</h6>
      <div className="row">
        <Field
          label="Button Text :"
          error={err("buttonText")}
          hint="e.g. Shop Now, Buy Now"
        >
          <input
            type="text"
            name="buttonText"
            value={data.buttonText}
            onChange={onChange}
            placeholder="Shop Now"
            className={cls("buttonText")}
          />
        </Field>

        <Field
          label="Button Link :"
          error={err("buttonLink")}
          hint="e.g. /AdminProducts or https://..."
          col="col-md-8"
        >
          <input
            type="text"
            name="buttonLink"
            value={data.buttonLink}
            onChange={onChange}
            placeholder="/products or /category/flavoured"
            className={cls("buttonLink")}
          />
        </Field>
      </div>

      {/* Row 5 : Colors / Order / Status */}
      <h6 className="fw-bold mt-3 mb-3">Appearance & Schedule</h6>
      <div className="row">
        <Field label="Background Color :">
          <input
            type="color"
            name="bgColor"
            value={data.bgColor}
            onChange={onChange}
            className="form-control form-control-color mt-2"
          />
        </Field>

        <Field label="Text Color :">
          <input
            type="color"
            name="textColor"
            value={data.textColor}
            onChange={onChange}
            className="form-control form-control-color mt-2"
          />
        </Field>

        <Field label="Order :" error={err("order")} hint="0 = सबसे पहले">
          <input
            type="number"
            name="order"
            min={0}
            value={data.order}
            onChange={onChange}
            className={cls("order")}
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
      </div>

      {/* Row 6 : Schedule */}
      <div className="row">
        <Field
          label="Start Date :"
          hint="Kab se dikhana shuru ho (optional)"
        >
          <input
            type="date"
            name="startDate"
            value={data.startDate ? data.startDate.split("T")[0] : ""}
            onChange={onChange}
            className="form-control mt-2"
          />
        </Field>

        <Field
          label="End Date :"
          error={err("endDate")}
          hint="Kab tak dikhega (optional)"
        >
          <input
            type="date"
            name="endDate"
            value={data.endDate ? data.endDate.split("T")[0] : ""}
            onChange={onChange}
            className={cls("endDate")}
          />
        </Field>
      </div>
    </>
  );
}