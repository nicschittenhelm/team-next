// src/app/components/TeamCard.tsx
"use client";

import Image from "next/image";
import { forwardRef } from "react";

// Define the TeamMember type
export type TeamMember = {
  id: number;
  name: string;
  role: string;
  description: string;
  technologies: string[];
  image: string;
};

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard = forwardRef<HTMLDivElement, TeamCardProps>(
  ({ member }, ref) => {
    return (
      <div
        ref={ref}
        className="cursor-pointer group"
        style={{ willChange: "transform", perspective: "1000px" }}
      >
        <div
          className="relative w-64 h-80 overflow-hidden rounded-2xl shadow-xl 
                    transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl
                    bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-white/10"
        >
          {/* Glass effect card */}
          <div className="absolute inset-0.5 rounded-2xl overflow-hidden">
            {/* Card background with image */}
            <div className="relative w-full h-full">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={member.id < 3} // Prioritize loading first couple of images
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
                className="transition-all duration-500 group-hover:scale-110 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/90"></div>
            </div>

            {/* Only the name overlay */}
            <div className="absolute bottom-6 left-0 right-0 px-5 text-center z-10">
              <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                {member.name}
              </h3>
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
    );
  }
);

TeamCard.displayName = "TeamCard";

export default TeamCard;
