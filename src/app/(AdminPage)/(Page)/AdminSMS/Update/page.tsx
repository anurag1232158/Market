"use client";
import { Suspense, useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageFooter from "../../Sidebar/Footer/Footer";
import Sidebars from "../../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../../Sidebar/Navbar/PageNavbar";
import ASO from "../../AOS/AOS";
import SMSFields, {
  SMS,
  emptySMS,
  validateSMS,
  prepareSMS,
  today,
  TEMPLATES,
} from "../SMSFields";
import { clearAuthUser } from "../../../../../../lib/authUser";

function UpdateContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<SMS>(emptySMS);
  const [errorsMassage, setErrorsMassage] = useState<{ [key: string]: string }>(
    {}
  );
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/sms?id=${id}`)
      .then((res) => res.json())
      .then((result) => {
        setData({ ...emptySMS, ...result });
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
    const { name, value } = e.target as HTMLInputElement;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChannelToggle = (channel: string) => {
    setData((prev) => {
      const has = prev.channels.includes(channel);
      return {
        ...prev,
        channels: has
          ? prev.channels.filter((c) => c !== channel)
          : [...prev.channels, channel],
      };
    });
  };

  const handleTemplateSelect = (templateName: string) => {
    const t = TEMPLATES.find((x) => x.name === templateName);
    if (!t) return;
    setData((prev) => ({
      ...prev,
      message: t.message,
      type: t.type,
    }));
  };

  const updateData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(true);
    const errors = validateSMS(data);
    setErrorsMassage(errors);
    if (Object.keys(errors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`/api/sms?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...prepareSMS(data),
          updatedAt: today(),
          sentAt: data.status === "Sent" ? today() : data.sentAt,
        }),
      });

      if (res.status === 401) {
        clearAuthUser("admin");
        alert("Session expired.");
        router.replace("/AdminLogin");
        return;
      }

      if (res.ok) {
        alert("✅ Message updated!");
        router.push("/AdminSMS");
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!id)
    return (
      <div className="alert alert-danger m-3">❌ No ID provided.</div>
    );

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
                  Update Message: {data.title}
                </h5>
              </div>
              <div className="card">
                <div className="card-body bg-grays1">
                  <form onSubmit={updateData} className="mt-2">
                    <SMSFields
                      data={data}
                      errors={errorsMassage}
                      show={show}
                      onChange={getInputData}
                      onChannelToggle={handleChannelToggle}
                      onTemplateSelect={handleTemplateSelect}
                    />
                    <div className="mb-3 btn-group w-100 py-5">
                      <button
                        type="button"
                        onClick={() => router.push("/AdminSMS")}
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

export default function AdminUpdateSMS() {
  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <UpdateContent />
    </Suspense>
  );
}