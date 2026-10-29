"use client";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent } from "react";

const FooterBottom = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // <-- NEW
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email.");
      setStatus("error");
      return;
    }

    if (!phone.trim()) {
      setMessage("Please enter your phone number.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setStatus("error");
        setMessage("Subscription failed.");
        return;
      }
      await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: `+91${phone}`, // CORRECT PHONE NUMBER
          message: `Thank you for subscribing with email: ${email}`,
        }),
      });

      setStatus("success");
      setMessage("Subscription successful! SMS sent.");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
      setMessage("Something went wrong.");
    }
  };

  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-6 col-12">
        <div className="d-flex flex-column align-items-center justify-content-center text-center h-100 bg-success py-lg-3 px-lg-3 py-3 px-3 rounded">
          <Link href="/" className="navbar-brand p-0">
            <h1 className="m-0 text-white"> Ed- <span className="text-secondary text-decoration-underline"> Test </span>{" "} </h1>
          </Link>
          <p className="my-3 text-white text-start">
           Subscribe to our newsletter to get regular updates about our services.
          </p>
          {status !== "idle" && (
          <p className={`mt-0 fw-bold ${   status === "success" ? "text-success" : "text-danger" }`}> {message} </p>
          )}

          <form onSubmit={handleSubmit} className="w-100">
            {/* Email Input */}
            <div className="input-group mb-3">
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control border-white p-2" placeholder="Your Email" />
            </div>

            {/* Phone Input */}
            <div className="input-group mb-3">
             <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control border-white p-2" placeholder="Your Phone Number" />
            </div>

            <button className="btn btn-dark w-100">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FooterBottom;
