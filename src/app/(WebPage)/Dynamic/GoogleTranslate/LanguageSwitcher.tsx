"use client";
import React from "react";

const triggerTranslate = (langCode: string) => {
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event("change"));
  }
};

export default function LanguageSwitcher() {
  return (
    <>
    
    </>
  );
}
