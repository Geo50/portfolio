import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import type { Project } from '../../types/project';
import { GithubIcon } from '../UI/Icons';
import styles from './Projects.module.css';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isHovered) {
      video.play().catch(() => {/* autoplay blocked — silent fail */});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered]);

  const cardNum = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      className={`${styles.card} ${project.featured ? styles.cardFeatured : ''}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video preview */}
      <div
        className={`${styles.preview} ${isHovered ? styles.previewHovered : ''}`}
      >
        <video
          ref={videoRef}
          src={project.video}
          poster={project.poster}
          className={styles.video}
          muted
          playsInline
          loop
          preload="none"
          aria-hidden="true"
        />
        {/* Dark overlay — fades on hover */}
        <div className={`${styles.previewOverlay} ${isHovered ? styles.previewOverlayFaded : ''}`} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.contentTop}>
          <span className={styles.projectNum}>{cardNum}</span>
          {project.metrics && (
            <span className={styles.metric}>{project.metrics}</span>
          )}
        </div>

        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDesc}>{project.description}</p>

        <div className={styles.techList}>
          {project.technologies.map((tech) => (
            <span key={tech} className={styles.techTag}>{tech}</span>
          ))}
        </div>

        <div className={styles.actions}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionLink}
              aria-label={`View ${project.title} on GitHub`}
            >
              <GithubIcon size={14} />
              <span>GitHub</span>
              <ExternalLink size={11} className={styles.actionArrow} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.actionLink} ${styles.actionLinkPrimary}`}
              aria-label={`View live demo of ${project.title}`}
            >
              <span>View Project</span>
              <ExternalLink size={11} className={styles.actionArrow} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};
