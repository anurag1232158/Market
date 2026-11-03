// src/app/(WebPage)/(Page)/Home/Conect/page.tsx
"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";

const Conect = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [settings, setSettings] = useState<any>({});
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

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const postData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errs: { [key: string]: string } = {};

    if (!data.name.trim()) errs.name = "Name is required";
    if (!data.email.trim()) errs.email = "Email is required";
    if (!data.phone.trim()) errs.phone = "Phone is required";

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/contactUs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          type: "Contact",
          source: "Website",
          priority: "Medium",
          status: "New",
          subject: "Contact Form Submission",
          number: `${data.countryCode}${data.phone}`,
          createdAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        alert("✅ Message sent successfully!");
        setData({
          name: "",
          email: "",
          phone: "",
          countryCode: "+91",
          message: "",
        });
        setErrors({});
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

  const mapQuery =
    settings.googleMapsLink ||
    settings.address ||
    "Darbhanga, Bihar, India";

  const mapSrc = `https://maps.google.com/maps?hl=en&q=${encodeURIComponent(
    mapQuery
  )}&t=p&z=12&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div className="container-fluid w-95 pb-5">
      {/* Section Title */}
      <div className="section-title text-left position-relative py-2 mb-4 mx-auto">
        <h6 className="fw-bold text-primary text-uppercase mb-3">
          <i className="fa fa-envelope me-2"></i>
          Contact Us
        </h6>

        <h2 className="mb-1 fs-3">Feel Free To Contact Us</h2>

        <p className="text-muted small mb-0">
          कोई भी सवाल, order enquiry या feedback — हमें बताएँ!
        </p>
      </div>

      <div className="row g-3 justify-content-center">
        {/* LEFT: Contact Form */}
        <div className="col-lg-6">
          <div className="border rounded-3 h-100 p-3 p-lg-5 shadow-sm bg-white">
            {/* Contact Info */}
            <div className="row g-2 mb-3">
              {settings.contactPhone && (
                <div className="col-md-6">
                  <div className="p-2 bg-light rounded-3 d-flex align-items-center h-100">
                    <i className="fa fa-phone text-primary fs-5 me-2"></i>
                    <div className="min-w-0">
                      <small className="text-muted d-block">
                        Call Us
                      </small>
                      <a
                        href={`tel:${settings.contactPhone}`}
                        className="text-dark fw-bold text-decoration-none small"
                      >
                        {settings.contactPhone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {settings.contactEmail && (
                <div className="col-md-6">
                  <div className="p-2 bg-light rounded-3 d-flex align-items-center h-100">
                    <i className="fa fa-envelope text-danger fs-5 me-2"></i>
                    <div className="min-w-0">
                      <small className="text-muted d-block">
                        Email Us
                      </small>
                      <a href={`mailto:${settings.contactEmail}`} className="text-dark fw-bold text-decoration-none small text-break"> 
                      {settings.contactEmail}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <form onSubmit={postData}>
              <div className="mb-3">
                <input type="text" name="name" value={data.name} onChange={handleChange} 
                 placeholder="Enter full name" className="form-control form-control-sm"/>
                {errors.name && ( <p className="text-danger small mb-0 mt-1"> {errors.name} </p>
                )}
              </div>

              <div className="mb-3">
                <input type="email" name="email" value={data.email} onChange={handleChange} 
                 placeholder="Enter email address" className="form-control form-control-sm" />
                {errors.email && ( <p className="text-danger small mb-0 mt-1"> {errors.email} </p> )}
              </div>

              <div className="mb-3">
                <div className="input-group input-group-sm">
                  <select name="countryCode" value={data.countryCode} onChange={handleChange} 
                   className="form-select" style={{ maxWidth: "105px" }} > 
                    <option value="+91">🇮🇳 +91</option> 
                    <option value="+1">🇺🇸 +1</option> 
                    <option value="+44">🇬🇧 +44</option> 
                    <option value="+971">🇦🇪 +971</option>
                  </select>
                  <input type="tel" name="phone" value={data.phone} onChange={handleChange} placeholder="Enter phone number" className="form-control" />
                </div>

                {errors.phone && ( <p className="text-danger small mb-0 mt-1">   {errors.phone} </p> )}
              </div>

              <div className="mb-3">
                <textarea name="message" value={data.message} onChange={handleChange} rows={3}
                 placeholder="Enter your message" className="form-control form-control-sm"/>
              </div>

              <button type="submit" className="btn btn-primary btn-sm px-4 w-100" disabled={submitting}>
                {submitting ? (
                  <> <i className="fa fa-spinner fa-spin me-2"></i> Sending... </>
                ) : (
                  <> <i className="fa fa-paper-plane me-2"></i> Submit Message </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT: Google Map */}
        <div className="col-lg-6">
          <div className="rounded-3 overflow-hidden shadow-sm h-100">
            <iframe className="w-100 d-block" src={mapSrc} style={{ height: "clamp(280px, 35vw, 420px)",   border: 0, }} 
            allowFullScreen loading="lazy" title="Makhana Store Location" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conect;