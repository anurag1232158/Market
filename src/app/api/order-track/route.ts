// src/app/api/OrderTrack-track/route.ts
// app/api/OrderTrack/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";
import { randomUUID } from "crypto";

/* ⭐ Normalize phone — last 10 digits */
const normalizePhone = (p?: string) =>
  String(p || "").replace(/\D/g, "").slice(-10);

/* ⭐ Flexible match — id (UUID) OR OrderTrackNo (string) */
const matchOrderTrack = (o: any, key: string) => {
  const k = String(key || "").trim().toLowerCase();
  if (!k) return false;
  return (
    String(o.id || "").trim().toLowerCase() === k ||
    String(o.OrderTrackNo || "").trim().toLowerCase() === k
  );
};

/* ═══════════════════════════════════════════════════════════
   GET — list, filter by id / OrderTrackNo / phone / email
   ═══════════════════════════════════════════════════════════ */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const OrderTrack = req.nextUrl.searchParams.get("OrderTrackNo");
  const phone = req.nextUrl.searchParams.get("phone");
  const email = req.nextUrl.searchParams.get("email");

  const db = await readDb();
  const list: any[] = Array.isArray(db.OrderTrack) ? db.OrderTrack : [];

  /* ⭐ Single by id OR OrderTrackNo — दोनों support */
  if (id) {
    const item = list.find((o: any) => matchOrderTrack(o, id));
    return item
      ? NextResponse.json(item)
      : NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  /* ⭐ Single by OrderTrackNo (dedicated param) */
  if (OrderTrack) {
    const item = list.find((o: any) => matchOrderTrack(o, OrderTrack));
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
    return NextResponse.json({ OrderTrack: items });
  }

  /* Filter by email */
  if (email) {
    const items = list.filter((o: any) => o.customerEmail === email);
    return NextResponse.json({ OrderTrack: items });
  }

  /* Full list — newest first */
  const sorted = [...list].sort(
    (a: any, b: any) =>
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime()
  );

  return NextResponse.json({ OrderTrack: sorted });
}

/* ═══════════════════════════════════════════════════════════
   POST — create OrderTrack (public checkout + admin दोनों)
   ═══════════════════════════════════════════════════════════ */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    /* Public checkout se bhi OrderTrack aa sakta hai — auth optional */
    getAdminSession(req);

    const item = {
      id: randomUUID(),
      OrderTrackNo: body.OrderTrackNo || "ORD-" + Date.now().toString().slice(-6),
      OrderTrackDate: body.OrderTrackDate || new Date().toISOString(),
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
      OrderTrackStatus: body.OrderTrackStatus || "Pending",
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
      if (!Array.isArray(db.OrderTrack)) db.OrderTrack = [];
      db.OrderTrack.push(item);
    });

    return NextResponse.json(item, { status: 201 });
  } catch (err: any) {
    console.error("OrderTrack POST error:", err);
    return NextResponse.json(
      { error: "Could not create OrderTrack" },
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
    "OrderTrackStatus",
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
    if (body.OrderTrackStatus) {
      const newOrderTrackStatus = String(body.OrderTrackStatus);
      if (newOrderTrackStatus !== "Confirmed") {
        return NextResponse.json(
          { error: "Invalid OrderTrack status" },
          { status: 400 }
        );
      }
    }
  }

  let updated: any = null;

  await updateDb((db: any) => {
    if (!Array.isArray(db.OrderTrack)) db.OrderTrack = [];
    /* ⭐ id (UUID) या OrderTrackNo दोनों से match */
    const idx = db.OrderTrack.findIndex((o: any) => matchOrderTrack(o, id));
    if (idx !== -1) {
      /* ⭐ Non-admin: सिर्फ allowed fields merge करें */
      const patch = session
        ? body // admin — सब कुछ
        : USER_ALLOWED_FIELDS.reduce((acc: any, key) => {
            if (key in body) acc[key] = body[key];
            return acc;
          }, {});

      db.OrderTrack[idx] = {
        ...db.OrderTrack[idx],
        ...patch,
        updatedAt: new Date().toISOString(),
      };
      updated = db.OrderTrack[idx];
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
    if (!Array.isArray(db.OrderTrack)) db.OrderTrack = [];
    /* ⭐ id (UUID) या OrderTrackNo दोनों से match */
    db.OrderTrack = db.OrderTrack.filter((o: any) => !matchOrderTrack(o, id));
  });

  return NextResponse.json({ success: true });
}