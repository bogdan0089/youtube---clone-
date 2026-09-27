import { useCallback, useEffect, useMemo, useState } from 'react'

import { setOnSessionExpired } from '../../api/client'
import { tokens } from '../../api/tokens'
import { authApi } from './api'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(Boolean(tokens.getAccess()))

  useEffect(() => {
    setOnSessionExpired(() => setUser(null))
    if (!tokens.getAccess()) return

    authApi
      .getMe()
      .then(setUser)
      .catch(() => tokens.clear())
      .finally(() => setIsLoading(false))
  }, [])

  const refreshUser = useCallback(async () => {
    setUser(await authApi.getMe())
  }, [])

  const login = useCallback(
    async (credentials) => {
      tokens.set(await authApi.login(credentials))
      await refreshUser()
    },
    [refreshUser],
  )

  const logout = useCallback(() => {
    tokens.clear()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, isLoading, login, logout, refreshUser }),
    [user, isLoading, login, logout, refreshUser],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
