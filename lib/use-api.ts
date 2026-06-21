'use client'

import useSWR, { SWRConfiguration } from 'swr'
import apiClient from './api-client'

interface UseApiOptions<T> extends SWRConfiguration {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export function useApi<T>(
  endpoint: string | null,
  options?: UseApiOptions<T>
) {
  const { onSuccess, onError, ...swrConfig } = options || {}

  const { data, error, isLoading, mutate } = useSWR<T>(
    endpoint,
    endpoint ? (url) => apiClient.get(url).then((res) => res.data) : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      ...swrConfig,
    }
  )

  // Call callbacks on success/error
  if (data && onSuccess) onSuccess(data)
  if (error && onError) onError(error)

  return {
    data,
    error,
    isLoading: isLoading || (!data && !error),
    mutate,
  }
}

export function useActivities(userId: string | null) {
  return useApi(userId ? `/activities/${userId}` : null, {
    revalidateOnFocus: true,
    revalidateIfStale: true,
  })
}

export function useInsights(userId: string | null) {
  return useApi(userId ? `/insights/${userId}` : null)
}

export function useDashboard(userId: string | null) {
  return useApi(userId ? `/dashboard/${userId}` : null, {
    revalidateOnFocus: true,
  })
}
