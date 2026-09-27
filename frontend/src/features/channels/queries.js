import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { channelsApi } from './api'

export const channelKeys = {
  detail: (handle) => ['channels', handle],
}

export function useChannel(handle) {
  return useQuery({
    queryKey: channelKeys.detail(handle),
    queryFn: () => channelsApi.get(handle),
  })
}

export function useCreateChannel() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: channelsApi.create,
    onSuccess: (channel) => queryClient.setQueryData(channelKeys.detail(channel.handle), channel),
  })
}

export function useUpdateChannel(handle) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => channelsApi.update(handle, payload),
    onSuccess: (channel) => queryClient.setQueryData(channelKeys.detail(handle), channel),
  })
}
