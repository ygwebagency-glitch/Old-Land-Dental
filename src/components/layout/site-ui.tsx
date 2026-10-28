import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type SiteUI = {
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
};

const Ctx = createContext<SiteUI | null>(null);

export function SiteUIProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const value = useMemo(
    () => ({ searchOpen, setSearchOpen, drawerOpen, setDrawerOpen, menuOpen, setMenuOpen }),
    [searchOpen, drawerOpen, menuOpen],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSiteUI() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSiteUI must be used inside SiteUIProvider");
  return v;
}
