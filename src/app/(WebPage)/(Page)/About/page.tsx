// src/app/(WebPage)/(Page)/About/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Leader = {
  id: string;
  name: string;
  title?: string;
  pic: string;
  email?: string;
  message?: string;
  phone?: string;
  role?: string;
};

type Investor = {
  id: string;
  name: string;
  title?: string;
  pic?: string;
  role?: string; // ⭐ नया field
};

export default function AboutPage() {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [leadership, setLeadership] = useState<Leader[]>([]);
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);

  useEffect(() => {
    fetch("/api/leadership")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.leadership || [];
        setLeadership(list);
      })
      .catch((err) => console.error("Error fetching leadership:", err));

    fetch("/api/investors")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.investors || [];
        setInvestors(list);
      })
      .catch((err) => console.error("Error fetching investors:", err));
  }, []);

  const leadershipSettings = {
    infinite: leadership.length > 4,
    autoplay: true,
    autoplaySpeed: 1500,
    centerMode: true,
    dots: false,
    arrows: false,
    slidesToShow: 4,
    responsive: [
      { breakpoint: 1500, settings: { slidesToShow: 4, centerMode: false } },
      { breakpoint: 1200, settings: { slidesToShow: 4, centerMode: false } },
      { breakpoint: 992, settings: { slidesToShow: 3, centerMode: false } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerMode: false } },
      { breakpoint: 576, settings: { slidesToShow: 1, centerMode: false } },
    ],
  };

  const investorSettings = {
    infinite: investors.length > 4,
    autoplay: true,
    autoplaySpeed: 1000,
    centerMode: true,
    dots: false,
    arrows: false,
    slidesToShow: 4,
    responsive: [
      { breakpoint: 1500, settings: { slidesToShow: 4, centerMode: false } },
      { breakpoint: 1200, settings: { slidesToShow: 4, centerMode: false } },
      { breakpoint: 992, settings: { slidesToShow: 3, centerMode: false } },
      { breakpoint: 768, settings: { slidesToShow: 2, centerMode: false } },
      { breakpoint: 576, settings: { slidesToShow: 1, centerMode: false } },
    ],
  };

  return (
    <section className="bg-gray py-5">
      <div className="container-fluid w-90">
        {/* ABOUT US */}
        <div className="text-center mb-3">
          <h3 className="fw-bold">About Us</h3>
        </div>
        <p className="lead text-muted fs-6 text-center mb-3">
          At our company, we believe in the power of collaboration and
          creativity to transform ideas into reality. We are a team of
          passionate individuals dedicated to delivering innovative solutions
          that make a difference in the world.
        </p>

        {/* Cards */}
        <div className="row g-3">
          {[
            { title: "Our Mission", text: "To provide high-quality services that meet the needs of our clients and help them achieve their goals." },
            { title: "Our Vision", text: "To be a leading provider of exceptional services that inspire and transform lives." },
            { title: "Our Values", text: "Integrity, Excellence, Innovation, and Customer Focus are the core values that guide our actions and decisions." },
            { title: "Our Team", text: "We are a team of passionate individuals dedicated to delivering innovative solutions that make a difference in the world." },
            { title: "Our Approach", text: "We take a collaborative approach, working closely with our clients to understand their needs and deliver tailored solutions that exceed expectations." },
            { title: "Our Impact", text: "We are committed to making a positive impact in the communities we serve, through our services and CSR initiatives." },
          ].map((card, idx) => (
            <div className="col-lg-6" key={idx}>
              <div className="card h-100 border-light shadow-sm hover-effect p-4">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{card.title}</h5>
                  <p className="card-text text-muted mb-0">{card.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WHO WE ARE */}
        <section className="py-5">
          <div className="text-left mb-2">
            <h3 className="fw-bold">Who We Are</h3>
          </div>
          <p className="lead text-muted fs-6">
            NewTyps is a technology-driven, full-stack online services
            marketplace for high-quality home and beauty services.
          </p>

          <div className="row g-3 my-2">
            {[
              { number: "4,000+", label: "Active Service Professional*" },
              { number: "500K+", label: "Consumers**" },
              { number: "10", label: "Cities**" },
              { number: "1", label: "Countries" },
            ].map((item, idx) => (
              <div className="col-6 col-md-3" key={idx}>
                <div className="border px-4 py-5 rounded bg-white shadow-sm text-center hover-effect">
                  <h3 className="fw-bold text-dark">{item.number}</h3>
                  <p className="text-muted mb-0">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LEADERSHIP */}
        {leadership.length > 0 && (
          <section className="my-2 pb-3">
            <div className="text-left mb-2">
              <h3 className="fw-bold">Leadership Team</h3>
            </div>
            <p className="lead text-muted fs-6">
              The backbone of our success is our dedicated leadership team.
              They are the driving force behind our success.
            </p>

            <Slider {...leadershipSettings}>
              {leadership.map((item) => (
                <div key={item.id} className="px-1">
                  <div
                    className="border rounded bg-white shadow-sm text-left p-2 position-relative overflow-hidden"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedLeader(item)}
                  >
                    <div className="position-relative">
                      <img
                        src={
                          item.pic
                            ? `/assets/images/${item.pic}`
                            : "/assets/images/placeholder.png"
                        }
                        alt={item.name}
                        className="w-100"
                        style={{ height: "200px", objectFit: "cover" }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/images/placeholder.png";
                        }}
                      />
                      {item.role && (
                        <span className="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-1 py-1 px-2 fs-7 small">
                          {item.role}
                        </span>
                      )}
                    </div>

                    <h5 className="fw-bold mb-1 px-2 mt-2 text-dark">
                      {item.name}
                    </h5>

                    {item.email && (
                      <p className="text-muted small mb-1 px-2">
                        <i className="fa fa-envelope me-1"></i>
                        {item.email}
                      </p>
                    )}

                    {item.message && (
                      <p
                        className="text-muted small px-2 mb-2"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                       {item.message?.length > 30
                       ? item.message.slice(0, 30) + "..."
                       : item.message}
                      </p>
                    )}

                    <div className="text-center pb-2">
                      <small className="text-primary">
                        Click to view details →
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </section>
        )}

        {/* INVESTORS */}
        {investors.length > 0 && (
          <section className="pb-1">
            <div className="text-left mb-2">
              <h3 className="fw-bold">Investors</h3>
            </div>
            <p className="lead text-muted fs-6">
              We are backed by some of the most respected investors in the
              industry, who share our vision for transforming home services.
            </p>

            <Slider {...investorSettings}>
              {investors.map((item) => (
                <div key={item.id} className="px-1">
                  <div
                    className="border rounded bg-white shadow-sm text-center hover-effect overflow-hidden position-relative"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedInvestor(item)}
                  >
                    <div className="position-relative">
                      <img
                        src={
                          item.pic
                            ? `/assets/images/${item.pic}`
                            : "/assets/images/placeholder.png"
                        }
                        alt={item.name}
                        className="w-100"
                        style={{ height: "200px", objectFit: "cover" }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/images/placeholder.png";
                        }}
                      />

                      {/* ⭐ Role Badge */}
                      {(item.role || item.title) && (
                        <span className="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-1 py-1 px-2 fs-7 small">
                          {item.role || item.title}
                        </span>
                      )}
                    </div>

                    <h5 className="fw-bold text-dark mt-2 mb-1 px-2">
                      {item.name}
                    </h5>
                   {/* <p className="text-muted small mb-2 px-2">
                      {item.title || "Investor"}
                    </p>*/}

                    <div className="pb-2">
                      <small className="text-primary">
                      View more
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </section>
        )}
      </div>

      {/* LEADER VIEW MODAL */}
      {selectedLeader && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelectedLeader(null)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Leadership Profile</h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedLeader(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-5 text-center">
                    <img
                      src={
                        selectedLeader.pic
                          ? `/assets/images/${selectedLeader.pic}`
                          : "/assets/images/placeholder.png"
                      }
                      alt={selectedLeader.name}
                      className="img-fluid rounded-3 border shadow-sm"
                      style={{ maxHeight: "300px", objectFit: "cover" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/assets/images/placeholder.png";
                      }}
                    />
                    {selectedLeader.role && (
                      <div className="mt-3">
                        <span className="badge bg-primary fs-6 px-3 py-2">
                          {selectedLeader.role}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="col-md-7">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Name:</strong> {selectedLeader.name}
                      </li>
                      {selectedLeader.title && (
                        <li className="list-group-item">
                          <strong>Title:</strong> {selectedLeader.title}
                        </li>
                      )}
                      {selectedLeader.role && (
                        <li className="list-group-item">
                          <strong>Role:</strong> {selectedLeader.role}
                        </li>
                      )}
                      {selectedLeader.email && (
                        <li className="list-group-item">
                          <strong>Email:</strong>{" "}
                          <a href={`mailto:${selectedLeader.email}`}>
                            {selectedLeader.email}
                          </a>
                        </li>
                      )}
                    </ul>

                    {selectedLeader.message && (
                      <div className="mt-3">
                        <h6 className="fw-bold">Message:</h6>
                        <p
                          className="text-muted"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {selectedLeader.message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedLeader(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INVESTOR VIEW MODAL */}
      {selectedInvestor && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelectedInvestor(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Investor Profile</h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedInvestor(null)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={
                    selectedInvestor.pic
                      ? `/assets/images/${selectedInvestor.pic}`
                      : "/assets/images/placeholder.png"
                  }
                  alt={selectedInvestor.name}
                  className="img-fluid rounded-3 border shadow-sm mb-3"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/images/placeholder.png";
                  }}
                />
                <h4 className="fw-bold">{selectedInvestor.name}</h4>
                <p className="text-muted mb-2">
                  {selectedInvestor.title || "Investor"}
                </p>

                {/* ⭐ Role Badge in Modal */}
                {(selectedInvestor.role || selectedInvestor.title) && (
                  <span className="badge bg-primary fs-6 px-3 py-2">
                    {selectedInvestor.role || selectedInvestor.title}
                  </span>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedInvestor(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}