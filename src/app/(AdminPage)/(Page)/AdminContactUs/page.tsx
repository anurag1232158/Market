"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../Sidebar/Footer/Footer";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import Pagination from "../AOS/Pagination";
import { Contact, ROLES, STATUSES } from "./ContactFields";

function AdminContactList() {
  const [items, setItems] = useState<Contact[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    setLoading(true);
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        /* ⭐ Safe: Array check */
        const list = Array.isArray(data) ? data : data?.contact || [];
        setItems(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setItems([]);
        setLoading(false);
      });
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const filtered = items.filter((c) => {
    const text = `${c?.name || ""} ${c?.number || ""} ${c?.email || ""} ${c?.company || ""} ${c?.city || ""}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchRole = roleFilter ? c?.role === roleFilter : true;
    const matchStatus = statusFilter ? c?.status === statusFilter : true;
    let matchTab = true;
    if (activeTab !== "All") matchTab = c?.role === activeTab;
    return matchSearch && matchRole && matchStatus && matchTab;});
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentContent = filtered.slice(indexOfFirst, indexOfLast);


  const handleDelete = async (id: string, source: string) => {
    if (!confirm("Delete this contact?")) return;
    try {
      const res = await fetch(`/api/contact?id=${id}&source=${source}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("✅ Deleted!");
        setItems((prev) => prev.filter((i) => !(i.id === id && i._source === source)));
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  /* ---------- Badges ---------- */
  const roleBadge = (r?: string) => {
    const map: any = {
      User: "bg-primary",
      Admin: "bg-danger",
      Report: "bg-warning text-dark",
      Wholesale: "bg-info text-dark",
    };
    return map[r || ""] || "bg-secondary";
  };

  const statusBadge = (s?: string) => {
    const map: any = {
      Active: "bg-success",
      Blocked: "bg-danger",
      Inactive: "bg-secondary",
    };
    return map[s || ""] || "bg-secondary";
  };

  const roleIcon = (r?: string) => {
    const map: any = {
      User: "fa-user",
      Admin: "fa-user-shield",
      Report: "fa-chart-bar",
      Wholesale: "fa-boxes",
    };
    return map[r || ""] || "fa-user";
  };

  /* ---------- Stats ---------- */
  const stats = {
    total: items.length,
    user: items.filter(i => i.role === "User").length,
    admin: items.filter(i => i.role === "Admin").length,
    report: items.filter(i => i.role === "Report").length,
    wholesale: items.filter(i => i.role === "Wholesale").length,
    active: items.filter(i => i.status === "Active").length,
    blocked: items.filter(i => i.status === "Blocked").length,
  };

  /* ---------- Tabs ---------- */
  const tabs = [
    { name: "All", count: stats.total, color: "primary" },
    { name: "User", count: stats.user, color: "success" },
    { name: "Admin", count: stats.admin, color: "danger" },
    { name: "Report", count: stats.report, color: "warning" },
    { name: "Wholesale", count: stats.wholesale, color: "info" },
  ];

  return (
    <>
      <ASO />
      <div className="wrapper">
        <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
          <PageNavbar toggleSidebar={toggleSidebar} />
          <section className="mb-5">
            <div className="container-fluid px-4">
              {/* =====================================================
                  Stats Cards
                  ===================================================== */}
              <div className="row mb-3">
                <div className="col-md-3 mb-2">
                  <div className="card bg-primary text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">
                        <i className="fa fa-users me-1"></i> Total
                      </h6>
                      <h3 className="mb-0">{stats.total}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="card bg-success text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">
                        <i className="fa fa-check-circle me-1"></i> Active
                      </h6>
                      <h3 className="mb-0">{stats.active}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="card bg-danger text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">
                        <i className="fa fa-ban me-1"></i> Blocked
                      </h6>
                      <h3 className="mb-0">{stats.blocked}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="card bg-info text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">
                        <i className="fa fa-boxes me-1"></i> Wholesale
                      </h6>
                      <h3 className="mb-0">{stats.wholesale}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  <h5 className="bg-gradient text-center p-2 fw-bold mb-4">
                    Contact Us : {filtered.length}
                    <Link href="/AdminContactUs/Add" className="mx-2">
                      <i className="fa fa-plus fw-bold mx-2 text-white"></i>
                    </Link>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={fetchContacts}
                      title="Refresh"
                    >
                      <i className="fa fa-sync"></i>
                    </button>
                  </h5>

                  {/* =====================================================
                      Tabs
                      ===================================================== */}
                  <ul className="nav nav-tabs mb-3">
                    {tabs.map((t) => (
                      <li className="nav-item" key={t.name}>
                        <button
                          type="button"
                          className={`nav-link ${activeTab === t.name ? "active fw-bold" : ""}`}
                          onClick={() => {
                            setActiveTab(t.name);
                            setCurrentPage(0);
                            setRoleFilter("");
                          }}
                        >
                          {t.name}{" "}
                          <span className={`badge bg-${t.color}`}>{t.count}</span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* =====================================================
                      Search + Filters
                      ===================================================== */}
                  <div className="row mb-3">
                    <div className="col-md-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name, phone, email, city..."
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
                        value={roleFilter}
                        onChange={(e) => {
                          setRoleFilter(e.target.value);
                          setActiveTab("All");
                          setCurrentPage(0);
                        }}
                      >
                        <option value="">All Roles</option>
                        {ROLES.map((r) => (
                          <option key={r} value={r}>{r}</option>
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

                  {/* =====================================================
                      Table
                      ===================================================== */}
                  {loading ? (
                    <div className="text-center p-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-2 text-muted">Loading contacts...</p>
                    </div>
                  ) : (
                    <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
                      <table className="table table-bordered table-hover">
                        <thead className="sticky-top bg-light">
                          <tr className="text-center bg-gradient">
                            <th className="text-dark">#</th>
                            <th className="text-dark">Photo</th>
                            <th className="text-dark">Name</th>
                            <th className="text-dark">Phone</th>
                            <th className="text-dark">Email</th>
                            <th className="text-dark">Role</th>
                            <th className="text-dark">City</th>
                            <th className="text-dark">Status</th>
                            <th className="text-dark">View</th>
                            <th className="text-dark">Edit & Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentContent.length > 0 ? (
                            currentContent.map((item, idx) => (
                              <tr key={`${item._source}-${item.id}-${idx}`} className="text-center">
                                <td>{indexOfFirst + idx + 1}</td>
                                <td>
                                  {item.image && !item.image.startsWith("blob:") ? (
                                    <img
                                      src={
                                        item.image.startsWith("http")
                                          ? item.image
                                          : `/assets/images/${item.image}`
                                      }
                                      alt=""
                                      width="40"
                                      height="40"
                                      className="rounded-circle border"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                      }}
                                    />
                                  ) : (
                                    <i
                                      className="fa fa-user-circle"
                                      style={{ fontSize: "32px", color: "#aaa" }}
                                    ></i>
                                  )}
                                </td>
                                <td className="text-start">
                                  <strong>{item.name || "Unnamed"}</strong>
                                  {item.company && (
                                    <small className="d-block text-muted">{item.company}</small>
                                  )}
                                </td>
                                <td>
                                  {item.number || "-"}
                                  {item.altNumber && (
                                    <small className="d-block text-muted">{item.altNumber}</small>
                                  )}
                                </td>
                                <td>{item.email || "-"}</td>
                                <td>
                                  <span className={`badge ${roleBadge(item.role)}`}>
                                    <i className={`fa ${roleIcon(item.role)} me-1`}></i>
                                    {item.role || "-"}
                                  </span>
                                </td>
                                <td>{item.city || "-"}</td>
                                <td>
                                  <span className={`badge ${statusBadge(item.status)}`}>
                                    {item.status || "Active"}
                                  </span>
                                </td>
                                <td>
                                  <Link
                                    href={`/AdminContactUs/View?id=${item.id}&source=${item._source || "contact"}`}
                                    className="btn btn-info btn-sm"
                                  >
                                    <i className="fa fa-eye"></i>
                                  </Link>
                                </td>
                                <td>
                                  <Link
                                    href={`/AdminContactUs/Update?id=${item.id}&source=${item._source || "contact"}`}
                                    className="btn btn-warning btn-sm me-2"
                                  >
                                    <i className="fa fa-edit"></i>
                                  </Link>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(item.id, item._source || "contact")}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={10} className="text-center py-4">
                                <i className="fa fa-inbox fa-3x text-muted mb-2 d-block"></i>
                                <p className="text-muted mb-0">
                                  No contact found. Try refreshing or add a new one.
                                </p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* =====================================================
                      Pagination
                      ===================================================== */}
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
export default AdminContactList;