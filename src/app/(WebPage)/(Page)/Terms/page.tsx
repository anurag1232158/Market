// src/app/(WebPage)/(Page)/Terms/page.tsx
"use client";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent } from "react";

export default function TermsPage() {
  // Newsletter states
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
    setSuccess(false);
  };

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email");
      return;
    }

    setSubmitting(true);
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
        setError("Failed to subscribe. Try again.");
      }
    } catch (err) {
      console.error("Newsletter submit failed:", err);
      setError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ====================== TERMS CONTENT ====================== */}
<section className="py-2 py-lg-3">
  <div className="container">
    <div className="text-center mb-3">
      <h3 className="fw-bold">📜 Terms & Conditions</h3>
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
      By using our services, you agree to comply with the following terms and
      conditions. Please read them carefully.
    </p>

    {/* ✅ Accordion for Terms */}
    <div className="accordion shadow-sm" id="termsAccordion">
      {[
        {
          title: "1. Acceptance of Terms",
          content:
            "By accessing or using our services, you agree to be bound by these terms and conditions. If you do not agree to these terms, you may not use our services.",
        },
        {
          title: "2. Changes to Terms",
          content:
            "We reserve the right to modify these terms and conditions at any time. Any changes will be effective immediately upon posting the revised terms on our website.",
        },
        {
          title: "3. User Responsibilities",
          content:
            "You are responsible for complying with all applicable laws and regulations when using our services. You must not use our services for any illegal or unauthorized purpose.",
        },
        {
          title: "4. Intellectual Property",
          content:
            "All content on our services, including text, graphics, logos, and software, is the property of our company and is protected by intellectual property laws.",
        },
        {
          title: "5. Limitation of Liability",
          content:
            "Our company shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with the use of our services.",
        },
        {
          title: "6. Governing Law",
          content:
            "These terms and conditions shall be governed by and construed in accordance with the laws of India.",
        },
        {
          title: "7. Contact Information",
          content:
            "If you have any questions or concerns about these terms and conditions, please contact us using the Contact Us page.",
        },
        {
          title: "8. Order & Delivery",
          content:
            "All orders are subject to availability. We deliver across India within 3-5 business days. Tracking details will be shared via SMS and email.",
        },
        {
          title: "9. Payment Terms",
          content:
            "We accept UPI, Debit/Credit Cards, Net Banking, and Cash on Delivery. All online payments are 100% secure.",
        },
        {
          title: "10. Returns & Refunds",
          content:
            "Damaged or incorrect products can be returned within 7 days of delivery. Refunds are processed within 5-7 business days.",
        },
      ].map((section, idx) => (
        <div className="accordion-item" key={idx}>
          <h2 className="accordion-header" id={`headingTerm${idx}`}>
            <button
              className={`accordion-button ${idx !== 0 ? "collapsed" : ""}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapseTerm${idx}`}
              aria-expanded={idx === 0 ? "true" : "false"}
              aria-controls={`collapseTerm${idx}`}
            >
              <i className="fa-solid fa-file-contract text-primary me-2"></i>
              {section.title}
            </button>
          </h2>
          <div
            id={`collapseTerm${idx}`}
            className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
            aria-labelledby={`headingTerm${idx}`}
            data-bs-parent="#termsAccordion"
          >
            <div className="accordion-body text-muted">{section.content}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ====================== ADDITIONAL INFO CARDS ====================== */}
      <section className="py-3">
        <div className="container">
          <h4 className="fw-bold mb-4">📚 Additional Information</h4>

          <div className="row g-3">
            {/* Contact Us */}
            <div className="col-lg-6">
              <div className="card shadow-sm p-3 p-lg-4 rounded bg-white h-100 hover-effect">
                <h5 className="fw-bold mb-3 text-dark">📞 Contact Us</h5>
                <p className="lead fs-6">
                  If you have any questions or need further information, feel free to reach out to us.
                </p>
                <p className="text-muted">
                  We are here to assist you with any inquiries or concerns you may have regarding our terms and services.
                </p>
                <Link href="/Contact" className="btn btn-primary mt-auto">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Newsletter */}
            <div className="col-lg-6">
              <div className="card shadow-sm p-3 p-lg-4 rounded bg-white h-100 hover-effect">
                <h5 className="fw-bold mb-3 text-dark">📧 Subscribe to Newsletter</h5>
                <p className="lead fs-6 text-muted">
                  Get the latest updates and exclusive offers delivered straight to your inbox.
                </p>
                <form className="d-flex flex-column py-3" onSubmit={handleEmailSubmit}>
                  <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    disabled={submitting}
                  />
                  <button className="btn btn-primary" type="submit" disabled={submitting}>
                    {submitting ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>

                {error && <p className="text-danger small mb-0">{error}</p>}
                {success && (
                  <p className="text-success small mb-0">✅ Thank you for subscribing!</p>
                )}
              </div>
            </div>
          </div>

          <div className="row g-3 mt-3">
            {/* Social Media */}
            <div className="col-lg-6">
              <div className="card shadow-sm p-3 p-lg-4 rounded bg-white h-100 hover-effect">
                <h5 className="fw-bold mb-3 text-dark">👥 Social Media</h5>
                <p className="lead fs-6 text-muted">
                  Stay connected with us on social media for the latest news and updates.
                </p>
                <div className="d-flex gap-2 flex-wrap">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <i className="fa fa-facebook-f me-1"></i> Facebook
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <i className="fa fa-twitter me-1"></i> Twitter
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <i className="fa fa-instagram me-1"></i> Instagram
                  </a>
                </div>
                <p className="text-muted mt-3 mb-0">
                  Follow us on our social media channels to stay updated with the latest news, offers, and events.
                </p>
              </div>
            </div>

            {/* Privacy Policy */}
            <div className="col-lg-6">
              <div className="card shadow-sm p-3 p-lg-4 rounded bg-white h-100 hover-effect">
                <h5 className="fw-bold mb-3 text-dark">🔒 Privacy Policy</h5>
                <p className="lead fs-6 text-muted">
                  Your privacy is important to us. Read our privacy policy to understand how we handle your data.
                </p>
                <p className="text-muted">
                  We are committed to protecting your privacy. Our privacy policy outlines how we collect, use, and protect your personal information.
                </p>
                <Link href="/Privacy" className="btn btn-secondary mt-auto">
                  Read Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-3">
            {/* Feedback */}
            <div className="col-lg-6">
              <div className="card shadow-sm p-3 p-lg-4 rounded bg-white h-100 hover-effect">
                <h5 className="fw-bold mb-3 text-dark">💬 Feedback</h5>
                <p className="lead fs-6 text-muted">
                  We value your feedback. Please share your thoughts to help us improve.
                </p>
                <p className="text-muted">
                  Your feedback is important to us. It helps us improve our services and better serve you.
                </p>
                <Link href="/Feedback" className="btn btn-primary mt-auto">
                  Give Feedback
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="col-lg-6">
              <div className="card shadow-sm p-3 p-lg-4 rounded bg-white h-100 hover-effect">
                <h5 className="fw-bold mb-3 text-dark">🆘 Support</h5>
                <p className="lead fs-6 text-muted">
                  Need help? Visit our support page for FAQs and assistance.
                </p>
                <p className="text-muted">
                  If you have any questions or need assistance, please don't hesitate to reach out to our support team.
                </p>
                <Link href="/HelpUs" className="btn btn-primary mt-auto">
                  Get Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== FAQ ====================== */}
      <section className="py-5 pt-3">
        <div className="container">
          <h4 className="fw-bold mb-4">🎉 Frequently Asked Questions</h4>
          <p className="lead fs-6 text-muted mb-4">
            Here are some common questions and answers to help you understand our terms and services better.
          </p>

          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
                  What is the return policy?
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Damaged or incorrect products can be returned within 7 days of delivery. Refunds are processed within 5-7 business days.
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
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  You can track your order using the tracking link provided in your confirmation email or visit the <Link href="/Track-Order">Track Order</Link> page.
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
              <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Yes, you can cancel your order within 24 hours of placement (before dispatch). Contact support for assistance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}