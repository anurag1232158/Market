// src/app/(WebPage)/(UserPage)/OrderSummary/page.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Order {
  id: string;
  orderNo: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPin: string;
  items: string;
  subtotal: string;
  discount: string;
  tax: string;
  shippingCharge: string;
  totalAmount: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  paymentId?: string;
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

const canPayNow = (order: Order) => {
  const method = (order.paymentMethod || "").toLowerCase();
  const status = (order.paymentStatus || "").toLowerCase();
  const orderStat = (order.orderStatus || "").toLowerCase();
  return (
    (method === "cod" || method === "cash") &&
    status === "pending" &&
    orderStat !== "cancelled" &&
    orderStat !== "delivered"
  );
};

export default function OrderSummaryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [payingId, setPayingId] = useState<string | null>(null);
  const itemsPerPage = 5;
  const userRef = useRef<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("authUser_user");
    if (stored) {
      try {
        userRef.current = JSON.parse(stored);
      } catch {
        userRef.current = null;
      }
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/order");
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.order || [];

        const user = userRef.current;
        const normalizePhone = (p?: string) =>
          String(p || "").replace(/\D/g, "").slice(-10);
        const userPhone = normalizePhone(user?.number);

        const filtered = user
          ? list.filter(
              (o: any) =>
                (o.customerEmail && o.customerEmail === user.email) ||
                (userPhone && normalizePhone(o.customerPhone) === userPhone)
            )
          : list;

        setOrders(filtered.reverse());
      } catch (err) {
        console.error(err);
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  const parseNum = (v?: string | number) =>
    Number(String(v || 0).replace(/,/g, "")) || 0;

  const fmt = (n: number) =>
    `Rs. ${n.toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;

  const handlePayNow = async (order: Order) => {
    const amount = parseNum(order.totalAmount);

    if (
      !window.confirm(
        `💳 Online Payment\n\nAmount: ₹${amount}\nOrder: ${order.orderNo}\n\nOK = Payment Success`
      )
    )
      return;

    setPayingId(order.id);
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
        setPayingId(null);
        return;
      }

      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id
            ? { ...o, paymentMethod: "online", paymentStatus: "Paid", orderStatus: "Confirmed" }
            : o
        )
      );

      alert(`✅ Payment Successful!\n\nOrder ${order.orderNo} is now Confirmed.`);
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setPayingId(null);
    }
  };

  const downloadInvoice = (order: Order) => {
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
    doc.text(`Payment: ${order.paymentMethod?.toUpperCase() || "-"} (${order.paymentStatus || "-"})`, 15, 60);

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

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <>
      <section className="bg-success text-white py-3">
        <div className="container-fluid w-95">
          <h4 className="fw-bold mb-1">
            <i className="fa fa-list me-2"></i> My Orders
          </h4>
          <p className="mb-0 opacity-75">
            {orders.length} order{orders.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container-fluid w-95">
          {orders.length === 0 ? (
            <div className="text-center py-5">
              <i className="fa fa-inbox fa-5x text-muted mb-3"></i>
              <h3 className="text-muted">No orders yet</h3>
              <p className="text-muted mb-3">You haven't placed any orders yet</p>
              <Link href="/AllCategorys" className="btn btn-success">
                <i className="fa fa-shopping-bag me-2"></i> Shop Now
              </Link>
            </div>
          ) : (
            <>
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle mb-0">
                      <thead className="table-success">
                        <tr>
                          <th>Order No</th>
                          <th>Date</th>
                          <th>Items</th>
                          <th className="text-center">Total</th>
                          <th className="text-center">Status</th>
                          <th className="text-center">Payment</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentOrders.map((order) => {
                          let items: any[] = [];
                          try {
                            items = JSON.parse(order.items || "[]");
                          } catch {}

                          const payable = canPayNow(order);
                          const isPaying = payingId === order.id;

                          return (
                            <tr key={order.id}>
                              <td><strong className="text-success">{order.orderNo}</strong></td>
                              <td>
                                <small>
                                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </small>
                              </td>
                              <td>
                                {items.slice(0, 2).map((it: any, i: number) => (
                                  <small key={i} className="d-block">
                                    {i + 1}. {it.name} × {it.qty}
                                  </small>
                                ))}
                                {items.length > 2 && (
                                  <small className="text-muted">+{items.length - 2} more</small>
                                )}
                              </td>
                              <td className="text-center"><strong className="text-success">₹{order.totalAmount}</strong></td>
                              <td className="text-center">
                                <span className={`badge ${orderStatusBadge(order.orderStatus)}`}>
                                  {order.orderStatus}
                                </span>
                              </td>
                              <td className="text-center">
                                <span className={`badge ${paymentMethodBadge(order.paymentMethod)} me-1`} style={{ fontSize: "10px" }}>
                                  <i className={`fa-solid ${paymentMethodIcon(order.paymentMethod)} me-1`}></i>
                                  {order.paymentMethod?.toUpperCase() || "-"}
                                </span>
                                <span className={`badge ${paymentStatusBadge(order.paymentStatus)}`} style={{ fontSize: "10px" }}>
                                  {order.paymentStatus || "-"}
                                </span>
                              </td>
                              <td className="text-center">
                                <div className="d-flex gap-1 justify-content-center flex-wrap">
                                  {payable && (
                                    <button
                                      className="btn btn-sm btn-success"
                                      onClick={() => handlePayNow(order)}
                                      disabled={isPaying}
                                      title="Pay Online Now"
                                    >
                                      {isPaying ? (
                                        <><i className="fa fa-spinner fa-spin me-1"></i> Paying...</>
                                      ) : (
                                        <><i className="fa fa-credit-card me-1"></i> Pay Now</>
                                      )}
                                    </button>
                                  )}

                                  <button
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => downloadInvoice(order)}
                                    title="Download Invoice"
                                  >
                                    <i className="fa fa-download"></i>
                                  </button>

                                  <Link
                                    href={`/OrderSummary/View/${order.orderNo}`}
                                    className="btn btn-sm btn-outline-primary"
                                    title="View Order Details"
                                  >
                                    <i className="fa fa-eye"></i>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                          <i className="fa fa-chevron-left"></i>
                        </button>
                      </li>
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                          <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
                          <i className="fa fa-chevron-right"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}