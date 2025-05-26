"use client";

import VisionCard from "../components/VisionCard";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { visionCards } from "../data/visionCards";

// Register ScrollTrigger plugin with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  // Use a ref to hold an array of card refs
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Card data array for scalability
  const cards = visionCards;

  useEffect(() => {
    if (typeof window === "undefined") return;
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
    if (!sectionRef.current || !cardContainerRef.current) return;
    if (cardRefs.current.length === 0) return;

    gsap.set(cardContainerRef.current, {
      perspective: 1200,
      perspectiveOrigin: "center center",
    });
    // Set initial state for all cards
    cardRefs.current.forEach((card) => {
      if (card) {
        gsap.set(card, {
          y: 700,
          z: 100,
          rotateX: -40,
          rotateY: 10,
          transformOrigin: "center bottom",
        });
      }
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom center",
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        markers: false,
      },
    }); // Set up animation parameters
    const cardDuration = 0.3; // Duration for each card animation

    // Create independent animations for each card
    cardRefs.current.forEach((card, idx, arr) => {
      if (!card) return;
      const cardStart = idx * cardDuration;
      // Stage 1: Animate in (fold up to center position)
      timeline.fromTo(
        card,
        {
          y: 700,
          z: 100,
          x: 0,
          rotateX: -40,
          rotateY: 10,
          scale: 1,
          transformOrigin: "center bottom",
          filter: "brightness(1)",
        },
        {
          y: -80,
          z: -80,
          x: 30,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          filter: "brightness(1)",
          ease: "power2.out",
          duration: cardDuration,
        },
        cardStart
      );
      // Stage 2: Animate out (move back) and darken
      timeline.fromTo(
        card,
        {
          y: -80,
          z: -80,
          x: 30,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          filter: "brightness(1)",
        },
        {
          y: -120,
          z: -80,
          x: 80,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          filter: "brightness(0.7)",
          ease: "linear",
          duration: cardDuration * 2,
        },
        cardStart + cardDuration
      );
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [cards.length]);

  return (
    <section
      ref={sectionRef}
      className="h-[200vh] w-screen bg-slate-500 relative overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold text-white absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
          Our Vision
        </h2>
        <div
          ref={cardContainerRef}
          className="card-container relative h-full w-full flex items-center justify-center"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
            perspectiveOrigin: "center center",
          }}
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="absolute"
            >
              <VisionCard title={card.title} description={card.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
