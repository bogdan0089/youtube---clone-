import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '../features/auth/useAuth'

export default function RequireAuth({ children }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return null
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}
