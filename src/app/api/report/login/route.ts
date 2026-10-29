// src/app/api/report/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb } from "../../../../../lib/db";
import {
  signSession,
  COOKIE_BY_ROLE,
  cookieOptions,
} from "../../../../../lib/session";

/* ⭐ 1 घंटा = 3600 seconds */
const SESSION_SEC = 60 * 60;

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password required" },
        { status: 400 }
      );
    }

    const db = await readDb();
    const reports = Array.isArray(db.report) ? db.report : [];

    const user = reports.find(
      (r: any) =>
        (r.username === username || r.email === username) &&
        (r.password === password || r.cpassword === password)
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    /* ⭐ Session Cookie बनाएँ — 1 घंटे के लिए */
    const token = signSession(
      {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: "report",
      },
      SESSION_SEC * 1000 // ⭐ 1 hour in milliseconds
    );

    const res = NextResponse.json({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      number: user.number,
      pic: user.pic,
      role: "report",
    });

    /* ⭐ Cookie set करें — 1 घंटे की */
    res.cookies.set({
      name: COOKIE_BY_ROLE.report, // "reportSession"
      value: token,
      ...cookieOptions(SESSION_SEC), // ⭐ 1 hour
    });

    return res;
  } catch (err) {
    console.error("Report login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}