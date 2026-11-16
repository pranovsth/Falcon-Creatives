"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis, setLenis } from "@/lib/lenis";
import { useApp } from "./AppContext";

gsap.registerPlugin(ScrollTrigger);
// Not every page has every animated element (ribbons, scribble, ...), so missing targets are expected.
gsap.config({ nullTargetWarn: false });

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Lenis smooth scrolling wired to GSAP ScrollTrigger, plus all scroll-linked effects. */
export default function SmoothScroll() {
  const { loaded, menuOpen } = useApp();

  // Smooth scrolling
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Lock scrolling behind the loader and the open menu
  useEffect(() => {
    const lock = !loaded || menuOpen;
    const lenis = getLenis();
    if (lenis) {
      if (lock) lenis.stop();
      else lenis.start();
    }
    document.documentElement.classList.toggle("is-locked", lock);
  }, [loaded, menuOpen]);

  // Scroll-linked effects
  useEffect(() => {
    if (reducedMotion()) return;
    const rem = () => parseFloat(getComputedStyle(document.documentElement).fontSize);

    const ctx = gsap.context(() => {
      // Inner image parallax
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      // Whole-frame drift for layered collage pieces
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el) => {
        const amount = Number(el.dataset.float) || 0;
        gsap.fromTo(
          el,
          { y: () => amount * rem() },
          {
            y: () => -amount * rem(),
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Hero image drifts as the hero leaves
      gsap.to(".hero-media-inner", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      // Dark section backdrops
      gsap.utils.toArray<HTMLElement>(".dark-bg-img").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      // Giant titles slide with the scroll
      gsap.utils.toArray<HTMLElement>("[data-slide]").forEach((el) => {
        const amount = Number(el.dataset.slide) || 4;
        gsap.fromTo(
          el,
          { xPercent: -amount },
          {
            xPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          }
        );
      });

      // Hand-drawn scribble wipes in
      gsap.fromTo(
        ".scribble",
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".trusted", start: "top 75%" },
        }
      );

      // Proposal marker grows
      gsap.fromTo(
        ".proposal-bar",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".proposal", start: "top 85%", end: "top 35%", scrub: true },
        }
      );

      // Testimonial ribbons: endless marquee that speeds up with the scroll
      const tracks = gsap.utils.toArray<HTMLElement>(".band-track");
      const loops = tracks.map((track, i) => {
        const forward = i % 2 === 0;
        return gsap.fromTo(
          track,
          { xPercent: forward ? 0 : -50 },
          { xPercent: forward ? -50 : 0, duration: 26 + i * 4, ease: "none", repeat: -1 }
        );
      });
      let settle: gsap.core.Tween | undefined;
      ScrollTrigger.create({
        trigger: ".reviews",
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = Math.min(5, Math.abs(self.getVelocity()) / 400);
          settle?.kill();
          loops.forEach((loop) => loop.timeScale(1 + boost));
          settle = gsap.to(loops, { timeScale: 1, duration: 1, ease: "power2.out" });
        },
        onToggle: (self) => loops.forEach((loop) => (self.isActive ? loop.play() : loop.pause())),
      });

      gsap.from(".band", {
        yPercent: 140,
        rotation: 0,
        opacity: 0,
        duration: 1.3,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".bands", start: "top 78%" },
      });

      // Scroll progress rail
      gsap.fromTo(
        ".progress-bar",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } }
      );
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div className="progress" aria-hidden="true">
      <div className="progress-bar" />
    </div>
  );
}
