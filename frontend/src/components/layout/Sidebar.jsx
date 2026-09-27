import { NavLink } from 'react-router-dom'

import styles from './Sidebar.module.css'

const LINKS = [{ to: '/', label: 'Головна', icon: '⌂' }]

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end
          className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
        >
          <span className={styles.icon}>{link.icon}</span>
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
