"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function PageFooter() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [isVisible, setIsVisible] = useState(false);

  // ✅ Show/hide back-to-top button when scrolling
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // ✅ Scroll back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
   <>
    <footer className="footer py-2 footer-static footer-light navbar-border navbar-shadow fixed-bottom" aria-label="Footer Section">
      <div className="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
        <span className="float-md-left float-start d-block d-md-inline-block px-5">
          {formattedDate} &copy; Copyright
          <Link className="text-bold-800 grey  text-dark darken-2 mx-3" href="/" aria-label="Theme Selection">
            Theme Selection
          </Link>
        </span>

        <ul className="list-inline float-md-right d-block d-md-inline-block m-auto">
          <li className="list-inline-item">
            <Link className="my-1 text-dark" href="/" aria-label="Read More">Read More</Link>
          </li>
          <li className="list-inline-item">
            <Link className="my-1  text-dark" href="/" aria-label="Support">Support</Link>
          </li>
          <li className="list-inline-item">
            <Link className="my-1  text-dark" href="/" aria-label="Anurag Singh">Anurag Singh</Link>
          </li>
        </ul>
      </div>

      {/* ✅ Back-to-top button */}
      <div className="back-top-container">
        {isVisible && (
          <div className="back-top-button" onClick={scrollToTop} style={{ position: "fixed", bottom: "70px", right: "20px", cursor: "pointer" }}>
            <svg className="progress-circle svg-content" width="50" height="50" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#ffd527" strokeWidth="5" fill="none" />
              <path d="M30,60 L50,40 L70,60" stroke="#ffd527" strokeWidth="5" fill="none" />
            </svg>
          </div>
        )}
      </div>
    </footer>
   </>
  );
}

export default PageFooter;
