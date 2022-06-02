import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import useSWRInfinite from 'swr/infinite'
import { WorldInterface as World } from '../../types/world.interface'

const fetcher = (url: string, pageIndex: number, authorId: string) => {
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
  const { data, error } = useSWRInfinite(getKey, fetcher)
  const worlds: World[] | undefined = data ? data.flat() : undefined

  return { worlds, error, authorId, setAuthorId }
}

const getKey = (pageIndex: number, previousPageData: any[]) => {
  if (previousPageData && !previousPageData.length) return null
  return ['/worlds', pageIndex]
}

export default useWorldsWithAuthorId;
