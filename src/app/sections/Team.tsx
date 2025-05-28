// src/sections/Team.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamCard from "../components/TeamCard";
import { teamMembers } from "../data/teamData";
// Import the extended type to use for proper typing
import { ExtendedTeamMember } from "../data/teamData";
import GsapMagnetic from "../components/GsapMagnetic";
import Image from "next/image";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<number | null>(1); // Start with first team member selected
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
  }; // Find the selected member data
  const selectedMemberData =
    selectedMember !== null
      ? (teamMembers.find((m) => m.id === selectedMember) as ExtendedTeamMember)
      : null;

  // References for the blob elements
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const blob4Ref = useRef<HTMLDivElement>(null);

  // Setup initial blob animations
  useEffect(() => {
    // Initialize blob movements - this only happens once
    if (
      blob1Ref.current &&
      blob2Ref.current &&
      blob3Ref.current &&
      blob4Ref.current
    ) {
      const setupBlobMovement = (
        blobRef: React.RefObject<HTMLDivElement>,
        amplitude: number,
        duration: number,
        delay: number
      ) => {
        gsap.to(blobRef.current, {
          x: () => gsap.utils.random(-amplitude, amplitude),
          y: () => gsap.utils.random(-amplitude, amplitude),
          duration: duration,
          repeat: -1,
          repeatRefresh: true, // Get new random values each repeat
          yoyo: true,
          ease: "sine.inOut",
          delay: delay,
        });
      };

      // Setup different movement patterns for each blob
      setupBlobMovement(blob1Ref, 40, 18, 0);
      setupBlobMovement(blob2Ref, 60, 24, 0.5);
      setupBlobMovement(blob3Ref, 50, 20, 1.2);
      setupBlobMovement(blob4Ref, 70, 22, 0.8);
    }
  }, []);

  // Use effect to trigger animations when selectedMember changes
  useEffect(() => {
    // Skip on initial render when no member is selected
    if (selectedMember === null) return;

    // We don't animate details here because we want to wait for the card
    // animation to complete first (handled in handleCardClick)

    // Animate the blobs when a new member is selected
    if (
      selectedMemberData &&
      blob1Ref.current &&
      blob2Ref.current &&
      blob3Ref.current &&
      blob4Ref.current
    ) {
      // Get the theme color of the selected member
      const themeColor = selectedMemberData.themeColor || "purple"; // Animate all blobs to the new color
      gsap.to(
        [
          blob1Ref.current,
          blob2Ref.current,
          blob3Ref.current,
          blob4Ref.current,
        ],
        {
          backgroundColor: `${themeColor}`,
          opacity: 0.2,
          duration: 1.2,
          ease: "power2.inOut",
        }
      );

      // Slightly adjust blob sizes for a breathing effect
      gsap.to(blob1Ref.current, {
        scale: 1.05,
        duration: 2,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });

      gsap.to(blob2Ref.current, {
        scale: 1.08,
        duration: 2.2,
        delay: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });

      gsap.to([blob3Ref.current, blob4Ref.current], {
        scale: 1.1,
        duration: 2.5,
        stagger: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });

      // Add some movement to the blobs
      gsap.to(blob1Ref.current, {
        x: gsap.utils.random(-20, 20),
        y: gsap.utils.random(-20, 20),
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(blob2Ref.current, {
        x: gsap.utils.random(-30, 30),
        y: gsap.utils.random(-30, 30),
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      gsap.to(blob3Ref.current, {
        x: gsap.utils.random(-25, 25),
        y: gsap.utils.random(-25, 25),
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      gsap.to(blob4Ref.current, {
        x: gsap.utils.random(-35, 35),
        y: gsap.utils.random(-35, 35),
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });
    }
  }, [selectedMember, selectedMemberData]);

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
      </div>{" "}
      {/* Animated blob background */}{" "}
      <div
        ref={blob1Ref}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] -z-10 mix-blend-screen transition-all duration-1000"
        style={{
          backgroundColor: selectedMemberData
            ? selectedMemberData.themeColor
            : "purple",
          opacity: 0.3,
        }}
      ></div>
      <div
        ref={blob2Ref}
        className="absolute bottom-1/4 right-1/3 w-[30rem] h-[30rem] rounded-full blur-[150px] -z-10 mix-blend-screen transition-all duration-1000"
        style={{
          backgroundColor: selectedMemberData
            ? selectedMemberData.themeColor
            : "cyan",
          opacity: 0.25,
        }}
      ></div>
      <div
        ref={blob3Ref}
        className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-[130px] -z-10 mix-blend-screen transition-all duration-1000"
        style={{
          backgroundColor: selectedMemberData
            ? selectedMemberData.themeColor
            : "pink",
          opacity: 0.2,
        }}
      ></div>
      <div
        ref={blob4Ref}
        className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full blur-[100px] -z-10 mix-blend-screen transition-all duration-1000"
        style={{
          backgroundColor: selectedMemberData
            ? selectedMemberData.themeColor
            : "blue",
          opacity: 0.2,
        }}
      ></div>
    </section>
  );
}
