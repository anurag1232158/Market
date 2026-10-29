"use client";
import React, { useEffect, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface AcService {
  id: string;
  name: string;
  pic: string;
  description: string;
  category: string;
  duration: string;
  price: string;
  discount?: string;
  rating: string;
  details: string;
  status: string;
}

export default function BookServicePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceIdParam = searchParams.get("id");
  const [AllCategorys, setAllCategorys] = useState<AcService[]>([]);
  const [selectedService, setSelectedService] = useState<AcService | null>(
    null
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    scheduleDate: "",
  });

  // Fetch all services
  useEffect(() => {
    fetch("/api/acService")
      .then((res) => res.json())
      .then((data: AcService[]) => {
        const activeServices = data.filter((s) => s.status === "Active");
        setAllCategorys(activeServices);

        // If serviceId from URL exists, set selected service
        if (serviceIdParam) {
          const found = activeServices.find((s) => s.id === serviceIdParam);
          setSelectedService(found || null);

          // ✅ Remove query params from URL (without reload)
          router.replace("/BookService");
        }
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
      });
  }, [serviceIdParam, router]);

  const calculateFinalPrice = (price: string, discount?: string) => {
    const p = parseFloat(price);
    const d = discount ? parseFloat(discount) : 0;
    return (p - (p * d) / 100).toFixed(2);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedService) return;

    const bookingData = {
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: calculateFinalPrice(
        selectedService.price,
        selectedService.discount
      ),
      ...formData,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      if (res.ok) {
        alert("Booking submitted successfully!");
        router.push("/Profile");
      } else {
        alert("Booking failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Booking failed. Check console for errors.");
    }
  };

  const handleSelectService = (service: AcService) => {
    setSelectedService(service);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!selectedService) return <></>;

  // Filter out selected service for the "other services" section
  const otherServices = AllCategorys.filter((s) => s.id !== selectedService.id);

  return (
    <div className="container py-5">
      {/* Selected Service */}
      <h2 className="mb-4">Book Service: {selectedService.name}</h2>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <p>{selectedService.description}</p>
          <p>
            <strong>Category:</strong> {selectedService.category}
          </p>
          <p>
            <strong>Duration:</strong> {selectedService.duration}
          </p>
          <p>
            <strong>Price:</strong> ₹{selectedService.price}{" "}
            {selectedService.discount && (
              <>
                <span className="text-danger">
                  -{selectedService.discount}%
                </span>{" "}
                <span className="fw-bold">
                  {calculateFinalPrice(
                    selectedService.price,
                    selectedService.discount
                  )}
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <h4 className="mb-3">Your Details</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <input
          type="date"
          name="scheduleDate"
          value={formData.scheduleDate}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-success">
          Confirm Booking
        </button>
      </form>

      {/* Other Services */}
      <h3 className="mt-5 mb-3">Other Services</h3>
      <div className="row g-4">
        {otherServices.map((service) => (
          <div className="col-md-6 col-lg-4" key={service.id}>
            <div
              className="card h-100 shadow-sm"
              onClick={() => handleSelectService(service)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={`/assets/images/${service.pic}`}
                className="card-img-top"
                alt={service.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{service.name}</h5>
                <p className="card-text">{service.description}</p>
                <p>
                  <strong>Price:</strong> ₹
                  {calculateFinalPrice(service.price, service.discount)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
