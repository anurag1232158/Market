// src/app/(WebPage)/(Page)/Feedback/page.tsx
"use client";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import Testimonial from "../Home/Testimonial";

export default function FeedbackPage() {
  const [settings, setSettings] = useState<any>({});
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    message: "",
    rating: "5",
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
    if (!data.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          number: `${data.countryCode}${data.phone}`,
          type: "Feedback",
          source: "Website",
          status: "New",
          createdAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        alert("✅ Feedback sent! Thank you for your valuable feedback. 🙏");
        setData({
          name: "",
          email: "",
          phone: "",
          countryCode: "+91",
          message: "",
          rating: "5",
        });
      } else {
        alert("❌ Failed to submit feedback.");
      }
    } catch (err) {
      console.error("Submit failed:", err);
      alert("❌ Error submitting feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ====================== FAQ SECTION ====================== */}
      <section className="bg-gray py-5">
        <div className="container">
          <div className="text-left mb-3">
            <h4 className="fw-bold mb-2">📝 Give Feedback</h4>
            <p className="text-muted mb-0 fs-7">
              आपका feedback हमें बेहतर बनाने में मदद करता है। कृपया अपने विचार हमारे साथ साझा करें!
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="accordion shadow-sm" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                  <i className="fa fa-leaf text-success me-2"></i>
                  क्या आपका Makhana 100% organic है?
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-muted">
                  हाँ! हमारा सारा Makhana 100% organic, FSSAI certified, और सीधे बिहार के किसानों से sourced है। कोई chemical नहीं, कोई preservative नहीं।
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                  <i className="fa fa-truck text-primary me-2"></i>
                  Order कब तक deliver हो जाएगा?
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-muted">
                  पूरे भारत में 3-5 business days में delivery। Tracking link SMS और email पर मिलेगा। <Link href="/Track-Order">Track Order</Link> page पर status देख सकते हैं।
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                  <i className="fa fa-credit-card text-info me-2"></i>
                  कौन-कौन से payment methods accept करते हैं?
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-muted">
                  UPI (GPay, PhonePe, Paytm), Debit/Credit Cards, Net Banking, और Cash on Delivery (COD)। सारे payments 100% secure हैं।
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                  <i className="fa fa-rotate-left text-warning me-2"></i>
                  Return / Refund policy क्या है?
                </button>
              </h2>
              <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-muted">
                  Delivery के 7 दिनों के अंदर अगर product damaged या गलत है, तो return कर सकते हैं। Refund 5-7 days में process हो जाता है। <Link href="/Terms">Terms</Link> page पर details देखें।
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== FEEDBACK FORM ====================== */}
      <section className="bg-gray py-2">
        <div className="container">
          <div className="text-left mb-2">
            <h4 className="fw-bold mb-2">📋 Feedback Form</h4>
            <p className="text-muted mb-0 fs-7">हम आपकी राय को महत्व देते हैं। कृपया नीचे form भरें और अपनी बात हमें बताएँ।</p>
          </div>

          <div className="row g-3">
            {/* Feedback Form */}
            <div className="col-lg-7">
              <div className="bg-white shadow-sm rounded p-3 p-lg-4 h-100">
                <h5 className="fw-bold text-dark mb-3">Share Your Feedback</h5>
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

                  {/* Rating */}
                  <div className="mb-1">
                    <label className="fw-bold small d-block mb-1">Overall Rating:</label>
                    <div className="d-flex gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <label key={n} style={{ cursor: "pointer" }} className="d-flex align-items-center">
                          <input
                            type="radio"
                            name="rating"
                            value={n}
                            checked={data.rating === String(n)}
                            onChange={handleChange}
                            style={{ display: "none" }}
                          />
                          <span
                            className="fs-3"
                            style={{
                              color: n <= Number(data.rating) ? "#ffc107" : "#ddd",
                              transition: "all 0.2s",
                            }}
                          >
                            ★
                          </span>
                        </label>
                      ))}
                      <span className="text-muted small align-self-center">({data.rating}/5)</span>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-3">
                    <textarea
                      name="message"
                      value={data.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="आपका feedback, suggestion, या कोई भी शिकायत..."
                      className="form-control"
                    ></textarea>
                    {errors.message && <p className="text-danger small mt-1">{errors.message}</p>}
                  </div>

                  <button type="submit" className="btn btn-primary px-4 w-100" disabled={submitting}>
                    {submitting ? (
                      <>
                        <i className="fa fa-spinner fa-spin me-2"></i>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fa fa-paper-plane me-2"></i>
                        Submit Feedback
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Other Feedback + Social */}
            <div className="col-lg-5">
              <div className="bg-white shadow-sm rounded p-3 p-lg-4 h-100">
                <h5 className="fw-bold text-dark mb-3">More Help</h5>

                <div className="accordion" id="feedbackAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="fbOne">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#fbCollapseOne">
                        Order कैसे track करें?
                      </button>
                    </h2>
                    <div id="fbCollapseOne" className="accordion-collapse collapse" data-bs-parent="#feedbackAccordion">
                      <div className="accordion-body text-muted">
                        <Link href="/Track-Order">Track Order</Link> page पर जाएँ, अपना order number डालें, और live status देखें।
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="fbTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#fbCollapseTwo">
                        Wholesale order कैसे करें?
                      </button>
                    </h2>
                    <div id="fbCollapseTwo" className="accordion-collapse collapse" data-bs-parent="#feedbackAccordion">
                      <div className="accordion-body text-muted">
                        10kg+ orders पर special rates। Call:{" "}
                        {settings.contactPhone || "+91 98765 43210"} या Email:{" "}
                        {settings.contactEmail || "info@makhanastore.com"}
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="fbThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#fbCollapseThree">
                        Return policy क्या है?
                      </button>
                    </h2>
                    <div id="fbCollapseThree" className="accordion-collapse collapse" data-bs-parent="#feedbackAccordion">
                      <div className="accordion-body text-muted">
                        Delivery के 7 दिनों के अंदर damaged/wrong product के लिए return कर सकते हैं। Refund 5-7 days में process होता है।
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-4 pt-3 border-top">
                  <h5 className="fw-bold text-dark mb-3">Follow Us</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {settings.facebook && (
                      <a className="btn btn-primary btn-square" href={settings.facebook} rel="noopener noreferrer" target="_blank" title="Facebook">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    )}
                    {settings.instagram && (
                      <a className="btn btn-danger btn-square" href={settings.instagram} rel="noopener noreferrer" target="_blank" title="Instagram">
                        <i className="fa fa-instagram"></i>
                      </a>
                    )}
                    {settings.twitter && (
                      <a className="btn btn-info btn-square text-white" href={settings.twitter} rel="noopener noreferrer" target="_blank" title="Twitter">
                        <i className="fa fa-twitter"></i>
                      </a>
                    )}
                    {settings.youtube && (
                      <a className="btn btn-danger btn-square" href={settings.youtube} rel="noopener noreferrer" target="_blank" title="YouTube">
                        <i className="fa fa-youtube"></i>
                      </a>
                    )}
                    {settings.whatsappBusiness && (
                      <a className="btn btn-success btn-square" href={settings.whatsappBusiness} rel="noopener noreferrer" target="_blank" title="WhatsApp">
                        <i className="fa fa-whatsapp"></i>
                      </a>
                    )}
                    {settings.linkedin && (
                      <a className="btn btn-primary btn-square" href={settings.linkedin} rel="noopener noreferrer" target="_blank" title="LinkedIn">
                        <i className="fa fa-linkedin-in"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== TESTIMONIAL ====================== */}
      <div className="container-fluid px-0 px-lg-5 pt-4">
        <Testimonial />
      </div>
    </>
  );
}