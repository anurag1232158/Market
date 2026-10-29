"use client";
import { Suspense, useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/page";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";

import BannerFields, {
  Banner, emptyBanner, validateBanner, prepareBanner, today,
} from "../BannerFields";
import { clearAuthUser } from "../../../../../../lib/authUser";

function UpdateContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Banner>(emptyBanner);
  const [errorsMassage, setErrorsMassage] = useState<{ [key: string]: string }>({});
  const [show, setShow] = useState(false);
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
    const errors = validateBanner(data);
    setErrorsMassage(errors);
    if (Object.keys(errors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      const res = await fetch(`/api/banner?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...prepareBanner(data), updatedAt: today() }),
      });

      if (res.status === 401) {
        clearAuthUser("admin");
        alert("Session expired.");
        router.replace("/AdminLogin");
        return;
      }

      if (res.ok) {
        alert("✅ Updated!");
        router.push("/AdminBanner");
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
                <h5 className="mb-0 fw-bold text-white">Update Banner</h5>
              </div>
              <div className="card">
                <div className="card-body bg-grays1">
                  <form onSubmit={updateData} className="mt-2">
                    <BannerFields data={data} errors={errorsMassage} show={show} onChange={getInputData} />
                    <div className="mb-3 btn-group w-100 py-5">
                      <button type="button" onClick={() => router.push("/AdminBanner")} className="btn btn-primary text-light w-50">Back</button>
                      <button type="submit" className="btn btn-success text-light w-50">Update</button>
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

export default function AdminUpdateBanner() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <UpdateContent />
    </Suspense>
  );
}