// src/app/api/report/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb } from "../../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const db = await readDb();
    const products = Array.isArray(db.product) ? db.product : [];
    const orders = Array.isArray(db.order) ? db.order : [];

    const search = req.nextUrl.searchParams.get("search");
    const category = req.nextUrl.searchParams.get("category");
    const status = req.nextUrl.searchParams.get("status");
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "name";

    let filtered = [...products];

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter((p: any) => {
        const text = `${p.name || ""} ${p.sku || ""} ${p.flavour || ""} ${
          p.category || ""
        }`.toLowerCase();
        return text.includes(s);
      });
    }

    if (category) {
      filtered = filtered.filter((p: any) => p.category === category);
    }

    if (status) {
      filtered = filtered.filter((p: any) => p.status === status);
    }

    /* ============ Product Sales Stats (from Orders) ============ */
    const productStats: {
      [key: string]: {
        qty: number;
        revenue: number;
        orders: number;
        lastOrder: string;
      };
    } = {};

    orders.forEach((o: any) => {
      try {
        const items = JSON.parse(o.items || "[]");
        items.forEach((it: any) => {
          const name = it.name || "Unknown";
          if (!productStats[name]) {
            productStats[name] = {
              qty: 0,
              revenue: 0,
              orders: 0,
              lastOrder: "",
            };
          }
          const qty = Number(it.qty) || 0;
          const price = Number(it.price) || 0;
          productStats[name].qty += qty;
          productStats[name].revenue += qty * price;
          productStats[name].orders += 1;
          const orderDate = o.orderDate || o.createdAt || "";
          if (orderDate > productStats[name].lastOrder) {
            productStats[name].lastOrder = orderDate;
          }
        });
      } catch {}
    });

    /* ============ Merge Products with Sales ============ */
    const productsWithSales = filtered.map((p: any) => {
      const sales = productStats[p.name] || {
        qty: 0,
        revenue: 0,
        orders: 0,
        lastOrder: "",
      };
      return {
        ...p,
        soldQty: sales.qty,
        revenue: sales.revenue,
        orders: sales.orders,
        lastOrder: sales.lastOrder,
        stockValue: (Number(p.stock) || 0) * (Number(p.price) || 0),
        _isOrphan: false,
      };
    });

    /* ============ ⭐ Add Orphan Products (Sold Only) ⭐ ============ */
    const existingNames = new Set(
      filtered.map((p: any) => (p.name || "").toLowerCase())
    );

    const orphanProducts: any[] = [];
    Object.entries(productStats).forEach(([name, sales]) => {
      if (!existingNames.has(name.toLowerCase())) {
        orphanProducts.push({
          id: `orphan-${name}`,
          name,
          category: "Sold Only",
          sku: "-",
          price:
            sales.qty > 0 ? Math.round(sales.revenue / sales.qty) : 0,
          stock: 0,
          unit: "unit",
          flavour: "",
          weight: "",
          status: "Sold Only",
          isBestSeller: "No",
          soldQty: sales.qty,
          revenue: sales.revenue,
          orders: sales.orders,
          lastOrder: sales.lastOrder,
          stockValue: 0,
          _isOrphan: true,
        });
      }
    });

    /* ============ Combine All ============ */
    const allProducts = [...productsWithSales, ...orphanProducts];

    /* ============ Sorting ============ */
    const sorted = [...allProducts].sort((a: any, b: any) => {
      switch (sortBy) {
        case "revenue":
          return b.revenue - a.revenue;
        case "sold":
          return b.soldQty - a.soldQty;
        case "stock":
          return Number(b.stock) - Number(a.stock);
        case "price":
          return Number(b.price) - Number(a.price);
        case "name":
        default:
          return (a.name || "").localeCompare(b.name || "");
      }
    });

    /* ============ Stats (Using All) ============ */
    const totalProducts = allProducts.length;
    const activeProducts = productsWithSales.filter(
      (p: any) => p.status === "Active"
    ).length;
    const inactiveProducts = productsWithSales.filter(
      (p: any) => p.status === "Deactive" || p.status === "Inactive"
    ).length;
    const bestSellers = productsWithSales.filter(
      (p: any) => p.isBestSeller === "Yes"
    ).length;
    const outOfStock = productsWithSales.filter(
      (p: any) => Number(p.stock) <= 0
    ).length;

    const totalRevenue = allProducts.reduce(
      (s: number, p: any) => s + p.revenue,
      0
    );
    const totalSoldQty = allProducts.reduce(
      (s: number, p: any) => s + p.soldQty,
      0
    );
    const totalStockValue = allProducts.reduce(
      (s: number, p: any) => s + p.stockValue,
      0
    );

    /* ============ Category-wise ============ */
    const categoryMap: {
      [key: string]: { count: number; sold: number; revenue: number };
    } = {};
    allProducts.forEach((p: any) => {
      const cat = p.category || "Uncategorized";
      if (!categoryMap[cat]) {
        categoryMap[cat] = { count: 0, sold: 0, revenue: 0 };
      }
      categoryMap[cat].count += 1;
      categoryMap[cat].sold += p.soldQty;
      categoryMap[cat].revenue += p.revenue;
    });

    const categoryData = Object.entries(categoryMap).map(([name, data]) => ({
      name,
      count: data.count,
      sold: data.sold,
      revenue: data.revenue,
    }));

    /* ============ Flavour-wise ============ */
    const flavourMap: { [key: string]: number } = {};
    allProducts.forEach((p: any) => {
      if (p.flavour) {
        flavourMap[p.flavour] =
          (flavourMap[p.flavour] || 0) + p.soldQty;
      }
    });

    const flavourData = Object.entries(flavourMap)
      .map(([name, value]) => ({ name, value }))
      .filter((f) => f.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    /* ============ Top Products ============ */
    const topSelling = [...allProducts]
      .filter((p: any) => p.soldQty > 0)
      .sort((a: any, b: any) => b.soldQty - a.soldQty)
      .slice(0, 10);

    const topRevenue = [...allProducts]
      .filter((p: any) => p.revenue > 0)
      .sort((a: any, b: any) => b.revenue - a.revenue)
      .slice(0, 10);

    /* ============ Low Stock ============ */
    const lowStockProducts = productsWithSales
      .filter(
        (p: any) => Number(p.stock) > 0 && Number(p.stock) <= 10
      )
      .sort((a: any, b: any) => Number(a.stock) - Number(b.stock))
      .slice(0, 10);

    /* ============ Out of Stock ============ */
    const outOfStockProducts = productsWithSales
      .filter((p: any) => Number(p.stock) <= 0)
      .slice(0, 10);

    return NextResponse.json({
      stats: {
        totalProducts,
        activeProducts,
        inactiveProducts,
        bestSellers,
        outOfStock,
        totalRevenue,
        totalSoldQty,
        totalStockValue,
      },
      products: sorted,
      categoryData,
      flavourData,
      topSelling,
      topRevenue,
      lowStockProducts,
      outOfStockProducts,
    });
  } catch (err: any) {
    console.error("Report Product error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}