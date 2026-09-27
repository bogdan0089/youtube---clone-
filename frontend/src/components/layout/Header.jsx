import { Link } from 'react-router-dom'

import { useAuth } from '../../features/auth/useAuth'
import styles from './Header.module.css'

export default function Header() {
  const { user, isLoading, logout } = useAuth()

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoIcon}>▶</span>
        YouTube
      </Link>

      <div className={styles.actions}>
        {isLoading ? null : user ? (
          <>
            <span className={styles.avatar} title={user.username}>
              {user.username[0].toUpperCase()}
            </span>
            <button type="button" className={styles.button} onClick={logout}>
              Вийти
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.button}>
            Увійти
          </Link>
        )}
      </div>
    </header>
  )
}
