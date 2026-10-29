"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/Footer";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import { Banner, emptyBanner } from "../BannerFields";

function ViewContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Banner>(emptyBanner);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`/api/banner?id=${id}`)
      .then((res) => res.json())
      .then((result) => { setData({ ...emptyBanner, ...result }); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const val = (v?: string) => (v && v !== "" ? v : "-");
  const fmt = (v?: string) => (v ? v.split("T")[0] : "-");

  const rows: [string, string][] = [
    ["Title", val(data.title)],
    ["Subtitle", val(data.subtitle)],
    ["Position", val(data.position)],
    ["Button Text", val(data.buttonText)],
    ["Button Link", val(data.buttonLink)],
    ["Order", val(data.order)],
    ["Status", val(data.status)],
    ["Background Color", val(data.bgColor)],
    ["Text Color", val(data.textColor)],
    ["Start Date", fmt(data.startDate)],
    ["End Date", fmt(data.endDate)],
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
                  View Banner
                  <Link href="/AdminBanner"><i className="fa fa-arrow-left ms-2 text-white"></i></Link>
                </h5>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  {/* Banner preview */}
                  <div
                    className="text-center p-4 mb-4 border rounded"
                    style={{ background: data.bgColor, color: data.textColor }}
                  >
                    <h3>{val(data.title)}</h3>
                    <p>{val(data.subtitle)}</p>
                    {data.buttonText && (
                      <span className="btn btn-primary">{data.buttonText}</span>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6 text-center">
                      {data.image ? (
                        <img src={`/assets/images/${data.image}`} alt="" className="img-fluid border rounded mb-3" />
                      ) : (
                        <div className="border rounded p-4 mb-3">No Desktop Image</div>
                      )}
                      <small className="text-muted d-block">Desktop Image</small>
                    </div>
                    <div className="col-md-6 text-center">
                      {data.mobileImage ? (
                        <img src={`/assets/images/${data.mobileImage}`} alt="" className="img-fluid border rounded mb-3" />
                      ) : (
                        <div className="border rounded p-4 mb-3">No Mobile Image</div>
                      )}
                      <small className="text-muted d-block">Mobile Image</small>
                    </div>
                  </div>

                  <table className="table table-bordered mt-3">
                    <tbody>
                      {rows.map(([l, v]) => (
                        <tr key={l}>
                          <th className="bg-gradient text-dark" style={{ width: "35%" }}>{l}</th>
                          <td>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-3">
                    <h6 className="fw-bold">Description</h6>
                    <p style={{ whiteSpace: "pre-line" }}>{val(data.description)}</p>
                  </div>

                  <div className="btn-group w-100 py-4">
                    <button onClick={() => router.push("/AdminBanner")} className="btn btn-primary text-light w-50">Back</button>
                    <Link href={`/AdminBanner/Update?id=${id}`} className="btn btn-warning text-dark w-50">Edit Banner</Link>
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

export default function AdminViewBanner() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}