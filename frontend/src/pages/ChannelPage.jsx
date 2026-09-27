import { Link, useParams } from 'react-router-dom'

import { useAuth } from '../features/auth/useAuth'
import ChannelAvatar from '../features/channels/ChannelAvatar'
import styles from '../features/channels/ChannelPage.module.css'
import { useChannel } from '../features/channels/queries'
import NotFoundPage from './NotFoundPage'

export default function ChannelPage() {
  const { atHandle } = useParams()
  const handle = atHandle.startsWith('@') ? atHandle.slice(1).toLowerCase() : null

  if (!handle) return <NotFoundPage />
  return <Channel handle={handle} />
}

function Channel({ handle }) {
  const { user } = useAuth()
  const { data: channel, isPending, isError } = useChannel(handle)

  if (isPending) return <p className={styles.status}>Завантаження…</p>
  if (isError) return <NotFoundPage />

  const isOwner = user?.channel_handle === channel.handle

  return (
    <div className={styles.page}>
      <div className={styles.banner}>{channel.banner && <img src={channel.banner} alt="" />}</div>

      <div className={styles.header}>
        <ChannelAvatar channel={channel} size={160} />
        <div className={styles.info}>
          <h1 className={styles.name}>{channel.name}</h1>
          <p className={styles.handle}>@{channel.handle}</p>
          {channel.description && <p className={styles.description}>{channel.description}</p>}
          {isOwner && (
            <Link to="/channel/edit" className={styles.button}>
              Налаштувати канал
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
