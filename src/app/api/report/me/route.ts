import { NextRequest, NextResponse } from "next/server";
import { readDb } from "../../../../../lib/db";


export async function GET(req: NextRequest) {
  try {
    const db = await readDb();
    const reports = Array.isArray(db.report) ? db.report : [];

    if (reports.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    /* पहला report user return करें (या Cookie से match करें) */
    const user = reports[0];
    const { password, cpassword, confirmPassword, ...safe } = user;

    return NextResponse.json(safe);
  } catch (err) {
    console.error("Report me error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}