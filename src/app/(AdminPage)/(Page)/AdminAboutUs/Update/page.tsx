"use client";
import { Suspense, useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/Footer";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import AboutFields, {
  About,
  emptyAbout,
  validateAbout,
  prepareAbout,
  today,
} from "../AboutFields";
import { clearAuthUser } from "../../../../../../lib/authUser";

function UpdateContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<About>(emptyAbout);
  const [errorsMassage, setErrorsMassage] = useState<{ [key: string]: string }>({});
  const [show, setShow] = useState(false);
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

    const errors = validateAbout(data);
    setErrorsMassage(errors);
    if (Object.keys(errors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      const res = await fetch(`/api/about?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...prepareAbout(data),
          updatedAt: today(),
        }),
      });

      if (res.status === 401) {
        clearAuthUser("admin");
        alert("Session expired, please login again.");
        router.replace("/AdminLogin");
        return;
      }

      if (res.ok) {
        alert("✅ Updated successfully!");
        router.push("/AdminAboutUs");
      } else {
        const result = await res.json().catch(() => ({}));
        alert(result.error || "Update failed.");
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

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
        ❌ No ID provided. Use: /AdminAboutUs/Update?id=xxxxx
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
                  <h5 className="mb-0 fw-bold text-white">  Update About Us Section </h5>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 m-auto">
                  <div className="card">
                    <div className="card-body bg-grays1">
                      <form onSubmit={updateData} className="mt-2">
                        <AboutFields  data={data}  errors={errorsMassage}  show={show}  onChange={getInputData}/>
                        <div className="mb-3 btn-group w-100 py-5">
                          <button type="button" onClick={() => router.push("/AdminAboutUs")} className="btn btn-primary text-light w-50"> Back</button>
                          <button  type="submit"  className="btn btn-success text-light w-50"> Update</button>
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

export default function AdminUpdateAboutUs() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <UpdateContent />
    </Suspense>
  );
}