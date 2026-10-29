import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "../../../../lib/db";
import { getAdminSession } from "../../../../lib/session";

/* ============================================================
   GET — Settings fetch करें
   ============================================================ */
export async function GET(req: NextRequest) {
  const db = await readDb();
  const setting = db.setting || {};
  return NextResponse.json({ setting });
}

/* ============================================================
   PUT — Settings update करें (सिर्फ एक ही object)
   ============================================================ */
export async function PUT(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const setting = {
    id: "site-settings",
    siteName: body.siteName || "",
    tagline: body.tagline || "",
    logo: body.logo || "",
    favicon: body.favicon || "",
    contactEmail: body.contactEmail || "",
    contactPhone: body.contactPhone || "",
    whatsappNumber: body.whatsappNumber || "",
    address: body.address || "",
    googleMapsLink: body.googleMapsLink || "",

    facebook: body.facebook || "",
    instagram: body.instagram || "",
    twitter: body.twitter || "",
    youtube: body.youtube || "",
    linkedin: body.linkedin || "",
    whatsappBusiness: body.whatsappBusiness || "",

    metaTitle: body.metaTitle || "",
    metaDescription: body.metaDescription || "",
    metaKeywords: body.metaKeywords || "",
    googleAnalyticsId: body.googleAnalyticsId || "",
    facebookPixelId: body.facebookPixelId || "",

    codEnabled: body.codEnabled || "Yes",
    upiId: body.upiId || "",
    bankName: body.bankName || "",
    bankAccountNo: body.bankAccountNo || "",
    bankIfsc: body.bankIfsc || "",
    bankAccountName: body.bankAccountName || "",
    minCodAmount: body.minCodAmount || "0",
    maxCodAmount: body.maxCodAmount || "5000",
    razorpayKey: body.razorpayKey || "",
    razorpaySecret: body.razorpaySecret || "",

    freeShippingAbove: body.freeShippingAbove || "500",
    defaultShippingCharge: body.defaultShippingCharge || "50",
    minDeliveryDays: body.minDeliveryDays || "3",
    maxDeliveryDays: body.maxDeliveryDays || "5",
    serviceablePincodes: body.serviceablePincodes || "",

    gstNumber: body.gstNumber || "",
    panNumber: body.panNumber || "",
    invoicePrefix: body.invoicePrefix || "INV-",
    currency: body.currency || "INR",
    timezone: body.timezone || "Asia/Kolkata",
    businessHours: body.businessHours || "10 AM - 8 PM",

    smtpHost: body.smtpHost || "",
    smtpPort: body.smtpPort || "587",
    smtpUser: body.smtpUser || "",
    smtpPass: body.smtpPass || "",
    smsApiKey: body.smsApiKey || "",
    orderConfirmTemplate: body.orderConfirmTemplate || "",

    maintenanceMode: body.maintenanceMode || "No",
    maintenanceMessage: body.maintenanceMessage || "",

    updatedAt: new Date().toISOString(),
  };

  await updateDb((db: any) => {
    db.setting = setting;
  });

  return NextResponse.json({ setting });
}