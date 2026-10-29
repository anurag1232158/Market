//api/admin/login/
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { signSession, COOKIE_BY_ROLE, cookieOptions } from "../../../../../lib/session";

const dataFilePath = path.join(process.cwd(), "database", "data.json");

const SESSION_SEC = 60 * 60; // 1 ghanta, login page ke SESSION_MS ke barabar

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const u = String(body.username ?? "").trim();
    const p = String(body.password ?? "").trim();

    const json = JSON.parse(await fs.readFile(dataFilePath, "utf8"));
    const admin = (json.admin || []).find(
      (a: any) => String(a.username).trim() === u && String(a.password).trim() === p
    );

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({
      id: admin.id,
      name: admin.name,
      username: admin.username,
      role: "admin",
    });

    // Admin ki alag cookie (user/report se mix nahi hogi)
    res.cookies.set(
      COOKIE_BY_ROLE.admin,
      signSession({ id: admin.id, role: "admin" }, SESSION_SEC * 1000),
      cookieOptions(SESSION_SEC)
    );
    return res;
  } catch (err) {
    console.error("admin login error:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}