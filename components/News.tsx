"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { news } from "@/lib/content";
import { Reveal, Words } from "./Reveal";

export default function News() {
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const [limits, setLimits] = useState({ left: 0, right: 0 });
  const [dragging, setDragging] = useState(false);

  // "Drag" badge follows the pointer and springs back to its place in the design.
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const sx = useSpring(cx, { stiffness: 220, damping: 24, mass: 0.5 });
  const sy = useSpring(cy, { stiffness: 220, damping: 24, mass: 0.5 });

  useEffect(() => {
    const measure = () => {
      if (!stage.current || !track.current) return;
      const offset = parseFloat(getComputedStyle(track.current).marginLeft) || 0;
      setLimits({
        right: Math.max(0, -offset),
        left: Math.min(0, stage.current.clientWidth - (track.current.offsetWidth + offset)),
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const follow = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !stage.current || !cursor.current) return;
    const box = stage.current.getBoundingClientRect();
    const c = cursor.current;
    cx.set(e.clientX - box.left - (c.offsetLeft + c.offsetWidth / 2));
    cy.set(e.clientY - box.top - (c.offsetTop + c.offsetHeight / 2));
  };
  const release = () => {
    cx.set(0);
    cy.set(0);
  };

  return (
    <section className="news" id="news">
      <div className="news-stage" ref={stage} onPointerMove={follow} onPointerLeave={release}>
        <motion.div
          className="news-track"
          ref={track}
          drag="x"
          dragConstraints={limits}
          dragElastic={0.08}
          dragTransition={{ power: 0.25, timeConstant: 260 }}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
        >
          {news.map((item, i) => (
            <div className={`news-item news-${item.size}`} key={i}>
              <div className={"crop" in item && item.crop ? "pic-crop" : "pic-fit"}>
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 900px) 90vw, 55vw" draggable={false} />
              </div>
            </div>
          ))}
        </motion.div>

        <div className="news-overlay">
          <h2 className="news-title big-title" data-slide="2">
            <Words text="NEWS" />
          </h2>
          <Reveal className="news-more" y={20} delay={0.2}>
            <Link className="arrow-link" href="/portfolio">
              <span>More</span>
              <img src="/icons/arrow-more.svg" alt="" />
            </Link>
          </Reveal>
        </div>

        <motion.div
          className="drag-cursor"
          ref={cursor}
          style={{ x: sx, y: sy }}
          animate={{ scale: dragging ? 0.72 : 1 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        >
          Drag
        </motion.div>
      </div>
    </section>
  );
}
