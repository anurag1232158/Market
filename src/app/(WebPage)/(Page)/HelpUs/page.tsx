// src/app/(WebPage)/(Page)/HelpUs/page.tsx
"use client";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";

export default function HelpUs() {
  const [settings, setSettings] = useState<any>({});
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/setting")
      .then((r) => r.json())
      .then((res) => setSettings(res?.setting || res || {}))
      .catch(() => {});
  }, []);

  const quickLinks = [
    { id: 1, icon: "📩", title: "Contact Support", describe: "Get in touch with our team", href: "/Contact" },
    { id: 2, icon: "📝", title: "Give Feedback", describe: "Share your thoughts with us", href: "/Feedback" },
    { id: 3, icon: "📜", title: "View Terms", describe: "Read our terms & conditions", href: "/Terms" },
    { id: 4, icon: "🔒", title: "Privacy Policy", describe: "Understand how we protect data", href: "/Privacy" },
    { id: 5, icon: "🛍️", title: "Shop Products", describe: "Browse our Makhana products", href: "/Products" },
    { id: 6, icon: "📦", title: "Track Order", describe: "Track your shipment", href: "/OrderTrack" },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const postData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs: { [key: string]: string } = {};
    if (!data.name.trim()) errs.name = "Name is required";
    if (!data.email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) errs.email = "Enter valid email";
    if (!data.phone.trim()) errs.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(data.phone)) errs.phone = "Enter valid 10-digit number";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contactUs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          number: `${data.countryCode}${data.phone}`,
          type: "Contact",
          source: "Website",
          subject: "Help Us Form Submission",
          priority: "Medium",
          status: "New",
          createdAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        alert("✅ Message sent successfully! We'll get back to you soon.");
        setData({ name: "", email: "", phone: "", countryCode: "+91", message: "" });
      } else {
        alert("❌ Failed to submit message.");
      }
    } catch (err) {
      console.error("Submit failed:", err);
      alert("❌ Error submitting message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gray py-4">
      <div className="container">
        {/* ===================== HELP HEADER ===================== */}
        <div className="text-left mb-2">
          <h2 className="fw-bold">Help Us </h2>
          <p className="text-muted mb-0">
            कोई भी सवाल, order enquiry या feedback — हमें बताएँ! हम आपकी मदद के लिए हमेशा तैयार हैं।
          </p>
        </div>

        <div className="row g-3">
          {/* ===================== FORM ===================== */}
          <div className="col-lg-7">
            <div className="bg-white shadow-md rounded p-3 p-lg-4 h-100">
             <div className="section-title text-left position-relative pb-1 mb-4 mx-auto">
              <h4 className="fw-bold text-dark">Contact Us</h4>
              </div>
              <form onSubmit={postData} autoComplete="off">
                {/* Name */}
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fa fa-user text-warning"></i>
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      className="form-control"
                    />
                  </div>
                  {errors.name && <p className="text-danger small mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fa fa-envelope text-warning"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className="form-control"
                    />
                  </div>
                  {errors.email && <p className="text-danger small mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fa fa-phone text-warning"></i>
                    </span>
                    <select
                      name="countryCode"
                      value={data.countryCode}
                      onChange={handleChange}
                      className="form-select"
                      style={{ maxWidth: "100px" }}
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+971">🇦🇪 +971</option>
                    </select>
                    <input
                      type="text"
                      name="phone"
                      value={data.phone}
                      onChange={handleChange}
                      placeholder="Enter 10-digit phone"
                      className="form-control"
                      maxLength={10}
                    />
                  </div>
                  {errors.phone && <p className="text-danger small mt-1">{errors.phone}</p>}
                </div>

                {/* Message */}
                <div className="mb-3">
                  <textarea
                    name="message"
                    value={data.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Enter your message (order enquiry, feedback, etc.)"
                    className="form-control"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary px-4 w-100"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <i className="fa fa-spinner fa-spin me-2"></i> Sending...
                    </>
                  ) : (
                    <>
                      <i className="fa fa-paper-plane me-2"></i> Submit
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* ===================== CONTACT INFO ===================== */}
          <div className="col-lg-5">
            <div className="bg-white shadow-md rounded p-3 p-lg-4 h-100">
            <div className="section-title text-left position-relative pb-1 mb-4 mx-auto">
              <h4 className="fw-bold text-dark">Contact Information</h4>
              </div>
              <p className="text-muted small">
                कोई भी सवाल हो या मदद चाहिए, तो नीचे दिए details पर हमसे संपर्क करें।
              </p>

              <ul className="list-unstyled mb-0">
                {settings.contactEmail && (
                  <li className="mb-3">
                    <i className="fa fa-envelope text-primary me-2"></i>
                    <strong>Email: </strong>
                    <a href={`mailto:${settings.contactEmail}`} className="text-decoration-none">
                      {settings.contactEmail}
                    </a>
                  </li>
                )}

                {settings.contactPhone && (
                  <li className="mb-3">
                    <i className="fa fa-phone text-success me-2"></i>
                    <strong>Phone: </strong>
                    <a href={`tel:${settings.contactPhone}`} className="text-decoration-none">
                      {settings.contactPhone}
                    </a>
                  </li>
                )}

                {settings.whatsappNumber && (
                  <li className="mb-3">
                    <i className="fa fa-whatsapp text-success me-2"></i>
                    <strong>WhatsApp: </strong>
                    <a
                      href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      {settings.whatsappNumber}
                    </a>
                  </li>
                )}

                {settings.address && (
                  <li className="mb-3">
                    <i className="fa fa-location-dot text-danger me-2"></i>
                    <strong>Address: </strong>
                    {settings.address}
                  </li>
                )}

                {settings.businessHours && (
                  <li className="mb-3">
                    <i className="fa fa-clock text-warning me-2"></i>
                    <strong>Hours: </strong>
                    {settings.businessHours}
                  </li>
                )}
              </ul>

              {/* Social Links */}
              <div className="mt-3 pt-3 border-top">
                <h6 className="fw-bold mb-3">Follow Us</h6>
                <div className="d-flex gap-2">
                  {settings.facebook && (
                    <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  )}
                  {settings.instagram && (
                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-danger">
                      <i className="fa fa-instagram"></i>
                    </a>
                  )}
                  {settings.twitter && (
                    <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-info">
                      <i className="fa fa-twitter"></i>
                    </a>
                  )}
                  {settings.youtube && (
                    <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-danger">
                      <i className="fa fa-youtube"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== QUICK LINKS ===================== */}
        <div className="my-4 pb-lg-4">
            <div className="section-title text-left position-relative pb-1 mb-3 mx-auto">
            <h4 className="fw-bold text-dark">Quick Links</h4>
           </div>

          <div className="row row-cols-1 row-cols-md-3 g-3">
            {quickLinks.map((item) => (
              <div className="col" key={item.id}>
                <Link href={item.href}
                  className="d-flex flex-column bg-white align-items-center p-3 border rounded hover-effect shadow-md text-decoration-none h-100">
                  <div className="fs-1">{item.icon}</div>
                  <h6 className="fw-bold mt-2 text-dark">{item.title}</h6>
                  {item.describe && (
                    <p className="text-muted small text-center mb-0">{item.describe}</p>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ===================== FAQ ===================== */}
        <div className="my-4">
          <div className="section-title text-left position-relative pb-1 mb-4 mx-auto">
            <h4 className="fw-bold text-dark">Frequently Asked Questions</h4>
           </div>
          <p className="text-muted small mb-3">किसी भी सवाल पर click करके जवाब देखें।</p>

          <div className="accordion shadow-sm" id="faqAccordion">
            {/* Q1 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                  <i className="fa fa-leaf text-success me-2"></i>
                  क्या आपका Makhana 100% organic है?
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-muted">
                  हाँ! हमारा सारा Makhana 100% organic, FSSAI certified, और सीधे बिहार के किसानों से sourced है। कोई chemical नहीं, कोई preservative नहीं — सिर्फ शुद्ध, natural Makhana।
                </div>
              </div>
            </div>

            {/* Q2 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                  <i className="fa fa-truck text-primary me-2"></i>
                  Order कब तक deliver हो जाएगा?
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-muted">
                  पूरे भारत में 3-5 business days में delivery होती है। Metro cities में 2-3 days, और remote areas में 5-7 days लग सकते हैं। Tracking link SMS और email पर मिलेगा।
                </div>
              </div>
            </div>

            {/* Q3 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                  <i className="fa fa-rotate-left text-warning me-2"></i>
                  Return / Refund policy क्या है?
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-muted">
                  Delivery के 7 दिनों के अंदर अगर product damaged या गलत है, तो आप return कर सकते हैं। refund 5-7 days में process हो जाता है। <Link href="/Terms">Terms</Link> page पर पूरी details हैं।
                </div>
              </div>
            </div>

            {/* Q4 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                  <i className="fa fa-credit-card text-info me-2"></i>
                  कौन-कौन से payment methods accept करते हैं?
                </button>
              </h2>
              <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-muted">
                  हम accept करते हैं: UPI (GPay, PhonePe, Paytm), Debit/Credit Cards, Net Banking, और Cash on Delivery (COD)। सारे payments 100% secure हैं।
                </div>
              </div>
            </div>

            {/* Q5 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFive">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive">
                  <i className="fa fa-truck text-success me-2"></i>
                  Free shipping कब मिलती है?
                </button>
              </h2>
              <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-muted">
                  ₹500+ के orders पर FREE shipping। इससे कम के orders पर flat ₹50 shipping charge।
                </div>
              </div>
            </div>

            {/* Q6 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingSix">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix">
                  <i className="fa fa-boxes text-primary me-2"></i>
                  Wholesale / Bulk order कैसे करें?
                </button>
              </h2>
              <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-muted">
                  Bulk orders (10kg+) के लिए special wholesale rates हैं। हमें {settings.contactPhone || "+91 98765 43210"} पर call करें या {settings.contactEmail || "info@makhanastore.com"} पर email करें।
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}