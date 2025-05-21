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
      <div ref={ref} className="relative group">
        <div
          className="relative w-full aspect-square overflow-hidden rounded-xl shadow-lg
                    "
        >
          {/* Glass effect card */}
          <div className="absolute inset-0.5 rounded-2xl overflow-hidden">
            {/* Card background with image */}
            <div className="relative w-full h-full">
              {/* Black and white image (default) */}
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
                className="brightness-75 grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/90"></div>
            </div>

            {/* Name overlay - hidden by default, slides up on hover */}
            <div className="absolute bottom-0 left-0 right-0 px-5 text-center z-10 transform translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 pb-6">
              <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                {member.name}
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// Add displayName to avoid warnings in development
TeamCard.displayName = "TeamCard";

export default TeamCard;
