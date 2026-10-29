//
"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/Footer";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import { Inventory, emptyInventory } from "../InventoryFields";

function ViewContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Inventory>(emptyInventory); 
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`/api/inventory?id=${id}`)
      .then((res) => res.json())
      .then((result) => { setData({ ...emptyInventory, ...result }); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const val = (v?: string) => (v && v !== "" ? v : "-");
  const fmt = (v?: string) => (v ? v.split("T")[0] : "-");

  const statusBadge = (s?: string) => {
    const map: any = {
      "In Stock": "bg-success",
      "Low Stock": "bg-warning text-dark",
      "Out of Stock": "bg-danger",
      Expired: "bg-dark",
      Damaged: "bg-secondary",
    };
    return map[s || ""] || "bg-secondary";
  };

  const rows: [string, string][] = [
    ["Product Name", val(data.productName)],
    ["SKU Code", val(data.sku)],
    ["Category", val(data.category)],
    ["Warehouse", val(data.warehouse)],
    ["Batch Number", val(data.batchNo)],
    ["Unit", val(data.unit)],
    ["Purchase Price", `₹${val(data.purchasePrice)}`],
    ["Selling Price", `₹${val(data.sellingPrice)}`],
    ["Manufacturing Date", fmt(data.mfgDate)],
    ["Expiry Date", fmt(data.expiryDate)],
    ["Supplier", val(data.supplier)],
    ["Supplier Contact", val(data.supplierContact)],
    ["Last Restocked", fmt(data.lastRestocked)],
    ["Created At", fmt(data.createdAt)],
    ["Updated At", fmt(data.updatedAt)],
  ];

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!id) return <div className="alert alert-danger m-3">❌ No ID provided.</div>;

  /* Profit margin */
  const profit = Number(data.sellingPrice || 0) - Number(data.purchasePrice || 0);
  const margin = data.sellingPrice
    ? Math.round((profit / Number(data.sellingPrice)) * 100)
    : 0;

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
                  View Inventory
                  <Link href="/AdminInventory"><i className="fa fa-arrow-left ms-2 text-white"></i></Link>
                </h5>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <h3>{val(data.productName)}</h3>
                    <code className="d-block mb-2">{val(data.sku)}</code>
                    <span className={`badge me-2 ${statusBadge(data.status)}`}>
                      {data.status || "In Stock"}
                    </span>
                    <span className="badge bg-info text-dark">{data.category || "-"}</span>
                  </div>

                  {/* Stock Stats */}
                  <div className="row mb-4">
                    <div className="col-md-3 mb-2">
                      <div className="card bg-primary text-white">
                        <div className="card-body text-center py-2">
                          <small>Current Stock</small>
                          <h3 className="mb-0">{data.currentStock || 0} {data.unit}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 mb-2">
                      <div className="card bg-success text-white">
                        <div className="card-body text-center py-2">
                          <small>Sold</small>
                          <h3 className="mb-0">{data.soldStock || 0} {data.unit}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 mb-2">
                      <div className="card bg-danger text-white">
                        <div className="card-body text-center py-2">
                          <small>Damaged</small>
                          <h3 className="mb-0">{data.damagedStock || 0} {data.unit}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 mb-2">
                      <div className="card bg-warning text-dark">
                        <div className="card-body text-center py-2">
                          <small>Reserved</small>
                          <h3 className="mb-0">{data.reservedStock || 0} {data.unit}</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profit Info */}
                  {profit > 0 && (
                    <div className="alert alert-success">
                      <strong>💰 Profit Margin:</strong> ₹{profit} ({margin}%) per {data.unit}
                    </div>
                  )}

                  {/* Details Table */}
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

                  {/* Notes */}
                  <div className="mt-3">
                    <h6 className="fw-bold">Internal Notes</h6>
                    <p style={{ whiteSpace: "pre-line" }}>{val(data.notes)}</p>
                  </div>

                  <div className="btn-group w-100 py-4">
                    <button onClick={() => router.push("/AdminInventory")} className="btn btn-primary text-light w-50">Back</button>
                    <Link href={`/AdminInventory/Update?id=${id}`} className="btn btn-warning text-dark w-50">Edit Inventory</Link>
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

export default function AdminViewInventory() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}