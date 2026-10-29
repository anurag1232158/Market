"use client";
import Link from "next/link";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

/* ⭐ Report Components — Imports */
import PageNavbar from "../../(Page)/Sidebar/Navbar/PageNavbar";
import PageFooter from "../../(Page)/Sidebar/Footer/page";
import Sidebars from "../../(Page)/Sidebar/Sidebars/PageSidebar";
import { getAuthUser, setAuthUser } from "../../../../../lib/authUser";

export default function ReportUpdateProfile() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [previewPic, setPreviewPic] = useState("");

  const [data, setData] = useState<any>({
    id: "",
    name: "",
    username: "",
    email: "",
    number: "",
    cpassword: "",
    pic: "",
    role: "report",
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ============================================================
     Fetch Report User
     ============================================================ */
  useEffect(() => {
    const cached = getAuthUser("report");

    fetch("/api/report/me")
      .then((res) => res.json())
      .then((result) => {
        const merged = { ...cached, ...result };
        setData((prev: any) => ({ ...prev, ...merged }));
        if (merged.pic) setPreviewPic(merged.pic);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching report profile:", err);
        setLoading(false);
      });
  }, []);

  /* ============================================================
     Input Change
     ============================================================ */
  const getInputData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev: any) => ({ ...prev, [name]: value }));

    /* Clear error on type */
    if (errors[name]) {
      setErrors((prev) => {
        const c = { ...prev };
        delete c[name];
        return c;
      });
    }
  };

  /* ============================================================
     File Change
     ============================================================ */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    /* Size check */
    if (file.size > 2 * 1024 * 1024) {
      alert("⚠️ Image 2MB से कम होनी चाहिए");
      return;
    }

    /* Type check */
    if (!file.type.startsWith("image/")) {
      alert("⚠️ सिर्फ image file allowed है");
      return;
    }

    setData((prev: any) => ({ ...prev, pic: file.name }));

    /* Local preview */
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewPic(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  /* ============================================================
     Validation
     ============================================================ */
  const validate = () => {
    const e: { [key: string]: string } = {};
    if (!data.name?.trim()) e.name = "Name जरूरी है";
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email))
      e.email = "Valid email डालें";
    if (data.number && !/^[0-9]{10,13}$/.test(data.number))
      e.number = "Valid phone number डालें";
    if (data.cpassword && data.cpassword.length < 4)
      e.cpassword = "Password कम से कम 4 characters";
    return e;
  };

  /* ============================================================
     Submit
     ============================================================ */
