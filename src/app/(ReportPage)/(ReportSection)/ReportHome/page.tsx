"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageNavbar from "../../(Page)/Sidebar/Navbar/PageNavbar";
import PageFooter from "../../(Page)/Sidebar/Footer/page";
import Sidebars from "../../(Page)/Sidebar/Sidebars/PageSidebar";
import { getAuthUser } from "../../../../../lib/authUser";

export default function ReportHome() {
  const [report, setReport] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const user = getAuthUser("report");
    if (user) setReport(user);
  }, []);

  const getImageSrc = (pic?: string, name?: string) => {
    if (!pic)
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "R")}&background=667eea&color=fff&size=256`;
    if (pic.startsWith("blob:") || pic.startsWith("http")) return pic;
    return `/assets/images/${pic}`;
  };

  const quickLinks = [
    { title: "Sales Report", icon: "fa-chart-line", color: "primary", link: "/ReportDashboard?tab=sales" },
    { title: "Order Report", icon: "fa-shopping-cart", color: "success", link: "/ReportDashboard?tab=orders" },
    { title: "Stock Report", icon: "fa-boxes", color: "warning", link: "/ReportDashboard?tab=stock" },
    { title: "User Report", icon: "fa-users", color: "info", link: "/ReportDashboard?tab=users" },
  ];

  return (
    <div className="wrapper">
      <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
        <PageNavbar toggleSidebar={toggleSidebar} />

        <section className="p-4">
          <div className="container-fluid">
            <div
              className="p-4 mb-4 rounded shadow-lg text-white"
              style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h3 className="fw-bold mb-1">
                    Welcome, {report?.name || "Report User"}! 👋
                  </h3>
                  <p className="mb-0 text-white-50">
                    <i className="fa fa-chart-bar me-2"></i> View analytics and reports
                  </p>
                </div>
                <span className="badge bg-light text-dark fs-6">
                  <i className="fa fa-shield-alt me-1 text-warning"></i> Report Access
                </span>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-4 mb-3">
                <div className="card shadow-lg h-100">
                  <div className="card-body text-center">
                    <img
                      src={getImageSrc(report?.pic, report?.name)}
                      alt="Profile"
                      className="rounded-circle border border-4 border-primary"
                      style={{ width: "140px", height: "140px", objectFit: "cover" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(report?.name || "R")}&background=667eea&color=fff&size=256`;
                      }}
                    />
                    <h5 className="mt-3 mb-1 fw-bold">{report?.name || "Report"}</h5>
                    <p className="text-muted mb-2">@{report?.username || "report"}</p>
                    <span className="badge bg-warning text-dark">
                      <i className="fa fa-chart-bar me-1"></i> Report User
                    </span>
                    <div className="d-grid gap-2 mt-3">
                      <Link href="/ReportProfile" className="btn btn-primary">
                        <i className="fa fa-user me-2"></i> View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 mb-3">
                <div className="card shadow-lg h-100">
                  <div className="card-header bg-primary text-white">
                    <h6 className="mb-0 fw-bold">
                      <i className="fa fa-info-circle me-2"></i> Your Information
                    </h6>
                  </div>
                  <div className="card-body">
                    <table className="table table-bordered mb-0">
                      <tbody>
                        <tr>
                          <th style={{ width: "30%" }}>Name</th>
                          <td>{report?.name || "-"}</td>
                        </tr>
                        <tr>
                          <th>Username</th>
                          <td><code>{report?.username || "-"}</code></td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>{report?.email || "-"}</td>
                        </tr>
                        <tr>
                          <th>Phone</th>
                          <td>{report?.number || "-"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="fw-bold mb-3">
              <i className="fa fa-bolt text-warning me-2"></i> Quick Reports
            </h5>
            <div className="row g-3">
              {quickLinks.map((q, i) => (
                <div className="col-lg-3 col-md-6" key={i}>
                  <Link href={q.link} className="text-decoration-none">
                    <div className={`card bg-${q.color} text-white h-100 shadow quick-link`}>
                      <div className="card-body text-center py-4">
                        <i className={`fa ${q.icon} fa-3x mb-2`}></i>
                        <h6 className="mb-0 fw-bold">{q.title}</h6>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="alert alert-info mt-4">
              <h6 className="fw-bold">
                <i className="fa fa-info-circle me-2"></i> Report Access
              </h6>
              <p className="mb-0">
                As a <strong>Report user</strong>, आप सिर्फ reports और analytics देख सकते हैं।
              </p>
            </div>
          </div>
        </section>

        <PageFooter />
      </div>
    </div>
  );
}