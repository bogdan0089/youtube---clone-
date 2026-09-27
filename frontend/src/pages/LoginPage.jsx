import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { parseApiError } from '../api/errors'
import FormField from '../components/ui/FormField'
import styles from '../features/auth/AuthForm.module.css'
import { useAuth } from '../features/auth/useAuth'

export default function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({ message: null, fields: {} })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (user) return <Navigate to="/" replace />

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await login(form)
      navigate(location.state?.from ?? '/', { replace: true })
    } catch (error) {
      setErrors(parseApiError(error))
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Вхід</h1>
        {errors.message && <p className={styles.formError}>{errors.message}</p>}
        <FormField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          error={errors.fields.username}
          autoComplete="username"
          required
        />
        <FormField
          label="Пароль"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.fields.password}
          autoComplete="current-password"
          required
        />
        <button type="submit" className={styles.submit} disabled={isSubmitting}>
          Увійти
        </button>
        <p className={styles.switch}>
          Немає акаунта? <Link to="/register">Зареєструватися</Link>
        </p>
      </form>
    </div>
  )
}
