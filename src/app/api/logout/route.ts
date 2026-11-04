// app/api/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_BY_ROLE, Role } from "../../../../lib/session";

export async function POST(req: NextRequest) {
  try {
    const { role } = await req.json().catch(() => ({}));
    const res = NextResponse.json({ success: true });

    const clear = (r: Role) =>
      res.cookies.set({
        name: COOKIE_BY_ROLE[r],
        value: "",
        maxAge: 0,
        path: "/",
      });

    if (role === "all") {
      (["user", "admin", "report"] as Role[]).forEach(clear);
    } else {
      const roleKey: Role =
        role === "admin" || role === "report" ? role : "user";
      clear(roleKey);
    }

    return res;
  } catch (err) {
    console.error("logout error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}