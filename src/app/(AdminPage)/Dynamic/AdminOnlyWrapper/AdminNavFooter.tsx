"use client";
import dynamic from "next/dynamic";
import React from "react";
// app/layout.js

const PageNavbar = dynamic(
  () => import("../../(Page)/Sidebar/Navbar/PageNavbar"),
  { ssr: false }
);
const PageFooter = dynamic(() => import("../../(Page)/Sidebar/Footer/page"), {
  ssr: false,
});

export default function AdminOnlyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <PageNavbar />  */}
      <main className="min-h-screen">{children}</main>
      {/* <PageFooter /> */}
    </>
  );
}
