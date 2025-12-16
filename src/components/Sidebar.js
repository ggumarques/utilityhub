'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
  {
    category: 'Home',
    items: [
      { name: 'Dashboard', path: '/' }
    ]
  },
  {
    category: 'Crypto',
    items: [
      { name: 'Token Generator', path: '/crypto/token' },
      { name: 'UUID Generator', path: '/crypto/uuid' }
    ]
  },
  {
    category: 'Converters',
    items: [
      { name: 'Roman to Number', path: '/converters/roman' },
      { name: 'Text to Base64', path: '/converters/base64' }
    ]
  },
  {
    category: 'Text',
    items: [
      { name: 'Lorem Ipsum', path: '/text/lorem' },
      { name: 'Text Diff', path: '/text/diff' }
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h1 className={styles.logo}>UtilityHUB</h1>
      </div>
      <nav className={styles.nav}>
        {navItems.map((group) => (
          <div key={group.category} className={styles.group}>
            <h2 className={styles.groupTitle}>{group.category}</h2>
            <ul className={styles.list}>
              {group.items.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link 
                      href={item.path} 
                      className={`${styles.link} ${isActive ? styles.active : ''}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
