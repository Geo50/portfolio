import React from "react";
import { motion } from "motion/react";
import { skillGroupsData } from "../../data/skills";
import styles from "./Skills.module.css";

export const Skills: React.FC = () => {
  return (
    <section id="stack" className={`section ${styles.section}`}>
      <div className="container">
        <motion.span
          className={styles.sectionLabel}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          02 / Stack
        </motion.span>

        <motion.h2
          className={styles.heading}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          Tools & Technologies
        </motion.h2>

        <div className={styles.grid}>
          {skillGroupsData.map((group) => (
            <motion.div
              key={group.category}
              className={styles.group}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              <h3 className={styles.groupTitle}>{group.category}</h3>
              <ul className={styles.skillList}>
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className={`${styles.skillItem} ${skill.isPrimary ? styles.skillPrimary : ""}`}
                  >
                    <span className={styles.skillDot} />
                    <span className={styles.skillName}>{skill.name}</span>
                    {skill.tag && (
                      <span className={styles.skillTag}>{skill.tag}</span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
