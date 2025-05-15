// src/sections/Team.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Team member data with better placeholder images
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "CEO & Founder",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Samantha Davis",
    role: "CTO",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Jordan Lee",
    role: "Lead Designer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "Morgan Taylor",
    role: "Senior Developer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 5,
    name: "Cameron Rivera",
    role: "Marketing Director",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    id: 6,
    name: "Jamie Quinn",
    role: "Product Manager",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
  },
];

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  const teamRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Calculate initial positions - improved with wider spacing to prevent overlap
  const getInitialPosition = (index: number) => {
    // Create a more distributed pattern across the screen with increased spacing
    const patterns = [
      { x: -80, y: -50 }, // Top left - moved further out
      { x: 0, y: -60 }, // Top center - moved higher
      { x: 80, y: -50 }, // Top right - moved further out
      { x: -80, y: 50 }, // Bottom left - moved further out
      { x: 0, y: 60 }, // Bottom center - moved lower
      { x: 80, y: 50 }, // Bottom right - moved further out
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
          rotation: gsap.utils.random(-10, 10),
          transformOrigin: "center center",
        });

        // Animate in
        gsap.to(elem, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: index * 0.15,
          ease: "power3.out",
        }); // Continuous floating animation with carefully controlled range
        gsap.to(elem, {
          y: `${position.y + gsap.utils.random(-10, 10)}%`,
          x: `${position.x + gsap.utils.random(-6, 6)}%`,
          rotation: gsap.utils.random(-8, 8),
          duration: gsap.utils.random(4, 8),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Create scroll-based parallax effect
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const scrollProgress = self.progress;

          teamRefs.current.forEach((elem, index) => {
            if (!elem) return; // Different movement speed for each element with carefully controlled effect
            const speedFactor = 1 + (index % 3) * 0.2; // Reduced variance
            const direction = index % 2 === 0 ? 1 : -1;

            gsap.to(elem, {
              y: `${
                getInitialPosition(index).y +
                direction * scrollProgress * 15 * speedFactor // Reduced movement range
              }%`,
              duration: 0.8,
              overwrite: "auto",
            });
          });
        },
      });
    }, containerRef);

    return () => ctx.revert(); // Clean up all GSAP animations
  }, []);

  // Mouse parallax effect - enhanced for more dramatic movement
  useEffect(() => {
    teamRefs.current.forEach((elem, index) => {
      if (!elem) return;

      // Each member reacts differently to mouse - increased factors
      const mouseFactorX = 8 + (index % 3) * 3;
      const mouseFactorY = 8 + (index % 3) * 3;
      // Invert direction for alternating elements to create more dynamic movement
      const invertX = index % 2 === 0 ? 1 : -1;
      const invertY = (index + 1) % 2 === 0 ? 1 : -1;

      gsap.to(elem, {
        x: `${
          getInitialPosition(index).x + mousePosition.x * mouseFactorX * invertX
        }%`,
        y: `${
          getInitialPosition(index).y + mousePosition.y * mouseFactorY * invertY
        }%`,
        rotationY: mousePosition.x * 8,
        rotationX: mousePosition.y * -8,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [mousePosition]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-black py-16"
      ref={containerRef}
    >
      {/* Heading */}
      <div className="container mx-auto text-center mb-10 z-10 relative">
        <h2 className="text-5xl font-bold mb-3 text-white tracking-tight">
          Our Team
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Meet the extraordinary people behind our success. A diverse team of
          experts committed to innovation and excellence.
        </p>
      </div>

      {/* Team container - improved positioning */}
      <div className="relative w-full h-[70vh] flex items-center justify-center">
        {/* Enhanced background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl"></div>

        {/* Team members */}
        {teamMembers.map((member, index) => (
          <div
            key={member.id}
            ref={(el) => {
              teamRefs.current[index] = el;
            }}
            className="absolute cursor-pointer group"
            style={{ willChange: "transform", perspective: "1000px" }}
          >
            <div
              className="relative w-56 h-56 md:w-64 md:h-64 overflow-hidden rounded-2xl shadow-xl 
                          transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl
                          bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-white/10"
            >
              {/* Glass effect card */}
              <div className="absolute inset-0.5 rounded-2xl overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 2}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  className="transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              </div>

              {/* Content */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5 text-left transform translate-y-2 
                            transition-transform duration-300 group-hover:translate-y-0"
              >
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p
                  className="text-sm text-gray-300 opacity-0 transform -translate-y-4 
                             transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                >
                  {member.role}
                </p>
              </div>

              {/* Shine effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 
                            bg-gradient-to-tr from-transparent via-white to-transparent 
                            transition-opacity duration-500 pointer-events-none"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
