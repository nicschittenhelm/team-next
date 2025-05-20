"use client";

import React, { useEffect, useRef, ReactElement } from "react";
import gsap from "gsap";

// Type definition for the props our component accepts
interface GsapMagneticProps {
  children: ReactElement;
  strength?: number;
  ease?: number;
}

export default function GsapMagnetic({
  children,
  strength = 0.5,
  ease = 0.2,
}: GsapMagneticProps) {
  // Create a ref that we'll pass to the child component
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip if ref isn't initialized yet
    if (!ref.current) return;

    // Store a reference to the current element
    const element = ref.current;

    // Track whether element is in original position to avoid unnecessary animations
    let isAtOriginalPosition = true;

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = element.getBoundingClientRect();

      // Calculate center of element
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate distance from mouse to center
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      // Calculate movement based on distance (decreases as distance increases)
      // The closer the mouse is to the center, the more the element will move
      const moveX = distanceX * strength;
      const moveY = distanceY * strength;      // Animate the element
      gsap.to(element, {
        x: moveX,
        y: moveY,
        duration: ease,
        ease: "power3.out",
        rotation: moveX * 0.03, // Subtle rotation based on x movement
        overwrite: true,
      });

      isAtOriginalPosition = false;
    };

    const mouseLeave = () => {
      // Only animate back if not already at original position
      if (!isAtOriginalPosition) {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.7,
          ease: "elastic.out(1.2, 0.4)", // More springy return animation
          onComplete: () => {
            isAtOriginalPosition = true;
          },
          overwrite: true,
        });
      }
    };

    element.addEventListener("mousemove", mouseMove);
    element.addEventListener("mouseleave", mouseLeave);

    return () => {
      // Use the stored element reference for cleanup
      element.removeEventListener("mousemove", mouseMove);
      element.removeEventListener("mouseleave", mouseLeave);
    };
  }, [strength, ease]);

  // Create a wrapper div that we control directly
  return <div ref={ref}>{children}</div>;
}
