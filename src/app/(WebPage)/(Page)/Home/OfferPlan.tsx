// src/app/(WebPage)/(Page)/Home/OfferPlan/page.tsx
import Link from "next/link";
import React from "react";

const OfferPlan = () => {
  return (
    <div className="container-fluid pb-5 w-95">
      {/* Section Title */}
      <div className="section-title text-left position-relative pb-3 mb-4 mx-auto">
        <h6 className="fw-bold text-primary text-uppercase">
          <i className="fa fa-solid fa-gift me-1"></i>
          Subscription Plans
        </h6>
        <h2 className="mb-0 py-0 my-0">Makhana Subscription Plans</h2>
        <p className="text-muted mb-0 mt-1">
          हर महीने ताज़ा Makhana आपके घर — special discount के साथ!
        </p>
      </div>

      <div className="row g-4">
        {/* ==================== Silver Plan ==================== */}
        <div className="col-lg-4">
          <div className="bg-light rounded shadow hover-effect h-100">
            <div className="border-bottom py-4 px-5 mb-4">
              <h5 className="text-primary mb-1">
                <i className="fa fa-solid fa-leaf me-1"></i>
                Starter Pack
              </h5>
              <small className="text-uppercase text-dark">
                2 Products / Month
              </small>
            </div>
            <div className="p-5 pt-0 text-dark">
              <h3 className="display-5 mb-3 text-dark">
                <small className="align-top" style={{ fontSize: "22px", lineHeight: "45px" }}>
                  &#8377;
                </small>
                499.00
                <small className="align-bottom" style={{ fontSize: "16px", lineHeight: "40px" }}>
                  /Month
                </small>
              </h3>

              <div className="d-flex justify-content-between mb-3">
                <span>2 x 250g Makhana</span>
                <i className="fa fa-solid fa-check text-primary pt-1"></i>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Free Shipping</span>
                <i className="fa fa-solid fa-check text-primary pt-1"></i>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Basic Support</span>
                <i className="fa fa-solid fa-times text-danger pt-1"></i>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Priority Support</span>
                <i className="fa fa-solid fa-times text-danger pt-1"></i>
              </div>

              <Link href="/Contact" className="btn btn-primary py-2 px-4 mt-4">
                <i className="fa fa-solid fa-shopping-bag me-1"></i>
                Subscribe
              </Link>
            </div>
          </div>
        </div>

        {/* ==================== Gold Plan ==================== */}
        <div className="col-lg-4">
          <div
            className="bg-white rounded shadow position-relative hover-effect h-100"
            style={{ zIndex: "1" }}
          >
            {/* ⭐ Popular Badge */}
            <span className="badge bg-warning text-dark position-absolute top-0 start-50 translate-middle px-3 py-2 fw-bold">
              ⭐ Most Popular
            </span>

            <div className="border-bottom py-4 px-5 mb-4">
              <h5 className="text-primary mb-1">
                <i className="fas fa-solid fa-crown me-1"></i>
                Family Pack
              </h5>
              <small className="text-uppercase text-dark">
                4 Products / Month
              </small>
            </div>
            <div className="p-5 pt-0 text-dark">
              <h3 className="display-5 mb-3 text-dark">
                <small className="align-top" style={{ fontSize: "22px", lineHeight: "45px" }}>
                  &#8377;
                </small>
                999.00
                <small className="align-bottom" style={{ fontSize: "16px", lineHeight: "40px" }}>
                  /Month
                </small>
              </h3>

              <div className="d-flex justify-content-between mb-3">
                <span>4 x 250g Makhana</span>
                <i className="fa fa-solid fa-check text-primary pt-1"></i>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Free Shipping</span>
                <i className="fa fa-solid fa-check text-primary pt-1"></i>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Priority Support</span>
                <i className="fa fa-solid fa-check text-primary pt-1"></i>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Mix & Match Flavours</span>
                <i className="fa fa-solid fa-check text-primary pt-1"></i>
              </div>

              <Link href="/Contact" className="btn btn-primary py-2 px-4 mt-4">
                <i className="fa fa-solid fa-shopping-bag me-1"></i>
                Subscribe
              </Link>
            </div>
          </div>
        </div>

        {/* ==================== Platinum Plan ==================== */}
        <div className="col-lg-4">
          <div className="bg-light rounded shadow-lg hover-effect h-100">
            <div className="border-bottom py-4 px-5 mb-4">
              <h5 className="text-primary mb-1">
                <i className="fas fa-solid fa-gem me-1"></i>
                Premium Pack
              </h5>
              <small className="text-uppercase text-dark">
                Unlimited / Bulk
              </small>
            </div>
            <div className="p-5 pt-0 text-dark">
              <h3 className="display-5 mb-3 text-dark">
                <small className="align-top" style={{ fontSize: "22px", lineHeight: "45px" }}>
                  &#8377;
                </small>
                1,999.00
                <small className="align-bottom" style={{ fontSize: "16px", lineHeight: "40px" }}>
                  /Month
                </small>
              </h3>

              <div className="d-flex justify-content-between mb-3">
                <span>10 x 500g Makhana</span>
                <i className="fa fa-solid fa-check text-primary pt-1"></i>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Free Express Shipping</span>
                <i className="fa fa-solid fa-check text-primary pt-1"></i>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>24/7 Priority Support</span>
                <i className="fa fa-solid fa-check text-primary pt-1"></i>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Custom Packaging</span>
                <i className="fa fa-solid fa-check text-primary pt-1"></i>
              </div>

              <Link href="/Contact" className="btn btn-primary py-2 px-4 mt-4">
                <i className="fa fa-solid fa-shopping-bag me-1"></i>
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPlan;