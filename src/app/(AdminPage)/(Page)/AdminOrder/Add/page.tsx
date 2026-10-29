"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/Footer";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import OrderFields, {
  Order, emptyOrder, validateOrder, prepareOrder, today,
} from "../OrderFields";
import { clearAuthUser } from "../../../../../../lib/authUser";

function AdminAddOrder() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [errorsMassage, setErrorsMassage] = useState<{ [key: string]: string }>({});
  const [show, setShow] = useState(false);
  const [data, setData] = useState<Order>({
    ...emptyOrder,
    orderDate: today(),
  });
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const getInputData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  /* Items editor handler */
  const handleItemsChange = (items: any[]) => {
    setData((prev) => ({ ...prev, items: JSON.stringify(items) }));
  };

  const postData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(true);

    const errors = validateOrder(data);
    setErrorsMassage(errors);
    if (Object.keys(errors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const payload = {
      ...prepareOrder(data),
      createdAt: today(),
      updatedAt: today(),
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        clearAuthUser("admin");
        alert("Session expired, please login again.");
        router.replace("/AdminLogin");
        return;
      }

      const text = await res.text();
      let result: any = {};
      try { result = JSON.parse(text); } catch {}

      if (res.ok) {
        alert("✅ Order created!");
        router.push("/AdminOrder");
      } else {
        alert(result.error || "Server error.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const resetForm = () => {
    setData({ ...emptyOrder, orderDate: today() });
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
                    Add Order
                    <Link href="/AdminOrder">
                      <i className="fa fa-arrow-left ms-2 text-white"></i>
                    </Link>
                  </h5>
                </div>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  <form onSubmit={postData} className="mt-2">
                    <OrderFields
                      data={data}
                      errors={errorsMassage}
                      show={show}
                      onChange={getInputData}
                      onItemsChange={handleItemsChange}
                    />
                    <div className="mb-3 btn-group w-100 py-5">
                      <button type="button" onClick={resetForm} className="btn btn-secondary text-light w-50">Reset</button>
                      <button type="button" onClick={() => router.push("/AdminOrder")} className="btn btn-primary text-light w-50">Back</button>
                      <button type="submit" className="btn btn-success text-light w-50">Create Order</button>
                    </div>
                  </form>
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
export default AdminAddOrder;