import { Newsletter, Proposal } from "@/components/Contact";
import Hero from "@/components/Hero";
import News from "@/components/News";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Work from "@/components/Work";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Work />
      <Testimonials />
      <News />
      <Proposal />
      <Newsletter />
    </main>
  );
}
