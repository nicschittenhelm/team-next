"use client";
import React, { useRef, useEffect, useState } from "react";

interface Section {
  id: string;
  name: string;
}

interface ScrollProgressIndicatorProps {
  sections: Section[];
}

export default function ScrollProgressIndicator({
  sections,
}: ScrollProgressIndicatorProps) {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || ""
  );
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Attach refs to each section by id
  useEffect(() => {
    sectionRefs.current = sections.map(({ id }) => document.getElementById(id));
  }, [sections]);

  // IntersectionObserver for active section
  useEffect(() => {
    if (!sections.length) return;
    const handleScroll = () => {
      let maxVisible = 0;
      let currentActive = activeSection;
      const newProgressMap: Record<string, number> = {};
      sectionRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        // Calculate visible height
        const visible = Math.max(
          0,
          Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
        );
        const progress =
          sectionHeight > 0
            ? Math.min(
                1,
                Math.max(
                  0,
                  (windowHeight - rect.top) / (windowHeight + sectionHeight)
                )
              )
            : 0;
        newProgressMap[sections[idx].id] = progress;
        if (visible > maxVisible) {
          maxVisible = visible;
          currentActive = sections[idx].id;
        }
      });
      setActiveSection(currentActive);
      setProgressMap(newProgressMap);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
    // eslint-disable-next-line
  }, [sections]);

  // Fade-in effect
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-20 left-4 sm:left-8 z-50 hidden md:flex flex-col items-start transition-all duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <ul className="relative">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <li key={section.id} className="mb-1.5 flex items-center">
              <div className="relative w-2 h-10 mr-3 flex items-center justify-center">
                <div
                  className={`rounded-full transition-colors duration-300 ${
                    isActive ? "w-2 h-8" : "w-1 h-8"
                  }`}
                  style={{
                    background: isActive
                      ? "rgba(255,255,255,0.32)"
                      : "rgba(255,255,255,0.16)",
                  }}
                />
                {isActive && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full shadow-md transition-transform duration-300"
                    style={{
                      background: "#0dff00",
                      top: `calc(${
                        (progressMap[section.id] ?? 0) * 100
                      }% - 0.25rem)`,
                    }}
                  />
                )}
              </div>
              <a
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  sectionRefs.current[
                    sections.findIndex((s) => s.id === section.id)
                  ]?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`text-base font-share-tech-mono transition-all duration-300 hover:text-[#0dff00] cursor-pointer ${
                  isActive ? "text-[#0dff00] font-medium" : "text-white"
                }`}
              >
                {section.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
