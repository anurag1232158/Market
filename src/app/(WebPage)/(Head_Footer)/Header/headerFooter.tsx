// src/app/(WebPage)/(Head_Footer)/Header/headerFooter.tsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CategoryItem {
  name: string;
  slug: string;
  parent: string;
  route: string;
}

interface CategoryGroup {
  parent: string;
  slug: string;
  route: string;
  children: CategoryItem[];
}

const HeaderFooter = () => {
  const router = useRouter();
  const [locationSearch, setLocationSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.category || [];
        const active = list.filter((c: any) => c.status === "Active");
        const parentCats = active.filter( (c: any) => !c.parent || c.parent.trim() === "",);
        const childCats = active.filter(  (c: any) => c.parent && c.parent.trim() !== "",);
        const groups: CategoryGroup[] = parentCats.map((parent: any) => {
          const children: CategoryItem[] = childCats
            .filter((c: any) => c.parent.trim() === parent.name.trim())
            .map((c: any) => ({
              name: c.name,
              slug: c.slug,
              parent: parent.name,
              route: `/Products/${c.slug}`,
            }));

          return {
            parent: parent.name,
            slug: parent.slug,
            route: `/Products/${parent.slug}`,
            children,
          };
        });
        setCategoryGroups(groups);
      })
      .catch((err) => console.error("Category fetch error:", err));
  }, []);
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartCount(Array.isArray(cart) ? cart.length : 0);
      } catch {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const closeNavbar = () => {
    const navbar = document.getElementById("navbarCollapse");
    if (navbar && navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };
  const handleProductSearch = () => {
    if (productSearch.trim()) {
      router.push(
        `/Products?search=${encodeURIComponent(productSearch.trim())}`,
      );
      closeNavbar();
    }
  };
  const handleLocationSearch = () => {
    if (locationSearch.trim()) {
      router.push(
        `/Products?city=${encodeURIComponent(locationSearch.trim())}`,
      );
      closeNavbar();
    }
  };

  return (
    <header className="section">
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-sm-fixed-top px-md-5 py-lg-0 p-3">
          <Link href="/" className="navbar-brand p-0">
            <h2 className="m-0 text-white">
              <i className="fa fa-leaf text-success me-2"></i> M
              <span className="text-success text-decoration-underline"> S</span>
            </h2>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"> 
           <span className="fa fa-bars"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav py-0 px-3">
              <Link href="/Products" className="nav-item nav-link" onClick={closeNavbar}> Products </Link>
              <Link href="/AllCategorys" className="nav-item nav-link" onClick={closeNavbar}> Categories </Link>
              <Link href="/About" className="nav-item nav-link" onClick={closeNavbar}> About </Link>
              <Link href="/Contact" className="nav-item nav-link" onClick={closeNavbar}> Contact </Link>
            </div>

            <div className="w-100 p-1 text-center">
              <div className="input-group w-100">
                <input type="text" placeholder="🔍 Search by city..." value={locationSearch} className="form-control"
                  onChange={(e) => setLocationSearch(e.target.value)}
                  onKeyDown={(e) => {if (e.key === "Enter") handleLocationSearch();  }}/>
                <button className="btn btn-success" type="button" onClick={handleLocationSearch}> 
                 <i className="fa fa-map-marker-alt me-1"></i> Search
                </button>
              </div>
            </div>

            <div className="w-100 p-1 text-center">
              <div className="input-group w-100">
                <select className="form-select" value={selectedCategory}
                  onChange={(e) => { closeNavbar(); const selectedRoute = e.target.value; setSelectedCategory(selectedRoute);
                    router.push(  selectedRoute === "ALL" ? "/Products" : selectedRoute,);
                   }} style={{ maxWidth: "220px" }} >
                  <option value="ALL">🌿 All Categories</option>

                  {categoryGroups.map((group) => (
                    <optgroup key={group.parent} label={group.parent}>
                      <option value={group.route}>All {group.parent}</option>
                      {group.children.map((child) => (
                        <option key={child.slug} value={child.route}>
                         {child.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>

                <input
                  type="text"
                  className="form-control"
                  placeholder="🔍 Search Makhana..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleProductSearch();
                  }}
                />

                <button
                  className="btn btn-success"
                  type="button"
                  onClick={handleProductSearch}
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 ms-3 py-2">
              <Link href="/Cart" className="btn btn-outline-light position-relative" onClick={closeNavbar}>
                <i className="fa fa-shopping-cart"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                   style={{ fontSize: "10px" }}> {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" 
               className="btn btn-outline-success" onClick={closeNavbar} title="WhatsApp"> 
               <i className="fa fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderFooter;
