"use client";
import { ChangeEvent, ReactNode } from "react";

/* ============================================================
   SETTINGS — पूरे website की सारी settings
   ============================================================ */

export type Setting = {
  id: string;

  /* ============ 1. General ============ */
  siteName: string;
  tagline: string;
  logo: string;
  favicon: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  address: string;
  googleMapsLink: string;

  /* ============ 2. Social Media ============ */
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  whatsappBusiness: string;

  /* ============ 3. SEO ============ */
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  googleAnalyticsId: string;
  facebookPixelId: string;

  /* ============ 4. Payment ============ */
  codEnabled: string;           // Yes / No
  upiId: string;
  bankName: string;
  bankAccountNo: string;
  bankIfsc: string;
  bankAccountName: string;
  minCodAmount: string;
  maxCodAmount: string;
  razorpayKey: string;
  razorpaySecret: string;

  /* ============ 5. Shipping ============ */
  freeShippingAbove: string;
  defaultShippingCharge: string;
  minDeliveryDays: string;
  maxDeliveryDays: string;
  serviceablePincodes: string;  // comma separated

  /* ============ 6. Business ============ */
  gstNumber: string;
  panNumber: string;
  invoicePrefix: string;
  currency: string;
  timezone: string;
  businessHours: string;

  /* ============ 7. Email / SMS ============ */
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPass: string;
  smsApiKey: string;
  orderConfirmTemplate: string;

  /* ============ 8. Maintenance ============ */
  maintenanceMode: string;      // Yes / No
  maintenanceMessage: string;

  /* ============ Meta ============ */
  updatedAt: string;
};

export const emptySetting: Setting = {
  id: "site-settings",

  siteName: "",
  tagline: "",
  logo: "",
  favicon: "",
  contactEmail: "",
  contactPhone: "",
  whatsappNumber: "",
  address: "",
  googleMapsLink: "",

  facebook: "",
  instagram: "",
  twitter: "",
  youtube: "",
  linkedin: "",
  whatsappBusiness: "",

  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  googleAnalyticsId: "",
  facebookPixelId: "",

  codEnabled: "Yes",
  upiId: "",
  bankName: "",
  bankAccountNo: "",
  bankIfsc: "",
  bankAccountName: "",
  minCodAmount: "0",
  maxCodAmount: "5000",
  razorpayKey: "",
  razorpaySecret: "",

  freeShippingAbove: "500",
  defaultShippingCharge: "50",
  minDeliveryDays: "3",
  maxDeliveryDays: "5",
  serviceablePincodes: "",

  gstNumber: "",
  panNumber: "",
  invoicePrefix: "INV-",
  currency: "INR",
  timezone: "Asia/Kolkata",
  businessHours: "10 AM - 8 PM",

  smtpHost: "",
  smtpPort: "587",
  smtpUser: "",
  smtpPass: "",
  smsApiKey: "",
  orderConfirmTemplate: "Namaste {name}, aapka order {orderNo} confirm ho gaya hai. Total: ₹{amount}. Dhanyawad!",

  maintenanceMode: "No",
  maintenanceMessage: "Website is under maintenance. Please check back soon.",

  updatedAt: "",
};

/* ---------------- HELPERS ---------------- */

export const today = () => new Date().toISOString();

export const prepareSetting = (d: Setting): Setting => ({
  ...d,
  id: "site-settings",
  siteName: d.siteName.trim(),
  tagline: d.tagline.trim(),
  contactEmail: d.contactEmail.trim().toLowerCase(),
  contactPhone: d.contactPhone.trim(),
  whatsappNumber: d.whatsappNumber.trim(),
  address: d.address.trim(),
  googleMapsLink: d.googleMapsLink.trim(),
  facebook: d.facebook.trim(),
  instagram: d.instagram.trim(),
  twitter: d.twitter.trim(),
  youtube: d.youtube.trim(),
  linkedin: d.linkedin.trim(),
  whatsappBusiness: d.whatsappBusiness.trim(),
  metaTitle: d.metaTitle.trim(),
  metaDescription: d.metaDescription.trim(),
  metaKeywords: d.metaKeywords.trim(),
  upiId: d.upiId.trim(),
  bankName: d.bankName.trim(),
  bankAccountNo: d.bankAccountNo.trim(),
  bankIfsc: d.bankIfsc.trim().toUpperCase(),
  bankAccountName: d.bankAccountName.trim(),
  serviceablePincodes: d.serviceablePincodes.trim(),
  gstNumber: d.gstNumber.trim().toUpperCase(),
  panNumber: d.panNumber.trim().toUpperCase(),
  invoicePrefix: d.invoicePrefix.trim(),
  businessHours: d.businessHours.trim(),
  smtpHost: d.smtpHost.trim(),
  smtpUser: d.smtpUser.trim(),
  orderConfirmTemplate: d.orderConfirmTemplate.trim(),
  maintenanceMessage: d.maintenanceMessage.trim(),
  updatedAt: today(),
});

