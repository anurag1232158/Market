// app/api/order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

/* ⭐ Normalize phone — last 10 digits */
const normalizePhone = (p?: string) =>
  String(p || "").replace(/\D/g, "").slice(-10);

/* ⭐ Flexible match — id (UUID) OR orderNo (string) */
const matchOrder = (o: any, key: string) => {
  const k = String(key || "").trim().toLowerCase();
  if (!k) return false;
  return (
    String(o.id || "").trim().toLowerCase() === k ||
    String(o.orderNo || "").trim().toLowerCase() === k
  );
};

/* ═══════════════════════════════════════════════════════════
   GET — list, filter by id / orderNo / phone / email
   ═══════════════════════════════════════════════════════════ */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const orderNo = req.nextUrl.searchParams.get("orderNo");
  const phone = req.nextUrl.searchParams.get("phone");
  const email = req.nextUrl.searchParams.get("email");

  const db = await readDb();
  const list: any[] = Array.isArray(db.order) ? db.order : [];

  /* ⭐ Single by id OR orderNo — दोनों support */
  if (id) {
    const item = list.find((o: any) => matchOrder(o, id));
    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  /* ⭐ Single by orderNo (dedicated param) */
  if (orderNo) {
    const item = list.find((o: any) => matchOrder(o, orderNo));
    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  /* Filter by phone (normalized) */
  if (phone) {
    const p = normalizePhone(phone);
    const items = list.filter(
      (o: any) => normalizePhone(o.customerPhone) === p
    );
    return NextResponse.json({ order: items });
  }

  /* Filter by email */
  if (email) {
    const items = list.filter((o: any) => o.customerEmail === email);
    return NextResponse.json({ order: items });
  }

  /* Full list — newest first */
  const sorted = [...list].sort(
    (a: any, b: any) =>
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime()
  );

  return NextResponse.json({ order: sorted });
}

/* ═══════════════════════════════════════════════════════════
   POST — create order (public checkout + admin दोनों)
   ═══════════════════════════════════════════════════════════ */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    /* Public checkout se bhi order aa sakta hai — auth optional */
    getAdminSession(req);

    const item = {
      id: randomUUID(),
      orderNo: body.orderNo || "ORD-" + Date.now().toString().slice(-6),
      orderDate: body.orderDate || new Date().toISOString(),
      customerName: body.customerName || "",
      customerEmail: body.customerEmail || "",
      customerPhone: normalizePhone(body.customerPhone),
      customerType: body.customerType || "Retail",
      shippingAddress: body.shippingAddress || "",
      shippingCity: body.shippingCity || "",
      shippingState: body.shippingState || "",
      shippingPin: body.shippingPin || "",
      shippingCountry: body.shippingCountry || "India",
      items: body.items || "[]",
      subtotal: body.subtotal || "0",
      discount: body.discount || "0",
      tax: body.tax || "0",
      shippingCharge: body.shippingCharge || "0",
      totalAmount: body.totalAmount || "0",
      paymentMethod: (body.paymentMethod || "COD").toUpperCase(),
      paymentStatus: body.paymentStatus || "Pending",
      paymentId: body.paymentId || "",
      orderStatus: body.orderStatus || "Pending",
      courier: body.courier || "",
      trackingId: body.trackingId || "",
      shippedDate: body.shippedDate || "",
      deliveredDate: body.deliveredDate || "",
      customerNote: body.customerNote || "",
      adminNote: body.adminNote || "",
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: body.updatedAt || new Date().toISOString(),
    };

    await updateDb((db: any) => {
      if (!Array.isArray(db.order)) db.order = [];
      db.order.push(item);
    });

    return NextResponse.json(item, { status: 201 });
  } catch (err: any) {
    console.error("Order POST error:", err);
    return NextResponse.json(
      { error: "Could not create order" },
      { status: 500 }
    );
  }
}

/* ═══════════════════════════════════════════════════════════
   PUT — admin सब कुछ update कर सकता है,
         user सिर्फ payment fields (COD → Online)
   ═══════════════════════════════════════════════════════════ */
export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "ID required" }, { status: 400 });

  const body = await req.json();
  const session = getAdminSession(req);

  /* ⭐ Fields जो user update कर सकता है (payment-related only) */
  const USER_ALLOWED_FIELDS = [
    "paymentMethod",
    "paymentStatus",
    "paymentId",
    "orderStatus",
  ];

  /* ⭐ Non-admin restrictions */
  if (!session) {
    const requestedKeys = Object.keys(body).filter(
      (k) => k !== "updatedAt" // auto-generated, ignore
    );
    const forbidden = requestedKeys.some(
      (k) => !USER_ALLOWED_FIELDS.includes(k)
    );
    if (forbidden) {
      return NextResponse.json(
        {
          error:
            "Unauthorized — only payment fields can be updated by user",
        },
        { status: 401 }
      );
    }

    /* Additional safety: user सिर्फ COD → Paid कर सकता है */
    if (body.paymentMethod) {
      const newMethod = String(body.paymentMethod).toUpperCase();
      if (newMethod !== "ONLINE") {
        return NextResponse.json(
          { error: "Invalid payment method" },
          { status: 400 }
        );
      }
    }
    if (body.paymentStatus) {
      const newStatus = String(body.paymentStatus);
      if (newStatus !== "Paid") {
        return NextResponse.json(
          { error: "Invalid payment status" },
          { status: 400 }
        );
      }
    }
    if (body.orderStatus) {
      const newOrderStatus = String(body.orderStatus);
      if (newOrderStatus !== "Confirmed") {
        return NextResponse.json(
          { error: "Invalid order status" },
          { status: 400 }
        );
      }
    }
  }

  let updated: any = null;

  await updateDb((db: any) => {
    if (!Array.isArray(db.order)) db.order = [];
    /* ⭐ id (UUID) या orderNo दोनों से match */
    const idx = db.order.findIndex((o: any) => matchOrder(o, id));
    if (idx !== -1) {
      /* ⭐ Non-admin: सिर्फ allowed fields merge करें */
      const patch = session
        ? body // admin — सब कुछ
        : USER_ALLOWED_FIELDS.reduce((acc: any, key) => {
            if (key in body) acc[key] = body[key];
            return acc;
          }, {});

      db.order[idx] = {
        ...db.order[idx],
        ...patch,
        updatedAt: new Date().toISOString(),
      };
      updated = db.order[idx];
    }
  });

  return updated
    ? NextResponse.json(updated)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

/* ═══════════════════════════════════════════════════════════
   DELETE — admin only
   ═══════════════════════════════════════════════════════════ */
export async function DELETE(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "ID required" }, { status: 400 });

  await updateDb((db: any) => {
    if (!Array.isArray(db.order)) db.order = [];
    /* ⭐ id (UUID) या orderNo दोनों से match */
    db.order = db.order.filter((o: any) => !matchOrder(o, id));
  });

  return NextResponse.json({ success: true });
}