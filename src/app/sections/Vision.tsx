"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Icons for each section
const frontendIcons = [
  { id: 1, name: "react", path: "/file.svg" },
  { id: 2, name: "typescript", path: "/file.svg" },
  { id: 3, name: "next", path: "/next.svg" },
  { id: 4, name: "tailwind", path: "/file.svg" },
  { id: 5, name: "react", path: "/window.svg" },
  { id: 6, name: "html", path: "/window.svg" },
  { id: 7, name: "css", path: "/file.svg" },
  { id: 8, name: "javascript", path: "/file.svg" },
];

const backendIcons = [
  { id: 1, name: "node", path: "/file.svg" },
  { id: 2, name: "express", path: "/file.svg" },
  { id: 3, name: "mongodb", path: "/file.svg" },
  { id: 4, name: "postgres", path: "/file.svg" },
  { id: 5, name: "graphql", path: "/file.svg" },
  { id: 6, name: "aws", path: "/file.svg" },
  { id: 7, name: "docker", path: "/file.svg" },
  { id: 8, name: "kubernetes", path: "/file.svg" },
];

const processIcons = [
  { id: 1, name: "automation", path: "/file.svg" },
  { id: 2, name: "data", path: "/file.svg" },
  { id: 3, name: "workflow", path: "/globe.svg" },
  { id: 4, name: "integration", path: "/file.svg" },
  { id: 5, name: "dataflow", path: "/file.svg" },
  { id: 6, name: "api", path: "/window.svg" },
  { id: 7, name: "cloud", path: "/file.svg" },
  { id: 8, name: "analytics", path: "/file.svg" },
];

