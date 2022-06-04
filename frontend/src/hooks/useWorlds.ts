import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import useSWRInfinite from 'swr/infinite'
import { WorldInterface as World } from '../../types/world.interface'

const PAGE_SIZE = 10

const fetcher = (url: string) => {
  const apiClient = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
  });
  return apiClient.get(url).then((response) => response.data)
}

const useWorldsWithAuthorId = () => {
  const [authorId, setAuthorId] = useState<string | undefined>(undefined);
  const query = (authorId) ? `&authorId=${authorId}` : ''

  const { data, error, size, setSize } = useSWRInfinite(
    (index: number) => `/worlds?page=${index}${query}`,
    (url: string) => fetcher(url)
  )
  const worlds: World[] | undefined = data ? data.flat() : undefined
  const isLoadingMore = (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || !!(data && data[data.length - 1]?.length < PAGE_SIZE)

  const loadMoreWorlds = () => {
    if (!isLoadingMore && !isReachingEnd) setSize(size + 1)
  }

  return { worlds, error, authorId, setAuthorId, loadMoreWorlds, isReachingEnd }
}

export default useWorldsWithAuthorId;
