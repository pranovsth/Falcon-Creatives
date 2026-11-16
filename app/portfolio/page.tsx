import type { Metadata } from "next";
import { Newsletter, Proposal } from "@/components/Contact";
import News from "@/components/News";
import PageHead from "@/components/PageHead";
import PortfolioGrid from "@/components/PortfolioGrid";
import { Pic, Words } from "@/components/Reveal";

export const metadata: Metadata = { title: "Portfolio" };

// Mosaic tiles — class sets the position, float is the scroll drift in rem.
const mosaic = [
  { cls: "mo-c", src: "/images/service-1.jpg", alt: "Camera operator on set", float: 3 },
  { cls: "mo-d", src: "/images/testimonials-bg.jpg", alt: "Neon-lit street at night", float: -2 },
  { cls: "mo-i", src: "/images/news-2.jpg", alt: "On-camera monitor showing a band", float: 4 },
  { cls: "mo-e", src: "/images/studio-silhouette.jpg", alt: "Silhouette of a camera operator against a studio light", float: 0 },
  { cls: "mo-f", src: "/images/work-roofs.jpg", alt: "City rooftops from above", float: -3 },
  { cls: "mo-g", src: "/images/work-dune.jpg", alt: "Lone figure on a sand dune", float: 5 },
  { cls: "mo-h", src: "/images/news-1.jpg", alt: "Photo studio with softboxes", float: 2 },
  { cls: "mo-b", src: "/images/service-3.jpg", alt: "Band on a lit stage", float: -4 },
  { cls: "mo-a", src: "/images/service-2.jpg", alt: "Cinema camera filming a dancer", float: 3, crop: true },
];

export default function PortfolioPage() {
  return (
    <main className="page page-black">
      <PageHead className="phead-portfolio" kicker="Our" kickerBlue="Portfolio" title="Work that | speaks for | itself" />

      <PortfolioGrid />

      <section className="pf-more">
        <h2 className="mega-title">
          <Words text="Moments we were *proud* to capture" />
        </h2>
        <div className="mosaic">
          {mosaic.map((m) => (
            <Pic
              key={m.cls}
              className={m.cls}
              src={m.src}
              alt={m.alt}
              crop={m.crop}
              float={m.float || undefined}
              sizes="(max-width: 900px) 55vw, 40vw"
            />
          ))}
        </div>
      </section>

      <News />
      <Proposal />
      <Newsletter />
    </main>
  );
}
