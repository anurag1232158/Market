"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../Sidebar/Footer/page";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import Pagination from "../AOS/Pagination";
import { Inventory, CATEGORIES, STATUSES } from "./InventoryFields";

function AdminInventoryList() {
  const [items, setItems] = useState<Inventory[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/inventory")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.inventory || [];
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

  const filtered = items.filter((i) => {
    const text = `${i?.productName || ""} ${i?.sku || ""} ${i?.batchNo || ""}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchCategory = categoryFilter ? i?.category === categoryFilter : true;
    const matchStatus = statusFilter ? i?.status === statusFilter : true;
    return matchSearch && matchCategory && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentContent = filtered.slice(indexOfFirst, indexOfLast);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inventory item?")) return;
    const res = await fetch(`/api/inventory?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("✅ Deleted!");
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const statusBadge = (s?: string) => {
    const map: any = {
      "In Stock": "bg-success",
      "Low Stock": "bg-warning text-dark",
      "Out of Stock": "bg-danger",
      Expired: "bg-dark",
      Damaged: "bg-secondary",
    };
    return map[s || ""] || "bg-secondary";
  };

  /* Stats */
  const stats = {
    total: items.length,
    inStock: items.filter(i => i.status === "In Stock").length,
    lowStock: items.filter(i => i.status === "Low Stock").length,
    outOfStock: items.filter(i => i.status === "Out of Stock").length,
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
              {/* Stats Cards */}
              <div className="row my-3">
                <div className="col-md-3 mb-2">
                  <div className="card bg-primary text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">Total Items</h6>
                      <h3 className="mb-0">{stats.total}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="card bg-success text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">In Stock</h6>
                      <h3 className="mb-0">{stats.inStock}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="card bg-warning text-dark">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">Low Stock</h6>
                      <h3 className="mb-0">{stats.lowStock}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="card bg-danger text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">Out of Stock</h6>
                      <h3 className="mb-0">{stats.outOfStock}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  <h5 className="bg-gradient text-center p-2 fw-bold mb-4">
                    Inventory : {filtered.length}
                    <Link href="/AdminInventory/Add" className="mx-2">
                      <i className="fa fa-plus fw-bold mx-2 text-white"></i>
                    </Link>
                  </h5>

                  <div className="row mb-3">
                    <div className="col-md-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by product, SKU, batch..."
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
                        value={categoryFilter}
                        onChange={(e) => {
                          setCategoryFilter(e.target.value);
                          setCurrentPage(0);
                        }}
                      >
                        <option value="">All Categories</option>
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
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
                            <th className="text-dark">Product</th>
                            <th className="text-dark">SKU</th>
                            <th className="text-dark">Category</th>
                            <th className="text-dark">Warehouse</th>
                            <th className="text-dark">Current Stock</th>
                            <th className="text-dark">Unit</th>
                            <th className="text-dark">Selling ₹</th>
                            <th className="text-dark">Status</th>
                            <th className="text-dark">View</th>
                            <th className="text-dark">Edit & Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentContent.length > 0 ? currentContent.map((item, idx) => (
                            <tr key={item.id} className="text-center">
                              <td>{indexOfFirst + idx + 1}</td>
                              <td className="text-start">
                                <strong>{item.productName || "-"}</strong>
                                {item.batchNo && (
                                  <small className="d-block text-muted">
                                    Batch: {item.batchNo}
                                  </small>
                                )}
                              </td>
                              <td><code>{item.sku || "-"}</code></td>
                              <td>
                                <span className="badge bg-info text-dark">
                                  {item.category || "-"}
                                </span>
                              </td>
                              <td>{item.warehouse || "-"}</td>
                              <td>
                                <strong>{item.currentStock || 0}</strong>
                                <small className="d-block text-muted">
                                  Reorder: {item.reorderLevel || 0}
                                </small>
                              </td>
                              <td>{item.unit || "-"}</td>
                              <td>₹{item.sellingPrice || 0}</td>
                              <td>
                                <span className={`badge ${statusBadge(item.status)}`}>
                                  {item.status || "In Stock"}
                                </span>
                              </td>
                              <td>
                                <Link href={`/AdminInventory/View?id=${item.id}`} className="btn btn-info btn-sm">
                                  <i className="fa fa-eye"></i>
                                </Link>
                              </td>
                              <td>
                                <Link href={`/AdminInventory/Update?id=${item.id}`} className="btn btn-warning btn-sm me-2">
                                  <i className="fa fa-edit"></i>
                                </Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          )) : (
                            <tr><td colSpan={11} className="text-center">No inventory found</td></tr>
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
export default AdminInventoryList;