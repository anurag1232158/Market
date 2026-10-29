import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";

const dataFilePath = path.join(process.cwd(), "database", "data.json");
// 🟢 GET — Fetch all or one review
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // Read file
    const fileData = await fs.readFile(dataFilePath, "utf8");
    const json = JSON.parse(fileData);
    const reviews = json.review || [];

    if (id) {
      const found = reviews.find((u: any) => String(u.id) === String(id));
      return NextResponse.json(found || {});
    }

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("❌ Error reading review data:", error);
    return NextResponse.json({ error: "Failed to read AC data" }, { status: 500 });
  }
}

// 🟣 POST — Add new review
export async function POST(req: Request) {
  try {
    const newService = await req.json();

    // Read existing file
    const fileData = await fs.readFile(dataFilePath, "utf8");
    const json = JSON.parse(fileData);
    const reviews = json.review || [];

    // Add new entry
    const newEntry = {
      id: randomUUID().slice(0, 4),
      ...newService,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    reviews.push(newEntry);

    // Write updated file
    const updatedData = { ...json, review: reviews };
    await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 2), "utf8");

    console.log("✅ New AC service added:", newEntry.name);

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error("❌ Failed to save AC service:", error);
    return NextResponse.json({ error: "Failed to save AC service" }, { status: 500 });
  }
}
// 🟠 PUT — Update existing AC service by id
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const updatedService = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required for update" }, { status: 400 });
    }

    const fileData = await fs.readFile(dataFilePath, "utf8");
    const json = JSON.parse(fileData);
    const reviews = json.review || [];

    const index = reviews.findIndex((u: any) => String(u.id) === String(id));
    if (index === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    reviews[index] = {
      ...reviews[index],
      ...updatedService,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    const updatedData = { ...json, review: reviews };
    await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 2), "utf8");

    return NextResponse.json(reviews[index]);
  } catch (error) {
    console.error("❌ Error updating AC service:", error);
    return NextResponse.json({ error: "Failed to update AC service" }, { status: 500 });
  }
}

// 🔴 DELETE — Remove AC service by id
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required for delete" }, { status: 400 });
    }

    // Read file
    const fileData = await fs.readFile(dataFilePath, "utf8");
    const json = JSON.parse(fileData);
    const reviews = json.review || [];

    // Find and remove record
    const index = reviews.findIndex((u: any) => String(u.id) === String(id));
    if (index === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const deletedItem = reviews[index];
    reviews.splice(index, 1);

    // Write back updated file
    const updatedData = { ...json, review: reviews };
    await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 2), "utf8");

    console.log("🗑️ Deleted AC service:", deletedItem.name);

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting AC service:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
