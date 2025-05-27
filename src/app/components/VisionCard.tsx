"use client";

import React from "react";

interface VisionCardProps {
  title: string;
  description: string;
}

const VisionCard: React.FC<VisionCardProps> = ({ title, description }) => {
  return (
    <div className="w-[80vw] h-[70vh] rounded-2xl p-20 bg-gradient-to-br from-black to-gray-800 border-2 border-white/30 relative overflow-hidden">
      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),` +
            `linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          zIndex: 0,
        }}
      />
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default VisionCard;
