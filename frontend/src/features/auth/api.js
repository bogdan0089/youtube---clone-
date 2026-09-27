import { api } from '../../api/client'

export const authApi = {
  login: (credentials) => api.post('/users/login/', credentials, { skipRefresh: true }).then((r) => r.data),
  register: (payload) => api.post('/users/register/', payload, { skipRefresh: true }).then((r) => r.data),
  getMe: () => api.get('/users/me/').then((r) => r.data),
  updateMe: (payload) => api.patch('/users/me/', payload).then((r) => r.data),
}
