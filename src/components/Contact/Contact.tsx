import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';
import { developerData } from '../../data/developer';
import { GithubIcon, LinkedinIcon } from '../UI/Icons';
import { SectionHeading } from '../UI/SectionHeading';
import styles from './Contact.module.css';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(developerData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className={`section ${styles.contactSection}`}>
      <div className="container">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's build something useful."
          align="center"
        />

        <div className={styles.contactWrapper}>
          {/* Main Direct Email Card */}
          <motion.div
            className={styles.emailCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className={styles.emailIconWrapper}>
              <Mail size={24} className={styles.emailIcon} />
            </div>

            <div className={styles.emailTextGroup}>
              <span className={styles.emailAddress}>{developerData.email}</span>
            </div>

            <div className={styles.emailActions}>
              <button
                type="button"
                className={`${styles.copyButton} ${copied ? styles.copiedSuccess : ''}`}
                onClick={handleCopyEmail}
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check size={15} className={styles.successIcon} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${developerData.email}`}
                className={styles.sendEmailButton}
                aria-label="Send email via mail client"
              >
                <span>Compose Mail</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>

          {/* Social Channels Row */}
          <div className={styles.socialGrid}>
            <motion.a
              href={developerData.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCard}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
              whileHover={{ y: -2 }}
            >
              <div className={styles.socialCardIcon}>
                <GithubIcon size={20} />
              </div>
              <div className={styles.socialCardInfo}>
                <span className={styles.socialCardTitle}>GitHub</span>
              </div>
              <ArrowUpRight size={16} className={styles.cardArrow} />
            </motion.a>

            <motion.a
              href={developerData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCard}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.16, ease: 'easeOut' }}
              whileHover={{ y: -2 }}
            >
              <div className={styles.socialCardIcon}>
                <LinkedinIcon size={20} />
              </div>
              <div className={styles.socialCardInfo}>
                <span className={styles.socialCardTitle}>LinkedIn</span>
              </div>
              <ArrowUpRight size={16} className={styles.cardArrow} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};
