"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  parent: string;
  status: string;
  sortOrder?: number;
}
interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  status: string;
}
const categoryIcons: Record<string, string> = {
  "raw-makhana": "🌾",
  "roasted-makhana": "🔥",
  "flavoured-makhana": "🌶️",
  "makhana-powder": "🥣",
  "gift-packs-combos": "🎁",
  "bulk-wholesale": "📦",
  "plain-roasted-makhana": "🍘",
  "jumbo-roasted-makhana": "✨",
  "makhana-snacks": "🍿",
  "premium-makhana": "⭐",
};

const Hero = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catResponse, bannerResponse] = await Promise.all([
          fetch("/api/category"),
          fetch("/api/banner"),
        ]);
        if (!catResponse.ok) { throw new Error("Failed to fetch categories"); }
        if (!bannerResponse.ok) { throw new Error("Failed to fetch banners");}
        const catRes = await catResponse.json();
        const banRes = await bannerResponse.json();
        const catArray: Category[] = Array.isArray(catRes)
          ? catRes
          : Array.isArray(catRes.category)
            ? catRes.category
            : [];

        const banArray: Banner[] = Array.isArray(banRes)
          ? banRes
          : Array.isArray(banRes.banner)
            ? banRes.banner
            : [];

        setCategories(
          catArray
            .filter((category) => category.status === "Active")
            .sort(
              (a, b) =>
                Number(a.sortOrder ?? 0) -
                Number(b.sortOrder ?? 0)
            )
        );
      setBanners( banArray.filter((banner) => banner.status === "Active") );
      } catch (error) {
        console.error("Error loading Hero data:", error);
      }
    };
    loadData();
  }, []);

  const settings = {
    infinite: banners.length > 1,
    autoplay: banners.length > 1,
    autoplaySpeed: 1000,
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    adaptiveHeight: false,
  };

  return (
    <div className="container-fluid py-5 w-95">
      <div className="row justify-content-center g-4">

        {/* Categories Section */}
        <div className="col-12 col-lg-5 mb-4 mb-lg-0">
         <h4 className="fw-bold my-0 py-0">Explore Our Makhana Collection</h4>
          <p className="text-secondary mb-2 py-0 fs-7">
          Shop premium, crunchy, and delicious Makhana for healthy snacking every day.
          </p>
          <div className="border rounded-4 p-4 shadow-sm bg-white">
            <div className="row g-3">
              {categories.map((cat) => (
                <div className="col-6" key={cat.id}>
                  <Link href={`/Products/${cat.slug}`} className="text-decoration-none">
                    <div className="d-flex align-items-center gap-2 p-2 rounded-3 bg-light border hover-effect h-100">
                      <div className="rounded-circle bg-warning d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: "30px",
                          height: "30px",
                          fontSize: "14px",
                        }}>
                        {categoryIcons[cat.slug] || "🛒"}
                      </div>
                      <span className="text-dark" style={{fontSize:"12px"}}>
                        {cat.name}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}

              {categories.length === 0 && (
                <div className="col-12 text-center py-3">
                  <p className="text-muted mb-0"> No active categories found.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Banner Slider Section */}
        <div className="col-12 col-lg-7">
          <div className="rounded-4 overflow-hidden shadow-sm">
            {banners.length > 0 ? (
              <Slider {...settings}>
                {banners.map((banner) => (
                  <div key={banner.id}>
                    <div className="position-relative">
                      <img className="w-100 rounded-4" src={`/assets/images/${banner.image}`} alt={banner.title || "Banner"}
                        style={{  height: "400px",  objectFit: "cover",}}
                         onError={(e) => { const img = e.currentTarget; img.onerror = null;
                         img.src = "https://placehold.co/800x450?text=" + encodeURIComponent(   banner.title || "Banner" ); }} />
                      
                       <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center px-4 px-md-5 rounded-4"
                        style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)",}}>
                       
                        <div style={{ maxWidth: "500px" }}>
                          <h4 className="text-warning text-uppercase fw-bold mb-2">
                            {banner.subtitle}
                          </h4>
                          <h5 className="text-white fw-bold mb-3">
                            {banner.title}
                          </h5>
                          <Link href={`/Products/${ banner.buttonLink ?.split("/") .filter(Boolean) .pop() || "" }`}
                           className="btn btn-warning btn-sm px-4 py-2 fw-bold">
                            {banner.buttonText || "Shop Now"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="d-flex align-items-center justify-content-center bg-light rounded-4" style={{ minHeight: "300px" }}>
                <p className="text-muted mb-0">
                  No active banners available.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
