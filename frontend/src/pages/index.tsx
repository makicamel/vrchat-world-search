import type { NextPage } from 'next'
import Head from 'next/head'
import Grid from '@mui/material/Grid'
import styles from '../styles/Home.module.css'
import WorldCard from '../components/WorldCard'
import useWorldsWithAuthorId from '../hooks/useWorlds'
import { WorldInterface as World } from '../../types/world.interface'

const Worlds: React.FC = () => {
  const { data, error, setAuthorId } = useWorldsWithAuthorId()
  if (!data) return <div>Loading...</div>
  if (error) return <div>An error has occurred.</div>
    return data.map((world: World) => {
      const author = (<AuthorLink
        author={{ authorName: world.authorName, authorId: world.authorId }}
        setAuthorId={setAuthorId}
      />)

      return (
        <Grid item md={6} lg={4} >
          <WorldCard world={world} author={author} />
        </Grid>
      )
    })
  }

const Home: NextPage = () => {
  const { data, error, setAuthorId } = useWorldsWithAuthorId()

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
          <Worlds />
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
