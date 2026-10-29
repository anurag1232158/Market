// src/app/(WebPage)/(Page)/SocialMedia/page.tsx
"use client";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent } from "react";

export default function SocialMediaPage() {
  /* ✅ Newsletter */
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);

  /* ✅ Feedback */
  const [feedback, setFeedback] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);

  /* ✅ Contact */
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);

  /* ============ NEWSLETTER ============ */
  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }

    setNewsletterSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccess(true);
        setError("");
        setEmail("");
      } else {
        const result = await res.json().catch(() => ({}));
        setError(result.error || "Failed to subscribe. Try again.");
      }
    } catch (err) {
      console.error("Newsletter submit failed:", err);
      setError("Something went wrong.");
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  /* ============ FEEDBACK ============ */
  const handleFeedbackSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!feedback) {
      setFeedbackError("Feedback is required");
      return;
    }

    setFeedbackSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });

      if (res.ok) {
        setFeedbackSuccess(true);
        setFeedbackError("");
        setFeedback("");
      } else {
        setFeedbackError("Failed to submit feedback. Try again.");
      }
    } catch (err) {
      console.error("Feedback submit failed:", err);
      setFeedbackError("Something went wrong.");
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  /* ============ CONTACT ============ */
  const handleContactChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.message) {
      setContactError("All fields are required");
      return;
    }

    setContactSubmitting(true);
    try {
      const res = await fetch("/api/contactUs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          type: "Contact",
          source: "Website (SocialMedia Page)",
          status: "New",
          createdAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setContactSuccess(true);
        setContactError("");
        setContact({ name: "", email: "", message: "" });
      } else {
        setContactError("Failed to send message. Try again.");
      }
    } catch (err) {
      console.error("Contact submit failed:", err);
      setContactError("Something went wrong.");
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <section className="bg-gray py-5">
      <div className="container">
        {/* ============ FAQ ============ */}
        <div className="section-title section-title1 text-left position-relative pb-1 mb-4 mx-auto">
          <h3 className="fw-bold">🌐 Frequently Asked Questions</h3>
        </div>
        <p className="text-muted">Common questions about our services:</p>

        <div className="accordion shadow-sm" id="faqAccordion">
          {[
            { id: "one", q: "What is the return policy?", a: "Our return policy allows returns within 30 days of purchase." },
            { id: "two", q: "How do I track my order?", a: "You can track your order by logging into your account and accessing your order history." },
            { id: "three", q: "What payment methods do you accept?", a: "We accept Credit Cards, Debit Cards, UPI, Net Banking, and Cash on Delivery." },
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

        {/* ============ CONNECT & SOCIAL ============ */}
        <div className="section-title section-title1 text-left position-relative pb-1 mt-5 mb-4 mx-auto">
          <h4 className="fw-bold">📱 Connect with Us</h4>
        </div>

        <div className="row">
          {/* Connect Card */}
          <div className="col-lg-6">
            <div className="card shadow-sm p-4 rounded bg-white mb-4 hover-effect">
              <h4 className="fw-bold text-dark mb-2">📱 Follow Us</h4>
              <p className="text-muted">
                Follow us on our social media channels for updates and support.
              </p>
              <div className="d-flex flex-wrap gap-2 py-3">
                <Link className="btn btn-primary btn-square" href="#" aria-label="Twitter">
                  <i className="fa fa-twitter"></i>
                </Link>
                <Link className="btn btn-primary btn-square" href="#" aria-label="Facebook">
                  <i className="fa fa-facebook-f"></i>
                </Link>
                <Link className="btn btn-primary btn-square" href="#" aria-label="LinkedIn">
                  <i className="fa fa-linkedin-in"></i>
                </Link>
                <Link className="btn btn-danger btn-square" href="#" aria-label="Instagram">
                  <i className="fa fa-instagram"></i>
                </Link>
                <Link className="btn btn-success btn-square" href="#" aria-label="WhatsApp">
                  <i className="fa fa-whatsapp"></i>
                </Link>
                <Link className="btn btn-danger btn-square" href="#" aria-label="YouTube">
                  <i className="fa fa-youtube"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-6">
            <div className="card shadow-sm p-4 rounded bg-white mb-4 hover-effect">
              <h4 className="fw-bold text-dark mb-2">🔗 Quick Links</h4>
              <p className="text-muted">Quick links to important pages.</p>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <Link href="/Terms" className="btn btn-outline-secondary btn-sm">
                  Terms & Conditions
                </Link>
                <Link href="/Feedback" className="btn btn-outline-secondary btn-sm">
                  Give Feedback
                </Link>
                <Link href="/HelpUs" className="btn btn-outline-secondary btn-sm">
                  Help & Support
                </Link>
                <Link href="/Privacy" className="btn btn-outline-secondary btn-sm">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ============ NEWSLETTER + CONTACT + FEEDBACK ============ */}
        <div className="row">
          {/* Newsletter */}
          <div className="col-lg-6">
            <div className="card shadow-sm p-4 rounded bg-white mb-4 hover-effect">
              <h4 className="fw-bold text-dark mb-2">📧 Subscribe to Newsletter</h4>
              <p className="text-muted">
                Stay updated with our latest news and offers.
              </p>
              <form className="d-flex flex-column" onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={newsletterSubmitting}
                >
                  {newsletterSubmitting ? (
                    <>
                      <i className="fa fa-spinner fa-spin me-2"></i> Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
              {error && <p className="mt-3 text-danger small">{error}</p>}
              {success && (
                <p className="mt-3 text-success small">✅ Thank you for subscribing!</p>
              )}
            </div>
             <div className="card shadow-sm p-4 rounded bg-white mb-4 hover-effect">
              <h4 className="fw-bold text-dark mb-2">🎉 Give Feedback</h4>
              <p className="text-muted">
                We value your feedback. Let us know how we can improve.
              </p>
              <form onSubmit={handleFeedbackSubmit}>
                <textarea
                  className="form-control mb-2"
                  rows={3}
                  placeholder="Share your experience..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
                <button className="btn btn-primary w-100" disabled={feedbackSubmitting}>
                  {feedbackSubmitting ? (
                    <>
                      <i className="fa fa-spinner fa-spin me-2"></i> Submitting...
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </button>
              </form>
              {feedbackError && <p className="mt-3 text-danger small">{feedbackError}</p>}
              {feedbackSuccess && (
                <p className="mt-3 text-success small">
                  ✅ Thank you for helping us improve our services!
                </p>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="card shadow-sm p-4 rounded bg-white mb-4 hover-effect">
              <h4 className="fw-bold text-dark mb-2">💬 Contact Us</h4>
              <p className="text-muted">
                For any inquiries, feel free to reach out to us.
              </p>
              <form onSubmit={handleContactSubmit}>
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
                  className="form-control mb-4"
                  rows={5}
                  placeholder="Your Message"
                  value={contact.message}
                  onChange={handleContactChange}
                  required
                />
                <button className="btn btn-primary w-100" disabled={contactSubmitting}>
                  {contactSubmitting ? (
                    <>
                      <i className="fa fa-spinner fa-spin me-2"></i> Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
              {contactError && <p className="mt-3 text-danger small">{contactError}</p>}
              {contactSuccess && (
                <p className="mt-3 text-success small">✅ We will get back to you shortly!</p>
              )}
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}