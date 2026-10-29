"use client";
import { Suspense, useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/page";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import ContactFields, {
  Contact, emptyContact, validateContact, prepareContact, today,
} from "../ContactFields";
import { clearAuthUser } from "../../../../../../lib/authUser";

function UpdateContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<Contact>(emptyContact);
  const [errorsMassage, setErrorsMassage] = useState<{ [key: string]: string }>({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const source = searchParams.get("source") || "contact";

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/contact?id=${id}&source=${source}`)
      .then((res) => res.json())
      .then((result) => {
        setData({ ...emptyContact, ...result });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, source]);

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
    const errors = validateContact(data);
    setErrorsMassage(errors);
    if (Object.keys(errors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`/api/contact?id=${id}&source=${source}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...prepareContact(data), updatedAt: today() }),
      });

      if (res.status === 401) {
        clearAuthUser("admin");
        alert("Session expired.");
        router.replace("/AdminLogin");
        return;
      }

      if (res.ok) {
        alert("✅ Contact updated!");
        router.push("/AdminContactUs");
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading contact...</p>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="alert alert-danger m-3">
        ❌ No ID provided. Use: /AdminContactUs/Update?id=xxxxx&source=user
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
              <div className="border p-3 mb-3 bg-gradient text-center">
                <h5 className="mb-0 fw-bold text-white">
                  Update Contact: {data.name || "Unknown"}
                  <span className="badge bg-light text-dark ms-2">
                    Source: {source}
                  </span>
                </h5>
              </div>
              <div className="card">
                <div className="card-body bg-grays1">
                  <form onSubmit={updateData} className="mt-2">
                    <ContactFields
                      data={data}
                      errors={errorsMassage}
                      show={show}
                      onChange={getInputData}
                    />
                    <div className="mb-3 btn-group w-100 py-5">
                      <button
                        type="button"
                        onClick={() => router.push("/AdminContactUs")}
                        className="btn btn-primary text-light w-50"
                        disabled={submitting}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success text-light w-50"
                        disabled={submitting}
                      >
                        {submitting ? "Updating..." : "Update"}
                      </button>
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

export default function AdminUpdateContact() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <UpdateContent />
    </Suspense>
  );
}