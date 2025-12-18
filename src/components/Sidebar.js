'use client';



import { 
  Home, 
  Key, 
  Fingerprint, 
  Hash, 
  Code, 
  FileText, 
  FileDiff,
  Thermometer
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
  {
    category: 'Home',
    items: [
      { name: 'Dashboard', path: '/', icon: Home }
    ]
  },
  {
    category: 'Crypto',
    items: [
      { name: 'Token Generator', path: '/crypto/token', icon: Key },
      { name: 'UUID Generator', path: '/crypto/uuid', icon: Fingerprint }
    ]
  },
  {
    category: 'Converters',
    items: [
      { name: 'Roman to Number', path: '/converters/roman', icon: Hash },
      { name: 'Text to Base64', path: '/converters/base64', icon: Code },
      { name: 'Temperature', path: '/converters/temperature', icon: Thermometer }
    ]
  },
  {
    category: 'Text',
    items: [
      { name: 'Lorem Ipsum', path: '/text/lorem', icon: FileText },
      { name: 'Text Diff', path: '/text/diff', icon: FileDiff }
    ]
  }
];

export default function Sidebar({ isCollapsed }) {
  const pathname = usePathname();

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.content}>
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
                        <item.icon className={styles.icon} size={20} />
                        <span className={styles.linkText}>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
