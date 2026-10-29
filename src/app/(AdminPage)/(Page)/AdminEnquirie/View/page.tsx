"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/page";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import { Enquiry, emptyEnquiry } from "../EnquiryFields";

function ViewContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Enquiry>(emptyEnquiry);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`/api/enquiry?id=${id}`)
      .then((res) => res.json())
      .then((result) => { setData({ ...emptyEnquiry, ...result }); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const val = (v?: string) => (v && v !== "" ? v : "-");
  const fmt = (v?: string) => (v ? v.split("T")[0] : "-");

  const priorityBadge = (p?: string) => {
    const map: any = {
      Low: "bg-secondary",
      Medium: "bg-info text-dark",
      High: "bg-warning text-dark",
      Urgent: "bg-danger",
    };
    return map[p || ""] || "bg-secondary";
  };

  const statusBadge = (s?: string) => {
    const map: any = {
      New: "bg-primary",
      "In Progress": "bg-warning text-dark",
      Replied: "bg-success",
      "Follow Up": "bg-info text-dark",
      Closed: "bg-secondary",
      Spam: "bg-dark",
    };
    return map[s || ""] || "bg-secondary";
  };

  const rows: [string, string][] = [
    ["Customer Name", val(data.name)],
    ["Phone", val(data.number)],
    ["Email", val(data.email)],
    ["City", val(data.city)],
    ["State", val(data.state)],
    ["Source", val(data.source)],
    ["Enquiry Type", val(data.type)],
    ["Priority", val(data.priority)],
    ["Status", val(data.status)],
    ["Assigned To", val(data.assignedTo)],
    ["Related Product", val(data.product)],
    ["Quantity", val(data.quantity)],
    ["Reply Date", fmt(data.replyDate)],
    ["Next Follow-up", fmt(data.followUpDate)],
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
                  View Enquiry
                  <Link href="/AdminEnquirie"><i className="fa fa-arrow-left ms-2 text-white"></i></Link>
                </h5>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  {/* Header with badges */}
                  <div className="text-center mb-4">
                    <h3>{val(data.subject)}</h3>
                    <span className={`badge me-2 ${priorityBadge(data.priority)}`}>
                      {data.priority || "Medium"}
                    </span>
                    <span className={`badge me-2 ${statusBadge(data.status)}`}>
                      {data.status || "New"}
                    </span>
                    <span className="badge bg-info text-dark">{data.type || "-"}</span>
                  </div>

                  {/* Customer Info */}
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h5 className="fw-bold">
                        <i className="fa fa-user"></i> Customer Info
                      </h5>
                      <p><strong>Name:</strong> {val(data.name)}</p>
                      <p><strong>Phone:</strong> {val(data.number)}</p>
                      <p><strong>Email:</strong> {val(data.email)}</p>
                      <p><strong>City:</strong> {val(data.city)}, {val(data.state)}</p>
                    </div>
                    <div className="col-md-6">
                      <h5 className="fw-bold">
                        <i className="fa fa-info-circle"></i> Enquiry Info
                      </h5>
                      <p><strong>Source:</strong> {val(data.source)}</p>
                      <p><strong>Assigned To:</strong> {val(data.assignedTo)}</p>
                      <p><strong>Product:</strong> {val(data.product)}</p>
                      <p><strong>Quantity:</strong> {val(data.quantity)}</p>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-4">
                    <h5 className="fw-bold">
                      <i className="fa fa-comment"></i> Customer Message
                    </h5>
                    <div className="border rounded p-3" style={{ background: "#fff9e6" }}>
                      <p style={{ whiteSpace: "pre-line" }}>{val(data.message)}</p>
                    </div>
                  </div>

                  {/* Admin Reply */}
                  {data.adminReply && (
                    <div className="mb-4">
                      <h5 className="fw-bold">
                        <i className="fa fa-reply"></i> Admin Reply
                      </h5>
                      <div className="border rounded p-3" style={{ background: "#e6f9e6" }}>
                        <p style={{ whiteSpace: "pre-line" }}>{data.adminReply}</p>
                        {data.replyDate && (
                          <small className="text-muted">
                            Replied on: {fmt(data.replyDate)}
                          </small>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Details Table */}
                  <table className="table table-bordered">
                    <tbody>
                      {rows.map(([l, v]) => (
                        <tr key={l}>
                          <th className="bg-gradient text-dark" style={{ width: "30%" }}>{l}</th>
                          <td>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="btn-group w-100 py-4">
                    <button onClick={() => router.push("/AdminEnquirie")} className="btn btn-primary text-light w-50">Back</button>
                    <Link href={`/AdminEnquirie/Update?id=${id}`} className="btn btn-warning text-dark w-50">Reply & Update</Link>
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

export default function AdminViewEnquiry() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}