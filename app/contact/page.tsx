import type { Metadata } from "next";
import ContactTop from "@/components/ContactTop";
import { Newsletter } from "@/components/Contact";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="page page-black">
      <ContactTop />
      <Newsletter />
    </main>
  );
}
