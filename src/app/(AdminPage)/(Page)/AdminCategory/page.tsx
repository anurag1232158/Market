"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../Sidebar/Footer/page";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import Pagination from "../AOS/Pagination";
import { Category } from "./CategoryFields";

function AdminCategory() {
  const [items, setItems] = useState<Category[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setItems(data.category || data))
      .catch((err) => console.error(err));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const filtered = items.filter((c) =>
    `${c.name} ${c.slug} ${c.parent}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContent = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    const res = await fetch(`/api/category?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("✅ Deleted!");
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
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
              <div className="row">
                <div className="col-md-12 m-auto">
                  <div className="card">
                    <div className="card-body bg-grays1">
                      <h5 className="bg-gradient text-center p-2 fw-bold mb-4">
                        Makhana Categories : {filtered.length}
                        <Link href="/AdminCategory/Add" className="mx-2">
                          <i className="fa fa-plus fw-bold mx-2 text-white"></i>
                        </Link>
                      </h5>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search category..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(0); }}
                          />
                        </div>
                      </div>

                      <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <table className="table table-bordered table-hover">
                          <thead>
                            <tr className="text-center bg-gradient">
                              <th className="text-dark">#</th>
                              <th className="text-dark">Image</th>
                              <th className="text-dark">Name</th>
                              <th className="text-dark">Parent</th>
                              <th className="text-dark">Slug</th>
                              <th className="text-dark">Featured</th>
                              <th className="text-dark">Status</th>
                              <th className="text-dark">View</th>
                              <th className="text-dark">Edit & Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentContent.length > 0 ? currentContent.map((item, index) => (
                              <tr key={item.id} className="text-center">
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>
                                  {item.image && (
                                    <img src={`/assets/images/${item.image}`} alt="" style={{ maxWidth: "60px" }} />
                                  )}
                                </td>
                                <td>{item.name}</td>
                                <td>{item.parent || "—"}</td>
                                <td>{item.slug}</td>
                                <td>
                                  {item.isFeatured === "Yes" ? (
                                    <span className="badge bg-success">Yes</span>
                                  ) : (
                                    <span className="badge bg-secondary">No</span>
                                  )}
                                </td>
                                <td>
                                  <span className={`badge ${item.status === "Active" ? "bg-success" : "bg-secondary"}`}>
                                    {item.status}
                                  </span>
                                </td>
                                <td>
                                  <Link href={`/AdminCategory/View?id=${item.id}`} className="btn btn-info btn-sm">
                                    <i className="fa fa-eye"></i>
                                  </Link>
                                </td>
                                <td>
                                  <Link href={`/AdminCategory/Update?id=${item.id}`} className="btn btn-warning btn-sm me-2">
                                    <i className="fa fa-edit"></i>
                                  </Link>
                                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            )) : (
                              <tr><td colSpan={9} className="text-center">No category found</td></tr>
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
              </div>
            </div>
          </section>
          <PageFooter />
        </div>
      </div>
    </>
  );
}
export default AdminCategory;