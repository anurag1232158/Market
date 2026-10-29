"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/page";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import { Payment, emptyPayment } from "../PaymentFields";

function ViewContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Payment>(emptyPayment);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`/api/payment?id=${id}`)
      .then((res) => res.json())
      .then((result) => { setData({ ...emptyPayment, ...result }); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const val = (v?: string) => (v && v !== "" ? v : "-");
  const fmt = (v?: string) => (v ? v.split("T")[0] : "-");

  const statusBadge = (s?: string) => {
    const map: any = {
      Pending: "bg-warning text-dark",
      Paid: "bg-success",
      Failed: "bg-danger",
      Refunded: "bg-info text-dark",
      Cancelled: "bg-secondary",
    };
    return map[s || ""] || "bg-secondary";
  };

  const rows: [string, string][] = [
    ["Order Number", val(data.orderNo)],
    ["Customer Name", val(data.customerName)],
    ["Phone", val(data.customerPhone)],
    ["Email", val(data.customerEmail)],
    ["Customer Type", val(data.customerType)],
    ["Amount", `₹${val(data.amount)}`],
    ["Currency", val(data.currency)],
    ["Payment Method", val(data.method)],
    ["Payment Type", val(data.type)],
    ["Payment Status", val(data.status)],
    ["Transaction Ref", val(data.transactionRef)],
    ["Bank Name", val(data.bankName)],
    ["UPI ID", val(data.upiId)],
    ["Card Last 4", val(data.cardLast4)],
    ["Payment Date", fmt(data.paymentDate)],
    ["Cleared Date", fmt(data.clearedDate)],
    ["Created At", fmt(data.createdAt)],
    ["Updated At", fmt(data.updatedAt)],
  ];

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
                  View Payment
                  <Link href="/AdminPayment"><i className="fa fa-arrow-left ms-2 text-white"></i></Link>
                </h5>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  {/* Receipt Header */}
                  <div className="text-center mb-4 p-4 border rounded bg-white">
                    <h3 className="fw-bold text-primary mb-2">
                      🥜 Makhana Store
                    </h3>
                    <p className="mb-1 text-muted">Payment Receipt</p>
                    <code className="bg-light p-2 rounded d-inline-block">
                      {val(data.paymentId)}
                    </code>
                  </div>

                  {/* Amount Highlight */}
                  <div className="text-center mb-4">
                    <h5 className="text-muted mb-2">Amount</h5>
                    <h1 className="fw-bold text-success">₹{val(data.amount)}</h1>
                    <span className={`badge fs-6 ${statusBadge(data.status)}`}>
                      {val(data.status)}
                    </span>
                    <span className="badge fs-6 bg-primary ms-2">
                      {val(data.method)}
                    </span>
                  </div>

                  {/* Details Table */}
                  <table className="table table-bordered">
                    <tbody>
                      {rows.map(([l, v]) => (
                        <tr key={l}>
                          <th className="bg-gradient text-dark" style={{ width: "35%" }}>{l}</th>
                          <td>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Notes */}
                  {data.notes && (
                    <div className="mt-3">
                      <h6 className="fw-bold">Notes</h6>
                      <div className="border rounded p-3 bg-light">
                        <p style={{ whiteSpace: "pre-line" }} className="mb-0">
                          {data.notes}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="btn-group w-100 py-4">
                    <button onClick={() => router.push("/AdminPayment")} className="btn btn-primary text-light">
                      Back
                    </button>
                    <button onClick={() => window.print()} className="btn btn-info text-white">
                      <i className="fa fa-print"></i> Print
                    </button>
                    <Link href={`/AdminPayment/Update?id=${id}`} className="btn btn-warning text-dark">
                      Edit Payment
                    </Link>
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

export default function AdminViewPayment() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}