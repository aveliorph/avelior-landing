import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { FinalCta } from "@/components/landing/FinalCta";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LiveDemo } from "@/components/landing/LiveDemo";
import { Nav } from "@/components/landing/Nav";
import { PaymentsSetup } from "@/components/landing/PaymentsSetup";
import { PhoneCheck } from "@/components/landing/PhoneCheck";
import { TheCard } from "@/components/landing/TheCard";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AVELIOR — Your Identity. One Tap." },
      {
        name: "description",
        content:
          "AVELIOR NFC card in black or white. Tap any phone to share your links, socials, contact, and GCash, Maya or bank QR.",
      },
      { property: "og:title", content: "AVELIOR — Your Identity. One Tap." },
      {
        property: "og:description",
        content: "Tap your AVELIOR card to share your profile, contact, and payment QRs in one place. No app needed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add("lp-js");
    document.documentElement.style.scrollBehavior = "smooth";
    const els = document.querySelectorAll(".lp-reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  useReveal();
  return (
    <div className="lp">
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <LiveDemo />
        <Features />
        <PaymentsSetup />
        <TheCard />
        <PhoneCheck />
        <FinalCta />
      </main>
    </div>
  );
}
