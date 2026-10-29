// src/app/(WebPage)/(Page)/Contact/page.tsx
"use client";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
export default function ContactPage() {
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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
    else if (!/^\S+@\S+\.\S+$/.test(data.email))
      errs.email = "Enter valid email";
    if (!data.phone.trim()) errs.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(data.phone))
      errs.phone = "Enter valid 10-digit number";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/contactUs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          countryCode: data.countryCode,
          number: `${data.countryCode}${data.phone}`,
          message: data.message,
          type: "Contact",
          source: "Website",
          subject: "Contact Form Submission",
          priority: "Medium",
          status: "New",
          createdAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        alert("✅ Message sent successfully! We'll reply within 24 hours.");
        setData({
          name: "",
          email: "",
          phone: "",
          countryCode: "+91",
          message: "",
        });
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
    <>
      {/* CONTACT FORM + INFO CARDS */}
      <section className="bg-gray pt-5">
        <div className="container">
          <div className="text-Left mb-4">
            <div className="section-title text-left position-relative pb-1 mb-2 mx-auto">
              <h3 className="fw-bold">Contact Us</h3>
            </div>
            <p className="lead text-muted fs-6">
              कोई भी सवाल, order enquiry, या feedback — हमें बताएँ! ह 24 घंटे
              में reply करते हैं।
            </p>
          </div>

          <div className="row">
            {/* Contact Form */}
            <div className="col-lg-7 bg-white shadow p-2 p-lg-5 pt-4">
              <div className="section-title text-left position-relative pb-1 mb-4 mx-auto">
                <h4 className="fw-bold text-dark">Get In Touch</h4>
              </div>
              <form onSubmit={postData} autoComplete="off">
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="form-control bg-body"
                  />
                  {errors.name && (
                    <p className="text-danger small mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="form-control"
                  />
                  {errors.email && (
                    <p className="text-danger small mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="mb-4">
                  <div className="input-group">
                    <select
                      name="countryCode"
                      value={data.countryCode}
                      onChange={handleChange}
                      className="form-select"
                      style={{ maxWidth: "120px" }}
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
                  {errors.phone && (
                    <p className="text-danger small mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="mb-4">
                  <textarea
                    name="message"
                    value={data.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="अपना message लिखें (order, product, ya feedback)"
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
                      {" "}
                      <i className="fa fa-solid fa-spinner fa-spin me-2"></i>{" "}
                      Sending...
                    </>
                  ) : (
                    <>
                      {" "}
                      <i className="fa fa-solid fa-paper-plane me-2"></i> Submit
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Info Cards */}
            <div className="col-lg-5">
              <div className="d-flex flex-column gap-3">
                <div className="border rounded p-3 shadow bg-white hover-effect">
                  <h6 className="fw-semibold text-dark">
                    <i className="fa fa-solid fa-circle-question text-primary me-2"></i>
                    Need help?
                  </h6>
                  <p className="mb-1 text-muted small">
                    Order, delivery, ya product के बारे में कोई भी सवाल?
                  </p>
                  <Link
                    href="/HelpUs"
                    className="small text-decoration-none text-primary"
                  >
                    Open Help Center →
                  </Link>
                </div>

                <div className="border rounded p-3 shadow bg-white hover-effect">
                  <h6 className="fw-semibold text-dark">
                    <i className="fa fa-solid fa-envelope text-danger me-2"></i>
                    Still facing issues?
                  </h6>
                  <p className="mb-0 text-muted small">
                    Email us at{" "}
                    <strong>
                      {settings.contactEmail || "info@makhanastore.com"}
                    </strong>{" "}
                    — we'll respond within 24-48 hours.
                  </p>
                </div>

                <div className="border rounded p-3 shadow bg-white hover-effect">
                  <h6 className="fw-semibold text-dark">
                    <i className="fa fa-solid fa-boxes-stacked text-warning me-2"></i>
                    Wholesale Inquiries
                  </h6>
                  <p className="mb-0 text-muted small">
                    Bulk orders (10kg+) के लिए special rates। Call:{" "}
                    <strong>
                      {settings.contactPhone || "+91 98765 43210"}
                    </strong>
                  </p>
                </div>

                <div className="border rounded p-3 shadow bg-white hover-effect">
                  <h6 className="fw-semibold text-dark">
                    <i className="fa fa-brands fa-whatsapp text-success me-2"></i>
                    Quick Support
                  </h6>
                  <p className="mb-0 text-muted small">
                    WhatsApp us at{" "}
                    <strong>
                      {settings.whatsappNumber || "+91 98765 43210"}
                    </strong>{" "}
                    for instant reply.
                  </p>
                </div>

                <div className="border rounded p-3 shadow bg-white hover-effect">
                  <h6 className="fw-semibold text-dark">
                    <i className="fa fa-solid fa-location-dot text-danger me-2"></i>
                    Visit Our Store
                  </h6>
                  <Link
                    href="/HelpUs"
                    className="small text-decoration-none text-primary"
                  >
                    View address →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFO SECTION */}
      <section className="bg-gray py-4">
        <div className="container">
          <div className="section-title text-left position-relative pb-1 mb-4 mx-auto">
            <h3 className="fw-bold">Contact Information</h3>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="card p-3 p-md-4 shadow h-100">
                <h4 className="fw-bold text-dark mb-3">Contact Information</h4>

                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle mb-0">
                    <tbody>
                      <tr>
                        <th className="bg-light" style={{ width: "35%" }}>
                          <i className="fa-solid fa-location-dot text-danger me-2"></i>
                          Address
                        </th>
                        <td className="text-muted">
                          {settings.address ||
                            "Shop 5, Main Road, Darbhanga, Bihar - 846004"}
                        </td>
                      </tr>

                      <tr>
                        <th className="bg-light">
                          <i className="fa-solid fa-phone text-success me-2"></i>
                          Phone
                        </th>
                        <td>
                          <a
                            href={`tel:${settings.contactPhone || "9876543210"}`}
                            className="text-decoration-none text-muted"
                          >
                            {settings.contactPhone || "+91 98765 43210"}
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <th className="bg-light">
                          <i className="fa-solid fa-envelope text-danger me-2"></i>
                          Email
                        </th>
                        <td className="text-break">
                          <a
                            href={`mailto:${settings.contactEmail || "info@makhanastore.com"}`}
                            className="text-decoration-none"
                          >
                            {settings.contactEmail || "info@makhanastore.com"}
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <th className="bg-light">
                          <i className="fa-solid fa-clock text-warning me-2"></i>
                          Working Hours
                        </th>
                        <td className="text-muted">
                          {settings.businessHours || "10 AM - 8 PM (Mon-Sat)"}
                        </td>
                      </tr>

                      <tr>
                        <th className="bg-light">
                          <i className="fa-solid fa-share-nodes text-primary me-2"></i>
                          Follow Us
                        </th>
                        <td>
                          <div className="d-flex flex-wrap gap-2">
                            {settings.facebook && (
                              <a
                                className="btn btn-primary btn-square"
                                href={settings.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                              >
                                <i className="fa-brands fa-facebook-f"></i>
                              </a>
                            )}

                            {settings.instagram && (
                              <a
                                className="btn btn-danger btn-square"
                                href={settings.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                              >
                                <i className="fa-brands fa-instagram"></i>
                              </a>
                            )}

                            {settings.twitter && (
                              <a
                                className="btn btn-info btn-square text-white"
                                href={settings.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                              >
                                <i className="fa-brands fa-twitter"></i>
                              </a>
                            )}

                            {settings.youtube && (
                              <a
                                className="btn btn-danger btn-square"
                                href={settings.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                              >
                                <i className="fa-brands fa-youtube"></i>
                              </a>
                            )}

                            {settings.whatsappBusiness && (
                              <a
                                className="btn btn-success btn-square"
                                href={settings.whatsappBusiness}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                              >
                                <i className="fa-brands fa-whatsapp"></i>
                              </a>
                            )}

                            {settings.linkedin && (
                              <a
                                className="btn btn-primary btn-square"
                                href={settings.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                              >
                                <i className="fa-brands fa-linkedin-in"></i>
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="shadow p-4 card">
                <p className="lead mb-3 fs-6 text-dark">
                  हमारी Contact Centre team आपकी हर query के लिए तैयार है।
                </p>

                <div className="mb-2 text-gray">
                  <strong>Customer Support:</strong>
                  <br />
                  Order, delivery, ya product के सवालों के लिए हमसे संपर्क करें।
                  <br />
                  <strong>
                    Call us: {settings.contactPhone || "1800 123 4567"}
                  </strong>
                </div>

                <div className="">
                  <p className="text-muted small">
                    <strong>General Inquiries:</strong>{" "}
                    <a
                      href={`mailto:${settings.contactEmail || "info@makhanastore.com"}`}
                    >
                      {settings.contactEmail || "info@makhanastore.com"}
                    </a>
                  </p>
                </div>

                <div className="">
                  <p className="text-muted small">
                    <strong>Wholesale:</strong> Bulk orders के लिए{" "}
                    <a href="mailto:wholesale@makhanastore.com">
                      wholesale@makhanastore.com
                    </a>
                  </p>
                </div>

                <div className="">
                  <p className="text-muted small">
                    <strong>Partnership:</strong> Business partnership के लिए{" "}
                    <a href="mailto:partnership@makhanastore.com">
                      partnership@makhanastore.com
                    </a>
                  </p>
                </div>

                <div className="mb-2">
                  <p className="text-muted small">
                    <strong>Quick Support:</strong> WhatsApp पर तुरंत reply
                    पाएँ।
                  </p>
                  <Link href="/HelpUs" className="btn btn-primary px-4">
                    <i className="fa fa-solid fa-comments me-2"></i> Visit Help
                    Center
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-gray pt-3 px-0">
        <div className="container">
          <div className="section-title text-left position-relative pb-1 mb-4 mx-auto">
            <h3 className="fw-bold">Frequently Asked Questions</h3>
          </div>
          <div className="row g-4 mb-5">
            {[
              {
                icon: "fa fa-leaf",
                q: "आपका Makhana 100% organic है?",
                a: "हमारा Makhana 100% organic, FSSAI certified, और सीधे बिहार के किसानों से sourced है। कोई chemical नहीं।",
              },
              {
                icon: "fa fa-headphones",
                q: "आपसे कैसे contact करें?",
                a: `Email: ${settings.contactEmail || "info@makhanastore.com"} या Phone: ${settings.contactPhone || "+91 98765 43210"} and WhatsApp: ${settings.whatsappNumber || "9876543210"}`,
              },
              {
                icon: "fa fa-truck",
                q: "Delivery कितने दिन में होगी?",
                a: "पूरे भारत में 3-5 business days में delivery। Tracking link SMS और email पर मिलेगा।",
              },
              {
                icon: "fa fa-credit-card",
                q: "Payment methods कौन-कौन से हैं?",
                a: "UPI (GPay, PhonePe, Paytm), Debit/Credit Cards, Net Banking, और Cash on Delivery (COD)।",
              },
              {
                icon: "fa fa-solid fa-person-walking-luggage",
                q: "Wholesale / Bulk order कर सकते हैं?",
                a: `हाँ! 10kg+ orders पर special wholesale rates। Call: ${settings.contactPhone || "+91 98765 43210"}`,
              },
              {
                icon: "fa fa-rotate-left",
                q: "Return policy क्या है?",
                a: "Delivery के 7 दिनों के अंदर damaged/wrong product के लिए return कर सकते हैं। Refund 5-7 days में।",
              },
            ].map((faq, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="border px-4 py-4 rounded bg-white shadow text-center hover-effect card">
                  <div className="d-inline-block w-auto mb-3">
                    <i
                      className={`fa-solid ${faq.icon} fs-2 text-primary rounded-pill p-1 border mx-auto`}
                    ></i>
                  </div>
                  <h5 className="fw-bold text-dark fs-6">{faq.q}</h5>
                  <p className="text-muted fs-7">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
