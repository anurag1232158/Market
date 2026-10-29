// src/app/(WebPage)/(Page)/Home/About/page.tsx
"use client";
import { useEffect, useState } from "react";

const About = () => {
  const [story, setStory] = useState<any>(null);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.about || [];
        const storySection = list.find(
          (a: any) => a.section === "Story" && a.status === "Active"
        );
        setStory(storySection || null);
      })
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  /* Fallback (अगर data नहीं है) */
  const fallback = {
    title: "Our Story",
    subtitle: "From Bihar's Ponds to Your Home",
    content: "हमारी कहानी बिहार के दरभंगा से शुरू होती है, जहाँ की मखाना मिठास और गुणवत्ता पूरी दुनिया में मशहूर है। 1995 में हमारे दादा जी ने छोटे से तालाब से मखाना उगाना शुरू किया था। आज हम तीन पीढ़ियों से इस परंपरा को निभा रहे हैं और 10,000+ परिवारों को शुद्ध, ऑर्गेनिक मखाना पहुँचा रहे हैं।",
    image: "",
  };

  const data = story || fallback;

  return (
    <div className="container-fluid py-5 wow fadeInUp w-95">
    <div className="">
      <div className="section-title text-left position-relative pb-3 mb-4 mx-auto">
        <h2 className="mb-0 py-0 my-0">
          <i className="fa-solid fa-crown text-warning"></i>
          {data.title || "Our Story"}
        </h2>
        <p className="text-muted mb-0 mt-1">
         {data.subtitle || "Our Subtitle"}
        </p>
      </div>
       </div>

        <div className="row">
          {/* LEFT: Story */}
          <div className="col-lg-7 wow slideInUp" data-wow-delay="0.3s">
            <div className=" rounded-4 h-100">
              <h4 className="fw-bold">{data.subtitle}</h4>
              <p className="text-muted small" style={{ whiteSpace: "pre-line" }}>
                {data.content}
              </p>
              <img src={data.image ? `/assets/images/${data.image}` : "/assets/images/makhana-about.jpg"}
                className="w-100 img-fluid h-90 rounded-4"
                alt="Makhana"
                onError={(e) => { (e.target as HTMLImageElement).src = "/assets/images/paint30.jpg"; }}
              />
            </div>
          </div>

          {/* RIGHT: 4 Cards (Static) */}
          <div className="col-lg-5">
            <div className="col-12 wow slideInUp" data-wow-delay="0.2s">
              <div className="p-4 shadow rounded-4 h-100 bg-light hover-effect">
                <i className="fa fa-history fs-2 text-primary mb-3"></i>
                <h6 className="fw-bold text-dark">25+ Years of Legacy</h6>
                <p className="text-muted small">1995 से तीन पीढ़ियों की मेहनत।</p>
              </div>
            </div>
            <div className="col-12 py-3 wow slideInUp" data-wow-delay="0.3s">
              <div className="p-4 shadow rounded-4 h-100 bg-light hover-effect">
                <i className="fa fa-users fs-2 text-primary mb-3"></i>
                <h6 className="fw-bold text-dark">10,000+ Happy Families</h6>
                <p className="text-muted small">पूरे भारत में शुद्ध Makhana।</p>
              </div>
            </div>
            <div className="col-12 wow slideInUp" data-wow-delay="0.4s">
              <div className="p-4 shadow rounded-4 h-100 bg-light hover-effect">
                <i className="fa fa-solid fa-font-awesome fs-2 text-primary mb-3"></i>
                <h6 className="fw-bold text-dark">500+ Farmer Partners</h6>
                <p className="text-muted small">सीधे किसानों से खरीद।</p>
              </div>
            </div>
            <div className="col-12 py-3 wow slideInUp" data-wow-delay="0.6s">
              <div className="p-4 shadow rounded-4 h-100 bg-light hover-effect">
                <i className="fa fa-heart fs-2 text-primary mb-3"></i>
                <h6 className="fw-bold text-dark">Our Promise</h6>
                <p className="text-muted small">100% शुद्धता और ईमानदारी।</p>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default About;