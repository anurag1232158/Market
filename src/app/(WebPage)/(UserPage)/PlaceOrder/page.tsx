// app/(WebPage)/(UserPage)/PlaceOrder/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface CartItem {
  name: string;
  price: string | number;
  qty?: number;
  quantity?: number;
  discount?: string | number;
  pic?: string;
}

interface OrderData {
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
  orderStatus: string;
  createdAt: string;
}

export default function PlaceOrderPage() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [justPlaced, setJustPlaced] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("orderData");
    const placed = localStorage.getItem("justPlaced");

    if (stored) {
      try {
        setOrder(JSON.parse(stored));
        setJustPlaced(placed === "true");
      } catch {
        router.replace("/");
      }
    } else {
      router.replace("/");
    }
    setLoading(false);
  }, [router]);

  const parseNum = (v?: string | number) =>
    Number(String(v || 0).replace(/,/g, "")) || 0;

  const cartItems: CartItem[] = order
    ? (() => {
        try {
          const parsed = JSON.parse(order.items || "[]");
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      })()
    : [];

  const subtotal = parseNum(order?.subtotal);
  const discount = parseNum(order?.discount);
  const tax = parseNum(order?.tax);
  const shipping = parseNum(order?.shippingCharge);
  const total = parseNum(order?.totalAmount);

  const fmt = (n: number) =>
    `Rs. ${n.toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;

  /* Download Invoice */
  const downloadInvoice = () => {
    if (!order) return;
    const doc = new jsPDF();

    /* Header */
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

    /* Order Info */
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Order No: ${order.orderNo}`, 15, 42);
    doc.text(`Order ID: ${order.id}`, 15, 48);
    doc.text(
      `Date: ${new Date(order.createdAt).toLocaleDateString("en-IN")}`,
      15,
      54
    );
    doc.text(`Status: ${order.orderStatus}`, 15, 60);

    /* Customer Info */
    autoTable(doc, {
      startY: 68,
      head: [["Customer Information", ""]],
      body: [
        ["Name", order.customerName],
        ["Email", order.customerEmail],
        ["Phone", order.customerPhone],
        [
          "Shipping Address",
          `${order.shippingAddress}, ${order.shippingCity}, ${order.shippingState} - ${order.shippingPin}`,
        ],
        ["Payment", order.paymentMethod.toUpperCase()],
      ],
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [40, 100, 40], textColor: 255 },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
    });

    /* Items */
    const lastY = (doc as any).lastAutoTable?.finalY || 100;

    autoTable(doc, {
      startY: lastY + 8,
      head: [["#", "Product", "Qty", "Price", "Total"]],
      body: cartItems.map((it, i) => {
        const price = parseNum(it.price);
        const qty = parseNum(it.qty || it.quantity || 1);
        return [i + 1, it.name, qty, fmt(price), fmt(price * qty)];
      }),
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [100, 150, 100], textColor: 255 },
    });

    /* Summary */
    const summaryY = (doc as any).lastAutoTable?.finalY || lastY + 20;

    autoTable(doc, {
      startY: summaryY + 8,
      body: [
        ["Subtotal", fmt(subtotal)],
        ["Discount", `- ${fmt(discount)}`],
        ["Tax", fmt(tax)],
        ["Shipping", shipping === 0 ? "FREE" : fmt(shipping)],
        ["Total Amount", fmt(total)],
      ],
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 60 },
        1: { halign: "right" },
      },
    });

    /* Footer */
    const ph = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      "This is a computer-generated invoice. No signature required.",
      105,
      ph - 15,
      { align: "center" }
    );

    doc.save(`Invoice_${order.orderNo}.pdf`);
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <>
      <section className="py-5">
        <div className="container-fluid w-90">
     

          {/* Action Buttons */}
          <div className="d-flex gap-2 justify-content-center mb-4 flex-wrap">
            <button
              className="btn btn-success"
              onClick={downloadInvoice}
            >
              <i className="fa fa-download me-2"></i>
              Download Invoice
            </button>
            <Link href="/OrderSummary" className="btn btn-info text-white">
              <i className="fa fa-list me-2"></i>
              My Orders
            </Link>
            <Link href="/AllCategorys" className="btn btn-outline-success">
              <i className="fa fa-shopping-bag me-2"></i>
              Continue Shopping
            </Link>
          </div>

          <div className="row">
            {/* LEFT: Billing + Order Info */}
            <div className="col-lg-6 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">
                    <i className="fa fa-user me-2"></i>
                    Delivery Details
                  </h5>
                </div>
                <div className="card-body">
                  <table className="table table-bordered mb-0">
                    <tbody className="table">
                      <tr>
                        <th width="35%">Name</th>
                        <td>{order.customerName}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{order.customerEmail}</td>
                      </tr>
                      <tr>
                        <th>Phone</th>
                        <td>{order.customerPhone}</td>
                      </tr>
                      <tr>
                        <th>Address</th>
                        <td>
                          {order.shippingAddress}, {order.shippingCity},{" "}
                          {order.shippingState} - {order.shippingPin}
                        </td>
                      </tr>
                      <tr>
                        <th>Payment</th>
                        <td>
                          <span className="badge bg-warning text-dark">
                            {order.paymentMethod.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <td>
                          <span className="badge bg-info">
                            {order.orderStatus}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

        {/* RIGHT: Order Summary — ✅ TABLE layout */}
<div className="col-lg-6 mb-4">
  <div className="card border-0 shadow-sm h-100">
    <div className="card-header bg-success text-white">
      <h5 className="mb-0">
        <i className="fa fa-receipt me-2"></i>
        Order Summary
      </h5>
    </div>
    <div className="card-body">
      {/* Items Table */}
      <div className="table-responsive mb-3">
        <table className="table table-sm table-bordered align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Product</th>
              <th className="text-center">Qty</th>
              <th className="text-end">Price</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((it, i) => {
              const price = parseNum(it.price);
              const qty = parseNum(it.qty || it.quantity || 1);
              return (
                <tr key={i}>
                  <td>
                    <small>{it.name}</small>
                  </td>
                  <td className="text-center">{qty}</td>
                  <td className="text-end">₹{price}</td>
                  <td className="text-end">
                    <strong className="text-success">₹{price * qty}</strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Table */}
      <table className="table table-bordered">
        <tbody className="table-light">
          <tr>
            <td>Subtotal</td>
            <td className="text-end">
              <strong>₹{subtotal}</strong>
            </td>
          </tr>
          {discount > 0 && (
            <tr className="text-success">
              <td>Discount</td>
              <td className="text-end">
                <strong>- ₹{discount}</strong>
              </td>
            </tr>
          )}
          <tr>
            <td>Tax</td>
            <td className="text-end">
              <strong>₹{tax}</strong>
            </td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td className="text-end">
              <strong>
                {shipping === 0 ? (
                  <span className="text-success">FREE</span>
                ) : (
                  `₹${shipping}`
                )}
              </strong>
            </td>
          </tr>
          <tr className="table-light">
            <td className="fw-bold">Total</td>
            <td className="text-end">
              <strong className="text-success fs-5">₹{total}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>
    </>
  );
}
