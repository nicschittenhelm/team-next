// src/sections/Team.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Team member data with detailed information for software developers
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "CTO & Founder",
    description:
      "Veteran software architect with 15+ years of experience building scalable cloud solutions. Passionate about mentoring and maintaining technical excellence across projects.",
    technologies: [
      "AWS",
      "Kubernetes",
      "Terraform",
      "Go",
      "Python",
      "System Design",
      "Microservices",
    ],
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Samantha Davis",
    role: "Lead Frontend Engineer",
    description:
      "Frontend specialist focused on creating exceptional user experiences. Champions accessibility and performance optimizations across all our web applications.",
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Jest",
      "Cypress",
      "GraphQL",
      "Redux",
    ],
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Jordan Lee",
    role: "UX/UI Design Lead",
    description:
      "Combines design thinking with technical knowledge to create intuitive interfaces. Leads our design system implementation and ensures consistent UI patterns.",
    technologies: [
      "Figma",
      "Adobe Creative Suite",
      "Framer",
      "CSS Animation",
      "Design Systems",
      "Frontend Development",
    ],
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "Morgan Taylor",
    role: "Backend Architect",
    description:
      "Database and API expert who builds robust server-side solutions. Specializes in optimizing performance and ensuring security throughout our infrastructure.",
    technologies: [
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "FastAPI",
      "Python",
      "Java",
      "Serverless",
    ],
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 5,
    name: "Cameron Rivera",
    role: "DevOps Engineer",
    description:
      "Infrastructure and automation wizard who maintains our deployment pipelines. Ensures continuous integration and delivery with a focus on security and reliability.",
    technologies: [
      "Azure",
      "Jenkins",
      "GitHub Actions",
      "Ansible",
      "Docker",
      "Kubernetes",
      "Prometheus",
      "Grafana",
    ],
    image: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    id: 6,
    name: "Jamie Quinn",
    role: "Mobile Development Lead",
    description:
      "Cross-platform mobile expert crafting native-feeling applications. Advocates for code sharing strategies and performance optimizations across mobile platforms.",
    technologies: [
      "React Native",
      "Swift",
      "Kotlin",
      "Firebase",
      "Redux",
      "Mobile UI/UX",
      "Offline-First Development",
    ],
    image: "https://randomuser.me/api/portraits/men/40.jpg",
  },
];

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  const teamRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Calculate initial positions - improved with wider spacing to prevent overlap
  const getInitialPosition = (index: number) => {
    // Create a more distributed pattern across the screen with increased spacing
    const patterns = [
      { x: -110, y: -70 }, // Top left - moved further out
      { x: 0, y: -80 }, // Top center - moved higher
      { x: 110, y: -70 }, // Top right - moved further out
      { x: -110, y: 70 }, // Bottom left - moved further out
      { x: 0, y: 80 }, // Bottom center - moved lower
      { x: 110, y: 70 }, // Bottom right - moved further out
    ];

    return patterns[index % patterns.length];
  };

  // Set up mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth - 0.5) * 2, // -1 to 1
        y: (event.clientY / window.innerHeight - 0.5) * 2, // -1 to 1
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  // Initialize animations
  useEffect(() => {
    // Skip if not in browser environment
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Initial animation for each team member
      teamRefs.current.forEach((elem, index) => {
        if (!elem) return;

        const position = getInitialPosition(index);

        // Set initial position and properties
        gsap.set(elem, {
          x: `${position.x}%`,
          y: `${position.y}%`,
          opacity: 0,
          scale: 0.8,
          rotation: gsap.utils.random(-3, 3),
          transformOrigin: "center center",
        });

        // Animate in
        gsap.to(elem, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: index * 0.15,
          ease: "power3.out",
        });
      }); // Create scroll-based parallax effect - gentle vertical movement
      // Removed scroll-based animation so cards only move based on mouse input
    }, containerRef);

    return () => ctx.revert(); // Clean up all GSAP animations
  }, []); // Mouse following effect - proximity-based cursor tracking
  useEffect(() => {
    teamRefs.current.forEach((elem, index) => {
      if (!elem) return;

      // Get the element's current position in the viewport
      const rect = elem.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      // Calculate distance between mouse and card center (normalized 0-1)
      const mouseX =
        (mousePosition.x * window.innerWidth) / 2 + window.innerWidth / 2;
      const mouseY =
        (mousePosition.y * window.innerHeight) / 2 + window.innerHeight / 2; // Calculate distance between mouse and card
      const deltaX = mouseX - cardCenterX;
      const deltaY = mouseY - cardCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Normalize distance (closer = higher value)
      // Max distance considered is 800px, beyond that minimal effect
      const proximity = Math.max(0, 1 - distance / 800);

      // Base movement factor
      const baseFactor = 0.55 + (index % 3) * 0.05;

      // Position from layout grid
      const position = getInitialPosition(index);

      // Move TOWARD the mouse (magnet effect) - directly use the delta values
      gsap.to(elem, {
        x: `${position.x + deltaX * 0.04 * proximity * baseFactor}%`,
        y: `${position.y + deltaY * 0.04 * proximity * baseFactor}%`,
        // Tilt effect intensifies with proximity
        rotationY: -deltaX * 0.02 * proximity,
        rotationX: deltaY * 0.02 * proximity,
        duration: 1.2, // Responsive feel
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [mousePosition]);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-black py-16"
      ref={containerRef}
    >
      {/* Heading */}{" "}
      <div className="container mx-auto text-center mb-10 z-10 relative">
        <h2 className="text-5xl font-bold mb-3 text-white tracking-tight">
          Our Team
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Meet the talented developers and designers building the digital
          solutions of tomorrow. A diverse team of experts crafting innovative
          software with cutting-edge technologies.
        </p>
      </div>
      {/* Team container - improved positioning */}
      <div className="relative w-full h-[80vh] md:h-[85vh] flex items-center justify-center px-4 pb-10">
        {" "}
        {/* Enhanced background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[30rem] h-[30rem] bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl"></div>
        {/* Team members */}
        {teamMembers.map((member, index) => (
          <div
            key={member.id}
            ref={(el) => {
              teamRefs.current[index] = el;
            }}
            className="absolute cursor-pointer group"
            style={{ willChange: "transform", perspective: "1000px" }}
          >
            {" "}
            <div
              className="relative w-72 h-96 md:w-80 md:h-[26rem] overflow-hidden rounded-2xl shadow-xl 
                          transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl
                          bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-white/10"
            >
              {/* Glass effect card */}
              <div className="absolute inset-0.5 rounded-2xl overflow-hidden">
                <div className="relative w-full h-2/5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 2}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    className="transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90"></div>
                </div>

                {/* Content section that's always visible */}
                <div className="absolute inset-0 flex flex-col">
                  {/* Top section with image (already positioned above) */}
                  <div className="h-2/5 relative">
                    {/* Overlay name and role on the image */}
                    <div className="absolute bottom-2 left-0 right-0 px-5 text-left z-10">
                      <h3 className="text-xl font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-300">{member.role}</p>
                    </div>
                  </div>

                  {/* Lower content section */}
                  <div className="h-3/5 p-5 flex flex-col overflow-hidden">
                    {/* Description */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-300 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                        {member.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="mt-auto">
                      <h4 className="text-xs uppercase text-gray-400 mb-2 font-semibold">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {member.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs px-2 py-1 rounded-full bg-gray-800/80 text-gray-300 border border-gray-700/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shine effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 
                            bg-gradient-to-tr from-transparent via-white to-transparent 
                            transition-opacity duration-500 pointer-events-none"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
