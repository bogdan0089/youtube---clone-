import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { parseApiError } from '../api/errors'
import FormField from '../components/ui/FormField'
import { useAuth } from '../features/auth/useAuth'
import ChannelAvatar from '../features/channels/ChannelAvatar'
import styles from '../features/channels/ChannelForm.module.css'
import { useChannel, useUpdateChannel } from '../features/channels/queries'

export default function EditChannelPage() {
  const { user } = useAuth()

  if (!user.channel_handle) return <Navigate to="/channel/new" replace />
  return <EditChannel handle={user.channel_handle} />
}

function EditChannel({ handle }) {
  const { data: channel } = useChannel(handle)

  if (!channel) return null
  return <EditChannelForm channel={channel} />
}

function EditChannelForm({ channel }) {
  const navigate = useNavigate()
  const updateChannel = useUpdateChannel(channel.handle)
  const [form, setForm] = useState({ name: channel.name, description: channel.description })
  const [files, setFiles] = useState({})

  const errors = updateChannel.error ? parseApiError(updateChannel.error) : { message: null, fields: {} }
  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const handleFile = (event) => {
    const { name, files: selected } = event.target
    if (!selected[0]) return
    if (files[name]) URL.revokeObjectURL(files[name].url)
    setFiles({ ...files, [name]: { file: selected[0], url: URL.createObjectURL(selected[0]) } })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = new FormData()
    Object.entries(form).forEach(([key, value]) => payload.append(key, value))
    Object.entries(files).forEach(([key, { file }]) => payload.append(key, file))
    updateChannel.mutate(payload, { onSuccess: () => navigate(`/@${channel.handle}`) })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Налаштування каналу</h1>
      {errors.message && <p className={styles.formError}>{errors.message}</p>}

      <div className={styles.fileRow}>
        <ChannelAvatar channel={{ ...channel, avatar: files.avatar?.url ?? channel.avatar }} size={96} />
        <FormField label="Аватар (до 2 МБ)" name="avatar" type="file" accept="image/*" onChange={handleFile} error={errors.fields.avatar} />
      </div>

      <div className={styles.fileRow}>
        {files.banner || channel.banner ? (
          <img className={styles.bannerPreview} src={files.banner?.url ?? channel.banner} alt="" />
        ) : (
          <div className={styles.bannerPreview} />
        )}
        <FormField label="Банер (до 6 МБ)" name="banner" type="file" accept="image/*" onChange={handleFile} error={errors.fields.banner} />
      </div>

      <FormField label="Назва" name="name" value={form.name} onChange={handleChange} error={errors.fields.name} required />
      <FormField
        label="Опис"
        name="description"
        value={form.description}
        onChange={handleChange}
        error={errors.fields.description}
        multiline
      />

      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={updateChannel.isPending}>
          Зберегти
        </button>
        <Link to={`/@${channel.handle}`} className={styles.cancel}>
          Скасувати
        </Link>
      </div>
    </form>
  )
}
