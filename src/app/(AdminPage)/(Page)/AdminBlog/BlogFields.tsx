"use client";
import { ChangeEvent, ReactNode } from "react";

export type Blog = {
  id: string;
  title: string;              // Blog title
  slug: string;               // URL slug
  excerpt: string;            // Short summary (list page par dikhega)
  content: string;            // Main article content
  image: string;              // Featured image
  category: string;           // Blog category
  tags: string;               // Comma separated tags
  author: string;             // Author name
  authorImage: string;        // Author photo
  readTime: string;           // e.g. "5 min read"
  status: string;             // Draft / Published
  isFeatured: string;         // Yes / No
  order: string;              // Sort order
  views: string;              // View count (auto increment)
  publishedAt: string;        // Publish date
  metaTitle: string;          // SEO title
  metaDescription: string;    // SEO description
  metaKeywords: string;       // SEO keywords
  createdAt: string;
  updatedAt: string;
};
export const emptyBlog: Blog = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image: "",
  category: "Health Benefits",
  tags: "",
  author: "",
  authorImage: "",
  readTime: "5 min read",
  status: "Draft",
  isFeatured: "No",
  order: "0",
  views: "0",
  publishedAt: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  createdAt: "",
  updatedAt: "",
};
export const BLOG_CATEGORIES = [
  "Health Benefits",
  "Recipes & Cooking",
  "Nutrition Facts",
  "Weight Loss",
  "Makhana Farming",
  "Company News",
  "Festival Special",
  "Ayurveda",
  "Kids Nutrition",
  "Fitness & Diet",
  "Buying Guide",
  "Makhana vs Others",
];
export const AUTHORS = [
  "Admin",
  "Dr. Sharma (Nutritionist)",
  "Chef Anjali",
  "Team Makhana",
  "Ram Prasad Singh",
];
export const makeSlug = (text: string) => text .toLowerCase() .replace(/&/g, " and ") .replace(/[^a-z0-9]+/g, "-") .replace(/^-+|-+$/g, "");
export const today = () => new Date().toISOString().split("T")[0];

export const prepareBlog = (d: Blog): Blog => ({
  ...d,
  title: d.title.trim(),
  excerpt: d.excerpt.trim(),
  content: d.content.trim(),
  tags: d.tags.trim(),
  author: d.author.trim(),
  slug: d.slug.trim() ? makeSlug(d.slug) : makeSlug(d.title),
  metaTitle: d.metaTitle.trim(),
  metaDescription: d.metaDescription.trim(),
  metaKeywords: d.metaKeywords.trim(),
});

export const validateBlog = (d: Blog) => {
  const e: { [key: string]: string } = {};
  if (!d.title.trim()) e.title = "Blog title is required";
  else if (d.title.trim().length < 5) e.title = "Title must be at least 5 characters";
  if (!d.category) e.category = "Select blog category";
  if (!d.excerpt.trim()) e.excerpt = "Excerpt is required";
  else if (d.excerpt.trim().length < 20) e.excerpt = "Excerpt must be at least 20 characters";
  if (!d.content.trim()) e.content = "Content is required";
  else if (d.content.trim().length < 50) e.content = "Content must be at least 50 characters";
  if (!d.author.trim()) e.author = "Author name is required";
  if (!d.status) e.status = "Select status";
  if (d.order && Number(d.order) < 0) e.order = "Order cannot be negative";
  if (d.metaTitle && d.metaTitle.length > 60)
    e.metaTitle = "Meta title should be under 60 characters";
  if (d.metaDescription && d.metaDescription.length > 160)
    e.metaDescription = "Meta description should be under 160 characters";
  return e;
};

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
  data: Blog;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
};

/* ============================================================
   MAIN FORM FIELDS
   ============================================================ */

