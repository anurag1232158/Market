"use client";

import { Suspense, useEffect, useState } from "react";
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
  return {
    ok: res.ok,
    data: await res.json().catch(() => ({})),
  };
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect") || "/Profile";
  const redirect = rawRedirect.startsWith("/") ? rawRedirect : "/Profile";
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
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
    const t = setTimeout(() => {
      setTimer((s) => s - 1);
    }, 1000);

    return () => clearTimeout(t);
  }, [timer]);

  const sendOtp = async () => {
    setError("");
    setLoading(true);
    try {
      const { ok, data } = await post("/api/send-otp", {
        phone,
      });
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

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    if (await sendOtp()) {
      setStep("otp");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { ok, data } = await post("/api/verify-otp", {
        phone,
        code: otp,
      });
      if (!ok || !data.success || !data.user) {
        setError(data.message || "Could not verify OTP. Try again!");
        return;
      }
      const now = Date.now();
      setAuthUser("user", {
        ...data.user,
        phone,
        loginAt: now,
        expiresAt: now + SESSION_MS,
        expiry: now + SESSION_MS,
      });
      setSessionTime("user");
      router.replace(redirect);
    } catch {
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-Login p-lg-5 p-2 py-md-5">
      <div className="container-fluid">
        <div className="row justify-content-center justify-content-md-center align-items-center">
          {/* ===== LOGO - Bigger on mobile ===== */}
          <div className="col-12 col-md-5 col-lg-5 d-flex justify-content-center mb-4 mb-md-0 shadow-md">
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

          {/* ===== FORM - Bigger on mobile ===== */}
          <div className="col-12 col-md-7 col-lg-6 p-4 p-sm-4 p-md-5 bg-white rounded-3 shadow-lg"
            style={{ border: "1px solid #dadce0" }}>
            <h2 className="fw-bold text-dark mb-2 text-center fs-3 fs-md-4">
              <i className="fa fa-mobile text-primary fs-2 me-2 mobile-swing"></i>
              {step === "mobile" ? "Login" : "Verify OTP"}
            </h2>

            <p className="text-center text-muted small my-2 pt-2 px-2">
              One number, all solutions. New user? We'll set up your account
              instantly.
            </p>

            {/* Reserve space to avoid layout shift */}
            <div style={{ minHeight: ".5rem" }} className="mb-2">
              {error && (
                <div className="alert alert-danger py-2 px-2 text-center small mb-0">
                  {error}
                </div>
              )}
            </div>

            {step === "mobile" && (
              <form onSubmit={handleSendOtp} noValidate>
                <div className="input-group my-4">
                  <span className="input-group-text bg-white">
                    <i className="fa fa-phone color-orange fs-6 fs-sm-5 flex-shrink-0"></i>
                  </span>

                  <span className="input-group-text bg-white fw-semibold">
                    +91
                  </span>

                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    className="form-control py-2"
                    style={{ fontSize: "16px" }}
                    placeholder="Mobile number"
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
              <form onSubmit={handleVerifyOtp} noValidate>
                <p className="small text-muted text-center my-4">
                  Sent to <strong>+91 {mobile}</strong>{" "}
                  <button
                    type="button"
                    className="btn btn-link btn-sm p-1 align-baseline"
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

                <div className="input-group mb-3">
                  <span className="input-group-text bg-white">
                    <i className="fa fa-key color-orange fs-6 fs-sm-5 flex-shrink-0"></i>
                  </span>

                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="form-control text-center py-2 fw-bold"
                    style={{ fontSize: "18px", letterSpacing: "6px" }}
                    placeholder="••••••"
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
                  <i className="fa fa-check me-2"></i>{" "}
                  {loading ? "Verifying..." : "Verify & Continue"}
                </button>

                <div className="text-center mt-3" style={{ minHeight: "32px" }}>
                  {timer > 0 ? (
                    <span className="small text-muted">Resend OTP in {timer}s</span>
                  ) : (
                    <button
                      type="button"
                      disabled={loading}
                      className="btn btn-link btn-sm py-1"
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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-5 text-muted small">Loading…</div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}