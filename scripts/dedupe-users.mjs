// scripts/dedupe-users.mjs
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "database/data.json");
const last10 = (v) => String(v ?? "").replace(/\D/g, "").slice(-10);

const raw = await fs.readFile(DATA_FILE, "utf8");
const db = JSON.parse(raw);
const users = db.user || [];

const byNumber = new Map();
const byEmail = new Map();
const keep = [];
const drop = [];

for (const u of users) {
  const phone = last10(u.number);
  const email = String(u.email || "").toLowerCase().trim();

  let existing = null;
  if (phone && byNumber.has(phone)) existing = byNumber.get(phone);
  else if (email && byEmail.has(email)) existing = byEmail.get(email);

  if (!existing) {
    u.number = phone || u.number;
    if (email) u.email = email;
    keep.push(u);
    if (phone) byNumber.set(phone, u);
    if (email) byEmail.set(email, u);
    continue;
  }

  /* Merge into existing — do NOT overwrite non-empty fields */
  drop.push(u);
  for (const k of Object.keys(u)) {
    if (k === "id") continue;
    const cur = existing[k];
    const curEmpty = cur == null || String(cur).trim() === "";
    if (curEmpty && u[k] != null && String(u[k]).trim() !== "") {
      existing[k] = u[k];
    }
  }
  if (phone) byNumber.set(phone, existing);
  if (email) byEmail.set(email, existing);
}

db.user = keep;
await fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2), "utf8");

console.log(`✅ Kept ${keep.length}, merged/dropped ${drop.length}`);
drop.forEach((u) => console.log("  dropped:", u.id, u.email, u.number));
console.log("\n📋 Final user IDs:");
keep.forEach((u) => console.log("  keep:", u.id, u.email, u.number));