
import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../../lib/db";

// GET /api/order/[orderNo]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderNo: string }> }
) {
  try {
    const { orderNo } = await params;
    const searchFor = decodeURIComponent(orderNo).trim().toLowerCase();

    const db = await readDb();
    const list: any[] = Array.isArray(db.order) ? db.order : [];

    const order = list.find((o: any) => {
      const oNo = String(o.orderNo || "").trim().toLowerCase();
      const oId = String(o.id || "").trim().toLowerCase();

      return oNo === searchFor || oId === searchFor;
    });

    if (!order) {
      return NextResponse.json(
        {
          error: "Order not found",
          searchedFor: searchFor,
          availableOrderNos: list.map((o: any) => o.orderNo),
        },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (err: any) {
    console.error("GET order error:", err);

    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

// PUT /api/order/[orderNo] - Pay Now
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ orderNo: string }> }
) {
  try {
    const { orderNo } = await params;
    const searchFor = decodeURIComponent(orderNo).trim().toLowerCase();
    const body = await req.json();

    let updatedOrder: any = null;

    await updateDb((db: any) => {
      if (!Array.isArray(db.order)) {
        db.order = [];
      }

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
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedOrder);
  } catch (err: any) {
    console.error("PUT order error:", err);

    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
