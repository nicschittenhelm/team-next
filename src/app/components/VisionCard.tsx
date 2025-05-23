"use client";

import React from "react";

interface VisionCardProps {
  title: string;
  description: string;
}

const VisionCard: React.FC<VisionCardProps> = ({ title, description }) => {
  return (
    <div className="w-[1200px] h-[600px] bg-gray-800 rounded-2xl p-20">
      <h3 className="text-2xl font-bold text-white">{title}</h3>

      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default VisionCard;
