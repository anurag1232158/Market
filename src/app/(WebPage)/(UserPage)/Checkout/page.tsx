// src/app/(WebPage)/(UserPage)/Checkout/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  name: string;
  price?: string;
  discount?: string;
  quantity: number;
  pic?: string;
  category?: string;
  weight?: string;
}

interface Address {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  isDefault?: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    address: "",
    city: "",
    state: "Bihar",
    paymentMethod: "cod",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(Array.isArray(storedCart) ? storedCart : []);
    const authUser = JSON.parse(localStorage.getItem("authUser_user") || "null");
    if (!authUser) {
      router.replace("/Login?redirect=/Checkout");
      return;
    }
    setIsLoggedIn(true);
    const savedAddresses: Address[] = authUser.addresses || [];
    if (authUser.address && authUser.pin) {
      const defaultAddr: Address = {
        id: "default",
        name: authUser.name || "",
        email: authUser.email || "",
        phone: authUser.number || "",
        address: authUser.address || "",
        city: authUser.city || "",
        state: authUser.state || "Bihar",
        zip: authUser.pin || "",
        isDefault: true,
      };
      const exists = savedAddresses.find( (a) => a.address === defaultAddr.address && a.zip === defaultAddr.zip );
      if (!exists) {
        savedAddresses.unshift(defaultAddr);
      }
    }

