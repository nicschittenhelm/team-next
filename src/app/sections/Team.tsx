// src/sections/Team.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamCard from "../components/TeamCard";
import { teamMembers } from "../data/teamData";
import GsapMagnetic from "../components/GsapMagnetic";
import Image from "next/image";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<number | null>(null); // Function to handle card click and animate it to the placeholder
  const handleCardClick = (memberId: number) => {
    // Set the selected member
    setSelectedMember(memberId);

    // Get the clicked card element
    const cardElement = document.getElementById(`team-card-${memberId}`);
    if (!cardElement || !placeholderRef.current) return;

    // Get the positions for animation
    const cardRect = cardElement.getBoundingClientRect();
    const placeholderRect = placeholderRef.current.getBoundingClientRect();

    // Create a clone of the card for the animation
    const clone = cardElement.cloneNode(true) as HTMLElement;
    clone.style.position = "fixed";
    clone.style.left = `${cardRect.left}px`;
    clone.style.top = `${cardRect.top}px`;
    clone.style.width = `${cardRect.width}px`;
    clone.style.height = `${cardRect.height}px`;
    clone.style.zIndex = "50";
    clone.style.opacity = "0.9";
    clone.id = "card-clone";
    document.body.appendChild(clone);

    // Animate the clone to the placeholder
    gsap.to(clone, {
      left: placeholderRect.left,
      top: placeholderRect.top,
      width: placeholderRect.width,
      height: placeholderRect.height,
      duration: 0.4, // Faster animation
      ease: "power2.inOut",
      onComplete: () => {
        // Remove the clone when animation is complete
        clone.remove();

        // Animate in the details after the card animation completes
        animateDetailsIn();
      },
    });
  };

  // Function to animate in the details
  const animateDetailsIn = () => {
    // Define the elements to animate
    const elements = {
      name: nameRef.current,
      role: roleRef.current,
      tags: tagsRef.current,
      description: descriptionRef.current,
    };

    // Reset animations (in case they're already visible)
    gsap.set(
      [elements.name, elements.role, elements.tags, elements.description],
      {
        opacity: 0,
        y: 15,
      }
    );

    // Create a timeline for staggered animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate each element with a slight delay between them
    tl.to(elements.name, { opacity: 1, y: 0, duration: 0.5 })
      .to(elements.role, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .to(elements.tags, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .to(elements.description, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
  };

  // Find the selected member data
  const selectedMemberData =
    selectedMember !== null
      ? teamMembers.find((m) => m.id === selectedMember)
      : null;

  // Use effect to trigger animations when selectedMember changes
  useEffect(() => {
    // Skip on initial render when no member is selected
    if (selectedMember === null) return;

    // We don't animate details here because we want to wait for the card
    // animation to complete first (handled in handleCardClick)
  }, [selectedMember]);

  return (
    <section
      className="relative h-screen w-full  overflow-hidden flex items-center justify-center"
      ref={containerRef}
    >
      {/* Two-column layout container */}
      <div className="flex flex-col lg:flex-row w-full h-full max-w-[80vw] mx-aut">
        {/* Left side - Team grid */}
        <div className="w-full lg:w-1/2 flex justify-center items-center relative py-20 z-10 perspective-distant">
          <div className="grid w-2/3 grid-cols-1 md:grid-cols-2 gap-6 rotate-y-[20deg] ">
            {teamMembers.map((member) => (
              <GsapMagnetic key={member.id}>
                <div
                  id={`team-card-${member.id}`}
                  onClick={() => handleCardClick(member.id)}
                  className="cursor-pointer"
                >
                  <TeamCard key={member.id} member={member} />
                </div>
              </GsapMagnetic>
            ))}
          </div>
        </div>{" "}
        {/* Right side - Placeholder div and member details */}
        <div className="w-full lg:w-1/2 h-full py-50 flex items-start ">
          <div className="flex flex-col gap-6 w-full px-4 md:px-6 lg:px-8 xl:px-10 mx-auto lg:mx-0">
            {" "}
            {/* Horizontal layout with image on left, details on right */}
            <div className="flex flex-col md:flex-row gap-0 w-full">
              {/* Left - Image placeholder with responsive but fixed ratio 2:3 */}
              <div className="w-full md:w-1/2 lg:w-3/5 max-w-[400px] mx-auto md:mx-0">
                <div
                  ref={placeholderRef}
                  className="aspect-[2/3] border-8 border-dashed border-slate-700 bg-gray-900 relative overflow-hidden"
                >
                  {selectedMemberData && (
                    <Image
                      src={selectedMemberData.image}
                      alt={selectedMemberData.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 60vw, 42rem"
                      priority
                      style={{
                        objectFit: "cover",
                        objectPosition: "center top",
                      }}
                      className="brightness-90"
                    />
                  )}
                </div>
              </div>
              {/* Right - Details stacked vertically */}
              {selectedMemberData && (
                <div className="flex flex-col justify-start md:w-1/2 lg:w-2/5 md:min-w-0 md:pl-6">
                  {/* Name */}
                  <h3
                    ref={nameRef}
                    className="text-6xl font-bold text-white mb-2 drop-shadow-md opacity-0"
                  >
                    {selectedMemberData.name}
                  </h3>
                  {/* Role */}
                  <p
                    ref={roleRef}
                    className="text-2xl text-gray-200 font-medium mb-4 opacity-0"
                  >
                    {selectedMemberData.role}
                  </p>{" "}
                  {/* Technology tags */}
                  <div
                    ref={tagsRef}
                    className="flex flex-wrap pb-2 gap-2 mb-4 opacity-0 whitespace-nowrap"
                  >
                    {selectedMemberData.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-sm bg-white text-gray-700 px-3 py-1 rounded-full border border-gray-200 inline-block"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Description section below */}
            {selectedMemberData && (
              <div ref={descriptionRef} className="mt-2 opacity-0">
                <p className="text-white text-xl leading-relaxed">
                  {selectedMemberData.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[30rem] h-[30rem] bg-cyan-500/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
