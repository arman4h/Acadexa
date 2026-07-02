import type { AdminUser } from "../types";

const STORAGE_KEY = "acadexa_admin_session";

export function getStoredAdminUser(): AdminUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export function setStoredAdminUser(user: AdminUser | null) {
  if (typeof window === "undefined") return;
  if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else window.localStorage.removeItem(STORAGE_KEY);
}

export function getCurrentAdminRole() {
  return getStoredAdminUser()?.role ?? null;
}

export function getCurrentAdminUsername() {
  return getStoredAdminUser()?.username ?? "system";
}
