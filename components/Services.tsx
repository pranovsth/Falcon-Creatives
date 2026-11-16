"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { clients, services } from "@/lib/content";
import { EASE, Pic, Reveal, Words } from "./Reveal";

export function DarkBackdrop({ src }: { src: string }) {
  return (
    <div className="dark-bg" aria-hidden="true">
      <div className="dark-bg-img">
        <Image src={src} alt="" fill sizes="100vw" />
      </div>
      <div className="dark-bg-shade" />
      <div className="dark-bg-noise" />
    </div>
  );
}

export default function Services() {
  return (
    <section className="services" id="services">
      <DarkBackdrop src="/images/services-bg.jpg" />

      <h2 className="services-title">
        <Words text="Our | *Services*" />
      </h2>
      <Reveal className="services-sub" delay={0.2}>
        <p>Video, audio and everything in between — produced under one roof.</p>
      </Reveal>

      <div className="svc-list">
        {services.map((s, i) => (
          <article className={`svc svc-${i + 1}`} key={s.title}>
            <Pic className="svc-img" src={s.image} alt={s.alt} crop={s.crop} sizes="(max-width: 900px) 100vw, 20vw" />
            <Reveal delay={0.1 + i * 0.08} y={24}>
              <div className="svc-head">
                <span className="svc-line" />
                <h3>{s.title}</h3>
              </div>
              <p>{s.text}</p>
            </Reveal>
          </article>
        ))}
      </div>

      <p className="trusted">
        <Words text="Trusted by" />{" "}
        <span className="trusted-mark">
          <Words text="amazing clients" delay={0.12} />
          <img className="scribble" src="/icons/scribble.svg" alt="" />
        </span>{" "}
        <Words text="and brands since *2020*." delay={0.24} />
      </p>

      <ul className="clients">
        {clients.map((c, i) => (
          <motion.li
            key={c.name}
            className={c.cls}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
          >
            <img src={c.src} alt={c.name} loading="lazy" />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
