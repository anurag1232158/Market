// src/app/api/account/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const DB_DIR = path.join(process.cwd(), "database");
const DATA_FILE = path.join(DB_DIR, "data.json");

type DB = Record<string, any>;

// "+919170973916", "09170973916", "9170973916" -> "9170973916"
const last10 = (v: unknown) =>
  String(v ?? "")
    .replace(/\D/g, "")
    .slice(-10);

async function readData(): Promise<DB> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return raw.trim() ? JSON.parse(raw) : {};
  } catch (err: any) {
    if (err?.code === "ENOENT") return {};
    throw err;
  }
}

async function writeData(data: DB) {
  await fs.mkdir(DB_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

// "user" ya "users" key, jo pehle se maujood ho
const userKey = (d: DB): "user" | "users" =>
  Array.isArray(d.user) ? "user" : Array.isArray(d.users) ? "users" : "user";

// Last 6 digit id; agar kisi aur user ki same id ho to 7, 8... digit tak badhao
const makeUserId = (number: string, users: any[]) => {
  const used = new Set(users.map((u) => String(u.id)));
  for (let len = 6; len <= number.length; len++) {
    const id = number.slice(-len);
    if (!used.has(id)) return id;
  }
  return number;
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const number = last10(body?.number);

    if (number.length !== 10) {
      return NextResponse.json(
        { message: "Valid mobile number required" },
        { status: 400 }
      );
    }

    const data = await readData();
    const key = userKey(data);
    const users: any[] = data[key] ?? [];

    // 1) Pehle se account hai
    const idx = users.findIndex((u) => last10(u.number) === number);
    if (idx !== -1) {
      if (!users[idx].id) {
        users[idx].id = makeUserId(number, users);
        data[key] = users;
        await writeData(data);
      }
      const { password, ...safe } = users[idx]; // password kabhi mat bhejo
      return NextResponse.json({ user: safe, isNew: false });
    }

    // 2) Naya user: id = mobile ke last 6 digit
    const newUser = {
      id: makeUserId(number, users),
      number,
      createdAt: Date.now(),
    };

    data[key] = [...users, newUser];
    await writeData(data);

    return NextResponse.json({ user: newUser, isNew: true });
  } catch (error) {
    console.error("❌ account error:", error);
    return NextResponse.json(
      { message: "Could not load your account" },
      { status: 500 }
    );
  }
}