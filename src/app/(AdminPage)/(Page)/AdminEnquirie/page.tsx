"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../Sidebar/Footer/Footer";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import Pagination from "../AOS/Pagination";
import { Enquiry, ENQUIRY_TYPES, STATUSES } from "./EnquiryFields";

function AdminEnquiryList() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/enquiry")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.enquiry || [];
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

  const filtered = items.filter((e) => {
    const text = `${e?.name || ""} ${e?.number || ""} ${e?.subject || ""} ${e?.message || ""}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchType = typeFilter ? e?.type === typeFilter : true;
    const matchStatus = statusFilter ? e?.status === statusFilter : true;
    return matchSearch && matchType && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentContent = filtered.slice(indexOfFirst, indexOfLast);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    const res = await fetch(`/api/enquiry?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("✅ Deleted!");
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const priorityBadge = (p?: string) => {
    const map: any = {
      Low: "bg-secondary",
      Medium: "bg-info text-dark",
      High: "bg-warning text-dark",
      Urgent: "bg-danger",
    };
    return map[p || ""] || "bg-secondary";
  };

  const statusBadge = (s?: string) => {
    const map: any = {
      New: "bg-primary",
      "In Progress": "bg-warning text-dark",
      Replied: "bg-success",
      "Follow Up": "bg-info text-dark",
      Closed: "bg-secondary",
      Spam: "bg-dark",
    };
    return map[s || ""] || "bg-secondary";
  };

  const shortText = (text?: string, limit = 40) => {
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
                    Enquirie : {filtered.length}
                    <Link href="/AdminEnquirie/Add" className="mx-2">
                      <i className="fa fa-plus fw-bold mx-2 text-white"></i>
                    </Link>
                  </h5>

                  <div className="row mb-3">
                    <div className="col-md-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name, phone, subject..."
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
                        {ENQUIRY_TYPES.map((t) => (
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
                            <th className="text-dark">Name</th>
                            <th className="text-dark">Phone</th>
                            <th className="text-dark">Type</th>
                            <th className="text-dark">Subject</th>
                            <th className="text-dark">Priority</th>
                            <th className="text-dark">Status</th>
                            <th className="text-dark">Assigned</th>
                            <th className="text-dark">View</th>
                            <th className="text-dark">Edit & Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentContent.length > 0 ? currentContent.map((item, idx) => (
                            <tr key={item.id} className="text-center">
                              <td>{indexOfFirst + idx + 1}</td>
                              <td className="text-start">
                                <strong>{item.name || "-"}</strong>
                                {item.email && <small className="d-block text-muted">{item.email}</small>}
                              </td>
                              <td>{item.number || "-"}</td>
                              <td>
                                <span className="badge bg-info text-dark">{item.type || "-"}</span>
                              </td>
                              <td className="text-start">{shortText(item.subject)}</td>
                              <td>
                                <span className={`badge ${priorityBadge(item.priority)}`}>
                                  {item.priority || "Medium"}
                                </span>
                              </td>
                              <td>
                                <span className={`badge ${statusBadge(item.status)}`}>
                                  {item.status || "New"}
                                </span>
                              </td>
                              <td>{item.assignedTo || "Unassigned"}</td>
                              <td>
                                <Link href={`/AdminEnquirie/View?id=${item.id}`} className="btn btn-info btn-sm">
                                  <i className="fa fa-eye"></i>
                                </Link>
                              </td>
                              <td>
                                <Link href={`/AdminEnquirie/Update?id=${item.id}`} className="btn btn-warning btn-sm me-2">
                                  <i className="fa fa-edit"></i>
                                </Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          )) : (
                            <tr><td colSpan={10} className="text-center">No enquiry found</td></tr>
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
export default AdminEnquiryList;