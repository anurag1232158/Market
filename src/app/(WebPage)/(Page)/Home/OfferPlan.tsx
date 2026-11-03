
// src/app/(WebPage)/(Page)/Home/OfferPlan/page.tsx
import Link from "next/link";
import React from "react";

const OfferPlan = () => {
  return (
    <div className="container-fluid pb-4 w-95">

      {/* Section Title */}
      <div className="section-title text-left position-relative pb-2 mb-3 mx-auto">
        <h6 className="fw-bold text-primary text-uppercase mb-1">
          <i className="fa fa-gift me-1"></i>
          Subscription Plans
        </h6>

        <h3 className="mb-1">
          Makhana Subscription Plans
        </h3>

        <p className="text-muted mb-0 small">
          हर महीने ताज़ा Makhana आपके घर — special discount के साथ!
        </p>
      </div>

      <div className="row g-3">

        {/* Starter Pack */}
        <div className="col-lg-4 col-md-6">
          <div className="bg-light rounded shadow hover-effect h-100 p-1 p-lg-3">

            <div className="border-bottom py-3 px-3 mb-3">
              <h5 className="text-primary mb-1">
                <i className="fa fa-leaf me-1"></i>
                Starter Pack
              </h5>
              <small className="text-uppercase text-dark">
                2 Products / Month
              </small>
            </div>

            <div className="px-3 pb-3 text-dark">

              <h3 className="mb-3 text-dark">
                <small className="fs-6">₹</small>
                499.00
                <small className="text-muted ms-1" style={{ fontSize: "13px" }}>
                  /Month
                </small>
              </h3>

              {[
                "2 x 250g Makhana",
                "Free Shipping",
                "Basic Support",
                "Priority Support",
              ].map((item, index) => (
                <div
                  key={item}
                  className="d-flex justify-content-between align-items-center mb-2 small"
                >
                  <span>{item}</span>
                  <i
                    className={`fa ${
                      index < 2
                        ? "fa-check text-primary"
                        : "fa-times text-danger"
                    }`}
                  ></i>
                </div>
              ))}

              <Link
                href="/Contact"
                className="btn btn-primary btn-sm px-3 py-2 mt-2"
              >
                <i className="fa fa-shopping-bag me-1"></i>
                Subscribe
              </Link>

            </div>
          </div>
        </div>

        {/* Family Pack */}
        <div className="col-lg-4 col-md-6">
          <div className="bg-white rounded shadow position-relative p-1 p-lg-3 hover-effect h-100">

            <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
              ⭐ Popular
            </span>

            <div className="border-bottom py-3 px-3 mb-3">
              <h5 className="text-primary mb-1">
                <i className="fa fa-crown me-1"></i>
                Family Pack
              </h5>
              <small className="text-uppercase text-dark">
                4 Products / Month
              </small>
            </div>

            <div className="px-3 pb-3 text-dark">

              <h3 className="mb-3 text-dark">
                <small className="fs-6">₹</small>
                999.00
                <small className="text-muted ms-1" style={{ fontSize: "13px" }}>
                  /Month
                </small>
              </h3>

              {[
                "4 x 250g Makhana",
                "Free Shipping",
                "Priority Support",
                "Mix & Match Flavours",
              ].map((item) => (
                <div
                  key={item}
                  className="d-flex justify-content-between align-items-center mb-2 small"
                >
                  <span>{item}</span>
                  <i className="fa fa-check text-primary"></i>
                </div>
              ))}

              <Link
                href="/Contact"
                className="btn btn-primary btn-sm px-3 py-2 mt-2"
              >
                <i className="fa fa-shopping-bag me-1"></i>
                Subscribe
              </Link>

            </div>
          </div>
        </div>

        {/* Premium Pack */}
        <div className="col-lg-4 col-md-6">
          <div className="bg-light rounded shadow hover-effect p-1 p-lg-3 h-100">

            <div className="border-bottom py-3 px-3 mb-3">
              <h5 className="text-primary mb-1">
                <i className="fa fa-gem me-1"></i>
                Premium Pack
              </h5>
              <small className="text-uppercase text-dark">
                Unlimited / Bulk
              </small>
            </div>

            <div className="px-3 pb-3 text-dark">

              <h3 className="mb-3 text-dark">
                <small className="fs-6">₹</small>
                1,999.00
                <small className="text-muted ms-1" style={{ fontSize: "13px" }}>
                  /Month
                </small>
              </h3>

              {[
                "10 x 500g Makhana",
                "Free Express Shipping",
                "24/7 Priority Support",
                "Custom Packaging",
              ].map((item) => (
                <div
                  key={item}
                  className="d-flex justify-content-between align-items-center mb-2 small"
                >
                  <span>{item}</span>
                  <i className="fa fa-check text-primary"></i>
                </div>
              ))}

              <Link
                href="/Contact"
                className="btn btn-primary btn-sm px-3 py-2 mt-2"
              >
                <i className="fa fa-shopping-bag me-1"></i>
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
