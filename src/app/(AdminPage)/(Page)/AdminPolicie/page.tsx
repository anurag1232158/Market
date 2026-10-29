"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../Sidebar/Footer/Footer";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import Pagination from "../AOS/Pagination";
import { Policy, POLICY_TYPES, STATUSES } from "./PolicyFields";

function AdminPolicyList() {
  const [items, setItems] = useState<Policy[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/policy")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.policy || [];
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

  const filtered = items.filter((p) => {
    const text = `${p?.title || ""} ${p?.type || ""} ${p?.summary || ""}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchType = typeFilter ? p?.type === typeFilter : true;
    const matchStatus = statusFilter ? p?.status === statusFilter : true;
    return matchSearch && matchType && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentContent = filtered.slice(indexOfFirst, indexOfLast);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this policy?")) return;
    const res = await fetch(`/api/policy?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("✅ Deleted!");
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const statusBadge = (s?: string) => {
    const map: any = {
      Active: "bg-success",
      Inactive: "bg-secondary",
      Draft: "bg-warning text-dark",
    };
    return map[s || ""] || "bg-secondary";
  };

  const typeIcon = (t?: string) => {
    const map: any = {
      Privacy: "fa-user-shield",
      Terms: "fa-file-contract",
      Refund: "fa-undo",
      Shipping: "fa-truck",
      Return: "fa-exchange-alt",
      Cancellation: "fa-times-circle",
      Disclaimer: "fa-exclamation-triangle",
      Cookie: "fa-cookie-bite",
      Payment: "fa-credit-card",
      FAQ: "fa-question-circle",
      About: "fa-info-circle",
      Contact: "fa-phone",
      Warranty: "fa-shield-alt",
      Copyright: "fa-copyright",
      GDPR: "fa-lock",
    };
    return map[t || ""] || "fa-file";
  };

  const shortText = (text?: string, limit = 60) => {
    const t = text || "";
    return t.length > limit ? t.slice(0, limit) + "..." : t || "-";
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
                    Legal Policies : {filtered.length}
                    <Link href="/AdminPolicie/Add" className="mx-2">
                      <i className="fa fa-plus fw-bold mx-2 text-white"></i>
                    </Link>
                  </h5>

                  <div className="row mb-3">
                    <div className="col-md-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search policy..."
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
                        value={typeFilter}
                        onChange={(e) => {
                          setTypeFilter(e.target.value);
                          setCurrentPage(0);
                        }}
                      >
                        <option value="">All Types</option>
                        {POLICY_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
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
                            <th className="text-dark">Icon</th>
                            <th className="text-dark">Title</th>
                            <th className="text-dark">Type</th>
                            <th className="text-dark">Version</th>
                            <th className="text-dark">Effective</th>
                            <th className="text-dark">Footer</th>
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
                                <i
                                  className={`fa ${typeIcon(item.type)} fa-lg text-primary`}
                                ></i>
                              </td>
                              <td className="text-start">
                                <strong>{item.title || "-"}</strong>
                                <small className="d-block text-muted">
                                  {shortText(item.summary)}
                                </small>
                              </td>
                              <td>
                                <span className="badge bg-info text-dark">
                                  {item.type || "-"}
                                </span>
                              </td>
                              <td>
                                <code className="bg-light p-1 rounded">
                                  v{item.version || "1.0"}
                                </code>
                              </td>
                              <td>
                                {item.effectiveDate
                                  ? item.effectiveDate.split("T")[0]
                                  : "-"}
                              </td>
                              <td>
                                {item.showOnFooter === "Yes" ? (
                                  <span className="badge bg-success">Yes</span>
                                ) : (
                                  <span className="badge bg-secondary">No</span>
                                )}
                              </td>
                              <td>{item.order || 0}</td>
                              <td>
                                <span className={`badge ${statusBadge(item.status)}`}>
                                  {item.status || "Active"}
                                </span>
                              </td>
                              <td>
                                <Link href={`/AdminPolicie/View?id=${item.id}`} className="btn btn-info btn-sm">
                                  <i className="fa fa-eye"></i>
                                </Link>
                              </td>
                              <td>
                                <Link href={`/AdminPolicie/Update?id=${item.id}`} className="btn btn-warning btn-sm me-2">
                                  <i className="fa fa-edit"></i>
                                </Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          )) : (
                            <tr><td colSpan={11} className="text-center">No policy found</td></tr>
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
export default AdminPolicyList;