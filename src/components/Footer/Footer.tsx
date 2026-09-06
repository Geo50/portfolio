import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.copy}>
          © {year} Georgio Gebran
        </span>
        <button
          type="button"
          className={styles.toTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑ Top
        </button>
      </div>
    </footer>
  );
};
