// src/app/(WebPage)/(Page)/Home/FeaturedProducts/page.tsx
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
  isFeatured?: string;
}

const FeaturedProducts = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // ✅ मोडल के लिए

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

  /* Fetch Featured Products */
  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.product || [];

        let featured = list.filter(
          (p: any) =>
            p.status === "Active" &&
            (p.isFeatured === "Yes" || p.isFeatured === true)
        );

        if (featured.length === 0) {
          featured = list
            .filter((p: any) => p.status === "Active")
            .sort((a: any, b: any) => Number(b.rating || 0) - Number(a.rating || 0))
            .slice(0, 8);
        } else {
          featured = featured.slice(0, 8);
        }

        setProducts(featured);
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

  if (products.length === 0) return null;

  return (
    <div className="container-fluid w-95">
      {/* Section Title */}
      <div className="section-title text-left position-relative pb-3 mb-4 mx-auto">
        <Link
          href="/Products"
          className="text-primary text-decoration-none float-end btn btn-outline-warning btn-sm border-1"
        >
          See all
        </Link>
        <h2 className="mb-0 py-0 my-0">
          <i className="fa fa-star text-warning me-2"></i>
          Featured Makhana Products
        </h2>
        <p className="text-muted mb-0 mt-2">
          हमारे खास चुने हुए शुद्ध Makhana products
        </p>
      </div>

      <Slider {...settings}>
        {products.map((product) => (
          <div className="px-1" key={product.id}>
            <div className="blog-item bg-light rounded overflow-hidden shadow-sm bordered">
              <div className="blog-img position-relative overflow-hidden shadow-lg">
                <Link href={`/Products/${product.slug || product.id}`}>
                  <img src={product.pic ? `/assets/images/${product.pic}` : "/assets/images/placeholder.png"}
                    className="img-fluid rounded-3 border w-100 border border-warning"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => { (e.target as HTMLImageElement).src = "/assets/images/placeholder.png"; }}/>
                  <span className="position-absolute top-0 start-0 bg-primary text-white rounded-end fs-7 py-1 mt-1 px-2">
                    {product.category || "Makhana"}
                  </span>

                  {product.discount && Number(product.discount) > 0 && (
                    <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2 px-3 py-1 rounded-pill fw-bold shadow">
                      {product.discount}% Off
                    </span>
                  )}

                  {Number(product.stock) <= 0 && (
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                      style={{ background: "rgba(0,0,0,0.5)" }}>
                      <span className="badge bg-danger fs-6">Out of Stock</span>
                    </div>
                  )}
                </Link>
              </div>

              {/* Title + Description */}
              <div className="py-2 px-2 text-left">
                <h6 className="card-title fw-bold text-dark">
                  {product.name && product.name.length > 30
                    ? product.name.slice(0, 30) + "..."
                    : product.name}
                </h6>
                <p className="card-text m-0 text-dark" style={{ fontSize: "14px" }}>
                  {product.description
                    ? product.description.length > 30
                      ? product.description.slice(0, 30) + "..."
                      : product.description
                    : "Pure & Organic Makhana"}
                </p>

  {/* ✅ Rating + Weight + Price (Single Line) */}
<div className="d-flex align-items-center justify-content-between flex-wrap gap-1 mt-2">
  
  {/* LEFT: Rating + Weight */}
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

  {/* RIGHT: Price (MRP + Discount + Final) */}
  <div className="d-flex align-items-center gap-1">
    {/* MRP + Discount (अगर डिस्काउंट है) */}
    {product.discount && Number(product.discount) > 0 && (
      <>
        <del className="text-muted mb-0" style={{ fontSize: "12px" }}>
          ₹{new Intl.NumberFormat("en-IN").format(parsePrice(product.price))}
        </del>
        <span className="text-danger fw-bold" style={{ fontSize: "11px" }}>
          {product.discount}%off
        </span>
      </>
    )}

    {/* Final Price */}
    <strong className="text-success mb-0" style={{ fontSize: "14px" }}>
      ₹{new Intl.NumberFormat("en-IN").format(
        calculateFinalPrice(product.price, product.discount)
      )}
    </strong>
  </div>
</div>
              </div>

              {/* ⭐ Buttons (Add to Cart + View Now) */}
              <div className="card-body pb-3 d-flex gap-2 pt-0">
                <button
                  className="btn btn-outline-secondary w-50 btn-sm"
                  disabled={Number(product.stock) <= 0}
                  onClick={() => addToCart(product)}
                >
                  <i className="fa fa-cart-plus me-1"></i> Add to Cart
                </button>

                {/* ✅ View Now → Modal खोलेगा */}
                <button
                  className="btn btn-outline-primary w-50 btn-sm"
                  onClick={() => setSelectedProduct(product)}>
                  <i className="fa fa-eye me-1"></i> View Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>


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
                  {/* LEFT: Image */}
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

                  {/* RIGHT: Details */}
                  <div className="col-md-7">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Description:</strong> {selectedProduct.description || "Pure & Organic"}
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
                        <i className="fa fa-shopping-bag me-2"></i> View Full Product
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
    </div>
  );
};

export default FeaturedProducts;