"use client";
import { Suspense, useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/Footer";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import OrderFields, {
  Order, emptyOrder, validateOrder, prepareOrder, today,
} from "../OrderFields";
import { clearAuthUser } from "../../../../../../lib/authUser";

function UpdateContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Order>(emptyOrder);
  const [errorsMassage, setErrorsMassage] = useState<{ [key: string]: string }>({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`/api/order?id=${id}`)
      .then((res) => res.json())
      .then((result) => { setData({ ...emptyOrder, ...result }); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const getInputData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemsChange = (items: any[]) => {
    setData((prev) => ({ ...prev, items: JSON.stringify(items) }));
  };

  const updateData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(true);
    const errors = validateOrder(data);
    setErrorsMassage(errors);
    if (Object.keys(errors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      const res = await fetch(`/api/order?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...prepareOrder(data), updatedAt: today() }),
      });

      if (res.status === 401) {
        clearAuthUser("admin");
        alert("Session expired.");
        router.replace("/AdminLogin");
        return;
      }

      if (res.ok) {
        alert("✅ Order updated!");
        router.push("/AdminOrder");
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error(err);
    }
  };

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
              <div className="border p-3 mb-3 bg-gradient text-center">
                <h5 className="mb-0 fw-bold text-white">
                  Update Order: {data.orderNo || ""}
                </h5>
              </div>
              <div className="card">
                <div className="card-body bg-grays1">
                  <form onSubmit={updateData} className="mt-2">
                    <OrderFields
                      data={data}
                      errors={errorsMassage}
                      show={show}
                      onChange={getInputData}
                      onItemsChange={handleItemsChange}
                    />
                    <div className="mb-3 btn-group w-100 py-5">
                      <button type="button" onClick={() => router.push("/AdminOrder")} className="btn btn-primary text-light w-50">Back</button>
                      <button type="submit" className="btn btn-success text-light w-50">Update Order</button>
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

export default function AdminUpdateOrder() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <UpdateContent />
    </Suspense>
  );
}