"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageFooter from "../Sidebar/Footer/page";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import Pagination from "../AOS/Pagination";
import { Order, ORDER_STATUSES, PAYMENT_STATUSES } from "./OrderFields";

function AdminOrderList() {
  const [items, setItems] = useState<Order[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  /* ⭐ Ship Modal state */
  const [shipModal, setShipModal] = useState<{
    open: boolean;
    orderId: string | null;
    courier: string;
    trackingId: string;
  }>({ open: false, orderId: null, courier: "", trackingId: "" });

  /* ⭐ Loading state for updating rows */
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/order")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.order || [];
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

  const filtered = items.filter((o) => {
    const text = `${o?.orderNo || ""} ${o?.customerName || ""} ${o?.customerPhone || ""}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchOrder = orderStatusFilter ? o?.orderStatus === orderStatusFilter : true;
    const matchPayment = paymentStatusFilter ? o?.paymentStatus === paymentStatusFilter : true;
    return matchSearch && matchOrder && matchPayment;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = (currentPage + 1) * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentContent = filtered.slice(indexOfFirst, indexOfLast);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this order?")) return;
    const res = await fetch(`/api/order?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("✅ Deleted!");
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  /* ⭐ Status Update — general */
  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!confirm(`Change status to "${newStatus}"?`)) return;

    setUpdatingId(id);
    try {
      const payload: any = { orderStatus: newStatus };
      if (newStatus === "Delivered") {
        payload.deliveredDate = new Date().toISOString();
      }

      const res = await fetch(`/api/order?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setItems((prev) =>
          prev.map((o) => (o.id === id ? { ...o, ...payload } : o))
        );
        /* ⭐ console log to confirm */
        console.log(`✅ ${id} → ${newStatus}`);
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setUpdatingId(null);
    }
  };

  /* ⭐ Ship Modal — courier + tracking के साथ */
  const openShipModal = (id: string) => {
    setShipModal({ open: true, orderId: id, courier: "", trackingId: "" });
  };

  const handleShipSubmit = async () => {
    if (!shipModal.orderId) return;
    if (!shipModal.courier.trim()) {
      alert("Courier name required");
      return;
    }

    setUpdatingId(shipModal.orderId);
    try {
      const payload = {
        orderStatus: "Shipped",
        courier: shipModal.courier.trim(),
        trackingId: shipModal.trackingId.trim(),
        shippedDate: new Date().toISOString(),
      };

      const res = await fetch(`/api/order?id=${shipModal.orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setItems((prev) =>
          prev.map((o) =>
            o.id === shipModal.orderId ? { ...o, ...payload } : o
          )
        );
        setShipModal({ open: false, orderId: null, courier: "", trackingId: "" });
        alert("✅ Order marked as Shipped");
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setUpdatingId(null);
    }
  };

  const orderStatusBadge = (s?: string) => {
    const map: any = {
      Pending: "bg-secondary",
      Confirmed: "bg-info text-dark",
      Packed: "bg-primary",
      Shipped: "bg-warning text-dark",
      "Out for Delivery": "bg-warning text-dark",
      Delivered: "bg-success",
      Cancelled: "bg-danger",
      Returned: "bg-dark",
    };
    return map[s || ""] || "bg-secondary";
  };

  const paymentBadge = (s?: string) => {
    const map: any = {
      Pending: "bg-warning text-dark",
      Paid: "bg-success",
      Failed: "bg-danger",
      Refunded: "bg-info text-dark",
      "Partially Paid": "bg-secondary",
    };
    return map[s || ""] || "bg-secondary";
  };

  const stats = {
    total: items.length,
    pending: items.filter((i) => i.orderStatus === "Pending").length,
    shipped: items.filter((i) => i.orderStatus === "Shipped").length,
    delivered: items.filter((i) => i.orderStatus === "Delivered").length,
    revenue: items
      .filter((i) => i.paymentStatus === "Paid")
      .reduce((s, i) => s + (Number(i.totalAmount) || 0), 0),
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
              {/* Stats */}
              <div className="row my-3">
                <div className="col-md-3 mb-2">
                  <div className="card bg-primary text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">Total Orders</h6>
                      <h3 className="mb-0">{stats.total}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="card bg-warning text-dark">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">Pending</h6>
                      <h3 className="mb-0">{stats.pending}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="card bg-info text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">Shipped</h6>
                      <h3 className="mb-0">{stats.shipped}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="card bg-success text-white">
                    <div className="card-body text-center py-2">
                      <h6 className="mb-0">Revenue</h6>
                      <h3 className="mb-0">₹{stats.revenue}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  <h5 className="bg-gradient text-center p-2 fw-bold mb-4">
                    Orders : {filtered.length}
                    <Link href="/AdminOrder/Add" className="mx-2">
                      <i className="fa fa-plus fw-bold mx-2 text-white"></i>
                    </Link>
                  </h5>

                  <div className="row mb-3">
                    <div className="col-md-4 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by order no, name, phone..."
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
                        value={orderStatusFilter}
                        onChange={(e) => {
                          setOrderStatusFilter(e.target.value);
                          setCurrentPage(0);
                        }}
                      >
                        <option value="">All Order Statuses</option>
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4 mb-2">
                      <select
                        className="form-control"
                        value={paymentStatusFilter}
                        onChange={(e) => {
                          setPaymentStatusFilter(e.target.value);
                          setCurrentPage(0);
                        }}
                      >
                        <option value="">All Payment Statuses</option>
                        {PAYMENT_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
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
                    <div
                      className="table-responsive"
                      style={{ maxHeight: "550px", overflowY: "auto" }}
                    >
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr className="text-center bg-gradient">
                            <th className="text-dark">#</th>
                            <th className="text-dark">Order No</th>
                            <th className="text-dark">Customer</th>
                            <th className="text-dark">Amount</th>
                            <th className="text-dark">Payment</th>
                            <th className="text-dark">Status</th>
                            <th className="text-dark">Date</th>
                            <th className="text-dark">View</th>
                            <th className="text-dark">Edit & Delete</th>
                            <th className="text-dark">⚡ Quick Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentContent.length > 0 ? (
                            currentContent.map((item, idx) => {
                              const isUpdating = updatingId === item.id;
                              return (
                                <tr key={item.id} className="text-center">
                                  <td>{indexOfFirst + idx + 1}</td>
                                  <td>
                                    <code>{item.orderNo || "-"}</code>
                                  </td>
                                  <td className="text-start">
                                    <strong>{item.customerName || "-"}</strong>
                                    {item.customerEmail && (
                                      <small className="d-block text-muted">
                                        {item.customerEmail}
                                      </small>
                                    )}
                                    {item.customerPhone && (
                                      <small className="d-block text-muted">
                                        📞 {item.customerPhone}
                                      </small>
                                    )}
                                  </td>
                                  <td className="fw-bold">
                                    ₹{item.totalAmount || 0}
                                  </td>
                                  <td>
                                    <span
                                      className={`badge ${paymentBadge(
                                        item.paymentStatus
                                      )}`}
                                    >
                                      {item.paymentStatus || "Pending"}
                                    </span>
                                    <small className="d-block text-muted">
                                      {item.paymentMethod || "-"}
                                    </small>
                                  </td>
                                  <td>
                                    <span
                                      className={`badge ${orderStatusBadge(
                                        item.orderStatus
                                      )}`}
                                    >
                                      {item.orderStatus || "Pending"}
                                    </span>
                                    {item.courier && (
                                      <small className="d-block text-muted">
                                        🚚 {item.courier}
                                      </small>
                                    )}
                                  </td>
                                  <td>
                                    {item.orderDate
                                      ? item.orderDate.split("T")[0]
                                      : item.createdAt
                                      ? item.createdAt.split("T")[0]
                                      : "-"}
                                  </td>
                                  <td>
                                    <Link
                                      href={`/AdminOrder/View?id=${item.id}`}
                                      className="btn btn-info btn-sm"
                                      title="View"
                                    >
                                      <i className="fa fa-eye"></i>
                                    </Link>
                                  </td>
                                  <td>
                                    <Link
                                      href={`/AdminOrder/Update?id=${item.id}`}
                                      className="btn btn-warning btn-sm me-2"
                                      title="Edit"
                                    >
                                      <i className="fa fa-edit"></i>
                                    </Link>
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => handleDelete(item.id)}
                                      title="Delete"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  </td>

                                  {/* ⭐ Quick Action Column */}
                                  <td>
                                    <div className="d-flex gap-1 justify-content-center flex-wrap">
                                      {/* Shipped button — अगर Confirmed/Packed है */}
                                      {(item.orderStatus === "Confirmed" ||
                                        item.orderStatus === "Packed") && (
                                        <button
                                          className="btn btn-sm btn-warning"
                                          onClick={() => openShipModal(item.id)}
                                          disabled={isUpdating}
                                          title="Mark Shipped (Courier + Tracking)"
                                        >
                                          <i className="fa fa-truck"></i>
                                        </button>
                                      )}

                                      {/* Delivered button — अगर Shipped है */}
                                      {item.orderStatus === "Shipped" && (
                                        <button
                                          className="btn btn-sm btn-success"
                                          onClick={() =>
                                            handleStatusChange(
                                              item.id,
                                              "Delivered"
                                            )
                                          }
                                          disabled={isUpdating}
                                          title="Mark Delivered"
                                        >
                                          {isUpdating ? (
                                            <i className="fa fa-spinner fa-spin"></i>
                                          ) : (
                                            <i className="fa fa-box-open"></i>
                                          )}
                                        </button>
                                      )}

                                      {/* Confirmed button — अगर Pending है */}
                                      {item.orderStatus === "Pending" && (
                                        <button
                                          className="btn btn-sm btn-info text-white"
                                          onClick={() =>
                                            handleStatusChange(
                                              item.id,
                                              "Confirmed"
                                            )
                                          }
                                          disabled={isUpdating}
                                          title="Confirm Order"
                                        >
                                          {isUpdating ? (
                                            <i className="fa fa-spinner fa-spin"></i>
                                          ) : (
                                            <i className="fa fa-check"></i>
                                          )}
                                        </button>
                                      )}

                                      {/* Cancel — Pending/Confirmed पर */}
                                      {(item.orderStatus === "Pending" ||
                                        item.orderStatus === "Confirmed") && (
                                        <button
                                          className="btn btn-sm btn-outline-danger"
                                          onClick={() =>
                                            handleStatusChange(
                                              item.id,
                                              "Cancelled"
                                            )
                                          }
                                          disabled={isUpdating}
                                          title="Cancel Order"
                                        >
                                          <i className="fa fa-times"></i>
                                        </button>
                                      )}

                                      {/* Delivered badge — कुछ नहीं */}
                                      {item.orderStatus === "Delivered" && (
                                        <span className="badge bg-success">
                                          <i className="fa fa-check-circle me-1"></i>
                                          Done
                                        </span>
                                      )}

                                      {/* Cancelled badge */}
                                      {item.orderStatus === "Cancelled" && (
                                        <span className="badge bg-danger">
                                          <i className="fa fa-ban me-1"></i>
                                          Cancelled
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={10} className="text-center">
                                No order found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      handlePrevPage={() =>
                        setCurrentPage((p) => Math.max(p - 1, 0))
                      }
                      handleNextPage={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages - 1))
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
          <PageFooter />
        </div>
      </div>

      {/* ⭐ Ship Modal */}
      {shipModal.open && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() =>
            setShipModal({
              open: false,
              orderId: null,
              courier: "",
              trackingId: "",
            })
          }
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header bg-warning">
                <h5 className="modal-title">
                  <i className="fa fa-truck me-2"></i>
                  Mark as Shipped
                </h5>
                <button
                  className="btn-close"
                  onClick={() =>
                    setShipModal({
                      open: false,
                      orderId: null,
                      courier: "",
                      trackingId: "",
                    })
                  }
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Courier Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Delhivery, BlueDart, India Post"
                    value={shipModal.courier}
                    onChange={(e) =>
                      setShipModal({ ...shipModal, courier: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Tracking ID (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 1234567890"
                    value={shipModal.trackingId}
                    onChange={(e) =>
                      setShipModal({ ...shipModal, trackingId: e.target.value })
                    }
                  />
                </div>
                <div className="alert alert-info small mb-0">
                  <i className="fa fa-info-circle me-1"></i>
                  Customer को "Shipped" status दिखेगा shipping details के साथ।
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setShipModal({
                      open: false,
                      orderId: null,
                      courier: "",
                      trackingId: "",
                    })
                  }
                >
                  Cancel
                </button>
                <button
                  className="btn btn-warning"
                  onClick={handleShipSubmit}
                  disabled={updatingId === shipModal.orderId}
                >
                  {updatingId === shipModal.orderId ? (
                    <>
                      <i className="fa fa-spinner fa-spin me-1"></i>
                      Updating...
                    </>
                  ) : (
                    <>
                      <i className="fa fa-truck me-1"></i>
                      Mark Shipped
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default AdminOrderList;