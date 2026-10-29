// src/app/(WebPage)/(Page)/Home/OurStory/page.tsx
import Link from "next/link";
import React from "react";

const OurStory = () => {
  return (
    <div className="container-fluid py-3 pt-0 mt-0 w-95">
      {/* Section Title */}
      <div className="section-title text-left position-relative pb-3 mb-4 mx-auto">
       <Link href="/About" className="text-primary text-decoration-none float-end btn btn-outline-warning btn-sm border-1" >
          Read Full Story
        </Link>
        <h2 className="mb-0 py-0 my-0">Our Journey</h2>
        <p className="text-muted mb-0 mt-1">
          From Bihar's Ponds to Your Home
        </p>
      </div>

      <div className="row justify-content-center align-items-center g-5">
        {/* LEFT: Story Image */}
        <div className="col-lg-5">
          <div className="position-relative">
            <img
              src="/assets/images/makhana-story.jpg"
              alt="Our Makhana Story"
              className="img-fluid rounded-4 shadow-lg w-100"
              style={{ height: "450px", objectFit: "cover" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/images/paint30.jpg";
              }}/>

            {/* ⭐ Floating Badge */}
            <div
              className="position-absolute bg-warning text-dark rounded-3 shadow-lg p-3"
              style={{ bottom: "-20px", right: "-20px" }}
            >
              <h3 className="mb-0 fw-bold">25+</h3>
              <small>Years of Legacy</small>
            </div>
          </div>
        </div>

        {/* RIGHT: Story Content */}
        <div className="col-lg-7">
          <div className="ps-lg-4">
            <h6 className="text-primary text-uppercase mb-2">
              <i className="fa fa-solid fa-history me-1"></i>
              Since 1995
            </h6>
            <h4 className="fw-bold mb-4">A Family Tradition of Pure Makhana</h4>

            <p
              className="text-muted mb-4"
              style={{ lineHeight: 1.9, fontSize: "15px" }}
            >
              हमारी कहानी बिहार के दरभंगा से शुरू होती है — जहाँ की मखाना
              मिठास और गुणवत्ता पूरी दुनिया में मशहूर है। 1995 में हमारे
              दादा जी ने एक छोटे से तालाब से मखाना उगाना शुरू किया था।
              उस वक्त सिर्फ एक सपना था — <strong>शुद्धता और ईमानदारी</strong>{" "}
              के साथ हर भारतीय घर तक ताज़ा Makhana पहुँचाना।
            </p>

            <p
              className="text-muted mb-4"
              style={{ lineHeight: 1.9, fontSize: "15px" }}
            >
              आज, तीन पीढ़ियों बाद, हम गर्व से{" "}
              <strong>10,000+ परिवारों</strong> तक शुद्ध, ऑर्गेनिक मखाना
              पहुँचा रहे हैं। हम सीधे{" "}
              <strong>500+ किसान परिवारों</strong> से जुड़े हैं — बिना
              बिचौलियों के, बिना chemicals के। हर पैकेट में हमारी मेहनत
              और आपका विश्वास है।
            </p>

            {/* ⭐ Key Points */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="fa fa-solid fa-check-circle text-success fs-4 me-2 mt-1"></i>
                  <div>
                    <h6 className="fw-bold mb-1">Direct from Farmers</h6>
                    <small className="text-muted">बिना बिचौलियों के, सीधे किसानों से</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="fa fa-solid fa-check-circle text-success fs-4 me-2 mt-1"></i>
                  <div>
                    <h6 className="fw-bold mb-1">100% Organic</h6>
                    <small className="text-muted">कोई chemical, कोई preservative नहीं</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="fa fa-solid fa-check-circle text-success fs-4 me-2 mt-1"></i>
                  <div>
                    <h6 className="fw-bold mb-1">FSSAI Certified</h6>
                    <small className="text-muted">Government से मान्यता प्राप्त</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <i className="fa fa-solid fa-check-circle text-success fs-4 me-2 mt-1"></i>
                  <div>
                    <h6 className="fw-bold mb-1">Hand-Picked Quality</h6>
                    <small className="text-muted">हर मखाना हाथ से छाँटा जाता है</small>
                  </div>
                </div>
              </div>
            </div>

            {/* ⭐ CTA Buttons */}
            <div className="d-flex gap-3 flex-wrap">
              <Link href="/About" className="btn btn-primary py-2 px-4">
                <i className="fa fa-solid fa-arrow-right me-2"></i>
                Read Full Story
              </Link>
              <Link href="/Products" className="btn btn-outline-warning py-2 px-4">
                <i className="fa fa-solid fa-shopping-bag me-2"></i>
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ⭐ Stats Row (Bottom) */}
      <div className="row g-3 mt-5 pt-4 justify-content-center">
        <div className="col-lg-3 col-md-6">
          <div className="text-center p-4 rounded-4 shadow-sm bg-light hover-effect">
            <i className="fa fa-solid fa-history fa-3x text-primary mb-3"></i>
            <h4 className="fw-bold mb-1">25+</h4>
            <p className="text-muted mb-0">Years Experience</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="text-center p-4 rounded-4 shadow-sm bg-light hover-effect">
            <i className="fa fa-solid fa-users fa-3x text-success mb-3"></i>
            <h4 className="fw-bold mb-1">10,000+</h4>
            <p className="text-muted mb-0">Happy Families</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="text-center p-4 rounded-4 shadow-sm bg-light hover-effect">
            <i className="fa fa-solid fa-font-awesome fa-3x text-warning mb-3"></i>
            <h4 className="fw-bold mb-1">500+</h4>
            <p className="text-muted mb-0">Farmer Partners</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="text-center p-4 rounded-4 shadow-sm bg-light hover-effect">
            <i className="fa fa-solid fa-star fa-3x text-danger mb-3"></i>
            <h4 className="fw-bold mb-1">5.0 ★</h4>
            <p className="text-muted mb-0">Customer Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;