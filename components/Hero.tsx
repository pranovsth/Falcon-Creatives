"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { socials } from "@/lib/content";
import { scrollToTarget } from "@/lib/lenis";
import { useApp } from "./AppContext";
import { EASE, Reveal, Words } from "./Reveal";

const TAGLINE = ["Sound", "Vision", "Story"];

export default function Hero() {
  const { loaded, setMenuOpen } = useApp();

  const jump = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget(target);
  };

  return (
    <section className="hero" id="home" data-hero>
      <div className="hero-media">
        <motion.div
          className="hero-media-zoom"
          initial={{ scale: 1.18 }}
          animate={loaded ? { scale: 1 } : { scale: 1.18 }}
          transition={{ duration: 2, ease: EASE }}
        >
          <div className="hero-media-inner">
            <Image
              src="/images/hero.png"
              alt="Film crew lighting a singer at a microphone in a blue-lit studio"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 66vw"
            />
          </div>
        </motion.div>
      </div>

      <button type="button" className="hero-rail" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
        <img src="/icons/hamburger.svg" alt="" />
      </button>

      <Reveal className="hero-logo" active={loaded} delay={0.2} y={-24}>
        <Link href="/">
          <img src="/images/logo.svg" alt="Falcon Creatives" />
        </Link>
      </Reveal>

      <div className="hero-copy">
        <h1>
          <Words text="We turn bold ideas into moving stories" active={loaded} delay={0.35} />
        </h1>
        <Reveal className="hero-text" active={loaded} delay={0.7} y={24}>
          <p>
            Falcon Creatives is a Kathmandu-based production house for video, podcasts and music. From the first
            spark of an idea to the final cut, we craft work that makes your brand impossible to ignore.
          </p>
        </Reveal>
        <Reveal className="hero-cta" active={loaded} delay={0.9} y={24}>
          <Link className="line-link" href="/portfolio">
            View Work
          </Link>
        </Reveal>
      </div>

      <div className="hero-panel">
        <Reveal className="hero-socials" active={loaded} delay={0.5} y={-16}>
          <img src="/icons/social-dark.svg" alt="" />
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} />
          ))}
        </Reveal>

        <p className="hero-tagline" aria-label={TAGLINE.join(", ")}>
          {TAGLINE.map((word, i) => (
            <span className="word-mask" key={word} aria-hidden="true">
              <motion.span
                className="word"
                initial={{ y: "110%" }}
                animate={loaded ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 1.1, delay: 0.45 + i * 0.12, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
      </div>

      <motion.a
        className="hero-scroll"
        href="#services"
        aria-label="Scroll to services"
        onClick={jump("#services")}
        initial={{ opacity: 0, y: -40 }}
        animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
        transition={{ duration: 1, delay: 0.9, ease: EASE }}
      >
        <img src="/icons/scroll-arrow.svg" alt="" />
      </motion.a>
    </section>
  );
}
