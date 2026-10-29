// src/app/(WebPage)/(UserLogin)/Login/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setAuthUser, setSessionTime } from "../../../../../lib/authUser";

const RESEND_SECONDS = 60;
const SESSION_MS = 60 * 60 * 1000;

const post = async (url: string, body: any) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { ok: res.ok, data: await res.json().catch(() => ({})) };
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/Profile"; // ⭐ redirect support

  const [step, setStep] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  const phone = `+91${mobile}`;

  useEffect(() => {
    router.prefetch(redirect);
  }, [router, redirect]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const sendOtp = async () => {
    setError("");
    setLoading(true);
    try {
      const { ok, data } = await post("/api/send-otp", { phone });
      if (ok && data.success) {
        setOtp("");
        setTimer(RESEND_SECONDS);
        return true;
      }
      setError(data.message || "Could not send OTP. Try again!");
    } catch {
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
    return false;
  };

  const handleSendOtp = async (e: any) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    if (await sendOtp()) setStep("otp");
  };

  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { ok, data } = await post("/api/verify-otp", { phone, code: otp });
      if (!ok || !data.success || !data.user) {
        setError(data.message || "Could not verify OTP. Try again!");
        return;
      }

      // ✅ 1. User data save
      const now = Date.now();
      setAuthUser("user", {
        ...data.user,
        phone,
        loginAt: now,
        expiresAt: now + SESSION_MS,
        expiry: now + SESSION_MS,
      });

      // ✅ 2. Session time save (2 hours) — यही missing था
      setSessionTime("user");

      // ✅ 3. Redirect (login के बाद वापस OrderTrack पर)
      router.replace(redirect);
    } catch {
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-Login py-5">
      <div className="container-fluid w-90">
        <div className="row justify-content-center justify-content-md-end align-items-center">
          <div
            className="col-11 col-sm-9 col-md-7 col-lg-6 shadow p-3 p-sm-4 p-md-5 bg-white rounded"
            style={{ border: "1px solid #dadce0" }}
          >
            <h2 className="fw-bold text-dark mb-3 text-center fs-4 fs-md-2">
              <i className="fa fa-mobile-screen-button fa-swing me-2 color-orange"></i>
              {step === "mobile" ? "Login" : "Verify OTP"}
            </h2>

            <p className="text-center text-muted small mb-4">
              One number, all solutions. New user? We'll set up your account instantly.
            </p>

            {error && (
              <div className="alert alert-danger p-2 text-center small">
                {error}
              </div>
            )}

            {step === "mobile" && (
              <form onSubmit={handleSendOtp}>
                <div className="mb-4 d-flex flex-nowrap align-items-center">
                  <i className="fa fa-phone color-orange fs-6 fs-sm-5 flex-shrink-0"></i>
                  <input
                    type="tel"
                    className="form-control mx-2 py-2"
                    style={{ fontSize: "16px" }}
                    placeholder="Enter Mobile Number"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-100 fw-bold py-2"
                >
                  <i className="fa fa-paper-plane me-2"></i>
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleVerifyOtp}>
                <p className="small text-muted text-center">
                  +91 {mobile}{" "}
                  <button
                    type="button"
                    className="btn btn-link btn-sm p-0"
                    onClick={() => {
                      setStep("mobile");
                      setOtp("");
                      setError("");
                      setTimer(0);
                    }}
                  >
                    Change
                  </button>
                </p>

                <div className="mb-4 d-flex flex-nowrap align-items-center justify-content-center">
                  <i className="fa fa-key color-orange fs-6 fs-sm-5 flex-shrink-0"></i>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="form-control text-center mx-2 py-2"
                    style={{ fontSize: "16px" }}
                    placeholder="Enter OTP"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-success w-100 fw-bold py-2"
                >
                  <i className="fa fa-check me-2"></i>
                  {loading ? "Verifying..." : "Verify & Continue"}
                </button>

                <div className="text-center mt-3">
                  {timer > 0 ? (
                    <span className="small text-muted">Resend OTP in {timer}s</span>
                  ) : (
                    <button
                      type="button"
                      disabled={loading}
                      className="btn btn-link btn-sm"
                      onClick={sendOtp}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}