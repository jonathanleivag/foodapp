import { useEffect, useState, useCallback } from 'react'
import { useDataFetchResponse } from '../type'
import { getENV } from '../config/env.config'
import { ENV } from '../enum'

export const useDataFetch = <T>(
  router: string,
  pagination: boolean = false,
  page: number = 1,
  limit: number = 5
): useDataFetchResponse<T> => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const [data, setData] = useState<T>({} as T)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      const uri = pagination
        ? `${getENV(ENV.EXPO_PUBLIC_API_URL)}${router}?page=${page}&limit=${limit}`
        : `${getENV(ENV.EXPO_PUBLIC_API_URL)}${router}`

      const response = await fetch(uri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const jsonData: T = await response.json()

      // Check if it's the last page based on data length
      if (pagination && Array.isArray((jsonData as any).data)) {
        setIsLastPage((jsonData as any).data.length < limit)
      }

      setData(jsonData)
      setError(null)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }, [page, router, limit, pagination])

  useEffect(() => {
    void fetchData()
  }, [fetchData])

  return [data, isLoading && !isLastPage, error]
}
