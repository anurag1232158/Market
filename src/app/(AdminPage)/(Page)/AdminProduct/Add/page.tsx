"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/page";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import ProductFields, {
  Product,
  emptyProduct,
  validateProduct,
  today,
} from "../ProductFields";
import { clearAuthUser } from "../../../../../../lib/authUser";

function AdminAddProduct() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const [errorsMassage, setErrorsMassage] = useState<{ [key: string]: string }>(
    {}
  );
  const [show, setShow] = useState(false);
  const [data, setData] = useState<Product>(emptyProduct);

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

  const postData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(true);
    const errors = validateProduct(data);
    setErrorsMassage(errors);
    if (Object.keys(errors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          createdAt: today(),
          updatedAt: today(),
        }),
      });

      if (res.status === 401) {
        clearAuthUser("admin");
        alert("Session expired. Please login again.");
        router.replace("/AdminLogin");
        return;
      }

      const text = await res.text();
      let result: any = {};
      try {
        result = JSON.parse(text);
      } catch {}

      if (res.ok) {
        alert("✅ Product added successfully!");
        router.push("/AdminProduct");
      } else {
        alert(result.error || "Server error.");
      }
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Something went wrong.");
    }
  };

  const resetForm = () => {
    setData(emptyProduct);
    setErrorsMassage({});
    setShow(false);
  };

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
                    Add Makhana Product
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
                      <form onSubmit={postData} className="mt-2">
                        <ProductFields
                          data={data}
                          errors={errorsMassage}
                          show={show}
                          onChange={getInputData}
                        />
                        <div className="mb-3 btn-group w-100 py-5">
                          <button
                            type="button"
                            onClick={resetForm}
                            className="btn btn-secondary text-light w-50"
                          >
                            Reset
                          </button>
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
                            Submit
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

export default AdminAddProduct;