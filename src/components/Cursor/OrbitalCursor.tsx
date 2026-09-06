import React, { useEffect, useRef, useState } from "react";
import styles from "./OrbitalCursor.module.css";

export const OrbitalCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse coordinates (Target vs Current for smooth physics)
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // 1. Track mouse movement
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);

    // 2. Detect hover on buttons and links
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          "button, a, [role='button'], input, textarea, .clickable",
        )
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseover", onMouseOver);

    // 3. Smooth Lerp Animation Loop (Smooth 60fps glide)
    let rafId: number;
    const updatePosition = () => {
      // 0.18 gives a snappy yet fluid magnetic trailing feel
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  // Hide on touchscreen devices (tablets, phones)
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursorContainer} ${isHovered ? styles.hovered : ""} ${isVisible ? styles.visible : ""}`}
      aria-hidden="true"
    >
      <svg
        className={styles.cursorSvg}
        width="80"
        height="80"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle celestial white glow filter */}
          <filter id="planetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="2.5"
              result="blur"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Center gravitational core dot */}
        <circle cx="30" cy="30" r="2" fill="#ffffff" opacity="0.8" />

        {/* 2. White Circular Orbit Track */}
        <path
          id="cursorOrbitCircle"
          d="M 12,30 a 18,18 0 1,0 36,0 a 18,18 0 1,0 -36,0"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1.2"
          strokeDasharray="4 2"
          fill="none"
          className={styles.orbitTrack}
        />

        {/* 3. Orbiting Celestial Body */}
        <circle r="4" fill="#ffffff" filter="url(#planetGlow)">
          <animateMotion
            dur={isHovered ? "1.4s" : "3.0s"} // Orbits faster when hovering interactive elements
            repeatCount="indefinite"
          >
            <mpath href="#cursorOrbitCircle" />
          </animateMotion>
        </circle>
      </svg>
    </div>
  );
};
