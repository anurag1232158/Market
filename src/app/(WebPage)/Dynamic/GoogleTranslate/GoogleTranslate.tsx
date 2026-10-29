"use client";
import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}
const LANGUAGE_MAP: Record<string, string> = {
  en: "English",
  hi: "हिंदी",
  gu: "ગુજરાતી",
  pa: "ਪੰਜਾਬੀ",
  bn: "বাংলা",
  mr: "मराठी",
};

function getSelectedLanguage(): string {
  const match = document.cookie.match(/googtrans=\/[a-z]{2}\/([a-z]{2})/);
  return match && match[1] ? match[1] : "en";
}

function triggerTranslate(langCode: string) {
  const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event("change"));
  } else {
    console.warn("Google Translate not ready yet");
  }
}

const GoogleTranslate = () => {
  const [languageCode, setLanguageCode] = useState("en");
  useEffect(() => {
    window.googleTranslateElementInit = function () {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,gu,pa,bn,mr",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };
  }, []);
  // Track current selected language
  useEffect(() => {
    const interval = setInterval(() => {
      const lang = getSelectedLanguage();
      setLanguageCode(lang);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      />

      {/* Custom Buttons */}
      <div translate="no" className="dropdown">
        <div className="dropdown-toggle1 w-100">
          {Object.entries(LANGUAGE_MAP).map(([code, name]) => (
            <button
              key={code}
              onClick={() => triggerTranslate(code)}
              className="dropdown-item dropdown-item1 w-100"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Keep Google Translate hidden but loaded */}
      <div
        id="google_translate_element"
        style={{ height: 0, overflow: "hidden" }}
      />
    </>
  );
};

export default GoogleTranslate;
