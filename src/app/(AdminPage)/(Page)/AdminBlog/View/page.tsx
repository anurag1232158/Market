"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/page";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import { Blog, emptyBlog } from "../BlogFields";

function ViewContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Blog>(emptyBlog);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`/api/blog?id=${id}`)
      .then((res) => res.json())
      .then((result) => { setData({ ...emptyBlog, ...result }); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const val = (v?: string) => (v && v !== "" ? v : "-");
  const fmt = (v?: string) => (v ? v.split("T")[0] : "-");

  const rows: [string, string][] = [
    ["Title", val(data.title)],
    ["Slug", val(data.slug)],
    ["Category", val(data.category)],
    ["Author", val(data.author)],
    ["Read Time", val(data.readTime)],
    ["Views", val(data.views)],
    ["Tags", val(data.tags)],
    ["Featured", val(data.isFeatured)],
    ["Order", val(data.order)],
    ["Status", val(data.status)],
    ["Published At", fmt(data.publishedAt)],
    ["Meta Title", val(data.metaTitle)],
    ["Meta Keywords", val(data.metaKeywords)],
    ["Created At", fmt(data.createdAt)],
    ["Updated At", fmt(data.updatedAt)],
  ];

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!id) return <div className="alert alert-danger m-3">❌ No ID provided.</div>;

  return (
    <>
      <ASO />
      <div className="wrapper">
        <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
          <PageNavbar toggleSidebar={toggleSidebar} />
          <section className="mb-5 py-5">
            <div className="container-fluid px-4">
              <div className="border p-3 mb-4 bg-gradient text-center">
                <h5 className="mb-0 fw-bold text-white">
                  View Blog Post
                  <Link href="/AdminBlog"><i className="fa fa-arrow-left ms-2 text-white"></i></Link>
                </h5>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  {/* Featured Image */}
                  {data.image && (
                    <div className="text-center mb-4">
                      <img
                        src={`/assets/images/${data.image}`}
                        alt="Blog"
                        className="img-fluid border rounded"
                        style={{ maxHeight: "350px" }}
                      />
                    </div>
                  )}

                  {/* Header */}
                  <div className="text-center mb-4">
                    <span className="badge bg-info text-dark">{data.category}</span>
                    {data.isFeatured === "Yes" && (
                      <span className="badge bg-danger ms-2">Featured</span>
                    )}
                    <h2 className="mt-2">{val(data.title)}</h2>
                    <p className="text-muted">{val(data.excerpt)}</p>

                    <div className="d-flex justify-content-center align-items-center gap-3">
                      {data.authorImage && (
                        <img
                          src={`/assets/images/${data.authorImage}`}
                          alt="Author"
                          width="40"
                          height="40"
                          className="rounded-circle border"
                        />
                      )}
                      <span>
                        <i className="fa fa-user"></i> {val(data.author)}
                      </span>
                      <span>
                        <i className="fa fa-clock"></i> {val(data.readTime)}
                      </span>
                      <span>
                        <i className="fa fa-eye"></i> {val(data.views)} views
                      </span>
                    </div>
                  </div>

                  {/* Meta info */}
                  <table className="table table-bordered">
                    <tbody>
                      {rows.map(([l, v]) => (
                        <tr key={l}>
                          <th className="bg-gradient text-dark" style={{ width: "25%" }}>{l}</th>
                          <td>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Content */}
                  <div className="mt-3">
                    <h5 className="fw-bold">Full Content</h5>
                    <div
                      className="border rounded p-3"
                      style={{ whiteSpace: "pre-line", background: "#f9f9f9" }}
                    >
                      {val(data.content)}
                    </div>
                  </div>

                  {/* Meta Description */}
                  <div className="mt-3">
                    <h6 className="fw-bold">Meta Description</h6>
                    <p style={{ whiteSpace: "pre-line" }}>{val(data.metaDescription)}</p>
                  </div>

                  <div className="btn-group w-100 py-4">
                    <button onClick={() => router.push("/AdminBlog")} className="btn btn-primary text-light w-50">Back</button>
                    <Link href={`/AdminBlog/Update?id=${id}`} className="btn btn-warning text-dark w-50">Edit Blog</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <PageFooter />
        </div>
      </div>
    </>
  );
}

export default function AdminViewBlog() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}