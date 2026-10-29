import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const sku = req.nextUrl.searchParams.get("sku");
  const db = await readDb();
  const list = db.inventory || [];

  if (id) {
    const item = list.find((i: any) => i.id === id);
    return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (sku) {
    const item = list.find((i: any) => i.sku === sku);
    return item ? NextResponse.json(item) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ inventory: list });
}

export async function POST(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = {
    id: randomUUID(),
    productName: body.productName || "",
    sku: body.sku || "",
    category: body.category || "Raw Makhana",
    warehouse: body.warehouse || "Main Warehouse",
    batchNo: body.batchNo || "",
    openingStock: body.openingStock || "0",
    currentStock: body.currentStock || "0",
    soldStock: body.soldStock || "0",
    damagedStock: body.damagedStock || "0",
    reservedStock: body.reservedStock || "0",
    unit: body.unit || "kg",
    purchasePrice: body.purchasePrice || "0",
    sellingPrice: body.sellingPrice || "0",
    reorderLevel: body.reorderLevel || "10",
    maxStock: body.maxStock || "500",
    mfgDate: body.mfgDate || "",
    expiryDate: body.expiryDate || "",
    supplier: body.supplier || "",
    supplierContact: body.supplierContact || "",
    lastRestocked: body.lastRestocked || "",
    status: body.status || "In Stock",
    notes: body.notes || "",
    createdAt: body.createdAt || new Date().toISOString(),
    updatedAt: body.updatedAt || new Date().toISOString(),
  };

  await updateDb((db: any) => {
    if (!Array.isArray(db.inventory)) db.inventory = [];
    db.inventory.push(item);
  });

  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const body = await req.json();
  let updated: any = null;

  await updateDb((db: any) => {
    if (!Array.isArray(db.inventory)) db.inventory = [];
    const idx = db.inventory.findIndex((i: any) => i.id === id);
    if (idx !== -1) {
      db.inventory[idx] = { ...db.inventory[idx], ...body, id, updatedAt: new Date().toISOString() };
      updated = db.inventory[idx];
    }
  });

  return updated ? NextResponse.json(updated) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await updateDb((db: any) => {
    if (!Array.isArray(db.inventory)) db.inventory = [];
    db.inventory = db.inventory.filter((i: any) => i.id !== id);
  });

  return NextResponse.json({ success: true });
}