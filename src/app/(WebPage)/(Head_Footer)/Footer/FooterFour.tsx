import Link from "next/link";
import React from "react";

const FooterFour = () => {
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-6 col-6 pt-lg-5 pt-lg-0 mb-lg-5 pt-2 mb-2">
        <div className="section-title section-title-sm position-relative pb-3 mb-4">
          <h3 className="text-light mb-0">Company</h3>
        </div>
        <div className="link-animated d-flex flex-column justify-content-start">
          <Link className="text-light mb-2 fw" href="/About">
            <i className="fa fa-arrow-right color-orange mx-2"></i> About us
          </Link>

          <Link className="text-light mb-2 fw" href="/HelpUs">
            <i className="fa fa-arrow-right color-orange mx-2"></i> Help Us
          </Link>
          <Link className="text-light mb-2 fw" href="/Support">
            <i className="fa fa-arrow-right color-orange mx-2"></i> Support
          </Link>

          <Link className="text-light fw mb-2" href="/Feedback">
            <i className="fa fa-arrow-right color-orange mx-2"></i> Feedback
          </Link>
          <Link className="text-light mb-2 fw" href="/Terms">
            <i className="fa fa-arrow-right color-orange mx-2"></i> Terms &
            Conditions
          </Link>
        </div>
      </div>
    </>
  );
};

export default FooterFour;
