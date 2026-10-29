"use client";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PageFooter from "../../Sidebar/Footer/page";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import { Product, emptyProduct, calcFinalPrice } from "../ProductFields";

function ViewContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Product>(emptyProduct);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/product?id=${id}`);
        if (res.ok) {
          const result = await res.json();
          setData({ ...emptyProduct, ...result });
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchData();
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const fmt = (v?: string) => (v ? v.split("T")[0] : "-");
  const val = (v?: string) => (v && v !== "" ? v : "-");

  const rows: [string, string][] = [
    ["Product Name", val(data.name)],
    ["Category", val(data.category)],
    ["Flavour", val(data.flavour)],
    ["Size Grade (Suta)", val(data.grade)],
    ["Pack Weight", val(data.weight)],
    ["Pack Type", val(data.packType)],
    ["SKU Code", val(data.sku)],
    ["Origin", val(data.origin)],
    ["Shelf Life", val(data.shelfLife)],
    ["Manufacturing Date", fmt(data.mfgDate)],
    ["Expiry Date", fmt(data.expiryDate)],
    ["Best Seller", val(data.isBestSeller)],
    ["Vrat / Fasting Friendly", val(data.isVrat)],
    ["Gluten Free", val(data.isGlutenFree)],
    ["Created At", fmt(data.createdAt)],
    ["Updated At", fmt(data.updatedAt)],
  ];

  const nutrition: [string, string, string][] = [
    ["Calories", data.calories, "kcal"],
    ["Protein", data.protein, "g"],
    ["Carbs", data.carbs, "g"],
    ["Fat", data.fat, "g"],
    ["Fibre", data.fiber, "g"],
  ];

  if (!id) {
    return (
      <div className="alert alert-danger m-3">
        ❌ No product ID provided. Use: /AdminProduct/View?id=xxx
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
              <div className="border">
                <div className="text-center">
                  <h5 className="bg-gradient text-center p-3 fw-bold mb-4">
                    View Makhana Product
                    <Link href="/AdminProduct">
                      <i className="fa fa-arrow-left ms-2 text-white"></i>
                    </Link>
                  </h5>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 col-sm-12 m-auto">
                  <div className="card">
                    <div className="card-body bg-grays1">
                      <div className="row">
                        {/* LEFT */}
                        <div className="col-md-4 text-center mb-4">
                          {data.pic ? (
                            <img
                              src={`/assets/images/${data.pic}`}
                              alt={data.name}
                              className="img-fluid border rounded"
                              style={{ maxHeight: "300px" }}
                            />
                          ) : (
                            <div className="border rounded p-5">No Image</div>
                          )}

                          <div className="mt-3">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <span
                                key={n}
                                style={{
                                  fontSize: "25px",
                                  color:
                                    n <= Number(data.rating)
                                      ? "#ff0000ff"
                                      : "#2f5fffff",
                                }}
                              >
                                ★
                              </span>
                            ))}
                          </div>

                          <div className="mt-3 fw-bold">
                            <h4 className="mb-1">
                              ₹{calcFinalPrice(data.price, data.discount)}
                            </h4>
                            {data.discount && (
                              <div>
                                <del className="text-muted">₹{data.price}</del>
                                <span className="badge bg-danger ms-2">
                                  {data.discount}% OFF
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="mt-3">
                            <span
                              className={`badge me-2 ${
                                data.status === "Active"
                                  ? "bg-success"
                                  : "bg-secondary"
                              }`}
                            >
                              {val(data.status)}
                            </span>
                            <span
                              className={`badge ${
                                Number(data.stock) > 10
                                  ? "bg-success"
                                  : Number(data.stock) > 0
                                  ? "bg-warning text-dark"
                                  : "bg-danger"
                              }`}
                            >
                              Stock : {val(data.stock)}
                            </span>
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="col-md-8">
                          <table className="table table-bordered table-hover">
                            <tbody>
                              {rows.map(([label, value]) => (
                                <tr key={label}>
                                  <th
                                    className="bg-gradient text-dark"
                                    style={{ width: "35%" }}
                                  >
                                    {label}
                                  </th>
                                  <td>{value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Nutrition */}
                      <h6 className="fw-bold mt-3 mb-2">
                        Nutrition Facts (per 100 g)
                      </h6>
                      <div className="table-responsive">
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr className="bg-gradient">
                              {nutrition.map(([l]) => (
                                <th key={l} className="text-dark">
                                  {l}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {nutrition.map(([l, v, u]) => (
                                <td key={l}>{v ? `${v} ${u}` : "-"}</td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Text blocks */}
                      <div className="row mt-3">
                        <div className="col-md-4 mb-3">
                          <h6 className="fw-bold">Description</h6>
                          <p style={{ whiteSpace: "pre-line" }}>
                            {val(data.description)}
                          </p>
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6 className="fw-bold">Ingredients</h6>
                          <p style={{ whiteSpace: "pre-line" }}>
                            {val(data.ingredients)}
                          </p>
                        </div>
                        <div className="col-md-4 mb-3">
                          <h6 className="fw-bold">Details / Storage</h6>
                          <p style={{ whiteSpace: "pre-line" }}>
                            {val(data.details)}
                          </p>
                        </div>
                      </div>

                      <div className="mb-3 btn-group w-100 py-4">
                        <button
                          type="button"
                          onClick={() => router.push("/AdminProduct")}
                          className="btn btn-primary text-light w-50"
                        >
                          Back
                        </button>
                        <Link
                          href={`/AdminProduct/Update?id=${id}`}
                          className="btn btn-warning text-dark w-50"
                        >
                          Edit Product
                        </Link>
                      </div>
                    </div>
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

export default function AdminViewProduct() {
  return (
    <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}