export default function BlogFields({ data, errors, show, onChange }: Props) {
  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) =>
    `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;

  return (
    <>
      {/* =====================================================
          Section 1 : Basic Info
          ===================================================== */}
      <h6 className="fw-bold mb-3">Basic Info</h6>

      <div className="row">
        <Field
          label="Blog Title :"
          error={err("title")}
          required
          col="col-md-8"
          hint="e.g. 10 Amazing Health Benefits of Makhana"
        >
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={onChange}
            placeholder="Enter blog title"
            className={cls("title")}
          />
        </Field>

        <Field label="Blog Category :" error={err("category")} required>
          <select
            name="category"
            value={data.category}
            onChange={onChange}
            className={cls("category")}
          >
            <Options list={BLOG_CATEGORIES} placeholder="Select Category" />
          </select>
        </Field>
      </div>

      <div className="row">
        <Field
          label="URL Slug :"
          hint="Khali chhodo to title se auto banega"
          col="col-md-8"
        >
          <input
            type="text"
            name="slug"
            value={data.slug}
            onChange={onChange}
            placeholder="e.g. health-benefits-of-makhana"
            className="form-control mt-2"
          />
          {data.title && !data.slug && (
            <small className="text-success d-block mt-1">
              <i className="fa fa-magic"></i> Auto: <code>{makeSlug(data.title)}</code>
            </small>
          )}
        </Field>

        <Field label="Status :" error={err("status")} required>
          <select
            name="status"
            value={data.status}
            onChange={onChange}
            className={cls("status")}
          >
            <option value="">Select Status</option>
            <option value="Draft">Draft (not visible)</option>
            <option value="Published">Published (live)</option>
            <option value="Archived">Archived</option>
          </select>
        </Field>
      </div>

      {/* =====================================================
          Section 2 : Content
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Content</h6>

      <div className="row">
        <Field
          label="Excerpt (Short Summary) :"
          error={err("excerpt")}
          required
          col="col-md-12"
          hint="Blog list page par dikhega — 20-50 words"
        >
          <textarea
            name="excerpt"
            rows={2}
            value={data.excerpt}
            onChange={onChange}
            placeholder="Short summary of your blog..."
            className={cls("excerpt")}
          />
        </Field>
      </div>

      <div className="row">
        <Field
          label="Full Content :"
          error={err("content")}
          required
          col="col-md-12"
          hint="Main article content (minimum 50 characters)"
        >
          <textarea
            name="content"
            rows={12}
            value={data.content}
            onChange={onChange}
            placeholder="Write your full article here..."
            className={cls("content")}
          />
        </Field>
      </div>

      {/* =====================================================
          Section 3 : Media & Author
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Media & Author</h6>

      <div className="row">
        <Field label="Featured Image :" col="col-md-6" hint="Blog ki main image">
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
                alt="Blog"
                className="border rounded"
                style={{ maxWidth: "100%", maxHeight: "150px" }}
              />
            </div>
          )}
        </Field>

        <Field label="Author Image :" col="col-md-6" hint="Author ki photo">
          <input
            type="file"
            name="authorImage"
            accept="image/*"
            className="form-control mt-2"
            onChange={onChange}
          />
          {data.authorImage && (
            <div className="mt-2">
              <img
                src={`/assets/images/${data.authorImage}`}
                alt="Author"
                width="60"
                height="60"
                className="rounded-circle border"
              />
            </div>
          )}
        </Field>
      </div>

      <div className="row">
        <Field label="Author Name :" error={err("author")} required>
          <select
            name="author"
            value={data.author}
            onChange={onChange}
            className={cls("author")}
          >
            <Options list={AUTHORS} placeholder="Select Author" />
          </select>
        </Field>

        <Field label="Read Time :" hint="e.g. 5 min read">
          <input
            type="text"
            name="readTime"
            value={data.readTime}
            onChange={onChange}
            placeholder="5 min read"
            className="form-control mt-2"
          />
        </Field>

        <Field label="Publish Date :" hint="Kab publish karna hai">
          <input
            type="date"
            name="publishedAt"
            value={data.publishedAt ? data.publishedAt.split("T")[0] : ""}
            onChange={onChange}
            className="form-control mt-2"
          />
        </Field>
      </div>

      <div className="row">
        <Field
          label="Tags :"
          col="col-md-12"
          hint="Comma separated — e.g. makhana, health, nutrition"
        >
          <input
            type="text"
            name="tags"
            value={data.tags}
            onChange={onChange}
            placeholder="makhana, health benefits, weight loss"
            className="form-control mt-2"
          />
        </Field>
      </div>

      {/* =====================================================
          Section 4 : Settings
          ===================================================== */}
      <h6 className="fw-bold mt-3 mb-3">Settings</h6>

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
      </div>

      {/* =====================================================
          Section 5 : SEO
          ===================================================== */}
      <h6 className="fw-bold mt-4 mb-3">SEO (Search Engine Optimization)</h6>

      <div className="row">
        <Field
          label="Meta Title :"
          error={err("metaTitle")}
          hint={`${data.metaTitle.length}/60 characters`}
          col="col-md-6"
        >
          <input
            type="text"
            name="metaTitle"
            value={data.metaTitle}
            onChange={onChange}
            placeholder="SEO title for Google"
            className={cls("metaTitle")}
          />
        </Field>

        <Field
          label="Meta Keywords :"
          hint="Comma separated"
          col="col-md-6"
        >
          <input
            type="text"
            name="metaKeywords"
            value={data.metaKeywords}
            onChange={onChange}
            placeholder="makhana, fox nuts, health"
            className="form-control mt-2"
          />
        </Field>
      </div>

      <div className="row">
        <Field
          label="Meta Description :"
          error={err("metaDescription")}
          hint={`${data.metaDescription.length}/160 characters`}
          col="col-md-12"
        >
          <textarea
            name="metaDescription"
            rows={3}
            value={data.metaDescription}
            onChange={onChange}
            placeholder="Short description for Google search"
            className={cls("metaDescription")}
          />
        </Field>
      </div>
    </>
  );
}