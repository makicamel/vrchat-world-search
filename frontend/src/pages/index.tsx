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
  return apiClient.get(url).then((response) => response.data)
}

const Home: NextPage = () => {
  const { data, error } = useSWR('/worlds', fetcher)

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  const worldItems = data.map((world) =>
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
      <main className={`${styles.main} ${styles.container}`}>
        <table>
          <tbody>
            {worldItems}
          </tbody>
        </table>

      </main >
    </div >
  )
}

const Header: React.FC = () => (
  <header className={styles.header}>
    VRChat World Search
  </header>
)

export default Home
