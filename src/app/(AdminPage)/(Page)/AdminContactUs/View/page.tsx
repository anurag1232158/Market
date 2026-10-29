"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/page";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import { Contact, emptyContact } from "../ContactFields";

function ViewContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Contact>(emptyContact);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const source = searchParams.get("source") || "contact";

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/contact?id=${id}&source=${source}`)
      .then((res) => res.json())
      .then((result) => {
        setData({ ...emptyContact, ...result });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, source]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const val = (v?: string) => (v && v !== "" ? v : "-");
  const fmt = (v?: string) => (v ? v.split("T")[0] : "-");
  const fmtDT = (v?: string) => (v ? new Date(v).toLocaleString() : "-");

  const roleBadge = (r?: string) => {
    const map: any = {
      User: "bg-primary",
      Admin: "bg-danger",
      Report: "bg-warning text-dark",
      Wholesale: "bg-info text-dark",
    };
    return map[r || ""] || "bg-secondary";
  };

  const statusBadge = (s?: string) => {
    const map: any = {
      Active: "bg-success",
      Blocked: "bg-danger",
      Inactive: "bg-secondary",
    };
    return map[s || ""] || "bg-secondary";
  };

  const roleIcon = (r?: string) => {
    const map: any = {
      User: "fa-user",
      Admin: "fa-user-shield",
      Report: "fa-chart-bar",
      Wholesale: "fa-boxes",
    };
    return map[r || ""] || "fa-user";
  };

  const rows: [string, string][] = [
    ["Full Name", val(data.name)],
    ["Phone", val(data.number)],
    ["Alternate Phone", val(data.altNumber)],
    ["Email", val(data.email)],
    ["Role", val(data.role)],
    ["Company", val(data.company)],
    ["GST Number", val(data.gst)],
    ["Address", val(data.address)],
    ["City", val(data.city)],
    ["State", val(data.state)],
    ["Country", val(data.country)],
    ["PIN Code", val(data.pin)],
    ["Last Login", fmtDT(data.lastLogin)],
    ["Created At", fmt(data.createdAt)],
    ["Updated At", fmt(data.updatedAt)],
  ];

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading contact details...</p>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="alert alert-danger m-3">
        ❌ No ID provided. Use: /AdminContactUs/View?id=xxxxx&source=user
      </div>
    );
  }

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
                  View Contact
                  <span className="badge bg-light text-dark ms-2">
                    Source: {source}
                  </span>
                  <Link href="/AdminContactUs">
                    <i className="fa fa-arrow-left ms-2 text-white"></i>
                  </Link>
                </h5>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  <div className="row">
                    {/* LEFT : Photo + Badges */}
                    <div className="col-md-4 text-center mb-4">
                      {data.image && !data.image.startsWith("blob:") ? (
                        <img
                          src={
                            data.image.startsWith("http")
                              ? data.image
                              : `/assets/images/${data.image}`
                          }
                          alt={data.name}
                          width="150"
                          height="150"
                          className="rounded-circle border"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Ctext x='50%25' y='50%25' font-size='80' text-anchor='middle' dy='.3em' fill='%23ccc'%3E👤%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      ) : (
                        <i
                          className="fa fa-user-circle"
                          style={{ fontSize: "120px", color: "#aaa" }}
                        ></i>
                      )}

                      <h4 className="mt-3 mb-1">{val(data.name)}</h4>
                      {data.company && (
                        <p className="text-muted mb-1">{data.company}</p>
                      )}
                      <p className="mb-2">
                        <i className="fa fa-phone"></i> {val(data.number)}
                      </p>

                      <div className="mt-2">
                        <span className={`badge me-2 fs-6 ${roleBadge(data.role)}`}>
                          <i className={`fa ${roleIcon(data.role)} me-1`}></i>
                          {val(data.role)}
                        </span>
                        <span className={`badge fs-6 ${statusBadge(data.status)}`}>
                          {val(data.status)}
                        </span>
                      </div>

                      {/* Quick Contact */}
                      <div className="mt-4">
                        {data.number && (
                          <>
                            <a
                              href={`tel:${data.number}`}
                              className="btn btn-sm btn-success me-2 mb-2"
                            >
                              <i className="fa fa-phone"></i> Call
                            </a>
                            <a
                              href={`https://wa.me/91${data.number.replace(/\D/g, "").slice(-10)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-success me-2 mb-2"
                            >
                              <i className="fa fa-whatsapp"></i> WhatsApp
                            </a>
                          </>
                        )}
                        {data.email && (
                          <a
                            href={`mailto:${data.email}`}
                            className="btn btn-sm btn-info text-white mb-2"
                          >
                            <i className="fa fa-envelope"></i> Email
                          </a>
                        )}
                      </div>
                    </div>

                    {/* RIGHT : Details */}
                    <div className="col-md-8">
                      <table className="table table-bordered table-hover">
                        <tbody>
                          {rows.map(([l, v]) => (
                            <tr key={l}>
                              <th
                                className="bg-gradient text-dark"
                                style={{ width: "35%" }}
                              >
                                {l}
                              </th>
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
                    <button
                      onClick={() => router.push("/AdminContactUs")}
                      className="btn btn-primary text-light w-50"
                    >
                      Back
                    </button>
                    <Link
                      href={`/AdminContactUs/Update?id=${id}&source=${source}`}
                      className="btn btn-warning text-dark w-50"
                    >
                      Edit Contact
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

export default function AdminViewContact() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}