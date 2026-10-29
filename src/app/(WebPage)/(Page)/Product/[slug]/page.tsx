// app/(WebPage)/(Page)/Product/[slug]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f0f0f0' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='20' fill='%23999' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

interface Product {
  id: string;
  name: string;
  pic?: string;
  category?: string;
  weight?: string;
  price?: string;
  discount?: string;
  stock?: string;
  status?: string;
  rating?: string;
  description?: string;
  details?: string;
  ingredients?: string;
  slug?: string;
  sku?: string;
  origin?: string;
  shelfLife?: string;
  grade?: string;
  packType?: string;
  protein?: string;
  calories?: string;
  fat?: string;
  carbs?: string;
  fiber?: string;
  isBestSeller?: string;
  isVrat?: string;
  isGlutenFree?: string;
  createdAt: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = decodeURIComponent((params?.slug as string) || "");

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  /* Fetch Product */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.product || [];

        const found = list.find(
          (p: any) => p.slug === slug || p.id === slug
        );

        if (found) {
          setProduct(found);
          const rel = list
            .filter(
              (p: any) =>
                p.category === found.category &&
                p.id !== found.id &&
                p.status === "Active"
            )
            .slice(0, 4);
          setRelated(rel);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  /* Cart Count */
  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(Array.isArray(cart) ? cart.length : 0);
    };
    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  const parsePrice = (price?: string) =>
    price ? parseFloat(price.replace(/,/g, "")) : 0;

  const calcFinal = (price?: string, discount?: string) => {
    const p = parsePrice(price);
    const d = discount ? parseFloat(discount) : 0;
    return Math.round(p - (p * d) / 100);
  };

