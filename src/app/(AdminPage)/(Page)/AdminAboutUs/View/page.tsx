"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/Footer";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import { About, emptyAbout } from "../AboutFields";

function ViewContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<About>(emptyAbout);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/about?id=${id}`)
      .then((res) => res.json())
      .then((result) => {
        setData({ ...emptyAbout, ...result });
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

  const rows: [string, string][] = [
    ["Title", val(data.title)],
    ["Subtitle", val(data.subtitle)],
    ["Section", val(data.section)],
    ["Icon", val(data.icon)],
    ["Order", val(data.order)],
    ["Status", val(data.status)],
    ["Meta Title", val(data.metaTitle)],
    ["Meta Keywords", val(data.metaKeywords)],
    ["Created At", fmt(data.createdAt)],
    ["Updated At", fmt(data.updatedAt)],
  ];

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="alert alert-danger m-3">
        ❌ No ID provided. Use: /AdminAboutUs/View?id=xxxxx
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
                  View About Us Section
                  <Link href="/AdminAboutUs">
                    <i className="fa fa-arrow-left ms-2 text-white"></i>
                  </Link>
                </h5>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  <div className="row">
                    {/* LEFT : Image + Icon */}
                    <div className="col-md-4 text-center mb-4">
                      {data.image ? (
                        <img src={`/assets/images/${data.image}`} alt={data.title} className="img-fluid border rounded" style={{ maxHeight: "300px" }} />
                      ) : (
                        <div className="border rounded p-5">No Image</div>
                      )}
                      {data.icon && (
                        <div className="mt-3"> 
                        <i className={`fa ${data.icon}`} style={{ fontSize: "48px", color: "#2f5fff" }} ></i> 
                        <small className="d-block text-muted mt-1"> {data.icon} </small> 
                        </div>
                      )}
                      <div className="mt-3">
                        <span className={`badge me-2 ${   data.status === "Active"     ? "bg-success"     : "bg-secondary" }`}> {val(data.status)} </span>
                        <span className="badge bg-info text-dark"> {val(data.section)}
                        </span>
                      </div>
                    </div>

                    {/* RIGHT : Details table */}
                    <div className="col-md-8">
                      <table className="table table-bordered table-hover">
                        <tbody> {rows.map(([label, value]) => (   <tr key={label}>     <th       className="bg-gradient text-dark"       style={{ width: "35%" }}     >       {label}     </th>     <td>{value}</td>   </tr> ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-3">
                    <h6 className="fw-bold">Content</h6>
                    <p style={{ whiteSpace: "pre-line" }}>  {val(data.content)}</p>
                  </div>

                  {/* Meta Description */}
                  <div className="mt-3">
                  <h6 className="fw-bold">Meta Description</h6>
                  <p style={{ whiteSpace: "pre-line" }}>  {val(data.metaDescription)}</p>
                  </div>

                  <div className="btn-group w-100 py-4">
                    <button onClick={() => router.push("/AdminAboutUs")} className="btn btn-primary text-light w-50" > Back</button>
                    <Link href={`/AdminAboutUs/Update?id=${id}`} className="btn btn-warning text-dark w-50"> Edit About Section</Link>
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

export default function AdminViewAboutUs() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}