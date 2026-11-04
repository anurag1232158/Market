"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  setAuthUser,
  setSessionTime,
  SESSION_DURATION,
} from "../../../../../lib/authUser";
import { useGoogleLogin } from "@react-oauth/google";

const RESEND_SECONDS = 60;

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
  const [googleLoading, setGoogleLoading] = useState(false);
  const phone = `+91${mobile}`;

  useEffect(() => {
    router.prefetch(redirect);
  }, [router, redirect]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError("");
      setGoogleLoading(true);
      try {
        const { ok, data } = await post("/api/google-login", {
          access_token: tokenResponse.access_token,
        });

        if (!ok || !data.success || !data.user) {
          setError(data.message || "Google Login failed. Try again!");
          return;
        }

        const now = Date.now();
        setAuthUser("user", {
          ...data.user,
          loginAt: now,
          expiresAt: now + SESSION_DURATION,
          expiry: now + SESSION_DURATION,
        });
        setSessionTime("user");
        router.replace(redirect);
      } catch {
        setError("Something went wrong during Google login.");
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      setError("Google Login was cancelled or failed.");
    },
  });

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

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    if (await sendOtp()) setStep("otp");
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
      const userId = data.user.id ? String(data.user.id) : mobile;
      setAuthUser("user", {
        ...data.user,
        id: userId,
        number: data.user.number || mobile,
        phone,
        loginAt: now,
        expiresAt: now + SESSION_DURATION,
        expiry: now + SESSION_DURATION,
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
    <section
      className="bg-Login d-flex align-items-center"
      style={{ minHeight: "100vh", padding: "15px" }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 d-none d-md-flex justify-content-center mb-md-0">
            <div className="text-center">
              <img
                src="/assets/images/logo.png"
                alt="Logo Desktop"
                className="img-fluid rounded-4 shadow-lg"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <div
            className="col-12 col-sm-10 col-md-7 col-lg-5 bg-white rounded-4 shadow-lg p-4 p-md-5 mobile-dark-card"
            style={{ border: "1px solid #dadce0" }}
          >
            <div className="text-center mb-4 d-block d-md-none">
              <img
                src="/assets/images/logo.png"
                alt="Logo Mobile"
                className="img-fluid rounded shadow-sm"
                style={{ width: "100%",
                  maxWidth: "150px",
                  height: "auto", objectFit: "cover" }}
              />
            </div>

            <h2 className="fw-bold text-dark mb-2 text-center fs-3 title-text">
              {step === "mobile"
                ? "Login to Your Account"
                : "Phone Verification"}
            </h2>

            <p className="text-center text-muted small mb-4 px-2 subtitle-text">
              {step === "mobile"
                ? "One number, all solutions. We'll set up your account instantly."
                : `Enter 6 digit verification code sent to +91 ${mobile}`}
            </p>

            <div style={{ minHeight: "1.5rem" }} className="mb-2">
              {error && (
                <div className="alert alert-danger py-2 px-2 text-center small mb-0">
                  {error}
                </div>
              )}
            </div>

            {step === "mobile" && (
              <form onSubmit={handleSendOtp} noValidate>
                <button
                  type="button"
                  className="btn w-100 fw-semibold py-2 mb-3 d-flex align-items-center justify-content-center google-btn"
                  style={{
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    color: "#333",
                    borderRadius: "10px",
                  }}
                  onClick={() => googleLogin()}
                  disabled={googleLoading || loading}
                >
                  {googleLoading ? (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <img
                      src="https://img.icons8.com/color/16/000000/google-logo.png"
                      alt="Google"
                      className="me-2"
                    />
                  )}
                  {googleLoading ? "Connecting..." : "Continue with Google"}
                </button>

                <div className="d-flex align-items-center mb-3">
                  <hr className="flex-grow-1 divider-line" />
                  <span className="px-2 text-muted small divider-text">or</span>
                  <hr className="flex-grow-1 divider-line" />
                </div>

                <div className="input-group mb-4 shadow-sm rounded-3 overflow-hidden">
                  <span className="input-group-text bg-white border-end-0 input-bg">
                    <i className="fa fa-phone color-orange"></i>
                  </span>
                  <span className="input-group-text bg-white border-start-0 border-end-0 fw-semibold text-muted input-bg">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    className="form-control py-2 border-start-0 input-bg"
                    style={{ fontSize: "16px", boxShadow: "none" }}
                    placeholder="Phone Number"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, ""))
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="btn btn-primary w-100 fw-bold py-2 shadow-sm rounded-3 btn-send-otp"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleVerifyOtp} noValidate>
                <p className="small text-muted text-center mb-4">
                  Sent to <strong>+91 {mobile}</strong>{" "}
                  <button
                    type="button"
                    className="btn btn-link btn-sm p-0 ms-1 align-baseline"
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

                <div className="input-group mb-4 shadow-sm rounded-3 overflow-hidden">
                  <span className="input-group-text bg-white border-end-0 input-bg">
                    <i className="fa fa-key color-orange"></i>
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="form-control text-center py-2 fw-bold border-start-0 input-bg"
                    style={{
                      fontSize: "18px",
                      letterSpacing: "6px",
                      boxShadow: "none",
                    }}
                    placeholder="••••••"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, ""))
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-success w-100 fw-bold py-2 shadow-sm rounded-3 btn-verify"
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                </button>

                <div className="text-center mt-3" style={{ minHeight: "32px" }}>
                  {timer > 0 ? (
                    <span className="small text-muted">
                      Resend OTP in {timer}s
                    </span>
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