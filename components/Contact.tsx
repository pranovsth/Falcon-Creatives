"use client";

import { useState, type FormEvent } from "react";
import { contact, socials } from "@/lib/content";
import Link from "next/link";
import { Reveal, Words } from "./Reveal";

/** Demo-only submit: there is no backend yet, so we just confirm in the UI. */
function useFakeSubmit() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  };
  return { sent, onSubmit };
}

export function Proposal() {
  const { sent, onSubmit } = useFakeSubmit();
  return (
    <section className="proposal" id="contact">
      <span className="proposal-bar" aria-hidden="true" />
      <h2 className="proposal-title">
        <Words text="Request a *proposal*" />
      </h2>
      <form className="proposal-form" onSubmit={onSubmit}>
        <Reveal y={24}>
          <input className="field" type="email" name="email" placeholder="Your E-mail" aria-label="Your e-mail" required />
        </Reveal>
        <Reveal y={24} delay={0.08}>
          <input className="field" type="text" name="name" placeholder="Your name" aria-label="Your name" required />
        </Reveal>
        <Reveal y={24} delay={0.16}>
          <textarea className="field field-area" name="goal" placeholder="Tell us your goal!" aria-label="Tell us your goal" required />
        </Reveal>
        <Reveal y={24} delay={0.24} className="proposal-send">
          <button className="btn" type="submit">
            <span>{sent ? "SENT" : "SEND"}</span>
            <img src="/icons/chevron.svg" alt="" />
          </button>
        </Reveal>
        <p className="form-note" role="status">
          {sent ? "Thank you — we’ll get back to you within one working day." : ""}
        </p>
      </form>
    </section>
  );
}

export function Newsletter() {
  const { sent, onSubmit } = useFakeSubmit();
  return (
    <section className="newsletter">
      <Reveal className="newsletter-eyebrow" y={16}>
        <p>NEWSLETTER</p>
      </Reveal>
      <h2 className="newsletter-title">
        <Words text="Subscribe to get | the latest updates" />
      </h2>
      <Reveal className="newsletter-form-wrap" delay={0.2} y={24}>
        <form className="newsletter-form" onSubmit={onSubmit}>
          <input type="email" name="email" placeholder="Email Address" aria-label="Email address" required />
          <button className="btn" type="submit">
            <span>{sent ? "SUBSCRIBED" : "SUBSCRIBE"}</span>
            <img src="/icons/chevron.svg" alt="" />
          </button>
        </form>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <Link className="footer-logo" href="/">
        <img src="/images/logo.svg" alt="Falcon Creatives" />
      </Link>

      <div className="footer-socials">
        <img src="/icons/social-light.svg" alt="" />
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} />
        ))}
      </div>

      <Reveal className="footer-col footer-email">
        <h3>E-MAIL</h3>
        <a className="hover-line" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
      </Reveal>
      <Reveal className="footer-col footer-phone" delay={0.1}>
        <h3>TELEPHONE</h3>
        <a className="hover-line" href={`tel:${contact.phoneIntl.replace(/\s/g, "")}`}>
          {contact.phoneIntl}
        </a>
      </Reveal>

      <nav className="footer-links" aria-label="Footer">
        <a className="hover-line f-privacy" href="#">
          Privacy Policy
        </a>
        <a className="hover-line f-terms" href="#">
          Terms &amp; Condition
        </a>
        <Link className="hover-line f-about" href="/about">
          Get to know us
        </Link>
      </nav>

      <p className="footer-copy">©{new Date().getFullYear()} Falcon Creatives</p>
    </footer>
  );
}
