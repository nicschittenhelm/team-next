"use client";

import { useEffect } from "react";
import Hero, { sectionMeta as heroMeta } from "./sections/Hero";
import Vision, { sectionMeta as visionMeta } from "./sections/Vision";
import Team, { sectionMeta as teamMeta } from "./sections/Team";
import Projects, { sectionMeta as projectsMeta } from "./sections/Projects";
import Contact, { sectionMeta as contactMeta } from "./sections/Contact";
import ScrollProgressIndicator from "./components/ScrollProgressIndicator";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sectionComponents = [
  { Component: Hero, meta: heroMeta },
  { Component: Vision, meta: visionMeta },
  { Component: Team, meta: teamMeta },
  { Component: Projects, meta: projectsMeta },
  { Component: Contact, meta: contactMeta },
];

export default function Home() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: false,
      // You can add more options here if needed
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's raf to GSAP's ticker
    function gsapLenisUpdate(time: number) {
      lenis.raf(time * 1000); // GSAP time is in seconds, Lenis expects ms
    }
    gsap.ticker.add(gsapLenisUpdate);
    gsap.ticker.lagSmoothing(0);

    // Clean up on unmount
    return () => {
      gsap.ticker.remove(gsapLenisUpdate);
      lenis.destroy();
    };
  }, []);
  // Define sections for the progress indicator
  const sections = sectionComponents.map(({ meta }) => ({
    id: meta.id,
    name: meta.title,
  }));

  return (
    <main className="w-full bg-black text-white">
      <div className="relative">
        {/* Scroll Progress Indicator */}
        <ScrollProgressIndicator sections={sections} />
        {/* Render sections dynamically */}
        {sectionComponents.map(({ Component, meta }) => (
          <section id={meta.id} key={meta.id}>
            <Component />
          </section>
        ))}
      </div>
    </main>
  );
}
