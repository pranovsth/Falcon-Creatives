import type { Metadata } from "next";
import Collage from "@/components/Collage";
import { Newsletter, Proposal } from "@/components/Contact";
import PageHead from "@/components/PageHead";
import { Reveal, Words } from "@/components/Reveal";

export const metadata: Metadata = { title: "About" };

const team = [
  {
    name: "Kartavya Basnet",
    role: "CEO",
    avatar: "/images/avatar-kartavya.png",
    text: "Leads the studio and keeps every project on course, from the first client call to the final delivery. Kartavya makes sure the big picture and the small details stay in the same frame.",
  },
  {
    name: "Pranov Shrestha",
    role: "UI/UX Designer",
    avatar: "/images/avatar-pranov.png",
    text: "Shapes how Falcon Creatives looks and feels on every screen. Pranov designs the visual identity, titles and digital experiences that carry our films and shows to their audience.",
  },
  {
    name: "Prashant Shrestha",
    role: "Business Dev",
    avatar: "/images/avatar-prashant.png",
    text: "Connects brands and artists with the right team and the right idea. Prashant builds the partnerships behind our projects and makes working with us simple from day one.",
  },
];

export default function AboutPage() {
  return (
    <main className="page page-dark">
      <PageHead
        kicker="About"
        kickerBlue="Us"
        title="Built by | people who | love film"
        image={{ src: "/images/news-1.jpg", alt: "Photo studio set with softboxes and a white backdrop" }}
        play
      />

      <section className="story">
        <h2 className="sec-title">
          <Words text="Made in Kathmandu, *seen* everywhere" />
        </h2>
        <Reveal className="story-text" delay={0.15}>
          <p>
            Falcon Creatives began in 2020 as a small crew with one camera and a lot of ideas. Today we are a full
            production house in Gyaneshwor, making brand films, podcasts and music for clients across Nepal and beyond.
            We stay deliberately small, so the people you meet on day one are the people who shoot, edit and mix your
            project — and who care about getting every frame and every note right.
          </p>
        </Reveal>

        <Collage
          photos={[
            { src: "/images/studio-silhouette.jpg", alt: "Silhouette of a camera operator against a studio light" },
            { src: "/images/work-roofs.jpg", alt: "Dense city rooftops seen from above" },
            { src: "/images/news-1.jpg", alt: "Photo studio set with softboxes" },
            { src: "/images/testimonials-bg.jpg", alt: "Neon-lit street at night" },
            { src: "/images/news-2.jpg", alt: "On-camera monitor showing a band recording" },
          ]}
          notes={[
            { text: "Where every shoot begins", x: 380, y: 570, rotate: -13.24 },
            { text: "The city that keeps us inspired", x: 1354, y: 843, rotate: 7.89, width: 487 },
            { text: "Late nights, bright ideas", x: 756, y: 1801, rotate: -4.12 },
          ]}
          arrows={[{ x: 67, y: 557, rotate: 12.25, flip: true }]}
        />
      </section>

      <section className="team">
        <h2 className="mega-title">
          <Words text="The people behind *every* frame" />
        </h2>
        <ul className="team-list">
          {team.map((m, i) => (
            <li className={`team-card team-${i + 1}`} key={m.name}>
              <Reveal delay={i * 0.1} y={40}>
                <img className="team-avatar" src={m.avatar} alt="" loading="lazy" />
                <h3>{m.name}</h3>
                <span className="team-role">{m.role}</span>
                <p>{m.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <Proposal />
      <Newsletter />
    </main>
  );
}
