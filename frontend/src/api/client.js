import axios from 'axios'

import { tokens } from './tokens'

export const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use((config) => {
  const access = tokens.getAccess()
  if (access) config.headers.Authorization = `Bearer ${access}`
  return config
})

let refreshPromise = null
let onSessionExpired = () => {}

export function setOnSessionExpired(callback) {
  onSessionExpired = callback
}

function refreshAccessToken() {
  refreshPromise ??= axios
    .post('/api/users/token/refresh/', { refresh: tokens.getRefresh() })
    .then(({ data }) => {
      tokens.set(data)
      return data.access
    })
    .finally(() => {
      refreshPromise = null
    })
  return refreshPromise
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    const canRefresh = error.response?.status === 401 && tokens.getRefresh() && !original._retried
    if (!canRefresh) return Promise.reject(error)

    original._retried = true
    try {
      const access = await refreshAccessToken()
      original.headers.Authorization = `Bearer ${access}`
      return api(original)
    } catch (refreshError) {
      tokens.clear()
      onSessionExpired()
      return Promise.reject(refreshError)
    }
  },
)
