import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { developerData } from "../../data/developer";
import { GithubIcon, LinkedinIcon } from "../UI/Icons";
import styles from "./Contact.module.css";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(developerData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" className={`section ${styles.section}`}>
      {/* Amber warmth glow — arrival */}
      <div className={styles.amberGlow} aria-hidden="true" />

      <div className="container">
        <div className={styles.wrapper}>
          <motion.span
            className={styles.sectionLabel}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp()}
          >
            04 / Contact
          </motion.span>

          <motion.h2
            className={styles.heading}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp(0.06)}
          >
            Let's build something.
          </motion.h2>

          {/* Email */}
          <motion.div
            className={styles.emailRow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp(0.12)}
          >
            <a
              href={`mailto:${developerData.email}`}
              className={styles.emailAddress}
            >
              <Mail size={16} className={styles.emailIcon} />
              {developerData.email}
            </a>

            <button
              type="button"
              className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ""}`}
              onClick={handleCopy}
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check size={13} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            className={styles.socialRow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp(0.18)}
          >
            <a
              href={developerData.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub profile"
            >
              <GithubIcon size={15} />
              <span>GitHub</span>
              <ArrowUpRight size={12} className={styles.linkArrow} />
            </a>

            <a
              href={developerData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon size={15} />
              <span>LinkedIn</span>
              <ArrowUpRight size={12} className={styles.linkArrow} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
