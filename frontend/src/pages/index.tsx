import type { NextPage } from 'next'
import Grid from '@mui/material/Grid'
import { Dispatch, SetStateAction } from 'react';
import InfiniteScroll from 'react-infinite-scroller'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import WorldCard from '../components/WorldCard'
import AuthorLink from '../components/AuthorLink'
import useWorldsWithAuthorId from '../hooks/useWorlds'
import { WorldInterface as World } from '../../types/world.interface'

const Worlds: React.FC<{
  worlds: World[] | undefined,
  error: any,
  setAuthorId: Dispatch<SetStateAction<string | undefined>>,
  loadMoreWorlds: any,
}>
  = ({ worlds, error, setAuthorId, loadMoreWorlds }): JSX.Element => {
    const loader = (<div>Loading...</div>)
    if (!worlds) return loader
    if (error) return <div>An error has occurred.</div>

    const items = (
      (worlds || []).map((world: World) => {
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
    )

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreWorlds}
        hasMore={true}
        loader={loader}
      >
        <Grid container spacing={{ xs: 2, sm: 4, md: 8 }} justifyContent="center">
          {items}
        </Grid>
      </InfiniteScroll>
    )
  }

const Home: NextPage = () => {
  const { worlds, error, setAuthorId, loadMoreWorlds } = useWorldsWithAuthorId()

  return (
    <div>
      <Header setAuthorId={setAuthorId} />
      <main className={styles.main}>
        <Worlds worlds={worlds} error={error} setAuthorId={setAuthorId} loadMoreWorlds={loadMoreWorlds} />
      </main>
    </div >
  )
}

export default Home
