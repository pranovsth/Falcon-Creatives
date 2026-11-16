"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { useApp } from "./AppContext";
import { EASE } from "./Reveal";

/** White loading screen (the "Loading" frame in the design) with a counter, lifted away like a curtain. */
export default function Loader() {
  const { loaded, setLoaded } = useApp();
  const [count, setCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const controls = animate(0, 100, {
      duration: 1.8,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setLoaded(true),
    });
    return () => controls.stop();
  }, [setLoaded]);

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div className="loader" key="loader" exit={{ transition: { duration: 1.2 } }}>
          <motion.div
            className="loader-blue"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
          />
          <motion.div className="loader-white" exit={{ y: "-100%" }} transition={{ duration: 0.9, ease: EASE }}>
            <span className="loader-name">Falcon Creatives</span>
            <span className="loader-count">{count}</span>
            <span className="loader-line">
              <span style={{ transform: `scaleX(${count / 100})` }} />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
