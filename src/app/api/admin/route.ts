// src/app/api/admin/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "database", "data.json");

/* ⭐ Sensitive fields हटाने के लिए helper */
const sanitizeAdmin = (admin: any) => {
  if (!admin) return null;
  const { password, cpassword, confirmPassword, ...safe } = admin;
  return safe;
};

/* ============================================================
   GET — Fetch admin(s)
   ============================================================ */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    const fileData = await fs.readFile(dataFilePath, "utf8");
    const json = JSON.parse(fileData);
    const admins = json.admin || [];

    if (email) {
      const list = admins
        .filter((a: any) => a.email === email)
        .map(sanitizeAdmin);
      return NextResponse.json(list);
    }

    if (id) {
      const admin = admins.find(
        (a: any) => String(a.id) === String(id)
      );
      return NextResponse.json(sanitizeAdmin(admin) || {});
    }

    /* ⭐ सारे admins sanitized return करें */
    return NextResponse.json(admins.map(sanitizeAdmin));
  } catch (err) {
    console.error("❌ Error reading admin data:", err);
    return NextResponse.json(
      { error: "Failed to read admin data" },
      { status: 500 }
    );
  }
}

/* ============================================================
   POST — Add new admin
   ============================================================ */
export async function POST(req: Request) {
  try {
    const newAdmin = await req.json();
    const fileData = await fs.readFile(dataFilePath, "utf8");
    const json = JSON.parse(fileData);

    if (!Array.isArray(json.admin)) json.admin = [];

    const newId = json.admin.length
      ? Number(json.admin[json.admin.length - 1].id) + 1
      : 1;
    const adminWithId = { id: String(newId), ...newAdmin };
    json.admin.push(adminWithId);

    await fs.writeFile(
      dataFilePath,
      JSON.stringify(json, null, 2),
      "utf8"
    );

    return NextResponse.json({
      message: "Admin added successfully",
      admin: sanitizeAdmin(adminWithId),
    });
  } catch (err) {
    console.error("❌ Error adding admin:", err);
    return NextResponse.json(
      { error: "Failed to add admin" },
      { status: 500 }
    );
  }
}

/* ============================================================
   PUT — Update admin
   ============================================================ */
export async function PUT(req: Request) {
  try {
    const updatedAdmin = await req.json();
    const fileData = await fs.readFile(dataFilePath, "utf8");
    const json = JSON.parse(fileData);

    const admins = json.admin || [];
    const index = admins.findIndex(
      (a: any) => String(a.id) === String(updatedAdmin.id)
    );

    if (index === -1)
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      );

    admins[index] = { ...admins[index], ...updatedAdmin };
    json.admin = admins;

    await fs.writeFile(
      dataFilePath,
      JSON.stringify(json, null, 2),
      "utf8"
    );

    return NextResponse.json({
      message: "Admin updated successfully",
      admin: sanitizeAdmin(admins[index]),
    });
  } catch (err) {
    console.error("❌ Error updating admin:", err);
    return NextResponse.json(
      { error: "Failed to update admin" },
      { status: 500 }
    );
  }
}