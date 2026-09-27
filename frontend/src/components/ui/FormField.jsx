import styles from './FormField.module.css'

export default function FormField({ label, error, ...inputProps }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input className={error ? `${styles.input} ${styles.invalid}` : styles.input} {...inputProps} />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  )
}
