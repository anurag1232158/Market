// src/utils/auth.ts
export function logout(router: any) {
  if (typeof window !== "undefined") {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    const current = localStorage.getItem("authUser");
    let role: string | null = null;

    if (current) {
      try {
        role = JSON.parse(current).role;
      } catch {}
    }

    localStorage.removeItem("authUser");

    // ✅ Redirect based on role
    if (role === "admin") {
      router.replace("/AdminLogin");
    } else {
      router.replace("/Login");
    }
  }
}
