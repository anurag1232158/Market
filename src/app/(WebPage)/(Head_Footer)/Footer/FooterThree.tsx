import Link from "next/link";
import React from "react";

const FooterThree = () => {
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-6 col-6 pt-0 pt-lg-5 pt-lg-0 mb-lg-5 pt-2 mb-3">
        <div className="section-title section-title-sm position-relative pb-3 mb-4">
          <h3 className="text-light mb-0">For Your Service</h3>
        </div>
        <div className="link-animated d-flex flex-column justify-content-start">
          <Link className="text-light mb-2 fw" href="/Privacy">
            <i className="fa fa-arrow-right color-orange mx-2"></i> Privacy
          </Link>
          <Link className="text-light mb-2 fw" href="/Investor">
            <i className="fa fa-arrow-right color-orange mx-2"></i> Investor
          </Link>
          <Link className="text-light mb-2 fw" href="/Products">
            <i className="fa fa-arrow-right color-orange mx-2"></i> Product
          </Link>
          <Link className="text-light mb-2 fw" href="/AllCategorys">
            <i className="fa fa-arrow-right color-orange mx-2"></i> Category
          </Link>
          <Link className="text-light mb-2 fw" href="/SocialMedia">
            <i className="fa fa-arrow-right color-orange mx-2"></i> Social Media
          </Link>
        </div>
      </div>
    </>
  );
};

export default FooterThree;
