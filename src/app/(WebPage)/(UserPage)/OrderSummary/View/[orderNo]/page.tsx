// src/app/(WebPage)/(UserPage)/OrderSummary/View/[orderNo]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Order {
  id: string;
  orderNo: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerType?: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPin: string;
  shippingCountry?: string;
  items: string;
  subtotal: string;
  discount: string;
  tax: string;
  shippingCharge: string;
  totalAmount: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentId?: string;
  orderStatus: string;
  courier?: string;
  trackingId?: string;
  shippedDate?: string;
  deliveredDate?: string;
  customerNote?: string;
  adminNote?: string;
  createdAt: string;
  updatedAt?: string;
}

const orderStatusBadge = (status: string) => {
  switch (status) {
    case "Delivered": return "bg-success";
    case "Cancelled": return "bg-danger";
    case "Shipped": return "bg-info";
    case "Confirmed": return "bg-primary";
    case "Pending":
    default: return "bg-warning text-dark";
  }
};

const paymentStatusBadge = (status: string) => {
  switch (status) {
    case "Paid": return "bg-success";
    case "Failed": return "bg-danger";
    case "Refunded": return "bg-secondary";
    case "Pending":
    default: return "bg-warning text-dark";
  }
};

const paymentMethodBadge = (method: string) => {
  const m = (method || "").toLowerCase();
  if (m === "online" || m === "razorpay" || m === "upi" || m === "card") return "bg-info";
  if (m === "cod" || m === "cash") return "bg-secondary";
  return "bg-dark";
};

const paymentMethodIcon = (method: string) => {
  const m = (method || "").toLowerCase();
  if (m === "online" || m === "razorpay" || m === "upi" || m === "card") return "fa-credit-card";
  if (m === "cod" || m === "cash") return "fa-money-bill-wave";
  return "fa-question-circle";
};

const ORDER_STEPS = ["Pending", "Confirmed", "Shipped", "Delivered"];

