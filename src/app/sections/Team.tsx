// src/sections/Team.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: "Alice" },
  { name: "Bob" },
  { name: "Charlie" },
  { name: "Dana" },
  { name: "Eve" },
  { name: "Frank" },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const teamItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const teamItems = teamItemsRef.current.filter(Boolean); // Filter out null values

    if (!section || teamItems.length === 0) return;

    // Create timeline for team section entrance
    gsap.fromTo(
      section,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=100", // starts animation when top of section is 100px from bottom of viewport
          end: "top center",
          scrub: true,
        },
      }
    );

    // Staggered animation for team members
    gsap.fromTo(
      teamItems,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top center+=100",
          end: "center center",
          scrub: true,
        },
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gray-950 text-white py-16 px-8"
    >
      <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {team.map((member, i) => (
          <div
            key={i}
            className="flex flex-col items-center"
            ref={(el) => {
              teamItemsRef.current[i] = el;
            }}
          >
            <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="w-16 h-16 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <p className="mt-4 text-xl font-medium">{member.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
