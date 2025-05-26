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

    // Set initial state for all cards
    cardRefs.current.forEach((card) => {
      if (card) {
        gsap.set(card, {
          y: 700,
          z: 100,
          rotateX: -40,
          rotateY: 10,
          transformOrigin: "center center",
        });
      }
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "center center",
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
          y: 1000,
          z: 10,
          x: 0,
          rotateX: -10,
          rotateY: 5,
          rotateZ: -5,
          scale: 1,
          transformOrigin: "center center",
          filter: "brightness(1)",
        },
        {
          y: 0,
          z: 0,
          x: 30,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
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
          y: 0,
          z: 0,
          x: 30,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          filter: "brightness(1)",
        },
        {
          y: -120,
          z: -80,
          x: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 0.9,
          filter: "brightness(0.5)",
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
      className="h-[200vh] w-screen bg-black relative overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-screen flex items-center justify-end">
        <div
          ref={cardContainerRef}
          className="card-container relative h-full w-full flex items-center justify-center"
          style={
            {
              // Remove perspective from the container
              // perspective: "1200px",
              // transformStyle: "preserve-3d",
              // perspectiveOrigin: "center center",
            }
          }
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              style={{
                perspective: "1200px",
                perspectiveOrigin: "center center",
                transformStyle: "preserve-3d",
              }}
              className="absolute"
            >
              <div
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="w-full h-full"
              >
                <VisionCard title={card.title} description={card.description} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