  const addToCart = () => {
    if (!product) return;
    if (
      !window.confirm(`क्या आप "${product.name}" को cart में जोड़ना चाहते हैं?`)
    )
      return;

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((c: any) => c.id === product.id);

    if (existing) {
      cart = cart.map((c: any) =>
        c.id === product.id
          ? { ...c, quantity: (c.quantity || 1) + qty }
          : c
      );
    } else {
      cart.push({ ...product, quantity: qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`✅ ${product.name} cart में जोड़ा गया!`);
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container my-5 text-center py-5">
        <i className="fa fa-exclamation-circle fa-4x text-warning mb-3"></i>
        <h3>Product not found</h3>
        <p className="text-muted">URL: /Product/{slug}</p>
        <Link href="/AllCategorys" className="btn btn-success mt-2">
          <i className="fa fa-arrow-left me-1"></i> Back to All Products
        </Link>
      </div>
    );
  }

  const detailLines =
    product.details
      ?.replace(/\\n\s*/g, "\n")
      .split(/\n| n/)
      .map((l) => l.trim())
      .filter(Boolean) || [];

  const stockNum = Number(product.stock) || 0;

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-light py-3">
        <div className="container-fluid w-90">
          <nav className="small">
            <Link href="/" className="text-decoration-none">Home</Link> /{" "}
            <Link href="/AllCategorys" className="text-decoration-none">Products</Link> /{" "}
            <span className="text-muted">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <div className="container my-5">
        <div className="row">
          {/* LEFT: Image */}
          <div className="col-md-5 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="position-relative">
                <img
                  src={product.pic ? `/assets/images/${product.pic}` : FALLBACK_IMG}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMG;
                  }}
                />
                {product.discount && Number(product.discount) > 0 && (
                  <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill fw-bold">
                    🔥 {product.discount}% OFF
                  </span>
                )}
                {product.isBestSeller === "Yes" && (
                  <span className="badge bg-danger position-absolute top-0 start-0 m-3">
                    🏆 Bestseller
                  </span>
                )}
              </div>
            </div>

            <div className="text-center mt-3">
              {stockNum > 0 ? (
                <span className="badge bg-success px-4 py-2">
                  <i className="fa fa-check-circle me-1"></i>
                  In Stock ({stockNum})
                </span>
              ) : (
                <span className="badge bg-danger px-4 py-2">
                  <i className="fa fa-times-circle me-1"></i>
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="col-md-7">
            <h2 className="fw-bold mb-2">{product.name}</h2>

            <span className="badge bg-success mb-2">{product.category}</span>

            <div className="mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="fs-5"
                  style={{
                    color: i < Number(product.rating || 0) ? "#ffc107" : "#ddd",
                  }}
                >
                  ★
                </span>
              ))}
              <span className="text-muted ms-2">({product.rating || 0}/5)</span>
            </div>

            <div className="d-flex align-items-center gap-2 mb-3">
              <h3 className="text-success fw-bold mb-0">
                ₹{calcFinal(product.price, product.discount)}
              </h3>
              {product.discount && Number(product.discount) > 0 && (
                <>
                  <del className="text-muted fs-5">₹{product.price}</del>
                  <span className="badge bg-success">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="mb-3">
              {product.weight && (
                <span className="badge bg-info text-dark me-2 py-2 px-3">
                  <i className="fa fa-weight-hanging me-1"></i>
                  {product.weight}
                </span>
              )}
              {product.isVrat === "Yes" && (
                <span className="badge bg-warning text-dark me-2 py-2 px-3">
                  🕉️ Vrat Friendly
                </span>
              )}
              {product.isGlutenFree === "Yes" && (
                <span className="badge bg-success me-2 py-2 px-3">
                  🌾 Gluten Free
                </span>
              )}
            </div>

            <p className="text-muted mb-3">
              {product.description || "Pure & Organic Makhana"}
            </p>

            <div className="row g-2 mb-4">
              {product.origin && (
                <div className="col-6">
                  <small className="text-muted d-block">Origin</small>
                  <strong>{product.origin}</strong>
                </div>
              )}
              {product.shelfLife && (
                <div className="col-6">
                  <small className="text-muted d-block">Shelf Life</small>
                  <strong>{product.shelfLife}</strong>
                </div>
              )}
              {product.grade && (
                <div className="col-6">
                  <small className="text-muted d-block">Grade</small>
                  <strong>{product.grade}</strong>
                </div>
              )}
              {product.packType && (
                <div className="col-6">
                  <small className="text-muted d-block">Pack Type</small>
                  <strong>{product.packType}</strong>
                </div>
              )}
            </div>

            <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
              <div className="input-group" style={{ width: "140px" }}>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <i className="fa fa-minus"></i>
                </button>
                <input
                  type="text"
                  className="form-control text-center"
                  value={qty}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQty((q) => q + 1)}
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>

              <button
                className="btn btn-success flex-grow-1"
                disabled={stockNum <= 0}
                onClick={addToCart}
              >
                <i className="fa fa-shopping-cart me-2"></i>
                Add to Cart
              </button>

              <Link href="/Cart" className="btn btn-warning text-dark position-relative">
                <i className="fa fa-shopping-bag me-1"></i>
                Go to Cart
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            <button
              className="btn btn-outline-primary w-100"
              onClick={() => setShowDetails(!showDetails)}
            >
              <i className="fa fa-info-circle me-2"></i>
              {showDetails ? "Hide Details" : "View Full Details"}
            </button>

            {showDetails && (
              <div className="mt-3 p-3 border rounded bg-light">
                {detailLines.length > 0 && (
                  <>
                    <h6 className="fw-bold">Product Details:</h6>
                    <ul>
                      {detailLines.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </>
                )}
                {product.ingredients && (
                  <>
                    <h6 className="fw-bold mt-3">Ingredients:</h6>
                    <p>{product.ingredients}</p>
                  </>
                )}
                {(product.protein || product.calories || product.fat || product.carbs || product.fiber) && (
                  <>
                    <h6 className="fw-bold mt-3">Nutrition (per 100g):</h6>
                    <div>
                      {product.calories && <span className="badge bg-info text-dark me-2">Calories: {product.calories}</span>}
                      {product.protein && <span className="badge bg-success me-2">Protein: {product.protein}g</span>}
                      {product.fat && <span className="badge bg-warning text-dark me-2">Fat: {product.fat}g</span>}
                      {product.carbs && <span className="badge bg-secondary me-2">Carbs: {product.carbs}g</span>}
                      {product.fiber && <span className="badge bg-primary me-2">Fiber: {product.fiber}g</span>}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-5">
            <h4 className="fw-bold mb-3">
              <i className="fa fa-th me-2 text-success"></i>
              Related Products
            </h4>
            <div className="row g-3">
              {related.map((rp) => (
                <div key={rp.id} className="col-lg-3 col-md-6 col-6">
                  <Link href={`/Product/${rp.slug || rp.id}`} className="text-decoration-none">
                    <div className="card border-0 shadow-sm h-100">
                      <img
                        src={rp.pic ? `/assets/images/${rp.pic}` : FALLBACK_IMG}
                        alt={rp.name}
                        style={{ height: "180px", objectFit: "cover" }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_IMG;
                        }}
                      />
                      <div className="card-body p-2">
                        <h6 className="fw-bold text-dark" style={{ fontSize: "14px" }}>
                          {rp.name?.slice(0, 30)}
                        </h6>
                        <h5 className="text-success mb-0">
                          ₹{calcFinal(rp.price, rp.discount)}
                        </h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}