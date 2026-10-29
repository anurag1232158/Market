"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../Sidebar/Footer/Footer";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import Pagination from "../AOS/Pagination";
import { Coupon, STATUSES } from "./CouponFields";

function AdminCouponList() {
  const [items, setItems] = useState<Coupon[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/coupon")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.coupon || [];
        setItems(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setItems([]);
        setLoading(false);
      });
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const filtered = items.filter((c) => {
    const text = `${c?.code || ""} ${c?.title || ""}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchStatus = statusFilter ? c?.status === statusFilter : true;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentContent = filtered.slice(indexOfFirst, indexOfLast);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this coupon?")) return;
    const res = await fetch(`/api/coupon?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("✅ Deleted!");
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const statusBadge = (s?: string) => {
    const map: any = {
      Active: "bg-success",
      Inactive: "bg-secondary",
      Expired: "bg-danger",
    };
    return map[s || ""] || "bg-secondary";
  };

  /* Check if expired */
  const isExpired = (endDate?: string) => {
    if (!endDate) return false;
    return new Date(endDate.split("T")[0]) < new Date();
  };

  const discountText = (c: Coupon) => {
    if (c.type === "Percentage") return `${c.value}% OFF`;
    return `₹${c.value} OFF`;
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
                    Coupons : {filtered.length}
                    <Link href="/AdminCoupon/Add" className="mx-2">
                      <i className="fa fa-plus fw-bold mx-2 text-white"></i>
                    </Link>
                  </h5>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by code or title..."
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
                        value={statusFilter}
                        onChange={(e) => {
                          setStatusFilter(e.target.value);
                          setCurrentPage(0);
                        }}
                      >
                        <option value="">All Statuses</option>
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {loading ? (
                    <div className="text-center p-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="table-responsive" style={{ maxHeight: "450px", overflowY: "auto" }}>
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr className="text-center bg-gradient">
                            <th className="text-dark">#</th>
                            <th className="text-dark">Code</th>
                            <th className="text-dark">Title</th>
                            <th className="text-dark">Discount</th>
                            <th className="text-dark">Min Order</th>
                            <th className="text-dark">Usage</th>
                            <th className="text-dark">Valid Till</th>
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
                                <code className="bg-light p-1 rounded fw-bold">
                                  {item.code || "-"}
                                </code>
                                {item.isFeatured === "Yes" && (
                                  <span className="badge bg-danger ms-1">★</span>
                                )}
                              </td>
                              <td className="text-start">
                                {item.title || "-"}
                                <small className="d-block text-muted">
                                  {item.applicableTo === "All" ? "All Products" : item.applicableValue}
                                </small>
                              </td>
                              <td>
                                <span className="badge bg-primary fs-6">
                                  {discountText(item)}
                                </span>
                              </td>
                              <td>₹{item.minOrder || 0}</td>
                              <td>
                                <div className="progress" style={{ height: "8px" }}>
                                  <div
                                    className="progress-bar bg-success"
                                    style={{
                                      width: `${Math.min(100, (Number(item.usedCount) / Number(item.usageLimit || 1)) * 100)}%`,
                                    }}
                                  ></div>
                                </div>
                                <small>
                                  {item.usedCount || 0} / {item.usageLimit || 0}
                                </small>
                              </td>
                              <td>
                                {item.endDate ? item.endDate.split("T")[0] : "-"}
                                {isExpired(item.endDate) && (
                                  <span className="badge bg-danger ms-1">Expired</span>
                                )}
                              </td>
                              <td>
                                <span className={`badge ${statusBadge(item.status)}`}>
                                  {item.status || "Active"}
                                </span>
                              </td>
                              <td>
                                <Link href={`/AdminCoupon/View?id=${item.id}`} className="btn btn-info btn-sm">
                                  <i className="fa fa-eye"></i>
                                </Link>
                              </td>
                              <td>
                                <Link href={`/AdminCoupon/Update?id=${item.id}`} className="btn btn-warning btn-sm me-2">
                                  <i className="fa fa-edit"></i>
                                </Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          )) : (
                            <tr><td colSpan={10} className="text-center">No coupon found</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      handlePrevPage={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                      handleNextPage={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
                    />
                  )}
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
export default AdminCouponList;