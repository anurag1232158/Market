"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../Sidebar/Footer/Footer";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import Pagination from "../AOS/Pagination";
import { Banner, POSITIONS } from "./BannerFields";

function AdminBannerList() {
  const [items, setItems] = useState<Banner[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/banner")
      .then((res) => res.json())
      .then((data) => setItems(data.banner || data || []))
      .catch((err) => console.error(err));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const filtered = items.filter((b) => {
    const text = `${b.title} ${b.subtitle} ${b.position}`.toLowerCase();
    return text.includes(search.toLowerCase()) &&
           (positionFilter ? b.position === positionFilter : true);
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentContent = filtered.slice(indexOfFirst, indexOfLast);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this banner?")) return;
    const res = await fetch(`/api/banner?id=${id}`, { method: "DELETE" });
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
              <div className="card">
                <div className="card-body bg-grays1">
                  <h5 className="bg-gradient text-center p-2 fw-bold mb-4">
                    Banners : {filtered.length}
                    <Link href="/AdminBanner/Add" className="mx-2">
                      <i className="fa fa-plus fw-bold mx-2 text-white"></i>
                    </Link>
                  </h5>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search banner..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(0); }}
                      />
                    </div>
                    <div className="col-md-4 mb-2">
                      <select
                        className="form-control"
                        value={positionFilter}
                        onChange={(e) => { setPositionFilter(e.target.value); setCurrentPage(0); }}
                      >
                        <option value="">All Positions</option>
                        {POSITIONS.map((p) => (
                          <option key={p} value={p}>{p}</option>
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
                          <th className="text-dark">Position</th>
                          <th className="text-dark">Button</th>
                          <th className="text-dark">Order</th>
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
                                  style={{ maxWidth: "80px", maxHeight: "40px" }}
                                  className="border rounded"
                                />
                              )}
                            </td>
                            <td className="text-start">
                              {item.title.length > 25
                                ? item.title.slice(0, 25) + "..."
                                : item.title}
                            </td>
                            <td>
                              <span className="badge bg-info text-dark">{item.position}</span>
                            </td>
                            <td>{item.buttonText || "-"}</td>
                            <td>{item.order}</td>
                            <td>
                              <span className={`badge ${item.status === "Active" ? "bg-success" : "bg-secondary"}`}>
                                {item.status}
                              </span>
                            </td>
                            <td>
                              <Link href={`/AdminBanner/View?id=${item.id}`} className="btn btn-info btn-sm">
                                <i className="fa fa-eye"></i>
                              </Link>
                            </td>
                            <td>
                              <Link href={`/AdminBanner/Update?id=${item.id}`} className="btn btn-warning btn-sm me-2">
                                <i className="fa fa-edit"></i>
                              </Link>
                              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        )) : (
                          <tr><td colSpan={9} className="text-center">No banner found</td></tr>
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
export default AdminBannerList;