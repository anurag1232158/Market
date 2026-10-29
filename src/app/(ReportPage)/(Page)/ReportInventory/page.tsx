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
import PageFooter from "../../(Page)/Sidebar/Footer/page";
import Sidebars from "../../(Page)/Sidebar/Sidebars/PageSidebar";

export default function ReportInventory() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<any>({
    stats: {},
    items: [],
    categoryData: [],
    warehouseData: [],
    statusBreakdown: [],
    lowStockItems: [],
    topStockItems: [],
    expiringSoon: [],
  });

  /* Filters */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ============ Fetch Inventory ============ */
  const fetchInventory = () => {
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    if (search) params.set("search", search);
    if (categoryFilter) params.set("category", categoryFilter);

    fetch(`/api/report/inventory?${params.toString()}`)
      .then((res) => res.json())
      .then((d) => {
        setData({
          stats: d.stats || {},
          items: d.items || [],
          categoryData: d.categoryData || [],
          warehouseData: d.warehouseData || [],
          statusBreakdown: d.statusBreakdown || [],
          lowStockItems: d.lowStockItems || [],
          topStockItems: d.topStockItems || [],
          expiringSoon: d.expiringSoon || [],
        });
      })
      .catch((err) => console.error("Inventory fetch error:", err));
  };

  useEffect(() => {
    fetchInventory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, categoryFilter]);

  useEffect(() => {
    const timer = setTimeout(() => fetchInventory(), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  /* ============ Reset Filters ============ */
  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setCategoryFilter("");
  };

  /* ============ Export CSV ============ */
  const exportCSV = () => {
    if (data.items.length === 0) {
      alert("⚠️ No data to export");
      return;
    }

    const headers = [
      "Product",
      "SKU",
      "Category",
      "Warehouse",
      "Current Stock",
      "Unit",
      "Purchase Price",
      "Selling Price",
      "Stock Value",
      "Status",
    ];

    const rows = data.items.map((i: any) => [
      i.productName || "",
      i.sku || "",
      i.category || "",
      i.warehouse || "",
      i.currentStock || "0",
      i.unit || "",
      i.purchasePrice || "0",
      i.sellingPrice || "0",
      (Number(i.currentStock) || 0) * (Number(i.purchasePrice) || 0),
      i.status || "",
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
    a.download = `inventory-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ============ Print ============ */
  const printReport = () => {
    window.print();
  };

  /* ============ Helpers ============ */
  const COLORS = [
    "#28a745",
    "#ffc107",
    "#dc3545",
    "#17a2b8",
    "#007bff",
    "#6f42c1",
    "#fd7e14",
    "#20c997",
  ];

  const stats = data.stats || {};

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

  const fmtDate = (d?: string) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const daysLeft = (expiry?: string) => {
    if (!expiry) return 0;
    const diff = new Date(expiry).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="wrapper">
      <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
        <PageNavbar toggleSidebar={toggleSidebar} />

        <section className="p-4">
          <div className="container-fluid">
            {/* Header */}
            <div className="bg-info text-white p-3 rounded shadow mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h4 className="mb-0 fw-bold">
                    <i className="fa fa-boxes me-2"></i>
                    Inventory Report
                  </h4>
                  <small className="text-white-50">
                    Stock analytics and insights
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

            {/* Stats Cards */}
            <div className="row g-3 mb-4">
              <div className="col-lg-3 col-md-6">
                <div className="card bg-primary text-white shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small text-white-50">
                          Total Items
                        </h6>
                        <h3 className="mb-0">{stats.total || 0}</h3>
                      </div>
                      <i className="fa fa-cubes fa-3x text-white-50"></i>
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
                          Stock Value
                        </h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.totalStockValue || 0).toLocaleString(
                            "en-IN"
                          )}
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
                          Selling Value
                        </h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.totalSellingValue || 0).toLocaleString(
                            "en-IN"
                          )}
                        </h3>
                      </div>
                      <i className="fa fa-tag fa-3x text-white-50"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card bg-warning text-dark shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 small">Potential Profit</h6>
                        <h3 className="mb-0">
                          ₹
                          {(stats.potentialProfit || 0).toLocaleString(
                            "en-IN"
                          )}
                        </h3>
                      </div>
                      <i className="fa fa-chart-line fa-3x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Cards */}
            <div className="row g-3 mb-4">
              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-success">
                  <div className="card-body">
                    <h6 className="text-muted small">In Stock</h6>
                    <h3 className="mb-0 text-success">
                      {stats.inStock || 0}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-warning">
                  <div className="card-body">
                    <h6 className="text-muted small">Low Stock</h6>
                    <h3 className="mb-0 text-warning">
                      {stats.lowStock || 0}
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

              <div className="col-lg-3 col-md-6">
                <div className="card border-start border-4 border-dark">
                  <div className="card-body">
                    <h6 className="text-muted small">Expired</h6>
                    <h3 className="mb-0 text-dark">
                      {stats.expired || 0}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="row mb-4">
              <div className="col-lg-6 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-chart-pie me-2 text-primary"></i>
                      Stock Status
                    </h6>
                  </div>
                  <div className="card-body">
                    {data.statusBreakdown.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={data.statusBreakdown}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                          >
                            {data.statusBreakdown.map(
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
                        No status data
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <div className="card shadow h-100">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-chart-bar me-2 text-success"></i>
                      Category-wise Stock Value
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
                              "Stock Value",
                            ]}
                          />
                          <Bar dataKey="value" fill="#28a745" />
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
            </div>

            {/* Warehouse Chart */}
            {data.warehouseData.length > 0 && (
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h6 className="mb-0 fw-bold">
                    <i className="fa fa-warehouse me-2 text-info"></i>
                    Warehouse-wise Stock
                  </h6>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data.warehouseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="stock" fill="#17a2b8" name="Stock Qty" />
                      <Bar dataKey="items" fill="#ffc107" name="Items" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Low Stock Alert */}
            {data.lowStockItems.length > 0 && (
              <div className="card shadow mb-4 border-start border-4 border-danger">
                <div className="card-header bg-danger text-white">
                  <h6 className="mb-0 fw-bold">
                    <i className="fa fa-exclamation-triangle me-2"></i>
                    Low Stock / Out of Stock Alert ({data.lowStockItems.length})
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
                          <th>Warehouse</th>
                          <th className="text-center">Current</th>
                          <th className="text-center">Reorder</th>
                          <th className="text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.lowStockItems.map((i: any, idx: number) => (
                          <tr key={idx}>
                            <td className="text-center">{idx + 1}</td>
                            <td>
                              <strong>{i.productName || "-"}</strong>
                            </td>
                            <td>
                              <code>{i.sku || "-"}</code>
                            </td>
                            <td>{i.warehouse || "-"}</td>
                            <td className="text-center">
                              <strong className="text-danger">
                                {i.currentStock || 0} {i.unit || ""}
                              </strong>
                            </td>
                            <td className="text-center">
                              {i.reorderLevel || 0}
                            </td>
                            <td className="text-center">
                              <span
                                className={`badge ${statusBadge(i.status)}`}
                              >
                                {i.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Expiring Soon */}
            {data.expiringSoon.length > 0 && (
              <div className="card shadow mb-4 border-start border-4 border-warning">
                <div className="card-header bg-warning text-dark">
                  <h6 className="mb-0 fw-bold">
                    <i className="fa fa-clock me-2"></i>
                    Expiring in Next 30 Days ({data.expiringSoon.length})
                  </h6>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Product</th>
                          <th>Batch</th>
                          <th className="text-center">Current Stock</th>
                          <th className="text-center">Expiry</th>
                          <th className="text-center">Days Left</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.expiringSoon.map((i: any, idx: number) => (
                          <tr key={idx}>
                            <td className="text-center">{idx + 1}</td>
                            <td>
                              <strong>{i.productName || "-"}</strong>
                            </td>
                            <td>
                              <code>{i.batchNo || "-"}</code>
                            </td>
                            <td className="text-center">
                              {i.currentStock || 0} {i.unit || ""}
                            </td>
                            <td className="text-center">
                              {fmtDate(i.expiryDate)}
                            </td>
                            <td className="text-center">
                              <span
                                className={`badge ${
                                  daysLeft(i.expiryDate) <= 7
                                    ? "bg-danger"
                                    : "bg-warning text-dark"
                                }`}
                              >
                                {daysLeft(i.expiryDate)} days
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Top Stock Value */}
            {data.topStockItems.length > 0 && (
              <div className="card shadow mb-4">
                <div className="card-header bg-white">
                  <h6 className="mb-0 fw-bold">
                    <i className="fa fa-trophy me-2 text-warning"></i>
                    Top 10 Stock Value Items
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
                          <th className="text-end">Stock Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.topStockItems.map((i: any, idx: number) => (
                          <tr key={idx}>
                            <td className="text-center">
                              {idx === 0 && "🥇"}
                              {idx === 1 && "🥈"}
                              {idx === 2 && "🥉"}
                              {idx > 2 && idx + 1}
                            </td>
                            <td>
                              <strong>{i.productName || "-"}</strong>
                            </td>
                            <td>
                              <code>{i.sku || "-"}</code>
                            </td>
                            <td>{i.category || "-"}</td>
                            <td className="text-center">
                              {i.currentStock || 0} {i.unit || ""}
                            </td>
                            <td className="text-end fw-bold text-success">
                              ₹
                              {(i.stockValue || 0).toLocaleString("en-IN")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="row g-2">
                  <div className="col-md-5">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by product, SKU, batch..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="col-md-3">
                    <select
                      className="form-control"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">All Statuses</option>
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Expired">Expired</option>
                      <option value="Damaged">Damaged</option>
                    </select>
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

            {/* All Inventory Table */}
            <div className="card shadow">
              <div className="card-header bg-white">
                <h6 className="mb-0 fw-bold">
                  <i className="fa fa-list me-2 text-primary"></i>
                  All Inventory Items ({data.items.length})
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
                        <th>Product</th>
                        <th>SKU</th>
                        <th>Category</th>
                        <th>Warehouse</th>
                        <th className="text-center">Stock</th>
                        <th className="text-end">Purchase ₹</th>
                        <th className="text-end">Selling ₹</th>
                        <th className="text-end">Value ₹</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.items.length > 0 ? (
                        data.items.map((i: any, idx: number) => (
                          <tr key={i.id || idx}>
                            <td className="text-center">{idx + 1}</td>
                            <td>
                              <strong>{i.productName || "-"}</strong>
                              {i.batchNo && (
                                <small className="d-block text-muted">
                                  Batch: {i.batchNo}
                                </small>
                              )}
                            </td>
                            <td>
                              <code className="bg-light p-1 rounded">
                                {i.sku || "-"}
                              </code>
                            </td>
                            <td>{i.category || "-"}</td>
                            <td>{i.warehouse || "-"}</td>
                            <td className="text-center">
                              <strong>{i.currentStock || 0}</strong>{" "}
                              {i.unit || ""}
                            </td>
                            <td className="text-end">
                              ₹{i.purchasePrice || 0}
                            </td>
                            <td className="text-end">
                              ₹{i.sellingPrice || 0}
                            </td>
                            <td className="text-end fw-bold text-success">
                              ₹
                              {(
                                (Number(i.currentStock) || 0) *
                                (Number(i.purchasePrice) || 0)
                              ).toLocaleString("en-IN")}
                            </td>
                            <td className="text-center">
                              <span
                                className={`badge ${statusBadge(i.status)}`}
                              >
                                {i.status || "-"}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={10} className="text-center py-4">
                            <i className="fa fa-inbox fa-3x text-muted d-block mb-2"></i>
                            <p className="text-muted mb-0">
                              No inventory items found
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Info Notice */}
            <div className="alert alert-info mt-4">
              <i className="fa fa-info-circle me-2"></i>
              <strong>Read-only access:</strong> As a Report user, आप सिर्फ
              inventory देख सकते हैं — edit, delete नहीं कर सकते।
            </div>
          </div>
        </section>

        <PageFooter />
      </div>
    </div>
  );
}