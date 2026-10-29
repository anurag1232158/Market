// src/app/(WebPage)/(Page)/Home/Testimonial.tsx
"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface TestimonialType {
  id: number | string;
  name: string;
  pic: string;
  subject: string;
  review: string;
  rating: number;
  city?: string;
  createdAt?: string;
}

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [selected, setSelected] = useState<TestimonialType | null>(null); // ✅ मोडल के लिए

  const settings = {
    infinite: testimonials.length > 3,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    dots: false,
    arrows: true,
    slidesToShow: 3,
    centerPadding: "0px",
    responsive: [
      { breakpoint: 1500, settings: { slidesToShow: 4, centerMode: false, centerPadding: "0px" } },
      { breakpoint: 1200, settings: { slidesToShow: 3, centerMode: false } },
      { breakpoint: 992, settings: { slidesToShow: 2, centerMode: false } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerMode: false } },
      { breakpoint: 576, settings: { slidesToShow: 1, centerMode: false } },
    ],
  };

  useEffect(() => {
    fetch("/api/testimonial")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.testimonial || [];
        const active = list.filter(
          (t: any) => t.status === "Active" || !t.status
        );
        setTestimonials(active);
      })
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  if (testimonials.length === 0) return null;

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className="fs-5 px-1 fw-bold"
        style={{ color: i < Number(rating) ? "#ffc107" : "#9b9b9bff" }}
      >
        ★
      </span>
    ));

  return (
    <div className="container-fluid w-95 py-lg-4">
      {/* Section Title */}
      <div className="section-title text-left position-relative py-3 mb-3 mx-auto">
        <h6 className="fw-bold text-primary text-uppercase">
          <i className="fa fa-quote-left me-1"></i>
          Customer Reviews
        </h6>
        <h4 className="mb-0 fw-bold">What Our Customers Say</h4>
        <p className="text-muted mb-0 mt-1 fs-7">
          100+ खुश परिवारों में से कुछ की राय
        </p>
      </div>

      <Slider {...settings}>
        {testimonials.map((item, index) => (
          <div className="px-1" key={item.id || index}>
            <div className="blog-item bg-light rounded overflow-hidden shadow-sm bordered"
              style={{ cursor: "pointer" }}
              onClick={() => setSelected(item)}>
              <div className="blog-img position-relative overflow-hidden shadow-lg">
                <img src={item.pic
                      ? `/assets/images/${item.pic}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          item.name || "Customer"
                        )}&background=667eea&color=fff&size=200`
                  }
                  className="img-fluid rounded-3 border w-100 border border-warning"
                  alt={item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        item.name || "Customer"
                      )}&background=667eea&color=fff&size=200`;
                  }}
                />

                <span className="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-1 py-1 fs-7 px-2">
                  {item.subject || "Review"}
                </span>
              </div>

              <div className="card-body">
                <h6 className="card-title py-0">
                  {item.name}
                  {item.city && (
                    <small className="text-muted ms-2" style={{ fontSize: "12px" }}>
                      <i className="fa fa-location-dot me-1 text-danger"></i>
                      {item.city}
                    </small>
                  )}
                </h6>
                <p className="card-text text-gray my-0 py-0" style={{ fontSize: "14px" }}>
                  {item.review
                    ? item.review.length > 55
                      ? item.review.slice(0, 55) + "..."
                      : item.review
                    : "Great quality Makhana!"}
                </p>
              </div>

              <div className="card-footer py-1">
                {renderStars(item.rating)}
                <span className="float-end text-muted small">
                  {item.rating || 5}/5
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>


      {selected && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={() => setSelected(null)}>
          <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"> {selected.name} - Review </h5>
                <button className="btn-close"  onClick={() => setSelected(null)}></button>
              </div>

              <div className="modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }} >
                <div className="row">
                  {/* LEFT: Image + Rating */}
                  <div className="col-md-5 text-center">
                    <img
                      src={
                        selected.pic
                          ? `/assets/images/${selected.pic}`
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              selected.name || "Customer"
                            )}&background=667eea&color=fff&size=200`
                      }
                      alt={selected.name}
                      className="img-fluid rounded-3 border shadow-sm"
                      style={{ maxHeight: "250px", objectFit: "cover" }}
                    />
                    <div className="mt-2">
                      <span className="badge bg-primary fs-6 px-3 py-2">
                        {selected.subject || "Review"}
                      </span>
                    </div>
                    <div className="mt-2">
                      {renderStars(selected.rating)}
                    </div>
                    <div className="mt-2">
                      <small className="text-muted">
                        {selected.rating || 5}/5 Rating
                      </small>
                    </div>
                  </div>

                  {/* RIGHT: Review Text */}
                  <div className="col-md-7">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Name:</strong> {selected.name}
                      </li>
                      {selected.city && (
                        <li className="list-group-item">
                          <strong>City:</strong> {selected.city}
                        </li>
                      )}
                      <li className="list-group-item">
                        <strong>Subject:</strong> {selected.subject || "Review"}
                      </li>
                      {selected.createdAt && (
                        <li className="list-group-item">
                          <strong>Date:</strong>{" "}
                          {new Date(selected.createdAt).toLocaleDateString(
                            "en-IN",
                            { day: "2-digit", month: "short", year: "numeric" }
                          )}
                        </li>
                      )}
                    </ul>

                    <div className="mt-3">
                      <h6 className="fw-bold">Full Review:</h6>
                      <p
                        className="text-muted"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {selected.review || "Great quality Makhana!"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonial;