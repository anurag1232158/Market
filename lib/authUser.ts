// // lib/authUser.ts
// import type { Role } from "./session";

// export const LOGIN_PATH = "/Login";

// export const LOGIN_PATHS: Record<Role, string> = {
//   user: "/Login",
//   admin: "/AdminLogin",
//   report: "/ReportLogin",
// };

// export interface Profile {
//   id: string | number;
//   name?: string;
//   username?: string;
//   email?: string;
//   number?: string;
//   address?: string;
//   pin?: string;
//   city?: string;
//   state?: string;
//   country?: string;
//   pic?: string;
// }

// const key = (role: Role) => `authUser_${role}`;
// const isBrowser = () => typeof window !== "undefined";

// export const getAuthUser = (role: Role = "user"): any => {
//   if (!isBrowser()) return null;
//   try {
//     return JSON.parse(localStorage.getItem(key(role)) || "null");
//   } catch {
//     return null;
//   }
// };

// export const setAuthUser = (role: Role, data: object) => {
//   if (!isBrowser()) return;
//   localStorage.setItem(key(role), JSON.stringify({ ...data, role }));
//   window.dispatchEvent(new Event("authUserUpdated"));
// };

// export const clearAuthUser = (role: Role) => {
//   if (!isBrowser()) return;
//   localStorage.removeItem(key(role));
//   window.dispatchEvent(new Event("authUserUpdated"));
// };

// export async function fetchMyProfile(
//   signal?: AbortSignal
// ): Promise<Profile | null> {
//   const res = await fetch("/api/user", { cache: "no-store", signal });
//   if (res.status === 401) {
//     clearAuthUser("user");
//     if (isBrowser()) window.location.href = LOGIN_PATHS.user;
//     return null;
//   }
//   const profile = await res.json();
//   return profile?.id ? profile : null;
// }

// /* ⭐ SESSION — 2 HOURS (120 minutes) */
// export const SESSION_DURATION = 120 * 60 * 1000; // 7200 seconds

// export interface SessionTime {
//   loginAt: number;
//   expiresAt: number;
//   logoutAt?: number;
//   duration?: number;
// }

// const timeKey = (role: Role) => `sessionTime_${role}`;

// export const setSessionTime = (role: Role) => {
//   if (!isBrowser()) return;
//   const now = Date.now();
//   localStorage.setItem(
//     timeKey(role),
//     JSON.stringify({
//       loginAt: now,
//       expiresAt: now + SESSION_DURATION,
//     })
//   );
// };

// export const getSessionTime = (role: Role): SessionTime | null => {
//   if (!isBrowser()) return null;
//   try {
//     return JSON.parse(localStorage.getItem(timeKey(role)) || "null");
//   } catch {
//     return null;
//   }
// };

// export const setLogoutTime = (role: Role) => {
//   if (!isBrowser()) return;
//   const data = getSessionTime(role);
//   if (!data) return;
//   const now = Date.now();
//   localStorage.setItem(
//     timeKey(role),
//     JSON.stringify({
//       ...data,
//       logoutAt: now,
//       duration: now - data.loginAt,
//     })
//   );
// };

// export const getTimeLeft = (role: Role): number => {
//   const data = getSessionTime(role);
//   if (!data) return 0;
//   const left = data.expiresAt - Date.now();
//   return left > 0 ? left : 0;
// };

// export const formatTimeLeft = (ms: number): string => {
//   const totalSec = Math.floor(ms / 1000);
//   const minutes = Math.floor(totalSec / 60);
//   const seconds = totalSec % 60;
//   const mm = String(minutes).padStart(2, "0");
//   const ss = String(seconds).padStart(2, "0");
//   return `${mm}m : ${ss}s`;
// };

// export const isSessionExpired = (role: Role): boolean => {
//   const data = getSessionTime(role);
//   if (!data) return true;
//   return Date.now() > data.expiresAt;
// };

// export const clearSessionTime = (role: Role) => {
//   if (!isBrowser()) return;
//   localStorage.removeItem(timeKey(role));
// };

// export async function logout(role: Role = "user") {
//   setLogoutTime(role);

//   await fetch("/api/logout", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ role }),
//   }).catch(() => {});

//   clearAuthUser(role);
//   clearSessionTime(role);

//   if (isBrowser()) {
//     localStorage.removeItem("authUser");
//     localStorage.removeItem("authUser_user");
//     localStorage.removeItem("authUser_admin");
//     localStorage.removeItem("authUser_report");

//     window.location.href = LOGIN_PATHS[role];
//   }
// }

// lib/authUser.ts
import type { Role } from "./session";

export const LOGIN_PATH = "/Login";

