import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'
import useSWR from 'swr'
import styles from '../styles/Home.module.css'

const fetcher = (url: string) => {
  const apiClient = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
  });
  return apiClient
    .get(url)
    .then((response) => response)
    .catch((error) => error)
}

const Home: NextPage = () => {
  const { data, error } = useSWR('/worlds', fetcher)

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  const worldItems = data.data.map((world) =>
    <tr>
      <td>
        <img src={world.thumbnailImageUrl} alt="World Thumbnail" width="200" height="150" />
        <ul>
          <li>name: {world.worldName}</li>
          <li>author: {world.authorName}</li>
        </ul>
      </td>
    </tr>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>VRChat World Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          VRChat World Search
        </h1>
        <table>
          <tbody>
            {worldItems}
          </tbody>
        </table>

      </main >
    </div >
  )
}

export default Home
