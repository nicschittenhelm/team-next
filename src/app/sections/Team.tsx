// src/sections/Team.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamCard from "../components/TeamCard";
import { teamMembers } from "../data/teamData";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  const teamRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Set up mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth - 0.5) * 2, // -1 to 1
        y: (event.clientY / window.innerHeight - 0.5) * 2, // -1 to 1
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Initialize animations
  useEffect(() => {
    // Skip if not in browser environment
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Initial animation for each team member
      teamRefs.current.forEach((elem, index) => {
        if (!elem) return;

        // Set initial properties
        gsap.set(elem, {
          opacity: 0,
          y: 20,
          scale: 0.95,
        });

        // Animate in
        gsap.to(elem, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
        });
      });
    }, containerRef);

    return () => ctx.revert(); // Clean up all GSAP animations
  }, []);

  // Mouse following effect - enhanced with extreme movement for dramatic effect
  useEffect(() => {
    teamRefs.current.forEach((elem) => {
      if (!elem) return;

      // Get the element's current position in the viewport
      const rect = elem.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      // Calculate distance between mouse and card center
      const mouseX =
        (mousePosition.x * window.innerWidth) / 2 + window.innerWidth / 2;
      const mouseY =
        (mousePosition.y * window.innerHeight) / 2 + window.innerHeight / 2;
      const deltaX = mouseX - cardCenterX;
      const deltaY = mouseY - cardCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Normalize distance (closer = higher value)
      // Increase the effect range to 1000px for a wider area of influence
      const maxDistance = 1000;
      // More aggressive proximity calculation
      const proximity = Math.max(
        0,
        1 - Math.min(distance, maxDistance) / maxDistance
      );
      // Apply additional power curve to make closer cards move even more dramatically
      const powerProximity = Math.pow(proximity, 1.2);

      // Super enhanced movement factors - dramatically increased for extreme effect
      const moveX = deltaX * 0.25 * powerProximity; // Further increased from 0.12
      const moveY = deltaY * 0.25 * powerProximity; // Further increased from 0.12

      // Apply enhanced effects with more dramatic movement, tilt and scale
      gsap.to(elem, {
        x: moveX,
        y: moveY,
        rotationY: -deltaX * 0.06 * proximity, // Increased tilt effect
        rotationX: deltaY * 0.06 * proximity, // Increased tilt effect
        scale: 1 + 0.12 * proximity, // Increased scale effect
        duration: 0.4, // Even faster response time for snappier feel
        ease: "power1.out", // Changed ease to make it feel more immediate
        overwrite: "auto",
      });
    });
  }, [mousePosition]);

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
            {teamMembers.map((member, index) => (
              <TeamCard
                key={member.id}
                member={member}
                ref={(el) => {
                  teamRefs.current[index] = el;
                }}
              />
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
