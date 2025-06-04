"use client";

import { useState, useEffect } from "react";

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
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Add fade-in effect after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800); // Delay to make sure the page has loaded

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      // Get all sections from the DOM
      const sectionElements = sections.map((section) => {
        const element = document.getElementById(section.id);
        if (!element)
          return {
            id: section.id,
            top: 0,
            bottom: 0,
            height: 0,
            visible: false,
          };

        const rect = element.getBoundingClientRect();
        return {
          id: section.id,
          top: scrollPosition + rect.top,
          bottom: scrollPosition + rect.bottom,
          height: rect.height,
          visible: rect.top < windowHeight && rect.bottom > 0, // Is section visible in viewport
        };
      });

      // Check if we're at the bottom of the page
      const isAtBottom = scrollPosition + windowHeight >= documentHeight - 20; // 20px threshold

      if (isAtBottom) {
        // If at the bottom, highlight the last section
        setActiveSection(sections[sections.length - 1].id);
      } else {
        // Find the current section based on scroll position and visibility
        // First check if any section is prominently visible in the viewport
        const visibleSections = sectionElements.filter(
          (section) => section.visible
        );

        if (visibleSections.length > 0) {
          // Find the section that takes up the most space in the viewport
          const mostVisibleSection = visibleSections.reduce((prev, current) => {
            const prevVisibleHeight =
              Math.min(prev.bottom, scrollPosition + windowHeight) -
              Math.max(prev.top, scrollPosition);
            const currentVisibleHeight =
              Math.min(current.bottom, scrollPosition + windowHeight) -
              Math.max(current.top, scrollPosition);

            return currentVisibleHeight > prevVisibleHeight ? current : prev;
          });

          setActiveSection(mostVisibleSection.id);
        } else {
          // Fallback to the old method if no section is prominently visible
          const offset = 100;
          for (let i = sectionElements.length - 1; i >= 0; i--) {
            const section = sectionElements[i];
            if (scrollPosition >= section.top - offset) {
              setActiveSection(section.id);
              break;
            }
          }
        }
      }
    };

    // Initial check on mount
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);
  return (
    <div
      className={`fixed top-20 left-4 sm:left-8 z-50 hidden md:flex flex-col items-start transition-all duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      } hover:scale-105`}
    >
      <ul className="relative">
        {sections.map((section) => (
          <li key={section.id} className="mb-4 flex items-center">
            <div className="relative w-6 h-6 mr-3 flex items-center justify-center">
              {/* Vertical line connecting all sections */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-[1px] h-full bg-gray-500/50 z-0" />

              {/* Active indicator dot */}
              <div
                className={`w-3 h-3 rounded-full z-10 transition-all duration-500 ${
                  activeSection === section.id
                    ? "bg-green-500 scale-125 shadow-lg shadow-green-500/20"
                    : "bg-gray-500/50 scale-100"
                }`}
              />
            </div>

            {/* Section name */}
            <a
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className={`text-sm transition-all duration-500 hover:text-white cursor-pointer ${
                activeSection === section.id
                  ? "text-green-500 font-medium"
                  : "text-gray-400/80"
              }`}
            >
              {section.name}
            </a>
          </li>
        ))}

        {/* Progress line overlay */}
        <div
          className="absolute left-3 top-0 w-[1px] bg-green-500 transform -translate-x-1/2 z-10 transition-all duration-500 shadow-sm shadow-green-500/50"
          style={{
            height: `${Math.max(
              ((sections.findIndex((s) => s.id === activeSection) + 0.5) /
                sections.length) *
                100,
              5 // Minimum height to always show some progress
            )}%`,
            boxShadow: "0 0 8px rgba(34, 197, 94, 0.4)",
          }}
        />
      </ul>
    </div>
  );
}
