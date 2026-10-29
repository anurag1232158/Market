"use client";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import PageFooter from "../../Sidebar/Footer/Footer";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import ProductFields, {
  Product,
  emptyProduct,
  validateProduct,
  today,
} from "../ProductFields";

function UpdateContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Product>(emptyProduct);
  const [errorsMassage, setErrorsMassage] = useState<{ [key: string]: string }>(
    {}
  );
  const [show, setShow] = useState(false);
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

  const getInputData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files[0]) {
      setData((prev) => ({ ...prev, [name]: files[0].name }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const updateData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(true);

    const errors = validateProduct(data);
    setErrorsMassage(errors);
    if (Object.keys(errors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!id) {
      alert("Product ID missing");
      return;
    }

    try {
      const res = await fetch(`/api/product?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, updatedAt: today() }),
      });
      if (res.ok) {
        alert("✅ Updated successfully!");
        router.push("/AdminProduct");
      } else {
        const result = await res.json().catch(() => ({}));
        alert(result.error || "Update failed.");
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (!id) {
    return (
      <div className="alert alert-danger m-3">
        ❌ No product ID provided. Use: /AdminProduct/Update?id=xxx
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
              <div className="border p-3 mb-3 bg-gradient">
                <div className="text-center">
                  <h5 className="mb-0 fw-bold text-white">
                    Update Makhana Product
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-sm-12 m-auto">
                  <div className="card">
                    <div className="card-body bg-grays1">
                      <form onSubmit={updateData} className="mt-2">
                        <ProductFields
                          data={data}
                          errors={errorsMassage}
                          show={show}
                          onChange={getInputData}
                        />

                        <div className="mb-3 btn-group w-100 py-5">
                          <button
                            type="button"
                            onClick={() => router.push("/AdminProduct")}
                            className="btn btn-primary text-light w-50"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="btn btn-success text-light w-50"
                          >
                            Update
                          </button>
                        </div>
                      </form>
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

export default function AdminUpdateProduct() {
  return (
    <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
      <UpdateContent />
    </Suspense>
  );
}