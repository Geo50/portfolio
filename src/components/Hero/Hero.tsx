import React from 'react';
import { motion, type Variants } from 'motion/react';
import { ArrowDown, Mail, Terminal, Sparkles } from 'lucide-react';
import { developerData } from '../../data/developer';
import { GithubIcon, LinkedinIcon } from '../UI/Icons';
import { Button } from '../UI/Button';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="hero" className={styles.heroSection}>
      <div className={`container ${styles.heroContainer}`}>
        <motion.div
          className={styles.heroContent}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow & Status Pill */}
          <motion.div variants={itemVariants} className={styles.eyebrowRow}>
            <span className={styles.eyebrowBadge}>
              <span className={styles.eyebrowText}>WEB DEVELOPER</span>
            </span>

            {developerData.isAvailable && (
              <div className={styles.statusPill}>
                <span className={styles.statusDot}>
                  <span className={styles.statusPing} />
                </span>
                <span className={styles.statusLabel}>{developerData.statusText}</span>
              </div>
            )}
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className={styles.headline}>
            Building modern web experiences{' '}
            <span className={styles.headlineHighlight}>with React.</span>
          </motion.h1>

          {/* Bio / Description */}
          <motion.p variants={itemVariants} className={styles.description}>
            {developerData.bio.lead}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className={styles.ctaGroup}>
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToProjects}
              icon={<ArrowDown size={18} />}
            >
              View Projects
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={scrollToContact}
              icon={<Mail size={18} />}
            >
              Contact Me
            </Button>
          </motion.div>

          {/* Social Links Row */}
          <motion.div variants={itemVariants} className={styles.socialRow}>
            <span className={styles.socialLabel}>Connect:</span>
            <div className={styles.socialLinks}>
              <a
                href={developerData.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub Profile"
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
              </a>
              <span className={styles.socialDivider}>/</span>
              <a
                href={developerData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
              </a>
              <span className={styles.socialDivider}>/</span>
              <a
                href={`mailto:${developerData.email}`}
                className={styles.socialLink}
                aria-label="Send Email"
              >
                <Mail size={16} />
                <span>Email</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Minimalist Tech Visual Card */}
        <motion.div
          className={styles.visualWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <div className={styles.codeCard}>
            <div className={styles.cardHeader}>
              <div className={styles.windowControls}>
                <span className={styles.controlDot} />
                <span className={styles.controlDot} />
                <span className={styles.controlDot} />
              </div>
              <div className={styles.cardTitle}>
                <Terminal size={13} className={styles.terminalIcon} />
                <span>developer.config.ts</span>
              </div>
              <div className={styles.headerTag}>
                <Sparkles size={12} className={styles.sparkleIcon} />
                <span>React 19</span>
              </div>
            </div>
            <div className={styles.codeBody}>
              <pre>
                <code>
                  <span className={styles.tokenKeyword}>const</span>{' '}
                  <span className={styles.tokenVar}>frontendEngineer</span> = {'{\n'}
                  {'  '}
                  <span className={styles.tokenProp}>name</span>:{' '}
                  <span className={styles.tokenString}>"{developerData.name}"</span>,\n
                  {'  '}
                  <span className={styles.tokenProp}>coreStack</span>: [{'\n'}
                  {'    '}
                  <span className={styles.tokenHighlight}>'React 19'</span>,\n
                  {'    '}
                  <span className={styles.tokenHighlight}>'TypeScript'</span>,\n
                  {'    '}
                  <span className={styles.tokenString}>'Vite'</span>,\n
                  {'    '}
                  <span className={styles.tokenString}>'Tailwind CSS'</span>,\n
                  {'  '}],\n
                  {'  '}
                  <span className={styles.tokenProp}>principles</span>: [{'\n'}
                  {'    '}
                  <span className={styles.tokenComment}>// Clean architecture & performance</span>\n
                  {'    '}
                  <span className={styles.tokenString}>'Zero layout shift'</span>,\n
                  {'    '}
                  <span className={styles.tokenString}>'Fluid micro-interactions'</span>,\n
                  {'    '}
                  <span className={styles.tokenString}>'Maintainable state'</span>,\n
                  {'  '}],\n
                  {'}'};
                </code>
              </pre>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.pulseIndicator}>
                <span className={styles.pulseCore} />
                <span>Compilation status: Ready for production</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
