"use client";

import VisionCard from "../components/VisionCard";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Card data
  const cardData = {
    title: "Frontend Architecture & Automation",
    description:
      "We aim to be the leading provider of innovative solutions that empower individuals and organizations to achieve their goals.",
  };

  useEffect(() => {
    // Skip animation setup during SSR
    if (typeof window === "undefined") return;

    // Clear any existing ScrollTrigger instances to prevent duplicates on hot reloads
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));

    if (!cardRef.current || !sectionRef.current || !cardContainerRef.current)
      return; // Apply perspective to the container for 3D transformations
    gsap.set(cardContainerRef.current, {
      perspective: 1200, // Increased perspective for more dramatic effect
      perspectiveOrigin: "center center",
    }); // Setup initial state - card starts completely off-screen with negative rotation (folded down)
    gsap.set(cardRef.current, {
      y: 700, // Start much further below the viewport (completely out of view)
      z: 100, // Start further back in Z space
      rotateX: -40, // Negative rotation (folded down/away from viewer)
      rotateY: 10, // No rotation on Y axis
      // No rotation on Y axis
      transformOrigin: "center bottom", // Origin at bottom right corner for proper folding effect
    });

    // Create the main timeline for the section
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom center",
        scrub: 0.8, // Smooth scrubbing effect
        pin: true, // Pin the section while scrolling
        anticipatePin: 1,
        markers: false, // Helpful for debugging the scroll points
      },
    });

    // Stage 1: Card unfolds and flies in from bottom to center
    timeline.to(cardRef.current, {
      y: 0, // Center vertically
      z: 50, // Slightly in front for emphasis
      rotateX: 0, // Flat/no rotation (fully unfolded)
      rotateY: 0, // No rotation on Y axis
      ease: "power2.out",
      duration: 0.6, // First 60% of the scroll animation
    });

    // Stage 2: Card moves slightly back to final position (but stays visible)
    timeline.to(cardRef.current, {
      z: -80, // Move slightly back in Z space, but stay visible
      y: -80, // Slight upward movement
      x: 30, // Center horizontally
      ease: "power1.inOut",
      duration: 0.3, // Final 30% of the scroll animation
    });

    return () => {
      // Clean up ScrollTrigger when component unmounts
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-[200vh] w-screen bg-slate-500 relative overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold text-white absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
          Our Vision
        </h2>{" "}
        <div
          ref={cardContainerRef}
          className="card-container relative h-full w-full flex items-center justify-center"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
            perspectiveOrigin: "center center",
          }}
        >
          <div ref={cardRef} className="absolute">
            <VisionCard
              title={cardData.title}
              description={cardData.description}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
