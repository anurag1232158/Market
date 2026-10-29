import { NextRequest, NextResponse } from "next/server";
import { COOKIE_BY_ROLE, Role } from "../../../../lib/session";

export async function POST(req: NextRequest) {
  try {
    const { role } = await req.json();
    const roleKey: Role = role || "user";

    const res = NextResponse.json({ success: true });

    /* ⭐ Specific role की cookie clear करें */
    if (COOKIE_BY_ROLE[roleKey]) {
      res.cookies.set({
        name: COOKIE_BY_ROLE[roleKey],
        value: "",
        maxAge: 0,
        path: "/",
      });
    }

    /* ⭐ सभी session cookies भी clear करें (safety) */
    res.cookies.set({ name: "session", value: "", maxAge: 0, path: "/" });
    res.cookies.set({ name: "adminSession", value: "", maxAge: 0, path: "/" });
    res.cookies.set({ name: "reportSession", value: "", maxAge: 0, path: "/" });

    return res;
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}