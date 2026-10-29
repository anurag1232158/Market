// src/app/(WebPage)/(Page)/Home/Newsletter/page.tsx
import React from "react";

function Newsletter() {
  return (
    <section className="py-5">
      <div className="container-fluid w-95 text-center">
        <div className="row justify-content-center g-3">
          {[
            {
              icon: "fa fa-truck",
              title: "Free Shipping",
              subtitle: "₹500+ Orders पर",
            },
            {
              icon: "fa fa-leaf",
              title: "100% Organic",
              subtitle: "Pure Bihar Makhana",
            },
            {
              icon: "fa fa-phone",
              title: "24/7 Support",
              subtitle: "WhatsApp + Call",
            },
            {
              icon: "fa fa-lock",
              title: "Secure Payment",
              subtitle: "UPI, Card, COD",
            },
            {
              icon: "fa fa-tags",
              title: "Member Discount",
              subtitle: "Up to 40% Off",
            },
            {
              icon: "fa fa-shield",
              title: "Quality Guarantee",
              subtitle: "FSSAI Certified",
            },
          ].map((item, index) => (
            <div className="col-6 col-md-4 col-lg-2" key={index}>
              <div className="p-4 rounded-4 bg-light h-100 hover-effect shadow">
                <i
                  className={`fa-solid ${item.icon} fa-2x text-primary mb-2`}
                ></i>
                <h6 className="fw-bold mb-1 text-dark">{item.title}</h6>
                <small className="text-muted">{item.subtitle}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Newsletter;