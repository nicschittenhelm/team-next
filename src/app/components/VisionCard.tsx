"use client";

import React from "react";

interface VisionCardProps {
  title: string;
  description: string;
}

const VisionCard: React.FC<VisionCardProps> = ({ title, description }) => {
  return (
    <div className="w-[80vw] h-[70vh] rounded-2xl p-20 bg-gray-500 border-2 border-white/10">
      <h3 className="text-2xl font-bold text-white">{title}</h3>

      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default VisionCard;
