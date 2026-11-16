"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { socials } from "@/lib/content";
import { useApp } from "./AppContext";
import { Pic, Reveal, Words } from "./Reveal";

type PageHeadProps = {
  /** Small two-line label, e.g. "Our" / "Services". Either line may be omitted. */
  kicker?: string;
  kickerBlue?: string;
  /** Giant headline; `|` forces a line break. */
  title: string;
  image?: { src: string; alt: string };
  /** Decorative play badge over the image (the design has no video behind it yet). */
  play?: boolean;
  className?: string;
  children?: ReactNode;
};

/** Shared top of the inner pages: blue menu rail, logo, label, headline, socials and wide photo. */
export default function PageHead({ kicker, kickerBlue, title, image, play, className, children }: PageHeadProps) {
  const { loaded, setMenuOpen } = useApp();
  return (
    <header className={`phead${image ? "" : " phead-plain"} ${className ?? ""}`} data-hero>
      <button type="button" className="hero-rail" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
        <img src="/icons/hamburger.svg" alt="" />
      </button>

      <Reveal className="phead-logo" active={loaded} delay={0.2} y={-20}>
        <Link href="/">
          <img src="/images/logo.svg" alt="Falcon Creatives — home" />
        </Link>
      </Reveal>

      <Reveal className="phead-kicker" active={loaded} delay={0.15} y={20}>
        <p>
          {kicker}
          {kicker && kickerBlue && <br />}
          {kickerBlue && <span className="blue">{kickerBlue}</span>}
        </p>
      </Reveal>

      <h1 className="phead-title">
        <Words text={title} active={loaded} delay={0.3} stagger={0.08} />
      </h1>

      <Reveal className="phead-socials hero-socials" active={loaded} delay={0.6} y={16}>
        <img src="/icons/social-white.svg" alt="" />
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} />
        ))}
      </Reveal>

      {image && (
        <div className="phead-media">
          <Pic src={image.src} alt={image.alt} sizes="100vw" parallax priority />
          {play && (
            <div className="play" aria-hidden="true">
              <img className="play-ring" src="/icons/play-circle.svg" alt="" />
              <img className="play-tri" src="/icons/play-tri.svg" alt="" />
            </div>
          )}
          {children}
        </div>
      )}
      {!image && children}
    </header>
  );
}
