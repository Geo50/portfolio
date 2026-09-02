import React from 'react';
import { ArrowUp } from 'lucide-react';
import { developerData } from '../../data/developer';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brandRow}>
          <div className={styles.brand}>
            <span className={styles.brandMonogram}>
              <span className={styles.brandBracket}>&lt;</span>
              <span className={styles.brandText}>Dev</span>
              <span className={styles.brandBracket}>/&gt;</span>
            </span>
            <span className={styles.brandName}>{developerData.name}</span>
          </div>

          <p className={styles.builtWith}>
            Engineered with <span className={styles.highlight}>React 19</span>,{' '}
            <span className={styles.highlight}>TypeScript</span> &{' '}
            <span className={styles.highlight}>Motion</span>
          </p>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {developerData.name}. All rights reserved.
          </p>

          <button
            type="button"
            className={styles.backToTopButton}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} className={styles.topIcon} />
          </button>
        </div>
      </div>
    </footer>
  );
};
