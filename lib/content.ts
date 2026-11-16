export const contact = {
  email: "falcontechnepal@gmail.com",
  phone: "9818721069",
  phoneIntl: "+977 9818721069",
  address: "Gyaneshwor, kathmandu",
  hours: "Sun-Fri (10 AM - 6 PM)",
};

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "Twitter", href: "https://twitter.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
  { label: "Talent", href: "/talent" },
];

export const services = [
  {
    title: "Video Production",
    text: "Commercials, brand films and music videos, shot and edited in-house.",
    image: "/images/service-1.jpg",
    alt: "Camera operator filming on set",
  },
  {
    title: "Podcast Studio",
    text: "Record, mix and publish your show from our fully equipped studio.",
    image: "/images/service-2.jpg",
    alt: "Cinema camera recording a performer in a neon-lit studio",
    crop: true,
  },
  {
    title: "Music Mixing",
    text: "Mixing and mastering that gives every track a polished, radio-ready sound.",
    image: "/images/service-3.jpg",
    alt: "Band performing a live session on a lit stage",
  },
];

export const clients = [
  { name: "Perfumery", src: "/images/client-perfumery.svg", cls: "c-perfumery" },
  { name: "Omniphonics", src: "/images/client-omniphonics.svg", cls: "c-omni" },
  { name: "Kush Technologies", src: "/images/client-kush.svg", cls: "c-kush" },
  { name: "Nepal Vision Treks & Expeditions", src: "/images/client-nepalvision.svg", cls: "c-nepal" },
];

export const testimonials = [
  "Absolutely stunning work",
  "They nailed our vision",
  "Professional from day one",
  "We'd book them again",
];

export const news = [
  { src: "/images/news-1.jpg", alt: "Studio set with lighting rig", size: "lg" },
  { src: "/images/service-2.jpg", alt: "Camera filming a dancer", size: "sm", crop: true },
  { src: "/images/news-2.jpg", alt: "On-camera monitor showing a band recording", size: "lg2" },
  { src: "/images/work-roofs.jpg", alt: "City rooftops from above", size: "sm2" },
  { src: "/images/service-3.jpg", alt: "Live session on a lit stage", size: "lg2" },
  { src: "/images/service-1.jpg", alt: "Camera operator on set", size: "sm" },
  { src: "/images/work-dune.jpg", alt: "Lone figure on a desert dune", size: "sm2" },
] as const;
