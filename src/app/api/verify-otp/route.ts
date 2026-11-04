// app/api/verify-otp/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import twilio from "twilio";
import path from "path";
import fs from "fs/promises";
import {
  signSession,
  COOKIE_BY_ROLE,
  cookieOptions,
  SESSION_DURATION,
} from "../../../../lib/session";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID } =
  process.env;

const client =
  TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN
    ? twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    : null;

const DB_DIR = path.join(process.cwd(), "database");
const DATA_FILE = path.join(DB_DIR, "data.json");

/** Always store numbers as plain 10 digits */
const last10 = (v: unknown) =>
  String(v ?? "").replace(/\D/g, "").slice(-10);

const fail = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

async function readData(): Promise<Record<string, any>> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return raw.trim() ? JSON.parse(raw) : {};
  } catch (err: any) {
    if (err?.code === "ENOENT") return {};
    throw err;
  }
}

async function writeData(data: Record<string, any>) {
  await fs.mkdir(DB_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

const makeUserId = (number: string, users: any[]) => {
  const used = new Set(users.map((u) => String(u.id)));
  for (let len = 6; len <= number.length; len++) {
    const id = number.slice(-len);
    if (!used.has(id)) return id;
  }
  return number;
};

/**
 * Find user by phone (normalised). If not found, return null — caller decides.
 * Creates a new record only if neither phone nor a matching placeholder exists.
 */
async function getOrCreateByPhone(phone: string) {
  const data = await readData();
  const key =
    Array.isArray(data.users) && !Array.isArray(data.user) ? "users" : "user";
  const users: any[] = data[key] ?? [];

  const idx = users.findIndex((u) => last10(u.number) === phone);

  if (idx !== -1) {
    /* Existing record by phone — enrich missing fields */
    if (!users[idx].username) {
      users[idx].username = `user_${users[idx].id}`;
    }
    if (!users[idx].number || String(users[idx].number).trim() === "") {
      users[idx].number = phone;
    }
    data[key] = users;
    await writeData(data);
    const { password, ...safe } = users[idx];
    return safe;
  }

  /* No record — create new */
  const id = makeUserId(phone, users);
  const newUser = {
    id,
    username: `user_${id}`,
    number: phone,
    createdAt: Date.now(),
  };
  data[key] = [...users, newUser];
  await writeData(data);
  return newUser;
}

export async function POST(req: Request) {
  try {
    const { phone, code } = await req.json();

    if (!phone || !code) return fail("Phone and code are required");
    if (!client || !TWILIO_VERIFY_SERVICE_SID) {
      return fail("Server config error: Twilio keys missing.", 500);
    }

    const check = await client.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: phone, code });

    if (check.status !== "approved") {
      return fail("Invalid OTP. Please try again!");
    }

    const user = await getOrCreateByPhone(last10(phone));

    const res = NextResponse.json({ success: true, user });

    res.cookies.set(
      COOKIE_BY_ROLE.user,
      signSession({ role: "user", id: String(user.id) }, SESSION_DURATION),
      cookieOptions()
    );

    return res;
  } catch (error: any) {
    console.error("verify-otp error:", error?.code, error?.message);
    return fail(
      error?.code === 20404
        ? "OTP expired or already used. Please click Resend OTP."
        : error?.code === 60202
        ? "Too many wrong attempts. Please request a new OTP."
        : error?.message || "Could not verify OTP. Try again!"
    );
  }
}