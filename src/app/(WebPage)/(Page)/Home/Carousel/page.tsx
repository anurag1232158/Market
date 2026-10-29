// src/app/(WebPage)/(Page)/Home/Carousel/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

interface ProductItem {
  id: string;
  name: string;
  pic: string;
  price: string;
  discount?: string;
  rating?: string;
  description: string;
  category: string;
  weight: string;
  flavour: string;
  slug: string;
  isBestSeller: string;
  isVrat: string;
  status: string;
}

const Carousel = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((json) => {
        const productArray: ProductItem[] = Array.isArray(json)
          ? json
          : json.product || json.data || json.products || [];

        const activeProducts = productArray.filter(
          (p) => p && p.status === "Active"
        );
        setProducts(activeProducts);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  if (products.length === 0) return null;

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const settings = {
    infinite: filteredProducts.length > 4,
    autoplay: filteredProducts.length > 4,
    autoplaySpeed: 5000,
    centerMode: filteredProducts.length > 4,
    dots: false,
    arrows: filteredProducts.length > 4,
    slidesToShow: 4,
    responsive: [
      { breakpoint: 1500, settings: { slidesToShow: 4, centerMode: false } },
      { breakpoint: 1200, settings: { slidesToShow: 3, centerMode: false } },
      { breakpoint: 992, settings: { slidesToShow: 2, centerMode: false } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerMode: false } },
      { breakpoint: 576, settings: { slidesToShow: 1, centerMode: false } },
    ],
  };

  return (
    <div className="container-fluid w-95 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2 className="mb-0 fw-bold">New Added Products</h2>
        <Link
          href="/Products"
          className="text-primary text-decoration-none btn btn-outline-warning btn-sm border-1"
        >
          See all
        </Link>
      </div>

      {/* Category Filter Tabs */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn btn-sm rounded-pill px-3 ${
              selectedCategory === cat
                ? "btn-warning fw-bold"
                : "btn-outline-secondary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-muted text-center py-4">No products in this category.</p>
      ) : (
        <div className="row">
          <Slider {...settings}>
            {/* ✅ सीधे div — कोई Fragment नहीं */}
            {filteredProducts.map((product) => {
              const price = Number(product.price);
              const discount = Number(product.discount || 0);
              const finalPrice = discount
                ? Math.round(price - (price * discount) / 100)
                : price;
              const imageSrc = `/assets/images/${encodeURIComponent(product.pic)}`;

              return (
                <div key={product.id} className="px-2">
                  <div className="blog-item bg-light rounded overflow-hidden shadow-sm bordered">
                    <div className="blog-img position-relative overflow-hidden shadow-lg">
                      <Link
                        href={`/Products/${product.slug || product.id}`}
                        className="text-decoration-none"
                      >
                        <div className="position-relative overflow-hidden">
                          <img
                            className="img-fluid w-100"
                            src={imageSrc}
                            alt={product.name}
                            style={{ height: "240px", objectFit: "cover" }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/300x240?text=" +
                                encodeURIComponent(product.name);
                            }}
                          />
                          {discount > 0 && (
                            <span className="badge bg-danger position-absolute top-0 end-0 mt-1 px-2 py-1 fs-7">
                              {discount}% OFF
                            </span>
                          )}
                          {product.isBestSeller === "Yes" && (
                            <span className="badge bg-warning text-dark position-absolute top-0 start-0 mt-1 px-2 py-1 fs-7">
                              ⭐ Best Seller
                            </span>
                          )}
                          {product.isVrat === "Yes" && (
                            <span className="badge bg-success position-absolute bottom-0 start-0 m-2 px-2 py-1 rounded-pill fw-bold shadow">
                              🌿 Vrat
                            </span>
                          )}
                        </div>

                        <div className="card-body">
                          <h6 className="card-title text-dark mb-1 text-truncate">
                            {product.name}
                          </h6>
                          <p className="text-muted small mb-2">
                            {product.weight} • {product.flavour}
                          </p>

                          <div className="d-flex align-items-center mb-2">
                            <span className="text-warning fw-bold me-1">
                              {"★".repeat(Math.round(Number(product.rating || 0)))}
                            </span>
                            <span className="text-secondary">
                              {"☆".repeat(5 - Math.round(Number(product.rating || 0)))}
                            </span>
                            <span className="text-muted small ms-2">
                              ({product.rating || "0"})
                            </span>
                          </div>

                          {/* ✅ Price भी दिखाओ (पहले नहीं था) */}
                          <div className="d-flex align-items-center gap-1">
                            {discount > 0 && (
                              <del className="text-muted" style={{ fontSize: "12px" }}>
                                ₹{new Intl.NumberFormat("en-IN").format(price)}
                              </del>
                            )}
                            <strong className="text-success" style={{ fontSize: "15px" }}>
                              ₹{new Intl.NumberFormat("en-IN").format(finalPrice)}
                            </strong>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Carousel;