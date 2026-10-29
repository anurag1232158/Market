"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/page";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import { Policy, emptyPolicy } from "../PolicyFields";

function ViewContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Policy>(emptyPolicy);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`/api/policy?id=${id}`)
      .then((res) => res.json())
      .then((result) => { setData({ ...emptyPolicy, ...result }); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const val = (v?: string) => (v && v !== "" ? v : "-");
  const fmt = (v?: string) => (v ? v.split("T")[0] : "-");

  const statusBadge = (s?: string) => {
    const map: any = {
      Active: "bg-success",
      Inactive: "bg-secondary",
      Draft: "bg-warning text-dark",
    };
    return map[s || ""] || "bg-secondary";
  };

  const rows: [string, string][] = [
    ["Title", val(data.title)],
    ["Slug", val(data.slug)],
    ["Type", val(data.type)],
    ["Version", `v${val(data.version)}`],
    ["Effective Date", fmt(data.effectiveDate)],
    ["Last Updated", fmt(data.lastUpdated)],
    ["Contact Email", val(data.contactEmail)],
    ["Contact Phone", val(data.contactPhone)],
    ["Show on Footer", val(data.showOnFooter)],
    ["Footer Order", val(data.order)],
    ["Status", val(data.status)],
    ["Meta Title", val(data.metaTitle)],
    ["Meta Description", val(data.metaDescription)],
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
                  View Policy
                  <Link href="/AdminPolicie"><i className="fa fa-arrow-left ms-2 text-white"></i></Link>
                </h5>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  {/* Header */}
                  <div className="text-center mb-4 p-4 border rounded bg-white">
                    <h2 className="fw-bold mb-2">{val(data.title)}</h2>
                    <span className={`badge fs-6 me-2 ${statusBadge(data.status)}`}>
                      {val(data.status)}
                    </span>
                    <span className="badge fs-6 bg-info text-dark me-2">
                      {val(data.type)}
                    </span>
                    <code className="bg-light p-2 rounded d-inline-block">
                      v{val(data.version)}
                    </code>
                    <p className="text-muted mt-2 mb-0">
                      Effective: {fmt(data.effectiveDate)}
                      {data.lastUpdated && ` | Updated: ${fmt(data.lastUpdated)}`}
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="alert alert-info">
                    <strong>Summary:</strong> {val(data.summary)}
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h5 className="fw-bold border-bottom pb-2">Content</h5>
                    <div
                      className="border rounded p-4 bg-white"
                      style={{ whiteSpace: "pre-line" }}
                      dangerouslySetInnerHTML={{ __html: data.content || "-" }}
                    />
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

                  {/* Actions */}
                  <div className="btn-group w-100 py-4">
                    <button onClick={() => router.push("/AdminPolicie")} className="btn btn-primary text-light w-50">Back</button>
                    <Link href={`/AdminPolicie/Update?id=${id}`} className="btn btn-warning text-dark w-50">Edit Policy</Link>
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

export default function AdminViewPolicy() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}