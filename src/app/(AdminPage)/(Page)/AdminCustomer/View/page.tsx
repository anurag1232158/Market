"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/Footer";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import { Customer, emptyCustomer } from "../CustomerFields";

function ViewContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Customer>(emptyCustomer);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`/api/customer?id=${id}`)
      .then((res) => res.json())
      .then((result) => { setData({ ...emptyCustomer, ...result }); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const val = (v?: string) => (v && v !== "" ? v : "-");
  const fmt = (v?: string) => (v ? v.split("T")[0] : "-");

  const rows: [string, string][] = [
    ["Full Name", val(data.name)],
    ["Phone", val(data.number)],
    ["Alternate Phone", val(data.altNumber)],
    ["Email", val(data.email)],
    ["Customer Type", val(data.type)],
    ["Company", val(data.company)],
    ["GST Number", val(data.gst)],
    ["Credit Limit", `₹${val(data.creditLimit)}`],
    ["Address", val(data.address)],
    ["City", val(data.city)],
    ["State", val(data.state)],
    ["Country", val(data.country)],
    ["PIN Code", val(data.pin)],
    ["Total Orders", val(data.totalOrders)],
    ["Total Spent", `₹${val(data.totalSpent)}`],
    ["Status", val(data.status)],
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
                  View Customer
                  <Link href="/AdminCustomer"><i className="fa fa-arrow-left ms-2 text-white"></i></Link>
                </h5>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  <div className="row">
                    {/* LEFT : Photo + Stats */}
                    <div className="col-md-4 text-center mb-4">
                      {data.image ? (
                        <img
                          src={`/assets/images/${data.image}`}
                          alt={data.name}
                          width="150"
                          height="150"
                          className="rounded-circle border"
                        />
                      ) : (
                        <i className="fa fa-user-circle" style={{ fontSize: "120px", color: "#aaa" }}></i>
                      )}

                      <h4 className="mt-3 mb-1">{val(data.name)}</h4>
                      {data.company && <p className="text-muted mb-1">{data.company}</p>}
                      <p className="mb-2">
                        <i className="fa fa-phone"></i> {val(data.number)}
                      </p>

                      <div className="mt-2">
                        <span className={`badge me-2 ${
                          data.status === "Active" ? "bg-success" : "bg-danger"
                        }`}>
                          {val(data.status)}
                        </span>
                        <span className="badge bg-info text-dark">{val(data.type)}</span>
                      </div>

                      <div className="row mt-4">
                        <div className="col-6">
                          <div className="border rounded p-2">
                            <small className="text-muted d-block">Orders</small>
                            <strong>{val(data.totalOrders)}</strong>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="border rounded p-2">
                            <small className="text-muted d-block">Spent</small>
                            <strong>₹{val(data.totalSpent)}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT : Details */}
                    <div className="col-md-8">
                      <table className="table table-bordered table-hover">
                        <tbody>
                          {rows.map(([l, v]) => (
                            <tr key={l}>
                              <th className="bg-gradient text-dark" style={{ width: "35%" }}>{l}</th>
                              <td>{v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mt-3">
                    <h6 className="fw-bold">Internal Notes</h6>
                    <p style={{ whiteSpace: "pre-line" }}>{val(data.notes)}</p>
                  </div>

                  <div className="btn-group w-100 py-4">
                    <button onClick={() => router.push("/AdminCustomer")} className="btn btn-primary text-light w-50">Back</button>
                    <Link href={`/AdminCustomer/Update?id=${id}`} className="btn btn-warning text-dark w-50">Edit Customer</Link>
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

export default function AdminViewCustomer() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}