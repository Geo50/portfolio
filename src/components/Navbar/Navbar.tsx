import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { developerData } from '../../data/developer';
import { GithubIcon, LinkedinIcon } from '../UI/Icons';
import styles from './Navbar.module.css';

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section intersection detection
      const sections = ['about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={styles.brand}
          aria-label="Home"
        >
          <span className={styles.brandMonogram}>
            <span className={styles.brandBracket}>&lt;</span>
            <span className={styles.brandText}>Dev</span>
            <span className={styles.brandBracket}>/&gt;</span>
          </span>
          <span className={styles.brandName}>{developerData.name}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className={styles.navItem}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className={styles.activeIndicator}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Actions / Socials */}
        <div className={styles.navActions}>
          <a
            href={developerData.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconButton}
            aria-label="GitHub Profile"
            title="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={developerData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconButton}
            aria-label="LinkedIn Profile"
            title="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className={styles.ctaButton}
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={14} className={styles.ctaIcon} />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className={styles.mobileMenuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="container">
              <ul className={styles.mobileNavList}>
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`${styles.mobileNavLink} ${
                        activeSection === item.id ? styles.mobileActiveLink : ''
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className={styles.mobileSocials}>
                <a
                  href={developerData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileSocialLink}
                >
                  <GithubIcon size={18} />
                  <span>GitHub</span>
                </a>
                <a
                  href={developerData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileSocialLink}
                >
                  <LinkedinIcon size={18} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
