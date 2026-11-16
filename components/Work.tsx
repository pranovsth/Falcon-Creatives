"use client";

import Link from "next/link";
import { Pic, Reveal, Words } from "./Reveal";

export default function Work() {
  return (
    <section className="work" id="work">
      <h2 className="work-title big-title" data-slide="3">
        <Words text="WORK" />
      </h2>

      <Pic
        className="w-car"
        src="/images/work-car.jpg"
        alt="Front of a vintage yellow coupe parked on a quiet street"
        sizes="(max-width: 900px) 100vw, 41vw"
        parallax
      />

      <div className="w-block w-b1">
        <h3>
          <Words text="Brand Films" />
        </h3>
        <Reveal delay={0.15}>
          <p>
            Cinematic stories for brands with something to say. We handle concept, shoot and edit, so every frame
            feels intentional and every second earns its place.
          </p>
        </Reveal>
      </div>

      <Pic
        className="w-alley"
        src="/images/work-alley.jpg"
        alt="Narrow old-town alley between tall ochre buildings"
        sizes="(max-width: 900px) 70vw, 28vw"
        parallax
      />

      <div className="w-block w-b2">
        <h3>
          <Words text="On Location" />
        </h3>
        <Reveal delay={0.15}>
          <p>
            From the alleys of Kathmandu to high mountain trails, our crew travels light and shoots anywhere —
            capturing real places, real people and the moments in between.
          </p>
        </Reveal>
      </div>

      <div className="collage">
        <Pic
          className="w-ice"
          src="/images/work-ice.jpg"
          alt="Climbers crossing a blue glacier cave"
          sizes="(max-width: 900px) 62vw, 45vw"
          parallax
        />
        <Pic
          className="w-dune"
          src="/images/work-dune.jpg"
          alt="Lone figure on the ridge of a sand dune"
          sizes="(max-width: 900px) 30vw, 21vw"
          float={5}
        />
        <Pic
          className="w-roofs"
          src="/images/work-roofs.jpg"
          alt="Dense city rooftops seen from above"
          sizes="(max-width: 900px) 34vw, 25vw"
          float={-4}
        />
      </div>

      <Reveal className="view-all" y={24}>
        <Link className="arrow-link" href="/portfolio">
          <span>View All</span>
          <img src="/icons/arrow-viewall.svg" alt="" />
        </Link>
      </Reveal>

      <blockquote className="quote">
        <Words text="“We don’t *simply* record moments, we craft stories worth sharing.”" stagger={0.04} />
      </blockquote>
    </section>
  );
}
