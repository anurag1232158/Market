// src/app/(WebPage)/(Page)/Privacy/page.tsx
"use client";
import Link from "next/link";
import React from "react";

export default function PrivacyPage() {
  return (
    <>

      <section className="bg-gray py-3 py-lg-5">
        <div className="container-fluid w-90">
          <div className="text-center mb-3">
            <h3 className="fw-bold">🔒 Privacy Policy</h3>
            <p className="text-muted mb-0">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <p className="lead fs-6 text-muted">
            This Privacy Policy outlines how Makhana Store collects, uses, and
            protects your personal information when you use our website. We are
            committed to safeguarding your privacy and ensuring that your
            personal data is handled responsibly.
          </p>

          {/* ✅ Accordion */}
          <div className="accordion shadow-sm" id="privacyAccordion">
            {[
              {
                title: "1. Information We Collect",
                content:
                  "We collect personal information such as your name, email address, phone number, shipping address, and payment details when you place an order or create an account. We may also collect browsing data (cookies, IP address) to improve your experience.",
              },
              {
                title: "2. How We Use Your Information",
                content:
                  "Your information is used to process orders, provide customer support, send order updates, and improve our services. We may also send promotional offers if you have opted in.",
              },
              {
                title: "3. Sharing Your Information",
                content:
                  "We do not sell or rent your personal information. We may share it with trusted third parties (delivery partners, payment gateways) only to fulfill your order.",
              },
              {
                title: "4. Data Security",
                content:
                  "We use industry-standard security measures (SSL encryption, secure servers) to protect your data. However, no method of transmission over the internet is 100% secure.",
              },
              {
                title: "5. Cookies & Tracking",
                content:
                  "Our website uses cookies to enhance user experience and analyze traffic. You can disable cookies in your browser settings, but some features may not work properly.",
              },
              {
                title: "6. Your Rights",
                content:
                  "You have the right to access, update, or delete your personal information. You can also opt out of marketing communications at any time by contacting us.",
              },
              {
                title: "7. Third-Party Links",
                content:
                  "Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites. Please review their policies separately.",
              },
              {
                title: "8. Children's Privacy",
                content:
                  "Our services are not intended for children under 13. We do not knowingly collect personal information from children.",
              },
              {
                title: "9. Changes to This Policy",
                content:
                  "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.",
              },
              {
                title: "10. Contact Us",
                content:
                  "If you have any questions about this Privacy Policy, please contact us at info@makhanastore.com or +91 98765 43210.",
              },
            ].map((section, idx) => (
              <div className="accordion-item" key={idx}>
                <h2 className="accordion-header" id={`headingPriv${idx}`}>
                  <button
                    className={`accordion-button ${idx !== 0 ? "collapsed" : ""}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapsePriv${idx}`}
                    aria-expanded={idx === 0 ? "true" : "false"}
                    aria-controls={`collapsePriv${idx}`}
                  >
                    <i className="fa fa-shield-halved text-primary me-2"></i>
                    {section.title}
                  </button>
                </h2>
                <div
                  id={`collapsePriv${idx}`}
                  className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
                  aria-labelledby={`headingPriv${idx}`}
                  data-bs-parent="#privacyAccordion"
                >
                  <div className="accordion-body text-muted">{section.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray pb-2">
        <div className="container-fluid w-90">
          <h3 className="fw-bold mb-3">🤝 Help and Support</h3>

          <div className="row g-3">
            {/* Data Security */}
            <div className="col-lg-6">
              <div className="card shadow-sm p-3 p-lg-4 rounded bg-white h-100 hover-effect">
                <h4 className="fw-bold mb-3 text-dark">🔒 Data Security</h4>
                <p className="text-muted">
                  We take the security of your personal information seriously.
                  We have implemented measures to protect your information from
                  unauthorized access, disclosure, or alteration.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-1">
                    <i className="fa fa-check-circle text-success me-2"></i>
                    SSL Data Encryption
                  </li>
                  <li className="mb-1">
                    <i className="fa fa-check-circle text-success me-2"></i>
                    Regular Security Audits
                  </li>
                  <li className="mb-1">
                    <i className="fa fa-check-circle text-success me-2"></i>
                    User Consent Management
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Us */}
            <div className="col-lg-6">
              <div className="card shadow-sm p-3 p-lg-4 rounded bg-white h-100 hover-effect">
                <h4 className="fw-bold mb-3 text-dark">📞 Contact Us</h4>
                <p className="text-muted">
                  If you have any questions or concerns about our Privacy Policy,
                  please feel free to contact us.
                </p>
                <p className="text-muted mb-1">
                  <i className="fa fa-envelope text-primary me-2"></i>
                  <a href="mailto:info@makhanastore.com">info@makhanastore.com</a>
                </p>
                <p className="text-muted mb-0">
                  <i className="fa fa-phone text-success me-2"></i>
                  +91 98765 43210
                </p>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-3">
            {/* Legal Documents */}
            <div className="col-lg-6">
              <div className="card shadow-sm p-3 p-lg-4 rounded bg-white h-100 hover-effect">
                <h4 className="fw-bold mb-3 text-dark">📄 Legal Documents</h4>
                <p className="text-muted">
                  We are committed to transparency and compliance with applicable
                  laws and regulations. Our legal documents include:
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="fa fa-file-contract text-primary me-2"></i>
                    <Link href="/Terms" className="text-decoration-none">Terms and Conditions</Link>
                  </li>
                  <li className="mb-2">
                    <i className="fa fa-file-shield text-success me-2"></i>
                    <Link href="/Privacy" className="text-decoration-none">Privacy Policy</Link>
                  </li>
                  <li className="mb-2">
                    <i className="fa fa-rotate-left text-warning me-2"></i>
                    <Link href="/Refund" className="text-decoration-none">Refund Policy</Link>
                  </li>
                  <li className="mb-2">
                    <i className="fa fa-envelope text-danger me-2"></i>
                    <Link href="/Contact" className="text-decoration-none">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Customer Support */}
            <div className="col-lg-6">
              <div className="card shadow-sm p-3 p-lg-4 rounded bg-white h-100 hover-effect">
                <h4 className="fw-bold mb-3 text-dark">📞 Customer Support</h4>
                <p className="text-muted">
                  If you need assistance or have any questions, our support team
                  is here to help.
                </p>
                <p className="text-muted mb-1">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@makhanastore.com">info@makhanastore.com</a>
                </p>
                <p className="text-muted mb-1">
                  <strong>Phone:</strong> +91 98765 43210
                </p>
                <p className="text-muted mb-1">
                  <strong>WhatsApp:</strong> +91 98765 43210
                </p>
                <p className="text-muted mb-0">
                  <strong>Hours:</strong> Mon-Sat, 10 AM - 8 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray py-4 mb-3">
        <div className="container-fluid w-90">
          <h3 className="fw-bold mb-4">🤔 Frequently Asked Questions</h3>

          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
                  What is your return policy?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted">
                  You can return products within 7 days of delivery if they are
                  damaged or incorrect. Please contact us at{" "}
                  <a href="mailto:info@makhanastore.com">info@makhanastore.com</a>{" "}
                  with your order number and photos.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                >
                  How do I track my order?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted">
                  You'll receive a tracking link via SMS and email within 24
                  hours of dispatch. You can also track your order on our{" "}
                  <Link href="/Track-Order">Track Order</Link> page.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                >
                  Can I cancel my order?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted">
                  Orders can be canceled within 24 hours of placing them, or
                  before dispatch. Once shipped, cancellation is not possible.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                >
                  Is your Makhana 100% organic?
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted">
                  Yes! All our Makhana is 100% organic, FSSAI certified, and
                  sourced directly from farmers in Bihar. No chemicals, no
                  preservatives — just pure, natural Makhana.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFive">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                >
                  Do you offer free shipping?
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted">
                  Yes! We offer free shipping on all orders above ₹500. For
                  orders below ₹500, a flat shipping charge of ₹50 applies.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingSix">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSix"
                >
                  What payment methods do you accept?
                </button>
              </h2>
              <div
                id="collapseSix"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted">
                  We accept UPI, Debit/Credit Cards, Net Banking, and Cash on
                  Delivery (COD). All online payments are 100% secure.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}