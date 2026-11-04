// app/api/google-login/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import {
  signSession,
  COOKIE_BY_ROLE,
  cookieOptions,
  SESSION_DURATION,
} from "../../../../lib/session";

const dataFilePath = path.join(process.cwd(), "database", "data.json");

const last10 = (v: unknown) =>
  String(v ?? "").replace(/\D/g, "").slice(-10);

export async function POST(req: Request) {
  try {
    const { access_token } = await req.json();
    if (!access_token) {
      return NextResponse.json(
        { success: false, message: "No token" },
        { status: 400 }
      );
    }

    const googleRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    if (!googleRes.ok) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const googleUser = await googleRes.json();
    const gEmail = String(googleUser.email || "").toLowerCase().trim();
    if (!gEmail) {
      return NextResponse.json(
        { success: false, message: "Google account has no email" },
        { status: 400 }
      );
    }

    const fileData = await fs.readFile(dataFilePath, "utf8");
    const json = JSON.parse(fileData);
    const users: any[] = json.user || json.usersrole || [];

    /* 1. Match by email (normalised) */
    let idx = users.findIndex(
      (u: any) => String(u.email || "").toLowerCase().trim() === gEmail
    );

    /* 2. If no email match, and Google gave us a phone, match by phone.
          (userinfo endpoint rarely returns phone; usually skip)
          If you keep phone in a separate step, you can extend here. */
    // if (idx === -1 && googleUser.phone_number) { ... }

    let user: any;
    if (idx !== -1) {
      user = users[idx];
      /* Enrich missing fields from Google */
      if (!user.name && googleUser.name) user.name = googleUser.name;
      if (!user.pic && googleUser.picture) user.pic = googleUser.picture;
      /* Normalise number if present */
      if (user.number) user.number = last10(user.number);
      users[idx] = user;
    } else {
      user = {
        id: randomUUID().slice(0, 4),
        name: googleUser.name || "",
        email: gEmail,
        pic: googleUser.picture || "",
        number: "",
        role: "user",
        createdAt: new Date().toISOString(),
      };
      users.push(user);
    }

    await fs.writeFile(
      dataFilePath,
      JSON.stringify({ ...json, user: users }, null, 2),
      "utf8"
    );

    const res = NextResponse.json({ success: true, user });

    res.cookies.set(
      COOKIE_BY_ROLE.user,
      signSession({ role: "user", id: String(user.id) }, SESSION_DURATION),
      cookieOptions()
    );

    return res;
  } catch (error) {
    console.error("google-login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}