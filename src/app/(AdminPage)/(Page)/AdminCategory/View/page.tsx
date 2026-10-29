"use client";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/Footer";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import { Category, emptyCategory } from "../CategoryFields";

/* ⚠️ Suspense जरूरी है क्योंकि useSearchParams() को wrapper चाहिए */
function ViewContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Category>(emptyCategory);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/category?id=${id}`)
      .then((res) => res.json())
      .then((result) => {
        setData({ ...emptyCategory, ...result });
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
    ["Category Name", val(data.name)],
    ["Slug", val(data.slug)],
    ["Parent Category", val(data.parent)],
    ["Sort Order", val(data.sortOrder)],
    ["Featured", val(data.isFeatured)],
    ["Status", val(data.status)],
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
        ❌ No ID provided in URL. Use: /AdminCategory/View?id=xxxxx
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
                  View Category
                  <Link href="/AdminCategory">
                    <i className="fa fa-arrow-left ms-2 text-white"></i>
                  </Link>
                </h5>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  <div className="row">
                    <div className="col-md-4 text-center">
                      {data.image ? (
                        <img
                          src={`/assets/images/${data.image}`}
                          alt=""
                          className="img-fluid border rounded"
                          style={{ maxHeight: "250px" }}
                        />
                      ) : (
                        <div className="border rounded p-5">No Image</div>
                      )}
                    </div>
                    <div className="col-md-8">
                      <table className="table table-bordered">
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

                  <div className="mt-3">
                    <h6 className="fw-bold">Description</h6>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {val(data.description)}
                    </p>
                  </div>

                  <div className="btn-group w-100 py-4">
                    <button
                      onClick={() => router.push("/AdminCategory")}
                      className="btn btn-primary text-light w-50"
                    >
                      Back
                    </button>
                    <Link
                      href={`/AdminCategory/Update?id=${id}`}
                      className="btn btn-warning text-dark w-50"
                    >
                      Edit
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

/* ⚠️ Suspense wrapper जरूरी है Next.js 15 में */
export default function AdminViewCategory() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}