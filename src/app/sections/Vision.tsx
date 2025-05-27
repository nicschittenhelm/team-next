"use client";

import VisionCard from "../components/VisionCard";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { visionData } from "../data/visionData";

// Register ScrollTrigger plugin with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Vision() {
  // Configurable animation constants
  const PERSPECTIVE = "1200px";
  const CARD_ANIMATION_DURATION = 0.3;
  const SECTION_ANIMATION_DISTANCE = 1200;
  const CARD_BLUR = 8;
  const CARD_BLUR_END = `blur(${CARD_BLUR}px)`;
  const CARD_BLUR_NONE = "blur(0px)";

  const sectionRef = useRef<HTMLElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  interface VisionCardHandle {
    triggerTextIn?: () => void;
    resetText?: () => void;
  }
  const cardComponentRefs = useRef<Array<VisionCardHandle | null>>([]);
  const cards = visionData;
  const [cardProgress, setCardProgress] = useState<number[]>(() =>
    Array(cards.length).fill(0)
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
    if (
      !sectionRef.current ||
      !cardContainerRef.current ||
      cardRefs.current.length === 0
    )
      return;

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

    // Timeline for card animations
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 30%", // Animation starts when top of section hits center of viewport
        end: `+=${SECTION_ANIMATION_DISTANCE}`, // Animation duration
        scrub: 0.8,
        markers: false,
      },
    });

    // Pin section during animation
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top", // Pin starts when top of section hits top of viewport
      end: `+=${SECTION_ANIMATION_DISTANCE}`, // Pin duration matches animation duration
      pin: true,
      anticipatePin: 1,
      markers: false,
    });

    // Animate each card
    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardStart = idx * CARD_ANIMATION_DURATION;
      // Animate in
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
          filter: `brightness(1) ${CARD_BLUR_END}`, // Blur at start
        },
        {
          y: 0,
          z: 0,
          x: 30,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          filter: `brightness(1) ${CARD_BLUR_NONE}`, // No blur at center
          ease: "power2.out",
          duration: CARD_ANIMATION_DURATION,
          onStart: () => cardComponentRefs.current[idx]?.triggerTextIn?.(),
          onReverseComplete: () =>
            cardComponentRefs.current[idx]?.resetText?.(),
          onUpdate: function () {
            const tl = this.timeline || timeline;
            const absStart = cardStart;
            const absEnd = cardStart + CARD_ANIMATION_DURATION;
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
      // Animate out
      if (idx < cardRefs.current.length - 2) {
        timeline.fromTo(
          card,
          {
            y: 0,
            z: 0,
            x: 30,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            filter: `brightness(1) ${CARD_BLUR_NONE}`, // No blur at center
          },
          {
            y: -120,
            z: -80,
            x: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 0.9,
            filter: `brightness(0.5) ${CARD_BLUR_END}`, // Blur at end
            ease: "linear",
            duration: CARD_ANIMATION_DURATION * 2,
            immediateRender: false, // Prevents initial state bug
          },
          cardStart + CARD_ANIMATION_DURATION
        );
      } else if (idx === cardRefs.current.length - 2) {
        timeline.fromTo(
          card,
          {
            y: 0,
            z: 0,
            x: 30,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            filter: `brightness(1) ${CARD_BLUR_NONE}`, // No blur at center
          },
          {
            y: -60, // Only halfway out
            z: -40,
            x: 15,
            rotateX: 0,
            rotateY: 0,
            scale: 0.95,
            filter: `brightness(0.75) ${CARD_BLUR_END}`, // Blur at end
            ease: "linear",
            duration: CARD_ANIMATION_DURATION, // Only half the duration
            immediateRender: false, // Prevents initial state bug
          },
          cardStart + CARD_ANIMATION_DURATION
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
      className="h-screen w-screen bg-black relative overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-screen flex items-center justify-end">
        <div
          ref={cardContainerRef}
          className="card-container relative h-full w-full flex items-center justify-center"
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              style={{
                perspective: PERSPECTIVE,
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
                  title={card.title}
                  description={card.description}
                  goal={card.goal}
                  approach={card.approach}
                  progress={cardProgress[idx]}
                  cardIndex={idx}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
