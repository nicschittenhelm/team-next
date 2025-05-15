"use client";

import { useEffect } from "react";
import Hero from "./sections/Hero";
import Team from "./sections/Team";

export default function Home() {
  useEffect(() => {
    // Apply smooth scrolling to the document
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <main className="w-full bg-black text-white">
      <div className="relative">
        <Hero />
        <Team />
      </div>
    </main>
  );
}
