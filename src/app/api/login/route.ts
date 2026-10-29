//src>app>api>login>route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { signSession, COOKIE_BY_ROLE, cookieOptions } from "../../../../lib/session";

const dataFilePath = path.join(process.cwd(), "database", "data.json");

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }
    const json = JSON.parse(await fs.readFile(dataFilePath, "utf8"));
    const admins = json.admin || [];
    const found = admins.find(
      (a: any) => a.username === username && a.password === password
    );

    if (!found) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const res = NextResponse.json({
      id: found.id,
      name: found.name,
      username: found.username,
      role: "admin",
      message: "Login successful",
    });

    // admin ki apni alag cookie (user/report se mix nahi hogi)
    res.cookies.set(
      COOKIE_BY_ROLE.admin,
      signSession({ id: found.id, role: "admin" }),
      cookieOptions()
    );
    return res;
  } catch (error) {
    console.error("❌ Error logging in:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}