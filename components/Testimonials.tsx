"use client";

import { testimonials } from "@/lib/content";
import { Words } from "./Reveal";
import { DarkBackdrop } from "./Services";

function Ribbon({ text, index }: { text: string; index: number }) {
  // The phrase is repeated twice over so the track can loop seamlessly at -50%.
  const half = Array.from({ length: 3 }, (_, i) => (
    <span className="band-item" key={i}>
      {text}
      <i aria-hidden="true">•</i>
    </span>
  ));
  return (
    <div className={`band band-${index + 1}`}>
      <div className="band-track">
        <div className="band-half">{half}</div>
        <div className="band-half" aria-hidden="true">
          {half}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="reviews" id="reviews">
      <DarkBackdrop src="/images/testimonials-bg.jpg" />

      <h2 className="reviews-title">
        <Words text="Reviews/ *Testimonial*" />
      </h2>

      <div className="bands">
        {testimonials.map((t, i) => (
          <Ribbon text={t} index={i} key={t} />
        ))}
        <div className="band band-5">
          <span className="band-shout">BABAAL!!</span>
        </div>
      </div>

      <p className="reviews-end">
        <Words text="But don’t take our *word* for it." />
      </p>
    </section>
  );
}
