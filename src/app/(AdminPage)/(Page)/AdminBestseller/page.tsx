// src/app/(AdminPage)/(AdminSection)/AdminBestseller/page.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../Sidebar/Footer/Footer";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import Pagination from "../AOS/Pagination";
import { Bestseller, SECTIONS } from "./BestsellerFields";

function AdminBestseller() {
  const [items, setItems] = useState<Bestseller[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const itemsPerPage = 5;

  /* ✅ Fetch Bestsellers */
  useEffect(() => {
    fetch("/api/bestseller")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.bestseller || [];
        setItems(list);
      })
      .catch((err) => console.error("Error fetching bestsellers:", err));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* Filter */
  const filtered = items.filter((a) => {
    const text = `${a.title} ${a.subtitle} ${a.section} ${a.name || ""}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchSection = sectionFilter ? a.section === sectionFilter : true;
    return matchSearch && matchSection;
  });

  /* Pagination */
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContent = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;
    try {
      const res = await fetch(`/api/bestseller?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("✅ Deleted successfully!");
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        console.error("Failed to delete:", await res.text());
      }
    } catch (err) {
      console.error("Delete failed:", err);
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
                        Bestseller Sections : {filtered.length}{" "}
                        <Link href="/AdminBestseller/Add" className="mx-2">
                          <i className="fa fa-plus fw-bold mx-2 text-white"></i>
                        </Link>
                      </h5>

                      {/* Search + Filter */}
                      <div className="row mb-3">
                        <div className="col-md-6 mb-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title, name or section..."
                            value={search}
                            onChange={(e) => {
                              setSearch(e.target.value);
                              setCurrentPage(0);
                            }}
                          />
                        </div>
                        <div className="col-md-4 mb-2">
                          <select
                            className="form-control"
                            value={sectionFilter}
                            onChange={(e) => {
                              setSectionFilter(e.target.value);
                              setCurrentPage(0);
                            }}
                          >
                            <option value="">All Sections</option>
                            {SECTIONS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="table" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <table className="table table-bordered table-hover">
                          <thead>
                            <tr className="text-center bg-gradient">
                              <th className="text-dark">#</th>
                              <th className="text-dark">Image</th>
                              <th className="text-dark">Title / Name</th>
                              <th className="text-dark">Section</th>
                              <th className="text-dark">Icon</th>
                              <th className="text-dark">Order</th>
                              <th className="text-dark">Status</th>
                              <th className="text-dark">View</th>
                              <th className="text-dark">Edit & Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentContent.length > 0 ? (
                              currentContent.map((item, index) => (
                                <tr key={item.id} className="text-center">
                                  <td>{indexOfFirstItem + index + 1}</td>
                                  <td>
                                    {(item.image || item.pic) && (
                                      <img
                                        src={`/assets/images/${item.image || item.pic}`}
                                        alt=""
                                        style={{ maxWidth: "60px" }}
                                        className="border rounded"
                                      />
                                    )}
                                  </td>
                                  <td className="text-start">
                                    <strong>{item.title || item.name}</strong>
                                    {item.name && item.title && (
                                      <small className="d-block text-muted">
                                        {item.name}
                                      </small>
                                    )}
                                  </td>
                                  <td>
                                    <span className="badge bg-info text-dark">
                                      {item.section}
                                    </span>
                                  </td>
                                  <td>
                                    {item.icon && (
                                      <i className={`fa-solid ${item.icon}`} style={{ fontSize: "18px" }}></i>
                                    )}
                                  </td>
                                  <td>{item.order}</td>
                                  <td>
                                    <span
                                      className={`badge ${
                                        item.status === "Active" ? "bg-success" : "bg-secondary"
                                      }`}
                                    >
                                      {item.status}
                                    </span>
                                  </td>
                                  <td>
                                    <Link
                                      href={`/AdminBestseller/View?id=${item.id}`}
                                      className="btn btn-info btn-sm"
                                    >
                                      <i className="fa fa-eye"></i>
                                    </Link>
                                  </td>
                                  <td>
                                    <Link
                                      href={`/AdminBestseller/Update?id=${item.id}`}
                                      className="btn btn-warning btn-sm me-2"
                                    >
                                      <i className="fa fa-edit"></i>
                                    </Link>
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => handleDelete(item.id)}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={9} className="text-center">
                                  No bestseller found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePrevPage={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                        handleNextPage={() =>
                          setCurrentPage((p) => Math.min(p + 1, totalPages - 1))
                        }
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

export default AdminBestseller;