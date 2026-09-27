import { api } from '../../api/client'

export const channelsApi = {
  get: (handle) => api.get(`/channels/${handle}/`).then((r) => r.data),
  create: (payload) => api.post('/channels/', payload).then((r) => r.data),
  update: (handle, payload) => api.patch(`/channels/${handle}/`, payload).then((r) => r.data),
}
