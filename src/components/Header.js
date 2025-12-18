'use client';

import Link from 'next/link';
import { Github, Globe, Info } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ toggleSidebar, isCollapsed }) {
  const handleLanguageClick = () => {
    // Placeholder for language switching logic
    alert("Language switching implementation pending.");
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button 
          onClick={toggleSidebar}
          className={styles.toggleBtn}
          aria-label="Toggle sidebar"
        >
          <div className={styles.hamburger}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <div className={styles.rightSection}>
        <button 
          onClick={handleLanguageClick}
          className={`${styles.actionBtn} ${styles.langBtn}`}
          title="Change Language"
        >
          <Globe className={styles.icon} />
          <span>EN</span>
        </button>

        <Link href="/about" className={styles.actionBtn}>
          <Info className={styles.icon} />
          <span>About Us</span>
        </Link>

        <a 
          href="https://github.com/ggumarques/utility-hub" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.actionBtn}
        >
          <Github className={styles.icon} />
          <span>GitHub</span>
        </a>
      </div>
    </header>
  );
}
