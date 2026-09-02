import React from 'react';
import { motion } from 'motion/react';
import styles from './Button.module.css';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  href,
  external = false,
  className = '',
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClass}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={buttonClass}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </motion.button>
  );
};