export const LOGIN_PATHS: Record<Role, string> = {
  user: "/Login",
  admin: "/AdminLogin",
  report: "/ReportLogin",
};

export interface Profile {
  id: string | number;
  name?: string;
  username?: string;
  email?: string;
  number?: string;
  address?: string;
  pin?: string;
  city?: string;
  state?: string;
  country?: string;
  pic?: string;
}

const key = (role: Role) => `authUser_${role}`;
const isBrowser = () => typeof window !== "undefined";

export const getAuthUser = (role: Role = "user"): any => {
  if (!isBrowser()) return null;
  try {
    return JSON.parse(localStorage.getItem(key(role)) || "null");
  } catch {
    return null;
  }
};

export const setAuthUser = (role: Role, data: object) => {
  if (!isBrowser()) return;
  localStorage.setItem(key(role), JSON.stringify({ ...data, role }));
  window.dispatchEvent(new Event("authUserUpdated"));
};

export const clearAuthUser = (role: Role) => {
  if (!isBrowser()) return;
  localStorage.removeItem(key(role));
  window.dispatchEvent(new Event("authUserUpdated"));
};

export async function fetchMyProfile(
  signal?: AbortSignal
): Promise<Profile | null> {
  const res = await fetch("/api/user", { cache: "no-store", signal });
  if (res.status === 401) {
    clearAuthUser("user");
    if (isBrowser()) window.location.href = LOGIN_PATHS.user;
    return null;
  }
  const profile = await res.json();
  return profile?.id ? profile : null;
}

/* ⭐ SESSION — 2 HOURS (120 minutes) */
export const SESSION_DURATION = 120 * 60 * 1000; // 7200 seconds

export interface SessionTime {
  loginAt: number;
  expiresAt: number;
  logoutAt?: number;
  duration?: number;
}

const timeKey = (role: Role) => `sessionTime_${role}`;

export const setSessionTime = (role: Role) => {
  if (!isBrowser()) return;
  const now = Date.now();
  localStorage.setItem(
    timeKey(role),
    JSON.stringify({
      loginAt: now,
      expiresAt: now + SESSION_DURATION,
    })
  );
};

export const getSessionTime = (role: Role): SessionTime | null => {
  if (!isBrowser()) return null;
  try {
    return JSON.parse(localStorage.getItem(timeKey(role)) || "null");
  } catch {
    return null;
  }
};

export const setLogoutTime = (role: Role) => {
  if (!isBrowser()) return;
  const data = getSessionTime(role);
  if (!data) return;
  const now = Date.now();
  localStorage.setItem(
    timeKey(role),
    JSON.stringify({
      ...data,
      logoutAt: now,
      duration: now - data.loginAt,
    })
  );
};

export const getTimeLeft = (role: Role): number => {
  const data = getSessionTime(role);
  if (!data) return 0;
  const left = data.expiresAt - Date.now();
  return left > 0 ? left : 0;
};

export const formatTimeLeft = (ms: number): string => {
  const totalSec = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return `${mm}m : ${ss}s`;
};

export const isSessionExpired = (role: Role): boolean => {
  const data = getSessionTime(role);
  if (!data) return true;
  return Date.now() > data.expiresAt;
};

export const clearSessionTime = (role: Role) => {
  if (!isBrowser()) return;
  localStorage.removeItem(timeKey(role));
};

/* ═══════════════════════════════════════════════════════════
   LOGOUT — सिर्फ उसी role का data हटाएगा
   ═══════════════════════════════════════════════════════════ */
export async function logout(role: Role = "user") {
  setLogoutTime(role);

  await fetch("/api/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  }).catch(() => {});

  /* ✅ सिर्फ इस role का data हटाओ — बाकी roles logged-in रहेंगे */
  clearAuthUser(role);
  clearSessionTime(role);

  if (isBrowser()) {
    /* legacy "authUser" key (अगर पुराना code use करता हो) */
    localStorage.removeItem("authUser");

    /* ✅ उसी role के login page पर भेजो */
    window.location.href = LOGIN_PATHS[role];
  }
}

/* ═══════════════════════════════════════════════════════════
   LOGOUT ALL — सभी roles को एक साथ logout (optional)
   ═══════════════════════════════════════════════════════════ */
export async function logoutAll() {
  const roles: Role[] = ["user", "admin", "report"];

  for (const role of roles) {
    setLogoutTime(role);
  }

  await fetch("/api/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role: "all" }),
  }).catch(() => {});

  for (const role of roles) {
    clearAuthUser(role);
    clearSessionTime(role);
  }

  if (isBrowser()) {
    localStorage.removeItem("authUser");
    window.location.href = LOGIN_PATH;
  }
}