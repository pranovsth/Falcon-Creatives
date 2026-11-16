"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AppProvider } from "./AppContext";
import { Footer } from "./Contact";
import Loader from "./Loader";
import Menu from "./Menu";
import SmoothScroll from "./SmoothScroll";

/** Everything shared by all pages: loader, menu, footer and scroll effects. */
export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <AppProvider>
      <Loader />
      <Menu />
      {children}
      <Footer />
      {/* Re-created on every route so scroll effects bind to the new page's elements */}
      <SmoothScroll key={pathname} />
    </AppProvider>
  );
}
