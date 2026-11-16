"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type AppState = {
  loaded: boolean;
  setLoaded: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const value = useMemo(() => ({ loaded, setLoaded, menuOpen, setMenuOpen }), [loaded, menuOpen]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
