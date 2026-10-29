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

  /* Settings fetch (contact info + map) */
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
  };

  const postData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errs: { [key: string]: string } = {};
    if (!data.name) errs.name = "Name is required";
    if (!data.email) errs.email = "Email is required";
    if (!data.phone) errs.phone = "Phone is required";

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

  /* Map */
  const mapQuery = settings.googleMapsLink || settings.address || "Darbhanga, Bihar, India";
  const mapSrc = `https://maps.google.com/maps?hl=en&q=${encodeURIComponent(mapQuery)}&t=p&z=12&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div className="container-fluid w-95 pb-5">
      {/* Section Title */}
      <div className="section-title text-left position-relative py-3 mb-4 mx-auto">
        <h6 className="fw-bold text-primary text-uppercase">
          <i className="fa fa-envelope me-2"></i>
          Contact Us
        </h6>
        <h2 className="mb-0 my-0 py-0">Feel Free To Contact Us</h2>
        <p className="text-muted mt-2 mb-0 fs-7">
          कोई भी सवाल, order enquiry या feedback — हमें बताएँ!
        </p>
      </div>

      <div className="row g-5 justify-content-center">
        {/* LEFT: Contact Form */}
        <div className="col-lg-6">
          <div className="border rounded h-100 p-4 px-md-5 shadow bg-white">
            {/* Contact Info Cards */}
            <div className="row g-3 mb-4">
              {settings.contactPhone && (
                <div className="col-md-6">
                  <div className="p-2 bg-light rounded-3 d-flex align-items-center">
                    <i className="fa fa-phone text-primary fs-4 me-2"></i>
                    <div> <small className="text-muted d-block">Call Us</small>
                      <a href={`tel:${settings.contactPhone}`}
                        className="text-dark fw-bold text-decoration-none" style={{ fontSize: "13px" }}>
                        {settings.contactPhone}
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {settings.contactEmail && (
                <div className="col-md-6">
                  <div className="p-3 py-2 bg-light rounded-3 d-flex align-items-center">
                    <i className="fa fa-envelope text-danger fs-4 me-2"></i>
                    <div>
                      <small className="text-muted d-block">Email Us</small>
                      <a href={`mailto:${settings.contactEmail}`} className="text-dark fw-bold text-decoration-none" 
                       style={{ fontSize: "13px" }}> {settings.contactEmail}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={postData}>
              <div className="mb-3">
                <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Enter full name" className="form-control" />
                {errors.name && <p className="text-danger small mt-1">{errors.name}</p>}
              </div>

              <div className="mb-3">
                <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Enter email address" className="form-control"/>
                {errors.email && <p className="text-danger small mt-1">{errors.email}</p>}
              </div>

              <div className="mb-3">
                <div className="input-group"> 
                <select name="countryCode" value={data.countryCode} onChange={handleChange} className="form-select" 
                   style={{ maxWidth: "120px" }} > <option value="+91">🇮🇳 +91</option> 
                  <option value="+1">🇺🇸 +1</option> 
                  <option value="+44">🇬🇧 +44</option> 
                  <option value="+971">🇦🇪 +971</option>
                  </select>
                  <input type="text" name="phone" value={data.phone} onChange={handleChange} placeholder="Enter phone number" className="form-control"
                  />
                </div>
                {errors.phone && <p className="text-danger small mt-1">{errors.phone}</p>}
              </div>

              <div className="mb-3">
              <textarea name="message" value={data.message} onChange={handleChange} rows={3} placeholder="Enter your message" className="form-control" ></textarea>
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
                    Submit
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT: Google Map */}
        <div className="col-lg-6">
          <iframe className="position-relative rounded w-100 h-75 shadow-lg" src={mapSrc} style={{ minHeight: "450px", border: "0" }} frameBorder="0" allowFullScreen loading="lazy" aria-hidden="false" title="Makhana Store Location" ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Conect;