import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import useSWRInfinite from 'swr/infinite'
import { WorldInterface as World } from '../../types/world.interface'

const fetcher = (url: string, pageIndex: number, authorId?: string) => {
  const apiClient = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
  });
  const query = (authorId) ? `&authorId=${authorId}` : ''
  return apiClient.get(`${url}?page=${pageIndex}${query}`).then((response) => response.data)
}

const useWorldsWithAuthorId = (initialAuthorId?: string) => {
  const [authorId, setAuthorId] = useState(initialAuthorId);
  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    (url: string, index: number) => fetcher(url, index, authorId)
  )
  const worlds: World[] | undefined = data ? data.flat() : undefined

  const loadMoreWorlds = () => {
    setTimeout(() => {
      setSize(size + 1)
    }, 250)
  }

  return { worlds, error, authorId, setAuthorId, loadMoreWorlds }
}

const getKey = (pageIndex: number, previousPageData: any[]) => {
  if (previousPageData && !previousPageData.length) return null
  return ['/worlds', pageIndex]
}

export default useWorldsWithAuthorId;
