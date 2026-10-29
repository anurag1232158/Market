export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const dataFilePath = path.join(process.cwd(), "database", "data.json");

// Ye collections kabhi public nahi jaane chahiye
const PRIVATE_KEYS = ["admin", "user", "users", "adminContact", "message", "applicationsData", "bookingOrder", "cart", "booking"];

// File badli nahi to memory se do (har request par disk read nahi)
let cache: { mtime: number; data: Record<string, any> } | null = null;

async function readDB() {
  const { mtimeMs } = await fs.stat(dataFilePath);
  if (cache && cache.mtime === mtimeMs) return cache.data;

  const data = JSON.parse(await fs.readFile(dataFilePath, "utf8"));
  const safe: Record<string, any> = {};
  for (const k of Object.keys(data)) {
    if (!PRIVATE_KEYS.includes(k)) safe[k] = data[k];
  }
  cache = { mtime: mtimeMs, data: safe };
  return safe;
}

export async function GET(req: Request) {
  try {
    const data = await readDB();

    // Optional: sirf zaruri collection maango, jaise /api/services?key=product
    const key = new URL(req.url).searchParams.get("key");
    if (key) {
      return NextResponse.json(data[key] ?? []);
    }

    return NextResponse.json(data, {
      headers: { "Cache-Control": "private, max-age=10" }, // browser 10 sec tak dobara na maange
    });
  } catch (error) {
    console.error("Error reading data.json:", error);
    return NextResponse.json({ error: "Failed to load services data" }, { status: 500 });
  }
}