"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/page";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import { Coupon, emptyCoupon } from "../CouponFields";

function ViewContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Coupon>(emptyCoupon);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`/api/coupon?id=${id}`)
      .then((res) => res.json())
      .then((result) => { setData({ ...emptyCoupon, ...result }); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const val = (v?: string) => (v && v !== "" ? v : "-");
  const fmt = (v?: string) => (v ? v.split("T")[0] : "-");

  const statusBadge = (s?: string) => {
    const map: any = {
      Active: "bg-success",
      Inactive: "bg-secondary",
      Expired: "bg-danger",
    };
    return map[s || ""] || "bg-secondary";
  };

  const isExpired = (endDate?: string) => {
    if (!endDate) return false;
    return new Date(endDate.split("T")[0]) < new Date();
  };

  const remaining = Number(data.usageLimit || 0) - Number(data.usedCount || 0);
  const usagePercent = data.usageLimit
    ? Math.min(100, (Number(data.usedCount) / Number(data.usageLimit)) * 100)
    : 0;

  const rows: [string, string][] = [
    ["Code", val(data.code)],
    ["Title", val(data.title)],
    ["Type", val(data.type)],
    ["Discount Value", data.type === "Percentage" ? `${data.value}%` : `₹${data.value}`],
    ["Min Order", `₹${val(data.minOrder)}`],
    ["Max Discount", data.maxDiscount ? `₹${data.maxDiscount}` : "-"],
    ["Customer Type", val(data.customerType)],
    ["Applicable To", val(data.applicableTo)],
    ["Applicable Value", val(data.applicableValue)],
    ["Total Usage Limit", val(data.usageLimit)],
    ["Per User Limit", val(data.perUserLimit)],
    ["Used Count", val(data.usedCount)],
    ["Remaining", String(remaining)],
    ["Start Date", fmt(data.startDate)],
    ["End Date", fmt(data.endDate)],
    ["Status", val(data.status)],
    ["Featured", val(data.isFeatured)],
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
                  View Coupon
                  <Link href="/AdminCoupon"><i className="fa fa-arrow-left ms-2 text-white"></i></Link>
                </h5>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  {/* Coupon Card Preview */}
                  <div
                    className="text-center p-4 mb-4 border rounded"
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "#fff",
                    }}
                  >
                    <h2 className="fw-bold">{val(data.title)}</h2>
                    <div
                      className="d-inline-block px-4 py-2 my-3 rounded"
                      style={{ background: "#fff", color: "#764ba2" }}
                    >
                      <h3 className="mb-0 fw-bold">{val(data.code)}</h3>
                    </div>
                    <h3 className="fw-bold">
                      {data.type === "Percentage" ? `${data.value}% OFF` : `₹${data.value} OFF`}
                    </h3>
                    {data.description && (
                      <p className="mb-0 mt-2">{data.description}</p>
                    )}
                    <p className="mt-3 mb-0">
                      <small>Valid till: {fmt(data.endDate)}</small>
                    </p>
                  </div>

                  {/* Usage Progress */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="fw-bold">Usage Progress</span>
                      <span>
                        {data.usedCount || 0} / {data.usageLimit || 0}
                      </span>
                    </div>
                    <div className="progress" style={{ height: "20px" }}>
                      <div
                        className={`progress-bar ${
                          usagePercent >= 90 ? "bg-danger" :
                          usagePercent >= 70 ? "bg-warning" : "bg-success"
                        }`}
                        style={{ width: `${usagePercent}%` }}
                      >
                        {Math.round(usagePercent)}%
                      </div>
                    </div>
                    <small className="text-muted">
                      Remaining: {remaining} uses
                    </small>
                  </div>

                  {/* Badges */}
                  <div className="text-center mb-4">
                    <span className={`badge fs-6 me-2 ${statusBadge(data.status)}`}>
                      {val(data.status)}
                    </span>
                    {isExpired(data.endDate) && (
                      <span className="badge fs-6 bg-danger me-2">Expired</span>
                    )}
                    {data.isFeatured === "Yes" && (
                      <span className="badge fs-6 bg-warning text-dark">★ Featured</span>
                    )}
                  </div>

                  {/* Banner Image */}
                  {data.bannerImage && (
                    <div className="text-center mb-4">
                      <img
                        src={`/assets/images/${data.bannerImage}`}
                        alt="Banner"
                        className="img-fluid border rounded"
                        style={{ maxHeight: "200px" }}
                      />
                    </div>
                  )}

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

                  {/* Terms */}
                  {data.terms && (
                    <div className="mt-3">
                      <h6 className="fw-bold">Terms & Conditions</h6>
                      <div className="border rounded p-3 bg-light">
                        <p style={{ whiteSpace: "pre-line" }} className="mb-0">
                          {data.terms}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="btn-group w-100 py-4">
                    <button onClick={() => router.push("/AdminCoupon")} className="btn btn-primary text-light w-50">Back</button>
                    <Link href={`/AdminCoupon/Update?id=${id}`} className="btn btn-warning text-dark w-50">Edit Coupon</Link>
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

export default function AdminViewCoupon() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}