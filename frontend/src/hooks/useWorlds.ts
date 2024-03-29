import { useState, useContext } from 'react'
import axios, { AxiosError } from 'axios'
import useSWRInfinite from 'swr/infinite'
import { WorldInterface as World } from '../../types/world.interface'
import { QueriesContext } from './useQueries'

const PAGE_SIZE = 10

const fetcher = (url: string) => {
  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return apiClient.get(url).then((response) => response.data)
}

const useWorlds = () => {
  const defaultQueries = useContext(QueriesContext)
  const [queries, setQueries] = useState(defaultQueries.queries)
  const query = Object.entries(queries)
    .filter((entry) => entry[1])
    .map((entry) => {
      if (Array.isArray(entry[1])) {
        return entry[1].map((value) => `${entry[0]}[]=${value}`).join('&')
      } else if (entry[0] !== 'authorName') {
        // Don't pass authorName as query
        return `${entry[0]}=${entry[1]}`
      }
    })
    .filter((q) => q)
    .join('&')

  const { data, error, size, setSize } = useSWRInfinite(
    (index: number) => `/worlds?page=${index}&${query}`,
    (url: string) => fetcher(url)
  )
  const worlds: World[] | undefined = data ? data.flat() : undefined
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === 'undefined'
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || !!(data && data[data.length - 1]?.length < PAGE_SIZE)

  const loadMoreWorlds = () => {
    if (!isLoadingMore && !isReachingEnd) setSize(size + 1)
  }

  return {
    worlds,
    error,
    loadMoreWorlds,
    isReachingEnd,
    queries,
    setQueries,
  }
}

export default useWorlds
