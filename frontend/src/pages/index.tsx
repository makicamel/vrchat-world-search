import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'
import useSWR from 'swr'
import Grid from '@mui/material/Grid'
import styles from '../styles/Home.module.css'
import WorldCard from '../components/WorldCard'
import { WorldInterface as World } from '../../types/world.interface'

const fetcher = (url: string) => {
  const apiClient = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
  });
  return apiClient.get(url).then((response) => response.data)
}

function useWorlds(params: { authorId?: string, text?: string }) {
  const query = Object.entries(params).map(q => q.join('=')).join('&')
  const { data, error } = useSWR(`/worlds?${query}`, fetcher)

  return {
    worlds: data,
    isLoading: !error && !data,
    isError: error
  }
}

const Home: NextPage = () => {
  const { worlds, isLoading, isError } = useWorlds({})

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>An error has occurred.</div>

  return (
    <div>
      <Head>
        <title>VRChat World Search</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Header />
      <main className={styles.main}>
        <Grid container spacing={{ xs: 2, sm: 4, md: 8 }} justifyContent="center">
          {worlds.map((world: World) => (
            <Grid item md={6} lg={4}>
              <WorldCard world={world} />
            </Grid>
          ))}
        </Grid>
      </main>
    </div >
  )
}

const Header: React.FC = () => (
  <header className={styles.header}>
    VRChat World Search
  </header>
)

export default Home
