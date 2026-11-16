import type { Metadata } from "next";
import Link from "next/link";
import Collage from "@/components/Collage";
import { Newsletter } from "@/components/Contact";
import PageHead from "@/components/PageHead";
import { Reveal, Words } from "@/components/Reveal";

export const metadata: Metadata = { title: "Talent" };

// NOTE: the design used joke placeholder names on stock portraits. These are stand-in
// names — replace them (and the photos) with the studio's real roster.
const roster = [
  { src: "/images/talent-1.jpg", alt: "Portrait of a man in glasses and a green polo shirt" },
  { src: "/images/talent-2.jpg", alt: "Portrait of a man in a dark knitted jacket" },
  { src: "/images/talent-3.jpg", alt: "Portrait of a woman with short red hair by a lake" },
  { src: "/images/talent-4.jpg", alt: "Portrait of a smiling man in glasses" },
  { src: "/images/talent-5.jpg", alt: "Portrait of a woman in a flower garden" },
];

export default function TalentPage() {
  return (
    <main className="page page-black">
      <PageHead
        kickerBlue="Talent"
        title="Faces and | voices you | remember"
        image={{ src: "/images/talent-hero.jpg", alt: "Vocalist recording at a studio microphone" }}
      >
        <span className="phead-script">Our star artists</span>
        <img className="phead-underline" src="/icons/underline.svg" alt="" />
      </PageHead>

      <section className="roster">
        <h2 className="sec-title">
          <Words text="The voices and *faces* we work with" />
        </h2>

        <Collage
          photos={roster}
          notes={[
            { text: "Maya Gurung", x: 133, y: 628, rotate: -13.24 },
            { text: "Rohan Thapa", x: 1343, y: 594, rotate: 7.89 },
            { text: "Sagar KC", x: 221, y: 1475, rotate: -14.43 },
            { text: "David Rai", x: 1489, y: 1680, rotate: 4.84 },
            { text: "Anisha Lama", x: 566, y: 1877, rotate: 4.9 },
          ]}
          arrows={[
            { x: 67, y: 557, rotate: 12.25, flip: true },
            { x: 1582, y: 1640, rotate: 166.84 },
          ]}
        />

        <Reveal className="roster-all" y={24}>
          <Link className="arrow-link" href="/contact">
            <span>View All</span>
            <img src="/icons/arrow-viewall.svg" alt="" />
          </Link>
        </Reveal>
      </section>

      <Newsletter />
    </main>
  );
}
