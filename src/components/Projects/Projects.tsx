import React from 'react';
import { projectsData } from '../../data/projects';
import { SectionHeading } from '../UI/SectionHeading';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.css';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className={`section ${styles.projectsSection}`}>
      <div className="container">
        <SectionHeading
          eyebrow="Featured Work"
          title="Selected Projects"
        />

        <div className={styles.grid}>
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
