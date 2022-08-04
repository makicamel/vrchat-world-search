import { createContext } from 'react'

export type Queries = {
  authorId?: string,
  supportQuest?: boolean,
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
