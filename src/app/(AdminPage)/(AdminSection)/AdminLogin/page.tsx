"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAuthUser, setSessionTime } from "../../../../../lib/authUser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); 
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        cache: "no-store",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(`${res.status}: ${err.error || "Server error, terminal check karo"}`);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setAuthUser("admin", {
        id: data.id,
        name: data.name,
        username: data.username,
        expiry: Date.now() + 60 * 60 * 1000,
      });
      setSessionTime("admin");
      router.replace("/AdminHome");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-Login1 py-5 h-100 w-100 d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="container-fluid w-90">
        <div className="row justify-content-center justify-content-md-center align-items-center">
          {/* ===== LOGO - Bigger on mobile ===== */}
          <div className="col-12 col-md-5 col-lg-5 d-flex justify-content-center mb-4 mb-md-0">
            <div className="logo text-center">
              <img
                src={`/assets/images/logo.jpg`}
                alt="Profile"
                className="img-fluid shadow-md"
                style={{
                  width: "clamp(50px, 35vw, 260px)", // mobile pe bada, desktop pe controlled
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          <div className="col-12 col-md-7 col-lg-6 p-4 p-sm-4 p-md-5 bg-white rounded-3 shadow-lg"
            style={{ border: "1px solid #dadce0" }}>
            <h2 className="fw-bold text-dark mb-4 text-center">
              <i className="fa fa-user me-2 color-orange"></i> Login
            </h2>
            {error && <div className="alert alert-danger p-2">{error}</div>}
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="mb-4 d-flex">
                <i className="fa fa-user me-3 mt-1 color-orange fs-4"></i>
                <input type="text" name="username" className="form-control" placeholder="Username" value={credentials.username} onChange={handleChange} disabled={loading}/>
              </div>
              <div className="mb-4 d-flex">
                <i className="fa fa-lock me-3 mt-1 color-orange fs-4"></i>
                <input type="password" name="password" className="form-control" placeholder="Password" value={credentials.password} onChange={handleChange} disabled={loading}/>
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? (
                  <>
                    <i className="fa fa-spinner fa-spin me-2"></i> Logging in...
                  </>
                ) : (
                  <>
                    <i className="fa fa-sign-in me-2"></i> Login
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}