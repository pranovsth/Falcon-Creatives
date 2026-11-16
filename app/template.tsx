"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/components/Reveal";

/** Runs on every navigation: a blue curtain lifts off the incoming page. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        className="page-wipe"
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      {children}
    </>
  );
}
