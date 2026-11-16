"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { contact, socials } from "@/lib/content";
import { useApp } from "./AppContext";
import { Reveal, Words } from "./Reveal";

const MAP_URL = "https://www.google.com/maps/search/?api=1&query=Gyaneshwor%2C+Kathmandu";

export default function ContactTop() {
  const { loaded, setMenuOpen } = useApp();
  const [sent, setSent] = useState(false);

  // Demo-only submit: there is no backend yet, so we just confirm in the UI.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="ct" data-hero>
      <button type="button" className="hero-rail" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
        <img src="/icons/hamburger.svg" alt="" />
      </button>

      <Reveal className="ct-kicker" active={loaded} delay={0.15} y={20}>
        <p>
          Contact
          <br />
          <span className="blue">Us</span>
        </p>
      </Reveal>

      <h1 className="ct-title">
        <Words text="Get in touch" active={loaded} delay={0.3} />
      </h1>

      <Reveal className="ct-form-wrap" active={loaded} delay={0.5} y={30}>
        <form className="ct-form" onSubmit={onSubmit}>
          <input className="field" type="text" name="name" placeholder="My name is" aria-label="My name is" required />
          <input className="field" type="email" name="email" placeholder="You can email me at" aria-label="You can email me at" required />
          <span className="ct-select">
            <select className="field" name="reason" aria-label="I’d like to" defaultValue="" required>
              <option value="" disabled>
                I’d like to
              </option>
              <option>Request a quote</option>
              <option>Book the studio</option>
              <option>Start a podcast</option>
              <option>Collaborate as an artist</option>
              <option>Join the team</option>
              <option>Just say hello</option>
            </select>
            <img src="/icons/chevron-down.svg" alt="" />
          </span>
          <input className="field" type="tel" name="phone" placeholder="Ring me at (optional)" aria-label="Ring me at (optional)" />
          <textarea className="field ct-area" name="goal" placeholder="Tell us your goal!" aria-label="Tell us your goal" required />
          <div className="ct-send">
            <button className="btn" type="submit">
              <span>{sent ? "SENT" : "SEND"}</span>
              <img src="/icons/chevron.svg" alt="" />
            </button>
            <p className="form-note" role="status">
              {sent ? "Thank you — we’ll get back to you within one working day." : ""}
            </p>
          </div>
        </form>
      </Reveal>

      <div className="ct-side">
        <div className="ct-side-img">
          <Image
            src="/images/contact-side.jpg"
            alt="Camera operator filming a live performance"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 35vw"
          />
        </div>
        <div className="ct-socials hero-socials">
          <img src="/icons/social-contact.svg" alt="" />
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} />
          ))}
        </div>
      </div>

      <div className="ct-info">
        <Reveal y={24}>
          <div className="ct-city">
            <span className="ct-line" />
            <h2>Kathmandu</h2>
          </div>
          <p className="ct-lines">
            <a className="hover-line" href={`tel:${contact.phone}`}>
              {contact.phone}
            </a>
            <br />
            <a className="hover-line" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
        </Reveal>
        <a className="ct-map" href={MAP_URL} target="_blank" rel="noreferrer" aria-label="Open Gyaneshwor, Kathmandu in Google Maps">
          <Image src="/images/contact-map.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 52vw" />
          <img className="ct-pin" src="/icons/pin.svg" alt="" />
        </a>
      </div>

      <div className="ct-join">
        <p>
          <Words text="Love making things that move people? Come work with us." stagger={0.04} />
        </p>
        <a className="ct-join-link" href={`mailto:${contact.email}?subject=Joining%20the%20team`}>
          Join our Team
        </a>
      </div>
    </section>
  );
}
