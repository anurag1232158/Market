"use client";
import Link from "next/link";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import PageFooter from "../Sidebar/Footer/Footer";
import Sidebars from "../Sidebar/Sidebars/PageSidebar";
import PageNavbar from "../Sidebar/Navbar/PageNavbar";
import ASO from "../AOS/AOS";
import {
  Setting,
  emptySetting,
  validateSetting,
  prepareSetting,
  Field,
  Section,
  today,
} from "./SettingFields";

function AdminSettingPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("general");
  const [data, setData] = useState<Setting>(emptySetting);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  /* ============ Fetch Settings ============ */
  useEffect(() => {
    fetch("/api/setting")
      .then((res) => res.json())
      .then((result) => {
        setData({ ...emptySetting, ...(result?.setting || result || {}) });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  /* ============ Handle Input Change ============ */
  const getInputData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files[0]) {
      setData((prev) => ({ ...prev, [name]: files[0].name }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /* ============ Save Settings ============ */
  const saveSettings = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(true);

    const errs = validateSetting(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      // सबसे पहला error वाले tab पर जाएँ
      const errKeys = Object.keys(errs);
      const generalFields = ["siteName", "tagline", "contactEmail", "contactPhone", "whatsappNumber", "address", "googleMapsLink"];
      const paymentFields = ["minCodAmount", "maxCodAmount", "bankIfsc", "upiId"];
      const shippingFields = ["freeShippingAbove", "defaultShippingCharge", "minDeliveryDays", "maxDeliveryDays"];
      const businessFields = ["gstNumber", "panNumber"];
      const seoFields = ["metaTitle", "metaDescription", "metaKeywords"];
      const emailFields = ["smtpHost", "smtpPort", "smtpUser", "smtpPass"];

      if (errKeys.some(k => generalFields.includes(k))) setActiveTab("general");
      else if (errKeys.some(k => seoFields.includes(k))) setActiveTab("seo");
      else if (errKeys.some(k => paymentFields.includes(k))) setActiveTab("payment");
      else if (errKeys.some(k => shippingFields.includes(k))) setActiveTab("shipping");
      else if (errKeys.some(k => businessFields.includes(k))) setActiveTab("business");
      else if (errKeys.some(k => emailFields.includes(k))) setActiveTab("email");

      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSaving(true);

    try {
      const payload = prepareSetting(data);
      const res = await fetch("/api/setting", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("✅ Settings saved successfully!");
        setErrors({});
        setShow(false);
      } else {
        const result = await res.json().catch(() => ({}));
        alert(result.error || "Save failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  /* ============ Export Settings ============ */
  const exportSettings = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `settings-${today().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ============ Import Settings ============ */
  const importSettings = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string);
        setData({ ...emptySetting, ...json });
        alert("✅ Settings loaded. Ab Save करें।");
      } catch {
        alert("❌ Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  /* ============ Test Buttons ============ */
  const testEmail = async () => {
    if (!data.smtpHost || !data.smtpUser) {
      alert("⚠️ SMTP details भरें पहले");
      return;
    }
    alert(`📧 Test email will be sent to: ${data.smtpUser}\n\n(यह feature backend setup के बाद काम करेगा)`);
  };

  const testSms = () => {
    if (!data.smsApiKey) {
      alert("⚠️ SMS API key भरें पहले");
      return;
    }
    alert("📱 Test SMS will be sent.\n\n(यह feature backend setup के बाद काम करेगा)");
  };

  /* ============ Tabs ============ */
  const tabs = [
    { key: "general", label: "General", icon: "fa-cog" },
    { key: "social", label: "Social Media", icon: "fa-share-alt" },
    { key: "seo", label: "SEO", icon: "fa-search" },
    { key: "payment", label: "Payment", icon: "fa-credit-card" },
    { key: "shipping", label: "Shipping", icon: "fa-truck" },
    { key: "business", label: "Business", icon: "fa-briefcase" },
    { key: "email", label: "Email/SMS", icon: "fa-envelope" },
    { key: "maintenance", label: "Maintenance", icon: "fa-tools" },
  ];

  const err = (k: string) => (show ? errors[k] : undefined);
  const cls = (k: string) =>
    `form-control mt-2 ${show && errors[k] ? "is-invalid" : ""}`;

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading settings...</p>
      </div>
    );
  }

  return (
    <>
      <ASO />
      <div className="wrapper">
        <Sidebars isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
          <PageNavbar toggleSidebar={toggleSidebar} />
          <section className="mb-5 py-5">
            <div className="container-fluid px-4">
              {/* Header */}
              <div className="border p-3 mb-4 bg-gradient">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold text-white">
                    <i className="fa fa-cogs me-2"></i>
                    Site Settings
                  </h5>
                  <div>
                    <button
                      type="button"
                      className="btn btn-sm btn-light me-2"
                      onClick={exportSettings}
                      title="Download settings"
                    >
                      <i className="fa fa-download"></i> Export
                    </button>
                    <label className="btn btn-sm btn-light mb-0">
                      <i className="fa fa-upload"></i> Import
                      <input
                        type="file"
                        accept=".json"
                        onChange={importSettings}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body bg-grays1">
                  <form onSubmit={saveSettings}>
                    {/* ============ Tabs ============ */}
                    <ul className="nav nav-tabs mb-4 flex-wrap">
                      {tabs.map((t) => (
                        <li className="nav-item" key={t.key}>
                          <button
                            type="button"
                            className={`nav-link ${
                              activeTab === t.key ? "active fw-bold" : ""
                            }`}
                            onClick={() => setActiveTab(t.key)}
                          >
                            <i className={`fa ${t.icon} me-1`}></i>
                            {t.label}
                          </button>
                        </li>
                      ))}
                    </ul>

                    {/* ============================================
                        TAB 1 : GENERAL
                        ============================================ */}
                    {activeTab === "general" && (
                      <Section title="General Information" icon="fa-cog">
                        <div className="row">
                          <Field label="Site Name :" error={err("siteName")} required>
                            <input
                              type="text"
                              name="siteName"
                              value={data.siteName}
                              onChange={getInputData}
                              placeholder="e.g. Makhana Store"
                              className={cls("siteName")}
                            />
                          </Field>

                          <Field label="Tagline :" col="col-md-8">
                            <input
                              type="text"
                              name="tagline"
                              value={data.tagline}
                              onChange={getInputData}
                              placeholder="e.g. Pure Bihar Makhana"
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>

                        <div className="row">
                          <Field label="Logo :" col="col-md-6" hint="200x60 px recommended">
                            <input
                              type="file"
                              name="logo"
                              accept="image/*"
                              className="form-control mt-2"
                              onChange={getInputData}
                            />
                            {data.logo && (
                              <img
                                src={`/assets/images/${data.logo}`}
                                alt="Logo"
                                className="mt-2 border rounded"
                                style={{ maxHeight: "60px" }}
                              />
                            )}
                          </Field>

                          <Field label="Favicon :" col="col-md-6" hint="32x32 px (ICO/PNG)">
                            <input
                              type="file"
                              name="favicon"
                              accept="image/*"
                              className="form-control mt-2"
                              onChange={getInputData}
                            />
                            {data.favicon && (
                              <img
                                src={`/assets/images/${data.favicon}`}
                                alt="Favicon"
                                className="mt-2 border rounded"
                                style={{ maxHeight: "32px" }}
                              />
                            )}
                          </Field>
                        </div>

                        <div className="row">
                          <Field label="Contact Email :" error={err("contactEmail")}>
                            <input
                              type="email"
                              name="contactEmail"
                              value={data.contactEmail}
                              onChange={getInputData}
                              placeholder="info@makhanastore.com"
                              className={cls("contactEmail")}
                            />
                          </Field>

                          <Field label="Contact Phone :" error={err("contactPhone")}>
                            <input
                              type="tel"
                              name="contactPhone"
                              value={data.contactPhone}
                              onChange={getInputData}
                              placeholder="9876543210"
                              className={cls("contactPhone")}
                            />
                          </Field>

                          <Field label="WhatsApp Number :">
                            <input
                              type="tel"
                              name="whatsappNumber"
                              value={data.whatsappNumber}
                              onChange={getInputData}
                              placeholder="9876543210"
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>

                        <div className="row">
                          <Field label="Full Address :" col="col-md-12">
                            <textarea
                              name="address"
                              rows={2}
                              value={data.address}
                              onChange={getInputData}
                              placeholder="Shop No, Street, City, State - PIN"
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>

                        <div className="row">
                          <Field label="Google Maps Link :" col="col-md-12" hint="Embed URL from Google Maps">
                            <input
                              type="url"
                              name="googleMapsLink"
                              value={data.googleMapsLink}
                              onChange={getInputData}
                              placeholder="https://maps.google.com/..."
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>
                      </Section>
                    )}

                    {/* ============================================
                        TAB 2 : SOCIAL MEDIA
                        ============================================ */}
                    {activeTab === "social" && (
                      <Section title="Social Media Links" icon="fa-share-alt">
                        <div className="row">
                          <Field label="Facebook :" col="col-md-6">
                            <input
                              type="url"
                              name="facebook"
                              value={data.facebook}
                              onChange={getInputData}
                              placeholder="https://facebook.com/yourpage"
                              className="form-control mt-2"
                            />
                          </Field>

                          <Field label="Instagram :" col="col-md-6">
                            <input
                              type="url"
                              name="instagram"
                              value={data.instagram}
                              onChange={getInputData}
                              placeholder="https://instagram.com/yourpage"
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>

                        <div className="row">
                          <Field label="Twitter / X :" col="col-md-6">
                            <input
                              type="url"
                              name="twitter"
                              value={data.twitter}
                              onChange={getInputData}
                              placeholder="https://twitter.com/yourhandle"
                              className="form-control mt-2"
                            />
                          </Field>

                          <Field label="YouTube :" col="col-md-6">
                            <input
                              type="url"
                              name="youtube"
                              value={data.youtube}
                              onChange={getInputData}
                              placeholder="https://youtube.com/@yourchannel"
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>

                        <div className="row">
                          <Field label="LinkedIn :" col="col-md-6">
                            <input
                              type="url"
                              name="linkedin"
                              value={data.linkedin}
                              onChange={getInputData}
                              placeholder="https://linkedin.com/company/yourpage"
                              className="form-control mt-2"
                            />
                          </Field>

                          <Field label="WhatsApp Business :" col="col-md-6">
                            <input
                              type="url"
                              name="whatsappBusiness"
                              value={data.whatsappBusiness}
                              onChange={getInputData}
                              placeholder="https://wa.me/919876543210"
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>
                      </Section>
                    )}

                    {/* ============================================
                        TAB 3 : SEO
                        ============================================ */}
                    {activeTab === "seo" && (
                      <Section title="SEO Settings" icon="fa-search">
                        <div className="row">
                          <Field
                            label="Meta Title :"
                            error={err("metaTitle")}
                            col="col-md-12"
                            hint={`${data.metaTitle.length}/60 characters`}
                          >
                            <input
                              type="text"
                              name="metaTitle"
                              value={data.metaTitle}
                              onChange={getInputData}
                              placeholder="Buy Pure Makhana Online"
                              className={cls("metaTitle")}
                            />
                          </Field>
                        </div>

                        <div className="row">
                          <Field
                            label="Meta Description :"
                            error={err("metaDescription")}
                            col="col-md-12"
                            hint={`${data.metaDescription.length}/160 characters`}
                          >
                            <textarea
                              name="metaDescription"
                              rows={3}
                              value={data.metaDescription}
                              onChange={getInputData}
                              placeholder="Buy pure Bihar Makhana online. Free shipping above ₹500."
                              className={cls("metaDescription")}
                            />
                          </Field>
                        </div>

                        <div className="row">
                          <Field label="Meta Keywords :" col="col-md-12" hint="Comma separated">
                            <input
                              type="text"
                              name="metaKeywords"
                              value={data.metaKeywords}
                              onChange={getInputData}
                              placeholder="makhana, fox nuts, buy online"
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>

                        <div className="row">
                          <Field label="Google Analytics ID :" col="col-md-6" hint="G-XXXXXXXXXX">
                            <input
                              type="text"
                              name="googleAnalyticsId"
                              value={data.googleAnalyticsId}
                              onChange={getInputData}
                              placeholder="G-XXXXXXXXXX"
                              className="form-control mt-2"
                            />
                          </Field>

                          <Field label="Facebook Pixel ID :" col="col-md-6">
                            <input
                              type="text"
                              name="facebookPixelId"
                              value={data.facebookPixelId}
                              onChange={getInputData}
                              placeholder="1234567890"
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>
                      </Section>
                    )}

                    {/* ============================================
                        TAB 4 : PAYMENT
                        ============================================ */}
                    {activeTab === "payment" && (
                      <Section title="Payment Settings" icon="fa-credit-card">
                        <div className="row">
                          <Field label="COD Enabled :" col="col-md-4">
                            <select
                              name="codEnabled"
                              value={data.codEnabled}
                              onChange={getInputData}
                              className="form-control mt-2"
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </Field>

                          <Field label="Min COD Amount (₹) :" error={err("minCodAmount")}>
                            <input
                              type="number"
                              name="minCodAmount"
                              min={0}
                              value={data.minCodAmount}
                              onChange={getInputData}
                              className={cls("minCodAmount")}
                            />
                          </Field>

                          <Field label="Max COD Amount (₹) :" error={err("maxCodAmount")}>
                            <input
                              type="number"
                              name="maxCodAmount"
                              min={0}
                              value={data.maxCodAmount}
                              onChange={getInputData}
                              className={cls("maxCodAmount")}
                            />
                          </Field>
                        </div>

                        <div className="row">
                          <Field label="UPI ID :" col="col-md-6" hint="e.g. makhana@paytm">
                            <input
                              type="text"
                              name="upiId"
                              value={data.upiId}
                              onChange={getInputData}
                              placeholder="makhana@paytm"
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>

                        <h6 className="fw-bold mt-4 mb-3">Bank Details</h6>
                        <div className="row">
                          <Field label="Bank Name :">
                            <input
                              type="text"
                              name="bankName"
                              value={data.bankName}
                              onChange={getInputData}
                              placeholder="e.g. HDFC Bank"
                              className="form-control mt-2"
                            />
                          </Field>

                          <Field label="Account Holder :">
                            <input
                              type="text"
                              name="bankAccountName"
                              value={data.bankAccountName}
                              onChange={getInputData}
                              placeholder="Account holder name"
                              className="form-control mt-2"
                            />
                          </Field>

                          <Field label="Account Number :">
                            <input
                              type="text"
                              name="bankAccountNo"
                              value={data.bankAccountNo}
                              onChange={getInputData}
                              placeholder="1234567890"
                              className="form-control mt-2"
                            />
                          </Field>

                          <Field label="IFSC Code :" error={err("bankIfsc")}>
                            <input
                              type="text"
                              name="bankIfsc"
                              value={data.bankIfsc}
                              onChange={getInputData}
                              placeholder="HDFC0001234"
                              className={cls("bankIfsc")}
                            />
                          </Field>
                        </div>

                        <h6 className="fw-bold mt-4 mb-3">
                          Razorpay (Optional)
                          <button
                            type="button"
                            className="btn btn-sm btn-link"
                            onClick={() => setShowPasswords(!showPasswords)}
                          >
                            {showPasswords ? "Hide" : "Show"}
                          </button>
                        </h6>
                        <div className="row">
                          <Field label="Razorpay Key ID :" col="col-md-6">
                            <input
                              type={showPasswords ? "text" : "password"}
                              name="razorpayKey"
                              value={data.razorpayKey}
                              onChange={getInputData}
                              placeholder="rzp_test_xxxxxxxx"
                              className="form-control mt-2"
                            />
                          </Field>

                          <Field label="Razorpay Secret :" col="col-md-6">
                            <input
                              type={showPasswords ? "text" : "password"}
                              name="razorpaySecret"
                              value={data.razorpaySecret}
                              onChange={getInputData}
                              placeholder="xxxxxxxxxxxxxxxx"
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>
                      </Section>
                    )}

                    {/* ============================================
                        TAB 5 : SHIPPING
                        ============================================ */}
                    {activeTab === "shipping" && (
                      <Section title="Shipping Settings" icon="fa-truck">
                        <div className="row">
                          <Field label="Free Shipping Above (₹) :" error={err("freeShippingAbove")}>
                            <input
                              type="number"
                              name="freeShippingAbove"
                              min={0}
                              value={data.freeShippingAbove}
                              onChange={getInputData}
                              className={cls("freeShippingAbove")}
                            />
                          </Field>

                          <Field label="Default Shipping Charge (₹) :" error={err("defaultShippingCharge")}>
                            <input
                              type="number"
                              name="defaultShippingCharge"
                              min={0}
                              value={data.defaultShippingCharge}
                              onChange={getInputData}
                              className={cls("defaultShippingCharge")}
                            />
                          </Field>
                        </div>

                        <div className="row">
                          <Field label="Min Delivery Days :" error={err("minDeliveryDays")}>
                            <input
                              type="number"
                              name="minDeliveryDays"
                              min={1}
                              value={data.minDeliveryDays}
                              onChange={getInputData}
                              className={cls("minDeliveryDays")}
                            />
                          </Field>

                          <Field label="Max Delivery Days :" error={err("maxDeliveryDays")}>
                            <input
                              type="number"
                              name="maxDeliveryDays"
                              min={1}
                              value={data.maxDeliveryDays}
                              onChange={getInputData}
                              className={cls("maxDeliveryDays")}
                            />
                          </Field>
                        </div>

                        <div className="row">
                          <Field
                            label="Serviceable Pincodes :"
                            col="col-md-12"
                            hint="Comma separated. खाली छोड़ें = All India"
                          >
                            <textarea
                              name="serviceablePincodes"
                              rows={3}
                              value={data.serviceablePincodes}
                              onChange={getInputData}
                              placeholder="846004, 800001, 110020, 400001"
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>
                      </Section>
                    )}

                    {/* ============================================
                        TAB 6 : BUSINESS
                        ============================================ */}
                    {activeTab === "business" && (
                      <Section title="Business Settings" icon="fa-briefcase">
                        <div className="row">
                          <Field label="GST Number :" error={err("gstNumber")} col="col-md-6">
                            <input
                              type="text"
                              name="gstNumber"
                              value={data.gstNumber}
                              onChange={getInputData}
                              placeholder="10ABCDE1234F1Z5"
                              maxLength={15}
                              className={cls("gstNumber")}
                            />
                          </Field>

                          <Field label="PAN Number :" error={err("panNumber")} col="col-md-6">
                            <input
                              type="text"
                              name="panNumber"
                              value={data.panNumber}
                              onChange={getInputData}
                              placeholder="ABCDE1234F"
                              maxLength={10}
                              className={cls("panNumber")}
                            />
                          </Field>
                        </div>

                        <div className="row">
                          <Field label="Invoice Prefix :" hint="e.g. INV-, MKH-">
                            <input
                              type="text"
                              name="invoicePrefix"
                              value={data.invoicePrefix}
                              onChange={getInputData}
                              placeholder="INV-"
                              className="form-control mt-2"
                            />
                          </Field>

                          <Field label="Currency :">
                            <select
                              name="currency"
                              value={data.currency}
                              onChange={getInputData}
                              className="form-control mt-2"
                            >
                              <option value="INR">INR (₹)</option>
                              <option value="USD">USD ($)</option>
                              <option value="EUR">EUR (€)</option>
                            </select>
                          </Field>

                          <Field label="Timezone :">
                            <select
                              name="timezone"
                              value={data.timezone}
                              onChange={getInputData}
                              className="form-control mt-2"
                            >
                              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                              <option value="Asia/Dubai">Asia/Dubai</option>
                              <option value="America/New_York">America/New_York</option>
                              <option value="Europe/London">Europe/London</option>
                            </select>
                          </Field>
                        </div>

                        <div className="row">
                          <Field label="Business Hours :" col="col-md-6">
                            <input
                              type="text"
                              name="businessHours"
                              value={data.businessHours}
                              onChange={getInputData}
                              placeholder="10 AM - 8 PM (Mon-Sat)"
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>
                      </Section>
                    )}

                    {/* ============================================
                        TAB 7 : EMAIL / SMS
                        ============================================ */}
                    {activeTab === "email" && (
                      <Section title="Email / SMS Settings" icon="fa-envelope">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="fw-bold mb-0">SMTP (Email)</h6>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setShowPasswords(!showPasswords)}
                          >
                            <i className="fa fa-eye me-1"></i>
                            {showPasswords ? "Hide Passwords" : "Show Passwords"}
                          </button>
                        </div>

                        <div className="row">
                          <Field label="SMTP Host :" col="col-md-6">
                            <input
                              type="text"
                              name="smtpHost"
                              value={data.smtpHost}
                              onChange={getInputData}
                              placeholder="smtp.gmail.com"
                              className="form-control mt-2"
                            />
                          </Field>

                          <Field label="SMTP Port :" error={err("smtpPort")}>
                            <input
                              type="number"
                              name="smtpPort"
                              value={data.smtpPort}
                              onChange={getInputData}
                              placeholder="587"
                              className={cls("smtpPort")}
                            />
                          </Field>
                        </div>

                        <div className="row">
                          <Field label="SMTP User :" col="col-md-6">
                            <input
                              type="email"
                              name="smtpUser"
                              value={data.smtpUser}
                              onChange={getInputData}
                              placeholder="your@email.com"
                              className="form-control mt-2"
                            />
                          </Field>

                          <Field label="SMTP Password :" col="col-md-6">
                            <input
                              type={showPasswords ? "text" : "password"}
                              name="smtpPass"
                              value={data.smtpPass}
                              onChange={getInputData}
                              placeholder="App password"
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-12">
                            <button
                              type="button"
                              className="btn btn-outline-info btn-sm"
                              onClick={testEmail}
                            >
                              <i className="fa fa-paper-plane me-1"></i>
                              Test Email
                            </button>
                          </div>
                        </div>

                        <h6 className="fw-bold mt-4 mb-3">SMS Gateway</h6>
                        <div className="row">
                          <Field label="SMS API Key :" col="col-md-6">
                            <input
                              type={showPasswords ? "text" : "password"}
                              name="smsApiKey"
                              value={data.smsApiKey}
                              onChange={getInputData}
                              placeholder="Your SMS API key"
                              className="form-control mt-2"
                            />
                          </Field>

                          <div className="col-md-6 d-flex align-items-end">
                            <button
                              type="button"
                              className="btn btn-outline-info btn-sm mb-3"
                              onClick={testSms}
                            >
                              <i className="fa fa-mobile me-1"></i>
                              Test SMS
                            </button>
                          </div>
                        </div>

                        <h6 className="fw-bold mt-4 mb-3">Order Confirmation Template</h6>
                        <div className="row">
                          <Field
                            label="Message Template :"
                            col="col-md-12"
                            hint="Placeholders: {name}, {orderNo}, {amount}"
                          >
                            <textarea
                              name="orderConfirmTemplate"
                              rows={4}
                              value={data.orderConfirmTemplate}
                              onChange={getInputData}
                              placeholder="Namaste {name}, aapka order {orderNo} confirm ho gaya hai. Total: ₹{amount}."
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>
                      </Section>
                    )}

                    {/* ============================================
                        TAB 8 : MAINTENANCE
                        ============================================ */}
                    {activeTab === "maintenance" && (
                      <Section title="Maintenance Mode" icon="fa-tools">
                        <div className="alert alert-warning">
                          <i className="fa fa-exclamation-triangle me-2"></i>
                          <strong>Warning:</strong> Maintenance mode ON करने पर website customers के लिए बंद हो जाएगी।
                        </div>

                        <div className="row">
                          <Field label="Maintenance Mode :" col="col-md-4">
                            <select
                              name="maintenanceMode"
                              value={data.maintenanceMode}
                              onChange={getInputData}
                              className="form-control mt-2"
                            >
                              <option value="No">No (Website Live)</option>
                              <option value="Yes">Yes (Website Down)</option>
                            </select>
                          </Field>
                        </div>

                        <div className="row">
                          <Field label="Maintenance Message :" col="col-md-12">
                            <textarea
                              name="maintenanceMessage"
                              rows={3}
                              value={data.maintenanceMessage}
                              onChange={getInputData}
                              placeholder="We'll be back soon..."
                              className="form-control mt-2"
                            />
                          </Field>
                        </div>

                        {data.maintenanceMode === "Yes" && (
                          <div className="alert alert-danger">
                            <strong>🔴 LIVE:</strong> Website अभी maintenance mode में है!
                          </div>
                        )}
                      </Section>
                    )}

                    {/* ============ Save Bar ============ */}
                    <div className="d-flex justify-content-between align-items-center py-4 border-top">
                      <div>
                        <small className="text-muted">
                          {data.updatedAt
                            ? `Last saved: ${new Date(data.updatedAt).toLocaleString()}`
                            : "Not saved yet"}
                        </small>
                      </div>
                      <div>
                        <Link href="/" className="btn btn-secondary text-light me-2">
                          Cancel
                        </Link>
                        <button
                          type="submit"
                          className="btn btn-success text-light"
                          disabled={saving}
                        >
                          {saving ? (
                            <>
                              <i className="fa fa-spinner fa-spin me-1"></i>
                              Saving...
                            </>
                          ) : (
                            <>
                              <i className="fa fa-save me-1"></i>
                              Save All Settings
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <PageFooter />
        </div>
      </div>
    </>
  );
}

export default AdminSettingPage;