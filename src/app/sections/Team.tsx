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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Calculate initial positions - improved with wider spacing to prevent overlap
  const getInitialPosition = (index: number) => {
    // Create a more distributed pattern across the screen with increased spacing
    const patterns = [
      { x: -110, y: -70 }, // Top left - moved further out
      { x: 0, y: -80 }, // Top center - moved higher
      { x: 110, y: -70 }, // Top right - moved further out
      { x: -110, y: 70 }, // Bottom left - moved further out
      { x: 0, y: 80 }, // Bottom center - moved lower
      { x: 110, y: 70 }, // Bottom right - moved further out
    ];

    return patterns[index % patterns.length];
  };

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

        const position = getInitialPosition(index);

        // Set initial position and properties
        gsap.set(elem, {
          x: `${position.x}%`,
          y: `${position.y}%`,
          opacity: 0,
          scale: 0.8,
          rotation: gsap.utils.random(-3, 3),
          transformOrigin: "center center",
        });

        // Animate in
        gsap.to(elem, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: index * 0.15,
          ease: "power3.out",
        });
      }); // Create scroll-based parallax effect - gentle vertical movement
      // Removed scroll-based animation so cards only move based on mouse input
    }, containerRef);

    return () => ctx.revert(); // Clean up all GSAP animations
  }, []); // Mouse following effect - proximity-based cursor tracking
  useEffect(() => {
    teamRefs.current.forEach((elem, index) => {
      if (!elem) return;

      // Get the element's current position in the viewport
      const rect = elem.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      // Calculate distance between mouse and card center (normalized 0-1)
      const mouseX =
        (mousePosition.x * window.innerWidth) / 2 + window.innerWidth / 2;
      const mouseY =
        (mousePosition.y * window.innerHeight) / 2 + window.innerHeight / 2; // Calculate distance between mouse and card
      const deltaX = mouseX - cardCenterX;
      const deltaY = mouseY - cardCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Normalize distance (closer = higher value)
      // Max distance considered is 800px, beyond that minimal effect
      const proximity = Math.max(0, 1 - distance / 800);

      // Base movement factor
      const baseFactor = 0.55 + (index % 3) * 0.05;

      // Position from layout grid
      const position = getInitialPosition(index);

      // Move TOWARD the mouse (magnet effect) - directly use the delta values
      gsap.to(elem, {
        x: `${position.x + deltaX * 0.04 * proximity * baseFactor}%`,
        y: `${position.y + deltaY * 0.04 * proximity * baseFactor}%`,
        // Tilt effect intensifies with proximity
        rotationY: -deltaX * 0.02 * proximity,
        rotationX: deltaY * 0.02 * proximity,
        duration: 1.2, // Responsive feel
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [mousePosition]);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-black py-16"
      ref={containerRef}
    >
      {/* Heading */}{" "}
      <div className="container mx-auto text-center mb-10 z-10 relative">
        <h2 className="text-5xl font-bold mb-3 text-white tracking-tight">
          Our Team
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Meet the talented developers and designers building the digital
          solutions of tomorrow. A diverse team of experts crafting innovative
          software with cutting-edge technologies.
        </p>
      </div>{" "}
      {/* Team container - improved positioning */}
      <div className="relative w-full h-[80vh] md:h-[85vh] flex items-center justify-center px-4 pb-10">
        {/* Enhanced background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[30rem] h-[30rem] bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl"></div>

        {/* Team members */}
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
    </section>
  );
}
