"use client";

import { useEffect, useRef } from "react";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  // Create refs for the text elements
  const nextRef = useRef<HTMLHeadingElement>(null);
  const genRef = useRef<HTMLSpanElement>(null);
  const webRef = useRef<HTMLSpanElement>(null);
  const solutionRef = useRef<HTMLSpanElement>(null);

  // Advanced animation on component mount
  useEffect(() => {
    const scrambleText = () => {
      const originalText = "NEXT";
      // Extended character set for more randomness
      const chars =
        "!@#$%^&*()_+{}:<>?|~`-=[];',./ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const duration = 2.0;
      const element = nextRef.current;

      if (!element) return;

      // Hide initially
      gsap.set(element, { opacity: 0 });

      let currentText = "";
      let currentLength = 0;
      const scrambleTimeline = gsap.timeline({
        onStart: () => {
          gsap.to(element, { opacity: 1, duration: 0.3 });
        },
      });

      // Using more optimized animation approach
      scrambleTimeline.to(
        {},
        {
          duration: duration,
          ease: "power2.inOut", // Smoother easing
          onUpdate: function () {
            const progress = this.progress();

            // Gradually reveal characters as animation progresses
            const targetLength = Math.ceil(
              originalText.length * Math.min(progress * 2, 1)
            );

            // Only update when needed
            if (targetLength !== currentLength) {
              currentLength = targetLength;

              // Build scrambled text more efficiently
              const textArray = [];

              for (let i = 0; i < originalText.length; i++) {
                if (i < currentLength) {
                  // Revealed character
                  textArray.push(originalText[i]);
                } else if (i === currentLength) {
                  // Scrambled character at the edge
                  textArray.push(
                    chars[Math.floor(Math.random() * chars.length)]
                  );
                }
                // Skip pushing empty characters for better performance
              }

              currentText = textArray.join("");
              element.textContent = currentText;
            } else if (currentLength < originalText.length && progress < 1) {
              // Just update the scrambled character at the edge for a dynamic effect
              const textArray = currentText.split("");
              textArray[currentLength] =
                chars[Math.floor(Math.random() * chars.length)];
              currentText = textArray.join("");
              element.textContent = currentText;
            }
          },
          onComplete: () => {
            // Ensure the final text is correct
            element.textContent = originalText;
          },
        }
      );

      return scrambleTimeline;
    };

    // Setup animations
    const masterTimeline = gsap.timeline();

    // 1. NEXT - scramble in
    const scrambleAnim = scrambleText();
    if (scrambleAnim) masterTimeline.add(scrambleAnim);

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

  return (
    <section className="relative w-full h-screen">
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none", // This prevents any mouse interaction
        }}
      >
        <ShaderGradient
          animate="on"
          type="waterPlane"
          wireframe={false}
          shader="defaults"
          uTime={0}
          uSpeed={0.1}
          uStrength={1.5}
          uDensity={2.5}
          uFrequency={5.5}
          positionX={-1.4}
          positionY={0}
          positionZ={0}
          rotationX={10}
          rotationY={10}
          rotationZ={50}
          color1="#F25042"
          color2="#A8C4BC"
          color3="#007D7E"
          reflection={0.1}
          // View (camera) props
          cAzimuthAngle={180}
          cPolarAngle={90}
          cDistance={3.6}
          cameraZoom={1}
          // Effect props
          lightType="3d"
          brightness={1.3}
          envPreset="city"
          grain="on"
          // Tool props
          toggleAxis={false} // axesHelper=off
          zoomOut={false} // based on zoomOut not explicitly set
          hoverState=""
          // Optional - if using transition features
          enableTransition={false}
        />
      </ShaderGradientCanvas>

      {/* Animated text content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="flex flex-col items-center text-black">
          <div className="flex items-baseline">
            <h1
              ref={nextRef}
              className="text-8xl md:text-[12rem] font-black tracking-tight"
            >
              NEXT
            </h1>
            <span ref={genRef} className="text-4xl md:text-6xl font-bold">
              Gen
            </span>
          </div>

          <div className="flex pl-30">
            <span
              ref={webRef}
              className="text-4xl md:text-6xl leading-16 font-bold"
            >
              Web
            </span>
            <span
              ref={solutionRef}
              className="text-8xl md:text-9xl leading-16 font-black tracking-tight"
            >
              Solution
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