const aiIcons = [
  { id: 1, name: "python", path: "/file.svg" },
  { id: 2, name: "tensorflow", path: "/file.svg" },
  { id: 3, name: "pytorch", path: "/file.svg" },
  { id: 4, name: "openai", path: "/globe.svg" },
  { id: 5, name: "huggingface", path: "/file.svg" },
  { id: 6, name: "langchain", path: "/file.svg" },
  { id: 7, name: "numpy", path: "/file.svg" },
  { id: 8, name: "pandas", path: "/file.svg" },
];

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const frontendRef = useRef<HTMLDivElement>(null);
  const backendRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  // Icon references for animation
  const frontendIconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const backendIconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const processIconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const aiIconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Animate all the icon clouds with improved spacing
      [
        { refs: frontendIconRefs.current, icons: frontendIcons },
        { refs: backendIconRefs.current, icons: backendIcons },
        { refs: processIconRefs.current, icons: processIcons },
        { refs: aiIconRefs.current, icons: aiIcons },
      ].forEach(({ refs, icons }) => {
        // Set initial random positions with more spacing
        refs.forEach((iconRef, i) => {
          if (!iconRef) return;

          // Distribute icons within a wider circular/oval area
          const angle = (i / icons.length) * Math.PI * 2;
          const radius = 30 + Math.random() * 25; // Increased radius between 30-55
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          gsap.set(iconRef, {
            x: x + "%",
            y: y + "%",
            scale: 0.5 + Math.random() * 0.6, // Random scale between 0.5-1.1
            opacity: 0,
            rotation: gsap.utils.random(-10, 10),
          });

          // Animate in
          gsap.to(iconRef, {
            opacity: 0.8,
            duration: 1.2,
            delay: i * 0.15, // Increased delay for more staggered appearance
            ease: "power2.out",
          });

          // Continuous floating animation with wider movement range
          gsap.to(iconRef, {
            x: `${x + gsap.utils.random(-15, 15)}%`, // Wider movement range
            y: `${y + gsap.utils.random(-15, 15)}%`,
            rotation: gsap.utils.random(-15, 15),
            duration: gsap.utils.random(6, 12), // Slower movement
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      });

      // Parallax scrolling for sections
      const sections = [
        frontendRef.current,
        backendRef.current,
        processRef.current,
        aiRef.current,
      ];
      sections.forEach((section, index) => {
        if (!section) return;

        // Content parallax (text moves at different speed than the section)
        const content = section.querySelector(".content");
        const image = section.querySelector(".image-container");

        if (content && image) {
          ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              // Direction alternates based on even/odd index
              const direction = index % 2 === 0 ? 1 : -1;

              // Text parallax
              gsap.to(content, {
                y: self.progress * -50 * direction,
                duration: 0.5,
                overwrite: "auto",
              });

              // Image parallax (opposite direction)
              gsap.to(image, {
                y: self.progress * 50 * direction,
                duration: 0.5,
                overwrite: "auto",
              });
            },
          });
        }
      });

      // Optional - section reveal animation
      gsap.utils.toArray(".vision-section").forEach((section) => {
        gsap.from(section as Element, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section as Element,
            start: "top 80%",
            end: "top 50%",
            scrub: 0.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert(); // Clean up animations
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 bg-gray-900 text-white overflow-hidden"
    >
      <div className="container mx-auto text-center mb-16">
        <h2 className="text-5xl font-bold text-white mb-4">Our Vision</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Leveraging cutting-edge technology across the full stack to create
          efficient, scalable, and intelligent solutions.
        </p>
      </div>

      {/* Frontend Architecture & Automation */}
      <div ref={frontendRef} className="vision-section relative mb-32">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left content */}
            <div className="w-full md:w-1/2 px-6 md:pr-16 content">
              <div className="md:max-w-lg">
                <h3 className="text-3xl font-bold text-indigo-400 mb-4">
                  Frontend Architecture & Automation
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  Architekturen entwerfen, AI Prototype-Tooling einführen,
                  Developer Experience verbessern. Schnellere Iterationen, Time
                  to Market reduzieren.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></span>
                    Modern frameworks and libraries
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></span>
                    AI-enhanced prototyping
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></span>
                    Optimized developer experience
                  </li>
                </ul>
              </div>
            </div>

            {/* Right illustration */}
            <div className="w-full md:w-1/2 mt-10 md:mt-0 relative h-64 md:h-96 image-container">
              {/* Icon cloud background */}
              <div className="absolute inset-0 flex items-center justify-center">
                {frontendIcons.map((icon, index) => (
                  <div
                    key={icon.id}
                    ref={(el) => {
                      frontendIconRefs.current[index] = el;
                    }}
                    className="absolute w-10 h-10 md:w-14 md:h-14"
                  >
                    <Image
                      src={icon.path}
                      alt={icon.name}
                      width={56}
                      height={56}
                      className="opacity-50 hover:opacity-90 transition-opacity filter invert"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backend & Server Architecture */}
      <div
        ref={backendRef}
        className="vision-section relative mb-32 bg-gray-800 py-20"
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center">
            {/* Left content (Now on right for alternating layout) */}
            <div className="w-full md:w-1/2 px-6 md:pl-16 content">
              <div className="md:max-w-lg ml-auto">
                <h3 className="text-3xl font-bold text-emerald-400 mb-4">
                  Backend & Server Architecture
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  Cloud-native Systeme designen, Serverless-Architekturen
                  umsetzen, APIs entwickeln, CI/CD Pipelines aufbauen,
                  Infrastruktur automatisieren. Zuverlässige und sichere
                  Softwarebasis schaffen.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                    Cloud-native systems
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                    Serverless architecture
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                    CI/CD automation
                  </li>
                </ul>
              </div>
            </div>

            {/* Right illustration (Now on left for alternating layout) */}
            <div className="w-full md:w-1/2 mt-10 md:mt-0 relative h-64 md:h-96 image-container">
              {/* Icon cloud background */}
              <div className="absolute inset-0 flex items-center justify-center">
                {" "}
                {backendIcons.map((icon, index) => (
                  <div
                    key={icon.id}
                    ref={(el) => {
                      backendIconRefs.current[index] = el;
                    }}
                    className="absolute w-10 h-10 md:w-14 md:h-14"
                  >
                    <Image
                      src={icon.path}
                      alt={icon.name}
                      width={56}
                      height={56}
                      className="opacity-50 hover:opacity-90 transition-opacity filter invert"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Automation & Data Engine Integrations */}
      <div ref={processRef} className="vision-section relative mb-32">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left content */}
            <div className="w-full md:w-1/2 px-6 md:pr-16 content">
              <div className="md:max-w-lg">
                <h3 className="text-3xl font-bold text-amber-400 mb-4">
                  Process Automation & Data Engine Integrations
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  Manuelle Prozesse beschleunigen und automatisieren, Systeme
                  vereinfachen und Datenfluss und -steuerung zentralisieren.
                  Flexibel skalieren und Kosten optimieren.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mr-2"></span>
                    Process acceleration
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mr-2"></span>
                    Centralized data flow
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mr-2"></span>
                    Flexible scaling
                  </li>
                </ul>
              </div>
            </div>

            {/* Right illustration */}
            <div className="w-full md:w-1/2 mt-10 md:mt-0 relative h-64 md:h-96 image-container">
              {/* Icon cloud background */}
              <div className="absolute inset-0 flex items-center justify-center">
                {processIcons.map((icon, index) => (
                  <div
                    key={icon.id}
                    ref={(el) => {
                      processIconRefs.current[index] = el;
                    }}
                    className="absolute w-10 h-10 md:w-14 md:h-14"
                  >
                    <Image
                      src={icon.path}
                      alt={icon.name}
                      width={56}
                      height={56}
                      className="opacity-50 hover:opacity-90 transition-opacity filter invert"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Tooling & Developer Experience */}
      <div ref={aiRef} className="vision-section relative bg-gray-800 py-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center">
            {/* Left content */}
            <div className="w-full md:w-1/2 px-6 md:pl-16 content">
              <div className="md:max-w-lg ml-auto">
                <h3 className="text-3xl font-bold text-violet-400 mb-4">
                  AI Tooling & Developer Experience
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  AI-gestütztes Tooling & Codebase Context RAGs integrieren,
                  Dev-Prozesse optimieren und automatisieren. Produktivität
                  steigern und Innovation beschleunigen.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-violet-400 mr-2"></span>
                    AI-supported tooling
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-violet-400 mr-2"></span>
                    Codebase context RAGs
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-violet-400 mr-2"></span>
                    Development process optimization
                  </li>
                </ul>
              </div>
            </div>

            {/* Right illustration */}
            <div className="w-full md:w-1/2 mt-10 md:mt-0 relative h-64 md:h-96 image-container">
              {/* Icon cloud background */}
              <div className="absolute inset-0 flex items-center justify-center">
                {aiIcons.map((icon, index) => (
                  <div
                    key={icon.id}
                    ref={(el) => {
                      aiIconRefs.current[index] = el;
                    }}
                    className="absolute w-10 h-10 md:w-14 md:h-14"
                  >
                    <Image
                      src={icon.path}
                      alt={icon.name}
                      width={56}
                      height={56}
                      className="opacity-50 hover:opacity-90 transition-opacity filter invert"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
