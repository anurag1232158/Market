// src/app/(WebPage)/(UserPage)/Cart/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f0f0f0' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' font-size='10' fill='%23999' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

interface CartItem {
  id: string;
  name: string;
  pic?: string;
  price?: string;
  discount?: string;
  quantity: number;
  category?: string;
  weight?: string;
  slug?: string;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("authUser_user") || "null");
    if (!authUser) {
      router.replace("/Login?redirect=/Cart");
      return;
    }
    setIsLoggedIn(true);
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(Array.isArray(stored) ? stored : []);
  }, [router]);

  const parsePrice = (price?: string) =>
    price ? parseFloat(price.replace(/,/g, "")) : 0;
  const calcFinal = (price?: string, discount?: string) => {
    const p = parsePrice(price);
    const d = discount ? parseFloat(discount) : 0;
    return Math.round(p - (p * d) / 100);
  };

  const updateQty = (id: string, type: "INC" | "DEC") => {
    let updated = cart.map((item) => {
      if (item.id === id) {
        if (type === "INC")
          return { ...item, quantity: (item.quantity || 1) + 1 };
        if (type === "DEC")
          return { ...item, quantity: (item.quantity || 1) - 1 };
      }
      return item;
    });
    updated = updated.filter((item) => item.quantity > 0);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id: string) => {
    if (!window.confirm("Are you sure you want to remove this item from your cart?")) return;
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    if (updated.length === 0) localStorage.removeItem("cart");
    else localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const clearCart = () => {
    if (!window.confirm("Are you sure you want to clear the entire cart?")) return;
    setCart([]);
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleCheckout = () => {
    const authUser = JSON.parse(localStorage.getItem("authUser_user") || "null");
    if (!authUser) {
      router.push("/Login?redirect=/Checkout");
      return;
    }
    router.push("/Checkout");
  };

  const subtotal = cart.reduce(
    (s, item) => s + calcFinal(item.price, item.discount) * item.quantity,
    0
  );
  const totalMRP = cart.reduce(
    (s, item) => s + parsePrice(item.price) * item.quantity,
    0
  );
  const totalDiscount = totalMRP - subtotal;
  const shipping = subtotal >= 500 ? 0 : 50;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + taxes;

  if (!isLoggedIn) {
    return (
      <div className="container my-5 text-center py-5">
        <div className="spinner-border text-success"></div>
        <p className="mt-2 text-muted">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <>
      <section className="bg-success text-white py-4">
        <div className="container-fluid w-95">
          <h4 className="fw-bold mb-1">
            <i className="fa fa-shopping-cart me-2"></i>
            Shopping Cart
          </h4>
          <p className="mb-0 mx-2 opacity-75">
            {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container-fluid w-95">
          {cart.length === 0 ? (
            <div className="text-center py-3">
              <i className="fa fa-shopping-cart fa-5x text-muted mb-3"></i>
              <h5 className="text-muted">Your cart is empty</h5>
              <p className="text-muted mb-3">You haven't added anything yet</p>
              <Link href="/AllCategorys" className="btn btn-success btn-sm">
                <i className="fa fa-shopping-bag me-2"></i>
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-8 mb-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-sm table-bordered align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Product</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Qty</th>
                            <th className="text-center">Total</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((item) => {
                            const finalPrice = calcFinal(item.price, item.discount);
                            return (
                              <tr key={item.id}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link href={`/Products/${item.slug || item.id}`}>
                                      <img
                                        src={item.pic ? `/assets/images/${item.pic}` : FALLBACK_IMG}
                                        alt={item.name}
                                        style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                        className="rounded border"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).src = FALLBACK_IMG;
                                        }}
                                      />
                                    </Link>
                                    <div className="ms-3">
                                      <Link
                                        href={`/Products/${item.slug || item.id}`}
                                        className="text-decoration-none"
                                      >
                                        <h6 className="fw-bold text-dark mb-1">{item.name}</h6>
                                      </Link>
                                      <small className="text-muted d-block">{item.category}</small>
                                      {item.weight && (
                                        <small className="text-muted">
                                          <i className="fa fa-weight-hanging me-1"></i>
                                          {item.weight}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="text-center">
                                  <strong className="text-success">₹{finalPrice}</strong>
                                  {item.discount && Number(item.discount) > 0 && (
                                    <del className="text-muted d-block" style={{ fontSize: "12px" }}>
                                      ₹{item.price}
                                    </del>
                                  )}
                                </td>
                                <td className="text-center">
                                  <div
                                    className="input-group input-group-sm mx-auto"
                                    style={{ width: "120px" }}
                                  >
                                    <button
                                      className="btn btn-outline-secondary"
                                      onClick={() => updateQty(item.id, "DEC")}
                                    >
                                      <i className="fa fa-minus"></i>
                                    </button>
                                    <input
                                      type="text"
                                      className="form-control text-center"
                                      value={item.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="btn btn-outline-secondary"
                                      onClick={() => updateQty(item.id, "INC")}
                                    >
                                      <i className="fa fa-plus"></i>
                                    </button>
                                  </div>
                                </td>
                                <td className="text-center fw-bold">
                                  ₹{finalPrice * item.quantity}
                                </td>
                                <td className="text-center">
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeItem(item.id)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-footer bg-white">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                      <Link href="/AllCategorys" className="btn btn-outline-success">
                        <i className="fa fa-arrow-left me-1"></i>
                        Continue Shopping
                      </Link>
                      <button className="btn btn-outline-danger" onClick={clearCart}>
                        <i className="fa fa-trash me-1"></i>
                        Clear Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card shadow-sm border sticky-top" style={{ top: "100px" }}>
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">
                      <i className="fa fa-receipt me-2 text-success"></i>
                      Order Summary
                    </h5>

                    <ul className="list-group list-group-flush mb-3">
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Total MRP</span>
                        <strong>₹{totalMRP}</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between text-success">
                        <span>Discount</span>
                        <strong>- ₹{totalDiscount}</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Subtotal</span>
                        <strong>₹{subtotal}</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Shipping</span>
                        <strong>
                          {shipping === 0 ? (
                            <span className="text-success">FREE</span>
                          ) : (
                            `₹${shipping}`
                          )}
                        </strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Taxes (5%)</span>
                        <strong>₹{taxes}</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between bg-light">
                        <span className="fw-bold">Total Amount</span>
                        <strong className="text-success fs-5">₹{total}</strong>
                      </li>
                    </ul>

                    {shipping > 0 && (
                      <div className="alert alert-info small mb-3">
                        <i className="fa fa-info-circle me-1"></i>
                        Add ₹{500 - subtotal} more for FREE shipping
                      </div>
                    )}

                    <button className="btn btn-success w-100 py-2" onClick={handleCheckout}>
                      <i className="fa fa-credit-card me-2"></i>
                      Proceed to Checkout
                    </button>

                    <p className="text-muted small text-center mt-3 mb-0">
                      <i className="fa fa-lock me-1"></i>
                      Secure Payment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}