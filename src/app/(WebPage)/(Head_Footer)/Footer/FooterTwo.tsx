import Link from "next/link";
import React from "react";

const FooterTop = () => {
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-6 col-6 pt-lg-5 mb-lg-5 pt-2">
        <div className="section-title section-title-sm position-relative pb-3 mb-4">
          <h3 className="text-light mb-0">Get In Touch</h3>
        </div>
        <div className="d-flex mb-2">
          <i className="fa fa-map-marker-alt mt-2 color-orange"></i>
          <p className="mb-0 ms-1 fw-1">123 Varanasi, Uttar Pradesh, India</p>
        </div>
        <div className="d-flex mb-2">
          <i className="fa fa-envelope mt-2 color-orange"></i>
          <p className="mb-0 ms-1 fw">varanasi1456@gmail.com</p>
        </div>
        <div className="d-flex mb-2">
          <i className="fa fa-phone-alt mt-2 color-orange"></i>
          <p className="mb-0 ms-1 fw">+91 9935846751</p>
          <br />
        </div>
        <div className="d-flex py-4">
          <Link className="btn btn-primary btn-square me-2" href="#">
            <i className="fa fa-twitter"></i>
          </Link>
          <Link className="btn btn-primary btn-square me-2" href="#">
            <i className="fa fa-facebook"></i>
          </Link>
          <Link className="btn btn-primary btn-square me-2" href="#">
            <i className="fa fa-linkedin"></i>
          </Link>
          <Link className="btn btn-primary btn-square" href="#">
            <i className="fa fa-instagram"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FooterTop;
