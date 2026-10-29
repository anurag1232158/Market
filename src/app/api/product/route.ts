import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAdminSession } from "../../../../lib/session";

const filePath = path.join(process.cwd(), "database", "data.json");

const readAll = (): Record<string, any> => {
  try {
    if (!fs.existsSync(filePath)) return { product: [] };
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = raw.trim() ? JSON.parse(raw) : {};
    return Array.isArray(parsed) ? { product: parsed } : parsed;
  } catch {
    return { product: [] };
  }
};

const readProducts = (): any[] => {
  const all = readAll();
  return Array.isArray(all.product) ? all.product : [];
};

// Sirf "product" key badlo, baaki poora data jaisa tha waisa rahe
const writeProducts = (products: any[]) => {
  const all = readAll();
  all.product = products;
  fs.writeFileSync(filePath, JSON.stringify(all, null, 2));
};

const forbidden = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// GET: sabke liye open (website par products dikhane ke liye)
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const data = readProducts();

  if (id) {
    const item = data.find((p) => String(p.id) === String(id));
    if (!item) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  }
  return NextResponse.json([...data].reverse()); // naya pehle
}

// POST: sirf admin
export async function POST(req: NextRequest) {
  if (!getAdminSession(req)) return forbidden();
  try {
    const body = await req.json();
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }
    const data = readProducts();
    const newItem = { ...body, id: Date.now().toString() };
    data.push(newItem);
    writeProducts(data);
    return NextResponse.json(newItem, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

// PUT: sirf admin
export async function PUT(req: NextRequest) {
  if (!getAdminSession(req)) return forbidden();
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }
    const body = await req.json();
    const data = readProducts();
    const index = data.findIndex((p) => String(p.id) === String(id));
    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    data[index] = { ...data[index], ...body, id: data[index].id };
    writeProducts(data);
    return NextResponse.json(data[index]);
  } catch {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE: sirf admin
export async function DELETE(req: NextRequest) {
  if (!getAdminSession(req)) return forbidden();
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }
    const data = readProducts();
    const filtered = data.filter((p) => String(p.id) !== String(id));
    if (filtered.length === data.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    writeProducts(filtered);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}