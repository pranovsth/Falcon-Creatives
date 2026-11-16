"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** When set, the animation is driven by this flag instead of scroll position. */
  active?: boolean;
};

/** Fade + rise on scroll into view. */
export function Reveal({ children, className, delay = 0, y = 36, active }: RevealProps) {
  const shown = { opacity: 1, y: 0 };
  const trigger =
    active === undefined
      ? { whileInView: shown, viewport: VIEWPORT }
      : { animate: active ? shown : { opacity: 0, y } };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...trigger}
    >
      {children}
    </motion.div>
  );
}

type WordsProps = {
  /** `*word*` renders in brand blue, `|` forces a line break. */
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  active?: boolean;
};

/** Word-by-word masked reveal for headings. */
export function Words({ text, className, delay = 0, stagger = 0.06, active }: WordsProps) {
  const tokens = text.split(/\s+/).filter(Boolean);
  const trigger =
    active === undefined
      ? { whileInView: "show", viewport: VIEWPORT }
      : { animate: active ? "show" : "hidden" };
  return (
    <motion.span
      className={`words ${className ?? ""}`}
      initial="hidden"
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...trigger}
    >
      {tokens.map((token, i) => {
        if (token === "|") return <br key={i} />;
        // "*2020*." -> blue "2020" followed by plain trailing punctuation
        const marked = token.match(/^\*(.+?)\*([^\w*]*)$/);
        return (
          <span key={i}>
            <span className="word-mask">
              <motion.span
                className="word"
                variants={{
                  hidden: { y: "115%" },
                  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
                }}
              >
                {marked ? (
                  <>
                    <span className="blue">{marked[1]}</span>
                    {marked[2]}
                  </>
                ) : (
                  token
                )}
              </motion.span>
            </span>{" "}
          </span>
        );
      })}
    </motion.span>
  );
}

type PicProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Inner image drifts inside its frame while scrolling. */
  parallax?: boolean;
  /** Reproduces the off-centre crop used for the camera/dancer shot in the design. */
  crop?: boolean;
  priority?: boolean;
  /** Whole frame drifts by this many rem while scrolling. */
  float?: number;
};

/** Image frame with a clip-path wipe on enter and optional parallax. */
export function Pic({ src, alt, className, sizes = "50vw", parallax, crop, priority, float }: PicProps) {
  return (
    <div className={`pic-wrap ${className ?? ""}`} data-float={float}>
      <motion.div
        className="pic"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <div className={parallax ? "pic-inner pic-parallax" : "pic-inner"} data-parallax={parallax ? "" : undefined}>
          <div className={crop ? "pic-crop" : "pic-fit"}>
            <Image src={src} alt={alt} fill sizes={sizes} priority={priority} draggable={false} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
