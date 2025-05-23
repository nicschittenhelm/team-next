"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const mouse = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const circle = useRef(null);
  const size = 80;

  // Lerp function for smooth interpolation
  const lerp = (start, end, t) => start * (1 - t) + end * t;

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;

    mouse.current = {
      x: clientX,
      y: clientY,
    };
  };

  const moveCircle = (x, y) => {
    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
  };
  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);

    // Animation frame for smooth cursor movement using lerp
    let animationFrameId;

    const animate = () => {
      // Apply lerp to both x and y coordinates (0.1 is the smoothing factor)
      cursorPos.current.x = lerp(cursorPos.current.x, mouse.current.x, 0.1);
      cursorPos.current.y = lerp(cursorPos.current.y, mouse.current.y, 0.1);

      // Update the cursor position with interpolated values
      moveCircle(cursorPos.current.x, cursorPos.current.y);

      // Continue the animation loop
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start the animation loop
    animate();

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      // Cleanup the animation frame when component unmounts
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <>
      <div className="fixed z-50 inset-0 h-screen bg-blend-difference pointer-events-none">
        <div
          ref={circle}
          style={{
            width: size,
            height: size,
            backdropFilter: "grayscale(1) invert(1) blur(4px)",
            WebkitBackdropFilter: "grayscale(1) invert(1) blur(10px)",
          }}
          className="top-0 left-0 fixed rounded-full"
        />
      </div>
    </>
  );
}
