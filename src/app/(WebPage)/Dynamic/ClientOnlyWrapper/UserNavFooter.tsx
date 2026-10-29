// src/app/(WebPage)/Dynamic/ClientOnlyWrapper/UserNavFooter.tsx
"use client";
import dynamic from "next/dynamic";
import React from "react";

const PageHeaderClient = dynamic(() => import("../Navbar"), { ssr: false });
const PageFooterClient = dynamic(() => import("../Footer"), { ssr: false });

export default function UserOnlyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Nav  */}
      <PageHeaderClient />
      <main>
        <>{children}</>
      </main>
      {/* footer   */}
      <PageFooterClient />
    </>
  );
}
