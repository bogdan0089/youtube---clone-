import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div>
      <h2>Сторінку не знайдено</h2>
      <Link to="/">На головну</Link>
    </div>
  )
}
