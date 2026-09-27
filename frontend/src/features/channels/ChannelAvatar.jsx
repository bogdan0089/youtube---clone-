import styles from './ChannelAvatar.module.css'

export default function ChannelAvatar({ channel, size = 40 }) {
  const style = { width: size, height: size, fontSize: size * 0.45 }

  if (channel.avatar) {
    return <img className={styles.avatar} style={style} src={channel.avatar} alt={channel.name} />
  }
  return (
    <span className={`${styles.avatar} ${styles.placeholder}`} style={style}>
      {channel.name[0].toUpperCase()}
    </span>
  )
}
