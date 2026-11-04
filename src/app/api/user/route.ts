// app/api/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getUserSession } from "../../../../lib/session";
import { readDb, updateDb } from "../../../../lib/db";

const ALWAYS_EDITABLE = [
  "name",
  "address",
  "pin",
  "city",
  "state",
  "country",
] as const;

const ONE_TIME = ["username", "email", "number"] as const;
const nonEmpty = (v: unknown) => v != null && String(v).trim() !== "";
const last10 = (v: unknown) => String(v ?? "").replace(/\D/g, "").slice(-10);
const normEmail = (v: unknown) => String(v ?? "").trim().toLowerCase();

const canon = (key: string, v: unknown): string => {
  if (key === "email") return normEmail(v);
  if (key === "number") return last10(v);
  return String(v ?? "").trim().toLowerCase();
};

export async function PUT(request: NextRequest) {
  try {
    const session = getUserSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.formData();
    const incoming: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (key !== "pic" && typeof value === "string") {
        incoming[key] = value;
      }
    });

    if (incoming.number) incoming.number = last10(incoming.number);
    if (incoming.email) incoming.email = normEmail(incoming.email);
    const file = formData.get("pic");
    if (file instanceof File && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name}`;
      const uploadDir = path.join(process.cwd(), "public/assets/images");
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), buffer);
      incoming.pic = filename;
    }

    const dbBefore = await readDb();
    const usersBefore: any[] = Array.isArray(dbBefore.user) ? dbBefore.user : [];
    const meBefore = usersBefore.find( (x) => String(x.id) === String(session.id));
    if (!meBefore) { return NextResponse.json({ error: "User not found" }, { status: 404 });}

    for (const k of ONE_TIME) {
      if (!incoming[k] || !nonEmpty(incoming[k])) continue;
      if (nonEmpty(meBefore[k])) continue;
      const incomingCanon = canon(k, incoming[k]);
      const conflict = usersBefore.find(
        (x) =>
          String(x.id) !== String(meBefore.id) &&
          nonEmpty(x[k]) &&
          canon(k, x[k]) === incomingCanon
      );
      if (conflict) {
        return NextResponse.json(
          {
            error: "Value already in use",
            field: k,
            detail: `This ${k} is already linked to another account. Contact support to merge accounts.`,
          },
          { status: 409 }
        );
      }
    }

    /* ─── Actual update ─── */
    const user = await updateDb((db) => {
      if (!Array.isArray(db.user)) db.user = [];
      const u = db.user.find((x: any) => String(x.id) === String(session.id));
      if (!u) throw new Error("User not found");
      for (const k of ALWAYS_EDITABLE) {
        if (incoming[k] !== undefined) u[k] = incoming[k];
      }
      if (incoming.pic !== undefined) u.pic = incoming.pic;

      for (const k of ONE_TIME) {
        if (
          incoming[k] !== undefined &&
          nonEmpty(incoming[k]) &&
          !nonEmpty(u[k])
        ) {
          u[k] = incoming[k];
        }
      }
      return { ...u };
    });

    const { password, ...safe } = user as any;
    return NextResponse.json({ user: safe });
  } catch (error) {
    console.error("PUT /api/user error:", error);
    return NextResponse.json(
      { error: "Update failed", detail: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = getUserSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await readDb();
    const user = Array.isArray(db.user)
      ? db.user.find((x: any) => String(x.id) === String(session.id))
      : null;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      number: user.number,
      address: user.address,
      pin: user.pin,
      city: user.city,
      state: user.state,
      country: user.country,
      pic: user.pic,
    });
  } catch (error) {
    console.error("GET /api/user error:", error);
    return NextResponse.json(
      { error: "Failed to load profile", detail: String(error) },
      { status: 500 }
    );
  }
}