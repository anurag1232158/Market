// src/app/(WebPage)/(Page)/Home/OurStory/page.tsx
import Link from "next/link";
import React from "react";

const OurStory = () => {
  return (
    <div className="container-fluid py-2 pt-0 mt-0 w-95">

      {/* Section Title */}
      <div className="section-title text-left position-relative pb-2 mb-3 mx-auto">

        <Link href="/About" className="text-primary text-decoration-none float-end btn btn-outline-warning btn-sm border-1"> Read Full Story</Link>
          <h2 className="mb-0 py-0 my-0"> Our Journey</h2>
          <p className="text-muted mb-0 mt-1 small"> From Bihar's Ponds to Your Home</p>
      </div>

      {/* Main Story */}
      <div className="row justify-content-center align-items-center g-3">

        {/* LEFT: Story Image */}
        <div className="col-lg-5 col-md-5 col-12">
          <div className="position-relative pe-2 pb-2">
            <img src="/assets/images/makhana-story.jpg" alt="Our Makhana Story" className="img-fluid rounded-3 shadow w-100"
              style={{ height: "clamp(220px, 35vw, 450px)", objectFit: "cover",}}
               onError={(e) => { (e.target as HTMLImageElement).src = "/assets/images/paint30.jpg"; }} />

            {/* Floating Badge */}
            <div className="position-absolute bg-warning text-dark rounded-3 shadow p-2"
              style={{ bottom: "0px", right: "0px", }} >
              <h4 className="mb-0 fw-bold"> 25+ </h4>
              <small style={{ fontSize: "11px" }}>
                Years of Legacy
              </small>
            </div>

          </div>
        </div>

        {/* RIGHT: Story Content */}
        <div className="col-lg-7 col-md-7 col-12">
          <div className="ps-lg-3">
            <h6 className="text-primary text-uppercase mb-2">  
              <i className="fa fa-history me-1"></i>  Since 1995</h6>
            <h4 className="fw-bold mb-2">  A Family Tradition of Pure Makhana</h4>
             <p  className="text-muted mb-2"  style={{ lineHeight: 1.7, fontSize: "14px" }}>
              {/* Mobile */}
              <span className="d-md-none py-2">
                हमारी कहानी बिहार के दरभंगा से शुरू होती है। 1995 में हमारे
                दादा जी ने मखाना उगाना शुरू किया। हमारा सपना है हर घर तक
                शुद्ध मखाना पहुँचाना।
              </span>

              {/* Tablet & Desktop */}
              <span className="d-none d-md-inline">
                हमारी कहानी बिहार के दरभंगा से शुरू होती है — जहाँ की मखाना
                मिठास और गुणवत्ता पूरी दुनिया में मशहूर है। 1995 में हमारे
                दादा जी ने एक छोटे से तालाब से मखाना उगाना शुरू किया था।
                उस वक्त सिर्फ एक सपना था —{" "}
                <strong>शुद्धता और ईमानदारी</strong> के साथ हर भारतीय घर
                तक ताज़ा Makhana पहुँचाना।
              </span>
            </p>

            {/* Second Paragraph */}
            <p className="text-muted mb-3" style={{ lineHeight: 1.7, fontSize: "14px" }} >
              {/* Mobile */}
              <span className="d-md-none">
                आज हम 10,000+ परिवारों तक मखाना पहुँचा रहे हैं और 500+
                किसान परिवारों से सीधे जुड़े हैं। हर पैकेट में हमारी मेहनत
                और आपका विश्वास है।
              </span>

              {/* Tablet & Desktop */}
              <span className="d-none d-md-inline">
                आज, तीन पीढ़ियों बाद, हम गर्व से{" "}
                <strong>10,000+ परिवारों</strong> तक शुद्ध, ऑर्गेनिक मखाना
                पहुँचा रहे हैं। हम सीधे{" "}
                <strong>500+ किसान परिवारों</strong> से जुड़े हैं — बिना
                बिचौलियों के, बिना chemicals के। हर पैकेट में हमारी मेहनत
                और आपका विश्वास है।
              </span>
            </p>

            {/* Key Points */}
            <div className="row g-2 mb-3">

              <div className="col-md-6 col-6">
                <div className="d-flex align-items-start">
                  <i className="fa fa-check-circle text-success me-2 mt-1"></i>
                  <div>
                    <h6 className="fw-bold mb-1 small"> Direct from Farmers </h6> 
                    <small className="text-muted"> बिना बिचौलियों के, सीधे किसानों से </small>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-6">
                <div className="d-flex align-items-start">
                  <i className="fa fa-check-circle text-success me-2 mt-1"></i>
                  <div>
                    <h6 className="fw-bold mb-1 small">  100% Organic</h6>
                    <small className="text-muted">  कोई chemical, कोई preservative नहीं</small>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-6">
                <div className="d-flex align-items-start">
                  <i className="fa fa-check-circle text-success me-2 mt-1"></i>
                  <div>
                    <h6 className="fw-bold mb-1 small">  FSSAI Certified</h6>
                    <small className="text-muted">  Government से मान्यता प्राप्त</small>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-6">
                <div className="d-flex align-items-start">
                  <i className="fa fa-check-circle text-success me-2 mt-1"></i>
                  <div>
                    <h6 className="fw-bold mb-1 small">
                      Hand-Picked Quality
                    </h6>
                    <small className="text-muted">
                      हर मखाना हाथ से छाँटा जाता है
                    </small>
                  </div>
                </div>
              </div>

            </div>

            {/* CTA Buttons */}
            <div className="d-flex gap-2 flex-wrap">
              <Link href="/About" className="btn btn-primary btn-sm py-2 px-3" >
                <i className="fa fa-arrow-right me-1"></i>Read Full Story </Link>
               <Link href="/Products" className="btn btn-outline-warning btn-sm py-2 px-3" >   
               <i className="fa fa-shopping-bag me-1"></i> Shop Now </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="row g-2 mt-3 pt-2 justify-content-center">

        {/* Experience */}
        <div className="col-lg-3 col-md-6 col-6">
          <div className="text-center p-2 p-md-3 rounded-3 shadow-sm bg-light hover-effect h-100">
            <i className="fa fa-history fa-2x text-primary mb-2"></i>
            <h5 className="fw-bold mb-1">25+</h5>
            <small className="text-muted"> Years Experience
            </small>
          </div>
        </div>

        {/* Families */}
        <div className="col-lg-3 col-md-6 col-6">
          <div className="text-center p-2 p-md-3 rounded-3 shadow-sm bg-light hover-effect h-100">
            <i className="fa fa-users fa-2x text-success mb-2"></i>
            <h5 className="fw-bold mb-1">10,000+</h5>
            <small className="text-muted">
              Happy Families
            </small>
          </div>
        </div>

        {/* Farmers */}
        <div className="col-lg-3 col-md-6 col-6">
          <div className="text-center p-2 p-md-3 rounded-3 shadow-sm bg-light hover-effect h-100">
            <i className="fa fa-users fa-2x text-warning mb-2"></i>
            <h5 className="fw-bold mb-1">500+</h5>
            <small className="text-muted">
              Farmer Partners
            </small>
          </div>
        </div>

        {/* Rating */}
        <div className="col-lg-3 col-md-6 col-6">
          <div className="text-center p-2 p-md-3 rounded-3 shadow-sm bg-light hover-effect h-100">
            <i className="fa fa-star fa-2x text-danger mb-2"></i>
            <h5 className="fw-bold mb-1">5.0 ★</h5>
            <small className="text-muted">
              Customer Rating
            </small>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OurStory;
