"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../Sidebar/Footer/Footer";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import Pagination from "../AOS/Pagination";
import { Product, CATEGORIES, calcFinalPrice } from "./ProductFields";

function AdminProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((data) => setProducts(data.product || data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const filtered = products.filter((p) => {
    const text = `${p.name} ${p.sku} ${p.flavour}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchCategory = categoryFilter ? p.category === categoryFilter : true;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContent = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/product?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("✅ Deleted successfully!");
        setProducts((prev) => prev.filter((item) => item.id !== id));
      } else {
        console.error("Failed to delete, server responded:", await res.text());
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const stockBadge = (stock: string) => {
    const s = Number(stock) || 0;
    if (s <= 0) return <span className="badge bg-danger">Out of Stock</span>;
    if (s <= 10)
      return <span className="badge bg-warning text-dark">Low : {s}</span>;
    return <span className="badge bg-success">{s}</span>;
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
                <div className="col-md-12 col-sm-12 m-auto">
                  <div className="card">
                    <div className="card-body bg-grays1">
                      <h5 className="bg-gradient text-center p-2 fw-bold mb-2">
                        Makhana Products : {filtered.length}
                        <Link href="/AdminProduct/Add" className="mx-2">
                          <i className="fa fa-plus fw-bold mx-2 text-white"></i>
                        </Link>
                      </h5>

                      {/* Search + Filter */}
                      <div className="row mb-2">
                        <div className="col-md-6 mb-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name, SKU or flavour..."
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
                              <option key={c} value={c}>
                                {c}
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
                              <th className="text-dark">Name</th>
                              <th className="text-dark">Category</th>
                              <th className="text-dark">Weight</th>
                              <th className="text-dark">Price</th>
                              <th className="text-dark">Discount</th>
                              <th className="text-dark">Final Price</th>
                              <th className="text-dark">Stock</th>
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
                                    {item.pic && (
                                      <Link
                                        href={`/assets/images/${item.pic}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          src={`/assets/images/${item.pic}`}
                                          alt="Product"
                                          className="img-fluid"
                                          style={{ maxWidth: "80px" }}
                                        />
                                      </Link>
                                    )}
                                  </td>
                                  <td className="text-left">
                                    {item.name.length > 18
                                      ? item.name.slice(0, 18) + "..."
                                      : item.name}
                                    {item.isBestSeller === "Yes" && (
                                      <span className="badge bg-danger ms-1">
                                        Best
                                      </span>
                                    )}
                                  </td>
                                  <td>{item.category}</td>
                                  <td>{item.weight}</td>
                                  <td>₹{item.price}</td>
                                  <td>
                                    {item.discount ? `${item.discount}%` : "-"}
                                  </td>
                                  <td className="fw-bold">
                                    ₹{calcFinalPrice(item.price, item.discount)}
                                  </td>
                                  <td>{stockBadge(item.stock)}</td>
                                  <td>
                                    <span
                                      className={`badge ${
                                        item.status === "Active"
                                          ? "bg-success"
                                          : "bg-secondary"
                                      }`}
                                    >
                                      {item.status}
                                    </span>
                                  </td>

                                  <td>
                                    <Link
                                      href={`/AdminProduct/View?id=${item.id}`}
                                      className="btn btn-info btn-sm"
                                    >
                                      <i className="fa fa-eye"></i>
                                    </Link>
                                  </td>
                                  <td>
                                    <Link
                                      href={`/AdminProduct/Update?id=${item.id}`}
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
                                <td colSpan={12} className="text-center">
                                  No product found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      <Pagination currentPage={currentPage} totalPages={totalPages}
                       handlePrevPage={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                        handleNextPage={() => setCurrentPage((p) =>   Math.min(p + 1, totalPages - 1) )}
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

export default AdminProduct;