// src/app/(WebPage)/(Page)/Home/About/page.tsx
"use client";

import { useEffect, useState } from "react";

const About = () => {
  const [story, setStory] = useState<any>(null);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : data?.about || [];

        const storySection = list.find(
          (a: any) =>
            a.section === "Story" && a.status === "Active"
        );

        setStory(storySection || null);
      })
      .catch((err) =>
        console.error("Error fetching about data:", err)
      );
  }, []);


  const fallback = {
    title: "Our Story",
    subtitle: "From Bihar's Ponds to Your Home",
    content:
      "हमारी कहानी बिहार के दरभंगा से शुरू होती है, जहाँ की मखाना मिठास और गुणवत्ता पूरी दुनिया में मशहूर है। 1995 में हमारे दादा जी ने छोटे से तालाब से मखाना उगाना शुरू किया था। आज हम तीन पीढ़ियों से इस परंपरा को निभा रहे हैं और 10,000+ परिवारों को शुद्ध, ऑर्गेनिक मखाना पहुँचा रहे हैं।",
    image: "",
  };

  const data = story || fallback;

  return (
    <div className="container-fluid py-4 mt-3 wow fadeInUp w-95">
      <div className="section-title text-left position-relative pb-2 mb-3 mx-auto">
        <h2 className="mb-0 py-0 my-0">  
         <i className="fa fa-crown text-warning"></i>
         {data.title || "Our Story"}</h2>
         <p className="text-muted mb-0 mt-1 small">  {data.subtitle || "Our Subtitle"}</p>
      </div>

      {/* Main Content */}
      <div className="row g-3">
        <div className="col-lg-7 col-md-7 col-12 wow slideInUp" data-wow-delay="0.3s">
          <div className="rounded-3 h-100">
            <h5 className="fw-bold mb-2">
              {data.subtitle || "From Bihar's Ponds to Your Home"}
            </h5>
            <p className="text-muted small mb-3"
              style={{
                whiteSpace: "pre-line",
                lineHeight: 1.7,
              }}>
              {data.content}
            </p>

            {/* Story Image */}
            <img src={ data.image
                  ? `/assets/images/${data.image}`
                  : "/assets/images/makhana-about.jpg"
              }
              className="w-100 img-fluid rounded-3 shadow-sm"
              alt="Makhana Story"
              style={{
                height: "clamp(200px, 35vw, 350px)",
                objectFit: "cover",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/images/paint30.jpg";
              }}
            />

          </div>
        </div>

        {/* RIGHT: About Cards */}
        <div className="col-lg-5 col-md-5 col-12">
          <div className="row g-2">
            <div className="col-12 wow slideInUp" data-wow-delay="0.2s">
              <div className="p-3 p-lg-4 shadow-sm rounded-3 bg-light hover-effect h-100">
                <div className="d-flex align-items-center mb-1">
                  <i className="fa fa-history fs-4 text-primary me-2"></i>
                  <h6 className="fw-bold text-dark mb-0">
                    25+ Years of Legacy
                  </h6>
                </div>
                <p className="text-muted small mb-0">
                  1995 से तीन पीढ़ियों की मेहनत।
                </p>
              </div>
            </div>

            <div className="col-12 wow slideInUp" data-wow-delay="0.3s" >
              <div className="p-3 p-lg-4 shadow-sm rounded-3 bg-light hover-effect h-100">
                <div className="d-flex align-items-center mb-1">
                  <i className="fa fa-users fs-4 text-primary me-2"></i>
                  <h6 className="fw-bold text-dark mb-0">
                    10,000+ Happy Families
                  </h6>
                </div>
                <p className="text-muted small mb-0">
                  पूरे भारत में शुद्ध Makhana।
                </p>
              </div>
            </div>

            <div className="col-12 wow slideInUp" data-wow-delay="0.4s">
              <div className="p-3 p-lg-4 shadow-sm rounded-3 bg-light hover-effect h-100">
                <div className="d-flex align-items-center mb-1">
                  <i className="fa fa-leaf fs-4 text-success me-2"></i>
                  <h6 className="fw-bold text-dark mb-0">
                    500+ Farmer Partners
                  </h6>
                </div>
                <p className="text-muted small mb-0">
                  सीधे किसानों से खरीद।
                </p>
              </div>
            </div>

            <div className="col-12 wow slideInUp" data-wow-delay="0.6s">
              <div className="p-3 p-lg-4 shadow-sm rounded-3 bg-light hover-effect h-100">
                <div className="d-flex align-items-center mb-1">
                  <i className="fa fa-heart fs-4 text-danger me-2"></i>
                  <h6 className="fw-bold text-dark mb-0">
                    Our Promise
                  </h6>
                </div>
                <p className="text-muted small mb-0">
                  100% शुद्धता और ईमानदारी।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;