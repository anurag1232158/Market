// src/app/(WebPage)/(Page)/Investor/page.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Section {
  title: string;
  icon: string;
  desc1: string;
  desc2: string;
  content: string;
  link?: string;
}

export default function InvestorPage() {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  const sections: Section[] = [
    {
      title: "Financial Reports",
      icon: "fa-file-text-o",
      desc1: "Access our latest financial reports and disclosures to stay informed about Makhana Store's performance.",
      desc2: "Review our quarterly and annual reports to understand our growth trajectory and business strategy.",
      content:
        "Makhana Store publishes quarterly and annual financial reports in compliance with Indian corporate regulations. Our reports cover revenue, profitability, growth metrics, and future outlook. Investors and analysts can download the latest reports to make informed decisions. We maintain full transparency in our financial disclosures and update them regularly.",
      link: "/Investor/FinancialReports",
    },
    {
      title: "Business Overview",
      icon: "fa-briefcase",
      desc1: "Get insights into our Makhana farming network, processing units, and distribution channels across India.",
      desc2: "Understand our business model, revenue streams, and market opportunity in the healthy snacks industry.",
      content:
        "Makhana Store operates an integrated business model — from farming to packaging and distribution. We work with 500+ farmer partners across Bihar, ensuring ethical sourcing and sustainable practices. Our processing units are FSSAI certified, and our distribution network covers 10+ cities with plans to expand further. The healthy snacks industry in India is growing rapidly, and we are well-positioned to capture market share.",
      link: "/Investor/BusinessOverview",
    },
    {
      title: "Corporate Governance",
      icon: "fa-balance-scale",
      desc1: "Learn about our governance practices, board composition, and commitment to transparency.",
      desc2: "Understand our ethical sourcing from 500+ farmer partners and compliance with FSSAI regulations.",
      content:
        "We follow a robust corporate governance framework with an independent board, regular audits, and transparent reporting. Our governance practices are aligned with SEBI guidelines and Indian corporate laws. We are committed to ethical sourcing, fair trade practices, and compliance with all applicable regulations including FSSAI and GST.",
      link: "/Investor/CorporateGovernance",
    },
    {
      title: "Regulatory Compliance",
      icon: "fa-shield",
      desc1: "Stay updated on our FSSAI certifications, GST compliance, and food safety standards.",
      desc2: "Review our quality control processes and adherence to Indian food industry regulations.",
      content:
        "Makhana Store is fully compliant with FSSAI regulations, GST laws, and food safety standards. Our manufacturing units undergo regular inspections and audits. We maintain all necessary certifications and licenses required for food processing and distribution in India. Quality control is a top priority — every batch of Makhana is tested for purity and safety before packaging.",
      link: "/Investor/RegulatoryCompliance",
    },
    {
      title: "Investor FAQs",
      icon: "fa-question-circle",
      desc1: "Find answers to frequently asked questions about investing in Makhana Store.",
      desc2: "Get insights into our business model, growth prospects, and future expansion plans.",
      content:
        "Common investor questions:\n\n1. How can I invest in Makhana Store? — We are currently exploring funding rounds. Contact our IR team for details.\n\n2. What is your revenue model? — We earn through B2C sales, B2B wholesale, and subscription plans.\n\n3. What are your growth plans? — We plan to expand to 25+ cities in the next 2 years and launch new product lines.\n\n4. How do you ensure quality? — All products are FSSAI certified with strict quality control.",
      link: "/Investor/FAQs",
    },
    {
      title: "Investor Relations Contact",
      icon: "fa-envelope",
      desc1: "Have questions about investing in Makhana Store? Reach out to our dedicated IR team.",
      desc2: "Our team is here to assist you with any investment-related inquiries.",
      content:
        "Our dedicated Investor Relations team is available to answer your questions and provide detailed information about investment opportunities.\n\nEmail: investors@makhanastore.com\nPhone: +91 98765 43210\nWorking Hours: Monday to Friday, 10 AM - 6 PM IST.\n\nWe aim to respond to all investor inquiries within 24-48 hours.",
      link: "/Contact",
    },
    {
      title: "Growth Milestones",
      icon: "fa-trophy",
      desc1: "Follow our journey from 1995 to today — from a single pond in Bihar to 10,000+ happy families.",
      desc2: "Track our expansion into new markets, product lines, and distribution partnerships.",
      content:
        "1995: Started with a single pond in Darbhanga, Bihar.\n2010: Expanded to 10+ districts in Bihar.\n2015: Launched packaged Makhana products.\n2020: Crossed 5,000 happy families.\n2023: Launched subscription plans and pan-India delivery.\n2024: Crossed 10,000+ happy families and 500+ farmer partnerships.\n2026: Planning expansion to 25+ cities and new product lines.",
      link: "/Investor/GrowthMilestones",
    },
    {
      title: "Investor Events",
      icon: "fa-calendar",
      desc1: "Participate in our quarterly investor calls and annual general meetings.",
      desc2: "Stay connected with our investor community and learn about upcoming initiatives.",
      content:
        "We host quarterly investor calls to discuss business performance and strategic initiatives. Our Annual General Meeting (AGM) is held every year where we share annual reports and future plans.\n\nUpcoming Events:\n- Q4 2026 Investor Call: December 15, 2026\n- Annual General Meeting: March 20, 2027\n- Q1 2027 Investor Call: April 10, 2027\n\nContact IR team for registration details.",
      link: "/Investor/Events",
    },
  ];

  return (
    <section className="py-5 bg-gray">
      <div className="container">
        {/* Header */}
        <div className="section-title text-left position-relative pb-1 mb-4 mx-auto">
          <h3 className="fw-bold">Investor Relations</h3>
        </div>
        <p className="text-muted mb-4">
          Welcome to Makhana Store's Investor Relations page. Here you will find all the information you need about our company — including
          financial reports, growth metrics, and corporate governance.
        </p>

        {/* Cards */}
        <div className="row py-4">
          {sections.map((section, i) => (
            <div className="col-md-6 mb-4" key={i}>
              <div className="border px-4 py-5 rounded bg-white shadow-sm text-left hover-effect card h-100">
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className={`fa ${section.icon} fs-5`}></i>
                  </div>
                  <h2 className="fw-bold text-dark mb-0" style={{ fontSize: "1.3rem" }}>
                    {section.title}
                  </h2>
                </div>
                <p className="text-muted">{section.desc1}</p>
                <p className="text-muted">{section.desc2}</p>

                {/* ✅ View बटन */}
                <div className="mt-auto">
                  <button
                    className="btn btn-outline-primary btn-sm px-2 fs-8 py-1"
                    onClick={() => setSelectedSection(section)} >
                    <i className="fa fa-eye me-1"></i> View more →
                  </button>
      
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedSection && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          onClick={() => setSelectedSection(null)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title d-flex align-items-center">
                  <i className={`fa-solid ${selectedSection.icon} text-primary me-2`}></i>
                  {selectedSection.title}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedSection(null)}
                ></button>
              </div>

              <div
                className="modal-body"
                style={{ maxHeight: "70vh", overflowY: "auto" }}
              >
                <div className="mb-3">
                  <p className="text-muted mb-2">{selectedSection.desc1}</p>
                  <p className="text-muted mb-2">{selectedSection.desc2}</p>
                </div>

                <hr />

                <div className="mt-3">
                  <h6 className="fw-bold text-dark mb-2">Full Details:</h6>
                  <p style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
                    {selectedSection.content}
                  </p>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedSection(null)}
                >
                  Close
                </button>
                {selectedSection.link && (
                  <Link
                    href={selectedSection.link}
                    className="btn btn-primary"
                    onClick={() => setSelectedSection(null)}
                  >
                    <i className="fa fa-arrow-right me-1"></i> Learn More
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}