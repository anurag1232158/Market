// src/app/(WebPage)/(Page)/Home/SpecialOffer/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  pic: string;
  price: string;
  discount?: string;
  category: string;
  weight: string;
  description: string;
  details: string;
  createdAt: string;
  rating?: string;
  status?: string;
  quantity?: number;
  stock?: string;
  slug?: string;
}

const SpecialOffer = () => {
  const router = useRouter();
  const [offers, setOffers] = useState<Product[]>([]);

  const settings = {
    infinite: offers.length > 4,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    dots: false,
    arrows: true,
    slidesToShow: 4,
    responsive: [
      { breakpoint: 1500, settings: { slidesToShow: 4, centerMode: false } },
      { breakpoint: 1200, settings: { slidesToShow: 3, centerMode: false } },
      { breakpoint: 992, settings: { slidesToShow: 2, centerMode: false } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerMode: false } },
      { breakpoint: 576, settings: { slidesToShow: 1, centerMode: false } },
    ],
  };

  /* Fetch Special Offers */
  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.product || [];

        const discounted = list
          .filter(
            (p: any) =>
              p.status === "Active" &&
              p.discount &&
              Number(p.discount) > 0
          )
          .sort(
            (a: any, b: any) =>
              Number(b.discount || 0) - Number(a.discount || 0)
          )
          .slice(0, 8);

        setOffers(discounted);
      })
      .catch((err) => console.error("Error fetching offers:", err));
  }, []);

  const parsePrice = (price?: string) =>
    price ? parseFloat(price.replace(/,/g, "")) : 0;

  const calculateFinalPrice = (price?: string, discount?: string) => {
    const p = parsePrice(price);
    const d = discount ? parseFloat(discount) : 0;
    return p - (p * d) / 100;
  };

  const addToCart = (item: Product) => {
    if (!window.confirm(`क्या आप "${item.name}" को cart में जोड़ना चाहते हैं?`)) return;

    let updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = updatedCart.find((c: any) => c.id === item.id);

    if (existing) {
      updatedCart = updatedCart.map((c: any) =>
        c.id === item.id ? { ...c, quantity: (c.quantity || 1) + 1 } : c
      );
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`✅ ${item.name} cart में जोड़ा गया!`);
    router.push("/Cart");
  };

  if (offers.length === 0) return null;

  return (
    <div className="container-fluid w-95 mt-0 mb-5 pt-0 pb-4">
      {/* Section Title */}
      <div className="section-title text-left position-relative pb-3 mb-4 mx-auto">
       <Link
          href="/Products"
          className="text-primary text-decoration-none float-end btn btn-outline-warning btn-sm border-1"
        >
          See all
        </Link>
        <h6 className="fw-bold text-primary text-uppercase">
          <i className="fa fa-solid fa-fire text-danger me-1"></i>
          Limited Time
        </h6>
        <h2 className="mb-0 py-0 my-0">🎉 Special Offers & Discounts</h2>
        <p className="text-muted mb-0 mt-1">
          सबसे बड़ी छूट पर ताज़ा Makhana खरीदें — offer सिर्फ कुछ दिनों के लिए!
        </p>
      </div>

<Slider {...settings}>
  {offers.map((product) => (
    <div className="px-1" key={product.id}>
      <div className="blog-item bg-light rounded overflow-hidden shadow-sm bordered">
        <div className="blog-img position-relative overflow-hidden shadow-lg">
          <Link href={`/Products/${product.slug || product.id}`}>
            <img
              src={product.pic ? `/assets/images/${product.pic}` : "/assets/images/placeholder.png"}
              className="img-fluid rounded-3 border w-100 border border-warning"
              alt={product.name}
              style={{ height: "200px", objectFit: "cover" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/images/placeholder.png";
              }}
            />

            {/* Category Badge */}
            <span className="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-1 py-1 px-2 fs-7">
              {product.category || "Makhana"}
            </span>

            {/* Discount Badge */}
            {product.discount && Number(product.discount) > 0 && (
              <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2 px-3 py-1 rounded-pill fs-8 fw-bold shadow">
                🔥 {product.discount}% Off
              </span>
            )}

            {/* Out of Stock */}
            {Number(product.stock) <= 0 && (
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                <span className="badge bg-danger fs-6">Out of Stock</span>
              </div>
            )}
          </Link>
        </div>

        {/* Name + Description + Rating */}
        <div className="pt-2 px-2 text-left">
          <h6 className="card-title fw-bold text-primary">
            {product.name && product.name.length > 30
              ? product.name.slice(0, 30) + "..."
              : product.name}
          </h6>

          <span className="card-text fs-6 text-dark">
            {product.description
              ? product.description.length > 30
                ? product.description.slice(0, 30) + "..."
                : product.description
              : "Pure & Organic Makhana"}
          </span>

          
        </div>

        {/* ✅ Price + Buttons (One Line) */}
        <div className="card-body pt-0">
          {/* Price Row */}
           <div className="d-flex align-items-center justify-content-between flex-wrap gap-1 my-2">
                  {/* Left: Rating + Weight */}
                  <div className="d-flex align-items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="fs-6 fw-bold"
                        style={{ color: i < Number(product.rating || 0) ? "#ffc107" : "#556292d0" }}
                      >
                        ★
                      </span>
                    ))}
                    {product.weight && (
                      <span className="ms-2 text-muted small">({product.weight})</span>
                    )}
                  </div>

                  {/* Right: Price (MRP + Discount + Final) */}
                  <div className="d-flex align-items-center gap-1">
                    {product.discount && Number(product.discount) > 0 && (
                      <>
                        <del className="text-muted mb-0" style={{ fontSize: "12px" }}>
                          ₹{new Intl.NumberFormat("en-IN").format(parsePrice(product.price))}
                        </del>
                        <span className="text-danger fw-bold" style={{ fontSize: "12px" }}>
                          {product.discount}%off
                        </span>
                      </>
                    )}
                    <strong className="text-success mb-0" style={{ fontSize: "14px" }}> 
                      ₹{new Intl.NumberFormat("en-IN").format(
                        calculateFinalPrice(product.price, product.discount)
                      )}
                    </strong>
                  </div>
                </div>

          {/* Buttons Row */}
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary w-50 btn-sm"
              disabled={Number(product.stock) <= 0}
              onClick={() => addToCart(product)}
            >
              <i className="fa fa-solid fa-cart-plus me-1"></i> Add
            </button>

            <button
              className="btn btn-outline-primary w-50 btn-sm"
              onClick={() => setSelectedProduct(product)}
            >
              <i className="fa fa-solid fa-eye me-1"></i> View Now
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</Slider>
    </div>
  );
};

export default SpecialOffer;