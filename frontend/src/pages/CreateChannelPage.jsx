import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { parseApiError } from '../api/errors'
import FormField from '../components/ui/FormField'
import { useAuth } from '../features/auth/useAuth'
import styles from '../features/channels/ChannelForm.module.css'
import { useCreateChannel } from '../features/channels/queries'

export default function CreateChannelPage() {
  const { user, refreshUser } = useAuth()
  const navigate = useNavigate()
  const createChannel = useCreateChannel()
  const [form, setForm] = useState({ handle: '', name: '', description: '' })

  if (user.channel_handle) return <Navigate to={`/@${user.channel_handle}`} replace />

  const errors = createChannel.error ? parseApiError(createChannel.error) : { message: null, fields: {} }
  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const handleSubmit = (event) => {
    event.preventDefault()
    createChannel.mutate(form, {
      onSuccess: async (channel) => {
        await refreshUser()
        navigate(`/@${channel.handle}`)
      },
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Створення каналу</h1>
      {errors.message && <p className={styles.formError}>{errors.message}</p>}
      <FormField label="Назва" name="name" value={form.name} onChange={handleChange} error={errors.fields.name} required />
      <FormField
        label="Handle"
        name="handle"
        value={form.handle}
        onChange={handleChange}
        error={errors.fields.handle}
        minLength={3}
        maxLength={30}
        required
      />
      <p className={styles.hint}>Адреса каналу: /@{form.handle.toLowerCase() || 'handle'}</p>
      <FormField
        label="Опис"
        name="description"
        value={form.description}
        onChange={handleChange}
        error={errors.fields.description}
        multiline
      />
      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={createChannel.isPending}>
          Створити канал
        </button>
      </div>
    </form>
  )
}
