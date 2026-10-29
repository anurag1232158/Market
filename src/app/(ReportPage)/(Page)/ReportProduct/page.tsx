"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import PageNavbar from "../../(Page)/Sidebar/Navbar/PageNavbar";
import PageFooter from "../Sidebar/Footer/Footer";
import Sidebars from "../../(Page)/Sidebar/Sidebars/PageSidebar";

export default function ReportProduct() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<any>({
    stats: {},
    products: [],
    categoryData: [],
    flavourData: [],
    topSelling: [],
    topRevenue: [],
    lowStockProducts: [],
    outOfStockProducts: [],
  });

  /* Filters */
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ============ Fetch Products ============ */
  const fetchProducts = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (categoryFilter) params.set("category", categoryFilter);
    if (statusFilter) params.set("status", statusFilter);
    if (sortBy) params.set("sortBy", sortBy);

    fetch(`/api/report/products?${params.toString()}`)
      .then((res) => res.json())
      .then((d) => {
        setData({
          stats: d.stats || {},
          products: d.products || [],
          categoryData: d.categoryData || [],
          flavourData: d.flavourData || [],
          topSelling: d.topSelling || [],
          topRevenue: d.topRevenue || [],
          lowStockProducts: d.lowStockProducts || [],
          outOfStockProducts: d.outOfStockProducts || [],
        });
      })
      .catch((err) => console.error("Products fetch error:", err));
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, statusFilter, sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => fetchProducts(), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  /* ============ Reset Filters ============ */
  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setStatusFilter("");
    setSortBy("name");
  };

  /* ============ Export CSV ============ */
  const exportCSV = () => {
    if (data.products.length === 0) {
      alert("⚠️ No data to export");
      return;
    }

    const headers = [
      "Product Name",
      "SKU",
      "Category",
      "Flavour",
      "Weight",
      "Price",
      "Stock",
      "Sold Qty",
      "Revenue",
      "Orders",
      "Status",
    ];

    const rows = data.products.map((p: any) => [
      p.name || "",
      p.sku || "",
      p.category || "",
      p.flavour || "",
      p.weight || "",
      p.price || "0",
      p.stock || "0",
      p.soldQty || "0",
      p.revenue || "0",
      p.orders || "0",
      p.status || "",
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((r: any[]) =>
        r.map((cell: any) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `product-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ============ Print ============ */
  const printReport = () => {
    window.print();
  };

  /* ============ Helpers ============ */
  const COLORS = [
    "#007bff",
    "#28a745",
    "#ffc107",
    "#dc3545",
    "#17a2b8",
    "#6f42c1",
    "#fd7e14",
    "#20c997",
  ];

  const stats = data.stats || {};

  const stockBadge = (stock: any) => {
    const s = Number(stock) || 0;
    if (s <= 0) return "bg-danger";
    if (s <= 10) return "bg-warning text-dark";
    return "bg-success";
  };

  const statusBadge = (s?: string) => {
    const map: any = {
      Active: "bg-success",
      Deactive: "bg-secondary",
      Inactive: "bg-secondary",
    };
    return map[s || ""] || "bg-secondary";
  };

  return (
    <div className="wrapper">
      <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
        <PageNavbar toggleSidebar={toggleSidebar} />

        <section className="p-4">
          <div className="container-fluid">
            {/* ============ Header ============ */}
            <div className="bg-primary text-white p-3 rounded shadow mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h4 className="mb-0 fw-bold">
                    <i className="fa fa-box me-2"></i>
                    Product Report
                  </h4>
                  <small className="text-white-50">
                    Product performance analytics
                  </small>
                </div>
                <div className="d-flex gap-2 mt-2 mt-md-0">
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={exportCSV}
                  >
                    <i className="fa fa-download me-1"></i> Export CSV
                  </button>
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={printReport}
                  >
                    <i className="fa fa-print me-1"></i> Print
                  </button>
                </div>
              </div>
            </div>

            {/* ============ Stats Cards ============ */}
            <div className="row g-3 mb-4">
              <div className="col-lg-3 col-md-6">
                <div className="card bg-primary text-white shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small text-white-50">
                          Total Products
                        </h6>
                        <h3 className="mb-0">{stats.totalProducts || 0}</h3>
                      </div>
                      <i className="fa fa-box fa-3x text-white-50"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card bg-success text-white shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small text-white-50">
                          Total Revenue
                        </h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.totalRevenue || 0).toLocaleString("en-IN")}
                        </h3>
                      </div>
                      <i className="fa fa-rupee-sign fa-3x text-white-50"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card bg-info text-white shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small text-white-50">
                          Total Sold
                        </h6>
                        <h3 className="mb-0">{stats.totalSoldQty || 0}</h3>
                      </div>
                      <i className="fa fa-shopping-bag fa-3x text-white-50"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card bg-warning text-dark shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small">Stock Value</h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.totalStockValue || 0).toLocaleString(
                            "en-IN"
                          )}
                        </h3>
                      </div>
                      <i className="fa fa-cubes fa-3x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ Status Cards ============ */}
            <div className="row g-3 mb-4">
              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-success">
                  <div className="card-body">
                    <h6 className="text-muted small">Active</h6>
                    <h3 className="mb-0 text-success">
                      {stats.activeProducts || 0}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-secondary">
                  <div className="card-body">
                    <h6 className="text-muted small">Inactive</h6>
                    <h3 className="mb-0 text-secondary">
                      {stats.inactiveProducts || 0}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-warning">
                  <div className="card-body">
                    <h6 className="text-muted small">Best Sellers</h6>
                    <h3 className="mb-0 text-warning">
                      {stats.bestSellers || 0}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-danger">
                  <div className="card-body">
                    <h6 className="text-muted small">Out of Stock</h6>
                    <h3 className="mb-0 text-danger">
                      {stats.outOfStock || 0}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ Charts Row ============ */}
            <div className="row mb-4">
              {/* Category Revenue */}
              <div className="col-lg-6 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-chart-bar me-2 text-primary"></i>
                      Category-wise Revenue
                    </h6>
                  </div>
                  <div className="card-body">
                    {data.categoryData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data.categoryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="name"
                            tick={{ fontSize: 10 }}
                            angle={-20}
                            textAnchor="end"
                            height={60}
                          />
                          <YAxis tick={{ fontSize: 11 }} />
                          <Tooltip
                            formatter={(value: any) => [
                              `₹${Number(value).toLocaleString("en-IN")}`,
                              "Revenue",
                            ]}
                          />
                          <Bar dataKey="revenue" fill="#007bff" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-center text-muted py-5">
                        No category data
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Flavour Sales */}
              <div className="col-lg-6 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-chart-pie me-2 text-success"></i>
                      Top Flavours (By Sold Qty)
                    </h6>
                  </div>
                  <div className="card-body">
                    {data.flavourData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={data.flavourData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                          >
                            {data.flavourData.map(
                              (entry: any, index: number) => (
                                <Cell
                                  key={index}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              )
                            )}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-center text-muted py-5">
                        No flavour data
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ============ Top Selling Products ============ */}
            {data.topSelling.length > 0 && (
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h6 className="mb-0 fw-bold">
                    <i className="fa fa-trophy me-2 text-warning"></i>
                    Top 10 Selling Products
                  </h6>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart layout="vertical" data={data.topSelling}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tick={{ fontSize: 11 }} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={150}
                        tick={{ fontSize: 10 }}
                      />
                      <Tooltip />
                      <Bar dataKey="soldQty" fill="#17a2b8" name="Sold Qty" />
                    </BarChart>
                  </ResponsiveContainer>

                  <hr />

                  <div className="table-responsive">
                    <table className="table table-sm table-bordered mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Product</th>
                          <th>Category</th>
                          <th className="text-center">Sold</th>
                          <th className="text-end">Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.topSelling.map((p: any, i: number) => (
                          <tr key={i}>
                            <td className="text-center">
                              {i === 0 && "🥇"}
                              {i === 1 && "🥈"}
                              {i === 2 && "🥉"}
                              {i > 2 && i + 1}
                            </td>
                            <td>
                              <strong>{p.name}</strong>
                            </td>
                            <td>
                              <span className="badge bg-info text-dark">
                                {p.category || "-"}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className="badge bg-primary">
                                {p.soldQty}
                              </span>
                            </td>
                            <td className="text-end fw-bold text-success">
                              ₹{p.revenue.toLocaleString("en-IN")}
                            </td>
                            <td>
  <strong>{p.name || "-"}</strong>
  {p.isBestSeller === "Yes" && (
    <span className="badge bg-danger ms-1 small">★ Best</span>
  )}
  {/* ⭐ यह जोड़ें */}
  {p._isOrphan && (
    <span className="badge bg-secondary ms-1 small">Sold Only</span>
  )}
  <small className="d-block text-muted">
    {p.flavour || ""} {p.weight ? `• ${p.weight}` : ""}
  </small>
</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ============ Low Stock Alert ============ */}
            {data.lowStockProducts.length > 0 && (
              <div className="card shadow mb-4 border-start border-4 border-warning">
                <div className="card-header bg-warning text-dark">
                  <h6 className="mb-0 fw-bold">
                    <i className="fa fa-exclamation-triangle me-2"></i>
                    Low Stock Products ({data.lowStockProducts.length})
                  </h6>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Product</th>
                          <th>SKU</th>
                          <th>Category</th>
                          <th className="text-center">Stock</th>
                          <th className="text-end">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.lowStockProducts.map((p: any, i: number) => (
                          <tr key={i}>
                            <td className="text-center">{i + 1}</td>
                            <td>
                              <strong>{p.name}</strong>
                            </td>
                            <td>
                              <code>{p.sku || "-"}</code>
                            </td>
                            <td>{p.category || "-"}</td>
                            <td className="text-center">
                              <span className="badge bg-warning text-dark">
                                {p.stock || 0} {p.unit || p.weight || ""}
                              </span>
                            </td>
                            <td className="text-end">₹{p.price || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ============ Out of Stock ============ */}
            {data.outOfStockProducts.length > 0 && (
              <div className="card shadow mb-4 border-start border-4 border-danger">
                <div className="card-header bg-danger text-white">
                  <h6 className="mb-0 fw-bold">
                    <i className="fa fa-times-circle me-2"></i>
                    Out of Stock Products ({data.outOfStockProducts.length})
                  </h6>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Product</th>
                          <th>SKU</th>
                          <th>Category</th>
                          <th className="text-end">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.outOfStockProducts.map((p: any, i: number) => (
                          <tr key={i}>
                            <td className="text-center">{i + 1}</td>
                            <td>
                              <strong>{p.name}</strong>
                            </td>
                            <td>
                              <code>{p.sku || "-"}</code>
                            </td>
                            <td>{p.category || "-"}</td>
                            <td className="text-end">₹{p.price || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ============ Filters ============ */}
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="row g-2">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by name, SKU, flavour..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="col-md-3">
                    <select
                      className="form-control"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      <option value="Raw Makhana">Raw Makhana</option>
                      <option value="Roasted Makhana">Roasted Makhana</option>
                      <option value="Flavoured Makhana">
                        Flavoured Makhana
                      </option>
                      <option value="Makhana Powder">Makhana Powder</option>
                      <option value="Gift Packs & Combos">
                        Gift Packs & Combos
                      </option>
                      <option value="Bulk / Wholesale">Bulk / Wholesale</option>
                    </select>
                  </div>

                  <div className="col-md-2">
                    <select
                      className="form-control"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Deactive">Deactive</option>
                    </select>
                  </div>

                  <div className="col-md-2">
                    <select
                      className="form-control"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="name">Sort: Name</option>
                      <option value="revenue">Sort: Revenue</option>
                      <option value="sold">Sort: Sold</option>
                      <option value="stock">Sort: Stock</option>
                      <option value="price">Sort: Price</option>
                    </select>
                  </div>

                  <div className="col-md-1">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={resetFilters}
                      title="Reset"
                    >
                      <i className="fa fa-redo"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ All Products Table ============ */}
            <div className="card shadow">
              <div className="card-header bg-white">
                <h6 className="mb-0 fw-bold">
                  <i className="fa fa-list me-2 text-primary"></i>
                  All Products ({data.products.length})
                </h6>
              </div>
              <div className="card-body p-0">
                <div
                  className="table-responsive"
                  style={{ maxHeight: "600px", overflowY: "auto" }}
                >
                  <table className="table table-bordered table-hover mb-0">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Product</th>
                        <th>SKU</th>
                        <th>Category</th>
                        <th className="text-end">Price</th>
                        <th className="text-center">Stock</th>
                        <th className="text-center">Sold</th>
                        <th className="text-end">Revenue</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.products.length > 0 ? (
                        data.products.map((p: any, idx: number) => (
                          <tr key={p.id || idx}>
                            <td className="text-center">{idx + 1}</td>
                            <td className="text-center">
                              {p.pic ? (
                                <img
                                  src={`/assets/images/${p.pic}`}
                                  alt=""
                                  width="40"
                                  height="40"
                                  className="rounded border"
                                  style={{ objectFit: "cover" }}
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display =
                                      "none";
                                  }}
                                />
                              ) : (
                                <i
                                  className="fa fa-image text-muted"
                                  style={{ fontSize: "20px" }}
                                ></i>
                              )}
                            </td>
                            <td>
                              <strong>{p.name || "-"}</strong>
                              {p.isBestSeller === "Yes" && (
                                <span className="badge bg-danger ms-1 small">
                                  ★ Best
                                </span>
                              )}
                              <small className="d-block text-muted">
                                {p.flavour || ""} {p.weight ? `• ${p.weight}` : ""}
                              </small>
                            </td>
                            <td>
                              <code className="bg-light p-1 rounded">
                                {p.sku || "-"}
                              </code>
                            </td>
                            <td>
                              <span className="badge bg-info text-dark">
                                {p.category || "-"}
                              </span>
                            </td>
                            <td className="text-end">₹{p.price || 0}</td>
                            <td className="text-center">
                              <span className={`badge ${stockBadge(p.stock)}`}>
                                {p.stock || 0}
                              </span>
                            </td>
                            <td className="text-center">
                              <strong>{p.soldQty || 0}</strong>
                            </td>
                            <td className="text-end fw-bold text-success">
                              ₹
                              {(p.revenue || 0).toLocaleString("en-IN")}
                            </td>
                            <td className="text-center">
                              <span
                                className={`badge ${statusBadge(p.status)}`}
                              >
                                {p.status || "-"}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={10} className="text-center py-4">
                            <i className="fa fa-inbox fa-3x text-muted d-block mb-2"></i>
                            <p className="text-muted mb-0">
                              No products found
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ============ Info Notice ============ */}
            <div className="alert alert-info mt-4">
              <i className="fa fa-info-circle me-2"></i>
              <strong>Read-only access:</strong> As a Report user, आप सिर्फ
              products देख सकते हैं — edit, delete नहीं कर सकते।
            </div>
          </div>
        </section>

        <PageFooter />
      </div>
    </div>
  );
}