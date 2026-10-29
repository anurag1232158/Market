import Link from "next/link";
import React from "react";

const FooterEnd = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="mb-0">
            <div className="section-title section-title-sm position-relative pb-2 pt-1 mb-4 d-lg-none d-md-none">
              <h3 className="text-dark mb-0">Company Info</h3>
            </div>
            <div className="align-items-center d-lg-flex">
              <Link className="text-dark border-bottom" href="/">
                <span>©</span> Copyright Varanasi
              </Link>
              <div className="ms-2">All Rights Reserved</div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="d-flex align-items-center justify-content-end d-sm-justify-content-start">
            <p className="mb-0">
              Designed & Developed By:
              <Link className="text-dark border-bottom ms-2" href="#">
                Vns Tourism, Faculty
              </Link>
            </p>
            <Link
              href="/"
              className="btn btn-md btn-primary btn-lg-square rounded back-to-top justify-content-end ms-2"
            >
              <i className="fa fa-arrow-up"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterEnd;