    setAddresses(savedAddresses);
    if (savedAddresses.length > 0) {
      setSelectedAddressId(savedAddresses[0].id);
      const first = savedAddresses[0];
      setFormData((prev) => ({
        ...prev,
        name: first.name,
        email: first.email,
        phone: first.phone,
        address: first.address,
        city: first.city,
        state: first.state,
        zip: first.zip,
      }));
    } else {
      setIsAddingNew(true);
      setFormData((prev) => ({
        ...prev,
        name: authUser.name || "",
        email: authUser.email || "",
        phone: authUser.number || "",
      }));
    }
  }, [router]);

  const parsePrice = (price?: string) => price ? parseFloat(price.replace(/,/g, "")) : 0;
  const calcFinal = (price?: string, discount?: string) => {
  const p = parsePrice(price);
  const d = discount ? parseFloat(discount) : 0;
  return Math.round(p - (p * d) / 100); };
  const subtotal = cart.reduce((s, item) => s + calcFinal(item.price, item.discount) * item.quantity, 0 );
  const totalMRP = cart.reduce( (s, item) => s + parsePrice(item.price) * item.quantity, 0 );
  const totalDiscount = totalMRP - subtotal;
  const shipping = subtotal >= 500 ? 0 : 50;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + taxes;

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
   ) => { setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = "Name required";
    if (!formData.email.trim()) errs.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = "Invalid email";
    if (!formData.phone.trim()) errs.phone = "Phone required";
    else if (!/^[0-9]{10}$/.test(formData.phone)) errs.phone = "Enter 10-digit number";
    if (!formData.address.trim()) errs.address = "Address required";
    if (!formData.city.trim()) errs.city = "City required";
    if (!formData.zip.trim()) errs.zip = "PIN required";
    else if (!/^[0-9]{6}$/.test(formData.zip)) errs.zip = "PIN must be 6 digits";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSelectAddress = (id: string) => {
    const addr = addresses.find((a) => a.id === id);
    if (!addr) return;
    setSelectedAddressId(id);
    setFormData((prev) => ({
      ...prev,
      name: addr.name,
      email: addr.email,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
    }));
    setIsAddingNew(false);
    setEditingAddressId("");
  };

  const handleSaveAddress = () => {
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (editingAddressId) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddressId
            ? {
                ...a,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zip: formData.zip,
              }
            : a
        )
      );
      setSelectedAddressId(editingAddressId);
      setEditingAddressId("");
    } else {
      const newAddr: Address = {
        id: "addr-" + Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
      };
      setAddresses((prev) => [...prev, newAddr]);
      setSelectedAddressId(newAddr.id);
    }
    setIsAddingNew(false);
  };

  const handleDeleteAddress = (id: string) => {
    if (!window.confirm("Delete this address?")) return;
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedAddressId === id && addresses.length > 1) {
      const remaining = addresses.filter((a) => a.id !== id);
      handleSelectAddress(remaining[0].id);
    }
  };

  const handleEditAddress = (addr: Address) => {
    setFormData((prev) => ({
      ...prev,
      name: addr.name,
      email: addr.email,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
    }));
    setEditingAddressId(addr.id);
    setIsAddingNew(true);
  };

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault();
    const authUser = JSON.parse(localStorage.getItem("authUser_user") || "null");
    if (!authUser) {
      router.replace("/Login?redirect=/Checkout");
      return;
    }
    if (!validate()) {
      setIsAddingNew(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!window.confirm("Are you sure you want to place this order?")) return;
    setSubmitting(true);

    const orderData = {
      id: "ORD-" + Date.now().toString().slice(-8),
      orderNo: "ORD-" + Date.now().toString().slice(-6),
      orderDate: new Date().toISOString().split("T")[0],
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerType: "Retail",
      shippingAddress: formData.address,
      shippingCity: formData.city,
      shippingState: formData.state,
      shippingPin: formData.zip,
      shippingCountry: "India",
      items: JSON.stringify(
        cart.map((item) => ({
          name: item.name,
          qty: item.quantity,
          price: calcFinal(item.price, item.discount),
          pic: item.pic,
        }))
      ),
      subtotal: String(subtotal),
      discount: String(totalDiscount),
      tax: String(taxes),
      shippingCharge: String(shipping),
      totalAmount: String(total),
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentMethod === "cod" ? "Pending" : "Paid",
      orderStatus: "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        localStorage.setItem("orderData", JSON.stringify(orderData));
        localStorage.setItem("justPlaced", "true");
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));

        alert(`✅ Order placed successfully! Order No: ${orderData.orderNo}`);
        router.replace("/PlaceOrder");
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Order failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  if (!isLoggedIn) return null;
  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center py-5">
        <i className="fa fa-shopping-cart fa-4x text-muted mb-3"></i>
        <h3>Your cart is empty</h3>
        <Link href="/AllCategorys" className="btn btn-success mt-3">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-success text-white py-3">
        <div className="container-fluid w-95">
          <h4 className="fw-bold mb-1"> <i className="fa fa-credit-card me-2"></i> Checkout </h4>
          <p className="mb-0 opacity-75 fs-7">Fill in your details and place your order</p>
        </div>
      </section>
      <section className="py-5">
        <div className="container-fluid w-95">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* LEFT — Shipping Addresses */}
              <div className="col-lg-7 mb-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0">
                       <i className="fa fa-map-marker-alt me-2 text-success"></i> Shipping Address</h5>
                      {!isAddingNew && (
                        <button type="button" className="btn btn-sm btn-outline-success"
                          onClick={() => { setIsAddingNew(true); setEditingAddressId("");
                           setFormData((prev) => ({ ...prev, name: "", phone: "", address: "", city: "", state: "Bihar", zip: "", }));}}>
                          <i className="fa fa-plus me-1"></i> Add New
                        </button>
                      )}
                    </div>

                    {!isAddingNew && addresses.length > 0 && (
                      <div className="mb-3">
                        {addresses.map((addr) => (
                          <div key={addr.id}
                            className={`border rounded p-3 mb-2 ${
                              selectedAddressId === addr.id
                                ? "border-success bg-light"
                                : ""
                            }`}>
                            <div className="d-flex justify-content-between align-items-start">
                              <label className="d-flex align-items-start mb-0 flex-grow-1 cursor-pointer">
                                <input type="radio" name="selectedAddress" checked={selectedAddressId === addr.id} onChange={() => handleSelectAddress(addr.id)} className="form-check-input me-2 mt-1" />
                                <div>
                                  <div className="">
                                    <strong>{addr.name}</strong>
                                    {addr.isDefault && (
                                      <span className="badge bg-success ms-2" style={{ fontSize: "10px" }}>
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <small className="text-muted d-block">
                                    {addr.address}, {addr.city}, {addr.state} - {addr.zip}
                                  </small>
                                  <small className="text-muted d-block">
                                    <i className="fa fa-phone me-1"></i> {addr.phone}
                                    {" • "}
                                    <i className="fa fa-envelope me-1"></i> {addr.email}
                                  </small>
                                </div>
                              </label>
                              <div className="d-flex gap-1">
                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleEditAddress(addr)} title="Edit"
                                > <i className="fa fa-edit"></i>
                                </button>
                                {!addr.isDefault && ( <button   type="button"   className="btn btn-sm btn-outline-danger"   onClick={() => handleDeleteAddress(addr.id)}   title="Delete" >   <i className="fa fa-trash"></i> </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          className="btn btn-outline-success btn-sm w-100 mt-2"
                          onClick={() => {
                            setIsAddingNew(true);
                            setEditingAddressId("");
                            setFormData((prev) => ({
                              ...prev,
                              name: "",
                              phone: "",
                              address: "",
                              city: "",
                              state: "Bihar",
                              zip: "",
                            }));
                          }}
                        >
                          <i className="fa fa-plus me-1"></i> Add Another Address
                        </button>
                      </div>
                    )}

                    {isAddingNew && (
                      <div className="border rounded p-4 bg-light">
                        <h6 className="fw-bold mb-3">
                          {editingAddressId ? "Edit Address" : "Add New Address"}
                        </h6>

                        <div className="row g-2">
                          <div className="col-md-6">
                            <input type="text" name="name" value={formData.name} onChange={handleChange} 
                             className={`form-control form-control-sm ${errors.name ? "is-invalid" : ""}`}
                             placeholder="Full name"/>
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                          </div>

                          <div className="col-md-6">
                            <input type="email" name="email" value={formData.email} onChange={handleChange}
                              className={`form-control form-control-sm ${errors.email ? "is-invalid" : ""}`}
                              placeholder="Email" />

                            {errors.email && <small className="text-danger">{errors.email}</small>}
                          </div>

                          <div className="col-md-6 my-3">
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                              maxLength={10}
                              className={`form-control form-control-sm ${errors.phone ? "is-invalid" : ""}`}
                              placeholder="10-digit mobile" />

                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                          </div>

                          <div className="col-md-6 my-3">
                            <input type="text" name="zip" value={formData.zip} onChange={handleChange} maxLength={6}
                              className={`form-control form-control-sm ${errors.zip ? "is-invalid" : ""}`}
                              placeholder="6-digit PIN" />

                            {errors.zip && <small className="text-danger">{errors.zip}</small>}
                          </div>

                          <div className="col-12">
                            <textarea name="address" value={formData.address} onChange={handleChange}
                              rows={2} className={`form-control form-control-sm ${errors.address ? "is-invalid" : ""}`}
                              placeholder="House no, street, area" />

                            {errors.address && <small className="text-danger">{errors.address}</small>}
                          </div>

                          <div className="col-md-6 my-3">
                            <input type="text" name="city" value={formData.city} onChange={handleChange}
                              className={`form-control form-control-sm ${errors.city ? "is-invalid" : ""}`}
                              placeholder="City" />
                            {errors.city && <small className="text-danger">{errors.city}</small>}
                          </div>

                          <div className="col-md-6 my-3">
                            <select name="state" value={formData.state} onChange={handleChange} className="form-select form-select-sm">
                              {["Bihar", "Delhi", "UP", "Maharashtra", "West Bengal", "Other"].map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>

                          <div className="col-12 d-flex gap-2 mt-2">
                            <button type="button" className="btn btn-success btn-sm w-50" onClick={handleSaveAddress}>
                              <i className="fa fa-save me-1"></i>
                              {editingAddressId ? "Update" : "Save Address"}
                            </button>
                            <button type="button" className="btn btn-outline-secondary btn-sm w-50"
                              onClick={() => { setIsAddingNew(false);
                                setEditingAddressId("");
                                setErrors({});
                                if (addresses.length > 0) {
                                  handleSelectAddress(selectedAddressId);
                                }
                              }}>
                              <i className="fa fa-times me-1"></i> Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Payment Method */}
                    <h5 className="fw-bold mt-4 mb-3">
                      <i className="fa fa-money-bill me-2 text-success"></i>
                      Payment Method
                    </h5>

                    <div className="border rounded p-3 mb-2">
                      <label className="d-flex align-items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === "cod"}
                          onChange={handleChange}
                          className="form-check-input me-2"
                        />
                        <div>
                          <strong>Cash on Delivery (COD)</strong>
                          <small className="d-block text-muted">Pay when you receive the product</small>
                        </div>
                      </label>
                    </div>

                    <div className="border rounded p-3 mb-2 opacity-50">
                      <label className="d-flex align-items-center">
                        <input type="radio" name="paymentMethod" value="online" disabled className="form-check-input me-2" />
                        <div>
                          <strong>Pay Online</strong>
                          <small className="d-block text-muted">Coming soon</small>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT — Order Summary (Same as before) */}
              <div className="col-lg-5">
                <div className="card shadow-sm border">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">
                      <i className="fa fa-receipt me-2 text-success"></i>
                      Order Summary
                    </h5>

                    <div className="table-responsive mb-3">
                      <table className="table table-sm table-bordered align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Product</th>
                            <th className="text-center">Qty</th>
                            <th className="text-end">Price</th>
                            <th className="text-end">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((item) => {
                            const fp = calcFinal(item.price, item.discount);
                            return (
                              <tr key={item.id}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    {item.pic && (
                                      <img
                                        src={`/assets/images/${item.pic}`}
                                        alt={item.name}
                                        width="36"
                                        height="36"
                                        className="rounded me-2"
                                        style={{ objectFit: "cover" }}
                                      />
                                    )}
                                    <small className="fw-bold">{item.name?.slice(0, 22)}</small>
                                  </div>
                                </td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-end">₹{fp}</td>
                                <td className="text-end">
                                  <strong className="text-success">₹{fp * item.quantity}</strong>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <table className="table table-bordered table-sm mb-3">
                      <tbody>
                        <tr>
                          <td>Subtotal</td>
                          <td className="text-end"><strong>₹{subtotal}</strong></td>
                        </tr>
                        {totalDiscount > 0 && (
                          <tr className="text-success">
                            <td>Discount</td>
                            <td className="text-end"><strong>- ₹{totalDiscount}</strong></td>
                          </tr>
                        )}
                        <tr>
                          <td>Shipping</td>
                          <td className="text-end">
                            <strong>
                              {shipping === 0 ? <span className="text-success">FREE</span> : `₹${shipping}`}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Taxes (5%)</td>
                          <td className="text-end"><strong>₹{taxes}</strong></td>
                        </tr>
                        <tr className="table-light">
                          <td className="fw-bold">Total</td>
                          <td className="text-end">
                            <strong className="text-success fs-5">₹{total}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <button type="submit" className="btn btn-success w-100 py-2" disabled={submitting}>
                      {submitting ? (
                        <>
                          <i className="fa fa-spinner fa-spin me-2"></i>
                          Placing Order...
                        </>
                      ) : (
                        <>
                          <i className="fa fa-check-circle me-2"></i>
                          Place Order (₹{total})
                        </>
                      )}
                    </button>

                    <p className="text-muted small text-center mt-3 mb-0">
                      <i className="fa fa-lock me-1"></i>
                      Your information is secure
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}