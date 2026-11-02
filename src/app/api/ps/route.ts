
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
const filePath = path.join(process.cwd(), "database", "data.json");

const readProducts = (): any[] => {
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = raw.trim() ? JSON.parse(raw) : {};
    const all = Array.isArray(parsed) ? { product: parsed } : parsed;
    return Array.isArray(all.product) ? all.product : [];
  } catch (error) {
    console.error("Product read error:", error);
    return [];
  }
};

// GET: Product Search API
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const search = searchParams.get("search")?.toLowerCase() || "";
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    let products = readProducts();
    if (id) {
      const item = products.find(
        (p) => String(p.id) === String(id)
      );
      if (!item) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(item);
    }
    if (search) {
      products = products.filter((p) =>
        [
          p.name,
          p.category,
          p.slug,
          p.sku,
          p.description,
          p.flavour,
        ].some((value) =>
          String(value || "").toLowerCase().includes(search)
        )
      );
    }
    if (category) {
      products = products.filter(
        (p) =>
          String(p.category || "").toLowerCase() ===
          category.toLowerCase()
      );
    }
    if (status) {
      products = products.filter(
        (p) =>
          String(p.status || "").toLowerCase() ===
          status.toLowerCase()
      );
    }
    return NextResponse.json(products.reverse());
  } catch (error) {
    console.error("PS API Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
