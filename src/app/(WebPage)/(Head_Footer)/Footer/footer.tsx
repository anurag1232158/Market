import React from "react";
import FooterTwo from "./FooterTwo";
import FooterOne from "./FooterOne";
import FooterThree from "./FooterThree";
import FooterFour from "./FooterFour";
import FooterEnd from "./FooterEnd";

const PageFooter = () => {
  return (
    <>
      <div
        className="container-fluid bg-dark text-light mt-2 wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <div className="container-fluid w-90">
          <div className="row gx-5 pb-4 pb-sm-0">
            {/* FOOTER LEFT SECTION */}
            <FooterOne />

            {/* FOOTER RIGHT SECTION */}
            <div className="col-lg-8 col-md-12 col-sm-12 col-12 justify-content-end mt-4 mt-lg-0">
              <div className="row gx-5">
                <FooterTwo />
                <FooterThree />
                <FooterFour />
                <div className="d-lg-none col-lg-4 col-md-6 col-sm-6 col-6">
                  <FooterEnd />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FooterEnd only for DESKTOP/TABLET */}
      <div className="d-lg-block container-fluid text-black footer-bg p-2 d-none d-sm-block">
        <div className="container-fluid w-90">
          <div className="row justify-content-end">
            <div className="d-none d-sm-block">
              <FooterEnd />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageFooter;
