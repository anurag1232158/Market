"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
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

function AdminAddSMS() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [errorsMassage, setErrorsMassage] = useState<{ [key: string]: string }>(
    {}
  );
  const [show, setShow] = useState(false);
  const [data, setData] = useState<SMS>(emptySMS);
  const [submitting, setSubmitting] = useState(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ⭐ सारे users fetch करें */
  useEffect(() => {
    Promise.all([
      fetch("/api/user").then((r) => r.json()).catch(() => []),
      fetch("/api/admin").then((r) => r.json()).catch(() => []),
    ]).then(([users, admins]) => {
      const userList = Array.isArray(users) ? users : users?.user || [];
      const adminList = Array.isArray(admins) ? admins : admins?.admin || [];
      const combined = [
        ...userList.map((u: any) => ({ ...u, _type: "User" })),
        ...adminList.map((a: any) => ({ ...a, _type: "Admin" })),
      ];
      setAllUsers(combined);
      setLoadingUsers(false);
    });
  }, []);

  const getInputData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  /* ⭐ Channel toggle */
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

  /* ⭐ Template select */
  const handleTemplateSelect = (templateName: string) => {
    const t = TEMPLATES.find((x) => x.name === templateName);
    if (!t) return;
    setData((prev) => ({
      ...prev,
      message: t.message,
      type: t.type,
      title: prev.title || t.name,
    }));
  };

  /* ⭐ User toggle */
  const handleUserToggle = (userId: string) => {
    setData((prev) => {
      const has = prev.selectedUsers.includes(userId);
      return {
        ...prev,
        selectedUsers: has
          ? prev.selectedUsers.filter((id) => id !== userId)
          : [...prev.selectedUsers, userId],
      };
    });
  };

  /* ⭐ Select All / Clear All */
  const handleSelectAllUsers = () => {
    setData((prev) => ({
      ...prev,
      selectedUsers: allUsers.map((u) => u.id),
    }));
  };

  const handleClearAllUsers = () => {
    setData((prev) => ({ ...prev, selectedUsers: [] }));
  };

  /* ⭐ Submit */
  const postData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(true);

    const errors = validateSMS(data);
    setErrorsMassage(errors);
    if (Object.keys(errors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);

    /* ⭐ Total recipients calculate करें */
    let totalRecipients = 0;
    if (data.sendMode === "Selected Users" || data.sendMode === "One by One") {
      totalRecipients = data.selectedUsers.length;
    } else if (data.sendMode === "Single User") {
      totalRecipients = 1;
    } else {
      totalRecipients = allUsers.length;
    }

    const payload = {
      ...prepareSMS(data),
      totalRecipients: String(totalRecipients),
      createdAt: today(),
      updatedAt: today(),
    };

    try {
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        clearAuthUser("admin");
        alert("Session expired");
        router.replace("/AdminLogin");
        return;
      }

      const result = await res.json();

      if (res.ok) {
        /* ⭐ अगर One by One → Send page पर redirect */
        if (data.sendMode === "One by One" && result.id) {
          alert("✅ Campaign ready! अब एक-एक करके भेजें।");
          router.push(`/AdminSMS/Send?id=${result.id}`);
        } else if (data.status === "Draft") {
          alert("✅ Draft saved!");
          router.push("/AdminSMS");
        } else {
          alert("✅ Message भेज दिया गया!");
          router.push("/AdminSMS");
        }
      } else {
        alert(result.error || "Server error");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setData(emptySMS);
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
                    Send New Message
                    <Link href="/AdminSMS">
                      <i className="fa fa-arrow-left ms-2 text-white"></i>
                    </Link>
                  </h5>
                </div>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  {loadingUsers ? (
                    <div className="text-center p-5">
                      <div className="spinner-border text-primary"></div>
                      <p className="mt-2">Loading users...</p>
                    </div>
                  ) : (
                    <form onSubmit={postData} className="mt-2">
                      <SMSFields
                        data={data}
                        errors={errorsMassage}
                        show={show}
                        onChange={getInputData}
                        onChannelToggle={handleChannelToggle}
                        onTemplateSelect={handleTemplateSelect}
                        onUserToggle={handleUserToggle}
                        onSelectAllUsers={handleSelectAllUsers}
                        onClearAllUsers={handleClearAllUsers}
                        allUsers={allUsers}
                      />

                      <div className="mb-3 btn-group w-100 py-5">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="btn btn-secondary text-light w-50"
                          disabled={submitting}
                        >
                          Reset
                        </button>
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
                          {submitting
                            ? "Saving..."
                            : data.sendMode === "One by One"
                            ? "Save & Send One by One"
                            : "Save & Send"}
                        </button>
                      </div>
                    </form>
                  )}
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
export default AdminAddSMS;