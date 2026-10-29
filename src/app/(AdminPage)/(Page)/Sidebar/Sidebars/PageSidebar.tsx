"use client";

import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface Admin {
  username: string;
  name: string;
  pic: string;
}
interface SidebarsProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}
const PageSidebar: React.FC<SidebarsProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const navigate = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const username = localStorage.getItem("username");
  const name = localStorage.getItem("name") || "Admin";
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<any>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const toggleDropdown = () => { setOpenDropdown((prev) => !prev); };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  useEffect(() => { const userId = localStorage.getItem("userid");
    if (!userId) {
      console.log("Admin not logged in, redirecting...");
      ("/AdminLogin");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin");
        if (response.ok) {
          const result = await response.json();
          const user = result.find((item: any) => item.id === "33db");
          if (user) setAdmin(user);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);
  // Scroll active nav item into view
  useLayoutEffect(() => {
    if (navContainerRef.current) {
      const activeItem = navContainerRef.current.querySelector("a.active");
      if (activeItem)
        activeItem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  // Helper to add active class
  const getNavClass = (href: string) => `nav-item nav-link ${pathname === href ? "active" : ""}`;

  return (
    <>
      <div className={`sidebar pb-3 ${isSidebarOpen ? "" : "collapsed"}`}>
        <nav className="navbar bg-light navbar-light">
          {/* Logo */}
          <Link href="/AdminHome" className="navbar-brand mb-3 fs-2 fw-bold mx-3" onClick={scrollToTop}> 
           <span className="text-primary">T</span> <span>-Home</span>
            <span className="sidebar-toggler" onClick={toggleSidebar}><i className="fa fa-close d-lg-none float-end text-primary ms-5"></i>
            </span>
          </Link>

          {/* Profile */}
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative"><Link href="/AdminHome" onClick={scrollToTop}>
                <img className="rounded-circle me-lg-2" style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  src={
                    admin?.pic
                      ? `/assets/images/${admin.pic}`
                      : "/assets/images/avatar/avatar-1.png"
                  }
                  alt={admin?.name || name}/>
              </Link>
            </div>
            <div className="mx-3">
              <Link href="/AdminProfile" onClick={scrollToTop}>
                <h6 className="mb-0">{admin?.name || name}</h6>
                <span>{admin?.username || username}</span>
              </Link>
            </div>
          </div>

          {/* ⭐ SIDEBAR NAVIGATION (RESPONSIVE FIX) ⭐ */}
         <div className="col-12">
  <div className="navbar-nav" ref={navContainerRef}>
    <Link href="/AdminDashboard" className={getNavClass("/AdminDashboard")} onClick={scrollToTop}>
      <i className="fa fa-tachometer me-2"></i> Dashboard
    </Link>
    <Link href="/AdminProduct" className={getNavClass("/AdminProduct")} onClick={scrollToTop}>
      <i className="fa fa-tags me-2"></i> Product
    </Link>
    <Link href="/AdminAboutUs" className={getNavClass("/AdminAboutUs")} onClick={scrollToTop}>
      <i className="fa fa-info-circle me-2"></i> About Us
    </Link>
     <Link href="/AdminBestseller" className={getNavClass("/AdminBestseller")} onClick={scrollToTop}>
      <i className="fa fa-sellsy me-2"></i> Bestseller
    </Link>
    <Link href="/AdminBanner" className={getNavClass("/AdminBanner")} onClick={scrollToTop}>
      <i className="fa fa-image me-2"></i> Banner
    </Link>
    <Link href="/AdminCoupon" className={getNavClass("/AdminCoupon")} onClick={scrollToTop}>
      <i className="fa fa-ticket me-2"></i> Coupon
    </Link>
    <Link href="/AdminBlog" className={getNavClass("/AdminBlog")} onClick={scrollToTop}>
      <i className="fa fa-pencil-square-o me-2"></i> Blog
    </Link>
    <Link href="/AdminCategory" className={getNavClass("/AdminCategory")} onClick={scrollToTop}>
      <i className="fa fa-th-large me-2"></i> Category
    </Link>
    <Link href="/AdminCustomer" className={getNavClass("/AdminCustomer")} onClick={scrollToTop}>
      <i className="fa fa-users me-2"></i> Customer
    </Link>
    <Link href="/AdminEnquirie" className={getNavClass("/AdminEnquirie")} onClick={scrollToTop}>
      <i className="fa fa-envelope me-2"></i> Enquiries
    </Link>
    <Link href="/AdminInventory" className={getNavClass("/AdminInventory")} onClick={scrollToTop}>
      <i className="fa fa-cubes me-2"></i> Inventory
    </Link>
    <Link href="/AdminOrder" className={getNavClass("/AdminOrder")} onClick={scrollToTop}>
      <i className="fa fa-shopping-cart me-2"></i> Order
    </Link>
    <Link href="/AdminPayment" className={getNavClass("/AdminPayment")} onClick={scrollToTop}>
      <i className="fa fa-credit-card me-2"></i> Payment
    </Link>
    <Link href="/AdminContactUs" className={getNavClass("/AdminContactUs")} onClick={scrollToTop}>
      <i className="fa fa-phone me-2"></i> Contact Us
    </Link>
    <Link href="/AdminPolicie" className={getNavClass("/AdminPolicie")} onClick={scrollToTop}>
      <i className="fa fa-file-text-o me-2"></i> Policies
    </Link>
    <Link href="/AdminSMS" className={getNavClass("/AdminSMS")} onClick={scrollToTop}>
      <i className="fa fa-cog me-2"></i> Admin SMS
    </Link>
           <Link href="/AdminChat" className={getNavClass("/AdminChat")} onClick={scrollToTop}>
      <i className="fa fa-cog me-2"></i> Admin Chat
    </Link>
         <Link href="/AdminSetting" className={getNavClass("/AdminSetting")} onClick={scrollToTop}>
      <i className="fa fa-cog me-2"></i> Setting
    </Link>



    {/*
    <Link href="/AdminSetting" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
      <i className="fa fa-cog me-2"></i> Setting
    </Link>
    <div className="dropdown-menu bg-transparent border-0 w-auto">
   
      <Link href="/AdminShipping" className={`dropdown-item ${pathname === "/AdminShipping" ? "active" : ""}`} onClick={scrollToTop}>
        <i className="fa fa-truck me-2"></i> Shipping
      </Link>
   <Link href="/AdminChat" className={`dropdown-item ${pathname === "/AdminChat" ? "active" : ""}`} onClick={scrollToTop}>
        <i className="fa fa-cog me-2"></i> Admin Chat
      </Link>
         <Link href="/AdminSetting" className={`dropdown-item ${pathname === "/AdminSetting" ? "active" : ""}`} onClick={scrollToTop}>
        <i className="fa fa-cog me-2"></i> Setting
      </Link>
    </div>
    */}
  </div>
</div>
        </nav>
      </div>
    </>
  );
};

export default PageSidebar;
