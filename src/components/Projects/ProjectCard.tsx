import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Play, Sparkles } from 'lucide-react';
import type { Project } from '../../types/project';
import { GithubIcon } from '../UI/Icons';
import styles from './Projects.module.css';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Playback control on hover changes using React ref
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Auto-play was prevented by browser policy
            setIsPlaying(false);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
      // Reset smoothly to beginning on unhover
      video.currentTime = 0;
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Mobile / Touch toggle support
  const handleCardTouch = () => {
    setIsHovered((prev) => !prev);
  };

  return (
    <motion.article
      className={`${styles.card} ${isHovered ? styles.cardHovered : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleCardTouch}
    >
      {/* Top Video Preview Container */}
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          src={project.video}
          poster={project.poster}
          className={`${styles.video} ${isHovered ? styles.videoActive : styles.videoGrayscale}`}
          muted
          playsInline
          loop
          preload="metadata"
          aria-label={`${project.title} video preview`}
        />

        {/* Subtle Dark Gradient Overlay (fades out on hover) */}
        <div
          className={`${styles.videoOverlay} ${
            isHovered ? styles.overlayFaded : styles.overlayVisible
          }`}
        />

        {/* Hover / Status Indicator Pill */}
        <div className={styles.videoBadge}>
          <Play
            size={11}
            className={`${styles.playIcon} ${isPlaying ? styles.playIconActive : ''}`}
          />
          <span>{isPlaying ? 'Live Preview' : 'Hover to Play'}</span>
        </div>

        {/* Featured Tag */}
        {project.featured && (
          <div className={styles.featuredBadge}>
            <Sparkles size={11} />
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className={styles.cardContent}>
        {/* Title & Metrics */}
        <div className={styles.cardHeader}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          {project.metrics && <span className={styles.metricBadge}>{project.metrics}</span>}
        </div>

        {/* Description */}
        <p className={styles.projectDescription}>{project.description}</p>

        {/* Technology Tags */}
        <div className={styles.techList}>
          {project.technologies.map((tech) => {
            const isReact = tech.toLowerCase().includes('react');
            return (
              <span
                key={tech}
                className={`${styles.techTag} ${isReact ? styles.reactTechTag : ''}`}
              >
                {tech}
              </span>
            );
          })}
        </div>

        {/* Action Links */}
        <div className={styles.actionRow}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkButton}
              aria-label={`View ${project.title} source code on GitHub`}
              onClick={(e) => e.stopPropagation()}
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
              <ExternalLink size={13} className={styles.arrowIcon} />
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.linkButton} ${styles.primaryLinkButton}`}
              aria-label={`Open live demo of ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span>Live Demo</span>
              <ExternalLink size={13} className={styles.arrowIcon} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};
