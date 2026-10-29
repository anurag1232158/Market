"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAuthUser, setSessionTime } from "../../../../../lib/authUser";

export default function ReportLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const u = username.trim();
    const p = password.trim();
    if (!u || !p) { setError("Please fill in all fields"); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/report/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u, password: p }),
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Invalid username or password");
        setLoading(false);
        return;
      }
      setAuthUser("report", {
        id: data.id,
        name: data.name,
        username: data.username,
        email: data.email,
        number: data.number,
        pic: data.pic,
        expiry: Date.now() + 60 * 60 * 1000,   // 1 hour
      });
      setSessionTime("report");
      router.replace("/ReportHome");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-Login2 py-5 h-100 w-100 d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="container-fluid w-90">
        <div className="row justify-content-center">
          <div className="col-md-6 col-11 shadow px-3 py-5 p-lg-5 bg-white rounded">
            <h2 className="fw-bold text-dark mb-4 text-center">
              <i className="fa fa-chart-bar me-2 color-orange"></i> Login
            </h2>

            {error && <div className="alert alert-danger p-2">{error}</div>}

            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="mb-4 d-flex">
                <i className="fa fa-user me-3 mt-1 color-orange fs-4"></i>
                <input type="text" className="form-control" placeholder="Username" value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(""); }} disabled={loading}/>
              </div>

              <div className="mb-4 d-flex">
                <i className="fa fa-lock me-3 mt-1 color-orange fs-4"></i>
                <div className="input-group">
                  <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" value={password} 
                  onChange={(e) => { setPassword(e.target.value); setError(""); }} disabled={loading} />
                  <button type="button" className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}>
                    <i className={`fa ${   showPassword ? "fa-eye-slash" : "fa-eye" }`}></i>
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={loading} >
                {loading ? ( <> <i className="fa fa-spinner fa-spin me-2"></i> Logging in... </>
                ) : ( <> <i className="fa fa-sign-in me-2"></i> Login </> )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}