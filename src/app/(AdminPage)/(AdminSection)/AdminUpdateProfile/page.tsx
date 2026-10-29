"use client";
import Link from "next/link";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

import PageNavbar from "../../(Page)/Sidebar/Navbar/PageNavbar";
import PageFooter from "../../(Page)/Sidebar/Footer/page";
import Sidebars from "../../(Page)/Sidebar/Sidebars/PageSidebar";
import { getAuthUser, setAuthUser } from "../../../../../lib/authUser";

/* ============================================================
   TYPES
   ============================================================ */
type AdminContact = {
  id: string;
  username: string;
  name: string;
  email: string;
  number: string;
  address: string;
  pin: string;
  city: string;
  state: string;
  country: string;
  pic: string;
  cpassword: string;
  role: string;
  village?: string;
  post?: string;
  status?: string;
};

const emptyAdmin: AdminContact = {
  id: "",
  username: "",
  name: "",
  email: "",
  number: "",
  address: "",
  pin: "",
  city: "",
  state: "",
  country: "India",
  pic: "",
  cpassword: "",
  role: "Admin",
  village: "",
  post: "",
  status: "Active",
};

function AdminUpdateProfile() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState<AdminContact>(emptyAdmin);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [previewPic, setPreviewPic] = useState<string>("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ============================================================
     ⭐ Fetch admin — localStorage + API (smart)
     ============================================================ */
  useEffect(() => {
    const cached = getAuthUser("admin");

    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin");
        if (!response.ok) {
          setLoading(false);
          return;
        }

        const result: AdminContact[] = await response.json();
        const list = Array.isArray(result) ? result : [];

        /* Priority: cached ID → पहला admin */
        const matched =
          (cached?.id &&
            list.find((a) => String(a.id) === String(cached.id))) ||
          list[0];

        if (matched) {
          setData({ ...emptyAdmin, ...matched });
          if (matched.pic) setPreviewPic(matched.pic);
        }
      } catch (err) {
        console.error("Error fetching admin:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ============================================================
     ⭐ INPUT CHANGE
     ============================================================ */
  const getInputData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    /* Clear error on change */
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  /* ============================================================
     ⭐ FILE CHANGE (with preview)
     ============================================================ */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    /* Validate size (max 2MB) */
    if (file.size > 2 * 1024 * 1024) {
      alert("⚠️ Image 2MB से कम होनी चाहिए");
      return;
    }

    /* Validate type */
    if (!file.type.startsWith("image/")) {
      alert("⚠️ सिर्फ image file allowed है");
      return;
    }

    setData((prev) => ({ ...prev, pic: file.name }));

    /* ⭐ Local preview (blob URL) */
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewPic(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  /* ============================================================
     ⭐ VALIDATION
     ============================================================ */
  const validate = () => {
    const e: { [key: string]: string } = {};
    if (!data.name?.trim()) e.name = "Name जरूरी है";
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email))
      e.email = "Valid email डालें";
    if (data.number && !/^[0-9]{10,13}$/.test(data.number))
      e.number = "10-13 digit का number डालें";
    if (data.pin && !/^[0-9]{6}$/.test(data.pin))
      e.pin = "PIN 6 digits का होना चाहिए";
    if (data.cpassword && data.cpassword.length < 4)
      e.cpassword = "Password कम से कम 4 characters";
    return e;
  };

  /* ============================================================
     ⭐ SUBMIT
     ============================================================ */
  const postData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.id) {
      alert("⚠️ Admin ID missing. Please reload.");
      return;
    }

    /* Validate */
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSaving(true);

    /* Remove empty password (अगर नहीं बदला) */
    const payload: any = { ...data };
    if (!payload.cpassword) delete payload.cpassword;

    try {
      const response = await fetch(`/api/admin`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();

        /* ⭐ localStorage update करें */
        if (result.admin) {
          setAuthUser("admin", result.admin);
        }

        alert("✅ Profile updated successfully!");
        router.push("/AdminProfile");
      } else {
        const result = await response.json().catch(() => ({}));
        alert(result.error || "Update failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during PUT request:", err);
      alert("❌ Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  /* ============================================================
     ⭐ IMAGE URL helper
     ============================================================ */
  const getImageSrc = (src: string) => {
    if (!src) return "";
    if (src.startsWith("blob:") || src.startsWith("data:") || src.startsWith("http"))
      return src;
    return `/assets/images/${src}`;
  };

  /* ============================================================
     ⭐ LOADING
     ============================================================ */
  if (loading) {
    return (
      <div className="wrapper">
        <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
          <PageNavbar toggleSidebar={toggleSidebar} />
          <section className="mb-5 pb-3">
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading profile...</p>
            </div>
          </section>
          <PageFooter />
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
        <PageNavbar toggleSidebar={toggleSidebar} />

        <section className="mb-5 pb-3">
          <div className="container-fluid">
            <div className="row">
              <div
                className="col-md-12 mb-4"
                data-aos="zoom-in-down"
                data-aos-duration="1500"
              >
                <div className="card">
                  <div className="card-body border-0">
                    <div className="border p-2 mb-3 bg-gradient text-center">
                      <h5 className="mb-0 font-weight-medium text-white">
                        <i className="fa fa-user-edit me-2"></i>
                        Update Profile
                      </h5>
                    </div>

                    <div className="row">
                      <div className="col-md-12 col-sm-12 m-auto">
                        <div className="card">
                          <div className="card-body px-5 bg-grays1">
                            <form onSubmit={postData}>
                              {/* ==================================================
                                  Row 1 : Name / Username / Email
                                  ================================================== */}
                              <div className="row">
                                <div className="col-md-4">
                                  <label className="fw-bold">
                                    Your Name:{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    className={`form-control mt-2 ${
                                      errors.name ? "is-invalid" : ""
                                    }`}
                                    value={data.name || ""}
                                    onChange={getInputData}
                                    placeholder="e.g. Anurag Singh"
                                  />
                                  {errors.name && (
                                    <small className="text-danger">
                                      {errors.name}
                                    </small>
                                  )}
                                </div>

                                <div className="col-md-4">
                                  <label className="fw-bold">
                                    Username (User ID):
                                  </label>
                                  <input
                                    type="text"
                                    name="username"
                                    className="form-control mt-2 bg-light"
                                    value={data.username || ""}
                                    readOnly
                                    title="Username change नहीं हो सकता"
                                  />
                                </div>

                                <div className="col-md-4">
                                  <label className="fw-bold">Email:</label>
                                  <input
                                    type="email"
                                    name="email"
                                    className={`form-control mt-2 ${
                                      errors.email ? "is-invalid" : ""
                                    }`}
                                    value={data.email || ""}
                                    onChange={getInputData}
                                    placeholder="you@example.com"
                                  />
                                  {errors.email && (
                                    <small className="text-danger">
                                      {errors.email}
                                    </small>
                                  )}
                                </div>
                              </div>

                              {/* ==================================================
                                  Row 2 : Number / Village / Post
                                  ================================================== */}
                              <div className="row g-2 mt-3">
                                <div className="col-md-4">
                                  <label className="fw-bold">
                                    Mobile Number:
                                  </label>
                                  <input
                                    type="tel"
                                    name="number"
                                    className={`form-control mt-2 ${
                                      errors.number ? "is-invalid" : ""
                                    }`}
                                    value={data.number || ""}
                                    onChange={getInputData}
                                    placeholder="9876543210"
                                  />
                                  {errors.number && (
                                    <small className="text-danger">
                                      {errors.number}
                                    </small>
                                  )}
                                </div>

                                <div className="col-md-4">
                                  <label className="fw-bold">Village:</label>
                                  <input
                                    type="text"
                                    name="village"
                                    className="form-control mt-2"
                                    value={data.village || ""}
                                    onChange={getInputData}
                                    placeholder="e.g. Bajardiha"
                                  />
                                </div>

                                <div className="col-md-4">
                                  <label className="fw-bold">Post:</label>
                                  <input
                                    type="text"
                                    name="post"
                                    className="form-control mt-2"
                                    value={data.post || ""}
                                    onChange={getInputData}
                                    placeholder="e.g. Kachhawa"
                                  />
                                </div>
                              </div>

                              {/* ==================================================
                                  Row 3 : Address / City
                                  ================================================== */}
                              <div className="row g-2 mt-3">
                                <div className="col-md-6">
                                  <label className="fw-bold">
                                    Full Address:
                                  </label>
                                  <input
                                    type="text"
                                    name="address"
                                    className="form-control mt-2"
                                    value={data.address || ""}
                                    onChange={getInputData}
                                    placeholder="House No, Street, Area"
                                  />
                                </div>

                                <div className="col-md-6">
                                  <label className="fw-bold">City:</label>
                                  <input
                                    type="text"
                                    name="city"
                                    className="form-control mt-2"
                                    value={data.city || ""}
                                    onChange={getInputData}
                                    placeholder="e.g. Darbhanga"
                                  />
                                </div>
                              </div>

                              {/* ==================================================
                                  Row 4 : State / Country / PIN
                                  ================================================== */}
                              <div className="row g-2 mt-3">
                                <div className="col-md-4">
                                  <label className="fw-bold">State:</label>
                                  <input
                                    type="text"
                                    name="state"
                                    className="form-control mt-2"
                                    value={data.state || ""}
                                    onChange={getInputData}
                                    placeholder="e.g. Bihar"
                                  />
                                </div>

                                <div className="col-md-4">
                                  <label className="fw-bold">Country:</label>
                                  <input
                                    type="text"
                                    name="country"
                                    className="form-control mt-2"
                                    value={data.country || ""}
                                    onChange={getInputData}
                                    placeholder="India"
                                  />
                                </div>

                                <div className="col-md-4">
                                  <label className="fw-bold">PIN Code:</label>
                                  <input
                                    type="text"
                                    name="pin"
                                    className={`form-control mt-2 ${
                                      errors.pin ? "is-invalid" : ""
                                    }`}
                                    value={data.pin || ""}
                                    onChange={getInputData}
                                    maxLength={6}
                                    placeholder="846004"
                                  />
                                  {errors.pin && (
                                    <small className="text-danger">
                                      {errors.pin}
                                    </small>
                                  )}
                                </div>
                              </div>

                              {/* ==================================================
                                  Row 5 : Password / Photo / Role
                                  ================================================== */}
                              <div className="row g-2 mt-3">
                                {/* Password */}
                                <div className="col-md-4">
                                  <label className="fw-bold">
                                    Change Password:
                                  </label>
                                  <div className="input-group mt-2">
                                    <input
                                      type={showPassword ? "text" : "password"}
                                      name="cpassword"
                                      className={`form-control ${
                                        errors.cpassword ? "is-invalid" : ""
                                      }`}
                                      value={data.cpassword || ""}
                                      onChange={getInputData}
                                      placeholder="खाली छोड़ें = बदलें नहीं"
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-outline-secondary"
                                      onClick={() =>
                                        setShowPassword(!showPassword)
                                      }
                                    >
                                      <i
                                        className={`fa ${
                                          showPassword
                                            ? "fa-eye-slash"
                                            : "fa-eye"
                                        }`}
                                      ></i>
                                    </button>
                                  </div>
                                  {errors.cpassword && (
                                    <small className="text-danger">
                                      {errors.cpassword}
                                    </small>
                                  )}
                                  <small className="text-muted d-block mt-1">
                                    खाली छोड़ें → पुराना password बना रहेगा
                                  </small>
                                </div>

                                {/* Photo */}
                                <div className="col-md-4">
                                  <label className="fw-bold">
                                    Profile Picture:
                                  </label>
                                  <input
                                    type="file"
                                    name="pic"
                                    accept="image/*"
                                    className="form-control mt-2"
                                    onChange={handleFileChange}
                                  />
                                  <small className="text-muted d-block mt-1">
                                    Max 2MB, JPG/PNG/WebP
                                  </small>

                                  {previewPic && (
                                    <div className="mt-2 text-center">
                                      <img
                                        src={getImageSrc(previewPic)}
                                        alt="Preview"
                                        className="img-thumbnail"
                                        style={{
                                          width: 100,
                                          height: 100,
                                          objectFit: "cover",
                                        }}
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).src =
                                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                              data.name || "Admin"
                                            )}&background=667eea&color=fff&size=200`;
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>

                                {/* Role */}
                                <div className="col-md-4">
                                  <label className="fw-bold">Role:</label>
                                  <input
                                    type="text"
                                    name="role"
                                    className="form-control mt-2 bg-light"
                                    value={data.role || ""}
                                    readOnly
                                    title="Role change नहीं हो सकता"
                                  />
                                </div>
                              </div>

                              {/* ==================================================
                                  Buttons
                                  ================================================== */}
                              <div className="d-flex justify-content-center py-4 gap-3">
                                <Link href="/AdminProfile">
                                  <button
                                    type="button"
                                    className="btn btn-secondary btn-md"
                                    disabled={saving}
                                  >
                                    <i className="fa fa-arrow-left me-2"></i>
                                    Back to Profile
                                  </button>
                                </Link>

                                <button
                                  type="submit"
                                  className="btn btn-primary btn-md"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PageFooter />
      </div>
    </div>
  );
}

export default AdminUpdateProfile;