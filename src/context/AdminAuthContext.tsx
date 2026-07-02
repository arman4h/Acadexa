import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AdminRole, AdminUser } from "../types";
import { loginAdmin } from "../services/adminService";
import { getStoredAdminUser, setStoredAdminUser } from "../lib/adminSession";

interface AdminAuthContextValue {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(() => getStoredAdminUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStoredAdminUser(user);
  }, [user]);

  async function login(username: string, password: string) {
    setLoading(true);
    try {
      const foundUser = await loginAdmin(username.trim(), password);
      if (!foundUser) {
        return { success: false, message: "Incorrect username or password." };
      }
      if (foundUser.is_active === false) {
        return { success: false, message: "This admin account is inactive." };
      }

      setUser(foundUser);
      setStoredAdminUser(foundUser);
      return { success: true };
    } catch (error) {
      return { success: false, message: error instanceof Error ? error.message : "Login failed." };
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setUser(null);
    setStoredAdminUser(null);
  }

  async function refreshSession() {
    setStoredAdminUser(user);
  }

  const value = useMemo<AdminAuthContextValue>(() => ({
    user,
    isAuthenticated: !!user,
    isSuperAdmin: user?.role === "super_admin",
    isAdmin: user?.role === "admin" || user?.role === "super_admin",
    loading,
    login,
    logout,
    refreshSession,
  }), [user, loading]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}

export type { AdminRole };
