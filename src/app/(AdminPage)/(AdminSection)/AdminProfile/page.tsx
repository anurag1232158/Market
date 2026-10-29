"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageNavbar from "../../(Page)/Sidebar/Navbar/PageNavbar";
import PageFooter from "../../(Page)/Sidebar/Footer/page";
import Sidebars from "../../(Page)/Sidebar/Sidebars/PageSidebar";
import { getAuthUser } from "../../../../../lib/authUser";

function AdminProfile() {
  const [adminData, setAdminData] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

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
        const matched =
          (cached?.id && list.find((a: any) => String(a.id) === String(cached.id))) ||
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
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const getImageSrc = (pic?: string, name?: string) => {
    if (!pic) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name || "Admin"
      )}&background=667eea&color=fff&size=256`;
    }
    if (pic.startsWith("blob:") || pic.startsWith("http")) return pic;
    return `/assets/images/${pic}`;
  };

  if (loading && !adminData) {
    return (
      <>
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
      </>
    );
  }

  if (!adminData) {
    return (
      <>
        <div className="wrapper">
          <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
            <PageNavbar toggleSidebar={toggleSidebar} />
            <section className="mb-5 pb-3">
              <div className="container-fluid">
                <div className="alert alert-danger text-center">
                  <i className="fa fa-exclamation-triangle fa-2x mb-2 d-block"></i>
                  <strong>Admin profile नहीं मिला!</strong>
                  <p className="mb-0">
                    कृपया दोबारा login करें।
                  </p>
                  <Link href="/AdminLogin" className="btn btn-primary mt-3">
                    Login Again
                  </Link>
                </div>
              </div>
            </section>
            <PageFooter />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="wrapper">
        <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
          <PageNavbar toggleSidebar={toggleSidebar} />

          <section className="mb-5 pb-3">
            <div className="container-fluid">
              <div className="col-lg-12">
                <div className="row">
                  <div
                    className="col-md-12"
                    data-aos="zoom-in-down"
                    data-aos-duration="1500"
                  >
                    <div className="card">
                      <div className="card-body border-0">
                        <div className="row">
                          {/* ============ Welcome Banner ============ */}
                          <div
                            className="p-3 mb-3 bg-gradient w-100"
                            data-aos="fade-down"
                            data-aos-anchor-placement="top-center"
                            data-aos-duration="1500"
                          >
                            <div className="d-sm-flex w-100 justify-content-between align-items-center">
                              <div className="d-sm-flex align-items-center p-3 m-auto">
                                <h5 className="mb-0 font-weight-medium mr-3 fs-5 text-white">
                                  Hi,{" "}
                                  <span className="fw-bold text-decoration-underline">
                                    {adminData?.name || "Admin"}
                                  </span>{" "}
                                  Welcome Back!
                                </h5>
                                <span className="mb-0 text-medium ms-3 text-white-50">
                                  Your Admin Dashboard
                                </span>
                              </div>
                              <p className="mb-0 w-50 text-white-50">
                                You can view and manage your profile details
                                below.
                              </p>
                            </div>
                          </div>

                          {/* ============ Profile Section ============ */}
                          <div className="col-md-12">
                            <h5 className="bg-light border border-1 text-center p-2 fw-bold mb-4">
                              <i className="fa fa-user text-dark me-2"></i>
                              Your Profile
                            </h5>

                            <div className="row gx-3">
                              {/* ============ Photo ============ */}
                              <div
                                className="col-md-3 border text-center"
                                data-aos="zoom-in-up"
                                data-aos-duration="1000"
                              >
                                <img
                                  src={getImageSrc(adminData?.pic, adminData?.name)}
                                  alt="Profile"
                                  className="w-100 h-auto m-auto justify-content-center p-3 rounded img-fluid"
                                  style={{ maxHeight: "300px", objectFit: "cover" }}
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        adminData?.name || "Admin"
                                      )}&background=667eea&color=fff&size=256`;
                                  }}
                                />

                                {/* Role Badge */}
                                <div className="mt-2 mb-3">
                                  <span className="badge bg-danger fs-6">
                                    <i className="fa fa-shield-alt me-1"></i>
                                    {adminData?.role || "Admin"}
                                  </span>
                                </div>
                              </div>

                              {/* ============ Details ============ */}
                              <div
                                className="col-md-9"
                                data-aos="zoom-in-up"
                                data-aos-duration="1500"
                              >
                                <table className="table table-bordered table-hover">
                                  <tbody>
                                    <tr>
                                      <th style={{ width: "30%" }}>
                                        <i className="fa fa-user-circle me-2 text-primary"></i>
                                        Username
                                      </th>
                                      <td>{adminData?.username || "-"}</td>
                                    </tr>

                                    <tr>
                                      <th>
                                        <i className="fa fa-id-card me-2 text-primary"></i>
                                        Full Name
                                      </th>
                                      <td>{adminData?.name || "-"}</td>
                                    </tr>

                                    <tr>
                                      <th>
                                        <i className="fa fa-envelope me-2 text-primary"></i>
                                        Email
                                      </th>
                                      <td>
                                        {adminData?.email ? (
                                          <a href={`mailto:${adminData.email}`}>
                                            {adminData.email}
                                          </a>
                                        ) : (
                                          "-"
                                        )}
                                      </td>
                                    </tr>

                                    <tr>
                                      <th>
                                        <i className="fa fa-phone me-2 text-primary"></i>
                                        Mobile Number
                                      </th>
                                      <td>
                                        {adminData?.number ? (
                                          <a href={`tel:${adminData.number}`}>
                                            {adminData.number}
                                          </a>
                                        ) : (
                                          "-"
                                        )}
                                      </td>
                                    </tr>

                                    <tr>
                                      <th>
                                        <i className="fa fa-toggle-on me-2 text-primary"></i>
                                        Status
                                      </th>
                                      <td>
                                        {/* ⭐ Status properly check */}
                                        {adminData?.status === "Active" ||
                                        adminData?.status === true ||
                                        adminData?.status === "true" ? (
                                          <span className="badge bg-success fs-6">
                                            <i className="fa fa-check-circle me-1"></i>
                                            Active
                                          </span>
                                        ) : (
                                          <span className="badge bg-secondary fs-6">
                                            <i className="fa fa-pause-circle me-1"></i>
                                            Inactive
                                          </span>
                                        )}
                                      </td>
                                    </tr>

                                    {adminData?.village && (
                                      <tr>
                                        <th>
                                          <i className="fa fa-home me-2 text-primary"></i>
                                          Village
                                        </th>
                                        <td>{adminData.village}</td>
                                      </tr>
                                    )}

                                    {adminData?.post && (
                                      <tr>
                                        <th>
                                          <i className="fa fa-mail-bulk me-2 text-primary"></i>
                                          Post
                                        </th>
                                        <td>{adminData.post}</td>
                                      </tr>
                                    )}

                                    {adminData?.city && (
                                      <tr>
                                        <th>
                                          <i className="fa fa-city me-2 text-primary"></i>
                                          City
                                        </th>
                                        <td>{adminData.city}</td>
                                      </tr>
                                    )}

                                    {adminData?.state && (
                                      <tr>
                                        <th>
                                          <i className="fa fa-map-marker-alt me-2 text-primary"></i>
                                          State
                                        </th>
                                        <td>{adminData.state}</td>
                                      </tr>
                                    )}

                                    {adminData?.country && (
                                      <tr>
                                        <th>
                                          <i className="fa fa-globe me-2 text-primary"></i>
                                          Country
                                        </th>
                                        <td>{adminData.country}</td>
                                      </tr>
                                    )}

                                    {adminData?.pin && (
                                      <tr>
                                        <th>
                                          <i className="fa fa-map-pin me-2 text-primary"></i>
                                          PIN Code
                                        </th>
                                        <td>{adminData.pin}</td>
                                      </tr>
                                    )}

                                    <tr>
                                      <th>
                                        <i className="fa fa-key me-2 text-primary"></i>
                                        Password
                                      </th>
                                      <td>
                                        {/* ⭐ Password hide — security */}
                                        <span className="text-muted">
                                          ••••••••
                                        </span>
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-link ms-2 p-0"
                                          onClick={(e) => {
                                            const span =
                                              e.currentTarget
                                                .previousElementSibling;
                                            if (span) {
                                              span.textContent =
                                                span.textContent === "••••••••"
                                                  ? "● Hidden ●"
                                                  : "••••••••";
                                            }
                                          }}
                                        >
                                          <i className="fa fa-eye"></i>
                                        </button>
                                        <small className="d-block text-muted mt-1">
                                          <i className="fa fa-info-circle me-1"></i>
                                          Security के लिए password hidden है
                                        </small>
                                      </td>
                                    </tr>

                                    <tr>
                                      <th>
                                        <i className="fa fa-user-shield me-2 text-primary"></i>
                                        Role
                                      </th>
                                      <td>
                                        <span className="badge bg-danger">
                                          {adminData?.role || "Admin"}
                                        </span>
                                      </td>
                                    </tr>

                                    {adminData?.createdAt && (
                                      <tr>
                                        <th>
                                          <i className="fa fa-calendar me-2 text-primary"></i>
                                          Member Since
                                        </th>
                                        <td>
                                          {new Date(
                                            adminData.createdAt
                                          ).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                          })}
                                        </td>
                                      </tr>
                                    )}

                                    <tr>
                                      <td
                                        colSpan={2}
                                        className="text-center py-4"
                                      >
                                        <Link
                                          href="/AdminUpdateProfile"
                                          className="btn btn-primary w-100"
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

export default AdminProfile;