export const validateSetting = (d: Setting) => {
  const e: { [key: string]: string } = {};

  /* General */
  if (!d.siteName.trim()) e.siteName = "Site name is required";
  if (d.contactEmail && !/^\S+@\S+\.\S+$/.test(d.contactEmail))
    e.contactEmail = "Enter valid email";
  if (d.contactPhone && !/^[0-9]{10,13}$/.test(d.contactPhone))
    e.contactPhone = "Enter valid phone number";

  /* SEO */
  if (d.metaTitle && d.metaTitle.length > 60)
    e.metaTitle = "Meta title should be under 60 chars";
  if (d.metaDescription && d.metaDescription.length > 160)
    e.metaDescription = "Meta description should be under 160 chars";

  /* Payment */
  if (d.minCodAmount && Number(d.minCodAmount) < 0)
    e.minCodAmount = "Cannot be negative";
  if (d.maxCodAmount && Number(d.maxCodAmount) < 0)
    e.maxCodAmount = "Cannot be negative";
  if (
    d.minCodAmount &&
    d.maxCodAmount &&
    Number(d.maxCodAmount) < Number(d.minCodAmount)
  )
    e.maxCodAmount = "Max should be greater than Min";
  if (d.bankIfsc && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(d.bankIfsc))
    e.bankIfsc = "Enter valid IFSC (e.g. SBIN0001234)";

  /* Shipping */
  if (d.defaultShippingCharge && Number(d.defaultShippingCharge) < 0)
    e.defaultShippingCharge = "Cannot be negative";
  if (d.freeShippingAbove && Number(d.freeShippingAbove) < 0)
    e.freeShippingAbove = "Cannot be negative";
  if (d.minDeliveryDays && d.maxDeliveryDays && 
      Number(d.maxDeliveryDays) < Number(d.minDeliveryDays))
    e.maxDeliveryDays = "Max should be greater than Min";

  /* Business */
  if (d.gstNumber && 
      !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(d.gstNumber))
    e.gstNumber = "Enter valid GST number";
  if (d.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(d.panNumber))
    e.panNumber = "Enter valid PAN (e.g. ABCDE1234F)";

  /* Email / SMS */
  if (d.smtpPort && Number(d.smtpPort) <= 0)
    e.smtpPort = "Enter valid port";

  return e;
};

/* ---------------- SMALL UI HELPERS ---------------- */

export const Field = ({
  label, error, hint, required, children, col = "col-md-4",
}: {
  label: string; error?: string; hint?: string; required?: boolean;
  children: ReactNode; col?: string;
}) => (
  <div className={col}>
    <div className="mb-3 fw-bold">
      <label>
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children}
      {hint && !error && (
        <small className="text-muted fw-normal d-block mt-1">{hint}</small>
      )}
      {error && <p className="text-danger fw-normal mb-0">{error}</p>}
    </div>
  </div>
);

/* ============================================================
   SECTION WRAPPER — हर section के लिए
   ============================================================ */

export const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: ReactNode;
}) => (
  <>
    <h6 className="fw-bold mb-3">
      <i className={`fa ${icon} me-2 text-primary`}></i>
      {title}
    </h6>
    {children}
    <hr className="my-4" />
  </>
);

/* ============================================================
   TYPES
   ============================================================ */

export type SettingFieldsProps = {
  data: Setting;
  errors: { [key: string]: string };
  show: boolean;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
};