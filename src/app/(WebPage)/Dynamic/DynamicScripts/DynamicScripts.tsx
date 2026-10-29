"use client";

import Script from "next/script";

export default function DynamicScripts() {
  return (
    <>
   <Script strategy="afterInteractive" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"/>
    <Script id="google-translate-init" strategy="afterInteractive">
     {`function googleTranslateElementInit() {
       new google.translate.TranslateElement(
       { pageLanguage: 'en', includedLanguages: 'hi,gu,pa,bn,mr', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
       'google_translate_element');}`}
</Script>
      <Script src="../assets/js/animation.js" strategy="afterInteractive" />
      <Script src="../assets/js/main.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/leaflet/dist/leaflet.js"/>
    </>
  );
}
