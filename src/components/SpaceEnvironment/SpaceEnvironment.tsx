import React, { useEffect } from "react";
import styles from "./SpaceEnvironment.module.css";
import { StarfieldCanvas } from "./StarfieldCanvas";
import { SaturnElement } from "./SaturnElement";
import { ConstellationCanvas } from "./ConstellationCanvas";

/**
 * SpaceEnvironment
 *
 * Fixed-position layer that sits behind all page content (z-index: 0).
 * Maintains a single passive scroll listener that writes CSS custom properties
 * directly to document.documentElement — no React state, no re-renders.
 *
 * Children read --scroll-y and --scroll-progress via CSS or window.scrollY.
 */
export const SpaceEnvironment: React.FC = () => {
  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, scrollY / maxScroll) : 0;

      document.documentElement.style.setProperty("--scroll-y", String(scrollY));
      document.documentElement.style.setProperty(
        "--scroll-progress",
        String(progress),
      );
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className={styles.environment} aria-hidden="true">
      <div className={styles.ambientCold} />
      <StarfieldCanvas />
      <SaturnElement />
      <ConstellationCanvas />
    </div>
  );
};
