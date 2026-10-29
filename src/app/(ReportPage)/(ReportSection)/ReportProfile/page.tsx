"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageNavbar from "../../(Page)/Sidebar/Navbar/PageNavbar";
import PageFooter from "../../(Page)/Sidebar/Footer/Footer";
import Sidebars from "../../(Page)/Sidebar/Sidebars/PageSidebar";
import { getAuthUser } from "../../../../../lib/authUser";

export default function ReportProfile() {
  const [report, setReport] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const cached = getAuthUser("report");
    if (cached) setReport(cached);

    fetch("/api/report/me")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) setReport({ ...cached, ...data });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getImageSrc = (pic?: string, name?: string) => {
    if (!pic)
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "R")}&background=667eea&color=fff&size=256`;
    if (pic.startsWith("blob:") || pic.startsWith("http")) return pic;
    return `/assets/images/${pic}`;
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading profile...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="alert alert-danger m-4">
        <i className="fa fa-exclamation-triangle me-2"></i>
        Report data नहीं मिला।
        <Link href="/ReportLogin" className="btn btn-primary ms-3">Login</Link>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
        <PageNavbar toggleSidebar={toggleSidebar} />

        <section className="p-4">
          <div className="container-fluid">
            <div className="bg-primary text-white p-3 rounded shadow mb-4">
              <h4 className="mb-0 fw-bold">
                <i className="fa fa-user me-2"></i> My Profile
              </h4>
            </div>

            <div className="card shadow-lg">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 text-center mb-3">
                    <img
                      src={getImageSrc(report.pic, report.name)}
                      alt="Profile"
                      className="rounded-circle border border-4 border-primary"
                      style={{ width: "180px", height: "180px", objectFit: "cover" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(report.name || "R")}&background=667eea&color=fff&size=256`;
                      }}
                    />
                    <div className="mt-3">
                      <span className="badge bg-warning text-dark">
                        <i className="fa fa-chart-bar me-1"></i> Report User
                      </span>
                    </div>
                  </div>

                  <div className="col-md-9">
                    <table className="table table-bordered table-hover">
                      <tbody>
                        <tr>
                          <th style={{ width: "30%" }}>Name</th>
                          <td>{report.name || "-"}</td>
                        </tr>
                        <tr>
                          <th>Username</th>
                          <td><code>{report.username || "-"}</code></td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>{report.email || "-"}</td>
                        </tr>
                        <tr>
                          <th>Phone</th>
                          <td>{report.number || "-"}</td>
                        </tr>
                        <tr>
                          <th>Role</th>
                          <td>
                            <span className="badge bg-warning text-dark">
                              {report.role || "Report"}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2} className="text-center py-3">
                            <Link href="/ReportUpdateProfile" className="btn btn-primary w-100">
                              <i className="fa fa-edit me-2"></i> Update Profile
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
        </section>

        <PageFooter />
      </div>
    </div>
  );
}