export default function OrderViewPage() {
  const router = useRouter();
  const params = useParams();
  const orderNo = params.orderNo as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!orderNo) {
      setError("Order number missing");
      return;
    }

    const authUser = JSON.parse(localStorage.getItem("authUser_user") || "null");
    if (!authUser) {
      router.replace(`/Login?redirect=/OrderSummary/View/${orderNo}`);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order/${orderNo}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          setError(
            errData.error
              ? `${errData.error} (searched: ${errData.searchedFor || orderNo})`
              : `Order not found: ${orderNo}`
          );
          return;
        }

        const data = await res.json();

        if (
          data.customerEmail !== authUser.email &&
          data.customerPhone !== authUser.number
        ) {
          router.replace("/OrderSummary");
          return;
        }

        setOrder(data);
      } catch (err) {
        console.error(err);
        setError("Could not load order");
      }
    };

    fetchOrder();
  }, [orderNo, router]);

  const parseNum = (v?: string | number) =>
    Number(String(v || 0).replace(/,/g, "")) || 0;

  const fmt = (n: number) =>
    `Rs. ${n.toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;

  const canPayNow = (o: Order) => {
    const method = (o.paymentMethod || "").toLowerCase();
    const status = (o.paymentStatus || "").toLowerCase();
    const orderStat = (o.orderStatus || "").toLowerCase();
    return (
      (method === "cod" || method === "cash") &&
      status === "pending" &&
      orderStat !== "cancelled" &&
      orderStat !== "delivered"
    );
  };

  const handlePayNow = async () => {
    if (!order) return;
    const amount = parseNum(order.totalAmount);

    if (
      !window.confirm(
        `💳 Online Payment\n\nAmount: ₹${amount}\nOrder: ${order.orderNo}\n\nOK = Payment Success`
      )
    )
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
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Payment update failed.");
        setPaying(false);
        return;
      }

      const updated = await res.json();
      setOrder(updated);
      alert(`✅ Payment Successful! Order ${order.orderNo} is Confirmed.`);
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  const downloadInvoice = () => {
    if (!order) return;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 100, 40);
    doc.text("Makhana Store", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.setFont("helvetica", "normal");
    doc.text("Order Invoice", 105, 28, { align: "center" });

    doc.setDrawColor(40, 100, 40);
    doc.setLineWidth(0.8);
    doc.line(15, 33, 195, 33);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Order No: ${order.orderNo}`, 15, 42);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString("en-IN")}`, 15, 48);
    doc.text(`Status: ${order.orderStatus}`, 15, 54);
    doc.text(
      `Payment: ${order.paymentMethod?.toUpperCase() || "-"} (${order.paymentStatus || "-"})`,
      15,
      60
    );

    autoTable(doc, {
      startY: 68,
      head: [["Customer Information", ""]],
      body: [
        ["Name", order.customerName],
        ["Email", order.customerEmail],
        ["Phone", order.customerPhone],
        ["Address", `${order.shippingAddress}, ${order.shippingCity} - ${order.shippingPin}`],
      ],
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [40, 100, 40], textColor: 255 },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
    });

    let items: any[] = [];
    try {
      items = JSON.parse(order.items || "[]");
    } catch {}

    const lastY = (doc as any).lastAutoTable?.finalY || 100;

    autoTable(doc, {
      startY: lastY + 8,
      head: [["#", "Product", "Qty", "Price", "Total"]],
      body: items.map((it, i) => [
        i + 1,
        it.name,
        it.qty,
        fmt(parseNum(it.price)),
        fmt(parseNum(it.price) * parseNum(it.qty)),
      ]),
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [100, 150, 100], textColor: 255 },
    });

    const summaryY = (doc as any).lastAutoTable?.finalY || lastY + 20;

    autoTable(doc, {
      startY: summaryY + 8,
      body: [
        ["Subtotal", fmt(parseNum(order.subtotal))],
        ["Discount", `- ${fmt(parseNum(order.discount))}`],
        ["Tax", fmt(parseNum(order.tax))],
        ["Shipping", fmt(parseNum(order.shippingCharge))],
        ["Total", fmt(parseNum(order.totalAmount))],
      ],
      theme: "grid",
      styles: { fontSize: 10 },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 60 },
        1: { halign: "right" },
      },
    });

    doc.save(`Invoice_${order.orderNo}.pdf`);
  };

  if (!order) {
    if (error) {
      return (
        <div className="container my-5 text-center py-5">
          <i className="fa fa-exclamation-circle fa-4x text-danger mb-3"></i>
          <h4>{error || "Order not found"}</h4>
          <Link href="/OrderSummary" className="btn btn-success mt-3">
            <i className="fa fa-arrow-left me-2"></i> Back to My Orders
          </Link>
        </div>
      );
    }
    return null;
  }

  let items: any[] = [];
  try {
    items = JSON.parse(order.items || "[]");
  } catch {}

  const payable = canPayNow(order);
  const currentStepIndex = ORDER_STEPS.indexOf(order.orderStatus);

  return (
    <>
      <section className="bg-success text-white py-2">
        <div className="container-fluid w-95">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <h4 className="fw-bold mb-1">
                <i className="fa fa-receipt me-2"></i> Order Details
              </h4>
              <p className="mb-0 opacity-75">
                Order No: <strong>{order.orderNo}</strong>
              </p>
            </div>
            <Link href="/OrderSummary" className="btn btn-outline-light btn-sm">
              <i className="fa fa-arrow-left me-1"></i> Back to Orders
            </Link>
          </div>
        </div>
      </section>

      <section className="pt-2 pb-4">
        <div className="container-fluid w-95">
          {/* Status Card */}
          <div className="card border-0 shadow-sm bg-light mb-4">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-6 mb-3 mb-md-0">
                  <small className="text-muted d-block mb-1">Order Status</small>
                  <span className={`badge fs-6 ${orderStatusBadge(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </div>
                <div className="col-md-6 text-md-end">
                  <small className="text-muted d-block mb-1">Payment Status</small>
                  <span className={`badge fs-6 ${paymentMethodBadge(order.paymentMethod)} me-2`}>
                    <i className={`fa-solid ${paymentMethodIcon(order.paymentMethod)} me-1`}></i>
                    {order.paymentMethod?.toUpperCase()}
                  </span>
                  <span className={`badge fs-6 ${paymentStatusBadge(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              {order.orderStatus !== "Cancelled" && (
                <div className="mt-4">
                  <div className="d-flex justify-content-between align-items-start position-relative" style={{ paddingTop: "10px" }}>
                    {ORDER_STEPS.map((step, i) => {
                      const isDone = i <= currentStepIndex;
                      const isCurrent = i === currentStepIndex;
                      const isLast = i === ORDER_STEPS.length - 1;

                      return (
                        <div key={step} className="text-center flex-fill position-relative" style={{ zIndex: 2 }}>
                          {!isLast && (
                            <div className="position-absolute" style={{
                              top: "18px",
                              left: "50%",
                              width: "100%",
                              height: "3px",
                              backgroundColor: i < currentStepIndex ? "#198754" : "#d1d5db",
                              zIndex: 1,
                            }} />
                          )}
                          <div className={`rounded-circle d-inline-flex align-items-center justify-content-center ${
                            isDone ? "bg-success text-white" : "bg-white text-muted border border-2"
                          } ${isCurrent ? "shadow-lg" : ""}`} style={{
                            width: "36px",
                            height: "36px",
                            fontSize: "14px",
                            position: "relative",
                            zIndex: 2,
                            borderColor: isDone ? "#198754" : "#d1d5db",
                          }}>
                            {isDone ? <i className="fa fa-check"></i> : <span>{i + 1}</span>}
                          </div>
                          <small className={`d-block mt-2 ${isCurrent ? "fw-bold text-success" : isDone ? "text-success" : "text-muted"}`} style={{ fontSize: "12px", lineHeight: 1.3 }}>
                            {step}
                          </small>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card border-0 shadow-sm mb-3">
                <div className="card-header bg-light">
                  <h6 className="fw-bold mb-0">
                    <i className="fa fa-map-marker-alt me-2 text-success"></i> Delivery Address
                  </h6>
                </div>
                <div className="card-body">
                  <p className="mb-1"><strong>{order.customerName}</strong></p>
                  <p className="mb-1 small"><i className="fa fa-phone me-2 text-muted"></i>{order.customerPhone}</p>
                  <p className="mb-1 small"><i className="fa fa-envelope me-2 text-muted"></i>{order.customerEmail}</p>
                  <hr className="my-2" />
                  <p className="mb-0 small">
                    {order.shippingAddress}, {order.shippingCity}, {order.shippingState} - {order.shippingPin}
                    <br />
                    {order.shippingCountry}
                  </p>
                </div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-header bg-light">
                  <h6 className="fw-bold mb-0">
                    <i className="fa fa-info-circle me-2 text-success"></i> Order Information
                  </h6>
                </div>
                <div className="card-body">
                  <table className="table table-hover table-bordered align-middle mb-0">
                    <tbody>
                      <tr><td className="text-muted">Order No</td><td className="text-end fw-bold">{order.orderNo}</td></tr>
                      <tr>
                        <td className="text-muted">Order Date</td>
                        <td className="text-end">
                          {new Date(order.orderDate || order.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </td>
                      </tr>
                      <tr><td className="text-muted">Payment Method</td><td className="text-end">{order.paymentMethod?.toUpperCase()}</td></tr>
                      {order.paymentId && (
                        <tr><td className="text-muted">Payment ID</td><td className="text-end small">{order.paymentId}</td></tr>
                      )}
                      {order.courier && (
                        <tr><td className="text-muted">Courier</td><td className="text-end">{order.courier}</td></tr>
                      )}
                      {order.trackingId && (
                        <tr><td className="text-muted">Tracking ID</td><td className="text-end">{order.trackingId}</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-4">
              <div className="card border-0 shadow-sm mb-3">
                <div className="card-header bg-light">
                  <h6 className="fw-bold mb-0">
                    <i className="fa fa-shopping-bag me-2 text-success"></i> Items ({items.length})
                  </h6>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Product</th>
                          <th className="text-center">Qty</th>
                          <th className="text-end">Price</th>
                          <th className="text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((it, i) => {
                          const price = parseNum(it.price);
                          const qty = parseNum(it.qty || 1);
                          return (
                            <tr key={i}>
                              <td><small className="fw-bold d-block">{it.name}</small></td>
                              <td className="text-center small">{qty}</td>
                              <td className="text-end small">₹{price}</td>
                              <td className="text-end small fw-bold text-success">₹{price * qty}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-header bg-light">
                  <h6 className="fw-bold mb-0">
                    <i className="fa fa-receipt me-2 text-success"></i> Payment Summary
                  </h6>
                </div>
                <div className="card-body">
                  <table className="table table-hover table-bordered align-middle mb-0">
                    <tbody>
                      <tr><td>Subtotal</td><td className="text-end">₹{order.subtotal}</td></tr>
                      {parseNum(order.discount) > 0 && (
                        <tr className="text-success"><td>Discount</td><td className="text-end">- ₹{order.discount}</td></tr>
                      )}
                      <tr><td>Tax</td><td className="text-end">₹{order.tax}</td></tr>
                      <tr>
                        <td>Shipping</td>
                        <td className="text-end">
                          {parseNum(order.shippingCharge) === 0 ? (
                            <span className="text-success">FREE</span>
                          ) : (
                            `₹${order.shippingCharge}`
                          )}
                        </td>
                      </tr>
                      <tr className="table-light">
                        <td className="fw-bold">Total</td>
                        <td className="text-end fw-bold text-success fs-5">₹{order.totalAmount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2 justify-content-center flex-wrap mt-3">
            {payable && (
              <button className="btn btn-success" onClick={handlePayNow} disabled={paying}>
                {paying ? (
                  <><i className="fa fa-spinner fa-spin me-2"></i> Processing...</>
                ) : (
                  <><i className="fa fa-credit-card me-2"></i> Pay Now Online (₹{order.totalAmount})</>
                )}
              </button>
            )}

            <button className="btn btn-outline-success" onClick={downloadInvoice}>
              <i className="fa fa-download me-2"></i> Download Invoice
            </button>

            <Link href="/OrderSummary" className="btn btn-outline-secondary">
              <i className="fa fa-list me-2"></i> All Orders
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}