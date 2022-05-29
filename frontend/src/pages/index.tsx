import type { NextPage } from 'next'
import Grid from '@mui/material/Grid'
import { Dispatch, SetStateAction } from 'react';
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import WorldCard from '../components/WorldCard'
import AuthorLink from '../components/AuthorLink'
import useWorldsWithAuthorId from '../hooks/useWorlds'
import { WorldInterface as World } from '../../types/world.interface'

const Worlds: React.FC<{
  data: World[] | undefined,
  error: any,
  setAuthorId: Dispatch<SetStateAction<string | undefined>>
}>
  = ({ data, error, setAuthorId }): JSX.Element => {
    if (!data) return <div>Loading...</div>
    if (error) return <div>An error has occurred.</div>

    return (<>
      {data.map((world: World) => {
        const author = (<AuthorLink
          author={{ authorName: world.authorName, authorId: world.authorId }}
          setAuthorId={setAuthorId}
        />)

        return (
          <Grid item md={6} lg={4} >
            <WorldCard world={world} author={author} />
          </Grid>
        )
      })}
    </>)
  }

const Home: NextPage = () => {
  const { data, error, setAuthorId } = useWorldsWithAuthorId()

  return (
    <div>
      <Header setAuthorId={setAuthorId} />
      <main className={styles.main}>
        <Grid container spacing={{ xs: 2, sm: 4, md: 8 }} justifyContent="center">
          <Worlds data={data} error={error} setAuthorId={setAuthorId} />
        </Grid>
      </main>
    </div >
  )
}

export default Home
