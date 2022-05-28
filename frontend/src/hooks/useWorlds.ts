import { useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url: string, params: { authorId?: string, text?: string }) => {
  const apiClient = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
  });
  return apiClient.get(url, { params: params }).then((response) => response.data)
}

const useWorldsWithAuthorId = (initialAuthorId?: string) => {
  const [authorId, setAuthorId] = useState(initialAuthorId);
  const query = (authorId) ? `authorId=${authorId}` : ''

  const { data, error } = useSWR(`/worlds?${query}`, fetcher)
  return { data, error, authorId, setAuthorId }
}

export default useWorldsWithAuthorId;
