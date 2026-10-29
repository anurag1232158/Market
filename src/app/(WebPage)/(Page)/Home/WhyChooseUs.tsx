// src/app/(WebPage)/(Page)/Home/WhyChooseUs/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

const WhyChooseUs = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const settings = {
    infinite: products.length > 4,
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

  /* Fetch Best-Rated Products */
  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.product || [];

        let bestRated = list
          .filter((p: any) => p.status === "Active" && Number(p.rating || 0) >= 4)
          .sort((a: any, b: any) => Number(b.rating || 0) - Number(a.rating || 0))
          .slice(0, 8);

        if (bestRated.length === 0) {
          bestRated = list.filter((p: any) => p.status === "Active").slice(0, 8);
        }

        setProducts(bestRated);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const parsePrice = (price?: string) =>
    price ? parseFloat(price.replace(/,/g, "")) : 0;

  const calculateFinalPrice = (price?: string, discount?: string) => {
    const p = parsePrice(price);
    const d = discount ? parseFloat(discount) : 0;
    return p - (p * d) / 100;
  };

  const addToCart = (product: Product) => {
    if (!window.confirm(`क्या आप "${product.name}" को cart में जोड़ना चाहते हैं?`)) return;

    let updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = updatedCart.find((c: any) => c.id === product.id);

    if (existing) {
      updatedCart = updatedCart.map((c: any) =>
        c.id === product.id ? { ...c, quantity: (c.quantity || 1) + 1 } : c
      );
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`✅ ${product.name} cart में जोड़ा गया!`);
    router.push("/Cart");
  };

  if (products.length === 0) return null;

  return (
    <div className="container-fluid w-95">
      {/* Section Title */}
      <div className="section-title text-left position-relative pb-3 mb-4 mx-auto">
        <h6 className="fw-bold text-primary text-uppercase">
          <i className="fa fa-solid fa-star text-warning me-1"></i>
          Top Rated
        </h6>
        <Link
          href="/Products"
          className="text-primary text-decoration-none float-end btn btn-outline-warning btn-sm border-1"
        >
          See all
        </Link>
        <h2 className="mb-0 py-0 my-0">Why Choose Our Makhana</h2>
        <p className="text-muted mb-0 mt-1">
          जो products हमारे customers ने सबसे ज्यादा पसंद किए
        </p>
      </div>

      <Slider {...settings}>
        {products.map((product) => (
          <div className="px-1" key={product.id}>
            <div className="blog-item bg-light rounded overflow-hidden shadow-sm bordered">
              <div className="blog-img position-relative overflow-hidden shadow-lg">
                <img
                  src={product.pic ? `/assets/images/${product.pic}` : "/assets/images/placeholder.png"}
                  className="img-fluid rounded-3 border w-100 border border-warning"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/images/placeholder.png";
                  }}
                />

                {product.discount && Number(product.discount) > 0 && (
                  <span className="badge bg-warning text-dark position-absolute top-0 end-0 mt-2 px-2 py-1 fs-8 rounded-pill fw-bold shadow">
                    {product.discount}% Off
                  </span>
                )}

                <button
                  onClick={() => setSelectedProduct(product)}
                  className="position-absolute top-0 border-0 start-0 bg-primary text-white rounded-end mt-1 py-1 px-2 fs-8"
                >
                  {product.category || "Makhana"}
                </button>

                {Number(product.stock) <= 0 && (
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ background: "rgba(0,0,0,0.5)" }}
                  >
                    <span className="badge bg-danger fs-6">Out of Stock</span>
                  </div>
                )}
              </div>

              <div className="card-body my-0 py-2">
                <h6 className="card-title my-0 py-0 fs-7">
                  {(product.description || "Pure & Organic Makhana").length > 80
                    ? `${(product.description || "").slice(0, 80)}...`
                    : product.description || "Pure & Organic Makhana"}
                </h6>
                <div className="text-muted small my-0 py-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      className="fs-5 fw-bold"
                      key={i}
                      style={{ color: i < Number(product.rating || 0) ? "#ffc107" : "#556292d0" }}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ms-2 text-muted">({product.rating || 0}/5)</span>
                </div>
              </div>

              <div className="card-body pb-3 my-0 py-0">
                <button
                  className="btn btn-primary text-white btn-sm fs-8"
                  disabled={Number(product.stock) <= 0}
                  onClick={() => addToCart(product)}
                >
                  <i className="fa fa-solid fa-shopping-bag me-1"></i>
                  Buy Now
                </button>

                <span className="text-muted float-end text-primary">
                  <div className="fw-bold position-relative d-inline-block">
                    {product.discount && Number(product.discount) > 0 && (
                      <>
                      <del className="text-danger ms-2"
                       style={{ textDecoration: "line-through", fontSize: "12px" }} >
                        ₹{new Intl.NumberFormat("en-IN").format(parsePrice(product.price))}
                      </del>
                      <span className="text-danger fw-bold" style={{ fontSize: "12px" }}>
                          {product.discount}%off
                        </span>
                        </>
                    )}
                    <span className="fs-6 ms-2">
                      ₹{new Intl.NumberFormat("en-IN").format(calculateFinalPrice(product.price, product.discount))}
                    </span>
                  </div>
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* ============================================================
          QUICK VIEW MODAL
          ============================================================ */}
      {selectedProduct && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelectedProduct(null)}
        >
          <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.name} - Details</h5>
                <button className="btn-close" onClick={() => setSelectedProduct(null)}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                <div className="row">
                  <div className="col-md-5 text-center">
                    <img
                      src={selectedProduct.pic ? `/assets/images/${selectedProduct.pic}` : "/assets/images/placeholder.png"}
                      alt={selectedProduct.name}
                      className="img-fluid rounded-3 border shadow-sm"
                      style={{ maxHeight: "250px", objectFit: "cover" }}
                    />
                    <span className="badge bg-primary mt-3 px-5 py-2 fw-bold fs-6">
                      {selectedProduct.category || "Makhana"}
                    </span>
                  </div>

                  <div className="col-md-7">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Description:</strong> {selectedProduct.description || "Pure & Organic Makhana"}
                      </li>
                      <li className="list-group-item">
                        <strong>Rating:</strong>{" "}
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="fs-5 fw-bold" style={{ color: i < Number(selectedProduct.rating || 0) ? "#ffc107" : "#556292d0" }}>
                            ★
                          </span>
                        ))}
                      </li>
                      <li className="list-group-item">
                        <strong>Weight:</strong> {selectedProduct.weight || "-"}
                      </li>
                      <li className="list-group-item">
                        <strong>Stock:</strong>{" "}
                        {Number(selectedProduct.stock) > 0 ? (
                          <span className="badge bg-success">In Stock ({selectedProduct.stock})</span>
                        ) : (
                          <span className="badge bg-danger">Out of Stock</span>
                        )}
                      </li>
                      <li className="list-group-item fw-bold">
                        <strong>Price:</strong> ₹{calculateFinalPrice(selectedProduct.price, selectedProduct.discount).toFixed(2)}
                        {selectedProduct.discount && Number(selectedProduct.discount) > 0 && (
                          <span className="text-danger ms-2" style={{ textDecoration: "line-through" }}>
                            ₹{parsePrice(selectedProduct.price).toFixed(2)}
                          </span>
                        )}
                      </li>
                    </ul>

                    <div className="mt-3">
                      <Link href={`/Products/${selectedProduct.slug || selectedProduct.id}`} className="btn btn-primary w-100">
                        <i className="fa fa-solid fa-shopping-bag me-2"></i> View Full Product
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedProduct(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Banner */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center py-5 ps-0">
            <img
              src="/assets/images/banner/bg-01.jpg"
              alt="Makhana Banner"
              className="img-fluid w-100 shadow rounded rounded-4"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/images/paint30.jpg";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;