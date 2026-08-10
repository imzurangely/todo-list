import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { tokenStorage } from "@/services/api.js";
import authService from "@/features/auth/services/authService.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const clearSession = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
  }, []);

  useEffect(() => {
    const restoreSession = async () => {
      if (!tokenStorage.get()) {
        setInitializing(false);
        return;
      }
      try {
        setUser(await authService.profile());
      } catch {
        clearSession();
      } finally {
        setInitializing(false);
      }
    };
    restoreSession();
  }, [clearSession]);

  useEffect(() => {
    window.addEventListener("auth:unauthorized", clearSession);
    return () => window.removeEventListener("auth:unauthorized", clearSession);
  }, [clearSession]);

  const applySession = useCallback(({ user: nextUser, token }) => {
    tokenStorage.set(token);
    setUser(nextUser);
  }, []);

  const value = useMemo(
    () => ({
      user,
      initializing,
      isAuthenticated: Boolean(user),
      login: async (credentials) => applySession(await authService.login(credentials)),
      register: async (payload) => applySession(await authService.register(payload)),
      logout: clearSession,
    }),
    [user, initializing, applySession, clearSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
