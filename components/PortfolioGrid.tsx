"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, Pic } from "./Reveal";

// NOTE: project names and photos are the placeholders used in the design file.
// Swap in real client work before going live.
const projects = [
  { name: "Nike", tags: ["Video Production"], label: "Video Production, Branding", src: "/images/pf-nike.jpg", alt: "Red and white sneaker stepping forward" },
  { name: "Coca-Cola", tags: ["Video Production"], label: "Video Production, Branding", src: "/images/pf-coke.jpg", alt: "Row of red soda cans" },
  { name: "Starbucks", tags: ["Podcast"], label: "Podcast, Branding", src: "/images/pf-starbucks.jpg", alt: "Hand holding a takeaway coffee cup" },
  { name: "Google", tags: ["Podcast"], label: "Podcast, Branding", src: "/images/pf-google.jpg", alt: "Illuminated company sign on an office wall" },
  { name: "Tesla", tags: ["Music Mixing"], label: "Music Mixing, Sound Design", src: "/images/pf-tesla.jpg", alt: "Chrome car badge covered in water droplets" },
  { name: "Supreme", tags: ["Music Mixing"], label: "Music Mixing, Sound Design", src: "/images/pf-supreme.jpg", alt: "Red shop sign on a street corner" },
];

const filters = ["All", "Video Production", "Podcast", "Music Mixing"];

/** Filter bar plus the staggered two-column project grid. */
export default function PortfolioGrid() {
  const [filter, setFilter] = useState("All");
  const shown = projects.filter((p) => filter === "All" || p.tags.includes(filter));
  // As in the design: first project top-right, second lower-left, and so on.
  const right = shown.filter((_, i) => i % 2 === 0);
  const left = shown.filter((_, i) => i % 2 === 1);

  // The page height changes with the filter, so scroll-linked effects must re-measure.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => window.clearTimeout(id);
  }, [filter]);

  const column = (items: typeof projects, cls: string) => (
    <div className={`pf-col ${cls}`}>
      <AnimatePresence mode="popLayout" initial={false}>
      {items.map((p) => (
        <motion.article
          className="pf-item"
          key={p.name}
          layout="position"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Pic className="pf-img" src={p.src} alt={p.alt} sizes="(max-width: 900px) 100vw, 37vw" parallax />
          <h3>{p.name}</h3>
          <p>{p.label}</p>
        </motion.article>
      ))}
      </AnimatePresence>
    </div>
  );

  return (
    <section className="pf">
      <div className="pf-filter">
        <h2>Filter</h2>
        <div role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button key={f} type="button" className={f === filter ? "is-active" : ""} aria-pressed={f === filter} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="pf-cols">
        {column(left, "pf-left")}
        {column(right, "pf-right")}
      </div>
    </section>
  );
}
