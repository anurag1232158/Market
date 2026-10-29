// src/app/api/report/inventory/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb } from "../../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const db = await readDb();
    const inventory = Array.isArray(db.inventory) ? db.inventory : [];

    /* Filters */
    const status = req.nextUrl.searchParams.get("status");
    const search = req.nextUrl.searchParams.get("search");
    const category = req.nextUrl.searchParams.get("category");

    let filtered = [...inventory];

    if (status) {
      filtered = filtered.filter((i: any) => i.status === status);
    }

    if (category) {
      filtered = filtered.filter((i: any) => i.category === category);
    }

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter((i: any) => {
        const text = `${i.productName || ""} ${i.sku || ""} ${
          i.batchNo || ""
        }`.toLowerCase();
        return text.includes(s);
      });
    }

    /* ============ Stats ============ */
    const total = filtered.length;
    const inStock = filtered.filter((i: any) => i.status === "In Stock").length;
    const lowStock = filtered.filter((i: any) => i.status === "Low Stock").length;
    const outOfStock = filtered.filter(
      (i: any) => i.status === "Out of Stock"
    ).length;
    const expired = filtered.filter((i: any) => i.status === "Expired").length;

    /* Total Stock Value */
    const totalStockValue = filtered.reduce(
      (s: number, i: any) =>
        s + (Number(i.currentStock) || 0) * (Number(i.purchasePrice) || 0),
      0
    );

    /* Total Selling Value */
    const totalSellingValue = filtered.reduce(
      (s: number, i: any) =>
        s + (Number(i.currentStock) || 0) * (Number(i.sellingPrice) || 0),
      0
    );

    /* Potential Profit */
    const potentialProfit = totalSellingValue - totalStockValue;

    /* ============ Category-wise ============ */
    const categoryMap: {
      [key: string]: { items: number; stock: number; value: number };
    } = {};
    filtered.forEach((i: any) => {
      const cat = i.category || "Uncategorized";
      if (!categoryMap[cat]) {
        categoryMap[cat] = { items: 0, stock: 0, value: 0 };
      }
      categoryMap[cat].items += 1;
      categoryMap[cat].stock += Number(i.currentStock) || 0;
      categoryMap[cat].value +=
        (Number(i.currentStock) || 0) * (Number(i.purchasePrice) || 0);
    });

    const categoryData = Object.entries(categoryMap).map(([name, data]) => ({
      name,
      items: data.items,
      stock: data.stock,
      value: data.value,
    }));

    /* ============ Warehouse-wise ============ */
    const warehouseMap: { [key: string]: { items: number; stock: number } } =
      {};
    filtered.forEach((i: any) => {
      const wh = i.warehouse || "Unknown";
      if (!warehouseMap[wh]) {
        warehouseMap[wh] = { items: 0, stock: 0 };
      }
      warehouseMap[wh].items += 1;
      warehouseMap[wh].stock += Number(i.currentStock) || 0;
    });

    const warehouseData = Object.entries(warehouseMap).map(([name, data]) => ({
      name,
      items: data.items,
      stock: data.stock,
    }));

    /* ============ Status Breakdown ============ */
    const statusBreakdown = [
      { name: "In Stock", value: inStock },
      { name: "Low Stock", value: lowStock },
      { name: "Out of Stock", value: outOfStock },
      { name: "Expired", value: expired },
    ].filter((s) => s.value > 0);

    /* ============ Low Stock Items ============ */
    const lowStockItems = filtered
      .filter(
        (i: any) => i.status === "Low Stock" || i.status === "Out of Stock"
      )
      .slice(0, 10);

    /* ============ Top Stock Value ============ */
    const topStockItems = [...filtered]
      .map((i: any) => ({
        ...i,
        stockValue:
          (Number(i.currentStock) || 0) * (Number(i.purchasePrice) || 0),
      }))
      .sort((a, b) => b.stockValue - a.stockValue)
      .slice(0, 10);

    /* ============ Expiring Soon ============ */
    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    const expiringSoon = filtered
      .filter((i: any) => {
        if (!i.expiryDate) return false;
        const exp = new Date(i.expiryDate);
        return exp >= today && exp <= next30Days;
      })
      .sort(
        (a: any, b: any) =>
          new Date(a.expiryDate).getTime() -
          new Date(b.expiryDate).getTime()
      )
      .slice(0, 10);

    return NextResponse.json({
      stats: {
        total,
        inStock,
        lowStock,
        outOfStock,
        expired,
        totalStockValue,
        totalSellingValue,
        potentialProfit,
      },
      items: filtered,
      categoryData,
      warehouseData,
      statusBreakdown,
      lowStockItems,
      topStockItems,
      expiringSoon,
    });
  } catch (err: any) {
    console.error("Report Inventory error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}