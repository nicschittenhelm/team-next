// src/sections/Team.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamCard from "../components/TeamCard";
import { teamMembers } from "../data/teamData";
import GsapMagnetic from "../components/GsapMagnetic";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-black py-16"
      ref={containerRef}
    >
      {/* Heading */}
      <div className="container mx-auto text-center mb-10 z-10 relative">
        <h2 className="text-5xl font-bold mb-3 text-white tracking-tight">
          Our Team
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Meet the talented developers and designers building the digital
          solutions of tomorrow. A diverse team of experts crafting innovative
          software with cutting-edge technologies.
        </p>
      </div>

      {/* Two-column layout container */}
      <div className="container mx-auto flex flex-col lg:flex-row">
        {/* Left side - Team grid */}
        <div className="w-full lg:w-1/2 px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <GsapMagnetic key={member.id}>
                <TeamCard key={member.id} member={member} />
              </GsapMagnetic>
            ))}
          </div>
        </div>

        {/* Right side - Empty space for future content */}
        <div className="w-full lg:w-1/2 px-4">
          {/* This space is intentionally left empty for future content */}
        </div>
      </div>

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[30rem] h-[30rem] bg-cyan-500/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
