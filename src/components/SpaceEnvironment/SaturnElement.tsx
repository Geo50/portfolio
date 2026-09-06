import React, { useEffect, useRef } from "react";
import styles from "./SpaceEnvironment.module.css";
import saturn from "../../assets/saturn.webp";

export const SaturnElement: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const update = () => {
      const el = wrapperRef.current;
      if (!el) return;

      if (reducedMotion.current) {
        el.style.opacity = "0.55";
        el.style.transform = "translate(-50%, -50%)";
        return;
      }

      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, scrollY / maxScroll) : 0;

      // Fade: starts fading at 0%, fully gone by 22% of total scroll
      const fadeEnd = 0.22;
      const opacity = progress >= fadeEnd ? 0 : 1 - progress / fadeEnd;

      // Parallax drift: moves upward gently
      const translateY = scrollY * -0.32;

      el.style.opacity = String(Math.max(0, opacity));
      el.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div ref={wrapperRef} className={styles.saturnWrapper}>
      <img
        src={saturn}
        alt=""
        className={styles.saturnImage}
        draggable={false}
      />
    </div>
  );
};