const postData = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  console.log("🔵 Submit started");

  const errs = validate();
  setErrors(errs);
  if (Object.keys(errs).length > 0) {
    console.log("🔴 Validation errors:", errs);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  setSaving(true);
  console.log("🟡 Saving started");

  const payload: any = { ...data };
  if (!payload.cpassword) delete payload.cpassword;
  console.log("📤 Payload:", payload);

  try {
    console.log("🚀 Calling API...");
    const res = await fetch("/api/report/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("📥 Response status:", res.status);
    console.log("📥 Response ok:", res.ok);

    const result = await res.json().catch((e) => {
      console.error("JSON parse error:", e);
      return {};
    });

    console.log("📥 Response data:", result);

    if (res.ok) {
      console.log("✅ Success block");

      /* LocalStorage update */
      try {
        if (result.report) {
          console.log("💾 Saving to localStorage");
          setAuthUser("report", result.report);
          console.log("💾 LocalStorage saved");
        }
      } catch (storageErr: any) {
        console.error("❌ LocalStorage error:", storageErr);
      }

      alert("✅ Profile updated successfully!");
      console.log("🚀 Redirecting...");
      router.push("/ReportProfile");
    } else {
      console.log("❌ API returned error");
      alert(result.error || "Update failed. Please try again.");
    }
  } catch (err: any) {
    console.error("❌ Full error:", err);
    console.error("❌ Error message:", err?.message);
    console.error("❌ Error stack:", err?.stack);
    alert(`❌ ${err?.message || "Something went wrong."}`);
  } finally {
    setSaving(false);
    console.log("🏁 Submit finished");
  }
};

  /* ============================================================
     Image Helper
     ============================================================ */
  const getImageSrc = (pic?: string) => {
    if (!pic) return "";
    if (
      pic.startsWith("data:") ||
      pic.startsWith("blob:") ||
      pic.startsWith("http")
    )
      return pic;
    return `/assets/images/${pic}`;
  };

  /* ============================================================
     Loading
     ============================================================ */
  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="wrapper">
      {/* ⭐ Sidebar */}
       <Sidebars
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
        <PageNavbar toggleSidebar={toggleSidebar} />

        <section className="p-4">
          <div className="container-fluid">
            {/* Header */}
            <div className="bg-primary text-white p-3 rounded shadow mb-4">
              <h4 className="mb-0 fw-bold">
                <i className="fa fa-edit me-2"></i>
                Update Profile
              </h4>
              <small className="text-white-50">
                अपनी profile details update करें
              </small>
            </div>

            {/* Form Card */}
            <div className="card shadow-lg">
              <div className="card-body p-4">
                <form onSubmit={postData}>
                  {/* ============================================
                      Row 1: Name + Username
                      ============================================ */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="fw-bold">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        className={`form-control mt-1 ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        value={data.name || ""}
                        onChange={getInputData}
                        placeholder="e.g. Anurag Singh"
                      />
                      {errors.name && (
                        <small className="text-danger">{errors.name}</small>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="fw-bold">Username</label>
                      <input
                        type="text"
                        className="form-control mt-1 bg-light"
                        value={data.username || ""}
                        readOnly
                        title="Username change नहीं हो सकता"
                      />
                    </div>
                  </div>

                  {/* ============================================
                      Row 2: Email + Phone
                      ============================================ */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="fw-bold">Email</label>
                      <input
                        type="email"
                        name="email"
                        className={`form-control mt-1 ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        value={data.email || ""}
                        onChange={getInputData}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <small className="text-danger">{errors.email}</small>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="fw-bold">Phone Number</label>
                      <input
                        type="tel"
                        name="number"
                        className={`form-control mt-1 ${
                          errors.number ? "is-invalid" : ""
                        }`}
                        value={data.number || ""}
                        onChange={getInputData}
                        placeholder="9876543210"
                      />
                      {errors.number && (
                        <small className="text-danger">{errors.number}</small>
                      )}
                    </div>
                  </div>

                  {/* ============================================
                      Row 3: Password + Photo
                      ============================================ */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="fw-bold">
                        Change Password
                        <small className="text-muted ms-2 fw-normal">
                          (खाली छोड़ें = नहीं बदलेगा)
                        </small>
                      </label>
                      <div className="input-group mt-1">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="cpassword"
                          className={`form-control ${
                            errors.cpassword ? "is-invalid" : ""
                          }`}
                          value={data.cpassword || ""}
                          onChange={getInputData}
                          placeholder="नया password"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i
                            className={`fa ${
                              showPassword ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        </button>
                      </div>
                      {errors.cpassword && (
                        <small className="text-danger">
                          {errors.cpassword}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="fw-bold">Profile Picture</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control mt-1"
                        onChange={handleFileChange}
                      />
                      <small className="text-muted d-block mt-1">
                        Max 2MB, JPG/PNG/WebP
                      </small>

                      {previewPic && (
                        <div className="mt-2">
                          <img
                            src={getImageSrc(previewPic)}
                            alt="Preview"
                            className="rounded border"
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  data.name || "R"
                                )}&background=667eea&color=fff&size=200`;
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ============================================
                      Row 4: Read-only Info
                      ============================================ */}
                  <div className="row mt-2">
                    <div className="col-md-6 mb-3">
                      <label className="fw-bold">Role</label>
                      <input
                        type="text"
                        className="form-control mt-1 bg-light"
                        value={data.role || "report"}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="fw-bold">User ID</label>
                      <input
                        type="text"
                        className="form-control mt-1 bg-light"
                        value={data.id || ""}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* ============================================
                      Buttons
                      ============================================ */}
                  <div className="d-flex justify-content-center gap-3 mt-4 pt-3 border-top">
                    <Link href="/ReportProfile">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={saving}
                      >
                        <i className="fa fa-arrow-left me-2"></i>
                        Back
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <i className="fa fa-spinner fa-spin me-2"></i>
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="fa fa-save me-2"></i>
                          Update Profile
                        </>
                      )}
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
  );
}