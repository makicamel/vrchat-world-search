import React, { useState } from 'react'
import type { NextPage } from 'next'
import Grid from '@mui/material/Grid'
import InfiniteScroll from 'react-infinite-scroller'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import WorldCard from '../components/WorldCard'
import AuthorLink from '../components/AuthorLink'
import { QueriesContext } from '../hooks/useQueries'
import useWorlds from '../hooks/useWorlds'
import { WorldInterface as World } from '../../types/world.interface'

const Worlds: React.FC<{
  worlds: World[] | undefined,
  error: any,
  loadMoreWorlds: any,
  isReachingEnd: boolean,
}>
  = ({
    worlds,
    error,
    loadMoreWorlds,
    isReachingEnd
  }): JSX.Element => {
    const loader = (<div key='loader'>Loading...</div>)
    if (!worlds) return loader
    if (error) return <div>An error has occurred.</div>

    const items = (
      (worlds || []).map((world: World, index: number) => {
        const author = (<AuthorLink
          author={{ authorName: world.authorName, authorId: world.authorId }}
        />)

        return (
          <Grid item key={`${index}${world.id}`} md={6} lg={4} >
            <WorldCard world={world} author={author} />
          </Grid>
        )
      })
    )

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreWorlds}
        hasMore={!isReachingEnd}
        loader={loader}
      >
        <Grid container spacing={{ xs: 2, sm: 4, md: 8 }} justifyContent="center">
          {items}
        </Grid>
      </InfiniteScroll>
    )
  }

const Home: NextPage = () => {
  const {
    worlds,
    error,
    loadMoreWorlds,
    isReachingEnd,
    queries,
    setQueries
  } = useWorlds()

  return (
    <QueriesContext.Provider value={{ queries, setQueries }}>
      <div>
        <Header />
        <main className={styles.main}>
          <Worlds worlds={worlds} error={error} loadMoreWorlds={loadMoreWorlds} isReachingEnd={isReachingEnd} />
        </main>
      </div >
    </QueriesContext.Provider>
  )
}

export default Home
