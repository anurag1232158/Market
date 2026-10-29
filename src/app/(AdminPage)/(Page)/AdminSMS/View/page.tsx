"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/page";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../../AOS/AOS";
import { SMS, emptySMS } from "../SMSFields";

function ViewContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<SMS>(emptySMS);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/sms?id=${id}`)
      .then((res) => res.json())
      .then((result) => {
        setData({ ...emptySMS, ...result });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const val = (v?: string) => (v && v !== "" ? v : "-");
  const fmt = (v?: string) => (v ? v.split("T")[0] : "-");

  const statusBadge = (s?: string) => {
    const map: any = {
      Draft: "bg-secondary",
      Scheduled: "bg-info text-dark",
      Sending: "bg-warning text-dark",
      Sent: "bg-success",
      Failed: "bg-danger",
      Cancelled: "bg-dark",
    };
    return map[s || ""] || "bg-secondary";
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!id)
    return (
      <div className="alert alert-danger m-3">❌ No ID provided.</div>
    );

  /* Preview with placeholder replace */
  const previewMessage = (data.message || "")
    .replace(/{name}/g, "Satyam Kumar")
    .replace(/{orderNo}/g, "ORD-123456")
    .replace(/{amount}/g, "1830")
    .replace(/{points}/g, "500")
    .replace(/{trackingId}/g, "DLV123456")
    .replace(/{link}/g, "example.com/review")
    .replace(/{product}/g, "Peri Peri Makhana")
    .replace(/{qty}/g, "5");

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
                  View Message
                  <Link href="/AdminSMS">
                    <i className="fa fa-arrow-left ms-2 text-white"></i>
                  </Link>
                </h5>
              </div>

              {/* Header Info */}
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h4 className="fw-bold mb-2">{val(data.title)}</h4>
                      <div className="d-flex flex-wrap gap-2 mb-2">
                        <span className="badge bg-info text-dark">
                          {val(data.type)}
                        </span>
                        <span className={`badge ${statusBadge(data.status)}`}>
                          {val(data.status)}
                        </span>
                        <span className="badge bg-secondary">
                          Priority: {val(data.priority)}
                        </span>
                      </div>
                      <p className="mb-0 text-muted">
                        <i className="fa fa-users me-1"></i>
                        Recipients: <strong>{val(data.recipients)}</strong>
                        {data.recipientValue && ` (${data.recipientValue})`}
                      </p>
                    </div>
                    <div className="col-md-4 text-end">
                      <div className="mb-2">
                        {data.channels.map((ch) => (
                          <span
                            key={ch}
                            className="badge bg-primary me-1"
                          >
                            <i
                              className={`fa ${
                                ch === "SMS"
                                  ? "fa-sms"
                                  : ch === "WhatsApp"
                                  ? "fa-whatsapp"
                                  : ch === "Email"
                                  ? "fa-envelope"
                                  : "fa-bell"
                              } me-1`}
                            ></i>
                            {ch}
                          </span>
                        ))}
                      </div>
                      <small className="text-muted d-block">
                        Created: {fmt(data.createdAt)}
                      </small>
                      <small className="text-muted d-block">
                        Sent: {fmt(data.sentAt || data.updatedAt)}
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="card bg-success text-white">
                    <div className="card-body text-center">
                      <h6 className="mb-0 small">Sent</h6>
                      <h3 className="mb-0">{data.sentCount || 0}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-info text-white">
                    <div className="card-body text-center">
                      <h6 className="mb-0 small">Delivered</h6>
                      <h3 className="mb-0">{data.deliveredCount || 0}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-danger text-white">
                    <div className="card-body text-center">
                      <h6 className="mb-0 small">Failed</h6>
                      <h3 className="mb-0">{data.failedCount || 0}</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Preview */}
              <div className="card mb-4">
                <div className="card-header bg-white">
                  <h6 className="mb-0 fw-bold">
                    <i className="fa fa-comment text-primary me-1"></i>
                    Message Preview
                  </h6>
                </div>
                <div className="card-body">
                  <div
                    className="alert alert-success mb-0"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {val(previewMessage)}
                  </div>
                  <small className="text-muted d-block mt-2">
                    <i className="fa fa-info-circle me-1"></i>
                    यह preview है — actual message में variables replace होकर जाएँगे
                  </small>
                </div>
              </div>

              {/* Email Content */}
              {data.channels.includes("Email") && (
                <div className="card mb-4">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-envelope text-danger me-1"></i>
                      Email Content
                    </h6>
                  </div>
                  <div className="card-body">
                    <p className="mb-2">
                      <strong>Subject:</strong> {val(data.emailSubject)}
                    </p>
                    <div
                      className="border rounded p-3 bg-light"
                      dangerouslySetInnerHTML={{
                        __html: data.emailBody || "<p>No content</p>",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Notes */}
              {data.notes && (
                <div className="card mb-4">
                  <div className="card-header bg-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-sticky-note text-warning me-1"></i>
                      Internal Notes
                    </h6>
                  </div>
                  <div className="card-body">
                    <p className="mb-0" style={{ whiteSpace: "pre-line" }}>
                      {data.notes}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="btn-group w-100 py-4">
                <button
                  onClick={() => router.push("/AdminSMS")}
                  className="btn btn-primary text-light w-50"
                >
                  Back
                </button>
                <Link
                  href={`/AdminSMS/Update?id=${id}`}
                  className="btn btn-warning text-dark w-50"
                >
                  Edit Message
                </Link>
              </div>
            </div>
          </section>
          <PageFooter />
        </div>
      </div>
    </>
  );
}

export default function AdminViewSMS() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}