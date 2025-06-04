"use client";

import { useEffect, useRef, useState } from "react";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const sectionMeta = {
  id: "hero",
  title: "Hero",
};

export default function Hero() {
  // Create refs for the text elements
  const nextRef = useRef<HTMLHeadingElement>(null);
  const genRef = useRef<HTMLSpanElement>(null);
  const webRef = useRef<HTMLSpanElement>(null);
  const solutionRef = useRef<HTMLSpanElement>(null);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);
  const nextBoxRef = useRef<HTMLDivElement>(null);

  // Advanced animation on component mount - but not for NEXT text
  useEffect(() => {
    // Setup animations for other elements only, not NEXT
    const masterTimeline = gsap.timeline(); // Force the NEXT text to be visible from the very beginning

    // 2. Gen - slide from left
    masterTimeline.fromTo(
      genRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.7, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // 3. Web - slide from right
    masterTimeline.fromTo(
      webRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.7, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // 4. Solution - fold in staggered
    // Need to split the text into individual characters for staggered effect
    if (solutionRef.current) {
      const solutionText = solutionRef.current.textContent || "Solution";
      solutionRef.current.innerHTML = ""; // Clear content

      // Create spans for each character
      Array.from(solutionText).forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.display = "inline-block";
        solutionRef.current?.appendChild(charSpan);
      });

      // Select all character spans and animate them
      const chars = solutionRef.current.querySelectorAll("span");

      masterTimeline.fromTo(
        chars,
        {
          opacity: 0,
          rotationX: -90,
          transformOrigin: "0% 50%",
        },
        {
          opacity: 1,
          rotationX: 0,
          duration: 0.05,
          stagger: 0.06,
          ease: "power1.out",
        },
        "-=0.3"
      );
    }

    return () => {
      // Cleanup
      masterTimeline.kill();
    };
  }, []);
  useEffect(() => {
    // Slot machine animation for NEXT text
    if (nextRef.current) {
      const element = nextRef.current;
      const originalText = "NEXT";
      element.innerHTML = "";
      const spans = [];
      for (let idx = 0; idx < originalText.length; idx++) {
        const span = document.createElement("span");
        span.textContent = "";
        span.style.display = "inline-block";
        span.style.transform = "translateY(-120%)";
        span.style.opacity = "0";
        span.style.transition = "none";
        element.appendChild(span);
        spans.push(span);
      }
      let finishedCount = 0;
      const onAllDone = () => {
        // Trigger the loading background animation only after all slot letters are in place
        if (loadingRef.current && nextBoxRef.current) {
          const nextBox = nextBoxRef.current.getBoundingClientRect();
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          gsap.set(loadingRef.current, {
            left: 0,
            top: 0,
            width: vw,
            height: vh,
            borderRadius: 0,
            position: "fixed",
            zIndex: 50,
            background: "#0dff00",
          });
          const loadingTimeline = gsap.timeline({
            paused: false,
            defaults: { ease: "power3.inOut" },
          });
          loadingTimeline.to(loadingRef.current, {
            left: nextBox.left,
            top: nextBox.top,
            width: nextBox.width,
            height: nextBox.height,
            borderRadius: 0,
            duration: 1.1,
            delay: 0.1, // start almost immediately after slot machine
            ease: "power3.inOut",
            onComplete: () => setLoading(false),
          });
        }
      };
      // Animate each letter like a slot machine
      spans.forEach((span, idx) => {
        // Only roll down the actual letter, no scramble
        gsap.set(span, {
          y: -80,
          opacity: 0,
          rotateX: -80,
          transformPerspective: 400,
          transformOrigin: "50% 0%",
          z: 0,
        });
        setTimeout(() => {
          span.textContent = originalText[idx];
          gsap.to(span, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.1,
            ease: "expo.out",
            transformPerspective: 400,
            transformOrigin: "50% 0%",
            z: 0,
            onComplete: () => {
              finishedCount++;
              if (finishedCount === spans.length) {
                onAllDone();
              }
            },
          });
        }, idx * 420);
      });
    }
  }, []);
  return (
    <section className="relative w-full h-screen">
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <ShaderGradient
          animate="on"
          type="sphere"
          wireframe={false}
          shader="defaults"
          uTime={0}
          uSpeed={0.03}
          uStrength={0.8}
          uDensity={2.3}
          uFrequency={5.5}
          uAmplitude={0.3}
          positionX={-0.8}
          positionY={0.8}
          positionZ={0}
          rotationX={0}
          rotationY={0}
          rotationZ={0}
          color1="#000000"
          color2="#0dff00"
          color3="#003300"
          reflection={0.1}
          cAzimuthAngle={180}
          cPolarAngle={90}
          cDistance={3.6}
          cameraZoom={9.0}
          lightType="3d"
          brightness={0.8}
          envPreset="lobby"
          grain="off"
          toggleAxis={false}
          // Optional - if using transition features
          enableTransition={false}
        />
      </ShaderGradientCanvas>{" "}
      {/* Animated text content - with isolation creating a new stacking context */}
      <div className="absolute inset-0 flex items-center">
        {" "}
        {/* Creates new stacking context */}
        <div className="flex flex-col items-start justify-center h-full pl-16">
          <div className="flex flex-row items-baseline gap-6">
            <div
              ref={nextBoxRef}
              className="inline-block"
              style={{ position: "relative", zIndex: 200 }}
            >
              {" "}
              <h1
                ref={nextRef}
                className="font-lexend text-8xl md:text-[8rem] font-bold tracking-tight uppercase text-black bg-[#0dff00] py-2 px-6 "
                style={{
                  letterSpacing: "-0.05em",
                  position: "relative",
                  zIndex: 200,
                }}
              >
                NEXT
              </h1>
            </div>
            <span
              ref={genRef}
              className="font-lexend text-8xl md:text-[8rem] font-bold tracking-tight uppercase text-white"
              style={{ letterSpacing: "-0.05em" }}
            >
              GEN
            </span>
          </div>
          <div className="flex flex-row gap-6 mt-4">
            <span
              ref={webRef}
              className="font-lexend text-8xl md:text-[8rem] font-bold tracking-tight uppercase text-white"
              style={{ letterSpacing: "-0.05em" }}
            >
              WEB
            </span>
            <span
              ref={solutionRef}
              className="font-lexend text-8xl md:text-[8rem] font-bold tracking-tight uppercase text-white"
              style={{ letterSpacing: "-0.05em" }}
            >
              SOLUTIONS
            </span>
          </div>
          <span className="font-share-tech-mono font-normal mt-10 text-[1.25rem] md:text-[1.75rem] text-white/80 tracking-tight drop-shadow-lg flex items-center gap-2 lowercase">
            <span className="text-[#0dff00] text-3xl font-bold">
              &#47;&#47;
            </span>
            the benchmark for modern web development{" "}
          </span>
        </div>
      </div>{" "}
      {/* Loading overlay with specifically configured CSS to ensure text shows through */}
      {loading && (
        <div
          ref={loadingRef}
          className="pointer-events-none" /* Prevents blocking interaction */
          style={{
            willChange: "width,height,left,top",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 50 /* Lower z-index than text content */,
            background: "#0dff00",
            mixBlendMode: "normal" /* Helps with layering */,
            contain: "paint" /* Performance optimization */,
            transform: "translateZ(0)" /* Create a new stacking context */,
            backfaceVisibility:
              "hidden" /* Prevent any 3D transforms affecting other elements */,
          }}
        />
      )}
    </section>
  );
}
