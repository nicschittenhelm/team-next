"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRedRef = useRef<SVGSVGElement>(null);
  const pathRedRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // Path data for morphing blue shape
  const pathOne =
    "M14.1,-24.1C16,-23.2,13.9,-15,15.1,-9.8C16.2,-4.5,20.8,-2.3,18.8,-1.1C16.9,0,8.5,0,7,4.8C5.5,9.5,11,19,11,27.1C10.9,35.3,5.5,42.2,2.1,38.6C-1.3,35,-2.6,20.9,-5.6,14.4C-8.6,8,-13.3,9.2,-15.2,8C-17.1,6.9,-16.3,3.5,-16.2,0.1C-16,-3.3,-16.7,-6.7,-16.5,-10.8C-16.3,-14.9,-15.2,-19.7,-12.4,-20C-9.5,-20.3,-4.7,-16.1,0.7,-17.2C6.1,-18.4,12.1,-24.9,14.1,-24.1Z";
  const pathTwo =
    "M15,-19.1C22.1,-21.8,32.4,-23.2,38.3,-19.9C44.2,-16.5,45.6,-8.2,40.5,-2.9C35.4,2.4,23.9,4.7,16.4,5.5C9,6.2,5.8,5.2,3.7,6.8C1.7,8.3,0.8,12.4,-2.1,16C-5,19.6,-10,22.7,-13.4,22C-16.8,21.2,-18.5,16.5,-23.7,12.1C-28.8,7.8,-37.2,3.9,-37.9,-0.4C-38.6,-4.7,-31.6,-9.4,-27.9,-16.3C-24.3,-23.2,-24.1,-32.3,-20,-31.3C-15.9,-30.4,-7.9,-19.5,-2,-16C3.9,-12.5,7.8,-16.4,15,-19.1Z";

  // Path data for morphing red shape
  const pathRedTwo =
    "M16.4,-29.4C19.6,-26.6,19.2,-18.8,24.2,-13C29.2,-7.3,39.5,-3.6,37,-1.5C34.5,0.7,19.1,1.4,14.2,7.4C9.3,13.3,14.9,24.4,14.3,29.8C13.7,35.1,6.8,34.7,0.9,33.1C-5,31.5,-9.9,28.7,-10,23C-10,17.2,-5,8.6,-2.9,4.3C-0.9,0,-1.8,0,-4.2,-1.4C-6.6,-2.8,-10.6,-5.6,-13,-10.6C-15.4,-15.5,-16.3,-22.6,-13.9,-25.8C-11.4,-29,-5.7,-28.4,0.5,-29.1C6.6,-29.9,13.3,-32.2,16.4,-29.4Z";
  const pathRedOne =
    "M18.3,-29.7C20.3,-30.6,16,-18.7,18.5,-11.6C21.1,-4.5,30.4,-2.3,28.5,-1.1C26.5,0,13.3,0,7,0.7C0.8,1.3,1.5,2.6,1.5,10.1C1.5,17.7,0.7,31.5,-2.1,35.2C-5,38.9,-10,32.4,-10.5,25.2C-11.1,17.9,-7.1,9.9,-11.9,5.5C-16.6,1.2,-30.1,0.6,-32.4,-1.4C-34.8,-3.3,-26,-6.6,-22.7,-13.4C-19.3,-20.2,-21.4,-30.4,-18.5,-29C-15.6,-27.6,-7.8,-14.6,0.2,-14.9C8.2,-15.2,16.4,-28.9,18.3,-29.7Z";

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const svgRed = svgRedRef.current;
    const pathRed = pathRedRef.current;
    const text = textRef.current;

    if (!svg || !text || !section || !path || !svgRed || !pathRed) return;

    // Create a timeline for our animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top", // starts at the top of the viewport
        end: "+=200%", // ends after scrolling 200% of the section's height
        pin: true, // pins the section during animation
        scrub: 1, // smooth scrubbing effect
        markers: false, // set to true for debugging
      },
    });

    // Add animations to the timeline - all animations start at the beginning (0) and run through the entire timeline
    tl
      // Animate the blue path morphing
      .to(
        path,
        {
          attr: { d: pathTwo },
          ease: "power2.inOut",
          duration: 1, // Full duration of the timeline
        },
        0
      )
      // Animate the blue path color
      .to(
        path,
        {
          fill: "#6366f1",
          ease: "power2.inOut",
          duration: 1,
        },
        0
      )
      // Animate the red path morphing
      .to(
        pathRed,
        {
          attr: { d: pathRedTwo },
          ease: "power2.inOut",
          duration: 1,
        },
        0
      )
      // Animate the red path color
      .to(
        pathRed,
        {
          fill: "#ef4444", // Slightly brighter red at end
          ease: "power2.inOut",
          duration: 1,
        },
        0
      )
      // Animate the text zoom
      .to(
        text,
        {
          scale: 1.3,
          ease: "power2.inOut",
          duration: 1,
        },
        0
      );

    // Cleanup function
    return () => {
      // Kill all ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md z-0"></div>

      {/* Morphing Background Shape - blue (first SVG) */}
      <div className="absolute inset-0 flex items-center justify-center translate-x-[15%] translate-y-[10%] z-0">
        <svg
          ref={svgRef}
          className="w-[160vw] h-[160vh] blur-2xl"
          viewBox="-50 -50 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            ref={pathRef}
            d={pathOne}
            fill="#4f46e5"
            className="opacity-50"
          />
        </svg>
      </div>

      {/* Morphing Background Shape - red (second SVG) */}
      <div className="absolute inset-0 flex items-center justify-center translate-x-[-5%] translate-y-[-5%] z-0">
        <svg
          ref={svgRedRef}
          className="w-[160vw] h-[160vh] blur-2xl mix-blend-screen"
          viewBox="-50 -50 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            ref={pathRedRef}
            d={pathRedOne}
            fill="#b91c1c"
            className="opacity-50"
          />
        </svg>
      </div>

      {/* Foreground Text */}
      <h1
        ref={textRef}
        className="relative z-10 text-4xl sm:text-6xl md:text-7xl font-bold text-white text-center leading-tight"
      >
        <span className="text-8xl sm:text-9xl md:text-[10rem] text-white uppercase block mb-2">
          NEXT
        </span>
        Gen Web Solutions
      </h1>
    </section>
  );
}
