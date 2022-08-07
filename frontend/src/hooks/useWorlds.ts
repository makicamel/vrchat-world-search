import { useState, useContext } from 'react'
import axios, { AxiosError } from 'axios'
import useSWRInfinite from 'swr/infinite'
import { WorldInterface as World } from '../../types/world.interface'
import { QueriesContext } from './useQueries'

const PAGE_SIZE = 10

const fetcher = (url: string) => {
  const apiClient = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
  });
  return apiClient.get(url).then((response) => response.data)
}

const useWorlds = () => {
  const defaultQueries = useContext(QueriesContext)
  const [queries, setQueries] = useState(defaultQueries.queries)
  const query = Object.entries(queries).map((entry) => `${entry[0]}=${entry[1]}`).join('&')

  const { data, error, size, setSize } = useSWRInfinite(
    (index: number) => `/worlds?page=${index}&${query}`,
    (url: string) => fetcher(url)
  )
  const worlds: World[] | undefined = data ? data.flat() : undefined
  const isLoadingMore = (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || !!(data && data[data.length - 1]?.length < PAGE_SIZE)

  const loadMoreWorlds = () => {
    if (!isLoadingMore && !isReachingEnd) setSize(size + 1)
  }

  return {
    worlds,
    error,
    loadMoreWorlds,
    isReachingEnd,
    queries,
    setQueries
  }
}

export default useWorlds
