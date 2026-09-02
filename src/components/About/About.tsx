import React from 'react';
import { motion } from 'motion/react';
import { Layers, ShieldCheck, Zap } from 'lucide-react';
import { developerData } from '../../data/developer';
import { SectionHeading } from '../UI/SectionHeading';
import styles from './About.module.css';

export const About: React.FC = () => {
  const highlights = [
    {
      icon: <Layers size={20} className={styles.highlightIcon} />,
      title: 'Component Architecture',
      subtitle: 'Modular, maintainable codebases',
    },
    {
      icon: <Zap size={20} className={styles.highlightIcon} />,
      title: 'Performance & Speed',
      subtitle: 'Fast load times & 60 FPS interactions',
    },
    {
      icon: <ShieldCheck size={20} className={styles.highlightIcon} />,
      title: 'Production Quality',
      subtitle: 'Strict TypeScript & accessibility',
    },
  ];

  return (
    <section id="about" className={`section ${styles.aboutSection}`}>
      <div className="container">
        <SectionHeading
          eyebrow="Profile Overview"
          title="Engineering interfaces with clarity & precision."
        />

        <div className={styles.grid}>
          {/* Bio text & stats */}
          <motion.div
            className={styles.bioContainer}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className={styles.leadBio}>{developerData.bio.lead}</p>

            {/* Quick Stat Badges */}
            {developerData.stats && (
              <div className={styles.statsRow}>
                {developerData.stats.map((stat, idx) => (
                  <div key={idx} className={styles.statCard}>
                    <span className={styles.statLabel}>{stat.label}</span>
                    <span className={styles.statValue}>{stat.value}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Clean Highlights */}
          <div className={styles.highlightsContainer}>
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                className={styles.highlightCard}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -2 }}
              >
                <div className={styles.iconContainer}>{item.icon}</div>
                <div>
                  <h3 className={styles.highlightTitle}>{item.title}</h3>
                  <p className={styles.highlightSubtitle}>{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
