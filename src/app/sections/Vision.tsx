"use client";

import VisionCard from "../components/VisionCard";
import { useEffect, useRef, useState } from "react";
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
  // Use a ref to hold an array of VisionCard handles
  interface VisionCardHandle {
    triggerTextIn?: () => void;
    resetText?: () => void;
  }
  const cardComponentRefs = useRef<Array<VisionCardHandle | null>>([]);

  // Card data array for scalability
  const cards = visionCards;

  const [cardProgress, setCardProgress] = useState<number[]>(() =>
    Array(cards.length).fill(0)
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
    if (!sectionRef.current || !cardContainerRef.current) return;
    if (cardRefs.current.length === 0) return;

    // Set initial state for all cards
    cardRefs.current.forEach((card) => {
      if (card) {
        // Use window.innerHeight to always place cards below the viewport
        gsap.set(card, {
          y: window.innerHeight + 100, // 100px extra to ensure it's out of view
          z: 100,
          rotateX: -40,
          rotateY: 10,
          transformOrigin: "center center",
        });
      }
    });

    // Animation timeline: starts when top of section hits center of viewport
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 20%", // Animation starts when top of section hits center of viewport
        end: "+=1200", // Animation duration
        scrub: 0.8,
        markers: false,
        // onUpdate: (self) => { ... } // We'll handle per-card below
      },
    });

    // Pinning: only pins when the top of the section hits the top of the viewport
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top", // Pin starts when top of section hits top of viewport
      end: "+=1200", // Pin duration matches animation duration
      pin: true,
      anticipatePin: 1,
      markers: false,
    }); // Set up animation parameters
    const cardDuration = 0.3; // Duration for each card animation

    // Create independent animations for each card
    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardStart = idx * cardDuration;
      // Stage 1: Animate in (fold up to center position)
      timeline.fromTo(
        card,
        {
          y: window.innerHeight, // Always start out of viewport
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
          onStart: () => {
            cardComponentRefs.current[idx]?.triggerTextIn?.();
          },
          onReverseComplete: () => {
            cardComponentRefs.current[idx]?.resetText?.();
          },
          // Add onUpdate to update progress for this card
          onUpdate: function () {
            // Get the total progress of the timeline
            const tl = this.timeline || timeline;
            // Calculate the progress for this card's in-animation
            const absStart = cardStart;
            const absEnd = cardStart + cardDuration;
            const t = tl.time();
            let progress = 0;
            if (t <= absStart) progress = 0;
            else if (t >= absEnd) progress = 1;
            else progress = (t - absStart) / (absEnd - absStart);
            setCardProgress((prev) => {
              if (prev[idx] === progress) return prev;
              const next = [...prev];
              next[idx] = progress;
              return next;
            });
          },
        },
        cardStart
      );
      // Stage 2: Animate out (move back) and darken
      if (idx < cardRefs.current.length - 2) {
        // All but the last two cards animate out fully
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
      } else if (idx === cardRefs.current.length - 2) {
        // The second-to-last card only animates out halfway and then freezes
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
            y: -60, // Only halfway out
            z: -40,
            x: 15,
            rotateX: 0,
            rotateY: 0,
            scale: 0.95,
            filter: "brightness(0.75)",
            ease: "linear",
            duration: cardDuration, // Only half the duration
          },
          cardStart + cardDuration
        );
      }
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [cards.length]);

  return (
    <section
      ref={sectionRef}
      className="h-[1200px] w-screen bg-blue-800 relative overflow-hidden"
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
                <VisionCard
                  ref={(el) => {
                    cardComponentRefs.current[idx] = el;
                  }}
                  title={card.title}
                  description={card.description}
                  progress={cardProgress[idx]}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
