// src/app/(WebPage)/(Page)/Products/page.tsx
"use client";
import React, { useEffect, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%23999' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

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
  slug?: string;
  isBestSeller?: string;
  description?: string;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  parent?: string;
  status: string;
}

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [cityFilter, setCityFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState(20);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const city = searchParams.get("city") || "";
    const category = searchParams.get("category") || "";
    setSearchQuery(search);
    setCityFilter(city);
    setActiveFilter(category || "ALL");
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/product") .then((r) => r.json()) .catch(() => []),
          fetch("/api/category").then((r) => r.json()).catch(() => []),]);

        const prodList = Array.isArray(prodRes)
          ? prodRes
          : prodRes?.product || [];
        const catList = Array.isArray(catRes) ? catRes : catRes?.category || [];
        setProducts(prodList.filter((p: any) => p.status === "Active"));
        setCategories(catList.filter((c: any) => c.status === "Active"));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

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

  const addToCart = (product: Product) => {
    if (!window.confirm(`Do you want to add "${product.name}" to your cart?`))
      return;
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((c: any) => c.id === product.id);
    if (existing) {
      cart = cart.map((c: any) =>
        c.id === product.id ? { ...c, quantity: (c.quantity || 1) + 1 } : c,
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`✅ ${product.name} added to cart!`);
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (activeFilter !== "ALL") {
      const parentCat = categories.find((c) => c.name === activeFilter);
      const parentName = parentCat?.name || activeFilter;
      const childNames = categories
        .filter((c) => c.parent?.trim() === parentName)
        .map((c) => c.name);

      filtered = filtered.filter((p) => {
        if (p.category === parentName) return true;
        if (childNames.includes(p.category || "")) return true;
        return false;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q),
      );
    }

    if (cityFilter.trim()) {
      const c = cityFilter.toLowerCase();
      filtered = filtered.filter(
        (p: any) =>
          p.city?.toLowerCase().includes(c) ||
          p.origin?.toLowerCase().includes(c),
      );
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (
            calcFinal(a.price, a.discount) - calcFinal(b.price, b.discount)
          );
        case "price-high":
          return (
            calcFinal(b.price, b.discount) - calcFinal(a.price, a.discount)
          );
        case "rating":
          return Number(b.rating || 0) - Number(a.rating || 0);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
      }
    });
  }, [products, categories, activeFilter, searchQuery, cityFilter, sortBy]);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeFilter, searchQuery, cityFilter, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;
  const parentCategories = categories.filter(
    (c) => !c.parent || c.parent.trim() === "",
  );

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveFilter("ALL");
    setCityFilter("");
    router.push("/Products");
  };

  return (
    <>
      <section className="bg-success text-white py-3">
        <div className="container-fluid w-95">
          <h3 className="fw-bold mb-1">
            <i className="fa fa-shopping-bag me-2"></i> All Products
          </h3>
          <p className="mb-0 opacity-75">
            {filteredProducts.length} products found
          </p>
        </div>
      </section>

      <section className="py-4">
        <div className="container-fluid w-95">
          <div className="card border-0 shadow-sm p-3 mb-4 bg-light">
            <div className="row g-3">
              <div className="col-lg-6">
                <label className="form-label small fw-bold text-muted mb-1">
                  <i className="fa fa-magnifying-glass me-1"></i> Search
                  Products
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="fa fa-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setSearchQuery("")}
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  )}
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <label className="form-label small fw-bold text-muted mb-1">
                  <i className="fa fa-filter me-1"></i> Category
                </label>
                <select
                  className="form-select"
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                >
                  <option value="ALL">
                    All Categories ({products.length})
                  </option>
                  {parentCategories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-lg-3 col-md-6">
                <label className="form-label small fw-bold text-muted mb-1">
                  <i className="fa fa-sort me-1"></i> Sort By
                </label>
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="name">Name: A → Z</option>
                </select>
              </div>
            </div>

            {(searchQuery || activeFilter !== "ALL" || cityFilter) && (
              <div className="mt-3 d-flex flex-wrap align-items-center gap-2">
                <small className="text-muted fw-bold">Active Filters:</small>
                {activeFilter !== "ALL" && (
                  <span className="badge bg-primary d-flex align-items-center gap-1">
                    {activeFilter}
                    <button
                      className="btn-close btn-close-white"
                      style={{ fontSize: "8px" }}
                      onClick={() => setActiveFilter("ALL")}
                    ></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="badge bg-secondary d-flex align-items-center gap-1">
                    "{searchQuery}"
                    <button
                      className="btn-close btn-close-white"
                      style={{ fontSize: "8px" }}
                      onClick={() => setSearchQuery("")}
                    ></button>
                  </span>
                )}
                {cityFilter && (
                  <span className="badge bg-info text-dark d-flex align-items-center gap-1">
                    City: {cityFilter}
                    <button
                      className="btn-close"
                      style={{ fontSize: "8px" }}
                      onClick={() => setCityFilter("")}
                    ></button>
                  </span>
                )}
              </div>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <i className="fa fa-inbox fa-4x text-muted mb-3"></i>
              <h4 className="text-muted">No products found</h4>
              {(searchQuery || activeFilter !== "ALL" || cityFilter) && (
                <button
                  className="btn btn-success mt-2"
                  onClick={clearAllFilters}
                >
                  <i className="fa fa-times me-1"></i> Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="row g-2 py-3">
                {visibleProducts.map((product) => (
                  <div
                    key={product.id}
                    className="col-lg-3 col-md-4 col-6 mb-2"
                  >
                    <ProductCard
                      product={product}
                      onAdd={() => addToCart(product)}
                      onView={() => setSelectedProduct(product)}
                      calcFinal={calcFinal}
                    />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-4 mb-2">
                  <button
                    className="btn btn-success px-5 py-2 fw-bold"
                    onClick={() =>
                      setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
                    }
                  >
                    <i className="fa fa-plus-circle me-2"></i>
                    View More ({filteredProducts.length - visibleCount}{" "}
                    remaining)
                  </button>
                </div>
              )}

              {!hasMore && filteredProducts.length > ITEMS_PER_PAGE && (
                <div className="text-center mt-4 mb-2">
                  <small className="text-muted">
                    <i className="fa fa-check-circle me-1 text-success"></i>
                    All {filteredProducts.length} products shown
                  </small>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {selectedProduct && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="modal-dialog modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedProduct.name} - Details
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedProduct(null)}
                ></button>
              </div>
              <div
                className="modal-body"
                style={{ maxHeight: "70vh", overflowY: "auto" }}
              >
                <div className="row">
                  <div className="col-md-5 text-center">
                    <img
                      src={
                        selectedProduct.pic
                          ? `/assets/images/${selectedProduct.pic}`
                          : FALLBACK_IMG
                      }
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
                        <strong>Description:</strong>{" "}
                        {selectedProduct.description ||
                          "Pure & Organic Makhana"}
                      </li>
                      <li className="list-group-item">
                        <strong>Rating:</strong>{" "}
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className="fs-5 fw-bold"
                            style={{
                              color:
                                i < Number(selectedProduct.rating || 0)
                                  ? "#ffc107"
                                  : "#556292d0",
                            }}
                          >
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
                          <span className="badge bg-success">
                            In Stock ({selectedProduct.stock})
                          </span>
                        ) : (
                          <span className="badge bg-danger">Out of Stock</span>
                        )}
                      </li>
                      <li className="list-group-item fw-bold">
                        <strong>Price:</strong> ₹
                        {calcFinal(
                          selectedProduct.price,
                          selectedProduct.discount,
                        ).toFixed(2)}
                        {selectedProduct.discount &&
                          Number(selectedProduct.discount) > 0 && (
                            <span
                              className="text-danger ms-2"
                              style={{ textDecoration: "line-through" }}
                            >
                              ₹{parsePrice(selectedProduct.price).toFixed(2)}
                            </span>
                          )}
                      </li>
                    </ul>

                    <div className="mt-3 d-flex gap-2">
                      <button
                        className="btn btn-success w-50"
                        disabled={Number(selectedProduct.stock) <= 0}
                        onClick={() => {
                          addToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                      >
                        <i className="fa fa-cart-plus me-1"></i> Add to Cart
                      </button>
                      <Link
                        href={`/Products/${selectedProduct.slug || selectedProduct.id}`}
                        className="btn btn-primary w-50"
                      >
                        <i className="fa fa-shopping-bag me-1"></i> View Full
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* Product Card */
function ProductCard({
  product,
  onAdd,
  onView,
  calcFinal,
}: {
  product: Product;
  onAdd: () => void;
  onView: () => void;
  calcFinal: (p?: string, d?: string) => number;
}) {
  return (
    <div className="blog-item bg-light rounded overflow-hidden shadow-md bordered h-100 d-flex flex-column">
      <div className="blog-img position-relative overflow-hidden shadow-lg">
        <img
          src={product.pic ? `/assets/images/${product.pic}` : FALLBACK_IMG}
          alt={product.name}
          className="img-fluid rounded-3 border w-100 border border-warning"
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMG;
          }}
        />
        <span className="position-absolute top-0 start-0 bg-primary text-white rounded-end fs-8 py-1 mt-1 px-2">
          {product.category || "Makhana"}
        </span>

        {product.discount && Number(product.discount) > 0 && (
          <span className="badge bg-warning text-dark position-absolute top-0 end-0 mt-1 px-2 py-1 fs-8 rounded-pill">
            {product.discount}% OFF
          </span>
        )}

        {Number(product.stock) <= 0 && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <span className="badge bg-danger">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="py-3 px-2 text-left flex-grow-1">
        <h6 className="card-title text-dark">
          {product.name?.slice(0, 20)}
          {(product.name?.length || 0) > 20 ? "..." : ""}
        </h6>
        <p className="card-text m-0 text-dark fs-7">
          {product.description
            ? product.description.length > 30
              ? product.description.slice(0, 30) + "..."
              : product.description
            : "Pure & Organic Makhana"}
        </p>

        <div className="d-flex align-items-center justify-content-between flex-wrap gap-1 mx-2 mt-2">
          <div className="d-flex align-items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                style={{
                  color: i < Number(product.rating || 0) ? "#ffc107" : "#ddd",
                  fontSize: "14px",
                }}
              >
                ★
              </span>
            ))}
            {product.weight && (
              <span className="ms-2 text-muted small">({product.weight})</span>
            )}
          </div>

          <div className="d-flex align-items-center gap-1">
            {product.discount && Number(product.discount) > 0 && (
              <>
                <del className="text-muted" style={{ fontSize: "13px" }}>
                  ₹
                  {new Intl.NumberFormat("en-IN").format(
                    parseFloat(product.price || "0"),
                  )}
                </del>
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  {product.discount}%off
                </span>
              </>
            )}
            <strong className="text-success" style={{ fontSize: "14px" }}>
              ₹
              {new Intl.NumberFormat("en-IN").format(
                calcFinal(product.price, product.discount),
              )}
            </strong>
          </div>
        </div>
      </div>

      <div className="card-body pb-3 d-flex gap-2 pt-0">
        <button
          className="btn btn-outline-secondary w-50 btn-sm"
          disabled={Number(product.stock) <= 0}
          onClick={onAdd}
        >
          <i className="fa fa-cart-plus me-1"></i> Add
        </button>
        <button
          className="btn btn-outline-primary w-50 btn-sm"
          onClick={onView}
        >
          <i className="fa fa-eye me-1"></i> View Now
        </button>
      </div>
    </div>
  );
}

/* ✅ Suspense wrapper (useSearchParams के लिए ज़रूरी) */
export default function AllProductsPage() {
  return (
    <Suspense
      fallback={<div className="container py-5 text-center">Loading...</div>}
    >
      <ProductsContent />
    </Suspense>
  );
}
