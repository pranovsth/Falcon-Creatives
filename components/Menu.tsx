"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact, navLinks } from "@/lib/content";
import { usePathname, useRouter } from "next/navigation";
import { getLenis } from "@/lib/lenis";
import { useApp } from "./AppContext";
import { EASE } from "./Reveal";

/** Slide-out navigation (Component 1, "Group 16" state in the design) and the floating menu trigger. */
export default function Menu() {
  const { menuOpen, setMenuOpen } = useApp();
  const [pastHero, setPastHero] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      setPastHero(window.scrollY > (hero ? hero.offsetHeight * 0.7 : 600));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    if (href !== pathname) {
      router.push(href);
      return;
    }
    // Already on that page: let the scroll lock release, then go back to the top.
    window.setTimeout(() => {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 350);
  };

  return (
    <>
      {/* Desktop: appears once the hero rail has scrolled away. Mobile: always visible. */}
      <button
        type="button"
        className={`menu-fab${pastHero ? " is-visible" : ""}`}
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
      >
        <img src="/icons/hamburger.svg" alt="" />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu"
            key="menu"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1, transition: { duration: 0.8 } }}
          >
            <motion.div
              className="menu-backdrop"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.nav
              className="menu-panel"
              aria-label="Main"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <motion.button
                type="button"
                className="menu-close"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <img src="/icons/close.svg" alt="" />
              </motion.button>

              <a
                className="menu-logo"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  go("/");
                }}
              >
                <img src="/images/logo.svg" alt="Falcon Creatives" />
              </a>

              <ul className="menu-links">
                {navLinks.map((link, i) => (
                  <li key={link.label}>
                    <span className="word-mask">
                      <motion.a
                        href={link.href}
                        aria-current={link.href === pathname ? "page" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          go(link.href);
                        }}
                        initial={{ y: "115%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "115%", transition: { duration: 0.3 } }}
                        transition={{ duration: 0.8, delay: 0.25 + i * 0.07, ease: EASE }}
                      >
                        {link.label}
                      </motion.a>
                    </span>
                  </li>
                ))}
              </ul>

              <motion.address
                className="menu-contact"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
              >
                <strong>{contact.address}</strong>
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <span>{contact.hours}</span>
              </motion.address>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
