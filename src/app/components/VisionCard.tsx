"use client";

import React, { useRef, forwardRef } from "react";
import gsap from "gsap";

interface VisionCardProps {
  title: string;
  description: string;
  progress?: number; // Add progress prop
}

const VisionCard = forwardRef(function VisionCard(
  { title, description, progress = 0 }: VisionCardProps,
  ref
) {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  // Animate text in/out based on progress (scroll-synchronized)
  React.useEffect(() => {
    if (titleRef.current && descRef.current) {
      // Interpolate y based on progress (0 = out, 1 = in)
      const y = 300 * (1 - progress); // y: 64px when progress=0, y: 0 when progress=1
      gsap.to([titleRef.current, descRef.current], {
        y,
        duration: 0,
        overwrite: true,
        immediateRender: false,
      });
    }
  }, [progress]);

  return (
    <div className="w-[80vw] h-[70vh] rounded-2xl p-20 bg-gradient-to-br from-black to-gray-800 border-2 border-white/50 relative overflow-hidden">
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
          }px`, // grid spacing from 20px (progress=0) to 10px (progress=1)
          backgroundPosition: "center", // center the grid
          zIndex: 0,
        }}
      />
      <div ref={contentRef} className="relative z-10">
        <h3 ref={titleRef} className="text-2xl font-bold text-white mb-4">
          {title}
        </h3>
        <p ref={descRef} className="text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
});

export default VisionCard;
