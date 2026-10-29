// src/app/(WebPage)/(UserPage)/OrderTrack/page.tsx
"use client";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  getAuthUser,
  isSessionExpired,
  clearAuthUser,
  LOGIN_PATH,
} from "../../../../../lib/authUser";

interface OrderItem {
  name: string;
  qty: number | string;
  price: number | string;
  pic?: string;
  unit?: string;
}

interface Order {
  id: string;
  orderNo: string;
  orderDate: string;
  items: string;
  subtotal: string;
  discount: string;
  tax: string;
  shippingCharge: string;
  totalAmount: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  courier?: string;
  trackingId?: string;
  shippedDate?: string;
  createdAt: string;
}

const ORDER_STEPS = ["Pending", "Confirmed", "Shipped", "Delivered"];

const STATUS_TO_STEP: Record<string, number> = {
  Pending: 0,
  Confirmed: 1,
  Packed: 1,
  Shipped: 2,
  "Out for Delivery": 2,
  Delivered: 3,
};

export default function OrderTrackPage() {
  const router = useRouter();
  const [orderNo, setOrderNo] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const auth = getAuthUser("user");
    if (!auth || isSessionExpired("user")) {
      clearAuthUser("user");
      router.replace(`${LOGIN_PATH}?redirect=/OrderTrack`);
      return;
    }
    setUser(auth);
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!orderNo.trim() || !user) return;

    setError("");
    setOrder(null);

    try {
      const res = await fetch(
        `/api/order?orderNo=${encodeURIComponent(orderNo.trim())}`
      );
      const data = await res.json();

      if (!res.ok || data?.error) {
        setError("Order not found. Please check the Order Number.");
        return;
      }

      const found = Array.isArray(data?.order) ? data.order[0] : data;
      if (!found) {
        setError("Order not found.");
        return;
      }

      // Ownership check
      const normalizePhone = (p?: string) =>
        String(p || "").replace(/\D/g, "").slice(-10);
      const userPhone = normalizePhone(user?.number);
      const isOwner =
        (found.customerEmail && found.customerEmail === user.email) ||
        (userPhone && normalizePhone(found.customerPhone) === userPhone);

      if (!isOwner) {
        setError("❌ This order does not belong to you.");
        return;
      }

      setOrder(found);
    } catch {
      setError("Server error. Please try again.");
    }
  };

  const handlePayNow = async () => {
    if (!order) return;
    if (!window.confirm(`Pay ₹${order.totalAmount} online for ${order.orderNo}?`))
      return;

    setPaying(true);
    try {
      const res = await fetch(`/api/order/${order.orderNo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethod: "online",
          paymentStatus: "Paid",
          orderStatus: "Confirmed",
          paymentId: "PAY-" + Date.now().toString().slice(-10),
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        alert("Payment failed. Please try again.");
        return;
      }

      const updated = await res.json();
      setOrder(updated);
      alert("✅ Payment Successful! Your order is now confirmed.");
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  let items: OrderItem[] = [];
  try { items = order ? JSON.parse(order.items || "[]") : []; } catch {}

  const isCancelled = order?.orderStatus === "Cancelled";
  const isReturned = order?.orderStatus === "Returned";
  const currentStepIndex = order ? STATUS_TO_STEP[order.orderStatus] ?? -1 : -1;
  const payable = order &&
    (order.paymentMethod || "").toLowerCase() === "cod" &&
    (order.paymentStatus || "").toLowerCase() === "pending" &&
    !isCancelled && !isReturned;
    if (!user)
   return null;

  
  return (
    <>
    <section className="bg-light py-5">
      <div className="container-fluid w-90">
        <div className="text-center mb-3">
          <h4 className="fw-bold mb-1">📦 Track Your Order</h4>
          <p className="fw-bold text-success mb-0">
            Hello {user.name || "Customer"}!
          </p>
        </div>

        {/* Search Form */}
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit} className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. ORD-552120"
                    value={orderNo}
                    onChange={(e) => setOrderNo(e.target.value)}
                  />
                  <button className="btn btn-primary px-4" type="submit">
                    Track
                  </button>
                </form>
                {error && (
                  <div className="alert alert-danger mt-3 mb-0 small">{error}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        {order && (
          <div className="row mt-4">
            <div className="col-lg-12">

              <div className="card shadow-sm border-0 mb-3">
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <h5 className="fw-bold mb-1">Order #{order.orderNo}</h5>
                      <small className="text-muted">
                        Placed on{" "}
                        {new Date(order.orderDate || order.createdAt).toLocaleDateString(
                          "en-IN",
                          { day: "2-digit", month: "short", year: "numeric" }
                        )}
                      </small>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <span className="badge fs-6 me-2 bg-info text-dark">
                        {order.orderStatus}
                      </span>
                      <span className="badge fs-6 bg-success">
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Timeline */}
                  {!isCancelled && !isReturned && currentStepIndex >= 0 && (
                    <div className="mt-4">
                      <div
                        className="d-flex justify-content-between align-items-start position-relative"
                        style={{ paddingTop: "10px" }}
                      >
                        {ORDER_STEPS.map((step, i) => {
                          const isDone = i <= currentStepIndex;
                          const isCurrent = i === currentStepIndex;
                          const isLast = i === ORDER_STEPS.length - 1;

                          return (
                            <div
                              key={step}
                              className="text-center flex-fill position-relative"
                              style={{ zIndex: 2 }}
                            >
                              {!isLast && (
                                <div
                                  className="position-absolute"
                                  style={{
                                    top: "18px",
                                    left: "50%",
                                    width: "100%",
                                    height: "3px",
                                    backgroundColor:
                                      i < currentStepIndex ? "#198754" : "#d1d5db",
                                    zIndex: 1,
                                  }}
                                />
                              )}
                              <div
                                className={`rounded-circle d-inline-flex align-items-center justify-content-center ${
                                  isDone
                                    ? "bg-success text-white"
                                    : "bg-white text-muted border border-2"
                                } ${isCurrent ? "shadow" : ""}`}
                                style={{
                                  width: "36px",
                                  height: "36px",
                                  fontSize: "14px",
                                  position: "relative",
                                  zIndex: 2,
                                }}
                              >
                                {isDone ? (
                                  <i className="fa fa-check"></i>
                                ) : (
                                  <span>{i + 1}</span>
                                )}
                              </div>
                              <small
                                className={`d-block mt-2 ${
                                  isCurrent
                                    ? "fw-bold text-success"
                                    : isDone
                                    ? "text-success"
                                    : "text-muted"
                                }`}
                                style={{ fontSize: "12px" }}
                              >
                                {step}
                              </small>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {isCancelled && (
                    <div className="alert alert-danger mt-3 mb-0 small">
                      This order has been cancelled.
                    </div>
                  )}
                  {isReturned && (
                    <div className="alert alert-dark mt-3 mb-0 small">
                      This order has been returned.
                    </div>
                  )}
                </div>
              </div>

              {/* Pay Now (COD + Pending) */}
              {payable && (
                <div className="card shadow-sm border-0 mb-3 bg-light">
                  <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div>
                      <h6 className="fw-bold mb-1">Pay Online Now</h6>
                      <small className="text-muted">
                        Switch your COD order to online payment — instantly confirmed.
                      </small>
                    </div>
                    <button
                      className="btn btn-success"
                      onClick={handlePayNow}
                      disabled={paying}
                    >
                      {paying ? "Processing..." : `Pay ₹${order.totalAmount}`}
                    </button>
                  </div>
                </div>
              )}

               <div className="row">
               <div className="col-lg-12 mb-3">
                {order.courier && (
                 <div className="card shadow-sm border-0 h-100">
                      <div className="card-body">
                        <h6 className="fw-bold mb-3">Shipping Information</h6>
                        <table className="table table-bordered table-hover align-middle mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Courier</th>
                              <th className="text-center">Tracking ID</th>
                              <th className="text-center">Shipped On</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <strong>{order.courier}</strong>
                              </td>
                              <td className="text-center">
                                {order.trackingId || "-"}
                              </td>
                              <td className="text-center">
                                {order.shippedDate
                                  ? new Date(order.shippedDate).toLocaleDateString(
                                      "en-IN"
                                    )
                                  : "-"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                 </div>
                )}
               </div>
                {/* Items */}
                <div className="col-lg-6 mb-3">
                  <div className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                      <h6 className="fw-bold mb-3">Items ({items.length})</h6>
                      <table className="table table-bordered table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Product</th>
                            <th className="text-center">Qty</th>
                            <th className="text-center">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((it, i) => (
                            <tr key={i}>
                              <td>
                                <div className="d-flex align-items-center">
                                  {it.pic && (
                                    <img
                                      src={`/assets/images/${it.pic}`}
                                      alt={it.name}
                                      width="40"
                                      height="40"
                                      className="rounded me-2"
                                      style={{ objectFit: "cover" }}
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                          "/assets/images/placeholder.png";
                                      }}
                                    />
                                  )}
                                  <small className="fw-bold">{it.name}</small>
                                </div>
                              </td>
                              <td className="text-center">
                                {it.qty} {it.unit || ""}
                              </td>
                              <td className="text-center fw-bold text-success">
                                ₹{Number(it.qty) * Number(it.price)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="col-lg-6 mb-3">
                  <div className="card shadow-sm border-0">
                  <div className="card-body">
                  <h6 className="fw-bold mb-3">Payment Summary</h6>
                  <table className="table table-bordered table-hover mb-0">
                    <tbody>
                      <tr>
                        <td>Subtotal</td>
                        <td className="text-end">₹{order.subtotal}</td>
                      </tr>
                      <tr>
                        <td>Discount</td>
                        <td className="text-end text-danger">- ₹{order.discount}</td>
                      </tr>
                      <tr>
                        <td>Tax</td>
                        <td className="text-end">+ ₹{order.tax}</td>
                      </tr>
                      <tr>
                        <td>Shipping</td>
                        <td className="text-end">
                          {Number(order.shippingCharge) === 0
                            ? "FREE"
                            : `+ ₹${order.shippingCharge}`}
                        </td>
                      </tr>
                      <tr className="table-light">
                        <td className="fw-bold">Total</td>
                        <td className="text-end fw-bold text-success fs-5">
                          ₹{order.totalAmount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                 </div>
                 </div>
                </div>

              </div>

              {/* Contact Support */}
              <div className="text-center mt-4">
                <p className="text-muted small mb-2">Need more help? Contact us:</p>
                <a href="/Contact" className="btn btn-outline-primary btn-sm">
                  <i className="fa fa-headset me-1"></i>
                  Contact Support
                </a>
              </div>

            </div>
          </div>
        )}

        {/* Empty State */}
        {!order && !error && (
          <div className="text-center mt-3 text-muted">
            <i className="fa fa-box-open fa-4x mb-3 opacity-50"></i>
            <p>
              Enter your Order Number (e.g., <code className="text-bold">ORD-552120</code>). You'll
              find it in your confirmation email/SMS.
            </p>
          </div>
        )}
      </div>
    </section>
    </>
  );
}