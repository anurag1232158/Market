// app/api/order/[orderNo]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../../lib/db"; // ✅ अपना सही path चेक कर लें

// GET /api/order/[orderNo]
export async function GET(
  req: NextRequest,
  { params }: { params: { orderNo: string } }
) {
  try {
    const searchFor = decodeURIComponent(params.orderNo).trim().toLowerCase();
    const db = await readDb();
    const list: any[] = Array.isArray(db.order) ? db.order : [];

    console.log("🔍 GET /api/order/[orderNo]");
    console.log("   searchFor:", searchFor);

    // orderNo या id दोनों से मैच करेगा
    const order = list.find((o: any) => {
      const oNo = String(o.orderNo || "").trim().toLowerCase();
      const oId = String(o.id || "").trim().toLowerCase();
      return oNo === searchFor || oId === searchFor;
    });

    if (!order) {
      console.log("   ❌ NOT FOUND");
      return NextResponse.json(
        {
          error: "Order not found",
          searchedFor: searchFor,
          availableOrderNos: list.map((o: any) => o.orderNo),
        },
        { status: 404 }
      );
    }

    console.log("   ✅ Found:", order.orderNo);
    return NextResponse.json(order);
  } catch (err: any) {
    console.error("❌ GET error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

// PUT /api/order/[orderNo] (Pay Now के लिए)
export async function PUT(
  req: NextRequest,
  { params }: { params: { orderNo: string } }
) {
  try {
    const body = await req.json();
    const searchFor = decodeURIComponent(params.orderNo).trim().toLowerCase();
    
    let updatedOrder: any = null;

    await updateDb((db: any) => {
      if (!Array.isArray(db.order)) db.order = [];
      
      const index = db.order.findIndex((o: any) => {
        const oNo = String(o.orderNo || "").trim().toLowerCase();
        const oId = String(o.id || "").trim().toLowerCase();
        return oNo === searchFor || oId === searchFor;
      });

      if (index !== -1) {
        db.order[index] = {
          ...db.order[index],
          ...body,
          updatedAt: new Date().toISOString(),
        };
        updatedOrder = db.order[index];
      }
    });

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder);
  } catch (err: any) {
    console.error("❌ PUT error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}