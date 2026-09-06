import React from 'react';
import { motion } from 'motion/react';
import { projectsData } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.css';

export const Projects: React.FC = () => {
  return (
    <section id="work" className={`section ${styles.section}`}>
      <div className="container">
        <motion.span
          className={styles.sectionLabel}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          03 / Work
        </motion.span>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          Selected Projects
        </motion.h2>

        <div className={styles.grid}>
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
