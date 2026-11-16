import type { Metadata, Viewport } from "next";
import { Inter, Kristi, Outfit } from "next/font/google";
import Shell from "@/components/Shell";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./inner.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-inter", display: "swap" });
const kristi = Kristi({ subsets: ["latin"], weight: "400", variable: "--font-kristi", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Falcon Creatives — Video, Podcast & Music Production in Kathmandu",
    template: "%s — Falcon Creatives",
  },
  description:
    "Falcon Creatives is a Kathmandu-based production house crafting brand films, podcasts and music that make your story impossible to ignore.",
};

export const viewport: Viewport = {
  themeColor: "#0d8bd8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${kristi.variable}`}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
