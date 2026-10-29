"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ReportFooter() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="footer py-2 footer-static footer-light navbar-border navbar-shadow fixed-bottom"
      aria-label="Report Footer"
    >
      <div className="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
        <span className="float-md-left float-start d-block d-md-inline-block px-5">
          {formattedDate} &copy; Copyright
          <Link
            className="text-bold-800 grey text-dark darken-2 mx-3"
            href="/ReportHome"
          >
            Report Panel
          </Link>
        </span>

        <ul className="list-inline float-md-right d-block d-md-inline-block m-auto">
          <li className="list-inline-item">
            <Link className="my-1 text-dark" href="/ReportHome">
              Home
            </Link>
          </li>
          <li className="list-inline-item">
            <Link className="my-1 text-dark" href="/ReportProfile">
              Profile
            </Link>
          </li>
          <li className="list-inline-item">
            <Link className="my-1 text-dark" href="/ReportDashboard">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>

      {isVisible && (
        <div
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "70px",
            right: "20px",
            cursor: "pointer",
          }}
        >
          <svg width="50" height="50" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#ffd527"
              strokeWidth="5"
              fill="none"
            />
            <path
              d="M30,60 L50,40 L70,60"
              stroke="#ffd527"
              strokeWidth="5"
              fill="none"
            />
          </svg>
        </div>
      )}
    </footer>
  );
}