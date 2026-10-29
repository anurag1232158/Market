import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../../lib/db";


export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, cpassword, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    let updated: any = null;

    await updateDb((db: any) => {
      if (!Array.isArray(db.report)) db.report = [];
      const idx = db.report.findIndex((r: any) => String(r.id) === String(id));

      if (idx !== -1) {
        const original = db.report[idx];
        const mapped: any = {
          ...original,
          name: updates.name ?? original.name,
          email: updates.email ?? original.email,
          number: updates.number ?? original.number,
        };

        if (updates.pic) mapped.pic = updates.pic;

        if (cpassword && String(cpassword).trim()) {
          mapped.password = cpassword;
          mapped.cpassword = cpassword;
        }

        db.report[idx] = mapped;
        updated = mapped;
      }
    });

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { password, cpassword: cp, confirmPassword, ...safe } = updated;
    return NextResponse.json({ report: safe });
  } catch (err: any) {
    console.error("Report update error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}