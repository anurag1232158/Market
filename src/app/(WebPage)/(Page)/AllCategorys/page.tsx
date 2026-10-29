// src/app/(WebPage)/(Page)/AllCategorys/page.tsx
"use client";
import React, { useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

interface CategoryGroup {
  parent: string;
  slug: string;
  children: string[];
  items: Product[];
}

export default function AllCategorysPage() {
  const router = useRouter();
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /* Fetch Data */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("/api/category").then((r) => r.json()).catch(() => []),
          fetch("/api/product").then((r) => r.json()).catch(() => []),
        ]);

        const categoryList = Array.isArray(catRes) ? catRes : catRes?.category || [];
        const productList = Array.isArray(prodRes) ? prodRes : prodRes?.product || [];

        const activeProducts = productList.filter((p: any) => p.status === "Active");
        setProducts(activeProducts);

        const seen = new Set<string>();
        const uniqueCategories = categoryList.filter((c: any) => {
          const key = `${c.name}-${c.parent || ""}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return c.status === "Active";
        });

        const parentMap: { [key: string]: { children: string[]; slug: string } } = {};

        uniqueCategories.forEach((cat: any) => {
          const parent = cat.parent?.trim() || cat.name;
          if (!parentMap[parent]) {
            parentMap[parent] = {
              children: [],
              slug: parent.toLowerCase().replace(/\s+/g, "-"),
            };
          }
          if (cat.name !== parent) {
            parentMap[parent].children.push(cat.name);
          }
        });

        const groups: CategoryGroup[] = Object.entries(parentMap).map(([parent, data]) => {
          const items = activeProducts.filter((p: any) => {
            const prodCat = p.category || "";
            if (prodCat === parent) return true;
            if (data.children.includes(prodCat)) return true;
            return false;
          });
          return { parent, slug: data.slug, children: data.children, items };
        });

        setCategoryGroups(groups.filter((g) => g.items.length > 0));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const parsePrice = (price?: string) =>
    price ? parseFloat(price.replace(/,/g, "")) : 0;

  const calcFinal = (price?: string, discount?: string) => {
    const p = parsePrice(price);
    const d = discount ? parseFloat(discount) : 0;
    return Math.round(p - (p * d) / 100);
  };

  const addToCart = (product: Product) => {
    if (!window.confirm(`Do you want to add "${product.name}" to your cart?`)) return;
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((c: any) => c.id === product.id);
    if (existing) {
      cart = cart.map((c: any) =>
        c.id === product.id ? { ...c, quantity: (c.quantity || 1) + 1 } : c
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`✅ ${product.name} added to cart!`);
    router.push("/Cart");
  };

  const filteredGroups = useMemo(() => {
    let groups = categoryGroups;
    if (activeFilter !== "ALL") {
      groups = groups.filter((g) => g.parent === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      groups = groups
        .map((g) => ({
          ...g,
          items: g.items.filter(
            (p) =>
              p.name?.toLowerCase().includes(q) ||
              p.category?.toLowerCase().includes(q)
          ),
        }))
        .filter((g) => g.items.length > 0);
    }

    groups = groups.map((g) => {
      const sorted = [...g.items].sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return calcFinal(a.price, a.discount) - calcFinal(b.price, b.discount);
          case "price-high":
            return calcFinal(b.price, b.discount) - calcFinal(a.price, a.discount);
          case "rating":
            return Number(b.rating || 0) - Number(a.rating || 0);
          case "name":
            return (a.name || "").localeCompare(b.name || "");
          default:
            return (
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime()
            );
        }
      });
      return { ...g, items: sorted };
    });

    return groups;
  }, [categoryGroups, activeFilter, searchQuery, sortBy]);

  const totalProducts = products.length;
  const visibleProducts = filteredGroups.reduce((sum, g) => sum + g.items.length, 0);

  /* ✅ 4+ → Slider, 3 या कम → Grid */
  const getSliderSettings = (count: number) => ({
    infinite: count > 4,
    autoplay: count > 4,
    autoplaySpeed: 5000,
    centerMode: count > 4,
    centerPadding: "0px",
    dots: false,
    arrows: count > 4,
    slidesToShow: count >= 4 ? 4 : count,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1500, settings: { slidesToShow: count >= 4 ? 4 : count, centerMode: count > 4 } },
      { breakpoint: 1200, settings: { slidesToShow: Math.min(3, count), centerMode: count > 4 } },
      { breakpoint: 992, settings: { slidesToShow: Math.min(2, count), centerMode: false } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerMode: false } },
      { breakpoint: 576, settings: { slidesToShow: 1, centerMode: false } },
    ],
  });

  return (
    <div className="container-fluid w-95 my-2">
      {/* Header
      <div className="text-center mb-1 bg-light shadow-sm p-3">
        <h4 className="fw-bold mb-2">
          <i className="fa fa-leaf text-success me-2"></i>
          All Makhana 
        </h4>
        <p className="text-muted mb-2 fs-6">
          Pure, organic Makhana — for every need
        </p>
        <span className="badge bg-success py-2 px-3">
          {visibleProducts} Products • {filteredGroups.length} Categories
        </span>
      </div>  */}

      {/* Search + Filter + Sort */}
      <div className="card border-0 shadow-sm bg-light p-3 my-4">
        <div className="row g-3">
          <div className="col-lg-6">
            <label className="form-label small fw-bold text-muted mb-1">
              <i className="fa fa-search me-1"></i> Search Products
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
                <button className="btn btn-outline-secondary" onClick={() => setSearchQuery("")}>
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
              <option value="ALL">All Categories ({totalProducts})</option>
              {categoryGroups.map((g) => (
                <option key={g.parent} value={g.parent}>
                  {g.parent} ({g.items.length})
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
      </div>

      {/* Category Groups */}
      {filteredGroups.length === 0 ? (
        <div className="text-center py-5">
          <i className="fa fa-inbox fa-4x text-muted mb-3"></i>
          <h4 className="text-muted">No products found</h4>
        </div>
      ) : (
        filteredGroups.map((group) => (
          <div key={group.parent} className="mb-5 mt-3">
            {/* Title + View All */}
            <div className="p-3 shadow-sm bg-gray">
              <div className="section-title text-left position-relative pb-2 mb-2 mx-auto">
                <Link href={`/Products/${group.slug}`} className="text-primary text-decoration-none float-end btn btn-outline-warning btn-sm border-1 fs-7" > See all
                </Link>
                <h6 className="fw-bold text-primary text-uppercase fs-7">
                  <i className="fa fa-fire text-danger me-1"></i>
                  {group.parent}
                </h6>
                <h5 className="fw-bold mb-0">{group.parent} Collection</h5>
                <p className="text-muted mb-0 fs-7">
                  {group.children.length > 0
                    ? group.children.join(" • ")
                    : `Premium ${group.parent} — pure & organic`}
                </p>
              </div>
            </div>

            {/* 4+ → Slider, else Grid */}
            {group.items.length > 3 ? (
              <Slider {...getSliderSettings(group.items.length)}>
                {group.items.map((product) => (
                  <div className="px-1" key={product.id}>
                    <ProductCard product={product} onAdd={() => addToCart(product)}
                     onView={() => setSelectedProduct(product)} calcFinal={calcFinal} parsePrice={parsePrice} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className={`row g-3 ${group.items.length < 4 ? "justify-content-center" : ""}`}>
                {group.items.map((product) => (
                  <div
                    key={product.id}
                    className={
                      group.items.length === 1
                        ? "col-lg-3 col-md-6 col-sm-12"
                        : group.items.length === 2
                        ? "col-lg-4 col-md-6 col-sm-12"
                        : group.items.length === 3
                        ? "col-lg-4 col-md-6 col-sm-12"
                        : "col-lg-3 col-md-4 col-sm-6"
                    }
                  >
                    <ProductCard
                      product={product}
                      onAdd={() => addToCart(product)}
                      onView={() => setSelectedProduct(product)}
                      calcFinal={calcFinal}
                      parsePrice={parsePrice}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}

      {selectedProduct && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
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
                      src={selectedProduct.pic ? `/assets/images/${selectedProduct.pic}` : FALLBACK_IMG}
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
                          <span
                            key={i}
                            className="fs-5 fw-bold"
                            style={{
                              color: i < Number(selectedProduct.rating || 0) ? "#ffc107" : "#556292d0",
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
                          <span className="badge bg-success">In Stock ({selectedProduct.stock})</span>
                        ) : (
                          <span className="badge bg-danger">Out of Stock</span>
                        )}
                      </li>
                      <li className="list-group-item fw-bold">
                        <strong>Price:</strong> ₹{calcFinal(selectedProduct.price, selectedProduct.discount).toFixed(2)}
                        {selectedProduct.discount && Number(selectedProduct.discount) > 0 && (
                          <span className="text-danger ms-2" style={{ textDecoration: "line-through" }}>
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
}

function ProductCard({
  product,
  onAdd,
  onView,
  calcFinal,
  parsePrice,
}: {
  product: Product;
  onAdd: () => void;
  onView: () => void;
  calcFinal: (p?: string, d?: string) => number;
  parsePrice: (p?: string) => number;
}) {
  return (
    <div className="blog-item bg-light rounded overflow-hidden shadow-md bordered h-100 d-flex flex-column">
      <div className="blog-img position-relative overflow-hidden shadow-lg">
        <Link href={`/Products/${product.slug || product.id}`}>
          <img
            src={product.pic ? `/assets/images/${product.pic}` : FALLBACK_IMG}
            className="img-fluid rounded-3 border w-100 border border-warning"
            alt={product.name}
            style={{ height: "200px", objectFit: "cover" }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMG;
            }}
          />
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
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <span className="badge bg-danger fs-6">Out of Stock</span>
            </div>
          )}
        </Link>
      </div>

      {/* Title + Description + Rating + Price */}
      <div className="py-2 px-2 text-left flex-grow-1">
        <h6 className="card-title text-dark mb-1">
          {product.name && product.name.length > 30
            ? product.name.slice(0, 30) + "..."
            : product.name}
        </h6>
        <p className="card-text m-0 pt-0 text-dark fs-7">
          {product.description
            ? product.description.length > 30
              ? product.description.slice(0, 30) + "..."
              : product.description
            : "Pure & Organic Makhana"}
        </p>

        <div className="d-flex align-items-center justify-content-between flex-wrap gap-1 mt-2">
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

          {/* Price */}
          <div className="d-flex align-items-center gap-1">
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
            <strong className="text-success fs-6 mb-0">
              ₹{new Intl.NumberFormat("en-IN").format(calcFinal(product.price, product.discount))}
            </strong>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="card-body pb-3 d-flex gap-2 pt-0">
        <button
          className="btn btn-outline-secondary w-50 btn-sm"
          disabled={Number(product.stock) <= 0}
          onClick={onAdd}
        >
          <i className="fa fa-cart-plus me-1"></i> Add
        </button>
        <button className="btn btn-outline-primary w-50 btn-sm" onClick={onView}>
          <i className="fa fa-eye me-1"></i> View Now
        </button>
      </div>
    </div>
  );
}