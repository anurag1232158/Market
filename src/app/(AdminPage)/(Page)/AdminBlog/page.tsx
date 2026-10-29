"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../Sidebar/Footer/page";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import Pagination from "../AOS/Pagination";
import { Blog, BLOG_CATEGORIES } from "./BlogFields";

function AdminBlogList() {
  const [items, setItems] = useState<Blog[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setItems(data.blog || data || []))
      .catch((err) => console.error(err));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const filtered = items.filter((b) => {
    const text = `${b.title} ${b.author} ${b.tags}`.toLowerCase();
    return text.includes(search.toLowerCase()) &&
           (categoryFilter ? b.category === categoryFilter : true);
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentContent = filtered.slice(indexOfFirst, indexOfLast);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("✅ Deleted!");
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const statusBadge = (status: string) => {
    const map: { [k: string]: string } = {
      Draft: "bg-secondary",
      Published: "bg-success",
      Archived: "bg-warning text-dark",
    };
    return map[status] || "bg-secondary";
  };

  return (
    <>
      <ASO />
      <div className="wrapper">
        <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
          <PageNavbar toggleSidebar={toggleSidebar} />
          <section className="mb-5">
            <div className="container-fluid px-4">
              <div className="card">
                <div className="card-body bg-grays1">
                  <h5 className="bg-gradient text-center p-2 fw-bold mb-4">
                    Blog Posts : {filtered.length}
                    <Link href="/AdminBlog/Add" className="mx-2">
                      <i className="fa fa-plus fw-bold mx-2 text-white"></i>
                    </Link>
                  </h5>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title, author or tag..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(0); }}
                      />
                    </div>
                    <div className="col-md-4 mb-2">
                      <select
                        className="form-control"
                        value={categoryFilter}
                        onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(0); }}
                      >
                        <option value="">All Categories</option>
                        {BLOG_CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="table-responsive" style={{ maxHeight: "450px", overflowY: "auto" }}>
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr className="text-center bg-gradient">
                          <th className="text-dark">#</th>
                          <th className="text-dark">Image</th>
                          <th className="text-dark">Title</th>
                          <th className="text-dark">Category</th>
                          <th className="text-dark">Author</th>
                          <th className="text-dark">Views</th>
                          <th className="text-dark">Status</th>
                          <th className="text-dark">View</th>
                          <th className="text-dark">Edit & Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentContent.length > 0 ? currentContent.map((item, idx) => (
                          <tr key={item.id} className="text-center">
                            <td>{indexOfFirst + idx + 1}</td>
                            <td>
                              {item.image && (
                                <img
                                  src={`/assets/images/${item.image}`}
                                  alt=""
                                  style={{ maxWidth: "60px", maxHeight: "40px" }}
                                  className="border rounded"
                                />
                              )}
                            </td>
                           <td className="text-start">
                            {(item.title || "").length > 30
                             ? (item.title || "").slice(0, 30) + "..."
                              : item.title || "-"}
                            </td>
                            <td>
                              <span className="badge bg-info text-dark">{item.category}</span>
                            </td>
                            <td>{item.author}</td>
                            <td>
                              <i className="fa fa-eye text-muted"></i> {item.views || 0}
                            </td>
                            <td>
                              <span className={`badge ${statusBadge(item.status)}`}>
                                {item.status}
                              </span>
                            </td>
                            <td>
                              <Link href={`/AdminBlog/View?id=${item.id}`} className="btn btn-info btn-sm">
                                <i className="fa fa-eye"></i>
                              </Link>
                            </td>
                            <td>
                              <Link href={`/AdminBlog/Update?id=${item.id}`} className="btn btn-warning btn-sm me-2">
                                <i className="fa fa-edit"></i>
                              </Link>
                              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        )) : (
                          <tr><td colSpan={9} className="text-center">No blog post found</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePrevPage={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                    handleNextPage={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
                  />
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
export default AdminBlogList;