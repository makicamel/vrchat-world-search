import { createContext } from 'react'

export type Queries = {
  authorId?: string,
  authorName?: string,
  supportQuest?: boolean,
  tags?: string[],
  text?: string,
}

type QueriesAndSetQueries = {
  queries: Queries,
  setQueries: React.Dispatch<React.SetStateAction<Queries>>
}

export const QueriesContext = createContext(
  {
    queries: {
      supportQuest: false
    }
  } as QueriesAndSetQueries
)
