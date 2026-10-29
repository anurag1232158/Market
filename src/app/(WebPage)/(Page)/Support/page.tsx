// src/app/(WebPage)/(Page)/Support/page.tsx
"use client";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent } from "react";

export default function SupportPage() {
  /* ✅ Contact form state */
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleContactChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!contact.name || !contact.email || !contact.message) {
      setContactError("All fields are required");
      return;
    }

    setSubmitting(true);
    setContactError("");
    setContactSuccess(false);

    try {
      const res = await fetch("/api/contactUs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          type: "Support",
          source: "Website (Support Page)",
          subject: "Support Request",
          priority: "High",
          status: "New",
          createdAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setContactSuccess(true);
        setContact({ name: "", email: "", message: "" });
      } else {
        const result = await res.json().catch(() => ({}));
        setContactError(result.error || "Failed to send message. Try again.");
      }
    } catch (err) {
      console.error("Contact submit failed:", err);
      setContactError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gray py-5">
      <div className="container">
        {/* Header */}
        <div className="section-title text-left position-relative pb-1 mb-3">
          <h3 className="fw-bold mb-3">💬 Get Support</h3>
        </div>
        <p className="lead text-muted fs-6 mb-3">
          Find solutions to common issues or chat with our team. We're here to
          help! Our support team is available 24/7 to answer any questions you
          may have.
        </p>

        {/* Chat + Contact Cards */}
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {/* Chat with Support Team */}
          <div className="col">
            <div className="card h-100 p-4 shadow-sm">
              <h4 className="fw-bold text-dark mb-2">
                Chat with Our Support Team
              </h4>
              <p className="text-muted">
                Our support team is available to help you with any questions or
                issues you may have.
              </p>

              {/* Social icons */}
              <div className="d-flex flex-wrap gap-2 py-3">
                <Link
                  className="btn btn-primary btn-square"
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <i className="fa fa-twitter"></i>
                </Link>
                <Link
                  className="btn btn-primary btn-square"
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <i className="fa fa-facebook-f"></i>
                </Link>
                <Link
                  className="btn btn-primary btn-square"
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="fa fa-linkedin-in"></i>
                </Link>
                <Link
                  className="btn btn-danger btn-square"
                  href="https://youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <i className="fa fa-youtube"></i>
                </Link>
                <Link
                  className="btn btn-info btn-square"
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                >
                  <i className="fa fa-telegram"></i>
                </Link>
                <Link
                  className="btn btn-success btn-square"
                  href="https://wa.me/919170973916"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <i className="fa fa-whatsapp"></i>
                </Link>
              </div>

              <p className="text-muted my-4">
                Our support team is available 24/7 to help you with any
                questions or issues you may have.
              </p>
              <Link
                href="https://wa.me/919170973916"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success w-auto fs-6"
              >
                <i className="fa fa-whatsapp me-2"></i> Chat Now
              </Link>
            </div>
          </div>

          {/* Contact Us Info */}
          <div className="col">
            <div className="card h-100 p-4 shadow-sm">
              <h4 className="fw-bold text-dark mb-2">Contact Us</h4>
              <p className="text-muted">
                If you need to contact us directly, you can use the contact form
                below.
              </p>

              <div className="mb-3">
                <i className="fa fa-phone text-primary me-2"></i>
                Just one Call/SMS to{" "}
                <Link href="tel:+919170973916" className="text-primary fw-bold">
                  +91-9170973916
                </Link>{" "}
                and we will be there to assist you.
              </div>

              <div className="mb-3">
                <i className="fa fa-envelope text-danger me-2"></i>
                You can also email us at{" "}
                <Link
                  href="mailto:info@makhanastore.com"
                  className="text-primary fw-bold"
                >
                  info@makhanastore.com
                </Link>
              </div>

              <div className="mb-3">
                <i className="fa fa-whatsapp text-success me-2"></i>
                We are also available on WhatsApp at{" "}
                <Link
                  href="https://wa.me/919170973916"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary fw-bold"
                >
                  +91 9170973916
                </Link>
              </div>

              <Link href="/Contact" className="btn btn-primary mt-3 w-auto">
                <i className="fa fa-envelope me-2"></i> Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Form + Docs */}
        <div className="row g-3 mt-3">
          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="card shadow-sm p-4 rounded bg-white mb-4 hover-effect">
              <h4 className="fw-bold text-dark mb-2">Contact Support</h4>
              <p className="text-muted">
                If you need immediate assistance, please contact our support
                team.
              </p>

              <form className="mt-1" onSubmit={handleContactSubmit}>
                <input
                  type="text"
                  name="name"
                  className="form-control mb-3"
                  placeholder="Your Name"
                  value={contact.name}
                  onChange={handleContactChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="form-control mb-3"
                  placeholder="Your Email"
                  value={contact.email}
                  onChange={handleContactChange}
                  required
                />
                <textarea
                  name="message"
                  className="form-control mb-3"
                  rows={3}
                  placeholder="Describe your issue or question..."
                  value={contact.message}
                  onChange={handleContactChange}
                  required
                ></textarea>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <i className="fa fa-spinner fa-spin me-2"></i> Sending...
                    </>
                  ) : (
                    <>
                      <i className="fa fa-paper-plane me-2"></i> Send Message
                    </>
                  )}
                </button>
              </form>

              {contactError && (
                <p className="mt-3 text-danger small mb-0">{contactError}</p>
              )}
              {contactSuccess && (
                <p className="mt-3 text-success small mb-0">
                  ✅ We will get back to you shortly!
                </p>
              )}
            </div>
          </div>

          {/* Support Documentation */}
          <div className="col-lg-6">
            <div className="card shadow-sm p-4 rounded bg-white mb-4 hover-effect">
              <h4 className="fw-bold text-dark mb-2">Support Documentation</h4>
              <p className="text-muted">
                Access our comprehensive support documentation for detailed
                guides and troubleshooting.
              </p>

              <ul className="list-unstyled mt-3">
                <li className="mb-2">
                  <i className="fa fa-book text-primary me-2"></i>
                  Read our{" "}
                  <Link href="/Documentation" className="text-primary fw-bold">
                    Documentation
                  </Link>
                </li>
                <li className="mb-2">
                  <i className="fa fa-circle-question text-warning me-2"></i>
                  Check our{" "}
                  <Link href="/KnowledgeBase" className="text-primary fw-bold">
                    Knowledge Base
                  </Link>{" "}
                  for common issues.
                </li>
                <li className="mb-2">
                  <i className="fa fa-envelope text-danger me-2"></i>
                  Email:{" "}
                  <Link
                    href="mailto:support@makhanastore.com"
                    className="text-primary"
                  >
                    support@makhanastore.com
                  </Link>
                </li>
                <li className="mb-2">
                  <i className="fa fa-phone text-success me-2"></i>
                  Phone:{" "}
                  <Link href="tel:+919170973916" className="text-primary">
                    +91 9170973916
                  </Link>
                </li>
              </ul>

              <Link href="/Terms" className="btn btn-outline-secondary mt-3">
                View Documentation
              </Link>
            </div>
          </div>
        </div>

        {/* Feedback + Report Issue */}
        <div className="row g-3 mt-3">
          <div className="col-lg-6">
            <div className="card shadow-sm p-4 rounded bg-white mb-4 hover-effect">
              <h4 className="fw-bold text-dark mb-2">Feedback</h4>
              <p className="text-muted">
                We value your feedback. Let us know how we can improve our
                support services.
              </p>
              <Link
                href="/Feedback"
                className="btn btn-outline-secondary w-auto"
              >
                <i className="fa fa-comment me-2"></i> Give Feedback
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow-sm p-4 rounded bg-white mb-4 hover-effect">
              <h4 className="fw-bold text-dark mb-2">Report an Issue</h4>
              <p className="text-muted">
                Encountering a problem? Let us know, and our support team will
                help you resolve it as soon as possible.
              </p>

              <Link href="/Contact" className="btn btn-primary w-auto">
                <i className="fa fa-bug me-2"></i> Report Issue
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="section-title text-left position-relative pb-1 mt-3 mb-4">
          <h4 className="fw-bold mb-3">FAQs (Frequently Asked Questions)</h4>
        </div>

        <div className="accordion" id="faqAccordion">
          {[
            {
              id: "one",
              q: "What is the support process?",
              a: "Our support process involves submitting a ticket, which is then reviewed by our support team. We aim to respond within 24 hours.",
            },
            {
              id: "two",
              q: "How can I submit a support ticket?",
              a: "You can submit a support ticket through our support portal or by emailing our support team.",
            },
            {
              id: "three",
              q: "What information should I include in my support request?",
              a: "Please include a detailed description of the issue, any error messages, and steps to reproduce the problem.",
            },
            {
              id: "four",
              q: "How long does it take to resolve support issues?",
              a: "The resolution time varies depending on the complexity of the issue, but we strive to resolve most issues within 48 hours.",
            },
          ].map((faq, idx) => (
            <div className="accordion-item" key={faq.id}>
              <h2 className="accordion-header" id={`heading-${faq.id}`}>
                <button
                  className={`accordion-button ${idx !== 0 ? "collapsed" : ""}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${faq.id}`}
                >
                  {faq.q}
                </button>
              </h2>
              <div
                id={`collapse-${faq.id}`}
                className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
