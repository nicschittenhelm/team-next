"use client";

import React, { useRef } from "react";
import gsap from "gsap";

interface VisionCardProps {
  title: string;
  description: string;
  progress?: number; // Add progress prop
  goal?: string; // Add goal prop
  approach?: string[]; // Add approach prop
}

const gradients = [
  "from-blue-950 to-indigo-700",
  "from-green-950 to-emerald-700",
  "from-purple-900 to-pink-800", // keep purple as is
  "from-yellow-950 to-orange-800",
];

const VisionCard = ({
  title,
  description,
  goal,
  approach,
  progress = 0,
  cardIndex = 0,
}: VisionCardProps & { cardIndex?: number }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);

  // Animate text in/out based on progress (scroll-synchronized)
  React.useEffect(() => {
    if (titleRef.current && descRef.current && contentRef.current) {
      const y = 200 * (1 - progress);
      gsap.to(
        [
          titleRef.current,
          descRef.current,
          contentRef.current.querySelector(".goal-text"),
          approachRef.current,
        ],
        {
          y,
          duration: 0,
          overwrite: true,
          immediateRender: false,
        }
      );
    }
  }, [progress]);
  return (
    <div
      className={`w-[70vw] h-[70vh] rounded-2xl p-20 bg-gradient-to-br ${
        gradients[cardIndex % gradients.length]
      } border-2 border-white/50 relative overflow-hidden shadow-[0_0_50px_20px_rgba(0,0,0,0.3)]`}
    >
      {" "}
      {/* Shadow enhancer */}
      <div className="absolute -inset-1 bg-black/50 blur-xl rounded-3xl -z-10"></div>
      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            `linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),` +
            `linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: `${20 + 15 * (1 - progress)}px ${
            20 + 15 * (1 - progress)
          }px`,
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col h-full justify-between"
      >
        <div>
          {" "}
          {goal && (
            <div className="mb-2 text-lg font-bold goal-text drop-shadow-sm text-white/95">
              {goal}
            </div>
          )}
          <h3
            ref={titleRef}
            className="text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight drop-shadow-[0_4px_3px_rgba(0,0,0,0.5)]"
          >
            {title}
          </h3>
          <p
            ref={descRef}
            className="text-lg text-white/90 mb-8 font-medium leading-relaxed max-w-3xl drop-shadow-md"
          >
            {description}
          </p>
        </div>{" "}
        {Array.isArray(approach) && approach.length > 0 && (
          <div
            ref={approachRef}
            className="mt-4 text-base text-white/70 font-mono tracking-wide drop-shadow-md"
          >
            {approach.join(" // ")}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisionCard;
