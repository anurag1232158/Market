"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../Sidebar/Footer/page";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import Pagination from "../AOS/Pagination";
import { Customer, CUSTOMER_TYPES } from "./CustomerFields";

function AdminCustomerList() {
  const [items, setItems] = useState<Customer[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/customer")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.customer || [];
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
    const text = `${c?.name || ""} ${c?.number || ""} ${c?.email || ""} ${c?.city || ""}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchType = typeFilter ? c?.type === typeFilter : true;
    return matchSearch && matchType;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentContent = filtered.slice(indexOfFirst, indexOfLast);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this customer?")) return;
    const res = await fetch(`/api/customer?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("✅ Deleted!");
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const typeBadge = (type?: string) => {
    const map: any = {
      Retail: "bg-primary",
      Wholesale: "bg-success",
      Distributor: "bg-info text-dark",
      Retailer: "bg-warning text-dark",
      Exporter: "bg-danger",
    };
    return map[type || ""] || "bg-secondary";
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
                    Customers : {filtered.length}
                    <Link href="/AdminCustomer/Add" className="mx-2">
                      <i className="fa fa-plus fw-bold mx-2 text-white"></i>
                    </Link>
                  </h5>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-2">
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
                        value={typeFilter}
                        onChange={(e) => {
                          setTypeFilter(e.target.value);
                          setCurrentPage(0);
                        }}
                      >
                        <option value="">All Types</option>
                        {CUSTOMER_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
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
                            <th className="text-dark">Image</th>
                            <th className="text-dark">Name</th>
                            <th className="text-dark">Phone</th>
                            <th className="text-dark">City</th>
                            <th className="text-dark">Type</th>
                            <th className="text-dark">Orders</th>
                            <th className="text-dark">Spent</th>
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
                                {item.image ? (
                                  <img
                                    src={`/assets/images/${item.image}`}
                                    alt=""
                                    width="40"
                                    height="40"
                                    className="rounded-circle border"
                                  />
                                ) : (
                                  <i className="fa fa-user-circle" style={{ fontSize: "32px", color: "#aaa" }}></i>
                                )}
                              </td>
                              <td className="text-start">
                                <strong>{item.name || "-"}</strong>
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
                              <td>{item.city || "-"}</td>
                              <td>
                                <span className={`badge ${typeBadge(item.type)}`}>
                                  {item.type || "-"}
                                </span>
                              </td>
                              <td>{item.totalOrders || 0}</td>
                              <td>₹{item.totalSpent || 0}</td>
                              <td>
                                <span className={`badge ${item.status === "Active" ? "bg-success" : "bg-danger"}`}>
                                  {item.status || "Active"}
                                </span>
                              </td>
                              <td>
                                <Link href={`/AdminCustomer/View?id=${item.id}`} className="btn btn-info btn-sm">
                                  <i className="fa fa-eye"></i>
                                </Link>
                              </td>
                              <td>
                                <Link href={`/AdminCustomer/Update?id=${item.id}`} className="btn btn-warning btn-sm me-2">
                                  <i className="fa fa-edit"></i>
                                </Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          )) : (
                            <tr><td colSpan={11} className="text-center">No customer found</td></tr>
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
export default AdminCustomerList;