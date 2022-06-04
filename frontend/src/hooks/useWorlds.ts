import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import useSWRInfinite from 'swr/infinite'
import { WorldInterface as World } from '../../types/world.interface'

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

  const { data, error, isValidating, size, setSize } = useSWRInfinite(
    (index: number) => `/worlds?page=${index}${query}`,
    (url: string) => fetcher(url)
  )
  const worlds: World[] | undefined = data ? data.flat() : undefined

  const loadMoreWorlds = () => {
    if (!isValidating) setSize(size + 1)
  }

  return { worlds, error, authorId, setAuthorId, loadMoreWorlds }
}

export default useWorldsWithAuthorId;
