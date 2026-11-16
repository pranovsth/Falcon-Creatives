"use client";

import { motion } from "framer-motion";
import { EASE, Pic } from "./Reveal";

export type CollageNote = {
  text: string;
  /** Centre of the handwritten note, in design px relative to the collage box. */
  x: number;
  y: number;
  rotate: number;
  /** Wrap width in design px (omit for a single line). */
  width?: number;
};

export type CollageArrow = { x: number; y: number; rotate: number; flip?: boolean };

type CollageProps = {
  /** Five photos, in the slot order: bottom-right, tall centre, top-left, mid-left, bottom-centre. */
  photos: { src: string; alt: string }[];
  notes: CollageNote[];
  arrows?: CollageArrow[];
};

const SLOTS = ["cg-a", "cg-b", "cg-c", "cg-d", "cg-e"];
const FLOAT = [3, 0, -3, 4, -5];

/** Overlapping photo collage with handwritten notes (About and Talent pages). Sized in em: 1em = 100 design px. */
export default function Collage({ photos, notes, arrows = [] }: CollageProps) {
  return (
    <div className="cg">
      {photos.map((p, i) => (
        <Pic
          key={p.src}
          className={SLOTS[i]}
          src={p.src}
          alt={p.alt}
          sizes="(max-width: 900px) 60vw, 47vw"
          parallax={i === 1}
          float={FLOAT[i] || undefined}
        />
      ))}

      {arrows.map((a, i) => (
        <img
          key={i}
          className="cg-arrow"
          src="/images/doodle-arrow.png"
          alt=""
          style={{
            left: `${a.x / 100}em`,
            top: `${a.y / 100}em`,
            transform: `translate(-50%, -50%) rotate(${a.rotate}deg)${a.flip ? " scaleY(-1)" : ""}`,
          }}
        />
      ))}

      {notes.map((n, i) => (
        <div
          key={n.text}
          className="cg-note"
          // The note's own font-size is 0.64em, so its offsets are divided by 64 rather than 100.
          style={{
            left: `${n.x / 64}em`,
            top: `${n.y / 64}em`,
            transform: `translate(-50%, -50%) rotate(${n.rotate}deg)`,
          }}
        >
          <motion.span
            style={n.width ? { width: `${n.width / 64}em`, whiteSpace: "normal" } : undefined}
            initial={{ opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }}
            whileInView={{ opacity: 1, clipPath: "inset(-20% -5% -20% -5%)" }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1.1, delay: 0.3 + i * 0.1, ease: EASE }}
          >
            {n.text}
          </motion.span>
        </div>
      ))}
    </div>
  );
}
