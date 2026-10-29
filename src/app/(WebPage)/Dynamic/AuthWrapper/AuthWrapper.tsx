"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { getAuthUser, clearAuthUser, LOGIN_PATHS } from "../../../../../lib/authUser"; // header jaisi hi ginti
import type { Role } from "../../../../../lib/session";

const AdminOnlyWrapper = dynamic(
  () => import("../../../(AdminPage)/Dynamic/AdminOnlyWrapper/AdminNavFooter"),
  { ssr: false }
);
const ClientOnlyWrapper = dynamic(
  () => import("../ClientOnlyWrapper/UserNavFooter"),
  { ssr: false }
);

const LOGIN_PAGES = ["/Login", "/AdminLogin", "/ReportLogin"];

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ok, setOk] = useState(false);

  const needs: Role | null = pathname.startsWith("/Admin")
    ? "admin"
    : pathname.startsWith("/Report")
    ? "report"
    : pathname.startsWith("/Checkout") || pathname.startsWith("/Profile")
    ? "user"
    : null;

  useEffect(() => {
    if (LOGIN_PAGES.includes(pathname) || !needs) {
      setOk(true);
      return;
    }

    const u = getAuthUser(needs);
    const expired = u?.expiry && Date.now() > u.expiry;

    if (!u || u.role !== needs || expired) {
      if (u) clearAuthUser(needs);
      router.replace(LOGIN_PATHS[needs] ?? "/Login");
      setOk(false);
      return;
    }
    setOk(true);
  }, [pathname, router, needs]);

  if (LOGIN_PAGES.includes(pathname)) return <>{children}</>;

  if (needs === "admin") return ok ? <AdminOnlyWrapper>{children}</AdminOnlyWrapper> : null;
  if (needs === "report") return ok ? <>{children}</> : null; // report ka apna wrapper ho to yahan lagao
  return <ClientOnlyWrapper>{children}</ClientOnlyWrapper>;
}