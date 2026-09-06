import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, type Variants } from "motion/react";
import { developerData } from "../../data/developer";
import styles from "./Hero.module.css";
import { AstereoidCanvas } from "../Astereoids/AstereoidCanvas";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const Hero: React.FC = () => {
  const [isDiving, setIsDiving] = useState(false);
  const isSnappingRef = useRef(false);
  const touchStartY = useRef(0);

  /**
   * Smoothly snaps the viewport between the Hero and Profile sections
   */
  const snapTo = useCallback((target: "profile" | "hero") => {
    if (isSnappingRef.current) return;
    isSnappingRef.current = true;

    if (target === "profile") {
      setIsDiving(true);
      const profileEl = document.getElementById("profile");
      const targetY = profileEl
        ? Math.max(0, profileEl.offsetTop - 72)
        : window.innerHeight;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    } else {
      setIsDiving(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const onScrollEnd = () => {
      isSnappingRef.current = false;
      window.removeEventListener("scrollend", onScrollEnd);
    };

    window.addEventListener("scrollend", onScrollEnd, { once: true });
    setTimeout(() => {
      isSnappingRef.current = false;
      window.removeEventListener("scrollend", onScrollEnd);
    }, 750);
  }, []);

  // ── Wheel, touch, and keyboard snap interceptor ───────────────────────────
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Don't intercept if programmatic navigation (e.g. navbar click) is occurring
      if ((window as any).__isProgrammaticNav) return;

      const profileEl = document.getElementById("profile");
      const profileTop = profileEl
        ? Math.max(0, profileEl.offsetTop - 72)
        : window.innerHeight;

      // If already snapping, absorb extra wheel momentum in the transition zone
      if (isSnappingRef.current) {
        if (window.scrollY < profileTop + 50) {
          if (e.cancelable) e.preventDefault();
        }
        return;
      }

      // Zone 1: In Hero. Downward scroll snaps smoothly to Profile
      if (window.scrollY < 80) {
        if (e.deltaY > 15) {
          if (e.cancelable) e.preventDefault();
          snapTo("profile");
        }
        return;
      }

      // Zone 2: At top of Profile. Upward scroll snaps smoothly back to Hero
      if (
        window.scrollY <= profileTop + 25 &&
        window.scrollY >= 80 &&
        e.deltaY < -15
      ) {
        if (e.cancelable) e.preventDefault();
        snapTo("hero");
        return;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if ((window as any).__isProgrammaticNav) return;

      const profileEl = document.getElementById("profile");
      const profileTop = profileEl
        ? Math.max(0, profileEl.offsetTop - 72)
        : window.innerHeight;

      if (isSnappingRef.current) {
        if (window.scrollY < profileTop + 50) {
          if (e.cancelable) e.preventDefault();
        }
        return;
      }

      const dy = touchStartY.current - e.touches[0].clientY; // positive = swipe up (scroll down)

      // Swipe up from Hero -> snap to profile
      if (window.scrollY < 80 && dy > 40) {
        if (e.cancelable) e.preventDefault();
        snapTo("profile");
        return;
      }

      // Swipe down from top of Profile -> snap to hero
      if (
        window.scrollY <= profileTop + 25 &&
        window.scrollY >= 80 &&
        dy < -40
      ) {
        if (e.cancelable) e.preventDefault();
        snapTo("hero");
        return;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((window as any).__isProgrammaticNav || isSnappingRef.current) return;
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (
        window.scrollY < 80 &&
        (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ")
      ) {
        e.preventDefault();
        snapTo("profile");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [snapTo]);

  // ── Clear dive overlay when back at the top of Hero ───────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 40) {
        setIsDiving(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── CTA click — trigger smooth snap to profile ────────────────────────────
  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    snapTo("profile");
  };

  return (
    <section id="hero" className={styles.hero} aria-label="Introduction">
      {/* Dive overlay — darkens the hero during the transition */}
      <div
        className={`${styles.diveOverlay} ${isDiving ? styles.diveOverlayActive : ""}`}
        aria-hidden="true"
      />

      <div className={styles.content}>
        <motion.div
          className={styles.inner}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className={styles.name}>
            {developerData.name}
          </motion.h1>

          <motion.p variants={itemVariants} className={styles.role}>
            Software Developer
          </motion.p>

          <motion.div variants={itemVariants} className={styles.cta}>
            <a
              href="#profile"
              onClick={handleExploreClick}
              className={styles.ctaLink}
              aria-label="Scroll to profile section"
            >
              <span>Explore</span>
              <span className={styles.ctaArrow} aria-hidden="true">
                ↓
              </span>
            </a>
          </motion.div>
        </motion.div>
        <AstereoidCanvas />
      </div>
    </section>
  );
};
