import type { Metadata } from "next";
import { Newsletter, Proposal } from "@/components/Contact";
import PageHead from "@/components/PageHead";
import { Pic, Reveal, Words } from "@/components/Reveal";

export const metadata: Metadata = { title: "Services" };

const offers = [
  {
    title: "Creative Direction",
    items: [
      "Concept development",
      "Pre-production",
      "Storyboarding",
      "Set & production design",
      "Costume design",
      "Wardrobe styling",
      "Makeup and hair",
    ],
    image: { src: "/images/service-2.jpg", alt: "Cinema camera filming a dancer in a neon-lit studio", crop: true },
  },
  {
    title: "Pre-Production",
    items: [
      "Casting & celebrity contracting",
      "Location scouting & permits",
      "Logistics & scheduling",
      "Staffing production crew",
      "Equipment rental",
      "Catering & craft services",
      "Insurance",
    ],
    image: { src: "/images/services-numbers.jpg", alt: "Printed schedule sheets with large numerals" },
  },
  {
    title: "During Filming",
    items: [
      "Multi-camera shoots",
      "Time-lapse video",
      "Green-screen & studio shots",
      "Live event coverage",
      "DIT service",
      "BTS production",
      "Remote shoot capability",
    ],
    image: { src: "/images/work-dune.jpg", alt: "Lone figure on the ridge of a sand dune" },
  },
  {
    title: "Post-Production",
    items: [
      "Composition & sound design",
      "Video encoding",
      "Color grading",
      "Soundtrack & scoring",
      "Voiceover recording",
      "Special sound effects",
    ],
    image: { src: "/images/service-1.jpg", alt: "Camera operator checking a shot on set" },
  },
];

const steps = [
  {
    title: "Questionnaire",
    text: "Every project starts with a short brief. We ask about your brand, your audience and what you want people to feel, so the whole crew is working from the same page before a single frame is shot.",
  },
  {
    title: "Goals",
    text: "Next we agree on what success looks like — more reach for a launch, a film that explains your product, a podcast people finish. Clear goals decide the format, the length and where the piece will live.",
  },
  {
    title: "Estimation",
    text: "With the brief and goals set, we scope the crew, gear, locations and days needed, and send a transparent quote and timeline. No hidden extras, and no promises we cannot keep.",
  },
  {
    title: "Concept",
    text: "Our creative team turns the brief into a treatment: script, storyboard, mood and music references. You see exactly where the piece is heading and can shape it before production begins.",
  },
  {
    title: "Production",
    text: "Shoot days and studio sessions run to a tight schedule, with one producer as your point of contact. You are welcome on set, and we share selects and rough mixes as we go.",
  },
  {
    title: "Delivery",
    text: "Editing, color, sound and mastering happen in-house. After two rounds of feedback we deliver final files in every format you need, ready for broadcast, streaming and social.",
  },
];

export default function ServicesPage() {
  return (
    <main className="page page-dark">
      <PageHead
        className="phead-services"
        kicker="Our"
        kickerBlue="Services"
        title="Every idea | deserves a | big screen"
        image={{ src: "/images/services-hero.jpg", alt: "Camera operator filming a band on stage" }}
        play
      />

      <section className="can-do">
        <h2 className="sec-title">
          <Words text="*What* we can do for you" />
        </h2>
        {offers.map((o, i) => (
          <div className={`cd-row${i % 2 ? " cd-flip" : ""}`} key={o.title}>
            <div className="cd-text">
              <h3>
                <Words text={o.title} />
              </h3>
              <Reveal delay={0.15} y={24}>
                <ul>
                  {o.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Pic
              className="cd-img"
              src={o.image.src}
              alt={o.image.alt}
              crop={o.image.crop}
              parallax={!o.image.crop}
              sizes="(max-width: 900px) 100vw, 34vw"
            />
          </div>
        ))}
      </section>

      <section className="approach">
        <h2 className="mega-title">
          <Words text="Our *Approach*" />
        </h2>
        <ol className="ap-grid">
          {steps.map((s, i) => (
            <li className="ap-card" key={s.title}>
              <span className="ap-num" aria-hidden="true">
                {i + 1}
              </span>
              <Reveal delay={(i % 3) * 0.1} y={30}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <Proposal />
      <Newsletter />
    </main>
  );
}
