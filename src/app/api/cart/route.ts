import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "database", "data.json");

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const fileData = await fs.readFile(dataFilePath, "utf8");
    const json = JSON.parse(fileData);

    if (!Array.isArray(json.cart)) json.cart = [];

    const updatedCart = json.cart.filter((item: any) => String(item.id) !== String(id));
    json.cart = updatedCart;

    await fs.writeFile(dataFilePath, JSON.stringify(json, null, 2), "utf8");

    return NextResponse.json({ message: "Item deleted successfully ✅" });
  } catch (error) {
    console.error("❌ Delete cart error:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
