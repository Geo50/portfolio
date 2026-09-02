import React from 'react';
import { motion } from 'motion/react';
import {
  Atom,
  Code2,
  Palette,
  Database,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { reactHighlightData, skillGroupsData } from '../../data/skills';
import { SectionHeading } from '../UI/SectionHeading';
import styles from './Skills.module.css';

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code2 size={17} />,
  'UI / Styling': <Palette size={17} />,
  'Backend / Data': <Database size={17} />,
  Tools: <Wrench size={17} />,
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className={`section ${styles.skillsSection}`}>
      <div className="container">
        <SectionHeading
          eyebrow="Technical Stack"
          title="Specialized in React & Modern Web Systems"
        />

        {/* HEROIC REACT SPOTLIGHT CARD */}
        <motion.div
          className={styles.reactSpotlightCard}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Card Top / Header */}
          <div className={styles.spotlightHeader}>
            <div className={styles.reactBadgeGroup}>
              <div className={styles.reactIconWrapper}>
                <Atom size={28} className={styles.reactSpinIcon} />
              </div>
              <div>
                <div className={styles.spotlightSubtitle}>
                  <Sparkles size={12} className={styles.sparkleIcon} />
                  <span>{reactHighlightData.subtitle}</span>
                </div>
                <h3 className={styles.spotlightTitle}>{reactHighlightData.title}</h3>
              </div>
            </div>
            <div className={styles.primaryStatusTag}>
              <span>Core Specialization</span>
            </div>
          </div>

          {/* Ecosystem Badges */}
          <div className={styles.ecosystemRow}>
            {reactHighlightData.ecosystem.map((item, idx) => (
              <span key={idx} className={styles.ecosystemTag}>
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CATEGORIZED SKILLS GRID */}
        <div className={styles.categoriesGrid}>
          {skillGroupsData.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              className={styles.categoryCard}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.4,
                delay: groupIdx * 0.06,
                ease: 'easeOut',
              }}
            >
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>{categoryIcons[group.category]}</div>
                <h4 className={styles.categoryTitle}>{group.category}</h4>
              </div>

              <div className={styles.skillItemList}>
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`${styles.skillPill} ${
                      skill.isPrimary ? styles.primarySkillPill : ''
                    }`}
                  >
                    <span className={styles.skillDot} />
                    <span className={styles.skillName}>{skill.name}</span>
                    {skill.tag && <span className={styles.tagBadge}>{skill.tag}</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
