// lib/session.ts
import crypto from "crypto";

export type Role = "user" | "admin" | "report";

export const COOKIE_BY_ROLE: Record<Role, string> = {
  user: "session",
  admin: "adminSession",
  report: "reportSession",
};
export const SESSION_COOKIE = COOKIE_BY_ROLE.user; // purane imports na tootein

export const cookieOptions = (maxAge = 60 * 30) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge,
});

const secret = () => {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET is not set");
  return s;
};

const hmac = (body: string) =>
  crypto.createHmac("sha256", secret()).update(body).digest("base64url");

export function signSession(payload: object, ttlMs = 30 * 60 * 1000) {
  const body = Buffer.from(
    JSON.stringify({ ...payload, exp: Date.now() + ttlMs })
  ).toString("base64url");
  return `${body}.${hmac(body)}`;
}

export function verifySession(token?: string | null): any | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const a = Buffer.from(sig);
  const b = Buffer.from(hmac(body));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    return data.exp && data.exp > Date.now() ? data : null;
  } catch {
    return null;
  }
}

export function readCookie(req: Request, name: string) {
  const raw = req.headers.get("cookie") || "";
  const hit = raw
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(name + "="));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : null;
}

export const getSession = (req: Request, role: Role) => {
  const s = verifySession(readCookie(req, COOKIE_BY_ROLE[role]));
  return s && s.role === role ? s : null;
};
export const getUserSession = (req: Request) => getSession(req, "user");
export const getAdminSession = (req: Request) => getSession(req, "admin");
export const getReportSession = (req: Request) => getSession(req, "report");