import React, { useState, useEffect, useRef } from "react";
import { motion, type Variants } from "motion/react";
import { Compass, Cpu, Layers, ShieldCheck } from "lucide-react";
import { developerData } from "../../data/developer";
import styles from "./About.module.css";

// ── Animation variants ────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: <Layers size={18} className={styles.pillarIcon} />,
    title: "Frontend Engineering",
    description:
      "Modern React 19 architecture, strict TypeScript typing, modular design tokens, and fluid micro-interactions.",
  },
  {
    icon: <Cpu size={18} className={styles.pillarIcon} />,
    title: "Backend & Systems",
    description:
      "Reliable full-stack services using .NET, C#, and PostgreSQL with focus on clean data pipelines and high throughput.",
  },
  {
    icon: <ShieldCheck size={18} className={styles.pillarIcon} />,
    title: "Performance & Quality",
    description:
      "Strict zero-layout-shift discipline, sub-16ms render budgets, accessible semantic markup, and maintainable state.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isVisible) return; // already revealed — no need to observe

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          setIsVisible(true);
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  const meta = [
    { label: "Education", value: "Lebanese University" },
    { label: "Degree", value: "Management Information Systems (MIS)" },
    { label: "Discipline", value: "Software Engineering & Web Systems" },
    { label: "Location", value: developerData.location },
    { label: "Availability", value: developerData.statusText },
  ];

  return (
    <section
      ref={sectionRef}
      id="profile"
      className={`section ${styles.section}`}
    >
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Top Header & Navigation Metadata */}
          <motion.div variants={itemVariants} className={styles.headerRow}>
            <div>
              <span className={styles.sectionLabel}>01 / Profile</span>
              <h2 className={styles.heading}>
                Software developer
                <br />
                engineering high-clarity web systems.
              </h2>
            </div>

            <div className={styles.coordsCard}>
              <div className={styles.coordsHeader}>
                <Compass size={14} className={styles.compassIcon} />
                <span>WAYPOINT // 01</span>
              </div>
              <div className={styles.coordsData}>
                <span>SECTOR: SOL // SATURN-CORE</span>
                <span>STATE: EXPLORATION ACTIVE</span>
              </div>
            </div>
          </motion.div>

          <div className={styles.grid}>
            {/* Left Column — Core Bio & Architectural Pillars */}
            <motion.div variants={itemVariants} className={styles.left}>
              <p className={styles.bio}>
                Focused on building fast, resilient, and visually refined web
                applications with React, TypeScript, and modern ecosystem
                tooling. Bridging robust backend foundations with
                state-of-the-art frontend interfaces.
              </p>

              <div className={styles.pillarsGrid}>
                {pillars.map((pillar, idx) => (
                  <div key={idx} className={styles.pillarCard}>
                    <div className={styles.pillarHeader}>
                      {pillar.icon}
                      <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                    </div>
                    <p className={styles.pillarDesc}>{pillar.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column — Metadata Dossier */}
            <motion.div variants={itemVariants} className={styles.right}>
              <div className={styles.dossierCard}>
                <div className={styles.dossierTitle}>
                  <span>SYSTEM SPECIFICATION</span>
                  <span className={styles.dossierCode}>REF-2026</span>
                </div>

                <dl className={styles.metaList}>
                  {meta.map(({ label, value }) => (
                    <div key={label} className={styles.metaRow}>
                      <dt className={styles.metaLabel}>{label}</dt>
                      <dd className={styles.metaValue}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
