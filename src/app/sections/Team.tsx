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

  // Animation configuration parameters
  const config = {
    attractionDistance: 300, // Distance in pixels where attraction begins
    maxMovement: 40, // Maximum distance in pixels a card can move from its original position
    attractionStrength: 0.3, // How strongly cards are attracted to the cursor (0-1)
    returnSpeed: 0.8, // How fast cards return to their original position (0-1)
  };

  // Store original positions of team cards
  const originalPositions = useRef<{ x: number; y: number }[]>([]);

  // Set up mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Set up card movement animation
  useEffect(() => {
    // Skip if no references or window is not available
    if (typeof window === "undefined" || !teamRefs.current.length) return;

    // Store original positions of all cards (once)
    if (originalPositions.current.length === 0) {
      originalPositions.current = teamRefs.current.map((ref) => {
        if (!ref) return { x: 0, y: 0 };
        const rect = ref.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2, // Center X
          y: rect.top + rect.height / 2, // Center Y
        };
      });
    }

    // Animation loop for card attraction
    const animateCards = () => {
      teamRefs.current.forEach((ref) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        // Calculate distance between mouse and card center
        const deltaX = mousePosition.x - cardCenterX;
        const deltaY = mousePosition.y - cardCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Determine if card should be attracted to cursor
        if (distance < config.attractionDistance) {
          // Calculate movement amount based on distance (closer = stronger attraction)
          const attractionFactor =
            1 - Math.min(distance / config.attractionDistance, 1);
          const moveFactor = attractionFactor * config.attractionStrength;

          // Calculate new position with limited movement
          const moveX =
            Math.min(Math.abs(deltaX * moveFactor), config.maxMovement) *
            Math.sign(deltaX);
          const moveY =
            Math.min(Math.abs(deltaY * moveFactor), config.maxMovement) *
            Math.sign(deltaY);

          // Animate the card to the new position
          gsap.to(ref, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          // Return to original position if outside attraction range
          gsap.to(ref, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, " + config.returnSpeed + ")",
          });
        }
      });

      // Continue animation loop
      requestAnimationFrame(animateCards);
    };

    // Start the animation loop
    const animationFrame = requestAnimationFrame(animateCards);
    // Clean up animation frame on unmount
    return () => cancelAnimationFrame(animationFrame);
  }, [
    mousePosition,
    config.attractionDistance,
    config.attractionStrength,
    config.maxMovement,
    config.returnSpeed,
  ]);

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
