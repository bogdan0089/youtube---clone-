import styles from './FormField.module.css'

export default function FormField({ label, error, multiline = false, ...inputProps }) {
  const Control = multiline ? 'textarea' : 'input'
  const className = [styles.input, multiline && styles.multiline, error && styles.invalid].filter(Boolean).join(' ')

  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <Control className={className} {...inputProps} />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  )
}
