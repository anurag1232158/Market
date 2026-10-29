// src/app/(AdminPage)/(AdminSection)/AdminBestseller/View/page.tsx
"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/Footer";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import { Bestseller, emptyBestseller } from "../BestsellerFields";

function ViewContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Bestseller>(emptyBestseller);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/bestseller?id=${id}`)
      .then((res) => res.json())
      .then((result) => {
        setData({ ...emptyBestseller, ...result }); // ✅ सही नाम
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

  // ✅ Admin + Product दोनों की फील्ड्स
  const adminRows: [string, string][] = [
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

  const productRows: [string, string][] = [
    ["Product Name", val(data.name)],
    ["Slug", val(data.slug)],
    ["Category", val(data.category)],
    ["Flavour", val(data.flavour)],
    ["Weight", val(data.weight)],
    ["Price (₹)", val(data.price)],
    ["Discount (%)", val(data.discount)],
    ["Stock", val(data.stock)],
    ["Rating", val(data.rating)],
    ["Is BestSeller ?", val(data.isBestSeller)],
    ["Is Featured ?", val(data.isFeatured)],
    ["Is Vrat ?", val(data.isVrat)],
    ["Is Gluten Free ?", val(data.isGlutenFree)],
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
        ❌ No ID provided. Use: /AdminBestseller/View?id=xxxxx
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
                  View Bestseller
                  <Link href="/AdminBestseller">
                    <i className="fa-solid fa-arrow-left ms-2 text-white"></i>
                  </Link>
                </h5>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  <div className="row">
                    {/* LEFT: Image + Icon */}
                    <div className="col-md-4 text-center mb-4">
                      {data.image || data.pic ? (
                        <img
                          src={`/assets/images/${data.image || data.pic}`}
                          alt={data.title || data.name}
                          className="img-fluid border rounded"
                          style={{ maxHeight: "300px" }}
                        />
                      ) : (
                        <div className="border rounded p-5">No Image</div>
                      )}

                      {data.icon && (
                        <div className="mt-3">
                          <i
                            className={`fa-solid ${data.icon}`}
                            style={{ fontSize: "48px", color: "#2f5fff" }}
                          ></i>
                          <small className="d-block text-muted mt-1">{data.icon}</small>
                        </div>
                      )}

                      <div className="mt-3">
                        <span
                          className={`badge me-2 ${
                            data.status === "Active" ? "bg-success" : "bg-secondary"
                          }`}
                        >
                          {val(data.status)}
                        </span>
                        <span className="badge bg-info text-dark">{val(data.section)}</span>
                      </div>
                    </div>

                    {/* RIGHT: Admin details */}
                    <div className="col-md-8">
                      <h6 className="fw-bold bg-primary text-white p-2 rounded">
                        Section Details (Admin)
                      </h6>
                      <table className="table table-bordered table-hover">
                        <tbody>
                          {adminRows.map(([label, value]) => (
                            <tr key={label}>
                              <th className="bg-gradient text-dark" style={{ width: "35%" }}>
                                {label}
                              </th>
                              <td>{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="mt-4">
                    <h6 className="fw-bold bg-success text-white p-2 rounded">
                      Product Details (Frontend)
                    </h6>
                    <table className="table table-bordered table-hover">
                      <tbody>
                        {productRows.map(([label, value]) => (
                          <tr key={label}>
                            <th className="bg-gradient text-dark" style={{ width: "35%" }}>
                              {label}
                            </th>
                            <td>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
              <div className="row">
                <div className="col-6">
                 
                    <div className="mt-3 col-6 form-control">
                    <h6 className="fw-bold">Meta Description</h6>
                    <p style={{ whiteSpace: "pre-line" }}>{val(data.metaDescription)}</p>
                  </div>
                </div>
                
                <div className="col-6">
                  <div className="mt-3 col-6 form-control">
                    <h6 className="fw-bold">Description (Product)</h6>
                    <p style={{ whiteSpace: "pre-line" }}>{val(data.description)}</p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="mt-3 col-6 form-control">
                    <h6 className="fw-bold">Product Details</h6>
                    <p style={{ whiteSpace: "pre-line" }}>{val(data.details)}</p>
                  </div>
                </div>

                  <div className="col-6">
                 <div className="mt-3 col-6 form-control">
                    <h6 className="fw-bold">Content (Section)</h6>
                    <p style={{ whiteSpace: "pre-line" }}>{val(data.content)}</p>
                  </div>
                  </div>
               </div>


                  <div className="btn-group w-100 py-4">
                    <button
                      onClick={() => router.push("/AdminBestseller")}
                      className="btn btn-primary text-light w-50"
                    >
                      Back
                    </button>
                    <Link
                      href={`/AdminBestseller/Update?id=${id}`}
                      className="btn btn-warning text-dark w-50"
                    >
                      Edit Bestseller
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

export default function AdminViewBestseller() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}