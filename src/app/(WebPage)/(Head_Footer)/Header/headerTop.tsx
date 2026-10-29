// src/app/(WebPage)/(Head_Footer)/Header/HeaderTop.tsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "../../../ThemeProvider/ThemeProvider";
import GoogleTranslate from "../../Dynamic/GoogleTranslate/GoogleTranslate";
import { getAuthUser, logout, LOGIN_PATHS } from "../../../../../lib/authUser";
import type { Role } from "../../../../../lib/session";

const HeaderTop = () => {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [settings, setSettings] = useState<any>({});

  const ctx: Role = pathname.startsWith("/Admin")
    ? "admin"
    : pathname.startsWith("/Report")
    ? "report"
    : "user";

  useEffect(() => {
    fetch("/api/setting")
      .then((r) => r.json())
      .then((res) => setSettings(res?.setting || res || {}))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!getAuthUser(ctx));
    checkAuth();
    window.addEventListener("pageshow", checkAuth);
    window.addEventListener("authUserUpdated", checkAuth);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("pageshow", checkAuth);
      window.removeEventListener("authUserUpdated", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, [ctx]);

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    logout(ctx);
  };

  const logoutBtn = (
    <button onClick={handleLogout}
      className="dropdown-item text-start bg-transparent border-0 w-100 px-3 me-2">
     <i className="fa fa-sign-out me-2 text-danger"></i>
      Logout
    </button>
  );

  return (
    <header>
      <div className="top-bg d-lg-block-1">
        <div className="container-fluid py-2 d-lg-block px-lg-5">
          <div className="row gx-0">
            
            {/* LEFT: Contact Info */}
            <div className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0 d-none d-sm-inline">
              <div className="d-inline-flex flex-wrap">
                {settings.address && (
                  <small className="me-3 fw">
                    <Link target="_blank" href={settings.googleMapsLink || "#"} className="mobils text-gold">
                      <i className="fa fa-map-marker-alt me-1"></i>{settings.address}
                    </Link>
                  </small>
                )}
                {settings.contactPhone && (
                  <small className="me-3 fw">
                    <Link target="_blank" href={`https://wa.me/${settings.contactPhone.replace(/\D/g, "")}`} className="mobils text-gold">
                      <i className="fa fa-phone me-1"></i>+{settings.contactPhone}
                    </Link>
                  </small>
                )}
                {settings.contactEmail && (
                  <small className="fw">
                    <Link target="_blank" href={`mailto:${settings.contactEmail}`} className="text-gold">
                      <i className="fa fa-envelope me-1"></i>{settings.contactEmail}
                    </Link>
                  </small>
                )}
              </div>
            </div>

            {/* RIGHT: Auth & Settings */}
            <div className="col-lg-4 text-center text-lg-end">
              <div className="d-inline-flex">
                
                {/* GUEST: Login */}
                {!isLoggedIn && (
                  <div className="nav-item">
                    <Link href={LOGIN_PATHS[ctx] ?? "/Login"} className="nav-link text-gold p-2">
                      <i className="fa fa-user me-1"></i>Login
                    </Link>
                  </div>
                )}

                {/* LOGGED IN: My Account (Pure Bootstrap Dropdown) */}
                {isLoggedIn && (
                  <div className="nav-item dropdown">
                    {/* ✅ Bootstrap के लिए button ज़रूरी है, Link नहीं */}
                    <button className="nav-link dropdown-toggle text-gold p-2 bg-transparent border-0" type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <i className="fa fa-user-circle me-1"></i>Account
                    </button>
                    
                    <ul className="dropdown-menu m-0">
                      {ctx === "user" && (
                        <>
        <li>
  <Link href="/Profile" className="dropdown-item">
    <i className="fa fa-user me-2 text-primary"></i>My Profile
  </Link>
</li>
<li>
  <Link href="/Cart" className="dropdown-item">
    <i className="fa fa-shopping-cart me-2 text-success"></i>Cart
  </Link>
</li>
<li>
  <Link href="/Checkout" className="dropdown-item">
    <i className="fa fa-credit-card me-2 text-info"></i>Checkout
  </Link>
</li>
<li>
  <Link href="/OrderSummary" className="dropdown-item">
    <i className="fa fa-list me-2 text-warning"></i>My Orders
  </Link>
</li>
<li>
  <Link href="/OrderTrack" className="dropdown-item">
    <i className="fa fa-truck me-2 text-blue"></i>Order Track
  </Link>
</li>
                          <li><hr className="dropdown-divider p-0 m-0" /></li>
                          <li>{logoutBtn}</li>
                        </>
                      )}

                      {ctx === "admin" && (
                        <>
                          <li><Link href="/AdminDashboard" className="dropdown-item"><i className="fa fa-tachometer-alt me-2 text-primary"></i>Admin Dashboard</Link></li>
                          <li><Link href="/AdminHome" className="dropdown-item"><i className="fa fa-home me-2 text-success"></i>Admin Home</Link></li>
                          <li><hr className="dropdown-divider p-0 m-0" /></li>
                          <li>{logoutBtn}</li>
                        </>
                      )}

                      {ctx === "report" && (
                        <>
                          <li><Link href="/ReportDashboard" className="dropdown-item"><i className="fa fa-chart-bar me-2 text-primary"></i>Report Dashboard</Link></li>
                          <li><Link href="/ReportHome" className="dropdown-item"><i className="fa fa-home me-2 text-success"></i>Report Home</Link></li>
                          <li><hr className="dropdown-divider p-0 m-0" /></li>
                          <li>{logoutBtn}</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}

                {/* Language */}
                <div className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle text-gold p-2 bg-transparent border-0" type="button" data-bs-toggle="dropdown">
                    <i className="fa fa-globe me-1"></i>Language
                  </button>
                  <ul className="dropdown-menu m-0" translate="no">
                    <li><GoogleTranslate /></li>
                  </ul>
                </div>

                {/* Theme */}
                <div className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle text-gold p-2 bg-transparent border-0" type="button" data-bs-toggle="dropdown">
                    <i className="fa fa-palette me-1"></i>Theme
                  </button>
                  <ul className="dropdown-menu m-0">
                    <li>
                      <button className="dropdown-item" onClick={() => setTheme("light")}>
                        <i className="fa fa-sun me-2 text-warning"></i>Light
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => setTheme("dark")}>
                        <i className="fa fa-moon me-2 text-primary"></i>Dark
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => setTheme("auto")}>
                        <i className="fa fa-adjust me-2 text-info"></i>Auto
                      </button>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTop;