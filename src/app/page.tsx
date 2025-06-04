"use client";

import { useEffect } from "react";
import Hero, { sectionMeta as heroMeta } from "./sections/Hero";
import Vision, { sectionMeta as visionMeta } from "./sections/Vision";
import Team, { sectionMeta as teamMeta } from "./sections/Team";
import Projects, { sectionMeta as projectsMeta } from "./sections/Projects";
import Contact, { sectionMeta as contactMeta } from "./sections/Contact";
import ScrollProgressIndicator from "./components/ScrollProgressIndicator";

const sectionComponents = [
  { Component: Hero, meta: heroMeta },
  { Component: Vision, meta: visionMeta },
  { Component: Team, meta: teamMeta },
  { Component: Projects, meta: projectsMeta },
  { Component: Contact, meta: contactMeta },
];

export default function Home() {
  useEffect(() => {
    // Apply smooth scrolling to the document
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "";
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
