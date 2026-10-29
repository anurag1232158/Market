"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/Footer";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import { Order, emptyOrder } from "../OrderFields";

function ViewContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Order>(emptyOrder);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`/api/order?id=${id}`)
      .then((res) => res.json())
      .then((result) => { setData({ ...emptyOrder, ...result }); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const val = (v?: string) => (v && v !== "" ? v : "-");
  const fmt = (v?: string) => (v ? v.split("T")[0] : "-");

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

  /* Parse items */
  let items: any[] = [];
  try {
    items = JSON.parse(data.items || "[]");
  } catch {
    items = [];
  }

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!id) return <div className="alert alert-danger m-3">❌ No ID provided.</div>;

  return (
    <>
      <ASO />
      <div className="wrapper">
        <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
          <PageNavbar toggleSidebar={toggleSidebar} />
          <section className="mb-5 py-5">
            <div className="container-fluid px-4">
              <div className="border p-3 mb-4 bg-gradient text-center">
                <h5 className="mb-0 fw-bold text-white">
                  Order Details - {val(data.orderNo)}
                  <Link href="/AdminOrder"><i className="fa fa-arrow-left ms-2 text-white"></i></Link>
                </h5>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  {/* Header */}
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h4 className="fw-bold mb-2">Order #{val(data.orderNo)}</h4>
                      <p className="mb-1">
                        <strong>Date:</strong> {fmt(data.orderDate)}
                      </p>
                      <p className="mb-1">
                        <strong>Customer Type:</strong> {val(data.customerType)}
                      </p>
                    </div>
                    <div className="col-md-6 text-end">
                      <span className={`badge fs-6 me-2 ${orderStatusBadge(data.orderStatus)}`}>
                        {val(data.orderStatus)}
                      </span>
                      <span className={`badge fs-6 ${paymentBadge(data.paymentStatus)}`}>
                        {val(data.paymentStatus)}
                      </span>
                    </div>
                  </div>

                  <hr />

                  {/* Customer & Shipping */}
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h6 className="fw-bold">Customer Info</h6>
                      <p className="mb-1"><strong>Name:</strong> {val(data.customerName)}</p>
                      <p className="mb-1"><strong>Phone:</strong> {val(data.customerPhone)}</p>
                      <p className="mb-1"><strong>Email:</strong> {val(data.customerEmail)}</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold">Shipping Address</h6>
                      <p className="mb-1">{val(data.shippingAddress)}</p>
                      <p className="mb-1">
                        {val(data.shippingCity)}, {val(data.shippingState)} - {val(data.shippingPin)}
                      </p>
                      <p className="mb-1">{val(data.shippingCountry)}</p>
                    </div>
                  </div>

                  {/* Items Table */}
                  <h6 className="fw-bold mb-2">Order Items</h6>
                  <div className="table-responsive mb-4">
                    <table className="table table-bordered">
                      <thead>
                        <tr className="bg-light">
                          <th>#</th>
                          <th>Product</th>
                          <th>Qty</th>
                          <th>Unit</th>
                          <th>Price</th>
                          <th className="text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.length > 0 ? items.map((it, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{it.name || "-"}</td>
                            <td>{it.qty || 0}</td>
                            <td>{it.unit || "-"}</td>
                            <td>₹{it.price || 0}</td>
                            <td className="text-end fw-bold">
                              ₹{(Number(it.qty) || 0) * (Number(it.price) || 0)}
                            </td>
                          </tr>
                        )) : (
                          <tr><td colSpan={6} className="text-center">No items</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Amount Summary */}
                  <div className="row">
                    <div className="col-md-6 offset-md-6">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <th>Subtotal</th>
                            <td className="text-end">₹{val(data.subtotal)}</td>
                          </tr>
                          <tr>
                            <th>Discount</th>
                            <td className="text-end text-danger">- ₹{val(data.discount)}</td>
                          </tr>
                          <tr>
                            <th>Tax (GST)</th>
                            <td className="text-end">+ ₹{val(data.tax)}</td>
                          </tr>
                          <tr>
                            <th>Shipping</th>
                            <td className="text-end">+ ₹{val(data.shippingCharge)}</td>
                          </tr>
                          <tr className="bg-gradient">
                            <th className="text-dark fs-5">Total Amount</th>
                            <td className="text-end text-dark fs-5 fw-bold">
                              ₹{val(data.totalAmount)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h6 className="fw-bold">Payment Info</h6>
                      <p className="mb-1"><strong>Method:</strong> {val(data.paymentMethod)}</p>
                      <p className="mb-1"><strong>Status:</strong> {val(data.paymentStatus)}</p>
                      <p className="mb-1"><strong>Txn ID:</strong> {val(data.paymentId)}</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold">Shipping Info</h6>
                      <p className="mb-1"><strong>Courier:</strong> {val(data.courier)}</p>
                      <p className="mb-1"><strong>Tracking:</strong> {val(data.trackingId)}</p>
                      <p className="mb-1"><strong>Shipped:</strong> {fmt(data.shippedDate)}</p>
                      <p className="mb-1"><strong>Delivered:</strong> {fmt(data.deliveredDate)}</p>
                    </div>
                  </div>

                  {/* Notes */}
                  {data.customerNote && (
                    <div className="alert alert-info">
                      <strong>Customer Note:</strong> {data.customerNote}
                    </div>
                  )}
                  {data.adminNote && (
                    <div className="alert alert-warning">
                      <strong>Admin Note:</strong> {data.adminNote}
                    </div>
                  )}

                  <div className="btn-group w-100 py-4">
                    <button onClick={() => router.push("/AdminOrder")} className="btn btn-primary text-light w-50">Back</button>
                    <Link href={`/AdminOrder/Update?id=${id}`} className="btn btn-warning text-dark w-50">Edit Order</Link>
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

export default function AdminViewOrder() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}