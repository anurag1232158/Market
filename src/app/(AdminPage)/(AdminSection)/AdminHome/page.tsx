"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageNavbar from "../../(Page)/Sidebar/Navbar/PageNavbar";
import PageFooter from "../../(Page)/Sidebar/Footer/Footer";
import Sidebars from "../../(Page)/Sidebar/Sidebars/PageSidebar";
import { getAuthUser } from "../../../../../lib/authUser";

function AdminHome() {
  const [adminData, setAdminData] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ============================================================
     ⭐ Fetch admin — localStorage + API (smart)
     ============================================================ */
  useEffect(() => {
    const cached = getAuthUser("admin");
    if (cached) setAdminData(cached);

    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin");
        if (!response.ok) {
          setLoading(false);
          return;
        }

        const result = await response.json();
        const list = Array.isArray(result) ? result : result?.admin || [];

        /* Priority: cached ID → पहला admin */
        const matched =
          (cached?.id &&
            list.find((a: any) => String(a.id) === String(cached.id))) ||
          list[0];

        if (matched) setAdminData(matched);
      } catch (err) {
        console.error("Error fetching admin:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ============================================================
     ⭐ Image URL helper
     ============================================================ */
  const getImageSrc = (pic?: string, name?: string) => {
    if (!pic) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name || "Admin"
      )}&background=667eea&color=fff&size=256`;
    }
    if (
      pic.startsWith("blob:") ||
      pic.startsWith("data:") ||
      pic.startsWith("http")
    )
      return pic;
    return `/assets/images/${pic}`;
  };

  /* ============================================================
     ⭐ Quick Links Config
     ============================================================ */
  const quickLinks = [
    {
      title: "Orders",
      icon: "fa-shopping-cart",
      color: "primary",
      link: "/AdminOrder",
    },
    {
      title: "Products",
      icon: "fa-box",
      color: "success",
      link: "/AdminProducts",
    },
    {
      title: "Customers",
      icon: "fa-users",
      color: "info",
      link: "/AdminContactUs",
    },
    {
      title: "Inventory",
      icon: "fa-cubes",
      color: "warning",
      link: "/AdminInventory",
    },
    {
      title: "Payments",
      icon: "fa-money-bill-wave",
      color: "danger",
      link: "/AdminPayment",
    },
    {
      title: "Coupons",
      icon: "fa-tag",
      color: "secondary",
      link: "/AdminCoupon",
    },
    {
      title: "Enquiries",
      icon: "fa-envelope",
      color: "info",
      link: "/AdminEnquiries",
    },
    {
      title: "Dashboard",
      icon: "fa-tachometer-alt",
      color: "dark",
      link: "/AdminDashboard",
    },
  ];

  /* ============================================================
     ⭐ LOADING
     ============================================================ */
  if (loading && !adminData) {
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
              <p className="mt-3 text-muted">Loading...</p>
            </div>
          </section>
          <PageFooter />
        </div>
      </div>
    );
  }

  /* ============================================================
     ⭐ No Admin (Error State)
     ============================================================ */
  if (!adminData) {
    return (
      <div className="wrapper">
        <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
          <PageNavbar toggleSidebar={toggleSidebar} />
          <section className="mb-5 pb-3">
            <div className="container-fluid">
              <div className="alert alert-danger text-center">
                <i className="fa fa-exclamation-triangle fa-2x mb-2 d-block"></i>
                <strong>Admin data नहीं मिला!</strong>
                <p className="mb-0">कृपया दोबारा login करें।</p>
                <Link href="/AdminLogin" className="btn btn-primary mt-3">
                  <i className="fa fa-sign-in-alt me-1"></i> Login Again
                </Link>
              </div>
            </div>
          </section>
          <PageFooter />
        </div>
      </div>
    );
  }

  /* ============================================================
     ⭐ MAIN UI
     ============================================================ */
  return (
    <>
      <div className="wrapper">
        <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
          <PageNavbar toggleSidebar={toggleSidebar} />

          <section className="mb-5 pb-3">
            <div className="container-fluid">
              <div className="row">
                <div
                  className="col-md-12"
                  data-aos="zoom-in-down"
                  data-aos-duration="1000"
                >
                  <div className="card">
                    <div className="card-body border-0">
                      <div className="row">
                        <div className="col-12">
                          {/* ==================================================
                              Welcome Banner
                              ================================================== */}
                          <div
                            className="p-3 mb-4 bg-gradient rounded"
                            data-aos="fade-down"
                            data-aos-duration="1500"
                          >
                            <div className="d-sm-flex w-100 justify-content-between align-items-center">
                              <div className="d-sm-flex align-items-center p-2">
                                <h5 className="mb-0 fw-medium me-3 fs-5 text-white">
                                  Hi,{" "}
                                  <span className="fw-bold text-decoration-underline">
                                    {adminData.name || "Admin"}
                                  </span>{" "}
                                  Welcome Back!
                                </h5>
                                <span className="badge bg-light text-dark fs-6">
                                  <i className="fa fa-shield-alt me-1 text-danger"></i>
                                  {adminData.role || "Admin"}
                                </span>
                              </div>
                              <p className="mb-0 text-white-50 d-none d-md-block">
                                <i className="fa fa-clock me-1"></i>
                                {new Date().toLocaleString("en-IN", {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>

                          {/* ==================================================
                              Page Title
                              ================================================== */}
                          <h5 className="bg-gradient text-center p-3 fw-bold mb-4 rounded text-white">
                            <i className="fa fa-home me-2"></i>
                            Admin Home
                          </h5>

                          {/* ==================================================
                              Profile Card + Info
                              ================================================== */}
                          <div className="row">
                            {/* Photo */}
                            <div
                              className="col-lg-5 d-flex justify-content-center mb-4"
                              data-aos="flip-left"
                              data-aos-duration="2000"
                            >
                              <div className="card w-75 shadow-lg">
                                <div className="card-body text-center p-4">
                                  <img
                                    src={getImageSrc(
                                      adminData?.pic,
                                      adminData?.name
                                    )}
                                    alt="Profile"
                                    className="img-fluid rounded-circle zoom-in hover-effect border border-4 border-primary"
                                    style={{
                                      width: "200px",
                                      height: "200px",
                                      objectFit: "cover",
                                    }}
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src =
                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                          adminData?.name || "Admin"
                                        )}&background=667eea&color=fff&size=256`;
                                    }}
                                  />

                                  <h4 className="mt-3 mb-1 fw-bold">
                                    {adminData.name || "Admin"}
                                  </h4>
                                  <p className="text-muted mb-2">
                                    @{adminData.username || "admin"}
                                  </p>

                                  <div className="d-flex justify-content-center gap-2 mb-3">
                                    <span
                                      className={`badge ${
                                        adminData.status === "Active"
                                          ? "bg-success"
                                          : "bg-secondary"
                                      }`}
                                    >
                                      <i
                                        className={`fa ${
                                          adminData.status === "Active"
                                            ? "fa-check-circle"
                                            : "fa-pause-circle"
                                        } me-1`}
                                      ></i>
                                      {adminData.status || "Active"}
                                    </span>
                                    <span className="badge bg-danger">
                                      <i className="fa fa-user-shield me-1"></i>
                                      {adminData.role || "Admin"}
                                    </span>
                                  </div>

                                  <Link
                                    href="/AdminProfile"
                                    className="btn btn-primary w-100"
                                  >
                                    <i className="fa fa-user me-2"></i>
                                    View Full Profile
                                  </Link>
                                </div>
                              </div>
                            </div>

                            {/* Details */}
                            <div
                              className="col-lg-7 mb-4"
                              data-aos="flip-right"
                              data-aos-duration="2000"
                            >
                              <div className="card shadow-lg">
                                <div className="card-header bg-gradient">
                                  <h6 className="mb-0 text-white fw-bold">
                                    <i className="fa fa-info-circle me-2"></i>
                                    Contact Details
                                  </h6>
                                </div>
                                <div className="card-body p-0">
                                  <table className="table table-bordered table-hover mb-0">
                                    <tbody>
                                      <tr>
                                        <th
                                          className="bg-light"
                                          style={{ width: "35%" }}
                                        >
                                          <i className="fa fa-user text-primary me-2"></i>
                                          Full Name
                                        </th>
                                        <td>{adminData.name || "-"}</td>
                                      </tr>
                                      <tr>
                                        <th className="bg-light">
                                          <i className="fa fa-at text-primary me-2"></i>
                                          Username
                                        </th>
                                        <td>
                                          <code>{adminData.username || "-"}</code>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="bg-light">
                                          <i className="fa fa-envelope text-primary me-2"></i>
                                          Email
                                        </th>
                                        <td>
                                          {adminData.email ? (
                                            <a
                                              href={`mailto:${adminData.email}`}
                                              className="text-decoration-none"
                                            >
                                              {adminData.email}
                                            </a>
                                          ) : (
                                            "-"
                                          )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="bg-light">
                                          <i className="fa fa-phone text-primary me-2"></i>
                                          Phone
                                        </th>
                                        <td>
                                          {adminData.number ? (
                                            <a
                                              href={`tel:${adminData.number}`}
                                              className="text-decoration-none"
                                            >
                                              {adminData.number}
                                            </a>
                                          ) : (
                                            "-"
                                          )}
                                        </td>
                                      </tr>
                                      {adminData.village && (
                                        <tr>
                                          <th className="bg-light">
                                            <i className="fa fa-home text-primary me-2"></i>
                                            Village
                                          </th>
                                          <td>{adminData.village}</td>
                                        </tr>
                                      )}
                                      {adminData.state && (
                                        <tr>
                                          <th className="bg-light">
                                            <i className="fa fa-map-marker-alt text-primary me-2"></i>
                                            State
                                          </th>
                                          <td>{adminData.state}</td>
                                        </tr>
                                      )}
                                      <tr>
                                        <td colSpan={2} className="text-center p-3">
                                          <Link
                                            href="/AdminUpdateProfile"
                                            className="btn btn-warning w-100"
                                          >
                                            <i className="fa fa-edit me-2"></i>
                                            Update Profile
                                          </Link>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ==================================================
                              Quick Links
                              ================================================== */}
                          <h5 className="bg-gradient text-center p-3 fw-bold mb-4 rounded mt-4 text-white">
                            <i className="fa fa-bolt me-2"></i>
                            Quick Links
                          </h5>

                          <div className="row g-3 mb-4">
                            {quickLinks.map((q, i) => (
                              <div
                                className="col-lg-3 col-md-4 col-sm-6"
                                key={i}
                                data-aos="zoom-in-up"
                                data-aos-duration="1000"
                              >
                                <Link
                                  href={q.link}
                                  className="text-decoration-none"
                                >
                                  <div
                                    className={`card bg-${q.color} text-white h-100 quick-link-card`}
                                  >
                                    <div className="card-body text-center py-4">
                                      <i
                                        className={`fa ${q.icon} fa-2x mb-2`}
                                      ></i>
                                      <h6 className="mb-0 fw-bold">
                                        {q.title}
                                      </h6>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            ))}
                          </div>

                          {/* ==================================================
                              Welcome Note
                              ================================================== */}
                          <div className="alert alert-info mt-4">
                            <h6 className="fw-bold">
                              <i className="fa fa-info-circle me-2"></i>
                              Welcome to Admin Panel
                            </h6>
                            <p className="mb-0">
                              यहाँ से आप अपने Makhana store का पूरा management
                              कर सकते हैं — Orders, Products, Customers,
                              Payments, Coupons और बहुत कुछ। ऊपर दिए गए{" "}
                              <strong>Quick Links</strong> से किसी भी section
                              में जाएँ।
                            </p>
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
    </>
  );
}

export default AdminHome;