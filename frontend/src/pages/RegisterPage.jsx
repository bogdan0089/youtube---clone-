import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { parseApiError } from '../api/errors'
import FormField from '../components/ui/FormField'
import { authApi } from '../features/auth/api'
import styles from '../features/auth/AuthForm.module.css'
import { useAuth } from '../features/auth/useAuth'

export default function RegisterPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [errors, setErrors] = useState({ message: null, fields: {} })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (user) return <Navigate to="/" replace />

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await authApi.register(form)
      await login({ username: form.username, password: form.password })
      navigate('/', { replace: true })
    } catch (error) {
      setErrors(parseApiError(error))
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Реєстрація</h1>
        {errors.message && <p className={styles.formError}>{errors.message}</p>}
        <FormField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          error={errors.fields.username}
          autoComplete="username"
          minLength={6}
          required
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.fields.email}
          autoComplete="email"
          required
        />
        <FormField
          label="Пароль"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.fields.password}
          autoComplete="new-password"
          minLength={8}
          required
        />
        <button type="submit" className={styles.submit} disabled={isSubmitting}>
          Створити акаунт
        </button>
        <p className={styles.switch}>
          Вже є акаунт? <Link to="/login">Увійти</Link>
        </p>
      </form>
    </div>
  )
}
