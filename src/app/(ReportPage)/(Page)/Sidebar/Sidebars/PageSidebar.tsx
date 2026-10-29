"use client";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAuthUser } from "../../../../../../lib/authUser";

interface SidebarsProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const ReportSidebar: React.FC<SidebarsProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const pathname = usePathname();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    const user = getAuthUser("report");
    if (user) setReport(user);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  /* Auto-scroll active item into view */
  useLayoutEffect(() => {
    if (navContainerRef.current) {
      const activeItem = navContainerRef.current.querySelector("a.active");
      if (activeItem)
        activeItem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [pathname]);

  /* Active class helper */
  const getNavClass = (href: string) =>
    `nav-item nav-link ${pathname === href ? "active" : ""}`;

  /* Image helper */
  const getImageSrc = (pic?: string, name?: string) => {
    if (!pic)
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name || "R"
      )}&background=667eea&color=fff&size=64`;
    if (
      pic.startsWith("blob:") ||
      pic.startsWith("http") ||
      pic.startsWith("data:")
    )
      return pic;
    return `/assets/images/${pic}`;
  };

  return (
    <div className={`sidebar pb-3 ${isSidebarOpen ? "" : "collapsed"}`}>
      <nav className="navbar bg-light navbar-light">
        {/* Logo */}
        <Link href="/ReportHome"
          className="navbar-brand mb-3 fs-2 fw-bold mx-3" onClick={scrollToTop}>
          <span className="text-primary">R</span>
          <span>-Report</span>
          <span className="sidebar-toggler" onClick={toggleSidebar}>
            <i className="fa fa-close d-lg-none float-end text-primary ms-5"></i>
          </span>
        </Link>

        {/* Profile */}
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <Link href="/ReportHome" onClick={scrollToTop}> <img   className="rounded-circle me-lg-2"   style={{ width: "50px", height: "50px", objectFit: "cover" }}   src={getImageSrc(report?.pic, report?.name)}   alt={report?.name || "Report"}   onError={(e) => {     (e.target as HTMLImageElement).src =       `https://ui-avatars.com/api/?name=${encodeURIComponent(         report?.name || "R"       )}&background=667eea&color=fff&size=64`;   }} />
            </Link>
          </div>
          <div className="mx-3">
            <Link href="/ReportProfile" onClick={scrollToTop}> <h6 className="mb-0">{report?.name || "Report User"}</h6> <span className="badge bg-warning text-dark small">   <i className="fa fa-chart-bar me-1"></i>   Report </span>
            </Link>
          </div>
        </div>

        {/* Navigation */}
<div className="col-12">
  <div className="navbar-nav" ref={navContainerRef}>
    <Link href="/ReportHome" className={getNavClass("/ReportHome")} onClick={scrollToTop}>
      <i className="fa fa-home me-2"></i> Home
    </Link>
    <Link href="/ReportDashboard" className={getNavClass("/ReportDashboard")} onClick={scrollToTop}>
      <i className="fa fa-tachometer me-2"></i> Dashboard
    </Link>
    <Link href="/ReportSales" className={getNavClass("/ReportSales")} onClick={scrollToTop}>
      <i className="fa fa-line-chart me-2"></i> Sales Report
    </Link>
    <Link href="/ReportOrder" className={getNavClass("/ReportOrder")} onClick={scrollToTop}>
      <i className="fa fa-shopping-cart me-2"></i> Order Report
    </Link>
    <Link href="/ReportProduct" className={getNavClass("/ReportProduct")} onClick={scrollToTop}>
      <i className="fa fa-tags me-2"></i> Product Report
    </Link>
    <Link href="/ReportInventory" className={getNavClass("/ReportInventory")} onClick={scrollToTop}>
      <i className="fa fa-cubes me-2"></i> Inventory
    </Link>
    <Link href="/ReportPayment" className={getNavClass("/ReportPayment")} onClick={scrollToTop}>
      <i className="fa fa-credit-card me-2"></i> Payment
    </Link>
    <Link href="/ReportGst" className={getNavClass("/ReportGst")} onClick={scrollToTop}>
      <i className="fa fa-percent me-2"></i> GST Report
    </Link>
    <Link href="/ReportEnquiry" className={getNavClass("/ReportEnquiry")} onClick={scrollToTop}>
      <i className="fa fa-envelope me-2"></i> Enquiry Report
    </Link>
    <Link href="/ReportRefund" className={getNavClass("/ReportRefund")} onClick={scrollToTop}>
      <i className="fa fa-undo me-2"></i> Return/Refund
    </Link>

    <hr className="my-2" />
    <Link href="/ReportProfile" className={getNavClass("/ReportProfile")} onClick={scrollToTop}>
      <i className="fa fa-user me-2"></i> My Profile
    </Link>
    <Link href="/ReportUpdateProfile" className={getNavClass("/ReportUpdateProfile")} onClick={scrollToTop}>
      <i className="fa fa-edit me-2"></i> Update Profile
    </Link>
  </div>
</div>
      </nav>
    </div>
  );
};

export default ReportSidebar;